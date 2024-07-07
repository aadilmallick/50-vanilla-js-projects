import { addREADMESection } from "../markdown";
addREADMESection(4);
const search = document.querySelector(".search") as HTMLDivElement;
const button = document.querySelector("button") as HTMLButtonElement;

button.addEventListener("click", () => {
  search.classList.toggle("active");
});
