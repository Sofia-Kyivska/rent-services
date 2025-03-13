import { useEffect } from "react";


export function useLockFormRecize() {
    useEffect(() => {
        const handleFocus = (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                document.body.style.overflow = 'hidden';
            }
        };

        const handleBlur = () => {
            document.body.style.overflow = 'auto';
        };
        window.addEventListener('focus', handleFocus);
        window.addEventListener('blur', handleBlur);

        return () => {
            window.removeEventListener('focus', handleFocus);
            window.removeEventListener('blur', handleBlur);
        };
    }, [])
}