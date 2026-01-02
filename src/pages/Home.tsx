import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';

const Home: React.FC = () => {
    const { t } = useI18n();

    return (
        <main className="content-page">
            <h1>{t('home.title')}</h1>
            <p>{t('home.intro')}</p>
            <p>
                {t('home.storage')} {t('home.linkIntro')}{' '}
                <Link to="/">{t('home.linkText')}</Link> {t('home.linkOutro')}
            </p>
            <h2>{t('home.whyTitle')}</h2>
            <ul>
                <li>{t('home.why.zeroConfig')}</li>
                <li>{t('home.why.lightweight')}</li>
                <li>{t('home.why.privacy')}</li>
            </ul>
            <p>{t('home.outro')}</p>
        </main>
    );
};
export default Home;
