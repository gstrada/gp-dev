(window["webpackJsonpfuse-react-app"]=window["webpackJsonpfuse-react-app"]||[]).push([[18],{502:function(e,a,t){"use strict";t.r(a);var r=t(200);t.d(a,"default",function(){return r.a})},503:function(e,a,t){"use strict";var r=t(1),l=t(6),n=t(0),o=t.n(n),c=(t(2),t(3)),i=t(7),s=o.a.forwardRef(function(e,a){var t=e.alt,n=e.children,i=e.childrenClassName,s=e.classes,p=e.className,d=e.component,u=void 0===d?"div":d,f=e.imgProps,m=e.sizes,g=e.src,b=e.srcSet,y=Object(l.a)(e,["alt","children","childrenClassName","classes","className","component","imgProps","sizes","src","srcSet"]),h=null,v=g||b;return h=v?o.a.createElement("img",Object(r.a)({alt:t,src:g,srcSet:b,sizes:m,className:s.img},f)):i&&o.a.isValidElement(n)?o.a.cloneElement(n,{className:Object(c.a)(i,n.props.className)}):n,o.a.createElement(u,Object(r.a)({className:Object(c.a)(s.root,s.system,p,!v&&s.colorDefault),ref:a},y),h)});a.a=Object(i.a)(function(e){return{root:{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),borderRadius:"50%",overflow:"hidden",userSelect:"none"},colorDefault:{color:e.palette.background.default,backgroundColor:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[600]},img:{width:"100%",height:"100%",textAlign:"center",objectFit:"cover"}}},{name:"MuiAvatar"})(s)},567:function(e,a,t){"use strict";var r=t(275);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var l=r(t(0)),n=(0,r(t(569)).default)(l.default.createElement("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"}),"Delete");a.default=n},569:function(e,a,t){"use strict";var r=t(275);Object.defineProperty(a,"__esModule",{value:!0}),a.default=function(e,a){var t=n.default.memo(n.default.forwardRef(function(a,t){return n.default.createElement(o.default,(0,l.default)({ref:t},a),e)}));0;return t.muiName=o.default.muiName,t};var l=r(t(72)),n=r(t(0)),o=r(t(502))},578:function(e,a,t){"use strict";var r=t(42),l=t(4),n=t(565);function o(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);a&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),t.push.apply(t,r)}return t}function c(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?o(t,!0).forEach(function(a){Object(l.a)(e,a,t[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(t).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))})}return e}var i={loading:!1,categoryInfoLoading:!1,categoryCreateLoading:!1,entities:[],categoryInfo:null,page:{current_page:1,per_page:1,last_page:1,from:1,to:1,total:1,filters:[],sort:{id:"name",desc:!0},show:"all"}},s=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case n.e:return a.payload?c({},e,{entities:a.payload.data,page:{current_page:a.payload.current_page,per_page:a.payload.per_page,last_page:a.payload.last_page,from:a.payload.from,to:a.payload.to,total:a.payload.total,filters:e.page.filters,sort:e.page.sort,show:e.page.show}}):c({},i);case n.R:return a.payload?c({},e,{entities:a.payload}):c({},i);case n.a:return a.payload?c({},e,{page:a.payload}):c({},i);case n.q:return c({},e,{loading:a.payload});case n.b:return a.payload?c({},e,{categoryInfo:a.payload}):c({},e);case n.r:return c({},e,{categoryInfoLoading:a.payload});case n.u:return c({},e,{categoryCreateLoading:a.payload});default:return e}};function p(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);a&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),t.push.apply(t,r)}return t}function d(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?p(t,!0).forEach(function(a){Object(l.a)(e,a,t[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):p(t).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))})}return e}var u={loading:!1,discountInfoLoading:!1,discountCreateLoading:!1,entities:[],discountInfo:null,page:{current_page:1,per_page:1,last_page:1,from:1,to:1,total:1,filters:[],sort:{id:"name",desc:!0},show:"all"}},f=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case n.f:return a.payload?d({},e,{entities:a.payload.data,page:{current_page:a.payload.current_page,per_page:a.payload.per_page,last_page:a.payload.last_page,from:a.payload.from,to:a.payload.to,total:a.payload.total,filters:e.page.filters,sort:e.page.sort,show:e.page.show}}):d({},u);case n.S:return a.payload?d({},e,{entities:a.payload}):d({},u);case n.c:return a.payload?d({},e,{page:a.payload}):d({},u);case n.s:return d({},e,{loading:a.payload});case n.d:return a.payload?d({},e,{discountInfo:a.payload}):d({},e);case n.t:return d({},e,{discountInfoLoading:a.payload});case n.u:return d({},e,{discountCreateLoading:a.payload});default:return e}};function m(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);a&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),t.push.apply(t,r)}return t}function g(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?m(t,!0).forEach(function(a){Object(l.a)(e,a,t[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):m(t).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))})}return e}var b={loading:!1,packInfoLoading:!1,packCreateLoading:!1,categories:[],entities:[],packInfo:null,page:{current_page:1,per_page:1,last_page:1,from:1,to:1,total:1,filters:[],sort:{id:"name",desc:!0},show:"all"}},y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case n.i:return a.payload?g({},e,{entities:a.payload.data,page:{current_page:a.payload.current_page,per_page:a.payload.per_page,last_page:a.payload.last_page,from:a.payload.from,to:a.payload.to,total:a.payload.total,filters:e.page.filters,sort:e.page.sort,show:e.page.show}}):g({},b);case n.T:return a.payload?g({},e,{entities:a.payload}):g({},b);case n.J:return a.payload?g({},e,{page:a.payload}):g({},b);case n.v:return g({},e,{loading:a.payload});case n.K:return a.payload?g({},e,{packInfo:a.payload}):g({},e);case n.x:return g({},e,{packInfoLoading:a.payload});case n.w:return g({},e,{packCreateLoading:a.payload});case n.g:return g({},e,{categories:a.payload});default:return e}};function h(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);a&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),t.push.apply(t,r)}return t}function v(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?h(t,!0).forEach(function(a){Object(l.a)(e,a,t[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):h(t).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))})}return e}var O={loading:!1,productInfoLoading:!1,productCreateLoading:!1,categories:[],providers:[],entities:[],productInfo:null,page:{current_page:1,per_page:1,last_page:1,from:1,to:1,total:1,filters:[],sort:{id:"name",desc:!0},show:"all"}},x=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:O,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case n.k:return a.payload?v({},e,{entities:a.payload.data,page:{current_page:a.payload.current_page,per_page:a.payload.per_page,last_page:a.payload.last_page,from:a.payload.from,to:a.payload.to,total:a.payload.total,filters:e.page.filters,sort:e.page.sort,show:e.page.show}}):v({},O);case n.W:return a.payload?v({},e,{entities:a.payload}):v({},O);case n.N:return a.payload?v({},e,{page:a.payload}):v({},O);case n.B:return v({},e,{loading:a.payload});case n.O:return a.payload?v({},e,{productInfo:a.payload}):v({},e);case n.G:return v({},e,{productInfoLoading:a.payload});case n.F:return v({},e,{productCreateLoading:a.payload});case n.g:return v({},e,{categories:a.payload});case n.h:return v({},e,{providers:a.payload});default:return e}};function E(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);a&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),t.push.apply(t,r)}return t}function j(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?E(t,!0).forEach(function(a){Object(l.a)(e,a,t[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):E(t).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))})}return e}var w={loading:!1,pack_productInfoLoading:!1,pack_productCreateLoading:!1,pack_id:0,entities:[],pack_productInfo:null,page:{current_page:1,per_page:1,last_page:1,from:1,to:1,total:1,filters:[],sort:{id:"name",desc:!0},show:"all"},providers:[],provider_products:[]},_=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case n.j:return a.payload?j({},e,{entities:a.payload.data,page:{current_page:a.payload.current_page,per_page:a.payload.per_page,last_page:a.payload.last_page,from:a.payload.from,to:a.payload.to,total:a.payload.total,filters:e.page.filters,sort:e.page.sort,show:e.page.show}}):j({},w);case n.V:return a.payload?j({},e,{entities:a.payload}):j({},w);case n.L:return a.payload?j({},e,{page:a.payload}):j({},w);case n.y:return j({},e,{loading:a.payload});case n.M:return a.payload?j({},e,{pack_productInfo:a.payload}):j({},e);case n.A:return j({},e,{pack_productInfoLoading:a.payload});case n.z:return j({},e,{pack_productCreateLoading:a.payload});case n.U:return j({},e,{pack_id:a.payload});case n.n:return j({},e,{providers:a.payload});case n.p:return j({},e,{provider_products:a.payload});default:return e}};function k(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);a&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),t.push.apply(t,r)}return t}function C(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?k(t,!0).forEach(function(a){Object(l.a)(e,a,t[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):k(t).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))})}return e}var P={loading:!1,product_addressInfoLoading:!1,product_addressCreateLoading:!1,product_id:0,entities:[],product_addressInfo:null,page:{current_page:1,per_page:1,last_page:1,from:1,to:1,total:1,filters:[],sort:{id:"name",desc:!0},show:"all"},providers:[],provider_addresses:[]},N=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case n.l:return a.payload?C({},e,{entities:a.payload.data,page:{current_page:a.payload.current_page,per_page:a.payload.per_page,last_page:a.payload.last_page,from:a.payload.from,to:a.payload.to,total:a.payload.total,filters:e.page.filters,sort:e.page.sort,show:e.page.show}}):C({},P);case n.X:return a.payload?C({},e,{entities:a.payload}):C({},P);case n.P:return a.payload?C({},e,{page:a.payload}):C({},P);case n.C:return C({},e,{loading:a.payload});case n.Q:return a.payload?C({},e,{product_addressInfo:a.payload}):C({},e);case n.E:return C({},e,{product_addressInfoLoading:a.payload});case n.D:return C({},e,{product_addressCreateLoading:a.payload});case n.Y:return C({},e,{product_id:a.payload});case n.n:return C({},e,{providers:a.payload});case n.o:return C({},e,{provider_addresses:a.payload});default:return e}};function D(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);a&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),t.push.apply(t,r)}return t}function S(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?D(t,!0).forEach(function(a){Object(l.a)(e,a,t[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):D(t).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))})}return e}var I={loading:!1,product_pictureCreateLoading:!1,product_id:0,entities:[]},L=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:I,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case n.m:return a.payload?S({},e,{entities:a.payload}):S({},I);case n.H:return S({},e,{loading:a.payload});case n.I:return S({},e,{product_pictureCreateLoading:a.payload});case n.Y:return S({},e,{product_id:a.payload});default:return e}},W=Object(r.d)({category:s,discount:f,pack:y,product:x,pack_product:_,product_address:N,product_picture:L});a.a=W},725:function(e,a,t){"use strict";t.r(a);var r=t(21),l=t(0),n=t.n(l),o=t(31),c=t(198),i=t(4),s=t(98),p=t(503),d=t(550),u=t(488),f=t(533),m=t(567),g=t.n(m),b=t(57),y=t(8),h=t(199),v=t(565);function O(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);a&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),t.push.apply(t,r)}return t}function x(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?O(t,!0).forEach(function(a){Object(i.a)(e,a,t[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):O(t).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))})}return e}var E=function(e){var a=e.openDeleteAlertHandler,t=e.openDetailModalHandler,c=Object(y.b)(),i=Object(y.c)(function(e){return e.CatalogApp.pack.entities}),m=Object(y.c)(function(e){return e.CatalogApp.pack.page}),O=Object(y.c)(function(e){return e.CatalogApp.pack.loading}),E=n.a.useState(null),j=Object(r.a)(E,2),w=j[0],_=j[1];return Object(l.useEffect)(function(){c(v.Mb(!0)),c(v.ub(m))},[]),!i||O?n.a.createElement("div",{className:"flex flex-1 items-center justify-center h-full mt-32"},n.a.createElement(s.a,{color:"textSecondary",variant:"h5"},"Cargando")):w?n.a.createElement(b.a,{to:w}):n.a.createElement(o.a,{animation:"transition.fadeIn",delay:300},n.a.createElement(h.b,{className:"-striped -highlight h-full overflow-hidden pl-2",data:i,pages:m.last_page,pageSizeOptions:[m.per_page],manual:!0,columns:[{accessor:"pictureUrl",Cell:function(e){return n.a.createElement(p.a,{alt:e.original.name,src:e.value,className:"w-24 h-24"})},className:"justify-center",width:50,sortable:!1},{Header:"Categor\xeda",accessor:"category.name",filterable:!0,sortable:!1},{Header:"Nombre",accessor:"name",filterable:!0,sortable:!0},{Header:"SKU",accessor:"sku",filterable:!0,sortable:!0},{Header:"Url Amigable",accessor:"friendly_url",filterable:!0,sortable:!1},{Header:"Precio F\xedsico",accessor:"physical_price",filterable:!0,sortable:!0},{Header:"Precio Digital",accessor:"digital_price",filterable:!0,sortable:!0},{Header:"Precio Tarjeta",accessor:"card_price",filterable:!0,sortable:!0},{Header:"Habilitado",accessor:"",Cell:function(e){return n.a.createElement(s.a,null,e.value.enabled?"SI":"NO")},className:"justify-center",filterable:!1,sortable:!1,width:80},{Header:"Destacado",accessor:"",Cell:function(e){return n.a.createElement(s.a,null,e.value.featured?"SI":"NO")},className:"justify-center",filterable:!1,sortable:!1,width:180},{id:"open_pack_products",Header:"",accessor:"",Cell:function(e){return n.a.createElement(d.a,{title:"Productos"},n.a.createElement(u.a,{size:"small","aria-label":"redirect",onClick:function(){_("/catalog/packs/products/"+e.original.id)}},n.a.createElement(f.a,{color:"action",className:"text-20"},"fastfood")))},className:"justify-center",filterable:!1,sortable:!1,width:60},{id:"edit_column",Header:"",accessor:"",Cell:function(e){return n.a.createElement(d.a,{title:"Editar"},n.a.createElement(u.a,{size:"small","aria-label":"Edit",onClick:function(){t(e.value)}},n.a.createElement(f.a,{color:"action",className:"text-20"},"edit")))},className:"justify-center",filterable:!1,sortable:!1,width:60},{id:"remove_column",Header:"",accessor:"",Cell:function(e){return n.a.createElement(d.a,{title:"Eliminar"},n.a.createElement(u.a,{size:"small","aria-label":"Delete",onClick:function(){a(e.value)}},n.a.createElement(g.a,{fontSize:"small"})))},className:"justify-center",filterable:!1,sortable:!1,width:60}],defaultPageSize:0===i.length?5:i.length,noDataText:"No hay items para mostrar",loading:O,onFetchData:function(e,a){var t=e.page+1,r=x({},m);r.current_page=t,c(v.ub(r))},onFilteredChange:function(e){var a=x({},m);a.filters=e,c(v.cb(a))},onSortedChange:function(e){var a=x({},m);a.sort=e[0],c(v.cb(a))}}))},j=t(578),w=t(552),_=t(579),k=t(580),C=t(583),P=t(581),N=t(555);var D=function(e){var a=e.item,t=e.open,r=e.closeHandler,l=Object(y.b)();function o(){r()}return a?n.a.createElement(w.a,{open:t,onClose:o,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},n.a.createElement(_.a,{id:"alert-dialog-title"},"Eliminar item"),n.a.createElement(k.a,null,n.a.createElement(C.a,{id:"alert-dialog-description"},"Esta seguro de eliminar este item? La acci\xf3n no se puede deshacer y eliminar\xe1 todo el contenido asociado.")),n.a.createElement(P.a,null,n.a.createElement(N.a,{onClick:o,color:"primary"},"Cancelar"),n.a.createElement(N.a,{onClick:function(){l(v.Xb(a.id)),r()},color:"primary",autoFocus:!0},"Si, Eliminar"))):(r(),n.a.createElement("div",null))},S=t(32),I=t(499),L=t(504),W=t(484),H=t(494),z=t(544),A=t(562),F=t(3),M=t(538),R=t(559),U=t(585),T=t.n(U);function V(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);a&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),t.push.apply(t,r)}return t}function B(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?V(t,!0).forEach(function(a){Object(i.a)(e,a,t[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):V(t).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))})}return e}var J=Object(R.a)(function(e){return{root:{color:e.palette.primary.contrastText},pictureInput:{display:"none"},pictureButton:{fontSize:12,fontWeight:"bold"},pictureIcon:{marginLeft:e.spacing(1)},pictureMini:{width:"3rem",height:"3rem",overflow:"hidden",borderRadius:"3rem"}}});var K=function(e){var a=e.item,t=e.open,o=e.closeHandler,c=Object(l.useRef)(null),p=Object(y.b)(),d=Object(y.c)(function(e){return e.CatalogApp.pack.packInfo}),u=Object(y.c)(function(e){return e.CatalogApp.pack.packInfoLoading}),m=J(),g=Object(y.c)(function(e){return e.CatalogApp.pack.categories}),b=Object(S.a)(),h=Object(M.a)(b.breakpoints.down("sm")),O=n.a.useState(null),x=Object(r.a)(O,2),E=x[0],j=x[1],_=n.a.useState(""),C=Object(r.a)(_,2),D=C[0],R=C[1];Object(l.useEffect)(function(){a&&(p(v.Jb(!0)),p(v.sb(a.id)),p(v.qb()))},[a]),Object(l.useEffect)(function(){d&&(j(d),R(d.category_id))},[d]);var U=function(e){var a=e.target,t=a.name,r=a.value;"checkbox"!==e.target.type&&"radio"!==e.target.type||(r=1===E[t]?0:1),j(B({},E,Object(i.a)({},t,r)))};function V(){o()}return d&&!u&&E?n.a.createElement(w.a,{open:t,onClose:V,"aria-labelledby":"form-dialog-title",fullWidth:!0,fullScreen:h,maxWidth:"sm"},n.a.createElement(k.a,{className:"flex-col"},n.a.createElement("div",{className:Object(F.a)("flex","w-full")},n.a.createElement("div",{className:"flex-col w-full"},n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-10"},n.a.createElement(I.a,{id:"category_id",className:"w-full",native:!0,value:D,onChange:function(e){R(e.target.value),j(B({},E,Object(i.a)({},"category_id",e.target.value)))}},n.a.createElement("option",{value:"",disabled:!0},"Seleccion\xe1 una categor\xeda"),g&&g.map(function(e){return n.a.createElement("option",{key:"category_"+e.id,value:e.id},e.name)}))),n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-3"},n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0"},n.a.createElement(L.a,{margin:"dense",id:"name",name:"name",label:"Nombre",value:E&&E.name?E.name:"",type:"text",fullWidth:!0,autoFocus:!0,onChange:U})),n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0"},n.a.createElement(L.a,{margin:"dense",id:"sku",name:"sku",label:"SKU",value:E&&E.sku?E.sku:"",type:"text",fullWidth:!0,autoFocus:!0,onChange:U}))),n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-3"},n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0"},n.a.createElement(L.a,{margin:"dense",id:"friendly_url",name:"friendly_url",label:"URL Amigable",value:E&&E.friendly_url?E.friendly_url:"",type:"text",fullWidth:!0,onChange:U})),n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0"},n.a.createElement(W.a,{component:"fieldset",className:"mt-3 pt-1"},n.a.createElement(H.a,{component:"legend",className:"text-11"},"Color"),n.a.createElement(T.a,{fullWidth:!0,name:"color",defaultValue:"#000",value:E&&E.color?E.color:"",onChange:function(e){return j(B({},E,Object(i.a)({},"color",e)))}})))),n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-3"},n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0"},n.a.createElement(L.a,{margin:"dense",id:"physical_price",name:"physical_price",label:"Precio F\xedsico",value:E&&E.physical_price?E.physical_price:"",type:"number",fullWidth:!0,onChange:U})),n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0"},n.a.createElement(L.a,{margin:"dense",id:"digital_price",name:"digital_price",label:"Precio Digital",value:E&&E.digital_price?E.digital_price:"",type:"number",fullWidth:!0,onChange:U})),n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0"},n.a.createElement(L.a,{margin:"dense",id:"card_price",name:"card_price",label:"Precio con Tarjeta",value:E&&E.card_price?E.card_price:"",type:"number",fullWidth:!0,onChange:U})),n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0"},n.a.createElement(L.a,{margin:"dense",id:"discount",name:"discount",label:"Descuento",value:E&&E.discount?E.discount:"",type:"number",fullWidth:!0,onChange:U}))),n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-3"},n.a.createElement(L.a,{margin:"dense",id:"short_description",name:"short_description",label:"Descripci\xf3n Corta",value:E&&E.short_description?E.short_description:"",type:"text",fullWidth:!0,onChange:U})),n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-3"},n.a.createElement(L.a,{margin:"dense",id:"description",name:"description",label:"Descripci\xf3n Completa",value:E&&E.description?E.description:"",type:"text",fullWidth:!0,onChange:U})),n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 items-center text-center justify-center mt-3 mb-3"},n.a.createElement("div",{className:"w-auto pt-16"},n.a.createElement("input",{accept:"*",className:m.pictureInput,id:"logo-upload-input",type:"file",onChange:function(e){return function(e){e.target&&e.target.files&&e.target.files[0]&&j(B({},E,Object(i.a)({},"logo",e.target.files[0]))),c.value=null}(e)},ref:function(e){c=e}}),n.a.createElement("label",{htmlFor:"logo-upload-input"},n.a.createElement(N.a,{size:"small",component:"span",variant:"contained",color:"default",className:m.pictureButton},E&&(E.pictureUrl&&E.pictureUrl.length>0||E.logo)?"Modific\xe1 la im\xe1gen":"Sub\xed una im\xe1gen",n.a.createElement(f.a,{color:"action",className:m.pictureIcon},"cloud_upload"))))),n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-3"},n.a.createElement(z.a,{control:n.a.createElement(A.a,{onClick:function(e){e.stopPropagation()},name:"online_only",checked:!!E&&!!E.online_only,onChange:U}),label:"Solo venta Online",className:"w-full"})),n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-3"},n.a.createElement(z.a,{control:n.a.createElement(A.a,{onClick:function(e){e.stopPropagation()},name:"featured",checked:!!E&&!!E.featured,onChange:U}),label:"Destacado",className:"w-full"})),n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-3"},n.a.createElement(z.a,{control:n.a.createElement(A.a,{onClick:function(e){e.stopPropagation()},name:"available_for_sale",checked:!!E&&!!E.available_for_sale,onChange:U}),label:"Disponible para la Venta",className:"w-full"})),n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-24"},n.a.createElement(z.a,{control:n.a.createElement(A.a,{onClick:function(e){e.stopPropagation()},name:"enabled",checked:!!E&&!!E.enabled,onChange:U}),label:"Habilitado",className:"w-full"}))))),n.a.createElement(P.a,null,n.a.createElement(N.a,{onClick:V,color:"primary"},"Cerrar"),n.a.createElement(N.a,{onClick:function(){p(v.Jb(!0)),p(v.dc(E)),o()},color:"primary"},"Actualizar"))):n.a.createElement(w.a,{open:t,onClose:V,"aria-labelledby":"form-dialog-title",fullWidth:!0},n.a.createElement("div",{className:"flex flex-1 items-center justify-center h-full mt-32 mb-32"},n.a.createElement(s.a,{color:"textSecondary",variant:"h5"},"Cargando")))};function q(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);a&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),t.push.apply(t,r)}return t}function X(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?q(t,!0).forEach(function(a){Object(i.a)(e,a,t[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):q(t).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))})}return e}var Y=Object(R.a)(function(e){return{root:{color:e.palette.primary.contrastText},pictureInput:{display:"none"},pictureButton:{fontSize:12,fontWeight:"bold"},pictureIcon:{marginLeft:e.spacing(1)},pictureMini:{width:"3rem",height:"3rem",overflow:"hidden",borderRadius:"3rem"}}});var G=function(e){e.item;var a=e.open,t=e.closeHandler,o=Object(l.useRef)(null),c=Object(y.b)(),p=Object(y.c)(function(e){return e.CatalogApp.pack.packCreateLoading}),d=Y(),u=Object(y.c)(function(e){return e.CatalogApp.pack.categories}),m=Object(S.a)(),g=Object(M.a)(m.breakpoints.down("sm")),b=n.a.useState(null),h=Object(r.a)(b,2),O=h[0],x=h[1],E=n.a.useState(""),j=Object(r.a)(E,2),_=j[0],C=j[1];Object(l.useEffect)(function(){c(v.qb())},[]);var D=function(e){var a=e.target,t=a.name,r=a.value;"checkbox"!==e.target.type&&"radio"!==e.target.type||(r=O&&1===O[t]?0:1),x(X({},O,Object(i.a)({},t,r)))};function R(){t()}return p?n.a.createElement(w.a,{open:a,onClose:R,"aria-labelledby":"form-dialog-title",fullWidth:!0},n.a.createElement("div",{className:"flex flex-1 items-center justify-center h-full mt-32 mb-32"},n.a.createElement(s.a,{color:"textSecondary",variant:"h5"},"Cargando"))):n.a.createElement(w.a,{open:a,onClose:R,"aria-labelledby":"form-dialog-title",fullWidth:!0,fullScreen:g,maxWidth:"sm"},n.a.createElement(k.a,{className:"flex-col"},n.a.createElement("div",{className:Object(F.a)("flex","w-full")},n.a.createElement("div",{className:"flex-col w-full"},n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-10"},n.a.createElement(I.a,{id:"category_id",className:"w-full",native:!0,value:_,onChange:function(e){C(e.target.value),x(X({},O,Object(i.a)({},"category_id",e.target.value)))}},n.a.createElement("option",{value:"",disabled:!0},"Seleccion\xe1 una categor\xeda"),u&&u.map(function(e){return n.a.createElement("option",{key:"category_"+e.id,value:e.id},e.name)}))),n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-3"},n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0"},n.a.createElement(L.a,{margin:"dense",id:"name",name:"name",label:"Nombre",value:O&&O.name?O.name:"",type:"text",fullWidth:!0,autoFocus:!0,onChange:D})),n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0"},n.a.createElement(L.a,{margin:"dense",id:"sku",name:"sku",label:"SKU",value:O&&O.sku?O.sku:"",type:"text",fullWidth:!0,autoFocus:!0,onChange:D}))),n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-3"},n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0"},n.a.createElement(L.a,{margin:"dense",id:"friendly_url",name:"friendly_url",label:"URL Amigable",value:O&&O.friendly_url?O.friendly_url:"",type:"text",fullWidth:!0,onChange:D})),n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0"},n.a.createElement(W.a,{component:"fieldset",className:"mt-3 pt-1"},n.a.createElement(H.a,{component:"legend",className:"text-11"},"Color"),n.a.createElement(T.a,{fullWidth:!0,name:"color",defaultValue:"#000",value:O&&O.color?O.color:"",onChange:function(e){return x(X({},O,Object(i.a)({},"color",e)))}})))),n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-3"},n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0"},n.a.createElement(L.a,{margin:"dense",id:"physical_price",name:"physical_price",label:"Precio F\xedsico",value:O&&O.physical_price?O.physical_price:"",type:"number",fullWidth:!0,onChange:D})),n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0"},n.a.createElement(L.a,{margin:"dense",id:"digital_price",name:"digital_price",label:"Precio Digital",value:O&&O.digital_price?O.digital_price:"",type:"number",fullWidth:!0,onChange:D})),n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0"},n.a.createElement(L.a,{margin:"dense",id:"card_price",name:"card_price",label:"Precio con Tarjeta",value:O&&O.card_price?O.card_price:"",type:"number",fullWidth:!0,onChange:D})),n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0"},n.a.createElement(L.a,{margin:"dense",id:"discount",name:"discount",label:"Descuento",value:O&&O.discount?O.discount:"",type:"number",fullWidth:!0,onChange:D}))),n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-3"},n.a.createElement(L.a,{margin:"dense",id:"short_description",name:"short_description",label:"Descripci\xf3n Corta",value:O&&O.short_description?O.short_description:"",type:"text",fullWidth:!0,onChange:D})),n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-3"},n.a.createElement(L.a,{margin:"dense",id:"description",name:"description",label:"Descripci\xf3n Completa",value:O&&O.description?O.description:"",type:"text",fullWidth:!0,onChange:D})),n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 items-center text-center justify-center mt-3 mb-3"},n.a.createElement("div",{className:"w-auto pt-16"},n.a.createElement("input",{accept:"*",className:d.pictureInput,id:"logo-upload-input",type:"file",onChange:function(e){return function(e){e.target&&e.target.files&&e.target.files[0]&&x(X({},O,Object(i.a)({},"logo",e.target.files[0]))),o.value=null}(e)},ref:function(e){o=e}}),n.a.createElement("label",{htmlFor:"logo-upload-input"},n.a.createElement(N.a,{size:"small",component:"span",variant:"contained",color:"default",className:d.pictureButton},O&&(O.pictureUrl&&O.pictureUrl.length>0||O.logo)?"Modific\xe1 la im\xe1gen":"Sub\xed una im\xe1gen",n.a.createElement(f.a,{color:"action",className:d.pictureIcon},"cloud_upload"))))),n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-3"},n.a.createElement(z.a,{control:n.a.createElement(A.a,{onClick:function(e){e.stopPropagation()},name:"online_only",checked:!!O&&!!O.online_only,onChange:D}),label:"Solo venta Online",className:"w-full"})),n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-3"},n.a.createElement(z.a,{control:n.a.createElement(A.a,{onClick:function(e){e.stopPropagation()},name:"featured",checked:!!O&&!!O.featured,onChange:D}),label:"Destacado",className:"w-full"})),n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-3"},n.a.createElement(z.a,{control:n.a.createElement(A.a,{onClick:function(e){e.stopPropagation()},name:"available_for_sale",checked:!!O&&!!O.available_for_sale,onChange:D}),label:"Disponible para la Venta",className:"w-full"})),n.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-24"},n.a.createElement(z.a,{control:n.a.createElement(A.a,{onClick:function(e){e.stopPropagation()},name:"enabled",checked:!!O&&!!O.enabled,onChange:D}),label:"Habilitado",className:"w-full"}))))),n.a.createElement(P.a,null,n.a.createElement(N.a,{onClick:R,color:"primary"},"Cerrar"),n.a.createElement(N.a,{onClick:function(){c(v.Ib(!0)),c(v.hb(O)),t()},color:"primary"},"Crear")))};a.default=Object(c.a)("CatalogApp",j.a)(function(){var e=Object(l.useRef)(null),a=Object(l.useState)(null),t=Object(r.a)(a,2),c=t[0],i=t[1],s=Object(l.useState)(null),p=Object(r.a)(s,2),d=p[0],u=p[1],m=Object(l.useState)(null),g=Object(r.a)(m,2),b=g[0],y=g[1];return n.a.createElement(n.a.Fragment,null,n.a.createElement(o.m,{classes:{contentWrapper:"h-full",content:"flex flex-col h-full",header:"min-h-60 h-60",toolbar:"hidden"},header:n.a.createElement("div",{className:"flex flex-1 items-center justify-between p-20"},n.a.createElement("div",{className:"flex flex-col"},n.a.createElement("h4",null,"Packs")),n.a.createElement(N.a,{className:"normal-case bg-green text-white",variant:"contained",onClick:function(){return y(!0)}},n.a.createElement(f.a,{className:"mr-4"},"add_circle_outline"),"Nuevo")),content:n.a.createElement(E,{openDeleteAlertHandler:function(e){i(e)},openDetailModalHandler:function(e){u(e)}}),contentToolbar:n.a.createElement("div",null,function(){if(b)return n.a.createElement(G,{open:!!b,closeHandler:function(){y(null)}})}(),d?n.a.createElement(K,{item:d,open:!!d,closeHandler:function(){u(null)}}):null,c?n.a.createElement(D,{item:c,open:!!c,closeHandler:function(){i(null)}}):null),innerScroll:!0,sidebarInner:!0,ref:e}))})}}]);