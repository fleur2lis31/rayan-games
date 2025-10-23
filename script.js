// scripts.js - Gestion de l'affichage des jeux
class GameStore {
    constructor() {
        this.games = [];
        this.filteredGames = [];
        this.currentCategory = 'all';
        this.init();
    }

    async init() {
        await this.loadGames();
        this.renderGames();
        this.setupEventListeners();
    }

    async loadGames() {
        try {
            const response = await fetch('games.json');
            this.games = await response.json();
            this.filteredGames = [...this.games];
            console.log(`✅ ${this.games.length} jeux chargés`);
        } catch (error) {
            console.error('❌ Erreur lors du chargement des jeux:', error);
            this.games = [];
            this.filteredGames = [];
        }
    }

    renderGames() {
        const container = document.getElementById('games-container');
        if (!container) return;

        if (this.filteredGames.length === 0) {
            container.innerHTML = '<p class="no-games">Aucun jeu trouvé</p>';
            return;
        }

        container.innerHTML = this.filteredGames.map(game => `
            <div class="game-card" data-category="${game.category}">
                <div class="game-image">
                    <img src="${game.image || 'assets/default-game.jpg'}" alt="${game.name}">
                </div>
                <div class="game-info">
                    <h3>${game.name}</h3>
                    <p class="game-description">${game.description}</p>
                    <div class="game-meta">
                        <span class="category">${game.category}</span>
                        <span class="price">${game.price} UM</span>
                    </div>
                    <div class="game-rating">
                        ${this.generateStars(game.rating)}
                        <span>${game.rating}/5</span>
                    </div>
                    <button class="play-btn" onclick="gameStore.playGame('${game.id}')">
                        🎮 Jouer
                    </button>
                </div>
            </div>
        `).join('');
    }

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
    }

    filterByCategory(category) {
        this.currentCategory = category;
        this.filteredGames = category === 'all' 
            ? [...this.games] 
            : this.games.filter(game => game.category === category);
        this.renderGames();
    }

    searchGames(query) {
        const searchTerm = query.toLowerCase();
        this.filteredGames = this.games.filter(game => 
            game.name.toLowerCase().includes(searchTerm) ||
            game.description.toLowerCase().includes(searchTerm) ||
            game.category.toLowerCase().includes(searchTerm)
        );
        this.renderGames();
    }

    playGame(gameId) {
        const game = this.games.find(g => g.id === gameId);
        if (game && game.file) {
            window.open(game.file, '_blank');
        } else {
            alert('Jeux en cours de développement ! 🚧');
        }
    }

    setupEventListeners() {
        // Filtres par catégorie
        const categoryFilters = document.querySelectorAll('.category-filter');
        categoryFilters.forEach(filter => {
            filter.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                this.filterByCategory(category);
                
                // Mettre à jour les filtres actifs
                categoryFilters.forEach(f => f.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Barre de recherche
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchGames(e.target.value);
            });
        }
    }
}

// Initialiser le store quand la page est chargée
const gameStore = new GameStore();

// Exposer globalement pour les boutons
window.gameStore = gameStore;
