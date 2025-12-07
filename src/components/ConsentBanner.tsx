import { FunctionComponent } from 'react';
import { ConsentPreference } from '../types';

interface Props {
    visible: boolean;
    onSetConsent: (value: ConsentPreference) => void;
}

const ConsentBanner: FunctionComponent<Props> = ({ visible, onSetConsent }) => {
    if (!visible) return null;

    return (
        <div className="consent-banner" role="region" aria-label="Consent for ads">
            <div>
                We use Google AdSense to keep this free. Allow ads to load?
            </div>
            <div className="consent-actions">
                <button type="button" className="btn consent-btn accept" onClick={() => onSetConsent('granted')}>
                    Allow ads
                </button>
                <button type="button" className="btn consent-btn decline" onClick={() => onSetConsent('denied')}>
                    No thanks
                </button>
            </div>
        </div>
    );
};

export default ConsentBanner;
