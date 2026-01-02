import { FunctionComponent } from 'react';
import { ConsentPreference } from '../types';
import { useI18n } from '../i18n';

interface Props {
    visible: boolean;
    onSetConsent: (value: ConsentPreference) => void;
}

const ConsentBanner: FunctionComponent<Props> = ({ visible, onSetConsent }) => {
    const { t } = useI18n();
    if (!visible) return null;

    return (
        <div className="consent-banner" role="region" aria-label={t('consent.bannerLabel')}>
            <div>
                {t('consent.message')}
            </div>
            <div className="consent-actions">
                <button type="button" className="btn consent-btn accept" onClick={() => onSetConsent('granted')}>
                    {t('consent.accept')}
                </button>
                <button type="button" className="btn consent-btn decline" onClick={() => onSetConsent('denied')}>
                    {t('consent.decline')}
                </button>
            </div>
        </div>
    );
};

export default ConsentBanner;
