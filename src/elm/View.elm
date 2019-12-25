module View exposing (view)

import Costs
import Html exposing (Html, div, input, img, text, label)
import Html.Events exposing (onInput)
import Html.Attributes exposing (class, for, value, id, src, disabled)
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
        [ calculatorField "crystal.jpg" model.crystals       Types.SetCrystals       calculated.fromCrystals
        , calculatorField "10part.jpg"  model.tenPartTickets Types.SetTenPartTickets calculated.fromTenPartTickets
        , calculatorField "ticket.png"  model.tickets        Types.SetTickets        calculated.fromTickets
        , calculatorField "sparks.jpg"  model.sparks         Types.SetSparks         calculated.fromSparks
        ]
      , div [ class "output" ] <| List.concat
        [ outputField (String.fromInt total)
        , outputField (String.fromInt sparkCount)
        , outputField (String.fromInt neededForNextSpark)
        , outputField (String.fromInt tenDrawsNeeded)
        , outputField (Round.ceiling 2 pricePerTenDraw)
        , outputField (Round.ceiling 2 costToSpark)
        ]
      ]

outputField: String -> List(Html Msg)
outputField t =
  [ div [] []
  , input [ value t, disabled True ] []
  ]

calculatorField: String -> Int -> (String -> Msg) -> Int -> List(Html Msg)
calculatorField image amount event calculated =
  [ img [ src image ] []
  , input [ value (String.fromInt amount), onInput event ] []
  , input [ value (String.fromInt calculated), disabled True ] []
  ]
