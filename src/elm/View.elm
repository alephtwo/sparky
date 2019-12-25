module View exposing (view)

import Costs
import Html exposing (Html, div, input, img, text, label, span)
import Html.Events exposing (onInput)
import Html.Attributes exposing (class, for, value, id, src, disabled, alt, title)
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
    div []
      [ div [ class "card" ]
        [ div [ class "calculator" ] <| List.concat
          [ calculatorField "Crystals"              "crystal.jpg"         model.crystals       Types.SetCrystals       calculated.fromCrystals
          , calculatorField "Ten Part Draw Tickets" "10part.jpg"          model.tenPartTickets Types.SetTenPartTickets calculated.fromTenPartTickets
          , calculatorField "Tickets"               "ticket.png"          model.tickets        Types.SetTickets        calculated.fromTickets
          , calculatorField "Cerulean Sparks"       "cerulean-spark.jpg"  model.sparks         Types.SetSparks         calculated.fromSparks
          , [ img [ src "sparks.jpg", alt "Total" ] []
            , input [ value (String.fromInt total ++ " cerulean sparks"), disabled True ] []
            , input [ value (describeSparkCount sparkCount), disabled True ] []
            ]
          , [ img [ src "coin.png", alt "Cost to Spark", title "Cost to Spark" ] []
            , span [ class "read-only-input" ] [ text (Round.ceiling 2 costToSpark ++ " USD until next spark") ]
            ]
          ]
        , div [ class "footer" ]
          [ span [] [ text(Round.ceiling 4 (1 / model.exchangeRate) ++ " USD:JPY") ]
          ]
        ]
      ]

describeSparkCount: Int -> String
describeSparkCount count =
  let
    descriptor = case count of
      1 -> "spark"
      _ -> "sparks"
  in
    String.fromInt count ++ " full " ++ descriptor

calculatorField: String -> String -> Int -> (String -> Msg) -> Int -> List(Html Msg)
calculatorField alt_ image amount event calculated =
  [ img [ src image, alt alt_, title alt_ ] []
  , input [ value (String.fromInt amount), onInput event ] []
  , input [ value (String.fromInt calculated), disabled True ] []
  ]
