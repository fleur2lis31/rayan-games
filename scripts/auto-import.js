const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// --- Configuration des chemins (games dans assets) ---
const GAMES_DIR = path.join(process.cwd(), 'assets', 'games');
const GAMES_JSON_PATH = path.join(process.cwd(), 'assets', 'games.json');
const API_URL = 'https://api.example.com/games';

// --- Fonction pour générer des jeux de test ---
function generateSampleGames() {
    const games = [];
    const categories = ['Arcade', 'Puzzle', 'Action', 'Aventure', 'Sport'];
    const names = ['Runner', 'Quest', 'Jump', 'Fight', 'Race'];

    for (let i = 0; i < 20; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const gameName = names[Math.floor(Math.random() * names.length)];
        const id = `game_${Date.now()}_${i}`;
        
        games.push({
            id: id,
            name: `${gameName} #${i + 1}`,
            description: `Un nouveau jeu de type ${category}. Dans ce jeu, vous devez survivre à des défis passionnants.`,
            category: category,
            price: Math.floor(Math.random() * 3 + 1) * 100 + 400,
            image: `assets/images/${gameName.toLowerCase()}${i + 1}.jpg`,
            file: `assets/games/${id}.html`,
            rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
            downloads: Math.floor(Math.random() * 2000),
            developer: 'UM Games Studio',
            releaseDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            tags: [category.toLowerCase(), gameName.toLowerCase()],
            features: ['Multijoueur', 'Classements']
        });
    }
    return games;
}

// --- Fonction principale ---
async function main() {
    try {
        console.log("🚀 Démarrage de l'importation des jeux...");
        
        // Créer le dossier assets/games s'il n'existe pas
        if (!fs.existsSync(GAMES_DIR)) {
            fs.mkdirSync(GAMES_DIR, { recursive: true });
            console.log('✅ Dossier assets/games créé');
        }
        
        // Créer le dossier assets/images s'il n'existe pas
        const imagesDir = path.join(process.cwd(), 'assets', 'images');
        if (!fs.existsSync(imagesDir)) {
            fs.mkdirSync(imagesDir, { recursive: true });
            console.log('✅ Dossier assets/images créé');
        }
        
        // Générer ou récupérer les jeux
        let gamesData;
        try {
            // Essayer de récupérer depuis l'API
            const response = await fetch(API_URL);
            if (response.ok) {
                gamesData = await response.json();
                console.log('📡 Données récupérées depuis l\'API');
            } else {
                throw new Error('API non disponible');
            }
        } catch (error) {
            console.log("📡 API non disponible, utilisation de données de test...");
            gamesData = generateSampleGames();
        }
        
        // Sauvegarder les données dans assets/games.json
        fs.writeFileSync(GAMES_JSON_PATH, JSON.stringify(gamesData, null, 2));
        console.log(`✅ ${gamesData.length} jeux sauvegardés dans assets/games.json`);
        
        // Sauvegarder chaque jeu individuellement dans assets/games/
        gamesData.forEach(game => {
            const gameFilePath = path.join(GAMES_DIR, `${game.id}.json`);
            fs.writeFileSync(gameFilePath, JSON.stringify(game, null, 2));
        });
        
        console.log(`🎮 ${gamesData.length} fichiers de jeux créés dans assets/games/`);
        console.log("✅ Importation terminée avec succès!");
        
    } catch (error) {
        console.error('❌ Erreur lors de l\'importation:', error);
        process.exit(1);
    }
}

// Lancer le script
main();
