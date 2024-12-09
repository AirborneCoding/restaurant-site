// 'use client';

// import React, { useState, useEffect } from "react";
// import { BsMoonFill, BsSunFill } from "react-icons/bs";

// const themes = {
//     light: 'retro',
//     dark: 'black',
// };

// const getThemeFromLocalStorage = () => {
//     if (typeof localStorage !== 'undefined') {
//         const theme = localStorage.getItem('theme') || themes.dark;
//         return theme;
//     }
//     return themes.dark;
// };

// const setDocumentTheme = (theme: string) => {
//     document.documentElement.setAttribute('data-theme', theme);
// };

// const Theme = () => {
//     const [theme, setTheme] = useState(getThemeFromLocalStorage());

//     useEffect(() => {
//         setDocumentTheme(theme);
//     }, [theme]);


//     const handleTheme = () => {
//         const selectedTheme = isDarkTheme ? themes.light : themes.dark
//         setTheme(selectedTheme);
//         document.documentElement.setAttribute('data-theme', theme)
//         localStorage.setItem('theme', selectedTheme);
//     };

//     const isDarkTheme = theme === themes.light;

//     return (
//         <div className="flex items-center gap-2">
//             {/* Toggle button between light and dark */}
//             <label className="swap swap-rotate">
//                 <input
//                     type="checkbox"
//                     onChange={handleTheme}
//                     defaultChecked={isDarkTheme}
//                 // checked={isDarkTheme || isLightTheme}
//                 />
//                 {/* sun icon (light mode) */}
//                 <BsSunFill className="swap-on text-yellow-500" size={22} />
//                 {/* moon icon (dark mode) */}
//                 <BsMoonFill className="swap-off text-gray-500" size={22} />
//             </label>
//         </div>
//     );
// };

// export default Theme;






'use client';

import React, { useState, useEffect } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

const themes = {
    light: 'retro',
    dark: 'black',
};

const getThemeFromLocalStorage = () => {
    if (typeof localStorage !== 'undefined') {
        const theme = localStorage.getItem('theme') || themes.dark;
        return theme;
    }
    return themes.dark;
};

const setDocumentTheme = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme);
};

const Theme = () => {
    const [theme, setTheme] = useState(getThemeFromLocalStorage());

    useEffect(() => {
        setDocumentTheme(theme);
    }, [theme]);

    const handleTheme = (selectedTheme: string) => {
        setTheme(selectedTheme);
        localStorage.setItem('theme', selectedTheme);
    };

    const isDarkTheme = theme === themes.dark;
    const isLightTheme = theme === themes.light;

    return (
        <div className="flex items-center gap-2">
            {/* Toggle button between light and dark */}
            <label className="swap swap-rotate">
                <input
                    type="checkbox"
                    onChange={() => handleTheme(isDarkTheme ? themes.light : themes.dark)}
                    checked={isDarkTheme || isLightTheme}
                />
                {/* sun icon (light mode) */}
                <BsSunFill className="swap-on text-yellow-500" size={22} />
                {/* moon icon (dark mode) */}
                <BsMoonFill className="swap-off text-gray-500" size={22} />
            </label>
        </div>
    );
};

export default Theme;
