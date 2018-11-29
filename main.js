let cards = document.querySelectorAll(".card");
cards.forEach(singleCard => {
  // Mouse enter
  singleCard.addEventListener("mouseenter", e => {
    let copyIcon = document.createElement("img");
    copyIcon.setAttribute("src", "./img/copy.svg");
    singleCard.querySelector(".square_color").appendChild(copyIcon);
  });
  // Mouse leave
  singleCard.addEventListener("mouseleave", e => {
    document.querySelector(".square_color img").remove();
  });
  // Click to copy
  singleCard.addEventListener("click", e => {
    e.target.closest(".card");
    let youJustCopied = document.createElement("div");
    youJustCopied.classList.add("you_just_copied");
    youJustCopied.innerHTML = `<div><img src="./img/checked.svg"><p>You got it!</p></div>`;
    singleCard.appendChild(youJustCopied);
  });
});
