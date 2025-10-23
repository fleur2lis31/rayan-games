// scripts/auto-import.js
// ----------------------------------------------------
// 🤖 Script automatique pour importer 10 jeux HTML5/jour
// Compatible GitHub Actions (Node.js CommonJS)
// ----------------------------------------------------

const fs = require("fs");
const fetch = require("node-fetch");

// 📂 Dossier où seront ajoutés les jeux
const GAMES_DIR = "./assets/games";

// 📁 Fichier JSON listant les jeux visibles sur ton site
const GAMES_JSON = "./assets/games/games.json";

// 🔗 Source libre de jeux HTML5 (exemple)
const SOURCE_URL = "https://api.npoint.io/93bed93a99df4c91044e";

async function main() {
  console.log("🚀 Import automatique de 10 jeux...");

  // Vérifie si le dossier existe
  if (!fs.existsSync(GAMES_DIR)) {
    fs.mkdirSync(GAMES_DIR, { recursive: true });
    console.log("📁 Dossier créé :", GAMES_DIR);
  }

  // Télécharge la liste de jeux depuis la source
  const res = await fetch(SOURCE_URL);
  if (!res.ok) throw new Error("Impossible de télécharger la liste des jeux.");
  const data = await res.json();

  // Sélectionne 10 jeux aléatoires
  const newGames = data.sort(() => 0.5 - Math.random()).slice(0, 10);

  // Charge le fichier JSON existant (ou crée un nouveau)
  let existingGames = [];
  if (fs.existsSync(GAMES_JSON)) {
    try {
      existingGames = JSON.parse(fs.readFileSync(GAMES_JSON, "utf8"));
    } catch (e) {
      console.warn("⚠️ Erreur lecture games.json — il sera recréé.");
    }
  }

  // Ajoute les nouveaux jeux s'ils ne sont pas déjà présents
  const updatedGames = [
    ...existingGames,
    ...newGames.filter(g => !existingGames.some(e => e.title === g.title)),
  ];

  // Écrit le fichier JSON mis à jour
  fs.writeFileSync(GAMES_JSON, JSON.stringify(updatedGames, null, 2), "utf8");
  console.log(`✅ ${newGames.length} nouveaux jeux ajoutés.`);
}

main().catch(err => {
  console.error("❌ Erreur d'import :", err);
  process.exit(1);
});
