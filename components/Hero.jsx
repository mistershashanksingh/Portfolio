'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '../providers/ThemeProvider';
import Reveal from './Reveal';

export default function Hero() {
  const { isDarkMode } = useTheme();
  const [typedText, setTypedText] = useState('');
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const words = ["Freelancer", "Open Source Contrib."];
    let wordIndex = 0; let charIndex = 0; let isDeleting = false; let timer;
    const typeEffect = () => {
      const currentWord = words[wordIndex];
      setTypedText(currentWord.substring(0, charIndex));
      setIsBlinking(true);
      if (!isDeleting && charIndex < currentWord.length) {
        charIndex++; timer = setTimeout(typeEffect, 100);
      } else if (isDeleting && charIndex > 0) {
        charIndex--; timer = setTimeout(typeEffect, 50);
      } else {
        isDeleting = !isDeleting; setIsBlinking(false);
        wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
        timer = setTimeout(typeEffect, 800);
      }
    };
    typeEffect();
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="home" id="home">
      <Reveal origin="top" className="home-content">
        <h4>Hey Folks! I&apos;m</h4>
        <Reveal origin="left"><h2>Shas<span>hank</span> Singh</h2></Reveal>
        <div className="container">
          <span className="first">What I do </span>
          <span className={`second ${!isBlinking ? 'stop-blinking' : ''}`}>{typedText}</span>
        </div>
        <p className="headpara">
          I have completed my PG degree in MCA with specializing in machine learning. As interested in machine learning and machine learning operations. I am eager to learn new and complex technologies, and I work to expand my professional and technical skills.
        </p>
        <div className="social-media">
          <a href="https://linkedin.com/in/mistershashanksingh"><i className="fa-brands fa-linkedin-in"></i></a>
          <a href="https://instagram.com/mistershashanksingh"><i className="fa-brands fa-instagram"></i></a>
          <a href="https://twitter.com/mistershashanks"><i className="fa-brands fa-x-twitter"></i></a>
          <a href="https://github.com/mistershashanksingh"><i className="fa-brands fa-github"></i></a>
          <a href="https://threads.net/@mistershashanksingh"><i className="fa-brands fa-threads"></i></a>
          <a href="https://gitlab.com/mistershashanksingh"><i className="fa-brands fa-gitlab"></i></a>
          <a href="https://dev.to/mistershashanksingh"><i className='bx bxl-dev-to'></i></a>
        </div>
        <div className="btn-box">
          <a href="https://drive.google.com/file/d/1fIxmodG6WK_mk3c_7mexV2Yl-FFPtxf0/view?usp=sharing" download="MyResume.pdf" className="btn">Download CV</a>
          <a href="mailto:mistershashanksingh@gmail.com" className="btn">Hire Me</a>
        </div>
      </Reveal>
      <Reveal origin="bottom" className="home-img">
        <img src={isDarkMode ? "/developer.svg" : "/developer-dark.svg"} alt="developer" />
      </Reveal>
    </section>
  );
}