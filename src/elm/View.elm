module View exposing (view)

import Costs
import Html exposing (Html, a, div, img, input, option, select, span, text)
import Html.Attributes exposing (alt, class, disabled, href, placeholder, src, title, value)
import Html.Events exposing (onInput)
import Round
import Types exposing (Model, Msg(..))


view : Model -> Html Msg
view model =
  let
    calculated =
      { fromCrystals = (model.crystals |> Maybe.withDefault 0) // Costs.crystalsPerRoll
      , fromTickets = model.tickets |> Maybe.withDefault 0
      , fromTenPartTickets = (model.tenPartTickets |> Maybe.withDefault 0) * 10
      , fromSparks = model.sparks |> Maybe.withDefault 0
      }

    exchangeRate =
      model.exchangeRate |> Maybe.withDefault 0

    total =
      List.sum
        [ calculated.fromCrystals
        , calculated.fromTickets
        , calculated.fromTenPartTickets
        , calculated.fromSparks
        ]

    sparkCount =
      total // Costs.crystalsPerRoll

    neededForNextSpark =
      Costs.crystalsPerRoll - modBy Costs.crystalsPerRoll total

    tenDrawsNeeded =
      ceiling (toFloat neededForNextSpark / 10)

    pricePerTenDraw =
      toFloat Costs.yenPerTenRoll * exchangeRate

    costToSpark =
      pricePerTenDraw * toFloat tenDrawsNeeded
  in
    div []
      [ div [ class "card" ]
        [ div [ class "calculator" ] <|
          List.concat
            [ calculatorField "Crystals" "crystal.webp" model.crystals Types.SetCrystals calculated.fromCrystals
            , calculatorField "Ten Part Draw Tickets" "10part.webp" model.tenPartTickets Types.SetTenPartTickets calculated.fromTenPartTickets
            , calculatorField "Tickets" "ticket.webp" model.tickets Types.SetTickets calculated.fromTickets
            , calculatorField "Cerulean Sparks" "cerulean-spark.webp" model.sparks Types.SetSparks calculated.fromSparks
            , [ img [ src "sparks.webp", alt "Total" ] []
              , input [ value (describeSparkCount total "cerulean"), disabled True ] []
              , input [ value (describeSparkCount sparkCount "full"), disabled True ] []
              ]
            , [ img [ src "coin.webp", alt "Cost to Spark", title "Cost to Spark" ] []
              , span [ class "read-only-input" ] [ text (Round.ceiling 2 costToSpark ++ " " ++ model.baseCurrency ++ " until next spark") ]
              , select [ Html.Events.onInput SetBaseCurrency ] currencyOptions
              ]
            ]
        , div [ class "footer" ]
          [ span [] [ text (Round.ceiling 4 (1 / exchangeRate) ++ " " ++ model.baseCurrency ++ ":JPY") ]
          , text " | "
          , a [ href "https://www.ncpgambling.org/help-treatment/national-helpline-1-800-522-4700/" ] [ text "National Problem Gambling Helpline" ]
          ]
        ]
      ]

describeSparkCount : Int -> String -> String
describeSparkCount count label =
  let
    descriptor =
      case count of
        1 ->
          "spark"
        _ ->
          "sparks"
  in
    String.fromInt count ++ " " ++ label ++ " " ++ descriptor

calculatorField : String -> String -> Maybe Int -> (String -> Msg) -> Int -> List (Html Msg)
calculatorField label_ image amount event calculated =
  let
    value_ =
      case amount of
        Just x ->
          String.fromInt x
        Nothing ->
          ""
  in
    [ img [ src image, alt label_, title label_ ] []
    , input [ value value_, onInput event, placeholder label_ ] []
    , input [ value (String.fromInt calculated), disabled True ] []
    ]

currencyOptions : List (Html Msg)
currencyOptions =
  let
    currencies =
      [ "USD"
      , "EUR"
      , "CAD"
      , "GBP"
      , "AUD"
      , "BGN"
      , "BRL"
      , "CHF"
      , "CNY"
      , "CZK"
      , "DKK"
      , "HKD"
      , "HRK"
      , "HUF"
      , "IDR"
      , "ILS"
      , "INR"
      , "ISK"
      , "JPY"
      , "KRW"
      , "MXN"
      , "MYR"
      , "NOK"
      , "NZD"
      , "PHP"
      , "PLN"
      , "RON"
      , "RUB"
      , "SEK"
      , "SGD"
      , "THB"
      , "TRY"
      , "ZAR"
      ]
  in
    List.map (\c -> option [ value c ] [ text c ]) currencies
