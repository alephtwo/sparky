import { Component, createEffect, createSignal } from "solid-js";
import { m } from "../paraglide/messages";
import { initialState, reducer, type State } from "../state/State.mts";
import CrystalsIcon from "/crystal.webp?url";
import TicketsIcon from "/ticket.webp?url";
import TenPartTicketsIcon from "/10part.webp?url";
import SparksIcon from "/sparks.webp?url";
import { formatCurrency } from "../util/currency.mts";
import { IconPhoneCall } from "@tabler/icons-solidjs";
import { calculate } from "../util/calculate.mts";
import { CalculatorRow } from "./components/CalculatorRow";
import { Paper } from "./components/Paper";
import { LocalePicker } from "./components/LocalePicker";
import { Message } from "../state/Message.mts";
import type { UserEnteredNumber } from "../@types/UserEnteredNumber.mts";

export const Sparky: Component = () => {
  const [state, setState] = createSignal<State>(initialState);

  const dispatch = (message: Message) => {
    setState((prev) => reducer(prev, message));
  };

  // Create reactive message getters that track locale changes
  const messages = () => {
    void state().locale; // Dependency on locale to track changes
    return {
      crystals: m.crystals(),
      tickets: m.tickets(),
      tenPartTickets: m["ten-part-tickets"](),
      sparks: m.sparks(),
      pageTitle: m["page-title"](),
    };
  };

  // Re-evaluate translations when locale changes
  createEffect(() => {
    document.title = messages().pageTitle;
  });

  const dispatchHandlers = {
    setCrystals: (value: UserEnteredNumber) =>
      dispatch({
        action: "set-crystals",
        value,
      }),
    setTickets: (value: UserEnteredNumber) =>
      dispatch({
        action: "set-tickets",
        value,
      }),
    setTenPartTickets: (value: UserEnteredNumber) =>
      dispatch({
        action: "set-ten-part-tickets",
        value,
      }),
    setSparks: (value: UserEnteredNumber) =>
      dispatch({
        action: "set-sparks",
        value,
      }),
  };

  const sparks = () =>
    calculate({
      tickets: state().tickets,
      tenPartTickets: state().tenPartTickets,
      crystals: state().crystals,
      sparks: state().sparks,
    });

  const percent = () => Math.round(sparks() / 3);
  const neededToSpark = () => Math.max(300 - sparks(), 0);
  const tenRollsToSpark = () => Math.ceil(neededToSpark() / 10);

  return (
    <div class="h-screen flex items-center bg-no-repeat bg-cover bg-[url(/backdrop.webp)]">
      <div class="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      <div class="container mx-auto w-md z-10">
        <div class="flex flex-col items-center gap-2 p-2">
          <Paper>
            <div class="flex flex-col gap-2">
              <CalculatorRow
                icon={CrystalsIcon}
                placeholder={messages().crystals}
                value={state().crystals}
                onChange={dispatchHandlers.setCrystals}
              />
              <CalculatorRow
                icon={TicketsIcon}
                placeholder={messages().tickets}
                value={state().tickets}
                onChange={dispatchHandlers.setTickets}
              />
              <CalculatorRow
                icon={TenPartTicketsIcon}
                placeholder={messages().tenPartTickets}
                value={state().tenPartTickets}
                onChange={dispatchHandlers.setTenPartTickets}
              />
              <CalculatorRow
                icon={SparksIcon}
                placeholder={messages().sparks}
                value={state().sparks}
                onChange={dispatchHandlers.setSparks}
              />
            </div>
          </Paper>
          <Paper>
            <div class="flex flex-col items-center gap-2">
              <progress class="progress progress-primary" value={Math.min(percent(), 100)} max="100"></progress>
              <span class="caption-bottom text-sm">
                {sparks()} / 300 ({percent()}%)
              </span>
              <span class="text-2xl font-bold">{formatCurrency(tenRollsToSpark() * 3150)}</span>
              <div class="flex items-center gap-2 text-sm">
                <IconPhoneCall size={20} stroke={"2"} style={{ color: "rgb(153, 27, 27)" }} />
                <a
                  class="link link-primary"
                  href="https://www.ncpgambling.org/help-treatment/national-helpline-1-800-522-4700/"
                >
                  National Problem Gambling Helpline
                </a>
              </div>
            </div>
          </Paper>
          <LocalePicker
            locale={state().locale}
            onChange={(locale) => dispatch({ action: "set-locale", value: locale })}
          />
        </div>
      </div>
    </div>
  );
};
