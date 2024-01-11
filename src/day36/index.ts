const colors = ["#e74c3c", "#8e44ad", "#3498db", "#e67e22", "#2ecc71"];
const container = document.querySelector(".square-container") as HTMLDivElement;

let NUM_SQUARES = 500;

function init() {
  const { width, height } = container.getBoundingClientRect();
  console.log(width, height);

  const area = width * height;
  const squareSize = Math.sqrt(area / NUM_SQUARES);
  const numRows = Math.floor(height / squareSize);
  const numCols = Math.floor(width / squareSize);

  NUM_SQUARES = numRows * numCols;
  for (let i = 0; i < NUM_SQUARES; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;

    square.addEventListener("mouseover", () => {
      square.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
    });

    square.addEventListener("mouseout", () => {
      square.style.backgroundColor = "transparent";
    });
    // square.style.boxShadow = `0 0 2px ${colors[Math.floor(Math.random() * colors.length)]}, 0 0 10px ${colors[Math.floor(Math.random() * colors.length)]}`;
    container.appendChild(square);
  }
}

init();
