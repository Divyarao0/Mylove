// Buttons & Elements
const noBtn = document.getElementById("no");
const card = document.querySelector(".card");
const yesBtn = document.getElementById("yes");

const music = document.getElementById("music");
const tap = document.getElementById("tap");


// ---------------- NO BUTTON MOVE ----------------

function moveNo() {

  if (!noBtn || !card) return;

  // Get updated size every time (important for responsive)
  const cardRect = card.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = cardRect.width - btnRect.width;
  const maxY = cardRect.height - btnRect.height;

  // Prevent negative values (small screens)
  const x = Math.max(0, Math.random() * maxX);
  const y = Math.max(0, Math.random() * maxY);

  noBtn.style.position = "absolute";
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
}


// Desktop
noBtn?.addEventListener("mouseenter", moveNo);

// Mobile
noBtn?.addEventListener("touchstart", (e) => {
  e.preventDefault(); // stop zoom/scroll
  moveNo();
});


// ---------------- MUSIC SYSTEM ----------------

// Start music on tap
if (tap && music) {

  tap.addEventListener("click", () => {

    let time = localStorage.getItem("time");

    if (time) {
      music.currentTime = time;
    }

    music.play().catch(() => {});

    localStorage.setItem("started", "yes");

    tap.style.display = "none";
  });

}


// Auto play on reload
window.addEventListener("load", () => {

  if (music && localStorage.getItem("started") === "yes") {

    let time = localStorage.getItem("time");

    if (time) {
      music.currentTime = time;
    }

    music.play().catch(() => {});
  }

});


// Save music time
setInterval(() => {

  if (music && !music.paused) {
    localStorage.setItem("time", music.currentTime);
  }

}, 1000);


// ---------------- YES BUTTON ----------------

yesBtn?.addEventListener("click", () => {
  window.location.href = "yes.html";
});


// ---------------- HANDLE SCREEN RESIZE ----------------

// Re-adjust button if screen changes
window.addEventListener("resize", moveNo);
