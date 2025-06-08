const Privacy: React.FC = () => (
    <main style={{ maxWidth: 800, margin: '2rem auto', lineHeight: 1.6 }}>
        <h1>Privacy Policy</h1>
        <p>Last updated: June 8, 2025</p>
        <h2>Information We Collect</h2>
        <ul>
            <li><strong>Browser Storage:</strong> Your lists are saved in <code>localStorage</code>. We never transmit them.</li>
            <li><strong>Analytics:</strong> Google Analytics for pageviews only—no PII.</li>
            <li><strong>Ads:</strong> Google AdSense may use cookies to serve relevant ads. See Google’s policy for details.</li>
        </ul>
        <h2>Contact</h2>
        <p>Email us at <a href="mailto:you@devm2od.com">you@devm2od.com</a></p>
    </main>
);
export default Privacy;