import { useI18n } from '../i18n';

const Privacy: React.FC = () => {
    const { t } = useI18n();

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
            <h2>{t('privacy.contactTitle')}</h2>
            <p>{t('privacy.contactBody')} <a href="mailto:you@devm2od.com">you@devm2od.com</a></p>
        </main>
    );
};
export default Privacy;
