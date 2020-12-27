import * as React from 'react';
import { useReducer } from 'react';

type Message = 'setCrystals' | 'setTickets' | 'setTenPartTickets' | 'setSparks';

interface State {
  crystals: number | '';
  tickets: number | '';
  tenPartTickets: number | '';
  sparks: number | '';
}

interface Action {
  type: Message;
  value: string;
}

const initialState: State = {
  crystals: 0,
  tickets: 0,
  tenPartTickets: 0,
  sparks: 0,
};

function reducer(state: State, action: Action): State {
  const value = sanitizeNumber(action.value);

  switch (action.type) {
    case 'setCrystals':
      return extendCopy(state, { crystals: value });
    case 'setTickets':
      return extendCopy(state, { tickets: value });
    case 'setTenPartTickets':
      return extendCopy(state, { tenPartTickets: value });
    case 'setSparks':
      return extendCopy(state, { sparks: value });
    default:
      return state;
  }
}

function render(): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getOnChange = (type: Message) => (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: type, value: event.target.value });
  };

  const results: State = {
    crystals: Math.floor((state.crystals || 0) / 300),
    tickets: state.tickets || 0,
    tenPartTickets: (state.tenPartTickets || 0) * 10,
    sparks: state.sparks || 0,
  };

  const sum = Object.values(results).reduce((acc, element) => acc + element, 0);

  return (
    <div>
      <div>
        <label htmlFor="crystals">Crystals</label>
        <input type="text" id="crystals" value={state.crystals} onChange={getOnChange('setCrystals')} />
        <input type="text" disabled={true} value={results.crystals} />
      </div>
      <div>
        <label htmlFor="tickets">Tickets</label>
        <input type="text" id="tickets" value={state.tickets} onChange={getOnChange('setTickets')} />
        <input type="text" disabled={true} value={results.tickets} />
      </div>
      <div>
        <label htmlFor="ten-part-tickets">Ten Part Tickets</label>
        <input
          type="text"
          id="ten-part-tickets"
          value={state.tenPartTickets}
          onChange={getOnChange('setTenPartTickets')}
        />
        <input type="text" disabled={true} value={results.tenPartTickets} />
      </div>
      <div>
        <label htmlFor="cerulean-sparks">Cerulean Sparks</label>
        <input type="text" id="cerulean-sparks" value={state.sparks} onChange={getOnChange('setSparks')} />
        <input type="text" disabled={true} value={results.sparks} />
      </div>
      <div>
        <h1>{sum}</h1>
      </div>
    </div>
  );
}

function extendCopy(source: State, ...sources: Record<string, unknown>[]): State {
  return Object.assign({}, source, ...sources) as State;
}

function sanitizeNumber(input: string): string | number {
  const attempt = parseInt(input);

  // If the user hasn't input a number then show empty string
  if (isNaN(attempt)) {
    return '';
  }

  // At this point we're being trolled.
  // Let's stop to avoid scientific notation weirdness
  if (attempt > 1e9) {
    return 1e9;
  }

  // We're good; return the parsed number
  return attempt;
}

export default render;
