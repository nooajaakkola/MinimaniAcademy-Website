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

const DISPLAY_NAMES = {
  "naxuog": "N1mple",
  "coffenu": "Eliksib",
  "mmac-dopz": "DOPZ",
  "mmac-megixx": "Megixx",
  "mmac-ziwoo": "ZiwOo",
  "visvajit": "Vonk",
};

const PLAYER_IMAGES = {
  "naxuog": "images/bp n1mple.png",
  "coffenu": "images/eliksib mog v2.png",
  "mmac-dopz": "images/dopz mog v2.png",
  "mmac-megixx": "images/megixx mog.png",
  "mmac-ziwoo": "images/ziwoo mog.png",
  "visvajit": "images/vonk mog.png",
};

const PLAYER_ROLES = {
  "naxuog": "Rifler, Entry",
  "coffenu": "True IGL, Support",
  "mmac-dopz": "Lurk, Anchor",
  "mmac-megixx": "Sub IGL, Utility demon",
  "mmac-ziwoo": "Baiter, AWPer",
  "visvajit": "SMGer, Speed demon",
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
        <img class="player-card-img">

        <div class="player-card-header">
        <h3></h3>
        <img class="level-icon" style="width: 35px; height: 35px;">
        </div>

        <p class="player-roles"></p>


        <div class="player-stats">
        <h4>FACEIT stats:</h4>
        <p>ELO: <span class="elo"></span></p>
        <p>K/D: <span class="kd"></span></p>
        <p>Win rate: <span class="winrate"></span><span>%</span></p>
        </div>
      `;

      const img = card.querySelector(".level-icon");
      if (iconUrl && !iconUrl.startsWith("PASTE")) {
        img.src = iconUrl;
        img.alt = "FACEIT level " + level;
      } else {
        img.remove();
      }

      const cardImg = card.querySelector(".player-card-img");
      const imgSrc = PLAYER_IMAGES[p.nickname.toLowerCase()] || p.avatar;

      if (imgSrc) {
        cardImg.src = imgSrc;
        cardImg.alt = p.nickname;
      } else {
        cardImg.remove();
      }

      card.querySelector("h3").textContent = DISPLAY_NAMES[p.nickname.toLowerCase()] || p.nickname;
      card.querySelector(".player-roles").textContent = PLAYER_ROLES[p.nickname.toLowerCase()];
      card.querySelector(".elo").textContent = p.elo;
      card.querySelector(".kd").textContent = p.kd;
      card.querySelector(".winrate").textContent = p.winRate;

      container.appendChild(card);
    });
  })
  .catch(() => console.warn("Could not load FACEIT stats"));
