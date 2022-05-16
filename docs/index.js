(()=>{var ie={init(){document.addEventListener("submit",async s=>{if(s.target?.dataset?.dynamicForm===void 0)return;s.preventDefault();let e=s.target,t=new FormData(e),n=e.action,r=e.method;(await fetch(n,{method:r,body:t,headers:{Accept:"application/json"}})).ok?e.insertAdjacentHTML("afterend",document.querySelector(e.dataset.success).innerHTML):e.insertAdjacentHTML("afterend",document.querySelector(e.dataset.error).innerHTML);let c=e.nextElementSibling;e.reset(),setTimeout(()=>c.remove(),1e4)})}};function A(s){return Array.isArray?Array.isArray(s):fe(s)==="[object Array]"}var Se=1/0;function Ee(s){if(typeof s=="string")return s;let e=s+"";return e=="0"&&1/s==-Se?"-0":e}function we(s){return s==null?"":Ee(s)}function w(s){return typeof s=="string"}function ue(s){return typeof s=="number"}function Ae(s){return s===!0||s===!1||Le(s)&&fe(s)=="[object Boolean]"}function de(s){return typeof s=="object"}function Le(s){return de(s)&&s!==null}function m(s){return s!=null}function W(s){return!s.trim().length}function fe(s){return s==null?s===void 0?"[object Undefined]":"[object Null]":Object.prototype.toString.call(s)}var xe="Incorrect 'index' type",Ie=s=>`Invalid value for key ${s}`,be=s=>`Pattern length exceeds max of ${s}.`,Re=s=>`Missing ${s} property in key`,ke=s=>`Property 'weight' in key '${s}' must be a positive integer`,ce=Object.prototype.hasOwnProperty,B=class{constructor(e){this._keys=[],this._keyMap={};let t=0;e.forEach(n=>{let r=ge(n);t+=r.weight,this._keys.push(r),this._keyMap[r.id]=r,t+=r.weight}),this._keys.forEach(n=>{n.weight/=t})}get(e){return this._keyMap[e]}keys(){return this._keys}toJSON(){return JSON.stringify(this._keys)}};function ge(s){let e=null,t=null,n=null,r=1,i=null;if(w(s)||A(s))n=s,e=oe(s),t=U(s);else{if(!ce.call(s,"name"))throw new Error(Re("name"));let c=s.name;if(n=c,ce.call(s,"weight")&&(r=s.weight,r<=0))throw new Error(ke(c));e=oe(c),t=U(c),i=s.getFn}return{path:e,id:t,weight:r,src:n,getFn:i}}function oe(s){return A(s)?s:s.split(".")}function U(s){return A(s)?s.join("."):s}function ve(s,e){let t=[],n=!1,r=(i,c,o)=>{if(!!m(i))if(!c[o])t.push(i);else{let a=c[o],h=i[a];if(!m(h))return;if(o===c.length-1&&(w(h)||ue(h)||Ae(h)))t.push(we(h));else if(A(h)){n=!0;for(let l=0,d=h.length;l<d;l+=1)r(h[l],c,o+1)}else c.length&&r(h,c,o+1)}};return r(s,w(e)?e.split("."):e,0),n?t:t[0]}var Oe={includeMatches:!1,findAllMatches:!1,minMatchCharLength:1},$e={isCaseSensitive:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(s,e)=>s.score===e.score?s.idx<e.idx?-1:1:s.score<e.score?-1:1},Ne={location:0,threshold:.6,distance:100},Te={useExtendedSearch:!1,getFn:ve,ignoreLocation:!1,ignoreFieldNorm:!1,fieldNormWeight:1},u={...$e,...Oe,...Ne,...Te},Ce=/[^ ]+/g;function je(s=1,e=3){let t=new Map,n=Math.pow(10,e);return{get(r){let i=r.match(Ce).length;if(t.has(i))return t.get(i);let c=1/Math.pow(i,.5*s),o=parseFloat(Math.round(c*n)/n);return t.set(i,o),o},clear(){t.clear()}}}var $=class{constructor({getFn:e=u.getFn,fieldNormWeight:t=u.fieldNormWeight}={}){this.norm=je(t,3),this.getFn=e,this.isCreated=!1,this.setIndexRecords()}setSources(e=[]){this.docs=e}setIndexRecords(e=[]){this.records=e}setKeys(e=[]){this.keys=e,this._keysMap={},e.forEach((t,n)=>{this._keysMap[t.id]=n})}create(){this.isCreated||!this.docs.length||(this.isCreated=!0,w(this.docs[0])?this.docs.forEach((e,t)=>{this._addString(e,t)}):this.docs.forEach((e,t)=>{this._addObject(e,t)}),this.norm.clear())}add(e){let t=this.size();w(e)?this._addString(e,t):this._addObject(e,t)}removeAt(e){this.records.splice(e,1);for(let t=e,n=this.size();t<n;t+=1)this.records[t].i-=1}getValueForItemAtKeyId(e,t){return e[this._keysMap[t]]}size(){return this.records.length}_addString(e,t){if(!m(e)||W(e))return;let n={v:e,i:t,n:this.norm.get(e)};this.records.push(n)}_addObject(e,t){let n={i:t,$:{}};this.keys.forEach((r,i)=>{let c=r.getFn?r.getFn(e):this.getFn(e,r.path);if(!!m(c)){if(A(c)){let o=[],a=[{nestedArrIndex:-1,value:c}];for(;a.length;){let{nestedArrIndex:h,value:l}=a.pop();if(!!m(l))if(w(l)&&!W(l)){let d={v:l,i:h,n:this.norm.get(l)};o.push(d)}else A(l)&&l.forEach((d,f)=>{a.push({nestedArrIndex:f,value:d})})}n.$[i]=o}else if(!W(c)){let o={v:c,n:this.norm.get(c)};n.$[i]=o}}}),this.records.push(n)}toJSON(){return{keys:this.keys,records:this.records}}};function pe(s,e,{getFn:t=u.getFn,fieldNormWeight:n=u.fieldNormWeight}={}){let r=new $({getFn:t,fieldNormWeight:n});return r.setKeys(s.map(ge)),r.setSources(e),r.create(),r}function Fe(s,{getFn:e=u.getFn,fieldNormWeight:t=u.fieldNormWeight}={}){let{keys:n,records:r}=s,i=new $({getFn:e,fieldNormWeight:t});return i.setKeys(n),i.setIndexRecords(r),i}function C(s,{errors:e=0,currentLocation:t=0,expectedLocation:n=0,distance:r=u.distance,ignoreLocation:i=u.ignoreLocation}={}){let c=e/s.length;if(i)return c;let o=Math.abs(n-t);return r?c+o/r:o?1:c}function Pe(s=[],e=u.minMatchCharLength){let t=[],n=-1,r=-1,i=0;for(let c=s.length;i<c;i+=1){let o=s[i];o&&n===-1?n=i:!o&&n!==-1&&(r=i-1,r-n+1>=e&&t.push([n,r]),n=-1)}return s[i-1]&&i-n>=e&&t.push([n,i-1]),t}var k=32;function He(s,e,t,{location:n=u.location,distance:r=u.distance,threshold:i=u.threshold,findAllMatches:c=u.findAllMatches,minMatchCharLength:o=u.minMatchCharLength,includeMatches:a=u.includeMatches,ignoreLocation:h=u.ignoreLocation}={}){if(e.length>k)throw new Error(be(k));let l=e.length,d=s.length,f=Math.max(0,Math.min(n,d)),g=i,p=f,M=o>1||a,b=M?Array(d):[],E;for(;(E=s.indexOf(e,p))>-1;){let y=C(e,{currentLocation:E,expectedLocation:f,distance:r,ignoreLocation:h});if(g=Math.min(y,g),p=E+l,M){let x=0;for(;x<l;)b[E+x]=1,x+=1}}p=-1;let v=[],R=1,N=l+d,_e=1<<l-1;for(let y=0;y<l;y+=1){let x=0,I=N;for(;x<I;)C(e,{errors:y,currentLocation:f+I,expectedLocation:f,distance:r,ignoreLocation:h})<=g?x=I:N=I,I=Math.floor((N-x)/2+x);N=I;let ne=Math.max(1,f-I+1),K=c?d:Math.min(f+I,d)+l,O=Array(K+2);O[K+1]=(1<<y)-1;for(let _=K;_>=ne;_-=1){let T=_-1,re=t[s.charAt(T)];if(M&&(b[T]=+!!re),O[_]=(O[_+1]<<1|1)&re,y&&(O[_]|=(v[_+1]|v[_])<<1|1|v[_+1]),O[_]&_e&&(R=C(e,{errors:y,currentLocation:T,expectedLocation:f,distance:r,ignoreLocation:h}),R<=g)){if(g=R,p=T,p<=f)break;ne=Math.max(1,2*f-p)}}if(C(e,{errors:y+1,currentLocation:f,expectedLocation:f,distance:r,ignoreLocation:h})>g)break;v=O}let D={isMatch:p>=0,score:Math.max(.001,R)};if(M){let y=Pe(b,o);y.length?a&&(D.indices=y):D.isMatch=!1}return D}function De(s){let e={};for(let t=0,n=s.length;t<n;t+=1){let r=s.charAt(t);e[r]=(e[r]||0)|1<<n-t-1}return e}var j=class{constructor(e,{location:t=u.location,threshold:n=u.threshold,distance:r=u.distance,includeMatches:i=u.includeMatches,findAllMatches:c=u.findAllMatches,minMatchCharLength:o=u.minMatchCharLength,isCaseSensitive:a=u.isCaseSensitive,ignoreLocation:h=u.ignoreLocation}={}){if(this.options={location:t,threshold:n,distance:r,includeMatches:i,findAllMatches:c,minMatchCharLength:o,isCaseSensitive:a,ignoreLocation:h},this.pattern=a?e:e.toLowerCase(),this.chunks=[],!this.pattern.length)return;let l=(f,g)=>{this.chunks.push({pattern:f,alphabet:De(f),startIndex:g})},d=this.pattern.length;if(d>k){let f=0,g=d%k,p=d-g;for(;f<p;)l(this.pattern.substr(f,k),f),f+=k;if(g){let M=d-k;l(this.pattern.substr(M),M)}}else l(this.pattern,0)}searchIn(e){let{isCaseSensitive:t,includeMatches:n}=this.options;if(t||(e=e.toLowerCase()),this.pattern===e){let p={isMatch:!0,score:0};return n&&(p.indices=[[0,e.length-1]]),p}let{location:r,distance:i,threshold:c,findAllMatches:o,minMatchCharLength:a,ignoreLocation:h}=this.options,l=[],d=0,f=!1;this.chunks.forEach(({pattern:p,alphabet:M,startIndex:b})=>{let{isMatch:E,score:v,indices:R}=He(e,p,M,{location:r+b,distance:i,threshold:c,findAllMatches:o,minMatchCharLength:a,includeMatches:n,ignoreLocation:h});E&&(f=!0),d+=v,E&&R&&(l=[...l,...R])});let g={isMatch:f,score:f?d/this.chunks.length:1};return f&&n&&(g.indices=l),g}},S=class{constructor(e){this.pattern=e}static isMultiMatch(e){return ae(e,this.multiRegex)}static isSingleMatch(e){return ae(e,this.singleRegex)}search(){}};function ae(s,e){let t=s.match(e);return t?t[1]:null}var V=class extends S{constructor(e){super(e)}static get type(){return"exact"}static get multiRegex(){return/^="(.*)"$/}static get singleRegex(){return/^=(.*)$/}search(e){let t=e===this.pattern;return{isMatch:t,score:t?0:1,indices:[0,this.pattern.length-1]}}},Y=class extends S{constructor(e){super(e)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(e){let n=e.indexOf(this.pattern)===-1;return{isMatch:n,score:n?0:1,indices:[0,e.length-1]}}},G=class extends S{constructor(e){super(e)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(e){let t=e.startsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,this.pattern.length-1]}}},z=class extends S{constructor(e){super(e)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(e){let t=!e.startsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}},X=class extends S{constructor(e){super(e)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(e){let t=e.endsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[e.length-this.pattern.length,e.length-1]}}},Q=class extends S{constructor(e){super(e)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(e){let t=!e.endsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}},F=class extends S{constructor(e,{location:t=u.location,threshold:n=u.threshold,distance:r=u.distance,includeMatches:i=u.includeMatches,findAllMatches:c=u.findAllMatches,minMatchCharLength:o=u.minMatchCharLength,isCaseSensitive:a=u.isCaseSensitive,ignoreLocation:h=u.ignoreLocation}={}){super(e),this._bitapSearch=new j(e,{location:t,threshold:n,distance:r,includeMatches:i,findAllMatches:c,minMatchCharLength:o,isCaseSensitive:a,ignoreLocation:h})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(e){return this._bitapSearch.searchIn(e)}},P=class extends S{constructor(e){super(e)}static get type(){return"include"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(e){let t=0,n,r=[],i=this.pattern.length;for(;(n=e.indexOf(this.pattern,t))>-1;)t=n+i,r.push([n,t-1]);let c=!!r.length;return{isMatch:c,score:c?0:1,indices:r}}},J=[V,P,G,z,Q,X,Y,F],he=J.length,Ke=/ +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/,We="|";function Be(s,e={}){return s.split(We).map(t=>{let n=t.trim().split(Ke).filter(i=>i&&!!i.trim()),r=[];for(let i=0,c=n.length;i<c;i+=1){let o=n[i],a=!1,h=-1;for(;!a&&++h<he;){let l=J[h],d=l.isMultiMatch(o);d&&(r.push(new l(d,e)),a=!0)}if(!a)for(h=-1;++h<he;){let l=J[h],d=l.isSingleMatch(o);if(d){r.push(new l(d,e));break}}}return r})}var Ue=new Set([F.type,P.type]),Z=class{constructor(e,{isCaseSensitive:t=u.isCaseSensitive,includeMatches:n=u.includeMatches,minMatchCharLength:r=u.minMatchCharLength,ignoreLocation:i=u.ignoreLocation,findAllMatches:c=u.findAllMatches,location:o=u.location,threshold:a=u.threshold,distance:h=u.distance}={}){this.query=null,this.options={isCaseSensitive:t,includeMatches:n,minMatchCharLength:r,findAllMatches:c,ignoreLocation:i,location:o,threshold:a,distance:h},this.pattern=t?e:e.toLowerCase(),this.query=Be(this.pattern,this.options)}static condition(e,t){return t.useExtendedSearch}searchIn(e){let t=this.query;if(!t)return{isMatch:!1,score:1};let{includeMatches:n,isCaseSensitive:r}=this.options;e=r?e:e.toLowerCase();let i=0,c=[],o=0;for(let a=0,h=t.length;a<h;a+=1){let l=t[a];c.length=0,i=0;for(let d=0,f=l.length;d<f;d+=1){let g=l[d],{isMatch:p,indices:M,score:b}=g.search(e);if(p){if(i+=1,o+=b,n){let E=g.constructor.type;Ue.has(E)?c=[...c,...M]:c.push(M)}}else{o=0,i=0,c.length=0;break}}if(i){let d={isMatch:!0,score:o/i};return n&&(d.indices=c),d}}return{isMatch:!1,score:1}}},q=[];function Ve(...s){q.push(...s)}function ee(s,e){for(let t=0,n=q.length;t<n;t+=1){let r=q[t];if(r.condition(s,e))return new r(s,e)}return new j(s,e)}var H={AND:"$and",OR:"$or"},te={PATH:"$path",PATTERN:"$val"},se=s=>!!(s[H.AND]||s[H.OR]),Ye=s=>!!s[te.PATH],Ge=s=>!A(s)&&de(s)&&!se(s),le=s=>({[H.AND]:Object.keys(s).map(e=>({[e]:s[e]}))});function me(s,e,{auto:t=!0}={}){let n=r=>{let i=Object.keys(r),c=Ye(r);if(!c&&i.length>1&&!se(r))return n(le(r));if(Ge(r)){let a=c?r[te.PATH]:i[0],h=c?r[te.PATTERN]:r[a];if(!w(h))throw new Error(Ie(a));let l={keyId:U(a),pattern:h};return t&&(l.searcher=ee(h,e)),l}let o={children:[],operator:i[0]};return i.forEach(a=>{let h=r[a];A(h)&&h.forEach(l=>{o.children.push(n(l))})}),o};return se(s)||(s=le(s)),n(s)}function ze(s,{ignoreFieldNorm:e=u.ignoreFieldNorm}){s.forEach(t=>{let n=1;t.matches.forEach(({key:r,norm:i,score:c})=>{let o=r?r.weight:null;n*=Math.pow(c===0&&o?Number.EPSILON:c,(o||1)*(e?1:i))}),t.score=n})}function Xe(s,e){let t=s.matches;e.matches=[],m(t)&&t.forEach(n=>{if(!m(n.indices)||!n.indices.length)return;let{indices:r,value:i}=n,c={indices:r,value:i};n.key&&(c.key=n.key.src),n.idx>-1&&(c.refIndex=n.idx),e.matches.push(c)})}function Qe(s,e){e.score=s.score}function Je(s,e,{includeMatches:t=u.includeMatches,includeScore:n=u.includeScore}={}){let r=[];return t&&r.push(Xe),n&&r.push(Qe),s.map(i=>{let{idx:c}=i,o={item:e[c],refIndex:c};return r.length&&r.forEach(a=>{a(i,o)}),o})}var L=class{constructor(e,t={},n){this.options={...u,...t},this.options.useExtendedSearch,this._keyStore=new B(this.options.keys),this.setCollection(e,n)}setCollection(e,t){if(this._docs=e,t&&!(t instanceof $))throw new Error(xe);this._myIndex=t||pe(this.options.keys,this._docs,{getFn:this.options.getFn,fieldNormWeight:this.options.fieldNormWeight})}add(e){!m(e)||(this._docs.push(e),this._myIndex.add(e))}remove(e=()=>!1){let t=[];for(let n=0,r=this._docs.length;n<r;n+=1){let i=this._docs[n];e(i,n)&&(this.removeAt(n),n-=1,r-=1,t.push(i))}return t}removeAt(e){this._docs.splice(e,1),this._myIndex.removeAt(e)}getIndex(){return this._myIndex}search(e,{limit:t=-1}={}){let{includeMatches:n,includeScore:r,shouldSort:i,sortFn:c,ignoreFieldNorm:o}=this.options,a=w(e)?w(this._docs[0])?this._searchStringList(e):this._searchObjectList(e):this._searchLogical(e);return ze(a,{ignoreFieldNorm:o}),i&&a.sort(c),ue(t)&&t>-1&&(a=a.slice(0,t)),Je(a,this._docs,{includeMatches:n,includeScore:r})}_searchStringList(e){let t=ee(e,this.options),{records:n}=this._myIndex,r=[];return n.forEach(({v:i,i:c,n:o})=>{if(!m(i))return;let{isMatch:a,score:h,indices:l}=t.searchIn(i);a&&r.push({item:i,idx:c,matches:[{score:h,value:i,norm:o,indices:l}]})}),r}_searchLogical(e){let t=me(e,this.options),n=(o,a,h)=>{if(!o.children){let{keyId:d,searcher:f}=o,g=this._findMatches({key:this._keyStore.get(d),value:this._myIndex.getValueForItemAtKeyId(a,d),searcher:f});return g&&g.length?[{idx:h,item:a,matches:g}]:[]}let l=[];for(let d=0,f=o.children.length;d<f;d+=1){let g=o.children[d],p=n(g,a,h);if(p.length)l.push(...p);else if(o.operator===H.AND)return[]}return l},r=this._myIndex.records,i={},c=[];return r.forEach(({$:o,i:a})=>{if(m(o)){let h=n(t,o,a);h.length&&(i[a]||(i[a]={idx:a,item:o,matches:[]},c.push(i[a])),h.forEach(({matches:l})=>{i[a].matches.push(...l)}))}}),c}_searchObjectList(e){let t=ee(e,this.options),{keys:n,records:r}=this._myIndex,i=[];return r.forEach(({$:c,i:o})=>{if(!m(c))return;let a=[];n.forEach((h,l)=>{a.push(...this._findMatches({key:h,value:c[l],searcher:t}))}),a.length&&i.push({idx:o,item:c,matches:a})}),i}_findMatches({key:e,value:t,searcher:n}){if(!m(t))return[];let r=[];if(A(t))t.forEach(({v:i,i:c,n:o})=>{if(!m(i))return;let{isMatch:a,score:h,indices:l}=n.searchIn(i);a&&r.push({score:h,key:e,value:i,idx:c,norm:o,indices:l})});else{let{v:i,n:c}=t,{isMatch:o,score:a,indices:h}=n.searchIn(i);o&&r.push({score:a,key:e,value:i,norm:c,indices:h})}return r}};L.version="6.6.1";L.createIndex=pe;L.parseIndex=Fe;L.config=u;L.parseQuery=me;Ve(Z);var Me=null,Ze=5,ye={async init(){try{let s=await window.fetch("https://cloudseeder.github.io/acme-corp//index.json");if(!s.ok){this.removeSearch();return}let e=await s.json();Me=new L(e,{keys:[{name:"title",weight:20},{name:"tag",weight:5},{name:"content"}]}),document.addEventListener("input",this.showResults);let t;document.addEventListener("keyup",n=>{let r=document.querySelector("#search input");if(event.target===r)switch(event.key){case"ArrowDown":t?(t.classList.remove("selected"),t=t.nextElementSibling):t=document.querySelectorAll("#search a")[0],t&&t.classList.add("selected");break;case"ArrowUp":if(t)t.classList.remove("selected"),t=t.previousElementSibling;else{let i=document.querySelectorAll("#search a");t=i[i.length-1]}t&&t.classList.add("selected");break;case"Escape":r.blur();break;case"Enter":window.open=(t||document.querySelector("#search a"))?.click();break}})}catch{console.log("brooks error 999"),this.removeSearch()}},showResults(s){let e=document.querySelector("#search input");if(s.target!==e)return;let t=document.querySelector("#search div");if(e.value.length>0){let n=Me.search(e.value);t.innerHTML=n.slice(0,Ze).map(r=>`<a href="${r.item.url}">
          <img src="${r.item.cover||""}" width="40" height="40">
          <h3>${r.item.title}</h3>
          <span>${r.item.content.substr(0,40)}</span>
        </a>`).join("")}else t.innerHTML=""},removeSearch(){console.log("brooks 999"),document.querySelector("#search")?.remove()}};function qe(){ie.init(),ye.init()}qe();})();
