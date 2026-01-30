import React, { useState, useEffect } from 'react';
import './Countdown.css';

const Countdown = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = new Date(targetDate).getTime() - now;

            if (distance < 0) {
                clearInterval(timer);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="countdown">
            <div className="countdown-item">
                <span className="count">{timeLeft.days}</span>
                <span className="label">Days</span>
            </div>
            <span className="countdown-separator">:</span>
            <div className="countdown-item">
                <span className="count">{timeLeft.hours}</span>
                <span className="label">Hours</span>
            </div>
            <span className="countdown-separator">:</span>
            <div className="countdown-item">
                <span className="count">{timeLeft.minutes}</span>
                <span className="label">Mins</span>
            </div>
            <span className="countdown-separator">:</span>
            <div className="countdown-item">
                <span className="count">{timeLeft.seconds}</span>
                <span className="label">Secs</span>
            </div>
        </div>
    );
};

export default Countdown;
