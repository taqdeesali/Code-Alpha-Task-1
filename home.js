document.addEventListener("DOMContentLoaded", () => {
  const songsGrid = document.getElementById("songsGrid");
  const categoriesGrid = document.getElementById("categoriesGrid");

  const songs = [
    { title: "Perfect", artist: "Ed Sheeran", cover: "covers/perfect.jpg", category: "Romantic" },
    { title: "Pal Pal", artist: "Afsic", cover: "covers/pal-pal.jpeg", category: "Romantic" },
    { title: "Dooron Dooron", artist: "Paresh", cover: "covers/dooron-dooron.jpeg", category: "Indie" },
    { title: "Ishqa Ve", artist: "Zeeshan Ali", cover: "covers/ishqa-ve.jpg", category: "Romantic" },
    { title: "Jhol", artist: "Coke Studio", cover: "covers/jhol.jpeg", category: "Coke Studio" },
    { title: "Darkhaast", artist: "Arijit Singh", cover: "covers/daarkhaast.jpg", category: "Bollywood" },
    { title: "Ehsaas", artist: "Faheem Abdullah", cover: "covers/ehsaas.jpeg", category: "Indie" },
    { title: "People You Know", artist: "Selena Gomez", cover: "covers/people-you-know.jpg", category: "Pop" },
    { title: "I Wanna Be Yours", artist: "Arctic Monkeys", cover: "covers/i-wanna-be-yours.jpg", category: "Pop" }
  ];

  // Create song card
  function createSongCard(song, index) {
    const div = document.createElement("div");
    div.className = "song-card";
    div.innerHTML = `
      <img src="${song.cover}" alt="${song.title}">
      <h3>${song.title}</h3>
      <p>${song.artist}</p>
    `;
    div.onclick = () => {
      localStorage.setItem("currentSongIndex", index);
      window.location.href = "player.html";
    };
    return div;
  }

  // Display all songs initially
  songs.forEach((song,i)=> songsGrid.appendChild(createSongCard(song,i)));

  // Generate unique categories + add "All"
  const categories = ["All", ...new Set(songs.map(s => s.category))];

  categories.forEach(cat => {
    const card = document.createElement("div");
    card.className = "category-card";
    card.innerHTML = `<span>${cat}</span>`;
    card.onclick = () => {
      songsGrid.innerHTML = "";
      if(cat === "All") {
        songs.forEach((song,i)=> songsGrid.appendChild(createSongCard(song,i)));
      } else {
        songs.forEach((song,i)=> {
          if(song.category === cat) songsGrid.appendChild(createSongCard(song,i));
        });
      }
    };
    categoriesGrid.appendChild(card);
  });
// Header toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

  // SEARCH functionality
  const searchInput = document.getElementById("search");
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    songsGrid.innerHTML = "";
    songs.forEach((song,i)=>{
      if(song.title.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query)) {
        songsGrid.appendChild(createSongCard(song,i));
      }
    });
  });

});
