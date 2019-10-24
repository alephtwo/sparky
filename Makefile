all: elm sass static

elm:
	elm make src/elm/Main.elm --output=public/app.js
	uglifyjs --compress --mangle -o public/app.min.js -- public/app.js
	rm public/app.js

sass:
	sass --no-source-map src/scss/main.scss public/app.css

static:
	cp -r src/static/* public/

clean:
	rm -rf public
