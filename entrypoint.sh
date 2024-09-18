#!/bin/bash

(cd ./src/client && npm run watch) & (nodemon --ignore 'dist/**/*' --watch src/server --watch src/packages src/server/index.js)