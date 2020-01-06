module Rest exposing (getExchangeRate)

import Http
import Json.Decode exposing (Decoder, field, float)
import Types exposing (Msg(..))


getExchangeRate : String -> Cmd Msg
getExchangeRate baseCurrency =
    Http.get
        { url = "https://api.exchangeratesapi.io/latest?base=JPY&symbols=" ++ baseCurrency
        , expect = Http.expectJson GotExchangeRate (exchangeRateDecoder baseCurrency)
        }


exchangeRateDecoder : String -> Decoder Float
exchangeRateDecoder baseCurrency =
    field "rates" (field baseCurrency float)
