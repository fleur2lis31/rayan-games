import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GAMES_DIR = path.join(process.cwd(), 'assets', 'games');
const GAMES_JSON_PATH = path.join(process.cwd(), 'assets', 'games.json');
const GAMES_DOWNLOAD_DIR = path.join(process.cwd(), 'assets', 'downloads');

function generate100Games() {
    const categories = {
        'Classique': { price: 199, color: '#7c5cff' },
        'Puzzle': { price: 149, color: '#00d1ff' },
        'Arcade': { price: 179, color: '#ff6b6b' },
        'Stratégie': { price: 249, color: '#4cd964' },
        'Casual': { price: 99, color: '#ffd166' },
        'Créatif': { price: 129, color: '#a78bfa' }
    };

    const games = [
        // CLASSIQUES (20 jeux)
        { name: "Pong Classic", category: "Classique", description: "Jeu de tennis rétro avec physique réaliste" },
        { name: "Snake Retro", category: "Classique", description: "Serpent classique avec mode de vitesse progressive" },
        { name: "Tetris Blocks", category: "Classique", description: "Empilez les blocs et complétez des lignes" },
        { name: "Space Invaders", category: "Classique", description: "Détruisez les envahisseurs spatiaux" },
        { name: "Pac-Man Mini", category: "Classique", description: "Mangez les points et évitez les fantômes" },
        { name: "Breakout Pro", category: "Classique", description: "Casse-briques avec power-ups spéciaux" },
        { name: "Asteroids 3D", category: "Classique", description: "Détruisez les astéroïdes dans l'espace" },
        { name: "Frogger City", category: "Classique", description: "Traversez la route et la rivière" },
        { name: "Donkey Kong Jr", category: "Classique", description: "Sauvez votre père des griffes de Kong" },
        { name: "Galaga Stars", category: "Classique", description: "Combat spatial contre les aliens" },
        { name: "Missile Defense", category: "Classique", description: "Protégez vos villes des missiles" },
        { name: "Centipede Chase", category: "Classique", description: "Chassez le mille-pattes dans le jardin" },
        { name: "Q*bert Pyramid", category: "Classique", description: "Changez les couleurs des pyramides" },
        { name: "Dig Dug Adventure", category: "Classique", description: "Creusez et gonflez les ennemis" },
        { name: "Joust Champions", category: "Classique", description: "Combattez sur des autruches volantes" },
        { name: "Bubble Dragon", category: "Classique", description: "Capturez les ennemis dans des bulles" },
        { name: "Arkanoid Ultra", category: "Classique", description: "Casse-briques avec raquette spéciale" },
        { name: "Bomberman Arena", category: "Classique", description: "Posez des bombes et échappez-vous" },
        { name: "Mario Jump", category: "Classique", description: "Plateforme simple avec sauts précis" },
        { name: "Zelda Quest", category: "Classique", description: "Aventure en vue de dessus avec énigmes" },

        // PUZZLES (20 jeux)
        { name: "Memory Master", category: "Puzzle", description: "Trouvez les paires de cartes identiques" },
        { name: "Sudoku Pro", category: "Puzzle", description: "Grilles de Sudoku avec 4 niveaux de difficulté" },
        { name: "Minesweeper X", category: "Puzzle", description: "Démineur classique avec mode chrono" },
        { name: "Nonogram Art", category: "Puzzle", description: "Résolvez les grilles pour révéler l'image" },
        { name: "Mahjong Solitaire", category: "Puzzle", description: "Retirez les tuiles par paires" },
        { name: "Tangram Magic", category: "Puzzle", description: "Créez des formes avec les pièces" },
        { name: "2048 Infinity", category: "Puzzle", description: "Fusionnez les nombres pour atteindre 2048" },
        { name: "Candy Match", category: "Puzzle", description: "Alignez 3 bonbons identiques" },
        { name: "Pipe Dream", category: "Puzzle", description: "Connectez les tuyaux pour faire couler l'eau" },
        { name: "Lights Puzzle", category: "Puzzle", description: "Éteignez toutes les lumières" },
        { name: "Slide Master", category: "Puzzle", description: "Reconstituez l'image en glissant les pièces" },
        { name: "Word Search", category: "Puzzle", description: "Trouvez les mots cachés dans la grille" },
        { name: "Crossword Daily", category: "Puzzle", description: "Mots croisés avec indices intelligents" },
        { name: "Jigsaw World", category: "Puzzle", description: "Puzzle avec belles images à reconstituer" },
        { name: "Flow Free HD", category: "Puzzle", description: "Connectez les points de même couleur" },
        { name: "Unblock Car", category: "Puzzle", description: "Libérez la voiture rouge du parking" },
        { name: "Sokoban Box", category: "Puzzle", description: "Poussez les caisses vers les cibles" },
        { name: "Number Link", category: "Puzzle", description: "Reliez les nombres sans croisement" },
        { name: "Hexa Puzzle", category: "Puzzle", description: "Logique sur grille hexagonale" },
        { name: "Kakuro Master", category: "Puzzle", description: "Croisement entre mots croisés et sudoku" },

        // ARCADE (20 jeux)
        { name: "Flappy Bird Pro", category: "Arcade", description: "Évitez les tuyaux avec le oiseau volant" },
        { name: "Geometry Rush", category: "Arcade", description: "Course rythmique avec musique entraînante" },
        { name: "Doodle Jump Max", category: "Arcade", description: "Saut infinie sur les plateformes" },
        { name: "Subway Runner", category: "Arcade", description: "Course infinie dans le métro" },
        { name: "Temple Adventure", category: "Arcade", description: "Course 3D dans un temple ancien" },
        { name: "Fruit Slice", category: "Arcade", description: "Découpez les fruits en l'air" },
        { name: "Angry Birds Mini", category: "Arcade", description: "Lancez les oiseaux sur les structures" },
        { name: "Brick Breaker 3D", category: "Arcade", description: "Casse-briques en perspective 3D" },
        { name: "Space Defender", category: "Arcade", description: "Tirez sur les vaisseaux ennemis" },
        { name: "Endless Jumper", category: "Arcade", description: "Course sans fin avec sauts" },
        { name: "Platform Hero", category: "Arcade", description: "Saut de plateforme précis" },
        { name: "Twin Stick Shooter", category: "Arcade", description: "Tirez dans toutes les directions" },
        { name: "Bullet Rain", category: "Arcade", description: "Évitez la pluie de balles" },
        { name: "Micro Racer", category: "Arcade", description: "Course de voitures rapide" },
        { name: "Street Fighter Mini", category: "Arcade", description: "Combat 1v1 avec coups spéciaux" },
        { name: "Rhythm Star", category: "Arcade", description: "Appuyez au rythme de la musique" },
        { name: "Pinball Fantasy", category: "Arcade", description: "Flipper avec rampes et bumpers" },
        { name: "Air Hockey Pro", category: "Arcade", description: "Hockey sur table contre l'IA" },
        { name: "Basketball Star", category: "Arcade", description: "Marquez des paniers de partout" },
        { name: "Soccer Header", category: "Arcade", description: "Frappe de tête au football" },

        // STRATÉGIE (15 jeux)
        { name: "Chess Master", category: "Stratégie", description: "Échecs avec IA adaptative" },
        { name: "Checkers Online", category: "Stratégie", description: "Jeu de dames classique" },
        { name: "Backgammon Pro", category: "Stratégie", description: "Jacquet avec règles avancées" },
        { name: "Reversi Challenge", category: "Stratégie", description: "Retournez les pions adverses" },
        { name: "Go Ancient", category: "Stratégie", description: "Jeu de Go traditionnel" },
        { name: "Connect 4 Battle", category: "Stratégie", description: "Puissance 4 compétitif" },
        { name: "Tower Defense X", category: "Stratégie", description: "Défendez votre base avec des tours" },
        { name: "Idle Factory", category: "Stratégie", description: "Jeu incrémental de gestion d'usine" },
        { name: "Resource Tycoon", category: "Stratégie", description: "Gérez vos ressources efficacement" },
        { name: "Farm Simulator", category: "Stratégie", description: "Cultivez et vendez vos récoltes" },
        { name: "City Builder", category: "Stratégie", description: "Construisez une ville prospère" },
        { name: "Card Duels", category: "Stratégie", description: "Jeu de cartes stratégique" },
        { name: "Dice King", category: "Stratégie", description: "Jeu de dés avec combinaisons" },
        { name: "Battleship Fleet", category: "Stratégie", description: "Coulez la flotte ennemie" },
        { name: "Code Breaker", category: "Stratégie", description: "Devinez le code secret" },

        // CASUAL (15 jeux)
        { name: "Cookie Clicker", category: "Casual", description: "Cliquez pour produire des cookies" },
        { name: "Coin Miner", category: "Casual", description: "Collectez des pièces automatiquement" },
        { name: "Merge Numbers", category: "Casual", description: "Fusionnez les nombres identiques" },
        { name: "Bubble Pop", category: "Casual", description: "Éclatez les groupes de bulles" },
        { name: "Solitaire Classic", category: "Casual", description: "Jeu de cartes solitaire" },
        { name: "Spider Solitaire", category: "Casual", description: "Solitaire à 8 colonnes" },
        { name: "FreeCell Pro", category: "Casual", description: "Freecell avec stratégie" },
        { name: "Blackjack 21", category: "Casual", description: "Jeu de 21 contre le croupier" },
        { name: "Poker Texas", category: "Casual", description: "Poker Texas Hold'em simplifié" },
        { name: "Bingo Night", category: "Casual", description: "Bingo avec cartes multiples" },
        { name: "Ludo Royal", category: "Casual", description: "Ludo avec 4 joueurs" },
        { name: "Darts Pro", category: "Casual", description: "Jeu de fléchettes réaliste" },
        { name: "Bowling Strike", category: "Casual", description: "Bowling avec physique réaliste" },
        { name: "Fishing Sim", category: "Casual", description: "Attrapez différents poissons" },
        { name: "Cooking Mama", category: "Casual", description: "Préparez des plats délicieux" },

        // CRÉATIF (10 jeux)
        { name: "Draw & Guess", category: "Créatif", description: "Dessinez et faites deviner" },
        { name: "Music Composer", category: "Créatif", description: "Créez votre propre musique" },
        { name: "Color Flood", category: "Créatif", description: "Remplissez la grille d'une seule couleur" },
        { name: "Pixel Artist", category: "Créatif", description: "Créez des œuvres en pixels" },
        { name: "Math Challenge", category: "Créatif", description: "Résolvez des problèmes mathématiques" },
        { name: "Word Builder", category: "Créatif", description: "Construisez des mots avec des lettres" },
        { name: "Trivia Master", category: "Créatif", description: "Quiz de culture générale" },
        { name: "Geography Quiz", category: "Créatif", description: "Testez vos connaissances géo" },
        { name: "Science Puzzle", category: "Créatif", description: "Énigmes scientifiques" },
        { name: "Memory Gym", category: "Créatif", description: "Entraînez votre mémoire" }
    ];

    return games.map((game, index) => {
        const categoryInfo = categories[game.category];
        const id = `game_${index + 1}`;
        const size = `${(Math.random() * 50 + 5).toFixed(1)} MB`;
        const rating = parseFloat((Math.random() * 2 + 3).toFixed(1)); // 3.0-5.0
        const downloads = Math.floor(Math.random() * 10000) + 100;
        
        return {
            id: id,
            name: game.name,
            description: game.description,
            category: game.category,
            price: categoryInfo.price,
            image: `assets/images/game${(index % 20) + 1}.jpg`,
            file: `assets/downloads/${game.name.toLowerCase().replace(/\s+/g, '_')}.zip`,
            rating: rating,
            downloads: downloads,
            developer: "Rayan Games Studio",
            releaseDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            tags: [game.category.toLowerCase(), 'html5', 'lightweight'],
            features: getRandomFeatures(),
            size: size,
            version: '1.0.0',
            executable: 'index.html',
            requirements: 'Navigateur web moderne',
            zipFile: `${game.name.toLowerCase().replace(/\s+/g, '_')}.zip`
        };
    });
}

function getRandomFeatures() {
    const allFeatures = [
        "Multijoueur", "Classements", "Achievements", "Sauvegarde cloud",
        "Mode histoire", "Personnalisation", "Effets HD", "Contrôles tactiles",
        "Support souris", "Fullscreen", "Musique originale", "Graphismes retina",
        "Mode difficile", "Tutoriel intégré", "Statistiques détaillées", "Quêtes quotidiennes"
    ];
    
    const count = Math.floor(Math.random() * 4) + 2; // 2-5 features
    const shuffled = [...allFeatures].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function createGameZipFiles(games) {
    if (!fs.existsSync(GAMES_DOWNLOAD_DIR)) {
        fs.mkdirSync(GAMES_DOWNLOAD_DIR, { recursive: true });
        console.log('✅ Dossier assets/downloads créé');
    }

    games.forEach(game => {
        const zipFilePath = path.join(GAMES_DOWNLOAD_DIR, game.zipFile);
        
        const readmeContent = `RAYAN GAMES - ${game.name}
        
CATÉGORIE: ${game.category}
PRIX: ${game.price} DA
TAILLE: ${game.size}
NOTE: ${game.rating}/5 ⭐
TÉLÉCHARGEMENTS: ${game.downloads}

DESCRIPTION:
${game.description}

FONCTIONNALITÉS:
${game.features.map(f => `• ${f}`).join('\n')}

INSTRUCTIONS:
1. Extraire le fichier ZIP
2. Ouvrir le fichier: ${game.executable}
3. Jouer directement dans le navigateur!

CONFIGURATION REQUISE:
${game.requirements}

DÉVELOPPEUR: ${game.developer}
CONTACT: rayan.games812014@gmail.com

MERCI POUR VOTRE ACHAT ! 🎮`;

        const zipContent = `Fichier ZIP simulé pour: ${game.name}\n\n${readmeContent}`;
        fs.writeFileSync(zipFilePath, zipContent);
    });
    
    console.log(`📦 ${games.length} fichiers ZIP créés`);
}

async function main() {
    try {
        console.log("🚀 Génération de 100 jeux...");
        
        // Créer les dossiers
        [GAMES_DIR, path.join(process.cwd(), 'assets', 'images'), GAMES_DOWNLOAD_DIR].forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        });

        // Générer 100 jeux
        const gamesData = generate100Games();
        console.log(`🎮 ${gamesData.length} jeux générés`);

        // Créer les fichiers ZIP
        createGameZipFiles(gamesData);

        // Sauvegarder le fichier principal
        fs.writeFileSync(GAMES_JSON_PATH, JSON.stringify(gamesData, null, 2));
        console.log(`✅ Fichier principal sauvegardé: assets/games.json`);
        
        // Sauvegarder chaque jeu individuellement
        gamesData.forEach(game => {
            const gameFilePath = path.join(GAMES_DIR, `${game.id}.json`);
            fs.writeFileSync(gameFilePath, JSON.stringify(game, null, 2));
        });
        
        console.log(`📁 ${gamesData.length} fichiers jeux créés dans assets/games/`);
        
        // Statistiques
        const stats = gamesData.reduce((acc, game) => {
            acc[game.category] = (acc[game.category] || 0) + 1;
            return acc;
        }, {});
        
        console.log("\n📊 Statistiques:");
        Object.entries(stats).forEach(([category, count]) => {
            console.log(`   ${category}: ${count} jeux`);
        });
        
        console.log("\n✅ Génération de 100 jeux terminée avec succès!");
        
    } catch (error) {
        console.error('❌ Erreur:', error);
        process.exit(1);
    }
}

main();
