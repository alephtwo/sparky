import BackgroundImage from "../static/backdrop.webp";
import CrystalImage from "../static/crystal.webp";
import TicketImage from "../static/ticket.webp";
import TenPartTicketImage from "../static/10part.webp";
import SparksImage from "../static/sparks.webp";
import { SparkyTheme } from "./SparkyTheme";

export const GranblueTheme: SparkyTheme = new SparkyTheme({
  name: "Granblue",
  backdrop: BackgroundImage,
  crystalsIcon: CrystalImage,
  ticketsIcon: TicketImage,
  tenPartTicketsIcon: TenPartTicketImage,
  sparksIcon: SparksImage,
  text: {
    "en-US": {
      crystals: "Crystals",
      tickets: "Draw Tickets",
      tenPartTickets: "Ten Part Draw Tickets",
      sparks: "Cerulean Sparks",
    },
    "ja-JP": {
      crystals: "宝晶石",
      tickets: "ガチャチケ",
      tenPartTickets: "10連チケ",
      sparks: "蒼光の御印",
    },
  },
});
