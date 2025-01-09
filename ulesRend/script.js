const canvas = document.getElementById("aula");
const tartalom = canvas.getContext("2d");

canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight - 100;

let targyak = [];
let selected = null;
let offsetX, offsetY;
let deleteMode = false; // Törlési mód jelző

class Targy {
  constructor(x, y, width, height, tipus) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.tipus = tipus;
    this.group = null; // Csoportazonosító (nem használt a különálló mozgatáshoz)
  }

  draw() {
    tartalom.fillStyle = this.tipus === "chair" ? "bisque" : "brown";
    tartalom.fillRect(this.x, this.y, this.width, this.height);
    tartalom.strokeRect(this.x, this.y, this.width, this.height);
  }

  isInside(x, y) {
    return (
      x > this.x &&
      x < this.x + this.width &&
      y > this.y &&
      y < this.y + this.height
    );
  }

  checkCollision(x, y, width, height) {
    return (
      this.x < x + width &&
      this.x + this.width > x &&
      this.y < y + height &&
      this.y + this.height > y
    );
  }
}

function drawRoom() {
  tartalom.clearRect(0, 0, canvas.width, canvas.height);
  targyak.forEach((item) => item.draw());
}

function checkOverlaps(item) {
  return targyak.some(
    (other) =>
      other !== item &&
      other.checkCollision(item.x, item.y, item.width, item.height)
  );
}

canvas.addEventListener("mousedown", (e) => {
  const mouseX = e.offsetX;
  const mouseY = e.offsetY;

  if (deleteMode) {
    // Ha törlés módban vagyunk, töröljük a kiválasztott elemet
    const toDelete = targyak.find((item) => item.isInside(mouseX, mouseY));
    if (toDelete) {
      targyak = targyak.filter((item) => item !== toDelete);
      drawRoom();
    }
  } else {
    // Normál mód - kijelölés és mozgatás
    selected = targyak.find((item) => item.isInside(mouseX, mouseY));
    if (selected) {
      offsetX = mouseX - selected.x;
      offsetY = mouseY - selected.y;
    }
  }
});

canvas.addEventListener("mousemove", (e) => {
  if (!deleteMode && selected) {
    const deltaX = e.offsetX - offsetX;
    const deltaY = e.offsetY - offsetY;

    const originalX = selected.x;
    const originalY = selected.y;
    selected.x = deltaX;
    selected.y = deltaY;

    if (checkOverlaps(selected)) {
      selected.x = originalX;
      selected.y = originalY;
    }

    drawRoom();
  }
});

canvas.addEventListener("mouseup", () => {
  if (!deleteMode) selected = null;
});

document.getElementById("szek").addEventListener("click", () => {
  const newChair = new Targy(50, 50, 50, 50, "chair");
  if (!checkOverlaps(newChair)) {
    targyak.push(newChair);
  }
  drawRoom();
});

document.getElementById("asztal").addEventListener("click", () => {
  const newTable = new Targy(100, 100, 100, 100, "table");
  if (!checkOverlaps(newTable)) {
    targyak.push(newTable);
  }
  drawRoom();
});

document.getElementById("csoport").addEventListener("click", () => {
  const rows = parseInt(document.getElementById("rows").value, 10) || 1;
  const cols = parseInt(document.getElementById("cols").value, 10) || 1;
  const spacing = 5; // Fix távolság a székek között
  const chairSize = 50;
  const startX = 50;
  const startY = 50;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const newChair = new Targy(
        startX + col * (chairSize + spacing),
        startY + row * (chairSize + spacing),
        chairSize,
        chairSize,
        "chair"
      );
      if (!checkOverlaps(newChair)) {
        targyak.push(newChair);
      }
    }
  }
  drawRoom();
});

document.getElementById("torles").addEventListener("click", () => {
  deleteMode = !deleteMode; // Kapcsolgatja a törlés módot
  document.getElementById("torles").textContent = deleteMode 
    ? "Törlés Mód: Bekapcsolva" 
    : "Törlés Mód";
});

drawRoom();