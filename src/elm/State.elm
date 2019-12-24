module State exposing (init, update, subscriptions)

import Rest
import Types exposing (Flags, Model, Msg(..))

init: Flags -> (Model, Cmd Msg)
init _ =
  (initialState, Rest.getExchangeRate)

update: Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    GotExchangeRate result ->
      case result of
        Ok rate ->
          ({ model | exchangeRate = rate }, Cmd.none)
        Err _ ->
          (model, Cmd.none)
    SetCrystals x ->
      ({ model | crystals = parseInt x } , Cmd.none)
    SetTickets x ->
      ({ model | tickets = parseInt x } , Cmd.none)
    SetTenPartTickets x ->
      ({ model | tenPartTickets = parseInt x } , Cmd.none)
    SetSparks x ->
      ({ model | sparks = parseInt x } , Cmd.none)

subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none

initialState: Model
initialState =
  { exchangeRate = 0
  , crystals = 0
  , tickets = 0
  , tenPartTickets = 0
  , sparks = 0
  }

parseInt: String -> Int
parseInt str =
  str
  |> String.filter Char.isDigit
  |> String.slice 0 6
  |> String.toInt
  |> Maybe.withDefault 0
