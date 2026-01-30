import React, { useState, useEffect } from 'react';
import { GALLERIES } from '../constants/galleries';
import './ImageSlider.css';

const ImageSlider = () => {
    const images = GALLERIES.map(g => g.cover);

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="image-slider">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`slider-slide ${index === currentIndex ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${image})` }}
                />
            ))}
            <div className="slider-overlay"></div>
        </div>
    );
};

export default ImageSlider;
