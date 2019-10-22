module Types exposing (Flags, Model, Msg(..))

type Msg = Increment | Decrement

type alias Model =
  { value: Int
  }

type alias Flags =
  {
  }
