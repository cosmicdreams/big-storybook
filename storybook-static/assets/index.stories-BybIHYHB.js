const l={title:"Demo",parameters:{docs:{description:{component:"Demo Stories - CSF3 Format"}}}},t={render:()=>"<h1>Hello World</h1>"},n={render:()=>{const e=document.createElement("button");return e.type="button",e.innerText="Hello Button",e.addEventListener("click",u=>console.log(u)),e}};var o,r,s;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => '<h1>Hello World</h1>'
}`,...(s=(r=t.parameters)==null?void 0:r.docs)==null?void 0:s.source}}};var c,a,d;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => {
    const button = document.createElement('button');
    button.type = 'button';
    button.innerText = 'Hello Button';
    button.addEventListener('click', e => console.log(e));
    return button;
  }
}`,...(d=(a=n.parameters)==null?void 0:a.docs)==null?void 0:d.source}}};const i=["Heading","Button"];export{n as Button,t as Heading,i as __namedExportsOrder,l as default};
