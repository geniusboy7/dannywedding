import React, { useRef } from 'react';
import { Calendar, Download, X } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { WEDDING_DETAILS } from '../constants/wedding';
import { triggerConfetti } from '../utils/confetti';
import { generateICS, downloadCalendarFile } from '../utils/calendar';
import './SuccessModal.css';

const SuccessModal = ({ onClose, formData }) => {
    const cardRef = useRef(null);

    // Trigger confetti on mount
    React.useEffect(() => {
        triggerConfetti();
    }, []);

    const downloadPDF = () => {
        if (cardRef.current === null) return;

        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a5',
            putOnlyUsedFonts: true
        });

        // Constants for PDF layout
        const pdfWidth = 130;
        const xOffset = 10;
        const yOffset = 10;
        const cardWidthPx = 320;
        const cardHeightPx = 420;
        const ratio = pdfWidth / cardWidthPx;
        const pdfHeight = cardHeightPx * ratio;

        doc.html(cardRef.current, {
            callback: function (doc) {
                // Manually add the clickable link over the "Get Directions" button area
                // The button is roughly at the bottom of the card
                // Button height is ~35px, width ~140px in original card
                const btnWidthPdf = 60; // Approximate
                const btnHeightPdf = 10; // Approximate
                const btnXPdf = xOffset + (pdfWidth / 2) - (btnWidthPdf / 2);
                const btnYPdf = yOffset + pdfHeight - 25; // Adjust based on layout

                doc.link(btnXPdf, btnYPdf, btnWidthPdf, btnHeightPdf, { url: WEDDING_DETAILS.mapsUrl });
                doc.save(`wedding-invite-${formData.name.toLowerCase().replace(/\s+/g, '-')}.pdf`);
            },
            x: xOffset,
            y: yOffset,
            width: pdfWidth,
            windowWidth: cardWidthPx
        });
    };

    const addToCalendar = () => {
        const event = {
            title: `${WEDDING_DETAILS.bride} & ${WEDDING_DETAILS.groom}'s Wedding`,
            description: `Join us for the wedding of ${WEDDING_DETAILS.fullNameBride} and ${WEDDING_DETAILS.fullNameGroom}`,
            location: `${WEDDING_DETAILS.venue}, ${WEDDING_DETAILS.location}`,
            start: WEDDING_DETAILS.targetDate.replace(/[-:]/g, ''),
            end: "20260808T233000"
        };

        const icsContent = generateICS(event);
        downloadCalendarFile('wedding-invite.ics', icsContent);
    };

    const isAttending = formData.attending === 'yes';

    return (
        <div className="modal-overlay">
            <div className="modal-content animate-in">
                <button className="close-btn" onClick={onClose}><X size={24} /></button>

                <div className="success-header">
                    <div className="check-icon">✓</div>
                    <h2>Thank you for RSVPing!</h2>
                    <p>{isAttending
                        ? `We are so excited to see you at ${WEDDING_DETAILS.venue}.`
                        : "We're sorry you couldn't join us."
                    }</p>
                </div>

                {isAttending ? (
                    <div className="invitation-download-section">
                        <h3>Your Personalized Card</h3>
                        <p className="personalized-msg">
                            Thank you for accepting our Invitation, <strong>{formData.name}{formData.plusOne === 'yes' ? ' & guest' : ''}</strong>.
                        </p>

                        <div className="card-container">
                            <div className="invitation-card" ref={cardRef}>
                                <div className="card-border">
                                    <div className="card-inner">
                                        <h4 className="card-header-text">Wedding Invitation</h4>

                                        <div className="card-main-content">
                                            <h2 className="card-names">{WEDDING_DETAILS.bride} & {WEDDING_DETAILS.groom}</h2>
                                            <div className="card-details">
                                                <p className="card-guest-name">For: {formData.name}{formData.plusOne === 'yes' ? ' & Guest' : ''}</p>
                                                <div className="separator-line"></div>
                                                <p className="card-date">{WEDDING_DETAILS.displayDate}</p>
                                                <p className="card-time">{WEDDING_DETAILS.time}</p>
                                                <p className="card-venue">{WEDDING_DETAILS.venue}</p>
                                                <p className="card-location">{WEDDING_DETAILS.location}</p>
                                            </div>
                                        </div>

                                        <div className="card-footer">
                                            <a href={WEDDING_DETAILS.mapsUrl} className="card-maps-link" target="_blank" rel="noopener noreferrer">
                                                Get Directions
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button onClick={downloadPDF} className="btn-action">
                                <Download size={18} />
                                Save PDF
                            </button>
                            <button onClick={addToCalendar} className="btn-action outline">
                                <Calendar size={18} />
                                Add to Calendar
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="decline-section">
                        <p className="decline-msg">
                            We appreciate you letting us know, <strong>{formData.name}</strong>. You'll be missed!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SuccessModal;
