"use strict";(()=>{var VC=Object.create;var Md=Object.defineProperty;var XC=Object.getOwnPropertyDescriptor;var YC=Object.getOwnPropertyNames;var JC=Object.getPrototypeOf,QC=Object.prototype.hasOwnProperty;var yg=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var H=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),ZC=(t,e)=>{for(var r in e)Md(t,r,{get:e[r],enumerable:!0})},ew=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of YC(e))!QC.call(t,i)&&i!==r&&Md(t,i,{get:()=>e[i],enumerable:!(n=XC(e,i))||n.enumerable});return t};var de=(t,e,r)=>(r=t!=null?VC(JC(t)):{},ew(e||!t||!t.__esModule?Md(r,"default",{value:t,enumerable:!0}):r,t));var Kn=H(qd=>{"use strict";Object.defineProperty(qd,"__esModule",{value:!0});var Fd;function Ud(){if(Fd===void 0)throw new Error("No runtime abstraction layer installed");return Fd}(function(t){function e(r){if(r===void 0)throw new Error("No runtime abstraction layer provided");Fd=r}t.install=e})(Ud||(Ud={}));qd.default=Ud});var Gd=H(Ta=>{"use strict";Object.defineProperty(Ta,"__esModule",{value:!0});Ta.Disposable=void 0;var tw;(function(t){function e(r){return{dispose:r}}t.create=e})(tw=Ta.Disposable||(Ta.Disposable={}))});var to=H(eo=>{"use strict";Object.defineProperty(eo,"__esModule",{value:!0});eo.Emitter=eo.Event=void 0;var rw=Kn(),nw;(function(t){let e={dispose(){}};t.None=function(){return e}})(nw=eo.Event||(eo.Event={}));var jd=class{add(e,r=null,n){this._callbacks||(this._callbacks=[],this._contexts=[]),this._callbacks.push(e),this._contexts.push(r),Array.isArray(n)&&n.push({dispose:()=>this.remove(e,r)})}remove(e,r=null){if(!this._callbacks)return;let n=!1;for(let i=0,o=this._callbacks.length;i<o;i++)if(this._callbacks[i]===e)if(this._contexts[i]===r){this._callbacks.splice(i,1),this._contexts.splice(i,1);return}else n=!0;if(n)throw new Error("When adding a listener with a context, you should remove it with the same context")}invoke(...e){if(!this._callbacks)return[];let r=[],n=this._callbacks.slice(0),i=this._contexts.slice(0);for(let o=0,s=n.length;o<s;o++)try{r.push(n[o].apply(i[o],e))}catch(a){(0,rw.default)().console.error(a)}return r}isEmpty(){return!this._callbacks||this._callbacks.length===0}dispose(){this._callbacks=void 0,this._contexts=void 0}},Wl=class t{constructor(e){this._options=e}get event(){return this._event||(this._event=(e,r,n)=>{this._callbacks||(this._callbacks=new jd),this._options&&this._options.onFirstListenerAdd&&this._callbacks.isEmpty()&&this._options.onFirstListenerAdd(this),this._callbacks.add(e,r);let i={dispose:()=>{this._callbacks&&(this._callbacks.remove(e,r),i.dispose=t._noop,this._options&&this._options.onLastListenerRemove&&this._callbacks.isEmpty()&&this._options.onLastListenerRemove(this))}};return Array.isArray(n)&&n.push(i),i}),this._event}fire(e){this._callbacks&&this._callbacks.invoke.call(this._callbacks,e)}dispose(){this._callbacks&&(this._callbacks.dispose(),this._callbacks=void 0)}};eo.Emitter=Wl;Wl._noop=function(){}});var Tg=H(Bl=>{"use strict";Object.defineProperty(Bl,"__esModule",{value:!0});Bl.AbstractMessageBuffer=void 0;var iw=13,ow=10,sw=`\r
`,Hd=class{constructor(e="utf-8"){this._encoding=e,this._chunks=[],this._totalLength=0}get encoding(){return this._encoding}append(e){let r=typeof e=="string"?this.fromString(e,this._encoding):e;this._chunks.push(r),this._totalLength+=r.byteLength}tryReadHeaders(){if(this._chunks.length===0)return;let e=0,r=0,n=0,i=0;e:for(;r<this._chunks.length;){let l=this._chunks[r];for(n=0;n<l.length;){switch(l[n]){case iw:switch(e){case 0:e=1;break;case 2:e=3;break;default:e=0}break;case ow:switch(e){case 1:e=2;break;case 3:e=4,n++;break e;default:e=0}break;default:e=0}n++}i+=l.byteLength,r++}if(e!==4)return;let o=this._read(i+n),s=new Map,a=this.toString(o,"ascii").split(sw);if(a.length<2)return s;for(let l=0;l<a.length-2;l++){let u=a[l],c=u.indexOf(":");if(c===-1)throw new Error("Message header must separate key and value using :");let f=u.substr(0,c),m=u.substr(c+1).trim();s.set(f,m)}return s}tryReadBody(e){if(!(this._totalLength<e))return this._read(e)}get numberOfBytes(){return this._totalLength}_read(e){if(e===0)return this.emptyBuffer();if(e>this._totalLength)throw new Error("Cannot read so many bytes!");if(this._chunks[0].byteLength===e){let o=this._chunks[0];return this._chunks.shift(),this._totalLength-=e,this.asNative(o)}if(this._chunks[0].byteLength>e){let o=this._chunks[0],s=this.asNative(o,e);return this._chunks[0]=o.slice(e),this._totalLength-=e,s}let r=this.allocNative(e),n=0,i=0;for(;e>0;){let o=this._chunks[i];if(o.byteLength>e){let s=o.slice(0,e);r.set(s,n),n+=e,this._chunks[i]=o.slice(e),this._totalLength-=e,e-=e}else r.set(o,n),n+=o.byteLength,this._chunks.shift(),this._totalLength-=o.byteLength,e-=o.byteLength}return r}};Bl.AbstractMessageBuffer=Hd});var xg=H(zd=>{"use strict";Object.defineProperty(zd,"__esModule",{value:!0});var vg=Kn(),Lo=Gd(),aw=to(),lw=Tg(),zl=class t extends lw.AbstractMessageBuffer{constructor(e="utf-8"){super(e),this.asciiDecoder=new TextDecoder("ascii")}emptyBuffer(){return t.emptyBuffer}fromString(e,r){return new TextEncoder().encode(e)}toString(e,r){return r==="ascii"?this.asciiDecoder.decode(e):new TextDecoder(r).decode(e)}asNative(e,r){return r===void 0?e:e.slice(0,r)}allocNative(e){return new Uint8Array(e)}};zl.emptyBuffer=new Uint8Array(0);var Kd=class{constructor(e){this.socket=e,this._onData=new aw.Emitter,this._messageListener=r=>{r.data.arrayBuffer().then(i=>{this._onData.fire(new Uint8Array(i))},()=>{(0,vg.default)().console.error("Converting blob to array buffer failed.")})},this.socket.addEventListener("message",this._messageListener)}onClose(e){return this.socket.addEventListener("close",e),Lo.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),Lo.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),Lo.Disposable.create(()=>this.socket.removeEventListener("end",e))}onData(e){return this._onData.event(e)}},Wd=class{constructor(e){this.socket=e}onClose(e){return this.socket.addEventListener("close",e),Lo.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),Lo.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),Lo.Disposable.create(()=>this.socket.removeEventListener("end",e))}write(e,r){if(typeof e=="string"){if(r!==void 0&&r!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${r}`);this.socket.send(e)}else this.socket.send(e);return Promise.resolve()}end(){this.socket.close()}},uw=new TextEncoder,Rg=Object.freeze({messageBuffer:Object.freeze({create:t=>new zl(t)}),applicationJson:Object.freeze({encoder:Object.freeze({name:"application/json",encode:(t,e)=>{if(e.charset!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${e.charset}`);return Promise.resolve(uw.encode(JSON.stringify(t,void 0,0)))}}),decoder:Object.freeze({name:"application/json",decode:(t,e)=>{if(!(t instanceof Uint8Array))throw new Error("In a Browser environments only Uint8Arrays are supported.");return Promise.resolve(JSON.parse(new TextDecoder(e.charset).decode(t)))}})}),stream:Object.freeze({asReadableStream:t=>new Kd(t),asWritableStream:t=>new Wd(t)}),console,timer:Object.freeze({setTimeout(t,e,...r){let n=setTimeout(t,e,...r);return{dispose:()=>clearTimeout(n)}},setImmediate(t,...e){let r=setTimeout(t,0,...e);return{dispose:()=>clearTimeout(r)}},setInterval(t,e,...r){let n=setInterval(t,e,...r);return{dispose:()=>clearInterval(n)}}})});function Bd(){return Rg}(function(t){function e(){vg.default.install(Rg)}t.install=e})(Bd||(Bd={}));zd.default=Bd});var Mo=H(tr=>{"use strict";Object.defineProperty(tr,"__esModule",{value:!0});tr.stringArray=tr.array=tr.func=tr.error=tr.number=tr.string=tr.boolean=void 0;function cw(t){return t===!0||t===!1}tr.boolean=cw;function Sg(t){return typeof t=="string"||t instanceof String}tr.string=Sg;function fw(t){return typeof t=="number"||t instanceof Number}tr.number=fw;function dw(t){return t instanceof Error}tr.error=dw;function pw(t){return typeof t=="function"}tr.func=pw;function bg(t){return Array.isArray(t)}tr.array=bg;function mw(t){return bg(t)&&t.every(e=>Sg(e))}tr.stringArray=mw});var yp=H(V=>{"use strict";Object.defineProperty(V,"__esModule",{value:!0});V.Message=V.NotificationType9=V.NotificationType8=V.NotificationType7=V.NotificationType6=V.NotificationType5=V.NotificationType4=V.NotificationType3=V.NotificationType2=V.NotificationType1=V.NotificationType0=V.NotificationType=V.RequestType9=V.RequestType8=V.RequestType7=V.RequestType6=V.RequestType5=V.RequestType4=V.RequestType3=V.RequestType2=V.RequestType1=V.RequestType=V.RequestType0=V.AbstractMessageSignature=V.ParameterStructures=V.ResponseError=V.ErrorCodes=void 0;var ro=Mo(),Ag;(function(t){t.ParseError=-32700,t.InvalidRequest=-32600,t.MethodNotFound=-32601,t.InvalidParams=-32602,t.InternalError=-32603,t.jsonrpcReservedErrorRangeStart=-32099,t.serverErrorStart=-32099,t.MessageWriteError=-32099,t.MessageReadError=-32098,t.PendingResponseRejected=-32097,t.ConnectionInactive=-32096,t.ServerNotInitialized=-32002,t.UnknownErrorCode=-32001,t.jsonrpcReservedErrorRangeEnd=-32e3,t.serverErrorEnd=-32e3})(Ag=V.ErrorCodes||(V.ErrorCodes={}));var Vd=class t extends Error{constructor(e,r,n){super(r),this.code=ro.number(e)?e:Ag.UnknownErrorCode,this.data=n,Object.setPrototypeOf(this,t.prototype)}toJson(){let e={code:this.code,message:this.message};return this.data!==void 0&&(e.data=this.data),e}};V.ResponseError=Vd;var Rr=class t{constructor(e){this.kind=e}static is(e){return e===t.auto||e===t.byName||e===t.byPosition}toString(){return this.kind}};V.ParameterStructures=Rr;Rr.auto=new Rr("auto");Rr.byPosition=new Rr("byPosition");Rr.byName=new Rr("byName");var Xe=class{constructor(e,r){this.method=e,this.numberOfParams=r}get parameterStructures(){return Rr.auto}};V.AbstractMessageSignature=Xe;var Xd=class extends Xe{constructor(e){super(e,0)}};V.RequestType0=Xd;var Yd=class extends Xe{constructor(e,r=Rr.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};V.RequestType=Yd;var Jd=class extends Xe{constructor(e,r=Rr.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};V.RequestType1=Jd;var Qd=class extends Xe{constructor(e){super(e,2)}};V.RequestType2=Qd;var Zd=class extends Xe{constructor(e){super(e,3)}};V.RequestType3=Zd;var ep=class extends Xe{constructor(e){super(e,4)}};V.RequestType4=ep;var tp=class extends Xe{constructor(e){super(e,5)}};V.RequestType5=tp;var rp=class extends Xe{constructor(e){super(e,6)}};V.RequestType6=rp;var np=class extends Xe{constructor(e){super(e,7)}};V.RequestType7=np;var ip=class extends Xe{constructor(e){super(e,8)}};V.RequestType8=ip;var op=class extends Xe{constructor(e){super(e,9)}};V.RequestType9=op;var sp=class extends Xe{constructor(e,r=Rr.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};V.NotificationType=sp;var ap=class extends Xe{constructor(e){super(e,0)}};V.NotificationType0=ap;var lp=class extends Xe{constructor(e,r=Rr.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};V.NotificationType1=lp;var up=class extends Xe{constructor(e){super(e,2)}};V.NotificationType2=up;var cp=class extends Xe{constructor(e){super(e,3)}};V.NotificationType3=cp;var fp=class extends Xe{constructor(e){super(e,4)}};V.NotificationType4=fp;var dp=class extends Xe{constructor(e){super(e,5)}};V.NotificationType5=dp;var pp=class extends Xe{constructor(e){super(e,6)}};V.NotificationType6=pp;var mp=class extends Xe{constructor(e){super(e,7)}};V.NotificationType7=mp;var hp=class extends Xe{constructor(e){super(e,8)}};V.NotificationType8=hp;var gp=class extends Xe{constructor(e){super(e,9)}};V.NotificationType9=gp;var hw;(function(t){function e(i){let o=i;return o&&ro.string(o.method)&&(ro.string(o.id)||ro.number(o.id))}t.isRequest=e;function r(i){let o=i;return o&&ro.string(o.method)&&i.id===void 0}t.isNotification=r;function n(i){let o=i;return o&&(o.result!==void 0||!!o.error)&&(ro.string(o.id)||ro.number(o.id)||o.id===null)}t.isResponse=n})(hw=V.Message||(V.Message={}))});var vp=H(Wn=>{"use strict";var Cg;Object.defineProperty(Wn,"__esModule",{value:!0});Wn.LRUCache=Wn.LinkedMap=Wn.Touch=void 0;var cr;(function(t){t.None=0,t.First=1,t.AsOld=t.First,t.Last=2,t.AsNew=t.Last})(cr=Wn.Touch||(Wn.Touch={}));var Vl=class{constructor(){this[Cg]="LinkedMap",this._map=new Map,this._head=void 0,this._tail=void 0,this._size=0,this._state=0}clear(){this._map.clear(),this._head=void 0,this._tail=void 0,this._size=0,this._state++}isEmpty(){return!this._head&&!this._tail}get size(){return this._size}get first(){return this._head?.value}get last(){return this._tail?.value}has(e){return this._map.has(e)}get(e,r=cr.None){let n=this._map.get(e);if(n)return r!==cr.None&&this.touch(n,r),n.value}set(e,r,n=cr.None){let i=this._map.get(e);if(i)i.value=r,n!==cr.None&&this.touch(i,n);else{switch(i={key:e,value:r,next:void 0,previous:void 0},n){case cr.None:this.addItemLast(i);break;case cr.First:this.addItemFirst(i);break;case cr.Last:this.addItemLast(i);break;default:this.addItemLast(i);break}this._map.set(e,i),this._size++}return this}delete(e){return!!this.remove(e)}remove(e){let r=this._map.get(e);if(r)return this._map.delete(e),this.removeItem(r),this._size--,r.value}shift(){if(!this._head&&!this._tail)return;if(!this._head||!this._tail)throw new Error("Invalid list");let e=this._head;return this._map.delete(e.key),this.removeItem(e),this._size--,e.value}forEach(e,r){let n=this._state,i=this._head;for(;i;){if(r?e.bind(r)(i.value,i.key,this):e(i.value,i.key,this),this._state!==n)throw new Error("LinkedMap got modified during iteration.");i=i.next}}keys(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.key,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}values(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.value,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}entries(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:[r.key,r.value],done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}[(Cg=Symbol.toStringTag,Symbol.iterator)](){return this.entries()}trimOld(e){if(e>=this.size)return;if(e===0){this.clear();return}let r=this._head,n=this.size;for(;r&&n>e;)this._map.delete(r.key),r=r.next,n--;this._head=r,this._size=n,r&&(r.previous=void 0),this._state++}addItemFirst(e){if(!this._head&&!this._tail)this._tail=e;else if(this._head)e.next=this._head,this._head.previous=e;else throw new Error("Invalid list");this._head=e,this._state++}addItemLast(e){if(!this._head&&!this._tail)this._head=e;else if(this._tail)e.previous=this._tail,this._tail.next=e;else throw new Error("Invalid list");this._tail=e,this._state++}removeItem(e){if(e===this._head&&e===this._tail)this._head=void 0,this._tail=void 0;else if(e===this._head){if(!e.next)throw new Error("Invalid list");e.next.previous=void 0,this._head=e.next}else if(e===this._tail){if(!e.previous)throw new Error("Invalid list");e.previous.next=void 0,this._tail=e.previous}else{let r=e.next,n=e.previous;if(!r||!n)throw new Error("Invalid list");r.previous=n,n.next=r}e.next=void 0,e.previous=void 0,this._state++}touch(e,r){if(!this._head||!this._tail)throw new Error("Invalid list");if(!(r!==cr.First&&r!==cr.Last)){if(r===cr.First){if(e===this._head)return;let n=e.next,i=e.previous;e===this._tail?(i.next=void 0,this._tail=i):(n.previous=i,i.next=n),e.previous=void 0,e.next=this._head,this._head.previous=e,this._head=e,this._state++}else if(r===cr.Last){if(e===this._tail)return;let n=e.next,i=e.previous;e===this._head?(n.previous=void 0,this._head=n):(n.previous=i,i.next=n),e.next=void 0,e.previous=this._tail,this._tail.next=e,this._tail=e,this._state++}}}toJSON(){let e=[];return this.forEach((r,n)=>{e.push([n,r])}),e}fromJSON(e){this.clear();for(let[r,n]of e)this.set(r,n)}};Wn.LinkedMap=Vl;var Tp=class extends Vl{constructor(e,r=1){super(),this._limit=e,this._ratio=Math.min(Math.max(0,r),1)}get limit(){return this._limit}set limit(e){this._limit=e,this.checkTrim()}get ratio(){return this._ratio}set ratio(e){this._ratio=Math.min(Math.max(0,e),1),this.checkTrim()}get(e,r=cr.AsNew){return super.get(e,r)}peek(e){return super.get(e,cr.None)}set(e,r){return super.set(e,r,cr.Last),this.checkTrim(),this}checkTrim(){this.size>this._limit&&this.trimOld(Math.round(this._limit*this._ratio))}};Wn.LRUCache=Tp});var bp=H(no=>{"use strict";Object.defineProperty(no,"__esModule",{value:!0});no.CancellationTokenSource=no.CancellationToken=void 0;var gw=Kn(),yw=Mo(),Rp=to(),xp;(function(t){t.None=Object.freeze({isCancellationRequested:!1,onCancellationRequested:Rp.Event.None}),t.Cancelled=Object.freeze({isCancellationRequested:!0,onCancellationRequested:Rp.Event.None});function e(r){let n=r;return n&&(n===t.None||n===t.Cancelled||yw.boolean(n.isCancellationRequested)&&!!n.onCancellationRequested)}t.is=e})(xp=no.CancellationToken||(no.CancellationToken={}));var Tw=Object.freeze(function(t,e){let r=(0,gw.default)().timer.setTimeout(t.bind(e),0);return{dispose(){r.dispose()}}}),Xl=class{constructor(){this._isCancelled=!1}cancel(){this._isCancelled||(this._isCancelled=!0,this._emitter&&(this._emitter.fire(void 0),this.dispose()))}get isCancellationRequested(){return this._isCancelled}get onCancellationRequested(){return this._isCancelled?Tw:(this._emitter||(this._emitter=new Rp.Emitter),this._emitter.event)}dispose(){this._emitter&&(this._emitter.dispose(),this._emitter=void 0)}},Sp=class{get token(){return this._token||(this._token=new Xl),this._token}cancel(){this._token?this._token.cancel():this._token=xp.Cancelled}dispose(){this._token?this._token instanceof Xl&&this._token.dispose():this._token=xp.None}};no.CancellationTokenSource=Sp});var wg=H(Bn=>{"use strict";Object.defineProperty(Bn,"__esModule",{value:!0});Bn.ReadableStreamMessageReader=Bn.AbstractMessageReader=Bn.MessageReader=void 0;var Cp=Kn(),Fo=Mo(),Ap=to(),vw;(function(t){function e(r){let n=r;return n&&Fo.func(n.listen)&&Fo.func(n.dispose)&&Fo.func(n.onError)&&Fo.func(n.onClose)&&Fo.func(n.onPartialMessage)}t.is=e})(vw=Bn.MessageReader||(Bn.MessageReader={}));var Yl=class{constructor(){this.errorEmitter=new Ap.Emitter,this.closeEmitter=new Ap.Emitter,this.partialMessageEmitter=new Ap.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e){this.errorEmitter.fire(this.asError(e))}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}get onPartialMessage(){return this.partialMessageEmitter.event}firePartialMessage(e){this.partialMessageEmitter.fire(e)}asError(e){return e instanceof Error?e:new Error(`Reader received error. Reason: ${Fo.string(e.message)?e.message:"unknown"}`)}};Bn.AbstractMessageReader=Yl;var wp;(function(t){function e(r){let n,i,o,s=new Map,a,l=new Map;if(r===void 0||typeof r=="string")n=r??"utf-8";else{if(n=r.charset??"utf-8",r.contentDecoder!==void 0&&(o=r.contentDecoder,s.set(o.name,o)),r.contentDecoders!==void 0)for(let u of r.contentDecoders)s.set(u.name,u);if(r.contentTypeDecoder!==void 0&&(a=r.contentTypeDecoder,l.set(a.name,a)),r.contentTypeDecoders!==void 0)for(let u of r.contentTypeDecoders)l.set(u.name,u)}return a===void 0&&(a=(0,Cp.default)().applicationJson.decoder,l.set(a.name,a)),{charset:n,contentDecoder:o,contentDecoders:s,contentTypeDecoder:a,contentTypeDecoders:l}}t.fromOptions=e})(wp||(wp={}));var kp=class extends Yl{constructor(e,r){super(),this.readable=e,this.options=wp.fromOptions(r),this.buffer=(0,Cp.default)().messageBuffer.create(this.options.charset),this._partialMessageTimeout=1e4,this.nextMessageLength=-1,this.messageToken=0}set partialMessageTimeout(e){this._partialMessageTimeout=e}get partialMessageTimeout(){return this._partialMessageTimeout}listen(e){this.nextMessageLength=-1,this.messageToken=0,this.partialMessageTimer=void 0,this.callback=e;let r=this.readable.onData(n=>{this.onData(n)});return this.readable.onError(n=>this.fireError(n)),this.readable.onClose(()=>this.fireClose()),r}onData(e){for(this.buffer.append(e);;){if(this.nextMessageLength===-1){let i=this.buffer.tryReadHeaders();if(!i)return;let o=i.get("Content-Length");if(!o)throw new Error("Header must provide a Content-Length property.");let s=parseInt(o);if(isNaN(s))throw new Error("Content-Length value must be a number.");this.nextMessageLength=s}let r=this.buffer.tryReadBody(this.nextMessageLength);if(r===void 0){this.setPartialMessageTimer();return}this.clearPartialMessageTimer(),this.nextMessageLength=-1;let n;this.options.contentDecoder!==void 0?n=this.options.contentDecoder.decode(r):n=Promise.resolve(r),n.then(i=>{this.options.contentTypeDecoder.decode(i,this.options).then(o=>{this.callback(o)},o=>{this.fireError(o)})},i=>{this.fireError(i)})}}clearPartialMessageTimer(){this.partialMessageTimer&&(this.partialMessageTimer.dispose(),this.partialMessageTimer=void 0)}setPartialMessageTimer(){this.clearPartialMessageTimer(),!(this._partialMessageTimeout<=0)&&(this.partialMessageTimer=(0,Cp.default)().timer.setTimeout((e,r)=>{this.partialMessageTimer=void 0,e===this.messageToken&&(this.firePartialMessage({messageToken:e,waitingTime:r}),this.setPartialMessageTimer())},this._partialMessageTimeout,this.messageToken,this._partialMessageTimeout))}};Bn.ReadableStreamMessageReader=kp});var kg=H(Jl=>{"use strict";Object.defineProperty(Jl,"__esModule",{value:!0});Jl.Semaphore=void 0;var Rw=Kn(),Ep=class{constructor(e=1){if(e<=0)throw new Error("Capacity must be greater than 0");this._capacity=e,this._active=0,this._waiting=[]}lock(e){return new Promise((r,n)=>{this._waiting.push({thunk:e,resolve:r,reject:n}),this.runNext()})}get active(){return this._active}runNext(){this._waiting.length===0||this._active===this._capacity||(0,Rw.default)().timer.setImmediate(()=>this.doRunNext())}doRunNext(){if(this._waiting.length===0||this._active===this._capacity)return;let e=this._waiting.shift();if(this._active++,this._active>this._capacity)throw new Error("To many thunks active");try{let r=e.thunk();r instanceof Promise?r.then(n=>{this._active--,e.resolve(n),this.runNext()},n=>{this._active--,e.reject(n),this.runNext()}):(this._active--,e.resolve(r),this.runNext())}catch(r){this._active--,e.reject(r),this.runNext()}}};Jl.Semaphore=Ep});var Ng=H(zn=>{"use strict";Object.defineProperty(zn,"__esModule",{value:!0});zn.WriteableStreamMessageWriter=zn.AbstractMessageWriter=zn.MessageWriter=void 0;var Eg=Kn(),va=Mo(),xw=kg(),$g=to(),Sw="Content-Length: ",_g=`\r
`,bw;(function(t){function e(r){let n=r;return n&&va.func(n.dispose)&&va.func(n.onClose)&&va.func(n.onError)&&va.func(n.write)}t.is=e})(bw=zn.MessageWriter||(zn.MessageWriter={}));var Ql=class{constructor(){this.errorEmitter=new $g.Emitter,this.closeEmitter=new $g.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e,r,n){this.errorEmitter.fire([this.asError(e),r,n])}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}asError(e){return e instanceof Error?e:new Error(`Writer received error. Reason: ${va.string(e.message)?e.message:"unknown"}`)}};zn.AbstractMessageWriter=Ql;var $p;(function(t){function e(r){return r===void 0||typeof r=="string"?{charset:r??"utf-8",contentTypeEncoder:(0,Eg.default)().applicationJson.encoder}:{charset:r.charset??"utf-8",contentEncoder:r.contentEncoder,contentTypeEncoder:r.contentTypeEncoder??(0,Eg.default)().applicationJson.encoder}}t.fromOptions=e})($p||($p={}));var _p=class extends Ql{constructor(e,r){super(),this.writable=e,this.options=$p.fromOptions(r),this.errorCount=0,this.writeSemaphore=new xw.Semaphore(1),this.writable.onError(n=>this.fireError(n)),this.writable.onClose(()=>this.fireClose())}async write(e){return this.writeSemaphore.lock(async()=>this.options.contentTypeEncoder.encode(e,this.options).then(n=>this.options.contentEncoder!==void 0?this.options.contentEncoder.encode(n):n).then(n=>{let i=[];return i.push(Sw,n.byteLength.toString(),_g),i.push(_g),this.doWrite(e,i,n)},n=>{throw this.fireError(n),n}))}async doWrite(e,r,n){try{return await this.writable.write(r.join(""),"ascii"),this.writable.write(n)}catch(i){return this.handleError(i,e),Promise.reject(i)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){this.writable.end()}};zn.WriteableStreamMessageWriter=_p});var Mg=H(Y=>{"use strict";Object.defineProperty(Y,"__esModule",{value:!0});Y.createMessageConnection=Y.ConnectionOptions=Y.CancellationStrategy=Y.CancellationSenderStrategy=Y.CancellationReceiverStrategy=Y.ConnectionStrategy=Y.ConnectionError=Y.ConnectionErrors=Y.LogTraceNotification=Y.SetTraceNotification=Y.TraceFormat=Y.TraceValues=Y.Trace=Y.NullLogger=Y.ProgressType=Y.ProgressToken=void 0;var Ig=Kn(),Nt=Mo(),Z=yp(),Pg=vp(),Ra=to(),Np=bp(),Sa;(function(t){t.type=new Z.NotificationType("$/cancelRequest")})(Sa||(Sa={}));var Dg;(function(t){function e(r){return typeof r=="string"||typeof r=="number"}t.is=e})(Dg=Y.ProgressToken||(Y.ProgressToken={}));var xa;(function(t){t.type=new Z.NotificationType("$/progress")})(xa||(xa={}));var Ip=class{constructor(){}};Y.ProgressType=Ip;var Pp;(function(t){function e(r){return Nt.func(r)}t.is=e})(Pp||(Pp={}));Y.NullLogger=Object.freeze({error:()=>{},warn:()=>{},info:()=>{},log:()=>{}});var $e;(function(t){t[t.Off=0]="Off",t[t.Messages=1]="Messages",t[t.Compact=2]="Compact",t[t.Verbose=3]="Verbose"})($e=Y.Trace||(Y.Trace={}));var Aw;(function(t){t.Off="off",t.Messages="messages",t.Compact="compact",t.Verbose="verbose"})(Aw=Y.TraceValues||(Y.TraceValues={}));(function(t){function e(n){if(!Nt.string(n))return t.Off;switch(n=n.toLowerCase(),n){case"off":return t.Off;case"messages":return t.Messages;case"compact":return t.Compact;case"verbose":return t.Verbose;default:return t.Off}}t.fromString=e;function r(n){switch(n){case t.Off:return"off";case t.Messages:return"messages";case t.Compact:return"compact";case t.Verbose:return"verbose";default:return"off"}}t.toString=r})($e=Y.Trace||(Y.Trace={}));var tn;(function(t){t.Text="text",t.JSON="json"})(tn=Y.TraceFormat||(Y.TraceFormat={}));(function(t){function e(r){return Nt.string(r)?(r=r.toLowerCase(),r==="json"?t.JSON:t.Text):t.Text}t.fromString=e})(tn=Y.TraceFormat||(Y.TraceFormat={}));var Og;(function(t){t.type=new Z.NotificationType("$/setTrace")})(Og=Y.SetTraceNotification||(Y.SetTraceNotification={}));var Dp;(function(t){t.type=new Z.NotificationType("$/logTrace")})(Dp=Y.LogTraceNotification||(Y.LogTraceNotification={}));var Zl;(function(t){t[t.Closed=1]="Closed",t[t.Disposed=2]="Disposed",t[t.AlreadyListening=3]="AlreadyListening"})(Zl=Y.ConnectionErrors||(Y.ConnectionErrors={}));var Uo=class t extends Error{constructor(e,r){super(r),this.code=e,Object.setPrototypeOf(this,t.prototype)}};Y.ConnectionError=Uo;var Lg;(function(t){function e(r){let n=r;return n&&Nt.func(n.cancelUndispatched)}t.is=e})(Lg=Y.ConnectionStrategy||(Y.ConnectionStrategy={}));var Op;(function(t){t.Message=Object.freeze({createCancellationTokenSource(r){return new Np.CancellationTokenSource}});function e(r){let n=r;return n&&Nt.func(n.createCancellationTokenSource)}t.is=e})(Op=Y.CancellationReceiverStrategy||(Y.CancellationReceiverStrategy={}));var Lp;(function(t){t.Message=Object.freeze({sendCancellation(r,n){return r.sendNotification(Sa.type,{id:n})},cleanup(r){}});function e(r){let n=r;return n&&Nt.func(n.sendCancellation)&&Nt.func(n.cleanup)}t.is=e})(Lp=Y.CancellationSenderStrategy||(Y.CancellationSenderStrategy={}));var Mp;(function(t){t.Message=Object.freeze({receiver:Op.Message,sender:Lp.Message});function e(r){let n=r;return n&&Op.is(n.receiver)&&Lp.is(n.sender)}t.is=e})(Mp=Y.CancellationStrategy||(Y.CancellationStrategy={}));var Cw;(function(t){function e(r){let n=r;return n&&(Mp.is(n.cancellationStrategy)||Lg.is(n.connectionStrategy))}t.is=e})(Cw=Y.ConnectionOptions||(Y.ConnectionOptions={}));var rn;(function(t){t[t.New=1]="New",t[t.Listening=2]="Listening",t[t.Closed=3]="Closed",t[t.Disposed=4]="Disposed"})(rn||(rn={}));function ww(t,e,r,n){let i=r!==void 0?r:Y.NullLogger,o=0,s=0,a=0,l="2.0",u,c=new Map,f,m=new Map,T=new Map,b,C=new Pg.LinkedMap,_=new Map,w=new Set,v=new Map,y=$e.Off,$=tn.Text,D,X=rn.New,ye=new Ra.Emitter,Ee=new Ra.Emitter,jt=new Ra.Emitter,vt=new Ra.Emitter,M=new Ra.Emitter,A=n&&n.cancellationStrategy?n.cancellationStrategy:Mp.Message;function q(R){if(R===null)throw new Error("Can't send requests with id null since the response can't be correlated.");return"req-"+R.toString()}function j(R){return R===null?"res-unknown-"+(++a).toString():"res-"+R.toString()}function le(){return"not-"+(++s).toString()}function ee(R,P){Z.Message.isRequest(P)?R.set(q(P.id),P):Z.Message.isResponse(P)?R.set(j(P.id),P):R.set(le(),P)}function Q(R){}function Rt(){return X===rn.Listening}function ut(){return X===rn.Closed}function me(){return X===rn.Disposed}function Er(){(X===rn.New||X===rn.Listening)&&(X=rn.Closed,Ee.fire(void 0))}function Gn(R){ye.fire([R,void 0,void 0])}function ga(R){ye.fire(R)}t.onClose(Er),t.onError(Gn),e.onClose(Er),e.onError(ga);function Yi(){b||C.size===0||(b=(0,Ig.default)().timer.setImmediate(()=>{b=void 0,ur()}))}function ur(){if(C.size===0)return;let R=C.shift();try{Z.Message.isRequest(R)?xt(R):Z.Message.isNotification(R)?vn(R):Z.Message.isResponse(R)?Zt(R):Ht(R)}finally{Yi()}}let Po=R=>{try{if(Z.Message.isNotification(R)&&R.method===Sa.type.method){let P=R.params.id,F=q(P),B=C.get(F);if(Z.Message.isRequest(B)){let Oe=n?.connectionStrategy,Je=Oe&&Oe.cancelUndispatched?Oe.cancelUndispatched(B,Q):void 0;if(Je&&(Je.error!==void 0||Je.result!==void 0)){C.delete(F),v.delete(P),Je.id=B.id,vr(Je,R.method,Date.now()),e.write(Je).catch(()=>i.error("Sending response for canceled message failed."));return}}let De=v.get(P);if(De!==void 0){De.cancel(),Ti(R);return}else w.add(P)}ee(C,R)}finally{Yi()}};function xt(R){if(me())return;function P(ce,Ue,Te){let ht={jsonrpc:l,id:R.id};ce instanceof Z.ResponseError?ht.error=ce.toJson():ht.result=ce===void 0?null:ce,vr(ht,Ue,Te),e.write(ht).catch(()=>i.error("Sending response failed."))}function F(ce,Ue,Te){let ht={jsonrpc:l,id:R.id,error:ce.toJson()};vr(ht,Ue,Te),e.write(ht).catch(()=>i.error("Sending response failed."))}function B(ce,Ue,Te){ce===void 0&&(ce=null);let ht={jsonrpc:l,id:R.id,result:ce};vr(ht,Ue,Te),e.write(ht).catch(()=>i.error("Sending response failed."))}Ji(R);let De=c.get(R.method),Oe,Je;De&&(Oe=De.type,Je=De.handler);let St=Date.now();if(Je||u){let ce=R.id??String(Date.now()),Ue=A.receiver.createCancellationTokenSource(ce);R.id!==null&&w.has(R.id)&&Ue.cancel(),R.id!==null&&v.set(ce,Ue);try{let Te;if(Je)if(R.params===void 0){if(Oe!==void 0&&Oe.numberOfParams!==0){F(new Z.ResponseError(Z.ErrorCodes.InvalidParams,`Request ${R.method} defines ${Oe.numberOfParams} params but received none.`),R.method,St);return}Te=Je(Ue.token)}else if(Array.isArray(R.params)){if(Oe!==void 0&&Oe.parameterStructures===Z.ParameterStructures.byName){F(new Z.ResponseError(Z.ErrorCodes.InvalidParams,`Request ${R.method} defines parameters by name but received parameters by position`),R.method,St);return}Te=Je(...R.params,Ue.token)}else{if(Oe!==void 0&&Oe.parameterStructures===Z.ParameterStructures.byPosition){F(new Z.ResponseError(Z.ErrorCodes.InvalidParams,`Request ${R.method} defines parameters by position but received parameters by name`),R.method,St);return}Te=Je(R.params,Ue.token)}else u&&(Te=u(R.method,R.params,Ue.token));let ht=Te;Te?ht.then?ht.then(er=>{v.delete(ce),P(er,R.method,St)},er=>{v.delete(ce),er instanceof Z.ResponseError?F(er,R.method,St):er&&Nt.string(er.message)?F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${R.method} failed with message: ${er.message}`),R.method,St):F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${R.method} failed unexpectedly without providing any details.`),R.method,St)}):(v.delete(ce),P(Te,R.method,St)):(v.delete(ce),B(Te,R.method,St))}catch(Te){v.delete(ce),Te instanceof Z.ResponseError?P(Te,R.method,St):Te&&Nt.string(Te.message)?F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${R.method} failed with message: ${Te.message}`),R.method,St):F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${R.method} failed unexpectedly without providing any details.`),R.method,St)}}else F(new Z.ResponseError(Z.ErrorCodes.MethodNotFound,`Unhandled method ${R.method}`),R.method,St)}function Zt(R){if(!me())if(R.id===null)R.error?i.error(`Received response message without id: Error is: 
${JSON.stringify(R.error,void 0,4)}`):i.error("Received response message without id. No further error information provided.");else{let P=R.id,F=_.get(P);if(Dd(R,F),F!==void 0){_.delete(P);try{if(R.error){let B=R.error;F.reject(new Z.ResponseError(B.code,B.message,B.data))}else if(R.result!==void 0)F.resolve(R.result);else throw new Error("Should never happen.")}catch(B){B.message?i.error(`Response handler '${F.method}' failed with message: ${B.message}`):i.error(`Response handler '${F.method}' failed unexpectedly.`)}}}}function vn(R){if(me())return;let P,F;if(R.method===Sa.type.method){let B=R.params.id;w.delete(B),Ti(R);return}else{let B=m.get(R.method);B&&(F=B.handler,P=B.type)}if(F||f)try{if(Ti(R),F)if(R.params===void 0)P!==void 0&&P.numberOfParams!==0&&P.parameterStructures!==Z.ParameterStructures.byName&&i.error(`Notification ${R.method} defines ${P.numberOfParams} params but received none.`),F();else if(Array.isArray(R.params)){let B=R.params;R.method===xa.type.method&&B.length===2&&Dg.is(B[0])?F({token:B[0],value:B[1]}):(P!==void 0&&(P.parameterStructures===Z.ParameterStructures.byName&&i.error(`Notification ${R.method} defines parameters by name but received parameters by position`),P.numberOfParams!==R.params.length&&i.error(`Notification ${R.method} defines ${P.numberOfParams} params but received ${B.length} arguments`)),F(...B))}else P!==void 0&&P.parameterStructures===Z.ParameterStructures.byPosition&&i.error(`Notification ${R.method} defines parameters by position but received parameters by name`),F(R.params);else f&&f(R.method,R.params)}catch(B){B.message?i.error(`Notification handler '${R.method}' failed with message: ${B.message}`):i.error(`Notification handler '${R.method}' failed unexpectedly.`)}else jt.fire(R)}function Ht(R){if(!R){i.error("Received empty message.");return}i.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(R,null,4)}`);let P=R;if(Nt.string(P.id)||Nt.number(P.id)){let F=P.id,B=_.get(F);B&&B.reject(new Error("The received response has neither a result nor an error property."))}}function ct(R){if(R!=null)switch(y){case $e.Verbose:return JSON.stringify(R,null,4);case $e.Compact:return JSON.stringify(R);default:return}}function qr(R){if(!(y===$e.Off||!D))if($===tn.Text){let P;(y===$e.Verbose||y===$e.Compact)&&R.params&&(P=`Params: ${ct(R.params)}

`),D.log(`Sending request '${R.method} - (${R.id})'.`,P)}else vi("send-request",R)}function $r(R){if(!(y===$e.Off||!D))if($===tn.Text){let P;(y===$e.Verbose||y===$e.Compact)&&(R.params?P=`Params: ${ct(R.params)}

`:P=`No parameters provided.

`),D.log(`Sending notification '${R.method}'.`,P)}else vi("send-notification",R)}function vr(R,P,F){if(!(y===$e.Off||!D))if($===tn.Text){let B;(y===$e.Verbose||y===$e.Compact)&&(R.error&&R.error.data?B=`Error data: ${ct(R.error.data)}

`:R.result?B=`Result: ${ct(R.result)}

`:R.error===void 0&&(B=`No result returned.

`)),D.log(`Sending response '${P} - (${R.id})'. Processing request took ${Date.now()-F}ms`,B)}else vi("send-response",R)}function Ji(R){if(!(y===$e.Off||!D))if($===tn.Text){let P;(y===$e.Verbose||y===$e.Compact)&&R.params&&(P=`Params: ${ct(R.params)}

`),D.log(`Received request '${R.method} - (${R.id})'.`,P)}else vi("receive-request",R)}function Ti(R){if(!(y===$e.Off||!D||R.method===Dp.type.method))if($===tn.Text){let P;(y===$e.Verbose||y===$e.Compact)&&(R.params?P=`Params: ${ct(R.params)}

`:P=`No parameters provided.

`),D.log(`Received notification '${R.method}'.`,P)}else vi("receive-notification",R)}function Dd(R,P){if(!(y===$e.Off||!D))if($===tn.Text){let F;if((y===$e.Verbose||y===$e.Compact)&&(R.error&&R.error.data?F=`Error data: ${ct(R.error.data)}

`:R.result?F=`Result: ${ct(R.result)}

`:R.error===void 0&&(F=`No result returned.

`)),P){let B=R.error?` Request failed: ${R.error.message} (${R.error.code}).`:"";D.log(`Received response '${P.method} - (${R.id})' in ${Date.now()-P.timerStart}ms.${B}`,F)}else D.log(`Received response ${R.id} without active response promise.`,F)}else vi("receive-response",R)}function vi(R,P){if(!D||y===$e.Off)return;let F={isLSPMessage:!0,type:R,message:P,timestamp:Date.now()};D.log(F)}function Qi(){if(ut())throw new Uo(Zl.Closed,"Connection is closed.");if(me())throw new Uo(Zl.Disposed,"Connection is disposed.")}function Od(){if(Rt())throw new Uo(Zl.AlreadyListening,"Connection is already listening")}function Ld(){if(!Rt())throw new Error("Call listen() first.")}function Zi(R){return R===void 0?null:R}function Do(R){if(R!==null)return R}function jl(R){return R!=null&&!Array.isArray(R)&&typeof R=="object"}function ya(R,P){switch(R){case Z.ParameterStructures.auto:return jl(P)?Do(P):[Zi(P)];case Z.ParameterStructures.byName:if(!jl(P))throw new Error("Received parameters by name but param is not an object literal.");return Do(P);case Z.ParameterStructures.byPosition:return[Zi(P)];default:throw new Error(`Unknown parameter structure ${R.toString()}`)}}function Hl(R,P){let F,B=R.numberOfParams;switch(B){case 0:F=void 0;break;case 1:F=ya(R.parameterStructures,P[0]);break;default:F=[];for(let De=0;De<P.length&&De<B;De++)F.push(Zi(P[De]));if(P.length<B)for(let De=P.length;De<B;De++)F.push(null);break}return F}let Ri={sendNotification:(R,...P)=>{Qi();let F,B;if(Nt.string(R)){F=R;let Oe=P[0],Je=0,St=Z.ParameterStructures.auto;Z.ParameterStructures.is(Oe)&&(Je=1,St=Oe);let ce=P.length,Ue=ce-Je;switch(Ue){case 0:B=void 0;break;case 1:B=ya(St,P[Je]);break;default:if(St===Z.ParameterStructures.byName)throw new Error(`Received ${Ue} parameters for 'by Name' notification parameter structure.`);B=P.slice(Je,ce).map(Te=>Zi(Te));break}}else{let Oe=P;F=R.method,B=Hl(R,Oe)}let De={jsonrpc:l,method:F,params:B};return $r(De),e.write(De).catch(()=>i.error("Sending notification failed."))},onNotification:(R,P)=>{Qi();let F;return Nt.func(R)?f=R:P&&(Nt.string(R)?(F=R,m.set(R,{type:void 0,handler:P})):(F=R.method,m.set(R.method,{type:R,handler:P}))),{dispose:()=>{F!==void 0?m.delete(F):f=void 0}}},onProgress:(R,P,F)=>{if(T.has(P))throw new Error(`Progress handler for token ${P} already registered`);return T.set(P,F),{dispose:()=>{T.delete(P)}}},sendProgress:(R,P,F)=>Ri.sendNotification(xa.type,{token:P,value:F}),onUnhandledProgress:vt.event,sendRequest:(R,...P)=>{Qi(),Ld();let F,B,De;if(Nt.string(R)){F=R;let ce=P[0],Ue=P[P.length-1],Te=0,ht=Z.ParameterStructures.auto;Z.ParameterStructures.is(ce)&&(Te=1,ht=ce);let er=P.length;Np.CancellationToken.is(Ue)&&(er=er-1,De=Ue);let jn=er-Te;switch(jn){case 0:B=void 0;break;case 1:B=ya(ht,P[Te]);break;default:if(ht===Z.ParameterStructures.byName)throw new Error(`Received ${jn} parameters for 'by Name' request parameter structure.`);B=P.slice(Te,er).map(Rn=>Zi(Rn));break}}else{let ce=P;F=R.method,B=Hl(R,ce);let Ue=R.numberOfParams;De=Np.CancellationToken.is(ce[Ue])?ce[Ue]:void 0}let Oe=o++,Je;return De&&(Je=De.onCancellationRequested(()=>{let ce=A.sender.sendCancellation(Ri,Oe);return ce===void 0?(i.log(`Received no promise from cancellation strategy when cancelling id ${Oe}`),Promise.resolve()):ce.catch(()=>{i.log(`Sending cancellation messages for id ${Oe} failed`)})})),new Promise((ce,Ue)=>{let Te={jsonrpc:l,id:Oe,method:F,params:B},ht=Rn=>{ce(Rn),A.sender.cleanup(Oe),Je?.dispose()},er=Rn=>{Ue(Rn),A.sender.cleanup(Oe),Je?.dispose()},jn={method:F,timerStart:Date.now(),resolve:ht,reject:er};qr(Te);try{e.write(Te).catch(()=>i.error("Sending request failed."))}catch(Rn){jn.reject(new Z.ResponseError(Z.ErrorCodes.MessageWriteError,Rn.message?Rn.message:"Unknown reason")),jn=null}jn&&_.set(Oe,jn)})},onRequest:(R,P)=>{Qi();let F=null;return Pp.is(R)?(F=void 0,u=R):Nt.string(R)?(F=null,P!==void 0&&(F=R,c.set(R,{handler:P,type:void 0}))):P!==void 0&&(F=R.method,c.set(R.method,{type:R,handler:P})),{dispose:()=>{F!==null&&(F!==void 0?c.delete(F):u=void 0)}}},hasPendingResponse:()=>_.size>0,trace:async(R,P,F)=>{let B=!1,De=tn.Text;F!==void 0&&(Nt.boolean(F)?B=F:(B=F.sendNotification||!1,De=F.traceFormat||tn.Text)),y=R,$=De,y===$e.Off?D=void 0:D=P,B&&!ut()&&!me()&&await Ri.sendNotification(Og.type,{value:$e.toString(R)})},onError:ye.event,onClose:Ee.event,onUnhandledNotification:jt.event,onDispose:M.event,end:()=>{e.end()},dispose:()=>{if(me())return;X=rn.Disposed,M.fire(void 0);let R=new Z.ResponseError(Z.ErrorCodes.PendingResponseRejected,"Pending response rejected since connection got disposed");for(let P of _.values())P.reject(R);_=new Map,v=new Map,w=new Set,C=new Pg.LinkedMap,Nt.func(e.dispose)&&e.dispose(),Nt.func(t.dispose)&&t.dispose()},listen:()=>{Qi(),Od(),X=rn.Listening,t.listen(Po)},inspect:()=>{(0,Ig.default)().console.log("inspect")}};return Ri.onNotification(Dp.type,R=>{if(y===$e.Off||!D)return;let P=y===$e.Verbose||y===$e.Compact;D.log(R.message,P?R.verbose:void 0)}),Ri.onNotification(xa.type,R=>{let P=T.get(R.token);P?P(R.value):vt.fire(R)}),Ri}Y.createMessageConnection=ww});var Gp=H(N=>{"use strict";Object.defineProperty(N,"__esModule",{value:!0});N.TraceFormat=N.TraceValues=N.Trace=N.ProgressType=N.ProgressToken=N.createMessageConnection=N.NullLogger=N.ConnectionOptions=N.ConnectionStrategy=N.WriteableStreamMessageWriter=N.AbstractMessageWriter=N.MessageWriter=N.ReadableStreamMessageReader=N.AbstractMessageReader=N.MessageReader=N.CancellationToken=N.CancellationTokenSource=N.Emitter=N.Event=N.Disposable=N.LRUCache=N.Touch=N.LinkedMap=N.ParameterStructures=N.NotificationType9=N.NotificationType8=N.NotificationType7=N.NotificationType6=N.NotificationType5=N.NotificationType4=N.NotificationType3=N.NotificationType2=N.NotificationType1=N.NotificationType0=N.NotificationType=N.ErrorCodes=N.ResponseError=N.RequestType9=N.RequestType8=N.RequestType7=N.RequestType6=N.RequestType5=N.RequestType4=N.RequestType3=N.RequestType2=N.RequestType1=N.RequestType0=N.RequestType=N.Message=N.RAL=void 0;N.CancellationStrategy=N.CancellationSenderStrategy=N.CancellationReceiverStrategy=N.ConnectionError=N.ConnectionErrors=N.LogTraceNotification=N.SetTraceNotification=void 0;var Ge=yp();Object.defineProperty(N,"Message",{enumerable:!0,get:function(){return Ge.Message}});Object.defineProperty(N,"RequestType",{enumerable:!0,get:function(){return Ge.RequestType}});Object.defineProperty(N,"RequestType0",{enumerable:!0,get:function(){return Ge.RequestType0}});Object.defineProperty(N,"RequestType1",{enumerable:!0,get:function(){return Ge.RequestType1}});Object.defineProperty(N,"RequestType2",{enumerable:!0,get:function(){return Ge.RequestType2}});Object.defineProperty(N,"RequestType3",{enumerable:!0,get:function(){return Ge.RequestType3}});Object.defineProperty(N,"RequestType4",{enumerable:!0,get:function(){return Ge.RequestType4}});Object.defineProperty(N,"RequestType5",{enumerable:!0,get:function(){return Ge.RequestType5}});Object.defineProperty(N,"RequestType6",{enumerable:!0,get:function(){return Ge.RequestType6}});Object.defineProperty(N,"RequestType7",{enumerable:!0,get:function(){return Ge.RequestType7}});Object.defineProperty(N,"RequestType8",{enumerable:!0,get:function(){return Ge.RequestType8}});Object.defineProperty(N,"RequestType9",{enumerable:!0,get:function(){return Ge.RequestType9}});Object.defineProperty(N,"ResponseError",{enumerable:!0,get:function(){return Ge.ResponseError}});Object.defineProperty(N,"ErrorCodes",{enumerable:!0,get:function(){return Ge.ErrorCodes}});Object.defineProperty(N,"NotificationType",{enumerable:!0,get:function(){return Ge.NotificationType}});Object.defineProperty(N,"NotificationType0",{enumerable:!0,get:function(){return Ge.NotificationType0}});Object.defineProperty(N,"NotificationType1",{enumerable:!0,get:function(){return Ge.NotificationType1}});Object.defineProperty(N,"NotificationType2",{enumerable:!0,get:function(){return Ge.NotificationType2}});Object.defineProperty(N,"NotificationType3",{enumerable:!0,get:function(){return Ge.NotificationType3}});Object.defineProperty(N,"NotificationType4",{enumerable:!0,get:function(){return Ge.NotificationType4}});Object.defineProperty(N,"NotificationType5",{enumerable:!0,get:function(){return Ge.NotificationType5}});Object.defineProperty(N,"NotificationType6",{enumerable:!0,get:function(){return Ge.NotificationType6}});Object.defineProperty(N,"NotificationType7",{enumerable:!0,get:function(){return Ge.NotificationType7}});Object.defineProperty(N,"NotificationType8",{enumerable:!0,get:function(){return Ge.NotificationType8}});Object.defineProperty(N,"NotificationType9",{enumerable:!0,get:function(){return Ge.NotificationType9}});Object.defineProperty(N,"ParameterStructures",{enumerable:!0,get:function(){return Ge.ParameterStructures}});var Fp=vp();Object.defineProperty(N,"LinkedMap",{enumerable:!0,get:function(){return Fp.LinkedMap}});Object.defineProperty(N,"LRUCache",{enumerable:!0,get:function(){return Fp.LRUCache}});Object.defineProperty(N,"Touch",{enumerable:!0,get:function(){return Fp.Touch}});var kw=Gd();Object.defineProperty(N,"Disposable",{enumerable:!0,get:function(){return kw.Disposable}});var Fg=to();Object.defineProperty(N,"Event",{enumerable:!0,get:function(){return Fg.Event}});Object.defineProperty(N,"Emitter",{enumerable:!0,get:function(){return Fg.Emitter}});var Ug=bp();Object.defineProperty(N,"CancellationTokenSource",{enumerable:!0,get:function(){return Ug.CancellationTokenSource}});Object.defineProperty(N,"CancellationToken",{enumerable:!0,get:function(){return Ug.CancellationToken}});var Up=wg();Object.defineProperty(N,"MessageReader",{enumerable:!0,get:function(){return Up.MessageReader}});Object.defineProperty(N,"AbstractMessageReader",{enumerable:!0,get:function(){return Up.AbstractMessageReader}});Object.defineProperty(N,"ReadableStreamMessageReader",{enumerable:!0,get:function(){return Up.ReadableStreamMessageReader}});var qp=Ng();Object.defineProperty(N,"MessageWriter",{enumerable:!0,get:function(){return qp.MessageWriter}});Object.defineProperty(N,"AbstractMessageWriter",{enumerable:!0,get:function(){return qp.AbstractMessageWriter}});Object.defineProperty(N,"WriteableStreamMessageWriter",{enumerable:!0,get:function(){return qp.WriteableStreamMessageWriter}});var rr=Mg();Object.defineProperty(N,"ConnectionStrategy",{enumerable:!0,get:function(){return rr.ConnectionStrategy}});Object.defineProperty(N,"ConnectionOptions",{enumerable:!0,get:function(){return rr.ConnectionOptions}});Object.defineProperty(N,"NullLogger",{enumerable:!0,get:function(){return rr.NullLogger}});Object.defineProperty(N,"createMessageConnection",{enumerable:!0,get:function(){return rr.createMessageConnection}});Object.defineProperty(N,"ProgressToken",{enumerable:!0,get:function(){return rr.ProgressToken}});Object.defineProperty(N,"ProgressType",{enumerable:!0,get:function(){return rr.ProgressType}});Object.defineProperty(N,"Trace",{enumerable:!0,get:function(){return rr.Trace}});Object.defineProperty(N,"TraceValues",{enumerable:!0,get:function(){return rr.TraceValues}});Object.defineProperty(N,"TraceFormat",{enumerable:!0,get:function(){return rr.TraceFormat}});Object.defineProperty(N,"SetTraceNotification",{enumerable:!0,get:function(){return rr.SetTraceNotification}});Object.defineProperty(N,"LogTraceNotification",{enumerable:!0,get:function(){return rr.LogTraceNotification}});Object.defineProperty(N,"ConnectionErrors",{enumerable:!0,get:function(){return rr.ConnectionErrors}});Object.defineProperty(N,"ConnectionError",{enumerable:!0,get:function(){return rr.ConnectionError}});Object.defineProperty(N,"CancellationReceiverStrategy",{enumerable:!0,get:function(){return rr.CancellationReceiverStrategy}});Object.defineProperty(N,"CancellationSenderStrategy",{enumerable:!0,get:function(){return rr.CancellationSenderStrategy}});Object.defineProperty(N,"CancellationStrategy",{enumerable:!0,get:function(){return rr.CancellationStrategy}});var Ew=Kn();N.RAL=Ew.default});var Vn=H(_r=>{"use strict";var $w=_r&&_r.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),_w=_r&&_r.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&$w(e,t,r)};Object.defineProperty(_r,"__esModule",{value:!0});_r.createMessageConnection=_r.BrowserMessageWriter=_r.BrowserMessageReader=void 0;var Nw=xg();Nw.default.install();var qo=Gp();_w(Gp(),_r);var jp=class extends qo.AbstractMessageReader{constructor(e){super(),this._onData=new qo.Emitter,this._messageListener=r=>{this._onData.fire(r.data)},e.addEventListener("error",r=>this.fireError(r)),e.onmessage=this._messageListener}listen(e){return this._onData.event(e)}};_r.BrowserMessageReader=jp;var Hp=class extends qo.AbstractMessageWriter{constructor(e){super(),this.context=e,this.errorCount=0,e.addEventListener("error",r=>this.fireError(r))}write(e){try{return this.context.postMessage(e),Promise.resolve()}catch(r){return this.handleError(r,e),Promise.reject(r)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){}};_r.BrowserMessageWriter=Hp;function Iw(t,e,r,n){return r===void 0&&(r=qo.NullLogger),qo.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,qo.createMessageConnection)(t,e,r,n)}_r.createMessageConnection=Iw});var Kp=H((TG,qg)=>{"use strict";qg.exports=Vn()});var io=H((Gg,eu)=>{(function(t){if(typeof eu=="object"&&typeof eu.exports=="object"){var e=t(yg,Gg);e!==void 0&&(eu.exports=e)}else typeof define=="function"&&define.amd&&define(["require","exports"],t)})(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TextDocument=e.EOL=e.WorkspaceFolder=e.InlayHint=e.InlayHintLabelPart=e.InlayHintKind=e.InlineValueContext=e.InlineValueEvaluatableExpression=e.InlineValueVariableLookup=e.InlineValueText=e.SemanticTokens=e.SemanticTokenModifiers=e.SemanticTokenTypes=e.SelectionRange=e.DocumentLink=e.FormattingOptions=e.CodeLens=e.CodeAction=e.CodeActionContext=e.CodeActionTriggerKind=e.CodeActionKind=e.DocumentSymbol=e.WorkspaceSymbol=e.SymbolInformation=e.SymbolTag=e.SymbolKind=e.DocumentHighlight=e.DocumentHighlightKind=e.SignatureInformation=e.ParameterInformation=e.Hover=e.MarkedString=e.CompletionList=e.CompletionItem=e.CompletionItemLabelDetails=e.InsertTextMode=e.InsertReplaceEdit=e.CompletionItemTag=e.InsertTextFormat=e.CompletionItemKind=e.MarkupContent=e.MarkupKind=e.TextDocumentItem=e.OptionalVersionedTextDocumentIdentifier=e.VersionedTextDocumentIdentifier=e.TextDocumentIdentifier=e.WorkspaceChange=e.WorkspaceEdit=e.DeleteFile=e.RenameFile=e.CreateFile=e.TextDocumentEdit=e.AnnotatedTextEdit=e.ChangeAnnotationIdentifier=e.ChangeAnnotation=e.TextEdit=e.Command=e.Diagnostic=e.CodeDescription=e.DiagnosticTag=e.DiagnosticSeverity=e.DiagnosticRelatedInformation=e.FoldingRange=e.FoldingRangeKind=e.ColorPresentation=e.ColorInformation=e.Color=e.LocationLink=e.Location=e.Range=e.Position=e.uinteger=e.integer=e.URI=e.DocumentUri=void 0;var r;(function(p){function x(S){return typeof S=="string"}p.is=x})(r=e.DocumentUri||(e.DocumentUri={}));var n;(function(p){function x(S){return typeof S=="string"}p.is=x})(n=e.URI||(e.URI={}));var i;(function(p){p.MIN_VALUE=-2147483648,p.MAX_VALUE=2147483647;function x(S){return typeof S=="number"&&p.MIN_VALUE<=S&&S<=p.MAX_VALUE}p.is=x})(i=e.integer||(e.integer={}));var o;(function(p){p.MIN_VALUE=0,p.MAX_VALUE=2147483647;function x(S){return typeof S=="number"&&p.MIN_VALUE<=S&&S<=p.MAX_VALUE}p.is=x})(o=e.uinteger||(e.uinteger={}));var s;(function(p){function x(g,d){return g===Number.MAX_VALUE&&(g=o.MAX_VALUE),d===Number.MAX_VALUE&&(d=o.MAX_VALUE),{line:g,character:d}}p.create=x;function S(g){var d=g;return k.objectLiteral(d)&&k.uinteger(d.line)&&k.uinteger(d.character)}p.is=S})(s=e.Position||(e.Position={}));var a;(function(p){function x(g,d,E,I){if(k.uinteger(g)&&k.uinteger(d)&&k.uinteger(E)&&k.uinteger(I))return{start:s.create(g,d),end:s.create(E,I)};if(s.is(g)&&s.is(d))return{start:g,end:d};throw new Error("Range#create called with invalid arguments[".concat(g,", ").concat(d,", ").concat(E,", ").concat(I,"]"))}p.create=x;function S(g){var d=g;return k.objectLiteral(d)&&s.is(d.start)&&s.is(d.end)}p.is=S})(a=e.Range||(e.Range={}));var l;(function(p){function x(g,d){return{uri:g,range:d}}p.create=x;function S(g){var d=g;return k.objectLiteral(d)&&a.is(d.range)&&(k.string(d.uri)||k.undefined(d.uri))}p.is=S})(l=e.Location||(e.Location={}));var u;(function(p){function x(g,d,E,I){return{targetUri:g,targetRange:d,targetSelectionRange:E,originSelectionRange:I}}p.create=x;function S(g){var d=g;return k.objectLiteral(d)&&a.is(d.targetRange)&&k.string(d.targetUri)&&a.is(d.targetSelectionRange)&&(a.is(d.originSelectionRange)||k.undefined(d.originSelectionRange))}p.is=S})(u=e.LocationLink||(e.LocationLink={}));var c;(function(p){function x(g,d,E,I){return{red:g,green:d,blue:E,alpha:I}}p.create=x;function S(g){var d=g;return k.objectLiteral(d)&&k.numberRange(d.red,0,1)&&k.numberRange(d.green,0,1)&&k.numberRange(d.blue,0,1)&&k.numberRange(d.alpha,0,1)}p.is=S})(c=e.Color||(e.Color={}));var f;(function(p){function x(g,d){return{range:g,color:d}}p.create=x;function S(g){var d=g;return k.objectLiteral(d)&&a.is(d.range)&&c.is(d.color)}p.is=S})(f=e.ColorInformation||(e.ColorInformation={}));var m;(function(p){function x(g,d,E){return{label:g,textEdit:d,additionalTextEdits:E}}p.create=x;function S(g){var d=g;return k.objectLiteral(d)&&k.string(d.label)&&(k.undefined(d.textEdit)||D.is(d))&&(k.undefined(d.additionalTextEdits)||k.typedArray(d.additionalTextEdits,D.is))}p.is=S})(m=e.ColorPresentation||(e.ColorPresentation={}));var T;(function(p){p.Comment="comment",p.Imports="imports",p.Region="region"})(T=e.FoldingRangeKind||(e.FoldingRangeKind={}));var b;(function(p){function x(g,d,E,I,re,ft){var qe={startLine:g,endLine:d};return k.defined(E)&&(qe.startCharacter=E),k.defined(I)&&(qe.endCharacter=I),k.defined(re)&&(qe.kind=re),k.defined(ft)&&(qe.collapsedText=ft),qe}p.create=x;function S(g){var d=g;return k.objectLiteral(d)&&k.uinteger(d.startLine)&&k.uinteger(d.startLine)&&(k.undefined(d.startCharacter)||k.uinteger(d.startCharacter))&&(k.undefined(d.endCharacter)||k.uinteger(d.endCharacter))&&(k.undefined(d.kind)||k.string(d.kind))}p.is=S})(b=e.FoldingRange||(e.FoldingRange={}));var C;(function(p){function x(g,d){return{location:g,message:d}}p.create=x;function S(g){var d=g;return k.defined(d)&&l.is(d.location)&&k.string(d.message)}p.is=S})(C=e.DiagnosticRelatedInformation||(e.DiagnosticRelatedInformation={}));var _;(function(p){p.Error=1,p.Warning=2,p.Information=3,p.Hint=4})(_=e.DiagnosticSeverity||(e.DiagnosticSeverity={}));var w;(function(p){p.Unnecessary=1,p.Deprecated=2})(w=e.DiagnosticTag||(e.DiagnosticTag={}));var v;(function(p){function x(S){var g=S;return k.objectLiteral(g)&&k.string(g.href)}p.is=x})(v=e.CodeDescription||(e.CodeDescription={}));var y;(function(p){function x(g,d,E,I,re,ft){var qe={range:g,message:d};return k.defined(E)&&(qe.severity=E),k.defined(I)&&(qe.code=I),k.defined(re)&&(qe.source=re),k.defined(ft)&&(qe.relatedInformation=ft),qe}p.create=x;function S(g){var d,E=g;return k.defined(E)&&a.is(E.range)&&k.string(E.message)&&(k.number(E.severity)||k.undefined(E.severity))&&(k.integer(E.code)||k.string(E.code)||k.undefined(E.code))&&(k.undefined(E.codeDescription)||k.string((d=E.codeDescription)===null||d===void 0?void 0:d.href))&&(k.string(E.source)||k.undefined(E.source))&&(k.undefined(E.relatedInformation)||k.typedArray(E.relatedInformation,C.is))}p.is=S})(y=e.Diagnostic||(e.Diagnostic={}));var $;(function(p){function x(g,d){for(var E=[],I=2;I<arguments.length;I++)E[I-2]=arguments[I];var re={title:g,command:d};return k.defined(E)&&E.length>0&&(re.arguments=E),re}p.create=x;function S(g){var d=g;return k.defined(d)&&k.string(d.title)&&k.string(d.command)}p.is=S})($=e.Command||(e.Command={}));var D;(function(p){function x(E,I){return{range:E,newText:I}}p.replace=x;function S(E,I){return{range:{start:E,end:E},newText:I}}p.insert=S;function g(E){return{range:E,newText:""}}p.del=g;function d(E){var I=E;return k.objectLiteral(I)&&k.string(I.newText)&&a.is(I.range)}p.is=d})(D=e.TextEdit||(e.TextEdit={}));var X;(function(p){function x(g,d,E){var I={label:g};return d!==void 0&&(I.needsConfirmation=d),E!==void 0&&(I.description=E),I}p.create=x;function S(g){var d=g;return k.objectLiteral(d)&&k.string(d.label)&&(k.boolean(d.needsConfirmation)||d.needsConfirmation===void 0)&&(k.string(d.description)||d.description===void 0)}p.is=S})(X=e.ChangeAnnotation||(e.ChangeAnnotation={}));var ye;(function(p){function x(S){var g=S;return k.string(g)}p.is=x})(ye=e.ChangeAnnotationIdentifier||(e.ChangeAnnotationIdentifier={}));var Ee;(function(p){function x(E,I,re){return{range:E,newText:I,annotationId:re}}p.replace=x;function S(E,I,re){return{range:{start:E,end:E},newText:I,annotationId:re}}p.insert=S;function g(E,I){return{range:E,newText:"",annotationId:I}}p.del=g;function d(E){var I=E;return D.is(I)&&(X.is(I.annotationId)||ye.is(I.annotationId))}p.is=d})(Ee=e.AnnotatedTextEdit||(e.AnnotatedTextEdit={}));var jt;(function(p){function x(g,d){return{textDocument:g,edits:d}}p.create=x;function S(g){var d=g;return k.defined(d)&&ut.is(d.textDocument)&&Array.isArray(d.edits)}p.is=S})(jt=e.TextDocumentEdit||(e.TextDocumentEdit={}));var vt;(function(p){function x(g,d,E){var I={kind:"create",uri:g};return d!==void 0&&(d.overwrite!==void 0||d.ignoreIfExists!==void 0)&&(I.options=d),E!==void 0&&(I.annotationId=E),I}p.create=x;function S(g){var d=g;return d&&d.kind==="create"&&k.string(d.uri)&&(d.options===void 0||(d.options.overwrite===void 0||k.boolean(d.options.overwrite))&&(d.options.ignoreIfExists===void 0||k.boolean(d.options.ignoreIfExists)))&&(d.annotationId===void 0||ye.is(d.annotationId))}p.is=S})(vt=e.CreateFile||(e.CreateFile={}));var M;(function(p){function x(g,d,E,I){var re={kind:"rename",oldUri:g,newUri:d};return E!==void 0&&(E.overwrite!==void 0||E.ignoreIfExists!==void 0)&&(re.options=E),I!==void 0&&(re.annotationId=I),re}p.create=x;function S(g){var d=g;return d&&d.kind==="rename"&&k.string(d.oldUri)&&k.string(d.newUri)&&(d.options===void 0||(d.options.overwrite===void 0||k.boolean(d.options.overwrite))&&(d.options.ignoreIfExists===void 0||k.boolean(d.options.ignoreIfExists)))&&(d.annotationId===void 0||ye.is(d.annotationId))}p.is=S})(M=e.RenameFile||(e.RenameFile={}));var A;(function(p){function x(g,d,E){var I={kind:"delete",uri:g};return d!==void 0&&(d.recursive!==void 0||d.ignoreIfNotExists!==void 0)&&(I.options=d),E!==void 0&&(I.annotationId=E),I}p.create=x;function S(g){var d=g;return d&&d.kind==="delete"&&k.string(d.uri)&&(d.options===void 0||(d.options.recursive===void 0||k.boolean(d.options.recursive))&&(d.options.ignoreIfNotExists===void 0||k.boolean(d.options.ignoreIfNotExists)))&&(d.annotationId===void 0||ye.is(d.annotationId))}p.is=S})(A=e.DeleteFile||(e.DeleteFile={}));var q;(function(p){function x(S){var g=S;return g&&(g.changes!==void 0||g.documentChanges!==void 0)&&(g.documentChanges===void 0||g.documentChanges.every(function(d){return k.string(d.kind)?vt.is(d)||M.is(d)||A.is(d):jt.is(d)}))}p.is=x})(q=e.WorkspaceEdit||(e.WorkspaceEdit={}));var j=function(){function p(x,S){this.edits=x,this.changeAnnotations=S}return p.prototype.insert=function(x,S,g){var d,E;if(g===void 0?d=D.insert(x,S):ye.is(g)?(E=g,d=Ee.insert(x,S,g)):(this.assertChangeAnnotations(this.changeAnnotations),E=this.changeAnnotations.manage(g),d=Ee.insert(x,S,E)),this.edits.push(d),E!==void 0)return E},p.prototype.replace=function(x,S,g){var d,E;if(g===void 0?d=D.replace(x,S):ye.is(g)?(E=g,d=Ee.replace(x,S,g)):(this.assertChangeAnnotations(this.changeAnnotations),E=this.changeAnnotations.manage(g),d=Ee.replace(x,S,E)),this.edits.push(d),E!==void 0)return E},p.prototype.delete=function(x,S){var g,d;if(S===void 0?g=D.del(x):ye.is(S)?(d=S,g=Ee.del(x,S)):(this.assertChangeAnnotations(this.changeAnnotations),d=this.changeAnnotations.manage(S),g=Ee.del(x,d)),this.edits.push(g),d!==void 0)return d},p.prototype.add=function(x){this.edits.push(x)},p.prototype.all=function(){return this.edits},p.prototype.clear=function(){this.edits.splice(0,this.edits.length)},p.prototype.assertChangeAnnotations=function(x){if(x===void 0)throw new Error("Text edit change is not configured to manage change annotations.")},p}(),le=function(){function p(x){this._annotations=x===void 0?Object.create(null):x,this._counter=0,this._size=0}return p.prototype.all=function(){return this._annotations},Object.defineProperty(p.prototype,"size",{get:function(){return this._size},enumerable:!1,configurable:!0}),p.prototype.manage=function(x,S){var g;if(ye.is(x)?g=x:(g=this.nextId(),S=x),this._annotations[g]!==void 0)throw new Error("Id ".concat(g," is already in use."));if(S===void 0)throw new Error("No annotation provided for id ".concat(g));return this._annotations[g]=S,this._size++,g},p.prototype.nextId=function(){return this._counter++,this._counter.toString()},p}(),ee=function(){function p(x){var S=this;this._textEditChanges=Object.create(null),x!==void 0?(this._workspaceEdit=x,x.documentChanges?(this._changeAnnotations=new le(x.changeAnnotations),x.changeAnnotations=this._changeAnnotations.all(),x.documentChanges.forEach(function(g){if(jt.is(g)){var d=new j(g.edits,S._changeAnnotations);S._textEditChanges[g.textDocument.uri]=d}})):x.changes&&Object.keys(x.changes).forEach(function(g){var d=new j(x.changes[g]);S._textEditChanges[g]=d})):this._workspaceEdit={}}return Object.defineProperty(p.prototype,"edit",{get:function(){return this.initDocumentChanges(),this._changeAnnotations!==void 0&&(this._changeAnnotations.size===0?this._workspaceEdit.changeAnnotations=void 0:this._workspaceEdit.changeAnnotations=this._changeAnnotations.all()),this._workspaceEdit},enumerable:!1,configurable:!0}),p.prototype.getTextEditChange=function(x){if(ut.is(x)){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var S={uri:x.uri,version:x.version},g=this._textEditChanges[S.uri];if(!g){var d=[],E={textDocument:S,edits:d};this._workspaceEdit.documentChanges.push(E),g=new j(d,this._changeAnnotations),this._textEditChanges[S.uri]=g}return g}else{if(this.initChanges(),this._workspaceEdit.changes===void 0)throw new Error("Workspace edit is not configured for normal text edit changes.");var g=this._textEditChanges[x];if(!g){var d=[];this._workspaceEdit.changes[x]=d,g=new j(d),this._textEditChanges[x]=g}return g}},p.prototype.initDocumentChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._changeAnnotations=new le,this._workspaceEdit.documentChanges=[],this._workspaceEdit.changeAnnotations=this._changeAnnotations.all())},p.prototype.initChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._workspaceEdit.changes=Object.create(null))},p.prototype.createFile=function(x,S,g){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var d;X.is(S)||ye.is(S)?d=S:g=S;var E,I;if(d===void 0?E=vt.create(x,g):(I=ye.is(d)?d:this._changeAnnotations.manage(d),E=vt.create(x,g,I)),this._workspaceEdit.documentChanges.push(E),I!==void 0)return I},p.prototype.renameFile=function(x,S,g,d){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var E;X.is(g)||ye.is(g)?E=g:d=g;var I,re;if(E===void 0?I=M.create(x,S,d):(re=ye.is(E)?E:this._changeAnnotations.manage(E),I=M.create(x,S,d,re)),this._workspaceEdit.documentChanges.push(I),re!==void 0)return re},p.prototype.deleteFile=function(x,S,g){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var d;X.is(S)||ye.is(S)?d=S:g=S;var E,I;if(d===void 0?E=A.create(x,g):(I=ye.is(d)?d:this._changeAnnotations.manage(d),E=A.create(x,g,I)),this._workspaceEdit.documentChanges.push(E),I!==void 0)return I},p}();e.WorkspaceChange=ee;var Q;(function(p){function x(g){return{uri:g}}p.create=x;function S(g){var d=g;return k.defined(d)&&k.string(d.uri)}p.is=S})(Q=e.TextDocumentIdentifier||(e.TextDocumentIdentifier={}));var Rt;(function(p){function x(g,d){return{uri:g,version:d}}p.create=x;function S(g){var d=g;return k.defined(d)&&k.string(d.uri)&&k.integer(d.version)}p.is=S})(Rt=e.VersionedTextDocumentIdentifier||(e.VersionedTextDocumentIdentifier={}));var ut;(function(p){function x(g,d){return{uri:g,version:d}}p.create=x;function S(g){var d=g;return k.defined(d)&&k.string(d.uri)&&(d.version===null||k.integer(d.version))}p.is=S})(ut=e.OptionalVersionedTextDocumentIdentifier||(e.OptionalVersionedTextDocumentIdentifier={}));var me;(function(p){function x(g,d,E,I){return{uri:g,languageId:d,version:E,text:I}}p.create=x;function S(g){var d=g;return k.defined(d)&&k.string(d.uri)&&k.string(d.languageId)&&k.integer(d.version)&&k.string(d.text)}p.is=S})(me=e.TextDocumentItem||(e.TextDocumentItem={}));var Er;(function(p){p.PlainText="plaintext",p.Markdown="markdown";function x(S){var g=S;return g===p.PlainText||g===p.Markdown}p.is=x})(Er=e.MarkupKind||(e.MarkupKind={}));var Gn;(function(p){function x(S){var g=S;return k.objectLiteral(S)&&Er.is(g.kind)&&k.string(g.value)}p.is=x})(Gn=e.MarkupContent||(e.MarkupContent={}));var ga;(function(p){p.Text=1,p.Method=2,p.Function=3,p.Constructor=4,p.Field=5,p.Variable=6,p.Class=7,p.Interface=8,p.Module=9,p.Property=10,p.Unit=11,p.Value=12,p.Enum=13,p.Keyword=14,p.Snippet=15,p.Color=16,p.File=17,p.Reference=18,p.Folder=19,p.EnumMember=20,p.Constant=21,p.Struct=22,p.Event=23,p.Operator=24,p.TypeParameter=25})(ga=e.CompletionItemKind||(e.CompletionItemKind={}));var Yi;(function(p){p.PlainText=1,p.Snippet=2})(Yi=e.InsertTextFormat||(e.InsertTextFormat={}));var ur;(function(p){p.Deprecated=1})(ur=e.CompletionItemTag||(e.CompletionItemTag={}));var Po;(function(p){function x(g,d,E){return{newText:g,insert:d,replace:E}}p.create=x;function S(g){var d=g;return d&&k.string(d.newText)&&a.is(d.insert)&&a.is(d.replace)}p.is=S})(Po=e.InsertReplaceEdit||(e.InsertReplaceEdit={}));var xt;(function(p){p.asIs=1,p.adjustIndentation=2})(xt=e.InsertTextMode||(e.InsertTextMode={}));var Zt;(function(p){function x(S){var g=S;return g&&(k.string(g.detail)||g.detail===void 0)&&(k.string(g.description)||g.description===void 0)}p.is=x})(Zt=e.CompletionItemLabelDetails||(e.CompletionItemLabelDetails={}));var vn;(function(p){function x(S){return{label:S}}p.create=x})(vn=e.CompletionItem||(e.CompletionItem={}));var Ht;(function(p){function x(S,g){return{items:S||[],isIncomplete:!!g}}p.create=x})(Ht=e.CompletionList||(e.CompletionList={}));var ct;(function(p){function x(g){return g.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}p.fromPlainText=x;function S(g){var d=g;return k.string(d)||k.objectLiteral(d)&&k.string(d.language)&&k.string(d.value)}p.is=S})(ct=e.MarkedString||(e.MarkedString={}));var qr;(function(p){function x(S){var g=S;return!!g&&k.objectLiteral(g)&&(Gn.is(g.contents)||ct.is(g.contents)||k.typedArray(g.contents,ct.is))&&(S.range===void 0||a.is(S.range))}p.is=x})(qr=e.Hover||(e.Hover={}));var $r;(function(p){function x(S,g){return g?{label:S,documentation:g}:{label:S}}p.create=x})($r=e.ParameterInformation||(e.ParameterInformation={}));var vr;(function(p){function x(S,g){for(var d=[],E=2;E<arguments.length;E++)d[E-2]=arguments[E];var I={label:S};return k.defined(g)&&(I.documentation=g),k.defined(d)?I.parameters=d:I.parameters=[],I}p.create=x})(vr=e.SignatureInformation||(e.SignatureInformation={}));var Ji;(function(p){p.Text=1,p.Read=2,p.Write=3})(Ji=e.DocumentHighlightKind||(e.DocumentHighlightKind={}));var Ti;(function(p){function x(S,g){var d={range:S};return k.number(g)&&(d.kind=g),d}p.create=x})(Ti=e.DocumentHighlight||(e.DocumentHighlight={}));var Dd;(function(p){p.File=1,p.Module=2,p.Namespace=3,p.Package=4,p.Class=5,p.Method=6,p.Property=7,p.Field=8,p.Constructor=9,p.Enum=10,p.Interface=11,p.Function=12,p.Variable=13,p.Constant=14,p.String=15,p.Number=16,p.Boolean=17,p.Array=18,p.Object=19,p.Key=20,p.Null=21,p.EnumMember=22,p.Struct=23,p.Event=24,p.Operator=25,p.TypeParameter=26})(Dd=e.SymbolKind||(e.SymbolKind={}));var vi;(function(p){p.Deprecated=1})(vi=e.SymbolTag||(e.SymbolTag={}));var Qi;(function(p){function x(S,g,d,E,I){var re={name:S,kind:g,location:{uri:E,range:d}};return I&&(re.containerName=I),re}p.create=x})(Qi=e.SymbolInformation||(e.SymbolInformation={}));var Od;(function(p){function x(S,g,d,E){return E!==void 0?{name:S,kind:g,location:{uri:d,range:E}}:{name:S,kind:g,location:{uri:d}}}p.create=x})(Od=e.WorkspaceSymbol||(e.WorkspaceSymbol={}));var Ld;(function(p){function x(g,d,E,I,re,ft){var qe={name:g,detail:d,kind:E,range:I,selectionRange:re};return ft!==void 0&&(qe.children=ft),qe}p.create=x;function S(g){var d=g;return d&&k.string(d.name)&&k.number(d.kind)&&a.is(d.range)&&a.is(d.selectionRange)&&(d.detail===void 0||k.string(d.detail))&&(d.deprecated===void 0||k.boolean(d.deprecated))&&(d.children===void 0||Array.isArray(d.children))&&(d.tags===void 0||Array.isArray(d.tags))}p.is=S})(Ld=e.DocumentSymbol||(e.DocumentSymbol={}));var Zi;(function(p){p.Empty="",p.QuickFix="quickfix",p.Refactor="refactor",p.RefactorExtract="refactor.extract",p.RefactorInline="refactor.inline",p.RefactorRewrite="refactor.rewrite",p.Source="source",p.SourceOrganizeImports="source.organizeImports",p.SourceFixAll="source.fixAll"})(Zi=e.CodeActionKind||(e.CodeActionKind={}));var Do;(function(p){p.Invoked=1,p.Automatic=2})(Do=e.CodeActionTriggerKind||(e.CodeActionTriggerKind={}));var jl;(function(p){function x(g,d,E){var I={diagnostics:g};return d!=null&&(I.only=d),E!=null&&(I.triggerKind=E),I}p.create=x;function S(g){var d=g;return k.defined(d)&&k.typedArray(d.diagnostics,y.is)&&(d.only===void 0||k.typedArray(d.only,k.string))&&(d.triggerKind===void 0||d.triggerKind===Do.Invoked||d.triggerKind===Do.Automatic)}p.is=S})(jl=e.CodeActionContext||(e.CodeActionContext={}));var ya;(function(p){function x(g,d,E){var I={title:g},re=!0;return typeof d=="string"?(re=!1,I.kind=d):$.is(d)?I.command=d:I.edit=d,re&&E!==void 0&&(I.kind=E),I}p.create=x;function S(g){var d=g;return d&&k.string(d.title)&&(d.diagnostics===void 0||k.typedArray(d.diagnostics,y.is))&&(d.kind===void 0||k.string(d.kind))&&(d.edit!==void 0||d.command!==void 0)&&(d.command===void 0||$.is(d.command))&&(d.isPreferred===void 0||k.boolean(d.isPreferred))&&(d.edit===void 0||q.is(d.edit))}p.is=S})(ya=e.CodeAction||(e.CodeAction={}));var Hl;(function(p){function x(g,d){var E={range:g};return k.defined(d)&&(E.data=d),E}p.create=x;function S(g){var d=g;return k.defined(d)&&a.is(d.range)&&(k.undefined(d.command)||$.is(d.command))}p.is=S})(Hl=e.CodeLens||(e.CodeLens={}));var Ri;(function(p){function x(g,d){return{tabSize:g,insertSpaces:d}}p.create=x;function S(g){var d=g;return k.defined(d)&&k.uinteger(d.tabSize)&&k.boolean(d.insertSpaces)}p.is=S})(Ri=e.FormattingOptions||(e.FormattingOptions={}));var R;(function(p){function x(g,d,E){return{range:g,target:d,data:E}}p.create=x;function S(g){var d=g;return k.defined(d)&&a.is(d.range)&&(k.undefined(d.target)||k.string(d.target))}p.is=S})(R=e.DocumentLink||(e.DocumentLink={}));var P;(function(p){function x(g,d){return{range:g,parent:d}}p.create=x;function S(g){var d=g;return k.objectLiteral(d)&&a.is(d.range)&&(d.parent===void 0||p.is(d.parent))}p.is=S})(P=e.SelectionRange||(e.SelectionRange={}));var F;(function(p){p.namespace="namespace",p.type="type",p.class="class",p.enum="enum",p.interface="interface",p.struct="struct",p.typeParameter="typeParameter",p.parameter="parameter",p.variable="variable",p.property="property",p.enumMember="enumMember",p.event="event",p.function="function",p.method="method",p.macro="macro",p.keyword="keyword",p.modifier="modifier",p.comment="comment",p.string="string",p.number="number",p.regexp="regexp",p.operator="operator",p.decorator="decorator"})(F=e.SemanticTokenTypes||(e.SemanticTokenTypes={}));var B;(function(p){p.declaration="declaration",p.definition="definition",p.readonly="readonly",p.static="static",p.deprecated="deprecated",p.abstract="abstract",p.async="async",p.modification="modification",p.documentation="documentation",p.defaultLibrary="defaultLibrary"})(B=e.SemanticTokenModifiers||(e.SemanticTokenModifiers={}));var De;(function(p){function x(S){var g=S;return k.objectLiteral(g)&&(g.resultId===void 0||typeof g.resultId=="string")&&Array.isArray(g.data)&&(g.data.length===0||typeof g.data[0]=="number")}p.is=x})(De=e.SemanticTokens||(e.SemanticTokens={}));var Oe;(function(p){function x(g,d){return{range:g,text:d}}p.create=x;function S(g){var d=g;return d!=null&&a.is(d.range)&&k.string(d.text)}p.is=S})(Oe=e.InlineValueText||(e.InlineValueText={}));var Je;(function(p){function x(g,d,E){return{range:g,variableName:d,caseSensitiveLookup:E}}p.create=x;function S(g){var d=g;return d!=null&&a.is(d.range)&&k.boolean(d.caseSensitiveLookup)&&(k.string(d.variableName)||d.variableName===void 0)}p.is=S})(Je=e.InlineValueVariableLookup||(e.InlineValueVariableLookup={}));var St;(function(p){function x(g,d){return{range:g,expression:d}}p.create=x;function S(g){var d=g;return d!=null&&a.is(d.range)&&(k.string(d.expression)||d.expression===void 0)}p.is=S})(St=e.InlineValueEvaluatableExpression||(e.InlineValueEvaluatableExpression={}));var ce;(function(p){function x(g,d){return{frameId:g,stoppedLocation:d}}p.create=x;function S(g){var d=g;return k.defined(d)&&a.is(g.stoppedLocation)}p.is=S})(ce=e.InlineValueContext||(e.InlineValueContext={}));var Ue;(function(p){p.Type=1,p.Parameter=2;function x(S){return S===1||S===2}p.is=x})(Ue=e.InlayHintKind||(e.InlayHintKind={}));var Te;(function(p){function x(g){return{value:g}}p.create=x;function S(g){var d=g;return k.objectLiteral(d)&&(d.tooltip===void 0||k.string(d.tooltip)||Gn.is(d.tooltip))&&(d.location===void 0||l.is(d.location))&&(d.command===void 0||$.is(d.command))}p.is=S})(Te=e.InlayHintLabelPart||(e.InlayHintLabelPart={}));var ht;(function(p){function x(g,d,E){var I={position:g,label:d};return E!==void 0&&(I.kind=E),I}p.create=x;function S(g){var d=g;return k.objectLiteral(d)&&s.is(d.position)&&(k.string(d.label)||k.typedArray(d.label,Te.is))&&(d.kind===void 0||Ue.is(d.kind))&&d.textEdits===void 0||k.typedArray(d.textEdits,D.is)&&(d.tooltip===void 0||k.string(d.tooltip)||Gn.is(d.tooltip))&&(d.paddingLeft===void 0||k.boolean(d.paddingLeft))&&(d.paddingRight===void 0||k.boolean(d.paddingRight))}p.is=S})(ht=e.InlayHint||(e.InlayHint={}));var er;(function(p){function x(S){var g=S;return k.objectLiteral(g)&&n.is(g.uri)&&k.string(g.name)}p.is=x})(er=e.WorkspaceFolder||(e.WorkspaceFolder={})),e.EOL=[`
`,`\r
`,"\r"];var jn;(function(p){function x(E,I,re,ft){return new Rn(E,I,re,ft)}p.create=x;function S(E){var I=E;return!!(k.defined(I)&&k.string(I.uri)&&(k.undefined(I.languageId)||k.string(I.languageId))&&k.uinteger(I.lineCount)&&k.func(I.getText)&&k.func(I.positionAt)&&k.func(I.offsetAt))}p.is=S;function g(E,I){for(var re=E.getText(),ft=d(I,function(Oo,Kl){var gg=Oo.range.start.line-Kl.range.start.line;return gg===0?Oo.range.start.character-Kl.range.start.character:gg}),qe=re.length,Zr=ft.length-1;Zr>=0;Zr--){var en=ft[Zr],Hn=E.offsetAt(en.range.start),fe=E.offsetAt(en.range.end);if(fe<=qe)re=re.substring(0,Hn)+en.newText+re.substring(fe,re.length);else throw new Error("Overlapping edit");qe=Hn}return re}p.applyEdits=g;function d(E,I){if(E.length<=1)return E;var re=E.length/2|0,ft=E.slice(0,re),qe=E.slice(re);d(ft,I),d(qe,I);for(var Zr=0,en=0,Hn=0;Zr<ft.length&&en<qe.length;){var fe=I(ft[Zr],qe[en]);fe<=0?E[Hn++]=ft[Zr++]:E[Hn++]=qe[en++]}for(;Zr<ft.length;)E[Hn++]=ft[Zr++];for(;en<qe.length;)E[Hn++]=qe[en++];return E}})(jn=e.TextDocument||(e.TextDocument={}));var Rn=function(){function p(x,S,g,d){this._uri=x,this._languageId=S,this._version=g,this._content=d,this._lineOffsets=void 0}return Object.defineProperty(p.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(p.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(p.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),p.prototype.getText=function(x){if(x){var S=this.offsetAt(x.start),g=this.offsetAt(x.end);return this._content.substring(S,g)}return this._content},p.prototype.update=function(x,S){this._content=x.text,this._version=S,this._lineOffsets=void 0},p.prototype.getLineOffsets=function(){if(this._lineOffsets===void 0){for(var x=[],S=this._content,g=!0,d=0;d<S.length;d++){g&&(x.push(d),g=!1);var E=S.charAt(d);g=E==="\r"||E===`
`,E==="\r"&&d+1<S.length&&S.charAt(d+1)===`
`&&d++}g&&S.length>0&&x.push(S.length),this._lineOffsets=x}return this._lineOffsets},p.prototype.positionAt=function(x){x=Math.max(Math.min(x,this._content.length),0);var S=this.getLineOffsets(),g=0,d=S.length;if(d===0)return s.create(0,x);for(;g<d;){var E=Math.floor((g+d)/2);S[E]>x?d=E:g=E+1}var I=g-1;return s.create(I,x-S[I])},p.prototype.offsetAt=function(x){var S=this.getLineOffsets();if(x.line>=S.length)return this._content.length;if(x.line<0)return 0;var g=S[x.line],d=x.line+1<S.length?S[x.line+1]:this._content.length;return Math.max(Math.min(g+x.character,d),g)},Object.defineProperty(p.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),p}(),k;(function(p){var x=Object.prototype.toString;function S(fe){return typeof fe<"u"}p.defined=S;function g(fe){return typeof fe>"u"}p.undefined=g;function d(fe){return fe===!0||fe===!1}p.boolean=d;function E(fe){return x.call(fe)==="[object String]"}p.string=E;function I(fe){return x.call(fe)==="[object Number]"}p.number=I;function re(fe,Oo,Kl){return x.call(fe)==="[object Number]"&&Oo<=fe&&fe<=Kl}p.numberRange=re;function ft(fe){return x.call(fe)==="[object Number]"&&-2147483648<=fe&&fe<=2147483647}p.integer=ft;function qe(fe){return x.call(fe)==="[object Number]"&&0<=fe&&fe<=2147483647}p.uinteger=qe;function Zr(fe){return x.call(fe)==="[object Function]"}p.func=Zr;function en(fe){return fe!==null&&typeof fe=="object"}p.objectLiteral=en;function Hn(fe,Oo){return Array.isArray(fe)&&fe.every(Oo)}p.typedArray=Hn})(k||(k={}))})});var nt=H(fr=>{"use strict";Object.defineProperty(fr,"__esModule",{value:!0});fr.ProtocolNotificationType=fr.ProtocolNotificationType0=fr.ProtocolRequestType=fr.ProtocolRequestType0=fr.RegistrationType=fr.MessageDirection=void 0;var Go=Vn(),Pw;(function(t){t.clientToServer="clientToServer",t.serverToClient="serverToClient",t.both="both"})(Pw=fr.MessageDirection||(fr.MessageDirection={}));var Wp=class{constructor(e){this.method=e}};fr.RegistrationType=Wp;var Bp=class extends Go.RequestType0{constructor(e){super(e)}};fr.ProtocolRequestType0=Bp;var zp=class extends Go.RequestType{constructor(e){super(e,Go.ParameterStructures.byName)}};fr.ProtocolRequestType=zp;var Vp=class extends Go.NotificationType0{constructor(e){super(e)}};fr.ProtocolNotificationType0=Vp;var Xp=class extends Go.NotificationType{constructor(e){super(e,Go.ParameterStructures.byName)}};fr.ProtocolNotificationType=Xp});var tu=H(bt=>{"use strict";Object.defineProperty(bt,"__esModule",{value:!0});bt.objectLiteral=bt.typedArray=bt.stringArray=bt.array=bt.func=bt.error=bt.number=bt.string=bt.boolean=void 0;function Dw(t){return t===!0||t===!1}bt.boolean=Dw;function jg(t){return typeof t=="string"||t instanceof String}bt.string=jg;function Ow(t){return typeof t=="number"||t instanceof Number}bt.number=Ow;function Lw(t){return t instanceof Error}bt.error=Lw;function Mw(t){return typeof t=="function"}bt.func=Mw;function Hg(t){return Array.isArray(t)}bt.array=Hg;function Fw(t){return Hg(t)&&t.every(e=>jg(e))}bt.stringArray=Fw;function Uw(t,e){return Array.isArray(t)&&t.every(e)}bt.typedArray=Uw;function qw(t){return t!==null&&typeof t=="object"}bt.objectLiteral=qw});var Wg=H(ba=>{"use strict";Object.defineProperty(ba,"__esModule",{value:!0});ba.ImplementationRequest=void 0;var Kg=nt(),Gw;(function(t){t.method="textDocument/implementation",t.messageDirection=Kg.MessageDirection.clientToServer,t.type=new Kg.ProtocolRequestType(t.method)})(Gw=ba.ImplementationRequest||(ba.ImplementationRequest={}))});var zg=H(Aa=>{"use strict";Object.defineProperty(Aa,"__esModule",{value:!0});Aa.TypeDefinitionRequest=void 0;var Bg=nt(),jw;(function(t){t.method="textDocument/typeDefinition",t.messageDirection=Bg.MessageDirection.clientToServer,t.type=new Bg.ProtocolRequestType(t.method)})(jw=Aa.TypeDefinitionRequest||(Aa.TypeDefinitionRequest={}))});var Vg=H(xi=>{"use strict";Object.defineProperty(xi,"__esModule",{value:!0});xi.DidChangeWorkspaceFoldersNotification=xi.WorkspaceFoldersRequest=void 0;var ru=nt(),Hw;(function(t){t.method="workspace/workspaceFolders",t.messageDirection=ru.MessageDirection.serverToClient,t.type=new ru.ProtocolRequestType0(t.method)})(Hw=xi.WorkspaceFoldersRequest||(xi.WorkspaceFoldersRequest={}));var Kw;(function(t){t.method="workspace/didChangeWorkspaceFolders",t.messageDirection=ru.MessageDirection.clientToServer,t.type=new ru.ProtocolNotificationType(t.method)})(Kw=xi.DidChangeWorkspaceFoldersNotification||(xi.DidChangeWorkspaceFoldersNotification={}))});var Yg=H(Ca=>{"use strict";Object.defineProperty(Ca,"__esModule",{value:!0});Ca.ConfigurationRequest=void 0;var Xg=nt(),Ww;(function(t){t.method="workspace/configuration",t.messageDirection=Xg.MessageDirection.serverToClient,t.type=new Xg.ProtocolRequestType(t.method)})(Ww=Ca.ConfigurationRequest||(Ca.ConfigurationRequest={}))});var Jg=H(Si=>{"use strict";Object.defineProperty(Si,"__esModule",{value:!0});Si.ColorPresentationRequest=Si.DocumentColorRequest=void 0;var nu=nt(),Bw;(function(t){t.method="textDocument/documentColor",t.messageDirection=nu.MessageDirection.clientToServer,t.type=new nu.ProtocolRequestType(t.method)})(Bw=Si.DocumentColorRequest||(Si.DocumentColorRequest={}));var zw;(function(t){t.method="textDocument/colorPresentation",t.messageDirection=nu.MessageDirection.clientToServer,t.type=new nu.ProtocolRequestType(t.method)})(zw=Si.ColorPresentationRequest||(Si.ColorPresentationRequest={}))});var Zg=H(wa=>{"use strict";Object.defineProperty(wa,"__esModule",{value:!0});wa.FoldingRangeRequest=void 0;var Qg=nt(),Vw;(function(t){t.method="textDocument/foldingRange",t.messageDirection=Qg.MessageDirection.clientToServer,t.type=new Qg.ProtocolRequestType(t.method)})(Vw=wa.FoldingRangeRequest||(wa.FoldingRangeRequest={}))});var ty=H(ka=>{"use strict";Object.defineProperty(ka,"__esModule",{value:!0});ka.DeclarationRequest=void 0;var ey=nt(),Xw;(function(t){t.method="textDocument/declaration",t.messageDirection=ey.MessageDirection.clientToServer,t.type=new ey.ProtocolRequestType(t.method)})(Xw=ka.DeclarationRequest||(ka.DeclarationRequest={}))});var ny=H(Ea=>{"use strict";Object.defineProperty(Ea,"__esModule",{value:!0});Ea.SelectionRangeRequest=void 0;var ry=nt(),Yw;(function(t){t.method="textDocument/selectionRange",t.messageDirection=ry.MessageDirection.clientToServer,t.type=new ry.ProtocolRequestType(t.method)})(Yw=Ea.SelectionRangeRequest||(Ea.SelectionRangeRequest={}))});var iy=H(nn=>{"use strict";Object.defineProperty(nn,"__esModule",{value:!0});nn.WorkDoneProgressCancelNotification=nn.WorkDoneProgressCreateRequest=nn.WorkDoneProgress=void 0;var Jw=Vn(),iu=nt(),Qw;(function(t){t.type=new Jw.ProgressType;function e(r){return r===t.type}t.is=e})(Qw=nn.WorkDoneProgress||(nn.WorkDoneProgress={}));var Zw;(function(t){t.method="window/workDoneProgress/create",t.messageDirection=iu.MessageDirection.serverToClient,t.type=new iu.ProtocolRequestType(t.method)})(Zw=nn.WorkDoneProgressCreateRequest||(nn.WorkDoneProgressCreateRequest={}));var ek;(function(t){t.method="window/workDoneProgress/cancel",t.messageDirection=iu.MessageDirection.clientToServer,t.type=new iu.ProtocolNotificationType(t.method)})(ek=nn.WorkDoneProgressCancelNotification||(nn.WorkDoneProgressCancelNotification={}))});var oy=H(on=>{"use strict";Object.defineProperty(on,"__esModule",{value:!0});on.CallHierarchyOutgoingCallsRequest=on.CallHierarchyIncomingCallsRequest=on.CallHierarchyPrepareRequest=void 0;var jo=nt(),tk;(function(t){t.method="textDocument/prepareCallHierarchy",t.messageDirection=jo.MessageDirection.clientToServer,t.type=new jo.ProtocolRequestType(t.method)})(tk=on.CallHierarchyPrepareRequest||(on.CallHierarchyPrepareRequest={}));var rk;(function(t){t.method="callHierarchy/incomingCalls",t.messageDirection=jo.MessageDirection.clientToServer,t.type=new jo.ProtocolRequestType(t.method)})(rk=on.CallHierarchyIncomingCallsRequest||(on.CallHierarchyIncomingCallsRequest={}));var nk;(function(t){t.method="callHierarchy/outgoingCalls",t.messageDirection=jo.MessageDirection.clientToServer,t.type=new jo.ProtocolRequestType(t.method)})(nk=on.CallHierarchyOutgoingCallsRequest||(on.CallHierarchyOutgoingCallsRequest={}))});var sy=H(At=>{"use strict";Object.defineProperty(At,"__esModule",{value:!0});At.SemanticTokensRefreshRequest=At.SemanticTokensRangeRequest=At.SemanticTokensDeltaRequest=At.SemanticTokensRequest=At.SemanticTokensRegistrationType=At.TokenFormat=void 0;var Xn=nt(),ik;(function(t){t.Relative="relative"})(ik=At.TokenFormat||(At.TokenFormat={}));var ou;(function(t){t.method="textDocument/semanticTokens",t.type=new Xn.RegistrationType(t.method)})(ou=At.SemanticTokensRegistrationType||(At.SemanticTokensRegistrationType={}));var ok;(function(t){t.method="textDocument/semanticTokens/full",t.messageDirection=Xn.MessageDirection.clientToServer,t.type=new Xn.ProtocolRequestType(t.method),t.registrationMethod=ou.method})(ok=At.SemanticTokensRequest||(At.SemanticTokensRequest={}));var sk;(function(t){t.method="textDocument/semanticTokens/full/delta",t.messageDirection=Xn.MessageDirection.clientToServer,t.type=new Xn.ProtocolRequestType(t.method),t.registrationMethod=ou.method})(sk=At.SemanticTokensDeltaRequest||(At.SemanticTokensDeltaRequest={}));var ak;(function(t){t.method="textDocument/semanticTokens/range",t.messageDirection=Xn.MessageDirection.clientToServer,t.type=new Xn.ProtocolRequestType(t.method),t.registrationMethod=ou.method})(ak=At.SemanticTokensRangeRequest||(At.SemanticTokensRangeRequest={}));var lk;(function(t){t.method="workspace/semanticTokens/refresh",t.messageDirection=Xn.MessageDirection.clientToServer,t.type=new Xn.ProtocolRequestType0(t.method)})(lk=At.SemanticTokensRefreshRequest||(At.SemanticTokensRefreshRequest={}))});var ly=H($a=>{"use strict";Object.defineProperty($a,"__esModule",{value:!0});$a.ShowDocumentRequest=void 0;var ay=nt(),uk;(function(t){t.method="window/showDocument",t.messageDirection=ay.MessageDirection.serverToClient,t.type=new ay.ProtocolRequestType(t.method)})(uk=$a.ShowDocumentRequest||($a.ShowDocumentRequest={}))});var cy=H(_a=>{"use strict";Object.defineProperty(_a,"__esModule",{value:!0});_a.LinkedEditingRangeRequest=void 0;var uy=nt(),ck;(function(t){t.method="textDocument/linkedEditingRange",t.messageDirection=uy.MessageDirection.clientToServer,t.type=new uy.ProtocolRequestType(t.method)})(ck=_a.LinkedEditingRangeRequest||(_a.LinkedEditingRangeRequest={}))});var fy=H(it=>{"use strict";Object.defineProperty(it,"__esModule",{value:!0});it.WillDeleteFilesRequest=it.DidDeleteFilesNotification=it.DidRenameFilesNotification=it.WillRenameFilesRequest=it.DidCreateFilesNotification=it.WillCreateFilesRequest=it.FileOperationPatternKind=void 0;var Gr=nt(),fk;(function(t){t.file="file",t.folder="folder"})(fk=it.FileOperationPatternKind||(it.FileOperationPatternKind={}));var dk;(function(t){t.method="workspace/willCreateFiles",t.messageDirection=Gr.MessageDirection.clientToServer,t.type=new Gr.ProtocolRequestType(t.method)})(dk=it.WillCreateFilesRequest||(it.WillCreateFilesRequest={}));var pk;(function(t){t.method="workspace/didCreateFiles",t.messageDirection=Gr.MessageDirection.clientToServer,t.type=new Gr.ProtocolNotificationType(t.method)})(pk=it.DidCreateFilesNotification||(it.DidCreateFilesNotification={}));var mk;(function(t){t.method="workspace/willRenameFiles",t.messageDirection=Gr.MessageDirection.clientToServer,t.type=new Gr.ProtocolRequestType(t.method)})(mk=it.WillRenameFilesRequest||(it.WillRenameFilesRequest={}));var hk;(function(t){t.method="workspace/didRenameFiles",t.messageDirection=Gr.MessageDirection.clientToServer,t.type=new Gr.ProtocolNotificationType(t.method)})(hk=it.DidRenameFilesNotification||(it.DidRenameFilesNotification={}));var gk;(function(t){t.method="workspace/didDeleteFiles",t.messageDirection=Gr.MessageDirection.clientToServer,t.type=new Gr.ProtocolNotificationType(t.method)})(gk=it.DidDeleteFilesNotification||(it.DidDeleteFilesNotification={}));var yk;(function(t){t.method="workspace/willDeleteFiles",t.messageDirection=Gr.MessageDirection.clientToServer,t.type=new Gr.ProtocolRequestType(t.method)})(yk=it.WillDeleteFilesRequest||(it.WillDeleteFilesRequest={}))});var py=H(sn=>{"use strict";Object.defineProperty(sn,"__esModule",{value:!0});sn.MonikerRequest=sn.MonikerKind=sn.UniquenessLevel=void 0;var dy=nt(),Tk;(function(t){t.document="document",t.project="project",t.group="group",t.scheme="scheme",t.global="global"})(Tk=sn.UniquenessLevel||(sn.UniquenessLevel={}));var vk;(function(t){t.$import="import",t.$export="export",t.local="local"})(vk=sn.MonikerKind||(sn.MonikerKind={}));var Rk;(function(t){t.method="textDocument/moniker",t.messageDirection=dy.MessageDirection.clientToServer,t.type=new dy.ProtocolRequestType(t.method)})(Rk=sn.MonikerRequest||(sn.MonikerRequest={}))});var my=H(an=>{"use strict";Object.defineProperty(an,"__esModule",{value:!0});an.TypeHierarchySubtypesRequest=an.TypeHierarchySupertypesRequest=an.TypeHierarchyPrepareRequest=void 0;var Ho=nt(),xk;(function(t){t.method="textDocument/prepareTypeHierarchy",t.messageDirection=Ho.MessageDirection.clientToServer,t.type=new Ho.ProtocolRequestType(t.method)})(xk=an.TypeHierarchyPrepareRequest||(an.TypeHierarchyPrepareRequest={}));var Sk;(function(t){t.method="typeHierarchy/supertypes",t.messageDirection=Ho.MessageDirection.clientToServer,t.type=new Ho.ProtocolRequestType(t.method)})(Sk=an.TypeHierarchySupertypesRequest||(an.TypeHierarchySupertypesRequest={}));var bk;(function(t){t.method="typeHierarchy/subtypes",t.messageDirection=Ho.MessageDirection.clientToServer,t.type=new Ho.ProtocolRequestType(t.method)})(bk=an.TypeHierarchySubtypesRequest||(an.TypeHierarchySubtypesRequest={}))});var hy=H(bi=>{"use strict";Object.defineProperty(bi,"__esModule",{value:!0});bi.InlineValueRefreshRequest=bi.InlineValueRequest=void 0;var su=nt(),Ak;(function(t){t.method="textDocument/inlineValue",t.messageDirection=su.MessageDirection.clientToServer,t.type=new su.ProtocolRequestType(t.method)})(Ak=bi.InlineValueRequest||(bi.InlineValueRequest={}));var Ck;(function(t){t.method="workspace/inlineValue/refresh",t.messageDirection=su.MessageDirection.clientToServer,t.type=new su.ProtocolRequestType0(t.method)})(Ck=bi.InlineValueRefreshRequest||(bi.InlineValueRefreshRequest={}))});var gy=H(ln=>{"use strict";Object.defineProperty(ln,"__esModule",{value:!0});ln.InlayHintRefreshRequest=ln.InlayHintResolveRequest=ln.InlayHintRequest=void 0;var Ko=nt(),wk;(function(t){t.method="textDocument/inlayHint",t.messageDirection=Ko.MessageDirection.clientToServer,t.type=new Ko.ProtocolRequestType(t.method)})(wk=ln.InlayHintRequest||(ln.InlayHintRequest={}));var kk;(function(t){t.method="inlayHint/resolve",t.messageDirection=Ko.MessageDirection.clientToServer,t.type=new Ko.ProtocolRequestType(t.method)})(kk=ln.InlayHintResolveRequest||(ln.InlayHintResolveRequest={}));var Ek;(function(t){t.method="workspace/inlayHint/refresh",t.messageDirection=Ko.MessageDirection.clientToServer,t.type=new Ko.ProtocolRequestType0(t.method)})(Ek=ln.InlayHintRefreshRequest||(ln.InlayHintRefreshRequest={}))});var Ty=H(Kt=>{"use strict";Object.defineProperty(Kt,"__esModule",{value:!0});Kt.DiagnosticRefreshRequest=Kt.WorkspaceDiagnosticRequest=Kt.DocumentDiagnosticRequest=Kt.DocumentDiagnosticReportKind=Kt.DiagnosticServerCancellationData=void 0;var yy=Vn(),$k=tu(),Wo=nt(),_k;(function(t){function e(r){let n=r;return n&&$k.boolean(n.retriggerRequest)}t.is=e})(_k=Kt.DiagnosticServerCancellationData||(Kt.DiagnosticServerCancellationData={}));var Nk;(function(t){t.Full="full",t.Unchanged="unchanged"})(Nk=Kt.DocumentDiagnosticReportKind||(Kt.DocumentDiagnosticReportKind={}));var Ik;(function(t){t.method="textDocument/diagnostic",t.messageDirection=Wo.MessageDirection.clientToServer,t.type=new Wo.ProtocolRequestType(t.method),t.partialResult=new yy.ProgressType})(Ik=Kt.DocumentDiagnosticRequest||(Kt.DocumentDiagnosticRequest={}));var Pk;(function(t){t.method="workspace/diagnostic",t.messageDirection=Wo.MessageDirection.clientToServer,t.type=new Wo.ProtocolRequestType(t.method),t.partialResult=new yy.ProgressType})(Pk=Kt.WorkspaceDiagnosticRequest||(Kt.WorkspaceDiagnosticRequest={}));var Dk;(function(t){t.method="workspace/diagnostic/refresh",t.messageDirection=Wo.MessageDirection.clientToServer,t.type=new Wo.ProtocolRequestType0(t.method)})(Dk=Kt.DiagnosticRefreshRequest||(Kt.DiagnosticRefreshRequest={}))});var xy=H(Re=>{"use strict";Object.defineProperty(Re,"__esModule",{value:!0});Re.DidCloseNotebookDocumentNotification=Re.DidSaveNotebookDocumentNotification=Re.DidChangeNotebookDocumentNotification=Re.NotebookCellArrayChange=Re.DidOpenNotebookDocumentNotification=Re.NotebookDocumentSyncRegistrationType=Re.NotebookDocument=Re.NotebookCell=Re.ExecutionSummary=Re.NotebookCellKind=void 0;var Na=io(),un=tu(),xn=nt(),vy;(function(t){t.Markup=1,t.Code=2;function e(r){return r===1||r===2}t.is=e})(vy=Re.NotebookCellKind||(Re.NotebookCellKind={}));var Ry;(function(t){function e(i,o){let s={executionOrder:i};return(o===!0||o===!1)&&(s.success=o),s}t.create=e;function r(i){let o=i;return un.objectLiteral(o)&&Na.uinteger.is(o.executionOrder)&&(o.success===void 0||un.boolean(o.success))}t.is=r;function n(i,o){return i===o?!0:i==null||o===null||o===void 0?!1:i.executionOrder===o.executionOrder&&i.success===o.success}t.equals=n})(Ry=Re.ExecutionSummary||(Re.ExecutionSummary={}));var Yp;(function(t){function e(o,s){return{kind:o,document:s}}t.create=e;function r(o){let s=o;return un.objectLiteral(s)&&vy.is(s.kind)&&Na.DocumentUri.is(s.document)&&(s.metadata===void 0||un.objectLiteral(s.metadata))}t.is=r;function n(o,s){let a=new Set;return o.document!==s.document&&a.add("document"),o.kind!==s.kind&&a.add("kind"),o.executionSummary!==s.executionSummary&&a.add("executionSummary"),(o.metadata!==void 0||s.metadata!==void 0)&&!i(o.metadata,s.metadata)&&a.add("metadata"),(o.executionSummary!==void 0||s.executionSummary!==void 0)&&!Ry.equals(o.executionSummary,s.executionSummary)&&a.add("executionSummary"),a}t.diff=n;function i(o,s){if(o===s)return!0;if(o==null||s===null||s===void 0||typeof o!=typeof s||typeof o!="object")return!1;let a=Array.isArray(o),l=Array.isArray(s);if(a!==l)return!1;if(a&&l){if(o.length!==s.length)return!1;for(let u=0;u<o.length;u++)if(!i(o[u],s[u]))return!1}if(un.objectLiteral(o)&&un.objectLiteral(s)){let u=Object.keys(o),c=Object.keys(s);if(u.length!==c.length||(u.sort(),c.sort(),!i(u,c)))return!1;for(let f=0;f<u.length;f++){let m=u[f];if(!i(o[m],s[m]))return!1}}return!0}})(Yp=Re.NotebookCell||(Re.NotebookCell={}));var Ok;(function(t){function e(n,i,o,s){return{uri:n,notebookType:i,version:o,cells:s}}t.create=e;function r(n){let i=n;return un.objectLiteral(i)&&un.string(i.uri)&&Na.integer.is(i.version)&&un.typedArray(i.cells,Yp.is)}t.is=r})(Ok=Re.NotebookDocument||(Re.NotebookDocument={}));var Ia;(function(t){t.method="notebookDocument/sync",t.messageDirection=xn.MessageDirection.clientToServer,t.type=new xn.RegistrationType(t.method)})(Ia=Re.NotebookDocumentSyncRegistrationType||(Re.NotebookDocumentSyncRegistrationType={}));var Lk;(function(t){t.method="notebookDocument/didOpen",t.messageDirection=xn.MessageDirection.clientToServer,t.type=new xn.ProtocolNotificationType(t.method),t.registrationMethod=Ia.method})(Lk=Re.DidOpenNotebookDocumentNotification||(Re.DidOpenNotebookDocumentNotification={}));var Mk;(function(t){function e(n){let i=n;return un.objectLiteral(i)&&Na.uinteger.is(i.start)&&Na.uinteger.is(i.deleteCount)&&(i.cells===void 0||un.typedArray(i.cells,Yp.is))}t.is=e;function r(n,i,o){let s={start:n,deleteCount:i};return o!==void 0&&(s.cells=o),s}t.create=r})(Mk=Re.NotebookCellArrayChange||(Re.NotebookCellArrayChange={}));var Fk;(function(t){t.method="notebookDocument/didChange",t.messageDirection=xn.MessageDirection.clientToServer,t.type=new xn.ProtocolNotificationType(t.method),t.registrationMethod=Ia.method})(Fk=Re.DidChangeNotebookDocumentNotification||(Re.DidChangeNotebookDocumentNotification={}));var Uk;(function(t){t.method="notebookDocument/didSave",t.messageDirection=xn.MessageDirection.clientToServer,t.type=new xn.ProtocolNotificationType(t.method),t.registrationMethod=Ia.method})(Uk=Re.DidSaveNotebookDocumentNotification||(Re.DidSaveNotebookDocumentNotification={}));var qk;(function(t){t.method="notebookDocument/didClose",t.messageDirection=xn.MessageDirection.clientToServer,t.type=new xn.ProtocolNotificationType(t.method),t.registrationMethod=Ia.method})(qk=Re.DidCloseNotebookDocumentNotification||(Re.DidCloseNotebookDocumentNotification={}))});var _y=H(h=>{"use strict";Object.defineProperty(h,"__esModule",{value:!0});h.WorkspaceSymbolRequest=h.CodeActionResolveRequest=h.CodeActionRequest=h.DocumentSymbolRequest=h.DocumentHighlightRequest=h.ReferencesRequest=h.DefinitionRequest=h.SignatureHelpRequest=h.SignatureHelpTriggerKind=h.HoverRequest=h.CompletionResolveRequest=h.CompletionRequest=h.CompletionTriggerKind=h.PublishDiagnosticsNotification=h.WatchKind=h.RelativePattern=h.FileChangeType=h.DidChangeWatchedFilesNotification=h.WillSaveTextDocumentWaitUntilRequest=h.WillSaveTextDocumentNotification=h.TextDocumentSaveReason=h.DidSaveTextDocumentNotification=h.DidCloseTextDocumentNotification=h.DidChangeTextDocumentNotification=h.TextDocumentContentChangeEvent=h.DidOpenTextDocumentNotification=h.TextDocumentSyncKind=h.TelemetryEventNotification=h.LogMessageNotification=h.ShowMessageRequest=h.ShowMessageNotification=h.MessageType=h.DidChangeConfigurationNotification=h.ExitNotification=h.ShutdownRequest=h.InitializedNotification=h.InitializeErrorCodes=h.InitializeRequest=h.WorkDoneProgressOptions=h.TextDocumentRegistrationOptions=h.StaticRegistrationOptions=h.PositionEncodingKind=h.FailureHandlingKind=h.ResourceOperationKind=h.UnregistrationRequest=h.RegistrationRequest=h.DocumentSelector=h.NotebookCellTextDocumentFilter=h.NotebookDocumentFilter=h.TextDocumentFilter=void 0;h.TypeHierarchySubtypesRequest=h.TypeHierarchyPrepareRequest=h.MonikerRequest=h.MonikerKind=h.UniquenessLevel=h.WillDeleteFilesRequest=h.DidDeleteFilesNotification=h.WillRenameFilesRequest=h.DidRenameFilesNotification=h.WillCreateFilesRequest=h.DidCreateFilesNotification=h.FileOperationPatternKind=h.LinkedEditingRangeRequest=h.ShowDocumentRequest=h.SemanticTokensRegistrationType=h.SemanticTokensRefreshRequest=h.SemanticTokensRangeRequest=h.SemanticTokensDeltaRequest=h.SemanticTokensRequest=h.TokenFormat=h.CallHierarchyPrepareRequest=h.CallHierarchyOutgoingCallsRequest=h.CallHierarchyIncomingCallsRequest=h.WorkDoneProgressCancelNotification=h.WorkDoneProgressCreateRequest=h.WorkDoneProgress=h.SelectionRangeRequest=h.DeclarationRequest=h.FoldingRangeRequest=h.ColorPresentationRequest=h.DocumentColorRequest=h.ConfigurationRequest=h.DidChangeWorkspaceFoldersNotification=h.WorkspaceFoldersRequest=h.TypeDefinitionRequest=h.ImplementationRequest=h.ApplyWorkspaceEditRequest=h.ExecuteCommandRequest=h.PrepareRenameRequest=h.RenameRequest=h.PrepareSupportDefaultBehavior=h.DocumentOnTypeFormattingRequest=h.DocumentRangeFormattingRequest=h.DocumentFormattingRequest=h.DocumentLinkResolveRequest=h.DocumentLinkRequest=h.CodeLensRefreshRequest=h.CodeLensResolveRequest=h.CodeLensRequest=h.WorkspaceSymbolResolveRequest=void 0;h.DidCloseNotebookDocumentNotification=h.DidSaveNotebookDocumentNotification=h.DidChangeNotebookDocumentNotification=h.NotebookCellArrayChange=h.DidOpenNotebookDocumentNotification=h.NotebookDocumentSyncRegistrationType=h.NotebookDocument=h.NotebookCell=h.ExecutionSummary=h.NotebookCellKind=h.DiagnosticRefreshRequest=h.WorkspaceDiagnosticRequest=h.DocumentDiagnosticRequest=h.DocumentDiagnosticReportKind=h.DiagnosticServerCancellationData=h.InlayHintRefreshRequest=h.InlayHintResolveRequest=h.InlayHintRequest=h.InlineValueRefreshRequest=h.InlineValueRequest=h.TypeHierarchySupertypesRequest=void 0;var O=nt(),Sy=io(),Wt=tu(),Gk=Wg();Object.defineProperty(h,"ImplementationRequest",{enumerable:!0,get:function(){return Gk.ImplementationRequest}});var jk=zg();Object.defineProperty(h,"TypeDefinitionRequest",{enumerable:!0,get:function(){return jk.TypeDefinitionRequest}});var by=Vg();Object.defineProperty(h,"WorkspaceFoldersRequest",{enumerable:!0,get:function(){return by.WorkspaceFoldersRequest}});Object.defineProperty(h,"DidChangeWorkspaceFoldersNotification",{enumerable:!0,get:function(){return by.DidChangeWorkspaceFoldersNotification}});var Hk=Yg();Object.defineProperty(h,"ConfigurationRequest",{enumerable:!0,get:function(){return Hk.ConfigurationRequest}});var Ay=Jg();Object.defineProperty(h,"DocumentColorRequest",{enumerable:!0,get:function(){return Ay.DocumentColorRequest}});Object.defineProperty(h,"ColorPresentationRequest",{enumerable:!0,get:function(){return Ay.ColorPresentationRequest}});var Kk=Zg();Object.defineProperty(h,"FoldingRangeRequest",{enumerable:!0,get:function(){return Kk.FoldingRangeRequest}});var Wk=ty();Object.defineProperty(h,"DeclarationRequest",{enumerable:!0,get:function(){return Wk.DeclarationRequest}});var Bk=ny();Object.defineProperty(h,"SelectionRangeRequest",{enumerable:!0,get:function(){return Bk.SelectionRangeRequest}});var Jp=iy();Object.defineProperty(h,"WorkDoneProgress",{enumerable:!0,get:function(){return Jp.WorkDoneProgress}});Object.defineProperty(h,"WorkDoneProgressCreateRequest",{enumerable:!0,get:function(){return Jp.WorkDoneProgressCreateRequest}});Object.defineProperty(h,"WorkDoneProgressCancelNotification",{enumerable:!0,get:function(){return Jp.WorkDoneProgressCancelNotification}});var Qp=oy();Object.defineProperty(h,"CallHierarchyIncomingCallsRequest",{enumerable:!0,get:function(){return Qp.CallHierarchyIncomingCallsRequest}});Object.defineProperty(h,"CallHierarchyOutgoingCallsRequest",{enumerable:!0,get:function(){return Qp.CallHierarchyOutgoingCallsRequest}});Object.defineProperty(h,"CallHierarchyPrepareRequest",{enumerable:!0,get:function(){return Qp.CallHierarchyPrepareRequest}});var Bo=sy();Object.defineProperty(h,"TokenFormat",{enumerable:!0,get:function(){return Bo.TokenFormat}});Object.defineProperty(h,"SemanticTokensRequest",{enumerable:!0,get:function(){return Bo.SemanticTokensRequest}});Object.defineProperty(h,"SemanticTokensDeltaRequest",{enumerable:!0,get:function(){return Bo.SemanticTokensDeltaRequest}});Object.defineProperty(h,"SemanticTokensRangeRequest",{enumerable:!0,get:function(){return Bo.SemanticTokensRangeRequest}});Object.defineProperty(h,"SemanticTokensRefreshRequest",{enumerable:!0,get:function(){return Bo.SemanticTokensRefreshRequest}});Object.defineProperty(h,"SemanticTokensRegistrationType",{enumerable:!0,get:function(){return Bo.SemanticTokensRegistrationType}});var zk=ly();Object.defineProperty(h,"ShowDocumentRequest",{enumerable:!0,get:function(){return zk.ShowDocumentRequest}});var Vk=cy();Object.defineProperty(h,"LinkedEditingRangeRequest",{enumerable:!0,get:function(){return Vk.LinkedEditingRangeRequest}});var oo=fy();Object.defineProperty(h,"FileOperationPatternKind",{enumerable:!0,get:function(){return oo.FileOperationPatternKind}});Object.defineProperty(h,"DidCreateFilesNotification",{enumerable:!0,get:function(){return oo.DidCreateFilesNotification}});Object.defineProperty(h,"WillCreateFilesRequest",{enumerable:!0,get:function(){return oo.WillCreateFilesRequest}});Object.defineProperty(h,"DidRenameFilesNotification",{enumerable:!0,get:function(){return oo.DidRenameFilesNotification}});Object.defineProperty(h,"WillRenameFilesRequest",{enumerable:!0,get:function(){return oo.WillRenameFilesRequest}});Object.defineProperty(h,"DidDeleteFilesNotification",{enumerable:!0,get:function(){return oo.DidDeleteFilesNotification}});Object.defineProperty(h,"WillDeleteFilesRequest",{enumerable:!0,get:function(){return oo.WillDeleteFilesRequest}});var Zp=py();Object.defineProperty(h,"UniquenessLevel",{enumerable:!0,get:function(){return Zp.UniquenessLevel}});Object.defineProperty(h,"MonikerKind",{enumerable:!0,get:function(){return Zp.MonikerKind}});Object.defineProperty(h,"MonikerRequest",{enumerable:!0,get:function(){return Zp.MonikerRequest}});var em=my();Object.defineProperty(h,"TypeHierarchyPrepareRequest",{enumerable:!0,get:function(){return em.TypeHierarchyPrepareRequest}});Object.defineProperty(h,"TypeHierarchySubtypesRequest",{enumerable:!0,get:function(){return em.TypeHierarchySubtypesRequest}});Object.defineProperty(h,"TypeHierarchySupertypesRequest",{enumerable:!0,get:function(){return em.TypeHierarchySupertypesRequest}});var Cy=hy();Object.defineProperty(h,"InlineValueRequest",{enumerable:!0,get:function(){return Cy.InlineValueRequest}});Object.defineProperty(h,"InlineValueRefreshRequest",{enumerable:!0,get:function(){return Cy.InlineValueRefreshRequest}});var tm=gy();Object.defineProperty(h,"InlayHintRequest",{enumerable:!0,get:function(){return tm.InlayHintRequest}});Object.defineProperty(h,"InlayHintResolveRequest",{enumerable:!0,get:function(){return tm.InlayHintResolveRequest}});Object.defineProperty(h,"InlayHintRefreshRequest",{enumerable:!0,get:function(){return tm.InlayHintRefreshRequest}});var Pa=Ty();Object.defineProperty(h,"DiagnosticServerCancellationData",{enumerable:!0,get:function(){return Pa.DiagnosticServerCancellationData}});Object.defineProperty(h,"DocumentDiagnosticReportKind",{enumerable:!0,get:function(){return Pa.DocumentDiagnosticReportKind}});Object.defineProperty(h,"DocumentDiagnosticRequest",{enumerable:!0,get:function(){return Pa.DocumentDiagnosticRequest}});Object.defineProperty(h,"WorkspaceDiagnosticRequest",{enumerable:!0,get:function(){return Pa.WorkspaceDiagnosticRequest}});Object.defineProperty(h,"DiagnosticRefreshRequest",{enumerable:!0,get:function(){return Pa.DiagnosticRefreshRequest}});var Sn=xy();Object.defineProperty(h,"NotebookCellKind",{enumerable:!0,get:function(){return Sn.NotebookCellKind}});Object.defineProperty(h,"ExecutionSummary",{enumerable:!0,get:function(){return Sn.ExecutionSummary}});Object.defineProperty(h,"NotebookCell",{enumerable:!0,get:function(){return Sn.NotebookCell}});Object.defineProperty(h,"NotebookDocument",{enumerable:!0,get:function(){return Sn.NotebookDocument}});Object.defineProperty(h,"NotebookDocumentSyncRegistrationType",{enumerable:!0,get:function(){return Sn.NotebookDocumentSyncRegistrationType}});Object.defineProperty(h,"DidOpenNotebookDocumentNotification",{enumerable:!0,get:function(){return Sn.DidOpenNotebookDocumentNotification}});Object.defineProperty(h,"NotebookCellArrayChange",{enumerable:!0,get:function(){return Sn.NotebookCellArrayChange}});Object.defineProperty(h,"DidChangeNotebookDocumentNotification",{enumerable:!0,get:function(){return Sn.DidChangeNotebookDocumentNotification}});Object.defineProperty(h,"DidSaveNotebookDocumentNotification",{enumerable:!0,get:function(){return Sn.DidSaveNotebookDocumentNotification}});Object.defineProperty(h,"DidCloseNotebookDocumentNotification",{enumerable:!0,get:function(){return Sn.DidCloseNotebookDocumentNotification}});var wy;(function(t){function e(r){let n=r;return Wt.string(n.language)||Wt.string(n.scheme)||Wt.string(n.pattern)}t.is=e})(wy=h.TextDocumentFilter||(h.TextDocumentFilter={}));var ky;(function(t){function e(r){let n=r;return Wt.objectLiteral(n)&&(Wt.string(n.notebookType)||Wt.string(n.scheme)||Wt.string(n.pattern))}t.is=e})(ky=h.NotebookDocumentFilter||(h.NotebookDocumentFilter={}));var Ey;(function(t){function e(r){let n=r;return Wt.objectLiteral(n)&&(Wt.string(n.notebook)||ky.is(n.notebook))&&(n.language===void 0||Wt.string(n.language))}t.is=e})(Ey=h.NotebookCellTextDocumentFilter||(h.NotebookCellTextDocumentFilter={}));var $y;(function(t){function e(r){if(!Array.isArray(r))return!1;for(let n of r)if(!Wt.string(n)&&!wy.is(n)&&!Ey.is(n))return!1;return!0}t.is=e})($y=h.DocumentSelector||(h.DocumentSelector={}));var Xk;(function(t){t.method="client/registerCapability",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType(t.method)})(Xk=h.RegistrationRequest||(h.RegistrationRequest={}));var Yk;(function(t){t.method="client/unregisterCapability",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType(t.method)})(Yk=h.UnregistrationRequest||(h.UnregistrationRequest={}));var Jk;(function(t){t.Create="create",t.Rename="rename",t.Delete="delete"})(Jk=h.ResourceOperationKind||(h.ResourceOperationKind={}));var Qk;(function(t){t.Abort="abort",t.Transactional="transactional",t.TextOnlyTransactional="textOnlyTransactional",t.Undo="undo"})(Qk=h.FailureHandlingKind||(h.FailureHandlingKind={}));var Zk;(function(t){t.UTF8="utf-8",t.UTF16="utf-16",t.UTF32="utf-32"})(Zk=h.PositionEncodingKind||(h.PositionEncodingKind={}));var eE;(function(t){function e(r){let n=r;return n&&Wt.string(n.id)&&n.id.length>0}t.hasId=e})(eE=h.StaticRegistrationOptions||(h.StaticRegistrationOptions={}));var tE;(function(t){function e(r){let n=r;return n&&(n.documentSelector===null||$y.is(n.documentSelector))}t.is=e})(tE=h.TextDocumentRegistrationOptions||(h.TextDocumentRegistrationOptions={}));var rE;(function(t){function e(n){let i=n;return Wt.objectLiteral(i)&&(i.workDoneProgress===void 0||Wt.boolean(i.workDoneProgress))}t.is=e;function r(n){let i=n;return i&&Wt.boolean(i.workDoneProgress)}t.hasWorkDoneProgress=r})(rE=h.WorkDoneProgressOptions||(h.WorkDoneProgressOptions={}));var nE;(function(t){t.method="initialize",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(nE=h.InitializeRequest||(h.InitializeRequest={}));var iE;(function(t){t.unknownProtocolVersion=1})(iE=h.InitializeErrorCodes||(h.InitializeErrorCodes={}));var oE;(function(t){t.method="initialized",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(oE=h.InitializedNotification||(h.InitializedNotification={}));var sE;(function(t){t.method="shutdown",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType0(t.method)})(sE=h.ShutdownRequest||(h.ShutdownRequest={}));var aE;(function(t){t.method="exit",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType0(t.method)})(aE=h.ExitNotification||(h.ExitNotification={}));var lE;(function(t){t.method="workspace/didChangeConfiguration",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(lE=h.DidChangeConfigurationNotification||(h.DidChangeConfigurationNotification={}));var uE;(function(t){t.Error=1,t.Warning=2,t.Info=3,t.Log=4})(uE=h.MessageType||(h.MessageType={}));var cE;(function(t){t.method="window/showMessage",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolNotificationType(t.method)})(cE=h.ShowMessageNotification||(h.ShowMessageNotification={}));var fE;(function(t){t.method="window/showMessageRequest",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType(t.method)})(fE=h.ShowMessageRequest||(h.ShowMessageRequest={}));var dE;(function(t){t.method="window/logMessage",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolNotificationType(t.method)})(dE=h.LogMessageNotification||(h.LogMessageNotification={}));var pE;(function(t){t.method="telemetry/event",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolNotificationType(t.method)})(pE=h.TelemetryEventNotification||(h.TelemetryEventNotification={}));var mE;(function(t){t.None=0,t.Full=1,t.Incremental=2})(mE=h.TextDocumentSyncKind||(h.TextDocumentSyncKind={}));var hE;(function(t){t.method="textDocument/didOpen",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(hE=h.DidOpenTextDocumentNotification||(h.DidOpenTextDocumentNotification={}));var gE;(function(t){function e(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range!==void 0&&(i.rangeLength===void 0||typeof i.rangeLength=="number")}t.isIncremental=e;function r(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range===void 0&&i.rangeLength===void 0}t.isFull=r})(gE=h.TextDocumentContentChangeEvent||(h.TextDocumentContentChangeEvent={}));var yE;(function(t){t.method="textDocument/didChange",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(yE=h.DidChangeTextDocumentNotification||(h.DidChangeTextDocumentNotification={}));var TE;(function(t){t.method="textDocument/didClose",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(TE=h.DidCloseTextDocumentNotification||(h.DidCloseTextDocumentNotification={}));var vE;(function(t){t.method="textDocument/didSave",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(vE=h.DidSaveTextDocumentNotification||(h.DidSaveTextDocumentNotification={}));var RE;(function(t){t.Manual=1,t.AfterDelay=2,t.FocusOut=3})(RE=h.TextDocumentSaveReason||(h.TextDocumentSaveReason={}));var xE;(function(t){t.method="textDocument/willSave",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(xE=h.WillSaveTextDocumentNotification||(h.WillSaveTextDocumentNotification={}));var SE;(function(t){t.method="textDocument/willSaveWaitUntil",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(SE=h.WillSaveTextDocumentWaitUntilRequest||(h.WillSaveTextDocumentWaitUntilRequest={}));var bE;(function(t){t.method="workspace/didChangeWatchedFiles",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(bE=h.DidChangeWatchedFilesNotification||(h.DidChangeWatchedFilesNotification={}));var AE;(function(t){t.Created=1,t.Changed=2,t.Deleted=3})(AE=h.FileChangeType||(h.FileChangeType={}));var CE;(function(t){function e(r){let n=r;return Wt.objectLiteral(n)&&(Sy.URI.is(n.baseUri)||Sy.WorkspaceFolder.is(n.baseUri))&&Wt.string(n.pattern)}t.is=e})(CE=h.RelativePattern||(h.RelativePattern={}));var wE;(function(t){t.Create=1,t.Change=2,t.Delete=4})(wE=h.WatchKind||(h.WatchKind={}));var kE;(function(t){t.method="textDocument/publishDiagnostics",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolNotificationType(t.method)})(kE=h.PublishDiagnosticsNotification||(h.PublishDiagnosticsNotification={}));var EE;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.TriggerForIncompleteCompletions=3})(EE=h.CompletionTriggerKind||(h.CompletionTriggerKind={}));var $E;(function(t){t.method="textDocument/completion",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})($E=h.CompletionRequest||(h.CompletionRequest={}));var _E;(function(t){t.method="completionItem/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(_E=h.CompletionResolveRequest||(h.CompletionResolveRequest={}));var NE;(function(t){t.method="textDocument/hover",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(NE=h.HoverRequest||(h.HoverRequest={}));var IE;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.ContentChange=3})(IE=h.SignatureHelpTriggerKind||(h.SignatureHelpTriggerKind={}));var PE;(function(t){t.method="textDocument/signatureHelp",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(PE=h.SignatureHelpRequest||(h.SignatureHelpRequest={}));var DE;(function(t){t.method="textDocument/definition",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(DE=h.DefinitionRequest||(h.DefinitionRequest={}));var OE;(function(t){t.method="textDocument/references",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(OE=h.ReferencesRequest||(h.ReferencesRequest={}));var LE;(function(t){t.method="textDocument/documentHighlight",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(LE=h.DocumentHighlightRequest||(h.DocumentHighlightRequest={}));var ME;(function(t){t.method="textDocument/documentSymbol",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(ME=h.DocumentSymbolRequest||(h.DocumentSymbolRequest={}));var FE;(function(t){t.method="textDocument/codeAction",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(FE=h.CodeActionRequest||(h.CodeActionRequest={}));var UE;(function(t){t.method="codeAction/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(UE=h.CodeActionResolveRequest||(h.CodeActionResolveRequest={}));var qE;(function(t){t.method="workspace/symbol",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(qE=h.WorkspaceSymbolRequest||(h.WorkspaceSymbolRequest={}));var GE;(function(t){t.method="workspaceSymbol/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(GE=h.WorkspaceSymbolResolveRequest||(h.WorkspaceSymbolResolveRequest={}));var jE;(function(t){t.method="textDocument/codeLens",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(jE=h.CodeLensRequest||(h.CodeLensRequest={}));var HE;(function(t){t.method="codeLens/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(HE=h.CodeLensResolveRequest||(h.CodeLensResolveRequest={}));var KE;(function(t){t.method="workspace/codeLens/refresh",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType0(t.method)})(KE=h.CodeLensRefreshRequest||(h.CodeLensRefreshRequest={}));var WE;(function(t){t.method="textDocument/documentLink",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(WE=h.DocumentLinkRequest||(h.DocumentLinkRequest={}));var BE;(function(t){t.method="documentLink/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(BE=h.DocumentLinkResolveRequest||(h.DocumentLinkResolveRequest={}));var zE;(function(t){t.method="textDocument/formatting",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(zE=h.DocumentFormattingRequest||(h.DocumentFormattingRequest={}));var VE;(function(t){t.method="textDocument/rangeFormatting",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(VE=h.DocumentRangeFormattingRequest||(h.DocumentRangeFormattingRequest={}));var XE;(function(t){t.method="textDocument/onTypeFormatting",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(XE=h.DocumentOnTypeFormattingRequest||(h.DocumentOnTypeFormattingRequest={}));var YE;(function(t){t.Identifier=1})(YE=h.PrepareSupportDefaultBehavior||(h.PrepareSupportDefaultBehavior={}));var JE;(function(t){t.method="textDocument/rename",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(JE=h.RenameRequest||(h.RenameRequest={}));var QE;(function(t){t.method="textDocument/prepareRename",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(QE=h.PrepareRenameRequest||(h.PrepareRenameRequest={}));var ZE;(function(t){t.method="workspace/executeCommand",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(ZE=h.ExecuteCommandRequest||(h.ExecuteCommandRequest={}));var e$;(function(t){t.method="workspace/applyEdit",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType("workspace/applyEdit")})(e$=h.ApplyWorkspaceEditRequest||(h.ApplyWorkspaceEditRequest={}))});var Iy=H(au=>{"use strict";Object.defineProperty(au,"__esModule",{value:!0});au.createProtocolConnection=void 0;var Ny=Vn();function t$(t,e,r,n){return Ny.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,Ny.createMessageConnection)(t,e,r,n)}au.createProtocolConnection=t$});var Py=H(dr=>{"use strict";var r$=dr&&dr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),lu=dr&&dr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&r$(e,t,r)};Object.defineProperty(dr,"__esModule",{value:!0});dr.LSPErrorCodes=dr.createProtocolConnection=void 0;lu(Vn(),dr);lu(io(),dr);lu(nt(),dr);lu(_y(),dr);var n$=Iy();Object.defineProperty(dr,"createProtocolConnection",{enumerable:!0,get:function(){return n$.createProtocolConnection}});var i$;(function(t){t.lspReservedErrorRangeStart=-32899,t.RequestFailed=-32803,t.ServerCancelled=-32802,t.ContentModified=-32801,t.RequestCancelled=-32800,t.lspReservedErrorRangeEnd=-32800})(i$=dr.LSPErrorCodes||(dr.LSPErrorCodes={}))});var Ct=H(bn=>{"use strict";var o$=bn&&bn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Dy=bn&&bn.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&o$(e,t,r)};Object.defineProperty(bn,"__esModule",{value:!0});bn.createProtocolConnection=void 0;var s$=Kp();Dy(Kp(),bn);Dy(Py(),bn);function a$(t,e,r,n){return(0,s$.createMessageConnection)(t,e,r,n)}bn.createProtocolConnection=a$});var nm=H(Ai=>{"use strict";Object.defineProperty(Ai,"__esModule",{value:!0});Ai.SemanticTokensBuilder=Ai.SemanticTokensDiff=Ai.SemanticTokensFeature=void 0;var uu=Ct(),l$=t=>class extends t{get semanticTokens(){return{refresh:()=>this.connection.sendRequest(uu.SemanticTokensRefreshRequest.type),on:e=>{let r=uu.SemanticTokensRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onDelta:e=>{let r=uu.SemanticTokensDeltaRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onRange:e=>{let r=uu.SemanticTokensRangeRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Ai.SemanticTokensFeature=l$;var cu=class{constructor(e,r){this.originalSequence=e,this.modifiedSequence=r}computeDiff(){let e=this.originalSequence.length,r=this.modifiedSequence.length,n=0;for(;n<r&&n<e&&this.originalSequence[n]===this.modifiedSequence[n];)n++;if(n<r&&n<e){let i=e-1,o=r-1;for(;i>=n&&o>=n&&this.originalSequence[i]===this.modifiedSequence[o];)i--,o--;(i<n||o<n)&&(i++,o++);let s=i-n+1,a=this.modifiedSequence.slice(n,o+1);return a.length===1&&a[0]===this.originalSequence[i]?[{start:n,deleteCount:s-1}]:[{start:n,deleteCount:s,data:a}]}else return n<r?[{start:n,deleteCount:0,data:this.modifiedSequence.slice(n)}]:n<e?[{start:n,deleteCount:e-n}]:[]}};Ai.SemanticTokensDiff=cu;var rm=class{constructor(){this._prevData=void 0,this.initialize()}initialize(){this._id=Date.now(),this._prevLine=0,this._prevChar=0,this._data=[],this._dataLen=0}push(e,r,n,i,o){let s=e,a=r;this._dataLen>0&&(s-=this._prevLine,s===0&&(a-=this._prevChar)),this._data[this._dataLen++]=s,this._data[this._dataLen++]=a,this._data[this._dataLen++]=n,this._data[this._dataLen++]=i,this._data[this._dataLen++]=o,this._prevLine=e,this._prevChar=r}get id(){return this._id.toString()}previousResult(e){this.id===e&&(this._prevData=this._data),this.initialize()}build(){return this._prevData=void 0,{resultId:this.id,data:this._data}}canBuildEdits(){return this._prevData!==void 0}buildEdits(){return this._prevData!==void 0?{resultId:this.id,edits:new cu(this._prevData,this._data).computeDiff()}:this.build()}};Ai.SemanticTokensBuilder=rm});var om=H(fu=>{"use strict";Object.defineProperty(fu,"__esModule",{value:!0});fu.TextDocuments=void 0;var so=Ct(),im=class{constructor(e){this._configuration=e,this._syncedDocuments=new Map,this._onDidChangeContent=new so.Emitter,this._onDidOpen=new so.Emitter,this._onDidClose=new so.Emitter,this._onDidSave=new so.Emitter,this._onWillSave=new so.Emitter}get onDidOpen(){return this._onDidOpen.event}get onDidChangeContent(){return this._onDidChangeContent.event}get onWillSave(){return this._onWillSave.event}onWillSaveWaitUntil(e){this._willSaveWaitUntil=e}get onDidSave(){return this._onDidSave.event}get onDidClose(){return this._onDidClose.event}get(e){return this._syncedDocuments.get(e)}all(){return Array.from(this._syncedDocuments.values())}keys(){return Array.from(this._syncedDocuments.keys())}listen(e){e.__textDocumentSync=so.TextDocumentSyncKind.Incremental;let r=[];return r.push(e.onDidOpenTextDocument(n=>{let i=n.textDocument,o=this._configuration.create(i.uri,i.languageId,i.version,i.text);this._syncedDocuments.set(i.uri,o);let s=Object.freeze({document:o});this._onDidOpen.fire(s),this._onDidChangeContent.fire(s)})),r.push(e.onDidChangeTextDocument(n=>{let i=n.textDocument,o=n.contentChanges;if(o.length===0)return;let{version:s}=i;if(s==null)throw new Error(`Received document change event for ${i.uri} without valid version identifier`);let a=this._syncedDocuments.get(i.uri);a!==void 0&&(a=this._configuration.update(a,o,s),this._syncedDocuments.set(i.uri,a),this._onDidChangeContent.fire(Object.freeze({document:a})))})),r.push(e.onDidCloseTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&(this._syncedDocuments.delete(n.textDocument.uri),this._onDidClose.fire(Object.freeze({document:i})))})),r.push(e.onWillSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onWillSave.fire(Object.freeze({document:i,reason:n.reason}))})),r.push(e.onWillSaveTextDocumentWaitUntil((n,i)=>{let o=this._syncedDocuments.get(n.textDocument.uri);return o!==void 0&&this._willSaveWaitUntil?this._willSaveWaitUntil(Object.freeze({document:o,reason:n.reason}),i):[]})),r.push(e.onDidSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onDidSave.fire(Object.freeze({document:i}))})),so.Disposable.create(()=>{r.forEach(n=>n.dispose())})}};fu.TextDocuments=im});var am=H(zo=>{"use strict";Object.defineProperty(zo,"__esModule",{value:!0});zo.NotebookDocuments=zo.NotebookSyncFeature=void 0;var jr=Ct(),Oy=om(),u$=t=>class extends t{get synchronization(){return{onDidOpenNotebookDocument:e=>this.connection.onNotification(jr.DidOpenNotebookDocumentNotification.type,r=>{e(r)}),onDidChangeNotebookDocument:e=>this.connection.onNotification(jr.DidChangeNotebookDocumentNotification.type,r=>{e(r)}),onDidSaveNotebookDocument:e=>this.connection.onNotification(jr.DidSaveNotebookDocumentNotification.type,r=>{e(r)}),onDidCloseNotebookDocument:e=>this.connection.onNotification(jr.DidCloseNotebookDocumentNotification.type,r=>{e(r)})}}};zo.NotebookSyncFeature=u$;var du=class t{onDidOpenTextDocument(e){return this.openHandler=e,jr.Disposable.create(()=>{this.openHandler=void 0})}openTextDocument(e){this.openHandler&&this.openHandler(e)}onDidChangeTextDocument(e){return this.changeHandler=e,jr.Disposable.create(()=>{this.changeHandler=e})}changeTextDocument(e){this.changeHandler&&this.changeHandler(e)}onDidCloseTextDocument(e){return this.closeHandler=e,jr.Disposable.create(()=>{this.closeHandler=void 0})}closeTextDocument(e){this.closeHandler&&this.closeHandler(e)}onWillSaveTextDocument(){return t.NULL_DISPOSE}onWillSaveTextDocumentWaitUntil(){return t.NULL_DISPOSE}onDidSaveTextDocument(){return t.NULL_DISPOSE}};du.NULL_DISPOSE=Object.freeze({dispose:()=>{}});var sm=class{constructor(e){e instanceof Oy.TextDocuments?this._cellTextDocuments=e:this._cellTextDocuments=new Oy.TextDocuments(e),this.notebookDocuments=new Map,this.notebookCellMap=new Map,this._onDidOpen=new jr.Emitter,this._onDidChange=new jr.Emitter,this._onDidSave=new jr.Emitter,this._onDidClose=new jr.Emitter}get cellTextDocuments(){return this._cellTextDocuments}getCellTextDocument(e){return this._cellTextDocuments.get(e.document)}getNotebookDocument(e){return this.notebookDocuments.get(e)}getNotebookCell(e){let r=this.notebookCellMap.get(e);return r&&r[0]}findNotebookDocumentForCell(e){let r=typeof e=="string"?e:e.document,n=this.notebookCellMap.get(r);return n&&n[1]}get onDidOpen(){return this._onDidOpen.event}get onDidSave(){return this._onDidSave.event}get onDidChange(){return this._onDidChange.event}get onDidClose(){return this._onDidClose.event}listen(e){let r=new du,n=[];return n.push(this.cellTextDocuments.listen(r)),n.push(e.notebooks.synchronization.onDidOpenNotebookDocument(i=>{this.notebookDocuments.set(i.notebookDocument.uri,i.notebookDocument);for(let o of i.cellTextDocuments)r.openTextDocument({textDocument:o});this.updateCellMap(i.notebookDocument),this._onDidOpen.fire(i.notebookDocument)})),n.push(e.notebooks.synchronization.onDidChangeNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);if(o===void 0)return;o.version=i.notebookDocument.version;let s=o.metadata,a=!1,l=i.change;l.metadata!==void 0&&(a=!0,o.metadata=l.metadata);let u=[],c=[],f=[],m=[];if(l.cells!==void 0){let w=l.cells;if(w.structure!==void 0){let v=w.structure.array;if(o.cells.splice(v.start,v.deleteCount,...v.cells!==void 0?v.cells:[]),w.structure.didOpen!==void 0)for(let y of w.structure.didOpen)r.openTextDocument({textDocument:y}),u.push(y.uri);if(w.structure.didClose)for(let y of w.structure.didClose)r.closeTextDocument({textDocument:y}),c.push(y.uri)}if(w.data!==void 0){let v=new Map(w.data.map(y=>[y.document,y]));for(let y=0;y<=o.cells.length;y++){let $=v.get(o.cells[y].document);if($!==void 0){let D=o.cells.splice(y,1,$);if(f.push({old:D[0],new:$}),v.delete($.document),v.size===0)break}}}if(w.textContent!==void 0)for(let v of w.textContent)r.changeTextDocument({textDocument:v.document,contentChanges:v.changes}),m.push(v.document.uri)}this.updateCellMap(o);let T={notebookDocument:o};a&&(T.metadata={old:s,new:o.metadata});let b=[];for(let w of u)b.push(this.getNotebookCell(w));let C=[];for(let w of c)C.push(this.getNotebookCell(w));let _=[];for(let w of m)_.push(this.getNotebookCell(w));(b.length>0||C.length>0||f.length>0||_.length>0)&&(T.cells={added:b,removed:C,changed:{data:f,textContent:_}}),(T.metadata!==void 0||T.cells!==void 0)&&this._onDidChange.fire(T)})),n.push(e.notebooks.synchronization.onDidSaveNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);o!==void 0&&this._onDidSave.fire(o)})),n.push(e.notebooks.synchronization.onDidCloseNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);if(o!==void 0){this._onDidClose.fire(o);for(let s of i.cellTextDocuments)r.closeTextDocument({textDocument:s});this.notebookDocuments.delete(i.notebookDocument.uri);for(let s of o.cells)this.notebookCellMap.delete(s.document)}})),jr.Disposable.create(()=>{n.forEach(i=>i.dispose())})}updateCellMap(e){for(let r of e.cells)this.notebookCellMap.set(r.document,[r,e])}};zo.NotebookDocuments=sm});var lm=H(wt=>{"use strict";Object.defineProperty(wt,"__esModule",{value:!0});wt.thenable=wt.typedArray=wt.stringArray=wt.array=wt.func=wt.error=wt.number=wt.string=wt.boolean=void 0;function c$(t){return t===!0||t===!1}wt.boolean=c$;function Ly(t){return typeof t=="string"||t instanceof String}wt.string=Ly;function f$(t){return typeof t=="number"||t instanceof Number}wt.number=f$;function d$(t){return t instanceof Error}wt.error=d$;function My(t){return typeof t=="function"}wt.func=My;function Fy(t){return Array.isArray(t)}wt.array=Fy;function p$(t){return Fy(t)&&t.every(e=>Ly(e))}wt.stringArray=p$;function m$(t,e){return Array.isArray(t)&&t.every(e)}wt.typedArray=m$;function h$(t){return t&&My(t.then)}wt.thenable=h$});var um=H(Hr=>{"use strict";Object.defineProperty(Hr,"__esModule",{value:!0});Hr.generateUuid=Hr.parse=Hr.isUUID=Hr.v4=Hr.empty=void 0;var Da=class{constructor(e){this._value=e}asHex(){return this._value}equals(e){return this.asHex()===e.asHex()}},Oa=class t extends Da{constructor(){super([t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),"-",t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),"-","4",t._randomHex(),t._randomHex(),t._randomHex(),"-",t._oneOf(t._timeHighBits),t._randomHex(),t._randomHex(),t._randomHex(),"-",t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex()].join(""))}static _oneOf(e){return e[Math.floor(e.length*Math.random())]}static _randomHex(){return t._oneOf(t._chars)}};Oa._chars=["0","1","2","3","4","5","6","6","7","8","9","a","b","c","d","e","f"];Oa._timeHighBits=["8","9","a","b"];Hr.empty=new Da("00000000-0000-0000-0000-000000000000");function Uy(){return new Oa}Hr.v4=Uy;var g$=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function qy(t){return g$.test(t)}Hr.isUUID=qy;function y$(t){if(!qy(t))throw new Error("invalid uuid");return new Da(t)}Hr.parse=y$;function T$(){return Uy().asHex()}Hr.generateUuid=T$});var Gy=H(wi=>{"use strict";Object.defineProperty(wi,"__esModule",{value:!0});wi.attachPartialResult=wi.ProgressFeature=wi.attachWorkDone=void 0;var Ci=Ct(),v$=um(),ao=class t{constructor(e,r){this._connection=e,this._token=r,t.Instances.set(this._token,this)}begin(e,r,n,i){let o={kind:"begin",title:e,percentage:r,message:n,cancellable:i};this._connection.sendProgress(Ci.WorkDoneProgress.type,this._token,o)}report(e,r){let n={kind:"report"};typeof e=="number"?(n.percentage=e,r!==void 0&&(n.message=r)):n.message=e,this._connection.sendProgress(Ci.WorkDoneProgress.type,this._token,n)}done(){t.Instances.delete(this._token),this._connection.sendProgress(Ci.WorkDoneProgress.type,this._token,{kind:"end"})}};ao.Instances=new Map;var pu=class extends ao{constructor(e,r){super(e,r),this._source=new Ci.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose(),super.done()}cancel(){this._source.cancel()}},La=class{constructor(){}begin(){}report(){}done(){}},mu=class extends La{constructor(){super(),this._source=new Ci.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose()}cancel(){this._source.cancel()}};function R$(t,e){if(e===void 0||e.workDoneToken===void 0)return new La;let r=e.workDoneToken;return delete e.workDoneToken,new ao(t,r)}wi.attachWorkDone=R$;var x$=t=>class extends t{constructor(){super(),this._progressSupported=!1}initialize(e){super.initialize(e),e?.window?.workDoneProgress===!0&&(this._progressSupported=!0,this.connection.onNotification(Ci.WorkDoneProgressCancelNotification.type,r=>{let n=ao.Instances.get(r.token);(n instanceof pu||n instanceof mu)&&n.cancel()}))}attachWorkDoneProgress(e){return e===void 0?new La:new ao(this.connection,e)}createWorkDoneProgress(){if(this._progressSupported){let e=(0,v$.generateUuid)();return this.connection.sendRequest(Ci.WorkDoneProgressCreateRequest.type,{token:e}).then(()=>new pu(this.connection,e))}else return Promise.resolve(new mu)}};wi.ProgressFeature=x$;var cm;(function(t){t.type=new Ci.ProgressType})(cm||(cm={}));var fm=class{constructor(e,r){this._connection=e,this._token=r}report(e){this._connection.sendProgress(cm.type,this._token,e)}};function S$(t,e){if(e===void 0||e.partialResultToken===void 0)return;let r=e.partialResultToken;return delete e.partialResultToken,new fm(t,r)}wi.attachPartialResult=S$});var jy=H(hu=>{"use strict";Object.defineProperty(hu,"__esModule",{value:!0});hu.ConfigurationFeature=void 0;var b$=Ct(),A$=lm(),C$=t=>class extends t{getConfiguration(e){return e?A$.string(e)?this._getConfiguration({section:e}):this._getConfiguration(e):this._getConfiguration({})}_getConfiguration(e){let r={items:Array.isArray(e)?e:[e]};return this.connection.sendRequest(b$.ConfigurationRequest.type,r).then(n=>Array.isArray(n)?Array.isArray(e)?n:n[0]:Array.isArray(e)?[]:null)}};hu.ConfigurationFeature=C$});var Hy=H(yu=>{"use strict";Object.defineProperty(yu,"__esModule",{value:!0});yu.WorkspaceFoldersFeature=void 0;var gu=Ct(),w$=t=>class extends t{constructor(){super(),this._notificationIsAutoRegistered=!1}initialize(e){super.initialize(e);let r=e.workspace;r&&r.workspaceFolders&&(this._onDidChangeWorkspaceFolders=new gu.Emitter,this.connection.onNotification(gu.DidChangeWorkspaceFoldersNotification.type,n=>{this._onDidChangeWorkspaceFolders.fire(n.event)}))}fillServerCapabilities(e){super.fillServerCapabilities(e);let r=e.workspace?.workspaceFolders?.changeNotifications;this._notificationIsAutoRegistered=r===!0||typeof r=="string"}getWorkspaceFolders(){return this.connection.sendRequest(gu.WorkspaceFoldersRequest.type)}get onDidChangeWorkspaceFolders(){if(!this._onDidChangeWorkspaceFolders)throw new Error("Client doesn't support sending workspace folder change events.");return!this._notificationIsAutoRegistered&&!this._unregistration&&(this._unregistration=this.connection.client.register(gu.DidChangeWorkspaceFoldersNotification.type)),this._onDidChangeWorkspaceFolders.event}};yu.WorkspaceFoldersFeature=w$});var Ky=H(Tu=>{"use strict";Object.defineProperty(Tu,"__esModule",{value:!0});Tu.CallHierarchyFeature=void 0;var dm=Ct(),k$=t=>class extends t{get callHierarchy(){return{onPrepare:e=>this.connection.onRequest(dm.CallHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onIncomingCalls:e=>{let r=dm.CallHierarchyIncomingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onOutgoingCalls:e=>{let r=dm.CallHierarchyOutgoingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Tu.CallHierarchyFeature=k$});var Wy=H(vu=>{"use strict";Object.defineProperty(vu,"__esModule",{value:!0});vu.ShowDocumentFeature=void 0;var E$=Ct(),$$=t=>class extends t{showDocument(e){return this.connection.sendRequest(E$.ShowDocumentRequest.type,e)}};vu.ShowDocumentFeature=$$});var By=H(Ru=>{"use strict";Object.defineProperty(Ru,"__esModule",{value:!0});Ru.FileOperationsFeature=void 0;var Vo=Ct(),_$=t=>class extends t{onDidCreateFiles(e){return this.connection.onNotification(Vo.DidCreateFilesNotification.type,r=>{e(r)})}onDidRenameFiles(e){return this.connection.onNotification(Vo.DidRenameFilesNotification.type,r=>{e(r)})}onDidDeleteFiles(e){return this.connection.onNotification(Vo.DidDeleteFilesNotification.type,r=>{e(r)})}onWillCreateFiles(e){return this.connection.onRequest(Vo.WillCreateFilesRequest.type,(r,n)=>e(r,n))}onWillRenameFiles(e){return this.connection.onRequest(Vo.WillRenameFilesRequest.type,(r,n)=>e(r,n))}onWillDeleteFiles(e){return this.connection.onRequest(Vo.WillDeleteFilesRequest.type,(r,n)=>e(r,n))}};Ru.FileOperationsFeature=_$});var zy=H(xu=>{"use strict";Object.defineProperty(xu,"__esModule",{value:!0});xu.LinkedEditingRangeFeature=void 0;var N$=Ct(),I$=t=>class extends t{onLinkedEditingRange(e){return this.connection.onRequest(N$.LinkedEditingRangeRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0))}};xu.LinkedEditingRangeFeature=I$});var Vy=H(Su=>{"use strict";Object.defineProperty(Su,"__esModule",{value:!0});Su.TypeHierarchyFeature=void 0;var pm=Ct(),P$=t=>class extends t{get typeHierarchy(){return{onPrepare:e=>this.connection.onRequest(pm.TypeHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onSupertypes:e=>{let r=pm.TypeHierarchySupertypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onSubtypes:e=>{let r=pm.TypeHierarchySubtypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Su.TypeHierarchyFeature=P$});var Yy=H(bu=>{"use strict";Object.defineProperty(bu,"__esModule",{value:!0});bu.InlineValueFeature=void 0;var Xy=Ct(),D$=t=>class extends t{get inlineValue(){return{refresh:()=>this.connection.sendRequest(Xy.InlineValueRefreshRequest.type),on:e=>this.connection.onRequest(Xy.InlineValueRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r)))}}};bu.InlineValueFeature=D$});var Jy=H(Au=>{"use strict";Object.defineProperty(Au,"__esModule",{value:!0});Au.InlayHintFeature=void 0;var mm=Ct(),O$=t=>class extends t{get inlayHint(){return{refresh:()=>this.connection.sendRequest(mm.InlayHintRefreshRequest.type),on:e=>this.connection.onRequest(mm.InlayHintRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r))),resolve:e=>this.connection.onRequest(mm.InlayHintResolveRequest.type,(r,n)=>e(r,n))}}};Au.InlayHintFeature=O$});var Qy=H(Cu=>{"use strict";Object.defineProperty(Cu,"__esModule",{value:!0});Cu.DiagnosticFeature=void 0;var Ma=Ct(),L$=t=>class extends t{get diagnostics(){return{refresh:()=>this.connection.sendRequest(Ma.DiagnosticRefreshRequest.type),on:e=>this.connection.onRequest(Ma.DocumentDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(Ma.DocumentDiagnosticRequest.partialResult,r))),onWorkspace:e=>this.connection.onRequest(Ma.WorkspaceDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(Ma.WorkspaceDiagnosticRequest.partialResult,r)))}}};Cu.DiagnosticFeature=L$});var Zy=H(wu=>{"use strict";Object.defineProperty(wu,"__esModule",{value:!0});wu.MonikerFeature=void 0;var M$=Ct(),F$=t=>class extends t{get moniker(){return{on:e=>{let r=M$.MonikerRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};wu.MonikerFeature=F$});var dT=H(he=>{"use strict";Object.defineProperty(he,"__esModule",{value:!0});he.createConnection=he.combineFeatures=he.combineNotebooksFeatures=he.combineLanguagesFeatures=he.combineWorkspaceFeatures=he.combineWindowFeatures=he.combineClientFeatures=he.combineTracerFeatures=he.combineTelemetryFeatures=he.combineConsoleFeatures=he._NotebooksImpl=he._LanguagesImpl=he.BulkUnregistration=he.BulkRegistration=he.ErrorMessageTracker=void 0;var U=Ct(),Kr=lm(),gm=um(),te=Gy(),U$=jy(),q$=Hy(),G$=Ky(),j$=nm(),H$=Wy(),K$=By(),W$=zy(),B$=Vy(),z$=Yy(),V$=Jy(),X$=Qy(),Y$=am(),J$=Zy();function hm(t){if(t!==null)return t}var ym=class{constructor(){this._messages=Object.create(null)}add(e){let r=this._messages[e];r||(r=0),r++,this._messages[e]=r}sendErrors(e){Object.keys(this._messages).forEach(r=>{e.window.showErrorMessage(r)})}};he.ErrorMessageTracker=ym;var ku=class{constructor(){}rawAttach(e){this._rawConnection=e}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}fillServerCapabilities(e){}initialize(e){}error(e){this.send(U.MessageType.Error,e)}warn(e){this.send(U.MessageType.Warning,e)}info(e){this.send(U.MessageType.Info,e)}log(e){this.send(U.MessageType.Log,e)}send(e,r){this._rawConnection&&this._rawConnection.sendNotification(U.LogMessageNotification.type,{type:e,message:r}).catch(()=>{(0,U.RAL)().console.error("Sending log message failed")})}},Tm=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}showErrorMessage(e,...r){let n={type:U.MessageType.Error,message:e,actions:r};return this.connection.sendRequest(U.ShowMessageRequest.type,n).then(hm)}showWarningMessage(e,...r){let n={type:U.MessageType.Warning,message:e,actions:r};return this.connection.sendRequest(U.ShowMessageRequest.type,n).then(hm)}showInformationMessage(e,...r){let n={type:U.MessageType.Info,message:e,actions:r};return this.connection.sendRequest(U.ShowMessageRequest.type,n).then(hm)}},eT=(0,H$.ShowDocumentFeature)((0,te.ProgressFeature)(Tm)),Q$;(function(t){function e(){return new Eu}t.create=e})(Q$=he.BulkRegistration||(he.BulkRegistration={}));var Eu=class{constructor(){this._registrations=[],this._registered=new Set}add(e,r){let n=Kr.string(e)?e:e.method;if(this._registered.has(n))throw new Error(`${n} is already added to this registration`);let i=gm.generateUuid();this._registrations.push({id:i,method:n,registerOptions:r||{}}),this._registered.add(n)}asRegistrationParams(){return{registrations:this._registrations}}},Z$;(function(t){function e(){return new Fa(void 0,[])}t.create=e})(Z$=he.BulkUnregistration||(he.BulkUnregistration={}));var Fa=class{constructor(e,r){this._connection=e,this._unregistrations=new Map,r.forEach(n=>{this._unregistrations.set(n.method,n)})}get isAttached(){return!!this._connection}attach(e){this._connection=e}add(e){this._unregistrations.set(e.method,e)}dispose(){let e=[];for(let n of this._unregistrations.values())e.push(n);let r={unregisterations:e};this._connection.sendRequest(U.UnregistrationRequest.type,r).catch(()=>{this._connection.console.info("Bulk unregistration failed.")})}disposeSingle(e){let r=Kr.string(e)?e:e.method,n=this._unregistrations.get(r);if(!n)return!1;let i={unregisterations:[n]};return this._connection.sendRequest(U.UnregistrationRequest.type,i).then(()=>{this._unregistrations.delete(r)},o=>{this._connection.console.info(`Un-registering request handler for ${n.id} failed.`)}),!0}},$u=class{attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}register(e,r,n){return e instanceof Eu?this.registerMany(e):e instanceof Fa?this.registerSingle1(e,r,n):this.registerSingle2(e,r)}registerSingle1(e,r,n){let i=Kr.string(r)?r:r.method,o=gm.generateUuid(),s={registrations:[{id:o,method:i,registerOptions:n||{}}]};return e.isAttached||e.attach(this.connection),this.connection.sendRequest(U.RegistrationRequest.type,s).then(a=>(e.add({id:o,method:i}),e),a=>(this.connection.console.info(`Registering request handler for ${i} failed.`),Promise.reject(a)))}registerSingle2(e,r){let n=Kr.string(e)?e:e.method,i=gm.generateUuid(),o={registrations:[{id:i,method:n,registerOptions:r||{}}]};return this.connection.sendRequest(U.RegistrationRequest.type,o).then(s=>U.Disposable.create(()=>{this.unregisterSingle(i,n).catch(()=>{this.connection.console.info(`Un-registering capability with id ${i} failed.`)})}),s=>(this.connection.console.info(`Registering request handler for ${n} failed.`),Promise.reject(s)))}unregisterSingle(e,r){let n={unregisterations:[{id:e,method:r}]};return this.connection.sendRequest(U.UnregistrationRequest.type,n).catch(()=>{this.connection.console.info(`Un-registering request handler for ${e} failed.`)})}registerMany(e){let r=e.asRegistrationParams();return this.connection.sendRequest(U.RegistrationRequest.type,r).then(()=>new Fa(this._connection,r.registrations.map(n=>({id:n.id,method:n.method}))),n=>(this.connection.console.info("Bulk registration failed."),Promise.reject(n)))}},vm=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}applyEdit(e){function r(i){return i&&!!i.edit}let n=r(e)?e:{edit:e};return this.connection.sendRequest(U.ApplyWorkspaceEditRequest.type,n)}},tT=(0,K$.FileOperationsFeature)((0,q$.WorkspaceFoldersFeature)((0,U$.ConfigurationFeature)(vm))),_u=class{constructor(){this._trace=U.Trace.Off}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}set trace(e){this._trace=e}log(e,r){this._trace!==U.Trace.Off&&this.connection.sendNotification(U.LogTraceNotification.type,{message:e,verbose:this._trace===U.Trace.Verbose?r:void 0}).catch(()=>{})}},Nu=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}logEvent(e){this.connection.sendNotification(U.TelemetryEventNotification.type,e).catch(()=>{this.connection.console.log("Sending TelemetryEventNotification failed")})}},Iu=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,te.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,te.attachPartialResult)(this.connection,r)}};he._LanguagesImpl=Iu;var rT=(0,J$.MonikerFeature)((0,X$.DiagnosticFeature)((0,V$.InlayHintFeature)((0,z$.InlineValueFeature)((0,B$.TypeHierarchyFeature)((0,W$.LinkedEditingRangeFeature)((0,j$.SemanticTokensFeature)((0,G$.CallHierarchyFeature)(Iu)))))))),Pu=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,te.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,te.attachPartialResult)(this.connection,r)}};he._NotebooksImpl=Pu;var nT=(0,Y$.NotebookSyncFeature)(Pu);function iT(t,e){return function(r){return e(t(r))}}he.combineConsoleFeatures=iT;function oT(t,e){return function(r){return e(t(r))}}he.combineTelemetryFeatures=oT;function sT(t,e){return function(r){return e(t(r))}}he.combineTracerFeatures=sT;function aT(t,e){return function(r){return e(t(r))}}he.combineClientFeatures=aT;function lT(t,e){return function(r){return e(t(r))}}he.combineWindowFeatures=lT;function uT(t,e){return function(r){return e(t(r))}}he.combineWorkspaceFeatures=uT;function cT(t,e){return function(r){return e(t(r))}}he.combineLanguagesFeatures=cT;function fT(t,e){return function(r){return e(t(r))}}he.combineNotebooksFeatures=fT;function e_(t,e){function r(i,o,s){return i&&o?s(i,o):i||o}return{__brand:"features",console:r(t.console,e.console,iT),tracer:r(t.tracer,e.tracer,sT),telemetry:r(t.telemetry,e.telemetry,oT),client:r(t.client,e.client,aT),window:r(t.window,e.window,lT),workspace:r(t.workspace,e.workspace,uT),languages:r(t.languages,e.languages,cT),notebooks:r(t.notebooks,e.notebooks,fT)}}he.combineFeatures=e_;function t_(t,e,r){let n=r&&r.console?new(r.console(ku)):new ku,i=t(n);n.rawAttach(i);let o=r&&r.tracer?new(r.tracer(_u)):new _u,s=r&&r.telemetry?new(r.telemetry(Nu)):new Nu,a=r&&r.client?new(r.client($u)):new $u,l=r&&r.window?new(r.window(eT)):new eT,u=r&&r.workspace?new(r.workspace(tT)):new tT,c=r&&r.languages?new(r.languages(rT)):new rT,f=r&&r.notebooks?new(r.notebooks(nT)):new nT,m=[n,o,s,a,l,u,c,f];function T(v){return v instanceof Promise?v:Kr.thenable(v)?new Promise((y,$)=>{v.then(D=>y(D),D=>$(D))}):Promise.resolve(v)}let b,C,_,w={listen:()=>i.listen(),sendRequest:(v,...y)=>i.sendRequest(Kr.string(v)?v:v.method,...y),onRequest:(v,y)=>i.onRequest(v,y),sendNotification:(v,y)=>{let $=Kr.string(v)?v:v.method;return arguments.length===1?i.sendNotification($):i.sendNotification($,y)},onNotification:(v,y)=>i.onNotification(v,y),onProgress:i.onProgress,sendProgress:i.sendProgress,onInitialize:v=>(C=v,{dispose:()=>{C=void 0}}),onInitialized:v=>i.onNotification(U.InitializedNotification.type,v),onShutdown:v=>(b=v,{dispose:()=>{b=void 0}}),onExit:v=>(_=v,{dispose:()=>{_=void 0}}),get console(){return n},get telemetry(){return s},get tracer(){return o},get client(){return a},get window(){return l},get workspace(){return u},get languages(){return c},get notebooks(){return f},onDidChangeConfiguration:v=>i.onNotification(U.DidChangeConfigurationNotification.type,v),onDidChangeWatchedFiles:v=>i.onNotification(U.DidChangeWatchedFilesNotification.type,v),__textDocumentSync:void 0,onDidOpenTextDocument:v=>i.onNotification(U.DidOpenTextDocumentNotification.type,v),onDidChangeTextDocument:v=>i.onNotification(U.DidChangeTextDocumentNotification.type,v),onDidCloseTextDocument:v=>i.onNotification(U.DidCloseTextDocumentNotification.type,v),onWillSaveTextDocument:v=>i.onNotification(U.WillSaveTextDocumentNotification.type,v),onWillSaveTextDocumentWaitUntil:v=>i.onRequest(U.WillSaveTextDocumentWaitUntilRequest.type,v),onDidSaveTextDocument:v=>i.onNotification(U.DidSaveTextDocumentNotification.type,v),sendDiagnostics:v=>i.sendNotification(U.PublishDiagnosticsNotification.type,v),onHover:v=>i.onRequest(U.HoverRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),void 0)),onCompletion:v=>i.onRequest(U.CompletionRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onCompletionResolve:v=>i.onRequest(U.CompletionResolveRequest.type,v),onSignatureHelp:v=>i.onRequest(U.SignatureHelpRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),void 0)),onDeclaration:v=>i.onRequest(U.DeclarationRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onDefinition:v=>i.onRequest(U.DefinitionRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onTypeDefinition:v=>i.onRequest(U.TypeDefinitionRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onImplementation:v=>i.onRequest(U.ImplementationRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onReferences:v=>i.onRequest(U.ReferencesRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onDocumentHighlight:v=>i.onRequest(U.DocumentHighlightRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onDocumentSymbol:v=>i.onRequest(U.DocumentSymbolRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onWorkspaceSymbol:v=>i.onRequest(U.WorkspaceSymbolRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onWorkspaceSymbolResolve:v=>i.onRequest(U.WorkspaceSymbolResolveRequest.type,v),onCodeAction:v=>i.onRequest(U.CodeActionRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onCodeActionResolve:v=>i.onRequest(U.CodeActionResolveRequest.type,(y,$)=>v(y,$)),onCodeLens:v=>i.onRequest(U.CodeLensRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onCodeLensResolve:v=>i.onRequest(U.CodeLensResolveRequest.type,(y,$)=>v(y,$)),onDocumentFormatting:v=>i.onRequest(U.DocumentFormattingRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),void 0)),onDocumentRangeFormatting:v=>i.onRequest(U.DocumentRangeFormattingRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),void 0)),onDocumentOnTypeFormatting:v=>i.onRequest(U.DocumentOnTypeFormattingRequest.type,(y,$)=>v(y,$)),onRenameRequest:v=>i.onRequest(U.RenameRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),void 0)),onPrepareRename:v=>i.onRequest(U.PrepareRenameRequest.type,(y,$)=>v(y,$)),onDocumentLinks:v=>i.onRequest(U.DocumentLinkRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onDocumentLinkResolve:v=>i.onRequest(U.DocumentLinkResolveRequest.type,(y,$)=>v(y,$)),onDocumentColor:v=>i.onRequest(U.DocumentColorRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onColorPresentation:v=>i.onRequest(U.ColorPresentationRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onFoldingRanges:v=>i.onRequest(U.FoldingRangeRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onSelectionRanges:v=>i.onRequest(U.SelectionRangeRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onExecuteCommand:v=>i.onRequest(U.ExecuteCommandRequest.type,(y,$)=>v(y,$,(0,te.attachWorkDone)(i,y),void 0)),dispose:()=>i.dispose()};for(let v of m)v.attach(w);return i.onRequest(U.InitializeRequest.type,v=>{e.initialize(v),Kr.string(v.trace)&&(o.trace=U.Trace.fromString(v.trace));for(let y of m)y.initialize(v.capabilities);if(C){let y=C(v,new U.CancellationTokenSource().token,(0,te.attachWorkDone)(i,v),void 0);return T(y).then($=>{if($ instanceof U.ResponseError)return $;let D=$;D||(D={capabilities:{}});let X=D.capabilities;X||(X={},D.capabilities=X),X.textDocumentSync===void 0||X.textDocumentSync===null?X.textDocumentSync=Kr.number(w.__textDocumentSync)?w.__textDocumentSync:U.TextDocumentSyncKind.None:!Kr.number(X.textDocumentSync)&&!Kr.number(X.textDocumentSync.change)&&(X.textDocumentSync.change=Kr.number(w.__textDocumentSync)?w.__textDocumentSync:U.TextDocumentSyncKind.None);for(let ye of m)ye.fillServerCapabilities(X);return D})}else{let y={capabilities:{textDocumentSync:U.TextDocumentSyncKind.None}};for(let $ of m)$.fillServerCapabilities(y.capabilities);return y}}),i.onRequest(U.ShutdownRequest.type,()=>{if(e.shutdownReceived=!0,b)return b(new U.CancellationTokenSource().token)}),i.onNotification(U.ExitNotification.type,()=>{try{_&&_()}finally{e.shutdownReceived?e.exit(0):e.exit(1)}}),i.onNotification(U.SetTraceNotification.type,v=>{o.trace=U.Trace.fromString(v.value)}),w}he.createConnection=t_});var Rm=H(Bt=>{"use strict";var r_=Bt&&Bt.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),pT=Bt&&Bt.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&r_(e,t,r)};Object.defineProperty(Bt,"__esModule",{value:!0});Bt.ProposedFeatures=Bt.NotebookDocuments=Bt.TextDocuments=Bt.SemanticTokensBuilder=void 0;var n_=nm();Object.defineProperty(Bt,"SemanticTokensBuilder",{enumerable:!0,get:function(){return n_.SemanticTokensBuilder}});pT(Ct(),Bt);var i_=om();Object.defineProperty(Bt,"TextDocuments",{enumerable:!0,get:function(){return i_.TextDocuments}});var o_=am();Object.defineProperty(Bt,"NotebookDocuments",{enumerable:!0,get:function(){return o_.NotebookDocuments}});pT(dT(),Bt);var s_;(function(t){t.all={__brand:"features"}})(s_=Bt.ProposedFeatures||(Bt.ProposedFeatures={}))});var hT=H((Cj,mT)=>{"use strict";mT.exports=Ct()});var be=H(An=>{"use strict";var a_=An&&An.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),yT=An&&An.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&a_(e,t,r)};Object.defineProperty(An,"__esModule",{value:!0});An.createConnection=void 0;var Du=Rm();yT(hT(),An);yT(Rm(),An);var gT=!1,l_={initialize:t=>{},get shutdownReceived(){return gT},set shutdownReceived(t){gT=t},exit:t=>{}};function u_(t,e,r,n){let i,o,s,a;t!==void 0&&t.__brand==="features"&&(i=t,t=e,e=r,r=n),Du.ConnectionStrategy.is(t)||Du.ConnectionOptions.is(t)?a=t:(o=t,s=e,a=r);let l=u=>(0,Du.createProtocolConnection)(o,s,u,a);return(0,Du.createConnection)(l,l_,i)}An.createConnection=u_});var NC=H((Vae,_C)=>{"use strict";_C.exports=be()});var $C=de(be(),1);var Ou=class t{constructor(e,r,n,i){this._uri=e,this._languageId=r,this._version=n,this._content=i,this._lineOffsets=void 0}get uri(){return this._uri}get languageId(){return this._languageId}get version(){return this._version}getText(e){if(e){let r=this.offsetAt(e.start),n=this.offsetAt(e.end);return this._content.substring(r,n)}return this._content}update(e,r){for(let n of e)if(t.isIncremental(n)){let i=vT(n.range),o=this.offsetAt(i.start),s=this.offsetAt(i.end);this._content=this._content.substring(0,o)+n.text+this._content.substring(s,this._content.length);let a=Math.max(i.start.line,0),l=Math.max(i.end.line,0),u=this._lineOffsets,c=TT(n.text,!1,o);if(l-a===c.length)for(let m=0,T=c.length;m<T;m++)u[m+a+1]=c[m];else c.length<1e4?u.splice(a+1,l-a,...c):this._lineOffsets=u=u.slice(0,a+1).concat(c,u.slice(l+1));let f=n.text.length-(s-o);if(f!==0)for(let m=a+1+c.length,T=u.length;m<T;m++)u[m]=u[m]+f}else if(t.isFull(n))this._content=n.text,this._lineOffsets=void 0;else throw new Error("Unknown change event received");this._version=r}getLineOffsets(){return this._lineOffsets===void 0&&(this._lineOffsets=TT(this._content,!0)),this._lineOffsets}positionAt(e){e=Math.max(Math.min(e,this._content.length),0);let r=this.getLineOffsets(),n=0,i=r.length;if(i===0)return{line:0,character:e};for(;n<i;){let s=Math.floor((n+i)/2);r[s]>e?i=s:n=s+1}let o=n-1;return{line:o,character:e-r[o]}}offsetAt(e){let r=this.getLineOffsets();if(e.line>=r.length)return this._content.length;if(e.line<0)return 0;let n=r[e.line],i=e.line+1<r.length?r[e.line+1]:this._content.length;return Math.max(Math.min(n+e.character,i),n)}get lineCount(){return this.getLineOffsets().length}static isIncremental(e){let r=e;return r!=null&&typeof r.text=="string"&&r.range!==void 0&&(r.rangeLength===void 0||typeof r.rangeLength=="number")}static isFull(e){let r=e;return r!=null&&typeof r.text=="string"&&r.range===void 0&&r.rangeLength===void 0}},Xo;(function(t){function e(i,o,s,a){return new Ou(i,o,s,a)}t.create=e;function r(i,o,s){if(i instanceof Ou)return i.update(o,s),i;throw new Error("TextDocument.update: document must be created by TextDocument.create")}t.update=r;function n(i,o){let s=i.getText(),a=xm(o.map(c_),(c,f)=>{let m=c.range.start.line-f.range.start.line;return m===0?c.range.start.character-f.range.start.character:m}),l=0,u=[];for(let c of a){let f=i.offsetAt(c.range.start);if(f<l)throw new Error("Overlapping edit");f>l&&u.push(s.substring(l,f)),c.newText.length&&u.push(c.newText),l=i.offsetAt(c.range.end)}return u.push(s.substr(l)),u.join("")}t.applyEdits=n})(Xo||(Xo={}));function xm(t,e){if(t.length<=1)return t;let r=t.length/2|0,n=t.slice(0,r),i=t.slice(r);xm(n,e),xm(i,e);let o=0,s=0,a=0;for(;o<n.length&&s<i.length;)e(n[o],i[s])<=0?t[a++]=n[o++]:t[a++]=i[s++];for(;o<n.length;)t[a++]=n[o++];for(;s<i.length;)t[a++]=i[s++];return t}function TT(t,e,r=0){let n=e?[r]:[];for(let i=0;i<t.length;i++){let o=t.charCodeAt(i);(o===13||o===10)&&(o===13&&i+1<t.length&&t.charCodeAt(i+1)===10&&i++,n.push(r+i+1))}return n}function vT(t){let e=t.start,r=t.end;return e.line>r.line||e.line===r.line&&e.character>r.character?{start:r,end:e}:t}function c_(t){let e=vT(t.range);return e!==t.range?{newText:t.newText,range:e}:t}function kt(t){return typeof t=="object"&&t!==null&&typeof t.$type=="string"}function Yn(t){return typeof t=="object"&&t!==null&&typeof t.$refText=="string"}function RT(t){return typeof t=="object"&&t!==null&&typeof t.name=="string"&&typeof t.type=="string"&&typeof t.path=="string"}function Yo(t){return typeof t=="object"&&t!==null&&kt(t.container)&&Yn(t.reference)&&typeof t.message=="string"}var lo=class{constructor(){this.subtypes={},this.allSubtypes={}}isInstance(e,r){return kt(e)&&this.isSubtype(e.$type,r)}isSubtype(e,r){if(e===r)return!0;let n=this.subtypes[e];n||(n=this.subtypes[e]={});let i=n[r];if(i!==void 0)return i;{let o=this.computeIsSubtype(e,r);return n[r]=o,o}}getAllSubTypes(e){let r=this.allSubtypes[e];if(r)return r;{let n=this.getAllTypes(),i=[];for(let o of n)this.isSubtype(o,e)&&i.push(o);return this.allSubtypes[e]=i,i}}};function Cn(t){return typeof t=="object"&&t!==null&&Array.isArray(t.content)}function uo(t){return typeof t=="object"&&t!==null&&typeof t.tokenType=="object"}function xT(t){return Cn(t)&&typeof t.fullText=="string"}var Nr=class t{constructor(e,r){this.startFn=e,this.nextFn=r}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),[Symbol.iterator]:()=>e};return e}[Symbol.iterator](){return this.iterator()}isEmpty(){return!!this.iterator().next().done}count(){let e=this.iterator(),r=0,n=e.next();for(;!n.done;)r++,n=e.next();return r}toArray(){let e=[],r=this.iterator(),n;do n=r.next(),n.value!==void 0&&e.push(n.value);while(!n.done);return e}toSet(){return new Set(this)}toMap(e,r){let n=this.map(i=>[e?e(i):i,r?r(i):i]);return new Map(n)}toString(){return this.join()}concat(e){let r=e[Symbol.iterator]();return new t(()=>({first:this.startFn(),firstDone:!1}),n=>{let i;if(!n.firstDone){do if(i=this.nextFn(n.first),!i.done)return i;while(!i.done);n.firstDone=!0}do if(i=r.next(),!i.done)return i;while(!i.done);return pr})}join(e=","){let r=this.iterator(),n="",i,o=!1;do i=r.next(),i.done||(o&&(n+=e),n+=f_(i.value)),o=!0;while(!i.done);return n}indexOf(e,r=0){let n=this.iterator(),i=0,o=n.next();for(;!o.done;){if(i>=r&&o.value===e)return i;o=n.next(),i++}return-1}every(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(!e(n.value))return!1;n=r.next()}return!0}some(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return!0;n=r.next()}return!1}forEach(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;)e(i.value,n),i=r.next(),n++}map(e){return new t(this.startFn,r=>{let{done:n,value:i}=this.nextFn(r);return n?pr:{done:!1,value:e(i)}})}filter(e){return new t(this.startFn,r=>{let n;do if(n=this.nextFn(r),!n.done&&e(n.value))return n;while(!n.done);return pr})}nonNullable(){return this.filter(e=>e!=null)}reduce(e,r){let n=this.iterator(),i=r,o=n.next();for(;!o.done;)i===void 0?i=o.value:i=e(i,o.value),o=n.next();return i}reduceRight(e,r){return this.recursiveReduce(this.iterator(),e,r)}recursiveReduce(e,r,n){let i=e.next();if(i.done)return n;let o=this.recursiveReduce(e,r,n);return o===void 0?i.value:r(o,i.value)}find(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return n.value;n=r.next()}}findIndex(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;){if(e(i.value))return n;i=r.next(),n++}return-1}includes(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(n.value===e)return!0;n=r.next()}return!1}flatMap(e){return new t(()=>({this:this.startFn()}),r=>{do{if(r.iterator){let o=r.iterator.next();if(o.done)r.iterator=void 0;else return o}let{done:n,value:i}=this.nextFn(r.this);if(!n){let o=e(i);if(Lu(o))r.iterator=o[Symbol.iterator]();else return{done:!1,value:o}}}while(r.iterator);return pr})}flat(e){if(e===void 0&&(e=1),e<=0)return this;let r=e>1?this.flat(e-1):this;return new t(()=>({this:r.startFn()}),n=>{do{if(n.iterator){let s=n.iterator.next();if(s.done)n.iterator=void 0;else return s}let{done:i,value:o}=r.nextFn(n.this);if(!i)if(Lu(o))n.iterator=o[Symbol.iterator]();else return{done:!1,value:o}}while(n.iterator);return pr})}head(){let r=this.iterator().next();if(!r.done)return r.value}tail(e=1){return new t(()=>{let r=this.startFn();for(let n=0;n<e;n++)if(this.nextFn(r).done)return r;return r},this.nextFn)}limit(e){return new t(()=>({size:0,state:this.startFn()}),r=>(r.size++,r.size>e?pr:this.nextFn(r.state)))}distinct(e){let r=new Set;return this.filter(n=>{let i=e?e(n):n;return r.has(i)?!1:(r.add(i),!0)})}exclude(e,r){let n=new Set;for(let i of e){let o=r?r(i):i;n.add(o)}return this.filter(i=>{let o=r?r(i):i;return!n.has(o)})}};function f_(t){return typeof t=="string"?t:typeof t>"u"?"undefined":typeof t.toString=="function"?t.toString():Object.prototype.toString.call(t)}function Lu(t){return!!t&&typeof t[Symbol.iterator]=="function"}var Jo=new Nr(()=>{},()=>pr),pr=Object.freeze({done:!0,value:void 0});function ie(...t){if(t.length===1){let e=t[0];if(e instanceof Nr)return e;if(Lu(e))return new Nr(()=>e[Symbol.iterator](),r=>r.next());if(typeof e.length=="number")return new Nr(()=>({index:0}),r=>r.index<e.length?{done:!1,value:e[r.index++]}:pr)}return t.length>1?new Nr(()=>({collIndex:0,arrIndex:0}),e=>{do{if(e.iterator){let r=e.iterator.next();if(!r.done)return r;e.iterator=void 0}if(e.array){if(e.arrIndex<e.array.length)return{done:!1,value:e.array[e.arrIndex++]};e.array=void 0,e.arrIndex=0}if(e.collIndex<t.length){let r=t[e.collIndex++];Lu(r)?e.iterator=r[Symbol.iterator]():r&&typeof r.length=="number"&&(e.array=r)}}while(e.iterator||e.array||e.collIndex<t.length);return pr}):Jo}var Wr=class extends Nr{constructor(e,r,n){super(()=>({iterators:n?.includeRoot?[[e][Symbol.iterator]()]:[r(e)[Symbol.iterator]()],pruned:!1}),i=>{for(i.pruned&&(i.iterators.pop(),i.pruned=!1);i.iterators.length>0;){let s=i.iterators[i.iterators.length-1].next();if(s.done)i.iterators.pop();else return i.iterators.push(r(s.value)[Symbol.iterator]()),s}return pr})}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),prune:()=>{e.state.pruned=!0},[Symbol.iterator]:()=>e};return e}},Ua;(function(t){function e(o){return o.reduce((s,a)=>s+a,0)}t.sum=e;function r(o){return o.reduce((s,a)=>s*a,0)}t.product=r;function n(o){return o.reduce((s,a)=>Math.min(s,a))}t.min=n;function i(o){return o.reduce((s,a)=>Math.max(s,a))}t.max=i})(Ua=Ua||(Ua={}));function Sm(t){return new Wr(t,e=>Cn(e)?e.content:[],{includeRoot:!0})}function AT(t){return Sm(t).filter(uo)}function CT(t,e){for(;t.container;)if(t=t.container,t===e)return!0;return!1}function qa(t){return{start:{character:t.startColumn-1,line:t.startLine-1},end:{character:t.endColumn,line:t.endLine-1}}}function nr(t){if(!t)return;let{offset:e,end:r,range:n}=t;return{range:n,offset:e,end:r,length:r-e}}var Jn;(function(t){t[t.Before=0]="Before",t[t.After=1]="After",t[t.OverlapFront=2]="OverlapFront",t[t.OverlapBack=3]="OverlapBack",t[t.Inside=4]="Inside"})(Jn=Jn||(Jn={}));function d_(t,e){if(t.end.line<e.start.line||t.end.line===e.start.line&&t.end.character<t.start.character)return Jn.Before;if(t.start.line>e.end.line||t.start.line===e.end.line&&t.start.character>e.end.character)return Jn.After;let r=t.start.line>e.start.line||t.start.line===e.start.line&&t.start.character>=e.start.character,n=t.end.line<e.end.line||t.end.line===e.end.line&&t.end.character<=e.end.character;return r&&n?Jn.Inside:r?Jn.OverlapBack:Jn.OverlapFront}function Mu(t,e){return d_(t,e)>Jn.After}var bm=/^[\w\p{L}]$/u;function It(t,e,r=bm){if(t){if(e>0){let n=e-t.offset,i=t.text.charAt(n);r.test(i)||e--}return xr(t,e)}}function wT(t,e){if(t){let r=p_(t,!0);if(r&&ST(r,e))return r;if(xT(t)){let n=t.content.findIndex(i=>!i.hidden);for(let i=n-1;i>=0;i--){let o=t.content[i];if(ST(o,e))return o}}}}function ST(t,e){return uo(t)&&e.includes(t.tokenType.name)}function xr(t,e){if(uo(t))return t;if(Cn(t)){let r=0,n=t.content.length-1;for(;r<n;){let i=Math.floor((r+n)/2),o=t.content[i];if(o.offset>e)n=i-1;else if(o.end<=e)r=i+1;else return xr(o,e)}if(r===n)return xr(t.content[r],e)}}function p_(t,e=!0){for(;t.container;){let r=t.container,n=r.content.indexOf(t);for(;n>0;){n--;let i=r.content[n];if(e||!i.hidden)return i}t=r}}function kT(t,e=!0){for(;t.container;){let r=t.container,n=r.content.indexOf(t),i=r.content.length-1;for(;n<i;){n++;let o=r.content[n];if(e||!o.hidden)return o}t=r}}function ET(t,e){let r=m_(t,e);return r?r.parent.content.slice(r.a+1,r.b):[]}function m_(t,e){let r=bT(t),n=bT(e),i;for(let o=0;o<r.length&&o<n.length;o++){let s=r[o],a=n[o];if(s.parent===a.parent)i={parent:s.parent,a:s.index,b:a.index};else break}return i}function bT(t){let e=[];for(;t.container;){let r=t.container,n=r.content.indexOf(t);e.push({parent:r,index:n}),t=r}return e.reverse()}function co(t,e,r,n){let i=[t,e,r,n].reduce(IT,{});return NT(i)}var Am=Symbol("isProxy");function Fu(t){if(t&&t[Am])for(let e of Object.values(t))Fu(e);return t}function NT(t,e){let r=new Proxy({},{deleteProperty:()=>!1,get:(n,i)=>_T(n,i,t,e||r),getOwnPropertyDescriptor:(n,i)=>(_T(n,i,t,e||r),Object.getOwnPropertyDescriptor(n,i)),has:(n,i)=>i in t,ownKeys:()=>[...Reflect.ownKeys(t),Am]});return r[Am]=!0,r}var $T=Symbol();function _T(t,e,r,n){if(e in t){if(t[e]instanceof Error)throw new Error("Construction failure. Please make sure that your dependencies are constructable.",{cause:t[e]});if(t[e]===$T)throw new Error('Cycle detected. Please make "'+String(e)+'" lazy. See https://langium.org/docs/configuration-services/#resolving-cyclic-dependencies');return t[e]}else if(e in r){let i=r[e];t[e]=$T;try{t[e]=typeof i=="function"?i(n):NT(i,n)}catch(o){throw t[e]=o instanceof Error?o:void 0,o}return t[e]}else return}function IT(t,e){if(e){for(let[r,n]of Object.entries(e))if(n!==void 0){let i=t[r];i!==null&&n!==null&&typeof i=="object"&&typeof n=="object"?t[r]=IT(i,n):t[r]=n}}return t}var Le=class{constructor(e){if(this.map=new Map,e)for(let[r,n]of e)this.add(r,n)}get size(){return Ua.sum(ie(this.map.values()).map(e=>e.length))}clear(){this.map.clear()}delete(e,r){if(r===void 0)return this.map.delete(e);{let n=this.map.get(e);if(n){let i=n.indexOf(r);if(i>=0)return n.length===1?this.map.delete(e):n.splice(i,1),!0}return!1}}get(e){var r;return(r=this.map.get(e))!==null&&r!==void 0?r:[]}has(e,r){if(r===void 0)return this.map.has(e);{let n=this.map.get(e);return n?n.indexOf(r)>=0:!1}}add(e,r){return this.map.has(e)?this.map.get(e).push(r):this.map.set(e,[r]),this}addAll(e,r){return this.map.has(e)?this.map.get(e).push(...r):this.map.set(e,Array.from(r)),this}forEach(e){this.map.forEach((r,n)=>r.forEach(i=>e(i,n,this)))}[Symbol.iterator](){return this.entries().iterator()}entries(){return ie(this.map.entries()).flatMap(([e,r])=>r.map(n=>[e,n]))}keys(){return ie(this.map.keys())}values(){return ie(this.map.values()).flat()}entriesGroupedByKey(){return ie(this.map.entries())}};var Cm="AbstractRule";var fo="AbstractType";var h_="Condition";var g_="TypeDefinition";var wm="AbstractElement";function Qo(t){return ue.isInstance(t,wm)}var PT="ArrayType";function po(t){return ue.isInstance(t,PT)}var DT="Conjunction";function OT(t){return ue.isInstance(t,DT)}var LT="Disjunction";function MT(t){return ue.isInstance(t,LT)}var FT="Grammar";function Zo(t){return ue.isInstance(t,FT)}var y_="GrammarImport";function Uu(t){return ue.isInstance(t,y_)}var T_="InferredType";function es(t){return ue.isInstance(t,T_)}var ja="Interface";function Sr(t){return ue.isInstance(t,ja)}var UT="LiteralCondition";function qT(t){return ue.isInstance(t,UT)}var GT="Negation";function jT(t){return ue.isInstance(t,GT)}var HT="Parameter";function KT(t){return ue.isInstance(t,HT)}var WT="ParameterReference";function ts(t){return ue.isInstance(t,WT)}var BT="ParserRule";function K(t){return ue.isInstance(t,BT)}var zT="ReferenceType";function mo(t){return ue.isInstance(t,zT)}var v_="ReturnType";function rs(t){return ue.isInstance(t,v_)}var VT="SimpleType";function ir(t){return ue.isInstance(t,VT)}var km="TerminalRule";function Ae(t){return ue.isInstance(t,km)}var Ha="Type";function Lt(t){return ue.isInstance(t,Ha)}var R_="TypeAttribute";function qu(t){return ue.isInstance(t,R_)}var XT="UnionType";function Br(t){return ue.isInstance(t,XT)}var YT="Action";function _e(t){return ue.isInstance(t,YT)}var JT="Alternatives";function Ir(t){return ue.isInstance(t,JT)}var QT="Assignment";function xe(t){return ue.isInstance(t,QT)}var ZT="CharacterRange";function Gu(t){return ue.isInstance(t,ZT)}var ev="CrossReference";function zt(t){return ue.isInstance(t,ev)}var tv="Group";function Mt(t){return ue.isInstance(t,tv)}var rv="Keyword";function dt(t){return ue.isInstance(t,rv)}var nv="NegatedToken";function iv(t){return ue.isInstance(t,nv)}var ov="RegexToken";function sv(t){return ue.isInstance(t,ov)}var av="RuleCall";function Ne(t){return ue.isInstance(t,av)}var lv="TerminalAlternatives";function uv(t){return ue.isInstance(t,lv)}var cv="TerminalGroup";function fv(t){return ue.isInstance(t,cv)}var dv="TerminalRuleCall";function ju(t){return ue.isInstance(t,dv)}var pv="UnorderedGroup";function Pr(t){return ue.isInstance(t,pv)}var mv="UntilToken";function hv(t){return ue.isInstance(t,mv)}var gv="Wildcard";function yv(t){return ue.isInstance(t,gv)}var Ga=class extends lo{getAllTypes(){return["AbstractElement","AbstractRule","AbstractType","Action","Alternatives","ArrayType","Assignment","CharacterRange","Condition","Conjunction","CrossReference","Disjunction","Grammar","GrammarImport","Group","InferredType","Interface","Keyword","LiteralCondition","NamedArgument","NegatedToken","Negation","Parameter","ParameterReference","ParserRule","ReferenceType","RegexToken","ReturnType","RuleCall","SimpleType","TerminalAlternatives","TerminalGroup","TerminalRule","TerminalRuleCall","Type","TypeAttribute","TypeDefinition","UnionType","UnorderedGroup","UntilToken","Wildcard"]}computeIsSubtype(e,r){switch(e){case YT:return this.isSubtype(wm,r)||this.isSubtype(fo,r);case JT:case QT:case ZT:case ev:case tv:case rv:case nv:case ov:case av:case lv:case cv:case dv:case pv:case mv:case gv:return this.isSubtype(wm,r);case PT:case zT:case VT:case XT:return this.isSubtype(g_,r);case DT:case LT:case UT:case GT:case WT:return this.isSubtype(h_,r);case ja:case Ha:return this.isSubtype(fo,r);case BT:return this.isSubtype(Cm,r)||this.isSubtype(fo,r);case km:return this.isSubtype(Cm,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){case"Action:type":case"CrossReference:type":case"Interface:superTypes":case"ParserRule:returnType":case"SimpleType:typeRef":return fo;case"Grammar:hiddenTokens":case"ParserRule:hiddenTokens":case"RuleCall:rule":return Cm;case"Grammar:usedGrammars":return FT;case"NamedArgument:parameter":case"ParameterReference:parameter":return HT;case"TerminalRuleCall:rule":return km;default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"Grammar":return{name:"Grammar",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"imports",type:"array"},{name:"interfaces",type:"array"},{name:"isDeclared",type:"boolean"},{name:"rules",type:"array"},{name:"types",type:"array"},{name:"usedGrammars",type:"array"}]};case"Interface":return{name:"Interface",mandatory:[{name:"attributes",type:"array"},{name:"superTypes",type:"array"}]};case"LiteralCondition":return{name:"LiteralCondition",mandatory:[{name:"true",type:"boolean"}]};case"NamedArgument":return{name:"NamedArgument",mandatory:[{name:"calledByName",type:"boolean"}]};case"ParserRule":return{name:"ParserRule",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"entry",type:"boolean"},{name:"fragment",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"parameters",type:"array"},{name:"wildcard",type:"boolean"}]};case"TerminalRule":return{name:"TerminalRule",mandatory:[{name:"fragment",type:"boolean"},{name:"hidden",type:"boolean"}]};case"TypeAttribute":return{name:"TypeAttribute",mandatory:[{name:"isOptional",type:"boolean"}]};case"UnionType":return{name:"UnionType",mandatory:[{name:"types",type:"array"}]};case"Alternatives":return{name:"Alternatives",mandatory:[{name:"elements",type:"array"}]};case"CrossReference":return{name:"CrossReference",mandatory:[{name:"deprecatedSyntax",type:"boolean"}]};case"Group":return{name:"Group",mandatory:[{name:"elements",type:"array"}]};case"RuleCall":return{name:"RuleCall",mandatory:[{name:"arguments",type:"array"}]};case"TerminalAlternatives":return{name:"TerminalAlternatives",mandatory:[{name:"elements",type:"array"}]};case"TerminalGroup":return{name:"TerminalGroup",mandatory:[{name:"elements",type:"array"}]};case"UnorderedGroup":return{name:"UnorderedGroup",mandatory:[{name:"elements",type:"array"}]};default:return{name:e,mandatory:[]}}}},ue=new Ga;function Tv(t){for(let[e,r]of Object.entries(t))e.startsWith("$")||(Array.isArray(r)?r.forEach((n,i)=>{kt(n)&&(n.$container=t,n.$containerProperty=e,n.$containerIndex=i)}):kt(r)&&(r.$container=t,r.$containerProperty=e))}function Ie(t,e){let r=t;for(;r;){if(e(r))return r;r=r.$container}}function ne(t){let r=Hu(t).$document;if(!r)throw new Error("AST node has no document.");return r}function Hu(t){for(;t.$container;)t=t.$container;return t}function ki(t,e){if(!t)throw new Error("Node must be an AstNode.");let r=e?.range;return new Nr(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),n=>{for(;n.keyIndex<n.keys.length;){let i=n.keys[n.keyIndex];if(!i.startsWith("$")){let o=t[i];if(kt(o)){if(n.keyIndex++,Em(o,r))return{done:!1,value:o}}else if(Array.isArray(o)){for(;n.arrayIndex<o.length;){let s=n.arrayIndex++,a=o[s];if(kt(a)&&Em(a,r))return{done:!1,value:a}}n.arrayIndex=0}}n.keyIndex++}return pr})}function Qe(t,e){if(!t)throw new Error("Root node must be an AstNode.");return new Wr(t,r=>ki(r,e))}function Zn(t,e){if(t){if(e?.range&&!Em(t,e.range))return new Wr(t,()=>[])}else throw new Error("Root node must be an AstNode.");return new Wr(t,r=>ki(r,e),{includeRoot:!0})}function Em(t,e){var r;if(!e)return!0;let n=(r=t.$cstNode)===null||r===void 0?void 0:r.range;return n?Mu(n,e):!1}function Ku(t){return new Nr(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),e=>{for(;e.keyIndex<e.keys.length;){let r=e.keys[e.keyIndex];if(!r.startsWith("$")){let n=t[r];if(Yn(n))return e.keyIndex++,{done:!1,value:{reference:n,container:t,property:r}};if(Array.isArray(n)){for(;e.arrayIndex<n.length;){let i=e.arrayIndex++,o=n[i];if(Yn(o))return{done:!1,value:{reference:o,container:t,property:r,index:i}}}e.arrayIndex=0}}e.keyIndex++}return pr})}function vv(t){var e,r;if(t){if("astNode"in t)return b_(t);if(Array.isArray(t))return t.reduce(Rv,void 0);{let n=t,i=x_(n)?S_((r=(e=n?.root)===null||e===void 0?void 0:e.astNode)!==null&&r!==void 0?r:n?.astNode):void 0;return ns(n,i)}}else return}function x_(t){return typeof t<"u"&&"element"in t&&"text"in t}function S_(t){try{return ne(t).uri.toString()}catch{return}}function b_(t){var e,r;let{astNode:n,property:i,index:o}=t??{},s=(e=n?.$cstNode)!==null&&e!==void 0?e:n?.$textRegion;if(!(n===void 0||s===void 0)){if(i===void 0)return ns(s,$m(n));{let a=l=>o!==void 0&&o>-1&&Array.isArray(n[i])?o<l.length?l[o]:void 0:l.reduce(Rv,void 0);if(!((r=s.assignments)===null||r===void 0)&&r[i]){let l=a(s.assignments[i]);return l&&ns(l,$m(n))}else if(n.$cstNode){let l=a(Ei(n.$cstNode,i));return l&&ns(l,$m(n))}else return}}}function $m(t){var e,r,n,i;return t.$cstNode?(r=(e=ne(t))===null||e===void 0?void 0:e.uri)===null||r===void 0?void 0:r.toString():t.$textRegion?t.$textRegion.documentURI||((i=(n=new Wr(t,o=>o.$container?[o.$container]:[]).find(o=>{var s;return(s=o.$textRegion)===null||s===void 0?void 0:s.documentURI}))===null||n===void 0?void 0:n.$textRegion)===null||i===void 0?void 0:i.documentURI):void 0}function ns(t,e){var r,n;let i={offset:t.offset,end:(r=t.end)!==null&&r!==void 0?r:t.offset+t.length,length:(n=t.length)!==null&&n!==void 0?n:t.end-t.offset};return t.range&&(i.range=t.range),e??(e=t.fileURI),e&&(i.fileURI=e),i}function Rv(t,e){var r,n;if(t){if(!e)return t&&ns(t)}else return e&&ns(e);let i=(r=t.end)!==null&&r!==void 0?r:t.offset+t.length,o=(n=e.end)!==null&&n!==void 0?n:e.offset+e.length,s=Math.min(t.offset,e.offset),a=Math.max(i,o),l=a-s,u={offset:s,end:a,length:l};if(t.range&&e.range&&(u.range={start:e.range.start.line<t.range.start.line||e.range.start.line===t.range.start.line&&e.range.start.character<t.range.start.character?e.range.start:t.range.start,end:e.range.end.line>t.range.end.line||e.range.end.line===t.range.end.line&&e.range.end.character>t.range.end.character?e.range.end:t.range.end}),t.fileURI||e.fileURI){let c=t.fileURI,f=e.fileURI,m=c&&f&&c!==f?`<unmergable text regions of ${c}, ${f}>`:c??f;u.fileURI=m}return u}var _m=class{constructor(e){this.defaultIndentation="    ",this.pendingIndent=!0,this.currentIndents=[],this.recentNonImmediateIndents=[],this.traceData=[],this.lines=[[]],typeof e=="string"?this.defaultIndentation=e:typeof e=="number"&&(this.defaultIndentation="".padStart(e))}get content(){return this.lines.map(e=>e.join("")).join("")}get currentLineNumber(){return this.lines.length-1}get currentLineContent(){return this.lines[this.currentLineNumber].join("")}get currentPosition(){return{offset:this.content.length,line:this.currentLineNumber,character:this.currentLineContent.length}}append(e,r){if(e.length>0){let n=r&&this.currentPosition;this.lines[this.currentLineNumber].push(e),n&&this.indentPendingTraceRegions(n)}}indentPendingTraceRegions(e){for(let r=this.traceData.length-1;r>=0;r--){let n=this.traceData[r];n.targetStart&&n.targetStart.offset===e.offset&&(n.targetStart=this.currentPosition)}}increaseIndent(e){this.currentIndents.push(e),e.indentImmediately||this.recentNonImmediateIndents.push(e)}decreaseIndent(){this.currentIndents.pop()}get relevantIndents(){return this.currentIndents.filter(e=>!this.recentNonImmediateIndents.includes(e))}resetCurrentLine(){this.lines[this.currentLineNumber]=[],this.pendingIndent=!0}addNewLine(){this.pendingIndent=!0,this.lines.push([]),this.recentNonImmediateIndents.length=0}pushTraceRegion(e){let r=A_(e,this.currentPosition,n=>{var i,o;return(o=(i=this.traceData[this.traceData.length-1])===null||i===void 0?void 0:i.children)===null||o===void 0?void 0:o.push(n)});return this.traceData.push(r),r}popTraceRegion(e){let r=this.traceData.pop();return this.assertTrue(r===e,"Trace region mismatch!"),r}getParentTraceSourceFileURI(){var e;for(let r=this.traceData.length-1;r>-1;r--){let n=(e=this.traceData[r].sourceRegion)===null||e===void 0?void 0:e.fileURI;if(n)return n}}assertTrue(e,r){if(!e)throw new Error(r)}};function A_(t,e,r){let n={sourceRegion:t,targetRegion:void 0,children:[],targetStart:e,complete:i=>{var o,s;return n.targetRegion={offset:n.targetStart.offset,end:i.offset,length:i.offset-n.targetStart.offset,range:{start:{line:n.targetStart.line,character:n.targetStart.character},end:{line:i.line,character:i.character}}},delete n.targetStart,((o=n.children)===null||o===void 0?void 0:o.length)===0&&delete n.children,!((s=n.targetRegion)===null||s===void 0)&&s.length&&r(n),delete n.complete,n}};return n}function xv(t,e){let r=new _m(e),n=r.pushTraceRegion(void 0);Sv(t,r),r.popTraceRegion(n),n.complete&&n.complete(r.currentPosition);let i=n.children&&n.children.length===1?n.children[0]:void 0,o=i?.targetRegion,s=n.targetRegion;return o&&i.sourceRegion&&o.offset===s.offset&&o.length===s.length?{text:r.content,trace:i}:{text:r.content,trace:n}}function Sv(t,e){typeof t=="string"?C_(t,e):t instanceof is?w_(t,e):t instanceof Vt?Cv(t,e):t instanceof $i&&k_(t,e)}function bv(t,e){return typeof t=="string"?t.length!==0:t instanceof Vt?t.contents.some(r=>bv(r,e)):t instanceof $i?!(t.ifNotEmpty&&e.currentLineContent.length===0):!1}function C_(t,e){t&&(e.pendingIndent&&Av(e,!1),e.append(t))}function Av(t,e){var r;let n="";for(let i of t.relevantIndents.filter(o=>o.indentEmptyLines||!e))n+=(r=i.indentation)!==null&&r!==void 0?r:t.defaultIndentation;t.append(n,!0),t.pendingIndent=!1}function Cv(t,e){let r,n=vv(t.tracedSource);n&&(r=e.pushTraceRegion(n));for(let i of t.contents)Sv(i,e);if(r){e.popTraceRegion(r);let i=e.getParentTraceSourceFileURI();i&&n?.fileURI===i&&delete n.fileURI,r.complete&&r.complete(e.currentPosition)}}function w_(t,e){var r;if(bv(t,e)){t.indentImmediately&&!e.pendingIndent&&e.append((r=t.indentation)!==null&&r!==void 0?r:e.defaultIndentation,!0);try{e.increaseIndent(t),Cv(t,e)}finally{e.decreaseIndent()}}}function k_(t,e){t.ifNotEmpty&&!E_(e.currentLineContent)?e.resetCurrentLine():(e.pendingIndent&&Av(e,!0),e.append(t.lineDelimiter),e.addNewLine())}function E_(t){return t.trimStart()!==""}var Xj=Object.freeze("__\xABSKIP^NEW^LINE^IF^EMPTY\xBB__"),Ka=/\r?\n/g,$_=/\S|$/;function wv(t){let e=t.filter(n=>n.length>0).map(n=>n.search($_)),r=e.length===0?0:Math.min(...e);return Math.max(0,r)}function Im(t,...e){let r=__(t),n=N_(t,e,r);return P_(n)}function $v(t,e,r){return(n,...i)=>Pm(t,e,r)(Im(n,...i))}function __(t){let e=t.join("_").split(Ka),r=e.length>1&&e[0].trim().length===0,n=r&&e.length>1&&e[e.length-1].trim().length===0;if(e.length===1||e.length!==0&&e[0].trim().length!==0||e.length===2&&e[1].trim().length===0)return{indentation:0,omitFirstLine:r,omitLastLine:n,trimLastLine:e.length!==1&&e[e.length-1].trim().length===0};{let i=r?e.slice(1):e;i=n?i.slice(0,i.length-1):i,i=i.filter(s=>s.length!==0);let o=wv(i);return{indentation:o,omitFirstLine:r,omitLastLine:n&&(e[e.length-1].length<o||!e[e.length-1].startsWith(i[0].substring(0,o)))}}}function N_(t,e,{indentation:r,omitFirstLine:n,omitLastLine:i,trimLastLine:o}){let s=[];t.forEach((u,c)=>{s.push(...u.split(Ka).map((f,m)=>m===0||f.length<r?f:f.substring(r)).reduce(c===0?(f,m,T)=>T===0?n?[]:[m]:T===1&&f.length===0?[m]:f.concat(Wu,m):(f,m,T)=>T===0?[m]:f.concat(Wu,m),[]).filter(f=>!(typeof f=="string"&&f.length===0)).concat(Wa(e[c])?e[c]:e[c]!==void 0?{content:String(e[c])}:c<e.length?_v:[]))});let a=s.length,l=a!==0?s[a-1]:void 0;return(i||o)&&typeof l=="string"&&l.trim().length===0?n&&a!==1&&s[a-2]===Wu?s.slice(0,a-2):s.slice(0,a-1):s}var Wu={isNewLine:!0},_v={isUndefinedSegment:!0},Ev=t=>t===Wu,Nm=t=>t===_v,I_=t=>t.content!==void 0;function P_(t){return t.reduce((r,n,i)=>Nm(n)?r:Ev(n)?{node:i!==0&&(Nm(t[i-1])||Wa(t[i-1]))||i>1&&typeof t[i-1]=="string"&&(Nm(t[i-2])||Wa(t[i-2]))?r.node.appendNewLineIfNotEmpty():r.node.appendNewLine()}:(()=>{var o;let s=(i===0||Ev(t[i-1]))&&typeof n=="string"&&n.length!==0?"".padStart(n.length-n.trimStart().length):"",a=I_(n)?n.content:n,l;return{node:r.indented?r.node:s.length!==0?r.node.indent({indentation:s,indentImmediately:!1,indentedChildren:u=>l=u.append(a)}):r.node.append(a),indented:l??((o=r.indented)===null||o===void 0?void 0:o.append(a))}})(),{node:new Vt}).node}var kv=typeof process>"u"?`
`:process.platform==="win32"?`\r
`:`
`;function Wa(t){return t instanceof Vt||t instanceof is||t instanceof $i}function os(t,e){return Wa(t)?xv(t,e).text:String(t)}var Vt=class t{constructor(...e){this.contents=[],this.append(...e)}isEmpty(){return this.contents.length===0}trace(e,r,n){if(kt(e)){if(this.tracedSource={astNode:e,property:r,index:n},this.tracedSource.property===void 0&&this.tracedSource.index!==void 0&&this.tracedSource.index>-1)throw new Error("Generation support: 'property' argument must not be 'undefined' if a non-negative value is assigned to 'index' in 'CompositeGeneratorNode.trace(...)'.")}else this.tracedSource=e;return this}append(...e){for(let r of e)typeof r=="function"?r(this):r&&this.contents.push(r);return this}appendIf(e,...r){return e?this.append(...r):this}appendNewLine(){return this.append(ot)}appendNewLineIf(e){return e?this.append(ot):this}appendNewLineIfNotEmpty(){return this.append(D_)}appendNewLineIfNotEmptyIf(e){return e?this.appendNewLineIfNotEmpty():this}appendTemplate(e,...r){return this.append(Im(e,...r))}appendTemplateIf(e){return e?(r,...n)=>this.appendTemplate(r,...n):()=>this}indent(e){let{indentedChildren:r,indentation:n,indentEmptyLines:i,indentImmediately:o}=Array.isArray(e)||typeof e=="function"?{indentedChildren:e}:typeof e=="object"?e:{},s=new is(n,o,i);return this.contents.push(s),Array.isArray(r)?s.append(...r):r&&s.append(r),this}appendTraced(e,r,n){return i=>this.append(new t().trace(e,r,n).append(i))}appendTracedIf(e,r,n,i){return e?this.appendTraced(typeof r=="function"?r():r,n,i):()=>this}appendTracedTemplate(e,r,n){return(i,...o)=>this.append($v(e,r,n)(i,...o))}appendTracedTemplateIf(e,r,n,i){return e?this.appendTracedTemplate(typeof r=="function"?r():r,n,i):()=>this}};function Pm(t,e,r){return n=>n instanceof Vt&&n.tracedSource===void 0?n.trace(t,e,r):new Vt().trace(t,e,r).append(n)}var is=class extends Vt{constructor(e,r=!0,n=!1){super(),this.indentImmediately=!0,this.indentEmptyLines=!1,typeof e=="string"?this.indentation=e:typeof e=="number"&&(this.indentation="".padStart(e)),this.indentImmediately=r,this.indentEmptyLines=n}},$i=class{constructor(e,r=!1){this.ifNotEmpty=!1,this.lineDelimiter=e??kv,this.ifNotEmpty=r}},ot=new $i,D_=new $i(void 0,!0);function ei(t){return"referenceType"in t}function ti(t){return"elementType"in t}function Pt(t){return"types"in t}function Lm(t){if(Pt(t)){let e=[];for(let r of t.types)e.push(...Lm(r));return e}else return[t]}function Dr(t){return"value"in t}function Or(t){return"primitive"in t}function wn(t){return"string"in t}function cn(t){return t&&"type"in t}function dn(t){return t&&"properties"in t}var zu=class{constructor(e,r){var n;this.superTypes=new Set,this.subTypes=new Set,this.typeNames=new Set,this.name=e,this.declared=(n=r?.declared)!==null&&n!==void 0?n:!1,this.dataType=r?.dataType}toAstTypesString(e){let r=new Vt;return r.append(`export type ${this.name} = ${fn(this.type,"AstType")};`,ot),e&&(r.append(ot),Pv(r,this.name)),this.dataType&&O_(r,this),os(r)}toDeclaredTypesString(e){let r=new Vt;return r.append(`type ${Mm(this.name,e)} = ${fn(this.type,"DeclaredType")};`,ot),os(r)}},ss=class t{get superProperties(){return this.getSuperProperties(new Set)}getSuperProperties(e){if(e.has(this.name))return[];e.add(this.name);let r=new Map;for(let n of this.properties)r.set(n.name,n);for(let n of this.interfaceSuperTypes){let i=n.getSuperProperties(e);for(let o of i)r.has(o.name)||r.set(o.name,o)}return Array.from(r.values())}get allProperties(){let e=new Map(this.superProperties.map(n=>[n.name,n]));for(let n of this.subTypes)this.getSubTypeProperties(n,e,new Set);return Array.from(e.values())}getSubTypeProperties(e,r,n){if(n.has(this.name))return;n.add(this.name);let i=dn(e)?e.properties:[];for(let o of i)r.has(o.name)||r.set(o.name,o);for(let o of e.subTypes)this.getSubTypeProperties(o,r,n)}get interfaceSuperTypes(){return Array.from(this.superTypes).filter(e=>e instanceof t)}constructor(e,r,n){this.superTypes=new Set,this.subTypes=new Set,this.containerTypes=new Set,this.typeNames=new Set,this.declared=!1,this.abstract=!1,this.properties=[],this.name=e,this.declared=r,this.abstract=n}toAstTypesString(e){let r=new Vt,n=this.interfaceSuperTypes.map(o=>o.name),i=n.length>0?ho([...n]):["AstNode"];return r.append(`export interface ${this.name} extends ${i.join(", ")} {`,ot),r.indent(o=>{this.containerTypes.size>0&&o.append(`readonly $container: ${ho([...this.containerTypes].map(s=>s.name)).join(" | ")};`,ot),this.typeNames.size>0&&o.append(`readonly $type: ${ho([...this.typeNames]).map(s=>`'${s}'`).join(" | ")};`,ot),Nv(o,this.properties,"AstType")}),r.append("}",ot),e&&(r.append(ot),Pv(r,this.name)),os(r)}toDeclaredTypesString(e){let r=new Vt,n=Mm(this.name,e),i=ho(this.interfaceSuperTypes.map(o=>o.name)).join(", ");return r.append(`interface ${n}${i.length>0?` extends ${i}`:""} {`,ot),r.indent(o=>Nv(o,this.properties,"DeclaredType",e)),r.append("}",ot),os(r)}},Vu=class extends Error{constructor(e,r){super(e),this.name="TypeResolutionError",this.target=r}};function za(t,e){return _i(t,e,new Map)}function _i(t,e,r){let n=`${Ba(t)}\xBB${Ba(e)}`,i=r.get(n);return i!==void 0||(r.set(n,!1),i=!1,Pt(t)?i=t.types.every(o=>_i(o,e,r)):Pt(e)?i=e.types.some(o=>_i(t,o,r)):Dr(e)&&cn(e.value)?Dr(t)&&cn(t.value)&&e.value.name===t.value.name?i=!0:i=_i(t,e.value.type,r):ei(t)?i=ei(e)&&_i(t.referenceType,e.referenceType,r):ti(t)?i=ti(e)&&_i(t.elementType,e.elementType,r):Dr(t)?cn(t.value)?i=_i(t.value.type,e,r):Dr(e)?cn(e.value)?i=_i(t,e.value.type,r):i=Iv(t.value,e.value,new Set):i=!1:Or(t)?i=Or(e)&&t.primitive===e.primitive:wn(t)&&(i=Or(e)&&e.primitive==="string"||wn(e)&&e.string===t.string),i&&r.set(n,i)),i}function Iv(t,e,r){let n=t.name;if(r.has(n))return!1;if(r.add(n),t.name===e.name)return!0;for(let i of t.superTypes)if(dn(i)&&Iv(i,e,r))return!0;return!1}function Ba(t){if(ei(t))return`@(${Ba(t.referenceType)})}`;if(ti(t))return`(${Ba(t.elementType)})[]`;if(Pt(t)){let e=t.types.map(r=>Ba(r)).join(" | ");return t.types.length<=1?`Union<${e}>`:e}else{if(Dr(t))return`Value<${t.value.name}>`;if(Or(t))return t.primitive;if(wn(t))return`'${t.string}'`}throw new Error("Invalid type")}function fn(t,e="AstType"){if(ei(t)){let r=fn(t.referenceType,e);return e==="AstType"?`Reference<${r}>`:`@${Dm(t.referenceType,r)}`}else if(ti(t)){let r=fn(t.elementType,e);return e==="AstType"?`Array<${r}>`:`${Dm(t.elementType,r)}[]`}else if(Pt(t)){let r=t.types.map(n=>Dm(n,fn(n,e)));return ho(r).join(" | ")}else{if(Dr(t))return t.value.name;if(Or(t))return t.primitive;if(wn(t)){let r=e==="AstType"?"'":'"';return`${r}${t.string}${r}`}}throw new Error("Invalid type")}function Dm(t,e){return Pt(t)&&(e=`(${e})`),e}function Nv(t,e,r,n=new Set){function i(o){let s=r==="AstType"?o.name:Mm(o.name,n),a=o.optional&&!Xu(o.type),l=fn(o.type,r);return`${s}${a?"?":""}: ${l}`}ho(e,(o,s)=>o.name.localeCompare(s.name)).forEach(o=>t.append(i(o),ot))}function Xu(t){return ti(t)?!0:ei(t)?!1:Pt(t)?t.types.every(e=>Xu(e)):Or(t)?t.primitive==="boolean":!1}function Pv(t,e){t.append(`export const ${e} = '${e}';`,ot),t.append(ot),t.append(`export function is${e}(item: unknown): item is ${e} {`,ot),t.indent(r=>r.append(`return reflection.isInstance(item, ${e});`,ot)),t.append("}",ot)}function O_(t,e){switch(e.dataType){case"string":if(Om(e.type)){let r=Array.from(e.subTypes).map(o=>o.name),n=Dv(e.type),i=Ov(e.type);if(r.length===0&&n.length===0&&i.length===0)Bu(t,e.name,`typeof item === '${e.dataType}'`);else{let o=L_(r,n,i);Bu(t,e.name,o)}}break;case"number":case"boolean":case"bigint":Bu(t,e.name,`typeof item === '${e.dataType}'`);break;case"Date":Bu(t,e.name,"item instanceof Date");break;default:return}}function Om(t){let e=!0;if(Or(t))return t.primitive==="string";if(wn(t))return!0;if(Pt(t)){for(let r of t.types)if(Dr(r))if(cn(r.value)){if(!Om(r.value.type))return!1}else return!1;else if(Or(r)){if(r.primitive!=="string"||!r.regex)return!1}else if(Pt(r))e=Om(r);else if(!wn(r))return!1}else return!1;return e}function L_(t,e,r){let n=[...t.map(i=>`is${i}(item)`),...e.map(i=>`item === '${i}'`)];if(r.length>0){let i=r.map(o=>`${o}.test(item)`).join(" || ");n.push(`(typeof item === 'string' && (${i}))`)}return n.join(" || ")}function Mm(t,e){return e.has(t)?`^${t}`:t}function Dv(t){let e=[];if(wn(t))return[t.string];if(Pt(t))for(let r of t.types)wn(r)?e.push(r.string):Pt(r)&&e.push(...Dv(r));return e}function Ov(t){let e=[];if(Or(t)&&t.primitive==="string"&&t.regex&&e.push(t.regex),Pt(t))for(let r of t.types)Or(r)&&r.primitive==="string"&&r.regex?e.push(r.regex):Pt(r)&&e.push(...Ov(r));return e}function Bu(t,e,r){t.append(ot,`export function is${e}(item: unknown): item is ${e} {`,ot),t.indent(n=>n.append(`return ${r};`,ot)),t.append("}",ot)}function ho(t,e){return Array.from(new Set(t)).sort(e)}function Fm(t,e,r,n){let i=new Set;return i.add(t),e.findReferences(t,{}).forEach(s=>{let a=r.getOrCreateDocument(s.sourceUri),l=n.getAstNode(a.parseResult.value,s.sourcePath);Sr(l)?(i.add(l),Fm(l,e,r,n).forEach(c=>i.add(c))):l&&Lt(l.$container)&&i.add(l.$container)}),i}function Va(t){let e=new Set;if(Sr(t))e.add(t),t.superTypes.forEach(r=>{if(Sr(r.ref)){e.add(r.ref);let n=Va(r.ref);for(let i of n)e.add(i)}});else if(Lt(t)){let r=Lv(t.type);for(let n of r){let i=Va(n);for(let o of i)e.add(o)}}return e}function Lv(t){var e;if(Br(t))return t.types.flatMap(r=>Lv(r));if(ir(t)){let r=(e=t.typeRef)===null||e===void 0?void 0:e.ref;if(Lt(r)||Sr(r))return[r]}return[]}function Um(t,e){return t.interfaces.concat(e.interfaces)}function Ju(t){return t.interfaces.concat(t.unions)}function Mv(t){let e=t.sort((i,o)=>i.name.localeCompare(o.name)).map(i=>({value:i,nodes:[]}));for(let i of e)i.nodes=e.filter(o=>i.value.superTypes.has(o.value.name));let r=[],n=e.filter(i=>i.nodes.length===0);for(;n.length>0;){let i=n.shift();r.includes(i)||(r.push(i),e.filter(o=>o.nodes.includes(i)).forEach(o=>n.push(o)))}return r.map(i=>i.value)}function Fv(t){return Yu(t,new Set)}function Yu(t,e){if(e.has(t))return[];if(e.add(t),Pt(t))return t.types.flatMap(r=>Yu(r,e));if(Dr(t)){let r=t.value;return"type"in r?Yu(r.type,e):[r.name]}else if(ti(t))return Yu(t.elementType,e);return[]}function Xa(t){return typeof t.name=="string"}var as=class{getName(e){if(Xa(e))return e.name}getNameNode(e){return Xt(e.$cstNode,"name")}};function J(t){return t.charCodeAt(0)}function Qu(t,e){Array.isArray(t)?t.forEach(function(r){e.push(r)}):e.push(t)}function ls(t,e){if(t[e]===!0)throw"duplicate flag "+e;let r=t[e];t[e]=!0}function go(t){if(t===void 0)throw Error("Internal Error - Should never get here!");return!0}function Ya(){throw Error("Internal Error - Should never get here!")}function qm(t){return t.type==="Character"}var Ja=[];for(let t=J("0");t<=J("9");t++)Ja.push(t);var Qa=[J("_")].concat(Ja);for(let t=J("a");t<=J("z");t++)Qa.push(t);for(let t=J("A");t<=J("Z");t++)Qa.push(t);var Gm=[J(" "),J("\f"),J(`
`),J("\r"),J("	"),J("\v"),J("	"),J("\xA0"),J("\u1680"),J("\u2000"),J("\u2001"),J("\u2002"),J("\u2003"),J("\u2004"),J("\u2005"),J("\u2006"),J("\u2007"),J("\u2008"),J("\u2009"),J("\u200A"),J("\u2028"),J("\u2029"),J("\u202F"),J("\u205F"),J("\u3000"),J("\uFEFF")];var M_=/[0-9a-fA-F]/,Zu=/[0-9]/,F_=/[1-9]/,yo=class{constructor(){this.idx=0,this.input="",this.groupIdx=0}saveState(){return{idx:this.idx,input:this.input,groupIdx:this.groupIdx}}restoreState(e){this.idx=e.idx,this.input=e.input,this.groupIdx=e.groupIdx}pattern(e){this.idx=0,this.input=e,this.groupIdx=0,this.consumeChar("/");let r=this.disjunction();this.consumeChar("/");let n={type:"Flags",loc:{begin:this.idx,end:e.length},global:!1,ignoreCase:!1,multiLine:!1,unicode:!1,sticky:!1};for(;this.isRegExpFlag();)switch(this.popChar()){case"g":ls(n,"global");break;case"i":ls(n,"ignoreCase");break;case"m":ls(n,"multiLine");break;case"u":ls(n,"unicode");break;case"y":ls(n,"sticky");break}if(this.idx!==this.input.length)throw Error("Redundant input: "+this.input.substring(this.idx));return{type:"Pattern",flags:n,value:r,loc:this.loc(0)}}disjunction(){let e=[],r=this.idx;for(e.push(this.alternative());this.peekChar()==="|";)this.consumeChar("|"),e.push(this.alternative());return{type:"Disjunction",value:e,loc:this.loc(r)}}alternative(){let e=[],r=this.idx;for(;this.isTerm();)e.push(this.term());return{type:"Alternative",value:e,loc:this.loc(r)}}term(){return this.isAssertion()?this.assertion():this.atom()}assertion(){let e=this.idx;switch(this.popChar()){case"^":return{type:"StartAnchor",loc:this.loc(e)};case"$":return{type:"EndAnchor",loc:this.loc(e)};case"\\":switch(this.popChar()){case"b":return{type:"WordBoundary",loc:this.loc(e)};case"B":return{type:"NonWordBoundary",loc:this.loc(e)}}throw Error("Invalid Assertion Escape");case"(":this.consumeChar("?");let r;switch(this.popChar()){case"=":r="Lookahead";break;case"!":r="NegativeLookahead";break}go(r);let n=this.disjunction();return this.consumeChar(")"),{type:r,value:n,loc:this.loc(e)}}return Ya()}quantifier(e=!1){let r,n=this.idx;switch(this.popChar()){case"*":r={atLeast:0,atMost:1/0};break;case"+":r={atLeast:1,atMost:1/0};break;case"?":r={atLeast:0,atMost:1};break;case"{":let i=this.integerIncludingZero();switch(this.popChar()){case"}":r={atLeast:i,atMost:i};break;case",":let o;this.isDigit()?(o=this.integerIncludingZero(),r={atLeast:i,atMost:o}):r={atLeast:i,atMost:1/0},this.consumeChar("}");break}if(e===!0&&r===void 0)return;go(r);break}if(!(e===!0&&r===void 0)&&go(r))return this.peekChar(0)==="?"?(this.consumeChar("?"),r.greedy=!1):r.greedy=!0,r.type="Quantifier",r.loc=this.loc(n),r}atom(){let e,r=this.idx;switch(this.peekChar()){case".":e=this.dotAll();break;case"\\":e=this.atomEscape();break;case"[":e=this.characterClass();break;case"(":e=this.group();break}return e===void 0&&this.isPatternCharacter()&&(e=this.patternCharacter()),go(e)?(e.loc=this.loc(r),this.isQuantifier()&&(e.quantifier=this.quantifier()),e):Ya()}dotAll(){return this.consumeChar("."),{type:"Set",complement:!0,value:[J(`
`),J("\r"),J("\u2028"),J("\u2029")]}}atomEscape(){switch(this.consumeChar("\\"),this.peekChar()){case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":return this.decimalEscapeAtom();case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}}decimalEscapeAtom(){return{type:"GroupBackReference",value:this.positiveInteger()}}characterClassEscape(){let e,r=!1;switch(this.popChar()){case"d":e=Ja;break;case"D":e=Ja,r=!0;break;case"s":e=Gm;break;case"S":e=Gm,r=!0;break;case"w":e=Qa;break;case"W":e=Qa,r=!0;break}return go(e)?{type:"Set",value:e,complement:r}:Ya()}controlEscapeAtom(){let e;switch(this.popChar()){case"f":e=J("\f");break;case"n":e=J(`
`);break;case"r":e=J("\r");break;case"t":e=J("	");break;case"v":e=J("\v");break}return go(e)?{type:"Character",value:e}:Ya()}controlLetterEscapeAtom(){this.consumeChar("c");let e=this.popChar();if(/[a-zA-Z]/.test(e)===!1)throw Error("Invalid ");return{type:"Character",value:e.toUpperCase().charCodeAt(0)-64}}nulCharacterAtom(){return this.consumeChar("0"),{type:"Character",value:J("\0")}}hexEscapeSequenceAtom(){return this.consumeChar("x"),this.parseHexDigits(2)}regExpUnicodeEscapeSequenceAtom(){return this.consumeChar("u"),this.parseHexDigits(4)}identityEscapeAtom(){let e=this.popChar();return{type:"Character",value:J(e)}}classPatternCharacterAtom(){switch(this.peekChar()){case`
`:case"\r":case"\u2028":case"\u2029":case"\\":case"]":throw Error("TBD");default:let e=this.popChar();return{type:"Character",value:J(e)}}}characterClass(){let e=[],r=!1;for(this.consumeChar("["),this.peekChar(0)==="^"&&(this.consumeChar("^"),r=!0);this.isClassAtom();){let n=this.classAtom(),i=n.type==="Character";if(qm(n)&&this.isRangeDash()){this.consumeChar("-");let o=this.classAtom(),s=o.type==="Character";if(qm(o)){if(o.value<n.value)throw Error("Range out of order in character class");e.push({from:n.value,to:o.value})}else Qu(n.value,e),e.push(J("-")),Qu(o.value,e)}else Qu(n.value,e)}return this.consumeChar("]"),{type:"Set",complement:r,value:e}}classAtom(){switch(this.peekChar()){case"]":case`
`:case"\r":case"\u2028":case"\u2029":throw Error("TBD");case"\\":return this.classEscape();default:return this.classPatternCharacterAtom()}}classEscape(){switch(this.consumeChar("\\"),this.peekChar()){case"b":return this.consumeChar("b"),{type:"Character",value:J("\b")};case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}}group(){let e=!0;switch(this.consumeChar("("),this.peekChar(0)){case"?":this.consumeChar("?"),this.consumeChar(":"),e=!1;break;default:this.groupIdx++;break}let r=this.disjunction();this.consumeChar(")");let n={type:"Group",capturing:e,value:r};return e&&(n.idx=this.groupIdx),n}positiveInteger(){let e=this.popChar();if(F_.test(e)===!1)throw Error("Expecting a positive integer");for(;Zu.test(this.peekChar(0));)e+=this.popChar();return parseInt(e,10)}integerIncludingZero(){let e=this.popChar();if(Zu.test(e)===!1)throw Error("Expecting an integer");for(;Zu.test(this.peekChar(0));)e+=this.popChar();return parseInt(e,10)}patternCharacter(){let e=this.popChar();switch(e){case`
`:case"\r":case"\u2028":case"\u2029":case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":throw Error("TBD");default:return{type:"Character",value:J(e)}}}isRegExpFlag(){switch(this.peekChar(0)){case"g":case"i":case"m":case"u":case"y":return!0;default:return!1}}isRangeDash(){return this.peekChar()==="-"&&this.isClassAtom(1)}isDigit(){return Zu.test(this.peekChar(0))}isClassAtom(e=0){switch(this.peekChar(e)){case"]":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}}isTerm(){return this.isAtom()||this.isAssertion()}isAtom(){if(this.isPatternCharacter())return!0;switch(this.peekChar(0)){case".":case"\\":case"[":case"(":return!0;default:return!1}}isAssertion(){switch(this.peekChar(0)){case"^":case"$":return!0;case"\\":switch(this.peekChar(1)){case"b":case"B":return!0;default:return!1}case"(":return this.peekChar(1)==="?"&&(this.peekChar(2)==="="||this.peekChar(2)==="!");default:return!1}}isQuantifier(){let e=this.saveState();try{return this.quantifier(!0)!==void 0}catch{return!1}finally{this.restoreState(e)}}isPatternCharacter(){switch(this.peekChar()){case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":case"/":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}}parseHexDigits(e){let r="";for(let i=0;i<e;i++){let o=this.popChar();if(M_.test(o)===!1)throw Error("Expecting a HexDecimal digits");r+=o}return{type:"Character",value:parseInt(r,16)}}peekChar(e=0){return this.input[this.idx+e]}popChar(){let e=this.peekChar(0);return this.consumeChar(void 0),e}consumeChar(e){if(e!==void 0&&this.input[this.idx]!==e)throw Error("Expected: '"+e+"' but found: '"+this.input[this.idx]+"' at offset: "+this.idx);if(this.idx>=this.input.length)throw Error("Unexpected end of input");this.idx++}loc(e){return{begin:e,end:this.idx}}};var kn=class{visitChildren(e){for(let r in e){let n=e[r];e.hasOwnProperty(r)&&(n.type!==void 0?this.visit(n):Array.isArray(n)&&n.forEach(i=>{this.visit(i)},this))}}visit(e){switch(e.type){case"Pattern":this.visitPattern(e);break;case"Flags":this.visitFlags(e);break;case"Disjunction":this.visitDisjunction(e);break;case"Alternative":this.visitAlternative(e);break;case"StartAnchor":this.visitStartAnchor(e);break;case"EndAnchor":this.visitEndAnchor(e);break;case"WordBoundary":this.visitWordBoundary(e);break;case"NonWordBoundary":this.visitNonWordBoundary(e);break;case"Lookahead":this.visitLookahead(e);break;case"NegativeLookahead":this.visitNegativeLookahead(e);break;case"Character":this.visitCharacter(e);break;case"Set":this.visitSet(e);break;case"Group":this.visitGroup(e);break;case"GroupBackReference":this.visitGroupBackReference(e);break;case"Quantifier":this.visitQuantifier(e);break}this.visitChildren(e)}visitPattern(e){}visitFlags(e){}visitDisjunction(e){}visitAlternative(e){}visitStartAnchor(e){}visitEndAnchor(e){}visitWordBoundary(e){}visitNonWordBoundary(e){}visitLookahead(e){}visitNegativeLookahead(e){}visitCharacter(e){}visitSet(e){}visitGroup(e){}visitGroupBackReference(e){}visitQuantifier(e){}};var U_=new yo,Hm=class extends kn{constructor(){super(...arguments),this.isStarting=!0,this.endRegexStack=[],this.multiline=!1}get endRegex(){return this.endRegexStack.join("")}reset(e){this.multiline=!1,this.regex=e,this.startRegex="",this.isStarting=!0,this.endRegexStack=[]}visitGroup(e){e.quantifier&&(this.isStarting=!1,this.endRegexStack=[])}visitCharacter(e){let r=String.fromCharCode(e.value);if(!this.multiline&&r===`
`&&(this.multiline=!0),e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let n=ri(r);this.endRegexStack.push(n),this.isStarting&&(this.startRegex+=n)}}visitSet(e){if(!this.multiline){let r=this.regex.substring(e.loc.begin,e.loc.end),n=new RegExp(r);this.multiline=!!`
`.match(n)}if(e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let r=this.regex.substring(e.loc.begin,e.loc.end);this.endRegexStack.push(r),this.isStarting&&(this.startRegex+=r)}}visitChildren(e){e.type==="Group"&&e.quantifier||super.visitChildren(e)}},jm=new Hm;function Uv(t){try{return typeof t=="string"&&(t=new RegExp(t)),t=t.toString(),jm.reset(t),jm.visit(U_.pattern(t)),jm.multiline}catch{return!1}}function Km(t){return(typeof t=="string"?new RegExp(t):t).test(" ")}function ri(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function qv(t){return Array.prototype.map.call(t,e=>/\w/.test(e)?`[${e.toLowerCase()}${e.toUpperCase()}]`:ri(e)).join("")}function Gv(t,e){let r=q_(t),n=e.match(r);return!!n&&n[0].length>0}function q_(t){typeof t=="string"&&(t=new RegExp(t));let e=t,r=t.source,n=0;function i(){let o="",s;function a(u){o+=r.substr(n,u),n+=u}function l(u){o+="(?:"+r.substr(n,u)+"|$)",n+=u}for(;n<r.length;)switch(r[n]){case"\\":switch(r[n+1]){case"c":l(3);break;case"x":l(4);break;case"u":e.unicode?r[n+2]==="{"?l(r.indexOf("}",n)-n+1):l(6):l(2);break;case"p":case"P":e.unicode?l(r.indexOf("}",n)-n+1):l(2);break;case"k":l(r.indexOf(">",n)-n+1);break;default:l(2);break}break;case"[":s=/\[(?:\\.|.)*?\]/g,s.lastIndex=n,s=s.exec(r)||[],l(s[0].length);break;case"|":case"^":case"$":case"*":case"+":case"?":a(1);break;case"{":s=/\{\d+,?\d*\}/g,s.lastIndex=n,s=s.exec(r),s?a(s[0].length):l(1);break;case"(":if(r[n+1]==="?")switch(r[n+2]){case":":o+="(?:",n+=3,o+=i()+"|$)";break;case"=":o+="(?=",n+=3,o+=i()+")";break;case"!":s=n,n+=3,i(),o+=r.substr(s,n-s);break;case"<":switch(r[n+3]){case"=":case"!":s=n,n+=4,i(),o+=r.substr(s,n-s);break;default:a(r.indexOf(">",n)-n+1),o+=i()+"|$)";break}break}else a(1),o+=i()+"|$)";break;case")":return++n,o;default:l(1);break}return o}return new RegExp(i(),t.flags)}var Wm={};ZC(Wm,{URI:()=>G_,Utils:()=>j_});var jv;(()=>{"use strict";var t={470:i=>{function o(l){if(typeof l!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(l))}function s(l,u){for(var c,f="",m=0,T=-1,b=0,C=0;C<=l.length;++C){if(C<l.length)c=l.charCodeAt(C);else{if(c===47)break;c=47}if(c===47){if(!(T===C-1||b===1))if(T!==C-1&&b===2){if(f.length<2||m!==2||f.charCodeAt(f.length-1)!==46||f.charCodeAt(f.length-2)!==46){if(f.length>2){var _=f.lastIndexOf("/");if(_!==f.length-1){_===-1?(f="",m=0):m=(f=f.slice(0,_)).length-1-f.lastIndexOf("/"),T=C,b=0;continue}}else if(f.length===2||f.length===1){f="",m=0,T=C,b=0;continue}}u&&(f.length>0?f+="/..":f="..",m=2)}else f.length>0?f+="/"+l.slice(T+1,C):f=l.slice(T+1,C),m=C-T-1;T=C,b=0}else c===46&&b!==-1?++b:b=-1}return f}var a={resolve:function(){for(var l,u="",c=!1,f=arguments.length-1;f>=-1&&!c;f--){var m;f>=0?m=arguments[f]:(l===void 0&&(l=process.cwd()),m=l),o(m),m.length!==0&&(u=m+"/"+u,c=m.charCodeAt(0)===47)}return u=s(u,!c),c?u.length>0?"/"+u:"/":u.length>0?u:"."},normalize:function(l){if(o(l),l.length===0)return".";var u=l.charCodeAt(0)===47,c=l.charCodeAt(l.length-1)===47;return(l=s(l,!u)).length!==0||u||(l="."),l.length>0&&c&&(l+="/"),u?"/"+l:l},isAbsolute:function(l){return o(l),l.length>0&&l.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var l,u=0;u<arguments.length;++u){var c=arguments[u];o(c),c.length>0&&(l===void 0?l=c:l+="/"+c)}return l===void 0?".":a.normalize(l)},relative:function(l,u){if(o(l),o(u),l===u||(l=a.resolve(l))===(u=a.resolve(u)))return"";for(var c=1;c<l.length&&l.charCodeAt(c)===47;++c);for(var f=l.length,m=f-c,T=1;T<u.length&&u.charCodeAt(T)===47;++T);for(var b=u.length-T,C=m<b?m:b,_=-1,w=0;w<=C;++w){if(w===C){if(b>C){if(u.charCodeAt(T+w)===47)return u.slice(T+w+1);if(w===0)return u.slice(T+w)}else m>C&&(l.charCodeAt(c+w)===47?_=w:w===0&&(_=0));break}var v=l.charCodeAt(c+w);if(v!==u.charCodeAt(T+w))break;v===47&&(_=w)}var y="";for(w=c+_+1;w<=f;++w)w!==f&&l.charCodeAt(w)!==47||(y.length===0?y+="..":y+="/..");return y.length>0?y+u.slice(T+_):(T+=_,u.charCodeAt(T)===47&&++T,u.slice(T))},_makeLong:function(l){return l},dirname:function(l){if(o(l),l.length===0)return".";for(var u=l.charCodeAt(0),c=u===47,f=-1,m=!0,T=l.length-1;T>=1;--T)if((u=l.charCodeAt(T))===47){if(!m){f=T;break}}else m=!1;return f===-1?c?"/":".":c&&f===1?"//":l.slice(0,f)},basename:function(l,u){if(u!==void 0&&typeof u!="string")throw new TypeError('"ext" argument must be a string');o(l);var c,f=0,m=-1,T=!0;if(u!==void 0&&u.length>0&&u.length<=l.length){if(u.length===l.length&&u===l)return"";var b=u.length-1,C=-1;for(c=l.length-1;c>=0;--c){var _=l.charCodeAt(c);if(_===47){if(!T){f=c+1;break}}else C===-1&&(T=!1,C=c+1),b>=0&&(_===u.charCodeAt(b)?--b==-1&&(m=c):(b=-1,m=C))}return f===m?m=C:m===-1&&(m=l.length),l.slice(f,m)}for(c=l.length-1;c>=0;--c)if(l.charCodeAt(c)===47){if(!T){f=c+1;break}}else m===-1&&(T=!1,m=c+1);return m===-1?"":l.slice(f,m)},extname:function(l){o(l);for(var u=-1,c=0,f=-1,m=!0,T=0,b=l.length-1;b>=0;--b){var C=l.charCodeAt(b);if(C!==47)f===-1&&(m=!1,f=b+1),C===46?u===-1?u=b:T!==1&&(T=1):u!==-1&&(T=-1);else if(!m){c=b+1;break}}return u===-1||f===-1||T===0||T===1&&u===f-1&&u===c+1?"":l.slice(u,f)},format:function(l){if(l===null||typeof l!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof l);return function(u,c){var f=c.dir||c.root,m=c.base||(c.name||"")+(c.ext||"");return f?f===c.root?f+m:f+"/"+m:m}(0,l)},parse:function(l){o(l);var u={root:"",dir:"",base:"",ext:"",name:""};if(l.length===0)return u;var c,f=l.charCodeAt(0),m=f===47;m?(u.root="/",c=1):c=0;for(var T=-1,b=0,C=-1,_=!0,w=l.length-1,v=0;w>=c;--w)if((f=l.charCodeAt(w))!==47)C===-1&&(_=!1,C=w+1),f===46?T===-1?T=w:v!==1&&(v=1):T!==-1&&(v=-1);else if(!_){b=w+1;break}return T===-1||C===-1||v===0||v===1&&T===C-1&&T===b+1?C!==-1&&(u.base=u.name=b===0&&m?l.slice(1,C):l.slice(b,C)):(b===0&&m?(u.name=l.slice(1,T),u.base=l.slice(1,C)):(u.name=l.slice(b,T),u.base=l.slice(b,C)),u.ext=l.slice(T,C)),b>0?u.dir=l.slice(0,b-1):m&&(u.dir="/"),u},sep:"/",delimiter:":",win32:null,posix:null};a.posix=a,i.exports=a}},e={};function r(i){var o=e[i];if(o!==void 0)return o.exports;var s=e[i]={exports:{}};return t[i](s,s.exports,r),s.exports}r.d=(i,o)=>{for(var s in o)r.o(o,s)&&!r.o(i,s)&&Object.defineProperty(i,s,{enumerable:!0,get:o[s]})},r.o=(i,o)=>Object.prototype.hasOwnProperty.call(i,o),r.r=i=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(i,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(i,"__esModule",{value:!0})};var n={};(()=>{let i;r.r(n),r.d(n,{URI:()=>m,Utils:()=>vt}),typeof process=="object"?i=process.platform==="win32":typeof navigator=="object"&&(i=navigator.userAgent.indexOf("Windows")>=0);let o=/^\w[\w\d+.-]*$/,s=/^\//,a=/^\/\//;function l(M,A){if(!M.scheme&&A)throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${M.authority}", path: "${M.path}", query: "${M.query}", fragment: "${M.fragment}"}`);if(M.scheme&&!o.test(M.scheme))throw new Error("[UriError]: Scheme contains illegal characters.");if(M.path){if(M.authority){if(!s.test(M.path))throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(a.test(M.path))throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}let u="",c="/",f=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;class m{static isUri(A){return A instanceof m||!!A&&typeof A.authority=="string"&&typeof A.fragment=="string"&&typeof A.path=="string"&&typeof A.query=="string"&&typeof A.scheme=="string"&&typeof A.fsPath=="string"&&typeof A.with=="function"&&typeof A.toString=="function"}scheme;authority;path;query;fragment;constructor(A,q,j,le,ee,Q=!1){typeof A=="object"?(this.scheme=A.scheme||u,this.authority=A.authority||u,this.path=A.path||u,this.query=A.query||u,this.fragment=A.fragment||u):(this.scheme=function(Rt,ut){return Rt||ut?Rt:"file"}(A,Q),this.authority=q||u,this.path=function(Rt,ut){switch(Rt){case"https":case"http":case"file":ut?ut[0]!==c&&(ut=c+ut):ut=c}return ut}(this.scheme,j||u),this.query=le||u,this.fragment=ee||u,l(this,Q))}get fsPath(){return v(this,!1)}with(A){if(!A)return this;let{scheme:q,authority:j,path:le,query:ee,fragment:Q}=A;return q===void 0?q=this.scheme:q===null&&(q=u),j===void 0?j=this.authority:j===null&&(j=u),le===void 0?le=this.path:le===null&&(le=u),ee===void 0?ee=this.query:ee===null&&(ee=u),Q===void 0?Q=this.fragment:Q===null&&(Q=u),q===this.scheme&&j===this.authority&&le===this.path&&ee===this.query&&Q===this.fragment?this:new b(q,j,le,ee,Q)}static parse(A,q=!1){let j=f.exec(A);return j?new b(j[2]||u,X(j[4]||u),X(j[5]||u),X(j[7]||u),X(j[9]||u),q):new b(u,u,u,u,u)}static file(A){let q=u;if(i&&(A=A.replace(/\\/g,c)),A[0]===c&&A[1]===c){let j=A.indexOf(c,2);j===-1?(q=A.substring(2),A=c):(q=A.substring(2,j),A=A.substring(j)||c)}return new b("file",q,A,u,u)}static from(A){let q=new b(A.scheme,A.authority,A.path,A.query,A.fragment);return l(q,!0),q}toString(A=!1){return y(this,A)}toJSON(){return this}static revive(A){if(A){if(A instanceof m)return A;{let q=new b(A);return q._formatted=A.external,q._fsPath=A._sep===T?A.fsPath:null,q}}return A}}let T=i?1:void 0;class b extends m{_formatted=null;_fsPath=null;get fsPath(){return this._fsPath||(this._fsPath=v(this,!1)),this._fsPath}toString(A=!1){return A?y(this,!0):(this._formatted||(this._formatted=y(this,!1)),this._formatted)}toJSON(){let A={$mid:1};return this._fsPath&&(A.fsPath=this._fsPath,A._sep=T),this._formatted&&(A.external=this._formatted),this.path&&(A.path=this.path),this.scheme&&(A.scheme=this.scheme),this.authority&&(A.authority=this.authority),this.query&&(A.query=this.query),this.fragment&&(A.fragment=this.fragment),A}}let C={58:"%3A",47:"%2F",63:"%3F",35:"%23",91:"%5B",93:"%5D",64:"%40",33:"%21",36:"%24",38:"%26",39:"%27",40:"%28",41:"%29",42:"%2A",43:"%2B",44:"%2C",59:"%3B",61:"%3D",32:"%20"};function _(M,A,q){let j,le=-1;for(let ee=0;ee<M.length;ee++){let Q=M.charCodeAt(ee);if(Q>=97&&Q<=122||Q>=65&&Q<=90||Q>=48&&Q<=57||Q===45||Q===46||Q===95||Q===126||A&&Q===47||q&&Q===91||q&&Q===93||q&&Q===58)le!==-1&&(j+=encodeURIComponent(M.substring(le,ee)),le=-1),j!==void 0&&(j+=M.charAt(ee));else{j===void 0&&(j=M.substr(0,ee));let Rt=C[Q];Rt!==void 0?(le!==-1&&(j+=encodeURIComponent(M.substring(le,ee)),le=-1),j+=Rt):le===-1&&(le=ee)}}return le!==-1&&(j+=encodeURIComponent(M.substring(le))),j!==void 0?j:M}function w(M){let A;for(let q=0;q<M.length;q++){let j=M.charCodeAt(q);j===35||j===63?(A===void 0&&(A=M.substr(0,q)),A+=C[j]):A!==void 0&&(A+=M[q])}return A!==void 0?A:M}function v(M,A){let q;return q=M.authority&&M.path.length>1&&M.scheme==="file"?`//${M.authority}${M.path}`:M.path.charCodeAt(0)===47&&(M.path.charCodeAt(1)>=65&&M.path.charCodeAt(1)<=90||M.path.charCodeAt(1)>=97&&M.path.charCodeAt(1)<=122)&&M.path.charCodeAt(2)===58?A?M.path.substr(1):M.path[1].toLowerCase()+M.path.substr(2):M.path,i&&(q=q.replace(/\//g,"\\")),q}function y(M,A){let q=A?w:_,j="",{scheme:le,authority:ee,path:Q,query:Rt,fragment:ut}=M;if(le&&(j+=le,j+=":"),(ee||le==="file")&&(j+=c,j+=c),ee){let me=ee.indexOf("@");if(me!==-1){let Er=ee.substr(0,me);ee=ee.substr(me+1),me=Er.lastIndexOf(":"),me===-1?j+=q(Er,!1,!1):(j+=q(Er.substr(0,me),!1,!1),j+=":",j+=q(Er.substr(me+1),!1,!0)),j+="@"}ee=ee.toLowerCase(),me=ee.lastIndexOf(":"),me===-1?j+=q(ee,!1,!0):(j+=q(ee.substr(0,me),!1,!0),j+=ee.substr(me))}if(Q){if(Q.length>=3&&Q.charCodeAt(0)===47&&Q.charCodeAt(2)===58){let me=Q.charCodeAt(1);me>=65&&me<=90&&(Q=`/${String.fromCharCode(me+32)}:${Q.substr(3)}`)}else if(Q.length>=2&&Q.charCodeAt(1)===58){let me=Q.charCodeAt(0);me>=65&&me<=90&&(Q=`${String.fromCharCode(me+32)}:${Q.substr(2)}`)}j+=q(Q,!0,!1)}return Rt&&(j+="?",j+=q(Rt,!1,!1)),ut&&(j+="#",j+=A?ut:_(ut,!1,!1)),j}function $(M){try{return decodeURIComponent(M)}catch{return M.length>3?M.substr(0,3)+$(M.substr(3)):M}}let D=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function X(M){return M.match(D)?M.replace(D,A=>$(A)):M}var ye=r(470);let Ee=ye.posix||ye,jt="/";var vt;(function(M){M.joinPath=function(A,...q){return A.with({path:Ee.join(A.path,...q)})},M.resolvePath=function(A,...q){let j=A.path,le=!1;j[0]!==jt&&(j=jt+j,le=!0);let ee=Ee.resolve(j,...q);return le&&ee[0]===jt&&!A.authority&&(ee=ee.substring(1)),A.with({path:ee})},M.dirname=function(A){if(A.path.length===0||A.path===jt)return A;let q=Ee.dirname(A.path);return q.length===1&&q.charCodeAt(0)===46&&(q=""),A.with({path:q})},M.basename=function(A){return Ee.basename(A.path)},M.extname=function(A){return Ee.extname(A.path)}})(vt||(vt={}))})(),jv=n})();var{URI:G_,Utils:j_}=jv;var ni=Wm;"default"in ni&&(ni=ni.default);var Yt=ni.URI;var ve;(function(t){t.basename=ni.Utils.basename,t.dirname=ni.Utils.dirname,t.extname=ni.Utils.extname,t.joinPath=ni.Utils.joinPath,t.resolvePath=ni.Utils.resolvePath;function e(n,i){return n?.toString()===i?.toString()}t.equals=e;function r(n,i){let o=typeof n=="string"?n:n.path,s=typeof i=="string"?i:i.path,a=o.split("/").filter(m=>m.length>0),l=s.split("/").filter(m=>m.length>0),u=0;for(;u<a.length&&a[u]===l[u];u++);let c="../".repeat(a.length-u),f=l.slice(u).join("/");return c+f}t.relative=r})(ve=ve||(ve={}));var CH=ve.equals,wH=ve.relative;var ec,Hv=()=>ec??(ec=tc(`{"$type":"Grammar","isDeclared":true,"name":"LangiumGrammar","rules":[{"$type":"ParserRule","name":"Grammar","entry":true,"definition":{"$type":"Group","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"isDeclared","operator":"?=","terminal":{"$type":"Keyword","value":"grammar"}},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"with"},{"$type":"Assignment","feature":"usedGrammars","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"usedGrammars","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"definesHiddenTokens","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"}},{"$type":"Keyword","value":"("},{"$type":"Group","elements":[{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":")"}],"cardinality":"?"}],"cardinality":"?"},{"$type":"Assignment","feature":"imports","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]},"cardinality":"*"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"rules","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]}},{"$type":"Assignment","feature":"interfaces","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}},{"$type":"Assignment","feature":"types","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]}}],"cardinality":"+"}]},"definesHiddenTokens":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Interface","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"interface"},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"extends"},{"$type":"Assignment","feature":"superTypes","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"superTypes","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"SchemaType","fragment":true,"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"{"},{"$type":"Assignment","feature":"attributes","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]},"cardinality":"*"},{"$type":"Keyword","value":"}"},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TypeAttribute","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"isOptional","operator":"?=","terminal":{"$type":"Keyword","value":"?"},"cardinality":"?"},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TypeDefinition","definition":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UnionType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UnionType"},"feature":"types","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"types","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ArrayType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"ArrayType"},"feature":"elementType","operator":"="},{"$type":"Keyword","value":"["},{"$type":"Keyword","value":"]"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ReferenceType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"ReferenceType"}},{"$type":"Keyword","value":"@"},{"$type":"Assignment","feature":"referenceType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"SimpleType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]},{"$type":"Keyword","value":")"}]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"SimpleType"}},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"typeRef","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"primitiveType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}},{"$type":"Assignment","feature":"stringType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}}]}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PrimitiveType","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"string"},{"$type":"Keyword","value":"number"},{"$type":"Keyword","value":"boolean"},{"$type":"Keyword","value":"Date"},{"$type":"Keyword","value":"bigint"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Type","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"type"},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Keyword","value":"="},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractRule","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@46"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"GrammarImport","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"import"},{"$type":"Assignment","feature":"path","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParserRule","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"entry","operator":"?=","terminal":{"$type":"Keyword","value":"entry"}},{"$type":"Assignment","feature":"fragment","operator":"?=","terminal":{"$type":"Keyword","value":"fragment"}}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"wildcard","operator":"?=","terminal":{"$type":"Keyword","value":"*"}},{"$type":"Group","elements":[{"$type":"Keyword","value":"returns"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"returnType","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"dataType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}}]}]},{"$type":"Assignment","feature":"inferredType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[{"$type":"NamedArgument","value":{"$type":"LiteralCondition","true":false},"calledByName":false}]}}],"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"definesHiddenTokens","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"}},{"$type":"Keyword","value":"("},{"$type":"Group","elements":[{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":")"}],"cardinality":"?"},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"definition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},{"$type":"Keyword","value":";"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"InferredType","parameters":[{"$type":"Parameter","name":"imperative"}],"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Group","guardCondition":{"$type":"ParameterReference","parameter":{"$ref":"#/rules@14/parameters@0"}},"elements":[{"$type":"Keyword","value":"infer"}]},{"$type":"Group","guardCondition":{"$type":"Negation","value":{"$type":"ParameterReference","parameter":{"$ref":"#/rules@14/parameters@0"}}},"elements":[{"$type":"Keyword","value":"infers"}]}]},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"wildcard":false},{"$type":"ParserRule","name":"RuleNameAndParams","fragment":true,"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"parameters","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"parameters","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Parameter","definition":{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Alternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Alternatives"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ConditionalBranch","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Group"}},{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"guardCondition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]}},{"$type":"Keyword","value":">"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},"cardinality":"+"}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UnorderedGroup","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UnorderedGroup"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"&"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Group","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Group"},"feature":"elements","operator":"+="},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractTokenWithCardinality","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@37"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@24"},"arguments":[]}]},{"$type":"Assignment","feature":"cardinality","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?"},{"$type":"Keyword","value":"*"},{"$type":"Keyword","value":"+"}]},"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Action","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Action"}},{"$type":"Keyword","value":"{"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"inferredType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[{"$type":"NamedArgument","value":{"$type":"LiteralCondition","true":true},"calledByName":false}]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"."},{"$type":"Assignment","feature":"feature","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"operator","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"="},{"$type":"Keyword","value":"+="}]}},{"$type":"Keyword","value":"current"}],"cardinality":"?"},{"$type":"Keyword","value":"}"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@43"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@35"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@36"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@44"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Keyword","definition":{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"RuleCall","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}}],"cardinality":"*"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"NamedArgument","definition":{"$type":"Group","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"parameter","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@16"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"calledByName","operator":"?=","terminal":{"$type":"Keyword","value":"="}}],"cardinality":"?"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"LiteralCondition","definition":{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"true","operator":"?=","terminal":{"$type":"Keyword","value":"true"}},{"$type":"Keyword","value":"false"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Disjunction","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@30"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Disjunction"},"feature":"left","operator":"="},{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@30"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Conjunction","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Conjunction"},"feature":"left","operator":"="},{"$type":"Keyword","value":"&"},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Negation","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@32"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Negation"}},{"$type":"Keyword","value":"!"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]}}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Atom","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@34"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@33"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@28"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedCondition","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParameterReference","definition":{"$type":"Assignment","feature":"parameter","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@16"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedKeyword","inferredType":{"$type":"InferredType","name":"Keyword"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedRuleCall","inferredType":{"$type":"InferredType","name":"RuleCall"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}}],"cardinality":"*"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Assignment","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Assignment"}},{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}],"cardinality":"?"},{"$type":"Assignment","feature":"feature","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"operator","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"+="},{"$type":"Keyword","value":"="},{"$type":"Keyword","value":"?="}]}},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AssignableTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@39"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedAssignableElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@40"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AssignableAlternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Alternatives"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CrossReference","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"CrossReference"}},{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"deprecatedSyntax","operator":"?=","terminal":{"$type":"Keyword","value":"|"}},{"$type":"Keyword","value":":"}]},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@42"},"arguments":[]}}],"cardinality":"?"},{"$type":"Keyword","value":"]"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CrossReferenceableTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedGroup","inferredType":{"$type":"InferredType","name":"Group"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ReturnType","definition":{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalRule","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"hidden","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"},"cardinality":"?"},{"$type":"Keyword","value":"terminal"},{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"fragment","operator":"?=","terminal":{"$type":"Keyword","value":"fragment"}},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"returns"},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@45"},"arguments":[]}}],"cardinality":"?"}]}]},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"definition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@47"},"arguments":[]}},{"$type":"Keyword","value":";"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalAlternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalAlternatives"},"feature":"elements","operator":"+="},{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalGroup","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@49"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalGroup"},"feature":"elements","operator":"+="},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@49"},"arguments":[]},"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]},{"$type":"Assignment","feature":"cardinality","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?"},{"$type":"Keyword","value":"*"},{"$type":"Keyword","value":"+"}]},"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalTokenElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@57"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@52"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@51"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@53"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@54"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@55"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@56"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedTerminalElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"lookahead","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?="},{"$type":"Keyword","value":"?!"}]},"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@47"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalRuleCall","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalRuleCall"}},{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@46"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"NegatedToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"NegatedToken"}},{"$type":"Keyword","value":"!"},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UntilToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UntilToken"}},{"$type":"Keyword","value":"->"},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"RegexToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"RegexToken"}},{"$type":"Assignment","feature":"regex","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@61"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Wildcard","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Wildcard"}},{"$type":"Keyword","value":"."}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CharacterRange","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"CharacterRange"}},{"$type":"Assignment","feature":"left","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":".."},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]}}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"FeatureName","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"current"},{"$type":"Keyword","value":"entry"},{"$type":"Keyword","value":"extends"},{"$type":"Keyword","value":"false"},{"$type":"Keyword","value":"fragment"},{"$type":"Keyword","value":"grammar"},{"$type":"Keyword","value":"hidden"},{"$type":"Keyword","value":"import"},{"$type":"Keyword","value":"interface"},{"$type":"Keyword","value":"returns"},{"$type":"Keyword","value":"terminal"},{"$type":"Keyword","value":"true"},{"$type":"Keyword","value":"type"},{"$type":"Keyword","value":"infer"},{"$type":"Keyword","value":"infers"},{"$type":"Keyword","value":"with"},{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"ID","definition":{"$type":"RegexToken","regex":"/\\\\^?[_a-zA-Z][\\\\w_]*/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","definition":{"$type":"RegexToken","regex":"/\\"(\\\\\\\\.|[^\\"\\\\\\\\])*\\"|'(\\\\\\\\.|[^'\\\\\\\\])*'/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"RegexLiteral","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\\\/(?![*+?])(?:[^\\\\r\\\\n\\\\[/\\\\\\\\]|\\\\\\\\.|\\\\[(?:[^\\\\r\\\\n\\\\]\\\\\\\\]|\\\\\\\\.)*\\\\])+\\\\/[a-z]*/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WS","definition":{"$type":"RegexToken","regex":"/\\\\s+/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"ML_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\/\\\\*[\\\\s\\\\S]*?\\\\*\\\\//"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SL_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\/\\\\/[^\\\\n\\\\r]*/"},"fragment":false}],"types":[{"$type":"Type","name":"AbstractType","type":{"$type":"UnionType","types":[{"$type":"SimpleType","typeRef":{"$ref":"#/rules@1"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@10"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@23/definition/elements@0"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@13"}}]}}],"definesHiddenTokens":false,"hiddenTokens":[],"imports":[],"interfaces":[],"usedGrammars":[]}`));var ic=de(io(),1);var Za=de(Vn(),1);function H_(){return new Promise(t=>{typeof setImmediate>"u"?setTimeout(t,0):setImmediate(t)})}var Kv=0,K_=10;var Wv=Symbol("OperationCancelled");function To(t){return t===Wv}async function Ze(t){if(t===Za.CancellationToken.None)return;let e=Date.now();if(e-Kv>=K_&&(Kv=e,await H_()),t.isCancellationRequested)throw Wv}var rc=class{constructor(){this.previousAction=Promise.resolve(),this.previousTokenSource=new Za.CancellationTokenSource}lock(e){this.cancel();let r=new Za.CancellationTokenSource;return this.previousTokenSource=r,this.previousAction=this.previousAction.then(()=>e(r.token).catch(n=>{To(n)||console.error("Error: ",n)}))}cancel(){this.previousTokenSource.cancel()}};function Lr(t){return{code:t}}var us;(function(t){t.all=["fast","slow","built-in"]})(us=us||(us={}));var nc=class{constructor(e){this.entries=new Le,this.reflection=e.shared.AstReflection}register(e,r=this,n="fast"){if(n==="built-in")throw new Error("The 'built-in' category is reserved for lexer, parser, and linker errors.");for(let[i,o]of Object.entries(e)){let s=o;if(Array.isArray(s))for(let a of s){let l={check:this.wrapValidationException(a,r),category:n};this.addEntry(i,l)}else if(typeof s=="function"){let a={check:this.wrapValidationException(s,r),category:n};this.addEntry(i,a)}}}wrapValidationException(e,r){return async(n,i,o)=>{try{await e.call(r,n,i,o)}catch(s){if(To(s))throw s;console.error("An error occurred during validation:",s);let a=s instanceof Error?s.message:String(s);s instanceof Error&&s.stack&&console.error(s.stack),i("error","An error occurred during validation: "+a,{node:n})}}}addEntry(e,r){if(e==="AstNode"){this.entries.add("AstNode",r);return}for(let n of this.reflection.getAllSubTypes(e))this.entries.add(n,r)}getChecks(e,r){let n=ie(this.entries.get(e)).concat(this.entries.get("AstNode"));return r&&(n=n.filter(i=>r.includes(i.category))),n.map(i=>i.check)}};function Bv(t,e){let r={unions:[],interfaces:[]};for(let n of t){let i=[];for(let a of n.attributes)i.push({name:a.name,optional:a.isOptional,astNodes:new Set([a]),type:vo(a.type)});let o=new Set;for(let a of n.superTypes)a.ref&&o.add(pn(a.ref));let s={name:n.name,declared:!0,abstract:!1,properties:i,superTypes:o,subTypes:new Set};r.interfaces.push(s)}for(let n of e){let i={name:n.name,declared:!0,type:vo(n.type),superTypes:new Set,subTypes:new Set};r.unions.push(i)}return r}function vo(t){if(po(t))return{elementType:vo(t.elementType)};if(mo(t))return{referenceType:vo(t.referenceType)};if(Br(t))return{types:t.types.map(vo)};if(ir(t)){let e;if(t.primitiveType)return e=t.primitiveType,{primitive:e};if(t.stringType)return e=t.stringType,{string:e};if(t.typeRef){let r=t.typeRef.ref,n=En(r);if(n)return cs(n)?{primitive:n}:{value:n}}}return{primitive:"unknown"}}function fs(t){return"referenceType"in t}function Bm(t){return"elementType"in t}function zv(t){return"types"in t}function zm(t){return"value"in t}function W_(t){return"primitive"in t}function B_(t){return"string"in t}function Vv(t){let e=new Map,r=new Map;for(let n of t.interfaces){let i=new ss(n.name,n.declared,n.abstract);e.set(n.name,i)}for(let n of t.unions){let i=new zu(n.name,{declared:n.declared,dataType:n.dataType});r.set(n.name,i)}for(let n of t.interfaces){let i=e.get(n.name);for(let o of n.superTypes){let s=e.get(o)||r.get(o);s&&i.superTypes.add(s)}for(let o of n.subTypes){let s=e.get(o)||r.get(o);s&&i.subTypes.add(s)}for(let o of n.properties){let s=z_(o,e,r);i.properties.push(s)}}for(let n of t.unions){let i=r.get(n.name);i.type=el(n.type,i,e,r)}return{interfaces:Array.from(e.values()),unions:Array.from(r.values())}}function z_(t,e,r){return{name:t.name,optional:t.optional,astNodes:t.astNodes,type:el(t.type,void 0,e,r)}}function el(t,e,r,n){if(Bm(t))return{elementType:el(t.elementType,e,r,n)};if(fs(t))return{referenceType:el(t.referenceType,void 0,r,n)};if(zv(t))return{types:t.types.map(i=>el(i,e,r,n))};if(B_(t))return{string:t.string};if(W_(t))return{primitive:t.primitive,regex:t.regex};if(zm(t)){let i=r.get(t.value)||n.get(t.value);return i?(e&&e.subTypes.add(i),{value:i}):{primitive:"unknown"}}else throw new Error("Invalid property type")}function Xm(t,e){let r=tl(t),n=tl(e);for(let i of n)V_(r,i)||r.push(i);return r.length===1?r[0]:{types:r}}function V_(t,e){return t.some(r=>Vm(r,e))}function Vm(t,e){return Bm(t)&&Bm(e)?Vm(t.elementType,e.elementType):fs(t)&&fs(e)?Vm(t.referenceType,e.referenceType):zm(t)&&zm(e)?t.value===e.value:!1}function tl(t){return zv(t)?t.types.flatMap(e=>tl(e)):[t]}function Xv(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarValidator,n={Action:[r.checkAssignmentReservedName],AbstractRule:r.checkRuleName,Assignment:[r.checkAssignmentWithFeatureName,r.checkAssignmentToFragmentRule,r.checkAssignmentTypes,r.checkAssignmentReservedName],ParserRule:[r.checkParserRuleDataType,r.checkRuleParametersUsed,r.checkParserRuleReservedName],TerminalRule:[r.checkTerminalRuleReturnType,r.checkHiddenTerminalRule,r.checkEmptyTerminalRule],InferredType:r.checkTypeReservedName,Keyword:r.checkKeyword,UnorderedGroup:r.checkUnorderedGroup,Grammar:[r.checkGrammarName,r.checkEntryGrammarRule,r.checkUniqueRuleName,r.checkUniqueTypeName,r.checkUniqueImportedRules,r.checkDuplicateImportedGrammar,r.checkGrammarHiddenTokens,r.checkGrammarForUnusedRules,r.checkGrammarTypeInfer,r.checkClashingTerminalNames],GrammarImport:r.checkPackageImport,CharacterRange:r.checkInvalidCharacterRange,Interface:[r.checkTypeReservedName,r.checkInterfacePropertyTypes],Type:[r.checkTypeReservedName],TypeAttribute:r.checkTypeReservedName,RuleCall:[r.checkUsedHiddenTerminalRule,r.checkUsedFragmentTerminalRule,r.checkRuleCallParameters],TerminalRuleCall:r.checkUsedHiddenTerminalRule,CrossReference:[r.checkCrossReferenceSyntax,r.checkCrossRefNameAssignment,r.checkCrossRefTerminalType,r.checkCrossRefType,r.checkCrossReferenceToTypeUnion],SimpleType:r.checkFragmentsInTypes,ReferenceType:r.checkReferenceTypeUnion,RegexToken:[r.checkInvalidRegexFlags,r.checkDirectlyUsedRegexFlags]};e.register(n,r)}var Ce;(function(t){t.GrammarNameUppercase="grammar-name-uppercase",t.RuleNameUppercase="rule-name-uppercase",t.HiddenGrammarTokens="hidden-grammar-tokens",t.UseRegexTokens="use-regex-tokens",t.EntryRuleTokenSyntax="entry-rule-token-syntax",t.CrossRefTokenSyntax="cross-ref-token-syntax",t.UnnecessaryFileExtension="unnecessary-file-extension",t.InvalidReturns="invalid-returns",t.InvalidInfers="invalid-infers",t.MissingInfer="missing-infer",t.MissingReturns="missing-returns",t.SuperfluousInfer="superfluous-infer",t.OptionalUnorderedGroup="optional-unordered-group"})(Ce=Ce||(Ce={}));var oc=class{constructor(e){this.references=e.references.References,this.documents=e.shared.workspace.LangiumDocuments}checkGrammarName(e,r){if(e.name){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Grammar name should start with an upper case letter.",{node:e,property:"name",data:Lr(Ce.GrammarNameUppercase)})}}checkEntryGrammarRule(e,r){if(e.isDeclared&&!e.name)return;let n=e.rules.filter(i=>K(i)&&i.entry);if(e.isDeclared&&n.length===0){let i=e.rules.find(o=>K(o)&&!Mr(o));i?r("error","The grammar is missing an entry parser rule. This rule can be an entry one.",{node:i,property:"name",data:Lr(Ce.EntryRuleTokenSyntax)}):r("error","This grammar is missing an entry parser rule.",{node:e,property:"name"})}else!e.isDeclared&&n.length>=1?n.forEach(i=>r("error","Cannot declare entry rules for unnamed grammars.",{node:i,property:"name"})):n.length>1?n.forEach(i=>r("error","The entry rule has to be unique.",{node:i,property:"name"})):n.length===1&&Mr(n[0])&&r("error","The entry rule cannot be a data type rule.",{node:n[0],property:"name"})}checkUniqueRuleName(e,r){let n=i=>ie(i.rules).filter(o=>!rl(o));this.checkUniqueName(e,r,n,"rule")}checkUniqueTypeName(e,r){let n=i=>ie(i.types).concat(i.interfaces);this.checkUniqueName(e,r,n,"type")}checkUniqueName(e,r,n,i){let o=new Le;n(e).forEach(l=>o.add(l.name,l));for(let[,l]of o.entriesGroupedByKey())l.length>1&&l.forEach(u=>{r("error",`A ${i}'s name has to be unique.`,{node:u,property:"name"})});let s=new Set,a=nl(this.documents,e);for(let l of a)n(l).forEach(u=>s.add(u.name));for(let l of o.keys())s.has(l)&&o.get(l).forEach(c=>{r("error",`A ${i} with the name '${c.name}' already exists in an imported grammar.`,{node:c,property:"name"})})}checkDuplicateImportedGrammar(e,r){let n=new Le;for(let i of e.imports){let o=ii(this.documents,i);o&&n.add(o,i)}for(let[,i]of n.entriesGroupedByKey())i.length>1&&i.forEach((o,s)=>{s>0&&r("warning","The grammar is already being directly imported.",{node:o,tags:[ic.DiagnosticTag.Unnecessary]})})}checkUniqueImportedRules(e,r){let n=new Map;for(let o of e.imports){let s=nl(this.documents,o);n.set(o,s)}let i=new Le;for(let o of e.imports){let s=n.get(o);for(let a of e.imports){if(o===a)continue;let l=n.get(a),u=this.getDuplicateExportedRules(s,l);for(let c of u)i.add(o,c)}}for(let o of e.imports){let s=i.get(o);s.length>0&&r("error","Some rules exported by this grammar are also included in other imports: "+ie(s).distinct().join(", "),{node:o,property:"path"})}}getDuplicateExportedRules(e,r){let i=e.filter(a=>!r.includes(a)).flatMap(a=>a.rules),o=r.flatMap(a=>a.rules),s=new Set;for(let a of i){let l=a.name;for(let u of o){let c=u.name;l===c&&s.add(u.name)}}return s}checkGrammarTypeInfer(e,r){var n,i,o;let s=new Set;for(let l of e.types)s.add(l.name);for(let l of e.interfaces)s.add(l.name);for(let l of nl(this.documents,e))l.types.forEach(u=>s.add(u.name)),l.interfaces.forEach(u=>s.add(u.name));for(let l of e.rules.filter(K)){if(rl(l))continue;let u=Mr(l),c=!l.returnType&&!l.dataType,f=En(l);if(!u&&f&&s.has(f)===c){if((c||((n=l.returnType)===null||n===void 0?void 0:n.ref)!==void 0)&&l.inferredType===void 0)r("error",a(f,c),{node:l,property:"name",data:Lr(Ce.MissingReturns)});else if(c||((i=l.returnType)===null||i===void 0?void 0:i.ref)!==void 0){let m=zr(l.inferredType.$cstNode,"infers");r("error",a(f,c),{node:l.inferredType,property:"name",data:{code:Ce.InvalidInfers,actionSegment:nr(m)}})}}else if(u&&c){let m=zr(l.$cstNode,"infer");r("error","Data type rules cannot infer a type.",{node:l,property:"inferredType",data:{code:Ce.InvalidInfers,actionSegment:nr(m)}})}}for(let l of Qe(e).filter(_e)){let u=this.getActionType(l);if(u){let c=!!l.inferredType,f=En(l);if(l.type&&f&&s.has(f)===c){let m=c?zr(l.$cstNode,"infer"):zr(l.$cstNode,"{");r("error",a(f,c),{node:l,property:"type",data:{code:c?Ce.SuperfluousInfer:Ce.MissingInfer,actionSegment:nr(m)}})}else if(u&&f&&s.has(f)&&c&&l.$cstNode){let m=Xt((o=l.inferredType)===null||o===void 0?void 0:o.$cstNode,"name"),T=zr(l.$cstNode,"{");m&&T&&r("error",`${f} is a declared type and cannot be redefined.`,{node:l,property:"type",data:{code:Ce.SuperfluousInfer,actionRange:{start:T.range.end,end:m.range.start}}})}}}function a(l,u){return u?`The type '${l}' is already explicitly declared and cannot be inferred.`:`The type '${l}' is not explicitly declared and must be inferred.`}}getActionType(e){var r;if(e.type)return(r=e.type)===null||r===void 0?void 0:r.ref;if(e.inferredType)return e.inferredType}checkGrammarHiddenTokens(e,r){e.definesHiddenTokens&&r("error","Hidden terminals are declared at the terminal definition.",{node:e,property:"definesHiddenTokens",data:Lr(Ce.HiddenGrammarTokens)})}checkHiddenTerminalRule(e,r){e.hidden&&e.fragment&&r("error","Cannot use terminal fragments as hidden tokens.",{node:e,property:"hidden"})}checkEmptyTerminalRule(e,r){try{let n=Xr(e);new RegExp(n).test("")&&r("error","This terminal could match an empty string.",{node:e,property:"name"})}catch{}}checkInvalidRegexFlags(e,r){let n=e.regex;if(n){let i=n.lastIndexOf("/"),o=n.substring(i+1),s="gmy",l=s+"isu",u=new Set,c=new Set;for(let m=0;m<o.length;m++){let T=o.charAt(m);l.includes(T)?s.includes(T)&&c.add(T):u.add(T)}let f=this.getFlagRange(e);f&&(u.size>0?r("error",`'${Array.from(u).join("")}' ${u.size>1?"are":"is"} not valid regular expression flag${u.size>1?"s":""}.`,{node:e,range:f}):c.size>0&&r("warning",`'${Array.from(c).join("")}' regular expression flag${c.size>1?"s":""} will be ignored by Langium.`,{node:e,range:f}))}}checkDirectlyUsedRegexFlags(e,r){if(!Ae(e.$container)){let n=this.getFlagRange(e);n&&r("warning","Regular expression flags are only applied if the terminal is not a composition",{node:e,range:n})}}getFlagRange(e){let r=Xt(e.$cstNode,"regex");if(!r||!e.regex)return;let n=e.regex,i=n.lastIndexOf("/")+1;return{start:{line:r.range.end.line,character:r.range.end.character-n.length+i},end:r.range.end}}checkUsedHiddenTerminalRule(e,r){let n=Ie(e,i=>Ae(i)||K(i));if(n){if("hidden"in n&&n.hidden)return;let i=e.rule.ref;Ae(i)&&i.hidden&&r("error","Cannot use hidden terminal in non-hidden rule",{node:e,property:"rule"})}}checkUsedFragmentTerminalRule(e,r){let n=e.rule.ref;Ae(n)&&n.fragment&&Ie(e,K)&&r("error","Cannot use terminal fragments as part of parser rules.",{node:e,property:"rule"})}checkCrossReferenceSyntax(e,r){e.deprecatedSyntax&&r("error","'|' is deprecated. Please, use ':' instead.",{node:e,property:"deprecatedSyntax",data:Lr(Ce.CrossRefTokenSyntax)})}checkPackageImport(e,r){ii(this.documents,e)===void 0?r("error","Import cannot be resolved.",{node:e,property:"path"}):e.path.endsWith(".langium")&&r("warning","Imports do not need file extensions.",{node:e,property:"path",data:Lr(Ce.UnnecessaryFileExtension)})}checkInvalidCharacterRange(e,r){if(e.right){let n="Character ranges cannot use more than one character",i=!1;e.left.value.length>1&&(i=!0,r("error",n,{node:e.left,property:"value"})),e.right.value.length>1&&(i=!0,r("error",n,{node:e.right,property:"value"})),i||r("hint","Consider using regex instead of character ranges",{node:e,data:Lr(Ce.UseRegexTokens)})}}checkGrammarForUnusedRules(e,r){let n=ds(e,!0);for(let i of e.rules)Ae(i)&&i.hidden||rl(i)||n.has(i)||r("hint","This rule is declared but never referenced.",{node:i,property:"name",tags:[ic.DiagnosticTag.Unnecessary]})}checkClashingTerminalNames(e,r){let n=new Le,i=new Set;for(let u of e.rules)Ae(u)&&u.name&&n.add(u.name,u),K(u)&&Qe(u).filter(dt).forEach(f=>i.add(f.value));let o=new Le,s=new Le;for(let u of e.imports){let c=nl(this.documents,u);for(let f of c)for(let m of f.rules)Ae(m)&&m.name?o.add(m.name,u):K(m)&&m.name&&Qe(m).filter(dt).forEach(b=>s.add(b.value,u))}for(let u of n.values())if(i.has(u.name))r("error","Terminal name clashes with existing keyword.",{node:u,property:"name"});else if(s.has(u.name)){let c=s.get(u.name);r("error",`Terminal name clashes with imported keyword from "${c[0].path}".`,{node:u,property:"name"})}let a=new Le;for(let u of i)for(let c of o.get(u))a.add(c,u);for(let[u,c]of a.entriesGroupedByKey())c.length>0&&r("error",`Imported terminals (${c.join(", ")}) clash with locally defined keywords.`,{node:u,property:"path"});let l=new Le;for(let[u,c]of o.entriesGroupedByKey()){let f=s.get(u);f.length>0&&c.filter(m=>!f.includes(m)).forEach(m=>l.add(m,u))}for(let[u,c]of l.entriesGroupedByKey())c.length>0&&r("error",`Imported terminals (${c.join(", ")}) clash with imported keywords.`,{node:u,property:"path"})}checkRuleName(e,r){if(e.name&&!rl(e)){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Rule name should start with an upper case letter.",{node:e,property:"name",data:Lr(Ce.RuleNameUppercase)})}}checkTypeReservedName(e,r){this.checkReservedName(e,"name",r)}checkAssignmentReservedName(e,r){this.checkReservedName(e,"feature",r)}checkParserRuleReservedName(e,r){e.inferredType||this.checkReservedName(e,"name",r)}checkReservedName(e,r,n){let i=e[r];typeof i=="string"&&X_.has(i)&&n("error",`'${i}' is a reserved name of the JavaScript runtime.`,{node:e,property:r})}checkKeyword(e,r){Ie(e,K)&&(e.value.length===0?r("error","Keywords cannot be empty.",{node:e}):e.value.trim().length===0?r("error","Keywords cannot only consist of whitespace characters.",{node:e}):/\s/g.test(e.value)&&r("warning","Keywords should not contain whitespace characters.",{node:e}))}checkUnorderedGroup(e,r){e.elements.forEach(n=>{Vr(n.cardinality)&&r("error","Optional elements in Unordered groups are currently not supported",{node:n,data:Lr(Ce.OptionalUnorderedGroup)})})}checkRuleParametersUsed(e,r){let n=e.parameters;if(n.length>0){let i=Qe(e).filter(ts);for(let o of n)i.some(s=>s.parameter.ref===o)||r("hint",`Parameter '${o.name}' is unused.`,{node:o,tags:[ic.DiagnosticTag.Unnecessary]})}}checkParserRuleDataType(e,r){if(rl(e))return;let n=Jv(e),i=Mr(e);!n&&i?r("error","This parser rule does not create an object. Add a primitive return type or an action to the start of the rule to force object instantiation.",{node:e,property:"name"}):n&&!i&&r("error","Normal parser rules are not allowed to return a primitive value. Use a datatype rule for that.",{node:e,property:e.dataType?"dataType":"returnType"})}checkAssignmentToFragmentRule(e,r){e.terminal&&Ne(e.terminal)&&K(e.terminal.rule.ref)&&e.terminal.rule.ref.fragment&&r("error",`Cannot use fragment rule '${e.terminal.rule.ref.name}' for assignment of property '${e.feature}'.`,{node:e,property:"terminal"})}checkAssignmentTypes(e,r){if(!e.terminal)return;let n;Qe(e.terminal).map(o=>zt(o)?"ref":"other").find(o=>n?o!==n:(n=o,!1))&&r("error",this.createMixedTypeError(e.feature),{node:e,property:"terminal"})}checkInterfacePropertyTypes(e,r){for(let n of e.attributes)if(n.type){let i=vo(n.type),o=tl(i),s=!1,a=!1;for(let l of o)fs(l)?s=!0:fs(l)||(a=!0);s&&a&&r("error",this.createMixedTypeError(n.name),{node:n,property:"type"})}}createMixedTypeError(e){return`Mixing a cross-reference with other types is not supported. Consider splitting property "${e}" into two or more different properties.`}checkTerminalRuleReturnType(e,r){var n;!((n=e.type)===null||n===void 0)&&n.name&&!cs(e.type.name)&&r("error","Terminal rules can only return primitive types like 'string', 'boolean', 'number', 'Date' or 'bigint'.",{node:e.type,property:"name"})}checkRuleCallParameters(e,r){let n=e.rule.ref;if(K(n)){let i=n.parameters.length,o=e.arguments.length;i!==o&&r("error",`Rule '${n.name}' expects ${i} arguments, but got ${o}.`,{node:e})}else Ae(n)&&e.arguments.length>0&&r("error","Terminal rules do not accept any arguments",{node:e})}checkCrossRefNameAssignment(e,r){!e.terminal&&e.type.ref&&!il(e.type.ref)&&r("error","Cannot infer terminal or data type rule for cross-reference.",{node:e,property:"type"})}checkCrossRefTerminalType(e,r){var n;let i=e.terminal;if(Ne(i)){let o=i.rule.ref;K(o)&&!Mr(o)?r("error","Parser rules cannot be used for cross-references.",{node:i,property:"rule"}):K(o)&&!Qv(o)?r("error","Data type rules for cross-references must be of type string.",{node:i,property:"rule"}):Ae(o)&&(!((n=o.type)===null||n===void 0)&&n.name)&&o.type.name!=="string"&&r("error","Terminal rules for cross-references must be of type string.",{node:i,property:"rule"})}}checkCrossRefType(e,r){let n=this.checkReferenceToRuleButNotType(e?.type);n&&r("error",n,{node:e,property:"type"})}checkCrossReferenceToTypeUnion(e,r){if(Lt(e.type.ref)&&Br(e.type.ref.type)){let n=Yv(e.type.ref.type);n.length>0&&r("error",`Cross-reference on type union is only valid if all alternatives are AST nodes. ${n.join(", ")} ${n.length>1?"are":"is"} not ${n.length>1?"":"an "}AST node${n.length>1?"s":""}.`,{node:e,property:"type"})}}checkFragmentsInTypes(e,r){var n,i;K((n=e.typeRef)===null||n===void 0?void 0:n.ref)&&(!((i=e.typeRef)===null||i===void 0)&&i.ref.fragment)&&r("error","Cannot use rule fragments in types.",{node:e,property:"typeRef"})}checkReferenceTypeUnion(e,r){ir(e.referenceType)||r("error","Only direct rule references are allowed in reference types.",{node:e,property:"referenceType"})}checkReferenceToRuleButNotType(e){if(e&&K(e.ref)&&!Mr(e.ref)&&(e.ref.returnType||e.ref.inferredType)){let r=En(e.ref);if(r)return`Use the rule type '${r}' instead of the typed rule name '${e.ref.name}' for cross-references.`}}checkAssignmentWithFeatureName(e,r){e.feature==="name"&&zt(e.terminal)&&r("warning",'The "name" property is not recommended for cross-references.',{node:e,property:"feature"})}};function rl(t){return!t.definition||!t.definition.$cstNode||t.definition.$cstNode.length===0}var X_=new Set(["Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array","BigInt64Array","BigUint64Array","Map","Set","WeakMap","WeakSet","Error","AggregateError","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError","BigInt","RegExp","Number","Object","Function","Symbol","String","Math","NaN","Infinity","isFinite","isNaN","Buffer","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","globalThis","decodeURIComponent","decodeURI","encodeURIComponent","encodeURI","parseInt","parseFloat","Promise","Generator","GeneratorFunction","AsyncFunction","AsyncGenerator","AsyncGeneratorFunction","Reflect","Proxy","Date","Intl","eval","undefined"]);function Yv(t){let e=[];return t.types.forEach(r=>{var n;ir(r)&&(!((n=r.typeRef)===null||n===void 0)&&n.ref?Lt(r.typeRef.ref)&&(Br(r.typeRef.ref.type)?e.push(...Yv(r.typeRef.ref.type)):e.push(r.typeRef.ref.name)):r.stringType?e.push(`"${r.stringType}"`):r.primitiveType&&e.push(r.primitiveType))}),Array.from(new Set(e))}function Vr(t,e){return t==="?"||t==="*"||Mt(e)&&!!e.guardCondition}function Zv(t){return t==="*"||t==="+"}function Mr(t){return eR(t,new Set)}function eR(t,e){if(e.has(t))return!0;e.add(t);for(let r of Qe(t))if(Ne(r)){if(!r.rule.ref||K(r.rule.ref)&&!eR(r.rule.ref,e))return!1}else{if(xe(r))return!1;if(_e(r))return!1}return!!t.definition}function Jv(t){var e;let r=(e=t.returnType)===null||e===void 0?void 0:e.ref;return t.dataType!==void 0||Lt(r)&&Y_(r)}function Y_(t){return Jm(t.type,new Set)}function Jm(t,e){if(e.has(t))return!0;if(e.add(t),po(t))return!1;if(mo(t))return!1;if(Br(t))return t.types.every(r=>Jm(r,e));if(ir(t)){if(t.primitiveType!==void 0)return!0;if(t.stringType!==void 0)return!0;if(t.typeRef!==void 0){let r=t.typeRef.ref;return Lt(r)?Jm(r.type,e):!1}else return!1}else return!1}function Qv(t){return ol(t,new Set)}function ol(t,e){var r,n;if(e.has(t))return!0;if(e.add(t),K(t)){if(t.dataType)return t.dataType==="string";if(!((r=t.returnType)===null||r===void 0)&&r.ref)return ol(t.returnType.ref,e)}else{if(Lt(t))return ol(t.type,e);if(po(t))return!1;if(mo(t))return!1;if(Br(t))return t.types.every(i=>ol(i,e));if(ir(t)){if(t.primitiveType==="string")return!0;if(t.stringType)return!0;if(!((n=t.typeRef)===null||n===void 0)&&n.ref)return ol(t.typeRef.ref,e)}}return!1}function Zm(t){let e=t.$container;if(Mt(e)){let r=e.elements,n=r.indexOf(t);for(let i=n-1;i>=0;i--){let o=r[i];if(_e(o))return o;{let s=Qe(r[i]).find(_e);if(s)return s}}}if(Qo(e))return Zm(e)}function pn(t){var e;if(K(t))return Mr(t)?t.name:(e=ms(t))!==null&&e!==void 0?e:t.name;if(Sr(t)||Lt(t)||rs(t))return t.name;if(_e(t)){let r=hs(t);if(r)return r}else if(es(t))return t.name;throw new Vu("Cannot get name of Unknown Type",t.$cstNode)}function En(t){if(t)try{return pn(t)}catch{return}}function ms(t){if(t.inferredType)return t.inferredType.name;if(t.dataType)return t.dataType;if(t.returnType){let e=t.returnType.ref;if(e){if(K(e))return e.name;if(Sr(e)||Lt(e))return e.name}}}function hs(t){var e;if(t.inferredType)return t.inferredType.name;if(!((e=t.type)===null||e===void 0)&&e.ref)return pn(t.type.ref)}function Ro(t){var e,r,n;return Ae(t)?(r=(e=t.type)===null||e===void 0?void 0:e.name)!==null&&r!==void 0?r:"string":Mr(t)?t.name:(n=ms(t))!==null&&n!==void 0?n:t.name}function Xr(t){let e={s:!1,i:!1,u:!1},r=gs(t.definition,e),n=Object.entries(e).filter(([,i])=>i).map(([i])=>i).join("");return new RegExp(r,n)}var eh=/[\s\S]/.source;function gs(t,e){if(uv(t))return J_(t);if(fv(t))return Q_(t);if(Gu(t))return tN(t);if(ju(t)){let r=t.rule.ref;if(!r)throw new Error("Missing rule reference.");return oi(gs(r.definition),{cardinality:t.cardinality,lookahead:t.lookahead})}else{if(iv(t))return eN(t);if(hv(t))return Z_(t);if(sv(t)){let r=t.regex.lastIndexOf("/"),n=t.regex.substring(1,r),i=t.regex.substring(r+1);return e&&(e.i=i.includes("i"),e.s=i.includes("s"),e.u=i.includes("u")),oi(n,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1})}else{if(yv(t))return oi(eh,{cardinality:t.cardinality,lookahead:t.lookahead});throw new Error(`Invalid terminal element: ${t?.$type}`)}}}function J_(t){return oi(t.elements.map(e=>gs(e)).join("|"),{cardinality:t.cardinality,lookahead:t.lookahead})}function Q_(t){return oi(t.elements.map(e=>gs(e)).join(""),{cardinality:t.cardinality,lookahead:t.lookahead})}function Z_(t){return oi(`${eh}*?${gs(t.terminal)}`,{cardinality:t.cardinality,lookahead:t.lookahead})}function eN(t){return oi(`(?!${gs(t.terminal)})${eh}*?`,{cardinality:t.cardinality,lookahead:t.lookahead})}function tN(t){return t.right?oi(`[${Ym(t.left)}-${Ym(t.right)}]`,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1}):oi(Ym(t.left),{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1})}function Ym(t){return ri(t.value)}function oi(t,e){var r;return(e.wrap!==!1||e.lookahead)&&(t=`(${(r=e.lookahead)!==null&&r!==void 0?r:""}${t})`),e.cardinality?`${t}${e.cardinality}`:t}function th(t){if(t.path===void 0||t.path.length===0)return;let e=ve.dirname(ne(t).uri),r=t.path;return r.endsWith(".langium")||(r+=".langium"),ve.resolvePath(e,r)}function ii(t,e){let r=th(e);try{if(r){let i=t.getOrCreateDocument(r).parseResult.value;if(Zo(i))return i}}catch{}}function nl(t,e){if(Uu(e)){let r=ii(t,e);if(r){let n=Qm(t,r);return n.push(r),n}return[]}else return Qm(t,e)}function Qm(t,e,r=e,n=new Set,i=new Set){let o=ne(e);if(r!==e&&i.add(e),!n.has(o.uri)){n.add(o.uri);for(let s of e.imports){let a=ii(t,s);a&&Qm(t,a,r,n,i)}}return Array.from(i)}function ps(t){return xe(t)?[t]:Ir(t)||Mt(t)||Pr(t)?t.elements.flatMap(e=>ps(e)):Ne(t)&&t.rule.ref?ps(t.rule.ref.definition):[]}var rN=["string","number","boolean","Date","bigint"];function cs(t){return rN.includes(t)}var rh=class{constructor(e,r){this.context=e,this.root=r}getTypes(){let e={name:this.root.name,properties:this.root.properties,ruleCalls:this.root.ruleCalls,super:[]};return this.root.children.length===0?[{alt:e,next:[]}]:this.applyNext(this.root,{alt:e,next:this.root.children})}applyNext(e,r){let n=this.splitType(r.alt,r.next.length),i=[];for(let o=0;o<r.next.length;o++){let s=n[o],a=r.next[o];a.actionWithAssignment&&i.push({alt:tR(s),next:[]}),a.name!==void 0&&a.name!==s.name&&(a.actionWithAssignment?(s.properties=[],s.ruleCalls=[],s.super=[e.name],s.name=a.name):(s.super=[s.name,...s.ruleCalls],s.properties=[],s.ruleCalls=[],s.name=a.name)),s.properties.push(...a.properties),s.ruleCalls.push(...a.ruleCalls);let l={alt:s,next:a.children};l.next.length===0?(l.alt.super=l.alt.super.filter(u=>u!==l.alt.name),i.push(l)):i.push(...this.applyNext(e,l))}return sR(i)}splitType(e,r){let n=[];for(let i=0;i<r;i++)n.push(tR(e));return n}getSuperTypes(e){let r=new Set;return this.collectSuperTypes(e,e,r),Array.from(r)}collectSuperTypes(e,r,n){if(r.ruleCalls.length>0){for(let i of r.ruleCalls)n.add(i);return}for(let i of r.parents)e.name===void 0?this.collectSuperTypes(i,i,n):i.name!==void 0&&i.name!==e.name?n.add(i.name):this.collectSuperTypes(e,i,n);r.parents.length===0&&r.name&&n.add(r.name)}connect(e,r){return r.parents.push(e),e.children.push(r),r}merge(...e){if(e.length===1)return e[0];if(e.length===0)throw new Error("No parts to merge");let r=xo();r.parents=e;for(let n of e)n.children.push(r);return r}hasLeafNode(e){return this.partHasLeafNode(e)}partHasLeafNode(e,r){return e.children.some(n=>n!==r)?!0:e.name?!1:e.parents.some(n=>this.partHasLeafNode(n,e))}};function nN(t){return{name:t.name,children:[],parents:[],actionWithAssignment:t.actionWithAssignment,ruleCalls:[...t.ruleCalls],properties:t.properties.map(rR)}}function tR(t){return{name:t.name,super:t.super,ruleCalls:t.ruleCalls,properties:t.properties.map(e=>rR(e))}}function rR(t){return{name:t.name,optional:t.optional,type:t.type,astNodes:t.astNodes}}function nR(t,e,r){let n=[],i={fragments:new Map};for(let l of t)n.push(...iR(i,l));let o=uN(n),s=cN(o),a=fN(o,s,r);for(let l of e){let u=iN(l);a.unions.push({name:l.name,declared:!1,type:u,subTypes:new Set,superTypes:new Set,dataType:l.dataType})}return a}function iN(t){if(t.dataType&&t.dataType!=="string")return{primitive:t.dataType};let e=!1,r=()=>(e=!0,{primitive:"unknown"}),n=nh(t.definition,r);return e?{primitive:"string"}:n}function nh(t,e){var r,n,i;if(t.cardinality)return e();if(Ir(t))return{types:t.elements.map(o=>nh(o,e))};if(Mt(t)||Pr(t))return t.elements.length!==1?e():nh(t.elements[0],e);if(Ne(t)){let o=(r=t.rule)===null||r===void 0?void 0:r.ref;return o?Ae(o)?{primitive:(i=(n=o.type)===null||n===void 0?void 0:n.name)!==null&&i!==void 0?i:"string",regex:Xr(o).toString()}:{value:o.name}:e()}else if(dt(t))return{string:t.value};return e()}function iR(t,e){let r=xo(e),n=new rh(t,r);return e.definition&&ih(n,n.root,e.definition),n.getTypes()}function xo(t){return{name:K(t)||_e(t)?En(t):t,properties:[],ruleCalls:[],children:[],parents:[],actionWithAssignment:!1}}function ih(t,e,r){let n=Vr(r.cardinality,r);if(Ir(r)){let i=[];n&&i.push(t.connect(e,xo()));for(let o of r.elements){let s=t.connect(e,xo());i.push(ih(t,s,o))}return t.merge(...i)}else if(Mt(r)||Pr(r)){let i=t.connect(e,xo()),o;n&&(o=t.connect(e,xo()));for(let s of r.elements)i=ih(t,i,s);return o?t.merge(o,i):i}else{if(_e(r))return oN(t,e,r);xe(r)?sN(e,r):Ne(r)&&aN(t,e,r)}return e}function oN(t,e,r){var n;if(!t.hasLeafNode(e)){let o=nN(e);t.connect(e,o)}let i=t.connect(e,xo(r));if(r.type){let o=(n=r.type)===null||n===void 0?void 0:n.ref;o&&Xa(o)&&(i.name=o.name)}return r.feature&&r.operator&&(i.actionWithAssignment=!0,i.properties.push({name:r.feature,optional:!1,type:So(r.operator==="+=",!1,t.root.ruleCalls.length!==0?t.root.ruleCalls:t.getSuperTypes(i)),astNodes:new Set([r])})),i}function sN(t,e){let r={types:new Set,reference:!1};oR(e.terminal,r);let n=So(e.operator==="+=",r.reference,e.operator==="?="?["boolean"]:Array.from(r.types));t.properties.push({name:e.feature,optional:Vr(e.cardinality),type:n,astNodes:new Set([e])})}function oR(t,e){if(Ir(t)||Pr(t)||Mt(t))for(let r of t.elements)oR(r,e);else if(dt(t))e.types.add(`'${t.value}'`);else if(Ne(t)&&t.rule.ref)e.types.add(Ro(t.rule.ref));else if(zt(t)&&t.type.ref){let r=En(t.type.ref);r&&e.types.add(r),e.reference=!0}}function aN(t,e,r){let n=r.rule.ref;if(K(n)&&n.fragment){let i=lN(n,t.context);Vr(r.cardinality)?e.properties.push(...i.map(o=>Object.assign(Object.assign({},o),{optional:!0}))):e.properties.push(...i)}else K(n)&&e.ruleCalls.push(Ro(n))}function lN(t,e){let r=e.fragments.get(t);if(r)return r;let n=[];e.fragments.set(t,n);let i=En(t),o=iR(e,t).filter(s=>s.alt.name===i);return n.push(...o.flatMap(s=>s.alt.properties)),n}function uN(t){let e=new Map,r=[],n=sR(t).map(i=>i.alt);for(let i of n){let o={name:i.name,properties:i.properties,superTypes:new Set(i.super),subTypes:new Set,declared:!1,abstract:!1};e.set(o.name,o),i.ruleCalls.length>0&&(r.push(i),i.ruleCalls.forEach(s=>{s!==o.name&&o.subTypes.add(s)}))}for(let i of r)for(let o of i.ruleCalls){let s=e.get(o);s&&s.name!==i.name&&s.superTypes.add(i.name)}return Array.from(e.values())}function sR(t){let e=t.reduce((n,i)=>n.add(i.alt.name,i),new Le),r=[];for(let[n,i]of e.entriesGroupedByKey()){let o=[],s=new Set,a={alt:{name:n,properties:o,ruleCalls:[],super:[]},next:[]};for(let l of i){let u=l.alt;a.alt.super.push(...u.super),a.next.push(...l.next);let c=u.properties;for(let f of c){let m=o.find(T=>T.name===f.name);m?(m.type=Xm(m.type,f.type),f.astNodes.forEach(T=>m.astNodes.add(T))):o.push(Object.assign({},f))}u.ruleCalls.forEach(f=>s.add(f))}for(let l of i){let u=l.alt;if(u.ruleCalls.length===0)for(let c of o)u.properties.find(f=>f.name===c.name)||(c.optional=!0)}a.alt.ruleCalls=Array.from(s),r.push(a)}return r}function cN(t){let e=new Map(t.map(i=>[i.name,i])),r=[],n=new Le;for(let i of t)for(let o of i.superTypes)n.add(o,i.name);for(let[i,o]of n.entriesGroupedByKey())if(!e.has(i)){let s={declared:!1,name:i,subTypes:new Set,superTypes:new Set,type:So(!1,!1,o)};r.push(s)}return r}function fN(t,e,r){let n=new Le;for(let a of t)for(let l of a.superTypes)n.add(l,a.name);let i=new Set(r.interfaces.map(a=>a.name)),o={interfaces:[],unions:e},s=new Map(e.map(a=>[a.name,a]));for(let a of t){let l=new Set(n.get(a.name));if(a.properties.length===0&&l.size>0)if(i.has(a.name))a.abstract=!0,o.interfaces.push(a);else{let u=So(!1,!1,Array.from(l)),c=s.get(a.name);if(c)c.type=Xm(c.type,u);else{let f={name:a.name,declared:!1,subTypes:l,superTypes:a.superTypes,type:u};o.unions.push(f),s.set(a.name,f)}}else o.interfaces.push(a)}for(let a of o.interfaces)a.superTypes=new Set([...a.superTypes].filter(l=>!s.has(l)));return o}function So(t,e,r){if(t)return{elementType:So(!1,e,r)};if(e)return{referenceType:So(!1,!1,r)};if(r.length===1){let n=r[0];return n.startsWith("'")?{string:n.substring(1,n.length-1)}:cs(n)?{primitive:n}:{value:n}}else return{types:r.map(n=>So(!1,!1,[n]))}}function aR(t,e){let r=lR(t,e),n=Bv(r.interfaces,r.types),i=nR(r.parserRules,r.datatypeRules,n);return{astResources:r,inferred:i,declared:n}}function lR(t,e,r=new Set,n={parserRules:[],datatypeRules:[],interfaces:[],types:[]}){Array.isArray(t)||(t=[t]);for(let i of t){let o=ne(i);if(!r.has(o.uri)){r.add(o.uri);for(let s of i.rules)K(s)&&!s.fragment&&(Mr(s)?n.datatypeRules.push(s):n.parserRules.push(s));if(i.interfaces.forEach(s=>n.interfaces.push(s)),i.types.forEach(s=>n.types.push(s)),e){let s=i.imports.map(a=>ii(e,a)).filter(a=>a!==void 0);lR(s,e,r,n)}}}return n}function fR(t,e){let{inferred:r,declared:n,astResources:i}=aR(t,e);return{astResources:i,inferred:uR(n,r),declared:uR(r,n)}}function uR(t,e){var r,n;let i={interfaces:Mv(cR(...t.interfaces,...(r=e?.interfaces)!==null&&r!==void 0?r:[])),unions:cR(...t.unions,...(n=e?.unions)!==null&&n!==void 0?n:[])},o=Vv(i);return dN(o),o}function cR(...t){return Array.from(t.reduce((e,r)=>(e.set(r.name,r),e),new Map).values()).sort((e,r)=>e.name.localeCompare(r.name))}function dN(t){let e=mN(t),r=Array.from(e.values());hN(r),gN(t.interfaces),pN(r)}function pN(t){let e=new Set,r=n=>{if(!e.has(n)){e.add(n),n.typeNames.add(n.name);for(let i of n.subTypes)r(i),i.typeNames.forEach(o=>n.typeNames.add(o))}};t.forEach(r)}function mN({interfaces:t,unions:e}){let r=t.concat(e).reduce((i,o)=>(i.set(o.name,o),i),new Map),n=new Map;for(let i of e)n.set(i,oh(i.type,new Set));for(let[i,o]of n)o&&r.delete(i.name);return r}function oh(t,e){if(e.has(t))return!0;if(e.add(t),Pt(t))return t.types.every(r=>oh(r,e));if(Dr(t)){let r=t.value;return cn(r)?oh(r.type,e):!1}else return Or(t)||wn(t)}function hN(t){for(let e of t)for(let r of e.superTypes)r.subTypes.add(e)}function gN(t){var e;let r=t.reduce((s,a)=>(s.set(a.name,a),s),new Map);for(let s of t){let a=s.properties.flatMap(l=>Fv(l.type));for(let l of a)(e=r.get(l))===null||e===void 0||e.containerTypes.add(s)}let n=new Set,i=t.filter(s=>s.subTypes.size===0),o=new Set(i);for(;i.length>0;){let s=i.shift();if(s)for(let a of s.superTypes)dn(a)&&(s.containerTypes.size===0?(n.add(a.name),a.containerTypes.clear()):n.has(a.name)||s.containerTypes.forEach(l=>a.containerTypes.add(l)),o.has(a)||(o.add(a),i.push(a)))}}var yN={languageId:"langium",fileExtensions:[".langium"],caseInsensitive:!1},TN={maxLookahead:3},dR={AstReflection:()=>new Ga},pR={Grammar:()=>Hv(),LanguageMetaData:()=>yN,parser:{ParserConfig:()=>TN}};var sl=class{constructor(e,r,n){var i;this.elements=e,this.outerScope=r,this.caseInsensitive=(i=n?.caseInsensitive)!==null&&i!==void 0?i:!1}getAllElements(){return this.outerScope?this.elements.concat(this.outerScope.getAllElements()):this.elements}getElement(e){let r=this.caseInsensitive?this.elements.find(n=>n.name.toLowerCase()===e.toLowerCase()):this.elements.find(n=>n.name===e);if(r)return r;if(this.outerScope)return this.outerScope.getElement(e)}},ys=class{constructor(e,r,n){var i;this.elements=new Map,this.caseInsensitive=(i=n?.caseInsensitive)!==null&&i!==void 0?i:!1;for(let o of e){let s=this.caseInsensitive?o.name.toLowerCase():o.name;this.elements.set(s,o)}this.outerScope=r}getElement(e){let r=this.caseInsensitive?e.toLowerCase():e,n=this.elements.get(r);if(n)return n;if(this.outerScope)return this.outerScope.getElement(e)}getAllElements(){let e=ie(this.elements.values());return this.outerScope&&(e=e.concat(this.outerScope.getAllElements())),e}},mR={getElement(){},getAllElements(){return Jo}};var sc=de(Vn(),1);var Ts=class{constructor(e){this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider}async computeExports(e,r=sc.CancellationToken.None){return this.computeExportsForNode(e.parseResult.value,e,void 0,r)}async computeExportsForNode(e,r,n=ki,i=sc.CancellationToken.None){let o=[];this.exportNode(e,o,r);for(let s of n(e))await Ze(i),this.exportNode(s,o,r);return o}exportNode(e,r,n){let i=this.nameProvider.getName(e);i&&r.push(this.descriptions.createDescription(e,i,n))}async computeLocalScopes(e,r=sc.CancellationToken.None){let n=e.parseResult.value,i=new Le;for(let o of Qe(n))await Ze(r),this.processNode(o,e,i);return i}processNode(e,r,n){let i=e.$container;if(i){let o=this.nameProvider.getName(e);o&&n.add(i,this.descriptions.createDescription(e,o,r))}}};var ac=class{constructor(){this.toDispose=[],this.isDisposed=!1}onDispose(e){this.toDispose.push(e)}dispose(){this.throwIfDisposed(),this.clear(),this.isDisposed=!0,this.toDispose.forEach(e=>e.dispose())}throwIfDisposed(){if(this.isDisposed)throw new Error("This cache has already been disposed")}},sh=class extends ac{constructor(){super(...arguments),this.cache=new Map}has(e){return this.throwIfDisposed(),this.cache.has(e)}set(e,r){this.throwIfDisposed(),this.cache.set(e,r)}get(e,r){if(this.throwIfDisposed(),this.cache.has(e))return this.cache.get(e);if(r){let n=r();return this.cache.set(e,n),n}else return}delete(e){return this.throwIfDisposed(),this.cache.delete(e)}clear(){this.throwIfDisposed(),this.cache.clear()}},lc=class extends ac{constructor(e){super(),this.cache=new Map,this.converter=e??(r=>r)}has(e,r){return this.throwIfDisposed(),this.cacheForContext(e).has(r)}set(e,r,n){this.throwIfDisposed(),this.cacheForContext(e).set(r,n)}get(e,r,n){this.throwIfDisposed();let i=this.cacheForContext(e);if(i.has(r))return i.get(r);if(n){let o=n();return i.set(r,o),o}else return}delete(e,r){return this.throwIfDisposed(),this.cacheForContext(e).delete(r)}clear(e){if(this.throwIfDisposed(),e){let r=this.converter(e);this.cache.delete(r)}else this.cache.clear()}cacheForContext(e){let r=this.converter(e),n=this.cache.get(r);return n||(n=new Map,this.cache.set(r,n)),n}};var uc=class extends sh{constructor(e){super(),this.onDispose(e.workspace.DocumentBuilder.onUpdate(()=>{this.clear()}))}};var vs=class{constructor(e){this.reflection=e.shared.AstReflection,this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider,this.indexManager=e.shared.workspace.IndexManager,this.globalScopeCache=new uc(e.shared)}getScope(e){let r=[],n=this.reflection.getReferenceType(e),i=ne(e.container).precomputedScopes;if(i){let s=e.container;do{let a=i.get(s);a.length>0&&r.push(ie(a).filter(l=>this.reflection.isSubtype(l.type,n))),s=s.$container}while(s)}let o=this.getGlobalScope(n,e);for(let s=r.length-1;s>=0;s--)o=this.createScope(r[s],o);return o}createScope(e,r,n){return new sl(ie(e),r,n)}createScopeForNodes(e,r,n){let i=ie(e).map(o=>{let s=this.nameProvider.getName(o);if(s)return this.descriptions.createDescription(o,s)}).nonNullable();return new sl(i,r,n)}getGlobalScope(e,r){return this.globalScopeCache.get(e,()=>new ys(this.indexManager.allElements(e)))}};var cc=class extends vs{constructor(e){super(e),this.langiumDocuments=e.shared.workspace.LangiumDocuments}getScope(e){let r=this.reflection.getReferenceType(e);return r===fo?this.getTypeScope(r,e):super.getScope(e)}getTypeScope(e,r){let n,i=ne(r.container).precomputedScopes,o=Hu(r.container);if(i&&o){let a=i.get(o);a.length>0&&(n=ie(a).filter(l=>l.type===ja||l.type===Ha))}let s=this.getGlobalScope(e,r);return n?this.createScope(n,s):s}getGlobalScope(e,r){let n=Ie(r.container,Zo);if(!n)return mR;let i=new Set;this.gatherImports(n,i);let o=this.indexManager.allElements(e,i);return e===fo&&(o=o.filter(s=>s.type===ja||s.type===Ha)),new ys(o)}gatherImports(e,r){for(let n of e.imports){let i=th(n);if(i&&!r.has(i.toString())&&(r.add(i.toString()),this.langiumDocuments.hasDocument(i))){let s=this.langiumDocuments.getOrCreateDocument(i).parseResult.value;Zo(s)&&this.gatherImports(s,r)}}}},fc=class extends Ts{constructor(e){super(e),this.astNodeLocator=e.workspace.AstNodeLocator}exportNode(e,r,n){var i;if(super.exportNode(e,r,n),K(e)){if(!e.returnType&&!e.dataType){let o=(i=e.inferredType)!==null&&i!==void 0?i:e;r.push(this.createInterfaceDescription(o,o.name,n))}Qe(e).forEach(o=>{if(_e(o)&&o.inferredType){let s=hs(o);s&&r.push(this.createInterfaceDescription(o,s,n))}})}}processNode(e,r,n){rs(e)||(this.processTypeNode(e,r,n),this.processActionNode(e,r,n),super.processNode(e,r,n))}processTypeNode(e,r,n){var i;let o=e.$container;if(o&&K(e)&&!e.returnType&&!e.dataType){let s=(i=e.inferredType)!==null&&i!==void 0?i:e;n.add(o,this.createInterfaceDescription(s,s.name,r))}}processActionNode(e,r,n){let i=Hu(e);if(i&&_e(e)&&e.inferredType){let o=hs(e);o&&n.add(i,this.createInterfaceDescription(e,o,r))}}createInterfaceDescription(e,r,n=ne(e)){let i,o=()=>{var s;return i??(i=nr((s=this.nameProvider.getNameNode(e))!==null&&s!==void 0?s:e.$cstNode))};return{node:e,name:r,get nameSegment(){return o()},selectionSegment:nr(e.$cstNode),type:"Interface",documentUri:n.uri,path:this.astNodeLocator.getAstNodePath(e)}}};var Fr=de(be(),1);var or=de(be(),1);var dc=class{constructor(e){this.validationRegistry=e.validation.ValidationRegistry,this.metadata=e.LanguageMetaData}async validateDocument(e,r={},n=or.CancellationToken.None){let i=e.parseResult,o=[];if(await Ze(n),(!r.categories||r.categories.includes("built-in"))&&(this.processLexingErrors(i,o,r),r.stopAfterLexingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===mn.LexingError})||(this.processParsingErrors(i,o,r),r.stopAfterParsingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===mn.ParsingError}))||(this.processLinkingErrors(e,o,r),r.stopAfterLinkingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===mn.LinkingError}))))return o;try{o.push(...await this.validateAst(i.value,r,n))}catch(s){if(To(s))throw s;console.error("An error occurred during validation:",s)}return await Ze(n),o}processLexingErrors(e,r,n){for(let i of e.lexerErrors){let o={severity:or.DiagnosticSeverity.Error,range:{start:{line:i.line-1,character:i.column-1},end:{line:i.line-1,character:i.column+i.length-1}},message:i.message,data:Lr(mn.LexingError),source:this.getSource()};r.push(o)}}processParsingErrors(e,r,n){for(let i of e.parserErrors){let o;if(isNaN(i.token.startOffset)){if("previousToken"in i){let s=i.previousToken;if(isNaN(s.startOffset))o=or.Range.create(0,0,0,0);else{let a=or.Position.create(s.endLine-1,s.endColumn);o=or.Range.create(a,a)}}}else o=qa(i.token);if(o){let s={severity:or.DiagnosticSeverity.Error,range:o,message:i.message,data:Lr(mn.ParsingError),source:this.getSource()};r.push(s)}}}processLinkingErrors(e,r,n){for(let i of e.references){let o=i.error;if(o){let s={node:o.container,property:o.property,index:o.index,data:{code:mn.LinkingError,containerType:o.container.$type,property:o.property,refText:o.reference.$refText}};r.push(this.toDiagnostic("error",o.message,s))}}}async validateAst(e,r,n=or.CancellationToken.None){let i=[],o=(s,a,l)=>{i.push(this.toDiagnostic(s,a,l))};return await Promise.all(Zn(e).map(async s=>{await Ze(n);let a=this.validationRegistry.getChecks(s.$type,r.categories);for(let l of a)await l(s,o,n)})),i}toDiagnostic(e,r,n){return{message:r,range:vN(n),severity:RN(e),code:n.code,codeDescription:n.codeDescription,tags:n.tags,relatedInformation:n.relatedInformation,data:n.data,source:this.getSource()}}getSource(){return this.metadata.languageId}};function vN(t){if(or.Range.is(t.range))return t.range;let e;return typeof t.property=="string"?e=Xt(t.node.$cstNode,t.property,t.index):typeof t.keyword=="string"&&(e=zr(t.node.$cstNode,t.keyword,t.index)),e??(e=t.node.$cstNode),e?e.range:{start:{line:0,character:0},end:{line:0,character:0}}}function RN(t){switch(t){case"error":return or.DiagnosticSeverity.Error;case"warning":return or.DiagnosticSeverity.Warning;case"info":return or.DiagnosticSeverity.Information;case"hint":return or.DiagnosticSeverity.Hint;default:throw new Error("Invalid diagnostic severity: "+t)}}var mn;(function(t){t.LexingError="lexing-error",t.ParsingError="parsing-error",t.LinkingError="linking-error"})(mn=mn||(mn={}));var pc=class{constructor(e){this.reflection=e.shared.AstReflection,this.indexManager=e.shared.workspace.IndexManager}getCodeActions(e,r){let n=[],i=o=>o&&n.push(o);for(let o of r.context.diagnostics)this.createCodeActions(o,e,i);return n}createCodeActions(e,r,n){var i;switch((i=e.data)===null||i===void 0?void 0:i.code){case Ce.GrammarNameUppercase:case Ce.RuleNameUppercase:n(this.makeUpperCase(e,r));break;case Ce.HiddenGrammarTokens:n(this.fixHiddenTerminals(e,r));break;case Ce.UseRegexTokens:n(this.fixRegexTokens(e,r));break;case Ce.EntryRuleTokenSyntax:n(this.addEntryKeyword(e,r));break;case Ce.CrossRefTokenSyntax:n(this.fixCrossRefSyntax(e,r));break;case Ce.UnnecessaryFileExtension:n(this.fixUnnecessaryFileExtension(e,r));break;case Ce.MissingReturns:n(this.fixMissingReturns(e,r));break;case Ce.InvalidInfers:case Ce.InvalidReturns:n(this.fixInvalidReturnsInfers(e,r));break;case Ce.MissingInfer:n(this.fixMissingInfer(e,r));break;case Ce.SuperfluousInfer:n(this.fixSuperfluousInfer(e,r));break;case mn.LinkingError:{let o=e.data;o&&o.containerType==="RuleCall"&&o.property==="rule"&&n(this.addNewRule(e,o,r)),o&&this.lookInGlobalScope(e,o,r).forEach(n);break}}}fixMissingReturns(e,r){let n=r.textDocument.getText(e.range);if(n)return{title:`Add explicit return type for parser rule ${n}`,kind:Fr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:`${n} returns ${n}`}]}}}}fixInvalidReturnsInfers(e,r){let n=e.data;if(n&&n.actionSegment){let i=r.textDocument.getText(n.actionSegment.range);return{title:`Correct ${i} usage`,kind:Fr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:n.actionSegment.range,newText:i==="infers"?"returns":"infers"}]}}}}}fixMissingInfer(e,r){let n=e.data;if(n&&n.actionSegment)return{title:"Correct 'infer' usage",kind:Fr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:{start:n.actionSegment.range.end,end:n.actionSegment.range.end},newText:"infer "}]}}}}fixSuperfluousInfer(e,r){let n=e.data;if(n&&n.actionRange)return{title:"Remove the 'infer' keyword",kind:Fr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:n.actionRange,newText:""}]}}}}fixUnnecessaryFileExtension(e,r){let n=Object.assign({},e.range.end);n.character-=1;let i=Object.assign({},n);return i.character-=8,{title:"Remove file extension",kind:Fr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:i,end:n},newText:""}]}}}}makeUpperCase(e,r){let n={start:e.range.start,end:{line:e.range.start.line,character:e.range.start.character+1}};return{title:"First letter to upper case",kind:Fr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:n,newText:r.textDocument.getText(n).toUpperCase()}]}}}}addEntryKeyword(e,r){return{title:"Add entry keyword",kind:Fr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:e.range.start,end:e.range.start},newText:"entry "}]}}}}fixRegexTokens(e,r){let n=r.textDocument.offsetAt(e.range.start),i=r.parseResult.value.$cstNode;if(i){let o=xr(i,n),s=Ie(o?.astNode,Gu);if(s&&s.right&&s.$cstNode){let a=s.left.value,l=s.right.value;return{title:"Refactor into regular expression",kind:Fr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:s.$cstNode.range,newText:`/[${ri(a)}-${ri(l)}]/`}]}}}}}}fixCrossRefSyntax(e,r){return{title:"Replace '|' with ':'",kind:Fr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:":"}]}}}}fixHiddenTerminals(e,r){let n=r.parseResult.value,i=n.hiddenTokens,o=[],s=Xt(n.$cstNode,"definesHiddenTokens");if(s){let a=s.range.start,l=s.offset,u=n.$cstNode.text.indexOf(")",l)+1;o.push({newText:"",range:{start:a,end:r.textDocument.positionAt(u)}})}for(let a of i){let l=a.ref;if(l&&Ae(l)&&!l.hidden&&l.$cstNode){let u=l.$cstNode.range.start;o.push({newText:"hidden ",range:{start:u,end:u}})}}return{title:"Fix hidden terminals",kind:Fr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:o}}}}addNewRule(e,r,n){let i=n.textDocument.offsetAt(e.range.start),o=n.parseResult.value.$cstNode;if(o){let s=xr(o,i),a=Ie(s?.astNode,K);if(a&&a.$cstNode)return{title:`Add new rule '${r.refText}'`,kind:Fr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:a.$cstNode.range.end,end:a.$cstNode.range.end},newText:`

`+r.refText+`:
    /* TODO implement rule */ {infer `+r.refText+"};"}]}}}}}lookInGlobalScope(e,r,n){var i,o;let s={container:{$type:r.containerType},property:r.property,reference:{$refText:r.refText}},a=this.reflection.getReferenceType(s),l=this.indexManager.allElements(a).filter(m=>m.name===r.refText),u=[],c=-1,f=-1;for(let m of l){if(ve.equals(m.documentUri,n.uri))continue;let T=xN(n.uri,m.documentUri),b,C="",_=n.parseResult.value,w=_.imports.find(v=>v.path&&T<v.path);if(w)b=(i=w.$cstNode)===null||i===void 0?void 0:i.range.start;else if(_.imports.length>0){let v=_.imports[_.imports.length-1].$cstNode.range.end;v&&(b={line:v.line+1,character:0})}else _.rules.length>0&&(b=(o=_.rules[0].$cstNode)===null||o===void 0?void 0:o.range.start,C=`
`);b&&((c<0||T.length<f)&&(c=u.length,f=T.length),u.push({title:`Add import to '${T}'`,kind:Fr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:b,end:b},newText:`import '${T}'
${C}`}]}}}))}return c>=0&&(u[c].isPreferred=!0),u}};function xN(t,e){let r=ve.dirname(t),n=ve.relative(r,e);return!n.startsWith("./")&&!n.startsWith("../")&&(n="./"+n),n.endsWith(".langium")&&(n=n.substring(0,n.length-8)),n}var TR=de(io(),1);var Ss=de(be(),1);function ah(t,e){let r={stacks:t,tokens:e};return SN(r),r.stacks.flat().forEach(i=>{i.property=void 0}),gR(r.stacks).map(i=>i[i.length-1])}function lh(t){let{next:e,cardinalities:r,visited:n,plus:i}=t,o=[],s=e.feature;if(n.has(s))return[];n.add(s);let a,l=s;for(;l.$container;)if(Mt(l.$container)){a=l.$container;break}else if(Qo(l.$container))l=l.$container;else break;if(Zv(l.cardinality)){let u=Rs({next:{feature:l,type:e.type,new:!1},cardinalities:r,visited:n,plus:i});for(let c of u)i.add(c.feature);o.push(...u)}if(a){let u=a.elements.indexOf(l);u!==void 0&&u<a.elements.length-1&&o.push(...hR({feature:a,type:e.type,new:!1},u+1,r,n,i)),o.every(c=>Vr(c.feature.cardinality,c.feature)||Vr(r.get(c.feature))||i.has(c.feature))&&o.push(...lh({next:{feature:a,type:e.type,new:!1},cardinalities:r,visited:n,plus:i}))}return o}function al(t){return kt(t)&&(t={feature:t}),Rs({next:t,cardinalities:new Map,visited:new Set,plus:new Set})}function Rs(t){var e,r,n;let{next:i,cardinalities:o,visited:s,plus:a}=t;if(i===void 0)return[];let{feature:l,type:u}=i;if(Mt(l)){if(s.has(l))return[];s.add(l)}if(Mt(l))return hR(i,0,o,s,a).map(c=>mc(c,l.cardinality,o));if(Ir(l)||Pr(l))return l.elements.flatMap(c=>Rs({next:{feature:c,new:!1,type:u},cardinalities:o,visited:s,plus:a})).map(c=>mc(c,l.cardinality,o));if(xe(l)){let c={feature:l.terminal,new:!1,type:u,property:(e=i.property)!==null&&e!==void 0?e:l.feature};return Rs({next:c,cardinalities:o,visited:s,plus:a}).map(f=>mc(f,l.cardinality,o))}else{if(_e(l))return lh({next:{feature:l,new:!0,type:pn(l),property:(r=i.property)!==null&&r!==void 0?r:l.feature},cardinalities:o,visited:s,plus:a});if(Ne(l)&&K(l.rule.ref)){let c=l.rule.ref,f={feature:c.definition,new:!0,type:c.fragment?void 0:(n=ms(c))!==null&&n!==void 0?n:c.name,property:i.property};return Rs({next:f,cardinalities:o,visited:s,plus:a}).map(m=>mc(m,l.cardinality,o))}else return[i]}}function mc(t,e,r){return r.set(t.feature,e),t}function hR(t,e,r,n,i){var o;let s=[],a;for(;e<t.feature.elements.length&&(a={feature:t.feature.elements[e++],new:!1,type:t.type},s.push(...Rs({next:a,cardinalities:r,visited:n,plus:i})),!!Vr((o=a.feature.cardinality)!==null&&o!==void 0?o:r.get(a.feature),a.feature)););return s}function SN(t){for(let e of t.tokens){let r=gR(t.stacks,e);t.stacks=r}}function gR(t,e){let r=[];for(let n of t)r.push(...bN(n,e));return r}function bN(t,e){let r=new Map,n=new Set(t.map(o=>o.feature).filter(AN)),i=[];for(;t.length>0;){let o=t.pop(),s=lh({next:o,cardinalities:r,plus:n,visited:new Set}).filter(a=>e?uh(a.feature,e):!0);for(let a of s)i.push([...t,a]);if(!s.every(a=>Vr(a.feature.cardinality,a.feature)||Vr(r.get(a.feature))))break}return i}function AN(t){if(t.cardinality==="+")return!0;let e=Ie(t,xe);return!!(e&&e.cardinality==="+")}function uh(t,e){if(dt(t))return t.value===e.image;if(Ne(t))return CN(t.rule.ref,e);if(zt(t)){let r=hc(t);if(r)return uh(r,e)}return!1}function CN(t,e){return K(t)?al(t.definition).some(n=>uh(n.feature,e)):Ae(t)?Xr(t).test(e.image):!1}function yR(t){let e=Array.from(new Set(t.flatMap(n=>{var i;return(i=n?.triggerCharacters)!==null&&i!==void 0?i:[]}))),r=Array.from(new Set(t.flatMap(n=>{var i;return(i=n?.allCommitCharacters)!==null&&i!==void 0?i:[]})));return{triggerCharacters:e.length>0?e:void 0,allCommitCharacters:r.length>0?r:void 0}}var xs=class{constructor(e){this.scopeProvider=e.references.ScopeProvider,this.grammar=e.Grammar,this.completionParser=e.parser.CompletionParser,this.nameProvider=e.references.NameProvider,this.lexer=e.parser.Lexer,this.nodeKindProvider=e.shared.lsp.NodeKindProvider,this.fuzzyMatcher=e.shared.lsp.FuzzyMatcher,this.grammarConfig=e.parser.GrammarConfig}async getCompletion(e,r){let n=[],i=this.buildContexts(e,r.position),o=(l,u)=>{let c=this.fillCompletionItem(l,u);c&&n.push(c)},s=l=>dt(l.feature)?l.feature.value:l.feature,a=[];for(let l of i)if(await Promise.all(ie(l.features).distinct(s).exclude(a).map(u=>this.completionFor(l,u,o))),a.push(...l.features),!this.continueCompletion(n))break;return Ss.CompletionList.create(this.deduplicateItems(n),!0)}deduplicateItems(e){return ie(e).distinct(r=>`${r.kind}_${r.label}_${r.detail}`).toArray()}findFeaturesAt(e,r){let n=e.getText({start:Ss.Position.create(0,0),end:e.positionAt(r)}),i=this.completionParser.parse(n),o=i.tokens;if(i.tokenIndex===0){let l=gc(this.grammar),u=al({feature:l.definition,new:!0,type:ms(l)});return o.length>0?(o.shift(),ah(u.map(c=>[c]),o)):u}let s=[...o].splice(i.tokenIndex);return ah([i.elementStack.map(l=>({feature:l}))],s)}*buildContexts(e,r){var n,i,o,s,a;let l=e.parseResult.value.$cstNode;if(!l)return;let u=e.textDocument,c=u.getText(),f=u.offsetAt(r),m={document:e,textDocument:u,offset:f,position:r},T=this.findDataTypeRuleStart(l,f);if(T){let[y,$]=T,D=(n=xr(l,y))===null||n===void 0?void 0:n.astNode,X=this.findFeaturesAt(u,y);yield Object.assign(Object.assign({},m),{node:D,tokenOffset:y,tokenEndOffset:$,features:X})}let{nextTokenStart:b,nextTokenEnd:C,previousTokenStart:_,previousTokenEnd:w}=this.backtrackToAnyToken(c,f),v;if(_!==void 0&&w!==void 0&&w===f){v=(i=xr(l,_))===null||i===void 0?void 0:i.astNode;let y=this.findFeaturesAt(u,_);yield Object.assign(Object.assign({},m),{node:v,tokenOffset:_,tokenEndOffset:w,features:y})}if(v=(s=(o=xr(l,b))===null||o===void 0?void 0:o.astNode)!==null&&s!==void 0?s:_===void 0||(a=xr(l,_))===null||a===void 0?void 0:a.astNode,v){let y=this.findFeaturesAt(u,b);yield Object.assign(Object.assign({},m),{node:v,tokenOffset:b,tokenEndOffset:C,features:y})}else{let y=gc(this.grammar),$=al(y.definition);yield Object.assign(Object.assign({},m),{tokenOffset:b,tokenEndOffset:C,features:$})}}findDataTypeRuleStart(e,r){var n,i;let o=It(e,r,this.grammarConfig.nameRegexp),s=!!(!((n=Ie(o?.grammarSource,K))===null||n===void 0)&&n.dataType);if(s){for(;s;)o=o?.container,s=!!(!((i=Ie(o?.grammarSource,K))===null||i===void 0)&&i.dataType);if(o)return[o.offset,o.end]}}continueCompletion(e){return e.length===0}backtrackToAnyToken(e,r){let n=this.lexer.tokenize(e).tokens;if(n.length===0)return{nextTokenStart:r,nextTokenEnd:r};let i;for(let o of n){if(o.startOffset>=r)return{nextTokenStart:r,nextTokenEnd:r,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0};if(o.endOffset>=r)return{nextTokenStart:o.startOffset,nextTokenEnd:o.endOffset+1,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0};i=o}return{nextTokenStart:r,nextTokenEnd:r,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0}}async completionForRule(e,r,n){if(K(r)){let i=al(r.definition);await Promise.all(i.map(o=>this.completionFor(e,o,n)))}}completionFor(e,r,n){if(dt(r.feature))return this.completionForKeyword(e,r.feature,n);if(zt(r.feature)&&e.node)return this.completionForCrossReference(e,r,n)}completionForCrossReference(e,r,n){let i=Ie(r.feature,xe),o=e.node;if(i&&o){if(r.type&&(r.new||o.$type!==r.type)&&(o={$type:r.type,$container:o,$containerProperty:r.property}),!e)return;let s={reference:{},container:o,property:i.feature};try{let a=this.scopeProvider.getScope(s),l=new Set;a.getAllElements().forEach(u=>{!l.has(u.name)&&this.filterCrossReference(u)&&(n(e,this.createReferenceCompletionItem(u)),l.add(u.name))})}catch(a){console.error(a)}}}createReferenceCompletionItem(e){return{nodeDescription:e,kind:this.nodeKindProvider.getCompletionItemKind(e),detail:e.type,sortText:"0"}}filterCrossReference(e){return!0}completionForKeyword(e,r,n){r.value.match(/[\w]/)&&n(e,{label:r.value,kind:Ss.CompletionItemKind.Keyword,detail:"Keyword",sortText:"1"})}fillCompletionItem(e,r){var n,i;let o;if(typeof r.label=="string")o=r.label;else if("node"in r){let u=this.nameProvider.getName(r.node);if(!u)return;o=u}else if("nodeDescription"in r)o=r.nodeDescription.name;else return;let s;typeof((n=r.textEdit)===null||n===void 0?void 0:n.newText)=="string"?s=r.textEdit.newText:typeof r.insertText=="string"?s=r.insertText:s=o;let a=(i=r.textEdit)!==null&&i!==void 0?i:this.buildCompletionTextEdit(e,o,s);return a?{additionalTextEdits:r.additionalTextEdits,command:r.command,commitCharacters:r.commitCharacters,data:r.data,detail:r.detail,documentation:r.documentation,filterText:r.filterText,insertText:r.insertText,insertTextFormat:r.insertTextFormat,insertTextMode:r.insertTextMode,kind:r.kind,labelDetails:r.labelDetails,preselect:r.preselect,sortText:r.sortText,tags:r.tags,textEditText:r.textEditText,textEdit:a,label:o}:void 0}buildCompletionTextEdit(e,r,n){let o=e.textDocument.getText().substring(e.tokenOffset,e.offset);if(this.fuzzyMatcher.match(o,r)){let s=e.textDocument.positionAt(e.tokenOffset),a=e.position;return{newText:n,range:{start:s,end:a}}}else return}};var yc=class extends xs{constructor(e){super(e),this.documents=()=>e.shared.workspace.LangiumDocuments}completionFor(e,r,n){let i=Ie(r.feature,xe);if(i?.feature==="path")this.completeImportPath(e,n);else return super.completionFor(e,r,n)}completeImportPath(e,r){let i=e.textDocument.getText().substring(e.tokenOffset,e.offset),o=this.getAllFiles(e.document),s={start:e.position,end:e.position};if(i.length>0){let a=i.substring(1);o=o.filter(c=>c.startsWith(a));let l=e.textDocument.positionAt(e.tokenOffset+1),u=e.textDocument.positionAt(e.tokenEndOffset-1);s={start:l,end:u}}for(let a of o){let l=i.length>0?"":'"',u=`${l}${a}${l}`;r(e,{label:a,textEdit:{newText:u,range:s},kind:TR.CompletionItemKind.File,sortText:"0"})}}getAllFiles(e){let r=this.documents().all,n=e.uri.toString(),i=ve.dirname(e.uri).toString(),o=[];for(let s of r)if(!ve.equals(s.uri,n)){let a=s.uri.toString(),l=a.substring(0,a.length-ve.extname(s.uri).length),u=ve.relative(i,l);u.startsWith(".")||(u=`./${u}`),o.push(u)}return o}};var ll=de(be(),1);var bs=class{constructor(e){this.commentNames=e.parser.GrammarConfig.multilineCommentRules}getFoldingRanges(e){let r=[],n=i=>r.push(i);return this.collectFolding(e,n),r}collectFolding(e,r){var n;let i=(n=e.parseResult)===null||n===void 0?void 0:n.value;if(i){if(this.shouldProcessContent(i)){let o=Qe(i).iterator(),s;do if(s=o.next(),!s.done){let a=s.value;this.shouldProcess(a)&&this.collectObjectFolding(e,a,r),this.shouldProcessContent(a)||o.prune()}while(!s.done)}this.collectCommentFolding(e,i,r)}}shouldProcess(e){return!0}shouldProcessContent(e){return!0}collectObjectFolding(e,r,n){let i=r.$cstNode;if(i){let o=this.toFoldingRange(e,i);o&&n(o)}}collectCommentFolding(e,r,n){let i=r.$cstNode;if(i){for(let o of AT(i))if(this.commentNames.includes(o.tokenType.name)){let s=this.toFoldingRange(e,o,ll.FoldingRangeKind.Comment);s&&n(s)}}}toFoldingRange(e,r,n){let i=r.range,o=i.start,s=i.end;if(!(s.line-o.line<2))return this.includeLastFoldingLine(r,n)||(s=e.textDocument.positionAt(e.textDocument.offsetAt({line:s.line,character:0})-1)),ll.FoldingRange.create(o.line,s.line,o.character,s.character,n)}includeLastFoldingLine(e,r){if(r===ll.FoldingRangeKind.Comment)return!1;let n=e.text,i=n.charAt(n.length-1);return!(i==="}"||i===")"||i==="]")}};var Tc=class extends bs{shouldProcessContent(e){return!K(e)}};var vc=class{constructor(){this.collector=()=>{}}getNodeFormatter(e){return new ch(e,this.collector)}formatDocument(e,r){let n=e.parseResult;return n.lexerErrors.length===0&&n.parserErrors.length===0?this.doDocumentFormat(e,r.options):[]}isFormatRangeErrorFree(e,r){let n=e.parseResult;return n.lexerErrors.length||n.parserErrors.length?Math.min(...n.lexerErrors.map(o=>{var s;return(s=o.line)!==null&&s!==void 0?s:Number.MAX_VALUE}),...n.parserErrors.map(o=>{var s;return(s=o.token.startLine)!==null&&s!==void 0?s:Number.MAX_VALUE}))>r.end.line:!0}formatDocumentRange(e,r){return this.isFormatRangeErrorFree(e,r.range)?this.doDocumentFormat(e,r.options,r.range):[]}formatDocumentOnType(e,r){let n={start:{character:0,line:r.position.line},end:r.position};return this.isFormatRangeErrorFree(e,n)?this.doDocumentFormat(e,r.options,n):[]}get formatOnTypeOptions(){}doDocumentFormat(e,r,n){let i=new Map,o=(a,l,u)=>{var c,f;let m=this.nodeModeToKey(a,l),T=i.get(m),b=(c=u.options.priority)!==null&&c!==void 0?c:0,C=(f=T?.options.priority)!==null&&f!==void 0?f:0;(!T||C<=b)&&i.set(m,u)};this.collector=o,this.iterateAstFormatting(e,n);let s=this.iterateCstFormatting(e,i,r,n);return this.avoidOverlappingEdits(e.textDocument,s)}avoidOverlappingEdits(e,r){let n=[];for(let i of r){let o=n[n.length-1];if(o){let s=e.offsetAt(i.range.start),a=e.offsetAt(o.range.end);s<a&&n.pop()}n.push(i)}return n}iterateAstFormatting(e,r){let n=e.parseResult.value;this.format(n);let i=Qe(n).iterator(),o;do if(o=i.next(),!o.done){let s=o.value;this.insideRange(s.$cstNode.range,r)?this.format(s):i.prune()}while(!o.done)}nodeModeToKey(e,r){return`${e.offset}:${e.end}:${r}`}insideRange(e,r){return!r||e.start.line<=r.start.line&&e.end.line>=r.end.line||e.start.line>=r.start.line&&e.end.line<=r.end.line||e.start.line<=r.end.line&&e.end.line>=r.end.line}isNecessary(e,r){return r.getText(e.range)!==e.newText}iterateCstFormatting(e,r,n,i){let o={indentation:0,options:n,document:e.textDocument},s=[],l=this.iterateCstTree(e,o).iterator(),u,c;do if(c=l.next(),!c.done){let f=c.value,m=uo(f),T=this.nodeModeToKey(f,"prepend"),b=r.get(T);if(r.delete(T),b){let w=this.createTextEdit(u,f,b,o);for(let v of w)v&&this.insideRange(v.range,i)&&this.isNecessary(v,e.textDocument)&&s.push(v)}let C=this.nodeModeToKey(f,"append"),_=r.get(C);if(r.delete(C),_){let w=kT(f);if(w){let v=this.createTextEdit(f,w,_,o);for(let y of v)y&&this.insideRange(y.range,i)&&this.isNecessary(y,e.textDocument)&&s.push(y)}}if(!b&&f.hidden){let w=this.createHiddenTextEdits(u,f,void 0,o);for(let v of w)v&&this.insideRange(v.range,i)&&this.isNecessary(v,e.textDocument)&&s.push(v)}m&&(u=f)}while(!c.done);return s}createHiddenTextEdits(e,r,n,i){var o;let s=r.range.start.line;if(e&&e.range.end.line===s)return[];let a=[],l={start:{character:0,line:s},end:r.range.start},u=i.document.getText(l),c=this.findFittingMove(l,(o=n?.moves)!==null&&o!==void 0?o:[],i),f=this.getExistingIndentationCharacterCount(u,i),T=this.getIndentationCharacterCount(i,c)-f;if(T===0)return[];let b="";T>0&&(b=(i.options.insertSpaces?" ":"	").repeat(T));let C=r.text.split(`
`);C[0]=u+C[0];for(let _=0;_<C.length;_++){let w=s+_,v={character:0,line:w};if(T>0)a.push({newText:b,range:{start:v,end:v}});else{let y=C[_],$=0;for(;$<y.length;$++){let D=y.charAt($);if(D!==" "&&D!=="	")break}a.push({newText:"",range:{start:v,end:{line:w,character:Math.min($,Math.abs(T))}}})}}return a}getExistingIndentationCharacterCount(e,r){let n=" ".repeat(r.options.tabSize);return(r.options.insertSpaces?e.replaceAll("	",n):e.replaceAll(n,"	")).length}getIndentationCharacterCount(e,r){let n=e.indentation;return r&&r.tabs&&(n+=r.tabs),(e.options.insertSpaces?e.options.tabSize:1)*n}createTextEdit(e,r,n,i){var o;if(r.hidden)return this.createHiddenTextEdits(e,r,n,i);let s={start:(o=e?.range.end)!==null&&o!==void 0?o:{character:0,line:0},end:r.range.start},a=this.findFittingMove(s,n.moves,i);if(!a)return[];let l=a.characters,u=a.lines,c=a.tabs,f=i.indentation;i.indentation+=c??0;let m=[];return l!==void 0?m.push(this.createSpaceTextEdit(s,l,n.options)):u!==void 0?m.push(this.createLineTextEdit(s,u,i,n.options)):c!==void 0&&m.push(this.createTabTextEdit(s,!!e,i)),uo(r)&&(i.indentation=f),m}createSpaceTextEdit(e,r,n){if(e.start.line===e.end.line){let o=e.end.character-e.start.character;r=this.fitIntoOptions(r,o,n)}return{newText:" ".repeat(r),range:e}}createLineTextEdit(e,r,n,i){let o=e.end.line-e.start.line;r=this.fitIntoOptions(r,o,i);let a=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation);return{newText:`${`
`.repeat(r)}${a}`,range:e}}createTabTextEdit(e,r,n){let o=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation),s=r?1:0,a=Math.max(e.end.line-e.start.line,s);return{newText:`${`
`.repeat(a)}${o}`,range:e}}fitIntoOptions(e,r,n){return n.allowMore?e=Math.max(r,e):n.allowLess&&(e=Math.min(r,e)),e}findFittingMove(e,r,n){if(r.length===0)return;if(r.length===1)return r[0];let i=e.end.line-e.start.line;for(let o of r){if(o.lines!==void 0&&i<=o.lines)return o;if(o.lines===void 0&&i===0)return o}return r[r.length-1]}iterateCstTree(e,r){let i=e.parseResult.value.$cstNode;return i?new Wr(i,o=>this.iterateCst(o,r)):Jo}iterateCst(e,r){if(!Cn(e))return Jo;let n=r.indentation;return new Nr(()=>({index:0}),i=>i.index<e.content.length?{done:!1,value:e.content[i.index++]}:(r.indentation=n,pr))}},ch=class{constructor(e,r){this.astNode=e,this.collector=r}node(e){return new hn(e.$cstNode?[e.$cstNode]:[],this.collector)}nodes(...e){let r=[];for(let n of e)n.$cstNode&&r.push(n.$cstNode);return new hn(r,this.collector)}property(e,r){let n=Xt(this.astNode.$cstNode,e,r);return new hn(n?[n]:[],this.collector)}properties(...e){let r=[];for(let n of e){let i=Ei(this.astNode.$cstNode,n);r.push(...i)}return new hn(r,this.collector)}keyword(e,r){let n=zr(this.astNode.$cstNode,e,r);return new hn(n?[n]:[],this.collector)}keywords(...e){let r=[];for(let n of e){let i=Rc(this.astNode.$cstNode,n);r.push(...i)}return new hn(r,this.collector)}cst(e){return new hn([...e],this.collector)}interior(e,r){let n=e.nodes,i=r.nodes;if(n.length!==1||i.length!==1)return new hn([],this.collector);let o=n[0],s=i[0];if(o.offset>s.offset){let a=o;o=s,s=a}return new hn(ET(o,s),this.collector)}},hn=class t{constructor(e,r){this.nodes=e,this.collector=r}prepend(e){for(let r of this.nodes)this.collector(r,"prepend",e);return this}append(e){for(let r of this.nodes)this.collector(r,"append",e);return this}surround(e){for(let r of this.nodes)this.collector(r,"prepend",e),this.collector(r,"append",e);return this}slice(e,r){return new t(this.nodes.slice(e,r),this.collector)}},ge;(function(t){function e(...c){return{options:{},moves:c.flatMap(f=>f.moves).sort(u)}}t.fit=e;function r(c){return i(0,c)}t.noSpace=r;function n(c){return i(1,c)}t.oneSpace=n;function i(c,f){return{options:f??{},moves:[{characters:c}]}}t.spaces=i;function o(c){return s(1,c)}t.newLine=o;function s(c,f){return{options:f??{},moves:[{lines:c}]}}t.newLines=s;function a(c){return{options:c??{},moves:[{tabs:1,lines:1}]}}t.indent=a;function l(c){return{options:c??{},moves:[{tabs:0}]}}t.noIndent=l;function u(c,f){var m,T,b,C,_,w;let v=(m=c.lines)!==null&&m!==void 0?m:0,y=(T=f.lines)!==null&&T!==void 0?T:0,$=(b=c.tabs)!==null&&b!==void 0?b:0,D=(C=f.tabs)!==null&&C!==void 0?C:0,X=(_=c.characters)!==null&&_!==void 0?_:0,ye=(w=f.characters)!==null&&w!==void 0?w:0;return v<y?-1:v>y?1:$<D?-1:$>D?1:X<ye?-1:X>ye?1:0}})(ge=ge||(ge={}));var xc=class extends vc{format(e){if(zt(e))this.getNodeFormatter(e).properties("type","terminal").surround(ge.noSpace());else if(K(e)){let r=this.getNodeFormatter(e);r.keywords("entry","fragment","returns").append(ge.oneSpace()),(e.inferredType||e.returnType||e.dataType)&&e.parameters.length===0?r.property("name").append(ge.oneSpace()):r.property("name").append(ge.noSpace()),r.properties("parameters").append(ge.noSpace()),r.keywords(",").append(ge.oneSpace()),r.keywords("<").append(ge.noSpace());let n=r.keyword(";"),i=r.keyword(":");i.prepend(ge.noSpace()),r.interior(i,n).prepend(ge.indent()),n.prepend(ge.fit(ge.noSpace(),ge.newLine())),r.node(e).prepend(ge.noIndent())}else if(Ae(e)){let r=this.getNodeFormatter(e);e.type&&(r.property("name").append(ge.oneSpace()),r.keyword("returns").append(ge.oneSpace())),r.keywords("hidden","terminal","fragment").append(ge.oneSpace()),r.keyword(":").prepend(ge.noSpace()),r.keyword(";").prepend(ge.fit(ge.noSpace(),ge.newLine())),r.node(e).prepend(ge.noIndent())}else if(_e(e)){let r=this.getNodeFormatter(e);r.keyword("{").append(ge.noSpace()),r.keywords(".","+=","=").surround(ge.noSpace()),r.keyword("}").prepend(ge.noSpace())}else if(es(e))this.getNodeFormatter(e).keywords("infer","infers").append(ge.oneSpace());else if(xe(e))this.getNodeFormatter(e).keywords("=","+=","?=").surround(ge.noSpace());else if(Ne(e)){let r=this.getNodeFormatter(e);r.keyword("<").surround(ge.noSpace()),r.keyword(",").append(ge.oneSpace()),r.properties("arguments").append(ge.noSpace())}Qo(e)&&this.getNodeFormatter(e).property("cardinality").prepend(ge.noSpace())}};var si=de(be(),1);var oe=de(be(),1);var ph={[oe.SemanticTokenTypes.class]:0,[oe.SemanticTokenTypes.comment]:1,[oe.SemanticTokenTypes.enum]:2,[oe.SemanticTokenTypes.enumMember]:3,[oe.SemanticTokenTypes.event]:4,[oe.SemanticTokenTypes.function]:5,[oe.SemanticTokenTypes.interface]:6,[oe.SemanticTokenTypes.keyword]:7,[oe.SemanticTokenTypes.macro]:8,[oe.SemanticTokenTypes.method]:9,[oe.SemanticTokenTypes.modifier]:10,[oe.SemanticTokenTypes.namespace]:11,[oe.SemanticTokenTypes.number]:12,[oe.SemanticTokenTypes.operator]:13,[oe.SemanticTokenTypes.parameter]:14,[oe.SemanticTokenTypes.property]:15,[oe.SemanticTokenTypes.regexp]:16,[oe.SemanticTokenTypes.string]:17,[oe.SemanticTokenTypes.struct]:18,[oe.SemanticTokenTypes.type]:19,[oe.SemanticTokenTypes.typeParameter]:20,[oe.SemanticTokenTypes.variable]:21},vR={[oe.SemanticTokenModifiers.abstract]:1,[oe.SemanticTokenModifiers.async]:2,[oe.SemanticTokenModifiers.declaration]:4,[oe.SemanticTokenModifiers.defaultLibrary]:8,[oe.SemanticTokenModifiers.definition]:16,[oe.SemanticTokenModifiers.deprecated]:32,[oe.SemanticTokenModifiers.documentation]:64,[oe.SemanticTokenModifiers.modification]:128,[oe.SemanticTokenModifiers.readonly]:256,[oe.SemanticTokenModifiers.static]:512},RR={legend:{tokenTypes:Object.keys(ph),tokenModifiers:Object.keys(vR)},full:{delta:!0},range:!0},dh=class extends oe.SemanticTokensBuilder{constructor(){super(...arguments),this._tokens=[]}push(e,r,n,i,o){this._tokens.push({line:e,char:r,length:n,tokenType:i,tokenModifiers:o})}build(){return this.applyTokens(),super.build()}buildEdits(){return this.applyTokens(),super.buildEdits()}applyTokens(){for(let e of this._tokens.sort(this.compareTokens))super.push(e.line,e.char,e.length,e.tokenType,e.tokenModifiers);this._tokens=[]}compareTokens(e,r){return e.line===r.line?e.char-r.char:e.line-r.line}},Sc=class{constructor(e){this.tokensBuilders=new Map,e.shared.workspace.TextDocuments.onDidClose(r=>{this.tokensBuilders.delete(r.document.uri)}),e.shared.lsp.LanguageServer.onInitialize(r=>{var n;this.initialize((n=r.capabilities.textDocument)===null||n===void 0?void 0:n.semanticTokens)})}initialize(e){this.clientCapabilities=e}async semanticHighlight(e,r,n=oe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightRange(e,r,n=oe.CancellationToken.None){return this.currentRange=r.range,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightDelta(e,r,n=oe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),this.currentTokensBuilder.previousResult(r.previousResultId),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.buildEdits()}createAcceptor(){return r=>{"line"in r?this.highlightToken({range:{start:{line:r.line,character:r.char},end:{line:r.line,character:r.char+r.length}},type:r.type,modifier:r.modifier}):"range"in r?this.highlightToken(r):"keyword"in r?this.highlightKeyword(r):"property"in r?this.highlightProperty(r):this.highlightNode({node:r.cst,type:r.type,modifier:r.modifier})}}getDocumentTokensBuilder(e){let r=this.tokensBuilders.get(e.uri.toString());if(r)return r;let n=new dh;return this.tokensBuilders.set(e.uri.toString(),n),n}async computeHighlighting(e,r,n){let i=e.parseResult.value,o=Zn(i,{range:this.currentRange}).iterator(),s;do if(s=o.next(),!s.done){await Ze(n);let a=s.value;this.highlightElement(a,r)==="prune"&&o.prune()}while(!s.done)}highlightToken(e){var r;let{range:n,type:i}=e,o=e.modifier;if(this.currentRange&&!Mu(n,this.currentRange)||!this.currentDocument||!this.currentTokensBuilder)return;let s=ph[i],a=0;if(o!==void 0){typeof o=="string"&&(o=[o]);for(let c of o){let f=vR[c];a|=f}}let l=n.start.line,u=n.end.line;if(l===u){let c=n.start.character,f=n.end.character-c;this.currentTokensBuilder.push(l,c,f,s,a)}else if(!((r=this.clientCapabilities)===null||r===void 0)&&r.multilineTokenSupport){let c=n.start.character,f=this.currentDocument.textDocument.offsetAt(n.start),m=this.currentDocument.textDocument.offsetAt(n.end);this.currentTokensBuilder.push(l,c,m-f,s,a)}else{let c=n.start,f=this.currentDocument.textDocument.offsetAt({line:l+1,character:0});this.currentTokensBuilder.push(c.line,c.character,f-c.character-1,s,a);for(let m=l+1;m<u;m++){let T=f;f=this.currentDocument.textDocument.offsetAt({line:m+1,character:0}),this.currentTokensBuilder.push(m,0,f-T-1,s,a)}this.currentTokensBuilder.push(u,0,n.end.character,s,a)}}highlightProperty(e){let r=[];if(typeof e.index=="number"){let o=Xt(e.node.$cstNode,e.property,e.index);o&&r.push(o)}else r.push(...Ei(e.node.$cstNode,e.property));let{type:n,modifier:i}=e;for(let o of r)this.highlightNode({node:o,type:n,modifier:i})}highlightKeyword(e){let{node:r,keyword:n,type:i,index:o,modifier:s}=e,a=[];if(typeof o=="number"){let l=zr(r.$cstNode,n,o);l&&a.push(l)}else a.push(...Rc(r.$cstNode,n));for(let l of a)this.highlightNode({node:l,type:i,modifier:s})}highlightNode(e){let{node:r,type:n,modifier:i}=e,o=r.range;this.highlightToken({range:o,type:n,modifier:i})}},fh;(function(t){function e(n,i){let o=new Map;Object.entries(ph).forEach(([l,u])=>o.set(u,l));let s=0,a=0;return r(n.data,5).map(l=>{s+=l[0],l[0]!==0&&(a=0),a+=l[1];let u=l[2];return{offset:i.textDocument.offsetAt({line:s,character:a}),tokenType:o.get(l[3]),tokenModifiers:l[4],text:i.textDocument.getText({start:{line:s,character:a},end:{line:s,character:a+u}})}})}t.decode=e;function r(n,i){let o=[];for(let s=0;s<n.length;s+=i){let a=n.slice(s,s+i);o.push(a)}return o}})(fh=fh||(fh={}));var bc=class extends Sc{highlightElement(e,r){var n;xe(e)?r({node:e,property:"feature",type:si.SemanticTokenTypes.property}):_e(e)?e.feature&&r({node:e,property:"feature",type:si.SemanticTokenTypes.property}):rs(e)?r({node:e,property:"name",type:si.SemanticTokenTypes.type}):ir(e)?(e.primitiveType||e.typeRef)&&r({node:e,property:e.primitiveType?"primitiveType":"typeRef",type:si.SemanticTokenTypes.type}):KT(e)?r({node:e,property:"name",type:si.SemanticTokenTypes.parameter}):ts(e)?r({node:e,property:"parameter",type:si.SemanticTokenTypes.parameter}):Ne(e)?!((n=e.rule.ref)===null||n===void 0)&&n.fragment&&r({node:e,property:"rule",type:si.SemanticTokenTypes.type}):qu(e)&&r({node:e,property:"name",type:si.SemanticTokenTypes.property})}};var Ac=class extends as{getName(e){return xe(e)?e.feature:super.getName(e)}getNameNode(e){return xe(e)?Xt(e.$cstNode,"feature"):super.getNameNode(e)}};var As=class{constructor(e){this.nameProvider=e.references.NameProvider,this.index=e.shared.workspace.IndexManager,this.nodeLocator=e.workspace.AstNodeLocator}findDeclaration(e){if(e){let r=Cs(e),n=e.astNode;if(r&&n){let i=n[r.feature];if(Yn(i))return i.ref;if(Array.isArray(i)){for(let o of i)if(Yn(o)&&o.$refNode&&o.$refNode.offset<=e.offset&&o.$refNode.end>=e.end)return o.ref}}if(n){let i=this.nameProvider.getNameNode(n);if(i&&(i===e||CT(e,i)))return n}}}findDeclarationNode(e){let r=this.findDeclaration(e);if(r?.$cstNode){let n=this.nameProvider.getNameNode(r);return n??r.$cstNode}}findReferences(e,r){let n=[];if(r.includeDeclaration){let o=this.getReferenceToSelf(e);o&&n.push(o)}let i=this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e));return r.documentUri&&(i=i.filter(o=>ve.equals(o.sourceUri,r.documentUri))),n.push(...i),ie(n)}getReferenceToSelf(e){let r=this.nameProvider.getNameNode(e);if(r){let n=ne(e),i=this.nodeLocator.getAstNodePath(e);return{sourceUri:n.uri,sourcePath:i,targetUri:n.uri,targetPath:i,segment:nr(r),local:!0}}}};var Cc=class extends As{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}findDeclaration(e){let r=e.astNode,n=Cs(e);if(n&&n.feature==="feature"){if(xe(r))return this.findAssignmentDeclaration(r);if(_e(r))return this.findActionDeclaration(r)}return super.findDeclaration(e)}findReferences(e,r){var n;return qu(e)?this.findReferencesToTypeAttribute(e,(n=r.includeDeclaration)!==null&&n!==void 0?n:!1):super.findReferences(e,r)}findReferencesToTypeAttribute(e,r){let n=[],i=Ie(e,Sr);if(i){if(r){let a=this.getReferenceToSelf(e);a&&n.push(a)}let o=Fm(i,this,this.documents,this.nodeLocator),s=[];o.forEach(a=>{let l=this.findRulesWithReturnType(a);s.push(...l)}),s.forEach(a=>{let l=this.createReferencesToAttribute(a,e);n.push(...l)})}return ie(n)}createReferencesToAttribute(e,r){let n=[];if(K(e)){let i=ps(e.definition).find(o=>o.feature===r.name);if(i?.$cstNode){let o=this.nameProvider.getNameNode(i);o&&n.push({sourceUri:ne(i).uri,sourcePath:this.nodeLocator.getAstNodePath(i),targetUri:ne(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:nr(o),local:ve.equals(ne(i).uri,ne(r).uri)})}}else{if(e.feature===r.name){let o=Xt(e.$cstNode,"feature");o&&n.push({sourceUri:ne(e).uri,sourcePath:this.nodeLocator.getAstNodePath(e),targetUri:ne(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:nr(o),local:ve.equals(ne(e).uri,ne(r).uri)})}let i=Ie(e,K);n.push(...this.createReferencesToAttribute(i,r))}return n}findAssignmentDeclaration(e){var r;let n=Ie(e,K),i=Zm(e);if(i){let o=this.findActionDeclaration(i,e.feature);if(o)return o}if(!((r=n?.returnType)===null||r===void 0)&&r.ref&&(Sr(n.returnType.ref)||Lt(n.returnType.ref))){let o=Va(n.returnType.ref);for(let s of o){let a=s.attributes.find(l=>l.name===e.feature);if(a)return a}}return e}findActionDeclaration(e,r){var n;if(!((n=e.type)===null||n===void 0)&&n.ref){let i=r??e.feature,o=Va(e.type.ref);for(let s of o){let a=s.attributes.find(l=>l.name===i);if(a)return a}}}findRulesWithReturnType(e){let r=[];return this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e)).forEach(i=>{let o=this.documents.getOrCreateDocument(i.sourceUri),s=this.nodeLocator.getAstNode(o.parseResult.value,i.sourcePath);(K(s)||_e(s))&&r.push(s)}),r}};var ul=de(be(),1);var xR=de(be(),1);var wc=class{constructor(e){this.grammarConfig=e.parser.GrammarConfig,this.nameProvider=e.references.NameProvider,this.documents=e.shared.workspace.LangiumDocuments,this.references=e.references.References}prepareCallHierarchy(e,r){let n=e.parseResult.value,i=It(n.$cstNode,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findDeclarationNode(i);if(o)return this.getCallHierarchyItems(o.astNode,e)}getCallHierarchyItems(e,r){let n=this.nameProvider.getNameNode(e),i=this.nameProvider.getName(e);if(!(!n||!e.$cstNode||i===void 0))return[Object.assign({kind:xR.SymbolKind.Method,name:i,range:e.$cstNode.range,selectionRange:n.range,uri:r.uri.toString()},this.getCallHierarchyItem(e))]}getCallHierarchyItem(e){}incomingCalls(e){let r=this.documents.getOrCreateDocument(Yt.parse(e.item.uri)),n=r.parseResult.value,i=It(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findReferences(i.astNode,{includeDeclaration:!1});return this.getIncomingCalls(i.astNode,o)}outgoingCalls(e){let r=this.documents.getOrCreateDocument(Yt.parse(e.item.uri)),n=r.parseResult.value,i=It(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(i)return this.getOutgoingCalls(i.astNode)}};var SR=de(be(),1);var ws=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getDefinition(e,r){let n=e.parseResult.value;if(n.$cstNode){let i=n.$cstNode,o=It(i,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(o)return this.collectLocationLinks(o,r)}}collectLocationLinks(e,r){var n;let i=this.findLink(e);if(i)return[SR.LocationLink.create(i.targetDocument.textDocument.uri,((n=i.target.astNode.$cstNode)!==null&&n!==void 0?n:i.target).range,i.target.range,i.source.range)]}findLink(e){let r=this.references.findDeclarationNode(e);if(r?.astNode){let n=ne(r.astNode);if(r&&n)return{source:e,target:r,targetDocument:n}}}};var bR=de(be(),1);var kc=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}getDocumentHighlight(e,r){let n=e.parseResult.value.$cstNode;if(!n)return;let i=It(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findDeclaration(i);if(o){let s=ve.equals(ne(o).uri,e.uri),a={documentUri:e.uri,includeDeclaration:s};return this.references.findReferences(o,a).map(u=>this.createDocumentHighlight(u)).toArray()}}createDocumentHighlight(e){return bR.DocumentHighlight.create(e.segment.range)}};var Ec=class{constructor(e){this.nameProvider=e.references.NameProvider,this.nodeKindProvider=e.shared.lsp.NodeKindProvider}getSymbols(e){return this.getSymbol(e,e.parseResult.value)}getSymbol(e,r){let n=r.$cstNode,i=this.nameProvider.getNameNode(r);if(i&&n){let o=this.nameProvider.getName(r);return[{kind:this.nodeKindProvider.getSymbolKind(r),name:o??i.text,range:n.range,selectionRange:i.range,children:this.getChildSymbols(e,r)}]}else return this.getChildSymbols(e,r)||[]}getChildSymbols(e,r){let n=[];for(let i of ki(r)){let o=this.getSymbol(e,i);n.push(...o)}if(n.length>0)return n}};var wN=de(be(),1);var $c=class{match(e,r){if(e.length===0)return!0;r=r.toLowerCase();let n=!1,i,o=0,s=r.length;for(let a=0;a<s;a++){let l=r.charCodeAt(a),u=e.charCodeAt(o);if((l===u||this.toUpperCharCode(l)===this.toUpperCharCode(u))&&(n||(n=i===void 0||this.isWordTransition(i,l)),n&&o++,o===e.length))return!0;i=l}return!1}isWordTransition(e,r){return AR<=e&&e<=CR&&kN<=r&&r<=EN||e===wR&&r!==wR}toUpperCharCode(e){return AR<=e&&e<=CR?e-32:e}},AR="a".charCodeAt(0),CR="z".charCodeAt(0),kN="A".charCodeAt(0),EN="Z".charCodeAt(0),wR="_".charCodeAt(0);var mh=class{constructor(e){this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getHoverContent(e,r){var n,i;let o=(i=(n=e.parseResult)===null||n===void 0?void 0:n.value)===null||i===void 0?void 0:i.$cstNode;if(o){let s=e.textDocument.offsetAt(r.position),a=It(o,s,this.grammarConfig.nameRegexp);if(a&&a.offset+a.length>s){let l=this.references.findDeclaration(a);if(l)return this.getAstNodeHoverContent(l)}}}},_c=class extends mh{constructor(e){super(e),this.documentationProvider=e.documentation.DocumentationProvider}getAstNodeHoverContent(e){let r=this.documentationProvider.getDocumentation(e);if(r)return{contents:{kind:"markdown",value:r}}}};var $N=de(be(),1);var _N=de(be(),1);var Yr=de(be(),1);var je;(function(t){t[t.Changed=0]="Changed",t[t.Parsed=1]="Parsed",t[t.IndexedContent=2]="IndexedContent",t[t.ComputedScopes=3]="ComputedScopes",t[t.Linked=4]="Linked",t[t.IndexedReferences=5]="IndexedReferences",t[t.Validated=6]="Validated"})(je=je||(je={}));var Nc=class{constructor(e){this.serviceRegistry=e.ServiceRegistry,this.textDocuments=e.workspace.TextDocuments,this.fileSystemProvider=e.workspace.FileSystemProvider}fromTextDocument(e,r){return this.create(r??Yt.parse(e.uri),e)}fromString(e,r){return this.create(r,e)}fromModel(e,r){return this.create(r,{$model:e})}create(e,r){if(r??(r=this.textDocuments.get(e.toString())),r??(r=this.getContentFromFileSystem(e)),typeof r=="string"){let n=this.parse(e,r);return this.createLangiumDocument(n,e,void 0,r)}else if("$model"in r){let n={value:r.$model,parserErrors:[],lexerErrors:[]};return this.createLangiumDocument(n,e)}else{let n=this.parse(e,r.getText());return this.createLangiumDocument(n,e,r)}}createLangiumDocument(e,r,n,i){let o;if(n)o={parseResult:e,uri:r,state:je.Parsed,references:[],textDocument:n};else{let s=this.createTextDocumentGetter(r,i);o={parseResult:e,uri:r,state:je.Parsed,references:[],get textDocument(){return s()}}}return e.value.$document=o,o}update(e){let r=this.textDocuments.get(e.uri.toString()),n=r?r.getText():this.getContentFromFileSystem(e.uri);if(r)Object.defineProperty(e,"textDocument",{value:r});else{let i=this.createTextDocumentGetter(e.uri,n);Object.defineProperty(e,"textDocument",{get:i})}return e.parseResult=this.parse(e.uri,n),e.parseResult.value.$document=e,e}getContentFromFileSystem(e){return this.fileSystemProvider.readFileSync(e)}parse(e,r){return this.serviceRegistry.getServices(e).parser.LangiumParser.parse(r)}createTextDocumentGetter(e,r){let n=this.serviceRegistry,i;return()=>i??(i=Xo.create(e.toString(),n.getServices(e).LanguageMetaData.languageId,0,r??""))}},Ic=class{constructor(e){this.documentMap=new Map,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory}get all(){return ie(this.documentMap.values())}addDocument(e){let r=e.uri.toString();if(this.documentMap.has(r))throw new Error(`A document with the URI '${r}' is already present.`);this.documentMap.set(r,e)}getOrCreateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n||(n=this.langiumDocumentFactory.create(e),this.documentMap.set(r,n),n)}hasDocument(e){return this.documentMap.has(e.toString())}invalidateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=je.Changed,n.precomputedScopes=void 0,n.references=[],n.diagnostics=void 0),n}deleteDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=je.Changed,this.documentMap.delete(r)),n}};var NN=de(be(),1);function kR(t){let e=[],r=[];t.forEach(i=>{i?.triggerCharacters&&e.push(...i.triggerCharacters),i?.retriggerCharacters&&r.push(...i.retriggerCharacters)});let n={triggerCharacters:e.length>0?Array.from(new Set(e)).sort():void 0,retriggerCharacters:r.length>0?Array.from(new Set(r)).sort():void 0};return n.triggerCharacters?n:void 0}var Pc=class{constructor(e){this.onInitializeEmitter=new Yr.Emitter,this.onInitializedEmitter=new Yr.Emitter,this.services=e}get onInitialize(){return this.onInitializeEmitter.event}get onInitialized(){return this.onInitializedEmitter.event}async initialize(e){return this.eagerLoadServices(),this.onInitializeEmitter.fire(e),this.onInitializeEmitter.dispose(),this.buildInitializeResult(e)}eagerLoadServices(){Fu(this.services),this.services.ServiceRegistry.all.forEach(e=>Fu(e))}hasService(e){return this.services.ServiceRegistry.all.some(r=>e(r)!==void 0)}buildInitializeResult(e){var r;let n=this.services.ServiceRegistry.all,i=this.hasService(A=>A.lsp.Formatter),o=n.map(A=>{var q;return(q=A.lsp.Formatter)===null||q===void 0?void 0:q.formatOnTypeOptions}).find(A=>!!A),s=this.hasService(A=>A.lsp.CodeActionProvider),a=this.hasService(A=>A.lsp.SemanticTokenProvider),l=(r=this.services.lsp.ExecuteCommandHandler)===null||r===void 0?void 0:r.commands,u=this.hasService(A=>A.lsp.DocumentLinkProvider),c=kR(n.map(A=>{var q;return(q=A.lsp.SignatureHelp)===null||q===void 0?void 0:q.signatureHelpOptions})),f=this.hasService(A=>A.lsp.TypeProvider),m=this.hasService(A=>A.lsp.ImplementationProvider),T=this.hasService(A=>A.lsp.CompletionProvider),b=yR(n.map(A=>{var q;return(q=A.lsp.CompletionProvider)===null||q===void 0?void 0:q.completionOptions})),C=this.hasService(A=>A.lsp.ReferencesProvider),_=this.hasService(A=>A.lsp.DocumentSymbolProvider),w=this.hasService(A=>A.lsp.DefinitionProvider),v=this.hasService(A=>A.lsp.DocumentHighlightProvider),y=this.hasService(A=>A.lsp.FoldingRangeProvider),$=this.hasService(A=>A.lsp.HoverProvider),D=this.hasService(A=>A.lsp.RenameProvider),X=this.hasService(A=>A.lsp.CallHierarchyProvider),ye=this.hasService(A=>A.lsp.CodeLensProvider),Ee=this.hasService(A=>A.lsp.DeclarationProvider),jt=this.hasService(A=>A.lsp.InlayHintProvider),vt=this.services.lsp.WorkspaceSymbolProvider;return{capabilities:{workspace:{workspaceFolders:{supported:!0}},executeCommandProvider:l&&{commands:l},textDocumentSync:Yr.TextDocumentSyncKind.Incremental,completionProvider:T?b:void 0,referencesProvider:C,documentSymbolProvider:_,definitionProvider:w,typeDefinitionProvider:f,documentHighlightProvider:v,codeActionProvider:s,documentFormattingProvider:i,documentRangeFormattingProvider:i,documentOnTypeFormattingProvider:o,foldingRangeProvider:y,hoverProvider:$,renameProvider:D?{prepareProvider:!0}:void 0,semanticTokensProvider:a?RR:void 0,signatureHelpProvider:c,implementationProvider:m,callHierarchyProvider:X?{}:void 0,documentLinkProvider:u?{resolveProvider:!1}:void 0,codeLensProvider:ye?{resolveProvider:!1}:void 0,declarationProvider:Ee,inlayHintProvider:jt?{resolveProvider:!1}:void 0,workspaceSymbolProvider:vt?{resolveProvider:!!vt.resolveSymbol}:void 0}}}async initialized(e){this.onInitializedEmitter.fire(e),this.onInitializedEmitter.dispose()}};function $R(t){let e=t.lsp.Connection;if(!e)throw new Error("Starting a language server requires the languageServer.Connection service to be set.");IN(e,t),PN(e,t),DN(e,t),ON(e,t),MN(e,t),FN(e,t),UN(e,t),qN(e,t),jN(e,t),KN(e,t),WN(e,t),LN(e,t),BN(e,t),HN(e,t),zN(e,t),VN(e,t),YN(e,t),QN(e,t),tI(e,t),ZN(e,t),JN(e,t),XN(e,t),GN(e,t),eI(e,t),e.onInitialize(n=>t.lsp.LanguageServer.initialize(n)),e.onInitialized(n=>t.lsp.LanguageServer.initialized(n)),t.workspace.TextDocuments.listen(e),e.listen()}function IN(t,e){let r=e.workspace.DocumentBuilder,n=e.workspace.MutexLock;function i(s,a){n.lock(l=>r.update(s,a,l))}e.workspace.TextDocuments.onDidChangeContent(s=>{i([Yt.parse(s.document.uri)],[])}),t.onDidChangeWatchedFiles(s=>{let a=[],l=[];for(let u of s.changes){let c=Yt.parse(u.uri);u.type===Yr.FileChangeType.Deleted?l.push(c):a.push(c)}i(a,l)})}function PN(t,e){e.workspace.DocumentBuilder.onBuildPhase(je.Validated,async(n,i)=>{for(let o of n)if(o.diagnostics&&t.sendDiagnostics({uri:o.uri.toString(),diagnostics:o.diagnostics}),i.isCancellationRequested)return})}function DN(t,e){t.onCompletion(sr((r,n,i,o)=>{var s;return(s=r.lsp.CompletionProvider)===null||s===void 0?void 0:s.getCompletion(n,i,o)},e))}function ON(t,e){t.onReferences(sr((r,n,i,o)=>{var s;return(s=r.lsp.ReferencesProvider)===null||s===void 0?void 0:s.findReferences(n,i,o)},e))}function LN(t,e){t.onCodeAction(sr((r,n,i,o)=>{var s;return(s=r.lsp.CodeActionProvider)===null||s===void 0?void 0:s.getCodeActions(n,i,o)},e))}function MN(t,e){t.onDocumentSymbol(sr((r,n,i,o)=>{var s;return(s=r.lsp.DocumentSymbolProvider)===null||s===void 0?void 0:s.getSymbols(n,i,o)},e))}function FN(t,e){t.onDefinition(sr((r,n,i,o)=>{var s;return(s=r.lsp.DefinitionProvider)===null||s===void 0?void 0:s.getDefinition(n,i,o)},e))}function UN(t,e){t.onTypeDefinition(sr((r,n,i,o)=>{var s;return(s=r.lsp.TypeProvider)===null||s===void 0?void 0:s.getTypeDefinition(n,i,o)},e))}function qN(t,e){t.onImplementation(sr((r,n,i,o)=>{var s;return(s=r.lsp.ImplementationProvider)===null||s===void 0?void 0:s.getImplementation(n,i,o)},e))}function GN(t,e){t.onDeclaration(sr((r,n,i,o)=>{var s;return(s=r.lsp.DeclarationProvider)===null||s===void 0?void 0:s.getDeclaration(n,i,o)},e))}function jN(t,e){t.onDocumentHighlight(sr((r,n,i,o)=>{var s;return(s=r.lsp.DocumentHighlightProvider)===null||s===void 0?void 0:s.getDocumentHighlight(n,i,o)},e))}function HN(t,e){t.onHover(sr((r,n,i,o)=>{var s;return(s=r.lsp.HoverProvider)===null||s===void 0?void 0:s.getHoverContent(n,i,o)},e))}function KN(t,e){t.onFoldingRanges(sr((r,n,i,o)=>{var s;return(s=r.lsp.FoldingRangeProvider)===null||s===void 0?void 0:s.getFoldingRanges(n,i,o)},e))}function WN(t,e){t.onDocumentFormatting(sr((r,n,i,o)=>{var s;return(s=r.lsp.Formatter)===null||s===void 0?void 0:s.formatDocument(n,i,o)},e)),t.onDocumentRangeFormatting(sr((r,n,i,o)=>{var s;return(s=r.lsp.Formatter)===null||s===void 0?void 0:s.formatDocumentRange(n,i,o)},e)),t.onDocumentOnTypeFormatting(sr((r,n,i,o)=>{var s;return(s=r.lsp.Formatter)===null||s===void 0?void 0:s.formatDocumentOnType(n,i,o)},e))}function BN(t,e){t.onRenameRequest(sr((r,n,i,o)=>{var s;return(s=r.lsp.RenameProvider)===null||s===void 0?void 0:s.rename(n,i,o)},e)),t.onPrepareRename(sr((r,n,i,o)=>{var s;return(s=r.lsp.RenameProvider)===null||s===void 0?void 0:s.prepareRename(n,i,o)},e))}function zN(t,e){t.languages.inlayHint.on(Ni((r,n,i,o)=>{var s;return(s=r.lsp.InlayHintProvider)===null||s===void 0?void 0:s.getInlayHints(n,i,o)},e))}function VN(t,e){let r={data:[]};t.languages.semanticTokens.on(Ni((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlight(i,o,s):r,e)),t.languages.semanticTokens.onDelta(Ni((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightDelta(i,o,s):r,e)),t.languages.semanticTokens.onRange(Ni((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightRange(i,o,s):r,e))}function XN(t,e){t.onDidChangeConfiguration(r=>{r.settings&&e.workspace.ConfigurationProvider.updateConfiguration(r)})}function YN(t,e){let r=e.lsp.ExecuteCommandHandler;r&&t.onExecuteCommand(async(n,i)=>{var o;try{return await r.executeCommand(n.command,(o=n.arguments)!==null&&o!==void 0?o:[],i)}catch(s){return ks(s)}})}function JN(t,e){t.onDocumentLinks(Ni((r,n,i,o)=>{var s;return(s=r.lsp.DocumentLinkProvider)===null||s===void 0?void 0:s.getDocumentLinks(n,i,o)},e))}function QN(t,e){t.onSignatureHelp(Ni((r,n,i,o)=>{var s;return(s=r.lsp.SignatureHelp)===null||s===void 0?void 0:s.provideSignatureHelp(n,i,o)},e))}function ZN(t,e){t.onCodeLens(Ni((r,n,i,o)=>{var s;return(s=r.lsp.CodeLensProvider)===null||s===void 0?void 0:s.provideCodeLens(n,i,o)},e))}function eI(t,e){var r;let n=e.lsp.WorkspaceSymbolProvider;if(n){t.onWorkspaceSymbol(async(o,s)=>{try{return await n.getSymbols(o,s)}catch(a){return ks(a)}});let i=(r=n.resolveSymbol)===null||r===void 0?void 0:r.bind(n);i&&t.onWorkspaceSymbolResolve(async(o,s)=>{try{return await i(o,s)}catch(a){return ks(a)}})}}function tI(t,e){t.languages.callHierarchy.onPrepare(Ni((r,n,i,o)=>{var s;return r.lsp.CallHierarchyProvider&&(s=r.lsp.CallHierarchyProvider.prepareCallHierarchy(n,i,o))!==null&&s!==void 0?s:null},e)),t.languages.callHierarchy.onIncomingCalls(ER((r,n,i)=>{var o;return r.lsp.CallHierarchyProvider&&(o=r.lsp.CallHierarchyProvider.incomingCalls(n,i))!==null&&o!==void 0?o:null},e)),t.languages.callHierarchy.onOutgoingCalls(ER((r,n,i)=>{var o;return r.lsp.CallHierarchyProvider&&(o=r.lsp.CallHierarchyProvider.outgoingCalls(n,i))!==null&&o!==void 0?o:null},e))}function ER(t,e){let r=e.ServiceRegistry;return async(n,i)=>{let o=Yt.parse(n.item.uri),s=r.getServices(o);if(!s){let a=`Could not find service instance for uri: '${o.toString()}'`;throw console.error(a),new Error(a)}try{return await t(s,n,i)}catch(a){return ks(a)}}}function Ni(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,o)=>{let s=Yt.parse(i.textDocument.uri),a=n.getServices(s);if(!a)throw console.error(`Could not find service instance for uri: '${s.toString()}'`),new Error;let l=r.getOrCreateDocument(s);if(!l)throw new Error;try{return await t(a,l,i,o)}catch(u){return ks(u)}}}function sr(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,o)=>{let s=Yt.parse(i.textDocument.uri),a=n.getServices(s);if(!a)return console.error(`Could not find service instance for uri: '${s.toString()}'`),null;let l=r.getOrCreateDocument(s);if(!l)return null;try{return await t(a,l,i,o)}catch(u){return ks(u)}}}function ks(t){if(To(t))return new Yr.ResponseError(Yr.LSPErrorCodes.RequestCancelled,"The request has been cancelled.");if(t instanceof Yr.ResponseError)return t;throw t}var Oc=de(be(),1),Dc=class{getSymbolKind(){return Oc.SymbolKind.Field}getCompletionItemKind(){return Oc.CompletionItemKind.Reference}};var _R=de(be(),1);var Lc=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}findReferences(e,r){let n=e.parseResult.value.$cstNode;if(!n)return[];let i=It(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);return i?this.getReferences(i,r,e):[]}getReferences(e,r,n){let i=[],o=this.references.findDeclaration(e);if(o){let s={includeDeclaration:r.context.includeDeclaration};this.references.findReferences(o,s).forEach(a=>{i.push(_R.Location.create(a.sourceUri.toString(),a.segment.range))})}return i}};var NR=de(be(),1);var Mc=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}async rename(e,r){let n={},i=e.parseResult.value.$cstNode;if(!i)return;let o=e.textDocument.offsetAt(r.position),s=It(i,o,this.grammarConfig.nameRegexp);if(!s)return;let a=this.references.findDeclaration(s);if(!a)return;let l={onlyLocal:!1,includeDeclaration:!0};return this.references.findReferences(a,l).forEach(c=>{let f=NR.TextEdit.replace(c.segment.range,r.newName),m=c.sourceUri.toString();n[m]?n[m].push(f):n[m]=[f]}),{changes:n}}prepareRename(e,r){return this.renameNodeRange(e,r.position)}renameNodeRange(e,r){let n=e.parseResult.value.$cstNode,i=e.textDocument.offsetAt(r);if(n&&i){let o=It(n,i,this.grammarConfig.nameRegexp);if(!o)return;if(this.references.findDeclaration(o)||this.isNameNode(o))return o.range}}isNameNode(e){return e?.astNode&&Xa(e.astNode)&&e===this.nameProvider.getNameNode(e.astNode)}};var rI=de(be(),1);var IR=de(be(),1);var Fc=class{constructor(e){this.indexManager=e.workspace.IndexManager,this.nodeKindProvider=e.lsp.NodeKindProvider,this.fuzzyMatcher=e.lsp.FuzzyMatcher}async getSymbols(e,r=IR.CancellationToken.None){let n=[],i=e.query.toLowerCase();for(let o of this.indexManager.allElements())if(await Ze(r),this.fuzzyMatcher.match(i,o.name)){let s=this.getWorkspaceSymbol(o);s&&n.push(s)}return n}getWorkspaceSymbol(e){let r=e.nameSegment;if(r)return{kind:this.nodeKindProvider.getSymbolKind(e),name:e.name,location:{range:r.range,uri:e.documentUri.toString()}}}};var Uc=class extends ws{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}collectLocationLinks(e,r){var n,i,o,s,a,l;let u="path";if(Uu(e.astNode)&&((n=Cs(e))===null||n===void 0?void 0:n.feature)===u){let c=ii(this.documents,e.astNode);if(c?.$document){let f=(i=this.findTargetObject(c))!==null&&i!==void 0?i:c,m=(s=(o=this.nameProvider.getNameNode(f))===null||o===void 0?void 0:o.range)!==null&&s!==void 0?s:ul.Range.create(0,0,0,0),T=(l=(a=f.$cstNode)===null||a===void 0?void 0:a.range)!==null&&l!==void 0?l:ul.Range.create(0,0,0,0);return[ul.LocationLink.create(c.$document.uri.toString(),T,m,e.range)]}return}return super.collectLocationLinks(e,r)}findTargetObject(e){return e.isDeclared?e:ki(e).head()}};var hh=de(be(),1);var qc=class extends wc{getIncomingCalls(e,r){if(!K(e))return;let n=new Map;if(r.forEach(i=>{let s=this.documents.getOrCreateDocument(i.sourceUri).parseResult.value;if(!s.$cstNode)return;let a=xr(s.$cstNode,i.segment.offset);if(!a)return;let l=Ie(a.astNode,K);if(!l||!l.$cstNode)return;let u=this.nameProvider.getNameNode(l);if(!u)return;let c=i.sourceUri.toString(),f=c+"@"+u.text;n.has(f)?n.set(f,{parserRule:l.$cstNode,nameNode:u,targetNodes:[...n.get(f).targetNodes,a],docUri:c}):n.set(f,{parserRule:l.$cstNode,nameNode:u,targetNodes:[a],docUri:c})}),n.size!==0)return Array.from(n.values()).map(i=>({from:{kind:hh.SymbolKind.Method,name:i.nameNode.text,range:i.parserRule.range,selectionRange:i.nameNode.range,uri:i.docUri},fromRanges:i.targetNodes.map(o=>o.range)}))}getOutgoingCalls(e){if(!K(e))return;let r=Qe(e).filter(Ne).toArray(),n=new Map;if(r.forEach(i=>{var o;let s=i.$cstNode;if(!s)return;let a=(o=i.rule.ref)===null||o===void 0?void 0:o.$cstNode;if(!a)return;let l=this.nameProvider.getNameNode(a.astNode);if(!l)return;let u=ne(a.astNode).uri.toString(),c=u+"@"+l.text;n.has(c)?n.set(c,{refCstNode:a,to:l,from:[...n.get(c).from,s.range],docUri:u}):n.set(c,{refCstNode:a,to:l,from:[s.range],docUri:u})}),n.size!==0)return Array.from(n.values()).map(i=>({to:{kind:hh.SymbolKind.Method,name:i.to.text,range:i.refCstNode.range,selectionRange:i.to.range,uri:i.docUri},fromRanges:i.from}))}};var Gc=class{constructor(e){this.documents=e.shared.workspace.LangiumDocuments}collectValidationResources(e){let r=fR(e,this.documents);return{typeToValidationInfo:this.collectValidationInfo(r),typeToSuperProperties:this.collectSuperProperties(r)}}collectValidationInfo({astResources:e,inferred:r,declared:n}){let i=new Map,o=nI(e);for(let a of Ju(r))i.set(a.name,{inferred:a,inferredNodes:o.get(a.name)});let s=ie(e.interfaces).concat(e.types).reduce((a,l)=>a.set(l.name,l),new Map);for(let a of Ju(n)){let l=s.get(a.name);if(l){let u=i.get(a.name);i.set(a.name,Object.assign(Object.assign({},u??{}),{declared:a,declaredNode:l}))}}return i}collectSuperProperties({inferred:e,declared:r}){let n=new Map,i=Um(e,r),o=new Map(i.map(s=>[s.name,s]));for(let s of Um(e,r))n.set(s.name,this.addSuperProperties(s,o,new Set));return n}addSuperProperties(e,r,n){if(n.has(e.name))return[];n.add(e.name);let i=[...e.properties];for(let o of e.superTypes){let s=r.get(o.name);s&&i.push(...this.addSuperProperties(s,r,n))}return i}};function nI({parserRules:t,datatypeRules:e}){let r=new Le;ie(t).concat(e).forEach(i=>r.add(Ro(i),i));function n(i){if(_e(i)){let o=hs(i);o&&r.add(o,i)}(Ir(i)||Mt(i)||Pr(i))&&i.elements.forEach(o=>n(o))}return t.forEach(i=>n(i.definition)),r}function PR(t){return t&&"declared"in t}function DR(t){return t&&"inferred"in t}function OR(t){return t&&"inferred"in t&&"declared"in t}function MR(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarTypesValidator,n={Action:[r.checkActionIsNotUnionType],Grammar:[r.checkDeclaredTypesConsistency,r.checkDeclaredAndInferredTypesConsistency],Interface:[r.checkCyclicInterface],Type:[r.checkCyclicType]};e.register(n,r)}var jc=class{checkCyclicType(e,r){Ii(e,new Set)&&r("error",`Type alias '${e.name}' circularly references itself.`,{node:e,property:"name"})}checkCyclicInterface(e,r){Ii(e,new Set)&&r("error",`Type '${e.name}' recursively references itself as a base type.`,{node:e,property:"name"})}checkDeclaredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i){for(let o of i.typeToValidationInfo.values())if(PR(o)&&dn(o.declared)&&Sr(o.declaredNode)){let s=o;oI(s,r),sI(s,r)}}}checkDeclaredAndInferredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i)for(let o of i.typeToValidationInfo.values())DR(o)&&o.inferred instanceof ss&&iI(o.inferred,r),OR(o)&&uI(o,i,r)}checkActionIsNotUnionType(e,r){Lt(e.type)&&r("error","Actions cannot create union types.",{node:e,property:"type"})}};function Ii(t,e){var r;if(e.has(t))return!0;if(e.add(t),Lt(t))return Ii(t.type,e);if(Sr(t))return t.superTypes.some(n=>n.ref&&Ii(n.ref,new Set(e)));if(ir(t)){if(!((r=t.typeRef)===null||r===void 0)&&r.ref)return Ii(t.typeRef.ref,e)}else{if(mo(t))return Ii(t.referenceType,e);if(po(t))return Ii(t.elementType,e);if(Br(t))return t.types.some(n=>Ii(n,new Set(e)))}return!1}function iI(t,e){t.properties.forEach(r=>{var n;let i=Lm(r.type);if(i.length>1){let o=a=>ei(a)?"ref":"other",s=o(i[0]);if(i.slice(1).some(a=>o(a)!==s)){let a=(n=r.astNodes.values().next())===null||n===void 0?void 0:n.value;a&&e("error",`Mixing a cross-reference with other types is not supported. Consider splitting property "${r.name}" into two or more different properties.`,{node:a})}}})}function oI({declared:t,declaredNode:e},r){Array.from(t.superTypes).forEach((n,i)=>{n&&(cn(n)&&r("error","Interfaces cannot extend union types.",{node:e,property:"superTypes",index:i}),n.declared||r("error","Extending an inferred type is discouraged.",{node:e,property:"superTypes",index:i}))})}function sI({declared:t,declaredNode:e},r){let n=t.properties.reduce((s,a)=>s.add(a.name,a),new Le);for(let[s,a]of n.entriesGroupedByKey())if(a.length>1)for(let l of a)r("error",`Cannot have two properties with the same name '${s}'.`,{node:Array.from(l.astNodes)[0],property:"name"});let i=Array.from(t.superTypes);for(let s=0;s<i.length;s++)for(let a=s+1;a<i.length;a++){let l=i[s],u=i[a],c=dn(l)?l.superProperties:[],f=dn(u)?u.superProperties:[],m=aI(c,f);m.length>0&&r("error",`Cannot simultaneously inherit from '${l}' and '${u}'. Their ${m.map(T=>"'"+T+"'").join(", ")} properties are not identical.`,{node:e,property:"name"})}let o=new Set;for(let s of i){let a=dn(s)?s.superProperties:[];for(let l of a)o.add(l.name)}for(let s of t.properties)if(o.has(s.name)){let a=e.attributes.find(l=>l.name===s.name);a&&r("error",`Cannot redeclare property '${s.name}'. It is already inherited from another interface.`,{node:a,property:"name"})}}function aI(t,e){let r=[];for(let n of t){let i=e.find(o=>o.name===n.name);i&&!lI(n,i)&&r.push(n.name)}return r}function lI(t,e){return za(t.type,e.type)&&za(e.type,t.type)}function uI(t,e,r){let{inferred:n,declared:i,declaredNode:o,inferredNodes:s}=t,a=i.name,l=f=>m=>s.forEach(T=>r("error",`${m}${f?` ${f}`:""}.`,T?.inferredType?{node:T?.inferredType,property:"name"}:{node:T,property:_e(T)?"type":"name"})),u=(f,m)=>f.forEach(T=>r("error",m,{node:T,property:xe(T)||_e(T)?"feature":"name"})),c=f=>{s.forEach(m=>{K(m)&&ps(m.definition).find(b=>b.feature===f)===void 0&&r("error",`Property '${f}' is missing in a rule '${m.name}', but is required in type '${a}'.`,{node:m,property:"parameters"})})};if(cn(n)&&cn(i))cI(n.type,i.type,l(`in a rule that returns type '${a}'`));else if(dn(n)&&dn(i))fI(n,i,e,l(`in a rule that returns type '${a}'`),u,c);else{let f=`Inferred and declared versions of type '${a}' both have to be interfaces or unions.`;l()(f),r("error",f,{node:o,property:"name"})}}function cI(t,e,r){za(t,e)||r(`Cannot assign type '${fn(t,"DeclaredType")}' to '${fn(e,"DeclaredType")}'`)}function LR(t){return t.optional||Xu(t.type)}function fI(t,e,r,n,i,o){let s=new Set(t.properties.map(f=>f.name)),a=new Map(t.allProperties.map(f=>[f.name,f])),l=new Map(e.superProperties.map(f=>[f.name,f])),u=f=>{if(Pt(f))return{types:f.types.map(m=>u(m))};if(ei(f))return{referenceType:u(f.referenceType)};if(ti(f))return{elementType:u(f.elementType)};if(Dr(f)){let m=r.typeToValidationInfo.get(f.value.name);return m?{value:"declared"in m?m.declared:m.inferred}:f}return f};for(let[f,m]of a.entries()){let T=l.get(f);if(T){let b=fn(m.type,"DeclaredType"),C=fn(T.type,"DeclaredType");if(!za(u(m.type),T.type)&&C!=="unknown"){let w=`The assigned type '${b}' is not compatible with the declared property '${f}' of type '${C}'.`;i(m.astNodes,w)}m.optional&&!LR(T)&&o(f)}else s.has(f)&&i(m.astNodes,`A property '${f}' is not expected.`)}let c=new Set;for(let[f,m]of l.entries())!a.get(f)&&!LR(m)&&c.add(f);if(c.size>0){let f=c.size>1?"Properties":"A property",m=c.size>1?"are expected":"is expected",T=Array.from(c).map(b=>`'${b}'`).sort().join(", ");n(`${f} ${T} ${m}.`)}}var dI={validation:{LangiumGrammarValidator:t=>new oc(t),ValidationResourcesCollector:t=>new Gc(t),LangiumGrammarTypesValidator:()=>new jc},lsp:{FoldingRangeProvider:t=>new Tc(t),CodeActionProvider:t=>new pc(t),SemanticTokenProvider:t=>new bc(t),Formatter:()=>new xc,DefinitionProvider:t=>new Uc(t),CallHierarchyProvider:t=>new qc(t),CompletionProvider:t=>new yc(t)},references:{ScopeComputation:t=>new fc(t),ScopeProvider:t=>new cc(t),References:t=>new Cc(t),NameProvider:()=>new Ac}};function FR(t,e){let r=co(fl(t),dR,e),n=co(cl({shared:r}),pR,dI);return pI(r,n),r.ServiceRegistry.register(n),Xv(n),MR(n),{shared:r,grammar:n}}function pI(t,e){t.workspace.DocumentBuilder.onBuildPhase(je.IndexedReferences,async(n,i)=>{for(let o of n){await Ze(i);let s=e.validation.ValidationResourcesCollector,a=o.parseResult.value;o.validationResources=s.collectValidationResources(a)}})}var gh=class{readFile(){throw new Error("Method not implemented.")}readFileSync(){throw new Error("Method not implemented.")}async readDirectory(){return[]}},Hc={fileSystemProvider:()=>new gh};function gc(t){return t.rules.find(e=>K(e)&&e.entry)}function mI(t){return t.rules.filter(e=>Ae(e)&&e.hidden)}function ds(t,e){let r=new Set,n=gc(t);if(!n)return new Set(t.rules);let i=[n].concat(mI(t));for(let s of i)UR(s,r,e);let o=new Set;for(let s of t.rules)(r.has(s.name)||Ae(s)&&s.hidden)&&o.add(s);return o}function UR(t,e,r){e.add(t.name),Qe(t).forEach(n=>{if(Ne(n)||r&&ju(n)){let i=n.rule.ref;i&&!e.has(i.name)&&UR(i,e,r)}})}function hc(t){if(t.terminal)return t.terminal;if(t.type.ref){let e=il(t.type.ref);return e?.terminal}}function qR(t){return t.hidden&&!Xr(t).test(" ")}function Ei(t,e){return!t||!e?[]:yh(t,e,t.astNode,!0)}function Xt(t,e,r){if(!t||!e)return;let n=yh(t,e,t.astNode,!0);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}function yh(t,e,r,n){if(!n){let i=Ie(t.grammarSource,xe);if(i&&i.feature===e)return[t]}return Cn(t)&&t.astNode===r?t.content.flatMap(i=>yh(i,e,r,!1)):[]}function Rc(t,e){return t?GR(t,e,t?.astNode):[]}function zr(t,e,r){if(!t)return;let n=GR(t,e,t?.astNode);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}function GR(t,e,r){if(t.astNode!==r)return[];if(dt(t.grammarSource)&&t.grammarSource.value===e)return[t];let n=Sm(t).iterator(),i,o=[];do if(i=n.next(),!i.done){let s=i.value;s.astNode===r?dt(s.grammarSource)&&s.grammarSource.value===e&&o.push(s):n.prune()}while(!i.done);return o}function Cs(t){var e;let r=t.astNode;for(;r===((e=t.container)===null||e===void 0?void 0:e.astNode);){let n=Ie(t.grammarSource,xe);if(n)return n;t=t.container}}function il(t){return es(t)&&(t=t.$container),jR(t,new Map)}function jR(t,e){var r;function n(i,o){let s;return Ie(i,xe)||(s=jR(o,e)),e.set(t,s),s}if(e.has(t))return e.get(t);e.set(t,void 0);for(let i of Qe(t)){if(xe(i)&&i.feature.toLowerCase()==="name")return e.set(t,i),i;if(Ne(i)&&K(i.rule.ref))return n(i,i.rule.ref);if(ir(i)&&(!((r=i.typeRef)===null||r===void 0)&&r.ref))return n(i,i.typeRef.ref)}}function tc(t){var e;let r=FR(Hc).grammar,n=r.serializer.JsonSerializer.deserialize(t);return r.shared.workspace.LangiumDocumentFactory.fromModel(n,Yt.parse(`memory://${(e=n.name)!==null&&e!==void 0?e:"grammar"}.langium`)),n}function HR(t){let e=[],r=t.Grammar;for(let n of r.rules)Ae(n)&&qR(n)&&Uv(Xr(n))&&e.push(n.name);return{multilineCommentRules:e,nameRegexp:bm}}var hI=typeof global=="object"&&global&&global.Object===Object&&global,Kc=hI;var gI=typeof self=="object"&&self&&self.Object===Object&&self,yI=Kc||gI||Function("return this")(),Et=yI;var TI=Et.Symbol,Ft=TI;var KR=Object.prototype,vI=KR.hasOwnProperty,RI=KR.toString,dl=Ft?Ft.toStringTag:void 0;function xI(t){var e=vI.call(t,dl),r=t[dl];try{t[dl]=void 0;var n=!0}catch{}var i=RI.call(t);return n&&(e?t[dl]=r:delete t[dl]),i}var WR=xI;var SI=Object.prototype,bI=SI.toString;function AI(t){return bI.call(t)}var BR=AI;var CI="[object Null]",wI="[object Undefined]",zR=Ft?Ft.toStringTag:void 0;function kI(t){return t==null?t===void 0?wI:CI:zR&&zR in Object(t)?WR(t):BR(t)}var mr=kI;function EI(t){return t!=null&&typeof t=="object"}var gt=EI;var $I="[object Symbol]";function _I(t){return typeof t=="symbol"||gt(t)&&mr(t)==$I}var $n=_I;function NI(t,e){for(var r=-1,n=t==null?0:t.length,i=Array(n);++r<n;)i[r]=e(t[r],r,t);return i}var _n=NI;var II=Array.isArray,z=II;var PI=1/0,VR=Ft?Ft.prototype:void 0,XR=VR?VR.toString:void 0;function YR(t){if(typeof t=="string")return t;if(z(t))return _n(t,YR)+"";if($n(t))return XR?XR.call(t):"";var e=t+"";return e=="0"&&1/t==-PI?"-0":e}var JR=YR;var DI=/\s/;function OI(t){for(var e=t.length;e--&&DI.test(t.charAt(e)););return e}var QR=OI;var LI=/^\s+/;function MI(t){return t&&t.slice(0,QR(t)+1).replace(LI,"")}var ZR=MI;function FI(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}var st=FI;var ex=0/0,UI=/^[-+]0x[0-9a-f]+$/i,qI=/^0b[01]+$/i,GI=/^0o[0-7]+$/i,jI=parseInt;function HI(t){if(typeof t=="number")return t;if($n(t))return ex;if(st(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=st(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=ZR(t);var r=qI.test(t);return r||GI.test(t)?jI(t.slice(2),r?2:8):UI.test(t)?ex:+t}var tx=HI;var rx=1/0,KI=17976931348623157e292;function WI(t){if(!t)return t===0?t:0;if(t=tx(t),t===rx||t===-rx){var e=t<0?-1:1;return e*KI}return t===t?t:0}var nx=WI;function BI(t){var e=nx(t),r=e%1;return e===e?r?e-r:e:0}var Nn=BI;function zI(t){return t}var br=zI;var VI="[object AsyncFunction]",XI="[object Function]",YI="[object GeneratorFunction]",JI="[object Proxy]";function QI(t){if(!st(t))return!1;var e=mr(t);return e==XI||e==YI||e==VI||e==JI}var hr=QI;var ZI=Et["__core-js_shared__"],Wc=ZI;var ix=function(){var t=/[^.]+$/.exec(Wc&&Wc.keys&&Wc.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function eP(t){return!!ix&&ix in t}var ox=eP;var tP=Function.prototype,rP=tP.toString;function nP(t){if(t!=null){try{return rP.call(t)}catch{}try{return t+""}catch{}}return""}var ai=nP;var iP=/[\\^$.*+?()[\]{}|]/g,oP=/^\[object .+?Constructor\]$/,sP=Function.prototype,aP=Object.prototype,lP=sP.toString,uP=aP.hasOwnProperty,cP=RegExp("^"+lP.call(uP).replace(iP,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function fP(t){if(!st(t)||ox(t))return!1;var e=hr(t)?cP:oP;return e.test(ai(t))}var sx=fP;function dP(t,e){return t?.[e]}var ax=dP;function pP(t,e){var r=ax(t,e);return sx(r)?r:void 0}var Ar=pP;var mP=Ar(Et,"WeakMap"),Bc=mP;var lx=Object.create,hP=function(){function t(){}return function(e){if(!st(e))return{};if(lx)return lx(e);t.prototype=e;var r=new t;return t.prototype=void 0,r}}(),ux=hP;function gP(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)}var cx=gP;function yP(){}var at=yP;function TP(t,e){var r=-1,n=t.length;for(e||(e=Array(n));++r<n;)e[r]=t[r];return e}var fx=TP;var vP=800,RP=16,xP=Date.now;function SP(t){var e=0,r=0;return function(){var n=xP(),i=RP-(n-r);if(r=n,i>0){if(++e>=vP)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}var dx=SP;function bP(t){return function(){return t}}var px=bP;var AP=function(){try{var t=Ar(Object,"defineProperty");return t({},"",{}),t}catch{}}(),Es=AP;var CP=Es?function(t,e){return Es(t,"toString",{configurable:!0,enumerable:!1,value:px(e),writable:!0})}:br,mx=CP;var wP=dx(mx),hx=wP;function kP(t,e){for(var r=-1,n=t==null?0:t.length;++r<n&&e(t[r],r,t)!==!1;);return t}var zc=kP;function EP(t,e,r,n){for(var i=t.length,o=r+(n?1:-1);n?o--:++o<i;)if(e(t[o],o,t))return o;return-1}var Vc=EP;function $P(t){return t!==t}var gx=$P;function _P(t,e,r){for(var n=r-1,i=t.length;++n<i;)if(t[n]===e)return n;return-1}var yx=_P;function NP(t,e,r){return e===e?yx(t,e,r):Vc(t,gx,r)}var $s=NP;function IP(t,e){var r=t==null?0:t.length;return!!r&&$s(t,e,0)>-1}var Xc=IP;var PP=9007199254740991,DP=/^(?:0|[1-9]\d*)$/;function OP(t,e){var r=typeof t;return e=e??PP,!!e&&(r=="number"||r!="symbol"&&DP.test(t))&&t>-1&&t%1==0&&t<e}var Pi=OP;function LP(t,e,r){e=="__proto__"&&Es?Es(t,e,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[e]=r}var _s=LP;function MP(t,e){return t===e||t!==t&&e!==e}var In=MP;var FP=Object.prototype,UP=FP.hasOwnProperty;function qP(t,e,r){var n=t[e];(!(UP.call(t,e)&&In(n,r))||r===void 0&&!(e in t))&&_s(t,e,r)}var Di=qP;function GP(t,e,r,n){var i=!r;r||(r={});for(var o=-1,s=e.length;++o<s;){var a=e[o],l=n?n(r[a],t[a],a,r,t):void 0;l===void 0&&(l=t[a]),i?_s(r,a,l):Di(r,a,l)}return r}var Pn=GP;var Tx=Math.max;function jP(t,e,r){return e=Tx(e===void 0?t.length-1:e,0),function(){for(var n=arguments,i=-1,o=Tx(n.length-e,0),s=Array(o);++i<o;)s[i]=n[e+i];i=-1;for(var a=Array(e+1);++i<e;)a[i]=n[i];return a[e]=r(s),cx(t,this,a)}}var vx=jP;function HP(t,e){return hx(vx(t,e,br),t+"")}var Ns=HP;var KP=9007199254740991;function WP(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=KP}var Is=WP;function BP(t){return t!=null&&Is(t.length)&&!hr(t)}var $t=BP;function zP(t,e,r){if(!st(r))return!1;var n=typeof e;return(n=="number"?$t(r)&&Pi(e,r.length):n=="string"&&e in r)?In(r[e],t):!1}var Oi=zP;function VP(t){return Ns(function(e,r){var n=-1,i=r.length,o=i>1?r[i-1]:void 0,s=i>2?r[2]:void 0;for(o=t.length>3&&typeof o=="function"?(i--,o):void 0,s&&Oi(r[0],r[1],s)&&(o=i<3?void 0:o,i=1),e=Object(e);++n<i;){var a=r[n];a&&t(e,a,n,o)}return e})}var Rx=VP;var XP=Object.prototype;function YP(t){var e=t&&t.constructor,r=typeof e=="function"&&e.prototype||XP;return t===r}var Dn=YP;function JP(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}var xx=JP;var QP="[object Arguments]";function ZP(t){return gt(t)&&mr(t)==QP}var Th=ZP;var Sx=Object.prototype,eD=Sx.hasOwnProperty,tD=Sx.propertyIsEnumerable,rD=Th(function(){return arguments}())?Th:function(t){return gt(t)&&eD.call(t,"callee")&&!tD.call(t,"callee")},Li=rD;function nD(){return!1}var bx=nD;var wx=typeof exports=="object"&&exports&&!exports.nodeType&&exports,Ax=wx&&typeof module=="object"&&module&&!module.nodeType&&module,iD=Ax&&Ax.exports===wx,Cx=iD?Et.Buffer:void 0,oD=Cx?Cx.isBuffer:void 0,sD=oD||bx,li=sD;var aD="[object Arguments]",lD="[object Array]",uD="[object Boolean]",cD="[object Date]",fD="[object Error]",dD="[object Function]",pD="[object Map]",mD="[object Number]",hD="[object Object]",gD="[object RegExp]",yD="[object Set]",TD="[object String]",vD="[object WeakMap]",RD="[object ArrayBuffer]",xD="[object DataView]",SD="[object Float32Array]",bD="[object Float64Array]",AD="[object Int8Array]",CD="[object Int16Array]",wD="[object Int32Array]",kD="[object Uint8Array]",ED="[object Uint8ClampedArray]",$D="[object Uint16Array]",_D="[object Uint32Array]",Ye={};Ye[SD]=Ye[bD]=Ye[AD]=Ye[CD]=Ye[wD]=Ye[kD]=Ye[ED]=Ye[$D]=Ye[_D]=!0;Ye[aD]=Ye[lD]=Ye[RD]=Ye[uD]=Ye[xD]=Ye[cD]=Ye[fD]=Ye[dD]=Ye[pD]=Ye[mD]=Ye[hD]=Ye[gD]=Ye[yD]=Ye[TD]=Ye[vD]=!1;function ND(t){return gt(t)&&Is(t.length)&&!!Ye[mr(t)]}var kx=ND;function ID(t){return function(e){return t(e)}}var On=ID;var Ex=typeof exports=="object"&&exports&&!exports.nodeType&&exports,pl=Ex&&typeof module=="object"&&module&&!module.nodeType&&module,PD=pl&&pl.exports===Ex,vh=PD&&Kc.process,DD=function(){try{var t=pl&&pl.require&&pl.require("util").types;return t||vh&&vh.binding&&vh.binding("util")}catch{}}(),Jr=DD;var $x=Jr&&Jr.isTypedArray,OD=$x?On($x):kx,Ps=OD;var LD=Object.prototype,MD=LD.hasOwnProperty;function FD(t,e){var r=z(t),n=!r&&Li(t),i=!r&&!n&&li(t),o=!r&&!n&&!i&&Ps(t),s=r||n||i||o,a=s?xx(t.length,String):[],l=a.length;for(var u in t)(e||MD.call(t,u))&&!(s&&(u=="length"||i&&(u=="offset"||u=="parent")||o&&(u=="buffer"||u=="byteLength"||u=="byteOffset")||Pi(u,l)))&&a.push(u);return a}var Yc=FD;function UD(t,e){return function(r){return t(e(r))}}var Jc=UD;var qD=Jc(Object.keys,Object),_x=qD;var GD=Object.prototype,jD=GD.hasOwnProperty;function HD(t){if(!Dn(t))return _x(t);var e=[];for(var r in Object(t))jD.call(t,r)&&r!="constructor"&&e.push(r);return e}var Qc=HD;function KD(t){return $t(t)?Yc(t):Qc(t)}var He=KD;var WD=Object.prototype,BD=WD.hasOwnProperty,zD=Rx(function(t,e){if(Dn(e)||$t(e)){Pn(e,He(e),t);return}for(var r in e)BD.call(e,r)&&Di(t,r,e[r])}),Jt=zD;function VD(t){var e=[];if(t!=null)for(var r in Object(t))e.push(r);return e}var Nx=VD;var XD=Object.prototype,YD=XD.hasOwnProperty;function JD(t){if(!st(t))return Nx(t);var e=Dn(t),r=[];for(var n in t)n=="constructor"&&(e||!YD.call(t,n))||r.push(n);return r}var Ix=JD;function QD(t){return $t(t)?Yc(t,!0):Ix(t)}var Mi=QD;var ZD=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,eO=/^\w*$/;function tO(t,e){if(z(t))return!1;var r=typeof t;return r=="number"||r=="symbol"||r=="boolean"||t==null||$n(t)?!0:eO.test(t)||!ZD.test(t)||e!=null&&t in Object(e)}var Ds=tO;var rO=Ar(Object,"create"),ui=rO;function nO(){this.__data__=ui?ui(null):{},this.size=0}var Px=nO;function iO(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}var Dx=iO;var oO="__lodash_hash_undefined__",sO=Object.prototype,aO=sO.hasOwnProperty;function lO(t){var e=this.__data__;if(ui){var r=e[t];return r===oO?void 0:r}return aO.call(e,t)?e[t]:void 0}var Ox=lO;var uO=Object.prototype,cO=uO.hasOwnProperty;function fO(t){var e=this.__data__;return ui?e[t]!==void 0:cO.call(e,t)}var Lx=fO;var dO="__lodash_hash_undefined__";function pO(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=ui&&e===void 0?dO:e,this}var Mx=pO;function Os(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Os.prototype.clear=Px;Os.prototype.delete=Dx;Os.prototype.get=Ox;Os.prototype.has=Lx;Os.prototype.set=Mx;var Rh=Os;function mO(){this.__data__=[],this.size=0}var Fx=mO;function hO(t,e){for(var r=t.length;r--;)if(In(t[r][0],e))return r;return-1}var Fi=hO;var gO=Array.prototype,yO=gO.splice;function TO(t){var e=this.__data__,r=Fi(e,t);if(r<0)return!1;var n=e.length-1;return r==n?e.pop():yO.call(e,r,1),--this.size,!0}var Ux=TO;function vO(t){var e=this.__data__,r=Fi(e,t);return r<0?void 0:e[r][1]}var qx=vO;function RO(t){return Fi(this.__data__,t)>-1}var Gx=RO;function xO(t,e){var r=this.__data__,n=Fi(r,t);return n<0?(++this.size,r.push([t,e])):r[n][1]=e,this}var jx=xO;function Ls(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Ls.prototype.clear=Fx;Ls.prototype.delete=Ux;Ls.prototype.get=qx;Ls.prototype.has=Gx;Ls.prototype.set=jx;var Ui=Ls;var SO=Ar(Et,"Map"),qi=SO;function bO(){this.size=0,this.__data__={hash:new Rh,map:new(qi||Ui),string:new Rh}}var Hx=bO;function AO(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null}var Kx=AO;function CO(t,e){var r=t.__data__;return Kx(e)?r[typeof e=="string"?"string":"hash"]:r.map}var Gi=CO;function wO(t){var e=Gi(this,t).delete(t);return this.size-=e?1:0,e}var Wx=wO;function kO(t){return Gi(this,t).get(t)}var Bx=kO;function EO(t){return Gi(this,t).has(t)}var zx=EO;function $O(t,e){var r=Gi(this,t),n=r.size;return r.set(t,e),this.size+=r.size==n?0:1,this}var Vx=$O;function Ms(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Ms.prototype.clear=Hx;Ms.prototype.delete=Wx;Ms.prototype.get=Bx;Ms.prototype.has=zx;Ms.prototype.set=Vx;var bo=Ms;var _O="Expected a function";function xh(t,e){if(typeof t!="function"||e!=null&&typeof e!="function")throw new TypeError(_O);var r=function(){var n=arguments,i=e?e.apply(this,n):n[0],o=r.cache;if(o.has(i))return o.get(i);var s=t.apply(this,n);return r.cache=o.set(i,s)||o,s};return r.cache=new(xh.Cache||bo),r}xh.Cache=bo;var Xx=xh;var NO=500;function IO(t){var e=Xx(t,function(n){return r.size===NO&&r.clear(),n}),r=e.cache;return e}var Yx=IO;var PO=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,DO=/\\(\\)?/g,OO=Yx(function(t){var e=[];return t.charCodeAt(0)===46&&e.push(""),t.replace(PO,function(r,n,i,o){e.push(i?o.replace(DO,"$1"):n||r)}),e}),Jx=OO;function LO(t){return t==null?"":JR(t)}var Qx=LO;function MO(t,e){return z(t)?t:Ds(t,e)?[t]:Jx(Qx(t))}var ji=MO;var FO=1/0;function UO(t){if(typeof t=="string"||$n(t))return t;var e=t+"";return e=="0"&&1/t==-FO?"-0":e}var Ln=UO;function qO(t,e){e=ji(e,t);for(var r=0,n=e.length;t!=null&&r<n;)t=t[Ln(e[r++])];return r&&r==n?t:void 0}var Fs=qO;function GO(t,e,r){var n=t==null?void 0:Fs(t,e);return n===void 0?r:n}var Zx=GO;function jO(t,e){for(var r=-1,n=e.length,i=t.length;++r<n;)t[i+r]=e[r];return t}var Us=jO;var eS=Ft?Ft.isConcatSpreadable:void 0;function HO(t){return z(t)||Li(t)||!!(eS&&t&&t[eS])}var tS=HO;function rS(t,e,r,n,i){var o=-1,s=t.length;for(r||(r=tS),i||(i=[]);++o<s;){var a=t[o];e>0&&r(a)?e>1?rS(a,e-1,r,n,i):Us(i,a):n||(i[i.length]=a)}return i}var qs=rS;function KO(t){var e=t==null?0:t.length;return e?qs(t,1):[]}var yt=KO;var WO=Jc(Object.getPrototypeOf,Object),Zc=WO;function BO(t,e,r){var n=-1,i=t.length;e<0&&(e=-e>i?0:i+e),r=r>i?i:r,r<0&&(r+=i),i=e>r?0:r-e>>>0,e>>>=0;for(var o=Array(i);++n<i;)o[n]=t[n+e];return o}var ef=BO;function zO(t,e,r,n){var i=-1,o=t==null?0:t.length;for(n&&o&&(r=t[++i]);++i<o;)r=e(r,t[i],i,t);return r}var nS=zO;function VO(){this.__data__=new Ui,this.size=0}var iS=VO;function XO(t){var e=this.__data__,r=e.delete(t);return this.size=e.size,r}var oS=XO;function YO(t){return this.__data__.get(t)}var sS=YO;function JO(t){return this.__data__.has(t)}var aS=JO;var QO=200;function ZO(t,e){var r=this.__data__;if(r instanceof Ui){var n=r.__data__;if(!qi||n.length<QO-1)return n.push([t,e]),this.size=++r.size,this;r=this.__data__=new bo(n)}return r.set(t,e),this.size=r.size,this}var lS=ZO;function Gs(t){var e=this.__data__=new Ui(t);this.size=e.size}Gs.prototype.clear=iS;Gs.prototype.delete=oS;Gs.prototype.get=sS;Gs.prototype.has=aS;Gs.prototype.set=lS;var Hi=Gs;function e0(t,e){return t&&Pn(e,He(e),t)}var uS=e0;function t0(t,e){return t&&Pn(e,Mi(e),t)}var cS=t0;var mS=typeof exports=="object"&&exports&&!exports.nodeType&&exports,fS=mS&&typeof module=="object"&&module&&!module.nodeType&&module,r0=fS&&fS.exports===mS,dS=r0?Et.Buffer:void 0,pS=dS?dS.allocUnsafe:void 0;function n0(t,e){if(e)return t.slice();var r=t.length,n=pS?pS(r):new t.constructor(r);return t.copy(n),n}var hS=n0;function i0(t,e){for(var r=-1,n=t==null?0:t.length,i=0,o=[];++r<n;){var s=t[r];e(s,r,t)&&(o[i++]=s)}return o}var js=i0;function o0(){return[]}var tf=o0;var s0=Object.prototype,a0=s0.propertyIsEnumerable,gS=Object.getOwnPropertySymbols,l0=gS?function(t){return t==null?[]:(t=Object(t),js(gS(t),function(e){return a0.call(t,e)}))}:tf,Hs=l0;function u0(t,e){return Pn(t,Hs(t),e)}var yS=u0;var c0=Object.getOwnPropertySymbols,f0=c0?function(t){for(var e=[];t;)Us(e,Hs(t)),t=Zc(t);return e}:tf,rf=f0;function d0(t,e){return Pn(t,rf(t),e)}var TS=d0;function p0(t,e,r){var n=e(t);return z(t)?n:Us(n,r(t))}var nf=p0;function m0(t){return nf(t,He,Hs)}var ml=m0;function h0(t){return nf(t,Mi,rf)}var of=h0;var g0=Ar(Et,"DataView"),sf=g0;var y0=Ar(Et,"Promise"),af=y0;var T0=Ar(Et,"Set"),Ki=T0;var vS="[object Map]",v0="[object Object]",RS="[object Promise]",xS="[object Set]",SS="[object WeakMap]",bS="[object DataView]",R0=ai(sf),x0=ai(qi),S0=ai(af),b0=ai(Ki),A0=ai(Bc),Ao=mr;(sf&&Ao(new sf(new ArrayBuffer(1)))!=bS||qi&&Ao(new qi)!=vS||af&&Ao(af.resolve())!=RS||Ki&&Ao(new Ki)!=xS||Bc&&Ao(new Bc)!=SS)&&(Ao=function(t){var e=mr(t),r=e==v0?t.constructor:void 0,n=r?ai(r):"";if(n)switch(n){case R0:return bS;case x0:return vS;case S0:return RS;case b0:return xS;case A0:return SS}return e});var gn=Ao;var C0=Object.prototype,w0=C0.hasOwnProperty;function k0(t){var e=t.length,r=new t.constructor(e);return e&&typeof t[0]=="string"&&w0.call(t,"index")&&(r.index=t.index,r.input=t.input),r}var AS=k0;var E0=Et.Uint8Array,Ks=E0;function $0(t){var e=new t.constructor(t.byteLength);return new Ks(e).set(new Ks(t)),e}var Ws=$0;function _0(t,e){var r=e?Ws(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}var CS=_0;var N0=/\w*$/;function I0(t){var e=new t.constructor(t.source,N0.exec(t));return e.lastIndex=t.lastIndex,e}var wS=I0;var kS=Ft?Ft.prototype:void 0,ES=kS?kS.valueOf:void 0;function P0(t){return ES?Object(ES.call(t)):{}}var $S=P0;function D0(t,e){var r=e?Ws(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}var _S=D0;var O0="[object Boolean]",L0="[object Date]",M0="[object Map]",F0="[object Number]",U0="[object RegExp]",q0="[object Set]",G0="[object String]",j0="[object Symbol]",H0="[object ArrayBuffer]",K0="[object DataView]",W0="[object Float32Array]",B0="[object Float64Array]",z0="[object Int8Array]",V0="[object Int16Array]",X0="[object Int32Array]",Y0="[object Uint8Array]",J0="[object Uint8ClampedArray]",Q0="[object Uint16Array]",Z0="[object Uint32Array]";function eL(t,e,r){var n=t.constructor;switch(e){case H0:return Ws(t);case O0:case L0:return new n(+t);case K0:return CS(t,r);case W0:case B0:case z0:case V0:case X0:case Y0:case J0:case Q0:case Z0:return _S(t,r);case M0:return new n;case F0:case G0:return new n(t);case U0:return wS(t);case q0:return new n;case j0:return $S(t)}}var NS=eL;function tL(t){return typeof t.constructor=="function"&&!Dn(t)?ux(Zc(t)):{}}var IS=tL;var rL="[object Map]";function nL(t){return gt(t)&&gn(t)==rL}var PS=nL;var DS=Jr&&Jr.isMap,iL=DS?On(DS):PS,OS=iL;var oL="[object Set]";function sL(t){return gt(t)&&gn(t)==oL}var LS=sL;var MS=Jr&&Jr.isSet,aL=MS?On(MS):LS,FS=aL;var lL=1,uL=2,cL=4,US="[object Arguments]",fL="[object Array]",dL="[object Boolean]",pL="[object Date]",mL="[object Error]",qS="[object Function]",hL="[object GeneratorFunction]",gL="[object Map]",yL="[object Number]",GS="[object Object]",TL="[object RegExp]",vL="[object Set]",RL="[object String]",xL="[object Symbol]",SL="[object WeakMap]",bL="[object ArrayBuffer]",AL="[object DataView]",CL="[object Float32Array]",wL="[object Float64Array]",kL="[object Int8Array]",EL="[object Int16Array]",$L="[object Int32Array]",_L="[object Uint8Array]",NL="[object Uint8ClampedArray]",IL="[object Uint16Array]",PL="[object Uint32Array]",Ke={};Ke[US]=Ke[fL]=Ke[bL]=Ke[AL]=Ke[dL]=Ke[pL]=Ke[CL]=Ke[wL]=Ke[kL]=Ke[EL]=Ke[$L]=Ke[gL]=Ke[yL]=Ke[GS]=Ke[TL]=Ke[vL]=Ke[RL]=Ke[xL]=Ke[_L]=Ke[NL]=Ke[IL]=Ke[PL]=!0;Ke[mL]=Ke[qS]=Ke[SL]=!1;function lf(t,e,r,n,i,o){var s,a=e&lL,l=e&uL,u=e&cL;if(r&&(s=i?r(t,n,i,o):r(t)),s!==void 0)return s;if(!st(t))return t;var c=z(t);if(c){if(s=AS(t),!a)return fx(t,s)}else{var f=gn(t),m=f==qS||f==hL;if(li(t))return hS(t,a);if(f==GS||f==US||m&&!i){if(s=l||m?{}:IS(t),!a)return l?TS(t,cS(s,t)):yS(t,uS(s,t))}else{if(!Ke[f])return i?t:{};s=NS(t,f,a)}}o||(o=new Hi);var T=o.get(t);if(T)return T;o.set(t,s),FS(t)?t.forEach(function(_){s.add(lf(_,e,r,_,t,o))}):OS(t)&&t.forEach(function(_,w){s.set(w,lf(_,e,r,w,t,o))});var b=u?l?of:ml:l?Mi:He,C=c?void 0:b(t);return zc(C||t,function(_,w){C&&(w=_,_=t[w]),Di(s,w,lf(_,e,r,w,t,o))}),s}var jS=lf;var DL=4;function OL(t){return jS(t,DL)}var We=OL;function LL(t){for(var e=-1,r=t==null?0:t.length,n=0,i=[];++e<r;){var o=t[e];o&&(i[n++]=o)}return i}var Mn=LL;var ML="__lodash_hash_undefined__";function FL(t){return this.__data__.set(t,ML),this}var HS=FL;function UL(t){return this.__data__.has(t)}var KS=UL;function uf(t){var e=-1,r=t==null?0:t.length;for(this.__data__=new bo;++e<r;)this.add(t[e])}uf.prototype.add=uf.prototype.push=HS;uf.prototype.has=KS;var Bs=uf;function qL(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(e(t[r],r,t))return!0;return!1}var cf=qL;function GL(t,e){return t.has(e)}var zs=GL;var jL=1,HL=2;function KL(t,e,r,n,i,o){var s=r&jL,a=t.length,l=e.length;if(a!=l&&!(s&&l>a))return!1;var u=o.get(t),c=o.get(e);if(u&&c)return u==e&&c==t;var f=-1,m=!0,T=r&HL?new Bs:void 0;for(o.set(t,e),o.set(e,t);++f<a;){var b=t[f],C=e[f];if(n)var _=s?n(C,b,f,e,t,o):n(b,C,f,t,e,o);if(_!==void 0){if(_)continue;m=!1;break}if(T){if(!cf(e,function(w,v){if(!zs(T,v)&&(b===w||i(b,w,r,n,o)))return T.push(v)})){m=!1;break}}else if(!(b===C||i(b,C,r,n,o))){m=!1;break}}return o.delete(t),o.delete(e),m}var ff=KL;function WL(t){var e=-1,r=Array(t.size);return t.forEach(function(n,i){r[++e]=[i,n]}),r}var WS=WL;function BL(t){var e=-1,r=Array(t.size);return t.forEach(function(n){r[++e]=n}),r}var Vs=BL;var zL=1,VL=2,XL="[object Boolean]",YL="[object Date]",JL="[object Error]",QL="[object Map]",ZL="[object Number]",eM="[object RegExp]",tM="[object Set]",rM="[object String]",nM="[object Symbol]",iM="[object ArrayBuffer]",oM="[object DataView]",BS=Ft?Ft.prototype:void 0,Sh=BS?BS.valueOf:void 0;function sM(t,e,r,n,i,o,s){switch(r){case oM:if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case iM:return!(t.byteLength!=e.byteLength||!o(new Ks(t),new Ks(e)));case XL:case YL:case ZL:return In(+t,+e);case JL:return t.name==e.name&&t.message==e.message;case eM:case rM:return t==e+"";case QL:var a=WS;case tM:var l=n&zL;if(a||(a=Vs),t.size!=e.size&&!l)return!1;var u=s.get(t);if(u)return u==e;n|=VL,s.set(t,e);var c=ff(a(t),a(e),n,i,o,s);return s.delete(t),c;case nM:if(Sh)return Sh.call(t)==Sh.call(e)}return!1}var zS=sM;var aM=1,lM=Object.prototype,uM=lM.hasOwnProperty;function cM(t,e,r,n,i,o){var s=r&aM,a=ml(t),l=a.length,u=ml(e),c=u.length;if(l!=c&&!s)return!1;for(var f=l;f--;){var m=a[f];if(!(s?m in e:uM.call(e,m)))return!1}var T=o.get(t),b=o.get(e);if(T&&b)return T==e&&b==t;var C=!0;o.set(t,e),o.set(e,t);for(var _=s;++f<l;){m=a[f];var w=t[m],v=e[m];if(n)var y=s?n(v,w,m,e,t,o):n(w,v,m,t,e,o);if(!(y===void 0?w===v||i(w,v,r,n,o):y)){C=!1;break}_||(_=m=="constructor")}if(C&&!_){var $=t.constructor,D=e.constructor;$!=D&&"constructor"in t&&"constructor"in e&&!(typeof $=="function"&&$ instanceof $&&typeof D=="function"&&D instanceof D)&&(C=!1)}return o.delete(t),o.delete(e),C}var VS=cM;var fM=1,XS="[object Arguments]",YS="[object Array]",df="[object Object]",dM=Object.prototype,JS=dM.hasOwnProperty;function pM(t,e,r,n,i,o){var s=z(t),a=z(e),l=s?YS:gn(t),u=a?YS:gn(e);l=l==XS?df:l,u=u==XS?df:u;var c=l==df,f=u==df,m=l==u;if(m&&li(t)){if(!li(e))return!1;s=!0,c=!1}if(m&&!c)return o||(o=new Hi),s||Ps(t)?ff(t,e,r,n,i,o):zS(t,e,l,r,n,i,o);if(!(r&fM)){var T=c&&JS.call(t,"__wrapped__"),b=f&&JS.call(e,"__wrapped__");if(T||b){var C=T?t.value():t,_=b?e.value():e;return o||(o=new Hi),i(C,_,r,n,o)}}return m?(o||(o=new Hi),VS(t,e,r,n,i,o)):!1}var QS=pM;function ZS(t,e,r,n,i){return t===e?!0:t==null||e==null||!gt(t)&&!gt(e)?t!==t&&e!==e:QS(t,e,r,n,ZS,i)}var pf=ZS;var mM=1,hM=2;function gM(t,e,r,n){var i=r.length,o=i,s=!n;if(t==null)return!o;for(t=Object(t);i--;){var a=r[i];if(s&&a[2]?a[1]!==t[a[0]]:!(a[0]in t))return!1}for(;++i<o;){a=r[i];var l=a[0],u=t[l],c=a[1];if(s&&a[2]){if(u===void 0&&!(l in t))return!1}else{var f=new Hi;if(n)var m=n(u,c,l,t,e,f);if(!(m===void 0?pf(c,u,mM|hM,n,f):m))return!1}}return!0}var eb=gM;function yM(t){return t===t&&!st(t)}var mf=yM;function TM(t){for(var e=He(t),r=e.length;r--;){var n=e[r],i=t[n];e[r]=[n,i,mf(i)]}return e}var tb=TM;function vM(t,e){return function(r){return r==null?!1:r[t]===e&&(e!==void 0||t in Object(r))}}var hf=vM;function RM(t){var e=tb(t);return e.length==1&&e[0][2]?hf(e[0][0],e[0][1]):function(r){return r===t||eb(r,t,e)}}var rb=RM;function xM(t,e){return t!=null&&e in Object(t)}var nb=xM;function SM(t,e,r){e=ji(e,t);for(var n=-1,i=e.length,o=!1;++n<i;){var s=Ln(e[n]);if(!(o=t!=null&&r(t,s)))break;t=t[s]}return o||++n!=i?o:(i=t==null?0:t.length,!!i&&Is(i)&&Pi(s,i)&&(z(t)||Li(t)))}var gf=SM;function bM(t,e){return t!=null&&gf(t,e,nb)}var ib=bM;var AM=1,CM=2;function wM(t,e){return Ds(t)&&mf(e)?hf(Ln(t),e):function(r){var n=Zx(r,t);return n===void 0&&n===e?ib(r,t):pf(e,n,AM|CM)}}var ob=wM;function kM(t){return function(e){return e?.[t]}}var sb=kM;function EM(t){return function(e){return Fs(e,t)}}var ab=EM;function $M(t){return Ds(t)?sb(Ln(t)):ab(t)}var lb=$M;function _M(t){return typeof t=="function"?t:t==null?br:typeof t=="object"?z(t)?ob(t[0],t[1]):rb(t):lb(t)}var pt=_M;function NM(t,e,r,n){for(var i=-1,o=t==null?0:t.length;++i<o;){var s=t[i];e(n,s,r(s),t)}return n}var ub=NM;function IM(t){return function(e,r,n){for(var i=-1,o=Object(e),s=n(e),a=s.length;a--;){var l=s[t?a:++i];if(r(o[l],l,o)===!1)break}return e}}var cb=IM;var PM=cb(),fb=PM;function DM(t,e){return t&&fb(t,e,He)}var db=DM;function OM(t,e){return function(r,n){if(r==null)return r;if(!$t(r))return t(r,n);for(var i=r.length,o=e?i:-1,s=Object(r);(e?o--:++o<i)&&n(s[o],o,s)!==!1;);return r}}var pb=OM;var LM=pb(db),Cr=LM;function MM(t,e,r,n){return Cr(t,function(i,o,s){e(n,i,r(i),s)}),n}var mb=MM;function FM(t,e){return function(r,n){var i=z(r)?ub:mb,o=e?e():{};return i(r,t,pt(n,2),o)}}var hb=FM;var gb=Object.prototype,UM=gb.hasOwnProperty,qM=Ns(function(t,e){t=Object(t);var r=-1,n=e.length,i=n>2?e[2]:void 0;for(i&&Oi(e[0],e[1],i)&&(n=1);++r<n;)for(var o=e[r],s=Mi(o),a=-1,l=s.length;++a<l;){var u=s[a],c=t[u];(c===void 0||In(c,gb[u])&&!UM.call(t,u))&&(t[u]=o[u])}return t}),Xs=qM;function GM(t){return gt(t)&&$t(t)}var bh=GM;function jM(t,e,r){for(var n=-1,i=t==null?0:t.length;++n<i;)if(r(e,t[n]))return!0;return!1}var yf=jM;var HM=200;function KM(t,e,r,n){var i=-1,o=Xc,s=!0,a=t.length,l=[],u=e.length;if(!a)return l;r&&(e=_n(e,On(r))),n?(o=yf,s=!1):e.length>=HM&&(o=zs,s=!1,e=new Bs(e));e:for(;++i<a;){var c=t[i],f=r==null?c:r(c);if(c=n||c!==0?c:0,s&&f===f){for(var m=u;m--;)if(e[m]===f)continue e;l.push(c)}else o(e,f,n)||l.push(c)}return l}var yb=KM;var WM=Ns(function(t,e){return bh(t)?yb(t,qs(e,1,bh,!0)):[]}),Wi=WM;function BM(t){var e=t==null?0:t.length;return e?t[e-1]:void 0}var Fn=BM;function zM(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:Nn(e),ef(t,e<0?0:e,n)):[]}var Tt=zM;function VM(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:Nn(e),e=n-e,ef(t,0,e<0?0:e)):[]}var ci=VM;function XM(t){return typeof t=="function"?t:br}var Tb=XM;function YM(t,e){var r=z(t)?zc:Cr;return r(t,Tb(e))}var G=YM;function JM(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(!e(t[r],r,t))return!1;return!0}var vb=JM;function QM(t,e){var r=!0;return Cr(t,function(n,i,o){return r=!!e(n,i,o),r}),r}var Rb=QM;function ZM(t,e,r){var n=z(t)?vb:Rb;return r&&Oi(t,e,r)&&(e=void 0),n(t,pt(e,3))}var ar=ZM;function eF(t,e){var r=[];return Cr(t,function(n,i,o){e(n,i,o)&&r.push(n)}),r}var Tf=eF;function tF(t,e){var r=z(t)?js:Tf;return r(t,pt(e,3))}var Ut=tF;function rF(t){return function(e,r,n){var i=Object(e);if(!$t(e)){var o=pt(r,3);e=He(e),r=function(a){return o(i[a],a,i)}}var s=t(e,r,n);return s>-1?i[o?e[s]:s]:void 0}}var xb=rF;var nF=Math.max;function iF(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:Nn(r);return i<0&&(i=nF(n+i,0)),Vc(t,pt(e,3),i)}var Sb=iF;var oF=xb(Sb),Un=oF;function sF(t){return t&&t.length?t[0]:void 0}var qt=sF;function aF(t,e){var r=-1,n=$t(t)?Array(t.length):[];return Cr(t,function(i,o,s){n[++r]=e(i,o,s)}),n}var bb=aF;function lF(t,e){var r=z(t)?_n:bb;return r(t,pt(e,3))}var L=lF;function uF(t,e){return qs(L(t,e),1)}var Qt=uF;var cF=Object.prototype,fF=cF.hasOwnProperty,dF=hb(function(t,e,r){fF.call(t,r)?t[r].push(e):_s(t,r,[e])}),Ah=dF;var pF=Object.prototype,mF=pF.hasOwnProperty;function hF(t,e){return t!=null&&mF.call(t,e)}var Ab=hF;function gF(t,e){return t!=null&&gf(t,e,Ab)}var W=gF;var yF="[object String]";function TF(t){return typeof t=="string"||!z(t)&&gt(t)&&mr(t)==yF}var Dt=TF;function vF(t,e){return _n(e,function(r){return t[r]})}var Cb=vF;function RF(t){return t==null?[]:Cb(t,He(t))}var Pe=RF;var xF=Math.max;function SF(t,e,r,n){t=$t(t)?t:Pe(t),r=r&&!n?Nn(r):0;var i=t.length;return r<0&&(r=xF(i+r,0)),Dt(t)?r<=i&&t.indexOf(e,r)>-1:!!i&&$s(t,e,r)>-1}var et=SF;var bF=Math.max;function AF(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:Nn(r);return i<0&&(i=bF(n+i,0)),$s(t,e,i)}var vf=AF;var CF="[object Map]",wF="[object Set]",kF=Object.prototype,EF=kF.hasOwnProperty;function $F(t){if(t==null)return!0;if($t(t)&&(z(t)||typeof t=="string"||typeof t.splice=="function"||li(t)||Ps(t)||Li(t)))return!t.length;var e=gn(t);if(e==CF||e==wF)return!t.size;if(Dn(t))return!Qc(t).length;for(var r in t)if(EF.call(t,r))return!1;return!0}var se=$F;var _F="[object RegExp]";function NF(t){return gt(t)&&mr(t)==_F}var wb=NF;var kb=Jr&&Jr.isRegExp,IF=kb?On(kb):wb,Qr=IF;function PF(t){return t===void 0}var lr=PF;function DF(t,e){return t<e}var Eb=DF;function OF(t,e,r){for(var n=-1,i=t.length;++n<i;){var o=t[n],s=e(o);if(s!=null&&(a===void 0?s===s&&!$n(s):r(s,a)))var a=s,l=o}return l}var $b=OF;function LF(t){return t&&t.length?$b(t,br,Eb):void 0}var _b=LF;var MF="Expected a function";function FF(t){if(typeof t!="function")throw new TypeError(MF);return function(){var e=arguments;switch(e.length){case 0:return!t.call(this);case 1:return!t.call(this,e[0]);case 2:return!t.call(this,e[0],e[1]);case 3:return!t.call(this,e[0],e[1],e[2])}return!t.apply(this,e)}}var Nb=FF;function UF(t,e,r,n){if(!st(t))return t;e=ji(e,t);for(var i=-1,o=e.length,s=o-1,a=t;a!=null&&++i<o;){var l=Ln(e[i]),u=r;if(l==="__proto__"||l==="constructor"||l==="prototype")return t;if(i!=s){var c=a[l];u=n?n(c,l,a):void 0,u===void 0&&(u=st(c)?c:Pi(e[i+1])?[]:{})}Di(a,l,u),a=a[l]}return t}var Ib=UF;function qF(t,e,r){for(var n=-1,i=e.length,o={};++n<i;){var s=e[n],a=Fs(t,s);r(a,s)&&Ib(o,ji(s,t),a)}return o}var Pb=qF;function GF(t,e){if(t==null)return{};var r=_n(of(t),function(n){return[n]});return e=pt(e),Pb(t,r,function(n,i){return e(n,i[0])})}var wr=GF;function jF(t,e,r,n,i){return i(t,function(o,s,a){r=n?(n=!1,o):e(r,o,s,a)}),r}var Db=jF;function HF(t,e,r){var n=z(t)?nS:Db,i=arguments.length<3;return n(t,pt(e,4),r,i,Cr)}var lt=HF;function KF(t,e){var r=z(t)?js:Tf;return r(t,Nb(pt(e,3)))}var Bi=KF;function WF(t,e){var r;return Cr(t,function(n,i,o){return r=e(n,i,o),!r}),!!r}var Ob=WF;function BF(t,e,r){var n=z(t)?cf:Ob;return r&&Oi(t,e,r)&&(e=void 0),n(t,pt(e,3))}var hl=BF;var zF=1/0,VF=Ki&&1/Vs(new Ki([,-0]))[1]==zF?function(t){return new Ki(t)}:at,Lb=VF;var XF=200;function YF(t,e,r){var n=-1,i=Xc,o=t.length,s=!0,a=[],l=a;if(r)s=!1,i=yf;else if(o>=XF){var u=e?null:Lb(t);if(u)return Vs(u);s=!1,i=zs,l=new Bs}else l=e?[]:a;e:for(;++n<o;){var c=t[n],f=e?e(c):c;if(c=r||c!==0?c:0,s&&f===f){for(var m=l.length;m--;)if(l[m]===f)continue e;e&&l.push(f),a.push(c)}else i(l,f,r)||(l!==a&&l.push(f),a.push(c))}return a}var Rf=YF;function JF(t){return t&&t.length?Rf(t):[]}var Ys=JF;function QF(t,e){return t&&t.length?Rf(t,pt(e,2)):[]}var Mb=QF;function Js(t){console&&console.error&&console.error(`Error: ${t}`)}function gl(t){console&&console.warn&&console.warn(`Warning: ${t}`)}function yl(t){let e=new Date().getTime(),r=t();return{time:new Date().getTime()-e,value:r}}function Tl(t){function e(){}e.prototype=t;let r=new e;function n(){return typeof r.bar}return n(),n(),t;(0,eval)(t)}function ZF(t){return e1(t)?t.LABEL:t.name}function e1(t){return Dt(t.LABEL)&&t.LABEL!==""}var Ur=class{get definition(){return this._definition}set definition(e){this._definition=e}constructor(e){this._definition=e}accept(e){e.visit(this),G(this.definition,r=>{r.accept(e)})}},we=class extends Ur{constructor(e){super([]),this.idx=1,Jt(this,wr(e,r=>r!==void 0))}set definition(e){}get definition(){return this.referencedRule!==void 0?this.referencedRule.definition:[]}accept(e){e.visit(this)}},gr=class extends Ur{constructor(e){super(e.definition),this.orgText="",Jt(this,wr(e,r=>r!==void 0))}},Be=class extends Ur{constructor(e){super(e.definition),this.ignoreAmbiguities=!1,Jt(this,wr(e,r=>r!==void 0))}},ke=class extends Ur{constructor(e){super(e.definition),this.idx=1,Jt(this,wr(e,r=>r!==void 0))}},ze=class extends Ur{constructor(e){super(e.definition),this.idx=1,Jt(this,wr(e,r=>r!==void 0))}},Ve=class extends Ur{constructor(e){super(e.definition),this.idx=1,Jt(this,wr(e,r=>r!==void 0))}},pe=class extends Ur{constructor(e){super(e.definition),this.idx=1,Jt(this,wr(e,r=>r!==void 0))}},Me=class extends Ur{constructor(e){super(e.definition),this.idx=1,Jt(this,wr(e,r=>r!==void 0))}},Fe=class extends Ur{get definition(){return this._definition}set definition(e){this._definition=e}constructor(e){super(e.definition),this.idx=1,this.ignoreAmbiguities=!1,this.hasPredicates=!1,Jt(this,wr(e,r=>r!==void 0))}},ae=class{constructor(e){this.idx=1,Jt(this,wr(e,r=>r!==void 0))}accept(e){e.visit(this)}};function xf(t){return L(t,Qs)}function Qs(t){function e(r){return L(r,Qs)}if(t instanceof we){let r={type:"NonTerminal",name:t.nonTerminalName,idx:t.idx};return Dt(t.label)&&(r.label=t.label),r}else{if(t instanceof Be)return{type:"Alternative",definition:e(t.definition)};if(t instanceof ke)return{type:"Option",idx:t.idx,definition:e(t.definition)};if(t instanceof ze)return{type:"RepetitionMandatory",idx:t.idx,definition:e(t.definition)};if(t instanceof Ve)return{type:"RepetitionMandatoryWithSeparator",idx:t.idx,separator:Qs(new ae({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof Me)return{type:"RepetitionWithSeparator",idx:t.idx,separator:Qs(new ae({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof pe)return{type:"Repetition",idx:t.idx,definition:e(t.definition)};if(t instanceof Fe)return{type:"Alternation",idx:t.idx,definition:e(t.definition)};if(t instanceof ae){let r={type:"Terminal",name:t.terminalType.name,label:ZF(t.terminalType),idx:t.idx};Dt(t.label)&&(r.terminalLabel=t.label);let n=t.terminalType.PATTERN;return t.terminalType.PATTERN&&(r.pattern=Qr(n)?n.source:n),r}else{if(t instanceof gr)return{type:"Rule",name:t.name,orgText:t.orgText,definition:e(t.definition)};throw Error("non exhaustive match")}}}var yr=class{visit(e){let r=e;switch(r.constructor){case we:return this.visitNonTerminal(r);case Be:return this.visitAlternative(r);case ke:return this.visitOption(r);case ze:return this.visitRepetitionMandatory(r);case Ve:return this.visitRepetitionMandatoryWithSeparator(r);case Me:return this.visitRepetitionWithSeparator(r);case pe:return this.visitRepetition(r);case Fe:return this.visitAlternation(r);case ae:return this.visitTerminal(r);case gr:return this.visitRule(r);default:throw Error("non exhaustive match")}}visitNonTerminal(e){}visitAlternative(e){}visitOption(e){}visitRepetition(e){}visitRepetitionMandatory(e){}visitRepetitionMandatoryWithSeparator(e){}visitRepetitionWithSeparator(e){}visitAlternation(e){}visitTerminal(e){}visitRule(e){}};function Ch(t){return t instanceof Be||t instanceof ke||t instanceof pe||t instanceof ze||t instanceof Ve||t instanceof Me||t instanceof ae||t instanceof gr}function Co(t,e=[]){return t instanceof ke||t instanceof pe||t instanceof Me?!0:t instanceof Fe?hl(t.definition,n=>Co(n,e)):t instanceof we&&et(e,t)?!1:t instanceof Ur?(t instanceof we&&e.push(t),ar(t.definition,n=>Co(n,e))):!1}function wh(t){return t instanceof Fe}function kr(t){if(t instanceof we)return"SUBRULE";if(t instanceof ke)return"OPTION";if(t instanceof Fe)return"OR";if(t instanceof ze)return"AT_LEAST_ONE";if(t instanceof Ve)return"AT_LEAST_ONE_SEP";if(t instanceof Me)return"MANY_SEP";if(t instanceof pe)return"MANY";if(t instanceof ae)return"CONSUME";throw Error("non exhaustive match")}var fi=class{walk(e,r=[]){G(e.definition,(n,i)=>{let o=Tt(e.definition,i+1);if(n instanceof we)this.walkProdRef(n,o,r);else if(n instanceof ae)this.walkTerminal(n,o,r);else if(n instanceof Be)this.walkFlat(n,o,r);else if(n instanceof ke)this.walkOption(n,o,r);else if(n instanceof ze)this.walkAtLeastOne(n,o,r);else if(n instanceof Ve)this.walkAtLeastOneSep(n,o,r);else if(n instanceof Me)this.walkManySep(n,o,r);else if(n instanceof pe)this.walkMany(n,o,r);else if(n instanceof Fe)this.walkOr(n,o,r);else throw Error("non exhaustive match")})}walkTerminal(e,r,n){}walkProdRef(e,r,n){}walkFlat(e,r,n){let i=r.concat(n);this.walk(e,i)}walkOption(e,r,n){let i=r.concat(n);this.walk(e,i)}walkAtLeastOne(e,r,n){let i=[new ke({definition:e.definition})].concat(r,n);this.walk(e,i)}walkAtLeastOneSep(e,r,n){let i=Fb(e,r,n);this.walk(e,i)}walkMany(e,r,n){let i=[new ke({definition:e.definition})].concat(r,n);this.walk(e,i)}walkManySep(e,r,n){let i=Fb(e,r,n);this.walk(e,i)}walkOr(e,r,n){let i=r.concat(n);G(e.definition,o=>{let s=new Be({definition:[o]});this.walk(s,i)})}};function Fb(t,e,r){return[new ke({definition:[new ae({terminalType:t.separator})].concat(t.definition)})].concat(e,r)}function wo(t){if(t instanceof we)return wo(t.referencedRule);if(t instanceof ae)return n1(t);if(Ch(t))return t1(t);if(wh(t))return r1(t);throw Error("non exhaustive match")}function t1(t){let e=[],r=t.definition,n=0,i=r.length>n,o,s=!0;for(;i&&s;)o=r[n],s=Co(o),e=e.concat(wo(o)),n=n+1,i=r.length>n;return Ys(e)}function r1(t){let e=L(t.definition,r=>wo(r));return Ys(yt(e))}function n1(t){return[t.terminalType]}var Sf="_~IN~_";var kh=class extends fi{constructor(e){super(),this.topProd=e,this.follows={}}startWalking(){return this.walk(this.topProd),this.follows}walkTerminal(e,r,n){}walkProdRef(e,r,n){let i=i1(e.referencedRule,e.idx)+this.topProd.name,o=r.concat(n),s=new Be({definition:o}),a=wo(s);this.follows[i]=a}};function Ub(t){let e={};return G(t,r=>{let n=new kh(r).startWalking();Jt(e,n)}),e}function i1(t,e){return t.name+e+Sf}var bf={},o1=new yo;function Zs(t){let e=t.toString();if(bf.hasOwnProperty(e))return bf[e];{let r=o1.pattern(e);return bf[e]=r,r}}function qb(){bf={}}var jb="Complement Sets are not supported for first char optimization",vl=`Unable to use "first char" lexer optimizations:
`;function Hb(t,e=!1){try{let r=Zs(t);return Eh(r.value,{},r.flags.ignoreCase)}catch(r){if(r.message===jb)e&&gl(`${vl}	Unable to optimize: < ${t.toString()} >
	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);else{let n="";e&&(n=`
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`),Js(`${vl}
	Failed parsing: < ${t.toString()} >
	Using the @chevrotain/regexp-to-ast library
	Please open an issue at: https://github.com/chevrotain/chevrotain/issues`+n)}}return[]}function Eh(t,e,r){switch(t.type){case"Disjunction":for(let i=0;i<t.value.length;i++)Eh(t.value[i],e,r);break;case"Alternative":let n=t.value;for(let i=0;i<n.length;i++){let o=n[i];switch(o.type){case"EndAnchor":case"GroupBackReference":case"Lookahead":case"NegativeLookahead":case"StartAnchor":case"WordBoundary":case"NonWordBoundary":continue}let s=o;switch(s.type){case"Character":Af(s.value,e,r);break;case"Set":if(s.complement===!0)throw Error(jb);G(s.value,l=>{if(typeof l=="number")Af(l,e,r);else{let u=l;if(r===!0)for(let c=u.from;c<=u.to;c++)Af(c,e,r);else{for(let c=u.from;c<=u.to&&c<ea;c++)Af(c,e,r);if(u.to>=ea){let c=u.from>=ea?u.from:ea,f=u.to,m=qn(c),T=qn(f);for(let b=m;b<=T;b++)e[b]=b}}}});break;case"Group":Eh(s.value,e,r);break;default:throw Error("Non Exhaustive Match")}let a=s.quantifier!==void 0&&s.quantifier.atLeast===0;if(s.type==="Group"&&$h(s)===!1||s.type!=="Group"&&a===!1)break}break;default:throw Error("non exhaustive match!")}return Pe(e)}function Af(t,e,r){let n=qn(t);e[n]=n,r===!0&&s1(t,e)}function s1(t,e){let r=String.fromCharCode(t),n=r.toUpperCase();if(n!==r){let i=qn(n.charCodeAt(0));e[i]=i}else{let i=r.toLowerCase();if(i!==r){let o=qn(i.charCodeAt(0));e[o]=o}}}function Gb(t,e){return Un(t.value,r=>{if(typeof r=="number")return et(e,r);{let n=r;return Un(e,i=>n.from<=i&&i<=n.to)!==void 0}})}function $h(t){let e=t.quantifier;return e&&e.atLeast===0?!0:t.value?z(t.value)?ar(t.value,$h):$h(t.value):!1}var _h=class extends kn{constructor(e){super(),this.targetCharCodes=e,this.found=!1}visitChildren(e){if(this.found!==!0){switch(e.type){case"Lookahead":this.visitLookahead(e);return;case"NegativeLookahead":this.visitNegativeLookahead(e);return}super.visitChildren(e)}}visitCharacter(e){et(this.targetCharCodes,e.value)&&(this.found=!0)}visitSet(e){e.complement?Gb(e,this.targetCharCodes)===void 0&&(this.found=!0):Gb(e,this.targetCharCodes)!==void 0&&(this.found=!0)}};function Cf(t,e){if(e instanceof RegExp){let r=Zs(e),n=new _h(t);return n.visit(r),n.found}else return Un(e,r=>et(t,r.charCodeAt(0)))!==void 0}var ko="PATTERN",ta="defaultMode",wf="modes",Ih=typeof new RegExp("(?:)").sticky=="boolean";function Bb(t,e){e=Xs(e,{useSticky:Ih,debug:!1,safeMode:!1,positionTracking:"full",lineTerminatorCharacters:["\r",`
`],tracer:(v,y)=>y()});let r=e.tracer;r("initCharCodeToOptimizedIndexMap",()=>{A1()});let n;r("Reject Lexer.NA",()=>{n=Bi(t,v=>v[ko]===mt.NA)});let i=!1,o;r("Transform Patterns",()=>{i=!1,o=L(n,v=>{let y=v[ko];if(Qr(y)){let $=y.source;return $.length===1&&$!=="^"&&$!=="$"&&$!=="."&&!y.ignoreCase?$:$.length===2&&$[0]==="\\"&&!et(["d","D","s","S","t","r","n","t","0","c","b","B","f","v","w","W"],$[1])?$[1]:e.useSticky?Wb(y):Kb(y)}else{if(hr(y))return i=!0,{exec:y};if(typeof y=="object")return i=!0,y;if(typeof y=="string"){if(y.length===1)return y;{let $=y.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),D=new RegExp($);return e.useSticky?Wb(D):Kb(D)}}else throw Error("non exhaustive match")}})});let s,a,l,u,c;r("misc mapping",()=>{s=L(n,v=>v.tokenTypeIdx),a=L(n,v=>{let y=v.GROUP;if(y!==mt.SKIPPED){if(Dt(y))return y;if(lr(y))return!1;throw Error("non exhaustive match")}}),l=L(n,v=>{let y=v.LONGER_ALT;if(y)return z(y)?L(y,D=>vf(n,D)):[vf(n,y)]}),u=L(n,v=>v.PUSH_MODE),c=L(n,v=>W(v,"POP_MODE"))});let f;r("Line Terminator Handling",()=>{let v=eA(e.lineTerminatorCharacters);f=L(n,y=>!1),e.positionTracking!=="onlyOffset"&&(f=L(n,y=>W(y,"LINE_BREAKS")?!!y.LINE_BREAKS:Zb(y,v)===!1&&Cf(v,y.PATTERN)))});let m,T,b,C;r("Misc Mapping #2",()=>{m=L(n,Jb),T=L(o,S1),b=lt(n,(v,y)=>{let $=y.GROUP;return Dt($)&&$!==mt.SKIPPED&&(v[$]=[]),v},{}),C=L(o,(v,y)=>({pattern:o[y],longerAlt:l[y],canLineTerminator:f[y],isCustom:m[y],short:T[y],group:a[y],push:u[y],pop:c[y],tokenTypeIdx:s[y],tokenType:n[y]}))});let _=!0,w=[];return e.safeMode||r("First Char Optimization",()=>{w=lt(n,(v,y,$)=>{if(typeof y.PATTERN=="string"){let D=y.PATTERN.charCodeAt(0),X=qn(D);Nh(v,X,C[$])}else if(z(y.START_CHARS_HINT)){let D;G(y.START_CHARS_HINT,X=>{let ye=typeof X=="string"?X.charCodeAt(0):X,Ee=qn(ye);D!==Ee&&(D=Ee,Nh(v,Ee,C[$]))})}else if(Qr(y.PATTERN))if(y.PATTERN.unicode)_=!1,e.ensureOptimizations&&Js(`${vl}	Unable to analyze < ${y.PATTERN.toString()} > pattern.
	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);else{let D=Hb(y.PATTERN,e.ensureOptimizations);se(D)&&(_=!1),G(D,X=>{Nh(v,X,C[$])})}else e.ensureOptimizations&&Js(`${vl}	TokenType: <${y.name}> is using a custom token pattern without providing <start_chars_hint> parameter.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`),_=!1;return v},[])}),{emptyGroups:b,patternIdxToConfig:C,charCodeToPatternIdxToConfig:w,hasCustom:i,canBeOptimized:_}}function zb(t,e){let r=[],n=l1(t);r=r.concat(n.errors);let i=u1(n.valid),o=i.valid;return r=r.concat(i.errors),r=r.concat(a1(o)),r=r.concat(y1(o)),r=r.concat(T1(o,e)),r=r.concat(v1(o)),r}function a1(t){let e=[],r=Ut(t,n=>Qr(n[ko]));return e=e.concat(f1(r)),e=e.concat(m1(r)),e=e.concat(h1(r)),e=e.concat(g1(r)),e=e.concat(d1(r)),e}function l1(t){let e=Ut(t,i=>!W(i,ko)),r=L(e,i=>({message:"Token Type: ->"+i.name+"<- missing static 'PATTERN' property",type:tt.MISSING_PATTERN,tokenTypes:[i]})),n=Wi(t,e);return{errors:r,valid:n}}function u1(t){let e=Ut(t,i=>{let o=i[ko];return!Qr(o)&&!hr(o)&&!W(o,"exec")&&!Dt(o)}),r=L(e,i=>({message:"Token Type: ->"+i.name+"<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",type:tt.INVALID_PATTERN,tokenTypes:[i]})),n=Wi(t,e);return{errors:r,valid:n}}var c1=/[^\\][$]/;function f1(t){class e extends kn{constructor(){super(...arguments),this.found=!1}visitEndAnchor(o){this.found=!0}}let r=Ut(t,i=>{let o=i.PATTERN;try{let s=Zs(o),a=new e;return a.visit(s),a.found}catch{return c1.test(o.source)}});return L(r,i=>({message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain end of input anchor '$'
	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:tt.EOI_ANCHOR_FOUND,tokenTypes:[i]}))}function d1(t){let e=Ut(t,n=>n.PATTERN.test(""));return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'PATTERN' must not match an empty string",type:tt.EMPTY_MATCH_PATTERN,tokenTypes:[n]}))}var p1=/[^\\[][\^]|^\^/;function m1(t){class e extends kn{constructor(){super(...arguments),this.found=!1}visitStartAnchor(o){this.found=!0}}let r=Ut(t,i=>{let o=i.PATTERN;try{let s=Zs(o),a=new e;return a.visit(s),a.found}catch{return p1.test(o.source)}});return L(r,i=>({message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:tt.SOI_ANCHOR_FOUND,tokenTypes:[i]}))}function h1(t){let e=Ut(t,n=>{let i=n[ko];return i instanceof RegExp&&(i.multiline||i.global)});return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'PATTERN' may NOT contain global('g') or multiline('m')",type:tt.UNSUPPORTED_FLAGS_FOUND,tokenTypes:[n]}))}function g1(t){let e=[],r=L(t,o=>lt(t,(s,a)=>(o.PATTERN.source===a.PATTERN.source&&!et(e,a)&&a.PATTERN!==mt.NA&&(e.push(a),s.push(a)),s),[]));r=Mn(r);let n=Ut(r,o=>o.length>1);return L(n,o=>{let s=L(o,l=>l.name);return{message:`The same RegExp pattern ->${qt(o).PATTERN}<-has been used in all of the following Token Types: ${s.join(", ")} <-`,type:tt.DUPLICATE_PATTERNS_FOUND,tokenTypes:o}})}function y1(t){let e=Ut(t,n=>{if(!W(n,"GROUP"))return!1;let i=n.GROUP;return i!==mt.SKIPPED&&i!==mt.NA&&!Dt(i)});return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",type:tt.INVALID_GROUP_TYPE_FOUND,tokenTypes:[n]}))}function T1(t,e){let r=Ut(t,i=>i.PUSH_MODE!==void 0&&!et(e,i.PUSH_MODE));return L(r,i=>({message:`Token Type: ->${i.name}<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->${i.PUSH_MODE}<-which does not exist`,type:tt.PUSH_MODE_DOES_NOT_EXIST,tokenTypes:[i]}))}function v1(t){let e=[],r=lt(t,(n,i,o)=>{let s=i.PATTERN;return s===mt.NA||(Dt(s)?n.push({str:s,idx:o,tokenType:i}):Qr(s)&&x1(s)&&n.push({str:s.source,idx:o,tokenType:i})),n},[]);return G(t,(n,i)=>{G(r,({str:o,idx:s,tokenType:a})=>{if(i<s&&R1(o,n.PATTERN)){let l=`Token: ->${a.name}<- can never be matched.
Because it appears AFTER the Token Type ->${n.name}<-in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;e.push({message:l,type:tt.UNREACHABLE_PATTERN,tokenTypes:[n,a]})}})}),e}function R1(t,e){if(Qr(e)){let r=e.exec(t);return r!==null&&r.index===0}else{if(hr(e))return e(t,0,[],{});if(W(e,"exec"))return e.exec(t,0,[],{});if(typeof e=="string")return e===t;throw Error("non exhaustive match")}}function x1(t){return Un([".","\\","[","]","|","^","$","(",")","?","*","+","{"],r=>t.source.indexOf(r)!==-1)===void 0}function Kb(t){let e=t.ignoreCase?"i":"";return new RegExp(`^(?:${t.source})`,e)}function Wb(t){let e=t.ignoreCase?"iy":"y";return new RegExp(`${t.source}`,e)}function Vb(t,e,r){let n=[];return W(t,ta)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+ta+`> property in its definition
`,type:tt.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE}),W(t,wf)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+wf+`> property in its definition
`,type:tt.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY}),W(t,wf)&&W(t,ta)&&!W(t.modes,t.defaultMode)&&n.push({message:`A MultiMode Lexer cannot be initialized with a ${ta}: <${t.defaultMode}>which does not exist
`,type:tt.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST}),W(t,wf)&&G(t.modes,(i,o)=>{G(i,(s,a)=>{if(lr(s))n.push({message:`A Lexer cannot be initialized using an undefined Token Type. Mode:<${o}> at index: <${a}>
`,type:tt.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED});else if(W(s,"LONGER_ALT")){let l=z(s.LONGER_ALT)?s.LONGER_ALT:[s.LONGER_ALT];G(l,u=>{!lr(u)&&!et(i,u)&&n.push({message:`A MultiMode Lexer cannot be initialized with a longer_alt <${u.name}> on token <${s.name}> outside of mode <${o}>
`,type:tt.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE})})}})}),n}function Xb(t,e,r){let n=[],i=!1,o=Mn(yt(Pe(t.modes))),s=Bi(o,l=>l[ko]===mt.NA),a=eA(r);return e&&G(s,l=>{let u=Zb(l,a);if(u!==!1){let f={message:b1(l,u),type:u.issue,tokenType:l};n.push(f)}else W(l,"LINE_BREAKS")?l.LINE_BREAKS===!0&&(i=!0):Cf(a,l.PATTERN)&&(i=!0)}),e&&!i&&n.push({message:`Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`,type:tt.NO_LINE_BREAKS_FLAGS}),n}function Yb(t){let e={},r=He(t);return G(r,n=>{let i=t[n];if(z(i))e[n]=[];else throw Error("non exhaustive match")}),e}function Jb(t){let e=t.PATTERN;if(Qr(e))return!1;if(hr(e))return!0;if(W(e,"exec"))return!0;if(Dt(e))return!1;throw Error("non exhaustive match")}function S1(t){return Dt(t)&&t.length===1?t.charCodeAt(0):!1}var Qb={test:function(t){let e=t.length;for(let r=this.lastIndex;r<e;r++){let n=t.charCodeAt(r);if(n===10)return this.lastIndex=r+1,!0;if(n===13)return t.charCodeAt(r+1)===10?this.lastIndex=r+2:this.lastIndex=r+1,!0}return!1},lastIndex:0};function Zb(t,e){if(W(t,"LINE_BREAKS"))return!1;if(Qr(t.PATTERN)){try{Cf(e,t.PATTERN)}catch(r){return{issue:tt.IDENTIFY_TERMINATOR,errMsg:r.message}}return!1}else{if(Dt(t.PATTERN))return!1;if(Jb(t))return{issue:tt.CUSTOM_LINE_BREAK};throw Error("non exhaustive match")}}function b1(t,e){if(e.issue===tt.IDENTIFY_TERMINATOR)return`Warning: unable to identify line terminator usage in pattern.
	The problem is in the <${t.name}> Token Type
	 Root cause: ${e.errMsg}.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR`;if(e.issue===tt.CUSTOM_LINE_BREAK)return`Warning: A Custom Token Pattern should specify the <line_breaks> option.
	The problem is in the <${t.name}> Token Type
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK`;throw Error("non exhaustive match")}function eA(t){return L(t,r=>Dt(r)?r.charCodeAt(0):r)}function Nh(t,e,r){t[e]===void 0?t[e]=[r]:t[e].push(r)}var ea=256,kf=[];function qn(t){return t<ea?t:kf[t]}function A1(){if(se(kf)){kf=new Array(65536);for(let t=0;t<65536;t++)kf[t]=t>255?255+~~(t/255):t}}function di(t,e){let r=t.tokenTypeIdx;return r===e.tokenTypeIdx?!0:e.isParent===!0&&e.categoryMatchesMap[r]===!0}function ra(t,e){return t.tokenTypeIdx===e.tokenTypeIdx}var tA=1,nA={};function pi(t){let e=C1(t);w1(e),E1(e),k1(e),G(e,r=>{r.isParent=r.categoryMatches.length>0})}function C1(t){let e=We(t),r=t,n=!0;for(;n;){r=Mn(yt(L(r,o=>o.CATEGORIES)));let i=Wi(r,e);e=e.concat(i),se(i)?n=!1:r=i}return e}function w1(t){G(t,e=>{Ph(e)||(nA[tA]=e,e.tokenTypeIdx=tA++),rA(e)&&!z(e.CATEGORIES)&&(e.CATEGORIES=[e.CATEGORIES]),rA(e)||(e.CATEGORIES=[]),$1(e)||(e.categoryMatches=[]),_1(e)||(e.categoryMatchesMap={})})}function k1(t){G(t,e=>{e.categoryMatches=[],G(e.categoryMatchesMap,(r,n)=>{e.categoryMatches.push(nA[n].tokenTypeIdx)})})}function E1(t){G(t,e=>{iA([],e)})}function iA(t,e){G(t,r=>{e.categoryMatchesMap[r.tokenTypeIdx]=!0}),G(e.CATEGORIES,r=>{let n=t.concat(e);et(n,r)||iA(n,r)})}function Ph(t){return W(t,"tokenTypeIdx")}function rA(t){return W(t,"CATEGORIES")}function $1(t){return W(t,"categoryMatches")}function _1(t){return W(t,"categoryMatchesMap")}function oA(t){return W(t,"tokenTypeIdx")}var Dh={buildUnableToPopLexerModeMessage(t){return`Unable to pop Lexer Mode after encountering Token ->${t.image}<- The Mode Stack is empty`},buildUnexpectedCharactersMessage(t,e,r,n,i){return`unexpected character: ->${t.charAt(e)}<- at offset: ${e}, skipped ${r} characters.`}};var tt;(function(t){t[t.MISSING_PATTERN=0]="MISSING_PATTERN",t[t.INVALID_PATTERN=1]="INVALID_PATTERN",t[t.EOI_ANCHOR_FOUND=2]="EOI_ANCHOR_FOUND",t[t.UNSUPPORTED_FLAGS_FOUND=3]="UNSUPPORTED_FLAGS_FOUND",t[t.DUPLICATE_PATTERNS_FOUND=4]="DUPLICATE_PATTERNS_FOUND",t[t.INVALID_GROUP_TYPE_FOUND=5]="INVALID_GROUP_TYPE_FOUND",t[t.PUSH_MODE_DOES_NOT_EXIST=6]="PUSH_MODE_DOES_NOT_EXIST",t[t.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE=7]="MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE",t[t.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY=8]="MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY",t[t.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST=9]="MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST",t[t.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED=10]="LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED",t[t.SOI_ANCHOR_FOUND=11]="SOI_ANCHOR_FOUND",t[t.EMPTY_MATCH_PATTERN=12]="EMPTY_MATCH_PATTERN",t[t.NO_LINE_BREAKS_FLAGS=13]="NO_LINE_BREAKS_FLAGS",t[t.UNREACHABLE_PATTERN=14]="UNREACHABLE_PATTERN",t[t.IDENTIFY_TERMINATOR=15]="IDENTIFY_TERMINATOR",t[t.CUSTOM_LINE_BREAK=16]="CUSTOM_LINE_BREAK",t[t.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE=17]="MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE"})(tt||(tt={}));var Rl={deferDefinitionErrorsHandling:!1,positionTracking:"full",lineTerminatorsPattern:/\n|\r\n?/g,lineTerminatorCharacters:[`
`,"\r"],ensureOptimizations:!1,safeMode:!1,errorMessageProvider:Dh,traceInitPerf:!1,skipValidations:!1,recoveryEnabled:!0};Object.freeze(Rl);var mt=class{constructor(e,r=Rl){if(this.lexerDefinition=e,this.lexerDefinitionErrors=[],this.lexerDefinitionWarning=[],this.patternIdxToConfig={},this.charCodeToPatternIdxToConfig={},this.modes=[],this.emptyGroups={},this.trackStartLines=!0,this.trackEndLines=!0,this.hasCustom=!1,this.canModeBeOptimized={},this.TRACE_INIT=(i,o)=>{if(this.traceInitPerf===!0){this.traceInitIndent++;let s=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log(`${s}--> <${i}>`);let{time:a,value:l}=yl(o),u=a>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&u(`${s}<-- <${i}> time: ${a}ms`),this.traceInitIndent--,l}else return o()},typeof r=="boolean")throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);this.config=Jt({},Rl,r);let n=this.config.traceInitPerf;n===!0?(this.traceInitMaxIdent=1/0,this.traceInitPerf=!0):typeof n=="number"&&(this.traceInitMaxIdent=n,this.traceInitPerf=!0),this.traceInitIndent=-1,this.TRACE_INIT("Lexer Constructor",()=>{let i,o=!0;this.TRACE_INIT("Lexer Config handling",()=>{if(this.config.lineTerminatorsPattern===Rl.lineTerminatorsPattern)this.config.lineTerminatorsPattern=Qb;else if(this.config.lineTerminatorCharacters===Rl.lineTerminatorCharacters)throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`);if(r.safeMode&&r.ensureOptimizations)throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');this.trackStartLines=/full|onlyStart/i.test(this.config.positionTracking),this.trackEndLines=/full/i.test(this.config.positionTracking),z(e)?i={modes:{defaultMode:We(e)},defaultMode:ta}:(o=!1,i=We(e))}),this.config.skipValidations===!1&&(this.TRACE_INIT("performRuntimeChecks",()=>{this.lexerDefinitionErrors=this.lexerDefinitionErrors.concat(Vb(i,this.trackStartLines,this.config.lineTerminatorCharacters))}),this.TRACE_INIT("performWarningRuntimeChecks",()=>{this.lexerDefinitionWarning=this.lexerDefinitionWarning.concat(Xb(i,this.trackStartLines,this.config.lineTerminatorCharacters))})),i.modes=i.modes?i.modes:{},G(i.modes,(a,l)=>{i.modes[l]=Bi(a,u=>lr(u))});let s=He(i.modes);if(G(i.modes,(a,l)=>{this.TRACE_INIT(`Mode: <${l}> processing`,()=>{if(this.modes.push(l),this.config.skipValidations===!1&&this.TRACE_INIT("validatePatterns",()=>{this.lexerDefinitionErrors=this.lexerDefinitionErrors.concat(zb(a,s))}),se(this.lexerDefinitionErrors)){pi(a);let u;this.TRACE_INIT("analyzeTokenTypes",()=>{u=Bb(a,{lineTerminatorCharacters:this.config.lineTerminatorCharacters,positionTracking:r.positionTracking,ensureOptimizations:r.ensureOptimizations,safeMode:r.safeMode,tracer:this.TRACE_INIT})}),this.patternIdxToConfig[l]=u.patternIdxToConfig,this.charCodeToPatternIdxToConfig[l]=u.charCodeToPatternIdxToConfig,this.emptyGroups=Jt({},this.emptyGroups,u.emptyGroups),this.hasCustom=u.hasCustom||this.hasCustom,this.canModeBeOptimized[l]=u.canBeOptimized}})}),this.defaultMode=i.defaultMode,!se(this.lexerDefinitionErrors)&&!this.config.deferDefinitionErrorsHandling){let l=L(this.lexerDefinitionErrors,u=>u.message).join(`-----------------------
`);throw new Error(`Errors detected in definition of Lexer:
`+l)}G(this.lexerDefinitionWarning,a=>{gl(a.message)}),this.TRACE_INIT("Choosing sub-methods implementations",()=>{if(Ih?(this.chopInput=br,this.match=this.matchWithTest):(this.updateLastIndex=at,this.match=this.matchWithExec),o&&(this.handleModes=at),this.trackStartLines===!1&&(this.computeNewColumn=br),this.trackEndLines===!1&&(this.updateTokenEndLineColumnLocation=at),/full/i.test(this.config.positionTracking))this.createTokenInstance=this.createFullToken;else if(/onlyStart/i.test(this.config.positionTracking))this.createTokenInstance=this.createStartOnlyToken;else if(/onlyOffset/i.test(this.config.positionTracking))this.createTokenInstance=this.createOffsetOnlyToken;else throw Error(`Invalid <positionTracking> config option: "${this.config.positionTracking}"`);this.hasCustom?(this.addToken=this.addTokenUsingPush,this.handlePayload=this.handlePayloadWithCustom):(this.addToken=this.addTokenUsingMemberAccess,this.handlePayload=this.handlePayloadNoCustom)}),this.TRACE_INIT("Failed Optimization Warnings",()=>{let a=lt(this.canModeBeOptimized,(l,u,c)=>(u===!1&&l.push(c),l),[]);if(r.ensureOptimizations&&!se(a))throw Error(`Lexer Modes: < ${a.join(", ")} > cannot be optimized.
	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`)}),this.TRACE_INIT("clearRegExpParserCache",()=>{qb()}),this.TRACE_INIT("toFastProperties",()=>{Tl(this)})})}tokenize(e,r=this.defaultMode){if(!se(this.lexerDefinitionErrors)){let i=L(this.lexerDefinitionErrors,o=>o.message).join(`-----------------------
`);throw new Error(`Unable to Tokenize because Errors detected in definition of Lexer:
`+i)}return this.tokenizeInternal(e,r)}tokenizeInternal(e,r){let n,i,o,s,a,l,u,c,f,m,T,b,C,_,w,v,y=e,$=y.length,D=0,X=0,ye=this.hasCustom?0:Math.floor(e.length/10),Ee=new Array(ye),jt=[],vt=this.trackStartLines?1:void 0,M=this.trackStartLines?1:void 0,A=Yb(this.emptyGroups),q=this.trackStartLines,j=this.config.lineTerminatorsPattern,le=0,ee=[],Q=[],Rt=[],ut=[];Object.freeze(ut);let me;function Er(){return ee}function Gn(xt){let Zt=qn(xt),vn=Q[Zt];return vn===void 0?ut:vn}let ga=xt=>{if(Rt.length===1&&xt.tokenType.PUSH_MODE===void 0){let Zt=this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(xt);jt.push({offset:xt.startOffset,line:xt.startLine,column:xt.startColumn,length:xt.image.length,message:Zt})}else{Rt.pop();let Zt=Fn(Rt);ee=this.patternIdxToConfig[Zt],Q=this.charCodeToPatternIdxToConfig[Zt],le=ee.length;let vn=this.canModeBeOptimized[Zt]&&this.config.safeMode===!1;Q&&vn?me=Gn:me=Er}};function Yi(xt){Rt.push(xt),Q=this.charCodeToPatternIdxToConfig[xt],ee=this.patternIdxToConfig[xt],le=ee.length,le=ee.length;let Zt=this.canModeBeOptimized[xt]&&this.config.safeMode===!1;Q&&Zt?me=Gn:me=Er}Yi.call(this,r);let ur,Po=this.config.recoveryEnabled;for(;D<$;){l=null;let xt=y.charCodeAt(D),Zt=me(xt),vn=Zt.length;for(n=0;n<vn;n++){ur=Zt[n];let Ht=ur.pattern;u=null;let ct=ur.short;if(ct!==!1?xt===ct&&(l=Ht):ur.isCustom===!0?(v=Ht.exec(y,D,Ee,A),v!==null?(l=v[0],v.payload!==void 0&&(u=v.payload)):l=null):(this.updateLastIndex(Ht,D),l=this.match(Ht,e,D)),l!==null){if(a=ur.longerAlt,a!==void 0){let qr=a.length;for(o=0;o<qr;o++){let $r=ee[a[o]],vr=$r.pattern;if(c=null,$r.isCustom===!0?(v=vr.exec(y,D,Ee,A),v!==null?(s=v[0],v.payload!==void 0&&(c=v.payload)):s=null):(this.updateLastIndex(vr,D),s=this.match(vr,e,D)),s&&s.length>l.length){l=s,u=c,ur=$r;break}}}break}}if(l!==null){if(f=l.length,m=ur.group,m!==void 0&&(T=ur.tokenTypeIdx,b=this.createTokenInstance(l,D,T,ur.tokenType,vt,M,f),this.handlePayload(b,u),m===!1?X=this.addToken(Ee,X,b):A[m].push(b)),e=this.chopInput(e,f),D=D+f,M=this.computeNewColumn(M,f),q===!0&&ur.canLineTerminator===!0){let Ht=0,ct,qr;j.lastIndex=0;do ct=j.test(l),ct===!0&&(qr=j.lastIndex-1,Ht++);while(ct===!0);Ht!==0&&(vt=vt+Ht,M=f-qr,this.updateTokenEndLineColumnLocation(b,m,qr,Ht,vt,M,f))}this.handleModes(ur,ga,Yi,b)}else{let Ht=D,ct=vt,qr=M,$r=Po===!1;for(;$r===!1&&D<$;)for(e=this.chopInput(e,1),D++,i=0;i<le;i++){let vr=ee[i],Ji=vr.pattern,Ti=vr.short;if(Ti!==!1?y.charCodeAt(D)===Ti&&($r=!0):vr.isCustom===!0?$r=Ji.exec(y,D,Ee,A)!==null:(this.updateLastIndex(Ji,D),$r=Ji.exec(e)!==null),$r===!0)break}if(C=D-Ht,M=this.computeNewColumn(M,C),w=this.config.errorMessageProvider.buildUnexpectedCharactersMessage(y,Ht,C,ct,qr),jt.push({offset:Ht,line:ct,column:qr,length:C,message:w}),Po===!1)break}}return this.hasCustom||(Ee.length=X),{tokens:Ee,groups:A,errors:jt}}handleModes(e,r,n,i){if(e.pop===!0){let o=e.push;r(i),o!==void 0&&n.call(this,o)}else e.push!==void 0&&n.call(this,e.push)}chopInput(e,r){return e.substring(r)}updateLastIndex(e,r){e.lastIndex=r}updateTokenEndLineColumnLocation(e,r,n,i,o,s,a){let l,u;r!==void 0&&(l=n===a-1,u=l?-1:0,i===1&&l===!0||(e.endLine=o+u,e.endColumn=s-1+-u))}computeNewColumn(e,r){return e+r}createOffsetOnlyToken(e,r,n,i){return{image:e,startOffset:r,tokenTypeIdx:n,tokenType:i}}createStartOnlyToken(e,r,n,i,o,s){return{image:e,startOffset:r,startLine:o,startColumn:s,tokenTypeIdx:n,tokenType:i}}createFullToken(e,r,n,i,o,s,a){return{image:e,startOffset:r,endOffset:r+a-1,startLine:o,endLine:o,startColumn:s,endColumn:s+a-1,tokenTypeIdx:n,tokenType:i}}addTokenUsingPush(e,r,n){return e.push(n),r}addTokenUsingMemberAccess(e,r,n){return e[r]=n,r++,r}handlePayloadNoCustom(e,r){}handlePayloadWithCustom(e,r){r!==null&&(e.payload=r)}matchWithTest(e,r,n){return e.test(r)===!0?r.substring(n,e.lastIndex):null}matchWithExec(e,r){let n=e.exec(r);return n!==null?n[0]:null}};mt.SKIPPED="This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.";mt.NA=/NOT_APPLICABLE/;function mi(t){return Oh(t)?t.LABEL:t.name}function Oh(t){return Dt(t.LABEL)&&t.LABEL!==""}var N1="parent",sA="categories",aA="label",lA="group",uA="push_mode",cA="pop_mode",fA="longer_alt",dA="line_breaks",pA="start_chars_hint";function Ef(t){return I1(t)}function I1(t){let e=t.pattern,r={};if(r.name=t.name,lr(e)||(r.PATTERN=e),W(t,N1))throw`The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`;return W(t,sA)&&(r.CATEGORIES=t[sA]),pi([r]),W(t,aA)&&(r.LABEL=t[aA]),W(t,lA)&&(r.GROUP=t[lA]),W(t,cA)&&(r.POP_MODE=t[cA]),W(t,uA)&&(r.PUSH_MODE=t[uA]),W(t,fA)&&(r.LONGER_ALT=t[fA]),W(t,dA)&&(r.LINE_BREAKS=t[dA]),W(t,pA)&&(r.START_CHARS_HINT=t[pA]),r}var yn=Ef({name:"EOF",pattern:mt.NA});pi([yn]);function Eo(t,e,r,n,i,o,s,a){return{image:e,startOffset:r,endOffset:n,startLine:i,endLine:o,startColumn:s,endColumn:a,tokenTypeIdx:t.tokenTypeIdx,tokenType:t}}function xl(t,e){return di(t,e)}var hi={buildMismatchTokenMessage({expected:t,actual:e,previous:r,ruleName:n}){return`Expecting ${Oh(t)?`--> ${mi(t)} <--`:`token of type --> ${t.name} <--`} but found --> '${e.image}' <--`},buildNotAllInputParsedMessage({firstRedundant:t,ruleName:e}){return"Redundant input, expecting EOF but found: "+t.image},buildNoViableAltMessage({expectedPathsPerAlt:t,actual:e,previous:r,customUserDescription:n,ruleName:i}){let o="Expecting: ",a=`
but found: '`+qt(e).image+"'";if(n)return o+n+a;{let l=lt(t,(m,T)=>m.concat(T),[]),u=L(l,m=>`[${L(m,T=>mi(T)).join(", ")}]`),f=`one of these possible Token sequences:
${L(u,(m,T)=>`  ${T+1}. ${m}`).join(`
`)}`;return o+f+a}},buildEarlyExitMessage({expectedIterationPaths:t,actual:e,customUserDescription:r,ruleName:n}){let i="Expecting: ",s=`
but found: '`+qt(e).image+"'";if(r)return i+r+s;{let l=`expecting at least one iteration which starts with one of these possible Token sequences::
  <${L(t,u=>`[${L(u,c=>mi(c)).join(",")}]`).join(" ,")}>`;return i+l+s}}};Object.freeze(hi);var mA={buildRuleNotFoundError(t,e){return"Invalid grammar, reference to a rule which is not defined: ->"+e.nonTerminalName+`<-
inside top level rule: ->`+t.name+"<-"}},Tn={buildDuplicateFoundError(t,e){function r(c){return c instanceof ae?c.terminalType.name:c instanceof we?c.nonTerminalName:""}let n=t.name,i=qt(e),o=i.idx,s=kr(i),a=r(i),l=o>0,u=`->${s}${l?o:""}<- ${a?`with argument: ->${a}<-`:""}
                  appears more than once (${e.length} times) in the top level rule: ->${n}<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `;return u=u.replace(/[ \t]+/g," "),u=u.replace(/\s\s+/g,`
`),u},buildNamespaceConflictError(t){return`Namespace conflict found in grammar.
The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <${t.name}>.
To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`},buildAlternationPrefixAmbiguityError(t){let e=L(t.prefixPath,i=>mi(i)).join(", "),r=t.alternation.idx===0?"":t.alternation.idx;return`Ambiguous alternatives: <${t.ambiguityIndices.join(" ,")}> due to common lookahead prefix
in <OR${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`},buildAlternationAmbiguityError(t){let e=L(t.prefixPath,i=>mi(i)).join(", "),r=t.alternation.idx===0?"":t.alternation.idx,n=`Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(" ,")}> in <OR${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n},buildEmptyRepetitionError(t){let e=kr(t.repetition);return t.repetition.idx!==0&&(e+=t.repetition.idx),`The repetition <${e}> within Rule <${t.topLevelRule.name}> can never consume any tokens.
This could lead to an infinite loop.`},buildTokenNameError(t){return"deprecated"},buildEmptyAlternationError(t){return`Ambiguous empty alternative: <${t.emptyChoiceIdx+1}> in <OR${t.alternation.idx}> inside <${t.topLevelRule.name}> Rule.
Only the last alternative may be an empty alternative.`},buildTooManyAlternativesError(t){return`An Alternation cannot have more than 256 alternatives:
<OR${t.alternation.idx}> inside <${t.topLevelRule.name}> Rule.
 has ${t.alternation.definition.length+1} alternatives.`},buildLeftRecursionError(t){let e=t.topLevelRule.name,r=L(t.leftRecursionPath,o=>o.name),n=`${e} --> ${r.concat([e]).join(" --> ")}`;return`Left Recursion found in grammar.
rule: <${e}> can be invoked from itself (directly or indirectly)
without consuming any Tokens. The grammar path that causes this is: 
 ${n}
 To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`},buildInvalidRuleNameError(t){return"deprecated"},buildDuplicateRuleNameError(t){let e;return t.topLevelRule instanceof gr?e=t.topLevelRule.name:e=t.topLevelRule,`Duplicate definition, rule: ->${e}<- is already defined in the grammar: ->${t.grammarName}<-`}};function hA(t,e){let r=new Lh(t,e);return r.resolveRefs(),r.errors}var Lh=class extends yr{constructor(e,r){super(),this.nameToTopRule=e,this.errMsgProvider=r,this.errors=[]}resolveRefs(){G(Pe(this.nameToTopRule),e=>{this.currTopLevel=e,e.accept(this)})}visitNonTerminal(e){let r=this.nameToTopRule[e.nonTerminalName];if(r)e.referencedRule=r;else{let n=this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel,e);this.errors.push({message:n,type:Ot.UNRESOLVED_SUBRULE_REF,ruleName:this.currTopLevel.name,unresolvedRefName:e.nonTerminalName})}}};var Mh=class extends fi{constructor(e,r){super(),this.topProd=e,this.path=r,this.possibleTokTypes=[],this.nextProductionName="",this.nextProductionOccurrence=0,this.found=!1,this.isAtEndOfPath=!1}startWalking(){if(this.found=!1,this.path.ruleStack[0]!==this.topProd.name)throw Error("The path does not start with the walker's top Rule!");return this.ruleStack=We(this.path.ruleStack).reverse(),this.occurrenceStack=We(this.path.occurrenceStack).reverse(),this.ruleStack.pop(),this.occurrenceStack.pop(),this.updateExpectedNext(),this.walk(this.topProd),this.possibleTokTypes}walk(e,r=[]){this.found||super.walk(e,r)}walkProdRef(e,r,n){if(e.referencedRule.name===this.nextProductionName&&e.idx===this.nextProductionOccurrence){let i=r.concat(n);this.updateExpectedNext(),this.walk(e.referencedRule,i)}}updateExpectedNext(){se(this.ruleStack)?(this.nextProductionName="",this.nextProductionOccurrence=0,this.isAtEndOfPath=!0):(this.nextProductionName=this.ruleStack.pop(),this.nextProductionOccurrence=this.occurrenceStack.pop())}},$f=class extends Mh{constructor(e,r){super(e,r),this.path=r,this.nextTerminalName="",this.nextTerminalOccurrence=0,this.nextTerminalName=this.path.lastTok.name,this.nextTerminalOccurrence=this.path.lastTokOccurrence}walkTerminal(e,r,n){if(this.isAtEndOfPath&&e.terminalType.name===this.nextTerminalName&&e.idx===this.nextTerminalOccurrence&&!this.found){let i=r.concat(n),o=new Be({definition:i});this.possibleTokTypes=wo(o),this.found=!0}}},na=class extends fi{constructor(e,r){super(),this.topRule=e,this.occurrence=r,this.result={token:void 0,occurrence:void 0,isEndOfRule:void 0}}startWalking(){return this.walk(this.topRule),this.result}},_f=class extends na{walkMany(e,r,n){if(e.idx===this.occurrence){let i=qt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkMany(e,r,n)}},Sl=class extends na{walkManySep(e,r,n){if(e.idx===this.occurrence){let i=qt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkManySep(e,r,n)}},Nf=class extends na{walkAtLeastOne(e,r,n){if(e.idx===this.occurrence){let i=qt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkAtLeastOne(e,r,n)}},bl=class extends na{walkAtLeastOneSep(e,r,n){if(e.idx===this.occurrence){let i=qt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkAtLeastOneSep(e,r,n)}};function If(t,e,r=[]){r=We(r);let n=[],i=0;function o(a){return a.concat(Tt(t,i+1))}function s(a){let l=If(o(a),e,r);return n.concat(l)}for(;r.length<e&&i<t.length;){let a=t[i];if(a instanceof Be)return s(a.definition);if(a instanceof we)return s(a.definition);if(a instanceof ke)n=s(a.definition);else if(a instanceof ze){let l=a.definition.concat([new pe({definition:a.definition})]);return s(l)}else if(a instanceof Ve){let l=[new Be({definition:a.definition}),new pe({definition:[new ae({terminalType:a.separator})].concat(a.definition)})];return s(l)}else if(a instanceof Me){let l=a.definition.concat([new pe({definition:[new ae({terminalType:a.separator})].concat(a.definition)})]);n=s(l)}else if(a instanceof pe){let l=a.definition.concat([new pe({definition:a.definition})]);n=s(l)}else{if(a instanceof Fe)return G(a.definition,l=>{se(l.definition)===!1&&(n=s(l.definition))}),n;if(a instanceof ae)r.push(a.terminalType);else throw Error("non exhaustive match")}i++}return n.push({partialPath:r,suffixDef:Tt(t,i)}),n}function Pf(t,e,r,n){let i="EXIT_NONE_TERMINAL",o=[i],s="EXIT_ALTERNATIVE",a=!1,l=e.length,u=l-n-1,c=[],f=[];for(f.push({idx:-1,def:t,ruleStack:[],occurrenceStack:[]});!se(f);){let m=f.pop();if(m===s){a&&Fn(f).idx<=u&&f.pop();continue}let T=m.def,b=m.idx,C=m.ruleStack,_=m.occurrenceStack;if(se(T))continue;let w=T[0];if(w===i){let v={idx:b,def:Tt(T),ruleStack:ci(C),occurrenceStack:ci(_)};f.push(v)}else if(w instanceof ae)if(b<l-1){let v=b+1,y=e[v];if(r(y,w.terminalType)){let $={idx:v,def:Tt(T),ruleStack:C,occurrenceStack:_};f.push($)}}else if(b===l-1)c.push({nextTokenType:w.terminalType,nextTokenOccurrence:w.idx,ruleStack:C,occurrenceStack:_}),a=!0;else throw Error("non exhaustive match");else if(w instanceof we){let v=We(C);v.push(w.nonTerminalName);let y=We(_);y.push(w.idx);let $={idx:b,def:w.definition.concat(o,Tt(T)),ruleStack:v,occurrenceStack:y};f.push($)}else if(w instanceof ke){let v={idx:b,def:Tt(T),ruleStack:C,occurrenceStack:_};f.push(v),f.push(s);let y={idx:b,def:w.definition.concat(Tt(T)),ruleStack:C,occurrenceStack:_};f.push(y)}else if(w instanceof ze){let v=new pe({definition:w.definition,idx:w.idx}),y=w.definition.concat([v],Tt(T)),$={idx:b,def:y,ruleStack:C,occurrenceStack:_};f.push($)}else if(w instanceof Ve){let v=new ae({terminalType:w.separator}),y=new pe({definition:[v].concat(w.definition),idx:w.idx}),$=w.definition.concat([y],Tt(T)),D={idx:b,def:$,ruleStack:C,occurrenceStack:_};f.push(D)}else if(w instanceof Me){let v={idx:b,def:Tt(T),ruleStack:C,occurrenceStack:_};f.push(v),f.push(s);let y=new ae({terminalType:w.separator}),$=new pe({definition:[y].concat(w.definition),idx:w.idx}),D=w.definition.concat([$],Tt(T)),X={idx:b,def:D,ruleStack:C,occurrenceStack:_};f.push(X)}else if(w instanceof pe){let v={idx:b,def:Tt(T),ruleStack:C,occurrenceStack:_};f.push(v),f.push(s);let y=new pe({definition:w.definition,idx:w.idx}),$=w.definition.concat([y],Tt(T)),D={idx:b,def:$,ruleStack:C,occurrenceStack:_};f.push(D)}else if(w instanceof Fe)for(let v=w.definition.length-1;v>=0;v--){let y=w.definition[v],$={idx:b,def:y.definition.concat(Tt(T)),ruleStack:C,occurrenceStack:_};f.push($),f.push(s)}else if(w instanceof Be)f.push({idx:b,def:w.definition.concat(Tt(T)),ruleStack:C,occurrenceStack:_});else if(w instanceof gr)f.push(P1(w,b,C,_));else throw Error("non exhaustive match")}return c}function P1(t,e,r,n){let i=We(r);i.push(t.name);let o=We(n);return o.push(1),{idx:e,def:t.definition,ruleStack:i,occurrenceStack:o}}var rt;(function(t){t[t.OPTION=0]="OPTION",t[t.REPETITION=1]="REPETITION",t[t.REPETITION_MANDATORY=2]="REPETITION_MANDATORY",t[t.REPETITION_MANDATORY_WITH_SEPARATOR=3]="REPETITION_MANDATORY_WITH_SEPARATOR",t[t.REPETITION_WITH_SEPARATOR=4]="REPETITION_WITH_SEPARATOR",t[t.ALTERNATION=5]="ALTERNATION"})(rt||(rt={}));function Al(t){if(t instanceof ke||t==="Option")return rt.OPTION;if(t instanceof pe||t==="Repetition")return rt.REPETITION;if(t instanceof ze||t==="RepetitionMandatory")return rt.REPETITION_MANDATORY;if(t instanceof Ve||t==="RepetitionMandatoryWithSeparator")return rt.REPETITION_MANDATORY_WITH_SEPARATOR;if(t instanceof Me||t==="RepetitionWithSeparator")return rt.REPETITION_WITH_SEPARATOR;if(t instanceof Fe||t==="Alternation")return rt.ALTERNATION;throw Error("non exhaustive match")}function Of(t){let{occurrence:e,rule:r,prodType:n,maxLookahead:i}=t,o=Al(n);return o===rt.ALTERNATION?ia(e,r,i):oa(e,r,o,i)}function yA(t,e,r,n,i,o){let s=ia(t,e,r),a=bA(s)?ra:di;return o(s,n,a,i)}function TA(t,e,r,n,i,o){let s=oa(t,e,i,r),a=bA(s)?ra:di;return o(s[0],a,n)}function vA(t,e,r,n){let i=t.length,o=ar(t,s=>ar(s,a=>a.length===1));if(e)return function(s){let a=L(s,l=>l.GATE);for(let l=0;l<i;l++){let u=t[l],c=u.length,f=a[l];if(!(f!==void 0&&f.call(this)===!1))e:for(let m=0;m<c;m++){let T=u[m],b=T.length;for(let C=0;C<b;C++){let _=this.LA(C+1);if(r(_,T[C])===!1)continue e}return l}}};if(o&&!n){let s=L(t,l=>yt(l)),a=lt(s,(l,u,c)=>(G(u,f=>{W(l,f.tokenTypeIdx)||(l[f.tokenTypeIdx]=c),G(f.categoryMatches,m=>{W(l,m)||(l[m]=c)})}),l),{});return function(){let l=this.LA(1);return a[l.tokenTypeIdx]}}else return function(){for(let s=0;s<i;s++){let a=t[s],l=a.length;e:for(let u=0;u<l;u++){let c=a[u],f=c.length;for(let m=0;m<f;m++){let T=this.LA(m+1);if(r(T,c[m])===!1)continue e}return s}}}}function RA(t,e,r){let n=ar(t,o=>o.length===1),i=t.length;if(n&&!r){let o=yt(t);if(o.length===1&&se(o[0].categoryMatches)){let a=o[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===a}}else{let s=lt(o,(a,l,u)=>(a[l.tokenTypeIdx]=!0,G(l.categoryMatches,c=>{a[c]=!0}),a),[]);return function(){let a=this.LA(1);return s[a.tokenTypeIdx]===!0}}}else return function(){e:for(let o=0;o<i;o++){let s=t[o],a=s.length;for(let l=0;l<a;l++){let u=this.LA(l+1);if(e(u,s[l])===!1)continue e}return!0}return!1}}var Uh=class extends fi{constructor(e,r,n){super(),this.topProd=e,this.targetOccurrence=r,this.targetProdType=n}startWalking(){return this.walk(this.topProd),this.restDef}checkIsTarget(e,r,n,i){return e.idx===this.targetOccurrence&&this.targetProdType===r?(this.restDef=n.concat(i),!0):!1}walkOption(e,r,n){this.checkIsTarget(e,rt.OPTION,r,n)||super.walkOption(e,r,n)}walkAtLeastOne(e,r,n){this.checkIsTarget(e,rt.REPETITION_MANDATORY,r,n)||super.walkOption(e,r,n)}walkAtLeastOneSep(e,r,n){this.checkIsTarget(e,rt.REPETITION_MANDATORY_WITH_SEPARATOR,r,n)||super.walkOption(e,r,n)}walkMany(e,r,n){this.checkIsTarget(e,rt.REPETITION,r,n)||super.walkOption(e,r,n)}walkManySep(e,r,n){this.checkIsTarget(e,rt.REPETITION_WITH_SEPARATOR,r,n)||super.walkOption(e,r,n)}},Df=class extends yr{constructor(e,r,n){super(),this.targetOccurrence=e,this.targetProdType=r,this.targetRef=n,this.result=[]}checkIsTarget(e,r){e.idx===this.targetOccurrence&&this.targetProdType===r&&(this.targetRef===void 0||e===this.targetRef)&&(this.result=e.definition)}visitOption(e){this.checkIsTarget(e,rt.OPTION)}visitRepetition(e){this.checkIsTarget(e,rt.REPETITION)}visitRepetitionMandatory(e){this.checkIsTarget(e,rt.REPETITION_MANDATORY)}visitRepetitionMandatoryWithSeparator(e){this.checkIsTarget(e,rt.REPETITION_MANDATORY_WITH_SEPARATOR)}visitRepetitionWithSeparator(e){this.checkIsTarget(e,rt.REPETITION_WITH_SEPARATOR)}visitAlternation(e){this.checkIsTarget(e,rt.ALTERNATION)}};function gA(t){let e=new Array(t);for(let r=0;r<t;r++)e[r]=[];return e}function Fh(t){let e=[""];for(let r=0;r<t.length;r++){let n=t[r],i=[];for(let o=0;o<e.length;o++){let s=e[o];i.push(s+"_"+n.tokenTypeIdx);for(let a=0;a<n.categoryMatches.length;a++){let l="_"+n.categoryMatches[a];i.push(s+l)}}e=i}return e}function D1(t,e,r){for(let n=0;n<t.length;n++){if(n===r)continue;let i=t[n];for(let o=0;o<e.length;o++){let s=e[o];if(i[s]===!0)return!1}}return!0}function xA(t,e){let r=L(t,s=>If([s],1)),n=gA(r.length),i=L(r,s=>{let a={};return G(s,l=>{let u=Fh(l.partialPath);G(u,c=>{a[c]=!0})}),a}),o=r;for(let s=1;s<=e;s++){let a=o;o=gA(a.length);for(let l=0;l<a.length;l++){let u=a[l];for(let c=0;c<u.length;c++){let f=u[c].partialPath,m=u[c].suffixDef,T=Fh(f);if(D1(i,T,l)||se(m)||f.length===e){let C=n[l];if(Lf(C,f)===!1){C.push(f);for(let _=0;_<T.length;_++){let w=T[_];i[l][w]=!0}}}else{let C=If(m,s+1,f);o[l]=o[l].concat(C),G(C,_=>{let w=Fh(_.partialPath);G(w,v=>{i[l][v]=!0})})}}}}return n}function ia(t,e,r,n){let i=new Df(t,rt.ALTERNATION,n);return e.accept(i),xA(i.result,r)}function oa(t,e,r,n){let i=new Df(t,r);e.accept(i);let o=i.result,a=new Uh(e,t,r).startWalking(),l=new Be({definition:o}),u=new Be({definition:a});return xA([l,u],n)}function Lf(t,e){e:for(let r=0;r<t.length;r++){let n=t[r];if(n.length===e.length){for(let i=0;i<n.length;i++){let o=e[i],s=n[i];if((o===s||s.categoryMatchesMap[o.tokenTypeIdx]!==void 0)===!1)continue e}return!0}}return!1}function SA(t,e){return t.length<e.length&&ar(t,(r,n)=>{let i=e[n];return r===i||i.categoryMatchesMap[r.tokenTypeIdx]})}function bA(t){return ar(t,e=>ar(e,r=>ar(r,n=>se(n.categoryMatches))))}function AA(t){let e=t.lookaheadStrategy.validate({rules:t.rules,tokenTypes:t.tokenTypes,grammarName:t.grammarName});return L(e,r=>Object.assign({type:Ot.CUSTOM_LOOKAHEAD_VALIDATION},r))}function CA(t,e,r,n){let i=Qt(t,l=>O1(l,r)),o=G1(t,e,r),s=Qt(t,l=>F1(l,r)),a=Qt(t,l=>M1(l,t,n,r));return i.concat(o,s,a)}function O1(t,e){let r=new qh;t.accept(r);let n=r.allProductions,i=Ah(n,L1),o=wr(i,a=>a.length>1);return L(Pe(o),a=>{let l=qt(a),u=e.buildDuplicateFoundError(t,a),c=kr(l),f={message:u,type:Ot.DUPLICATE_PRODUCTIONS,ruleName:t.name,dslName:c,occurrence:l.idx},m=wA(l);return m&&(f.parameter=m),f})}function L1(t){return`${kr(t)}_#_${t.idx}_#_${wA(t)}`}function wA(t){return t instanceof ae?t.terminalType.name:t instanceof we?t.nonTerminalName:""}var qh=class extends yr{constructor(){super(...arguments),this.allProductions=[]}visitNonTerminal(e){this.allProductions.push(e)}visitOption(e){this.allProductions.push(e)}visitRepetitionWithSeparator(e){this.allProductions.push(e)}visitRepetitionMandatory(e){this.allProductions.push(e)}visitRepetitionMandatoryWithSeparator(e){this.allProductions.push(e)}visitRepetition(e){this.allProductions.push(e)}visitAlternation(e){this.allProductions.push(e)}visitTerminal(e){this.allProductions.push(e)}};function M1(t,e,r,n){let i=[];if(lt(e,(s,a)=>a.name===t.name?s+1:s,0)>1){let s=n.buildDuplicateRuleNameError({topLevelRule:t,grammarName:r});i.push({message:s,type:Ot.DUPLICATE_RULE_NAME,ruleName:t.name})}return i}function kA(t,e,r){let n=[],i;return et(e,t)||(i=`Invalid rule override, rule: ->${t}<- cannot be overridden in the grammar: ->${r}<-as it is not defined in any of the super grammars `,n.push({message:i,type:Ot.INVALID_RULE_OVERRIDE,ruleName:t})),n}function jh(t,e,r,n=[]){let i=[],o=Mf(e.definition);if(se(o))return[];{let s=t.name;et(o,t)&&i.push({message:r.buildLeftRecursionError({topLevelRule:t,leftRecursionPath:n}),type:Ot.LEFT_RECURSION,ruleName:s});let l=Wi(o,n.concat([t])),u=Qt(l,c=>{let f=We(n);return f.push(c),jh(t,c,r,f)});return i.concat(u)}}function Mf(t){let e=[];if(se(t))return e;let r=qt(t);if(r instanceof we)e.push(r.referencedRule);else if(r instanceof Be||r instanceof ke||r instanceof ze||r instanceof Ve||r instanceof Me||r instanceof pe)e=e.concat(Mf(r.definition));else if(r instanceof Fe)e=yt(L(r.definition,o=>Mf(o.definition)));else if(!(r instanceof ae))throw Error("non exhaustive match");let n=Co(r),i=t.length>1;if(n&&i){let o=Tt(t);return e.concat(Mf(o))}else return e}var Cl=class extends yr{constructor(){super(...arguments),this.alternations=[]}visitAlternation(e){this.alternations.push(e)}};function EA(t,e){let r=new Cl;t.accept(r);let n=r.alternations;return Qt(n,o=>{let s=ci(o.definition);return Qt(s,(a,l)=>{let u=Pf([a],[],di,1);return se(u)?[{message:e.buildEmptyAlternationError({topLevelRule:t,alternation:o,emptyChoiceIdx:l}),type:Ot.NONE_LAST_EMPTY_ALT,ruleName:t.name,occurrence:o.idx,alternative:l+1}]:[]})})}function $A(t,e,r){let n=new Cl;t.accept(n);let i=n.alternations;return i=Bi(i,s=>s.ignoreAmbiguities===!0),Qt(i,s=>{let a=s.idx,l=s.maxLookahead||e,u=ia(a,t,l,s),c=U1(u,s,t,r),f=q1(u,s,t,r);return c.concat(f)})}var Gh=class extends yr{constructor(){super(...arguments),this.allProductions=[]}visitRepetitionWithSeparator(e){this.allProductions.push(e)}visitRepetitionMandatory(e){this.allProductions.push(e)}visitRepetitionMandatoryWithSeparator(e){this.allProductions.push(e)}visitRepetition(e){this.allProductions.push(e)}};function F1(t,e){let r=new Cl;t.accept(r);let n=r.alternations;return Qt(n,o=>o.definition.length>255?[{message:e.buildTooManyAlternativesError({topLevelRule:t,alternation:o}),type:Ot.TOO_MANY_ALTS,ruleName:t.name,occurrence:o.idx}]:[])}function _A(t,e,r){let n=[];return G(t,i=>{let o=new Gh;i.accept(o);let s=o.allProductions;G(s,a=>{let l=Al(a),u=a.maxLookahead||e,c=a.idx,m=oa(c,i,l,u)[0];if(se(yt(m))){let T=r.buildEmptyRepetitionError({topLevelRule:i,repetition:a});n.push({message:T,type:Ot.NO_NON_EMPTY_LOOKAHEAD,ruleName:i.name})}})}),n}function U1(t,e,r,n){let i=[],o=lt(t,(a,l,u)=>(e.definition[u].ignoreAmbiguities===!0||G(l,c=>{let f=[u];G(t,(m,T)=>{u!==T&&Lf(m,c)&&e.definition[T].ignoreAmbiguities!==!0&&f.push(T)}),f.length>1&&!Lf(i,c)&&(i.push(c),a.push({alts:f,path:c}))}),a),[]);return L(o,a=>{let l=L(a.alts,c=>c+1);return{message:n.buildAlternationAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:l,prefixPath:a.path}),type:Ot.AMBIGUOUS_ALTS,ruleName:r.name,occurrence:e.idx,alternatives:a.alts}})}function q1(t,e,r,n){let i=lt(t,(s,a,l)=>{let u=L(a,c=>({idx:l,path:c}));return s.concat(u)},[]);return Mn(Qt(i,s=>{if(e.definition[s.idx].ignoreAmbiguities===!0)return[];let l=s.idx,u=s.path,c=Ut(i,m=>e.definition[m.idx].ignoreAmbiguities!==!0&&m.idx<l&&SA(m.path,u));return L(c,m=>{let T=[m.idx+1,l+1],b=e.idx===0?"":e.idx;return{message:n.buildAlternationPrefixAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:T,prefixPath:m.path}),type:Ot.AMBIGUOUS_PREFIX_ALTS,ruleName:r.name,occurrence:b,alternatives:T}})}))}function G1(t,e,r){let n=[],i=L(e,o=>o.name);return G(t,o=>{let s=o.name;if(et(i,s)){let a=r.buildNamespaceConflictError(o);n.push({message:a,type:Ot.CONFLICT_TOKENS_RULES_NAMESPACE,ruleName:s})}}),n}function NA(t){let e=Xs(t,{errMsgProvider:mA}),r={};return G(t.rules,n=>{r[n.name]=n}),hA(r,e.errMsgProvider)}function IA(t){return t=Xs(t,{errMsgProvider:Tn}),CA(t.rules,t.tokenTypes,t.errMsgProvider,t.grammarName)}var PA="MismatchedTokenException",DA="NoViableAltException",OA="EarlyExitException",LA="NotAllInputParsedException",MA=[PA,DA,OA,LA];Object.freeze(MA);function zi(t){return et(MA,t.name)}var sa=class extends Error{constructor(e,r){super(e),this.token=r,this.resyncedTokens=[],Object.setPrototypeOf(this,new.target.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}},$o=class extends sa{constructor(e,r,n){super(e,r),this.previousToken=n,this.name=PA}},wl=class extends sa{constructor(e,r,n){super(e,r),this.previousToken=n,this.name=DA}},kl=class extends sa{constructor(e,r){super(e,r),this.name=LA}},El=class extends sa{constructor(e,r,n){super(e,r),this.previousToken=n,this.name=OA}};var Hh={},Wh="InRuleRecoveryException",Kh=class extends Error{constructor(e){super(e),this.name=Wh}},Ff=class{initRecoverable(e){this.firstAfterRepMap={},this.resyncFollows={},this.recoveryEnabled=W(e,"recoveryEnabled")?e.recoveryEnabled:Tr.recoveryEnabled,this.recoveryEnabled&&(this.attemptInRepetitionRecovery=j1)}getTokenToInsert(e){let r=Eo(e,"",NaN,NaN,NaN,NaN,NaN,NaN);return r.isInsertedInRecovery=!0,r}canTokenTypeBeInsertedInRecovery(e){return!0}canTokenTypeBeDeletedInRecovery(e){return!0}tryInRepetitionRecovery(e,r,n,i){let o=this.findReSyncTokenType(),s=this.exportLexerState(),a=[],l=!1,u=this.LA(1),c=this.LA(1),f=()=>{let m=this.LA(0),T=this.errorMessageProvider.buildMismatchTokenMessage({expected:i,actual:u,previous:m,ruleName:this.getCurrRuleFullName()}),b=new $o(T,u,this.LA(0));b.resyncedTokens=ci(a),this.SAVE_ERROR(b)};for(;!l;)if(this.tokenMatcher(c,i)){f();return}else if(n.call(this)){f(),e.apply(this,r);return}else this.tokenMatcher(c,o)?l=!0:(c=this.SKIP_TOKEN(),this.addToResyncTokens(c,a));this.importLexerState(s)}shouldInRepetitionRecoveryBeTried(e,r,n){return!(n===!1||this.tokenMatcher(this.LA(1),e)||this.isBackTracking()||this.canPerformInRuleRecovery(e,this.getFollowsForInRuleRecovery(e,r)))}getFollowsForInRuleRecovery(e,r){let n=this.getCurrentGrammarPath(e,r);return this.getNextPossibleTokenTypes(n)}tryInRuleRecovery(e,r){if(this.canRecoverWithSingleTokenInsertion(e,r))return this.getTokenToInsert(e);if(this.canRecoverWithSingleTokenDeletion(e)){let n=this.SKIP_TOKEN();return this.consumeToken(),n}throw new Kh("sad sad panda")}canPerformInRuleRecovery(e,r){return this.canRecoverWithSingleTokenInsertion(e,r)||this.canRecoverWithSingleTokenDeletion(e)}canRecoverWithSingleTokenInsertion(e,r){if(!this.canTokenTypeBeInsertedInRecovery(e)||se(r))return!1;let n=this.LA(1);return Un(r,o=>this.tokenMatcher(n,o))!==void 0}canRecoverWithSingleTokenDeletion(e){return this.canTokenTypeBeDeletedInRecovery(e)?this.tokenMatcher(this.LA(2),e):!1}isInCurrentRuleReSyncSet(e){let r=this.getCurrFollowKey(),n=this.getFollowSetFromFollowKey(r);return et(n,e)}findReSyncTokenType(){let e=this.flattenFollowSet(),r=this.LA(1),n=2;for(;;){let i=Un(e,o=>xl(r,o));if(i!==void 0)return i;r=this.LA(n),n++}}getCurrFollowKey(){if(this.RULE_STACK.length===1)return Hh;let e=this.getLastExplicitRuleShortName(),r=this.getLastExplicitRuleOccurrenceIndex(),n=this.getPreviousExplicitRuleShortName();return{ruleName:this.shortRuleNameToFullName(e),idxInCallingRule:r,inRule:this.shortRuleNameToFullName(n)}}buildFullFollowKeyStack(){let e=this.RULE_STACK,r=this.RULE_OCCURRENCE_STACK;return L(e,(n,i)=>i===0?Hh:{ruleName:this.shortRuleNameToFullName(n),idxInCallingRule:r[i],inRule:this.shortRuleNameToFullName(e[i-1])})}flattenFollowSet(){let e=L(this.buildFullFollowKeyStack(),r=>this.getFollowSetFromFollowKey(r));return yt(e)}getFollowSetFromFollowKey(e){if(e===Hh)return[yn];let r=e.ruleName+e.idxInCallingRule+Sf+e.inRule;return this.resyncFollows[r]}addToResyncTokens(e,r){return this.tokenMatcher(e,yn)||r.push(e),r}reSyncTo(e){let r=[],n=this.LA(1);for(;this.tokenMatcher(n,e)===!1;)n=this.SKIP_TOKEN(),this.addToResyncTokens(n,r);return ci(r)}attemptInRepetitionRecovery(e,r,n,i,o,s,a){}getCurrentGrammarPath(e,r){let n=this.getHumanReadableRuleStack(),i=We(this.RULE_OCCURRENCE_STACK);return{ruleStack:n,occurrenceStack:i,lastTok:e,lastTokOccurrence:r}}getHumanReadableRuleStack(){return L(this.RULE_STACK,e=>this.shortRuleNameToFullName(e))}};function j1(t,e,r,n,i,o,s){let a=this.getKeyForAutomaticLookahead(n,i),l=this.firstAfterRepMap[a];if(l===void 0){let m=this.getCurrRuleFullName(),T=this.getGAstProductions()[m];l=new o(T,i).startWalking(),this.firstAfterRepMap[a]=l}let u=l.token,c=l.occurrence,f=l.isEndOfRule;this.RULE_STACK.length===1&&f&&u===void 0&&(u=yn,c=1),!(u===void 0||c===void 0)&&this.shouldInRepetitionRecoveryBeTried(u,c,s)&&this.tryInRepetitionRecovery(t,e,r,u)}function Uf(t,e,r){return r|e|t}var Kte=32-8;var gi=class{constructor(e){var r;this.maxLookahead=(r=e?.maxLookahead)!==null&&r!==void 0?r:Tr.maxLookahead}validate(e){let r=this.validateNoLeftRecursion(e.rules);if(se(r)){let n=this.validateEmptyOrAlternatives(e.rules),i=this.validateAmbiguousAlternationAlternatives(e.rules,this.maxLookahead),o=this.validateSomeNonEmptyLookaheadPath(e.rules,this.maxLookahead);return[...r,...n,...i,...o]}return r}validateNoLeftRecursion(e){return Qt(e,r=>jh(r,r,Tn))}validateEmptyOrAlternatives(e){return Qt(e,r=>EA(r,Tn))}validateAmbiguousAlternationAlternatives(e,r){return Qt(e,n=>$A(n,r,Tn))}validateSomeNonEmptyLookaheadPath(e,r){return _A(e,r,Tn)}buildLookaheadForAlternation(e){return yA(e.prodOccurrence,e.rule,e.maxLookahead,e.hasPredicates,e.dynamicTokensEnabled,vA)}buildLookaheadForOptional(e){return TA(e.prodOccurrence,e.rule,e.maxLookahead,e.dynamicTokensEnabled,Al(e.prodType),RA)}};var Gf=class{initLooksAhead(e){this.dynamicTokensEnabled=W(e,"dynamicTokensEnabled")?e.dynamicTokensEnabled:Tr.dynamicTokensEnabled,this.maxLookahead=W(e,"maxLookahead")?e.maxLookahead:Tr.maxLookahead,this.lookaheadStrategy=W(e,"lookaheadStrategy")?e.lookaheadStrategy:new gi({maxLookahead:this.maxLookahead}),this.lookAheadFuncsCache=new Map}preComputeLookaheadFunctions(e){G(e,r=>{this.TRACE_INIT(`${r.name} Rule Lookahead`,()=>{let{alternation:n,repetition:i,option:o,repetitionMandatory:s,repetitionMandatoryWithSeparator:a,repetitionWithSeparator:l}=H1(r);G(n,u=>{let c=u.idx===0?"":u.idx;this.TRACE_INIT(`${kr(u)}${c}`,()=>{let f=this.lookaheadStrategy.buildLookaheadForAlternation({prodOccurrence:u.idx,rule:r,maxLookahead:u.maxLookahead||this.maxLookahead,hasPredicates:u.hasPredicates,dynamicTokensEnabled:this.dynamicTokensEnabled}),m=Uf(this.fullRuleNameToShort[r.name],256,u.idx);this.setLaFuncCache(m,f)})}),G(i,u=>{this.computeLookaheadFunc(r,u.idx,768,"Repetition",u.maxLookahead,kr(u))}),G(o,u=>{this.computeLookaheadFunc(r,u.idx,512,"Option",u.maxLookahead,kr(u))}),G(s,u=>{this.computeLookaheadFunc(r,u.idx,1024,"RepetitionMandatory",u.maxLookahead,kr(u))}),G(a,u=>{this.computeLookaheadFunc(r,u.idx,1536,"RepetitionMandatoryWithSeparator",u.maxLookahead,kr(u))}),G(l,u=>{this.computeLookaheadFunc(r,u.idx,1280,"RepetitionWithSeparator",u.maxLookahead,kr(u))})})})}computeLookaheadFunc(e,r,n,i,o,s){this.TRACE_INIT(`${s}${r===0?"":r}`,()=>{let a=this.lookaheadStrategy.buildLookaheadForOptional({prodOccurrence:r,rule:e,maxLookahead:o||this.maxLookahead,dynamicTokensEnabled:this.dynamicTokensEnabled,prodType:i}),l=Uf(this.fullRuleNameToShort[e.name],n,r);this.setLaFuncCache(l,a)})}getKeyForAutomaticLookahead(e,r){let n=this.getLastExplicitRuleShortName();return Uf(n,e,r)}getLaFuncFromCache(e){return this.lookAheadFuncsCache.get(e)}setLaFuncCache(e,r){this.lookAheadFuncsCache.set(e,r)}},Bh=class extends yr{constructor(){super(...arguments),this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}}reset(){this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}}visitOption(e){this.dslMethods.option.push(e)}visitRepetitionWithSeparator(e){this.dslMethods.repetitionWithSeparator.push(e)}visitRepetitionMandatory(e){this.dslMethods.repetitionMandatory.push(e)}visitRepetitionMandatoryWithSeparator(e){this.dslMethods.repetitionMandatoryWithSeparator.push(e)}visitRepetition(e){this.dslMethods.repetition.push(e)}visitAlternation(e){this.dslMethods.alternation.push(e)}},qf=new Bh;function H1(t){qf.reset(),t.accept(qf);let e=qf.dslMethods;return qf.reset(),e}function Xh(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.endOffset=e.endOffset):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset)}function Yh(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.startColumn=e.startColumn,t.startLine=e.startLine,t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine)}function FA(t,e,r){t.children[r]===void 0?t.children[r]=[e]:t.children[r].push(e)}function UA(t,e,r){t.children[e]===void 0?t.children[e]=[r]:t.children[e].push(r)}var K1="name";function Jh(t,e){Object.defineProperty(t,K1,{enumerable:!1,configurable:!0,writable:!1,value:e})}function W1(t,e){let r=He(t),n=r.length;for(let i=0;i<n;i++){let o=r[i],s=t[o],a=s.length;for(let l=0;l<a;l++){let u=s[l];u.tokenTypeIdx===void 0&&this[u.name](u.children,e)}}}function qA(t,e){let r=function(){};Jh(r,t+"BaseSemantics");let n={visit:function(i,o){if(z(i)&&(i=i[0]),!lr(i))return this[i.name](i.children,o)},validateVisitor:function(){let i=B1(this,e);if(!se(i)){let o=L(i,s=>s.msg);throw Error(`Errors Detected in CST Visitor <${this.constructor.name}>:
	${o.join(`

`).replace(/\n/g,`
	`)}`)}}};return r.prototype=n,r.prototype.constructor=r,r._RULE_NAMES=e,r}function GA(t,e,r){let n=function(){};Jh(n,t+"BaseSemanticsWithDefaults");let i=Object.create(r.prototype);return G(e,o=>{i[o]=W1}),n.prototype=i,n.prototype.constructor=n,n}var Qh;(function(t){t[t.REDUNDANT_METHOD=0]="REDUNDANT_METHOD",t[t.MISSING_METHOD=1]="MISSING_METHOD"})(Qh||(Qh={}));function B1(t,e){return z1(t,e)}function z1(t,e){let r=Ut(e,i=>hr(t[i])===!1),n=L(r,i=>({msg:`Missing visitor method: <${i}> on ${t.constructor.name} CST Visitor.`,type:Qh.MISSING_METHOD,methodName:i}));return Mn(n)}var Wf=class{initTreeBuilder(e){if(this.CST_STACK=[],this.outputCst=e.outputCst,this.nodeLocationTracking=W(e,"nodeLocationTracking")?e.nodeLocationTracking:Tr.nodeLocationTracking,!this.outputCst)this.cstInvocationStateUpdate=at,this.cstFinallyStateUpdate=at,this.cstPostTerminal=at,this.cstPostNonTerminal=at,this.cstPostRule=at;else if(/full/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=Yh,this.setNodeLocationFromNode=Yh,this.cstPostRule=at,this.setInitialNodeLocation=this.setInitialNodeLocationFullRecovery):(this.setNodeLocationFromToken=at,this.setNodeLocationFromNode=at,this.cstPostRule=this.cstPostRuleFull,this.setInitialNodeLocation=this.setInitialNodeLocationFullRegular);else if(/onlyOffset/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=Xh,this.setNodeLocationFromNode=Xh,this.cstPostRule=at,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRecovery):(this.setNodeLocationFromToken=at,this.setNodeLocationFromNode=at,this.cstPostRule=this.cstPostRuleOnlyOffset,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRegular);else if(/none/i.test(this.nodeLocationTracking))this.setNodeLocationFromToken=at,this.setNodeLocationFromNode=at,this.cstPostRule=at,this.setInitialNodeLocation=at;else throw Error(`Invalid <nodeLocationTracking> config option: "${e.nodeLocationTracking}"`)}setInitialNodeLocationOnlyOffsetRecovery(e){e.location={startOffset:NaN,endOffset:NaN}}setInitialNodeLocationOnlyOffsetRegular(e){e.location={startOffset:this.LA(1).startOffset,endOffset:NaN}}setInitialNodeLocationFullRecovery(e){e.location={startOffset:NaN,startLine:NaN,startColumn:NaN,endOffset:NaN,endLine:NaN,endColumn:NaN}}setInitialNodeLocationFullRegular(e){let r=this.LA(1);e.location={startOffset:r.startOffset,startLine:r.startLine,startColumn:r.startColumn,endOffset:NaN,endLine:NaN,endColumn:NaN}}cstInvocationStateUpdate(e){let r={name:e,children:Object.create(null)};this.setInitialNodeLocation(r),this.CST_STACK.push(r)}cstFinallyStateUpdate(){this.CST_STACK.pop()}cstPostRuleFull(e){let r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?(n.endOffset=r.endOffset,n.endLine=r.endLine,n.endColumn=r.endColumn):(n.startOffset=NaN,n.startLine=NaN,n.startColumn=NaN)}cstPostRuleOnlyOffset(e){let r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?n.endOffset=r.endOffset:n.startOffset=NaN}cstPostTerminal(e,r){let n=this.CST_STACK[this.CST_STACK.length-1];FA(n,r,e),this.setNodeLocationFromToken(n.location,r)}cstPostNonTerminal(e,r){let n=this.CST_STACK[this.CST_STACK.length-1];UA(n,r,e),this.setNodeLocationFromNode(n.location,e.location)}getBaseCstVisitorConstructor(){if(lr(this.baseCstVisitorConstructor)){let e=qA(this.className,He(this.gastProductionsCache));return this.baseCstVisitorConstructor=e,e}return this.baseCstVisitorConstructor}getBaseCstVisitorConstructorWithDefaults(){if(lr(this.baseCstVisitorWithDefaultsConstructor)){let e=GA(this.className,He(this.gastProductionsCache),this.getBaseCstVisitorConstructor());return this.baseCstVisitorWithDefaultsConstructor=e,e}return this.baseCstVisitorWithDefaultsConstructor}getLastExplicitRuleShortName(){let e=this.RULE_STACK;return e[e.length-1]}getPreviousExplicitRuleShortName(){let e=this.RULE_STACK;return e[e.length-2]}getLastExplicitRuleOccurrenceIndex(){let e=this.RULE_OCCURRENCE_STACK;return e[e.length-1]}};var Bf=class{initLexerAdapter(){this.tokVector=[],this.tokVectorLength=0,this.currIdx=-1}set input(e){if(this.selfAnalysisDone!==!0)throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");this.reset(),this.tokVector=e,this.tokVectorLength=e.length}get input(){return this.tokVector}SKIP_TOKEN(){return this.currIdx<=this.tokVector.length-2?(this.consumeToken(),this.LA(1)):aa}LA(e){let r=this.currIdx+e;return r<0||this.tokVectorLength<=r?aa:this.tokVector[r]}consumeToken(){this.currIdx++}exportLexerState(){return this.currIdx}importLexerState(e){this.currIdx=e}resetLexerState(){this.currIdx=-1}moveToTerminatedState(){this.currIdx=this.tokVector.length-1}getLexerPosition(){return this.exportLexerState()}};var zf=class{ACTION(e){return e.call(this)}consume(e,r,n){return this.consumeInternal(r,e,n)}subrule(e,r,n){return this.subruleInternal(r,e,n)}option(e,r){return this.optionInternal(r,e)}or(e,r){return this.orInternal(r,e)}many(e,r){return this.manyInternal(e,r)}atLeastOne(e,r){return this.atLeastOneInternal(e,r)}CONSUME(e,r){return this.consumeInternal(e,0,r)}CONSUME1(e,r){return this.consumeInternal(e,1,r)}CONSUME2(e,r){return this.consumeInternal(e,2,r)}CONSUME3(e,r){return this.consumeInternal(e,3,r)}CONSUME4(e,r){return this.consumeInternal(e,4,r)}CONSUME5(e,r){return this.consumeInternal(e,5,r)}CONSUME6(e,r){return this.consumeInternal(e,6,r)}CONSUME7(e,r){return this.consumeInternal(e,7,r)}CONSUME8(e,r){return this.consumeInternal(e,8,r)}CONSUME9(e,r){return this.consumeInternal(e,9,r)}SUBRULE(e,r){return this.subruleInternal(e,0,r)}SUBRULE1(e,r){return this.subruleInternal(e,1,r)}SUBRULE2(e,r){return this.subruleInternal(e,2,r)}SUBRULE3(e,r){return this.subruleInternal(e,3,r)}SUBRULE4(e,r){return this.subruleInternal(e,4,r)}SUBRULE5(e,r){return this.subruleInternal(e,5,r)}SUBRULE6(e,r){return this.subruleInternal(e,6,r)}SUBRULE7(e,r){return this.subruleInternal(e,7,r)}SUBRULE8(e,r){return this.subruleInternal(e,8,r)}SUBRULE9(e,r){return this.subruleInternal(e,9,r)}OPTION(e){return this.optionInternal(e,0)}OPTION1(e){return this.optionInternal(e,1)}OPTION2(e){return this.optionInternal(e,2)}OPTION3(e){return this.optionInternal(e,3)}OPTION4(e){return this.optionInternal(e,4)}OPTION5(e){return this.optionInternal(e,5)}OPTION6(e){return this.optionInternal(e,6)}OPTION7(e){return this.optionInternal(e,7)}OPTION8(e){return this.optionInternal(e,8)}OPTION9(e){return this.optionInternal(e,9)}OR(e){return this.orInternal(e,0)}OR1(e){return this.orInternal(e,1)}OR2(e){return this.orInternal(e,2)}OR3(e){return this.orInternal(e,3)}OR4(e){return this.orInternal(e,4)}OR5(e){return this.orInternal(e,5)}OR6(e){return this.orInternal(e,6)}OR7(e){return this.orInternal(e,7)}OR8(e){return this.orInternal(e,8)}OR9(e){return this.orInternal(e,9)}MANY(e){this.manyInternal(0,e)}MANY1(e){this.manyInternal(1,e)}MANY2(e){this.manyInternal(2,e)}MANY3(e){this.manyInternal(3,e)}MANY4(e){this.manyInternal(4,e)}MANY5(e){this.manyInternal(5,e)}MANY6(e){this.manyInternal(6,e)}MANY7(e){this.manyInternal(7,e)}MANY8(e){this.manyInternal(8,e)}MANY9(e){this.manyInternal(9,e)}MANY_SEP(e){this.manySepFirstInternal(0,e)}MANY_SEP1(e){this.manySepFirstInternal(1,e)}MANY_SEP2(e){this.manySepFirstInternal(2,e)}MANY_SEP3(e){this.manySepFirstInternal(3,e)}MANY_SEP4(e){this.manySepFirstInternal(4,e)}MANY_SEP5(e){this.manySepFirstInternal(5,e)}MANY_SEP6(e){this.manySepFirstInternal(6,e)}MANY_SEP7(e){this.manySepFirstInternal(7,e)}MANY_SEP8(e){this.manySepFirstInternal(8,e)}MANY_SEP9(e){this.manySepFirstInternal(9,e)}AT_LEAST_ONE(e){this.atLeastOneInternal(0,e)}AT_LEAST_ONE1(e){return this.atLeastOneInternal(1,e)}AT_LEAST_ONE2(e){this.atLeastOneInternal(2,e)}AT_LEAST_ONE3(e){this.atLeastOneInternal(3,e)}AT_LEAST_ONE4(e){this.atLeastOneInternal(4,e)}AT_LEAST_ONE5(e){this.atLeastOneInternal(5,e)}AT_LEAST_ONE6(e){this.atLeastOneInternal(6,e)}AT_LEAST_ONE7(e){this.atLeastOneInternal(7,e)}AT_LEAST_ONE8(e){this.atLeastOneInternal(8,e)}AT_LEAST_ONE9(e){this.atLeastOneInternal(9,e)}AT_LEAST_ONE_SEP(e){this.atLeastOneSepFirstInternal(0,e)}AT_LEAST_ONE_SEP1(e){this.atLeastOneSepFirstInternal(1,e)}AT_LEAST_ONE_SEP2(e){this.atLeastOneSepFirstInternal(2,e)}AT_LEAST_ONE_SEP3(e){this.atLeastOneSepFirstInternal(3,e)}AT_LEAST_ONE_SEP4(e){this.atLeastOneSepFirstInternal(4,e)}AT_LEAST_ONE_SEP5(e){this.atLeastOneSepFirstInternal(5,e)}AT_LEAST_ONE_SEP6(e){this.atLeastOneSepFirstInternal(6,e)}AT_LEAST_ONE_SEP7(e){this.atLeastOneSepFirstInternal(7,e)}AT_LEAST_ONE_SEP8(e){this.atLeastOneSepFirstInternal(8,e)}AT_LEAST_ONE_SEP9(e){this.atLeastOneSepFirstInternal(9,e)}RULE(e,r,n=la){if(et(this.definedRulesNames,e)){let s={message:Tn.buildDuplicateRuleNameError({topLevelRule:e,grammarName:this.className}),type:Ot.DUPLICATE_RULE_NAME,ruleName:e};this.definitionErrors.push(s)}this.definedRulesNames.push(e);let i=this.defineRule(e,r,n);return this[e]=i,i}OVERRIDE_RULE(e,r,n=la){let i=kA(e,this.definedRulesNames,this.className);this.definitionErrors=this.definitionErrors.concat(i);let o=this.defineRule(e,r,n);return this[e]=o,o}BACKTRACK(e,r){return function(){this.isBackTrackingStack.push(1);let n=this.saveRecogState();try{return e.apply(this,r),!0}catch(i){if(zi(i))return!1;throw i}finally{this.reloadRecogState(n),this.isBackTrackingStack.pop()}}}getGAstProductions(){return this.gastProductionsCache}getSerializedGastProductions(){return xf(Pe(this.gastProductionsCache))}};var Vf=class{initRecognizerEngine(e,r){if(this.className=this.constructor.name,this.shortRuleNameToFull={},this.fullRuleNameToShort={},this.ruleShortNameIdx=256,this.tokenMatcher=ra,this.subruleIdx=0,this.definedRulesNames=[],this.tokensMap={},this.isBackTrackingStack=[],this.RULE_STACK=[],this.RULE_OCCURRENCE_STACK=[],this.gastProductionsCache={},W(r,"serializedGrammar"))throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`);if(z(e)){if(se(e))throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`);if(typeof e[0].startOffset=="number")throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`)}if(z(e))this.tokensMap=lt(e,(o,s)=>(o[s.name]=s,o),{});else if(W(e,"modes")&&ar(yt(Pe(e.modes)),oA)){let o=yt(Pe(e.modes)),s=Ys(o);this.tokensMap=lt(s,(a,l)=>(a[l.name]=l,a),{})}else if(st(e))this.tokensMap=We(e);else throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");this.tokensMap.EOF=yn;let n=W(e,"modes")?yt(Pe(e.modes)):Pe(e),i=ar(n,o=>se(o.categoryMatches));this.tokenMatcher=i?ra:di,pi(Pe(this.tokensMap))}defineRule(e,r,n){if(this.selfAnalysisDone)throw Error(`Grammar rule <${e}> may not be defined after the 'performSelfAnalysis' method has been called'
Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.`);let i=W(n,"resyncEnabled")?n.resyncEnabled:la.resyncEnabled,o=W(n,"recoveryValueFunc")?n.recoveryValueFunc:la.recoveryValueFunc,s=this.ruleShortNameIdx<<4+8;this.ruleShortNameIdx++,this.shortRuleNameToFull[s]=e,this.fullRuleNameToShort[e]=s;let a;return this.outputCst===!0?a=function(...c){try{this.ruleInvocationStateUpdate(s,e,this.subruleIdx),r.apply(this,c);let f=this.CST_STACK[this.CST_STACK.length-1];return this.cstPostRule(f),f}catch(f){return this.invokeRuleCatch(f,i,o)}finally{this.ruleFinallyStateUpdate()}}:a=function(...c){try{return this.ruleInvocationStateUpdate(s,e,this.subruleIdx),r.apply(this,c)}catch(f){return this.invokeRuleCatch(f,i,o)}finally{this.ruleFinallyStateUpdate()}},Object.assign(a,{ruleName:e,originalGrammarAction:r})}invokeRuleCatch(e,r,n){let i=this.RULE_STACK.length===1,o=r&&!this.isBackTracking()&&this.recoveryEnabled;if(zi(e)){let s=e;if(o){let a=this.findReSyncTokenType();if(this.isInCurrentRuleReSyncSet(a))if(s.resyncedTokens=this.reSyncTo(a),this.outputCst){let l=this.CST_STACK[this.CST_STACK.length-1];return l.recoveredNode=!0,l}else return n(e);else{if(this.outputCst){let l=this.CST_STACK[this.CST_STACK.length-1];l.recoveredNode=!0,s.partialCstResult=l}throw s}}else{if(i)return this.moveToTerminatedState(),n(e);throw s}}else throw e}optionInternal(e,r){let n=this.getKeyForAutomaticLookahead(512,r);return this.optionInternalLogic(e,r,n)}optionInternalLogic(e,r,n){let i=this.getLaFuncFromCache(n),o;if(typeof e!="function"){o=e.DEF;let s=e.GATE;if(s!==void 0){let a=i;i=()=>s.call(this)&&a.call(this)}}else o=e;if(i.call(this)===!0)return o.call(this)}atLeastOneInternal(e,r){let n=this.getKeyForAutomaticLookahead(1024,e);return this.atLeastOneInternalLogic(e,r,n)}atLeastOneInternalLogic(e,r,n){let i=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;let s=r.GATE;if(s!==void 0){let a=i;i=()=>s.call(this)&&a.call(this)}}else o=r;if(i.call(this)===!0){let s=this.doSingleRepetition(o);for(;i.call(this)===!0&&s===!0;)s=this.doSingleRepetition(o)}else throw this.raiseEarlyExitException(e,rt.REPETITION_MANDATORY,r.ERR_MSG);this.attemptInRepetitionRecovery(this.atLeastOneInternal,[e,r],i,1024,e,Nf)}atLeastOneSepFirstInternal(e,r){let n=this.getKeyForAutomaticLookahead(1536,e);this.atLeastOneSepFirstInternalLogic(e,r,n)}atLeastOneSepFirstInternalLogic(e,r,n){let i=r.DEF,o=r.SEP;if(this.getLaFuncFromCache(n).call(this)===!0){i.call(this);let a=()=>this.tokenMatcher(this.LA(1),o);for(;this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,a,i,bl],a,1536,e,bl)}else throw this.raiseEarlyExitException(e,rt.REPETITION_MANDATORY_WITH_SEPARATOR,r.ERR_MSG)}manyInternal(e,r){let n=this.getKeyForAutomaticLookahead(768,e);return this.manyInternalLogic(e,r,n)}manyInternalLogic(e,r,n){let i=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;let a=r.GATE;if(a!==void 0){let l=i;i=()=>a.call(this)&&l.call(this)}}else o=r;let s=!0;for(;i.call(this)===!0&&s===!0;)s=this.doSingleRepetition(o);this.attemptInRepetitionRecovery(this.manyInternal,[e,r],i,768,e,_f,s)}manySepFirstInternal(e,r){let n=this.getKeyForAutomaticLookahead(1280,e);this.manySepFirstInternalLogic(e,r,n)}manySepFirstInternalLogic(e,r,n){let i=r.DEF,o=r.SEP;if(this.getLaFuncFromCache(n).call(this)===!0){i.call(this);let a=()=>this.tokenMatcher(this.LA(1),o);for(;this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,a,i,Sl],a,1280,e,Sl)}}repetitionSepSecondInternal(e,r,n,i,o){for(;n();)this.CONSUME(r),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,r,n,i,o],n,1536,e,o)}doSingleRepetition(e){let r=this.getLexerPosition();return e.call(this),this.getLexerPosition()>r}orInternal(e,r){let n=this.getKeyForAutomaticLookahead(256,r),i=z(e)?e:e.DEF,s=this.getLaFuncFromCache(n).call(this,i);if(s!==void 0)return i[s].ALT.call(this);this.raiseNoAltException(r,e.ERR_MSG)}ruleFinallyStateUpdate(){if(this.RULE_STACK.pop(),this.RULE_OCCURRENCE_STACK.pop(),this.cstFinallyStateUpdate(),this.RULE_STACK.length===0&&this.isAtEndOfInput()===!1){let e=this.LA(1),r=this.errorMessageProvider.buildNotAllInputParsedMessage({firstRedundant:e,ruleName:this.getCurrRuleFullName()});this.SAVE_ERROR(new kl(r,e))}}subruleInternal(e,r,n){let i;try{let o=n!==void 0?n.ARGS:void 0;return this.subruleIdx=r,i=e.apply(this,o),this.cstPostNonTerminal(i,n!==void 0&&n.LABEL!==void 0?n.LABEL:e.ruleName),i}catch(o){throw this.subruleInternalError(o,n,e.ruleName)}}subruleInternalError(e,r,n){throw zi(e)&&e.partialCstResult!==void 0&&(this.cstPostNonTerminal(e.partialCstResult,r!==void 0&&r.LABEL!==void 0?r.LABEL:n),delete e.partialCstResult),e}consumeInternal(e,r,n){let i;try{let o=this.LA(1);this.tokenMatcher(o,e)===!0?(this.consumeToken(),i=o):this.consumeInternalError(e,o,n)}catch(o){i=this.consumeInternalRecovery(e,r,o)}return this.cstPostTerminal(n!==void 0&&n.LABEL!==void 0?n.LABEL:e.name,i),i}consumeInternalError(e,r,n){let i,o=this.LA(0);throw n!==void 0&&n.ERR_MSG?i=n.ERR_MSG:i=this.errorMessageProvider.buildMismatchTokenMessage({expected:e,actual:r,previous:o,ruleName:this.getCurrRuleFullName()}),this.SAVE_ERROR(new $o(i,r,o))}consumeInternalRecovery(e,r,n){if(this.recoveryEnabled&&n.name==="MismatchedTokenException"&&!this.isBackTracking()){let i=this.getFollowsForInRuleRecovery(e,r);try{return this.tryInRuleRecovery(e,i)}catch(o){throw o.name===Wh?n:o}}else throw n}saveRecogState(){let e=this.errors,r=We(this.RULE_STACK);return{errors:e,lexerState:this.exportLexerState(),RULE_STACK:r,CST_STACK:this.CST_STACK}}reloadRecogState(e){this.errors=e.errors,this.importLexerState(e.lexerState),this.RULE_STACK=e.RULE_STACK}ruleInvocationStateUpdate(e,r,n){this.RULE_OCCURRENCE_STACK.push(n),this.RULE_STACK.push(e),this.cstInvocationStateUpdate(r)}isBackTracking(){return this.isBackTrackingStack.length!==0}getCurrRuleFullName(){let e=this.getLastExplicitRuleShortName();return this.shortRuleNameToFull[e]}shortRuleNameToFullName(e){return this.shortRuleNameToFull[e]}isAtEndOfInput(){return this.tokenMatcher(this.LA(1),yn)}reset(){this.resetLexerState(),this.subruleIdx=0,this.isBackTrackingStack=[],this.errors=[],this.RULE_STACK=[],this.CST_STACK=[],this.RULE_OCCURRENCE_STACK=[]}};var Xf=class{initErrorHandler(e){this._errors=[],this.errorMessageProvider=W(e,"errorMessageProvider")?e.errorMessageProvider:Tr.errorMessageProvider}SAVE_ERROR(e){if(zi(e))return e.context={ruleStack:this.getHumanReadableRuleStack(),ruleOccurrenceStack:We(this.RULE_OCCURRENCE_STACK)},this._errors.push(e),e;throw Error("Trying to save an Error which is not a RecognitionException")}get errors(){return We(this._errors)}set errors(e){this._errors=e}raiseEarlyExitException(e,r,n){let i=this.getCurrRuleFullName(),o=this.getGAstProductions()[i],a=oa(e,o,r,this.maxLookahead)[0],l=[];for(let c=1;c<=this.maxLookahead;c++)l.push(this.LA(c));let u=this.errorMessageProvider.buildEarlyExitMessage({expectedIterationPaths:a,actual:l,previous:this.LA(0),customUserDescription:n,ruleName:i});throw this.SAVE_ERROR(new El(u,this.LA(1),this.LA(0)))}raiseNoAltException(e,r){let n=this.getCurrRuleFullName(),i=this.getGAstProductions()[n],o=ia(e,i,this.maxLookahead),s=[];for(let u=1;u<=this.maxLookahead;u++)s.push(this.LA(u));let a=this.LA(0),l=this.errorMessageProvider.buildNoViableAltMessage({expectedPathsPerAlt:o,actual:s,previous:a,customUserDescription:r,ruleName:this.getCurrRuleFullName()});throw this.SAVE_ERROR(new wl(l,this.LA(1),a))}};var Yf=class{initContentAssist(){}computeContentAssist(e,r){let n=this.gastProductionsCache[e];if(lr(n))throw Error(`Rule ->${e}<- does not exist in this grammar.`);return Pf([n],r,this.tokenMatcher,this.maxLookahead)}getNextPossibleTokenTypes(e){let r=qt(e.ruleStack),i=this.getGAstProductions()[r];return new $f(i,e).startWalking()}};var Zf={description:"This Object indicates the Parser is during Recording Phase"};Object.freeze(Zf);var jA=!0,HA=Math.pow(2,8)-1,WA=Ef({name:"RECORDING_PHASE_TOKEN",pattern:mt.NA});pi([WA]);var BA=Eo(WA,`This IToken indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,-1,-1,-1,-1,-1,-1);Object.freeze(BA);var X1={name:`This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,children:{}},Jf=class{initGastRecorder(e){this.recordingProdStack=[],this.RECORDING_PHASE=!1}enableRecording(){this.RECORDING_PHASE=!0,this.TRACE_INIT("Enable Recording",()=>{for(let e=0;e<10;e++){let r=e>0?e:"";this[`CONSUME${r}`]=function(n,i){return this.consumeInternalRecord(n,e,i)},this[`SUBRULE${r}`]=function(n,i){return this.subruleInternalRecord(n,e,i)},this[`OPTION${r}`]=function(n){return this.optionInternalRecord(n,e)},this[`OR${r}`]=function(n){return this.orInternalRecord(n,e)},this[`MANY${r}`]=function(n){this.manyInternalRecord(e,n)},this[`MANY_SEP${r}`]=function(n){this.manySepFirstInternalRecord(e,n)},this[`AT_LEAST_ONE${r}`]=function(n){this.atLeastOneInternalRecord(e,n)},this[`AT_LEAST_ONE_SEP${r}`]=function(n){this.atLeastOneSepFirstInternalRecord(e,n)}}this.consume=function(e,r,n){return this.consumeInternalRecord(r,e,n)},this.subrule=function(e,r,n){return this.subruleInternalRecord(r,e,n)},this.option=function(e,r){return this.optionInternalRecord(r,e)},this.or=function(e,r){return this.orInternalRecord(r,e)},this.many=function(e,r){this.manyInternalRecord(e,r)},this.atLeastOne=function(e,r){this.atLeastOneInternalRecord(e,r)},this.ACTION=this.ACTION_RECORD,this.BACKTRACK=this.BACKTRACK_RECORD,this.LA=this.LA_RECORD})}disableRecording(){this.RECORDING_PHASE=!1,this.TRACE_INIT("Deleting Recording methods",()=>{let e=this;for(let r=0;r<10;r++){let n=r>0?r:"";delete e[`CONSUME${n}`],delete e[`SUBRULE${n}`],delete e[`OPTION${n}`],delete e[`OR${n}`],delete e[`MANY${n}`],delete e[`MANY_SEP${n}`],delete e[`AT_LEAST_ONE${n}`],delete e[`AT_LEAST_ONE_SEP${n}`]}delete e.consume,delete e.subrule,delete e.option,delete e.or,delete e.many,delete e.atLeastOne,delete e.ACTION,delete e.BACKTRACK,delete e.LA})}ACTION_RECORD(e){}BACKTRACK_RECORD(e,r){return()=>!0}LA_RECORD(e){return aa}topLevelRuleRecord(e,r){try{let n=new gr({definition:[],name:e});return n.name=e,this.recordingProdStack.push(n),r.call(this),this.recordingProdStack.pop(),n}catch(n){if(n.KNOWN_RECORDER_ERROR!==!0)try{n.message=n.message+`
	 This error was thrown during the "grammar recording phase" For more info see:
	https://chevrotain.io/docs/guide/internals.html#grammar-recording`}catch{throw n}throw n}}optionInternalRecord(e,r){return _l.call(this,ke,e,r)}atLeastOneInternalRecord(e,r){_l.call(this,ze,r,e)}atLeastOneSepFirstInternalRecord(e,r){_l.call(this,Ve,r,e,jA)}manyInternalRecord(e,r){_l.call(this,pe,r,e)}manySepFirstInternalRecord(e,r){_l.call(this,Me,r,e,jA)}orInternalRecord(e,r){return Y1.call(this,e,r)}subruleInternalRecord(e,r,n){if(Qf(r),!e||W(e,"ruleName")===!1){let a=new Error(`<SUBRULE${KA(r)}> argument is invalid expecting a Parser method reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);throw a.KNOWN_RECORDER_ERROR=!0,a}let i=Fn(this.recordingProdStack),o=e.ruleName,s=new we({idx:r,nonTerminalName:o,label:n?.LABEL,referencedRule:void 0});return i.definition.push(s),this.outputCst?X1:Zf}consumeInternalRecord(e,r,n){if(Qf(r),!Ph(e)){let s=new Error(`<CONSUME${KA(r)}> argument is invalid expecting a TokenType reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);throw s.KNOWN_RECORDER_ERROR=!0,s}let i=Fn(this.recordingProdStack),o=new ae({idx:r,terminalType:e,label:n?.LABEL});return i.definition.push(o),BA}};function _l(t,e,r,n=!1){Qf(r);let i=Fn(this.recordingProdStack),o=hr(e)?e:e.DEF,s=new t({definition:[],idx:r});return n&&(s.separator=e.SEP),W(e,"MAX_LOOKAHEAD")&&(s.maxLookahead=e.MAX_LOOKAHEAD),this.recordingProdStack.push(s),o.call(this),i.definition.push(s),this.recordingProdStack.pop(),Zf}function Y1(t,e){Qf(e);let r=Fn(this.recordingProdStack),n=z(t)===!1,i=n===!1?t:t.DEF,o=new Fe({definition:[],idx:e,ignoreAmbiguities:n&&t.IGNORE_AMBIGUITIES===!0});W(t,"MAX_LOOKAHEAD")&&(o.maxLookahead=t.MAX_LOOKAHEAD);let s=hl(i,a=>hr(a.GATE));return o.hasPredicates=s,r.definition.push(o),G(i,a=>{let l=new Be({definition:[]});o.definition.push(l),W(a,"IGNORE_AMBIGUITIES")?l.ignoreAmbiguities=a.IGNORE_AMBIGUITIES:W(a,"GATE")&&(l.ignoreAmbiguities=!0),this.recordingProdStack.push(l),a.ALT.call(this),this.recordingProdStack.pop()}),Zf}function KA(t){return t===0?"":`${t}`}function Qf(t){if(t<0||t>HA){let e=new Error(`Invalid DSL Method idx value: <${t}>
	Idx value must be a none negative value smaller than ${HA+1}`);throw e.KNOWN_RECORDER_ERROR=!0,e}}var ed=class{initPerformanceTracer(e){if(W(e,"traceInitPerf")){let r=e.traceInitPerf,n=typeof r=="number";this.traceInitMaxIdent=n?r:1/0,this.traceInitPerf=n?r>0:r}else this.traceInitMaxIdent=0,this.traceInitPerf=Tr.traceInitPerf;this.traceInitIndent=-1}TRACE_INIT(e,r){if(this.traceInitPerf===!0){this.traceInitIndent++;let n=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log(`${n}--> <${e}>`);let{time:i,value:o}=yl(r),s=i>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&s(`${n}<-- <${e}> time: ${i}ms`),this.traceInitIndent--,o}else return r()}};function zA(t,e){e.forEach(r=>{let n=r.prototype;Object.getOwnPropertyNames(n).forEach(i=>{if(i==="constructor")return;let o=Object.getOwnPropertyDescriptor(n,i);o&&(o.get||o.set)?Object.defineProperty(t.prototype,i,o):t.prototype[i]=r.prototype[i]})})}var aa=Eo(yn,"",NaN,NaN,NaN,NaN,NaN,NaN);Object.freeze(aa);var Tr=Object.freeze({recoveryEnabled:!1,maxLookahead:3,dynamicTokensEnabled:!1,outputCst:!0,errorMessageProvider:hi,nodeLocationTracking:"none",traceInitPerf:!1,skipValidations:!1}),la=Object.freeze({recoveryValueFunc:()=>{},resyncEnabled:!0}),Ot;(function(t){t[t.INVALID_RULE_NAME=0]="INVALID_RULE_NAME",t[t.DUPLICATE_RULE_NAME=1]="DUPLICATE_RULE_NAME",t[t.INVALID_RULE_OVERRIDE=2]="INVALID_RULE_OVERRIDE",t[t.DUPLICATE_PRODUCTIONS=3]="DUPLICATE_PRODUCTIONS",t[t.UNRESOLVED_SUBRULE_REF=4]="UNRESOLVED_SUBRULE_REF",t[t.LEFT_RECURSION=5]="LEFT_RECURSION",t[t.NONE_LAST_EMPTY_ALT=6]="NONE_LAST_EMPTY_ALT",t[t.AMBIGUOUS_ALTS=7]="AMBIGUOUS_ALTS",t[t.CONFLICT_TOKENS_RULES_NAMESPACE=8]="CONFLICT_TOKENS_RULES_NAMESPACE",t[t.INVALID_TOKEN_NAME=9]="INVALID_TOKEN_NAME",t[t.NO_NON_EMPTY_LOOKAHEAD=10]="NO_NON_EMPTY_LOOKAHEAD",t[t.AMBIGUOUS_PREFIX_ALTS=11]="AMBIGUOUS_PREFIX_ALTS",t[t.TOO_MANY_ALTS=12]="TOO_MANY_ALTS",t[t.CUSTOM_LOOKAHEAD_VALIDATION=13]="CUSTOM_LOOKAHEAD_VALIDATION"})(Ot||(Ot={}));function td(t=void 0){return function(){return t}}var Nl=class t{static performSelfAnalysis(e){throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.")}performSelfAnalysis(){this.TRACE_INIT("performSelfAnalysis",()=>{let e;this.selfAnalysisDone=!0;let r=this.className;this.TRACE_INIT("toFastProps",()=>{Tl(this)}),this.TRACE_INIT("Grammar Recording",()=>{try{this.enableRecording(),G(this.definedRulesNames,i=>{let s=this[i].originalGrammarAction,a;this.TRACE_INIT(`${i} Rule`,()=>{a=this.topLevelRuleRecord(i,s)}),this.gastProductionsCache[i]=a})}finally{this.disableRecording()}});let n=[];if(this.TRACE_INIT("Grammar Resolving",()=>{n=NA({rules:Pe(this.gastProductionsCache)}),this.definitionErrors=this.definitionErrors.concat(n)}),this.TRACE_INIT("Grammar Validations",()=>{if(se(n)&&this.skipValidations===!1){let i=IA({rules:Pe(this.gastProductionsCache),tokenTypes:Pe(this.tokensMap),errMsgProvider:Tn,grammarName:r}),o=AA({lookaheadStrategy:this.lookaheadStrategy,rules:Pe(this.gastProductionsCache),tokenTypes:Pe(this.tokensMap),grammarName:r});this.definitionErrors=this.definitionErrors.concat(i,o)}}),se(this.definitionErrors)&&(this.recoveryEnabled&&this.TRACE_INIT("computeAllProdsFollows",()=>{let i=Ub(Pe(this.gastProductionsCache));this.resyncFollows=i}),this.TRACE_INIT("ComputeLookaheadFunctions",()=>{var i,o;(o=(i=this.lookaheadStrategy).initialize)===null||o===void 0||o.call(i,{rules:Pe(this.gastProductionsCache)}),this.preComputeLookaheadFunctions(Pe(this.gastProductionsCache))})),!t.DEFER_DEFINITION_ERRORS_HANDLING&&!se(this.definitionErrors))throw e=L(this.definitionErrors,i=>i.message),new Error(`Parser Definition Errors detected:
 ${e.join(`
-------------------------------
`)}`)})}constructor(e,r){this.definitionErrors=[],this.selfAnalysisDone=!1;let n=this;if(n.initErrorHandler(r),n.initLexerAdapter(),n.initLooksAhead(r),n.initRecognizerEngine(e,r),n.initRecoverable(r),n.initTreeBuilder(r),n.initContentAssist(),n.initGastRecorder(r),n.initPerformanceTracer(r),W(r,"ignoredIssues"))throw new Error(`The <ignoredIssues> IParserConfig property has been deprecated.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.
	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES
	For further details.`);this.skipValidations=W(r,"skipValidations")?r.skipValidations:Tr.skipValidations}};Nl.DEFER_DEFINITION_ERRORS_HANDLING=!1;zA(Nl,[Ff,Gf,Wf,Bf,Vf,zf,Xf,Yf,Jf,ed]);var Il=class extends Nl{constructor(e,r=Tr){let n=We(r);n.outputCst=!1,super(e,n)}};function _o(t,e,r){return`${t.name}_${e}_${r}`}var Vi=1,Q1=2,VA=4,XA=5;var fa=7,Z1=8,eU=9,tU=10,rU=11,YA=12,Pl=class{constructor(e){this.target=e}isEpsilon(){return!1}},ua=class extends Pl{constructor(e,r){super(e),this.tokenType=r}},Dl=class extends Pl{constructor(e){super(e)}isEpsilon(){return!0}},ca=class extends Pl{constructor(e,r,n){super(e),this.rule=r,this.followState=n}isEpsilon(){return!0}};function JA(t){let e={decisionMap:{},decisionStates:[],ruleToStartState:new Map,ruleToStopState:new Map,states:[]};nU(e,t);let r=t.length;for(let n=0;n<r;n++){let i=t[n],o=No(e,i,i);o!==void 0&&mU(e,i,o)}return e}function nU(t,e){let r=e.length;for(let n=0;n<r;n++){let i=e[n],o=Gt(t,i,void 0,{type:Q1}),s=Gt(t,i,void 0,{type:fa});o.stop=s,t.ruleToStartState.set(i,o),t.ruleToStopState.set(i,s)}}function QA(t,e,r){return r instanceof ae?eg(t,e,r.terminalType,r):r instanceof we?pU(t,e,r):r instanceof Fe?lU(t,e,r):r instanceof ke?uU(t,e,r):r instanceof pe?iU(t,e,r):r instanceof Me?oU(t,e,r):r instanceof ze?sU(t,e,r):r instanceof Ve?aU(t,e,r):No(t,e,r)}function iU(t,e,r){let n=Gt(t,e,r,{type:XA});Xi(t,n);let i=da(t,e,n,r,No(t,e,r));return eC(t,e,r,i)}function oU(t,e,r){let n=Gt(t,e,r,{type:XA});Xi(t,n);let i=da(t,e,n,r,No(t,e,r)),o=eg(t,e,r.separator,r);return eC(t,e,r,i,o)}function sU(t,e,r){let n=Gt(t,e,r,{type:VA});Xi(t,n);let i=da(t,e,n,r,No(t,e,r));return ZA(t,e,r,i)}function aU(t,e,r){let n=Gt(t,e,r,{type:VA});Xi(t,n);let i=da(t,e,n,r,No(t,e,r)),o=eg(t,e,r.separator,r);return ZA(t,e,r,i,o)}function lU(t,e,r){let n=Gt(t,e,r,{type:Vi});Xi(t,n);let i=L(r.definition,s=>QA(t,e,s));return da(t,e,n,r,...i)}function uU(t,e,r){let n=Gt(t,e,r,{type:Vi});Xi(t,n);let i=da(t,e,n,r,No(t,e,r));return cU(t,e,r,i)}function No(t,e,r){let n=Ut(L(r.definition,i=>QA(t,e,i)),i=>i!==void 0);return n.length===1?n[0]:n.length===0?void 0:dU(t,n)}function ZA(t,e,r,n,i){let o=n.left,s=n.right,a=Gt(t,e,r,{type:rU});Xi(t,a);let l=Gt(t,e,r,{type:YA});return o.loopback=a,l.loopback=a,t.decisionMap[_o(e,i?"RepetitionMandatoryWithSeparator":"RepetitionMandatory",r.idx)]=a,_t(s,a),i===void 0?(_t(a,o),_t(a,l)):(_t(a,l),_t(a,i.left),_t(i.right,o)),{left:o,right:l}}function eC(t,e,r,n,i){let o=n.left,s=n.right,a=Gt(t,e,r,{type:tU});Xi(t,a);let l=Gt(t,e,r,{type:YA}),u=Gt(t,e,r,{type:eU});return a.loopback=u,l.loopback=u,_t(a,o),_t(a,l),_t(s,u),i!==void 0?(_t(u,l),_t(u,i.left),_t(i.right,o)):_t(u,a),t.decisionMap[_o(e,i?"RepetitionWithSeparator":"Repetition",r.idx)]=a,{left:a,right:l}}function cU(t,e,r,n){let i=n.left,o=n.right;return _t(i,o),t.decisionMap[_o(e,"Option",r.idx)]=i,n}function Xi(t,e){return t.decisionStates.push(e),e.decision=t.decisionStates.length-1,e.decision}function da(t,e,r,n,...i){let o=Gt(t,e,n,{type:Z1,start:r});r.end=o;for(let a of i)a!==void 0?(_t(r,a.left),_t(a.right,o)):_t(r,o);let s={left:r,right:o};return t.decisionMap[_o(e,fU(n),n.idx)]=r,s}function fU(t){if(t instanceof Fe)return"Alternation";if(t instanceof ke)return"Option";if(t instanceof pe)return"Repetition";if(t instanceof Me)return"RepetitionWithSeparator";if(t instanceof ze)return"RepetitionMandatory";if(t instanceof Ve)return"RepetitionMandatoryWithSeparator";throw new Error("Invalid production type encountered")}function dU(t,e){let r=e.length;for(let o=0;o<r-1;o++){let s=e[o],a;s.left.transitions.length===1&&(a=s.left.transitions[0]);let l=a instanceof ca,u=a,c=e[o+1].left;s.left.type===Vi&&s.right.type===Vi&&a!==void 0&&(l&&u.followState===s.right||a.target===s.right)?(l?u.followState=c:a.target=c,hU(t,s.right)):_t(s.right,c)}let n=e[0],i=e[r-1];return{left:n.left,right:i.right}}function eg(t,e,r,n){let i=Gt(t,e,n,{type:Vi}),o=Gt(t,e,n,{type:Vi});return tg(i,new ua(o,r)),{left:i,right:o}}function pU(t,e,r){let n=r.referencedRule,i=t.ruleToStartState.get(n),o=Gt(t,e,r,{type:Vi}),s=Gt(t,e,r,{type:Vi}),a=new ca(i,n,s);return tg(o,a),{left:o,right:s}}function mU(t,e,r){let n=t.ruleToStartState.get(e);_t(n,r.left);let i=t.ruleToStopState.get(e);return _t(r.right,i),{left:n,right:i}}function _t(t,e){let r=new Dl(e);tg(t,r)}function Gt(t,e,r,n){let i=Object.assign({atn:t,production:r,epsilonOnlyTransitions:!1,rule:e,transitions:[],nextTokenWithinRule:[],stateNumber:t.states.length},n);return t.states.push(i),i}function tg(t,e){t.transitions.length===0&&(t.epsilonOnlyTransitions=e.isEpsilon()),t.transitions.push(e)}function hU(t,e){t.states.splice(t.states.indexOf(e),1)}var Ol={},pa=class{constructor(){this.map={},this.configs=[]}get size(){return this.configs.length}finalize(){this.map={}}add(e){let r=rg(e);r in this.map||(this.map[r]=this.configs.length,this.configs.push(e))}get elements(){return this.configs}get alts(){return L(this.configs,e=>e.alt)}get key(){let e="";for(let r in this.map)e+=r+":";return e}};function rg(t,e=!0){return`${e?`a${t.alt}`:""}s${t.state.stateNumber}:${t.stack.map(r=>r.stateNumber.toString()).join("_")}`}function gU(t,e){let r={};return n=>{let i=n.toString(),o=r[i];return o!==void 0||(o={atnStartState:t,decision:e,states:{}},r[i]=o),o}}var rd=class{constructor(){this.predicates=[]}is(e){return e>=this.predicates.length||this.predicates[e]}set(e,r){this.predicates[e]=r}toString(){let e="",r=this.predicates.length;for(let n=0;n<r;n++)e+=this.predicates[n]===!0?"1":"0";return e}},tC=new rd,Ll=class extends gi{constructor(e){var r;super(),this.logging=(r=e?.logging)!==null&&r!==void 0?r:n=>console.log(n)}initialize(e){this.atn=JA(e.rules),this.dfas=yU(this.atn)}validateAmbiguousAlternationAlternatives(){return[]}validateEmptyOrAlternatives(){return[]}buildLookaheadForAlternation(e){let{prodOccurrence:r,rule:n,hasPredicates:i,dynamicTokensEnabled:o}=e,s=this.dfas,a=this.logging,l=_o(n,"Alternation",r),c=this.atn.decisionMap[l].decision,f=L(Of({maxLookahead:1,occurrence:r,prodType:"Alternation",rule:n}),m=>L(m,T=>T[0]));if(rC(f,!1)&&!o){let m=lt(f,(T,b,C)=>(G(b,_=>{_&&(T[_.tokenTypeIdx]=C,G(_.categoryMatches,w=>{T[w]=C}))}),T),{});return i?function(T){var b;let C=this.LA(1),_=m[C.tokenTypeIdx];if(T!==void 0&&_!==void 0){let w=(b=T[_])===null||b===void 0?void 0:b.GATE;if(w!==void 0&&w.call(this)===!1)return}return _}:function(){let T=this.LA(1);return m[T.tokenTypeIdx]}}else return i?function(m){let T=new rd,b=m===void 0?0:m.length;for(let _=0;_<b;_++){let w=m?.[_].GATE;T.set(_,w===void 0||w.call(this))}let C=ng.call(this,s,c,T,a);return typeof C=="number"?C:void 0}:function(){let m=ng.call(this,s,c,tC,a);return typeof m=="number"?m:void 0}}buildLookaheadForOptional(e){let{prodOccurrence:r,rule:n,prodType:i,dynamicTokensEnabled:o}=e,s=this.dfas,a=this.logging,l=_o(n,i,r),c=this.atn.decisionMap[l].decision,f=L(Of({maxLookahead:1,occurrence:r,prodType:i,rule:n}),m=>L(m,T=>T[0]));if(rC(f)&&f[0][0]&&!o){let m=f[0],T=yt(m);if(T.length===1&&se(T[0].categoryMatches)){let C=T[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===C}}else{let b=lt(T,(C,_)=>(_!==void 0&&(C[_.tokenTypeIdx]=!0,G(_.categoryMatches,w=>{C[w]=!0})),C),{});return function(){let C=this.LA(1);return b[C.tokenTypeIdx]===!0}}}return function(){let m=ng.call(this,s,c,tC,a);return typeof m=="object"?!1:m===0}}};function rC(t,e=!0){let r=new Set;for(let n of t){let i=new Set;for(let o of n){if(o===void 0){if(e)break;return!1}let s=[o.tokenTypeIdx].concat(o.categoryMatches);for(let a of s)if(r.has(a)){if(!i.has(a))return!1}else r.add(a),i.add(a)}}return!0}function yU(t){let e=t.decisionStates.length,r=Array(e);for(let n=0;n<e;n++)r[n]=gU(t.decisionStates[n],n);return r}function ng(t,e,r,n){let i=t[e](r),o=i.start;if(o===void 0){let a=EU(i.atnStartState);o=oC(i,iC(a)),i.start=o}return TU.apply(this,[i,o,r,n])}function TU(t,e,r,n){let i=e,o=1,s=[],a=this.LA(o++);for(;;){let l=AU(i,a);if(l===void 0&&(l=vU.apply(this,[t,i,a,o,r,n])),l===Ol)return bU(s,i,a);if(l.isAcceptState===!0)return l.prediction;i=l,s.push(a),a=this.LA(o++)}}function vU(t,e,r,n,i,o){let s=CU(e.configs,r,i);if(s.size===0)return nC(t,e,r,Ol),Ol;let a=iC(s),l=kU(s,i);if(l!==void 0)a.isAcceptState=!0,a.prediction=l,a.configs.uniqueAlt=l;else if(IU(s)){let u=_b(s.alts);a.isAcceptState=!0,a.prediction=u,a.configs.uniqueAlt=u,RU.apply(this,[t,n,s.alts,o])}return a=nC(t,e,r,a),a}function RU(t,e,r,n){let i=[];for(let u=1;u<=e;u++)i.push(this.LA(u).tokenType);let o=t.atnStartState,s=o.rule,a=o.production,l=xU({topLevelRule:s,ambiguityIndices:r,production:a,prefixPath:i});n(l)}function xU(t){let e=L(t.prefixPath,i=>mi(i)).join(", "),r=t.production.idx===0?"":t.production.idx,n=`Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(", ")}> in <${SU(t.production)}${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n}function SU(t){if(t instanceof we)return"SUBRULE";if(t instanceof ke)return"OPTION";if(t instanceof Fe)return"OR";if(t instanceof ze)return"AT_LEAST_ONE";if(t instanceof Ve)return"AT_LEAST_ONE_SEP";if(t instanceof Me)return"MANY_SEP";if(t instanceof pe)return"MANY";if(t instanceof ae)return"CONSUME";throw Error("non exhaustive match")}function bU(t,e,r){let n=Qt(e.configs.elements,o=>o.state.transitions),i=Mb(n.filter(o=>o instanceof ua).map(o=>o.tokenType),o=>o.tokenTypeIdx);return{actualToken:r,possibleTokenTypes:i,tokenPath:t}}function AU(t,e){return t.edges[e.tokenTypeIdx]}function CU(t,e,r){let n=new pa,i=[];for(let s of t.elements){if(r.is(s.alt)===!1)continue;if(s.state.type===fa){i.push(s);continue}let a=s.state.transitions.length;for(let l=0;l<a;l++){let u=s.state.transitions[l],c=wU(u,e);c!==void 0&&n.add({state:c,alt:s.alt,stack:s.stack})}}let o;if(i.length===0&&n.size===1&&(o=n),o===void 0){o=new pa;for(let s of n.elements)nd(s,o)}if(i.length>0&&!_U(o))for(let s of i)o.add(s);return o}function wU(t,e){if(t instanceof ua&&xl(e,t.tokenType))return t.target}function kU(t,e){let r;for(let n of t.elements)if(e.is(n.alt)===!0){if(r===void 0)r=n.alt;else if(r!==n.alt)return}return r}function iC(t){return{configs:t,edges:{},isAcceptState:!1,prediction:-1}}function nC(t,e,r,n){return n=oC(t,n),e.edges[r.tokenTypeIdx]=n,n}function oC(t,e){if(e===Ol)return e;let r=e.configs.key,n=t.states[r];return n!==void 0?n:(e.configs.finalize(),t.states[r]=e,e)}function EU(t){let e=new pa,r=t.transitions.length;for(let n=0;n<r;n++){let o={state:t.transitions[n].target,alt:n,stack:[]};nd(o,e)}return e}function nd(t,e){let r=t.state;if(r.type===fa){if(t.stack.length>0){let i=[...t.stack],s={state:i.pop(),alt:t.alt,stack:i};nd(s,e)}else e.add(t);return}r.epsilonOnlyTransitions||e.add(t);let n=r.transitions.length;for(let i=0;i<n;i++){let o=r.transitions[i],s=$U(t,o);s!==void 0&&nd(s,e)}}function $U(t,e){if(e instanceof Dl)return{state:e.target,alt:t.alt,stack:t.stack};if(e instanceof ca){let r=[...t.stack,e.followState];return{state:e.target,alt:t.alt,stack:r}}}function _U(t){for(let e of t.elements)if(e.state.type===fa)return!0;return!1}function NU(t){for(let e of t.elements)if(e.state.type!==fa)return!1;return!0}function IU(t){if(NU(t))return!0;let e=PU(t.elements);return DU(e)&&!OU(e)}function PU(t){let e=new Map;for(let r of t){let n=rg(r,!1),i=e.get(n);i===void 0&&(i={},e.set(n,i)),i[r.alt]=!0}return e}function DU(t){for(let e of Array.from(t.values()))if(Object.keys(e).length>1)return!0;return!1}function OU(t){for(let e of Array.from(t.values()))if(Object.keys(e).length===1)return!0;return!1}var ig=de(io(),1);var id=class{constructor(){this.nodeStack=[]}get current(){return this.nodeStack[this.nodeStack.length-1]}buildRootNode(e){return this.rootNode=new sg(e),this.nodeStack=[this.rootNode],this.rootNode}buildCompositeNode(e){let r=new ad;return r.grammarSource=e,r.root=this.rootNode,this.current.content.push(r),this.nodeStack.push(r),r}buildLeafNode(e,r){let n=new sd(e.startOffset,e.image.length,qa(e),e.tokenType,!1);return n.grammarSource=r,n.root=this.rootNode,this.current.content.push(n),n}removeNode(e){let r=e.container;if(r){let n=r.content.indexOf(e);n>=0&&r.content.splice(n,1)}}construct(e){let r=this.current;typeof e.$type=="string"&&(this.current.astNode=e),e.$cstNode=r;let n=this.nodeStack.pop();n?.content.length===0&&this.removeNode(n)}addHiddenTokens(e){for(let r of e){let n=new sd(r.startOffset,r.image.length,qa(r),r.tokenType,!0);n.root=this.rootNode,this.addHiddenToken(this.rootNode,n)}}addHiddenToken(e,r){let{offset:n,end:i}=r;for(let o=0;o<e.content.length;o++){let s=e.content[o],{offset:a,end:l}=s;if(Cn(s)&&n>a&&i<l){this.addHiddenToken(s,r);return}else if(i<=a){e.content.splice(o,0,r);return}}e.content.push(r)}},od=class{get parent(){return this.container}get feature(){return this.grammarSource}get hidden(){return!1}get astNode(){var e,r;let n=typeof((e=this._astNode)===null||e===void 0?void 0:e.$type)=="string"?this._astNode:(r=this.container)===null||r===void 0?void 0:r.astNode;if(!n)throw new Error("This node has no associated AST element");return n}set astNode(e){this._astNode=e}get element(){return this.astNode}get text(){return this.root.fullText.substring(this.offset,this.end)}},sd=class extends od{get offset(){return this._offset}get length(){return this._length}get end(){return this._offset+this._length}get hidden(){return this._hidden}get tokenType(){return this._tokenType}get range(){return this._range}constructor(e,r,n,i,o=!1){super(),this._hidden=o,this._offset=e,this._tokenType=i,this._length=r,this._range=n}},ad=class extends od{constructor(){super(...arguments),this.content=new og(this)}get children(){return this.content}get offset(){var e,r;return(r=(e=this.firstNonHiddenNode)===null||e===void 0?void 0:e.offset)!==null&&r!==void 0?r:0}get length(){return this.end-this.offset}get end(){var e,r;return(r=(e=this.lastNonHiddenNode)===null||e===void 0?void 0:e.end)!==null&&r!==void 0?r:0}get range(){let e=this.firstNonHiddenNode,r=this.lastNonHiddenNode;if(e&&r){if(this._rangeCache===void 0){let{range:n}=e,{range:i}=r;this._rangeCache={start:n.start,end:i.end.line<n.start.line?n.start:i.end}}return this._rangeCache}else return{start:ig.Position.create(0,0),end:ig.Position.create(0,0)}}get firstNonHiddenNode(){for(let e of this.content)if(!e.hidden)return e;return this.content[0]}get lastNonHiddenNode(){for(let e=this.content.length-1;e>=0;e--){let r=this.content[e];if(!r.hidden)return r}return this.content[this.content.length-1]}},og=class t extends Array{constructor(e){super(),this.parent=e,Object.setPrototypeOf(this,t.prototype)}push(...e){return this.addParents(e),super.push(...e)}unshift(...e){return this.addParents(e),super.unshift(...e)}splice(e,r,...n){return this.addParents(n),super.splice(e,r,...n)}addParents(e){for(let r of e)r.container=this.parent}},sg=class extends ad{get text(){return this._text.substring(this.offset,this.end)}get fullText(){return this._text}constructor(e){super(),this._text="",this._text=e??""}};var lg=Symbol("Datatype");function ag(t){return t.$type===lg}var sC="\u200B",aC=t=>t.endsWith(sC)?t:t+sC,ld=class{constructor(e){this._unorderedGroups=new Map,this.lexer=e.parser.Lexer;let r=this.lexer.definition;this.wrapper=new cg(r,Object.assign(Object.assign({},e.parser.ParserConfig),{errorMessageProvider:e.parser.ParserErrorMessageProvider}))}alternatives(e,r){this.wrapper.wrapOr(e,r)}optional(e,r){this.wrapper.wrapOption(e,r)}many(e,r){this.wrapper.wrapMany(e,r)}atLeastOne(e,r){this.wrapper.wrapAtLeastOne(e,r)}isRecording(){return this.wrapper.IS_RECORDING}get unorderedGroups(){return this._unorderedGroups}getRuleStack(){return this.wrapper.RULE_STACK}finalize(){this.wrapper.wrapSelfAnalysis()}},ud=class extends ld{get current(){return this.stack[this.stack.length-1]}constructor(e){super(e),this.nodeBuilder=new id,this.stack=[],this.assignmentMap=new Map,this.linker=e.references.Linker,this.converter=e.parser.ValueConverter,this.astReflection=e.shared.AstReflection}rule(e,r){let n=e.fragment?void 0:Mr(e)?lg:pn(e),i=this.wrapper.DEFINE_RULE(aC(e.name),this.startImplementation(n,r).bind(this));return e.entry&&(this.mainRule=i),i}parse(e){this.nodeBuilder.buildRootNode(e);let r=this.lexer.tokenize(e);this.wrapper.input=r.tokens;let n=this.mainRule.call(this.wrapper,{});return this.nodeBuilder.addHiddenTokens(r.hidden),this.unorderedGroups.clear(),{value:n,lexerErrors:r.errors,parserErrors:this.wrapper.errors}}startImplementation(e,r){return n=>{if(!this.isRecording()){let o={$type:e};this.stack.push(o),e===lg&&(o.value="")}let i;try{i=r(n)}catch{i=void 0}return!this.isRecording()&&i===void 0&&(i=this.construct()),i}}consume(e,r,n){let i=this.wrapper.wrapConsume(e,r);if(!this.isRecording()&&!i.isInsertedInRecovery){let o=this.nodeBuilder.buildLeafNode(i,n),{assignment:s,isCrossRef:a}=this.getAssignment(n),l=this.current;if(s){let u=dt(n)?i.image:this.converter.convert(i.image,o);this.assign(s.operator,s.feature,u,o,a)}else if(ag(l)){let u=i.image;dt(n)||(u=this.converter.convert(u,o).toString()),l.value+=u}}}subrule(e,r,n,i){let o;this.isRecording()||(o=this.nodeBuilder.buildCompositeNode(n));let s=this.wrapper.wrapSubrule(e,r,i);!this.isRecording()&&o&&o.length>0&&this.performSubruleAssignment(s,n,o)}performSubruleAssignment(e,r,n){let{assignment:i,isCrossRef:o}=this.getAssignment(r);if(i)this.assign(i.operator,i.feature,e,n,o);else if(!i){let s=this.current;if(ag(s))s.value+=e.toString();else{let a=e.$type,l=this.assignWithoutOverride(e,s);a&&(l.$type=a);let u=l;this.stack.pop(),this.stack.push(u)}}}action(e,r){if(!this.isRecording()){let n=this.current;if(!n.$cstNode&&r.feature&&r.operator){n=this.construct(!1);let o=n.$cstNode.feature;this.nodeBuilder.buildCompositeNode(o)}let i={$type:e};this.stack.pop(),this.stack.push(i),r.feature&&r.operator&&this.assign(r.operator,r.feature,n,n.$cstNode,!1)}}construct(e=!0){if(this.isRecording())return;let r=this.current;return Tv(r),this.nodeBuilder.construct(r),e&&this.stack.pop(),ag(r)?this.converter.convert(r.value,r.$cstNode):(this.assignMandatoryProperties(r),r)}assignMandatoryProperties(e){let r=this.astReflection.getTypeMetaData(e.$type);for(let n of r.mandatory){let i=e[n.name];n.type==="array"&&!Array.isArray(i)?e[n.name]=[]:n.type==="boolean"&&i===void 0&&(e[n.name]=!1)}}getAssignment(e){if(!this.assignmentMap.has(e)){let r=Ie(e,xe);this.assignmentMap.set(e,{assignment:r,isCrossRef:r?zt(r.terminal):!1})}return this.assignmentMap.get(e)}assign(e,r,n,i,o){let s=this.current,a;switch(o&&typeof n=="string"?a=this.linker.buildReference(s,r,i,n):a=n,e){case"=":{s[r]=a;break}case"?=":{s[r]=!0;break}case"+=":Array.isArray(s[r])||(s[r]=[]),s[r].push(a)}}assignWithoutOverride(e,r){for(let[n,i]of Object.entries(r)){let o=e[n];o===void 0?e[n]=i:Array.isArray(o)&&Array.isArray(i)&&(i.push(...o),e[n]=i)}return e}get definitionErrors(){return this.wrapper.definitionErrors}},ug=class{buildMismatchTokenMessage(e){return hi.buildMismatchTokenMessage(e)}buildNotAllInputParsedMessage(e){return hi.buildNotAllInputParsedMessage(e)}buildNoViableAltMessage(e){return hi.buildNoViableAltMessage(e)}buildEarlyExitMessage(e){return hi.buildEarlyExitMessage(e)}},Ml=class extends ug{buildMismatchTokenMessage({expected:e,actual:r}){return`Expecting ${e.LABEL?"`"+e.LABEL+"`":e.name.endsWith(":KW")?`keyword '${e.name.substring(0,e.name.length-3)}'`:`token of type '${e.name}'`} but found \`${r.image}\`.`}buildNotAllInputParsedMessage({firstRedundant:e}){return`Expecting end of file but found \`${e.image}\`.`}},cd=class extends ld{constructor(){super(...arguments),this.tokens=[],this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}action(){}construct(){}parse(e){this.resetState();let r=this.lexer.tokenize(e);return this.tokens=r.tokens,this.wrapper.input=[...this.tokens],this.mainRule.call(this.wrapper,{}),this.unorderedGroups.clear(),{tokens:this.tokens,elementStack:[...this.lastElementStack],tokenIndex:this.nextTokenIndex}}rule(e,r){let n=this.wrapper.DEFINE_RULE(aC(e.name),this.startImplementation(r).bind(this));return e.entry&&(this.mainRule=n),n}resetState(){this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}startImplementation(e){return r=>{let n=this.keepStackSize();try{e(r)}finally{this.resetStackSize(n)}}}removeUnexpectedElements(){this.elementStack.splice(this.stackSize)}keepStackSize(){let e=this.elementStack.length;return this.stackSize=e,e}resetStackSize(e){this.removeUnexpectedElements(),this.stackSize=e}consume(e,r,n){this.wrapper.wrapConsume(e,r),this.isRecording()||(this.lastElementStack=[...this.elementStack,n],this.nextTokenIndex=this.currIdx+1)}subrule(e,r,n,i){this.before(n),this.wrapper.wrapSubrule(e,r,i),this.after(n)}before(e){this.isRecording()||this.elementStack.push(e)}after(e){if(!this.isRecording()){let r=this.elementStack.lastIndexOf(e);r>=0&&this.elementStack.splice(r)}}get currIdx(){return this.wrapper.currIdx}},LU={recoveryEnabled:!0,nodeLocationTracking:"full",skipValidations:!0,errorMessageProvider:new Ml},cg=class extends Il{constructor(e,r){let n=r&&"maxLookahead"in r;super(e,Object.assign(Object.assign(Object.assign({},LU),{lookaheadStrategy:n?new gi({maxLookahead:r.maxLookahead}):new Ll}),r))}get IS_RECORDING(){return this.RECORDING_PHASE}DEFINE_RULE(e,r){return this.RULE(e,r)}wrapSelfAnalysis(){this.performSelfAnalysis()}wrapConsume(e,r){return this.consume(e,r)}wrapSubrule(e,r,n){return this.subrule(e,r,{ARGS:[n]})}wrapOr(e,r){this.or(e,r)}wrapOption(e,r){this.option(e,r)}wrapMany(e,r){this.many(e,r)}wrapAtLeastOne(e,r){this.atLeastOne(e,r)}};var Fl=class extends Error{constructor(e,r){super(e?`${r} at ${e.range.start.line}:${e.range.start.character}`:r)}};function fd(t){throw new Error("Error! The input value was not handled.")}function pd(t,e,r){return MU({parser:e,tokens:r,rules:new Map,ruleNames:new Map},t),e}function MU(t,e){let r=ds(e,!1),n=ie(e.rules).filter(K).filter(i=>r.has(i));for(let i of n){let o=Object.assign(Object.assign({},t),{consume:1,optional:1,subrule:1,many:1,or:1});o.rules.set(i.name,t.parser.rule(i,Io(o,i.definition)))}}function Io(t,e,r=!1){let n;if(dt(e))n=KU(t,e);else if(_e(e))n=FU(t,e);else if(xe(e))n=Io(t,e.terminal);else if(zt(e))n=lC(t,e);else if(Ne(e))n=UU(t,e);else if(Ir(e))n=GU(t,e);else if(Pr(e))n=jU(t,e);else if(Mt(e))n=HU(t,e);else throw new Fl(e.$cstNode,`Unexpected element type: ${e.$type}`);return uC(t,r?void 0:dd(e),n,e.cardinality)}function FU(t,e){let r=pn(e);return()=>t.parser.action(r,e)}function UU(t,e){let r=e.rule.ref;if(K(r)){let n=t.subrule++,i=e.arguments.length>0?qU(r,e.arguments):()=>({});return o=>t.parser.subrule(n,cC(t,r),e,i(o))}else if(Ae(r)){let n=t.consume++,i=fg(t,r.name);return()=>t.parser.consume(n,i,e)}else if(r)fd(r);else throw new Fl(e.$cstNode,`Undefined rule type: ${e.$type}`)}function qU(t,e){let r=e.map(n=>yi(n.value));return n=>{let i={};for(let o=0;o<r.length;o++){let s=t.parameters[o],a=r[o];i[s.name]=a(n)}return i}}function yi(t){if(MT(t)){let e=yi(t.left),r=yi(t.right);return n=>e(n)||r(n)}else if(OT(t)){let e=yi(t.left),r=yi(t.right);return n=>e(n)&&r(n)}else if(jT(t)){let e=yi(t.value);return r=>!e(r)}else if(ts(t)){let e=t.parameter.ref.name;return r=>r!==void 0&&r[e]===!0}else if(qT(t)){let e=!!t.true;return()=>e}fd(t)}function GU(t,e){if(e.elements.length===1)return Io(t,e.elements[0]);{let r=[];for(let i of e.elements){let o={ALT:Io(t,i,!0)},s=dd(i);s&&(o.GATE=yi(s)),r.push(o)}let n=t.or++;return i=>t.parser.alternatives(n,r.map(o=>{let s={ALT:()=>o.ALT(i)},a=o.GATE;return a&&(s.GATE=()=>a(i)),s}))}}function jU(t,e){if(e.elements.length===1)return Io(t,e.elements[0]);let r=[];for(let a of e.elements){let l={ALT:Io(t,a,!0)},u=dd(a);u&&(l.GATE=yi(u)),r.push(l)}let n=t.or++,i=(a,l)=>{let u=l.getRuleStack().join("-");return`uGroup_${a}_${u}`},o=a=>t.parser.alternatives(n,r.map((l,u)=>{let c={ALT:()=>!0},f=t.parser;c.ALT=()=>{if(l.ALT(a),!f.isRecording()){let T=i(n,f);f.unorderedGroups.get(T)||f.unorderedGroups.set(T,[]);let b=f.unorderedGroups.get(T);typeof b?.[u]>"u"&&(b[u]=!0)}};let m=l.GATE;return m?c.GATE=()=>m(a):c.GATE=()=>{let T=f.unorderedGroups.get(i(n,f));return!T?.[u]},c})),s=uC(t,dd(e),o,"*");return a=>{s(a),t.parser.isRecording()||t.parser.unorderedGroups.delete(i(n,t.parser))}}function HU(t,e){let r=e.elements.map(n=>Io(t,n));return n=>r.forEach(i=>i(n))}function dd(t){if(Mt(t))return t.guardCondition}function lC(t,e,r=e.terminal){if(r)if(Ne(r)&&K(r.rule.ref)){let n=t.subrule++;return i=>t.parser.subrule(n,cC(t,r.rule.ref),e,i)}else if(Ne(r)&&Ae(r.rule.ref)){let n=t.consume++,i=fg(t,r.rule.ref.name);return()=>t.parser.consume(n,i,e)}else if(dt(r)){let n=t.consume++,i=fg(t,r.value);return()=>t.parser.consume(n,i,e)}else throw new Error("Could not build cross reference parser");else{if(!e.type.ref)throw new Error("Could not resolve reference to type: "+e.type.$refText);let n=il(e.type.ref),i=n?.terminal;if(!i)throw new Error("Could not find name assignment for type: "+pn(e.type.ref));return lC(t,e,i)}}function KU(t,e){let r=t.consume++,n=t.tokens[e.value];if(!n)throw new Error("Could not find token for keyword: "+e.value);return()=>t.parser.consume(r,n,e)}function uC(t,e,r,n){let i=e&&yi(e);if(!n)if(i){let o=t.or++;return s=>t.parser.alternatives(o,[{ALT:()=>r(s),GATE:()=>i(s)},{ALT:td(),GATE:()=>!i(s)}])}else return r;if(n==="*"){let o=t.many++;return s=>t.parser.many(o,{DEF:()=>r(s),GATE:i?()=>i(s):void 0})}else if(n==="+"){let o=t.many++;if(i){let s=t.or++;return a=>t.parser.alternatives(s,[{ALT:()=>t.parser.atLeastOne(o,{DEF:()=>r(a)}),GATE:()=>i(a)},{ALT:td(),GATE:()=>!i(a)}])}else return s=>t.parser.atLeastOne(o,{DEF:()=>r(s)})}else if(n==="?"){let o=t.optional++;return s=>t.parser.optional(o,{DEF:()=>r(s),GATE:i?()=>i(s):void 0})}else fd(n)}function cC(t,e){let r=WU(t,e),n=t.rules.get(r);if(!n)throw new Error(`Rule "${r}" not found."`);return n}function WU(t,e){if(K(e))return e.name;if(t.ruleNames.has(e))return t.ruleNames.get(e);{let r=e,n=r.$container,i=e.$type;for(;!K(n);)(Mt(n)||Ir(n)||Pr(n))&&(i=n.elements.indexOf(r).toString()+":"+i),r=n,n=n.$container;return i=n.name+":"+i,t.ruleNames.set(e,i),i}}function fg(t,e){let r=t.tokens[e];if(!r)throw new Error(`Token "${e}" not found."`);return r}function fC(t){let e=t.Grammar,r=t.parser.Lexer,n=new cd(t);return pd(e,n,r.definition),n.finalize(),n}function dC(t){let e=BU(t);return e.finalize(),e}function BU(t){let e=t.Grammar,r=t.parser.Lexer,n=new ud(t);return pd(e,n,r.definition)}var md=class{buildTokens(e,r){let n=ie(ds(e,!1)),i=this.buildTerminalTokens(n),o=this.buildKeywordTokens(n,i,r);return i.forEach(s=>{let a=s.PATTERN;typeof a=="object"&&a&&"test"in a&&Km(a)?o.unshift(s):o.push(s)}),o}buildTerminalTokens(e){return e.filter(Ae).filter(r=>!r.fragment).map(r=>this.buildTerminalToken(r)).toArray()}buildTerminalToken(e){let r=Xr(e),n=r.flags.includes("u")?this.regexPatternFunction(r):r,i={name:e.name,PATTERN:n,LINE_BREAKS:!0};return e.hidden&&(i.GROUP=Km(r)?mt.SKIPPED:"hidden"),i}regexPatternFunction(e){let r=new RegExp(e,e.flags+"y");return(n,i)=>(r.lastIndex=i,r.exec(n))}buildKeywordTokens(e,r,n){return e.filter(K).flatMap(i=>Qe(i).filter(dt)).distinct(i=>i.value).toArray().sort((i,o)=>o.value.length-i.value.length).map(i=>this.buildKeywordToken(i,r,!!n?.caseInsensitive))}buildKeywordToken(e,r,n){return{name:e.value,PATTERN:this.buildKeywordPattern(e,n),LONGER_ALT:this.findLongerAlt(e,r)}}buildKeywordPattern(e,r){return r?new RegExp(qv(e.value)):e.value}findLongerAlt(e,r){return r.reduce((n,i)=>{let o=i?.PATTERN;return o?.source&&Gv("^"+o.source+"$",e.value)&&n.push(i),n},[])}};var hd=class{convert(e,r){let n=r.grammarSource;if(zt(n)&&(n=hc(n)),Ne(n)){let i=n.rule.ref;if(!i)throw new Error("This cst node was not parsed by a rule.");return this.runConverter(i,e,r)}return e}runConverter(e,r,n){var i;switch(e.name.toUpperCase()){case"INT":return YU(r);case"STRING":return zU(r);case"ID":return XU(r)}switch((i=Ro(e))===null||i===void 0?void 0:i.toLowerCase()){case"number":return ZU(r);case"boolean":return eq(r);case"bigint":return JU(r);case"date":return QU(r);default:return r}}};function zU(t){let e="";for(let r=1;r<t.length-1;r++){let n=t.charAt(r);if(n==="\\"){let i=t.charAt(++r);e+=VU(i)}else e+=n}return e}function VU(t){switch(t){case"b":return"\b";case"f":return"\f";case"n":return`
`;case"r":return"\r";case"t":return"	";case"v":return"\v";case"0":return"\0";default:return t}}function XU(t){return t.charAt(0)==="^"?t.substring(1):t}function YU(t){return parseInt(t)}function JU(t){return BigInt(t)}function QU(t){return new Date(t)}function ZU(t){return Number(t)}function eq(t){return t.toLowerCase()==="true"}var pC=de(be(),1);var gd=class{constructor(e){this.reflection=e.shared.AstReflection,this.langiumDocuments=()=>e.shared.workspace.LangiumDocuments,this.scopeProvider=e.references.ScopeProvider,this.astNodeLocator=e.workspace.AstNodeLocator}async link(e,r=pC.CancellationToken.None){for(let n of Zn(e.parseResult.value))await Ze(r),Ku(n).forEach(i=>this.doLink(i,e))}doLink(e,r){let n=e.reference;if(n._ref===void 0)try{let i=this.getCandidate(e);if(Yo(i))n._ref=i;else if(n._nodeDescription=i,this.langiumDocuments().hasDocument(i.documentUri)){let o=this.loadAstNode(i);n._ref=o??this.createLinkingError(e,i)}}catch(i){n._ref=Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${n.$refText}': ${i}`})}r.references.push(n)}unlink(e){for(let r of e.references)delete r._ref,delete r._nodeDescription;e.references=[]}getCandidate(e){let n=this.scopeProvider.getScope(e).getElement(e.reference.$refText);return n??this.createLinkingError(e)}buildReference(e,r,n,i){let o=this,s={$refNode:n,$refText:i,get ref(){var a;if(kt(this._ref))return this._ref;if(RT(this._nodeDescription)){let l=o.loadAstNode(this._nodeDescription);this._ref=l??o.createLinkingError({reference:s,container:e,property:r},this._nodeDescription)}else if(this._ref===void 0){let l=o.getLinkedNode({reference:s,container:e,property:r});if(l.error&&ne(e).state<je.ComputedScopes)return;this._ref=(a=l.node)!==null&&a!==void 0?a:l.error,this._nodeDescription=l.descr}return kt(this._ref)?this._ref:void 0},get $nodeDescription(){return this._nodeDescription},get error(){return Yo(this._ref)?this._ref:void 0}};return s}getLinkedNode(e){try{let r=this.getCandidate(e);if(Yo(r))return{error:r};let n=this.loadAstNode(r);return n?{node:n,descr:r}:{descr:r,error:this.createLinkingError(e,r)}}catch(r){return{error:Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${e.reference.$refText}': ${r}`})}}}loadAstNode(e){if(e.node)return e.node;let r=this.langiumDocuments().getOrCreateDocument(e.documentUri);return this.astNodeLocator.getAstNode(r.parseResult.value,e.path)}createLinkingError(e,r){let n=ne(e.container);n.state<je.ComputedScopes&&console.warn(`Attempted reference resolution before document reached ComputedScopes state (${n.uri}).`);let i=this.reflection.getReferenceType(e);return Object.assign(Object.assign({},e),{message:`Could not resolve reference to ${i} named '${e.reference.$refText}'.`,targetDescription:r})}};function hC(t){return typeof t.$comment=="string"}function mC(t){return typeof t=="object"&&!!t&&("$ref"in t||"$error"in t)}var yd=class{constructor(e){this.ignoreProperties=new Set(["$container","$containerProperty","$containerIndex","$document","$cstNode"]),this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider,this.commentProvider=e.documentation.CommentProvider}serialize(e,r){let n=r?.replacer,i=(s,a)=>this.replacer(s,a,r);return JSON.stringify(e,n?(s,a)=>n(s,a,i):i,r?.space)}deserialize(e){let r=JSON.parse(e);return this.linkNode(r,r),r}replacer(e,r,{refText:n,sourceText:i,textRegions:o,comments:s}={}){var a,l,u;if(!this.ignoreProperties.has(e))if(Yn(r)){let c=r.ref,f=n?r.$refText:void 0;return c?{$refText:f,$ref:"#"+(c&&this.astNodeLocator.getAstNodePath(c))}:{$refText:f,$error:(l=(a=r.error)===null||a===void 0?void 0:a.message)!==null&&l!==void 0?l:"Could not resolve reference"}}else{let c;if(o&&kt(r)&&(c=this.addAstNodeRegionWithAssignmentsTo(Object.assign({},r)),(!e||r.$document)&&c?.$textRegion))try{c.$textRegion.documentURI=ne(r).uri.toString()}catch{}return i&&!e&&kt(r)&&(c??(c=Object.assign({},r)),c.$sourceText=(u=r.$cstNode)===null||u===void 0?void 0:u.text),s&&kt(r)&&(c??(c=Object.assign({},r)),c.$comment=this.commentProvider.getComment(r)),c??r}}addAstNodeRegionWithAssignmentsTo(e){let r=n=>({offset:n.offset,end:n.end,length:n.length,range:n.range});if(e.$cstNode){let n=e.$textRegion=r(e.$cstNode),i=n.assignments={};return Object.keys(e).filter(o=>!o.startsWith("$")).forEach(o=>{let s=Ei(e.$cstNode,o).map(r);s.length!==0&&(i[o]=s)}),e}}linkNode(e,r,n,i,o){for(let[a,l]of Object.entries(e))if(Array.isArray(l))for(let u=0;u<l.length;u++){let c=l[u];mC(c)?l[u]=this.reviveReference(e,a,r,c):kt(c)&&this.linkNode(c,r,e,a,u)}else mC(l)?e[a]=this.reviveReference(e,a,r,l):kt(l)&&this.linkNode(l,r,e,a);let s=e;s.$container=n,s.$containerProperty=i,s.$containerIndex=o}reviveReference(e,r,n,i){let o=i.$refText;if(i.$ref){let s=this.getRefNode(n,i.$ref);return o||(o=this.nameProvider.getName(s)),{$refText:o??"",ref:s}}else if(i.$error){let s={$refText:o??""};return s.error={container:e,property:r,message:i.$error,reference:s},s}else return}getRefNode(e,r){return this.astNodeLocator.getAstNode(e,r.substring(1))}};var Td=class{register(e){if(!this.singleton&&!this.map){this.singleton=e;return}if(!this.map&&(this.map={},this.singleton)){for(let r of this.singleton.LanguageMetaData.fileExtensions)this.map[r]=this.singleton;this.singleton=void 0}for(let r of e.LanguageMetaData.fileExtensions)this.map[r]!==void 0&&this.map[r]!==e&&console.warn(`The file extension ${r} is used by multiple languages. It is now assigned to '${e.LanguageMetaData.languageId}'.`),this.map[r]=e}getServices(e){if(this.singleton!==void 0)return this.singleton;if(this.map===void 0)throw new Error("The service registry is empty. Use `register` to register the services of a language.");let r=ve.extname(e),n=this.map[r];if(!n)throw new Error(`The service registry contains no services for the extension '${r}'.`);return n}get all(){return this.singleton!==void 0?[this.singleton]:this.map!==void 0?Object.values(this.map):[]}};var gC=de(be(),1);var vd=class{constructor(e){this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider}createDescription(e,r,n=ne(e)){r??(r=this.nameProvider.getName(e));let i=this.astNodeLocator.getAstNodePath(e);if(!r)throw new Error(`Node at path ${i} has no name.`);let o,s=()=>{var a;return o??(o=nr((a=this.nameProvider.getNameNode(e))!==null&&a!==void 0?a:e.$cstNode))};return{node:e,name:r,get nameSegment(){return s()},selectionSegment:nr(e.$cstNode),type:e.$type,documentUri:n.uri,path:i}}},Rd=class{constructor(e){this.nodeLocator=e.workspace.AstNodeLocator}async createDescriptions(e,r=gC.CancellationToken.None){let n=[],i=e.parseResult.value;for(let o of Zn(i))await Ze(r),Ku(o).filter(s=>!Yo(s)).forEach(s=>{let a=this.createDescription(s);a&&n.push(a)});return n}createDescription(e){let r=e.reference.$nodeDescription,n=e.reference.$refNode;if(!r||!n)return;let i=ne(e.container).uri;return{sourceUri:i,sourcePath:this.nodeLocator.getAstNodePath(e.container),targetUri:r.documentUri,targetPath:r.path,segment:nr(n),local:ve.equals(r.documentUri,i)}}};var xd=class{constructor(){this.segmentSeparator="/",this.indexSeparator="@"}getAstNodePath(e){if(e.$container){let r=this.getAstNodePath(e.$container),n=this.getPathSegment(e);return r+this.segmentSeparator+n}return""}getPathSegment({$containerProperty:e,$containerIndex:r}){if(!e)throw new Error("Missing '$containerProperty' in AST node.");return r!==void 0?e+this.indexSeparator+r:e}getAstNode(e,r){return r.split(this.segmentSeparator).reduce((i,o)=>{if(!i||o.length===0)return i;let s=o.indexOf(this.indexSeparator);if(s>0){let a=o.substring(0,s),l=parseInt(o.substring(s+1)),u=i[a];return u?.[l]}return i[o]},e)}};var yC=de(Ct(),1),Sd=class{constructor(e){this.settings={},this.workspaceConfig=!1,this.initialized=!1,this.serviceRegistry=e.ServiceRegistry,this.connection=e.lsp.Connection,e.lsp.LanguageServer.onInitialize(r=>{var n,i;this.workspaceConfig=(i=(n=r.capabilities.workspace)===null||n===void 0?void 0:n.configuration)!==null&&i!==void 0?i:!1}),e.lsp.LanguageServer.onInitialized(r=>{var n;let i=this.serviceRegistry.all;(n=e.lsp.Connection)===null||n===void 0||n.client.register(yC.DidChangeConfigurationNotification.type,{section:i.map(o=>this.toSectionName(o.LanguageMetaData.languageId))})})}async initialize(){if(this.workspaceConfig&&this.connection){let r=this.serviceRegistry.all.map(i=>({section:this.toSectionName(i.LanguageMetaData.languageId)})),n=await this.connection.workspace.getConfiguration(r);r.forEach((i,o)=>{this.updateSectionConfiguration(i.section,n[o])})}this.initialized=!0}updateConfiguration(e){e.settings&&Object.keys(e.settings).forEach(r=>{this.updateSectionConfiguration(r,e.settings[r])})}updateSectionConfiguration(e,r){this.settings[e]=r}async getConfiguration(e,r){this.initialized||await this.initialize();let n=this.toSectionName(e);if(this.settings[n])return this.settings[n][r]}toSectionName(e){return`${e}`}};var ma=de(be(),1);var bd=class{constructor(e){this.updateBuildOptions={validation:{categories:["built-in","fast"]}},this.updateListeners=[],this.buildPhaseListeners=new Le,this.buildState=new Map,this.langiumDocuments=e.workspace.LangiumDocuments,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory,this.indexManager=e.workspace.IndexManager,this.serviceRegistry=e.ServiceRegistry}async build(e,r={},n=ma.CancellationToken.None){var i,o;for(let s of e){let a=s.uri.toString();if(s.state===je.Validated){if(typeof r.validation=="boolean"&&r.validation)s.state=je.IndexedReferences,s.diagnostics=void 0,this.buildState.delete(a);else if(typeof r.validation=="object"){let l=this.buildState.get(a),u=(i=l?.result)===null||i===void 0?void 0:i.validationChecks;if(u){let f=((o=r.validation.categories)!==null&&o!==void 0?o:us.all).filter(m=>!u.includes(m));f.length>0&&(this.buildState.set(a,{completed:!1,options:{validation:Object.assign(Object.assign({},r.validation),{categories:f})},result:l.result}),s.state=je.IndexedReferences)}}}else this.buildState.delete(a)}await this.buildDocuments(e,r,n)}async update(e,r,n=ma.CancellationToken.None){for(let s of r)this.langiumDocuments.deleteDocument(s),this.buildState.delete(s.toString());this.indexManager.remove(r);for(let s of e)this.langiumDocuments.invalidateDocument(s)||this.langiumDocuments.getOrCreateDocument(s),this.buildState.delete(s.toString());let i=ie(e).concat(r).map(s=>s.toString()).toSet();this.langiumDocuments.all.filter(s=>!i.has(s.uri.toString())&&this.shouldRelink(s,i)).forEach(s=>{this.serviceRegistry.getServices(s.uri).references.Linker.unlink(s),s.state=Math.min(s.state,je.ComputedScopes),s.diagnostics=void 0});for(let s of this.updateListeners)s(e,r);await Ze(n);let o=this.langiumDocuments.all.filter(s=>{var a;return s.state<je.Linked||!(!((a=this.buildState.get(s.uri.toString()))===null||a===void 0)&&a.completed)}).toArray();await this.buildDocuments(o,this.updateBuildOptions,n)}shouldRelink(e,r){return e.references.some(n=>n.error!==void 0)?!0:this.indexManager.isAffected(e,r)}onUpdate(e){return this.updateListeners.push(e),ma.Disposable.create(()=>{let r=this.updateListeners.indexOf(e);r>=0&&this.updateListeners.splice(r,1)})}async buildDocuments(e,r,n){this.prepareBuild(e,r),await this.runCancelable(e,je.Parsed,n,o=>{this.langiumDocumentFactory.update(o)}),await this.runCancelable(e,je.IndexedContent,n,o=>this.indexManager.updateContent(o,n)),await this.runCancelable(e,je.ComputedScopes,n,async o=>{let s=this.serviceRegistry.getServices(o.uri).references.ScopeComputation;o.precomputedScopes=await s.computeLocalScopes(o,n)}),await this.runCancelable(e,je.Linked,n,o=>this.serviceRegistry.getServices(o.uri).references.Linker.link(o,n)),await this.runCancelable(e,je.IndexedReferences,n,o=>this.indexManager.updateReferences(o,n));let i=e.filter(o=>this.shouldValidate(o));await this.runCancelable(i,je.Validated,n,o=>this.validate(o,n));for(let o of e){let s=this.buildState.get(o.uri.toString());s&&(s.completed=!0)}}prepareBuild(e,r){for(let n of e){let i=n.uri.toString(),o=this.buildState.get(i);(!o||o.completed)&&this.buildState.set(i,{completed:!1,options:r,result:o?.result})}}async runCancelable(e,r,n,i){let o=e.filter(s=>s.state<r);for(let s of o)await Ze(n),await i(s),s.state=r;await this.notifyBuildPhase(o,r,n)}onBuildPhase(e,r){return this.buildPhaseListeners.add(e,r),ma.Disposable.create(()=>{this.buildPhaseListeners.delete(e,r)})}async notifyBuildPhase(e,r,n){if(e.length===0)return;let i=this.buildPhaseListeners.get(r);for(let o of i)await Ze(n),await o(e,n)}shouldValidate(e){return!!this.getBuildOptions(e).validation}async validate(e,r){var n,i;let o=this.serviceRegistry.getServices(e.uri).validation.DocumentValidator,s=this.getBuildOptions(e).validation,a=typeof s=="object"?s:void 0,l=await o.validateDocument(e,a,r);e.diagnostics?e.diagnostics.push(...l):e.diagnostics=l;let u=this.buildState.get(e.uri.toString());if(u){(n=u.result)!==null&&n!==void 0||(u.result={});let c=(i=a?.categories)!==null&&i!==void 0?i:us.all;u.result.validationChecks?u.result.validationChecks.push(...c):u.result.validationChecks=[...c]}}getBuildOptions(e){var r,n;return(n=(r=this.buildState.get(e.uri.toString()))===null||r===void 0?void 0:r.options)!==null&&n!==void 0?n:{}}};var dg=de(be(),1);var Ad=class{constructor(e){this.simpleIndex=new Map,this.simpleTypeIndex=new lc,this.referenceIndex=new Map,this.documents=e.workspace.LangiumDocuments,this.serviceRegistry=e.ServiceRegistry,this.astReflection=e.AstReflection}findAllReferences(e,r){let n=ne(e).uri,i=[];return this.referenceIndex.forEach(o=>{o.forEach(s=>{ve.equals(s.targetUri,n)&&s.targetPath===r&&i.push(s)})}),ie(i)}allElements(e,r){let n=ie(this.simpleIndex.keys());return r&&(n=n.filter(i=>!r||r.has(i))),n.map(i=>this.getFileDescriptions(i,e)).flat()}getFileDescriptions(e,r){var n;return r?this.simpleTypeIndex.get(e,r,()=>{var o;return((o=this.simpleIndex.get(e))!==null&&o!==void 0?o:[]).filter(a=>this.astReflection.isSubtype(a.type,r))}):(n=this.simpleIndex.get(e))!==null&&n!==void 0?n:[]}remove(e){for(let r of e){let n=r.toString();this.simpleIndex.delete(n),this.simpleTypeIndex.clear(n),this.referenceIndex.delete(n)}}async updateContent(e,r=dg.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).references.ScopeComputation.computeExports(e,r);for(let s of i)s.node=void 0;let o=e.uri.toString();this.simpleIndex.set(o,i),this.simpleTypeIndex.clear(o)}async updateReferences(e,r=dg.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).workspace.ReferenceDescriptionProvider.createDescriptions(e,r);this.referenceIndex.set(e.uri.toString(),i)}isAffected(e,r){let n=this.referenceIndex.get(e.uri.toString());return n?n.some(i=>!i.local&&r.has(i.targetUri.toString())):!1}};var TC=de(be(),1);var Cd=class{constructor(e){this.initialBuildOptions={},this.serviceRegistry=e.ServiceRegistry,this.langiumDocuments=e.workspace.LangiumDocuments,this.documentBuilder=e.workspace.DocumentBuilder,this.fileSystemProvider=e.workspace.FileSystemProvider,this.mutex=e.workspace.MutexLock,e.lsp.LanguageServer.onInitialize(r=>{var n;this.folders=(n=r.workspaceFolders)!==null&&n!==void 0?n:void 0}),e.lsp.LanguageServer.onInitialized(r=>{this.mutex.lock(n=>{var i;return this.initializeWorkspace((i=this.folders)!==null&&i!==void 0?i:[],n)})})}async initializeWorkspace(e,r=TC.CancellationToken.None){let n=this.serviceRegistry.all.flatMap(s=>s.LanguageMetaData.fileExtensions),i=[],o=s=>{i.push(s),this.langiumDocuments.hasDocument(s.uri)||this.langiumDocuments.addDocument(s)};await this.loadAdditionalDocuments(e,o),await Promise.all(e.map(s=>[s,this.getRootFolder(s)]).map(async s=>this.traverseFolder(...s,n,o))),await Ze(r),await this.documentBuilder.build(i,this.initialBuildOptions,r)}loadAdditionalDocuments(e,r){return Promise.resolve()}getRootFolder(e){return Yt.parse(e.uri)}async traverseFolder(e,r,n,i){let o=await this.fileSystemProvider.readDirectory(r);await Promise.all(o.map(async s=>{if(this.includeEntry(e,s,n)){if(s.isDirectory)await this.traverseFolder(e,s.uri,n,i);else if(s.isFile){let a=this.langiumDocuments.getOrCreateDocument(s.uri);i(a)}}}))}includeEntry(e,r,n){let i=ve.basename(r.uri);if(i.startsWith("."))return!1;if(r.isDirectory)return i!=="node_modules"&&i!=="out";if(r.isFile){let o=ve.extname(r.uri);return n.includes(o)}return!1}};var wd=class{constructor(e){let r=e.parser.TokenBuilder.buildTokens(e.Grammar,{caseInsensitive:e.LanguageMetaData.caseInsensitive});this.tokenTypes=this.toTokenTypeDictionary(r);let n=vC(r)?Object.values(r):r;this.chevrotainLexer=new mt(n,{positionTracking:"full"})}get definition(){return this.tokenTypes}tokenize(e){var r;let n=this.chevrotainLexer.tokenize(e);return{tokens:n.tokens,errors:n.errors,hidden:(r=n.groups.hidden)!==null&&r!==void 0?r:[]}}toTokenTypeDictionary(e){if(vC(e))return e;let r=RC(e)?Object.values(e.modes).flat():e,n={};return r.forEach(i=>n[i.name]=i),n}};function tq(t){return Array.isArray(t)&&(t.length===0||"name"in t[0])}function RC(t){return t&&"modes"in t&&"defaultMode"in t}function vC(t){return!tq(t)&&!RC(t)}var Se=de(be(),1);function bC(t,e,r){let n,i;typeof t=="string"?(i=e,n=r):(i=t.range.start,n=e),i||(i=Se.Position.create(0,0));let o=CC(t),s=hg(n),a=nq({lines:o,position:i,options:s});return lq({index:0,tokens:a,position:i})}function AC(t,e){let r=hg(e),n=CC(t);if(n.length===0)return!1;let i=n[0],o=n[n.length-1],s=r.start,a=r.end;return!!s?.exec(i)&&!!a?.exec(o)}function CC(t){let e="";return typeof t=="string"?e=t:e=t.text,e.split(Ka)}var xC=/\s*(@([\p{L}][\p{L}\p{N}]*)?)/uy,rq=/\{(@[\p{L}][\p{L}\p{N}]*)(\s*)([^\r\n}]+)?\}/gu;function nq(t){var e,r,n;let i=[],o=t.position.line,s=t.position.character;for(let a=0;a<t.lines.length;a++){let l=a===0,u=a===t.lines.length-1,c=t.lines[a],f=0;if(l&&t.options.start){let T=(e=t.options.start)===null||e===void 0?void 0:e.exec(c);T&&(f=T.index+T[0].length)}else{let T=(r=t.options.line)===null||r===void 0?void 0:r.exec(c);T&&(f=T.index+T[0].length)}if(u){let T=(n=t.options.end)===null||n===void 0?void 0:n.exec(c);T&&(c=c.substring(0,T.index))}if(c=c.substring(0,aq(c)),mg(c,0)>=c.length){if(i.length>0){let T=Se.Position.create(o,s);i.push({type:"break",content:"",range:Se.Range.create(T,T)})}}else{xC.lastIndex=f;let T=xC.exec(c);if(T){let b=T[0],C=T[1],_=Se.Position.create(o,s+f),w=Se.Position.create(o,s+f+b.length);i.push({type:"tag",content:C,range:Se.Range.create(_,w)}),f+=b.length,f=mg(c,f)}if(f<c.length){let b=c.substring(f),C=Array.from(b.matchAll(rq));i.push(...iq(C,b,o,s+f))}}o++,s=0}return i.length>0&&i[i.length-1].type==="break"?i.slice(0,-1):i}function iq(t,e,r,n){let i=[];if(t.length===0){let o=Se.Position.create(r,n),s=Se.Position.create(r,n+e.length);i.push({type:"text",content:e,range:Se.Range.create(o,s)})}else{let o=0;for(let a of t){let l=a.index,u=e.substring(o,l);u.length>0&&i.push({type:"text",content:e.substring(o,l),range:Se.Range.create(Se.Position.create(r,o+n),Se.Position.create(r,l+n))});let c=u.length+1,f=a[1];if(i.push({type:"inline-tag",content:f,range:Se.Range.create(Se.Position.create(r,o+c+n),Se.Position.create(r,o+c+f.length+n))}),c+=f.length,a.length===4){c+=a[2].length;let m=a[3];i.push({type:"text",content:m,range:Se.Range.create(Se.Position.create(r,o+c+n),Se.Position.create(r,o+c+m.length+n))})}else i.push({type:"text",content:"",range:Se.Range.create(Se.Position.create(r,o+c+n),Se.Position.create(r,o+c+n))});o=l+a[0].length}let s=e.substring(o);s.length>0&&i.push({type:"text",content:s,range:Se.Range.create(Se.Position.create(r,o+n),Se.Position.create(r,o+n+s.length))})}return i}var oq=/\S/,sq=/\s*$/;function mg(t,e){let r=t.substring(e).match(oq);return r?e+r.index:t.length}function aq(t){let e=t.match(sq);if(e&&typeof e.index=="number")return e.index}function lq(t){var e,r,n,i;let o=Se.Position.create(t.position.line,t.position.character);if(t.tokens.length===0)return new kd([],Se.Range.create(o,o));let s=[];for(;t.index<t.tokens.length;){let u=uq(t,s[s.length-1]);u&&s.push(u)}let a=(r=(e=s[0])===null||e===void 0?void 0:e.range.start)!==null&&r!==void 0?r:o,l=(i=(n=s[s.length-1])===null||n===void 0?void 0:n.range.end)!==null&&i!==void 0?i:o;return new kd(s,Se.Range.create(a,l))}function uq(t,e){let r=t.tokens[t.index];if(r.type==="tag")return kC(t,!1);if(r.type==="text"||r.type==="inline-tag")return wC(t);cq(r,e),t.index++}function cq(t,e){if(e){let r=new Ed("",t.range);"inlines"in e?e.inlines.push(r):e.content.inlines.push(r)}}function wC(t){let e=t.tokens[t.index],r=e,n=e,i=[];for(;e&&e.type!=="break"&&e.type!=="tag";)i.push(fq(t)),n=e,e=t.tokens[t.index];return new ql(i,Se.Range.create(r.range.start,n.range.end))}function fq(t){return t.tokens[t.index].type==="inline-tag"?kC(t,!0):EC(t)}function kC(t,e){let r=t.tokens[t.index++],n=r.content.substring(1),i=t.tokens[t.index];if(i?.type==="text")if(e){let o=EC(t);return new Ul(n,new ql([o],o.range),e,Se.Range.create(r.range.start,o.range.end))}else{let o=wC(t);return new Ul(n,o,e,Se.Range.create(r.range.start,o.range.end))}else{let o=r.range;return new Ul(n,new ql([],o),e,o)}}function EC(t){let e=t.tokens[t.index++];return new Ed(e.content,e.range)}function hg(t){if(!t)return hg({start:"/**",end:"*/",line:"*"});let{start:e,end:r,line:n}=t;return{start:pg(e,!0),end:pg(r,!1),line:pg(n,!0)}}function pg(t,e){if(typeof t=="string"||typeof t=="object"){let r=typeof t=="string"?ri(t):t.source;return e?new RegExp(`^\\s*${r}`):new RegExp(`\\s*${r}\\s*$`)}else return t}var kd=class{constructor(e,r){this.elements=e,this.range=r}getTag(e){return this.getAllTags().find(r=>r.name===e)}getTags(e){return this.getAllTags().filter(r=>r.name===e)}getAllTags(){return this.elements.filter(e=>"name"in e)}toString(){let e="";for(let r of this.elements)if(e.length===0)e=r.toString();else{let n=r.toString();e+=SC(e)+n}return e.trim()}toMarkdown(e){let r="";for(let n of this.elements)if(r.length===0)r=n.toMarkdown(e);else{let i=n.toMarkdown(e);r+=SC(r)+i}return r.trim()}},Ul=class{constructor(e,r,n,i){this.name=e,this.content=r,this.inline=n,this.range=i}toString(){let e=`@${this.name}`,r=this.content.toString();return this.content.inlines.length===1?e=`${e} ${r}`:this.content.inlines.length>1&&(e=`${e}
${r}`),this.inline?`{${e}}`:e}toMarkdown(e){let r=this.content.toMarkdown(e);if(this.inline){let o=dq(this.name,r,e??{});if(typeof o=="string")return o}let n="";e?.tag==="italic"||e?.tag===void 0?n="*":e?.tag==="bold"?n="**":e?.tag==="bold-italic"&&(n="***");let i=`${n}@${this.name}${n}`;return this.content.inlines.length===1?i=`${i} \u2014 ${r}`:this.content.inlines.length>1&&(i=`${i}
${r}`),this.inline?`{${i}}`:i}};function dq(t,e,r){var n,i;if(t==="linkplain"||t==="linkcode"||t==="link"){let o=e.indexOf(" "),s=e;if(o>0){let l=mg(e,o);s=e.substring(l),e=e.substring(0,o)}return(t==="linkcode"||t==="link"&&r.link==="code")&&(s=`\`${s}\``),(i=(n=r.renderLink)===null||n===void 0?void 0:n.call(r,e,s))!==null&&i!==void 0?i:pq(e,s)}}function pq(t,e){try{return Yt.parse(t,!0),`[${e}](${t})`}catch{return t}}var ql=class{constructor(e,r){this.inlines=e,this.range=r}toString(){let e="";for(let r=0;r<this.inlines.length;r++){let n=this.inlines[r],i=this.inlines[r+1];e+=n.toString(),i&&i.range.start.line>n.range.start.line&&(e+=`
`)}return e}toMarkdown(e){let r="";for(let n=0;n<this.inlines.length;n++){let i=this.inlines[n],o=this.inlines[n+1];r+=i.toMarkdown(e),o&&o.range.start.line>i.range.start.line&&(r+=`
`)}return r}},Ed=class{constructor(e,r){this.text=e,this.range=r}toString(){return this.text}toMarkdown(){return this.text}};function SC(t){return t.endsWith(`
`)?`
`:`

`}var $d=class{constructor(e){this.indexManager=e.shared.workspace.IndexManager,this.commentProvider=e.documentation.CommentProvider}getDocumentation(e){let r=this.commentProvider.getComment(e);if(r&&AC(r))return bC(r).toMarkdown({renderLink:(i,o)=>this.documentationLinkRenderer(e,i,o)})}documentationLinkRenderer(e,r,n){var i;let o=(i=this.findNameInPrecomputedScopes(e,r))!==null&&i!==void 0?i:this.findNameInGlobalScope(e,r);if(o&&o.nameSegment){let s=o.nameSegment.range.start.line+1,a=o.nameSegment.range.start.character+1,l=o.documentUri.with({fragment:`L${s},${a}`});return`[${n}](${l.toString()})`}else return}findNameInPrecomputedScopes(e,r){let i=ne(e).precomputedScopes;if(!i)return;let o=e;do{let a=i.get(o).find(l=>l.name===r);if(a)return a;o=o.$container}while(o)}findNameInGlobalScope(e,r){return this.indexManager.allElements().find(i=>i.name===r)}};var _d=class{constructor(e){this.grammarConfig=()=>e.parser.GrammarConfig}getComment(e){var r;return hC(e)?e.$comment:(r=wT(e.$cstNode,this.grammarConfig().multilineCommentRules))===null||r===void 0?void 0:r.text}};function cl(t){return{documentation:{CommentProvider:e=>new _d(e),DocumentationProvider:e=>new $d(e)},parser:{GrammarConfig:e=>HR(e),LangiumParser:e=>dC(e),CompletionParser:e=>fC(e),ValueConverter:()=>new hd,TokenBuilder:()=>new md,Lexer:e=>new wd(e),ParserErrorMessageProvider:()=>new Ml},lsp:{CompletionProvider:e=>new xs(e),DocumentSymbolProvider:e=>new Ec(e),HoverProvider:e=>new _c(e),FoldingRangeProvider:e=>new bs(e),ReferencesProvider:e=>new Lc(e),DefinitionProvider:e=>new ws(e),DocumentHighlightProvider:e=>new kc(e),RenameProvider:e=>new Mc(e)},workspace:{AstNodeLocator:()=>new xd,AstNodeDescriptionProvider:e=>new vd(e),ReferenceDescriptionProvider:e=>new Rd(e)},references:{Linker:e=>new gd(e),NameProvider:()=>new as,ScopeProvider:e=>new vs(e),ScopeComputation:e=>new Ts(e),References:e=>new As(e)},serializer:{JsonSerializer:e=>new yd(e)},validation:{DocumentValidator:e=>new dc(e),ValidationRegistry:e=>new nc(e)},shared:()=>t.shared}}function fl(t){return{ServiceRegistry:()=>new Td,lsp:{Connection:()=>t.connection,LanguageServer:e=>new Pc(e),WorkspaceSymbolProvider:e=>new Fc(e),NodeKindProvider:()=>new Dc,FuzzyMatcher:()=>new $c},workspace:{LangiumDocuments:e=>new Ic(e),LangiumDocumentFactory:e=>new Nc(e),DocumentBuilder:e=>new bd(e),TextDocuments:()=>new $C.TextDocuments(Xo),IndexManager:e=>new Ad(e),WorkspaceManager:e=>new Cd(e),FileSystemProvider:e=>t.fileSystemProvider(e),MutexLock:()=>new rc,ConfigurationProvider:e=>new Sd(e)}}}var ha=de(NC(),1);var mq="RFunction";var hq="Statement";var gq="Type";var yq="Unit";var Tq="AssignVar";var vq="Block";var IC="Expression";var PC="Primitive";var Rq="Speed";var DC="Structure";var OC="Var";var LC="VariableType";var xq="Void";var Sq="Cm";var bq="Mm";var MC="ArithmeticExpression";var FC="BooleanExpression";var Aq="Distance";var Cq="DistanceSensor";var wq="TimeSensor";var kq="Clock";var UC="Movement";var Eq="Condition";var $q="Loop";var _q="Int";var qC="BinaryExpression";var GC="PrimaryExpression";var jC="BooleanOperator";var HC="PrimaryBoolean";var Nq="Backward";var Iq="Forward";var Pq="Left";var Dq="Right";var Oq="Add";var Lq="Div";var Mq="Minus";var Fq="Mul";var Uq="CallFunction";var qq="CallVar";var Gq="Const";var jq="AND";var Hq="NOT";var Kq="OR";var Wq="Equals";var Bq="FALSE";var zq="Greater";var Vq="Lesser";var Xq="TRUE";var Gl=class extends lo{getAllTypes(){return["AND","Add","ArithmeticExpression","AssignVar","Backward","BinaryExpression","Block","BooleanExpression","BooleanOperator","CallFunction","CallVar","Clock","Cm","Condition","Const","Distance","DistanceSensor","Div","Equals","Expression","FALSE","Forward","Greater","Int","Left","Lesser","Loop","Minus","Mm","Movement","Mul","NOT","OR","PrimaryBoolean","PrimaryExpression","Primitive","Program","RFunction","Right","Speed","Statement","Structure","TRUE","TimeSensor","Type","Unit","Var","VariableType","Void"]}computeIsSubtype(e,r){switch(e){case Oq:case Lq:case Mq:case Fq:return this.isSubtype(qC,r);case jq:case Hq:case Kq:return this.isSubtype(jC,r);case MC:case FC:case Aq:case Cq:case wq:return this.isSubtype(IC,r);case Tq:case vq:case IC:case PC:case Rq:case DC:case OC:return this.isSubtype(hq,r);case Nq:case Iq:case Pq:case Dq:return this.isSubtype(UC,r);case qC:case GC:return this.isSubtype(MC,r);case jC:case HC:return this.isSubtype(FC,r);case Uq:case qq:case Gq:return this.isSubtype(GC,r);case kq:case UC:return this.isSubtype(PC,r);case Sq:case bq:return this.isSubtype(yq,r);case Eq:case $q:return this.isSubtype(DC,r);case Wq:case Bq:case zq:case Vq:case Xq:return this.isSubtype(HC,r);case _q:return this.isSubtype(LC,r);case LC:case xq:return this.isSubtype(gq,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){case"AssignVar:varidentifier":case"CallVar:varidentifier":return OC;case"CallFunction:functionidentifier":return mq;default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"Program":return{name:"Program",mandatory:[{name:"Rfunctions",type:"array"}]};case"Block":return{name:"Block",mandatory:[{name:"statement",type:"array"}]};case"CallFunction":return{name:"CallFunction",mandatory:[{name:"parameters",type:"array"}]};default:return{name:e,mandatory:[]}}}},Yae=new Gl;var Nd,KC=()=>Nd??(Nd=tc(`{
  "$type": "Grammar",
  "isDeclared": true,
  "name": "Robot",
  "imports": [],
  "rules": [
    {
      "$type": "ParserRule",
      "name": "Program",
      "entry": true,
      "returnType": {
        "$ref": "#/interfaces@0"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@0"
            }
          },
          {
            "$type": "Assignment",
            "feature": "Rfunctions",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@8"
              },
              "arguments": []
            },
            "cardinality": "+"
          }
        ]
      },
      "definesHiddenTokens": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Statement",
      "returnType": {
        "$ref": "#/interfaces@3"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@17"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@14"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@9"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@11"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@12"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@13"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@16"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@15"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@18"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@19"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@20"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@21"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@22"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@23"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@24"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@25"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@26"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@27"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@28"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@29"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@30"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@31"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@32"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@33"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@35"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@36"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@37"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@39"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@40"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Expression",
      "returnType": {
        "$ref": "#/interfaces@4"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@14"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@17"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@18"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@19"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@20"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@21"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@22"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@23"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@24"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@25"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@26"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@30"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@31"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@35"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@36"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@37"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@39"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@40"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Unit",
      "returnType": {
        "$ref": "#/interfaces@6"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@42"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@43"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "BinaryExpression",
      "returnType": {
        "$ref": "#/interfaces@21"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@24"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@25"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@22"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@23"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "BooleanExpression",
      "returnType": {
        "$ref": "#/interfaces@7"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@19"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@20"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@21"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@35"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@36"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@37"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@39"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@40"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ArithmeticExpression",
      "returnType": {
        "$ref": "#/interfaces@8"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@14"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@17"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@18"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@24"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@25"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@22"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@23"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PrimaryExpression",
      "returnType": {
        "$ref": "#/interfaces@9"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@14"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@17"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@18"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "RFunction",
      "returnType": {
        "$ref": "#/interfaces@1"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "let"
          },
          {
            "$type": "Assignment",
            "feature": "type",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@44"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "functionidentifier",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@10"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Keyword",
            "value": ")"
          },
          {
            "$type": "Assignment",
            "feature": "block",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@9"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Block",
      "returnType": {
        "$ref": "#/interfaces@2"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@2"
            }
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "statement",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@1"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "EString",
      "dataType": "string",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@50"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@48"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Speed",
      "returnType": {
        "$ref": "#/interfaces@5"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@5"
            }
          },
          {
            "$type": "Keyword",
            "value": "setSpeed"
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "speed",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@26"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Forward",
      "returnType": {
        "$ref": "#/interfaces@10"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "Forward"
          },
          {
            "$type": "Assignment",
            "feature": "distance",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@26"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Clock",
      "returnType": {
        "$ref": "#/interfaces@14"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@14"
            }
          },
          {
            "$type": "Keyword",
            "value": "Clock"
          },
          {
            "$type": "Assignment",
            "feature": "angle",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@41"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "CallFunction",
      "returnType": {
        "$ref": "#/interfaces@15"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "functionidentifier",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/interfaces@1"
              },
              "terminal": {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@10"
                },
                "arguments": []
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "parameters",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@2"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "parameters",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@2"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Var",
      "returnType": {
        "$ref": "#/interfaces@16"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "var"
          },
          {
            "$type": "Assignment",
            "feature": "type",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@45"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "varidentifier",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@48"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "="
              },
              {
                "$type": "Assignment",
                "feature": "expression",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@2"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AssignVar",
      "returnType": {
        "$ref": "#/interfaces@17"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "varidentifier",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/interfaces@16"
              },
              "terminal": {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@48"
                },
                "arguments": []
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Keyword",
            "value": "="
          },
          {
            "$type": "Assignment",
            "feature": "expression",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@2"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "CallVar",
      "returnType": {
        "$ref": "#/interfaces@18"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@18"
            }
          },
          {
            "$type": "Assignment",
            "feature": "varidentifier",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/interfaces@16"
              },
              "terminal": {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@48"
                },
                "arguments": []
              },
              "deprecatedSyntax": false
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Const",
      "returnType": {
        "$ref": "#/interfaces@19"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@19"
            }
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@41"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Equals",
      "returnType": {
        "$ref": "#/interfaces@20"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "leftExpression",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@4"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "=="
          },
          {
            "$type": "Assignment",
            "feature": "rightExpression",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@4"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Greater",
      "returnType": {
        "$ref": "#/interfaces@22"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "leftExpression",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@4"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ">"
          },
          {
            "$type": "Assignment",
            "feature": "rightExpression",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@4"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Lesser",
      "returnType": {
        "$ref": "#/interfaces@23"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "leftExpression",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@4"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "<"
          },
          {
            "$type": "Assignment",
            "feature": "rightExpression",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@4"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Add",
      "returnType": {
        "$ref": "#/interfaces@24"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "leftExpression",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@7"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "+"
              },
              {
                "$type": "Assignment",
                "feature": "rightExpression",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@4"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Minus",
      "returnType": {
        "$ref": "#/interfaces@25"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "leftExpression",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@7"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "-"
          },
          {
            "$type": "Assignment",
            "feature": "rightExpression",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@4"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Mul",
      "returnType": {
        "$ref": "#/interfaces@26"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "leftExpression",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@7"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "*"
          },
          {
            "$type": "Assignment",
            "feature": "rightExpression",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@4"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Div",
      "returnType": {
        "$ref": "#/interfaces@27"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "leftExpression",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@7"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "/"
          },
          {
            "$type": "Assignment",
            "feature": "rightExpression",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@4"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Distance",
      "returnType": {
        "$ref": "#/interfaces@13"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "valeur",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@6"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "in"
          },
          {
            "$type": "Assignment",
            "feature": "unit",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Backward",
      "returnType": {
        "$ref": "#/interfaces@28"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "Backward"
          },
          {
            "$type": "Assignment",
            "feature": "distance",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@26"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Left",
      "returnType": {
        "$ref": "#/interfaces@29"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "Left"
          },
          {
            "$type": "Assignment",
            "feature": "distance",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@26"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Right",
      "returnType": {
        "$ref": "#/interfaces@30"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "Right"
          },
          {
            "$type": "Assignment",
            "feature": "distance",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@26"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "DistanceSensor",
      "returnType": {
        "$ref": "#/interfaces@31"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@31"
            }
          },
          {
            "$type": "Keyword",
            "value": "getDistance"
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Keyword",
            "value": ")"
          },
          {
            "$type": "Keyword",
            "value": "in"
          },
          {
            "$type": "Assignment",
            "feature": "unit",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TimeSensor",
      "returnType": {
        "$ref": "#/interfaces@32"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@32"
            }
          },
          {
            "$type": "Keyword",
            "value": "getTimestamp"
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Condition",
      "returnType": {
        "$ref": "#/interfaces@33"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "if"
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "Condition",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@5"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          },
          {
            "$type": "Assignment",
            "feature": "then",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@1"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "else"
              },
              {
                "$type": "Assignment",
                "feature": "else",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@1"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Loop",
      "returnType": {
        "$ref": "#/interfaces@35"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "while"
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "Condition",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@5"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          },
          {
            "$type": "Assignment",
            "feature": "statement",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@1"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "BooleanOperator",
      "returnType": {
        "$ref": "#/interfaces@36"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@35"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@36"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@37"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "OR",
      "returnType": {
        "$ref": "#/interfaces@37"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@37"
            }
          },
          {
            "$type": "Assignment",
            "feature": "left",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@38"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "||"
              },
              {
                "$type": "Assignment",
                "feature": "right",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@34"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AND",
      "returnType": {
        "$ref": "#/interfaces@38"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@38"
            }
          },
          {
            "$type": "Assignment",
            "feature": "left",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@38"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "&&"
              },
              {
                "$type": "Assignment",
                "feature": "right",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@34"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "NOT",
      "returnType": {
        "$ref": "#/interfaces@39"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@39"
            }
          },
          {
            "$type": "Keyword",
            "value": "!"
          },
          {
            "$type": "Assignment",
            "feature": "right",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@34"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PrimaryBoolean",
      "returnType": {
        "$ref": "#/interfaces@40"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@39"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@40"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@19"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@20"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@21"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TRUE",
      "returnType": {
        "$ref": "#/interfaces@41"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@41"
            }
          },
          {
            "$type": "Keyword",
            "value": "TRUE"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "FALSE",
      "returnType": {
        "$ref": "#/interfaces@42"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@42"
            }
          },
          {
            "$type": "Keyword",
            "value": "FALSE"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "EInt",
      "dataType": "number",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "-",
            "cardinality": "?"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@49"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Cm",
      "returnType": {
        "$ref": "#/interfaces@43"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@43"
            }
          },
          {
            "$type": "Keyword",
            "value": "cm"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Mm",
      "returnType": {
        "$ref": "#/interfaces@44"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@44"
            }
          },
          {
            "$type": "Keyword",
            "value": "mm"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Type",
      "returnType": {
        "$ref": "#/interfaces@45"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@46"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@47"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "VariableType",
      "returnType": {
        "$ref": "#/interfaces@46"
      },
      "definition": {
        "$type": "RuleCall",
        "rule": {
          "$ref": "#/rules@47"
        },
        "arguments": []
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Void",
      "returnType": {
        "$ref": "#/interfaces@47"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@47"
            }
          },
          {
            "$type": "Keyword",
            "value": "void"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Int",
      "returnType": {
        "$ref": "#/interfaces@48"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@48"
            }
          },
          {
            "$type": "Keyword",
            "value": "int"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "TerminalRule",
      "name": "ID",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "TerminalGroup",
        "elements": [
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "^"
            },
            "cardinality": "?"
          },
          {
            "$type": "TerminalAlternatives",
            "elements": [
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "a"
                    },
                    "right": {
                      "$type": "Keyword",
                      "value": "z"
                    }
                  },
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "A"
                    },
                    "right": {
                      "$type": "Keyword",
                      "value": "Z"
                    }
                  }
                ]
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "_"
                }
              }
            ]
          },
          {
            "$type": "TerminalAlternatives",
            "elements": [
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "TerminalAlternatives",
                    "elements": [
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "a"
                        },
                        "right": {
                          "$type": "Keyword",
                          "value": "z"
                        }
                      },
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "A"
                        },
                        "right": {
                          "$type": "Keyword",
                          "value": "Z"
                        }
                      }
                    ]
                  },
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "_"
                    }
                  }
                ]
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "0"
                },
                "right": {
                  "$type": "Keyword",
                  "value": "9"
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "INT",
      "type": {
        "$type": "ReturnType",
        "name": "number"
      },
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "0"
        },
        "right": {
          "$type": "Keyword",
          "value": "9"
        },
        "cardinality": "+"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "STRING",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "TerminalAlternatives",
        "elements": [
          {
            "$type": "TerminalGroup",
            "elements": [
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "\\""
                }
              },
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "TerminalGroup",
                    "elements": [
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "\\\\"
                        }
                      },
                      {
                        "$type": "Wildcard"
                      }
                    ]
                  },
                  {
                    "$type": "NegatedToken",
                    "terminal": {
                      "$type": "TerminalAlternatives",
                      "elements": [
                        {
                          "$type": "CharacterRange",
                          "left": {
                            "$type": "Keyword",
                            "value": "\\\\"
                          }
                        },
                        {
                          "$type": "CharacterRange",
                          "left": {
                            "$type": "Keyword",
                            "value": "\\""
                          }
                        }
                      ]
                    }
                  }
                ],
                "cardinality": "*"
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "\\""
                }
              }
            ]
          },
          {
            "$type": "TerminalGroup",
            "elements": [
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "'"
                }
              },
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "TerminalGroup",
                    "elements": [
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "\\\\"
                        }
                      },
                      {
                        "$type": "Wildcard"
                      }
                    ]
                  },
                  {
                    "$type": "NegatedToken",
                    "terminal": {
                      "$type": "TerminalAlternatives",
                      "elements": [
                        {
                          "$type": "CharacterRange",
                          "left": {
                            "$type": "Keyword",
                            "value": "\\\\"
                          }
                        },
                        {
                          "$type": "CharacterRange",
                          "left": {
                            "$type": "Keyword",
                            "value": "'"
                          }
                        }
                      ]
                    }
                  }
                ],
                "cardinality": "*"
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "'"
                }
              }
            ]
          }
        ]
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "ML_COMMENT",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "TerminalGroup",
        "elements": [
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "/*"
            }
          },
          {
            "$type": "UntilToken",
            "terminal": {
              "$type": "CharacterRange",
              "left": {
                "$type": "Keyword",
                "value": "*/"
              }
            }
          }
        ]
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "SL_COMMENT",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "TerminalGroup",
        "elements": [
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "//"
            }
          },
          {
            "$type": "NegatedToken",
            "terminal": {
              "$type": "TerminalAlternatives",
              "elements": [
                {
                  "$type": "CharacterRange",
                  "left": {
                    "$type": "Keyword",
                    "value": "\\n"
                  }
                },
                {
                  "$type": "CharacterRange",
                  "left": {
                    "$type": "Keyword",
                    "value": "\\r"
                  }
                }
              ]
            }
          },
          {
            "$type": "TerminalGroup",
            "elements": [
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "\\r"
                },
                "cardinality": "?"
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "\\n"
                }
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "WS",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "TerminalAlternatives",
        "elements": [
          {
            "$type": "TerminalAlternatives",
            "elements": [
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": " "
                    }
                  },
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "\\t"
                    }
                  }
                ]
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "\\r"
                }
              }
            ]
          },
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "\\n"
            }
          }
        ],
        "cardinality": "+"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "name": "ANY_OTHER",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "Wildcard"
      },
      "fragment": false,
      "hidden": false
    }
  ],
  "definesHiddenTokens": false,
  "hiddenTokens": [],
  "interfaces": [
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "Rfunctions",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@1"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "Program",
      "superTypes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "functionidentifier",
          "type": {
            "$type": "SimpleType",
            "primitiveType": "string"
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "type",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@45"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "block",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@2"
            }
          },
          "isOptional": false
        }
      ],
      "name": "RFunction",
      "superTypes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "statement",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@3"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "Block",
      "superTypes": [
        {
          "$ref": "#/interfaces@3"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "Statement",
      "attributes": [],
      "superTypes": []
    },
    {
      "$type": "Interface",
      "name": "Expression",
      "superTypes": [
        {
          "$ref": "#/interfaces@3"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "speed",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@13"
            }
          },
          "isOptional": false
        }
      ],
      "name": "Speed",
      "superTypes": [
        {
          "$ref": "#/interfaces@3"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "Unit",
      "attributes": [],
      "superTypes": []
    },
    {
      "$type": "Interface",
      "name": "BooleanExpression",
      "superTypes": [
        {
          "$ref": "#/interfaces@4"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "ArithmeticExpression",
      "superTypes": [
        {
          "$ref": "#/interfaces@4"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "PrimaryExpression",
      "superTypes": [
        {
          "$ref": "#/interfaces@8"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Forward",
      "superTypes": [
        {
          "$ref": "#/interfaces@11"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "distance",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@13"
            }
          },
          "isOptional": false
        }
      ],
      "name": "Movement",
      "superTypes": [
        {
          "$ref": "#/interfaces@12"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "Primitive",
      "superTypes": [
        {
          "$ref": "#/interfaces@3"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "valeur",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@8"
            }
          }
        },
        {
          "$type": "TypeAttribute",
          "name": "unit",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@6"
            }
          },
          "isOptional": false
        }
      ],
      "name": "Distance",
      "superTypes": [
        {
          "$ref": "#/interfaces@4"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "angle",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "primitiveType": "number"
          }
        }
      ],
      "name": "Clock",
      "superTypes": [
        {
          "$ref": "#/interfaces@12"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "functionidentifier",
          "type": {
            "$type": "ReferenceType",
            "referenceType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@1"
              }
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "parameters",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@4"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "CallFunction",
      "superTypes": [
        {
          "$ref": "#/interfaces@9"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "varidentifier",
          "type": {
            "$type": "SimpleType",
            "primitiveType": "string"
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "type",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@46"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "expression",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@4"
            }
          },
          "isOptional": false
        }
      ],
      "name": "Var",
      "superTypes": [
        {
          "$ref": "#/interfaces@3"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "varidentifier",
          "type": {
            "$type": "ReferenceType",
            "referenceType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@16"
              }
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "expression",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@4"
            }
          },
          "isOptional": false
        }
      ],
      "name": "AssignVar",
      "superTypes": [
        {
          "$ref": "#/interfaces@3"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "varidentifier",
          "type": {
            "$type": "ReferenceType",
            "referenceType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@16"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "CallVar",
      "superTypes": [
        {
          "$ref": "#/interfaces@9"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "value",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "primitiveType": "number"
          }
        }
      ],
      "name": "Const",
      "superTypes": [
        {
          "$ref": "#/interfaces@9"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "rightExpression",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@21"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "leftExpression",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@21"
            }
          },
          "isOptional": false
        }
      ],
      "name": "Equals",
      "superTypes": [
        {
          "$ref": "#/interfaces@40"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "leftExpression",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@9"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "rightExpression",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@21"
            }
          },
          "isOptional": false
        }
      ],
      "name": "BinaryExpression",
      "superTypes": [
        {
          "$ref": "#/interfaces@8"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "rightExpression",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@21"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "leftExpression",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@21"
            }
          },
          "isOptional": false
        }
      ],
      "name": "Greater",
      "superTypes": [
        {
          "$ref": "#/interfaces@40"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "rightExpression",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@21"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "leftExpression",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@21"
            }
          },
          "isOptional": false
        }
      ],
      "name": "Lesser",
      "superTypes": [
        {
          "$ref": "#/interfaces@40"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "Add",
      "superTypes": [
        {
          "$ref": "#/interfaces@21"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Minus",
      "superTypes": [
        {
          "$ref": "#/interfaces@21"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Mul",
      "superTypes": [
        {
          "$ref": "#/interfaces@21"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Div",
      "superTypes": [
        {
          "$ref": "#/interfaces@21"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Backward",
      "superTypes": [
        {
          "$ref": "#/interfaces@11"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Left",
      "superTypes": [
        {
          "$ref": "#/interfaces@11"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Right",
      "superTypes": [
        {
          "$ref": "#/interfaces@11"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "distance",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@13"
            }
          }
        },
        {
          "$type": "TypeAttribute",
          "name": "unit",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@6"
            }
          },
          "isOptional": false
        }
      ],
      "name": "DistanceSensor",
      "superTypes": [
        {
          "$ref": "#/interfaces@4"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "CurrentMillis",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "primitiveType": "number"
          }
        }
      ],
      "name": "TimeSensor",
      "superTypes": [
        {
          "$ref": "#/interfaces@4"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "then",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@3"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "else",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@3"
            }
          }
        }
      ],
      "name": "Condition",
      "superTypes": [
        {
          "$ref": "#/interfaces@34"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "Condition",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@7"
            }
          },
          "isOptional": false
        }
      ],
      "name": "Structure",
      "superTypes": [
        {
          "$ref": "#/interfaces@3"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "statement",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@3"
            }
          },
          "isOptional": false
        }
      ],
      "name": "Loop",
      "superTypes": [
        {
          "$ref": "#/interfaces@34"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "BooleanOperator",
      "superTypes": [
        {
          "$ref": "#/interfaces@7"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "left",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@40"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "right",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@36"
            }
          },
          "isOptional": false
        }
      ],
      "name": "OR",
      "superTypes": [
        {
          "$ref": "#/interfaces@36"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "left",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@40"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "right",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@36"
            }
          },
          "isOptional": false
        }
      ],
      "name": "AND",
      "superTypes": [
        {
          "$ref": "#/interfaces@36"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "right",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@36"
            }
          },
          "isOptional": false
        }
      ],
      "name": "NOT",
      "superTypes": [
        {
          "$ref": "#/interfaces@36"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "PrimaryBoolean",
      "superTypes": [
        {
          "$ref": "#/interfaces@7"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "TRUE",
      "superTypes": [
        {
          "$ref": "#/interfaces@40"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "FALSE",
      "superTypes": [
        {
          "$ref": "#/interfaces@40"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Cm",
      "superTypes": [
        {
          "$ref": "#/interfaces@6"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Mm",
      "superTypes": [
        {
          "$ref": "#/interfaces@6"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Type",
      "attributes": [],
      "superTypes": []
    },
    {
      "$type": "Interface",
      "name": "VariableType",
      "superTypes": [
        {
          "$ref": "#/interfaces@45"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Void",
      "superTypes": [
        {
          "$ref": "#/interfaces@45"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Int",
      "superTypes": [
        {
          "$ref": "#/interfaces@46"
        }
      ],
      "attributes": []
    }
  ],
  "types": [],
  "usedGrammars": []
}`));var Yq={languageId:"robot",fileExtensions:[".rob"],caseInsensitive:!1},WC={AstReflection:()=>new Gl},BC={Grammar:()=>KC(),LanguageMetaData:()=>Yq,parser:{}};var Id=class{constructor(){this.checks={AND:this.weaveAND,Add:this.weaveAdd,AssignVar:this.weaveAssignVar,Backward:this.weaveBackward,Block:this.weaveBlock,CallFunction:this.weaveCallFunction,CallVar:this.weaveCallVar,Clock:this.weaveClock,Cm:this.weaveCm,Condition:this.weaveCondition,Const:this.weaveConst,Distance:this.weaveDistance,DistanceSensor:this.weaveDistanceSensor,Div:this.weaveDiv,Equals:this.weaveEquals,FALSE:this.weaveFALSE,Forward:this.weaveForward,Greater:this.weaveGreater,Int:this.weaveInt,Left:this.weaveLeft,Lesser:this.weaveLesser,Loop:this.weaveLoop,Minus:this.weaveMinus,Mm:this.weaveMm,Mul:this.weaveMul,NOT:this.weaveNOT,OR:this.weaveOR,Program:this.weaveProgram,RFunction:this.weaveRFunction,Right:this.weaveRight,Speed:this.weaveSpeed,TRUE:this.weaveTRUE,TimeSensor:this.weaveTimeSensor,Type:this.weaveType,Var:this.weaveVar,Void:this.weaveVoid}}weaveAND(e,r){e.accept=n=>n.visitAND(e)}weaveAdd(e,r){e.accept=n=>n.visitAdd(e)}weaveArithmeticExpression(e,r){e.accept=n=>n.visitArithmeticExpression(e)}weaveAssignVar(e,r){e.accept=n=>n.visitAssignVar(e)}weaveBackward(e,r){e.accept=n=>n.visitBackward(e)}weaveBinaryExpression(e,r){e.accept=n=>n.visitBinaryExpression(e)}weaveBlock(e,r){e.accept=n=>n.visitBlock(e)}weaveBooleanExpression(e,r){e.accept=n=>n.visitBooleanExpression(e)}weaveBooleanOperator(e,r){e.accept=n=>n.visitBooleanOperator(e)}weaveCallFunction(e,r){e.accept=n=>n.visitCallFunction(e)}weaveCallVar(e,r){e.accept=n=>n.visitCallVar(e)}weaveClock(e,r){e.accept=n=>n.visitClock(e)}weaveCm(e,r){e.accept=n=>n.visitCm(e)}weaveCondition(e,r){e.accept=n=>n.visitCondition(e)}weaveConst(e,r){e.accept=n=>n.visitConst(e)}weaveDistance(e,r){e.accept=n=>n.visitDistance(e)}weaveDistanceSensor(e,r){e.accept=n=>n.visitDistanceSensor(e)}weaveDiv(e,r){e.accept=n=>n.visitDiv(e)}weaveEquals(e,r){e.accept=n=>n.visitEquals(e)}weaveExpression(e,r){e.accept=n=>n.visitExpression(e)}weaveFALSE(e,r){e.accept=n=>n.visitFALSE(e)}weaveForward(e,r){e.accept=n=>n.visitForward(e)}weaveGreater(e,r){e.accept=n=>n.visitGreater(e)}weaveInt(e,r){e.accept=n=>n.visitInt(e)}weaveLeft(e,r){e.accept=n=>n.visitLeft(e)}weaveLesser(e,r){e.accept=n=>n.visitLesser(e)}weaveLoop(e,r){e.accept=n=>n.visitLoop(e)}weaveMinus(e,r){e.accept=n=>n.visitMinus(e)}weaveMm(e,r){e.accept=n=>n.visitMm(e)}weaveMovement(e,r){e.accept=n=>n.visitMovement(e)}weaveMul(e,r){e.accept=n=>n.visitMul(e)}weaveNOT(e,r){e.accept=n=>n.visitNOT(e)}weaveOR(e,r){e.accept=n=>n.visitOR(e)}weavePrimaryBoolean(e,r){e.accept=n=>n.visitPrimaryBoolean(e)}weavePrimaryExpression(e,r){e.accept=n=>n.visitPrimaryExpression(e)}weavePrimitive(e,r){e.accept=n=>n.visitPrimitive(e)}weaveProgram(e,r){e.accept=n=>n.visitProgram(e)}weaveRFunction(e,r){e.accept=n=>n.visitRFunction(e)}weaveRight(e,r){e.accept=n=>n.visitRight(e)}weaveSpeed(e,r){e.accept=n=>n.visitSpeed(e)}weaveStatement(e,r){e.accept=n=>n.visitStatement(e)}weaveStructure(e,r){e.accept=n=>n.visitStructure(e)}weaveTRUE(e,r){e.accept=n=>n.visitTRUE(e)}weaveTimeSensor(e,r){e.accept=n=>n.visitTimeSensor(e)}weaveType(e,r){e.accept=n=>n.visitType(e)}weaveUnit(e,r){e.accept=n=>n.visitUnit(e)}weaveVar(e,r){e.accept=n=>n.visitVar(e)}weaveVariableType(e,r){e.accept=n=>n.visitVariableType(e)}weaveVoid(e,r){e.accept=n=>n.visitVoid(e)}};var Pd=class{};var Jq={validation:{RobotValidator:()=>new Pd,RobotAcceptWeaver:()=>new Id}};function zC(t){let e=co(fl(t),WC),r=co(cl({shared:e}),BC,Jq);return e.ServiceRegistry.register(r),{shared:e,Robot:r}}var Qq=new ha.BrowserMessageReader(self),Zq=new ha.BrowserMessageWriter(self),eG=(0,ha.createConnection)(Qq,Zq),{shared:tG}=zC(Object.assign({connection:eG},Hc));$R(tG);})();
/*! Bundled license information:

lodash-es/lodash.js:
  (**
   * @license
   * Lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="es" -o ./`
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)
*/
