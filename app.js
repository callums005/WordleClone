let GAME_STATE = "PLAYING"; // Can be PLAYING, WON, LOST
const outputTitle = document.getElementById("output-title");
const outputDesc = document.getElementById("output-desc");
const notInWord = document.getElementById("not-in-word");

const randomNo = Math.floor(Math.random() * 3);
const words = JSON.parse(WORDS);
const word = Array.from(words[randomNo]);

let inputCount = 0;
let input = [];
let tries = 0;

document.addEventListener("keydown", (e) => {
  if (GAME_STATE != "PLAYING") return;

  if (e.key == "Backspace") {
    if (inputCount <= 0) return;
    input.pop();
    document.getElementById("i-" + inputCount).textContent = "";
    inputCount--;
  } else if (e.key == "Enter") {
    if (input.length == 5) {
      tries++;
      CheckInput(input);
      inputCount = 0;
      input = [];
      for (let i = 1; i <= 5; i++) {
        document.getElementById("i-" + i).textContent = "";
      }
    }
  } else {
    if (
      inputCount > 4 ||
      e.key.length > 1 ||
      !(e.key.charCodeAt(0) >= 65 && e.key.charCodeAt(0) <= 122)
    )
      return;
    input[inputCount] = e.key.toUpperCase();
    document.getElementById("i-" + (inputCount + 1)).textContent =
      input[inputCount];
    inputCount++;
  }
});

function CheckInput(inp) {
  for (let i = 0; i < 5; i++) {
    const el = document.getElementById("w-" + tries + "-l-" + (i + 1));
    el.textContent = inp[i];

    if (inp[i] == word[i]) {
      el.classList.add("green");
    } else {
      if (IsInWord(inp[i])) {
        el.classList.add("amber");
      } else {
        el.classList.add("gray");
        notInWord.textContent += inp[i];
      }
    }
  }

  let finalInp = GetWordString(inp);

  let finalWord = GetWordString(word);

  if (finalInp == finalWord) {
    GAME_STATE = "WON";
    DisplayFinal();
  } else if (tries >= 5) {
    GAME_STATE = "LOST";
    DisplayFinal();
  }
}

function IsInWord(letter) {
  for (let i = 0; i < 5; i++) {
    if (letter == word[i]) {
      return true;
    }
  }
  return false;
}

function GetWordString(array) {
  let wordString = "";

  for (let i = 0; i < array.length; i++) {
    wordString += array[i];
  }

  return wordString;
}

function DisplayFinal() {
  if (GAME_STATE == "WON") {
    outputTitle.textContent = "YOU WON!";
    outputDesc.textContent = "Tries: " + tries;
    document.getElementById("output-container").classList.add("win");
    document.getElementById("output-container").style.display = "block";
  } else {
    outputTitle.textContent = "Better luck next time!";
    outputDesc.textContent = "The word was: " + GetWordString(word);
    document.getElementById("output-container").classList.add("loose");
    document.getElementById("output-container").style.display = "block";
  }
}
