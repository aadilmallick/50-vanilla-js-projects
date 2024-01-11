const textAnimationElements =
  document.querySelectorAll<TextAnimationElement>(".text-animation");

type AnimationType = "breath" | "hover" | "wave";

interface TextAnimationElement extends HTMLElement {
  dataset: {
    letterAnimation: AnimationType;
  };
}

textAnimationElements.forEach((element) => {
  const text = element.textContent?.trim();
  if (!text) return;
  element.innerHTML = "";

  const animationType = element.dataset["letterAnimation"];
  text.split("").forEach((letter, i) => {
    const span = document.createElement("span");
    span.textContent = letter;
    switch (animationType) {
      case "breath":
      case "wave":
        // add css variable to span for choreography
        span.style.setProperty("--index", `${i}`);
        break;
    }
    element.appendChild(span);
  });
});
