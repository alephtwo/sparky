module State exposing (init, subscriptions, update)

import Types exposing (Flags, Model, Msg(..))

init : Flags -> (Model, Cmd Msg)
init _ =
  (initialState, Cmd.none)

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    GotExchangeRate result ->
      case result of
        Ok rate ->
          ({ model | exchangeRate = Just rate }, Cmd.none)
        Err _ ->
          (model, Cmd.none)
    SetCrystals x ->
      ({ model | crystals = parseInt x }, Cmd.none)
    SetTickets x ->
      ({ model | tickets = parseInt x }, Cmd.none)
    SetTenPartTickets x ->
      ({ model | tenPartTickets = parseInt x }, Cmd.none)
    SetSparks x ->
      ({ model | sparks = parseInt x }, Cmd.none)

subscriptions : Model -> Sub Msg
subscriptions _ =
  Sub.none

initialState : Model
initialState =
  { exchangeRate = Nothing
  , crystals = Nothing
  , tickets = Nothing
  , tenPartTickets = Nothing
  , sparks = Nothing
  }


parseInt : String -> Maybe Int
parseInt str =
  str
    |> String.filter Char.isDigit
    |> String.slice 0 6
    |> String.toInt
