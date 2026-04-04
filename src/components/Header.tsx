// import React from 'react';
import logo from '../style/static/img/logo.svg';
import ThemeToggle from './ThemeToggle.tsx';


const Header = () => {
    return (
        <div>
            <header>
                <div>
                    <a href="/fwt/">
                        <img src={logo} alt="logo" className='change'/>
                    </a>
                </div>

                <ThemeToggle />

            </header>

        </div>


    );
};

export default Header;