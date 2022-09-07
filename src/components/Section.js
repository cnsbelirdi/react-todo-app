import React, { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import Content from './Content';
import Header from './Header';
import Footer from './Footer';

function Section() {
    const {theme} = useContext(ThemeContext);
    const t = (theme === 'dark' ? 'dark' : '');
    return (
        <div className={`container bg-${t}`}>
            <div className="todo-container">
                <section className={`todoapp bg-${t}`}>
                    <Header />
                    <Content />
                </section>
            </div>
            
            <Footer />
        </div>
        
    )
}

export default Section
