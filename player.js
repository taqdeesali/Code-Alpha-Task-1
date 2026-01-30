/* ================= ELEMENTS ================= */
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const volumeIcon = document.getElementById("volumeIcon");

const playlistEl = document.getElementById("playlist");
const autoplay = document.getElementById("autoplay");

const currentTimeEl = document.getElementById("current");
const durationEl = document.getElementById("duration");

/* ================= SONG LIST ================= */
const songs = [
  { title: "Perfect", artist: "Ed Sheeran", src: "songs/perfect.mp3", cover: "covers/perfect.jpg" },
  { title: "Pal Pal", artist: "Afsic", src: "songs/pal-pal.mp3", cover: "covers/pal-pal.jpeg" },
  { title: "Dooron Dooron", artist: "Paresh", src: "songs/dooron-dooron.mp3", cover: "covers/dooron-dooron.jpeg" },
  { title: "Ishqa Ve", artist: "Zeeshan Ali", src: "songs/ishqa-ve.mp3", cover: "covers/ishqa-ve.jpg" },
  { title: "Jhol", artist: "Coke Studio", src: "songs/jhol.mp3", cover: "covers/jhol.jpeg" },
  { title: "Darkhaast", artist: "Arijit Singh", src: "songs/darkhaast.mp3", cover: "covers/daarkhaast.jpg" },
  { title: "Ehsaas", artist: "Faheem Abdullah", src: "songs/ehsaas.mp3", cover: "covers/ehsaas.jpeg" },
  { title: "People You Know", artist: "Selena Gomez", src: "songs/people-you-know.mp3", cover: "covers/people-you-know.jpg" },
  { title: "I Wanna Be Yours", artist: "Arctic Monkeys", src: "songs/i-wanna-be-yours.mp3", cover: "covers/i-wanna-be-yours.jpg" }
];

/* ================= CURRENT SONG INDEX ================= */
// Check if user clicked a song from homepage
let index = parseInt(localStorage.getItem("currentSongIndex")) || 0;

/* ================= LOAD SONG ================= */
function loadSong(i) {
  const song = songs[i];
  audio.src = song.src;
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  updateActive();
}

loadSong(index);

/* ================= PLAYLIST ================= */
songs.forEach((song, i) => {
  const li = document.createElement("li");
  li.innerHTML = `<span>${song.title}</span> <small>${song.artist}</small>`;
  li.addEventListener("click", () => {
    index = i;
    loadSong(index);
    playSong();
  });
  playlistEl.appendChild(li);
});

function updateActive() {
  document.querySelectorAll("#playlist li").forEach((li, i) => {
    li.classList.toggle("active", i === index);
  });
}
// Header toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

/* ================= PLAY / PAUSE ================= */
function playSong() {
  audio.play();
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  cover.classList.add("rotating"); // resumes rotation
}

function pauseSong() {
  audio.pause();
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
  cover.classList.remove("rotating"); // pauses rotation, DOES NOT reset
}


playBtn.addEventListener("click", () => {
  audio.paused ? playSong() : pauseSong();
});

/* ================= NEXT / PREV ================= */
nextBtn.addEventListener("click", () => {
  index = (index + 1) % songs.length;
  loadSong(index);
  playSong();
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + songs.length) % songs.length;
  loadSong(index);
  playSong();
});

/* ================= TIME FORMAT ================= */
function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? "0" + s : s}`;
}

/* ================= PROGRESS ================= */
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  progress.value = (audio.currentTime / audio.duration) * 100;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

/* ================= VOLUME ================= */
volume.addEventListener("input", () => {
  audio.volume = volume.value;
  updateVolumeIcon();
});

function updateVolumeIcon() {
  if (audio.volume === 0) {
    volumeIcon.className = "fas fa-volume-xmark";
  } else if (audio.volume < 0.5) {
    volumeIcon.className = "fas fa-volume-low";
  } else {
    volumeIcon.className = "fas fa-volume-high";
  }
}

volumeIcon.addEventListener("click", () => {
  if (audio.volume > 0) {
    audio.volume = 0;
    volume.value = 0;
  } else {
    audio.volume = 0.7;
    volume.value = 0.7;
  }
  updateVolumeIcon();
});

/* ================= AUTOPLAY ================= */
audio.addEventListener("ended", () => {
  if (autoplay.checked) nextBtn.click();
});

/* ================= DEFAULT SETTINGS ================= */
// Force full volume on page load
audio.volume = 1;         // audio volume full
volume.value = 1;         // slider at full
updateVolumeIcon();       // update icon to high
