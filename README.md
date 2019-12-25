# Sparky

[Spark it up Sparky!](https://www.youtube.com/watch?v=ukjnrXTTvPY&t=1m07s)

This is a simple web application to aid in financial calculations related to
[Granblue Fantasy](https://granbluefantasy.jp).

## Usage

The user inputs the number they possess of each of the following:

* Crystals (300 per draw)
* Ten Part Draw Tickets
* Draw Tickets
* Cerulean Sparks

The calculator then determines the number of ten draws that must be completed
in order to hit 300 cerulean sparks and associates that with a cost in USD:

```
required ten draws * 3150 JPY per ten draw * current JPY to USD exchange rate
```

If the user has more than one spark, the cost is always determined for the next
spark.

## Development

You'll need to have the following installed and available on the PATH:

* [elm](https://guide.elm-lang.org/install/elm.html)
* [dart-sass](https://sass-lang.com/dart-sass) (or some other SASS implementation)
* [terser](https://terser.org/) for minifying

After that, it's as simple as building using Make:

```sh
make
```

It's suggested that you use some sort of simple HTTP server to serve the
resulting `public` directory.

When any changes are made, just run `make` again to recompile everything and
regenerate the `public` directory. In theory, this can be done with a file
watcher - although compiling takes very little time, so its effect is basically
negligible.

## Contributing

1. Fork the repo.
1. Make your changes.
1. Send a pull request.

Please make sure to follow reasonable style standards and conventions.

Note that this repository does not use NPM. This is intentional, and is unlikely
to change. Please do not send in pull requests that add NPM as a dependency.
