const About: React.FC = () => (
    <main style={{ maxWidth: 800, margin: '2rem auto', lineHeight: 1.6 }}>
        <h1>About Fast-List</h1>
        <p>
            Fast-List was built by a solo developer who wanted a no-frills way to jot down lists on the go.
            As a Senior Software Engineer and productivity enthusiast, I found existing apps too heavy or privacy-invasive.
        </p>
        <ul>
            <li>Lightning-fast interface that opens in under a second.</li>
            <li>No sign-in required—your data stays local to your browser.</li>
            <li>Cross-platform support: works on any modern browser, desktop or mobile.</li>
        </ul>
        <p>
            Whether you’re at the grocery store, planning your next trip,
            or just making a quick to-do list, Fast-List is there in one click.
        </p>
        <p><em>— Your Name, Creator of Fast-List</em></p>
    </main>
);
export default About;