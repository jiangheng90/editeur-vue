<h1 align="center">
  <a>Editeur-Vue</a>
</h1>

<p align=center>
<img src="https://camo.githubusercontent.com/8e580b1b4576a7ec916ee1e98477156b63636fb9/68747470733a2f2f69302e6864736c622e636f6d2f6266732f616c62756d2f336633633632316464393939306231613135303663356232623031323935313336666638643266322e706e6740353138775f31655f31632e706e67"/>
</p>

<p align="center">a implement of <a href="https://github.com/jiangheng90/editeur.js">editeur.js</a> in vue Component</p>

<p align="center">
  <a href="https://npmjs.com/package/editeur-vue" title="Version">
    <img src="https://img.shields.io/npm/v/editeur-vue.svg" alt="Version">
  </a>
  <a href="https://npmjs.com/package/editeurjs" title="Downloads">
    <img src="https://img.shields.io/npm/dm/editeur-vue.svg" alt="Downloads">
  </a>
    <a href="https://www.mit-license.org/" title="License">
    <img src="https://img.shields.io/npm/l/editeurjs.svg" alt="License">
  </a>
</p>

<p align="center">
  <a href="#install"><strong>install</strong></a>
  &#x2022;
  <a href="#usage"><strong>usage</strong></a>
  &#x2022;
  <a href="#property"><strong>property</strong></a>
    &#x2022;
  <a href="#note"><strong>note</strong></a>
</p>

## install
```Bash
npm install editeur-vue --save
```

## usage
Ant Design is used in component. If you want to use it, you need to import Ant Design as well. you can import the component I use in it like this:
```Javascript
// main.js
import { Dropdown, Input, Tooltip, Icon } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';

Vue.use(Dropdown)
Vue.use(Input)
Vue.use(Tooltip)
Vue.use(Icon)
```
or import whole ant design like this: 
```Javascript
// main.js
import antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';

Vue.use(antd)
```

then you can use it in template just like this:
```HTML
<editeur width="600px" height="400px"></editeur>
```

## property
|name|type|defalut|instruction|
|----|----|----|----|
|width|string|600px|width of the editor element|
|height|string|400px|height of the editor element|


## Note

  >this repostry is just an example to implement <a href="https://github.com/jiangheng90/editeur.js">editeur.js</a>'s fuction.

  >font-family and init function is not use in this component.

  >In this component there are some problems in it.They are caused by <a href="https://github.com/jiangheng90/editeur.js">editeur.js</a> and maybe fixed later.

  >If you have any custmized event of methods request, you can add it yourself
