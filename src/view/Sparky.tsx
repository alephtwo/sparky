import TenPartTicketsIcon from "/10part.webp?url";
import CrystalsIcon from "/crystal.webp?url";
import SparksIcon from "/sparks.webp?url";
import TicketsIcon from "/ticket.webp?url";
import { m } from "@i18n/messages";
import { IconPhoneCall } from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";

import type { UserEnteredNumber } from "../@types/UserEnteredNumber.mts";
import { getLocale, Locale } from "../paraglide/runtime";
import { calculate } from "../util/calculate.mts";
import { formatCurrency } from "../util/currency.mts";
import { CalculatorRow } from "./components/CalculatorRow";
import { LocalePicker } from "./components/LocalePicker";
import { Paper } from "./components/Paper";

export function Sparky(): React.JSX.Element {
  const [locale, setLocale] = useState<Locale>(getLocale());
  const [crystals, setCrystals] = useState<UserEnteredNumber>("");
  const [tickets, setTickets] = useState<UserEnteredNumber>("");
  const [tenPartTickets, setTenPartTickets] = useState<UserEnteredNumber>("");
  const [ceruleanSparks, setCeruleanSparks] = useState<UserEnteredNumber>("");

  // Re-evaluate translations when locale changes
  useEffect(() => {
    document.title = messages.pageTitle;
  });

  // Create reactive message getters that track locale changes
  const messages = useMemo(() => {
    return {
      crystals: m.crystals(),
      tickets: m.tickets(),
      tenPartTickets: m["ten-part-tickets"](),
      sparks: m.sparks(),
      pageTitle: m["page-title"](),
    };
  }, [locale]);

  const sparks = useMemo(
    () =>
      calculate({
        tickets: tickets,
        tenPartTickets: tenPartTickets,
        crystals: crystals,
        sparks: ceruleanSparks,
      }),
    [tickets, tenPartTickets, crystals, ceruleanSparks],
  );
  const percent = useMemo(() => Math.round(sparks / 3), [sparks]);
  const neededToSpark = useMemo(() => Math.max(300 - sparks, 0), [sparks]);
  const tenRollsToSpark = useMemo(() => Math.ceil(neededToSpark / 10), [neededToSpark]);

  return (
    <div className="flex h-screen items-center bg-[url(/backdrop.webp)] bg-cover bg-no-repeat">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div className="z-10 mx-auto w-md">
        <div className="flex flex-col items-center gap-2 p-2">
          <Paper>
            <div className="flex flex-col gap-2">
              <CalculatorRow
                icon={CrystalsIcon}
                label={messages.crystals}
                value={crystals}
                onChange={setCrystals}
                alt="Crystals"
              />
              <CalculatorRow
                icon={TicketsIcon}
                label={messages.tickets}
                value={tickets}
                onChange={setTickets}
                alt="Tickets"
              />
              <CalculatorRow
                icon={TenPartTicketsIcon}
                label={messages.tenPartTickets}
                value={tenPartTickets}
                onChange={setTenPartTickets}
                alt="Ten Part Tickets"
              />
              <CalculatorRow
                icon={SparksIcon}
                label={messages.sparks}
                value={ceruleanSparks}
                onChange={setCeruleanSparks}
                alt="Cerulean Sparks"
              />
            </div>
          </Paper>
          <Paper>
            <div className="flex flex-col items-center gap-2">
              <progress
                className="w-full rounded-lg border select-none"
                value={Math.min(percent, 100)}
                max="100"
              ></progress>
              <span className="text-sm">
                {sparks} / 300 ({percent}%)
              </span>
              <span className="text-2xl font-bold">{formatCurrency(tenRollsToSpark * 3150)}</span>
              <div className="flex items-center gap-2 text-sm">
                <IconPhoneCall size={20} stroke="2" />
                <a href="https://www.ncpgambling.org/help-treatment/national-helpline-1-800-522-4700/">
                  National Problem Gambling Helpline
                </a>
              </div>
            </div>
          </Paper>
          <div className="self-end">
            <LocalePicker locale={locale} onChange={setLocale} />
          </div>
        </div>
      </div>
    </div>
  );
}
