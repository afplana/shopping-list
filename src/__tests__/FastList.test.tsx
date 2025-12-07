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
    expect(screen.getByRole('heading', { name: /shopping list/i })).toBeInTheDocument();
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
