module State exposing (init, update, subscriptions)

import Rest
import Types exposing (Flags, Model, Msg(..))

init: Flags -> (Model, Cmd Msg)
init flags =
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

subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none

initialState: Model
initialState =
  { exchangeRate = 0
  }
