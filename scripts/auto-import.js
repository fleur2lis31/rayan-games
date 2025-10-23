import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Pour __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration des chemins
const GAMES_DIR = path.join(process.cwd(), 'assets', 'games');
const GAMES_JSON_PATH = path.join(process.cwd(), 'assets', 'games.json');

function generateSampleGames() {
    const games = [];
    const categories = ['Arcade', 'Puzzle', 'Action', 'Aventure', 'Sport'];
    const names = ['Runner', 'Quest', 'Jump', 'Fight', 'Race'];
    const developers = ['Neon Games', 'Cosmic Studio', 'Pixel Arts', 'Retro Devs'];

    for (let i = 0; i < 8; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const gameName = names[Math.floor(Math.random() * names.length)];
        const developer = developers[Math.floor(Math.random() * developers.length)];
        const id = `game_${Date.now()}_${i}`;
        const price = [199, 299, 399, 499][Math.floor(Math.random() * 4)];
        const rating = parseFloat((Math.random() * 1.5 + 3.5).toFixed(1));
        const downloads = Math.floor(Math.random() * 2000) + 100;
        
        games.push({
            id: id,
            name: `${gameName} ${i + 1}`,
            description: `Jeu ${category} passionnant avec des défis uniques. Développé par ${developer}.`,
            category: category,
            price: price,
            image: `assets/images/game${i + 1}.jpg`,
            file: `assets/games/${id}.html`,
            rating: rating,
            downloads: downloads,
            developer: developer,
            releaseDate: new Date().toISOString().split('T')[0],
            tags: [category.toLowerCase(), gameName.toLowerCase()],
            features: ['Multijoueur', 'Classements'],
            size: '15.2 MB'
        });
    }
    return games;
}

async function main() {
    try {
        console.log("🚀 Démarrage de l'importation des jeux...");
        
        // Créer les dossiers
        if (!fs.existsSync(GAMES_DIR)) {
            fs.mkdirSync(GAMES_DIR, { recursive: true });
            console.log('✅ Dossier assets/games créé');
        }
        
        const imagesDir = path.join(process.cwd(), 'assets', 'images');
        if (!fs.existsSync(imagesDir)) {
            fs.mkdirSync(imagesDir, { recursive: true });
            console.log('✅ Dossier assets/images créé');
        }
        
        // Générer les jeux
        const gamesData = generateSampleGames();
        console.log(`🎮 ${gamesData.length} jeux générés`);
        
        // Sauvegarder le fichier principal
        fs.writeFileSync(GAMES_JSON_PATH, JSON.stringify(gamesData, null, 2));
        console.log(`✅ Fichier principal sauvegardé: assets/games.json`);
        
        // Sauvegarder chaque jeu individuellement
        gamesData.forEach(game => {
            const gameFilePath = path.join(GAMES_DIR, `${game.id}.json`);
            fs.writeFileSync(gameFilePath, JSON.stringify(game, null, 2));
        });
        
        console.log(`📁 ${gamesData.length} fichiers jeux créés dans assets/games/`);
        console.log("✅ Importation terminée avec succès!");
        
    } catch (error) {
        console.error('❌ Erreur lors de l\'importation:', error);
        process.exit(1);
    }
}

// Démarrer le script
main();
