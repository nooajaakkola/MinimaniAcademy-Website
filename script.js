document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  if (hamburger && dropdownMenu) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove('active');
      }
    });
  }
});




const LEVEL_ICONS = {
  1:  "https://cdn3.emoji.gg/emojis/50077-faceit-1lvl.png",
  2:  "https://cdn3.emoji.gg/emojis/652778-faceitlevel2.png",
  3:  "https://cdn3.emoji.gg/emojis/35622-faceit-3lvl.png",
  4:  "https://cdn3.emoji.gg/emojis/63614-faceit-4lvl.png",
  5:  "https://cdn3.emoji.gg/emojis/95787-faceit-5lvl.png",
  6:  "https://cdn3.emoji.gg/emojis/68460-faceit-6lvl.png",
  7:  "https://cdn3.emoji.gg/emojis/67489-faceit-7lvl.png",
  8:  "https://cdn3.emoji.gg/emojis/58585-faceit-8lvl.png",
  9:  "https://cdn3.emoji.gg/emojis/60848-faceit-9level.png",
  10: "https://cdn3.emoji.gg/emojis/84242-faceit-10lvl.png",
};

fetch("stats.json")
  .then(r => r.json())
  .then(data => {
    const container = document.getElementById("players");

    data.players.forEach(p => {
      const level = Number(p.level);
      const iconUrl = LEVEL_ICONS[level];

      const card = document.createElement("div");
      card.className = "player-card";

      card.innerHTML = `
        <h3></h3>
        
        <div class="level-row">
        <p>Level: <span class="level"></span></p>
        <img class="level-icon" style="width: 35px; height: 35px;">
        </div>

        <p>ELO: <span class="elo"></span></p>
        <p>K/D: <span class="kd"></span></p>
        <p>Win rate: <span class="winrate"></span>%</p>
      `;

      const img = card.querySelector(".level-icon");
      if (iconUrl && !iconUrl.startsWith("PASTE")) {
        img.src = iconUrl;
        img.alt = "FACEIT level " + level;
      } else {
        img.remove();
      }

      card.querySelector("h3").textContent = p.nickname;
      card.querySelector(".elo").textContent = p.elo;
      card.querySelector(".kd").textContent = p.kd;
      card.querySelector(".winrate").textContent = p.winRate;

      container.appendChild(card);
    });
  })
  .catch(() => console.warn("Could not load FACEIT stats"));
