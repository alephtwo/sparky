module Types exposing (Flags, Model, Msg(..))

import Http

type Msg
  = GotExchangeRate (Result Http.Error Float)

type alias Model =
  { exchangeRate: Float
  }

type alias Flags =
  {
  }
