// src/components/LandingPage.js
import React, { useState } from 'react';
import './LandPage.css';

function LandingPage() {
  const [modalImage, setModalImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (src) => {
    setModalImage(src);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="landing-page">
      <div className="right">
        <button type="button" onClick={() => window.location.href = '/login'}>
          Login Now
        </button>
      </div>
      <div className="heading">
        <h1>Personal Expense Tracker</h1>
      </div>
      <div className="paragraph">
        <p>Track your expenses, manage your budget, and achieve financial freedom with our easy-to-use expense tracking app.</p>
      </div>

      <div className="container">
        <img src="/img/landpage.jpg" alt="Expense Tracker" width="1000" />
      </div>

      <section className="features" id="features">
        <div className="container">
          <h2>Why Choose Our Expense Tracker?</h2>
          <div className="feature-grid">
            {[
              { src: 'budget.jpg', title: 'Simple Expense Tracking', desc: 'Easily log your daily expenses in just a few taps.' },
              { src: 'personalexpense.jpg', title: 'Budget Management', desc: 'Set up monthly budgets and track progress.' },
              { src: 'expense.jpg', title: 'Customizable Categories', desc: 'Organize spending into custom categories.' },
              { src: 'tracker.jpg', title: 'Visual Reports', desc: 'Get insights with charts and graphs.' },
            ].map((feature, index) => (
              <div key={index} className="feature">
                <img
                  src={`/img/${feature.src}`}
                  alt={feature.title}
                  className="feature-img"
                  onClick={() => openModal(`/img/${feature.src}`)}
                />
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <span className="close" onClick={closeModal}>&times;</span>
          <img className="modal-content" src={modalImage} alt="Feature Preview" />
        </div>
      )}
    </div>
  );
}

export default LandingPage;
