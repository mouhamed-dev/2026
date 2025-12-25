const container = document.getElementById("fireworks-container");

const fireworks = new Fireworks.default(container, {
  autoresize: true,
  opacity: 0.5,
  acceleration: 1.05,
  friction: 0.97,
  gravity: 1.5,
  particles: 50,
  traceLength: 3,
  traceSpeed: 10,
  explosion: 10,
  intensity: 30,
  flickering: 50,
  lineStyle: "round",
  hue: { min: 0, max: 360 },
  delay: { min: 30, max: 60 },
  rocketsPoint: { min: 50, max: 50 },
  lineWidth: {
    explosion: { min: 1, max: 3 },
    trace: { min: 1, max: 5 },
  },
  brightness: { min: 50, max: 80 },
  decay: { min: 0.015, max: 0.03 },

  mouse: {
    click: true,
    move: false,
    max: 4,
  },
  sound: {
    enabled: false,
    files: [],
    volume: { min: 4, max: 8 },
  },
});

fireworks.start();

// 🔊 Son BOUM en intervalle
const boomBg = new Audio("boom.m4a");
boomBg.volume = 0.6;

let boomInterval = null;
let audioStarted = false;

function startBoomInterval() {
  if (boomInterval) return;

  boomInterval = setInterval(() => {
    const boom = boomBg.cloneNode();
    boom.volume = 1;
    boom.play().catch(() => {});
  }, 13000); //
}

// Son manuel au clic
container.addEventListener("click", () => {
  const audio = new Audio(
    "https://cdn.freesound.org/previews/251/251614_4040997-lq.mp3"
  );
  audio.volume = 1;
  audio.play().catch((e) => console.log("Erreur de lecture du son:", e));

  if (!audioStarted) {
    const firstBoom = boomBg.cloneNode();
    firstBoom.volume = 0.6;
    firstBoom.play().catch(() => {});

    startBoomInterval();
    audioStarted = true;
  }
});

// Mise à jour de la date et de l'heure
function updateDateTime() {
  const now = new Date();
  const newYear = new Date("2026-01-01T00:00:00");

  const dateEl = document.getElementById("date");
  const timeEl = document.getElementById("time");

  if (now >= newYear) {
    dateEl.textContent = "Bonne et Heureuse Année 2026 ! 🎉";
    timeEl.textContent = now.toLocaleTimeString("fr-FR");
    return;
  }

  const dateStr = now.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  dateEl.textContent = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);

  timeEl.textContent = now.toLocaleTimeString("fr-FR");
}

updateDateTime();
setInterval(updateDateTime, 1000);
