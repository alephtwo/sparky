module Types exposing (Flags, Model, Msg(..))

import Http

type Msg
  = GotExchangeRate (Result Http.Error Float)
  | SetCrystals String
  | SetTickets String
  | SetTenPartTickets String
  | SetSparks String

type alias Model =
  { exchangeRate: Float
  , crystals: Int
  , tickets: Int
  , tenPartTickets: Int
  , sparks: Int
  }

type alias Flags =
  {
  }
