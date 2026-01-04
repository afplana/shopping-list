import { FunctionComponent, useEffect } from 'react';
import { useI18n } from '../i18n';

interface Props {
    consent: boolean;
}

const AdComponent: FunctionComponent<Props> = ({ consent }) => {
    const { t } = useI18n();
    const isProduction = process.env.NODE_ENV === 'production';
    const adClient = process.env.REACT_APP_ADSENSE_CLIENT ?? '';
    const adSlot = process.env.REACT_APP_ADSENSE_SLOT ?? '';
    const hasAdsConfig = Boolean(adClient && adSlot);
    const adsenseUrl = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`;

    useEffect(() => {
        if (isProduction && consent && !hasAdsConfig) {
            console.warn('AdSense configuration missing. Set REACT_APP_ADSENSE_CLIENT and REACT_APP_ADSENSE_SLOT.');
            return;
        }
        if (!isProduction || !consent || !hasAdsConfig || typeof window === 'undefined') return;

        const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${adsenseUrl}"]`);
        if (!existingScript) {
            const script = document.createElement('script');
            script.async = true;
            script.src = adsenseUrl;
            script.setAttribute('crossorigin', 'anonymous');
            document.head.appendChild(script);
        }

        try {
            (window as typeof window & { adsbygoogle: unknown[] }).adsbygoogle = (window as typeof window & { adsbygoogle: unknown[] }).adsbygoogle || [];
            (window as typeof window & { adsbygoogle: unknown[] }).adsbygoogle.push({});
        } catch (e) {
            console.error('AdSense error:', e);
        }
    }, [adsenseUrl, consent, hasAdsConfig, isProduction]);

    if (!isProduction || !consent || !hasAdsConfig) return null;

    return (
        <div className="ad-container" aria-label={t('ad.label')}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block', textAlign: 'center', minHeight: '90px' }}
                data-ad-client={adClient}
                data-ad-slot={adSlot}
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </div>
    );
};

export default AdComponent;
