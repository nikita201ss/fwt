import React from 'react';
import { useTheme } from '../hooks/useTheme';
import dark_icon from '../style/static/icon/dark_icon.svg'
import light_icon from '../style/static/icon/light_icon.svg'

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    let iconElement;
    
    if (theme === 'light') {
        iconElement = (
            <div className='dark-icon center'>
                <img src={dark_icon} alt="dark_icon" />
            </div>
        );
    } else {
        iconElement = (
            <div className='dark-icon center'>
                <img src={light_icon} alt="light_icon" />
            </div>
        );
    }

    return (
        <button className="theme-toggle" onClick={toggleTheme}>
            {iconElement}
        </button>
    );
};

export default ThemeToggle;