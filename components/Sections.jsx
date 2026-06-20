import Reveal from './Reveal';

/* This file exports the Static Server Components to keep routing clean */

export function Education() {
  return (
    <section className="education" id="education">
      <Reveal origin="top"><h2 className="heading">My <span>Journey</span></h2></Reveal>
      <div className="education-row">
        <Reveal origin="right" className="education-column">
          <h3 className="title">Education</h3>
          <div className="education-box">
            <div className="education-content"><div className="content"><div className="year"><i className='bx bxs-calendar'></i>2023 - 2025</div><h3>Master degree - Amity University</h3><p>MCA - Machine Learning</p></div></div>
            <div className="education-content"><div className="content"><div className="year"><i className='bx bxs-calendar'></i>2019 - 2022</div><h3>Bachelor degree - Atal Bihari University</h3><p>BCA - Computer and Information Science</p></div></div>
            <div className="education-content"><div className="content"><div className="year"><i className='bx bxs-calendar'></i>2011 - 2018</div><h3>Secondry and Higher Secondry - Kendriya Vidyalaya</h3><p>High school (Commerce, General) Secondary school (All Subject)</p></div></div>
          </div>
        </Reveal>
        <Reveal origin="right" className="education-column">
          <h3 className="title">Experience</h3>
          <div className="education-box">
            <div className="education-content">
              <div className="content">
                <div className="year"><i className='bx bxs-calendar'></i>2023 Apr - 2023 Aug</div><h3>Devops Engineer Intern - Codinix Consulting</h3>
                <div className="sub_topic">Project:- Multiple mini project on DevOps</div>
                <div className="list"><ul><li>Language - Python, Javascript, Shell(sh)</li><li>Library/API - Terraform, AWS-CDK</li><li>Tools - Git, Kafka, AWS</li></ul></div>
              </div>
            </div>
            <div className="education-content">
              <div className="content">
                <div className="year"><i className='bx bxs-calendar'></i>2022 Jun - 2022 Jul</div><h3>Intern - PW-Skills(i-Neuron)</h3>
                <div className="sub_topic">Project:- Face-Mask reconization System</div>
                <div className="list"><ul><li>Language - Python</li><li>Library/API - TensorFlow, opencv, Keras</li><li>Tools - Git, Streamlit</li></ul></div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Certification() {
  return (
    <section className="certification" id="certification">
      <Reveal origin="top"><h2 className="heading">My <span>Achivements</span></h2></Reveal>
      <div className="certification-border">
        <div className="certification-column">
          <h3 className="title">Certification</h3>
          <div className="certification-box">
            <div className="certification-content"><div className="content"><div className="year"><i className='bx bxs-calendar'></i>Valid</div><h3>Name of certification-101</h3></div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section className="skills" id="skills">
      <Reveal origin="top"><h2 className="heading"><span>My</span> Skills</h2></Reveal>
      <Reveal origin="bottom" className="skills-row">
        <div className="skills-column">
          <h3 className="title">Coding Skills</h3>
          <div className="skills-box">
            <div className="skills-content">
              <div className="progress"><h3>Python <span>50%</span></h3><div className="bar"><span></span></div></div>
              <div className="progress"><h3>Java <span>60%</span></h3><div className="bar"><span></span></div></div>
              <div className="progress"><h3>HTML/CSS <span>70%</span></h3><div className="bar"><span></span></div></div>
              <div className="progress"><h3>Bash-Script <span>50%</span></h3><div className="bar"><span></span></div></div>
            </div>
          </div>
        </div>
        <div className="skills-column">
          <h3 className="title">Tools/Profession Skills</h3>
          <div className="skills-box">
            <div className="skills-content">
              <div className="progress"><h3>Git <span>60%</span></h3><div className="bar"><span></span></div></div>
              <div className="progress"><h3>Vim and Visual Studio code<span>80%</span></h3><div className="bar"><span></span></div></div>
              <div className="progress"><h3>Terraform <span>40%</span></h3><div className="bar"><span></span></div></div>
              <div className="progress"><h3>Kafka <span>20%</span></h3><div className="bar"><span></span></div></div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}


export function Footer() {
  return (
    <Reveal origin="top">
      <footer className="footer">
        <div className="footer-text">
          <p>Copyright &copy; 2026 by mistershashanksingh | All right Reserved.</p>
        </div>
        <div className="footer-iconTop">
          <a href="#"><i className='bx bx-up-arrow-alt'></i></a>
        </div>
      </footer>
    </Reveal>
  );
}