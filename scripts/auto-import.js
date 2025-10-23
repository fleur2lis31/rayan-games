import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GAMES_DIR = path.join(process.cwd(), 'assets', 'games');
const GAMES_JSON_PATH = path.join(process.cwd(), 'assets', 'games.json');
const GAMES_ZIP_DIR = path.join(process.cwd(), 'assets', 'downloads');

function generateSampleGames() {
    const games = [];
    const gameTemplates = [
        {
            name: "Runner Neon",
            category: "Arcade",
            description: "Jeu de course rapide avec effets neon. Évitez les obstacles et battez votre record !",
            price: 299,
            size: "15.2 MB",
            features: ["Graphismes Neon", "Multijoueur", "Classements"],
            exe: "runner_neon.exe",
            requirements: "Windows 10+ • 2GB RAM • Carte graphique compatible OpenGL"
        },
        {
            name: "Puzzle Galaxy", 
            category: "Puzzle",
            description: "Puzzle spatial relaxant avec 50 niveaux uniques. Parfait pour se détendre.",
            price: 199,
            size: "8.7 MB",
            features: ["50 Niveaux", "Musique relaxante", "Sauvegarde cloud"],
            exe: "puzzle_galaxy.exe",
            requirements: "Windows 7+ • 1GB RAM"
        },
        {
            name: "Battle Arena",
            category: "Action",
            description: "Combattez dans une arène épique avec des pouvoirs spéciaux et des combos uniques.",
            price: 399,
            size: "25.1 MB",
            features: ["4 Personnages", "Mode histoire", "Multijoueur local"],
            exe: "battle_arena.exe",
            requirements: "Windows 10+ • 4GB RAM • Carte graphique dédiée"
        },
        {
            name: "Mystery Quest",
            category: "Aventure",
            description: "Aventure mystérieuse avec énigmes complexes et histoire captivante.",
            price: 349,
            size: "18.9 MB",
            features: ["Histoire riche", "Environnements variés", "Système de dialogue"],
            exe: "mystery_quest.exe",
            requirements: "Windows 8+ • 2GB RAM"
        },
        {
            name: "Extreme Racing",
            category: "Sport",
            description: "Course de voitures extrême avec physique réaliste et circuits dangereux.",
            price: 449,
            size: "32.5 MB",
            features: ["10 Circuits", "8 Voitures", "Mode carrière"],
            exe: "extreme_racing.exe",
            requirements: "Windows 10+ • 4GB RAM • Carte graphique 2GB"
        },
        {
            name: "Zombie Survival",
            category: "Survival",
            description: "Survivez à une apocalypse zombie en gérant vos ressources et en fortifiant votre base.",
            price: 499,
            size: "28.3 MB",
            features: ["Crafting", "Base building", "Zombies intelligents"],
            exe: "zombie_survival.exe",
            requirements: "Windows 10+ • 4GB RAM • Carte graphique 2GB"
        },
        {
            name: "Farm Simulator",
            category: "Simulation",
            description: "Gérez votre propre ferme, cultivez des récoltes et élevez des animaux.",
            price: 299,
            size: "12.8 MB",
            features: ["Saisons dynamiques", "50+ Cultures", "Marché économique"],
            exe: "farm_simulator.exe",
            requirements: "Windows 7+ • 2GB RAM"
        },
        {
            name: "Space Explorer",
            category: "Aventure",
            description: "Explorez l'univers, découvrez de nouvelles planètes et rencontrez des aliens.",
            price: 599,
            size: "45.2 MB",
            features: ["Univers procédural", "Vaisseaux personnalisables", "Quêtes dynamiques"],
            exe: "space_explorer.exe",
            requirements: "Windows 10+ • 8GB RAM • Carte graphique 4GB"
        },
        {
            name: "Math Challenge",
            category: "Éducatif",
            description: "Jeu éducatif pour améliorer vos compétences en mathématiques de façon amusante.",
            price: 149,
            size: "5.1 MB",
            features: ["4 Opérations", "Niveaux progressifs", "Tableaux de scores"],
            exe: "math_challenge.exe",
            requirements: "Windows XP+ • 512MB RAM"
        },
        {
            name: "Music Maker",
            category: "Créatif",
            description: "Créez votre propre musique avec des instruments virtuels et des effets professionnels.",
            price: 699,
            size: "38.7 MB",
            features: ["8 Instruments", "Effets audio", "Export MP3"],
            exe: "music_maker.exe",
            requirements: "Windows 10+ • 4GB RAM • Carte son compatible"
        }
    ];

    for (let i = 0; i < gameTemplates.length; i++) {
        const template = gameTemplates[i];
        const id = `game_${Date.now()}_${i}`;
        const zipFileName = `${template.name.toLowerCase().replace(/\s+/g, '_')}.zip`;
        
        games.push({
            id: id,
            name: template.name,
            description: template.description,
            category: template.category,
            price: template.price,
            image: `assets/images/game${i + 1}.jpg`,
            file: `assets/downloads/${zipFileName}`,
            rating: parseFloat((Math.random() * 1.5 + 3.5).toFixed(1)),
            downloads: Math.floor(Math.random() * 5000) + 100,
            developer: "Rayan Games Studio",
            releaseDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            tags: [template.category.toLowerCase(), 'windows', 'downloadable'],
            features: template.features,
            size: template.size,
            version: '1.0.0',
            executable: template.exe,
            requirements: template.requirements,
            zipFile: zipFileName
        });
    }
    return games;
}

function createGameZipFiles(games) {
    if (!fs.existsSync(GAMES_ZIP_DIR)) {
        fs.mkdirSync(GAMES_ZIP_DIR, { recursive: true });
        console.log('✅ Dossier assets/downloads créé');
    }

    games.forEach(game => {
        const zipFilePath = path.join(GAMES_ZIP_DIR, game.zipFile);
        
        // Contenu du README.txt
        const readmeContent = `TITRE: ${game.name}
CATÉGORIE: ${game.category}
PRIX: ${game.price} DA
DÉVELOPPEUR: ${game.developer}
VERSION: ${game.version}
TAILLE: ${game.size}

DESCRIPTION:
${game.description}

FONCTIONNALITÉS:
${game.features.map(f => `• ${f}`).join('\n')}

EXÉCUTABLE: ${game.executable}
CONFIGURATION REQUISE: ${game.requirements}

INSTRUCTIONS D'INSTALLATION:
1. Extraire ce fichier ZIP
2. Lancer ${game.executable}
3. Profiter du jeu !

SUPPORT:
Email: rayan.games812014@gmail.com

MERCI POUR VOTRE ACHAT ! 🎮`;

        // Pour l'instant, on crée juste le README.txt dans le ZIP
        // (Dans une vraie implémentation, vous utiliseriez une librairie ZIP)
        const fakeZipContent = `Ceci est une simulation du fichier ZIP pour ${game.name}\n\n${readmeContent}`;
        
        fs.writeFileSync(zipFilePath, fakeZipContent);
        console.log(`📦 Fichier ZIP créé: ${game.zipFile}`);
    });
}

async function main() {
    try {
        console.log("🚀 Démarrage de l'importation des jeux...");
        
        // Créer les dossiers
        if (!fs.existsSync(GAMES_DIR)) {
            fs.mkdirSync(GAMES_DIR, { recursive: true });
        }
        
        const imagesDir = path.join(process.cwd(), 'assets', 'images');
        if (!fs.existsSync(imagesDir)) {
            fs.mkdirSync(imagesDir, { recursive: true });
        }

        // Générer les jeux
        const gamesData = generateSampleGames();
        console.log(`🎮 ${gamesData.length} jeux générés`);

        // Créer les fichiers ZIP
        createGameZipFiles(gamesData);

        // Sauvegarder le fichier principal
        fs.writeFileSync(GAMES_JSON_PATH, JSON.stringify(gamesData, null, 2));
        console.log(`✅ Fichier principal sauvegardé: assets/games.json`);
        
        console.log("✅ Importation terminée avec succès!");
        console.log(`📊 ${gamesData.length} jeux disponibles avec fichiers ZIP`);
        
    } catch (error) {
        console.error('❌ Erreur lors de l\'importation:', error);
        process.exit(1);
    }
}

main();
