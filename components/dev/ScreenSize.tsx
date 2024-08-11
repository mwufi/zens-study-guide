'use client';

import { useState, useEffect } from 'react';

const ScreenSize = () => {
    const [screenSize, setScreenSize] = useState('sup there');

    useEffect(() => {
        console.log('sup there');
        const updateScreenSize = () => {
            const width = window.innerWidth;
            if (width >= 1536) {
                setScreenSize('2xl');
            } else if (width >= 1280) {
                setScreenSize('xl');
            } else if (width >= 1024) {
                setScreenSize('lg');
            } else if (width >= 768) {
                setScreenSize('md');
            } else if (width >= 640) {
                setScreenSize('sm');
            } else {
                setScreenSize('xs');
            }
        };

        updateScreenSize();
        window.addEventListener('resize', updateScreenSize);

        return () => window.removeEventListener('resize', updateScreenSize);
    }, []);

    return (
        <div className="fixed bottom-4 right-12 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
            {screenSize}
        </div>
    );
};

export default ScreenSize;
