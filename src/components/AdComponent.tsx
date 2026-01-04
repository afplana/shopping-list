import { FunctionComponent, useEffect } from 'react';
import { useI18n } from '../i18n';

const AD_CLIENT = process.env.REACT_APP_ADSENSE_CLIENT ?? '';
const AD_SLOT = process.env.REACT_APP_ADSENSE_SLOT ?? '';
const hasAdsConfig = Boolean(AD_CLIENT && AD_SLOT);
const ADSENSE_URL = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`;

interface Props {
    consent: boolean;
}

const AdComponent: FunctionComponent<Props> = ({ consent }) => {
    const { t } = useI18n();
    const isProduction = process.env.NODE_ENV === 'production';

    useEffect(() => {
        if (isProduction && consent && !hasAdsConfig) {
            console.warn('AdSense configuration missing. Set REACT_APP_ADSENSE_CLIENT and REACT_APP_ADSENSE_SLOT.');
            return;
        }
        if (!isProduction || !consent || !hasAdsConfig || typeof window === 'undefined') return;

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
    }, [consent, isProduction, hasAdsConfig]);

    if (!isProduction || !consent || !hasAdsConfig) return null;

    return (
        <div className="ad-container" aria-label={t('ad.label')}>
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
