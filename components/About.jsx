'use client';

import { useState } from 'react';
import Reveal from './Reveal';
import { motion } from 'framer-motion';

export default function About() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="about" id="aboutme">
      <Reveal origin="top"><h2 className="heading">About<span> Me</span></h2></Reveal>
      <Reveal origin="bottom" className="about-img">
        <img src="portfolio.png" alt="Profile" />
      </Reveal>
      <Reveal origin="right" className="about-content">
        <h3>Student</h3>
        <motion.p 
          className={`expandable-paragraph ${isExpanded ? 'expanded' : ''}`}
          initial={false}
          animate={{ height: isExpanded ? "auto" : "3.2rem" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ overflow: "hidden", maxHeight: "none", textAlign: "justify", lineHeight: "1.8" }}
        >
          During my time as a DevOps Engineer intern at Codinix, I gained valuable experience in the automation
          and deployment of software applications. I also had the opportunity to work on projects related to
          machine learning. These experiences solidified my interest in these fields and their potential to
          revolutionize the world.
          <br /><br />
          I am particularly fascinated by the potential of quantum computing to solve problems that are
          intractable for classical computers. I believe that quantum computing has the potential to lead to major
          breakthroughs in fields such as medicine, materials science, and artificial intelligence machine learning.
          <br /><br />
          I am also interested in the field of machine learning. I believe that machine learning has the potential
          to automate many tasks that are currently performed by humans. I am particularly interested in the
          development of machine learning algorithms that can learn from small amounts of data.
          <br /><br />
          In addition to my interest in quantum computing and machine learning, I am also interested in the
          development of autonomous VLSI technologies. I believe that autonomous VLSI technologies have the
          potential to revolutionize the way that electronic devices are designed and manufactured.
          <br /><br />
          I am excited to be a part of the generation that is developing these new technologies. I believe that
          these technologies have the potential to make a positive impact on the world.
        </motion.p>
        <div className="btn-box btns">
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); setIsExpanded(!isExpanded); }} 
            className={`btn read-more ${isExpanded ? 'expanded' : ''}`}>
            {isExpanded ? 'Read Less' : 'Read More'}
          </a>
        </div>
      </Reveal>
    </section>
  );
}