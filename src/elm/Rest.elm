module Rest exposing (getExchangeRate)

import Http
import Types exposing (Msg(..))
import Json.Decode exposing (Decoder, field, float)

getExchangeRate: Cmd Msg
getExchangeRate =
  Http.get
    { url = "https://api.exchangeratesapi.io/latest?base=JPY&symbols=USD"
    , expect = Http.expectJson GotExchangeRate exchangeRateDecoder
    }

exchangeRateDecoder: Decoder Float
exchangeRateDecoder =
  field "rates" (field "USD" float)
