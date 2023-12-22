"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[68],{104:(e,a,t)=>{t.d(a,{z:()=>s.Z,I:()=>o});var s=t(750),i=t(791),l=t(595),n=t(184);const r=(e,a)=>{switch(a.type){case"CHANGE":return{...e,value:a.val,isValid:(0,l.Gu)(a.val,a.validators)};case"TOUCH":return{...e,isTouched:!0};default:return e}},o=e=>{const[a,t]=(0,i.useReducer)(r,{value:e.initialValue||"",isTouched:!1,isValid:e.initialValid||!1}),{onInput:s,id:l}=e,{value:o,isValid:d}=a;(0,i.useEffect)((()=>{s(l,o,d)}),[s,l,o,d]);const u=a=>{t({type:"CHANGE",val:a.target.value,validators:e.validators})},c=()=>{t({type:"TOUCH"})},p="input"===e.element?(0,n.jsx)("input",{id:e.id,type:e.type,placeholder:e.placeholder,onChange:u,onBlur:c,value:a.value}):(0,n.jsx)("textarea",{id:e.id,rows:e.rows||3,onChange:u,onBlur:c,value:a.value});return(0,n.jsxs)("div",{className:"form-control ".concat(!a.isValid&&a.isTouched&&"form-control--invalid"),children:[(0,n.jsx)("label",{htmlFor:e.id,children:e.label}),p,!a.isValid&&a.isTouched&&(0,n.jsx)("p",{children:e.errorText})]})}},302:(e,a,t)=>{t.d(a,{Z:()=>n});var s=t(791),i=t(104),l=t(184);const n=e=>{const[a,t]=(0,s.useState)(),[n,r]=(0,s.useState)(""),[o,d]=(0,s.useState)(!1),u=(0,s.useRef)();(0,s.useEffect)((()=>{if(!a)return;const e=new FileReader;e.onload=()=>{r(e.result)},e.readAsDataURL(a)}),[a]);return(0,l.jsxs)("div",{className:"form-control",children:[(0,l.jsx)("input",{type:"file",ref:u,style:{display:"none"},name:"",id:e.id,accept:".jpg, .png, .jpeg",onChange:a=>{let s,i=o;a.target.files&&1===a.target.files.length?(s=a.target.files[0],t(s),d(!0),i=!0):(d(!1),i=!1),e.onInput(e.id,s,i)}}),(0,l.jsxs)("div",{className:"image-upload ".concat(e.center&&"center"),children:[(0,l.jsxs)("div",{className:"image-upload__preview",children:[n&&(0,l.jsx)("img",{src:n,alt:"Preview"}),!n&&(0,l.jsx)("p",{children:"Pleace pick an image."})]}),(0,l.jsx)(i.z,{type:"button",onClick:()=>{u.current.click()},children:"PiCK IMAGE"})]}),!o&&(0,l.jsx)("p",{children:e.errorText})]})}},595:(e,a,t)=>{t.d(a,{CP:()=>o,Gu:()=>u,Ox:()=>d,hg:()=>r});const s="REQUIRE",i="MINLENGTH",l="MAXLENGTH",n="EMAIL",r=()=>({type:s}),o=e=>({type:i,val:e}),d=()=>({type:n}),u=(e,a)=>{let t=!0;for(const r of a)r.type===s&&(t=t&&e.trim().length>0),r.type===i&&(t=t&&e.trim().length>=r.val),r.type===l&&(t=t&&e.trim().length<=r.val),"MIN"===r.type&&(t=t&&+e>=r.val),"MAX"===r.type&&(t=t&&+e<=r.val),r.type===n&&(t=t&&/^\S+@\S+\.\S+$/.test(e));return t}},68:(e,a,t)=>{t.r(a),t.d(a,{default:()=>c});var s=t(791),i=t(83),l=t(104),n=t(302),r=t(595),o=t(765),d=t(108),u=t(184);const c=()=>{const[e,a]=(0,s.useState)(!0),{isLoading:t,error:c,sendRequest:p,clearError:v}=(0,o.xb)(),{login:m}=(0,s.useContext)(d.V),[h,x,g]=(0,o.cI)({email:{value:"",isValid:!1},password:{value:"",isValid:!1}},!1);return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(i.Cv,{error:c,onClear:v}),(0,u.jsxs)(i.Zb,{className:"authentication",children:[t&&(0,u.jsx)(i.TK,{asOverlay:!0}),(0,u.jsx)("h2",{children:"Login Required"}),(0,u.jsx)("hr",{}),(0,u.jsxs)("form",{onSubmit:async a=>{if(a.preventDefault(),e)try{const{userId:e,token:a}=await p("".concat("http://localhost:3030/api","/users/login"),"POST",JSON.stringify({email:h.inputs.email.value,password:h.inputs.password.value}),{"Content-Type":"application/json"});m(e,a)}catch(t){console.log(t)}else try{const e=new FormData;e.append("email",h.inputs.email.value),e.append("name",h.inputs.name.value),e.append("password",h.inputs.password.value),e.append("image",h.inputs.image.value);const{userId:a,token:t}=await p("".concat("http://localhost:3030/api","/users/signup"),"POST",e);m(a,t)}catch(t){console.log(t)}},children:[!e&&(0,u.jsx)(l.I,{element:"input",id:"name",type:"text",label:"Name",validators:[(0,r.hg)()],errorText:"Please inter a name.",onInput:x}),!e&&(0,u.jsx)(n.Z,{id:"image",center:!0,onInput:x}),(0,u.jsx)(l.I,{element:"input",id:"email",type:"email",label:"Email",validators:[(0,r.Ox)()],errorText:"Please inter a valid email.",onInput:x}),(0,u.jsx)(l.I,{element:"input",id:"password",type:"password",label:"Password",validators:[(0,r.CP)(6)],errorText:"Please inter a valid password, at least 6 characters.",onInput:x}),(0,u.jsx)(l.z,{type:"submit",disabled:!h.isValid,children:e?"LOGIN":"SIGNUP"})]}),(0,u.jsxs)(l.z,{inverse:!0,onClick:()=>{e?g({...h.inputs,name:{value:"",isValid:!1},image:{value:null,isValid:!1}},!1):g({...h.inputs,name:void 0,image:void 0},h.inputs.email.isValid&&h.inputs.password.isValid),a((e=>!e))},children:["Switch to ",e?"SIGNUP":"LOGIN"]})]})]})}}}]);
//# sourceMappingURL=68.5ce6f121.chunk.js.map