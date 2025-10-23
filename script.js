// scripts.js - language switcher & game integration
const translations = {
  fr: {
    tag: "Jeux légers — téléchargeables — sécurisé",
    discover: "Découvrir les jeux",
    our_games: "Nos jeux",
    lead: "Télécharge et joue — promotion lancement.",
    play_online: "Télécharger (test)",
    buy: "Télécharger — {price} DA",
    contact: "Contact / Support",
    contact_text: "Besoin d'aide ? Envoie un message.",
    name: "Ton nom",
    email: "Ton email",
    message: "Message",
    send: "Envoyer",
    loading: "Chargement des jeux...",
    no_games: "Aucun jeu disponible pour le moment",
    category: "Catégorie",
    rating: "Note",
    downloads: "téléchargements",
    
    // NOUVEAUX TEXTES FRANÇAIS
    welcome_ar: "Bienvenue dans le monde des jeux arabes !",
    cultural_games: "Jeux culturels arabes",
    educational_games: "Jeux éducatifs arabes",
    monthly_competition: "Concours du mois arabe",
    arabic_leaderboard: "Classement arabe",
    arabic_culture: "Culture arabe",
    islamic_education: "Éducation islamique",
    arabic_language: "Langue arabe",
    desert_adventure: "Aventure du désert",
    all_categories: "Toutes les catégories",
    search_placeholder: "Rechercher un jeu...",
    sort_by: "Trier par",
    price_low_high: "Prix croissant",
    price_high_low: "Prix décroissant",
    name_az: "Nom A-Z",
    rating: "Meilleures notes",
    latest: "Plus récents"
  },
  eng: {
    tag: "Lightweight games — downloadable — secure",
    discover: "Discover games",
    our_games: "Our games",
    lead: "Download and play — launch offer.",
    play_online: "Download (test)",
    buy: "Download — {price} DZD",
    contact: "Contact / Support",
    contact_text: "Need help? Send a message.",
    name: "Your name",
    email: "Your email",
    message: "Message",
    send: "Send",
    loading: "Loading games...",
    no_games: "No games available at the moment",
    category: "Category",
    rating: "Rating",
    downloads: "downloads",
    
    // NOUVEAUX TEXTES ANGLAIS
    welcome_ar: "Welcome to the Arabic gaming world!",
    cultural_games: "Arabic cultural games",
    educational_games: "Arabic educational games", 
    monthly_competition: "Arabic monthly competition",
    arabic_leaderboard: "Arabic leaderboard",
    arabic_culture: "Arabic culture",
    islamic_education: "Islamic education",
    arabic_language: "Arabic language",
    desert_adventure: "Desert adventure",
    all_categories: "All categories",
    search_placeholder: "Search for a game...",
    sort_by: "Sort by",
    price_low_high: "Price: Low to High",
    price_high_low: "Price: High to Low",
    name_az: "Name A-Z",
    rating: "Top Rated",
    latest: "Newest"
  },
  ar: {
    tag: "ألعاب خفيفة — قابلة للتحميل — آمنة",
    discover: "اكتشف الألعاب",
    our_games: "ألعابنا",
    lead: "قم بالتنزيل واللعب — عرض الإطلاق.",
    play_online: "تحميل (تجريبي)",
    buy: "تحميل — {price} دج",
    contact: "اتصل / الدعم",
    contact_text: "بحاجة للمساعدة؟ أرسل رسالة.",
    name: "اسمك",
    email: "بريدك الإلكتروني",
    message: "الرسالة",
    send: "إرسال",
    loading: "جاري تحميل الألعاب...",
    no_games: "لا توجد ألعاب متاحة حالياً",
    category: "الفئة",
    rating: "التقييم",
    downloads: "التحميلات",
    
    // 🇸🇦 NOUVEAUX TEXTES ARABES 🇸🇦
    welcome_ar: "مرحبا بكم في عالم الألعاب العربي!",
    cultural_games: "ألعاب عربية ثقافية",
    educational_games: "ألعاب تعليمية عربية", 
    monthly_competition: "مسابقة الشهر العربية",
    arabic_leaderboard: "لوحة المتصدرين العربية",
    arabic_culture: "ثقافة عربية",
    islamic_education: "تعليم إسلامي",
    arabic_language: "لغة عربية",
    desert_adventure: "مغامرات الصحراء",
    all_categories: "جميع الفئات",
    search_placeholder: "ابحث عن لعبة...",
    sort_by: "ترتيب حسب",
    price_low_high: "السعر: من الأقل للأعلى",
    price_high_low: "السعر: من الأعلى للأقل",
    name_az: "الاسم من أ إلى ي",
    rating: "الأعلى تقييماً",
    latest: "الأحدث"
  }
};

class GameStore {
  constructor() {
    this.games = [];
    this.currentLang = 'fr';
    this.filteredGames = [];
    this.currentCategory = 'all';
    this.searchQuery = '';
    this.sortCriteria = 'latest';
    this.init();
  }

  async init() {
    await this.setupLanguage();
    await this.loadGames();
    this.setupEventListeners();
    this.renderCategoryFilters();
  }

  async setupLanguage() {
    const btns = document.querySelectorAll('.lang-btn');
    btns.forEach(b => {
      b.addEventListener('click', () => {
        btns.forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        this.currentLang = b.getAttribute('data-lang');
        this.setText(this.currentLang);
        this.renderGames();
        this.renderCategoryFilters();
      });
    });
    this.setText('fr');
  }

  async loadGames() {
    try {
      console.log('🔄 Chargement des jeux depuis assets/games.json...');
      
      const response = await fetch('./assets/games.json');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      this.games = await response.json();
      this.filteredGames = [...this.games];
      console.log(`✅ ${this.games.length} jeux chargés avec succès`);
      
    } catch (error) {
      console.error('❌ Erreur chargement jeux:', error);
      console.log('🔄 Utilisation des jeux par défaut...');
      this.games = this.getDefaultGames();
      this.filteredGames = [...this.games];
    }
    
    this.renderGames();
  }

  getDefaultGames() {
    return [
      {
        id: "default_1",
        name: "Runner Neon",
        description: "Un jeu d'arcade rapide avec des effets neon époustouflants.",
        category: "Arcade",
        price: 299,
        image: "https://via.placeholder.com/300x160/7c5cff/ffffff?text=Runner+Neon",
        rating: 4.5,
        downloads: 1250,
        developer: "Neon Games Studio",
        size: "15.2 MB",
        features: ["Multijoueur", "Classements", "Achievements"]
      },
      {
        id: "default_2", 
        name: "Puzzle Galaxy",
        description: "Puzzle relaxant dans l'espace avec des graphismes magnifiques.",
        category: "Puzzle",
        price: 199,
        image: "https://via.placeholder.com/300x160/00d1ff/ffffff?text=Puzzle+Galaxy",
        rating: 4.8,
        downloads: 890,
        developer: "Cosmic Games",
        size: "8.7 MB",
        features: ["50 Niveaux", "Musique relaxante"]
      },
      {
        id: "arabic_calligraphy",
        name: "Arabic Calligraphy",
        description: "Apprenez la calligraphie arabe de façon ludique et interactive.",
        category: "arabic_culture",
        price: 149,
        image: "https://via.placeholder.com/300x160/8B4513/ffffff?text=Calligraphie",
        rating: 4.9,
        downloads: 3200,
        developer: "Rayan Games Studio",
        size: "5.1 MB",
        features: ["4 Lettres arabes", "Sauvegarde dessins", "Guide interactif"]
      }
    ];
  }

  setText(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
    
    // Mettre à jour les placeholders
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.placeholder = translations[lang].search_placeholder;
    }
    
    // Mettre à jour les options de tri
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      const options = sortSelect.querySelectorAll('option');
      if (options.length >= 5) {
        options[0].textContent = translations[lang].latest;
        options[1].textContent = translations[lang].name_az;
        options[2].textContent = translations[lang].rating;
        options[3].textContent = translations[lang].price_low_high;
        options[4].textContent = translations[lang].price_high_low;
      }
    }
    
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    this.currentLang = lang;
  }

  renderCategoryFilters() {
    const filtersContainer = document.getElementById('filters-container');
    if (!filtersContainer) return;

    const categories = ['all', ...new Set(this.games.map(game => game.category))];
    
    filtersContainer.innerHTML = categories.map(category => {
      let displayName = category;
      
      // Traduire les noms de catégories spéciales
      if (category === 'all') displayName = translations[this.currentLang].all_categories;
      else if (category === 'arabic_culture') displayName = translations[this.currentLang].arabic_culture;
      else if (category === 'islamic_education') displayName = translations[this.currentLang].islamic_education;
      else if (category === 'arabic_language') displayName = translations[this.currentLang].arabic_language;
      else if (category === 'desert_adventure') displayName = translations[this.currentLang].desert_adventure;
      
      const isActive = category === this.currentCategory ? 'active' : '';
      
      return `
        <button class="category-filter ${isActive}" data-category="${category}">
          ${category === 'all' ? '🎮' : ''} ${displayName}
        </button>
      `;
    }).join('');

    // Ajouter les écouteurs d'événements
    filtersContainer.querySelectorAll('.category-filter').forEach(filter => {
      filter.addEventListener('click', (e) => {
        const category = e.target.dataset.category;
        this.filterByCategory(category);
        
        filtersContainer.querySelectorAll('.category-filter').forEach(f => 
          f.classList.remove('active'));
        e.target.classList.add('active');
      });
    });
  }

  renderGames() {
    const container = document.getElementById('games-container');
    if (!container) {
      console.error('❌ Container #games-container non trouvé');
      return;
    }

    if (this.filteredGames.length === 0) {
      container.innerHTML = `
        <div class="no-games">
          <h3>${translations[this.currentLang].no_games}</h3>
          <p>${this.searchQuery ? 'Aucun jeu ne correspond à votre recherche.' : 'Revenez bientôt pour découvrir nos nouveaux jeux !'}</p>
        </div>
      `;
      return;
    }

    container.innerHTML = this.filteredGames.map(game => {
      let categoryDisplay = game.category;
      
      // Traduire les catégories spéciales
      if (game.category === 'arabic_culture') categoryDisplay = translations[this.currentLang].arabic_culture;
      else if (game.category === 'islamic_education') categoryDisplay = translations[this.currentLang].islamic_education;
      else if (game.category === 'arabic_language') categoryDisplay = translations[this.currentLang].arabic_language;
      else if (game.category === 'desert_adventure') categoryDisplay = translations[this.currentLang].desert_adventure;
      
      return `
        <div class="card" data-category="${game.category}">
          <img src="${game.image}" 
               alt="${game.name}"
               onerror="this.src='https://via.placeholder.com/300x160/333333/ffffff?text=Image+Manquante'">
          <div class="card-body">
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <div class="game-meta">
              <span class="category">${translations[this.currentLang].category}: ${categoryDisplay}</span>
              <span class="rating">${translations[this.currentLang].rating}: ${this.generateStars(game.rating)} (${game.rating})</span>
              <span class="downloads">${game.downloads} ${translations[this.currentLang].downloads}</span>
              <span class="developer">${game.developer}</span>
              <span class="size">${game.size}</span>
            </div>
            <div class="game-features">
              ${game.features ? game.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('') : ''}
            </div>
            <div class="actions">
              <button class="btn ghost" onclick="gameStore.previewGame('${game.id}')">
                ${translations[this.currentLang].play_online}
              </button>
              <button class="btn primary purchase" 
                      onclick="gameStore.downloadGame('${game.id}')">
                ${translations[this.currentLang].buy.replace('{price}', game.price)}
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
    
    console.log(`🎮 ${this.filteredGames.length} jeux affichés`);
  }

  generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
  }

  filterByCategory(category) {
    this.currentCategory = category;
    this.applyFilters();
  }

  searchGames(query) {
    this.searchQuery = query.toLowerCase();
    this.applyFilters();
  }

  sortGames(criteria) {
    this.sortCriteria = criteria;
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.games];
    
    // Filtre par catégorie
    if (this.currentCategory !== 'all') {
      filtered = filtered.filter(game => game.category === this.currentCategory);
    }
    
    // Filtre par recherche
    if (this.searchQuery) {
      filtered = filtered.filter(game => 
        game.name.toLowerCase().includes(this.searchQuery) ||
        game.description.toLowerCase().includes(this.searchQuery) ||
        game.category.toLowerCase().includes(this.searchQuery) ||
        (game.features && game.features.some(feature => feature.toLowerCase().includes(this.searchQuery)))
      );
    }
    
    // Tri
    switch(this.sortCriteria) {
      case 'name_az':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price_low_high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_high_low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'latest':
      default:
        // Garder l'ordre original ou par date de sortie
        break;
    }
    
    this.filteredGames = filtered;
    this.renderGames();
  }

  previewGame(gameId) {
    const game = this.games.find(g => g.id === gameId);
    if (game) {
      let categoryDisplay = game.category;
      if (game.category === 'arabic_culture') categoryDisplay = translations[this.currentLang].arabic_culture;
      else if (game.category === 'islamic_education') categoryDisplay = translations[this.currentLang].islamic_education;
      
      alert(`🎮 ${game.name}\n\n` +
            `📂 Catégorie: ${categoryDisplay}\n` +
            `⭐ Note: ${game.rating}/5\n` +
            `💾 Taille: ${game.size}\n\n` +
            `Version démo bientôt disponible!\n` +
            `Contactez-nous pour un accès anticipé.`);
    }
  }

  downloadGame(gameId) {
    const game = this.games.find(g => g.id === gameId);
    if (game) {
      const priceText = translations[this.currentLang].buy.replace('{price}', game.price);
      const message = `🛒 Achat de "${game.name}"\n\n` +
                     `💰 Prix: ${game.price} DA\n` +
                     `💾 Taille: ${game.size}\n` +
                     `⭐ Note: ${game.rating}/5\n` +
                     `🏢 Développeur: ${game.developer}\n\n` +
                     `Pour finaliser l'achat:\n` +
                     `📧 Email: rayan.games812014@gmail.com\n\n` +
                     `Incluez dans votre message:\n` +
                     `- Votre nom\n` +
                     `- Le jeu: ${game.name}\n` +
                     `- Preuve de paiement\n\n` +
                     `Vous recevrez le lien de téléchargement direct!`;
      
      alert(message);
      
      // Simulation de téléchargement d'un fichier démo
      const demoContent = `FICHIER DÉMO: ${game.name}\n\n` +
                         `Ceci est une version démonstration.\n` +
                         `Prix complet: ${game.price} DA\n` +
                         `Développeur: ${game.developer}\n` +
                         `Taille: ${game.size}\n` +
                         `Contact: rayan.games812014@gmail.com\n\n` +
                         `Merci pour votre intérêt ! 🎮`;
      
      const blob = new Blob([demoContent], { type: 'text/plain' });
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

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const lang = this.currentLang;
        alert(translations[lang].send + ' - Message envoyé avec succès! Nous vous répondrons dans les 24h.');
        contactForm.reset();
      });
    }

    // Footer year
    const yearElement = document.getElementById('year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }
}

// Initialiser le store quand la page est chargée
document.addEventListener('DOMContentLoaded', () => {
  window.gameStore = new GameStore();
});
