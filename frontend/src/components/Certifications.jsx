import { useEffect, useState } from "react";
import { FiAward, FiCalendar } from "react-icons/fi";
import "../styles/certifications.css";

const API_URL = "http://127.0.0.1:8000/api/portfolio/";

export default function Certifications() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
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

        console.log("Portfolio API response:", data);
        console.log("Certification data:", data.certificate);

        /*
         * Django PortfolioView returns:
         *
         * {
         *   profile: {...},
         *   skills: [...],
         *   projects: [...],
         *   experience: [...],
         *   certificate: [...]
         * }
         */

        const certificationData = Array.isArray(data.certificate)
          ? data.certificate
          : [];

        // Sort by display order from Django
        const sortedCertifications = [...certificationData].sort(
          (a, b) =>
            (a.display_order ?? 0) - (b.display_order ?? 0)
        );

        setCertifications(sortedCertifications);
      } catch (err) {
        console.error("Certification API error:", err);

        setError(
          "Unable to load certifications. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
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

  /*
   * Handle certificate image URL.
   *
   * If Django returns:
   * /media/certificates/example.jpg
   *
   * this converts it to:
   * http://127.0.0.1:8000/media/certificates/example.jpg
   */
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return "";

    if (
      imageUrl.startsWith("http://") ||
      imageUrl.startsWith("https://")
    ) {
      return imageUrl;
    }

    return `http://127.0.0.1:8000${imageUrl}`;
  };

  if (loading) {
    return (
      <section
        id="certifications"
        className="certifications-section"
      >
        <div className="certifications-container">
          <div className="certifications-loading">
            <div className="certification-loader"></div>
            <p>Loading certifications...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="certifications"
        className="certifications-section"
      >
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
    <section
      id="certifications"
      className="certifications-section"
    >
      {/* Background effects */}
      <div
        className="certifications-stars"
        aria-hidden="true"
      />

      <div
        className="certifications-glow certifications-glow-one"
        aria-hidden="true"
      />

      <div
        className="certifications-glow certifications-glow-two"
        aria-hidden="true"
      />

      <div className="certifications-container">

        {/* Section heading */}
        <div className="section-heading certifications-heading">

          <span className="section-label">
            CERTIFICATIONS
          </span>

          <h2 className="section-title">
            Learning. Building.{" "}
            <span className="gradient-text">
              Growing.
            </span>
          </h2>

          <p className="section-description">
            Professional certifications and continuous
            learning that strengthen my technical skills.
          </p>

        </div>

        {/* Empty state */}
        {certifications.length === 0 ? (
          <div className="certifications-empty">
            <FiAward />
            <p>No certifications available yet.</p>
          </div>
        ) : (
          <div className="certifications-grid">

            {certifications.map((certification, index) => (
              <article
                className="certification-card"
                key={certification.id || index}
                style={{
                  "--card-delay": `${index * 100}ms`,
                }}
              >

                {/* Decorative glow */}
                <div
                  className="certificate-card-glow"
                  aria-hidden="true"
                />

                {/* Certificate icon */}
                <div className="certificate-icon-wrapper">

                  <div className="certificate-icon">
                    <FiAward />
                  </div>

                  <span className="certificate-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                </div>

                {/* Certificate image */}
                {certification.certificate_image && (
                  <div className="certificate-image-wrapper">
                    <img
                      src={getImageUrl(
                        certification.certificate_image
                      )}
                      alt={`${certification.title} certificate`}
                      className="certificate-image"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="certificate-content">

                  {/* Issuer */}
                  <span className="certificate-issuer">
                    {certification.issuer}
                  </span>

                  {/* Title */}
                  <h3 className="certificate-title">
                    {certification.title}
                  </h3>

                  {/* Description */}
                  {certification.description && (
                    <p className="certificate-description">
                      {certification.description}
                    </p>
                  )}

                  {/* Issue date */}
                  {certification.issue_date && (
                    <div className="certificate-date">
                      <FiCalendar />

                      <span>
                        {formatDate(
                          certification.issue_date
                        )}
                      </span>
                    </div>
                  )}

                </div>

              </article>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}