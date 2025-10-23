import fs from "fs";
import fetch from "node-fetch";

const GAMES_DIR = "./assets/games";
const GAMES_JSON = "./assets/games/games.json";
const SOURCE_URL = "https://api.npoint.io/93bed93a99df4c91044e";

async function main() {
  console.log("🚀 Démarrage de l'import automatique de 10 jeux...");

  if (!fs.existsSync(GAMES_DIR)) {
    fs.mkdirSync(GAMES_DIR, { recursive: true });
    console.log("📁 Dossier 'assets/games' créé !");
  }

  const res = await fetch(SOURCE_URL);
  if (!res.ok) throw new Error("❌ Erreur de téléchargement de la liste de jeux !");
  const data = await res.json();

  const newGames = data.sort(() => 0.5 - Math.random()).slice(0, 10);

  let existingGames = [];
  if (fs.existsSync(GAMES_JSON)) {
    existingGames = JSON.parse(fs.readFileSync(GAMES_JSON, "utf8"));
  }

  const updatedGames = [
    ...existingGames,
    ...newGames.filter(g => !existingGames.some(e => e.title === g.title)),
  ];

  fs.writeFileSync(GAMES_JSON, JSON.stringify(updatedGames, null, 2));

  console.log(`✅ ${newGames.length} nouveaux jeux ajoutés avec succès !`);
}

main().catch(err => {
  console.error("❌ Erreur d'import :", err);
  process.exit(1);
});
