const typewriterElements =
  document.querySelectorAll<HTMLElement>(".typewriter")!;

class TypeWriter {
  private speed;
  private currentIndex: number = 1;
  private timeoutId: number | null = null;
  private text: string = "";
  constructor(public element: HTMLElement, charsPerSecond: number = 20) {
    this.speed = 1000 / charsPerSecond;
    this.text = element.innerText;
  }

  write() {
    const curText = this.text.slice(0, this.currentIndex);
    if (this.currentIndex > this.text.length) {
      return;
    }
    this.element.innerText = curText;
    setTimeout(() => {
      this.currentIndex++;
      this.write();
    }, this.speed);
  }

  setSpeed(charsPerSecond: number) {
    this.speed = 1000 / charsPerSecond;
  }
}

typewriterElements.forEach((element) => {
  const typewriter = new TypeWriter(element);
  if (typewriter.element instanceof HTMLParagraphElement) {
    typewriter.setSpeed(85);
  }
  if (typewriter.element instanceof HTMLHeadingElement) {
    typewriter.setSpeed(10);
  }
  typewriter.write();
});
