'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '../providers/ThemeProvider';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { isDarkMode, setIsDarkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
      setIsMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-150px 0px -150px 0px' });

    const sections = document.querySelectorAll('section');
    sections.forEach(sec => observer.observe(sec));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach(sec => observer.unobserve(sec));
    };
  }, []);

  return (
    <header className={`header ${isSticky ? 'sticky' : ''}`}>
      <a href="#" className="logo">Per<span>sonal </span> Inform<span>ation</span></a>
      <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
        {['home', 'aboutme', 'education', 'certification', 'skills', 'contact'].map((sec) => (
          <a key={sec} href={`#${sec}`} className={activeSection === sec ? 'active' : ''} onClick={() => setIsMenuOpen(false)}>{sec === 'aboutme' ? 'About Me' : sec.charAt(0).toUpperCase() + sec.slice(1)}</a>
        ))}
      </nav>
      <div className={`bx ${isDarkMode ? 'bx-sun' : 'bx-moon'}`} id="darkMode-icon" onClick={() => setIsDarkMode(!isDarkMode)}></div>
      <div className={`bx ${isMenuOpen ? 'bx-x' : 'bx-menu-alt-right'}`} id="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}></div>
    </header>
  );
}