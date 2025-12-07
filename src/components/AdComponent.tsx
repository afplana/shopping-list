import { FunctionComponent, useEffect } from 'react';

const AD_CLIENT = 'ca-pub-7102876575671556';
const AD_SLOT = '5203535222';
const ADSENSE_URL = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`;

interface Props {
    consent: boolean;
}

const AdComponent: FunctionComponent<Props> = ({ consent }) => {
    const isProduction = process.env.NODE_ENV === 'production';

    useEffect(() => {
        if (!isProduction || !consent || typeof window === 'undefined') return;

        const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${ADSENSE_URL}"]`);
        if (!existingScript) {
            const script = document.createElement('script');
            script.async = true;
            script.src = ADSENSE_URL;
            script.setAttribute('crossorigin', 'anonymous');
            document.head.appendChild(script);
        }

        try {
            (window as typeof window & { adsbygoogle: unknown[] }).adsbygoogle = (window as typeof window & { adsbygoogle: unknown[] }).adsbygoogle || [];
            (window as typeof window & { adsbygoogle: unknown[] }).adsbygoogle.push({});
        } catch (e) {
            console.error('AdSense error:', e);
        }
    }, [consent, isProduction]);

    if (!isProduction || !consent) return null;

    return (
        <div className="ad-container" aria-label="Advertisement">
            <ins
                className="adsbygoogle"
                style={{ display: 'block', textAlign: 'center', minHeight: '90px' }}
                data-ad-client={AD_CLIENT}
                data-ad-slot={AD_SLOT}
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </div>
    );
};

export default AdComponent;
