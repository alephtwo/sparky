# Sparky

[Spark it up Sparky!](https://www.youtube.com/watch?v=ukjnrXTTvPY&t=1m07s)

This is a simple web application to aid in financial calculations related to
[Granblue Fantasy](https://granbluefantasy.jp).

## Usage

The user inputs the number they possess of each of the following:

- Crystals (300 per draw)
- Ten Part Draw Tickets
- Draw Tickets
- Cerulean Sparks

The calculator then determines the number of ten draws that must be completed
in order to hit 300 cerulean sparks and associates that with a cost in JPY:

```text
required ten draws * 3150 JPY per ten draw
```

If the user has more than one spark, the cost is always determined for the next
spark.

## Development

Pull in dependences:

```shell
> npm install
```

Start a development server:

```shell
> npm start
```

## Contributing

1. Fork the repo.
1. Make your changes.
1. Ensure that `npm run lint` does not return any errors.
1. Send a pull request.

Please make sure to follow reasonable style standards and conventions.
