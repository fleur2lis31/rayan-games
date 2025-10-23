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
        this.renderCategoryFilters();
    }

    async loadGames() {
        try {
            const response = await fetch('assets/games.json');
            this.games = await response.json();
            this.filteredGames = [...this.games];
            console.log(`✅ ${this.games.length} jeux chargés depuis assets/games.json`);
        } catch (error) {
            console.error('❌ Erreur lors du chargement des jeux:', error);
            this.games = [];
            this.filteredGames = [];
        }
    }

    renderCategoryFilters() {
        const filtersContainer = document.getElementById('filters-container');
        if (!filtersContainer) return;

        const categories = ['all', ...new Set(this.games.map(game => game.category))];
        
        filtersContainer.innerHTML = categories.map(category => `
            <button class="category-filter ${category === 'all' ? 'active' : ''}" 
                    data-category="${category}">
                ${category === 'all' ? '🎮 Tous' : category}
            </button>
        `).join('');

        // Ajouter les écouteurs d'événements
        filtersContainer.querySelectorAll('.category-filter').forEach(filter => {
            filter.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                this.filterByCategory(category);
                
                // Mettre à jour les filtres actifs
                filtersContainer.querySelectorAll('.category-filter').forEach(f => 
                    f.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
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
                    <img src="${game.image || 'assets/images/default-game.jpg'}" 
                         alt="${game.name}" 
                         onerror="this.src='assets/images/default-game.jpg'">
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
                        <span>${game.rating}/5 • ${game.downloads} téléchargements</span>
                    </div>
                    <div class="game-developer">
                        <small>Par ${game.developer}</small>
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
            game.category.toLowerCase().includes(searchTerm) ||
            (game.tags && game.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
        );
        this.renderGames();
    }

    playGame(gameId) {
        const game = this.games.find(g => g.id === gameId);
        if (game && game.file) {
            window.open(game.file, '_blank');
        } else {
            alert('Jeu en cours de développement ! 🚧\nRevenez bientôt !');
        }
    }

    setupEventListeners() {
        // Barre de recherche
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchGames(e.target.value);
            });
        }

        // Tri des jeux
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortGames(e.target.value);
            });
        }
    }

    sortGames(criteria) {
        switch(criteria) {
            case 'price-asc':
                this.filteredGames.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                this.filteredGames.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                this.filteredGames.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'rating':
                this.filteredGames.sort((a, b) => b.rating - a.rating);
                break;
            default:
                // Ordre par défaut
                this.filteredGames = [...this.games];
                this.filterByCategory(this.currentCategory);
                return;
        }
        this.renderGames();
    }
}

// Initialiser le store quand la page est chargée
document.addEventListener('DOMContentLoaded', () => {
    window.gameStore = new GameStore();
});
