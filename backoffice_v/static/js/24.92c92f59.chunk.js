(window["webpackJsonpfuse-react-app"]=window["webpackJsonpfuse-react-app"]||[]).push([[24],{503:function(e,a,t){"use strict";var n=t(1),l=t(6),r=t(0),c=t.n(r),o=(t(2),t(3)),i=t(7),s=c.a.forwardRef(function(e,a){var t=e.alt,r=e.children,i=e.childrenClassName,s=e.classes,m=e.className,u=e.component,f=void 0===u?"div":u,d=e.imgProps,b=e.sizes,p=e.src,x=e.srcSet,h=Object(l.a)(e,["alt","children","childrenClassName","classes","className","component","imgProps","sizes","src","srcSet"]),g=null,_=p||x;return g=_?c.a.createElement("img",Object(n.a)({alt:t,src:p,srcSet:x,sizes:b,className:s.img},d)):i&&c.a.isValidElement(r)?c.a.cloneElement(r,{className:Object(o.a)(i,r.props.className)}):r,c.a.createElement(f,Object(n.a)({className:Object(o.a)(s.root,s.system,m,!_&&s.colorDefault),ref:a},h),g)});a.a=Object(i.a)(function(e){return{root:{position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(20),borderRadius:"50%",overflow:"hidden",userSelect:"none"},colorDefault:{color:e.palette.background.default,backgroundColor:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[600]},img:{width:"100%",height:"100%",textAlign:"center",objectFit:"cover"}}},{name:"MuiAvatar"})(s)},722:function(e,a,t){"use strict";t.r(a);var n=t(21),l=t(0),r=t.n(l),c=t(31),o=t(198),i=t(4),s=t(98),m=t(503),u=t(550),f=t(488),d=t(533),b=t(567),p=t.n(b),x=t(57),h=t(8),g=t(199),_=t(573);function E(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),t.push.apply(t,n)}return t}function v(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?E(t,!0).forEach(function(a){Object(i.a)(e,a,t[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):E(t).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))})}return e}var y=function(e){var a=e.openDeleteAlertHandler,t=e.openDetailModalHandler,o=Object(h.b)(),i=Object(h.c)(function(e){return e.ProviderApp.provider.entities}),b=Object(h.c)(function(e){return e.ProviderApp.provider.page}),E=Object(h.c)(function(e){return e.ProviderApp.provider.loading}),y=r.a.useState(null),k=Object(n.a)(y,2),O=k[0],N=k[1];return Object(l.useEffect)(function(){o(_.P(!0)),o(_.H(b))},[]),!i||E?r.a.createElement("div",{className:"flex flex-1 items-center justify-center h-full mt-32"},r.a.createElement(s.a,{color:"textSecondary",variant:"h5"},"Cargando")):O?r.a.createElement(x.a,{to:O}):r.a.createElement(c.a,{animation:"transition.fadeIn",delay:300},r.a.createElement(g.b,{className:"-striped -highlight h-full overflow-hidden pl-2",data:i,pages:b.last_page,pageSizeOptions:[b.per_page],manual:!0,columns:[{accessor:"logoUrl",Cell:function(e){return r.a.createElement(m.a,{alt:e.original.name,src:e.value,className:"w-24 h-24"})},className:"justify-center",width:50,sortable:!1},{Header:"Nombre",accessor:"name",filterable:!0,sortable:!0,width:250},{Header:"Nombre de Contacto",accessor:"internal_contact_name",filterable:!0,sortable:!0},{Header:"Email de Contacto",accessor:"internal_contact_email",filterable:!0,sortable:!0},{Header:"Tel\xe9fono de Contacto",accessor:"internal_contact_phone",filterable:!0,sortable:!0},{Header:"Habilitado",accessor:"",Cell:function(e){return r.a.createElement(s.a,null,e.value.enabled?"SI":"NO")},className:"justify-center",filterable:!1,sortable:!1,width:80},{id:"users",Header:"",accessor:"",Cell:function(e){return r.a.createElement(u.a,{title:"Usuarios"},r.a.createElement(f.a,{size:"small","aria-label":"redirect",onClick:function(){N("/service-provider/users/"+e.original.id)}},r.a.createElement(d.a,{color:"action",className:"text-20"},"supervised_user_circle")))},className:"justify-center",filterable:!1,sortable:!1,width:60},{id:"open_addresses",Header:"",accessor:"",Cell:function(e){return r.a.createElement(u.a,{title:"Direcciones"},r.a.createElement(f.a,{size:"small","aria-label":"redirect",onClick:function(){N("/service-provider/addresses/"+e.original.id)}},r.a.createElement(d.a,{color:"action",className:"text-20"},"pin_drop")))},className:"justify-center",filterable:!1,sortable:!1,width:60},{id:"edit_column",Header:"",accessor:"",Cell:function(e){return r.a.createElement(u.a,{title:"Editar"},r.a.createElement(f.a,{size:"small","aria-label":"Edit",onClick:function(){t(e.value)}},r.a.createElement(d.a,{color:"action",className:"text-20"},"edit")))},className:"justify-center",filterable:!1,sortable:!1,width:60},{id:"remove_column",Header:"",accessor:"",Cell:function(e){return r.a.createElement(u.a,{title:"Eliminar"},r.a.createElement(f.a,{size:"small","aria-label":"Delete",onClick:function(){a(e.value)}},r.a.createElement(p.a,{fontSize:"small"})))},className:"justify-center",filterable:!1,sortable:!1,width:60}],defaultPageSize:0===i.length?5:i.length,noDataText:"No hay items para mostrar",loading:E,onFetchData:function(e,a){var t=e.page+1,n=v({},b);n.current_page=t,o(_.H(n))},onFilteredChange:function(e){var a=v({},b);a.filters=e,o(_.x(a))},onSortedChange:function(e){var a=v({},b);a.sort=e[0],o(_.x(a))}}))},k=t(596),O=t(552),N=t(579),j=t(580),w=t(583),C=t(581),P=t(555);var W=function(e){var a=e.item,t=e.open,n=e.closeHandler,l=Object(h.b)();function c(){n()}return a?r.a.createElement(O.a,{open:t,onClose:c,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},r.a.createElement(N.a,{id:"alert-dialog-title"},"Eliminar item"),r.a.createElement(j.a,null,r.a.createElement(w.a,{id:"alert-dialog-description"},"Esta seguro de eliminar este item? La acci\xf3n no se puede deshacer y eliminar\xe1 todo el contenido asociado.")),r.a.createElement(C.a,null,r.a.createElement(P.a,{onClick:c,color:"primary"},"Cancelar"),r.a.createElement(P.a,{onClick:function(){l(_.T(a.id)),n()},color:"primary",autoFocus:!0},"Si, Eliminar"))):(n(),r.a.createElement("div",null))},S=t(32),D=t(504),I=t(544),H=t(562),z=t(3),T=t(538),U=t(559);function A(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),t.push.apply(t,n)}return t}function R(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?A(t,!0).forEach(function(a){Object(i.a)(e,a,t[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):A(t).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))})}return e}var F=Object(U.a)(function(e){return{root:{color:e.palette.primary.contrastText},logoInput:{display:"none"},logoButton:{fontSize:12,fontWeight:"bold"},logoIcon:{marginLeft:e.spacing(1)},logoMini:{width:"3rem",height:"3rem",overflow:"hidden",borderRadius:"3rem"}}});var L=function(e){var a=e.item,t=e.open,c=e.closeHandler,o=Object(l.useRef)(null),m=Object(h.b)(),u=Object(h.c)(function(e){return e.ProviderApp.provider.providerInfo}),f=Object(h.c)(function(e){return e.ProviderApp.provider.providerInfoLoading}),b=F(),p=Object(S.a)(),x=Object(T.a)(p.breakpoints.down("sm")),g=r.a.useState(null),E=Object(n.a)(g,2),v=E[0],y=E[1];Object(l.useEffect)(function(){a&&(m(_.O(!0)),m(_.G(a.id)))},[a]),Object(l.useEffect)(function(){u&&y(u)},[u]);var k=function(e){var a=e.target,t=a.name,n=a.value;"checkbox"!==e.target.type&&"radio"!==e.target.type||(n=1===v[t]?0:1),y(R({},v,Object(i.a)({},t,n)))};function N(){c()}return u&&!f&&v?r.a.createElement(O.a,{open:t,onClose:N,"aria-labelledby":"form-dialog-title",fullWidth:!0,fullScreen:x,maxWidth:"sm"},r.a.createElement(j.a,{className:"flex-col"},r.a.createElement("div",{className:Object(z.a)("flex","w-full")},r.a.createElement("div",{className:"flex-col w-full"},r.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-3"},r.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0"},r.a.createElement(D.a,{margin:"dense",id:"name",name:"name",label:"Nombre",value:v&&v.name?v.name:"",type:"text",fullWidth:!0,onChange:k})),r.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 items-center text-center justify-center"},r.a.createElement("div",{className:"w-auto pt-16"},r.a.createElement("input",{accept:"*",className:b.logoInput,id:"logo-upload-input",type:"file",onChange:function(e){return function(e){e.target&&e.target.files&&e.target.files[0]&&y(R({},v,Object(i.a)({},"logo",e.target.files[0]))),o.value=null}(e)},ref:function(e){o=e}}),r.a.createElement("label",{htmlFor:"logo-upload-input"},r.a.createElement(P.a,{size:"small",component:"span",variant:"contained",color:"default",className:b.logoButton},v&&(v.logoUrl&&v.logoUrl.length>0||v.logo)?"Modific\xe1 el logo":"Sub\xed el logo",r.a.createElement(d.a,{color:"action",className:b.logoIcon},"cloud_upload")))))),r.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-3"},r.a.createElement(D.a,{margin:"dense",id:"description",name:"slug",label:"Descripci\xf3n",value:v&&v.slug?v.slug:"",type:"text",fullWidth:!0,onChange:k})),r.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-3"},r.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0"},r.a.createElement(D.a,{margin:"dense",id:"internal_contact_name",name:"internal_contact_name",label:"Persona de contacto",value:v&&v.internal_contact_name?v.internal_contact_name:"",type:"text",fullWidth:!0,onChange:k}),r.a.createElement(D.a,{margin:"dense",id:"internal_contact_address",name:"internal_contact_address",label:"Direcci\xf3n contacto",value:v&&v.internal_contact_address?v.internal_contact_address:"",type:"text",fullWidth:!0,onChange:k}))),r.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-3"},r.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0"},r.a.createElement(D.a,{margin:"dense",id:"internal_contact_phone",name:"internal_contact_phone",label:"Tel\xe9fono de contacto",value:v&&v.internal_contact_phone?v.internal_contact_phone:"",type:"text",fullWidth:!0,onChange:k}),r.a.createElement(D.a,{margin:"dense",id:"internal_contact_email",name:"internal_contact_email",label:"Email contacto",value:v&&v.internal_contact_email?v.internal_contact_email:"",type:"text",fullWidth:!0,onChange:k}))),r.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-3"},r.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0"},r.a.createElement(D.a,{margin:"dense",id:"social_name",name:"social_name",label:"Raz\xf3n Social",value:v&&v.social_name?v.social_name:"",type:"text",fullWidth:!0,onChange:k}),r.a.createElement(D.a,{margin:"dense",id:"social_number",name:"social_number",label:"CUIT/CUIL/DNI",value:v&&v.social_number?v.social_number:"",type:"text",fullWidth:!0,onChange:k}))),r.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-3"},r.a.createElement(D.a,{margin:"dense",id:"bank_name",name:"bank_name",label:"Nombre del Banco",value:v&&v.bank_name?v.bank_name:"",type:"text",fullWidth:!0,onChange:k})),r.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-3"},r.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0"},r.a.createElement(D.a,{margin:"dense",id:"bank_account_social_number",name:"bank_account_social_number",label:"CUIT/CUIL/DNI del Titular",value:v&&v.bank_account_social_number?v.bank_account_social_number:"",type:"text",fullWidth:!0,onChange:k}),r.a.createElement(D.a,{margin:"dense",id:"bank_account_holder",name:"bank_account_holder",label:"Nombre del Titular",value:v&&v.bank_account_holder?v.bank_account_holder:"",type:"text",fullWidth:!0,onChange:k}))),r.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-3"},r.a.createElement(D.a,{margin:"dense",id:"bank_account_number",name:"bank_account_number",label:"N\xfamero de Cuenta",value:v&&v.bank_account_number?v.bank_account_number:"",type:"text",fullWidth:!0,onChange:k})),r.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-3"},r.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0"},r.a.createElement(D.a,{margin:"dense",id:"bank_account_identifier",name:"bank_account_identifier",label:"CBU",value:v&&v.bank_account_identifier?v.bank_account_identifier:"",type:"text",fullWidth:!0,onChange:k}),r.a.createElement(D.a,{margin:"dense",id:"bank_account_alias",name:"bank_account_alias",label:"Alias",value:v&&v.bank_account_alias?v.bank_account_alias:"",type:"text",fullWidth:!0,onChange:k}))),r.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-3"},r.a.createElement(I.a,{control:r.a.createElement(H.a,{onClick:function(e){e.stopPropagation()},name:"enabled",checked:!!v&&!!v.enabled,onChange:k}),label:"Habilitado",className:"w-full"}))))),r.a.createElement(C.a,null,r.a.createElement(P.a,{onClick:N,color:"primary"},"Cerrar"),r.a.createElement(P.a,{onClick:function(){m(_.O(!0)),m(_.W(v)),c()},color:"primary"},"Actualizar"))):r.a.createElement(O.a,{open:t,onClose:N,"aria-labelledby":"form-dialog-title",fullWidth:!0},r.a.createElement("div",{className:"flex flex-1 items-center justify-center h-full mt-32 mb-32"},r.a.createElement(s.a,{color:"textSecondary",variant:"h5"},"Cargando")))};function B(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),t.push.apply(t,n)}return t}function M(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?B(t,!0).forEach(function(a){Object(i.a)(e,a,t[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):B(t).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))})}return e}var J=Object(U.a)(function(e){return{root:{color:e.palette.primary.contrastText},logoInput:{display:"none"},logoButton:{fontSize:12,fontWeight:"bold"},logoIcon:{marginLeft:e.spacing(1)},logoMini:{width:"3rem",height:"3rem",overflow:"hidden",borderRadius:"3rem"}}});var G=function(e){e.item;var a=e.open,t=e.closeHandler,c=Object(l.useRef)(null),o=Object(h.b)(),m=Object(h.c)(function(e){return e.ProviderApp.provider.providerCreateLoading}),u=J(),f=Object(S.a)(),b=Object(T.a)(f.breakpoints.down("sm")),p=r.a.useState(null),x=Object(n.a)(p,2),g=x[0],E=x[1],v=function(e){var a=e.target,t=a.name,n=a.value;"checkbox"!==e.target.type&&"radio"!==e.target.type||(n=g&&1===g[t]?0:1),E(M({},g,Object(i.a)({},t,n)))};function y(){t()}return m?r.a.createElement(O.a,{open:a,onClose:y,"aria-labelledby":"form-dialog-title",fullWidth:!0},r.a.createElement("div",{className:"flex flex-1 items-center justify-center h-full mt-32 mb-32"},r.a.createElement(s.a,{color:"textSecondary",variant:"h5"},"Cargando"))):r.a.createElement(O.a,{open:a,onClose:y,"aria-labelledby":"form-dialog-title",fullWidth:!0,fullScreen:b,maxWidth:"sm"},r.a.createElement(j.a,{className:"flex-col"},r.a.createElement("div",{className:Object(z.a)("flex","w-full")},r.a.createElement("div",{className:"flex-col w-full"},r.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-3"},r.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0"},r.a.createElement(D.a,{margin:"dense",id:"name",name:"name",label:"Nombre",value:g&&g.name?g.name:"",type:"text",fullWidth:!0,onChange:v})),r.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 items-center text-center justify-center"},r.a.createElement("div",{className:"w-auto pt-16"},r.a.createElement("input",{accept:"*",className:u.logoInput,id:"logo-upload-input",type:"file",onChange:function(e){return function(e){e.target&&e.target.files&&e.target.files[0]&&E(M({},g,Object(i.a)({},"logo",e.target.files[0]))),c.value=null}(e)},ref:function(e){c=e}}),r.a.createElement("label",{htmlFor:"logo-upload-input"},r.a.createElement(P.a,{size:"small",component:"span",variant:"contained",color:"default",className:u.logoButton},g&&(g.logoUrl&&g.logoUrl.length>0||g.logo)?"Modific\xe1 el logo":"Sub\xed el logo",r.a.createElement(d.a,{color:"action",className:u.logoIcon},"cloud_upload")))))),r.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-3"},r.a.createElement(D.a,{margin:"dense",id:"description",name:"slug",label:"Descripci\xf3n",value:g&&g.slug?g.slug:"",type:"text",fullWidth:!0,onChange:v})),r.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-3"},r.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0"},r.a.createElement(D.a,{margin:"dense",id:"internal_contact_name",name:"internal_contact_name",label:"Persona de contacto",value:g&&g.internal_contact_name?g.internal_contact_name:"",type:"text",fullWidth:!0,onChange:v}),r.a.createElement(D.a,{margin:"dense",id:"internal_contact_address",name:"internal_contact_address",label:"Direcci\xf3n contacto",value:g&&g.internal_contact_address?g.internal_contact_address:"",type:"text",fullWidth:!0,onChange:v}))),r.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-3"},r.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0"},r.a.createElement(D.a,{margin:"dense",id:"internal_contact_phone",name:"internal_contact_phone",label:"Tel\xe9fono de contacto",value:g&&g.internal_contact_phone?g.internal_contact_phone:"",type:"text",fullWidth:!0,onChange:v}),r.a.createElement(D.a,{margin:"dense",id:"internal_contact_email",name:"internal_contact_email",label:"Email contacto",value:g&&g.internal_contact_email?g.internal_contact_email:"",type:"text",fullWidth:!0,onChange:v}))),r.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-3"},r.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0"},r.a.createElement(D.a,{margin:"dense",id:"social_name",name:"social_name",label:"Raz\xf3n Social",value:g&&g.social_name?g.social_name:"",type:"text",fullWidth:!0,onChange:v}),r.a.createElement(D.a,{margin:"dense",id:"social_number",name:"social_number",label:"CUIT/CUIL/DNI",value:g&&g.social_number?g.social_number:"",type:"text",fullWidth:!0,onChange:v}))),r.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-3"},r.a.createElement(D.a,{margin:"dense",id:"bank_name",name:"bank_name",label:"Nombre del Banco",value:g&&g.bank_name?g.bank_name:"",type:"text",fullWidth:!0,onChange:v})),r.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-3"},r.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0"},r.a.createElement(D.a,{margin:"dense",id:"bank_account_social_number",name:"bank_account_social_number",label:"CUIT/CUIL/DNI del Titular",value:g&&g.bank_account_social_number?g.bank_account_social_number:"",type:"text",fullWidth:!0,onChange:v}),r.a.createElement(D.a,{margin:"dense",id:"bank_account_holder",name:"bank_account_holder",label:"Nombre del Titular",value:g&&g.bank_account_holder?g.bank_account_holder:"",type:"text",fullWidth:!0,onChange:v}))),r.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-3"},r.a.createElement(D.a,{margin:"dense",id:"bank_account_number",name:"bank_account_number",label:"N\xfamero de Cuenta",value:g&&g.bank_account_number?g.bank_account_number:"",type:"text",fullWidth:!0,onChange:v})),r.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-3"},r.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0"},r.a.createElement(D.a,{margin:"dense",id:"bank_account_identifier",name:"bank_account_identifier",label:"CBU",value:g&&g.bank_account_identifier?g.bank_account_identifier:"",type:"text",fullWidth:!0,onChange:v}),r.a.createElement(D.a,{margin:"dense",id:"bank_account_alias",name:"bank_account_alias",label:"Alias",value:g&&g.bank_account_alias?g.bank_account_alias:"",type:"text",fullWidth:!0,onChange:v}))),r.a.createElement("div",{className:"flex flex-row flex-1 flex-shrink-0 mt-3 mb-3"},r.a.createElement(I.a,{control:r.a.createElement(H.a,{onClick:function(e){e.stopPropagation()},name:"enabled",checked:!!g&&!!g.enabled,onChange:v}),label:"Habilitado",className:"w-full"}))))),r.a.createElement(C.a,null,r.a.createElement(P.a,{onClick:y,color:"primary"},"Cerrar"),r.a.createElement(P.a,{onClick:function(){o(_.N(!0)),o(_.A(g)),t()},color:"primary"},"Crear")))};a.default=Object(o.a)("ProviderApp",k.a)(function(){var e=Object(l.useRef)(null),a=Object(l.useState)(null),t=Object(n.a)(a,2),o=t[0],i=t[1],s=Object(l.useState)(null),m=Object(n.a)(s,2),u=m[0],f=m[1],b=Object(l.useState)(null),p=Object(n.a)(b,2),x=p[0],h=p[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement(c.m,{classes:{contentWrapper:"h-full",content:"flex flex-col h-full",header:"min-h-60 h-60",toolbar:"hidden"},header:r.a.createElement("div",{className:"flex flex-1 items-center justify-between p-20"},r.a.createElement("div",{className:"flex flex-col"},r.a.createElement("h4",null,"Prestadores")),r.a.createElement(P.a,{className:"normal-case bg-green text-white",variant:"contained",onClick:function(){return h(!0)}},r.a.createElement(d.a,{className:"mr-4"},"add_circle_outline"),"Nuevo")),content:r.a.createElement(y,{openDeleteAlertHandler:function(e){i(e)},openDetailModalHandler:function(e){f(e)}}),contentToolbar:r.a.createElement("div",null,function(){if(x)return r.a.createElement(G,{open:!!x,closeHandler:function(){h(null)}})}(),u?r.a.createElement(L,{item:u,open:!!u,closeHandler:function(){f(null)}}):null,o?r.a.createElement(W,{item:o,open:!!o,closeHandler:function(){i(null)}}):null),innerScroll:!0,sidebarInner:!0,ref:e}))})}}]);