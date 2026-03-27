// import React from 'react';
import logo from '../style/static/img/logo.png'
import dark_icon from '../style/static/icon/dark_icon.svg'
const Header = () => {
    return (
        <div>
            <header>
                <div>
                    <a href="/">
                        <img src={logo} alt="logo" />
                    </a>
                </div>
                <div className='dark-icon center'>
                    <img src={dark_icon} alt="dark_icon" />
                </div>

            </header>

        </div>


    );
};

export default Header;