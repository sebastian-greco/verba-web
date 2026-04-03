const fs = require('fs');
const path = require('path');

const locales = ['en', 'es', 'it', 'fr', 'de', 'nl'];

const newKeys = {
  en: {
    cleanup: { status_active: "Smart Cleanup Active", status_inactive: "Smart Cleanup Inactive" },
    demo: { how_it_works: "How it Works", step_01: "STEP 01", step_01_desc: "Tap a key to wake Verba. The transcription overlay appears instantly.", step_02: "STEP 02", step_02_desc: "No need for robot voice. Whisper captures every nuance with precision.", step_03: "STEP 03", step_03_desc: "Let go of the key and watch as your words are typed perfectly." },
    features: { subheadline: "Powerful features wrapped in a simple experience." },
    hero: { title_p1: "Your voice,", title_p2: "typed instantly.", subtitle_p1: "Write emails, documents, and messages just by speaking. Private, fast, and stays entirely on your Mac.", thought_1: "The future of writing isn't typing...", thought_2: "It's speaking naturally and having it appear exactly where you need it.", thought_3: "Spoken words fly away, written ones remain." }
  },
  es: {
    cleanup: { status_active: "Limpieza Inteligente Activa", status_inactive: "Limpieza Inteligente Inactiva" },
    demo: { how_it_works: "Cómo funciona", step_01: "PASO 01", step_01_desc: "Toca una tecla para despertar a Verba. La superposición de transcripción aparece al instante.", step_02: "PASO 02", step_02_desc: "No necesitas una voz robótica. Whisper captura cada matiz con precisión.", step_03: "PASO 03", step_03_desc: "Suelta la tecla y mira cómo tus palabras se escriben a la perfección." },
    features: { subheadline: "Características poderosas envueltas en una experiencia simple." },
    hero: { title_p1: "Tu voz,", title_p2: "escrita al instante.", subtitle_p1: "Escribe correos electrónicos, documentos y mensajes solo con hablar. Privado, rápido y se queda en tu Mac.", thought_1: "El futuro de la escritura no es tipear...", thought_2: "Es hablar naturalmente y hacer que aparezca exactamente donde lo necesitas.", thought_3: "Las palabras habladas vuelan, las escritas permanecen." }
  },
  it: {
    cleanup: { status_active: "Pulizia Intelligente Attiva", status_inactive: "Pulizia Intelligente Inattiva" },
    demo: { how_it_works: "Come funziona", step_01: "PASSO 01", step_01_desc: "Tocca un tasto per attivare Verba. L'overlay di trascrizione appare all'istante.", step_02: "PASSO 02", step_02_desc: "Non c'è bisogno di una voce robotica. Whisper cattura ogni sfumatura con precisione.", step_03: "PASSO 03", step_03_desc: "Rilascia il tasto e guarda le tue parole essere scritte perfettamente." },
    features: { subheadline: "Funzionalità potenti racchiuse in un'esperienza semplice." },
    hero: { title_p1: "La tua voce,", title_p2: "digitata all'istante.", subtitle_p1: "Scrivi email, documenti e messaggi semplicemente parlando. Privato, veloce e resta tutto sul tuo Mac.", thought_1: "Il futuro della scrittura non è digitare...", thought_2: "È parlare in modo naturale e farlo apparire dove serve.", thought_3: "Le parole pronunciate volano via, quelle scritte restano." }
  },
  fr: {
    cleanup: { status_active: "Nettoyage Intelligent Actif", status_inactive: "Nettoyage Intelligent Inactif" },
    demo: { how_it_works: "Comment ça marche", step_01: "ÉTAPE 01", step_01_desc: "Appuyez sur une touche pour réveiller Verba. La superposition de transcription apparaît instantanément.", step_02: "ÉTAPE 02", step_02_desc: "Pas besoin d'une voix de robot. Whisper capture chaque nuance avec précision.", step_03: "ÉTAPE 03", step_03_desc: "Relâchez la touche et regardez vos mots être tapés parfaitement." },
    features: { subheadline: "Des fonctionnalités puissantes dans une expérience simple." },
    hero: { title_p1: "Votre voix,", title_p2: "tapée instantanément.", subtitle_p1: "Rédigez des e-mails, des documents et des messages simplement en parlant. Privé, rapide, et reste entièrement sur votre Mac.", thought_1: "L'avenir de l'écriture n'est pas de taper...", thought_2: "C'est de parler naturellement et de le voir apparaître là où vous en avez besoin.", thought_3: "Les paroles s'envolent, les écrits restent." }
  },
  de: {
    cleanup: { status_active: "Intelligente Bereinigung Aktiv", status_inactive: "Intelligente Bereinigung Inaktiv" },
    demo: { how_it_works: "Wie es funktioniert", step_01: "SCHRITT 01", step_01_desc: "Tippen Sie auf eine Taste, um Verba zu wecken. Das Transkriptions-Overlay wird sofort angezeigt.", step_02: "SCHRITT 02", step_02_desc: "Keine Roboterstimme erforderlich. Whisper erfasst jede Nuance präzise.", step_03: "SCHRITT 03", step_03_desc: "Lassen Sie die Taste los und sehen Sie zu, wie Ihre Worte perfekt getippt werden." },
    features: { subheadline: "Leistungsstarke Funktionen verpackt in einem einfachen Erlebnis." },
    hero: { title_p1: "Ihre Stimme,", title_p2: "sofort getippt.", subtitle_p1: "Schreiben Sie E-Mails, Dokumente und Nachrichten einfach durch Sprechen. Privat, schnell und bleibt auf Ihrem Mac.", thought_1: "Die Zukunft des Schreibens ist nicht das Tippen...", thought_2: "Es ist natürliches Sprechen, das genau dort erscheint, wo Sie es brauchen.", thought_3: "Gesprochene Worte verfliegen, geschriebene bleiben." }
  },
  nl: {
    cleanup: { status_active: "Slim Opschonen Actief", status_inactive: "Slim Opschonen Inactief" },
    demo: { how_it_works: "Hoe het werkt", step_01: "STAP 01", step_01_desc: "Tik op een toets om Verba te wekken. De transcriptie-overlay verschijnt direct.", step_02: "STAP 02", step_02_desc: "Geen robotstem nodig. Whisper legt elke nuance nauwkeurig vast.", step_03: "STAP 03", step_03_desc: "Laat de toets los en zie hoe je woorden perfect worden getypt." },
    features: { subheadline: "Krachtige functies verpakt in een eenvoudige ervaring." },
    hero: { title_p1: "Jouw stem,", title_p2: "werkt direct.", subtitle_p1: "Schrijf e-mails, documenten en berichten door te praten. Privé, snel en alles blijft op je Mac.", thought_1: "De toekomst van schrijven is niet typen...", thought_2: "Het is natuurlijk spreken en het precies daar laten verschijnen waar je het nodig hebt.", thought_3: "Gesproken woorden vliegen weg, geschreven woorden blijven." }
  }
};

locales.forEach(loc => {
  const filePath = path.join(__dirname, 'messages', `${loc}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (!data.cleanup) data.cleanup = {};
  if (!data.demo) data.demo = {};
  
  Object.assign(data.cleanup, newKeys[loc].cleanup);
  Object.assign(data.demo, newKeys[loc].demo);
  Object.assign(data.features, newKeys[loc].features);
  Object.assign(data.hero, newKeys[loc].hero);
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
});
console.log('More translations updated.');
