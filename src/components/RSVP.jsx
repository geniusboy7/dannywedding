import React, { useState } from 'react';
import SuccessModal from './SuccessModal';
import './RSVP.css';

const RSVP = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        attending: 'yes',
        plusOne: 'no',
        plusOneName: '',
        dietary: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const apiUrl = import.meta.env.VITE_RSVP_API_URL;

        try {
            if (!apiUrl) {
                console.warn('RSVP API URL not set. Simulating success for development.');
                await new Promise(resolve => setTimeout(resolve, 1500));
            } else {
                await fetch(apiUrl, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'text/plain',
                    },
                    body: JSON.stringify(formData),
                });
            }
            setShowSuccess(true);
        } catch (error) {
            console.error('RSVP Error:', error);
            alert('Something went wrong. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="rsvp" id="rsvp">
            <div className="container small">
                <h2 className="section-title">RSVP</h2>
                <p className="rsvp-intro">We would be honored to have you with us. Please let us know if you can attend by June 30th, 2026.</p>

                <form className="rsvp-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} placeholder="Enter your full name" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email (Optional)</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" />
                    </div>

                    <div className="form-group">
                        <label>Will you be attending?</label>
                        <div className="radio-group">
                            <label className="radio-label">
                                <input type="radio" name="attending" value="yes" checked={formData.attending === 'yes'} onChange={handleChange} />
                                <span>Joyfully Accepts</span>
                            </label>
                            <label className="radio-label">
                                <input type="radio" name="attending" value="no" checked={formData.attending === 'no'} onChange={handleChange} />
                                <span>Regretfully Declines</span>
                            </label>
                        </div>
                    </div>

                    {formData.attending === 'yes' && (
                        <>
                            <div className="form-group animate-in">
                                <label>Bringing a Plus One?</label>
                                <div className="radio-group">
                                    <label className="radio-label">
                                        <input type="radio" name="plusOne" value="yes" checked={formData.plusOne === 'yes'} onChange={handleChange} />
                                        <span>Yes</span>
                                    </label>
                                    <label className="radio-label">
                                        <input type="radio" name="plusOne" value="no" checked={formData.plusOne === 'no'} onChange={handleChange} />
                                        <span>No</span>
                                    </label>
                                </div>
                            </div>

                            {formData.plusOne === 'yes' && (
                                <div className="form-group animate-in">
                                    <label htmlFor="plusOneName">Plus One Name</label>
                                    <input type="text" id="plusOneName" name="plusOneName" required value={formData.plusOneName} onChange={handleChange} placeholder="Enter their full name" />
                                </div>
                            )}
                        </>
                    )}

                    <div className="form-group">
                        <label htmlFor="dietary">Dietary Restrictions (Optional)</label>
                        <textarea id="dietary" name="dietary" value={formData.dietary} onChange={handleChange} placeholder="Allergies, Vegan, etc."></textarea>
                    </div>

                    <button type="submit" className="btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send RSVP'}
                    </button>
                </form>
            </div>

            {showSuccess && <SuccessModal onClose={() => {
                setShowSuccess(false);
                setFormData({
                    name: '',
                    email: '',
                    attending: 'yes',
                    plusOne: 'no',
                    plusOneName: '',
                    dietary: ''
                });
            }} formData={formData} />}
        </section>
    );
};

export default RSVP;
