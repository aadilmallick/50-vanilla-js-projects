import { addREADMESection } from "../markdown";

const prevButton = document.querySelector("#prev") as HTMLButtonElement;
const nextButton = document.querySelector("#next") as HTMLButtonElement;

const circles = document.querySelectorAll(
  ".circle"
) as NodeListOf<HTMLDivElement>;

const active = (() => {
  let currentActive = 0;
  return {
    getCurrentActive: () => currentActive,
    setCurrentActive: (value: number) => {
      currentActive = value;
    },
  };
})();

const handleButtonStyles = (button: HTMLButtonElement) => {
  return {
    disable: () => {
      button.disabled = true;
      button.classList.add("btn-disabled");
    },
    enable: () => {
      button.disabled = false;
      button.classList.remove("btn-disabled");
    },
  };
};

// 2. handle next button click
nextButton.addEventListener("click", () => {
  const currentActive = active.getCurrentActive();
  if (currentActive < circles.length - 1) {
    active.setCurrentActive(currentActive + 1);
  }
  update();
});

// 3. handle prev button click
prevButton.addEventListener("click", () => {
  const currentActive = active.getCurrentActive();
  if (currentActive > 0) {
    active.setCurrentActive(currentActive - 1);
  }
  update();
});

circles.forEach((circle, index) => {
  circle.addEventListener("click", () => {
    active.setCurrentActive(index);
    update();
  });
});

// 4. handle update
function update() {
  const currentActive = active.getCurrentActive();

  // sets width of blue progress line based on the currently active number
  document.documentElement.style.setProperty(
    "--progress",
    `${(currentActive / (circles.length - 1)) * 100}%`
  );

  // working with enabling/disabling buttons
  if (currentActive === 0) {
    handleButtonStyles(prevButton).disable();
    handleButtonStyles(nextButton).enable();
  } else if (currentActive === circles.length - 1) {
    handleButtonStyles(nextButton).disable();
    handleButtonStyles(prevButton).enable();
  } else {
    handleButtonStyles(prevButton).enable();
    handleButtonStyles(nextButton).enable();
  }

  // toggling active class
  circles.forEach((circle, index) => {
    if (index <= currentActive) {
      circle.classList.add("active");
    } else {
      circle.classList.remove("active");
    }
  });
}

// 1. make first step active, disable prev button
circles[0].classList.add("active");
handleButtonStyles(prevButton).disable();

addREADMESection(2);
