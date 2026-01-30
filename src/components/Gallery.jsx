import React, { useState } from 'react';
import { GALLERIES } from '../constants/galleries';
import GalleryModal from './GalleryModal';
import './Gallery.css';

const Gallery = () => {
    const [selectedGallery, setSelectedGallery] = useState(null);

    const handleOpenGallery = (gallery) => {
        setSelectedGallery(gallery);
    };

    const handleCloseGallery = () => {
        setSelectedGallery(null);
    };

    return (
        <section className="gallery">
            <div className="container">
                <h2 className="section-title">Gallery</h2>
                <p className="gallery-hint">Tap on an album to see more moments</p>
                <div className="gallery-grid">
                    {GALLERIES.map((item) => (
                        <div key={item.id} className="gallery-item" onClick={() => handleOpenGallery(item)}>
                            <img src={item.cover} alt={item.title} />
                            <div className="gallery-overlay">
                                <span>{item.title}</span>
                                <p className="gallery-count">{item.images.length + 1} Photos</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <GalleryModal gallery={selectedGallery} onClose={handleCloseGallery} />
        </section>
    );
};

export default Gallery;
