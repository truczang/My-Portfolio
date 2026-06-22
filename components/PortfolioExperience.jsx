"use client";

import { useEffect, useMemo, useState } from "react";
import RetroMenu from "@/components/RetroMenu";
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

function GameSelectionSection({ onSelect }) {
  const handleItemClick = (item) => {
    const project = projects.find((candidate) => candidate.id === item.projectId);
    if (project) onSelect(project);
  };

  return (
    <section className="port-section game-selection" id="port3" aria-labelledby="port3-title">
      <h1 className="sr-only" id="port3-title">MAIN MENU</h1>
      <RetroMenu onItemClick={handleItemClick} />
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

function getSlideKey(slide) {
  return typeof slide === "string" ? slide : `${slide.type}-${slide.id}`;
}

function SlideContent({ project, slide, slideIndex }) {
  if (typeof slide === "string") {
    return (
      <img
        key={slide}
        className="slide-image"
        src={slide}
        alt={`${project.title} presentation slide ${slideIndex + 1}`}
      />
    );
  }

  if (slide.type === "youtube") {
    return (
      <div className="video-slide" key={getSlideKey(slide)}>
        <div className="video-copy">
          <p>{project.studio}</p>
          <h2>{project.title}</h2>
          <a href={slide.url} target="_blank" rel="noreferrer">
            Open on YouTube
          </a>
        </div>
        <div className="video-frame">
          <iframe
            src={slide.embedUrl}
            title={slide.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  return null;
}

function GameSlideshow({ project, slideIndex, setSlideIndex }) {
  const total = project.slides.length;
  const activeSlide = project.slides[slideIndex];
  const previous = () => setSlideIndex((index) => (index - 1 + total) % total);
  const next = () => setSlideIndex((index) => (index + 1) % total);

  return (
    <div className="slideshow-mode">
      <div className="slide-stage">
        <SlideContent project={project} slide={activeSlide} slideIndex={slideIndex} />
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

  const sections = useMemo(() => introSections, []);

  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const frame = window.requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

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
      <GameSelectionSection onSelect={openProject} />
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
