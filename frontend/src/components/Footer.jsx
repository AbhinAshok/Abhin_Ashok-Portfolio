import {
  ArrowUp,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Instagram,
  Code2,
} from "lucide-react";
import { useEffect, useState } from "react";
import astroLaptop from "../images/astro-laptop.png";
import "../styles/footer.css";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/",
    Icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    Icon: Linkedin,
  },
  {
    label: "Email",
    href: "mailto:abhinashok2021@outlook.com",
    Icon: Mail,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/_p_i_c_z__world_/?hl=en",
    Icon: Instagram,
  },
  
];

export default function Footer() {
  const [showTopButton, setShowTopButton] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const onScroll = () => setShowTopButton(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer" id="footer">
      {/* Separate background zones: animated space on the left, artwork on the right */}
      <div className="footer-bg-art" aria-hidden="true">
        <div className="footer-planet-area">
          <div className="planet-scene">
            <div className="nebula nebula-one" />
            <div className="nebula nebula-two" />

            <div className="planet-orbit orbit-one">
              <span className="orbit-moon moon-one" />
            </div>
            <div className="planet-orbit orbit-two">
              <span className="orbit-moon moon-two" />
            </div>
            <div className="planet-orbit orbit-three">
              <span className="orbit-moon moon-three" />
            </div>

            <div className="planet planet-main">
              <span className="planet-glint" />
            </div>
            <div className="planet planet-small" />
            <div className="planet planet-purple" />
            <div className="planet planet-ringed" />

            {Array.from({ length: 12 }, (_, index) => (
              <span
                key={index}
                className={`space-star star-${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="footer-image-area">
          <img className="footer-background-image" src={astroLaptop} alt="" />
          <div className="footer-image-fade" />
        </div>
      </div>

      <div className="footer-overlay" aria-hidden="true" />

      <div className="footer-container">
        <div className="footer-brand">
          <a
            href="#home"
            className="footer-brand-link"
            aria-label="Abhin Ashok — back to home"
          >
            <span className="footer-logo" aria-hidden="true">
              <Code2 size={23} strokeWidth={2.2} />
            </span>
            <span className="footer-brand-name">
              <strong>
                Abhin <span>Ashok</span>
              </strong>
              <small>Software Developer</small>
            </span>
          </a>

          <p className="footer-description">
            Building practical web applications and reliable APIs with
            thoughtful design and clean code.
          </p>

          <a href="#contact" className="footer-contact-link">
            Let&apos;s build something
            <ArrowUpRight size={16} />
          </a>
          <br /><br />
          <h2 className="footer-heading">Let&apos;s build the future together</h2>
        </div>

        

        <div className="footer-column footer-connect">
          <h4>Let&apos;s connect</h4>
          <br />
          

          <div className="footer-social-links">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                className="footer-social-link"
                aria-label={label}
                title={label}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
              >
                <Icon size={18} strokeWidth={1.8} />
              </a>
            ))}
          </div>
          <br />
          <nav className="footer-column" aria-label="Footer navigation">
          <h4>Explore</h4>
          <div className="footer-link-list">
            {quickLinks.map((link) => (
              <a key={link.href} href={link.href}>
                <span className="footer-link-dot" />
                {link.label}
              </a>
            ))}
          </div>
        </nav>

          {/* <a
            href="mailto:abhinashok2021@outlook.com"
            className="footer-email"
          >
            abhinashok2021@outlook.com
          </a> */}
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} Abhin Ashok. All rights reserved.</p>
        
        <button
          type="button"
          className={`footer-top-btn ${showTopButton ? "is-visible" : ""}`}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </footer>
  );
}
