import { WEDDING_DETAILS } from '../constants/wedding';
import './FAQ.css';

const FAQ = () => {
    const faqs = [
        {
            question: "When should I RSVP by?",
            answer: `Please request to RSVP by ${WEDDING_DETAILS.rsvpDeadline}.`
        },
        {
            question: "What is the dress code?",
            answer: `The dress code is ${WEDDING_DETAILS.dressCode}. We want everyone to look their best!`
        },
        {
            question: "Can I bring a date?",
            answer: "We have a strict guest list to stay within our venue's capacity. Our RSVP form will indicate if you have been allocated a plus one."
        },
        {
            question: "Are children welcome?",
            answer: "To allow all wedding guests, including parents, a night of relaxation and uninhibited revelry, we respectfully ask that no children attend the reception."
        },
        {
            question: "Is there parking available?",
            answer: `Yes, the ${WEDDING_DETAILS.venue} offers ample secure parking for all our guests.`
        }
    ];

    return (
        <section className="faq-section" id="faqs">
            <div className="container">
                <h2 className="section-title">Common Questions</h2>
                <div className="faq-grid">
                    {faqs.map((faq, index) => (
                        <div key={index} className="faq-item">
                            <h3 className="faq-question">{faq.question}</h3>
                            <p className="faq-answer">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
