import { useEffect } from 'react';

const useLockFormResize = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleGestureStart = (e) => {
                e.preventDefault();  // Disable pinch-to-zoom
            };
            document.addEventListener('gesturestart', handleGestureStart);
            return () => {
                document.removeEventListener('gesturestart', handleGestureStart);
            };
        }
    }, []);
};

export default useLockFormResize;



// useEffect(() => {
//     const handleFocus = (e) => {
//         if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
//             document.body.style.overflow = 'hidden';
//         }
//     };

//     const handleBlur = () => {
//         document.body.style.overflow = 'auto';
//     };
//     window.addEventListener('focus', handleFocus);
//     window.addEventListener('blur', handleBlur);

//     return () => {
//         window.removeEventListener('focus', handleFocus);
//         window.removeEventListener('blur', handleBlur);
//     };
// }, [])



