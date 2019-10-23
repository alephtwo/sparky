module View exposing (view)

import Html exposing (Html, div, input, text, label)
import Html.Events exposing (onInput)
import Html.Attributes exposing (value)
import Types exposing (Model, Msg(..))

view: Model -> Html Msg
view model =
  div []
    [ intInput "Crystals" model.crystals SetCrystals
    , intInput "Tickets" model.tickets SetTickets
    , intInput "Ten Part Tickets" model.tenPartTickets SetTenPartTickets
    , intInput "Sparks" model.sparks SetSparks
    ]

intInput: String -> Int -> (String -> Msg) -> Html Msg
intInput name number event =
  div []
    [ label []
      [ text name
      , input [ value (String.fromInt number), onInput event ] []
      ]
    ]
