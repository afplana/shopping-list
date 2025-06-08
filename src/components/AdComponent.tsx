import { FunctionComponent, useEffect } from 'react';

const AdComponent: FunctionComponent = () => {

    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error('AdSense error:', e);
        }
    }, []);


    return (
        <section className="section-center">
            {/* …your form & list… */}

            {/* ③ AdSense ad unit */}
            <ins className="adsbygoogle"
                style={{ display: 'block', textAlign: 'center', margin: '1rem 0' }}
                data-ad-client="ca-pub-7102876575671556"
                data-ad-slot="5203535222"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </section>
    );
};

export default AdComponent;