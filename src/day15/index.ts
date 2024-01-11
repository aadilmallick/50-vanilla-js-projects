class Counter {
  public currentNum = 0;
  constructor(
    public target: number,
    private fps: number,
    private numSeconds: number
  ) {}

  increment() {
    const increment = Math.ceil(this.target / (this.fps * this.numSeconds));
    if (this.currentNum >= this.target) {
      this.currentNum = this.target;
    } else {
      this.currentNum += increment;
    }
    return this.currentNum;
  }

  isFinished() {
    return this.currentNum >= this.target;
  }
}

const counters = document.querySelectorAll<
  HTMLDivElement & { counter: Counter }
>(".counter");

counters.forEach((counter) => {
  counter.innerText = "0";
  const target = +counter.getAttribute("data-target")!;
  counter.counter = new Counter(target, 30, 2);
});

function increment() {
  let isFinished = false;
  counters.forEach((counter) => {
    counter.innerText = counter.counter.increment().toString();
    isFinished = counter.counter.isFinished();

    if (isFinished) {
      counter.innerText = counter.counter.target.toString();
    }
  });
  if (isFinished) return;
  requestAnimationFrame(increment);
}

increment();
