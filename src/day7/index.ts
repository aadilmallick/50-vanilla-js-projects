import { addREADMESection } from "../markdown";

const left = document.querySelector(".left") as HTMLDivElement;
const right = document.querySelector(".right") as HTMLDivElement;
const container = document.querySelector(".container") as HTMLDivElement;

left.addEventListener("mouseenter", () => {
  left.classList.add("hover-left");
});

left.addEventListener("mouseleave", () => {
  left.classList.remove("hover-left");
});

right.addEventListener("mouseenter", () => {
  right.classList.add("hover-right");
});

right.addEventListener("mouseleave", () => {
  right.classList.remove("hover-right");
});

addREADMESection(7);
