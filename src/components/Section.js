import React from 'react';
import {useTheme} from '../context/Context';
import Content from './Content';
import Header from './Header';
import Footer from './Footer';
import Username from './Username';

function Section() {
    const {theme} = useTheme();
    const t = (theme === 'dark' ? 'dark' : '');

    const username = localStorage.getItem("username");

    if(username === null){
        return <Username />
    }

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
