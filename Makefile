all: elm sass html

elm:
	elm make src/Main.elm --output=public/app.js

sass:
	sass --scss src/index.scss public/app.css

html:
	cp src/index.html public/index.html
