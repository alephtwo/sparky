module Types exposing (Calculated, Flags, Model, Msg(..))

import Http


type Msg
    = SetCrystals String
    | SetTickets String
    | SetTenPartTickets String
    | SetSparks String


type alias Model =
    { crystals : Maybe Int
    , tickets : Maybe Int
    , tenPartTickets : Maybe Int
    , sparks : Maybe Int
    }


type alias Calculated =
    { fromCrystals : Int
    , fromSparks : Int
    , fromTenPartTickets : Int
    , fromTickets : Int
    }


type alias Flags =
    {}
