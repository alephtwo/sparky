module View exposing (view)

import Costs
import Html exposing (Html, div, input, text, label, span)
import Html.Events exposing (onInput)
import Html.Attributes exposing (class, for, value, id, disabled)
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
      Costs.crystalsPerRoll - (modBy Costs.crystalsPerRoll total)
    tenDrawsNeeded =
      ceiling (toFloat neededForNextSpark / 10)
    pricePerTenDraw =
      Costs.yenPerTenRoll * model.exchangeRate
    costToSpark =
      pricePerTenDraw * (toFloat tenDrawsNeeded)
  in
    div []
      [ div [ class "data-entry" ]
        [ div [ class "user-inputs" ]
          [ intInput "Crystals" model.crystals SetCrystals
          , intInput "Tickets" model.tickets SetTickets
          , intInput "Ten Part Tickets" model.tenPartTickets SetTenPartTickets
          , intInput "Sparks" model.sparks SetSparks
          ]
        , div [ class "calculated-values" ]
          [ calculatedField "From Crystals" (String.fromInt calculated.fromCrystals)
          , calculatedField "From Tickets" (String.fromInt calculated.fromTickets)
          , calculatedField "From Ten Part Tickets" (String.fromInt calculated.fromTenPartTickets)
          , calculatedField "From Sparks" (String.fromInt calculated.fromSparks)
          ]
        ]
      , div []
        [ calculatedField "Total" (String.fromInt total)
        , calculatedField "Spark Count" (String.fromInt sparkCount)
        , calculatedField "Next Spark In" (String.fromInt neededForNextSpark)
        , calculatedField "Cost To Spark" (Round.ceiling 2 costToSpark)
        ]
      ]

intInput: String -> Int -> (String -> Msg) -> Html Msg
intInput name number event =
  let
    cssId = makeCssId name
  in
    div [ class "input-group" ]
      [ label [ for cssId ] [ text name ]
      , input [ id cssId, value (String.fromInt number), onInput event ] []
      ]

calculatedField: String -> String -> Html Msg
calculatedField name val =
  let
    cssId = makeCssId name
  in
    div [ class "input-group" ]
      [ label [ for cssId ] [ text name ]
      , input [ id cssId, value val, disabled True ] []
      ]

makeCssId: String -> String
makeCssId name =
  name
  |> String.toLower
  |> String.map(\c -> if c == ' ' then '-' else c)
