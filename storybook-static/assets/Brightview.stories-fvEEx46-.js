const c=`<div class="filterResults-bd js-filter-body vertical gridDisplay">
    <div class="filterResults-bd-row">
        <div class="filterResults-bd-row-result">
            <article about="/portfolio/agnes-scott-college" class="contextual-region" data-history-node-id="311"
                     data-quickedit-entity-id="node/311"
                     data-quickedit-entity-instance-id="0" id="node-311" role="article">
                <!-- ARTICLE -->
                <a href="/portfolio/agnes-scott-college">
                    <div class="article-image"
                         style="background-image: url(/sites/default/files/styles/portfolio_thumbcta/public/2018-01/Agnes%20Scott%20College%20Atlanta%20Georgia%20%288%29_fullwidthportfolio.jpg?itok=ogub8Nb5);"></div>
                </a>
                <div class="article-content">
                    <div class="article-content-seeMore ">
                        <a href="/portfolio/agnes-scott-college">See More</a>
                    </div>
                    <div class="node-title">
                        <a href="/portfolio/agnes-scott-college">
                            <h2 class="field-wrapper">Agnes Scott College</h2>
                        </a>
                    </div>
                    <div class="article-content-inner">


                        <!-- THEME DEBUG -->
                        <!-- THEME HOOK: 'field' -->
                        <!-- FILE NAME SUGGESTIONS:
                           * field--node--field-service--portfolio.html.twig
                           * field--node--field-service.html.twig
                           * field--node--portfolio.html.twig
                           * field--field-service.html.twig
                           * field--entity-reference.html.twig
                           x field.html.twig
                        -->
                        <!-- BEGIN OUTPUT from 'themes/custom/brightview/templates/field/field.html.twig' -->
                        <div class="field-wrapper field field-node--field-service field-name-field-service field-type-entity-reference field-label-inline clearfix"
                             data-quickedit-field-id="node/311/field_service/en/default">
                            <div class="field-label">Service</div>
                            <div class="field-items">
                                <div class="field-item">Maintenance</div>
                                <div class="field-item">Tree Care</div>
                                <div class="field-item">Water Management</div>
                            </div>
                        </div>

                        <!-- END OUTPUT from 'themes/custom/brightview/templates/field/field.html.twig' -->


                        <div class="article-content-inner-right">
                            <div class="field-wrapper field">
                                <div class="field-label">Market</div>
                                <div class="field-items">
                                    Education
                                </div>
                            </div>
                            <div class="field-wrapper field">
                                <div class="field-label">Region</div>
                                <div class="field-items">
                                    Southeast
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </div>
</div>
`,f={title:"Brightview"},t={name:"Portfolio Item teaser",render:()=>{const e=document.createElement("div");return e.innerHTML=c,e}},n={render:()=>{const e=document.createElement("button");return e.type="button",e.innerText="Hello Button",e.addEventListener("click",a=>console.log(a)),e}};var i,l,o;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  name: 'Portfolio Item teaser',
  render: () => {
    const container = document.createElement('div');
    container.innerHTML = portfolioTeaser;
    return container;
  }
}`,...(o=(l=t.parameters)==null?void 0:l.docs)==null?void 0:o.source}}};var r,d,s;n.parameters={...n.parameters,docs:{...(r=n.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: () => {
    const button = document.createElement('button');
    button.type = 'button';
    button.innerText = 'Hello Button';
    button.addEventListener('click', e => console.log(e));
    return button;
  }
}`,...(s=(d=n.parameters)==null?void 0:d.docs)==null?void 0:s.source}}};const v=["PortfolioItemTeaser","Button"];export{n as Button,t as PortfolioItemTeaser,v as __namedExportsOrder,f as default};
