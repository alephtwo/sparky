import { IconPhoneCall } from "@tabler/icons-solidjs";
import { Component, createEffect, createMemo, createSignal } from "solid-js";
import { formatCurrency } from "../util/currency.mts";
import { calculate } from "../util/calculate.mts";
import { CalculatorRow } from "./components/CalculatorRow";
import { Paper } from "./components/Paper";
import { LocalePicker } from "./components/LocalePicker";
import type { UserEnteredNumber } from "../@types/UserEnteredNumber.mts";
import { m } from "../paraglide/messages";
import { getLocale, Locale } from "../paraglide/runtime";
import CrystalsIcon from "/crystal.webp?url";
import TicketsIcon from "/ticket.webp?url";
import TenPartTicketsIcon from "/10part.webp?url";
import SparksIcon from "/sparks.webp?url";

export const Sparky: Component = () => {
  const [locale, setLocale] = createSignal<Locale>(getLocale());
  const [crystals, setCrystals] = createSignal<UserEnteredNumber>("");
  const [tickets, setTickets] = createSignal<UserEnteredNumber>("");
  const [tenPartTickets, setTenPartTickets] = createSignal<UserEnteredNumber>("");
  const [ceruleanSparks, setCeruleanSparks] = createSignal<UserEnteredNumber>("");

  // Re-evaluate translations when locale changes
  createEffect(() => {
    document.title = messages().pageTitle;
  });

  // Create reactive message getters that track locale changes
  const messages = createMemo(() => {
    void locale();
    return {
      crystals: m.crystals(),
      tickets: m.tickets(),
      tenPartTickets: m["ten-part-tickets"](),
      sparks: m.sparks(),
      pageTitle: m["page-title"](),
    };
  });

  const sparks = createMemo((): number =>
    calculate({
      tickets: tickets(),
      tenPartTickets: tenPartTickets(),
      crystals: crystals(),
      sparks: ceruleanSparks(),
    }),
  );
  const percent = createMemo(() => Math.round(sparks() / 3));
  const neededToSpark = createMemo(() => Math.max(300 - sparks(), 0));
  const tenRollsToSpark = createMemo(() => Math.ceil(neededToSpark() / 10));

  return (
    <div class="h-screen flex items-center bg-no-repeat bg-cover bg-[url(/backdrop.webp)]">
      <div class="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div class="container mx-auto w-md z-10">
        <div class="flex flex-col items-center gap-2 p-2">
          <Paper>
            <div class="flex flex-col gap-2">
              <CalculatorRow
                icon={CrystalsIcon}
                label={messages().crystals}
                value={crystals()}
                onChange={setCrystals}
              />
              <CalculatorRow icon={TicketsIcon} label={messages().tickets} value={tickets()} onChange={setTickets} />
              <CalculatorRow
                icon={TenPartTicketsIcon}
                label={messages().tenPartTickets}
                value={tenPartTickets()}
                onChange={setTenPartTickets}
              />
              <CalculatorRow
                icon={SparksIcon}
                label={messages().sparks}
                value={ceruleanSparks()}
                onChange={setCeruleanSparks}
              />
            </div>
          </Paper>
          <Paper>
            <div class="flex flex-col items-center gap-2">
              <progress class="progress progress-primary" value={Math.min(percent(), 100)} max="100"></progress>
              <span class="text-sm text-base-content/70">
                {sparks()} / 300 ({percent()}%)
              </span>
              <span class="text-2xl font-bold">{formatCurrency(tenRollsToSpark() * 3150)}</span>
              <div class="flex items-center gap-2 text-sm">
                <IconPhoneCall size={20} stroke="2" class="text-error" />
                <a
                  class="link link-primary"
                  href="https://www.ncpgambling.org/help-treatment/national-helpline-1-800-522-4700/"
                >
                  National Problem Gambling Helpline
                </a>
              </div>
            </div>
          </Paper>
          <div class="self-end">
            <LocalePicker locale={locale()} onChange={setLocale} />
          </div>
        </div>
      </div>
    </div>
  );
};
