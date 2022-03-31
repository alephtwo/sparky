interface MessageBundle {
  crystals: string;
  tickets: string;
  tenPartTickets: string;
  sparks: string;
}

export function getMessageBundle(locale = navigator.language): MessageBundle {
  return locales[locale] || locales['en-US'];
}

interface LocaleProvider {
  'en-US': MessageBundle;
  'ja-JP': MessageBundle;
  [other: string]: MessageBundle;
}

const locales: LocaleProvider = {
  'en-US': {
    crystals: 'Crystals',
    tickets: 'Draw Tickets',
    tenPartTickets: 'Ten Part Draw Tickets',
    sparks: 'Cerulean Sparks',
  },
  'ja-JP': {
    crystals: '宝晶石',
    tickets: 'ガチャチケ',
    tenPartTickets: '10連チケ',
    sparks: '蒼光の御印',
  },
};
