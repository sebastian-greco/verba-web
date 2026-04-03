const fs = require('fs');
const path = require('path');

const locales = ['en', 'es', 'it', 'fr', 'de', 'nl'];
const keysToAdd = {
  en: {
    privacy_section: {
      badge: "Your Privacy is Native",
      quote_extension: " Unlike cloud dictation tools, Verba processes everything on your Mac's Neural Engine. We physically cannot see your data."
    },
    pricing: {
      paid_feature_1: "3 Device Activations",
      paid_feature_2: "All future updates included",
      paid_feature_3: "Lifetime local AI models",
      comparison_headline_1: "Better for you,",
      comparison_headline_2: "and your wallet.",
      comparison_row_cost: "Cost",
      comparison_old_price: "$120/year",
      comparison_row_data_privacy: "Data Privacy",
      comparison_privacy_value: "100% Private",
      comparison_row_account: "Account",
      comparison_account_value: "Not Needed",
      comparison_row_offline: "Offline",
      comparison_offline_value: "Full support"
    },
    common: {
      close: "Close"
    }
  },
  es: {
    privacy_section: {
      badge: "Tu privacidad es nativa",
      quote_extension: " A diferencia de las herramientas de dictado en la nube, Verba procesa todo en el motor neuronal de tu Mac. Físicamente no podemos ver tus datos."
    },
    pricing: {
      paid_feature_1: "3 Activaciones de dispositivos",
      paid_feature_2: "Todas las actualizaciones futuras incluidas",
      paid_feature_3: "Modelos de IA locales de por vida",
      comparison_headline_1: "Mejor para ti,",
      comparison_headline_2: "y para tu bolsillo.",
      comparison_row_cost: "Costo",
      comparison_old_price: "$120/año",
      comparison_row_data_privacy: "Privacidad de datos",
      comparison_privacy_value: "100% Privado",
      comparison_row_account: "Cuenta",
      comparison_account_value: "No es necesaria",
      comparison_row_offline: "Sin conexión",
      comparison_offline_value: "Soporte completo"
    },
    common: {
      close: "Cerrar"
    }
  },
  it: {
    privacy_section: {
      badge: "La tua privacy è nativa",
      quote_extension: " A differenza degli strumenti di dettatura cloud, Verba elabora tutto sul Neural Engine del tuo Mac. Fisicamente non possiamo vedere i tuoi dati."
    },
    pricing: {
      paid_feature_1: "3 Attivazioni di dispositivi",
      paid_feature_2: "Tutti gli aggiornamenti futuri inclusi",
      paid_feature_3: "Modelli IA locali a vita",
      comparison_headline_1: "Meglio per te,",
      comparison_headline_2: "e per il tuo portafoglio.",
      comparison_row_cost: "Costo",
      comparison_old_price: "$120/anno",
      comparison_row_data_privacy: "Privacy dei dati",
      comparison_privacy_value: "100% Privato",
      comparison_row_account: "Account",
      comparison_account_value: "Non necessario",
      comparison_row_offline: "Offline",
      comparison_offline_value: "Supporto completo"
    },
    common: {
      close: "Chiudi"
    }
  },
  fr: {
    privacy_section: {
      badge: "Votre confidentialité est native",
      quote_extension: " Contrairement aux outils de dictée dans le cloud, Verba traite tout sur le moteur neuronal de votre Mac. Nous ne pouvons physiquement pas voir vos données."
    },
    pricing: {
      paid_feature_1: "3 Activations d'appareils",
      paid_feature_2: "Toutes les futures mises à jour incluses",
      paid_feature_3: "Modèles d'IA locaux à vie",
      comparison_headline_1: "Mieux pour vous,",
      comparison_headline_2: "et pour votre portefeuille.",
      comparison_row_cost: "Coût",
      comparison_old_price: "120 $/an",
      comparison_row_data_privacy: "Confidentialité",
      comparison_privacy_value: "100% Privé",
      comparison_row_account: "Compte",
      comparison_account_value: "Non requis",
      comparison_row_offline: "Hors ligne",
      comparison_offline_value: "Support complet"
    },
    common: {
      close: "Fermer"
    }
  },
  de: {
    privacy_section: {
      badge: "Ihre Privatsphäre ist nativ",
      quote_extension: " Im Gegensatz zu Cloud-Diktat-Tools verarbeitet Verba alles auf der Neural Engine Ihres Macs. Wir können Ihre Daten physisch nicht sehen."
    },
    pricing: {
      paid_feature_1: "3 Geräteaktivierungen",
      paid_feature_2: "Alle zukünftigen Updates inklusive",
      paid_feature_3: "Lokale KI-Modelle auf Lebenszeit",
      comparison_headline_1: "Besser für Sie,",
      comparison_headline_2: "und Ihren Geldbeutel.",
      comparison_row_cost: "Kosten",
      comparison_old_price: "120 $/Jahr",
      comparison_row_data_privacy: "Datenschutz",
      comparison_privacy_value: "100% Privat",
      comparison_row_account: "Konto",
      comparison_account_value: "Nicht erforderlich",
      comparison_row_offline: "Offline",
      comparison_offline_value: "Volle Unterstützung"
    },
    common: {
      close: "Schließen"
    }
  },
  nl: {
    privacy_section: {
      badge: "Je privacy is native",
      quote_extension: " In tegenstelling tot cloud-dicteertools verwerkt Verba alles op de Neural Engine van je Mac. Wij kunnen je gegevens fysiek niet zien."
    },
    pricing: {
      paid_feature_1: "3 Apparaatactiveringen",
      paid_feature_2: "Alle toekomstige updates inbegrepen",
      paid_feature_3: "Levenslange lokale AI-modellen",
      comparison_headline_1: "Beter voor jou,",
      comparison_headline_2: "en je portemonnee.",
      comparison_row_cost: "Kosten",
      comparison_old_price: "$120/jaar",
      comparison_row_data_privacy: "Gegevensprivacy",
      comparison_privacy_value: "100% Privé",
      comparison_row_account: "Account",
      comparison_account_value: "Niet nodig",
      comparison_row_offline: "Offline",
      comparison_offline_value: "Volledige ondersteuning"
    },
    common: {
      close: "Sluiten"
    }
  }
};

locales.forEach(loc => {
  const filePath = path.join(__dirname, 'messages', `${loc}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  if (!data.common) data.common = {};
  
  Object.assign(data.privacy_section, keysToAdd[loc].privacy_section);
  Object.assign(data.pricing, keysToAdd[loc].pricing);
  Object.assign(data.common, keysToAdd[loc].common);
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
});
console.log('Translations updated.');
