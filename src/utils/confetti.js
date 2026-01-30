import confetti from 'canvas-confetti';

/**
 * Trigger the celebration confetti.
 */
export const triggerConfetti = () => {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#008080', '#C5A059', '#FFFFFF']
    });
};
