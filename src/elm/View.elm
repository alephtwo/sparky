module View exposing (view)

import Costs
import Html exposing (Html, div, input, img, text, label)
import Html.Events exposing (onInput)
import Html.Attributes exposing (class, for, value, id, src, disabled, alt)
import Round
import Types exposing (Model, Msg(..))

view: Model -> Html Msg
view model =
  let
    calculated =
      { fromCrystals = model.crystals // Costs.crystalsPerRoll
      , fromTickets = model.tickets
      , fromTenPartTickets = model.tenPartTickets * 10
      , fromSparks = model.sparks
      }
    total =
      calculated.fromCrystals
      + calculated.fromTickets
      + calculated.fromTenPartTickets
      + calculated.fromSparks
    sparkCount =
      total // Costs.crystalsPerRoll
    neededForNextSpark =
      Costs.crystalsPerRoll - modBy Costs.crystalsPerRoll total
    tenDrawsNeeded =
      ceiling (toFloat neededForNextSpark / 10)
    pricePerTenDraw =
      toFloat Costs.yenPerTenRoll * model.exchangeRate
    costToSpark =
      pricePerTenDraw * toFloat tenDrawsNeeded
  in
    div [ class "card" ]
      [ div [ class "calculator" ] <| List.concat
        [ calculatorField "Crystals"              "crystal.jpg" model.crystals       Types.SetCrystals       calculated.fromCrystals
        , calculatorField "Ten Part Draw Tickets" "10part.jpg"  model.tenPartTickets Types.SetTenPartTickets calculated.fromTenPartTickets
        , calculatorField "Tickets"               "ticket.png"  model.tickets        Types.SetTickets        calculated.fromTickets
        , calculatorField "Cerulean Sparks"       "sparks.jpg"  model.sparks         Types.SetSparks         calculated.fromSparks
        ]
      , div [ class "output" ] <| List.concat
        [ outputField "Total"         "weapon-exp-cup.jpg" (String.fromInt total)
        , outputField "Cost To Spark" "weapon-exp-cup.jpg" (Round.ceiling 2 costToSpark)
        ]
      ]

calculatorField: String -> String -> Int -> (String -> Msg) -> Int -> List(Html Msg)
calculatorField alt_ image amount event calculated =
  [ img [ src image, alt alt_ ] []
  , input [ value (String.fromInt amount), onInput event ] []
  , input [ value (String.fromInt calculated), disabled True ] []
  ]

outputField: String -> String -> String -> List(Html Msg)
outputField alt_ image t =
  [ img [ src image, alt alt_ ] []
  , input [ value t, disabled True ] []
  ]
