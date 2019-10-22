module State exposing (initialState, update)

import Types exposing (Model, Msg(..))

initialState: Model
initialState =
  { value = 0
  }

update: Msg -> Model -> Model
update msg model =
  case msg of
    Increment ->
      { model | value = model.value + 1 }
    Decrement ->
      { model | value = model.value - 1 }
