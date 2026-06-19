"use client";

import { useEffect, useMemo, useState } from "react";
import { introSections, projects } from "@/data/projects";

function PortSection({ section, nextId }) {
  return (
    <section className="port-section image-section" id={section.id} aria-label={section.id}>
      <img className="figma-frame" src={section.image} alt={section.alt} />
      {nextId ? (
        <a className="scroll-cue" href={`#${nextId}`} aria-label={`Go to ${nextId}`}>
          Enter
        </a>
      ) : null}
    </section>
  );
}

function GameOption({ project, isActive, onSelect }) {
  return (
    <button
      className={`game-option ${isActive ? "is-active" : ""}`}
      type="button"
      onClick={() => onSelect(project)}
      aria-pressed={isActive}
    >
      <span className="option-arrow" aria-hidden="true">
        &gt;
      </span>
      <span>
        {project.menuLabel}
        {project.studio ? <small>{project.studio}</small> : null}
      </span>
    </button>
  );
}

function TVFrame({ activeId, onSelect }) {
  return (
    <div className="tv-frame" aria-label="Game portfolio projects">
      <div className="tv-glass">
        <p className="screen-kicker">SELECT PROJECT</p>
        <h2>MAIN MENU</h2>
        <div className="game-options">
          {projects.map((project) => (
            <GameOption
              key={project.id}
              project={project}
              isActive={activeId === project.id}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
      <div className="tv-neck" />
      <div className="tv-base" />
    </div>
  );
}

function GameSelectionSection({ activeId, onSelect }) {
  return (
    <section className="port-section game-selection" id="port3" aria-labelledby="port3-title">
      <div className="room-light room-light-left" />
      <div className="room-light room-light-right" />
      <div className="desk-glow" />
      <div className="orb-lamp" />
      <div className="lava-lamp" />
      <div className="port3-copy">
        <p>Interactive Showcase</p>
        <h1 id="port3-title">Choose a game</h1>
      </div>
      <TVFrame activeId={activeId} onSelect={onSelect} />
    </section>
  );
}

function SlideControls({ currentIndex, total, onPrevious, onNext }) {
  return (
    <>
      <button className="slide-arrow slide-arrow-left" type="button" onClick={onPrevious} aria-label="Previous slide">
        <span aria-hidden="true">&#8249;</span>
      </button>
      <button className="slide-arrow slide-arrow-right" type="button" onClick={onNext} aria-label="Next slide">
        <span aria-hidden="true">&#8250;</span>
      </button>
      <p className="slide-count" aria-live="polite">
        {currentIndex + 1} / {total}
      </p>
    </>
  );
}

function GameSlideshow({ project, slideIndex, setSlideIndex }) {
  const total = project.slides.length;
  const previous = () => setSlideIndex((index) => (index - 1 + total) % total);
  const next = () => setSlideIndex((index) => (index + 1) % total);

  return (
    <div className="slideshow-mode">
      <div className="slide-stage">
        <img
          key={project.slides[slideIndex]}
          className="slide-image"
          src={project.slides[slideIndex]}
          alt={`${project.title} presentation slide ${slideIndex + 1}`}
        />
        <SlideControls currentIndex={slideIndex} total={total} onPrevious={previous} onNext={next} />
      </div>
    </div>
  );
}

function GameDetails({ project, onPlay }) {
  return (
    <article className={`game-details accent-${project.accent}`}>
      <div className="detail-art">
        <img src={project.preview} alt={`${project.title} preview artwork`} />
      </div>
      <div className="detail-copy">
        <p className="detail-studio">{project.studio}</p>
        <h2 id="game-modal-title">{project.title}</h2>
        <p>{project.summary}</p>
        <dl>
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Slides</dt>
            <dd>{project.slides.length} exported frames</dd>
          </div>
        </dl>
        <button className="play-button" type="button" onClick={onPlay}>
          Play
        </button>
      </div>
    </article>
  );
}

function GameModal({ project, mode, slideIndex, setSlideIndex, onPlay, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (mode === "slideshow" && event.key === "ArrowLeft") {
        setSlideIndex((index) => (index - 1 + project.slides.length) % project.slides.length);
      }
      if (mode === "slideshow" && event.key === "ArrowRight") {
        setSlideIndex((index) => (index + 1) % project.slides.length);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mode, onClose, project.slides.length, setSlideIndex]);

  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, []);

  return (
    <div className="modal-shell" role="presentation">
      <button className="modal-backdrop" type="button" onClick={onClose} aria-label="Close project modal" />
      <section className="game-modal" role="dialog" aria-modal="true" aria-labelledby="game-modal-title">
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close project modal">
          x
        </button>
        {mode === "slideshow" ? (
          <GameSlideshow project={project} slideIndex={slideIndex} setSlideIndex={setSlideIndex} />
        ) : (
          <GameDetails project={project} onPlay={onPlay} />
        )}
      </section>
    </div>
  );
}

export default function PortfolioExperience() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [mode, setMode] = useState("details");
  const [slideIndex, setSlideIndex] = useState(0);

  const activeId = selectedProject?.id ?? projects[0].id;
  const sections = useMemo(() => introSections, []);

  const openProject = (project) => {
    setSelectedProject(project);
    setMode("details");
    setSlideIndex(0);
  };

  const closeProject = () => {
    setSelectedProject(null);
    setMode("details");
    setSlideIndex(0);
  };

  return (
    <main className="portfolio-app">
      <PortSection section={sections[0]} nextId="port2" />
      <PortSection section={sections[1]} nextId="port3" />
      <GameSelectionSection activeId={activeId} onSelect={openProject} />
      {selectedProject ? (
        <GameModal
          project={selectedProject}
          mode={mode}
          slideIndex={slideIndex}
          setSlideIndex={setSlideIndex}
          onPlay={() => setMode("slideshow")}
          onClose={closeProject}
        />
      ) : null}
    </main>
  );
}
