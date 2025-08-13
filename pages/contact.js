import Head from 'next/head';
import Navigation from '../components/Navigation';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact | MNouk</title>
        <meta name="description" content="Get in touch with Mehdi Noukra" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navigation />

      <main className="container">
        <header className="header">
          <h1>Contact</h1>
          <p className="subtitle">
            Let's work together on something amazing.
          </p>
        </header>

        <div className="contact-content">
          <section className="contact-section">
            <h2>Get In Touch</h2>
            <p>
              I'm always interested in new opportunities and exciting projects.
              Whether you have a question, want to collaborate, or just want to say hello,
              feel free to reach out.
            </p>
          </section>

          <section className="contact-section">
            <h2>Connect</h2>
            <div className="contact-grid">
              <div className="contact-item">
                <h3>Email</h3>
                <a href="mailto:hello@example.com" className="contact-link">
                  hello@example.com
                </a>
              </div>
              <div className="contact-item">
                <h3>GitHub</h3>
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="contact-link">
                  github.com/yourusername
                </a>
              </div>
              <div className="contact-item">
                <h3>LinkedIn</h3>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="contact-link">
                  linkedin.com/in/yourusername
                </a>
              </div>
              <div className="contact-item">
                <h3>Twitter</h3>
                <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="contact-link">
                  @yourusername
                </a>
              </div>
            </div>
          </section>

          <section className="contact-section">
            <h2>Availability</h2>
            <p>
              I'm currently available for freelance work and interesting full-time opportunities.
              I'm particularly interested in projects that involve modern web technologies,
              user experience design, and solving complex problems.
            </p>
          </section>
        </div>

        <footer className="footer">
          <p>
            Built with Next.js • Let's build something great together
          </p>
        </footer>
      </main>
    </>
  );
}
