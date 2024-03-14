import BackgroundImage from "../images/backdrop.webp";
import CrystalImage from "../images/crystal.webp";
import TicketImage from "../images/ticket.webp";
import TenPartTicketImage from "../images/10part.webp";
import SparksImage from "../images/sparks.webp";
import { SparkyTheme } from "./SparkyTheme";

export const GranblueTheme: SparkyTheme = new SparkyTheme({
  name: "Granblue",
  backdrop: BackgroundImage,
  crystalsIcon: CrystalImage,
  ticketsIcon: TicketImage,
  tenPartTicketsIcon: TenPartTicketImage,
  sparksIcon: SparksImage,
});
