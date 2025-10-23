import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function analyzeStorePerformance() {
    const gamesDir = path.join(process.cwd(), 'assets', 'games');
    const gamesJsonPath = path.join(process.cwd(), 'assets', 'games.json');
    
    console.log('📊 Analyse des performances du store...\n');
    
    try {
        if (!fs.existsSync(gamesJsonPath)) {
            console.log('❌ Fichier assets/games.json non trouvé');
            return;
        }
        
        const gamesData = JSON.parse(fs.readFileSync(gamesJsonPath, 'utf8'));
        
        console.log(`🎮 Statistiques générales:`);
        console.log(`   - Total jeux: ${gamesData.length}`);
        
        // Analyse par catégorie
        const categories = {};
        gamesData.forEach(game => {
            categories[game.category] = (categories[game.category] || 0) + 1;
        });
        
        console.log('\n📈 Répartition par catégorie:');
        Object.entries(categories).forEach(([category, count]) => {
            const percentage = ((count / gamesData.length) * 100).toFixed(1);
            console.log(`   - ${category}: ${count} jeux (${percentage}%)`);
        });
        
        // Métriques financières
        const avgPrice = gamesData.reduce((sum, game) => sum + game.price, 0) / gamesData.length;
        const totalDownloads = gamesData.reduce((sum, game) => sum + game.downloads, 0);
        
        console.log('\n💰 Métriques financières:');
        console.log(`   - Prix moyen: ${Math.round(avgPrice)} DA`);
        console.log(`   - Téléchargements totaux: ${totalDownloads}`);
        
        console.log('\n✅ Analyse terminée avec succès!');
        
    } catch (error) {
        console.error('❌ Erreur lors de l\'analyse:', error);
    }
}

// Exécuter si appelé directement
if (import.meta.url === `file://${process.argv[1]}`) {
    analyzeStorePerformance();
}
