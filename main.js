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

function handleCard(card) {
  console.log(card);
  let color = card.getAttribute("data-color");
  card.querySelector(".square_color").style.backgroundColor = color;
  card.querySelector(".color_code").setAttribute("value", color);
}

function clearSelection() {
  if (window.getSelection) {
    window.getSelection().removeAllRanges();
  } else if (document.selection) {
    document.selection.empty();
  }
}
