import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-left">
          <Link href="/" className="nav-logo">
            <span className="logo-text">
              <span className="logo-emphasis">M</span>ehdi <span className="logo-emphasis">Nouk</span>ra
            </span>
          </Link>

          <div className="nav-tabs">
            <Link href="/" className="nav-link">
              Projects
            </Link>
            <Link href="/demo" className="nav-link">
              Demo
            </Link>
            <Link href="/about" className="nav-link">
              About
            </Link>
            <Link href="/contact" className="nav-link">
              Contact
            </Link>
          </div>
        </div>

        <div className="nav-right">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
