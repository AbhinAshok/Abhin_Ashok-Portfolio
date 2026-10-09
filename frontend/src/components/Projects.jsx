
import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import Reveal from './Reveal'

const categories = ['All', 'Django', 'API', 'Web Application']

export default function Projects({ projects = [] }) {
  const [category, setCategory] = useState('All')

  const visible = useMemo(
    () =>
      category === 'All'
        ? projects
        : projects.filter((project) => project.category === category),
    [category, projects]
  )

  return (
    <section className="section-pad" id="projects">
      <div className="container">
        <div className="projects-heading-row">
          <Reveal className="section-heading">
            <span className="eyebrow">03 / Featured work</span>
            <h2 className="section-title">
              Some things I've <span className="gradient-text">built.</span>
            </h2>
            <p>
              Selected projects that show how I approach product, API and
              backend engineering.
            </p>
          </Reveal>

          <Reveal className="filter-row" delay={100}>
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={category === item ? 'filter active' : 'filter'}
              >
                {item}
              </button>
            ))}
          </Reveal>
        </div>

        <div className="project-grid">
          {visible.map((project, index) => (
            <Reveal
              key={project.id || project.slug}
              delay={index * 60}
            >
              <article
                className={`project - card ${
  project.demo_url ? 'project-card-clickable' : ''
} `}
              >
                {/* Clickable image, title, description and technology tags */}
                {project.demo_url ? (
                  <a
                    className="project-card-main"
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${ project.title } live website`}
                  >
                    <div className="project-media">
                      {project.image_url ? (
                        <img
                          src={project.image_url}
                          alt={`${ project.title } preview`}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      ) : null}

                      <div className="project-media-glow" />
                      <span className="project-number">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="project-body">
                      <div className="project-title-row">
                        <h3>{project.title}</h3>
                        <span>{project.category}</span>
                      </div>

                      <p>{project.description}</p>

                      <div className="tag-row">
                        {(project.technologies || []).map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </a>
                ) : (
                  <>
                    <div className="project-media">
                      {project.image_url ? (
                        <img
                          src={project.image_url}
                          alt={`${ project.title } preview`}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      ) : null}

                      <div className="project-media-glow" />
                      <span className="project-number">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="project-body">
                      <div className="project-title-row">
                        <h3>{project.title}</h3>
                        <span>{project.category}</span>
                      </div>

                      <p>{project.description}</p>

                      <div className="tag-row">
                        {(project.technologies || []).map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Separate demo and GitHub actions */}
                <div className="project-actions">
                  {project.demo_url ? (
                    <a
                      href={project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live demo <ExternalLink size={15} />
                    </a>
                  ) : (
                    <span className="muted-action">Live demo</span>
                  )}

                  {project.github_url ? (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub <Github size={15} />
                    </a>
                  ) : (
                    <span className="muted-action">GitHub</span>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="center-cta">
          <a href="#contact" className="button button-ghost">
            Have a project in mind? <ArrowRight size={17} />
          </a>
        </div>
      </div>
    </section>
  )
}
