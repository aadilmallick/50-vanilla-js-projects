import { addREADMESection } from "../markdown";

const hamburgerButton = document.querySelector(
  "#hamburger"
) as HTMLButtonElement;
const container = document.querySelector(".container") as HTMLDivElement;
const nav = document.querySelector("nav") as HTMLDivElement;

const buttonState = (() => {
  let isToggled = false;

  return {
    toggle: () => {
      isToggled = !isToggled;
    },
    isToggled: () => isToggled,
  };
})();

const navLinks = document.querySelectorAll<HTMLAnchorElement>("nav ul a");
hamburgerButton.addEventListener("click", () => {
  buttonState.toggle();
  container.classList.toggle("show-nav");
  nav.classList.toggle("show-nav");

  const icon = hamburgerButton.querySelector("i") as HTMLElement;

  if (buttonState.isToggled()) {
    icon.classList.add("fa-close");
    icon.classList.remove("fa-bars");
  } else {
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-close");
  }
});

navLinks.forEach((link, i) => {
  link.style.setProperty("--delay", `${i * 0.2}s`);
  link.style.setProperty("--distance", `${(i + 1) * 16}px`);
});

const markdownContainer = document.querySelector(
  "#markdown-section"
) as HTMLDivElement;

console.log("markdownContainer", markdownContainer);

addREADMESection(3, markdownContainer);
