const Home: React.FC = () => (
    <main className="content-page">
        <h1>Welcome to Fast-List</h1>
        <p>
            Fast-List is a minimalist, in-browser shopping-list tool designed for speed and simplicity.
            No sign-ups, no cloud backend—just open the app, add your items, and check them off as you go.
        </p>
        <p>
            Your list is stored in your browser session, so it’s always at your fingertips.
            Head over to the <a href="/fast-list">List App</a> to try it now!
        </p>
        <h2>Why Fast-List?</h2>
        <ul>
            <li>Zero-configuration: works instantly on desktop or mobile.</li>
            <li>Lightweight: under 50 KB of JavaScript—loads in milliseconds.</li>
            <li>Privacy-first: your data never leaves your browser.</li>
        </ul>
        <p>
            Fast-List is perfect for grocery shopping, to-do lists, packing checklists,
            or any quick list you need. No distractions, no login walls—just a fast list.
        </p>
    </main>
);
export default Home;
