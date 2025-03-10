const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");

async function fetchAPI(word) {
  try {
    infoTextEl.style.display = "block";
    meaningContainerEl.style.display = "none";
    infoTextEl.innerText = `Searching the meaning of "${word}"`;
    const result = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).then(res => res.json());
    
    if (result.title) {
      titleEl.innerText = word;
      meaningEl.innerText = "N/A";
      audioEl.style.display = "none";
    } else {
      titleEl.innerText = result[0].word;
      meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
      audioEl.src = result[0].phonetics[0].audio;
      audioEl.style.display = "inline-flex";
    }
    meaningContainerEl.style.display = "block";
    infoTextEl.style.display = "none";
  } catch (error) {
    infoTextEl.innerText = `An error occurred, try again later`;
  }
}

inputEl.addEventListener("keyup", (e) => e.key === "Enter" && e.target.value && fetchAPI(e.target.value));






