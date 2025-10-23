// Correction: Utilisation de require() au lieu de import pour la compatibilité CommonJS
const fs = require('fs');
const path = require('path');
// Node-fetch est nécessaire, si tu l'utilises, il faut l'installer dans package.json
const fetch = require('node-fetch'); 

// --- 1. CHEMINS DES FICHIERS ET DONNÉES DE BASE ---
const INDEX_PATH = path.join(__dirname, '..', 'index.html');
const GAMES_ASSETS_DIR = path.join(__dirname, '..', 'assets', 'jeux');
const SOURCE_URL = 'https://api.example.com/gamelist'; 

// --- 2. LOGIQUE DE SIMULATION D'IMPORTATION (10 jeux/jour) ---
async function fetchNewGameData() {
    // Simule la récupération de données d'une source externe
    const newGames = [];
    const categories = ['Arcade', 'Puzzle', 'Course', 'Action', 'Rétro'];
    const bases = ['Jumper', 'Quest', 'Maze', 'Fighter', 'Speed'];

    for (let i = 0; i < 10; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const baseTitle = bases[Math.floor(Math.random() * bases.length)];
        const id = `${baseTitle.toLowerCase().substring(0, 4)}-${Date.now()}-${i}`;
        
        newGames.push({
            id: id,
            title: `${baseTitle} Master ${i + 1}`,
            description: `Un nouveau jeu de type ${category}. Jouez et gagnez de la visibilité !`,
            category: category,
            price: (Math.floor(Math.random() * 5) * 100) + 490 
        });
    }
    return newGames;
}

// --- 3. LOGIQUE D'AJOUT DES JEUX ET MISE À JOUR DE L'INDEX ---
async function main() {
    console.log(`🤖 Démarrage de l'importation automatique de jeux...`);
    
    // 1. Récupérer les nouveaux jeux (simulation)
    const newGamesData = await fetchNewGameData();
    
    // 2. Préparer le dossier des assets si besoin 
    if (!fs.existsSync(GAMES_ASSETS_DIR)) {
        fs.mkdirSync(GAMES_ASSETS_DIR, { recursive: true });
    }
    
    // 3. Lire le fichier index.html
    let indexContent;
    try {
        indexContent = fs.readFileSync(INDEX_PATH, 'utf-8');
    } catch (e) {
        console.error("ERREUR: Impossible de lire index.html. Assurez-vous qu'il est à la racine du dépôt.");
        process.exit(1);
    }
    
    // 4. Générer le HTML pour les nouvelles cartes de jeu
    const newCardsHTML = newGamesData.map(game => `
        <div class="game-card" data-category="${game.category}">
            <img src="https://picsum.photos/300/200?random=${game.id.hashCode()}" alt="${game.title}">
            <h3>${game.title}</h3>
            <p>${game.description}</p>
            <a href="${GAMES_ASSETS_DIR}/${game.id}.zip" class="download-btn">Télécharger (Acheter ${game.price} DA)</a>
        </div>
    `).join('\n');

    // 5. Définir le point d'insertion (juste avant la section sponsors)
    const insertionPointRegex = /(<\/section>\s*<section id="sponsors">)/; 
    
    // 6. Insérer le nouveau code HTML dans le fichier
    if (indexContent.match(insertionPointRegex)) {
        const updatedContent = indexContent.replace(
            insertionPointRegex,
            (match) => {
                return newCardsHTML + match;
            }
        );
        
        // 7. Écrire le nouveau contenu dans index.html
        fs.writeFileSync(INDEX_PATH, updatedContent, 'utf-8');
        console.log(`✅ SUCCÈS : Index.html mis à jour avec ${newGamesData.length} nouveaux jeux.`);
    } else {
        console.error("❌ ERREUR GRAVE : Point d'insertion de jeu non trouvé dans index.html.");
    }
}

// --- EXÉCUTION DU SCRIPT ---
main().catch(error => {
    console.error('ERREUR LORS DE L\'EXÉCUTION PRINCIPALE:', error);
    process.exit(1);
});
