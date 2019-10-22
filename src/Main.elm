module Main exposing (..)

import Browser
import State
import View

main = Browser.element
  { init = State.init
  , subscriptions = State.subscriptions
  , update = State.update
  , view = View.view
  }
