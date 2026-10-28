import { writeFileSync } from "node:fs";

const KEY = process.env.FACEIT_API_KEY;
const NICK = "naxuog";
const headers = { Authorization: `Bearer ${KEY}` };
const base = "https://open.faceit.com/data/v4";

const player = await (await fetch(`${base}/players?nickname=${NICK}`, { headers })).json();
const stats = await (await fetch(`${base}/players/${player.player_id}/stats/cs2`, { headers })).json();

const out = {
  nickname: player.nickname,
  level: player.games?.cs2?.skill_level,
  elo: player.games?.cs2?.faceit_elo,
  kd: stats.lifetime?.["Average K/D Ratio"],
  winRate: stats.lifetime?.["Win Rate %"],
  matches: stats.lifetime?.["Matches"],
  updated: new Date().toISOString(),
};

writeFileSync("stats.json", JSON.stringify(out, null, 2));