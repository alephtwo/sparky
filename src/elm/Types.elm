module Types exposing (Calculated, Flags, Model, Msg(..))

import Http


type Msg
    = GotExchangeRate (Result Http.Error Float)
    | SetCrystals String
    | SetTickets String
    | SetTenPartTickets String
    | SetSparks String
    | SetBaseCurrency String


type alias Model =
    { exchangeRate : Float
    , crystals : Maybe Int
    , tickets : Maybe Int
    , tenPartTickets : Maybe Int
    , sparks : Maybe Int
    , baseCurrency : String
    }


type alias Calculated =
    { fromCrystals : Int
    , fromSparks : Int
    , fromTenPartTickets : Int
    , fromTickets : Int
    }


type alias Flags =
    {}
