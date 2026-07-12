import { useParams, Link } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import './ProjectDetail.css';

const projectData = {
  'corporate-office-space': {
    title: 'CORPORATE OFFICE SPACE',
    category: 'COMMERCIAL ARCHITECTURE',
    location: 'NEW YORK, 2026',
    description: 'A modern, sustainable corporate headquarters designed to foster collaboration and well-being. The space features open-plan work areas, private focus rooms, and extensive use of natural light and biophilic design elements.',
    image: '/images/office-interior.jpeg',
    gallery: ['/images/office-interior.jpeg', '/images/interior-accent.png']
  },
  'serenity-villa': {
    title: 'SERENITY VILLA',
    category: 'RESIDENTIAL ARCHITECTURE',
    location: 'DUBAI, 2025',
    description: 'A luxurious private residence blending contemporary design with traditional Mediterranean influences. Featuring expansive outdoor living spaces, infinity pool, and custom natural stone finishes throughout.',
    image: '/images/project-serenity-villa.png',
    gallery: ['/images/project-serenity-villa.png', '/images/about-cozy.png']
  }
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projectData[slug] || projectData['serenity-villa']; // Fallback for demo

  return (
    <div className="project-detail">
      <div className="project-detail__hero">
        <img src={project.image} alt={project.title} className="project-detail__hero-img" />
        <div className="project-detail__hero-overlay" />
      </div>

      <div className="container project-detail__content">
        <Link to="/projects" className="project-detail__back">
          <HiOutlineArrowLeft /> Back to Projects
        </Link>
        
        <div className="project-detail__header">
          <h1 className="project-detail__title">{project.title}</h1>
          <div className="project-detail__meta">
            <span>{project.category}</span>
            <span className="dot">•</span>
            <span>{project.location}</span>
          </div>
        </div>

        <div className="project-detail__body">
          <div className="project-detail__text">
            <h2>About The Project</h2>
            <p>{project.description}</p>
          </div>
          
          <div className="project-detail__gallery">
            {project.gallery.map((img, i) => (
              <div key={i} className="project-detail__gallery-item">
                <img src={img} alt={`${project.title} gallery ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
