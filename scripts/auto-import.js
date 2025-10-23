// scripts/auto-import.js
// ----------------------------------------------------
// 🤖 Script automatique pour importer 10 jeux HTML5/jour
// ----------------------------------------------------

// ✅ Import des modules en ES6 (compatibles avec "type": "module")
import fs from "fs";
import fetch from "node-fetch";

// 📂 Dossier où seront ajoutés les jeux
const GAMES_DIR = "./assets/games";

// 📁 Fichier JSON listant les jeux visibles sur ton site
const GAMES_JSON = "./assets/games/games.json";

// 🔗 Source libre de jeux HTML5 (exemple de dataset libre)
const SOURCE_URL = "https://api.npoint.io/93bed93a99df4c91044e"; 
// 🔹 Tu pourras plus tard le remplacer par ton propre endpoint (API, base de données, etc.)

async function main() {
  console.log("🚀 Démarrage de l'import automatique de 10 jeux...");

  // Vérifie si le dossier existe
  if (!fs.existsSync(GAMES_DIR)) {
    fs.mkdirSync(GAMES_DIR, { recursive: true });
    console.log("📁 Dossier 'assets/games' créé !");
  }

  // Télécharge la liste de jeux depuis la source
  const res = await fetch(SOURCE_URL);
  if (!res.ok) throw new Error("❌ Erreur de téléchargement de la liste de jeux !");
  const data = await res.json();

  // Sélectionne 10 jeux aléatoires
  const newGames = data.sort(() => 0.5 - Math.random()).slice(0, 10);

  // Charge la liste existante (ou crée une nouvelle)
  let existingGames = [];
  if (fs.existsSync(GAMES_JSON)) {
    existingGames = JSON.parse(fs.readFileSync(GAMES_JSON, "utf8"));
  }

  // Ajoute les nouveaux jeux en évitant les doublons
  const updatedGames = [
    ...existingGames,
    ...newGames.filter(g => !existingGames.some(e => e.title === g.title)),
  ];

  // Sauvegarde le nouveau fichier JSON
  fs.writeFileSync(GAMES_JSON, JSON.stringify(updatedGames, null, 2));

  console.log(`✅ ${newGames.length} nouveaux jeux ajoutés avec succès !`);
}

main().catch(err => {
  console.error("❌ Erreur d'import :", err);
  process.exit(1);
});
