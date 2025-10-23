import fs from 'fs';
import path from 'path';

// Fonction pour analyser les performances du store
function analyzeStorePerformance() {
    const gamesDir = path.join(process.cwd(), 'assets', 'games');
    const gamesJsonPath = path.join(process.cwd(), 'assets', 'games.json');
    
    console.log('📊 Analyse des performances du store...');
    
    try {
        // Vérifier si le dossier assets/games existe
        if (!fs.existsSync(gamesDir)) {
            console.log('❌ Dossier assets/games non trouvé');
            return;
        }
        
        // Compter le nombre de jeux
        const gameFiles = fs.readdirSync(gamesDir).filter(file => file.endsWith('.json'));
        console.log(`🎮 Nombre total de jeux: ${gameFiles.length}`);
        
        // Analyser assets/games.json s'il existe
        if (fs.existsSync(gamesJsonPath)) {
            const gamesData = JSON.parse(fs.readFileSync(gamesJsonPath, 'utf8'));
            
            // Statistiques par catégorie
            const categories = {};
            let totalPrice = 0;
            let maxPrice = 0;
            let minPrice = Infinity;
            
            gamesData.forEach(game => {
                // Compter par catégorie
                categories[game.category] = (categories[game.category] || 0) + 1;
                
                // Statistiques de prix
                totalPrice += game.price;
                if (game.price > maxPrice) maxPrice = game.price;
                if (game.price < minPrice) minPrice = game.price;
            });
            
            console.log('\n📈 Statistiques par catégorie:');
            Object.entries(categories).forEach(([category, count]) => {
                console.log(`   ${category}: ${count} jeux`);
            });
            
            console.log('\n💰 Statistiques de prix:');
            console.log(`   Prix moyen: ${Math.round(totalPrice / gamesData.length)} UM`);
            console.log(`   Prix max: ${maxPrice} UM`);
            console.log(`   Prix min: ${minPrice} UM`);
            
            // Vérifier l'intégrité des données
            console.log('\n🔍 Vérification d\'intégrité:');
            const gamesWithMissingFields = gamesData.filter(game => !game.name || !game.category);
            console.log(`   Jeux avec champs manquants: ${gamesWithMissingFields.length}`);
            
            // Taille des données
            const dataSize = Buffer.byteLength(JSON.stringify(gamesData), 'utf8');
            console.log(`   Taille des données: ${(dataSize / 1024).toFixed(2)} KB`);
        }
        
        // Vérifier l'espace disque utilisé
        const gamesDirStats = fs.statSync(gamesDir);
        console.log(`\n💾 Espace utilisé par le dossier games: ${(gamesDirStats.size / 1024).toFixed(2)} KB`);
        
        console.log('\n✅ Analyse terminée avec succès!');
        
    } catch (error) {
        console.error('❌ Erreur lors de l\'analyse:', error);
    }
}

// Fonction pour générer un rapport détaillé
function generateDetailedReport() {
    const gamesJsonPath = path.join(process.cwd(), 'assets', 'games.json');
    
    try {
        if (!fs.existsSync(gamesJsonPath)) {
            console.log('❌ Fichier assets/games.json non trouvé');
            return;
        }
        
        const gamesData = JSON.parse(fs.readFileSync(gamesJsonPath, 'utf8'));
        
        console.log('\n📋 RAPPORT DÉTAILLÉ DU STORE');
        console.log('='.repeat(40));
        
        // Top 5 jeux par prix
        const topByPrice = [...gamesData].sort((a, b) => b.price - a.price).slice(0, 5);
        console.log('\n🏆 Top 5 jeux les plus chers:');
        topByPrice.forEach((game, index) => {
            console.log(`   ${index + 1}. ${game.name} - ${game.price} UM (${game.category})`);
        });
        
        // Distribution des catégories
        console.log('\n📊 Distribution des catégories:');
        const categoryCount = {};
        gamesData.forEach(game => {
            categoryCount[game.category] = (categoryCount[game.category] || 0) + 1;
        });
        
        Object.entries(categoryCount).forEach(([category, count]) => {
            const percentage = ((count / gamesData.length) * 100).toFixed(1);
            console.log(`   ${category}: ${count} jeux (${percentage}%)`);
        });
        
        // Recommandations
        console.log('\n💡 Recommandations:');
        if (gamesData.length < 10) {
            console.log('   ⚠️  Le store a peu de jeux. Considérez importer plus de contenu.');
        }
        
        const uniqueCategories = Object.keys(categoryCount).length;
        if (uniqueCategories < 3) {
            console.log('   ⚠️  Diversifiez les catégories de jeux.');
        }
        
        console.log(`\n✅ Rapport généré le: ${new Date().toLocaleString()}`);
        
    } catch (error) {
        console.error('❌ Erreur lors de la génération du rapport:', error);
    }
}

// Exécuter l'analyse
if (import.meta.url === `file://${process.argv[1]}`) {
    analyzeStorePerformance();
    generateDetailedReport();
}

export { analyzeStorePerformance, generateDetailedReport };
