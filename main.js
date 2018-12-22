const container = document.querySelector(".container");
const colors = [
  "#6d23b8",
  "#ffc600",
  "#09181E",
  "#37A000",
  "#0255e9",
  "#073F54",
  "#0C2129",
  "#FE4C00",
  "#3498db",
  "#4C5175",
  "#E1E8EC",
  "#BCE7D9",
  "#FBDDEC",
  "#F752A7",
  "#131E77",
  "#FEAD32",
  "#371F72",
  "#006052",
  "#FDF0F0",
  "#1F4172",
  "#Febbbb",
  "#f2f3f8",
  "#3d3b56"
];
// Create div for each color, Append all of them in their container
colors.forEach(color => {
  let newEl = `<div class="card" data-color="${color}">
  <div class="square_color"></div>
  <input type="text" readonly class="color_code"/>
</div>`;
  container.innerHTML += newEl;
});

// Hover Animation
let cards = document.querySelectorAll(".card");
cards.forEach(singleCard => {
  handleCard(singleCard);
  // Mouse enter
  singleCard.addEventListener("mouseenter", e => {
    let copyIcon = document.createElement("img");
    copyIcon.setAttribute("src", "./img/copy.svg");
    singleCard.querySelector(".square_color").appendChild(copyIcon);
  });
  // Mouse leave
  singleCard.addEventListener("mouseleave", e => {
    let copyIcon = document.querySelector(".square_color img");
    if (copyIcon) {
      copyIcon.remove();
    }
  });
  // Click to copy
  singleCard.querySelector(".square_color").addEventListener("click", e => {
    document.querySelector(".square_color img").remove();
    let youJustCopied = document.createElement("div");
    youJustCopied.classList.add("you_just_copied");
    youJustCopied.style.backgroundColor = singleCard.getAttribute("data-color");
    youJustCopied.innerHTML = `<div><img src="./img/checked.svg"><p>You got it!</p></div>`;
    singleCard.appendChild(youJustCopied);
    let colorCode = singleCard.querySelector(".color_code");
    colorCode.select();
    document.execCommand("copy");
    clearSelection();

    setTimeout(() => {
      youJustCopied.remove();
    }, 1500);
  });
});

// Get the data-color attr from each card and Set it as background color.
function handleCard(card) {
  let color = card.getAttribute("data-color");
  card.querySelector(".square_color").style.backgroundColor = color;
  card.querySelector(".color_code").setAttribute("value", color);
}

// Clear selection after the user copy the color code
function clearSelection() {
  if (window.getSelection) {
    window.getSelection().removeAllRanges();
  } else if (document.selection) {
    document.selection.empty();
  }
}
