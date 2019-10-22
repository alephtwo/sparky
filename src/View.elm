module View exposing (view)

import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)
import Types exposing (Model, Msg(..))

view: Model -> Html Msg
view model =
  div []
    [ text (String.fromFloat model.exchangeRate)
    ]
