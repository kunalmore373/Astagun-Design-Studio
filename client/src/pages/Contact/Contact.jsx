import { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    services: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setFormStatus('success');
        setFormData({ fullName: '', email: '', phone: '', services: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch (err) {
      setFormStatus('error');
    }
    setTimeout(() => setFormStatus(''), 3000);
  };

  return (
    <div className="contact-page">
      <div className="contact-page__hero">
        <h1 className="projects-page__title" style={{ color: 'var(--text-heading)' }}>GET IN TOUCH</h1>
      </div>
      
      {/* Reusing the contact section from Home */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-section__inner">
            <div className="contact-section__left">
              <h2 className="contact-section__title">LET'S TALK ABOUT YOUR PROJECTS</h2>
              <p className="contact-section__desc">
                Every collaboration begins with a conversation. We'd love to hear about your project, idea, or partnership.
              </p>
            </div>
            <div className="contact-section__right">
              <h3 className="contact-section__form-title">Enter Your Details</h3>
              <form className="contact-section__form" onSubmit={handleFormSubmit}>
                <div className="contact-section__field">
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Fullname" required />
                </div>
                <div className="contact-section__field">
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required />
                </div>
                <div className="contact-section__field">
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone Number" />
                </div>
                <div className="contact-section__field">
                  <input type="text" name="services" value={formData.services} onChange={handleInputChange} placeholder="Services" />
                </div>
                <div className="contact-section__field">
                  <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Message" rows={4}></textarea>
                </div>
                <button type="submit" className="btn btn-primary contact-section__submit" disabled={formStatus === 'sending'}>
                  {formStatus === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}
                </button>
                {formStatus === 'success' && <p style={{ color: 'green', marginTop: '10px' }}>Message sent successfully!</p>}
                {formStatus === 'error' && <p style={{ color: 'red', marginTop: '10px' }}>Failed to send message. Try again later.</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
