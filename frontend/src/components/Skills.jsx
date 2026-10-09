import Reveal from "./Reveal";
import SkillIcon from "./SkillIcon";

export default function Skills({ skills = [] }) {
  return (
    <section className="section-pad section-alt" id="skills">
      <div className="container">

        <Reveal className="section-heading centered">
          <span className="eyebrow">
            02 / My expertise
          </span>

          <h2 className="section-title">
            Skills &{" "}
            <span className="gradient-text">
              Technologies.
            </span>
          </h2>

          <p>
            Tools I use to design, build, test and ship
            practical products.
          </p>
        </Reveal>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <Reveal
              key={skill.id || skill.name}
              delay={index * 30}
            >
              <article className="glass-panel skill-card">

                <div className="skill-top">

                  <div className="skill-icon">
                    <SkillIcon
                      name={skill.icon || skill.name}
                      size={21}
                    />
                  </div>

                  <span>{skill.name}</span>

                </div>

                <div className="progress-track">
                  <div
                    className="progress-value"
                    style={{
                      width: `${skill.proficiency}%`,
                    }}
                  />
                </div>

                <div className="skill-meta">
                  <span>{skill.category}</span>

                  <strong>
                    {skill.proficiency}%
                  </strong>
                </div>

              </article>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}