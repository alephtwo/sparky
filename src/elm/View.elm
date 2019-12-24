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
      [ calculatorGroup "crystal.jpg" model.crystals       Types.SetCrystals       calculated.fromCrystals
      , calculatorGroup "10part.jpg"  model.tenPartTickets Types.SetTenPartTickets calculated.fromTenPartTickets
      , calculatorGroup "ticket.png"  model.tickets        Types.SetTickets        calculated.fromTickets
      , calculatorGroup "sparks.jpg"  model.sparks         Types.SetSparks         calculated.fromSparks
      ]

calculatorGroup: String -> Int -> (String -> Msg) -> Int -> Html Msg
calculatorGroup image amount event calculated =
  div [ class "input-row calculator-group" ]
    [ img [ src image, class "icon" ] []
    , input [ value (String.fromInt amount), onInput event ] []
    , input [ disabled True, value (String.fromInt calculated), onInput event ] []
    ]
