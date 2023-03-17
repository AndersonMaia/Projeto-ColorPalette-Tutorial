class Color {
  constructor(hex, element) {
    this.hex = hex;
    this.element = element;
    this.locked = false;
  }

  setHex(hex) {
    this.hex = hex;
    this.element.style.backgroundColor = hex;
    this.element.querySelector(".color-input").value = hex;
  }

  setLocked(locked) {
    this.locked = locked;

    if (locked) {
      this.element.classList.add("locked");
      this.element.querySelector("img").src = "icons/lock-closed.svg";
    } else {
      this.element.classList.remove("locked");
      this.element.querySelector("img").src = "icons/lock-open.svg";
    }
  }

  toggleLocked() {
    this.setLocked(!this.locked);
  }

  generateHex() {
    if (this.locked) {
      return;
    }

    const chars = "0123456789ABCDEF";

    let hex = "#";

    for (let i = 0; i < 6; i++) {
      hex += chars[Math.floor(Math.random() * 16)];
    }

    this.setHex(hex);
  }

  copyToClipboard() {
    const input = this.element.querySelector(".color-input");
    input.select();
    document.execCommand("copy");
    input.blur();

    this.element.classList.add("copied");
    setTimeout(() => {
      this.element.classList.remove("copied");
    }, 1000);
  }
}

const colorElements = document.querySelectorAll(".colors .color");

const colors = [];

for (let i = 0; i < colorElements.length; i++) {
  const colorElement = colorElements[i];

  const input = colorElement.querySelector(".color-input");

  const lockToggle = colorElement.querySelector(".lock-toggle");

  const copyHex = colorElement.querySelector(".copy-hex");

  const hex = input.value;

  const color = new Color(hex, colorElement);

  input.addEventListener("input", () => color.setHex(e.target.value));

  lockToggle.addEventListener("click", () => color.toggleLocked());

  copyHex.addEventListener("click", () => color.copyToClipboard());

  color.generateHex();

  colors.push(color);
}

document.querySelector(".generator-button").addEventListener("click", () => {
  for (let i = 0; i < colors.length; i++) {
    colors[i].generateHex();
  }
});

document.addEventListener("keypress", (e) => {
  if (e.code.toLowerCase() === "space") {
    for (let i = 0; i < colors.length; i++) {
      colors[i].generateHex();
    }
  }
});
