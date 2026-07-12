import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineArrowUpRight } from 'react-icons/hi2';
import { HiOutlineLightBulb, HiOutlineCheckCircle, HiOutlineSearch } from 'react-icons/hi';
import { FaCube, FaStar } from 'react-icons/fa';
import './Home.css';

/* ============ DATA ============ */
const projects = [
  {
    title: 'CORPORATE OFFICE SPACE',
    category: 'COMMERCIAL ARCHITECTURE',
    location: 'NEW YORK, 2026',
    image: '/images/office-interior.jpeg',
    slug: 'corporate-office-space',
  },
  {
    title: 'SERENITY VILLA',
    category: 'RESIDENTIAL ARCHITECTURE',
    location: 'DUBAI, 2025',
    image: '/images/project-villa.png',
    slug: 'serenity-villa',
  },
  {
    title: 'MINIMALIST APARTMENT INTERIOR',
    category: 'RESIDENTIAL ARCHITECTURE',
    location: 'LONDON, 2025',
    image: '/images/project-minimalist-apt.png',
    slug: 'minimalist-apartment',
  },
];

const services = [
  {
    title: 'Architectural',
    description: 'Designing modern buildings that combine aesthetics, efficiency, and long-term value.',
  },
  {
    title: 'Interior Design',
    description: 'Creating refined interiors through thoughtful materials, lighting, and spatial composition.',
  },
  {
    title: 'Renovation & Remodeling',
    description: 'Transforming outdated spaces into modern and carefully designed environments.',
  },
  {
    title: 'Landscape Architecture',
    description: 'Designing outdoor environments that harmonize with architecture and nature correctly.',
  },
];

const processSteps = [
  { icon: <HiOutlineSearch size={28} />, title: 'DISCOVERY', description: 'We Begin By Understanding Your Goals, Requirements, And Design Vision.', image: '/images/interior-accent.png' },
  { icon: <FaCube size={24} />, label: 'IDEATION', title: 'CONCEPT DEVELOPMENT', description: '', image: '/images/about-cozy.png' },
  { icon: <HiOutlineLightBulb size={28} />, title: 'DESIGN DEVELOPMENT', description: 'Detailed Drawings, Materials, And Spatial Specifications Are Finalized.', image: '/images/about-architect.png' },
  { icon: <HiOutlineCheckCircle size={28} />, title: 'EXECUTION', description: 'We Guide Implementation To Ensure The Final Result Reflects The Original Design Vision.', image: '/images/project-restaurant.png' },
];

const marqueeItems = [
  'AWARD WINNING DESIGNS',
  '100% CLIENT SATISFACTION',
  '150+ PROJECTS COMPLETED',
  '12+ YEARS EXPERIENCE',
];

const testimonial = {
  stars: 5,
  title: 'A Game-Changing Experience for My Growth',
  text: 'Working with Claryo brought clarity to decisions I had been postponing for months. The structure, insight, and accountability helped me move forward with confidence and measurable progress.',
  name: 'Michael Turner',
  role: 'Founder & Business Consultant',
  image: '/images/office-interior.jpeg',
};

/* ============ COMPONENT ============ */
export default function Home() {
  const revealRefs = useRef([]);
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRevealRef = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <div className="home">
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero__bg">
          <img src="/images/hero-bg.png" alt="Luxury interior" />
          <div className="hero__overlay" />
        </div>
        <div className="hero__content">
          <h1 className="hero__title">
            Where Architecture<br />Meets Experience
          </h1>
          <div className="hero__right">
            <p className="hero__desc">
              Based in Dubai, we design residential and commercial spaces that
              elevate how people live, work, and interact with their environment
            </p>
            <div className="hero__actions">
              <Link to="/projects" className="btn btn-light">VIEW PROJECTS</Link>
              <Link to="/contact" className="btn btn-outline">BOOK CONSULTATION</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== IMAGE GALLERY STRIP ===== */}
      <section className="gallery-strip" ref={addRevealRef}>
        <div className="gallery-strip__inner reveal">
          <div className="gallery-strip__item gallery-strip__item--tall">
            <img src="/images/project-villa.png" alt="Outdoor terrace" />
          </div>
          <div className="gallery-strip__item gallery-strip__item--wide">
            <img src="/images/hero-bg.png" alt="Luxury living room" />
          </div>
          <div className="gallery-strip__item gallery-strip__item--tall">
            <img src="/images/project-minimalist-apt.png" alt="Classic interior" />
          </div>
        </div>
      </section>

      {/* ===== ABOUT / DESIGNING TIMELESS SPACES ===== */}
      <section className="about" id="about">
        <div className="about__inner container">
          <div className="about__left reveal" ref={addRevealRef}>
            <img src="/images/about-cozy.png" alt="Cozy interior" />
          </div>
          <div className="about__center reveal reveal-delay-1" ref={addRevealRef}>
            <h2 className="section-title">DESIGNING TIMELESS<br />SPACES WITH PURPOSE</h2>
            <p className="section-subtitle">
              WE OFFER A COMPLETE RANGE OF ARCHITECTURE AND
              INTERIOR DESIGN SERVICES TAILORED TO CREATE SPACES.
            </p>
          </div>
          <div className="about__right reveal reveal-delay-2" ref={addRevealRef}>
            <img src="/images/about-architect.png" alt="Architect at work" />
          </div>
        </div>
      </section>

      {/* ===== STATS MARQUEE ===== */}
      <section className="marquee">
        <div className="marquee__track">
          {[...Array(3)].map((_, repeat) => (
            <div className="marquee__group" key={repeat}>
              {marqueeItems.map((item, i) => (
                <span className="marquee__item" key={`${repeat}-${i}`}>
                  {item} <span className="marquee__dot">◦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURED PROJECTS ===== */}
      <section className="featured" id="projects">
        <div className="container">
          <div className="reveal" ref={addRevealRef}>
            <h2 className="section-title">FEATURED PROJECTS</h2>
            <p className="section-subtitle">
              A SELECTION OF OUR RECENT ARCHITECTURE AND<br />INTERIOR DESIGN WORK.
            </p>
          </div>

          <div className="featured__grid">
            {projects.map((project, i) => (
              <Link
                to={`/projects/${project.slug}`}
                className={`featured__card reveal reveal-delay-${i + 1}`}
                key={project.slug}
                ref={addRevealRef}
              >
                <div className="featured__card-img">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="featured__card-info">
                  <div>
                    <h3 className="featured__card-title">{project.title}</h3>
                    <p className="featured__card-meta">{project.category}</p>
                    <p className="featured__card-meta">{project.location}</p>
                  </div>
                  <div className="arrow-circle">
                    <HiOutlineArrowUpRight />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="featured__more reveal" ref={addRevealRef}>
            <Link to="/projects" className="featured__more-link">VIEW MORE PROJECTS</Link>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="services" id="services">
        <div className="container">
          <div className="reveal" ref={addRevealRef}>
            <h2 className="section-title">OUR SERVICES</h2>
            <p className="section-subtitle">
              END-TO-END DESIGN SERVICES FROM<br />CONCEPT TO COMPLETION.
            </p>
          </div>

          <div className="services__list">
            {services.map((service, i) => (
              <div
                className={`services__item reveal reveal-delay-${i + 1}`}
                key={service.title}
                ref={addRevealRef}
              >
                <div className="services__item-content">
                  <h3 className="services__item-title">{service.title}</h3>
                  <p className="services__item-desc">{service.description}</p>
                </div>
                <div className="arrow-circle">
                  <HiOutlineArrowUpRight />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROJECT EXPERTISE ===== */}
      <section className="expertise" id="expertise">
        <div className="container">
          <div className="reveal" ref={addRevealRef}>
            <h2 className="section-title">PROJECT EXPERTISE</h2>
            <p className="section-subtitle">
              WE DESIGN SPACES ACROSS RESIDENTIAL AND<br />COMMERCIAL ENVIRONMENTS.
            </p>
          </div>

          <div className="expertise__grid reveal" ref={addRevealRef}>
            <div className="expertise__card">
              <img src="/images/hero-interior-alt.png" alt="Commercial projects" />
              <div className="expertise__card-overlay">
                <span className="expertise__stat">16+</span>
                <span className="expertise__label">COMMERCIAL PROJECTS DONE</span>
                <Link to="/projects" className="btn btn-outline expertise__btn">
                  View Projects <HiOutlineArrowUpRight />
                </Link>
              </div>
            </div>
            <div className="expertise__card">
              <img src="/images/project-retail.png" alt="Residential projects" />
              <div className="expertise__card-overlay">
                <span className="expertise__stat">40+</span>
                <span className="expertise__label">RESIDENTIAL PROJECTS DONE</span>
                <Link to="/projects" className="btn btn-outline expertise__btn">
                  View Projects <HiOutlineArrowUpRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DESIGN PROCESS ===== */}
      <section className="process" id="process">
        <div className="container">
          <div className="reveal" ref={addRevealRef}>
            <h2 className="section-title">OUR DESIGN PROCESS</h2>
            <p className="section-subtitle">
              A STRUCTURED APPROACH TO BRINGING YOUR VISION TO LIFE.
            </p>
          </div>

          <div className="process__grid">
            {processSteps.map((step, i) => (
              <div
                className={`process__card reveal reveal-delay-${i + 1}`}
                key={step.title}
                ref={addRevealRef}
              >
                <img src={step.image} alt={step.title} className="process__card-bg" />
                <div className="process__card-overlay" />
                <div className="process__card-content">
                  <div className="process__card-icon">{step.icon}</div>
                  {step.label && <span className="process__card-label">{step.label}</span>}
                  <h3 className="process__card-title">{step.title}</h3>
                  {step.description && (
                    <p className="process__card-desc">{step.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="testimonials">
        <div className="container">
          <div className="reveal" ref={addRevealRef}>
            <h2 className="section-title">WHAT OUR CLIENTS SAY</h2>
            <p className="section-subtitle">
              REAL EXPERIENCES FROM CLIENTS WHO TRUSTED US<br />WITH THEIR SPACES.
            </p>
          </div>

          <div className="testimonials__content reveal" ref={addRevealRef}>
            <div className="testimonials__image">
              <img src={testimonial.image} alt="Client testimonial" />
            </div>
            <div className="testimonials__text">
              <div className="testimonials__stars">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <FaStar key={i} className="testimonials__star" />
                ))}
              </div>
              <h3 className="testimonials__title">{testimonial.title}</h3>
              <p className="testimonials__body">{testimonial.text}</p>
              <div className="testimonials__author">
                <p className="testimonials__name">{testimonial.name}</p>
                <p className="testimonials__role">{testimonial.role}</p>
              </div>
              <div className="testimonials__avatars">
                <div className="testimonials__avatar active">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Michael" />
                </div>
                <div className="testimonials__avatar">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah" />
                </div>
                <div className="testimonials__avatar">
                  <img src="https://randomuser.me/api/portraits/men/65.jpg" alt="Robert" />
                </div>
                <div className="testimonials__avatar">
                  <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="James" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== QUOTE CTA ===== */}
      <section className="quote-cta reveal" ref={addRevealRef}>
        <div className="quote-cta__bg">
          <img src="/images/project-serenity-villa.png" alt="Architecture landscape" />
          <div className="quote-cta__overlay" />
        </div>
        <div className="quote-cta__content container">
          <blockquote className="quote-cta__text">
            "Architecture should speak of its time and place, but yearn for timelessness."
          </blockquote>
          <p className="quote-cta__author">— Frank Gehry</p>
          <div className="quote-cta__actions">
            <Link to="/projects" className="btn btn-light">VIEW PROJECTS</Link>
            <Link to="/contact" className="btn btn-outline">BOOK CONSULTATION</Link>
          </div>
        </div>
      </section>

      {/* ===== CONTACT FORM ===== */}
      <section className="contact-section" id="contact">
        <div className="container">
          <div className="contact-section__inner reveal" ref={addRevealRef}>
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
