import { useState } from 'react';
import { useI18n } from '../i18n';
import { getStoredConsent, setStoredConsent } from '../shared/consent';
import { ConsentPreference } from '../types';

const Privacy: React.FC = () => {
    const { t } = useI18n();
    const [adsConsent, setAdsConsent] = useState<ConsentPreference>(getStoredConsent);

    const handleConsentChange = (value: ConsentPreference) => {
        setAdsConsent(value);
        setStoredConsent(value);
    };

    const consentStatus = adsConsent === 'granted'
        ? t('privacy.adsConsentStatusGranted')
        : adsConsent === 'denied'
            ? t('privacy.adsConsentStatusDenied')
            : t('privacy.adsConsentStatusUnknown');

    return (
        <main className="content-page">
            <h1>{t('privacy.title')}</h1>
            <p>{t('privacy.updated')}</p>
            <h2>{t('privacy.collectTitle')}</h2>
            <ul>
                <li>
                    <strong>{t('privacy.storageLabel')}</strong>{' '}
                    {t('privacy.storageBodyPrefix')}<code>localStorage</code>{t('privacy.storageBodySuffix')}
                </li>
                <li>
                    <strong>{t('privacy.adsLabel')}</strong> {t('privacy.adsBody')}
                </li>
                <li>
                    <strong>{t('privacy.consentLabel')}</strong> {t('privacy.consentBody')}
                </li>
            </ul>
            <h2>{t('privacy.analyticsTitle')}</h2>
            <p>{t('privacy.analyticsBody')}</p>
            <h2>{t('privacy.adsConsentTitle')}</h2>
            <p>{t('privacy.adsConsentBody')} <strong>{consentStatus}</strong></p>
            <div className="consent-actions">
                <button type="button" className="btn consent-btn accept" onClick={() => handleConsentChange('granted')}>
                    {t('privacy.adsConsentAllow')}
                </button>
                <button type="button" className="btn consent-btn decline" onClick={() => handleConsentChange('denied')}>
                    {t('privacy.adsConsentDeny')}
                </button>
                <button type="button" className="btn consent-btn" onClick={() => handleConsentChange(null)}>
                    {t('privacy.adsConsentReset')}
                </button>
            </div>
            <h2>{t('privacy.contactTitle')}</h2>
            <p>{t('privacy.contactBody')} <a href="mailto:you@devm2od.com">you@devm2od.com</a></p>
        </main>
    );
};
export default Privacy;
