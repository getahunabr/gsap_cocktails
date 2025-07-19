import React, { useRef, useState } from "react";
import { sliderLists } from "../../constance";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
const Menu = () => {
  // Ref for targeting DOM elements during animation
  const contentRef = useRef();

  const [currentIndex, setCurrentIndex] = useState(0);
  // Get total number of cocktails in the list
  const totalCocktail = sliderLists.length;
  // Changes the current cocktail index safely (loops back around at start/end)
  const goToSlide = (index) => {
    const newIndex = (index + totalCocktail) % totalCocktail;
    setCurrentIndex(newIndex);
  };
  // Helper to get cocktail relative to the current one (e.g., previous or next)
  const getCocktailAt = (indexOffSet) => {
    return sliderLists[
      (currentIndex + indexOffSet + totalCocktail) % totalCocktail
    ];
  };
  const currentCocktail = getCocktailAt(0);
  const prevCocktail = getCocktailAt(-1);
  const nextCocktail = getCocktailAt(1);

  useGSAP(() => {
    // Fade in the cocktail name
    gsap.fromTo("#title", { opacity: 0 }, { opacity: 1, duration: 1 });
    // Slide in the cocktail image from the left and fade it in
    gsap.fromTo(
      ".cocktail img",
      { opacity: 0, xPercent: -100 },
      { xPercent: 0, duration: 1, opacity: 1, ease: "power1.out" }
    );
    // Animate the title and description sliding up and fading in
    gsap.fromTo(
      ".details h2",
      { opacity: 0, yPercent: 100 },
      { yPercent: 0, opacity: 100, ease: "power1.out" }
    );
    gsap.fromTo(
      ".details p",
      { opacity: 0, yPercent: 100 },
      { yPercent: 0, opacity: 100, ease: "power1.out" }
    );
  }, [currentCocktail]);
  return (
    <section id="menu" aria-labelledby="menu-heading">
      <img
        src="/images/slider-left-leaf.png"
        alt="left-leaf"
        id="m-left-leaf"
      />
      <img
        src="/images/slider-right-leaf.png"
        alt="right-leaf"
        id="m-right-leaf"
      />
      <h2 id="menu-heading" className="sr-only">
        Cocktail Menu
      </h2>
      <nav className="cocktail-tabs" aria-label="Cocktail Navigation">
        {sliderLists.map((cocktail, index) => {
          const isActive = index === currentIndex;

          return (
            <button
              key={cocktail.id}
              className={`${
                isActive
                  ? "text-white border-white"
                  : "text-white/50 border-white/50"
              }`}
              onClick={() => goToSlide(index)}
            >
              {cocktail.name}
            </button>
          );
        })}
      </nav>
      <div className="content">
        <div className="arrows">
          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex - 1)}
          >
            <span>{prevCocktail.name}</span>
            <img
              src="/images/right-arrow.png"
              alt="right-arrow"
              aria-hidden="true"
            />
          </button>
          <button
            className="text-left"
            onClick={() => goToSlide(currentIndex + 1)}
          >
            <span>{nextCocktail.name}</span>
            <img
              src="/images/left-arrow.png"
              alt="left-arrow"
              aria-hidden="true"
            />
          </button>
        </div>
        <div className="cocktail">
          <img src={currentCocktail.image} alt="" className="object-contain" />
        </div>
        <div className="recipe">
          <div ref={contentRef} className="info">
            <p>Recipe for:</p>
            <p id="title">{currentCocktail.name}</p>
          </div>
          <div className="details">
            <h2>{currentCocktail.title}</h2>
            <p>{currentCocktail.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
