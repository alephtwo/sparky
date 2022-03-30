import produce from 'immer';
import { Message, State, UserEnteredNumber } from './Types';

export const initialState: State = {
  crystals: '',
  tickets: '',
  tenPartTickets: '',
  sparks: '',
};

export function reducer(state: State, message: Message) {
  switch (message.action) {
    case 'set-crystals':
      return produce(state, (next) => {
        next.crystals = sanitize(message.value);
      });
    case 'set-tickets':
      return produce(state, (next) => {
        next.tickets = sanitize(message.value);
      });
    case 'set-ten-part-tickets':
      return produce(state, (next) => {
        next.tenPartTickets = sanitize(message.value);
      });
    case 'set-sparks':
      return produce(state, (next) => {
        next.sparks = sanitize(message.value);
      });
    default:
      return state;
  }
}

function sanitize(input: string): UserEnteredNumber {
  // Ensure we're only looking at numbers, and at most six of them.
  const onlyDigits = input.replace(/[^\d]/, '').substring(0, 6);
  const attempt = parseInt(onlyDigits);
  if (isNaN(attempt)) {
    return '';
  }
  return attempt;
}
