# Makefile
SRC = $(shell find src -name '*.js')
LIB = $(SRC:src/%.js=lib/%.js)

lib: $(LIB)
lib/%.js: src/%.js
	mkdir -p $(@D)
	node_modules/.bin/babel --stage 0 $< -o $@
