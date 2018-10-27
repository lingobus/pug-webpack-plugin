# Description

pug-webpack-plugin:
1. inject block webpackEmitedJs with emited js to pug template;
2. inject block webpackEmitedCss with emited css to pug template;
3. copy pug template and it's dependencies to build path
4. support require('*') in pug
5. pug hot reload

# Explaination

original pug template:
```pug
extends ../../common/pug/_base

mixin content ()
  img(src=require('./img/teacher-blur420_227.jpg'), data-src=require('./img/video-1.png'), width="420", height="227")

block main
  #root
    +content()
```

output:
```pug
extends ../../common/pug/_base

mixin content ()
  img(src='data:image/jpeg;base64,/9jRpfewfewfewfK1G......6RukfwefwfwefewefewfewQ==', data-src='/static/pages/lazyload/img/video-1.991faea0.png', width="420", height="227")

block main
  #root
    +content()

block webpackEmitedJs
  script(src="/static/pages/lazyload/index.ce2ce1c99ae9285389df.js")

block webpackEmitedCss
  link(rel="stylesheet" href="/static/pages/lazyload/index.355105a366bebec1c80f.css")

```
pug dependencies are copied to build path:
- src/common/pug/_base.pug -> /build/[prod|dev]/common/pug/_base.pug
- src/pages/lazyload/index.pug -> /build/[prod|dev]/pages/lazyload/index.pug

# Example

https://github.com/lingobus/mpa-starter

# install
yarn add lingobus/pug-webpack-plugin#v0.0.2 --dev
