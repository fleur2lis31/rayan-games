// scripts.js - language switcher & game integration
const translations = {
  fr: {
    tag: "Jeux légers — téléchargeables — sécurisé",
    discover: "Découvrir les jeux",
    our_games: "Nos jeux",
    lead: "Télécharge et joue — promotion lancement.",
    game1_title: "Runner Neon",
    game1_desc: "Un jeu d'arcade rapide — test gratuit.",
    game2_title: "Puzzle Galaxy",
    game2_desc: "Puzzle relaxant, idéal pour mobile.",
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
    downloads: "téléchargements"
  },
  eng: {
    tag: "Lightweight games — downloadable — secure",
    discover: "Discover games",
    our_games: "Our games",
    lead: "Download and play — launch offer.",
    game1_title: "Runner Neon",
    game1_desc: "A fast arcade runner — free test.",
    game2_title: "Puzzle Galaxy",
    game2_desc: "Relaxing puzzle, great for mobile.",
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
    downloads: "downloads"
  },
  ar: {
    tag: "ألعاب خفيفة — قابلة للتحميل — آمنة",
    discover: "اكتشف الألعاب",
    our_games: "ألعابنا",
    lead: "قم بالتنزيل واللعب — عرض الإطلاق.",
    game1_title: "عداء النيون",
    game1_desc: "لعبة أركيد سريعة — تجربة مجانية.",
    game2_title: "لغز المجرة",
    game2_desc: "لغز مريح، مثالي للجوال.",
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
    downloads: "التحميلات"
  }
};

class GameStore {
  constructor() {
    this.games = [];
    this.currentLang = 'fr';
    this.init();
  }

  async init() {
    await this.setupLanguage();
    await this.loadGames();
    this.setupEventListeners();
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
      });
    });
    this.setText('fr');
  }

  async loadGames() {
    try {
      const response = await fetch('assets/games.json');
      this.games = await response.json();
      console.log(`✅ ${this.games.length} jeux chargés`);
    } catch (error) {
      console.error('❌ Erreur chargement jeux:', error);
      this.games = this.getDefaultGames();
    }
    this.renderGames();
  }

  getDefaultGames() {
    return [
      {
        id: "default_1",
        name: "Runner Neon",
        description: "Un jeu d'arcade rapide avec des effets neon époustouflants",
        category: "Arcade",
        price: 299,
        image: "assets/images/runner1.jpg",
        rating: 4.5,
        downloads: 1250,
        developer: "Neon Games Studio"
      },
      {
        id: "default_2", 
        name: "Puzzle Galaxy",
        description: "Puzzle relaxant dans l'espace, idéal pour mobile",
        category: "Puzzle",
        price: 199,
        image: "assets/images/puzzle1.jpg",
        rating: 4.8,
        downloads: 890,
        developer: "Cosmic Games"
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
    
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    this.currentLang = lang;
  }

  renderGames() {
    const container = document.getElementById('games-container');
    if (!container) return;

    if (this.games.length === 0) {
      container.innerHTML = `<div class="no-games">${translations[this.currentLang].no_games}</div>`;
      return;
    }

    container.innerHTML = this.games.map(game => `
      <div class="card" data-category="${game.category}">
        <img src="${game.image || 'assets/images/default-game.jpg'}" 
             alt="${game.name}"
             onerror="this.src='assets/images/default-game.jpg'">
        <div class="card-body">
          <h3>${game.name}</h3>
          <p>${game.description}</p>
          <div class="game-meta">
            <span class="category">${translations[this.currentLang].category}: ${game.category}</span>
            <span class="rating">${translations[this.currentLang].rating}: ${this.generateStars(game.rating)}</span>
            <span class="downloads">${game.downloads} ${translations[this.currentLang].downloads}</span>
          </div>
          <div class="actions">
            <button class="btn ghost" onclick="gameStore.previewGame('${game.id}')">
              ${translations[this.currentLang].play_online}
            </button>
            <button class="btn primary purchase" 
                    data-file="${game.id}" 
                    data-price="${game.price}"
                    onclick="gameStore.purchaseGame('${game.id}')">
              ${translations[this.currentLang].buy.replace('{price}', game.price)}
            </button>
          </div>
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

  previewGame(gameId) {
    const game = this.games.find(g => g.id === gameId);
    if (game) {
      alert(`🎮 ${game.name}\n\nVersion démo bientôt disponible!\nEn attendant, contactez-nous pour un accès anticipé.`);
    }
  }

  purchaseGame(gameId) {
    const game = this.games.find(g => g.id === gameId);
    if (game) {
      const priceText = translations[this.currentLang].buy.replace('{price}', game.price);
      alert(`🛒 Achat de "${game.name}"\n\nPrix: ${game.price} DA\n\nPour finaliser l'achat, envoyez un email à:\nrayan.games812014@gmail.com\n\nIncluez:\n- Votre nom\n- Le jeu: ${game.name}\n- Preuve de paiement`);
    }
  }

  setupEventListeners() {
    // Contact form
    document.getElementById('contactForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      alert(translations[this.currentLang].send + ' - Message simulé (intégration Netlify Forms à configurer)');
      e.target.reset();
    });

    // Footer year
    document.getElementById('year').textContent = new Date().getFullYear();
  }
}

// Initialiser le store
let gameStore;
document.addEventListener('DOMContentLoaded', () => {
  gameStore = new GameStore();
});
