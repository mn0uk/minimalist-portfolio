import Head from 'next/head';
import Navigation from '../components/Navigation';

export default function About() {
  return (
    <>
      <Head>
        <title>About | MNouk</title>
        <meta name="description" content="About Mehdi Noukra - Developer and Problem Solver" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navigation />

      <main className="container">
        <header className="header">
          <h1>About</h1>
          <p className="subtitle">
            Developer passionate about solving real-world problems through code.
          </p>
        </header>

        <div className="about-content">
          <section className="about-section">
            <h2>Background</h2>
            <p>
              I'm a developer who loves building solutions that make a difference.
              My journey in software development started with a curiosity about how
              things work and has evolved into a passion for creating meaningful applications.
            </p>
          </section>

          <section className="about-section">
            <h2>Skills</h2>
            <div className="skills-grid">
              <div className="skill-category">
                <h3>Frontend</h3>
                <ul>
                  <li>React & Next.js</li>
                  <li>TypeScript</li>
                  <li>CSS & Tailwind</li>
                  <li>Responsive Design</li>
                </ul>
              </div>
              <div className="skill-category">
                <h3>Backend</h3>
                <ul>
                  <li>Node.js</li>
                  <li>Python</li>
                  <li>Databases</li>
                  <li>API Development</li>
                </ul>
              </div>
              <div className="skill-category">
                <h3>Tools</h3>
                <ul>
                  <li>Git & GitHub</li>
                  <li>Docker</li>
                  <li>CI/CD</li>
                  <li>Cloud Platforms</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Approach</h2>
            <p>
              I believe in writing clean, maintainable code and focusing on user experience.
              Every project is an opportunity to learn something new and push the boundaries
              of what's possible with technology.
            </p>
          </section>
        </div>

        <footer className="footer">
          <p>
            Built with Next.js • Always learning, always building
          </p>
        </footer>
      </main>
    </>
  );
}
