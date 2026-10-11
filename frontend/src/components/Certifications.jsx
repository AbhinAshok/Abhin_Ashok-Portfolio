
import { useEffect, useState } from "react";
import { FiAward, FiCalendar } from "react-icons/fi";
import "../styles/certifications.css";

const API_ORIGIN = (
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV
    ? "http://127.0.0.1:8000"
    : "https://abhin.pythonanywhere.com")
)
  .replace(/\/+$/, "")
  .replace(/\/api$/, "");

const API_URL = `${API_ORIGIN}/api/portfolio/`;

const getImageUrl = (imageUrl) => {
  if (!imageUrl) return "";

  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl;
  }

  return `https://abhin.pythonanywhere.com/${imageUrl.replace(/^\/+/, "")}`;
};

export default function Certifications() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchCertifications = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch certifications: ${response.status}`
          );
        }

        const data = await response.json();
        const items = Array.isArray(data.certificate)
          ? data.certificate
          : [];

        items.sort(
          (a, b) =>
            (a.display_order ?? 0) - (b.display_order ?? 0)
        );

        if (!cancelled) {
          setCertifications(items);
        }
      } catch (err) {
        console.error("Certification API error:", err);

        if (!cancelled) {
          setError("Unable to load certifications. Please try again later.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchCertifications();

    return () => {
      cancelled = true;
    };
  }, []);

  const formatDate = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <section id="certifications" className="certifications-section">
        <div className="certifications-container">
          <div className="certifications-loading">
            <div className="certification-loader" />
            <p>Loading certifications...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="certifications" className="certifications-section">
        <div className="certifications-container">
          <div className="certifications-error">
            <FiAward />
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="certifications" className="certifications-section">
      <div className="certifications-stars" aria-hidden="true" />
      <div
        className="certifications-glow certifications-glow-one"
        aria-hidden="true"
      />
      <div
        className="certifications-glow certifications-glow-two"
        aria-hidden="true"
      />

      <div className="certifications-container">
        <div className="section-heading certifications-heading">
          <span className="section-label">CERTIFICATIONS</span>

          <h2 className="section-title">
            Learning. Building.{" "}
            <span className="gradient-text">Growing.</span>
          </h2>

          <p className="section-description">
            Professional certifications and continuous learning that
            strengthen my technical skills.
          </p>
        </div>

        {certifications.length === 0 ? (
          <div className="certifications-empty">
            <FiAward />
            <p>No certifications available yet.</p>
          </div>
        ) : (
          <div className="certifications-grid">
            {certifications.map((certification, index) => {
              const imageUrl = getImageUrl(
                certification.certificate_image
              );

              return (
                <article
                  className="certification-card"
                  key={certification.id || index}
                  style={{ "--card-delay": `${index * 100}ms` }}
                >
                  <div
                    className="certificate-card-glow"
                    aria-hidden="true"
                  />

                  <div className="certificate-icon-wrapper">
                    <div className="certificate-icon">
                      <FiAward />
                    </div>

                    <span className="certificate-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {imageUrl && (
                    <div className="certificate-image-wrapper">
                      <img
                        src={imageUrl}
                        alt={`${certification.title} certificate`}
                        className="certificate-image"
                        loading="eager"
                        onLoad={(event) => {
                          console.log(
                            "Certificate loaded:",
                            event.currentTarget.currentSrc
                          );
                        }}
                        onError={(event) => {
                          console.error(
                            "Certificate image failed:",
                            event.currentTarget.currentSrc
                          );
                        }}
                      />
                      <p style={{ color: "#22d3ee", overflowWrap: "anywhere", fontSize: 11 }}>
                        {getImageUrl(certification.certificate_image)}
                      </p>
                    </div>
                  )}

                  <div className="certificate-content">
                    <span className="certificate-issuer">
                      {certification.issuer}
                    </span>

                    <h3 className="certificate-title">
                      {certification.title}
                    </h3>

                    {certification.description && (
                      <p className="certificate-description">
                        {certification.description}
                      </p>
                    )}

                    {certification.issue_date && (
                      <div className="certificate-date">
                        <FiCalendar />
                        <span>
                          {formatDate(certification.issue_date)}
                        </span>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
