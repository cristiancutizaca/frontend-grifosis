import React, { useState, useEffect } from 'react';
import { IoIosArrowUp } from 'react-icons/io';

function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    const isBrowser = () => typeof window !== 'undefined';

    function scrollToTop() {
        if (!isBrowser()) return;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    useEffect(() => {
        if (!isBrowser()) return;

        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <button
            className={` animate-bounce mr-5 fixed bottom-10 right-0 bg-primaryblue text-white rounded-full px-4 py-2 mb-[71px] z-50 items-center text-xs flex gap-2 transition-opacity duration-500 ${
                isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={scrollToTop}
        >
            <IoIosArrowUp className="inline-block h-8 w-8 " />
        </button>
    );
}

export default ScrollToTopButton;
