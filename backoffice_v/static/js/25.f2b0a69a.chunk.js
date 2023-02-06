(window["webpackJsonpfuse-react-app"]=window["webpackJsonpfuse-react-app"]||[]).push([[25],{715:function(e,t,a){"use strict";a.r(t);var n=a(21),r=a(0),l=a.n(r),c=a(31),o=a(198),i=a(4),s=a(98),m=a(550),u=a(488),f=a(533),d=a(567),b=a.n(d),p=a(8),E=a(199),O=a(574);function y(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}function g(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?y(a,!0).forEach(function(t){Object(i.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):y(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}var j=function(e){var t=e.openDeleteAlertHandler,a=e.openDetailModalHandler,n=e.state_id,o=Object(p.b)(),i=Object(p.c)(function(e){return e.LocationApp.city.entities}),d=Object(p.c)(function(e){return e.LocationApp.city.page}),y=Object(p.c)(function(e){return e.LocationApp.city.loading});return Object(r.useEffect)(function(){o(O.J(!0)),o(O.D(n,d))},[n]),!i||y?l.a.createElement("div",{className:"flex flex-1 items-center justify-center h-full mt-32"},l.a.createElement(s.a,{color:"textSecondary",variant:"h5"},"Cargando")):l.a.createElement(c.a,{animation:"transition.fadeIn",delay:300},l.a.createElement(E.b,{className:"-striped -highlight h-full overflow-hidden pl-2",data:i,pages:d.last_page,pageSizeOptions:[d.per_page],manual:!0,columns:[{Header:"Pa\xeds",accessor:"state.name",filterable:!1,sortable:!1,width:200,className:"justify-center"},{Header:"Nombre",accessor:"name",filterable:!0},{Header:"Habilitado",accessor:"",Cell:function(e){return l.a.createElement(s.a,null,e.value.enabled?"SI":"NO")},className:"justify-center",filterable:!1,sortable:!1,width:80},{id:"edit_column",Header:"",accessor:"",Cell:function(e){return l.a.createElement(m.a,{title:"Editar"},l.a.createElement(u.a,{size:"small","aria-label":"Edit",onClick:function(){a(e.value)}},l.a.createElement(f.a,{color:"action",className:"text-20"},"edit")))},className:"justify-center",filterable:!1,sortable:!1,width:60},{id:"remove_column",Header:"",accessor:"",Cell:function(e){return l.a.createElement(m.a,{title:"Eliminar"},l.a.createElement(u.a,{size:"small","aria-label":"Delete",onClick:function(){t(e.value)}},l.a.createElement(b.a,{fontSize:"small"})))},className:"justify-center",filterable:!1,sortable:!1,width:60}],defaultPageSize:0===i.length?5:i.length,noDataText:"No hay items para mostrar",loading:y,onFetchData:function(e,t){var a=e.page+1,r=g({},d);r.current_page=a,o(O.D(n,r))},onFilteredChange:function(e){var t=g({},d);t.filters=e,o(O.x(t))},onSortedChange:function(e){var t=g({},d);t.sort=e[0],o(O.x(t))}}))},h=a(57),v=a(593),x=a(552),w=a(579),C=a(580),N=a(583),P=a(581),k=a(555);var S=function(e){var t=e.item,a=e.open,n=e.closeHandler,r=Object(p.b)();function c(){n()}return t?l.a.createElement(x.a,{open:a,onClose:c,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},l.a.createElement(w.a,{id:"alert-dialog-title"},"Eliminar item"),l.a.createElement(C.a,null,l.a.createElement(N.a,{id:"alert-dialog-description"},"Esta seguro de eliminar este item? La acci\xf3n no se puede deshacer y eliminar\xe1 todo el contenido asociado.")),l.a.createElement(P.a,null,l.a.createElement(k.a,{onClick:c,color:"primary"},"Cancelar"),l.a.createElement(k.a,{onClick:function(){r(O.T(t.id)),n()},color:"primary",autoFocus:!0},"Si, Eliminar"))):(n(),l.a.createElement("div",null))},D=a(32),H=a(504),_=a(544),A=a(562),L=a(3),W=a(538);function I(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}var z=function(e){var t=e.item,a=e.open,c=e.closeHandler,o=Object(p.b)(),m=Object(p.c)(function(e){return e.LocationApp.state.stateInfo}),u=Object(p.c)(function(e){return e.LocationApp.city.cityInfo}),f=Object(p.c)(function(e){return e.LocationApp.city.cityInfoLoading}),d=Object(D.a)(),b=Object(W.a)(d.breakpoints.down("sm")),E=l.a.useState(null),y=Object(n.a)(E,2),g=y[0],j=y[1];Object(r.useEffect)(function(){t&&(o(O.L(!0)),o(O.E(t.id)),o(O.H(t.state_id)))},[t]),Object(r.useEffect)(function(){u&&j(u)},[u]);var h=function(e){var t=e.target,a=t.name,n=t.value;"checkbox"!==e.target.type&&"radio"!==e.target.type||(n=1===g[a]?0:1),j(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?I(a,!0).forEach(function(t){Object(i.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):I(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}({},g,Object(i.a)({},a,n)))};function v(){c()}return u&&m&&!f&&g?l.a.createElement(x.a,{open:a,onClose:v,"aria-labelledby":"form-dialog-title",fullWidth:!0,fullScreen:b,maxWidth:"sm"},l.a.createElement(w.a,{id:"form-dialog-title"},"Editar una ciudad de ",m.name),l.a.createElement(C.a,{className:"flex-col"},l.a.createElement("div",{className:Object(L.a)("flex","w-full")},l.a.createElement("div",{className:"flex-col w-full"},l.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mb-3"},l.a.createElement(H.a,{margin:"dense",id:"name",name:"name",label:"Nombre",value:g&&g.name?g.name:"",type:"text",fullWidth:!0,onChange:h,className:"mr-5"})),l.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mb-3"},l.a.createElement(_.a,{control:l.a.createElement(A.a,{onClick:function(e){e.stopPropagation()},name:"enabled",checked:!!g.enabled,onChange:h}),label:"Habilitado",className:"w-full"}))))),l.a.createElement(P.a,null,l.a.createElement(k.a,{onClick:v,color:"primary"},"Cerrar"),l.a.createElement(k.a,{onClick:function(){o(O.L(!0)),o(O.U(g)),c()},color:"primary"},"Actualizar"))):l.a.createElement(x.a,{open:a,onClose:v,"aria-labelledby":"form-dialog-title",fullWidth:!0},l.a.createElement("div",{className:"flex flex-1 items-center justify-center h-full mt-32 mb-32"},l.a.createElement(s.a,{color:"textSecondary",variant:"h5"},"Cargando")))};function F(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,n)}return a}var J=function(e){var t=e.state_id,a=e.open,c=e.closeHandler,o=Object(p.b)(),m=Object(p.c)(function(e){return e.LocationApp.state.stateInfo}),u=Object(p.c)(function(e){return e.LocationApp.city.cityCreateLoading}),f=Object(D.a)(),d=Object(W.a)(f.breakpoints.down("sm")),b=l.a.useState({state_id:t}),E=Object(n.a)(b,2),y=E[0],g=E[1];Object(r.useEffect)(function(){t&&o(O.H(t))},[t]);var j=function(e){var t=e.target,a=t.name,n=t.value;"checkbox"!==e.target.type&&"radio"!==e.target.type||(n=y&&1===y[a]?0:1),g(function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?F(a,!0).forEach(function(t){Object(i.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):F(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}({},y,Object(i.a)({},a,n)))};function h(){c()}return!m||u?l.a.createElement(x.a,{open:a,onClose:h,"aria-labelledby":"form-dialog-title",fullWidth:!0},l.a.createElement("div",{className:"flex flex-1 items-center justify-center h-full mt-32 mb-32"},l.a.createElement(s.a,{color:"textSecondary",variant:"h5"},"Cargando"))):l.a.createElement(x.a,{open:a,onClose:h,"aria-labelledby":"form-dialog-title",fullWidth:!0,fullScreen:d,maxWidth:"sm"},l.a.createElement(w.a,{id:"form-dialog-title"},"Agreg\xe1 una ciudad a ",m.name),l.a.createElement(C.a,{className:"flex-col"},l.a.createElement("div",{className:Object(L.a)("flex","w-full")},l.a.createElement("div",{className:"flex-col w-full"},l.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mb-3"},l.a.createElement(H.a,{margin:"dense",id:"name",name:"name",label:"Nombre",value:y&&y.name?y.name:"",type:"text",fullWidth:!0,onChange:j})),l.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mb-3"},l.a.createElement(_.a,{control:l.a.createElement(A.a,{onClick:function(e){e.stopPropagation()},name:"enabled",checked:!!y&&!!y.enabled,onChange:j}),label:"Habilitado",className:"w-full"}))))),l.a.createElement(P.a,null,l.a.createElement(k.a,{onClick:h,color:"primary"},"Cerrar"),l.a.createElement(k.a,{onClick:function(){o(O.K(!0)),o(O.A(y)),c()},color:"primary"},"Crear")))};t.default=Object(o.a)("LocationApp",v.a)(function(e){var t=Object(r.useRef)(null),a=Object(r.useState)(null),o=Object(n.a)(a,2),i=o[0],s=o[1],m=Object(r.useState)(null),u=Object(n.a)(m,2),d=u[0],b=u[1],p=Object(r.useState)(null),E=Object(n.a)(p,2),O=E[0],y=E[1],g=l.a.useState(null),v=Object(n.a)(g,2),x=v[0],w=v[1],C=e.match.params.country_id,N=e.match.params.state_id;return x?l.a.createElement(h.a,{to:x}):l.a.createElement(l.a.Fragment,null,l.a.createElement(c.m,{classes:{contentWrapper:"h-full",content:"flex flex-col h-full",header:"min-h-60 h-60",toolbar:"hidden"},header:l.a.createElement("div",{className:"flex flex-1 items-center justify-between p-20"},l.a.createElement("div",{className:"flex flex-col"},l.a.createElement("h4",null,"Ciudades")),l.a.createElement("div",null,l.a.createElement(k.a,{className:"normal-case bg-blue-300 text-white mr-2",variant:"contained",onClick:function(){w("/location/states/"+C)}},l.a.createElement(f.a,{className:"mr-4"},"arrow_left"),"Volver"),l.a.createElement(k.a,{className:"normal-case bg-green text-white",variant:"contained",onClick:function(){return y(!0)}},l.a.createElement(f.a,{className:"mr-4"},"add_circle_outline"),"Nueva"))),content:l.a.createElement(j,{state_id:N,openDeleteAlertHandler:function(e){s(e)},openDetailModalHandler:function(e){b(e)}}),contentToolbar:l.a.createElement("div",null,function(){if(O)return l.a.createElement(J,{state_id:N,open:!!O,closeHandler:function(){y(null)}})}(),d?l.a.createElement(z,{item:d,open:!!d,closeHandler:function(){b(null)}}):null,i?l.a.createElement(S,{item:i,open:!!i,closeHandler:function(){s(null)}}):null),innerScroll:!0,sidebarInner:!0,ref:t}))})}}]);