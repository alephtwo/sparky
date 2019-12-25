module Types exposing (Flags, Model, Calculated, Msg(..))

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

type alias Calculated =
  { fromCrystals : Int
  , fromSparks : Int
  , fromTenPartTickets : Int
  , fromTickets : Int
  }

type alias Flags =
  {
  }
