import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import './GalleryModal.css';

const GalleryModal = ({ gallery, onClose }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    if (!gallery) return null;

    return (
        <div className="gallery-modal-overlay" onClick={onClose}>
            <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="gallery-modal-close" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="gallery-modal-header">
                    <h2 className="secondary-heading">{gallery.title}</h2>
                    <p className="gallery-modal-subtitle">{gallery.images.length + 1} Photos</p>
                </div>

                <div className="gallery-modal-grid">
                    {/* Main Cover */}
                    <div className="gallery-modal-item cover">
                        <img src={gallery.cover} alt={`${gallery.title} Cover`} />
                    </div>

                    {/* Additional Images */}
                    {gallery.images.map((img, index) => (
                        <div key={index} className="gallery-modal-item">
                            <img src={img} alt={`${gallery.title} ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GalleryModal;
