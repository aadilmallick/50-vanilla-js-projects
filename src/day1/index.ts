import {
  addReadMe,
  readmeContent,
  getSection,
  addREADMESection,
} from "../markdown";
import "./style.scss";

function createImagePanels(numImagePanels: number = 5) {
  const container = document.querySelector<HTMLDivElement>(".container")!;
  let url = "https://source.unsplash.com/random";
  const panels: HTMLDivElement[] = [];

  // create image panels
  for (let i = 0; i < numImagePanels; i++) {
    const imagePanel = document.createElement("div");
    imagePanel.classList.add("panel");
    imagePanel.style.backgroundImage = `url('${url}?${i}')`;
    container.appendChild(imagePanel);

    panels.push(imagePanel);
  }

  // add click listener: remove all active classes, then add active classes to clicked element
  panels.forEach((imagePanel) => {
    imagePanel.addEventListener("click", () => {
      panels.forEach((imagePanel2) => {
        imagePanel2.classList.remove("active");
      });
      imagePanel.classList.add("active");
    });
  });

  // expand first image panel
  panels[0].classList.add("active");

  return document.querySelectorAll<HTMLDivElement>(".panel");
}

const imagePanels = createImagePanels();

addREADMESection(1);
