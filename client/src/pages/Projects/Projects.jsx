import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineArrowUpRight } from 'react-icons/hi2';
import './Projects.css';

const allProjects = [
  {
    title: 'CORPORATE OFFICE SPACE',
    category: 'Commercial',
    location: 'NEW YORK, 2026',
    image: '/images/office-interior.jpeg',
    slug: 'corporate-office-space',
  },
  {
    title: 'SERENITY VILLA',
    category: 'Residential',
    location: 'DUBAI, 2025',
    image: '/images/project-serenity-villa.png',
    slug: 'serenity-villa',
  },
  {
    title: 'MINIMALIST APARTMENT INTERIOR',
    category: 'Residential',
    location: 'LONDON, 2025',
    image: '/images/project-minimalist-apt.png',
    slug: 'minimalist-apartment',
  },
  {
    title: 'LUXURY PENTHOUSE',
    category: 'Residential',
    location: 'TOKYO, 2025',
    image: '/images/project-penthouse.png',
    slug: 'luxury-penthouse',
  },
  {
    title: 'BOUTIQUE RETAIL',
    category: 'Commercial',
    location: 'PARIS, 2024',
    image: '/images/project-retail.png',
    slug: 'boutique-retail',
  },
  {
    title: 'FINE DINING RESTAURANT',
    category: 'Commercial',
    location: 'ROME, 2024',
    image: '/images/project-restaurant.png',
    slug: 'fine-dining',
  }
];

export default function Projects() {
  const [filter, setFilter] = useState('All');

  const filteredProjects = filter === 'All' 
    ? allProjects 
    : allProjects.filter(p => p.category === filter);

  return (
    <div className="projects-page">
      <div className="projects-page__hero">
        <div className="projects-page__hero-bg">
          <img src="/images/project-villa.png" alt="Projects Hero" />
          <div className="projects-page__hero-overlay" />
        </div>
        <div className="container projects-page__hero-content">
          <h1 className="projects-page__title">PROJECT PORTFOLIO</h1>
        </div>
      </div>

      <div className="projects-page__content container">
        <div className="projects-page__filters">
          <button 
            className={`projects-page__filter-btn ${filter === 'All' ? 'active' : ''}`}
            onClick={() => setFilter('All')}
          >
            ALL
          </button>
          <button 
            className={`projects-page__filter-btn ${filter === 'Residential' ? 'active' : ''}`}
            onClick={() => setFilter('Residential')}
          >
            RESIDENTIAL
          </button>
          <button 
            className={`projects-page__filter-btn ${filter === 'Commercial' ? 'active' : ''}`}
            onClick={() => setFilter('Commercial')}
          >
            COMMERCIAL
          </button>
        </div>

        <div className="featured__grid">
          {filteredProjects.map((project, i) => (
            <Link
              to={`/projects/${project.slug}`}
              className={`featured__card`}
              key={project.slug}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="featured__card-img">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="featured__card-info">
                <div>
                  <h3 className="featured__card-title">{project.title}</h3>
                  <p className="featured__card-meta">{project.category} ARCHITECTURE</p>
                  <p className="featured__card-meta">{project.location}</p>
                </div>
                <div className="arrow-circle">
                  <HiOutlineArrowUpRight />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
