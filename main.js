// Here what we're going to do If you want understand you have to read my comments

// There're two main functions in this project
// 1- Add new colors to save them
// 2- Get them when document load & click to copy

const myColors = JSON.parse(localStorage.getItem("myColors")) || [];
const cardsWrapper = document.querySelector(".cards_wrapper");

// Create card for each color
function createCards() {
  myColors.forEach(color => {
    createSingleCard(color);
  });
}
function createSingleCard(color) {
  let card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-color", `${color}`);
  card.style.backgroundColor = color;
  cardsWrapper.appendChild(card);
  // Run functions about event listeners
  handleMouseEnterEvent(card);
  handleMouseLeaveEvent(card);
  handleClickEvent(card);
}
if (myColors.length > 0) {
  createCards();
}

function handleMouseEnterEvent(card) {
  card.addEventListener("mouseenter", e => {
    let copyBtn = document.createElement("button");
    copyBtn.classList.add("copy_color");
    copyBtn.textContent = "COPY";
    card.appendChild(copyBtn);
  });
}

function handleMouseLeaveEvent(card) {
  card.addEventListener("mouseleave", e => {
    let copyBtn = document.querySelector(".copy_color");
    copyBtn.remove();
  });
}

function handleClickEvent(card) {
  card.addEventListener("click", e => {
    // 1- input > to select the color code and copy
    let colorCode = document.createElement("input");
    colorCode.setAttribute("type", "text");
    colorCode.setAttribute("value", `${card.getAttribute("data-color")}`);
    card.appendChild(colorCode);
    colorCode.select();
    document.execCommand("copy");
    clearSelection();

    // 2- copyAnimationLayer > Show animation when user click, to know he get the color
    let copyAnimationLayer = document.createElement("div");
    copyAnimationLayer.classList.add("copy_animation_layer");
    card.appendChild(copyAnimationLayer);

    // 3- img > checked icon for animation too
    let doneImg = document.createElement("img");
    doneImg.setAttribute("src", "./assets/checked.svg");
    copyAnimationLayer.appendChild(doneImg);
    let copyBtn = document.querySelector(".copy_color");
    // Remove all elements
    setTimeout(() => {
      copyBtn.remove();
      colorCode.remove();
      copyAnimationLayer.remove();
      doneImg.remove();
    }, 1000);
  });
}

// Clear selection after the user copy the color code
function clearSelection() {
  if (window.getSelection) {
    window.getSelection().removeAllRanges();
  } else if (document.selection) {
    document.selection.empty();
  }
}

// Second : When the user want to add new color
// 1- Open form to start typing color code when the user click on the add icon
// 2- Get the input value and check if the color code is ok
// 3- Submit the new color code and check if it's not already exist in myColors[]
// 4- Create new card for the new color
// 5- Run createSingleCard()

const addNewColorSection = document.querySelector("section.add_new_color");
const colorField = document.querySelector(".form input");
const dialogWrapper = document.querySelector(".dialog_wrapper");
const submitColorBtn = document.querySelector(".submit_color");

// Open the color form when the user hit on Plus Icon to add one
function openColorForm() {
  addNewColorSection.classList.add("active");
  colorField.focus();
  dialogWrapper.style.display = "block";
}
// dialogWrapper will open when the form open
// The user will click on dialogWrapper If he/she click outside on the color form
dialogWrapper.addEventListener("click", function() {
  addNewColorSection.classList.remove("active");
  dialogWrapper.style.display = "none";
});

// Get input value while usre typing and check if it's ok
colorField.addEventListener("keyup", function(e) {
  let colorIsOk = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(
    `${e.target.value}`
  );
  let colorWithoutHash = /(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i.test(
    `${e.target.value}`
  );
  if (colorIsOk) {
    submitColorBtn.removeAttribute("disabled");
  } else {
    if (colorWithoutHash) {
      e.target.value = "#" + e.target.value;
      submitColorBtn.removeAttribute("disabled");
    } else {
      submitColorBtn.setAttribute("disabled", "");
      return false;
    }
  }

  // If user hit Enter trigger a submit button click
  if (event.keyCode === 13) {
    event.preventDefault();
    submitColorBtn.click();
  }
});

// If user hit enter || click on Add new Color button
submitColorBtn.addEventListener("click", function() {
  // Push the new color to myColors array and update the localStorage
  // if the new color is not exist in myColors []
  if (!myColors.includes(colorField.value)) {
    myColors.push(colorField.value);
    localStorage.setItem("myColors", JSON.stringify(myColors));
    createSingleCard(colorField.value);
  } else {
    alert("This color is already exist");
  }
  // Reset my color input (colorField) & make the button disabled & focus on colorField again
  colorField.value = "";
  submitColorBtn.setAttribute("disabled", "");
  colorField.focus();
});
