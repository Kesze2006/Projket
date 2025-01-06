let canvas = document.getElementById("aula");
let tartalom = canvas.getContext("2d");

canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight - 15;

let targyak = []

class targy {
  constructor(x, y, width, height, tipus) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.tipus = tipus;
  }
}

megRajzol()
{

}