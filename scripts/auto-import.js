// scripts/auto-import.js
// ----------------------------------------------------
// 🤖 Script automatique pour importer 10 jeux HTML5/jour
// ----------------------------------------------------

import fs from "fs";
import fetch from "node-fetch";

// 📂 Dossier où seront ajoutés les jeux
const GAMES_DIR = "./assets/games";

// 📁 Fichier JSON listant les jeux visibles sur ton site
const GAMES_JSON = "./assets/games/games.json";

// 🔗 Source libre de jeux HTML5
const SOURCE_URL = "https://api.npoint.io/93bed93a99df4c91044e"; // exemple de dataset libre (à personnaliser plus tard)

async function main() {
  console.log("🚀 Import automatique de 10 jeux...");

  // Vérifie si le dossier existe
  if (!fs.existsSync(GAMES_DIR)) fs.mkdirSync(GAMES_DIR, { recursive: true });

  // Télécharge une liste de jeux depuis une source libre
  const res = await fetch(SOURCE_URL);
  const data = await res.json();

  // Sélectionne 10 jeux aléatoires
  const newGames = data.sort(() => 0.5 - Math.random()).slice(0, 10);

  // Charge le fichier JSON existant (ou crée un nouveau)
  let existingGames = [];
  if (fs.existsSync(GAMES_JSON)) {
    existingGames = JSON.parse(fs.readFileSync(GAMES_JSON, "utf8"));
  }

  // Ajoute les nouveaux jeux s'ils ne sont pas déjà dans la liste
  const updatedGames = [
    ...existingGames,
    ...newGames.filter(g => !existingGames.some(e => e.title === g.title)),
  ];

  // Écrit le nouveau fichier JSON
  fs.writeFileSync(GAMES_JSON, JSON.stringify(updatedGames, null, 2));
  console.log(`✅ ${newGames.length} nouveaux jeux ajoutés.`);
}

main().catch(err => {
  console.error("❌ Erreur d'import :", err);
  process.exit(1);
});
