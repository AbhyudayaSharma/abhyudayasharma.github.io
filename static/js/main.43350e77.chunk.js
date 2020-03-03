(this["webpackJsonpabhyudayasharma.github.io"]=this["webpackJsonpabhyudayasharma.github.io"]||[]).push([[0],{14:function(e){e.exports=JSON.parse('{"name":"abhyudayasharma.github.io","version":"0.1.0","private":true,"homepage":"https://abhyudaya.dev","license":"MIT","description":"Abhyudaya Sharma\'s Personal Website","markdown":"github","dependencies":{"react":"^16.13.0","react-dom":"^16.12.0","react-router-dom":"^5.1.2","react-scripts":"^3.4.0"},"scripts":{"start":"react-scripts start","build":"react-scripts build","test":"react-scripts test","eject":"react-scripts eject","lint":"eslint src/**/*.js src/**/*.jsx .eslintrc.js src/**/*.tsx src/**/*.ts"},"eslintConfig":{"extends":"react-app"},"browserslist":{"production":[">0.2%","not dead","not op_mini all"],"development":["last 1 chrome version","last 1 firefox version","last 1 safari version"]},"devDependencies":{"@types/jest":"^25.1.3","@types/node":"^13.7.7","@types/react":"^16.9.19","@types/react-dom":"^16.9.5","@types/react-router-dom":"^5.1.3","@typescript-eslint/eslint-plugin":"^2.19.2","@typescript-eslint/parser":"^2.22.0","babel-plugin-macros":"^2.8.0","eslint":"^6.8.0","eslint-config-standard":"^14.1.0","eslint-plugin-import":"^2.20.1","eslint-plugin-node":"^11.0.0","eslint-plugin-promise":"^4.2.1","eslint-plugin-react":"^7.18.3","eslint-plugin-standard":"^4.0.1","react-git-info":"1.0.0","react-markdown":"^4.3.1","sass":"^1.26.2","typescript":"^3.7.5"},"repository":{"type":"git","url":"https://github.com/AbhyudayaSharma/abhyudayasharma.github.io"},"author":{"name":"Abhyudaya Sharma","email":"sharmaabhyudaya@gmail.com","url":"https://abhyudaya.dev"}}')},144:function(e,t,a){},145:function(e,t,a){},146:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(41),l=a.n(c);a(51),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var o=a(2),s=a(3),i=a(5),u=a(4),m=a(6),h=a(9),d=a(13),p=(a(52),function(e){function t(){return Object(o.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e={draggable:!1,onDragStart:function(e){return e.preventDefault()},className:"BigButton"};return this.props.url.startsWith("/")?r.a.createElement(h.b,Object.assign({},e,{to:this.props.url}),this.props.text):r.a.createElement("a",Object.assign({},e,{href:this.props.url}),this.props.text)}}]),t}(n.Component)),b=a(14),f=(a(58),{branch:"",commit:{date:"2020-03-03T09:35:01+05:30",message:"Merge pull request #59 from AbhyudayaSharma/dependabot/npm_and_yarn/types/node-13.7.7\n\nBump @types/node from 13.7.1 to 13.7.7",hash:"059cb58966d4637a691d2d3c8948152ee90cbbd6",shortHash:"059cb58"}}),g=function(e){function t(){return Object(o.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"Footer"},r.a.createElement("p",null,"This page was built and deployed from the commit\xa0",r.a.createElement("a",{href:"".concat(b.repository.url,"/commit/").concat(f.commit.hash),className:"Footer-link"},r.a.createElement("code",null,f.commit.shortHash)),r.a.createElement("br",null),"Fork this repository on\xa0",r.a.createElement("a",{href:b.repository.url,className:"Footer-link"},"GitHub")))}}]),t}(n.Component),y=(a(59),a(60),[{text:"Blog",url:"/blog"},{text:"GitHub",url:"https://github.com/AbhyudayaSharma"},{text:"LinkedIn",url:"https://www.linkedin.com/in/abhyudaya-sharma/"}]),E=function(e){function t(){return Object(o.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=y.map((function(e,t){return r.a.createElement(p,Object.assign({key:t},e))}));return r.a.createElement("div",{className:"Home"},r.a.createElement("div",{className:"Home-header"},r.a.createElement("h1",{className:"Home-h1"},b.author.name)),r.a.createElement("div",{className:"Home-body"},e),r.a.createElement("div",{className:"Home-footer unselectable"},r.a.createElement(g,null)))}}]),t}(n.Component),v=a(18),j=a.n(v),O=a(21),k=(a(62),function(e){function t(){return Object(o.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"Header"},r.a.createElement("div",{className:"Header-title"},r.a.createElement("h1",{className:"Header-h1"},r.a.createElement(h.c,{to:"/",activeClassName:"Header-link-hover"},b.author.name))),r.a.createElement("div",{className:"Header-links"},r.a.createElement("h2",{className:"Header-h2"},r.a.createElement(h.c,{exact:!0,to:"/",activeClassName:"Header-link-selected"},"Home")),r.a.createElement("h2",{className:"Header-h2"},r.a.createElement(h.c,{exact:!0,to:"/blog",activeClassName:"Header-link-selected"},"Blog")),r.a.createElement("h2",{className:"Header-h2"},r.a.createElement(h.c,{exact:!0,to:"/about",activeClassName:"Header-link-selected"},"About Me"))))}}]),t}(n.Component)),x=a(45),N=[{date:new Date(2020,1,7,12,45,0,0),title:"Hello World",path:"2020/hello-world",description:"This my first blog. Hello world!\ud83d\udc4b",tags:["hello","world","hello-world"]}],w=function(){function e(){Object(o.a)(this,e)}return Object(s.a)(e,null,[{key:"getBlogs",value:function(){var e=Object(O.a)(j.a.mark((function e(){var t,n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=N.map((function(e){return a(63)("./".concat(e.path,".md"))})),e.next=3,Promise.all(t);case 3:return n=e.sent,e.abrupt("return",N.map((function(e,t){return Object(x.a)({},e,{url:n[t].default})})));case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()}]),e}(),B=(a(64),a(44)),H=a.n(B),S=(a(40),{heading:function(e){return r.a.createElement("h1",{className:"md-h1"},e.children)},code:function(e){return console.log(e),r.a.createElement("pre",{className:"md-code"},r.a.createElement("code",null,e.value))}}),C=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).state={blog:void 0,doRedirect:!1},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"getMarkdown",value:function(){return this.state.blog?r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("p",{className:"Blog-date"},this.state.blog.date.toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}))),r.a.createElement("div",null,r.a.createElement(H.a,{source:this.state.blog.text,renderers:S}))):this.state.doRedirect?r.a.createElement(d.a,{to:"/404"}):null}},{key:"render",value:function(){return r.a.createElement("div",{className:"Blog"},r.a.createElement(k,null),r.a.createElement("div",{className:"Blog-text"},r.a.createElement("div",null," ",this.getMarkdown())),r.a.createElement(g,null))}},{key:"componentDidUpdate",value:function(e){e.match.params.path!==this.props.match.params.path&&this.updateBlog()}},{key:"componentDidMount",value:function(){this.updateBlog()}},{key:"updateBlog",value:function(){var e=Object(O.a)(j.a.mark((function e(){var t,a,n,r,c,l,o,s;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w.getBlogs();case 2:t=e.sent,a=this.props.match.params,n=!0,r=!1,c=void 0,e.prev=7,l=t[Symbol.iterator]();case 9:if(n=(o=l.next()).done){e.next=22;break}if((s=o.value).path!=="".concat(a.year,"/").concat(a.path)){e.next=19;break}return e.next=14,fetch(s.url);case 14:return e.next=16,e.sent.text();case 16:return s.text=e.sent,this.setState({blog:s,doRedirect:!1}),e.abrupt("return");case 19:n=!0,e.next=9;break;case 22:e.next=28;break;case 24:e.prev=24,e.t0=e.catch(7),r=!0,c=e.t0;case 28:e.prev=28,e.prev=29,n||null==l.return||l.return();case 31:if(e.prev=31,!r){e.next=34;break}throw c;case 34:return e.finish(31);case 35:return e.finish(28);case 36:this.setState({blog:void 0,doRedirect:!0});case 37:case"end":return e.stop()}}),e,this,[[7,24,28,36],[29,,31,35]])})));return function(){return e.apply(this,arguments)}}()}]),t}(n.Component),L=Object(d.g)(C),D=(a(144),{weekday:"long",year:"numeric",month:"long",day:"numeric"}),A=function(e){function t(){return Object(o.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"BlogListEntry"},r.a.createElement("div",{className:"BlogListEntry-content"},r.a.createElement("h1",{className:"BlogListEntry-h1"},r.a.createElement(h.b,{to:"/blog/".concat(this.props.path)},this.props.title)),r.a.createElement("div",{className:"BlogListEntry-date"},r.a.createElement("span",{role:"img","aria-label":"date"},"\ud83d\udcc5"),"\xa0",this.props.date.toLocaleDateString("en-US",D)),r.a.createElement("div",{className:"BlogListEntry-tag-container"},this.props.tags.map((function(e,t){return r.a.createElement("div",{className:"BlogListEntry-tag",key:t},e)}))),r.a.createElement("p",null,this.props.description)))}}]),t}(n.Component),M=(a(145),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).state={blogs:[]},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;w.getBlogs().then((function(t){e.setState({blogs:t})}))}},{key:"render",value:function(){return r.a.createElement("div",{className:"BlogList"},r.a.createElement(k,null),r.a.createElement("div",{className:"BlogList-content"},this.state.blogs.map((function(e,t){return r.a.createElement(A,Object.assign({},e,{key:t}))}))),r.a.createElement("div",{className:"BlogList-footer"},r.a.createElement(g,null)))}}]),t}(n.Component)),T=function(){return r.a.createElement("div",{style:{width:"100%",textAlign:"center",display:"flex",flexDirection:"column",justifyContent:"center",height:"100%"}},r.a.createElement("span",{role:"img","aria-label":"under construction",style:{fontSize:"8rem",textAlign:"center",width:"100%"}},"\ud83d\udea7"),r.a.createElement("p",{style:{fontSize:"6rem",color:"white"}},"This page is under construction"))},W=function(e){function t(){return Object(o.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement(h.a,null,r.a.createElement(d.d,null,r.a.createElement(d.b,{exact:!0,path:"/"},r.a.createElement(E,null)),r.a.createElement(d.b,{exact:!0,path:"/blog"},r.a.createElement(M,null)),r.a.createElement(d.b,{exact:!0,path:"/blog/:year/:path"},r.a.createElement(L,null)),r.a.createElement(d.b,{exact:!0,path:"/about"},r.a.createElement(T,null)),r.a.createElement(d.b,{exact:!0,path:"/404"},r.a.createElement(k,null),r.a.createElement("h1",{style:{color:"#fff",textAlign:"center",fontWeight:100,fontSize:"4rem"}},"404",r.a.createElement("br",null),"Page not found")),r.a.createElement(d.b,{path:"*"},r.a.createElement(d.a,{to:"/404"}))))}}]),t}(n.Component);l.a.render(r.a.createElement(W,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},40:function(e,t,a){},46:function(e,t,a){e.exports=a(146)},51:function(e,t,a){},52:function(e,t,a){},58:function(e,t,a){},59:function(e,t,a){},60:function(e,t,a){},62:function(e,t,a){},63:function(e,t,a){var n={"./2020/hello-world.md":[147,3]};function r(e){if(!a.o(n,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=n[e],r=t[0];return a.e(t[1]).then((function(){return a.t(r,7)}))}r.keys=function(){return Object.keys(n)},r.id=63,e.exports=r},64:function(e,t,a){}},[[46,1,2]]]);
//# sourceMappingURL=main.43350e77.chunk.js.map