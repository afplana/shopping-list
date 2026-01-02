import { useI18n } from '../i18n';

const About: React.FC = () => {
    const { t } = useI18n();

    return (
        <main className="content-page">
            <h1>{t('about.title')}</h1>
            <p>{t('about.intro')}</p>
            <ul>
                <li>{t('about.bullets.fast')}</li>
                <li>{t('about.bullets.local')}</li>
                <li>{t('about.bullets.crossPlatform')}</li>
            </ul>
            <p>{t('about.outro')}</p>
            <p><em>{t('about.signature')}</em></p>
        </main>
    );
};
export default About;
