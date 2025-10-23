downloadGame(gameId) {
    const game = this.games.find(g => g.id === gameId);
    if (game && game.file) {
        // Pour l'instant, on simule le téléchargement
        // Dans une vraie implémentation, vous auriez un vrai lien de téléchargement
        const message = `🎮 Téléchargement de "${game.name}"\n\n` +
                       `💰 Prix: ${game.price} DA\n` +
                       `📦 Taille: ${game.size}\n` +
                       `🖥️ Exécutable: ${game.executable}\n\n` +
                       `Pour recevoir le lien de téléchargement:\n` +
                       `1. Envoyez ${game.price} DA via CIB/DAB\n` +
                       `2. Contactez: rayan.games812014@gmail.com\n` +
                       `3. Joignez la preuve de paiement\n` +
                       `4. Recevez le lien de téléchargement direct!`;
        
        alert(message);
        
        // Simulation: créer un faux téléchargement
        const blob = new Blob([`Fichier simulé: ${game.name}\nPrix: ${game.price} DA\nContact: rayan.games812014@gmail.com`], 
                             { type: 'application/zip' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${game.name.toLowerCase().replace(/\s+/g, '_')}_demo.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}
