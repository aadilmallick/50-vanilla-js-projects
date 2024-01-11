import jpg from "./gojo.jpg?format=webp&h=800";

const loadingText = document.querySelector(".loading-text") as HTMLDivElement;
const bg = document.querySelector(".bg") as HTMLDivElement;

let load = 0;
const initialBlur =
  Number(
    document.documentElement.style
      .getPropertyValue("--blur-amount")
      .slice(0, -2)
  ) || 30;

let intervalId = setInterval(() => {
  load++;
  if (load > 99) {
    clearInterval(intervalId);
  }

  loadingText.innerText = `${load}%`;
  loadingText.style.opacity = `${scale(load, 0, 100, 1, 0)}`;
  document.documentElement.style.setProperty(
    "--blur-amount",
    `${scale(load, 0, 100, initialBlur, 0)}px`
  );
}, 30);

function scale(
  num: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) {
  return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

async function globPractice() {
  const images = import.meta.glob("./*.jpg", { eager: true });

  const imgLinks = [];

  for (const [path, image] of Object.entries(images)) {
    imgLinks.push(image.default);
  }

  return imgLinks;
}

globPractice();
