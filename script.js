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
    downloads: "téléchargements"
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
    downloads: "downloads"
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
      console.log('🔄 Chargement des jeux depuis assets/games.json...');
      
      const response = await fetch('./assets/games.json');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      this.games = await response.json();
      console.log(`✅ ${this.games.length} jeux chargés avec succès`);
      
    } catch (error) {
      console.error('❌ Erreur chargement jeux:', error);
      console.log('🔄 Utilisation des jeux par défaut...');
      this.games = this.getDefaultGames();
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
        developer: "Neon Games Studio"
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
    if (!container) {
      console.error('❌ Container #games-container non trouvé');
      return;
    }

    if (this.games.length === 0) {
      container.innerHTML = `<div class="no-games">${translations[this.currentLang].no_games}</div>`;
      return;
    }

    container.innerHTML = this.games.map(game => `
      <div class="card" data-category="${game.category}">
        <img src="${game.image}" 
             alt="${game.name}"
             onerror="this.src='https://via.placeholder.com/300x160/333333/ffffff?text=Image+Manquante'">
        <div class="card-body">
          <h3>${game.name}</h3>
          <p>${game.description}</p>
          <div class="game-meta">
            <span class="category">${translations[this.currentLang].category}: ${game.category}</span>
            <span class="rating">${translations[this.currentLang].rating}: ${this.generateStars(game.rating)} (${game.rating})</span>
            <span class="downloads">${game.downloads} ${translations[this.currentLang].downloads}</span>
            <span class="developer">Par ${game.developer}</span>
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
    `).join('');
    
    console.log(`🎮 ${this.games.length} jeux affichés`);
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
      alert(`🎮 ${game.name}\n\nCatégorie: ${game.category}\nNote: ${game.rating}/5\n\nVersion démo bientôt disponible!\nContactez-nous pour un accès anticipé.`);
    }
  }

  downloadGame(gameId) {
    const game = this.games.find(g => g.id === gameId);
    if (game) {
      const message = `🎮 Téléchargement de "${game.name}"\n\n` +
                     `💰 Prix: ${game.price} DA\n` +
                     `📦 Taille: ${game.size || '15.2 MB'}\n` +
                     `🖥️ Exécutable: ${game.executable || 'game.exe'}\n\n` +
                     `Pour recevoir le lien de téléchargement:\n` +
                     `1. Envoyez ${game.price} DA via CIB/DAB\n` +
                     `2. Contactez: rayan.games812014@gmail.com\n` +
                     `3. Joignez la preuve de paiement\n` +
                     `4. Recevez le lien de téléchargement direct!`;
      
      alert(message);
      
      // Simulation de téléchargement d'un fichier démo
      const demoContent = `FICHIER DÉMO: ${game.name}\n\n` +
                         `Ceci est une version démonstration.\n` +
                         `Prix complet: ${game.price} DA\n` +
                         `Contact: rayan.games812014@gmail.com\n` +
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
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const lang = this.currentLang;
        alert(translations[lang].send + ' - Message envoyé avec succès!');
        contactForm.reset();
      });
    }

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
