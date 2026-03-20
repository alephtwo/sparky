import * as React from "react";
import { useEffect, useReducer } from "react";
import { m } from "../paraglide/messages";
import { setLocale } from "../paraglide/runtime";
import { initialState, reducer, State } from "../state/State.mts";
import { UserEnteredNumber } from "../@types/UserEnteredNumber.mts";
import CrystalsIcon from "/crystal.webp?url";
import TicketsIcon from "/ticket.webp?url";
import TenPartTicketsIcon from "/10part.webp?url";
import SparksIcon from "/sparks.webp?url";
import { moneyFormatter } from "../util/moneyFormatter.mts";
import { IconPhoneCall } from "@tabler/icons-react";

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
        value: e.target.value,
      }),
    setTickets: (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({
        action: "set-tickets",
        value: e.target.value,
      }),
    setTenPartTickets: (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({
        action: "set-ten-part-tickets",
        value: e.target.value,
      }),
    setSparks: (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({
        action: "set-sparks",
        value: e.target.value,
      }),
  };

  const sparks = calculate(state);
  const percent = Math.round(sparks / 3);
  const neededToSpark = Math.max(300 - sparks, 0);
  const tenRollsToSpark = Math.ceil(neededToSpark / 10);

  return (
    <div className="h-screen flex items-center bg-no-repeat bg-cover bg-[url(/backdrop.webp)]">
      <div className="container mx-auto w-md">
        <div className="flex flex-col items-center gap-2 p-2">
          <div className="w-full p-4 bg-slate-100/75 border border-slate-500 rounded-sm">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 max-h-14">
                <img src={CrystalsIcon} />
                <input
                  // use "tel" to force mobile phones to use numpad, but not have the wonky html5 number api
                  type="tel"
                  placeholder={m.crystals()}
                  className="input input-xl w-full"
                  value={state.crystals}
                  onChange={callbacks.setCrystals}
                />
              </div>
              <div className="flex gap-2 max-h-14">
                <img src={TicketsIcon} />
                <input
                  // use "tel" to force mobile phones to use numpad, but not have the wonky html5 number api
                  type="tel"
                  placeholder={m.tickets()}
                  className="input input-xl w-full"
                  value={state.tickets}
                  onChange={callbacks.setTickets}
                />
              </div>
              <div className="flex gap-2 max-h-14">
                <img src={TenPartTicketsIcon} />
                <input
                  // use "tel" to force mobile phones to use numpad, but not have the wonky html5 number api
                  type="tel"
                  placeholder={m["ten-part-tickets"]()}
                  className="input input-xl w-full"
                  value={state.tenPartTickets}
                  onChange={callbacks.setTenPartTickets}
                />
              </div>
              <div className="flex gap-2 max-h-14">
                <img src={SparksIcon} />
                <input
                  // use "tel" to force mobile phones to use numpad, but not have the wonky html5 number api
                  type="tel"
                  placeholder={m.crystals()}
                  className="input input-xl w-full"
                  value={state.sparks}
                  onChange={callbacks.setSparks}
                />
              </div>
            </div>
          </div>
          <div className="w-full p-4 bg-slate-100/75 border border-slate-500 rounded-sm">
            <div className="flex flex-col items-center gap-2">
              <progress className="progress progress-primary" value={Math.min(percent, 100)} max="100"></progress>
              <span className="caption-bottom text-sm">
                {sparks} / 300 ({percent}%)
              </span>
              <span className="text-2xl font-bold">{moneyFormatter.format(tenRollsToSpark * 3150)}</span>
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
          </div>
          <div className="join join-horizontal rounded-sm border border-slate-500">
            <button
              className={`btn join-item ${state.locale === "en" ? "bg-primary-content" : ""}`}
              onClick={() => {
                Promise.resolve(setLocale("en", { reload: false })).catch(console.error);
                dispatch({ action: "set-locale", value: "en" });
              }}
            >
              A
            </button>
            <button
              className={`btn join-item ${state.locale === "jp" ? "bg-primary-content" : ""}`}
              onClick={() => {
                Promise.resolve(setLocale("jp", { reload: false })).catch(console.error);
                dispatch({ action: "set-locale", value: "jp" });
              }}
            >
              あ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function calculate(state: State): number {
  return [
    Math.floor(toNumber(state.crystals) / 300),
    toNumber(state.tickets),
    toNumber(state.tenPartTickets) * 10,
    toNumber(state.sparks),
  ].reduce((a, x) => a + x, 0);
}

function toNumber(input: UserEnteredNumber): number {
  return input || 0;
}
