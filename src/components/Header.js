import React from 'react';
import './Header.css';


const Header = () => {
    return (
        <header className='header'>
            <div className='header-container'>
                <h1 className='header-subheading'>
                    Trip Planner
                </h1>
                <p className='header-para'>visualizing my bucket list</p>
            </div>
        </header>
    )
};

export default Header;