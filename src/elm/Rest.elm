module Rest exposing (getExchangeRate)

import Http
import Types exposing (Msg(..))
import Json.Decode exposing (Decoder, field, float)

getExchangeRate: String -> Cmd Msg
getExchangeRate baseCurrency =
  Http.get
    { url = "https://api.exchangeratesapi.io/latest?base=JPY&symbols=" ++ baseCurrency
    , expect = Http.expectJson GotExchangeRate (exchangeRateDecoder baseCurrency)
    }

exchangeRateDecoder: String -> Decoder Float
exchangeRateDecoder baseCurrency =
  field "rates" (field baseCurrency float)
