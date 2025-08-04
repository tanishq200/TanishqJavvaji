"use client"; // Add this directive for client-side interactivity in Next.js App Router

import React, { useState, useEffect, useRef } from 'react';
import { Shield, Mail, Linkedin, Github, Briefcase, Code, Star, Cpu, Database, GitBranch, Award, BrainCircuit, Cloud, ShieldCheck } from 'lucide-react';

// --- BACKGROUND COMPONENT ---
const CyberBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[];
    let animationFrameId: number;

    const setup = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas, ctx));
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Connect particles
      for (const a of particles) {
        for (const b of particles) {
          if (a !== b) {
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
              ctx.strokeStyle = `rgba(0, 255, 255, ${1 - distance / 120})`; // Cyan color
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    
    setup();
    animate();

    const handleResize = () => {
        cancelAnimationFrame(animationFrameId);
        setup();
        animate();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 bg-black" />;
};

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 1;
    this.speedX = (Math.random() * 2 - 1) * 0.5;
    this.speedY = (Math.random() * 2 - 1) * 0.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > this.canvas.width || this.x < 0) this.speedX *= -1;
    if (this.y > this.canvas.height || this.y < 0) this.speedY *= -1;
  }

  draw() {
    this.ctx.fillStyle = 'rgba(0, 255, 255, 0.8)'; // Cyan color
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
  }
}


// --- PORTFOLIO COMPONENTS ---

// Define Prop Types for Components
interface NavLinkProps {
  section: string;
  children: React.ReactNode;
}

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  skills: string[];
}

interface ExperienceItemProps {
  title: string;
  company: string;
  date: string;
  description: string;
}

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

interface CertificationCardProps {
  title: string;
  issuer: string;
}


// Main App Component
const App = () => {
  const [activeSection, setActiveSection] = useState('home');

  // Smooth scroll for navigation links
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth'
        });
    }
  };

  // Effect to update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'projects', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2.5;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(sectionId);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation Link Component
  const NavLink = ({ section, children }: NavLinkProps) => (
    <a
      href={`#${section}`}
      onClick={(e) => handleNavClick(e, section)}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
        activeSection === section
          ? 'text-cyan-400 bg-gray-700'
          : 'text-gray-300 hover:text-white hover:bg-gray-800'
      }`}
    >
      {children}
    </a>
  );

  return (
    <div className="relative z-0 bg-transparent text-gray-100 font-sans leading-relaxed selection:bg-cyan-500 selection:text-black">
      <CyberBackground />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md shadow-lg shadow-black/20">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="text-2xl font-bold text-white flex items-center group">
            <Shield className="mr-3 text-cyan-400 group-hover:animate-pulse" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400">Tanishq Javvaji</span>
          </a>
          <div className="hidden md:flex items-center space-x-2">
            <NavLink section="home">Home</NavLink>
            <NavLink section="about">About</NavLink>
            <NavLink section="skills">Skills</NavLink>
            <NavLink section="experience">Experience</NavLink>
            <NavLink section="projects">Projects</NavLink>
            <NavLink section="certifications">Certs</NavLink>
            <NavLink section="contact">Contact</NavLink>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 pt-24 relative z-10">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center">
          <div className="w-full">
            <p className="text-lg text-cyan-400 mb-2 font-mono">Hi, my name is</p>
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-4">
              Tanishq Javvaji.
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-400 mb-8">
              I build and defend digital fortresses.
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-3xl">
              Cybersecurity Engineer with 3+ years of experience in incident response, threat detection, and application security. I specialize in automating security workflows and securing cloud environments.
            </p>
            <a
              href="#projects"
              onClick={(e) => handleNavClick(e, 'projects')}
              className="bg-cyan-500 text-white font-bold py-4 px-8 rounded-lg hover:bg-cyan-600 transition-all duration-300 text-lg inline-block shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transform hover:-translate-y-1"
            >
              View My Work
            </a>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24">
            <h2 className="text-3xl font-bold text-center mb-12 text-white flex items-center justify-center"><Briefcase className="mr-3 text-cyan-400"/>About Me</h2>
            <div className="max-w-4xl mx-auto bg-gray-800/50 rounded-xl shadow-2xl p-8 md:p-12 border border-gray-700 backdrop-blur-sm">
                <p className="text-lg text-gray-300 mb-4">
                    As a Cybersecurity Engineer with over three years of hands-on experience, I&apos;ve developed a deep expertise in incident response, threat detection, GRC, and application security. I excel at managing cross-platform endpoint investigations and optimizing SIEM detections using tools like Splunk, Elastic Security, and Cortex XSOAR.
                </p>
                <p className="text-lg text-gray-300">
                    My background includes performing comprehensive security audits (SAST, DAST, VAPT), ensuring compliance with frameworks like NIST and CIS, and securing cloud-native environments. I am passionate about mentoring teams, authoring detection rules, and applying frameworks like MITRE ATT&CK to continuously improve security posture.
                </p>
            </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24">
          <h2 className="text-3xl font-bold text-center mb-12 text-white flex items-center justify-center"><Star className="mr-3 text-cyan-400"/>Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SkillCard icon={<BrainCircuit className="text-cyan-400"/>} title="Threat Hunting & IR" skills={['SIEM (Splunk, Sentinel)', 'EDR (Cortex, Velociraptor)', 'Malware Analysis', 'Forensics', 'YARA/Sigma']} />
            <SkillCard icon={<Cloud className="text-cyan-400"/>} title="Cloud & Network Security" skills={['AWS (GuardDuty, WAF, EC2)', 'Azure', 'Firewall Management', 'Wireshark/TCPDump', 'Terraform']} />
            <SkillCard icon={<Code className="text-cyan-400"/>} title="AppSec & Scripting" skills={['Python', 'Bash', 'PowerShell', 'SAST/DAST', 'Secure CI/CD', 'Container Security']} />
            <SkillCard icon={<ShieldCheck className="text-cyan-400"/>} title="GRC & Frameworks" skills={['NIST', 'CIS', 'ISO 27001', 'MITRE ATT&CK', 'HIPAA/GDPR/SOX', 'Vulnerability Management']} />
            <SkillCard icon={<Cpu className="text-cyan-400"/>} title="OS & Access Management" skills={['Windows', 'Linux', 'macOS', 'Active Directory', 'LDAP', 'ServiceNow']} />
            <SkillCard icon={<Database className="text-cyan-400"/>} title="SOC & Security Tools" skills={['Elastic Stack', 'Cuckoo Sandbox', 'MISP', 'JumpCloud', 'Qualys/Tenable']} />
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24">
          <h2 className="text-3xl font-bold text-center mb-16 text-white flex items-center justify-center"><Briefcase className="mr-3 text-cyan-400"/>Where I&apos;ve Worked</h2>
          <div className="max-w-4xl mx-auto">
            <ExperienceItem
              title="Cyber Security Engineer"
              company="University of Maryland"
              date="Apr 2023 - Present"
              description="Led incident response across diverse endpoints, achieving a 98% containment rate. Optimized SIEM detections in Splunk and Elastic, reducing false positives by over 30 alerts weekly, and automated IR playbooks with Cortex XSOAR to cut response times by 40%."
            />
            <ExperienceItem
              title="GRC Analyst"
              company="Cyvergence.ai"
              date="Mar 2023 - Jun 2023"
              description="Conducted NIST 800-53 and CIS assessments to identify over 50 security gaps, ensuring 100% compliance. Enhanced user access management efficiency by 30% through a JumpCloud directory migration, significantly reducing unauthorized access incidents."
            />
            <ExperienceItem
              title="Associate Security Consultant"
              company="Candour Global Risk Services"
              date="Jan 2021 - Aug 2022"
              description="Executed security audits (SCA, SAST, DAST, VAPT) and mitigated over 90 CVEs. Secured 200+ containers, streamlined CI/CD vulnerability scanning pipelines, and developed custom Python scripts for improved vulnerability prioritization and analysis."
            />
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24">
            <h2 className="text-3xl font-bold text-center mb-12 text-white flex items-center justify-center"><GitBranch className="mr-3 text-cyan-400"/>Personal Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ProjectCard
                    title="Secure Cloud Migration"
                    description="Migrated a web app to AWS, implementing robust security with IAM, GuardDuty, and WAF. Automated deployments using Terraform for infrastructure-as-code."
                    tags={['AWS', 'Terraform', 'IAM', 'GuardDuty', 'WAF']}
                    link="https://github.com/tanishq200/Secure-Cloud-Migration-of-Web-Application"
                />
                <ProjectCard
                    title="Multi-Cloud Attack Lab"
                    description="Built a multi-cloud lab on GCP and Azure with Terraform to simulate attacks. Used Suricata, Zeek, Splunk, and Sentinel for comprehensive threat analysis."
                    tags={['GCP', 'Azure', 'Terraform', 'SIEM', 'Threat Intel']}
                    link="https://github.com/tanishq200/multicloud-incident-response-lab"
                />
                <ProjectCard
                    title="Scalable Pastebin App"
                    description="Developed a microservices-based Pastebin app using Spring Boot & Next.js. Deployed on AWS with ECS, S3, and RDS for high availability and scalability."
                    tags={['Microservices', 'Spring Boot', 'Next.js', 'AWS ECS']}
                    link="https://github.com/tanishq200/backend"
                />
            </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="py-24">
            <h2 className="text-3xl font-bold text-center mb-12 text-white flex items-center justify-center"><Award className="mr-3 text-cyan-400"/>Certifications</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                <CertificationCard title="SANS GCIH" issuer="GIAC" />
                <CertificationCard title="CEH" issuer="EC-Council" />
                <CertificationCard title="Security+" issuer="CompTIA" />
                <CertificationCard title="eJPT" issuer="eLearnSecurity" />
            </div>
        </section>


        {/* Contact Section */}
        <section id="contact" className="py-24 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Get In Touch</h2>
          <p className="text-gray-300 mb-8 text-lg max-w-xl mx-auto">I&apos;m actively seeking new opportunities and would love to discuss how my skills can benefit your team. Please feel free to reach out.</p>
          <div className="flex justify-center items-center space-x-8">
            <a href="mailto:tanishqjavvaji@gmail.com" className="group flex items-center text-cyan-400 hover:text-white transition duration-300 text-xl">
              <Mail className="mr-3 transform group-hover:-translate-y-1 transition-transform"/> tanishqjavvaji@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/tanishq-javvaji/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300 transform hover:scale-110">
              <Linkedin size={32}/>
            </a>
            <a href="https://github.com/tanishq200" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300 transform hover:scale-110">
              <Github size={32}/>
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 border-t border-gray-800/50 relative z-10">
        <p className="text-gray-500">&copy; {new Date().getFullYear()} Tanishq Javvaji. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

// Helper Components
const SkillCard = ({ icon, title, skills }: SkillCardProps) => (
  <div className="bg-gray-800/60 p-6 rounded-lg shadow-lg border border-gray-700/50 hover:border-cyan-500/50 hover:shadow-cyan-500/10 hover:-translate-y-2 transition-all duration-300 backdrop-blur-sm">
    <div className="flex items-center mb-4">
      <div className="p-2 bg-black/50 rounded-full">{icon}</div>
      <h3 className="text-xl font-bold ml-4 text-white">{title}</h3>
    </div>
    <ul className="space-y-2 text-gray-300">
      {skills.map((skill, index) => <li key={index} className="flex items-center"><ShieldCheck size={16} className="mr-2 text-cyan-600"/>{skill}</li>)}
    </ul>
  </div>
);

const ExperienceItem = ({ title, company, date, description }: ExperienceItemProps) => (
  <div className="relative pl-8 sm:pl-12 py-6 group">
      <div className="absolute left-0 top-6 h-full w-0.5 bg-gray-700"></div>
      <div className="absolute left-[-9px] top-6 h-5 w-5 rounded-full bg-cyan-500 border-4 border-black group-hover:bg-cyan-400 transition-colors duration-300 group-hover:scale-125"></div>
      <p className="text-sm text-cyan-400 mb-1">{date}</p>
      <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
      <p className="text-lg text-gray-400 mb-2">{company}</p>
      <p className="text-gray-300">{description}</p>
  </div>
);

const ProjectCard = ({ title, description, tags, link }: ProjectCardProps) => (
    <div className="bg-gray-800/60 rounded-lg shadow-lg overflow-hidden border border-gray-700/50 transform hover:-translate-y-2 transition-all duration-300 group hover:shadow-cyan-500/10 hover:border-cyan-500/50 backdrop-blur-sm">
        <div className="p-6 flex flex-col h-full">
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">{title}</h3>
            <p className="text-gray-300 mb-4 flex-grow">{description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, index) => (
                    <span key={index} className="bg-gray-700 text-cyan-400 text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>
                ))}
            </div>
            <a href={link} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-white font-semibold transition-colors duration-300 mt-auto">
                View Project on GitHub &rarr;
            </a>
        </div>
    </div>
);

const CertificationCard = ({ title, issuer }: CertificationCardProps) => (
    <div className="text-center p-4 bg-gray-800/60 rounded-lg shadow-lg border border-gray-700/50 hover:border-cyan-500/50 hover:shadow-cyan-500/10 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm">
        <h4 className="font-bold text-white text-lg">{title}</h4>
        <p className="text-sm text-cyan-400">{issuer}</p>
    </div>
);


export default App;
