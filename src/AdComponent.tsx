import { FunctionComponent, useEffect } from 'react';

const AdComponent: FunctionComponent = () => {
    // … your existing state & handlers …

    // ② Once the component mounts, tell AdSense to render the ad  
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            // fail silently
        }
    }, []);

    return (
        <section className="section-center">
            {/* …your form & list… */}

            {/* ③ AdSense ad unit */}
            <ins
                className="adsbygoogle"
                style={{ display: 'block', textAlign: 'center', margin: '1rem 0' }}
                data-ad-client="ca-pub-7102876575671556"
                // data-ad-slot="YYYYYYYYYY"
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins>
        </section>
    );
};

export default AdComponent;