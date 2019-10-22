module View exposing (view)

import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)
import Types exposing (Model, Msg(..))

view: Model -> Html Msg
view model =
  div []
    [ div []
      [ text ("exchange rate " ++ String.fromFloat model.exchangeRate)
      ]
    , div []
      [ text ("3000 mobacoin " ++ String.fromFloat (model.exchangeRate * 3000))
      ]
    ]
