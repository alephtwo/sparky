import BackgroundImage from '../static/backdrop.webp';
import CrystalImage from '../static/crystal.webp';
import TicketImage from '../static/ticket.webp';
import TenPartTicketImage from '../static/10part.webp';
import SparksImage from '../static/sparks.webp';

const language = navigator.language || 'en-US';
const GranblueTextBundle: TextBundle = {
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

const themes: ThemesLibrary = {
  granblue: {
    name: 'Granblue Fantasy',
    backdrop: BackgroundImage,
    crystalsIcon: CrystalImage,
    ticketsIcon: TicketImage,
    tenPartTicketsIcon: TenPartTicketImage,
    sparksIcon: SparksImage,
    text: GranblueTextBundle[language],
  },
};

export default themes;

export interface SparkyTheme {
  name: string;
  backdrop: string;
  crystalsIcon: string;
  ticketsIcon: string;
  tenPartTicketsIcon: string;
  sparksIcon: string;
  text: LocalizedTextBundle;
}

interface TextBundle {
  'en-US': LocalizedTextBundle;
  'ja-JP': LocalizedTextBundle;
  [other: string]: LocalizedTextBundle;
}

interface LocalizedTextBundle {
  crystals: string;
  tickets: string;
  tenPartTickets: string;
  sparks: string;
}

interface ThemesLibrary {
  granblue: SparkyTheme;
}
