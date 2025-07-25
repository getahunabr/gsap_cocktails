import React from "react";
import { openingHours, socials } from "../../constance";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { gsap } from "gsap";
const Contact = () => {
  useGSAP(() => {
    // Split the heading text into individual words for animation
    const titleSplit = SplitText.create("#contact h2", { type: "words" });
    // Create a timeline with scroll-triggered animations
    const timeline = gsap.timeline({
      scrollTrigger: {
        // Trigger animation when the footer enters the viewport
        trigger: "#contact",
        // Start animation when the top of the section hits the center of the screen
        start: "top center",
      },
      ease: "power1.out",
    });
    // Animate each word of the heading (fade in and slide up)
    timeline
      .from(titleSplit.words, {
        opacity: 0,
        yPercent: 100,
        stagger: 0.02,
      })
      // Animate all subheadings and paragraphs below the main heading
      .from("#contact h3, #contact p", {
        opacity: 0,
        yPercent: 100,
        stagger: 0.02,
      })
      // Animate decorative leaves by moving them up
      .to("#f-right-leaf", { y: -50, duration: 1, ease: "power1.out" })
      .to("#f-left-leaf", { y: -50, duration: 1, ease: "power1.out" }, "<");
  }, []);
  return (
    <footer id="contact">
      <img
        src="/images/footer-right-leaf.png"
        alt="leaf-right"
        id="f-right-leaf"
      />
      <img
        src="/images/footer-left-leaf.png"
        alt="leaf-left"
        id="f-left-leaf"
      />
      <div className="content">
        <h2>Where to find us</h2>
        <div>
          <h3>Vist our Bar</h3>
          <p>456 Raq Blvd. # 404 ,Los Angeles CA 90210</p>
        </div>
        <div>
          <h3>Contact Us</h3>
          <p>(555) 987-6543</p>
          <p>hello@jsmcocktail.com</p>
        </div>
        <div>
          <h3>Open Every Day</h3>
          {openingHours.map((time) => (
            <p key={time.day}>
              {time.day}:{time.time}
            </p>
          ))}
        </div>
        <div>
          <h3>Socials</h3>
          <div className="flex-center gap-5">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                <img src={social.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
