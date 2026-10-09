import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-bg-art">
        <img
          src="src/images/astro-laptop.png"
          alt=""
          aria-hidden="true"
        />
      </div>

      <div className="footer-planet" aria-hidden="true">
        <div className="planet-glow"></div>
        <div className="planet-core"></div>

        <div className="planet-orbit orbit-one">
          <span className="planet-satellite satellite-one"></span>
        </div>

        <div className="planet-orbit orbit-two">
          <span className="planet-satellite satellite-two"></span>
        </div>
      </div>

      <div className="footer-overlay"></div>

      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <span>A</span>
          </div>

          <div className="footer-brand-name">
            <h3>Abhin Ashok</h3>
            <p>Python Django Developer</p>
          </div>

          <p className="footer-description">
            Building digital solutions that make a difference.
          </p>

          <p className="footer-description">
            Let&apos;s create something amazing together.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h4>Quick Links</h4>

          <nav>
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>

        {/* Services */}
        <div className="footer-column">
          <h4>Services</h4>

          <nav>
            <a href="#skills">Backend Development</a>
            <a href="#skills">REST API Development</a>
            <a href="#skills">Database Design</a>
            <a href="#skills">Web Application</a>
            <a href="#skills">Problem Solving</a>
          </nav>
        </div>

        {/* Connect */}
        <div className="footer-column">
          <h4>Connect</h4>

          <nav className="footer-social-links">
            <a
              href="https://github.com/AbhinAshok"
              target="_blank"
              rel="noreferrer"
            >
              <span className="social-icon">◉</span>
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
            >
              <span className="social-icon">in</span>
              LinkedIn
            </a>

            <a href="#">
              <span className="social-icon">◎</span>
              Instagram
            </a>

            <a href="mailto:abhinashok.dev@gmail.com">
              <span className="social-icon">✉</span>
              Email
            </a>
          </nav>
        </div>

        {/* Right CTA */}
        <div className="footer-cta">

          <div className="footer-cta-content">
            <span>LET&apos;S CREATE</span>
            <h3>
              The Future
              <br />
              Together
            </h3>
          </div>



        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">

        <p >
          © 2024 Abhin Ashok. All rights reserved.
        </p>



        <button
          className="footer-top-btn"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          aria-label="Back to top"
        >
          ↑
        </button>

      </div>

    </footer>
  );
}