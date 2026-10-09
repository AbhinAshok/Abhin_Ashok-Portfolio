import { useEffect, useState } from "react";
import Rocket from "../images/Rocket.png";
import "../styles/experience.css";

const API_URL = "http://127.0.0.1:8000/api/portfolio/";

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch portfolio data: ${response.status}`
          );
        }

        const data = await response.json();

        console.log("Portfolio API response:", data);
        console.log("Experience data:", data.experience);

        // Your Django API uses "experience" as the key
        const experienceData = Array.isArray(data.experience)
          ? data.experience
          : [];

        // Sort according to Django sort_order
        const sortedExperiences = [...experienceData].sort(
          (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)
        );

        setExperiences(sortedExperiences);
      } catch (err) {
        console.error("Error fetching experience:", err);

        setError(
          "Unable to load experience data. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  const getIcon = (experience) => {
    const title = (experience.title || "").toLowerCase();

    if (
      title.includes("b.sc") ||
      title.includes("bsc") ||
      title.includes("m.sc") ||
      title.includes("msc") ||
      title.includes("education") ||
      title.includes("university") ||
      title.includes("college")
    ) {
      return "🎓";
    }

    return "💼";
  };

  return (
    <section className="experience-section" id="experience">

      {/* Background image */}
      <div
        className="experience-background"
        aria-hidden="true"
      >
        <img
          src={Rocket}
          alt=""
        />
      </div>

      {/* Dark/cyan overlay */}
      <div
        className="experience-background-overlay"
        aria-hidden="true"
      />

      <div className="experience-content">

        {/* Section Heading */}
        <div className="section-heading">
          <span>MY JOURNEY</span>

          <h2>
            Work <strong>Experience</strong>
          </h2>
        </div>

        {/* Loading */}
        {loading && (
          <div className="experience-status">
            <p>Loading experience...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="experience-status experience-error">
            <p>{error}</p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && experiences.length === 0 && (
          <div className="experience-status">
            <p>No experience records found.</p>
          </div>
        )}

        {/* Experience Timeline */}
        {!loading && !error && experiences.length > 0 && (
          <div className="experience-timeline">

            {experiences.map((experience, index) => (
              <article
                className="experience-item"
                key={experience.id || index}
                style={{
                  "--delay": `${index * 0.15}s`,
                }}
              >

                {/* Icon */}
                <div className="experience-icon">
                  {getIcon(experience)}
                </div>

                {/* Experience Details */}
                <div className="experience-details">

                  {/* Title + Period */}
                  <div className="experience-top">

                    <h3>
                      {experience.title}
                    </h3>

                    <span className="experience-period">
                      {experience.period}
                    </span>

                  </div>

                  {/* Company / University */}
                  <h4>
                    {experience.company}
                  </h4>

                  {/* Description */}
                  {experience.description && (
                    <p>
                      {experience.description}
                    </p>
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