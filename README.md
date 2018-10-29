# Description

pug-webpack-plugin:
1. inject block webpackEmitedJs with emited js to pug template;
2. inject block webpackEmitedCss with emited css to pug template;
3. copy pug template and it's dependencies to build path
4. support require('*') in pug
5. pug hot reload

# install
yarn add lingobus/pug-webpack-plugin#v0.0.3 --dev

# Example
see example folder

build example:
```bash
npm run build-example
```
run example:
```bash
npm run example
```
then open http://localhost:8080/

# Params and Hooks

params:
- publicPath: should be the same as public path of webpack config
- context: source full path
- template: pug template file full path
- outputPath: build full path

hooks:
- afterEmit: after pug template generated

# Explaination

original pug template:
```pug
extends ./_base

block root
  #root
    h1 pug-webpack-plugin demo
    p base64 img
    img(src=require('./image-small.jpg'))
    p hashed url img
    img(src=require('./image-large.png'))
```

output:
```pug
extends ./_base

block root
  #root
    h1 pug-webpack-plugin demo
    p base64 img
    img(src='data:image/jpeg;base64,/9j/4AAQSk......ZJ||')
    p hashed url img
    img(src='/static/image-large.991faea0.png')

block webpackEmitedJs
  script(src="/static/index.d77a9f2dd37eec97d67d.js")

block webpackEmitedCss
  link(rel="stylesheet" href="/static/index.aab29171d6cb4fa220cb.css")
```
pug and images dependencies are copied to build path:
- src/_base.pug -> dist/_base.pug
- src/index.pug -> dist/index.pug
- src/image-large.png -> dist/image-large.991faea0.png