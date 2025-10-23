const fs = require('fs');
const path = require('path');

function analyzeStorePerformance() {
    const gamesDir = path.join(process.cwd(), 'assets', 'games');
    const gamesJsonPath = path.join(process.cwd(), 'assets', 'games.json');
    
    console.log('📊 Analyse des performances du store...\n');
    
    try {
        // Vérifier l'existence des fichiers
        if (!fs.existsSync(gamesDir)) {
            console.log('❌ Dossier assets/games non trouvé');
            return;
        }
        
        if (!fs.existsSync(gamesJsonPath)) {
            console.log('❌ Fichier assets/games.json non trouvé');
            return;
        }
        
        const gamesData = JSON.parse(fs.readFileSync(gamesJsonPath, 'utf8'));
        const gameFiles = fs.readdirSync(gamesDir).filter(file => file.endsWith('.json'));
        
        console.log(`🎮 Statistiques générales:`);
        console.log(`   - Jeux dans games.json: ${gamesData.length}`);
        console.log(`   - Fichiers dans assets/games/: ${gameFiles.length}`);
        console.log(`   - Synchronisation: ${gamesData.length === gameFiles.length ? '✅ OK' : '⚠️ Incohérent'}`);
        
        // Analyse par catégorie
        const categories = {};
        let totalRevenue = 0;
        
        gamesData.forEach(game => {
            categories[game.category] = (categories[game.category] || 0) + 1;
            totalRevenue += game.price * game.downloads;
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
        console.log(`   - Revenu estimé: ${Math.round(totalRevenue / 1000)}k DA`);
        
        // Jeux populaires
        const popularGames = [...gamesData].sort((a, b) => b.downloads - a.downloads).slice(0, 3);
        console.log('\n🏆 Top 3 jeux populaires:');
        popularGames.forEach((game, index) => {
            console.log(`   ${index + 1}. ${game.name} - ${game.downloads} téléchargements`);
        });
        
        console.log('\n✅ Analyse terminée avec succès!');
        
    } catch (error) {
        console.error('❌ Erreur lors de l\'analyse:', error);
    }
}

// Exécuter si appelé directement
if (require.main === module) {
    analyzeStorePerformance();
}

module.exports = { analyzeStorePerformance };
