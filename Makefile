all: elm sass static

elm:
	elm make src/elm/Main.elm --output=app.js --optimize
	terser -cm -o app.min.js app.js
	rm app.js

sass:
	sass --no-source-map src/scss/main.scss app.css

static:
	cp -r src/static/* .

clean:
	rm -f index.html app.min.js app.css *.webp
