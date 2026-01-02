import '@testing-library/jest-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import FastList from '../pages/FastList';

jest.mock('../components/AdComponent', () => () => <div data-testid="ad-mock" />);
jest.mock('../components/ConsentBanner', () => () => null);

const fillItem = async (name: string, category?: string) => {
  const input = screen.getByPlaceholderText('e.g. eggs');
  await userEvent.clear(input);
  await userEvent.type(input, name);
  if (category) {
    const select = screen.getByLabelText('Item category');
    await userEvent.selectOptions(select, category);
  }
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));
};

describe('App routing', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('adsConsent', 'denied');
  });

  it('defaults to FastList on /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /fast items/i })).toBeInTheDocument();
  });
});

describe('FastList interactions', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('adsConsent', 'denied');
  });

  it('trims input and assigns category', async () => {
    render(<FastList />);

    await fillItem('  Shampoo  ', 'Personal Care');

    const item = screen.getAllByRole('article').find((node) => within(node).queryByText('Shampoo'));
    expect(item).toBeInTheDocument();
    expect(item && within(item).getByText('Personal Care')).toBeInTheDocument();
  });

  it('blocks whitespace-only submissions', async () => {
    render(<FastList />);

    const initialItems = screen.queryAllByRole('article');
    await fillItem('   ');
    const finalItems = screen.queryAllByRole('article');
    expect(finalItems.length).toBe(initialItems.length);
  });

  it('blocks duplicate items (case-insensitive)', async () => {
    render(<FastList />);

    await fillItem('Milk', 'Grocery');
    await fillItem('milk', 'Grocery');

    expect(await screen.findByText(/item already exists/i)).toBeInTheDocument();
    const items = screen.getAllByRole('article');
    expect(items).toHaveLength(1);
  });

  it('trims input before duplicate checks', async () => {
    render(<FastList />);

    await fillItem('Milk', 'Grocery');
    await fillItem('  milk  ', 'Grocery');

    expect(await screen.findByText(/item already exists/i)).toBeInTheDocument();
    const items = screen.getAllByRole('article');
    expect(items).toHaveLength(1);
  });

  it('adds accessible labels for edit and delete actions', async () => {
    render(<FastList />);

    await fillItem('Milk', 'Grocery');

    expect(screen.getByRole('button', { name: /edit milk/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete milk/i })).toBeInTheDocument();
  });

  it('handles localStorage write failures gracefully', async () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const storageSpy = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('write blocked');
    });

    render(<FastList />);
    await fillItem('Milk', 'Grocery');

    const milkItem = screen.getAllByRole('article').find((node) => within(node).queryByText('Milk'));
    expect(milkItem).toBeInTheDocument();
    expect(warnSpy).toHaveBeenCalledWith(
      'Unable to write list to localStorage.',
      expect.any(Error)
    );

    storageSpy.mockRestore();
    warnSpy.mockRestore();
  });

  it('filters the list live while typing a new item', async () => {
    render(<FastList />);

    await fillItem('Milk', 'Grocery');
    await fillItem('Bread', 'Grocery');

    const input = screen.getByPlaceholderText('e.g. eggs');
    await userEvent.clear(input);
    await userEvent.type(input, 'br');

    const visibleItems = screen.getAllByRole('article');
    expect(visibleItems.some((node) => within(node).queryByText('Bread'))).toBe(true);
    expect(visibleItems.some((node) => within(node).queryByText('Milk'))).toBe(false);

    await userEvent.clear(input);
    const allItems = screen.getAllByRole('article');
    expect(allItems.some((node) => within(node).queryByText('Bread'))).toBe(true);
    expect(allItems.some((node) => within(node).queryByText('Milk'))).toBe(true);
  });

  it('filters by category and respects hide completed', async () => {
    render(<FastList />);

    await fillItem('Milk', 'Grocery');
    await fillItem('Soap', 'Personal Care');

    await userEvent.click(screen.getByRole('button', { name: 'Personal Care' }));
    const soapItem = screen.getAllByRole('article').find((node) => within(node).queryByText('Soap'));
    const milkItem = screen.getAllByRole('article').find((node) => within(node).queryByText('Milk'));
    expect(soapItem).toBeInTheDocument();
    expect(milkItem).toBeUndefined();

    const soapCheckbox = screen.getByLabelText(/mark soap as done/i);
    await userEvent.click(soapCheckbox);
    const hideToggle = screen.getByLabelText(/hide completed/i);
    await userEvent.click(hideToggle);
    const hiddenSoap = screen.queryAllByRole('article').find((node) => within(node).queryByText('Soap'));
    expect(hiddenSoap).toBeUndefined();
  });

  it('clears completed items but retains active ones', async () => {
    render(<FastList />);

    await fillItem('Batteries', 'Electronics');
    await fillItem('Bread', 'Grocery');

    const batteriesCheckbox = screen.getByLabelText(/mark batteries as done/i);
    await userEvent.click(batteriesCheckbox);

    const clearCompleted = screen.getByRole('button', { name: /clear completed/i });
    await userEvent.click(clearCompleted);

    const remainingBatteries = screen.getAllByRole('article').find((node) => within(node).queryByText('Batteries'));
    const remainingBread = screen.getAllByRole('article').find((node) => within(node).queryByText('Bread'));
    expect(remainingBatteries).toBeUndefined();
    expect(remainingBread).toBeInTheDocument();
  });
});
