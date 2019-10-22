module Types exposing (Model, Msg(..))

type Msg = Increment | Decrement

type alias Model =
  { value: Int
  }
