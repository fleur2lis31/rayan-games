const fs = require('fs');
const path = require('path');

// Configuration des chemins
const GAMES_DIR = path.join(process.cwd(), 'assets', 'games');
const GAMES_JSON_PATH = path.join(process.cwd(), 'assets', 'games.json');

// Fonction pour générer des jeux de test réalistes
function generateSampleGames() {
    const games = [];
    const categories = ['Arcade', 'Puzzle', 'Action', 'Aventure', 'Sport', 'Stratégie'];
    const names = ['Runner', 'Quest', 'Jump', 'Fight', 'Race', 'Mystery', 'Battle', 'Dream'];
    const developers = ['Neon Games', 'Cosmic Studio', 'Pixel Arts', 'Retro Devs', 'UM Games'];
    
    // Images par défaut (vous pouvez les remplacer)
    const defaultImages = [
        'assets/images/runner1.jpg',
        'assets/images/puzzle1.jpg', 
        'assets/images/action1.jpg',
        'assets/images/adventure1.jpg',
        'assets/images/sport1.jpg'
    ];

    for (let i = 0; i < 8; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const gameName = names[Math.floor(Math.random() * names.length)];
        const developer = developers[Math.floor(Math.random() * developers.length)];
        const id = `game_${Date.now()}_${i}`;
        const price = [199, 299, 399, 499, 599][Math.floor(Math.random() * 5)];
        const rating = parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)); // 3.5 à 5.0
        const downloads = Math.floor(Math.random() * 2000) + 100;
        
        const descriptions = {
            'Arcade': `Jeu d'arcade rapide et addictif avec des graphismes neon. Parfait pour les sessions courtes.`,
            'Puzzle': `Puzzle captivant qui stimule l'esprit. Idéal pour se détendre.`,
            'Action': `Action frénétique et combats épiques dans un monde immersif.`,
            'Aventure': `Aventure épique avec une histoire riche et des personnages mémorables.`,
            'Sport': `Simulation sportive réaliste avec des modes multijoueur compétitifs.`,
            'Stratégie': `Stratégie en temps réel qui teste vos compétences tactiques.`
        };

        games.push({
            id: id,
            name: `${gameName} ${i + 1}`,
            description: descriptions[category] || `Jeu ${category} passionnant avec des défis uniques.`,
            category: category,
            price: price,
            image: defaultImages[Math.floor(Math.random() * defaultImages.length)],
            file: `assets/games/${id}.html`,
            rating: rating,
            downloads: downloads,
            developer: developer,
            releaseDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            tags: [category.toLowerCase(), gameName.toLowerCase(), 'html5'],
            features: ['Multijoueur', 'Classements', 'Achievements'],
            size: `${(Math.random() * 50 + 10).toFixed(1)} MB`,
            version: '1.0.0'
        });
    }
    return games;
}

// Fonction principale
async function main() {
    try {
        console.log("🚀 Démarrage de l'importation des jeux...");
        
        // Créer les dossiers nécessaires
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
        console.log(`✅ Fichier principal sauvegardé: ${GAMES_JSON_PATH}`);
        
        // Sauvegarder chaque jeu individuellement
        let savedCount = 0;
        gamesData.forEach(game => {
            const gameFilePath = path.join(GAMES_DIR, `${game.id}.json`);
            fs.writeFileSync(gameFilePath, JSON.stringify(game, null, 2));
            savedCount++;
        });
        
        console.log(`📁 ${savedCount} fichiers jeux créés dans assets/games/`);
        
        // Créer un fichier README dans assets/games/
        const readmeContent = `# Jeux MyUM Games\n\nCe dossier contient les fichiers JSON des jeux disponibles sur la plateforme.\n\nGénéré automatiquement le: ${new Date().toISOString()}\nTotal jeux: ${gamesData.length}\n\n## Structure\n\nChaque fichier .json contient:\n- Informations du jeu\n- Métadonnées\n- Prix et catégorie\n- Liens vers les ressources\n`;
        fs.writeFileSync(path.join(GAMES_DIR, 'README.md'), readmeContent);
        
        console.log("✅ Importation terminée avec succès!");
        console.log("📊 Résumé:");
        console.log(`   - Jeux créés: ${gamesData.length}`);
        console.log(`   - Catégories: ${[...new Set(gamesData.map(g => g.category))].join(', ')}`);
        console.log(`   - Prix moyen: ${Math.round(gamesData.reduce((sum, g) => sum + g.price, 0) / gamesData.length)} DA`);
        
    } catch (error) {
        console.error('❌ Erreur lors de l\'importation:', error);
        process.exit(1);
    }
}

// Démarrer le script
if (require.main === module) {
    main();
}

module.exports = { generateSampleGames };
