(window["webpackJsonpfuse-react-app"]=window["webpackJsonpfuse-react-app"]||[]).push([[20],{503:function(e,t,a){"use strict";var r=a(1),n=a(6),o=a(0),c=a.n(o),l=(a(2),a(3)),s=a(7),i=c.a.forwardRef(function(e,t){var a=e.alt,o=e.children,s=e.childrenClassName,i=e.classes,u=e.className,p=e.component,f=void 0===p?"div":p,d=e.imgProps,g=e.sizes,m=e.src,y=e.srcSet,b=Object(n.a)(e,["alt","children","childrenClassName","classes","className","component","imgProps","sizes","src","srcSet"]),h=null,O=m||y;return h=O?c.a.createElement("img",Object(r.a)({alt:a,src:m,srcSet:y,sizes:g,className:i.img},d)):s&&c.a.isValidElement(o)?c.a.cloneElement(o,{className:Object(l.a)(s,o.props.className)}):o,c.a.createElement(f,Object(r.a)({className:Object(l.a)(i.root,i.system,u,!O&&i.colorDefault),ref:t},b),h)});t.a=Object(s.a)(function(e){return{root:{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),borderRadius:"50%",overflow:"hidden",userSelect:"none"},colorDefault:{color:e.palette.background.default,backgroundColor:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[600]},img:{width:"100%",height:"100%",textAlign:"center",objectFit:"cover"}}},{name:"MuiAvatar"})(i)},584:function(e,t,a){"use strict";var r=a(38),n=a.n(r),o=a(40),c="[ORDER APP] GET CLIENTS",l="[ORDER APP] LOADING CLIENTS";function s(e){return function(t){var a={"page[number]":e.current_page};e.filters&&e.filters.forEach(function(e){var t="filter["+e.value.filterType+"-"+e.id+"]",r=e.value.filterValue;r.length>0&&(a[t]=r)}),n.a.get("".concat(o.b.url,"/api/retail/clients/list"),{params:a}).then(function(e){t({type:c,payload:e.data.result}),t(i(!1))})}}function i(e){return{type:l,payload:e}}var u=a(15),p="[ORDER APP] GET SALES",f="[ORDER APP] SALES_CHANGE_PAGE",d="[ORDER APP] LOADING SALES";function g(e,t){return function(a){var r={"page[number]":e.current_page,status:t};e.filters&&e.filters.forEach(function(e){var t="filter["+e.value.filterType+"-"+e.id+"]",a=e.value.filterValue;a.length>0&&(r[t]=a)}),n.a.get("".concat(o.b.url,"/api/backend/sales/list"),{params:r}).then(function(e){a(b(!1)),a({type:p,payload:e.data.result,status:t})})}}function m(e,t){return function(a,r){var c=r().OrderApp.sales.page,l=r().OrderApp.sales.status;n.a.post("".concat(o.b.url,"/api/backend/sales/set/status"),{id:e,status:t}).then(function(e){200===e.data.code?(a(u.j({message:e.data.message,variant:"success"})),a(g(c,l))):a(u.j({message:e.data.message,variant:"error"}))})}}function y(e){return{type:f,payload:e}}function b(e){return{type:d,payload:e}}a.d(t,"a",function(){return c}),a.d(t,"c",function(){return l}),a.d(t,"g",function(){return s}),a.d(t,"i",function(){return i}),a.d(t,"b",function(){return p}),a.d(t,"e",function(){return f}),a.d(t,"d",function(){return d}),a.d(t,"h",function(){return g}),a.d(t,"k",function(){return m}),a.d(t,"f",function(){return y}),a.d(t,"j",function(){return b})},597:function(e,t,a){"use strict";var r=a(42),n=a(4),o=a(584),c=a(10);function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,r)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(a,!0).forEach(function(t){Object(n.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}var i={entities:[],searchText:"",loading:!1,page:{current_page:1,per_page:1,last_page:1,from:1,to:1,total:1,filters:[],sort:{id:"name",desc:!1},show:"all"}},u=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case o.a:return s({},e,{entities:c.a.keyBy(t.payload.data,"id"),page:{current_page:t.payload.current_page,per_page:t.payload.per_page,last_page:t.payload.last_page,from:t.payload.from,to:t.payload.to,total:t.payload.total,filters:e.page.filters,sort:e.page.sort,show:e.page.show}});case o.c:return s({},e,{loading:t.payload});default:return e}};function p(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,r)}return a}function f(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?p(a,!0).forEach(function(t){Object(n.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):p(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}var d={entities:[],searchText:"",loading:!1,status:"pending",page:{current_page:1,per_page:1,last_page:1,from:1,to:1,total:1,filters:[],sort:{id:"id",desc:!0},show:"all"}},g=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:d,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case o.b:var a=[];return t.payload?(a=t.payload.data,f({},e,{status:t.status,entities:a,page:{current_page:t.payload.current_page,per_page:t.payload.per_page,last_page:t.payload.last_page,from:t.payload.from,to:t.payload.to,total:t.payload.total,filters:e.page.filters,sort:e.page.sort,show:e.page.show}})):f({},d);case o.e:return t.payload?f({},e,{page:t.payload}):f({},d);case o.d:return f({},e,{loading:t.payload});default:return e}},m=Object(r.d)({clients:u,sales:g});t.a=m},736:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),o=a(31),c=a(8),l=a(198),s=a(21),i=a(98),u=a(503),p=a(199);var f=function(){var e=Object(c.c)(function(e){return e.OrderApp.clients.entities}),t=Object(c.c)(function(e){return e.OrderApp.clients.searchText}),a=Object(c.c)(function(e){return e.OrderApp.clients.loading}),l=Object(r.useState)(null),f=Object(s.a)(l,2),d=f[0],g=f[1];return Object(r.useEffect)(function(){e&&g(function(e,t){var a=Object.keys(e).map(function(t){return e[t]});return 0===t.length?a:o.t.filterArrayByString(a,t)}(e,t))},[e,t]),!d||a?n.a.createElement("div",{className:"flex flex-1 items-center justify-center h-full mt-32"},n.a.createElement(i.a,{color:"textSecondary",variant:"h5"},"Cargando")):0===d.length&&!1===a?n.a.createElement("div",{className:"flex flex-1 items-center justify-center h-full mt-32"},n.a.createElement(i.a,{color:"textSecondary",variant:"h5"},"No hay clientes para mostrar")):n.a.createElement(o.a,{animation:"transition.fadeIn",delay:300},n.a.createElement(p.b,{className:"-striped -highlight h-full overflow-hidden",data:d,columns:[{accessor:"logoUrl",Cell:function(e){return n.a.createElement(u.a,{alt:e.original.name,src:e.value,className:"w-24 h-24"})},className:"justify-center",width:50,sortable:!1},{Header:"Nombre",accessor:"name",filterable:!0,className:"font-bold"},{Header:"Email",accessor:"email",filterable:!0},{Header:"Tel\xe9fono",accessor:"phone",filterable:!0},{Header:"Provincia",accessor:"information.state",filterable:!0},{Header:"Ciudad",accessor:"information.city",filterable:!0},{Header:"Direcci\xf3n",filterable:!0,Cell:function(e){return n.a.createElement(i.a,{variant:"body1"},e.original.information.street_name+" "+e.original.information.street_number)}},{Header:"Pedidos",accessor:"orders",filterable:!1,sortable:!1,className:"font-bold  justify-center",width:72}]}))},d=a(584),g=a(597);t.default=Object(l.a)("OrderApp",g.a)(function(e){var t=Object(c.b)(),a=Object(r.useRef)(null);return Object(r.useEffect)(function(){t(d.i(!0)),t(d.g(e.match.params))},[]),n.a.createElement(n.a.Fragment,null,n.a.createElement(o.m,{classes:{contentWrapper:"h-full",content:"flex flex-col h-full",header:"min-h-60 h-60"},header:n.a.createElement("div",{className:"p-20"},n.a.createElement("h4",null,"Tus clientes")),content:n.a.createElement(f,null),innerScroll:!0,sidebarInner:!0,ref:a}))})}}]);