# 50 projects 50 days

## Day 1 - Expanding Cards

We have a flex container, each with a **panel**, which is a div with a background image. We set a large height to the flex container, and have the panels stretch to fill the container.

The principle behind the expanding cards is using the `flex` property to control width, and applying a transition on it. The panel we click on we will add a class such that its flex value is large while its siblings' flex value is small.

### HTML structure

- `container` : flex container, setting width and height
- `panel` : flex item, setting flex value, background image and flex transition
- `active` : when applied to a panel, it will have a large flex value, taking up more space

```html
<div class="container">
  <div class="panel active">
    <h3>Title 1</h3>
  </div>
  <div class="panel">
    <h3>Title 2</h3>
  </div>
  <div class="panel">
    <h3>Title 3</h3>
  </div>
  <div class="panel">
    <h3>Title 4</h3>
  </div>
  <div class="panel">
    <h3>Title 5</h3>
  </div>
</div>
```

### Css

```css
.panel {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  flex: 1;
  border-radius: 50px;
  transition: flex 0.7s ease-in-out;
  position: relative;
  overflow: hidden;
}

.active {
  flex: 20;
}
```

### JavaScript

Loop through the panels, add event listener to each panel for when it's clicked, add the active class and remove the active class from any other panels that have it.

```javascript
imagePanels.forEach((imagePanel, i) => {
  url = `https://source.unsplash.com/random?${i}`;
  imagePanel.style.backgroundImage = `url('${url}')`;

  // when clicked, first remove all active classes and then add class
  imagePanel.addEventListener("click", () => {
    removeActiveClasses();
    imagePanel.classList.add("active");
  });
});

function removeActiveClasses() {
  imagePanels.forEach((imagePanel) => {
    imagePanel.classList.remove("active");
  });
}
```

### Complete

```javascript
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
```

## Day 2 - Progress Steps

### HTML structure

```html
<div class="container-2">
  <div class="progress-container">
    <div class="circle">1</div>
    <div class="circle">2</div>
    <div class="circle">3</div>
    <div class="circle">4</div>
  </div>
  <div class="btn-container">
    <button class="btn" id="prev">prev</button>
    <button class="btn" id="next">next</button>
  </div>
</div>
```

- `container-2` : not useful, just a flex container to center on screen
- `progress-container` : flex container, setting min-width of 350. But also uses `::before` and `::after` pseudo-elements to create the lines between the circles. The `::before` and `::after` elements are positioned absolutely, and the `progress-container` is positioned relatively.
- `circle` : flex item, setting width and height, centering number text.

### CSS

For the `.progress-container` class, we are using the pseudoelements to render a gray line as an outline for the progress, and then we dynamically control the width of the blue line using javascript.

```scss
:root {
  --progress: 0%;
  --primary: #48c4c6;
  --secondary: #3da2a4;
}

.progress-container {
  display: flex;
  justify-content: space-between;
  width: clamp(250px, 350px, 100%);
  margin-bottom: 2rem;
  // for pseudo elements to be absolutely positioned
  position: relative;

  // blue line goes on top of gray line, z-index = -1
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    // use css variable and dynamically increase value with javascript
    width: var(--progress);
    height: 4px;
    background-color: var(--primary);
    border-radius: 10px;
    z-index: -1;
    transition: 0.4s ease all;
  }
  // grya line is on bottom, z-index = -1
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 4px;
    background-color: #eceded;
    border-radius: 10px;
    z-index: -2;
    transition: 0.4s ease all;
  }
}
```

For the circle, we are using flexbox to center the number text We also want an `.active` class to toggle when the current number is selected

```scss
.circle {
  background-color: rgb(247, 247, 247);
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  height: 2rem;
  width: 2rem;
  border: 2px solid rgb(236, 236, 236);
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  // active class
  &.active {
    border-color: var(--primary);
    color: var(--primary);
  }
}
```

### JavaScript

#### Setup

For the setup, I just set up state with enclosures.

```javascript
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
```

#### Handling button clicks

What the next button and previous button are supposed to do is pretty explanatory:

1. Increment/decrement active step number
2. Reflect changes in UI

```javascript
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
```

Then here is how we reflect changes in the UI:

```javascript
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
```

## Day 3 - Rotating Navigation

1. Put entire page content in a container, like in `.container` class
2. Fix a hamburger button to the top of the page. When this button is clicked on, we will rotate the entire container 20 degrees.
3. Navbar is hidden, but gets shown when page is rotated.

### HTML structure

```html
<div class="container">
  <!-- circle on top left -->
  <div class="circle-container">
    <!-- button container -->
    <div class="circle">
      <button id="hamburger">
        <i class="fas fa-bars"></i>
      </button>
    </div>
  </div>

  <!-- any other content for page -->
</div>

<!--  hidden nav that gets rotated in -->
<nav>
  <ul>
    <a><i class="fas fa-home"></i> Home</a>
    <a><i class="fas fa-user-alt"></i> About</a>
    <a><i class="fas fa-envelope"></i> Contact</a>
  </ul>
</nav>
```

### CSS

#### Page

THe body should be a different background color than the container for special contrast and to show the rotating effect. You should also hide overflow on the x-axis.

```scss
body {
  background-color: #222;
  // to prevent scrollbar when rotating content container
  overflow-x: hidden;
}

.container {
  // set transform origin to rotate from top left
  transform-origin: top left;
  transition: transform 0.5s ease-in-out;
  min-height: 100vh;
  // set background color to white
  background-color: white;
  padding: 1rem;
  &.show-nav {
    transform: rotate(-20deg);
  }
}
```

- body essential properties: background color, overflow-x
- container essential properties: transform origin, transition, background color

We then apply a `.show-nav` class to the container when the hamburger button is clicked on. This will rotate the container and show the nav.

#### Circle and hamburger button

We fix a div at the top left of the screen, translate half of it out of view, and then put the hamburger button near the bottom of the circle.

```scss
// only shows quarter of circle
.circle-container {
  position: fixed;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  transition: transform 0.5s ease-in-out;
}

//  hamburger button container
.circle {
  background-color: #ff7979;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  position: relative;
}

#hamburger {
  position: absolute;
  z-index: 1;
  background: transparent;
  font-size: 2rem;
  color: black;
  border: none;
  top: 50%;
  left: 50%;
  // move down
  transform: translate(75%, 75%);
  cursor: pointer;
}
```

## Day 4 - Hidden Search Widget

## Day 5 - Blurry Loading

## Day 6 - Scroll Animation

## Day 7 - Split Landing Page

## Day 8 - Text Letter Animations

THe theory behind text letter animations is that we have some text element, and we want to animate each letter in the text element. We can do this by wrapping each letter in a `<span>` element using JavaScript, and then applying animations to each span element.

### HTML

For more readable code, we specify all elements that should have text animation with the `text-animation` class, and then we use the `data-letter-animation` attribute to specify which type of animation we want to apply to the text.

We target these different animations in our CSS using attribute selectors.

```html
<p class="text-animation" data-letter-animation="wave">Email</p>
<p class="text-animation" data-letter-animation="breath">Breathing Text</p>
<p class="text-animation" data-letter-animation="hover">Hover over me text</p>
```

### CSS

#### Basics

When be break up the text into individual spans, they must specify two important properties: `inline-block` display and a `white-space: break-spaces` property.

- `display: inline-block` : this is so that we can apply the `transform` property to the `<span>` elements. We can't use transform on inline elements.
- `white-space: break-spaces` : this is so that we can preserve the spaces in the text. If we don't do this, then spans which have the text of a single whitespace character will have no width and height, bunching all the letters together.

```scss
.text-animation {
  // in order for transform to work, we need to set display to inline-block
  span {
    display: inline-block;
    white-space: break-spaces;
  }
}
```

We also have to understand how to use the CSS `white-space` property:

- `white-space : normal` : this means that text with multiple whitespaces in a row will be collapsed into a single space.
- `white-space: break-spaces` : this means that all whitespaces in the text will be preserved exactly as they are.
- `white-space: nowrap` : this means that all whitespaces in the text will be preserved exactly as they are, and the text will not wrap to the next line.

#### Wave Animation

For the wave animation, we want to make a choreographed animation where each individual letter jumps up one after another in a wave-like fashion.

1. Apply transition for `transform` (for translateY) and `color` properties
2. Vary the transition delay increasingly through a choreographing CSS variable that we will set in JavaScript, like `--index`
3. Apply the animation states on hover to **translate up and change color**

```scss
$brand-color: #84b547;
[data-letter-animation="wave"] {
  span {
    // 1. transition on translateY and color
    transition: transform 0.3s cubic-bezier(0.075, 0.82, 0.165, 1), color 0.3s
        cubic-bezier(0.075, 0.82, 0.165, 1);
    // 2. use --index property supplied by JS to choreograph animation
    transition-delay: calc(var(--index) * 50ms);
  }
  &:hover {
    span {
      // 3. On hover, apply animation states
      transform: translateY(-5px);
      color: $brand-color;
    }
  }
}
```

#### Breath Animation

Breath animation is similar to wave animation, but we instead run an infinite animation where each element becomes bigger and smaller in a breathing, constant fashion.

We also use JavaScript to supply the choreographing CSS variable.

The below animation applies scaling and moving up with `transform`, and changes `text-shadow` to create a glowing effect.

```scss
$glow-color: #bcf476;
@keyframes breath {
  from {
    animation-timing-function: ease-out;
  }

  to {
    transform: scale(1.25) translateY(-5px) perspective(1px);
    text-shadow: 0 5px 40px $glow-color;
    animation-timing-function: ease-in-out;
  }
}
```

Then all we do is apply that animation on each individual span.

```scss
[data-letter-animation="breath"] {
  span {
    // apply animation and choreograph with delay in increments of 100ms
    animation: breath 1.2s ease calc(var(--index) * 100ms) infinite alternate;

    // span styles to make text look good
    text-transform: uppercase;
    font-weight: 100;
    letter-spacing: 2px;
  }
}
```

## Day 9 - Sound Board + Copy and Paste

```ts
class SoundController {
  constructor(private audioElements: HTMLAudioElement[]) {}

  // to play a sound, first stop all other sounds.
  playSound(id: string) {
    this.stopSounds();
    const audio = this.audioElements.find((audio) => audio.id === id);
    if (!audio) {
      throw new Error(`Audio element with id ${id} not found`);
    }
    audio.currentTime = 0;
    audio.play();
  }

  // you stop sounds by pausing them and then resetting the current time to 0
  stopSounds() {
    this.audioElements.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
  }
}
```

### Copying images

We use the `navigator.clipboard.write()` async method to write binary blob data to the clipboard.

> The important thing to understand about this method is that you cannot copy jpg or jpeg files to the clipboard. This only works with png and svg files.

```ts
async function copyImageToClipboard() {
  // 1. fetch image data using fetch()
  const gojo = document.getElementById("gojo") as HTMLImageElement;
  const response = await fetch(gojo.src);
  const blob = await response.blob();

  // 2. write blob data to clipboard
  await navigator.clipboard.write([
    new ClipboardItem({
      [blob.type]: blob,
    }),
  ]);
  alert("Gojo copied to clipboard");
}
```

### Pasting images

Using the `navigator.clipboard.read()` async method, we can read the clipboard data.

```ts
pasteButton.addEventListener("click", async () => {
  try {
    const clipboardItems = await navigator.clipboard.read();
    const clipboardItem = clipboardItems[0];
    // returns array of all types of data copied to clipboard, like text or image
    console.log(clipboardItem.types);

    for (const type of clipboardItem.types) {
      if (type === "image/png") {
        // get blob of item stored on clipboard, given mime type
        const blob = await clipboardItem.getType(type);
        const imgUrl = URL.createObjectURL(blob);
        gojo.src = imgUrl;
      }
    }
  } catch (err) {
    console.error(err);
  }
});
```

- `await navigator.clipboard.read()` : reutrns a `ClipboardItem[]`. There's only one element in the array anyway, which represents the data copied to your clipboard
- `ClipboardItem.types` : returns an array of all the types of data copied to your clipboard, like text or image
- `ClipboardItem.getType(type)` : returns a blob of the item stored on the clipboard, given the mime type

### Pasting images old way

You can listen to the `"copy"` and `"paste"` events on the DOM document, but it isn't advised to do this because they are synchronous and blocking as opposed to the newer clipboard API.

```ts
document.addEventListener("paste", async (e) => {
  // 1. essential to prevent default behavior
  e.preventDefault();

  for (const clipboardItem of e.clipboardData.files) {
    if (clipboardItem.type.startsWith("image/")) {
      // Do something with the image file.
    }
  }
});
```

## Day 15 - Count increment

For this follower number cool animation iterator project, we have a simple HTML structure where we use `requestAnimationFrame()` to continuously update the text for the number of followers.

```html
<!-- Basic structure -->
<div class="counter-container">
  <i class="fab fa-twitter fa-3x"></i>
  <div class="counter" data-target="12000"></div>
  <span>Twitter Followers</span>
</div>

<div class="counter-container">
  <i class="fab fa-youtube fa-3x"></i>
  <div class="counter" data-target="100000"></div>
  <span>Subscribers</span>
</div>
```

We use the `data-target` attribute to store the target number of followers. We then use `requestAnimationFrame()` to recursively call a function that will increment the number of followers until it reaches the target number.

```typescript
const counters = document.querySelectorAll<HTMLDivElement>(".counter");

// 1. initialize all counters to 0
counters.forEach((counter) => {
  counter.innerText = "0";
});

// 2. requestAnimationFrame recursive call
function increment() {
  // boolean flag to break out of recursive call
  let isFinished = false;
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target")!;
    const currentNum = +counter.innerText;

    // 3. increment counter based on desired fps and animation duration
    const fps = 30;
    const numSeconds = 2;
    const increment = Math.ceil(target / (fps * numSeconds));

    if (currentNum >= target) {
      isFinished = true;
      counter.innerText = target.toString();
    } else {
      counter.innerText = (currentNum + increment).toString();
    }
  });
  if (isFinished) return;
  requestAnimationFrame(increment);
}

increment();
```

For a more OOP approach, we use a `Counter` class model that takes in a target, fps, and animation duration and gives us a model to control the data state of the current number.

We then attach a counter instance to each of our HTML counter elements.

```ts
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
```

## Day 20 - Button Ripple effect

This effect is pretty simple. We basically create a white circle, which is a `<span>` element and spawn it at the point at which we click the button. We then animate the circle to grow in size and fade out.

### HTML

```html
<button class="ripple">Click Me</button>
```

### CSS

```scss
.ripple {
  background-color: purple;
  color: #fff;
  border: none;
  padding: 0.5rem 2rem;
  // essential
  overflow: hidden;
  position: relative;
}

.circle {
  position: absolute;
  background-color: #fff;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  // properties to animate
  transform: translate(-50%, -50%) scale(0);
  opacity: 0.8;
  animation: ripple 0.25s ease-out;
}

// animation that grows circle and fades out
@keyframes ripple {
  to {
    transform: translate(-50%, -50%) scale(3);
    opacity: 0;
  }
}
```

### JS

We will programatically add a `<span>` with the class of `circle` whenever the button is clicked. We will also set the `top` and `left` properties of the circle to be the coordinates of where we clicked the button.

The JS is also very simple, just following these steps:

1. Get the coordinates of where you clicked relative to the button
2. Create an element at that very point inside the button and apply the `circle` class to it
3. Remove the element from the DOM after the animation is done, using `setTimeout()`

```ts
rippleButton.addEventListener("click", function (e) {
  const x = e.pageX;
  const y = e.pageY;

  const buttonTop = e.target.offsetTop;
  const buttonLeft = e.target.offsetLeft;

  // 1. this gets the corrdinates of where you clicked relative to button
  const xInside = x - buttonLeft;
  const yInside = y - buttonTop;

  // 2. create circle at point where you clicked
  const circle = document.createElement("span");
  circle.classList.add("circle");
  circle.style.top = yInside + "px";
  circle.style.left = xInside + "px";
  button.appendChild(circle);

  // 3. remove circle from DOM after animation is done
  setTimeout(() => circle.remove(), 500);
});
```

### Day 24 - Skeleton Loader

Here are the basic styles for skeleton loading utilities:

```scss
// skeleton animation class
.animated-bg {
  background-image: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 10%,
    #f6f7f8 20%,
    #f6f7f8 100%
  );
  background-size: 200% 100%;
  animation: bgPos 1s linear infinite;
}

// component for skeleton text
.animated-bg-text {
  border-radius: 50px;
  display: inline-block;
  height: 0.5rem;
  width: 100%;
}

// component for skeleton avatar
.animated-bg-avatar {
  border-radius: 9999px;
  display: inline-block;
  height: 2rem;
  width: 2rem;
}

// animation that moves linear gradient
@keyframes bgPos {
  0% {
    background-position: 50% 0;
  }

  100% {
    background-position: -150% 0;
  }
}
```

THe skeleton animation is based on setting the background color to a grayish linear gradient, and then moving that gradient to the side continously by animating `background-position`

And here would be an example of HTML using the skeleton loading classes:

```html
<div class="card">
  <div class="animated-bg image-container"></div>
  <div class="content">
    <div class="header">
      <div class="animated-bg animated-bg-avatar"></div>
      <h3 class="animated-bg animated-bg-text"></h3>
    </div>
    <div class="body">
      <p class="animated-bg animated-bg-text"></p>
      <p class="animated-bg animated-bg-text"></p>
      <p class="animated-bg animated-bg-text"></p>
    </div>
  </div>
</div>
```

Go [here](src/day24/index.html) to see the example
