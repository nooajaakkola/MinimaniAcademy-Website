import { writeFileSync } from "node:fs";

const KEY = process.env.FACEIT_API_KEY;
const base = "https://open.faceit.com/data/v4";
const headers = { Authorization: `Bearer ${KEY}` };


const NICKS = [
  "naxuog",
  "MmAC-DOPZ",
  "MmAC-ZiwOo",
  "Visvajit",
  "coffenu",
  "MmAC-Megixx",
];

async function get(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${res.status} for ${url}`);
  return res.json();
}

const players = [];

for (const nick of NICKS) {
  try {
    const player = await get(`${base}/players?nickname=${nick}`);
    const stats = await get(`${base}/players/${player.player_id}/stats/cs2`);

    players.push({
      nickname: player.nickname,
      avatar: player.avatar,
      level: player.games?.cs2?.skill_level,
      elo: player.games?.cs2?.faceit_elo,
      kd: stats.lifetime?.["Average K/D Ratio"],
      winRate: stats.lifetime?.["Win Rate %"],
      matches: stats.lifetime?.["Matches"],
    });
  } catch (err) {
    console.error(`Failed for ${nick}:`, err.message);
  }
}

// If everything failed, stop so the old stats.json is kept
if (players.length === 0) {
  console.error("No players fetched, keeping old stats.json");
  process.exit(1);
}

writeFileSync(
  "stats.json",
  JSON.stringify({ updated: new Date().toISOString(), players }, null, 2)
);