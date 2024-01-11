const clapButton = document.getElementById("btn-clap") as HTMLButtonElement;
const booButton = document.getElementById("btn-boo") as HTMLButtonElement;

class SoundController {
  constructor(private audioElements: HTMLAudioElement[]) {}

  playSound(id: string) {
    this.stopSounds();
    const audio = this.audioElements.find((audio) => audio.id === id);
    if (!audio) {
      throw new Error(`Audio element with id ${id} not found`);
    }
    audio.currentTime = 0;
    audio.play();
  }

  stopSounds() {
    this.audioElements.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
  }
}

const soundController = new SoundController([
  document.getElementById("applause") as HTMLAudioElement,
  document.getElementById("boo") as HTMLAudioElement,
]);

clapButton.addEventListener("click", () => {
  soundController.playSound("applause");
});

booButton.addEventListener("click", () => {
  soundController.playSound("boo");
});

const gojo = document.getElementById("gojo") as HTMLImageElement;

gojo.addEventListener("click", async () => {
  const response = await fetch(gojo.src);
  const blob = await response.blob();
  await navigator.clipboard.write([
    new ClipboardItem({
      [blob.type]: blob,
    }),
  ]);
  alert("Gojo copied to clipboard");
});

const pasteButton = document.querySelector(
  "#paste-button"
)! as HTMLButtonElement;

pasteButton.addEventListener("click", async () => {
  try {
    const clipboardItems = await navigator.clipboard.read();
    const clipboardItem = clipboardItems[0];
    console.log(clipboardItem.types);

    for (const type of clipboardItem.types) {
      if (type === "image/png") {
        const blob = await clipboardItem.getType(type);
        console.log(blob);
        const imgUrl = URL.createObjectURL(blob);
        gojo.src = imgUrl;
      }
    }
  } catch (err) {
    console.error(err);
  }
});

const ball = document.querySelector(".ball")! as HTMLDivElement;

// 1. Provide keyframes. Split percentage evenly between number of objects
const keyframes: PropertyIndexedKeyframes = {
  opacity: [1, 0.5, 1],
  transform: [
    "translateX(0)",
    "translateX(15rem)",
    "translateX(-15rem)",
    "translateX(0)",
  ],
};
// 2. Provide animation options
const animationOptions: KeyframeAnimationOptions = {
  duration: 5000,
  iterations: Infinity,
  easing: "ease-in-out",
  direction: "alternate",
  fill: "both",
  delay: 1000,
  playbackRate: 3,
};

const animation = ball.animate(keyframes, animationOptions);

document.getElementById("pause")!.addEventListener("click", () => {
  animation.pause();
  console.log(
    // returns basic information about animation, like delay, direction, duration, fill-mode, and easing
    animation.effect?.getTiming(),
    // returns more info like progress, time-elapsed, etc.
    animation.effect?.getComputedTiming(),
    animation.playState
  );
});

document.getElementById("play")!.addEventListener("click", () => {
  animation.play();
});
