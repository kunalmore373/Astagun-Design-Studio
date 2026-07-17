import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineArrowUpRight } from 'react-icons/hi2';
import { HiOutlineLightBulb, HiOutlineCheckCircle, HiOutlineSearch, HiOutlineCube } from 'react-icons/hi';
import { FaCube, FaStar } from 'react-icons/fa';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import './Home.css';
import heroBg from "../../assets/images/heropage.png"
import ScrollFloat from '../../components/ui/ScrollFloat';

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
    image: '/images/architecture.avif'
  },
  {
    title: 'Interior Design',
    description: 'Creating refined interiors through thoughtful materials, lighting, and spatial composition.',
    image: '/images/interiordesign.avif'
  },
  {
    title: 'Renovation & Remodeling',
    description: 'Transforming outdated spaces into modern and carefully designed environments.',
    image: '/images/renovation_remodeling.avif'
  },
  {
    title: '3D Visualization',
    description: 'High-quality visualizations that help clients clearly understand the design before construction begins.',
    image: '/images/3d_visualization_new.avif'
  },
  {
    title: 'Space Planning',
    description: 'Optimizing layouts to improve functionality, circulation, and spatial flow.',
    image: '/images/spaceplanning.avif'
  },
  {
    title: 'Construction Consultation',
    description: 'Providing expert guidance and oversight throughout the construction phase to ensure design integrity and quality.',
    image: '/images/construction_consultation_new.avif'
  },
];

const processSteps = [
  { icon: <HiOutlineSearch size={32} />, title: 'DISCOVERY', description: 'We Begin By Understanding Your Goals, Requirements, And Design Vision.', image: '/images/process_discovery.png', topText: 'RESEARCH' },
  { icon: <HiOutlineCube size={32} />, title: 'CONCEPT DEVELOPMENT', description: 'Our Team Develops Layouts, Ideas, And Creative Design Directions.', image: '/images/process_concept.png', topText: 'IDEATION' },
  { icon: <HiOutlineLightBulb size={32} />, title: 'DESIGN DEVELOPMENT', description: 'Detailed Drawings, Materials, And Spatial Specifications Are Finalized.', image: '/images/process_design.png', topText: 'PLANNING' },
  { icon: <HiOutlineCheckCircle size={32} />, title: 'EXECUTION', description: 'We Guide Implementation To Ensure The Final Result Reflects The Original Design Vision.', image: '/images/process_execution.png', topText: 'IMPLEMENTATION' },
];

const marqueeItems = [
  'AWARD WINNING DESIGNS',
  '100% CLIENT SATISFACTION',
  '150+ PROJECTS COMPLETED',
  '12+ YEARS EXPERIENCE',
];

const testimonials = [
  {
    stars: 5,
    title: 'A Game-Changing Experience for My Growth',
    text: 'Working with Claryo brought clarity to decisions I had been postponing for months. The structure, insight, and accountability helped me move forward with confidence and measurable progress.',
    name: 'Michael Turner',
    role: 'Founder & Business Consultant',
    image: 'https://framerusercontent.com/images/4QlpZiXimbb7JDI7ANpAM5YpmKQ.jpg?width=1091&height=1500',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    stars: 5,
    title: 'Exceptional Attention to Detail',
    text: 'The team transformed our vision into a stunning reality. Every aspect of the design was thoughtfully considered and flawlessly executed.',
    name: 'Sarah Jenkins',
    role: 'Creative Director',
    image: 'https://framerusercontent.com/images/uCxt73fPvlnB5kTHTnBcmT5QU.jpg?width=1200&height=1697',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    stars: 5,
    title: 'Professional and Innovative Approach',
    text: 'Their innovative approach to space planning and aesthetics truly sets them apart. We couldn’t be happier with our new commercial space.',
    name: 'Robert Fox',
    role: 'CEO, TechFlow',
    image: 'https://framerusercontent.com/images/Tiy88ptZ4kvNSlnLyVldp6Utxw.jpg?width=960&height=1200',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg'
  },
  {
    stars: 5,
    title: 'Outstanding Quality and Service',
    text: 'From the initial concept to the final execution, the process was seamless and the results exceeded all our expectations.',
    name: 'James Wilson',
    role: 'Property Developer',
    image: 'https://framerusercontent.com/images/n4fA1Gh2IeJfQ9h8PxBtVUt4LI.jpg?width=1080&height=1620',
    avatar: 'https://randomuser.me/api/portraits/men/85.jpg'
  }
];

/* ============ COMPONENT ============ */
export default function Home() {
  const revealRefs = useRef([]);
  const heroContainerRef = useRef(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const { scrollYProgress } = useScroll({
    target: heroContainerRef,
    offset: ["start start", "end end"]
  });

  // Animation values mapped to scroll progress
  // Text + overlay: use state-based hiding (bulletproof)
  const [heroTextHidden, setHeroTextHidden] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setHeroTextHidden(latest > 0.05);
  });

  // Main hero image: starts with padding (calc) and rounded corners, shrinks to centered rectangle
  const mainWidth = useTransform(scrollYProgress, [0.1, 0.6], ["calc(100vw - 40px)", "50vw"]);
  const mainHeight = useTransform(scrollYProgress, [0.1, 0.6], ["calc(100vh - 100px)", "60vh"]);
  const mainRadius = useTransform(scrollYProgress, [0.1, 0.6], ["24px", "16px"]);
  const mainBlur = useTransform(scrollYProgress, [0.1, 0.6], ["blur(0px)", "blur(8px)"]);

  // Side images slide in naturally via Flexbox as the mainWidth shrinks

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
      {/* ===== HERO SCROLL CONTAINER ===== */}
      <section className="hero-scroll-container" ref={heroContainerRef}>
        <div className="hero-sticky">

          {/* Left Sliding Image */}
          <motion.div
            className="hero__side-img hero__side-img--left"
          >
            <img src="/images/hero_left.avif" alt="Modern interior" />
          </motion.div>

          {/* Main Hero Background (shrinks and centers) */}
          <motion.div
            className="hero__bg"
            style={{
              width: mainWidth,
              height: mainHeight,
              borderRadius: mainRadius
            }}
          >
            <motion.img src={heroBg} alt="Luxury interior" style={{ filter: mainBlur }} />
            <div className={`hero__overlay ${heroTextHidden ? 'hero__content--hidden' : ''}`} />

            {/* Hero Content (fades out) */}
            <div className={`hero__content ${heroTextHidden ? 'hero__content--hidden' : ''}`}>
              <h1 className="hero__title">
                Where Architecture<br />Meets Experience
              </h1>
              <div className="hero__right">
                <p className="hero__desc">
                  Based in Pune, we design residential and commercial spaces that
                  elevate how people live, work, and interact with their environment
                </p>
                <div className="hero__actions">
                  <Link to="/projects" className="btn btn-light">VIEW PROJECTS</Link>
                  <Link to="/contact" className="btn btn-outline">BOOK CONSULTATION</Link>
                </div>
              </div>
            </div>

            <div className={`hero__line ${heroTextHidden ? 'hero__content--hidden' : ''}`} />
          </motion.div>

          {/* Right Sliding Image */}
          <motion.div
            className="hero__side-img hero__side-img--right"
          >
            <img src="/images/hero_right.avif" alt="Classic interior" />
          </motion.div>

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
            <img src="/images/about_left.avif" alt="Cozy interior" />
          </div>
          <div className="about__center reveal reveal-delay-1" ref={addRevealRef}>
            <ScrollFloat
              containerClassName="section-title"
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
            >
              DESIGNING TIMELESS SPACES WITH PURPOSE
            </ScrollFloat>
            <p className="section-subtitle">
              WE OFFER A COMPLETE RANGE OF ARCHITECTURE AND
              INTERIOR DESIGN SERVICES TAILORED TO CREATE SPACES.
            </p>
          </div>
          <div className="about__right reveal reveal-delay-2" ref={addRevealRef}>
            <img src="/images/about_right.avif" alt="Architect at work" />
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
                  {item} <span className="marquee__dot"></span>
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
            <ScrollFloat
              containerClassName="section-title"
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
            >
              FEATURED PROJECTS
            </ScrollFloat>
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
            <ScrollFloat
              containerClassName="section-title"
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
            >
              OUR SERVICES
            </ScrollFloat>
            <ScrollFloat
              containerClassName="section-subtitle"
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
            >
              END-TO-END DESIGN SERVICES FROM<br />CONCEPT TO COMPLETION.
            </ScrollFloat>
          </div>

          <div className="services__list">
            {services.map((service, i) => (
              <div
                className={`services__item reveal reveal-delay-${i + 1}`}
                key={service.title}
                ref={addRevealRef}
              >
                <div className="services__item-hover-img">
                  <img src={service.image} alt={service.title} />
                </div>
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
            <ScrollFloat
              containerClassName="section-title"
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
            >
              PROJECT EXPERTISE
            </ScrollFloat>
            <ScrollFloat
              containerClassName="section-subtitle"
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
            >
              WE DESIGN SPACES ACROSS RESIDENTIAL AND<br />COMMERCIAL ENVIRONMENTS.
            </ScrollFloat>
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
            <ScrollFloat
              containerClassName="section-title"
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
            >
              CLEAR DESIGN PROCESS
            </ScrollFloat>
            <ScrollFloat
              containerClassName="section-subtitle"
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
            >
              A COLLABORATIVE APPROACH FROM CONCEPT TO COMPLETION.
            </ScrollFloat>
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
                
                {/* Initial state visual elements */}
                <div className="process__card-grid" />
                <div className="process__card-circle" />
                <span className="process__card-number">0{i + 1}</span>
                <span className="process__card-toptext">{step.topText}</span>

                <div className="process__card-icon">{step.icon}</div>
                <div className="process__card-content">
                  <h3 className="process__card-title">{step.title}</h3>
                  <div className="process__card-desc-wrapper">
                    <p className="process__card-desc">{step.description}</p>
                  </div>
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
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeTestimonial}
                  src={testimonials[activeTestimonial].image} 
                  alt="Client testimonial" 
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </AnimatePresence>
            </div>
            <div className="testimonials__text">
              <div className="testimonials__stars">
                {[...Array(testimonials[activeTestimonial].stars)].map((_, i) => (
                  <FaStar key={i} className="testimonials__star" />
                ))}
              </div>
              <h3 className="testimonials__title">{testimonials[activeTestimonial].title}</h3>
              <p className="testimonials__body">{testimonials[activeTestimonial].text}</p>
              <div className="testimonials__author">
                <p className="testimonials__name">{testimonials[activeTestimonial].name}</p>
                <p className="testimonials__role">{testimonials[activeTestimonial].role}</p>
              </div>
              <div className="testimonials__avatars">
                {testimonials.map((testi, i) => (
                  <div 
                    key={i} 
                    className={`testimonials__avatar ${i === activeTestimonial ? 'active' : ''}`}
                    onClick={() => setActiveTestimonial(i)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img src={testi.avatar} alt={testi.name} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== QUOTE CTA ===== */}
      <section className="quote-cta reveal" ref={addRevealRef}>
        <div className="container">
          <div className="quote-cta__inner">
            <div className="quote-cta__bg">
              <img src="/images/project-serenity-villa.png" alt="Architecture landscape" />
              <div className="quote-cta__overlay" />
            </div>
            
            <div className="quote-cta__content">
              <div className="quote-cta__top-left">
                <blockquote className="quote-cta__text">
                  "ARCHITECTURE SHOULD SPEAK OF ITS TIME AND PLACE, BUT YEARN FOR TIMELESSNESS."
                </blockquote>
                <p className="quote-cta__author">FRANK GEHRY</p>
              </div>
              
              <div className="quote-cta__bottom-right">
                <div className="quote-cta__actions">
                  <Link to="/projects" className="btn btn-glass">VIEW PROJECTS</Link>
                  <Link to="/contact" className="btn btn-light">BOOK CONSULTATION</Link>
                </div>
              </div>
            </div>
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
