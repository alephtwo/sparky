module Main exposing (main)

import Browser
import State
import Types
import View


main : Program Types.Flags Types.Model Types.Msg
main =
    Browser.element
        { init = State.init
        , subscriptions = State.subscriptions
        , update = State.update
        , view = View.view
        }
