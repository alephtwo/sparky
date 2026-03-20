import * as React from "react";
import { useEffect, useReducer } from "react";
import { m } from "../paraglide/messages";
import { setLocale } from "../paraglide/runtime";
import { initialState, reducer } from "../state/State.mts";
import CrystalsIcon from "/crystal.webp?url";
import TicketsIcon from "/ticket.webp?url";
import TenPartTicketsIcon from "/10part.webp?url";
import SparksIcon from "/sparks.webp?url";
import { formatCurrency } from "../util/currency.mts";
import { IconPhoneCall } from "@tabler/icons-react";
import { calculate } from "../util/calculate.mts";
import { sanitize } from "../util/sanitize.mts";
import { CalculatorRow } from "./components/CalculatorRow";
import { Paper } from "./components/Paper";
import { LocalePicker } from "./components/LocalePicker";

export function Sparky() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    document.title = m["page-title"]();
  }, []);

  // redraw on locale change
  const callbacks = {
    setCrystals: (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({
        action: "set-crystals",
        value: sanitize(e.target.value),
      }),
    setTickets: (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({
        action: "set-tickets",
        value: sanitize(e.target.value),
      }),
    setTenPartTickets: (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({
        action: "set-ten-part-tickets",
        value: sanitize(e.target.value),
      }),
    setSparks: (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({
        action: "set-sparks",
        value: sanitize(e.target.value),
      }),
  };

  const sparks = calculate({
    tickets: state.tickets,
    tenPartTickets: state.tenPartTickets,
    crystals: state.crystals,
    sparks: state.sparks,
  });
  const percent = Math.round(sparks / 3);
  const neededToSpark = Math.max(300 - sparks, 0);
  const tenRollsToSpark = Math.ceil(neededToSpark / 10);

  return (
    <div className="h-screen flex items-center bg-no-repeat bg-cover bg-[url(/backdrop.webp)]">
      <div className="container mx-auto w-md">
        <div className="flex flex-col items-center gap-2 p-2">
          <Paper>
            <div className="flex flex-col gap-2">
              <CalculatorRow
                icon={CrystalsIcon}
                placeholder={m.crystals()}
                value={state.crystals}
                onChange={callbacks.setCrystals}
              />
              <CalculatorRow
                icon={TicketsIcon}
                placeholder={m.tickets()}
                value={state.tickets}
                onChange={callbacks.setTickets}
              />
              <CalculatorRow
                icon={TenPartTicketsIcon}
                placeholder={m["ten-part-tickets"]()}
                value={state.tenPartTickets}
                onChange={callbacks.setTenPartTickets}
              />
              <CalculatorRow
                icon={SparksIcon}
                placeholder={m.sparks()}
                value={state.sparks}
                onChange={callbacks.setSparks}
              />
            </div>
          </Paper>
          <Paper>
            <div className="flex flex-col items-center gap-2">
              <progress className="progress progress-primary" value={Math.min(percent, 100)} max="100"></progress>
              <span className="caption-bottom text-sm">
                {sparks} / 300 ({percent}%)
              </span>
              <span className="text-2xl font-bold">{formatCurrency(tenRollsToSpark * 3150)}</span>
              <div className="flex items-center gap-2 text-sm">
                <IconPhoneCall className="text-red-800" />
                <a
                  className="link link-primary"
                  href="https://www.ncpgambling.org/help-treatment/national-helpline-1-800-522-4700/"
                >
                  National Problem Gambling Helpline
                </a>
              </div>
            </div>
          </Paper>
          <LocalePicker
            locale={state.locale}
            onChange={(locale) => dispatch({ action: "set-locale", value: locale })}
          />
        </div>
      </div>
    </div>
  );
}
