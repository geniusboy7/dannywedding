import { WEDDING_DETAILS } from '../constants/wedding';
import { generateICS, downloadCalendarFile } from '../utils/calendar';
import './Details.css';

const Details = () => {
    const handleAddToCalendar = (e) => {
        e.preventDefault();
        const event = {
            title: `${WEDDING_DETAILS.bride} & ${WEDDING_DETAILS.groom}'s Wedding`,
            description: `Join us for the wedding of ${WEDDING_DETAILS.fullNameBride} and ${WEDDING_DETAILS.fullNameGroom}`,
            location: `${WEDDING_DETAILS.venue}, ${WEDDING_DETAILS.location}`,
            start: WEDDING_DETAILS.targetDate.replace(/[-:]/g, ''),
            end: "20260808T233000" // Hardcoded end for now as it's not in constants
        };
        const icsContent = generateICS(event);
        downloadCalendarFile('wedding-invite.ics', icsContent);
    };

    return (
        <section className="details">
            <div className="container">
                <h2 className="section-title">When & Where</h2>
                <div className="details-grid">
                    <div className="detail-card">
                        <h3 className="secondary-heading">Ceremony & Reception</h3>
                        <p className="venue-name">{WEDDING_DETAILS.venue}</p>
                        <p className="address">{WEDDING_DETAILS.location}</p>
                        <p className="time">{WEDDING_DETAILS.date} | {WEDDING_DETAILS.time}</p>
                        <div className="action-buttons">
                            <a href={WEDDING_DETAILS.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                                Get Directions
                            </a>
                            <a href="#" onClick={handleAddToCalendar} className="btn-secondary">
                                Add to Calendar
                            </a>
                        </div>
                    </div>
                    <div className="detail-card">
                        <h3 className="secondary-heading">Dress Code</h3>
                        <p>{WEDDING_DETAILS.dressCode}</p>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Details;
