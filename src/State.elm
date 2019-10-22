module State exposing (init, update, subscriptions)

import Types exposing (Flags, Model, Msg(..))

init: Flags -> (Model, Cmd Msg)
init flags =
  (initialState, Cmd.none)

update: Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Increment ->
      ({ model | value = model.value + 1 }, Cmd.none)
    Decrement ->
      ({ model | value = model.value - 1 }, Cmd.none)

subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none

initialState: Model
initialState =
  { value = 0
  }
