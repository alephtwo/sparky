module View exposing (view)

import Html exposing (Html, div, input, text, label, span)
import Html.Events exposing (onInput)
import Html.Attributes exposing (for, value, id)
import Round
import Types exposing (Model, Msg(..))

view: Model -> Html Msg
view model =
  let
    calculated =
      { fromCrystals = model.crystals // 300
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
      total // 300
    neededForNextSpark =
      300 - (modBy 300 total)
    tenDrawsNeeded =
      ceiling (toFloat neededForNextSpark / 10)
    pricePerTenDraw =
      -- 3000 JPY...
      3000 * model.exchangeRate
    costToSpark =
      pricePerTenDraw * (toFloat tenDrawsNeeded)
  in
    div []
      [ div []
        [ intInput "Crystals" model.crystals SetCrystals
        , intInput "Tickets" model.tickets SetTickets
        , intInput "Ten Part Tickets" model.tenPartTickets SetTenPartTickets
        , intInput "Sparks" model.sparks SetSparks
        ]
      , div []
        [ calculatedField "From Crystals" (String.fromInt calculated.fromCrystals)
        , calculatedField "From Tickets" (String.fromInt calculated.fromTickets)
        , calculatedField "From Ten Part Tickets" (String.fromInt calculated.fromTenPartTickets)
        , calculatedField "From Sparks" (String.fromInt calculated.fromSparks)
        , calculatedField "Total" (String.fromInt total)
        , calculatedField "Spark Count" (String.fromInt sparkCount)
        , calculatedField "Next Spark In" (String.fromInt neededForNextSpark)
        , calculatedField "Cost To Spark (USD)" (Round.ceiling 2 costToSpark)
        ]
      ]

intInput: String -> Int -> (String -> Msg) -> Html Msg
intInput name number event =
  let
    cssId =
      name
      |> String.toLower
      |> String.map(\c -> if c == ' ' then '-' else c)
  in
    div []
      [ label [ for cssId ] [ text name ]
      , input [ id cssId, value (String.fromInt number), onInput event ] []
      ]

calculatedField: String -> String -> Html Msg
calculatedField name value =
  div []
    [ label [] [ text name ]
    , span [] [ text value ]
    ]
