const fill = document.querySelector<HTMLDivElement>(".fill")!;
const empties = document.querySelectorAll<HTMLDivElement>(".empty")!;

fill.addEventListener("dragstart", () => {
  fill.classList.add("hold");
  setTimeout(() => fill.classList.remove("fill"), 10);
});
fill.addEventListener("dragend", dragEnd);

for (const empty of empties) {
  empty.addEventListener("dragover", dragOver);
  empty.addEventListener("dragenter", (e) => {
    e.preventDefault();
    empty.classList.add("hovered");
  });
  empty.addEventListener("dragleave", (e) => {
    e.preventDefault();
    empty.classList.remove("hovered");
  });
  empty.addEventListener("drop", (e) => {
    e.preventDefault();
    empty.classList.remove("hovered");
    empty.classList.add("fill");
    empty.draggable = true;
  });
}

function dragStart() {}

function dragEnd() {}

// continuously triggered when dragging over droppable container
function dragOver(e: DragEvent) {
  e.preventDefault();
}

// executes only once when entering droppable container
function dragEnter(e: DragEvent) {
  e.preventDefault();
}

function dragLeave() {}

function dragDrop() {}
