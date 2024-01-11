const nav = document.querySelector(".nav") as HTMLElement;
const openNavButton = document.querySelector(".open-btn") as HTMLButtonElement;
const closeNavButton = document.querySelector(
  ".close-btn"
) as HTMLButtonElement;

openNavButton.addEventListener("click", () => {
  nav.classList.add("visible");
});

closeNavButton.addEventListener("click", () => {
  nav.classList.remove("visible");
});
