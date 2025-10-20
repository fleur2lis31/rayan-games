// script.js - language switcher & small interactions
const translations = {
  fr: {
    tag: "Jeux légers — téléchargeables — sécurisé",
    discover: "Découvrir les jeux",
    our_games: "Nos jeux",
    lead: "Télécharge et joue — promotion lancement.",
    game1_title: "Runner Neon",
    game1_desc: "Un jeu d’arcade rapide — test gratuit.",
    game2_title: "Puzzle Galaxy",
    game2_desc: "Puzzle relaxant, idéal pour mobile.",
    play_online: "Télécharger (test)",
    buy: "Télécharger — {price} DA",
    contact: "Contact / Support",
    contact_text: "Besoin d’aide ? Envoie un message.",
    name: "Ton nom",
    email: "Ton email",
    message: "Message",
    send: "Envoyer"
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
    send: "Send"
  },
  es: {
    tag: "Juegos ligeros — descargables — seguros",
    discover: "Descubrir juegos",
    our_games: "Nuestros juegos",
    lead: "Descarga y juega — oferta de lanzamiento.",
    game1_title: "Corredor Neón",
    game1_desc: "Un juego arcade rápido — prueba gratis.",
    game2_title: "Puzzle Galaxia",
    game2_desc: "Rompecabezas relajante, ideal para móvil.",
    play_online: "Descargar (prueba)",
    buy: "Descargar — {price} DZD",
    contact: "Contacto / Soporte",
    contact_text: "¿Necesitas ayuda? Envía un mensaje.",
    name: "Tu nombre",
    email: "Tu correo",
    message: "Mensaje",
    send: "Enviar"
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
    send: "إرسال"
  }
};

function setText(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if(translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  // special: update buy buttons with price
  document.querySelectorAll('.purchase').forEach(btn=>{
    const price = btn.getAttribute('data-price') || '0';
    const text = (translations[lang] && translations[lang].buy) ? translations[lang].buy.replace('{price}', price) : 'Buy';
    btn.textContent = text;
  });
  // RTL for Arabic
  document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
}

document.addEventListener('DOMContentLoaded', ()=>{
  const btns = document.querySelectorAll('.lang-btn');
  btns.forEach(b=>{
    b.addEventListener('click', ()=>{
      btns.forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
      setText(b.getAttribute('data-lang'));
    });
  });
  // default
  setText('fr');

  // Purchase button demo (just show alert, real flow via Netlify Forms later)
  document.querySelectorAll('.purchase').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const file = btn.getAttribute('data-file');
      const price = btn.getAttribute('data-price');
      alert('Pour tester: envoyer une preuve de paiement à rayan.games812014@gmail.com\nFichier demandé: ' + file + ' — Prix: ' + price + ' DZD');
    });
  });

  // contact form basic handler
  document.getElementById('contactForm')?.addEventListener('submit', (e)=>{
    e.preventDefault();
    alert('Merci — message envoyé (simulation).');
    e.target.reset();
  });

  document.getElementById('year').textContent = new Date().getFullYear();
});
