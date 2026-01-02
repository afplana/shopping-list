import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';

const NavBar: React.FC = () => {
    const { language, setLanguage, t } = useI18n();

    return (
        <nav className="top-nav">
            <div className="nav-links">
                <Link to="/">{t('nav.list')}</Link>
                <Link to="/home">{t('nav.info')}</Link>
                <Link to="/about">{t('nav.about')}</Link>
                <Link to="/privacy">{t('nav.privacy')}</Link>
            </div>
            <div className="nav-actions">
                <label htmlFor="language-select" className="sr-only">
                    {t('nav.language')}
                </label>
                <select
                    id="language-select"
                    className="language-select"
                    aria-label={t('nav.languageSelector')}
                    value={language}
                    onChange={(event) => setLanguage(event.target.value as typeof language)}
                >
                    <option value="en">{t('language.english')}</option>
                    <option value="de">{t('language.german')}</option>
                    <option value="es">{t('language.spanish')}</option>
                </select>
            </div>
        </nav>
    );
};
export default NavBar;
