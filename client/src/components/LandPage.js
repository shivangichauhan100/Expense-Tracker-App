// src/components/LandingPage.js
import React, { useState } from 'react';
import '../styles/LandPage.css'; // Assuming you have extracted styles to an external CSS file

function LandingPage() {
    const [modalImage, setModalImage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (src) => {
        setModalImage(src);
        setIsModalOpen(true);
    };

    const closeModal = (e) => {
        e.stopPropagation();
        setIsModalOpen(false);
        setModalImage('');
    };

    return (
        <div className="landing-page">
            <div className="right">
                <button onClick={() => window.location.href = '/login'}>Login Now</button>
            </div>
            <div className="heading">
                <h1>Personal Expense Tracker</h1>
            </div>
            <div className="paragraph">
                <p>Track your expenses, manage your budget, and achieve financial freedom with our easy-to-use expense tracking app.</p>
            </div>
            <div className="container">
                <img src="/img/landingpageimg.png" alt="Expense Tracker" />
            </div>

            {/* Features section */}
            <section className="features" id="features">
                <div className="container">
                    <h2>Why Choose Our Expense Tracker?</h2>
                    <div className="feature-grid">
                        {[
                            { src: '/img/budget.jpg', title: 'Simple Expense Tracking', description: 'Easily log your daily expenses in just a few taps.' },
                            { src: '/img/personalexpense.jpg', title: 'Budget Management', description: 'Set up monthly budgets and track progress.' },
                            { src: '/img/expense.jpg', title: 'Customizable Categories', description: 'Organize spending into custom categories.' },
                            { src: '/img/tracker.jpg', title: 'Visual Reports', description: 'Get insights with charts and graphs.' }
                        ].map((feature, index) => (
                            <div key={index} className="feature" onClick={() => openModal(feature.src)}>
                                <img src={feature.src} alt={feature.title} className="feature-img" />
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal" onClick={() => setIsModalOpen(false)}>
                    <span className="close" onClick={closeModal}>&times;</span>
                    <img className="modal-content" src={modalImage} alt="Feature" />
                </div>
            )}
        </div>
    );
}

export default LandingPage;
