/* @license
Papa Parse
v5.4.1
https://github.com/mholt/PapaParse
License: MIT
*/
(function(e,t){"function"==typeof define&&define.amd?define([],t):"object"==typeof module&&"undefined"!=typeof exports?module.exports=t():e.Papa=t()})(this,(function e(){"use strict"
var t="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==t?t:{}
var i=!t.document&&!!t.postMessage,r=t.IS_PAPA_WORKER||!1,n={},s=0,a={parse:function(i,r){var o=(r=r||{}).dynamicTyping||!1
b(o)&&(r.dynamicTypingFunction=o,o={})
if(r.dynamicTyping=o,r.transform=!!b(r.transform)&&r.transform,r.worker&&a.WORKERS_SUPPORTED){var u=function(){if(!a.WORKERS_SUPPORTED)return!1
var i=(o=t.URL||t.webkitURL||null,u=e.toString(),a.BLOB_URL||(a.BLOB_URL=o.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",u,")();"],{type:"text/javascript"})))),r=new t.Worker(i)
var o,u
return r.onmessage=m,r.id=s++,n[r.id]=r,r}()
return u.userStep=r.step,u.userChunk=r.chunk,u.userComplete=r.complete,u.userError=r.error,r.step=b(r.step),r.chunk=b(r.chunk),r.complete=b(r.complete),r.error=b(r.error),delete r.worker,void u.postMessage({input:i,config:r,workerId:u.id})}var p=null
if(i===a.NODE_STREAM_INPUT&&"undefined"==typeof PAPA_BROWSER_CONTEXT)return(p=new c(r)).getStream()
"string"==typeof i?(i=function(e){if(65279===e.charCodeAt(0))return e.slice(1)
return e}(i),p=r.download?new h(r):new d(r)):!0===i.readable&&b(i.read)&&b(i.on)?p=new l(r):(t.File&&i instanceof File||i instanceof Object)&&(p=new f(r))
return p.stream(i)},unparse:function(e,t){var i=!1,r=!0,n=",",s="\r\n",o='"',u=o+o,h=!1,f=null,d=!1;(function(){if("object"!=typeof t)return
"string"!=typeof t.delimiter||a.BAD_DELIMITERS.filter((function(e){return-1!==t.delimiter.indexOf(e)})).length||(n=t.delimiter);("boolean"==typeof t.quotes||"function"==typeof t.quotes||Array.isArray(t.quotes))&&(i=t.quotes)
"boolean"!=typeof t.skipEmptyLines&&"string"!=typeof t.skipEmptyLines||(h=t.skipEmptyLines)
"string"==typeof t.newline&&(s=t.newline)
"string"==typeof t.quoteChar&&(o=t.quoteChar)
"boolean"==typeof t.header&&(r=t.header)
if(Array.isArray(t.columns)){if(0===t.columns.length)throw new Error("Option columns is empty")
f=t.columns}void 0!==t.escapeChar&&(u=t.escapeChar+o);("boolean"==typeof t.escapeFormulae||t.escapeFormulae instanceof RegExp)&&(d=t.escapeFormulae instanceof RegExp?t.escapeFormulae:/^[=+\-@\t\r].*$/)})()
var l=new RegExp(_(o),"g")
"string"==typeof e&&(e=JSON.parse(e))
if(Array.isArray(e)){if(!e.length||Array.isArray(e[0]))return c(null,e,h)
if("object"==typeof e[0])return c(f||Object.keys(e[0]),e,h)}else if("object"==typeof e)return"string"==typeof e.data&&(e.data=JSON.parse(e.data)),Array.isArray(e.data)&&(e.fields||(e.fields=e.meta&&e.meta.fields||f),e.fields||(e.fields=Array.isArray(e.data[0])?e.fields:"object"==typeof e.data[0]?Object.keys(e.data[0]):[]),Array.isArray(e.data[0])||"object"==typeof e.data[0]||(e.data=[e.data])),c(e.fields||[],e.data||[],h)
throw new Error("Unable to serialize unrecognized input")
function c(e,t,i){var a=""
"string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t))
var o=Array.isArray(e)&&e.length>0,u=!Array.isArray(t[0])
if(o&&r){for(var h=0;h<e.length;h++)h>0&&(a+=n),a+=p(e[h],h)
t.length>0&&(a+=s)}for(var f=0;f<t.length;f++){var d=o?e.length:t[f].length,l=!1,c=o?0===Object.keys(t[f]).length:0===t[f].length
if(i&&!o&&(l="greedy"===i?""===t[f].join("").trim():1===t[f].length&&0===t[f][0].length),"greedy"===i&&o){for(var _=[],g=0;g<d;g++){var m=u?e[g]:g
_.push(t[f][m])}l=""===_.join("").trim()}if(!l){for(var y=0;y<d;y++){y>0&&!c&&(a+=n)
var v=o&&u?e[y]:y
a+=p(t[f][v],y)}f<t.length-1&&(!i||d>0&&!c)&&(a+=s)}}return a}function p(e,t){if(null==e)return""
if(e.constructor===Date)return JSON.stringify(e).slice(1,25)
var r=!1
d&&"string"==typeof e&&d.test(e)&&(e="'"+e,r=!0)
var s=e.toString().replace(l,u)
return r=r||!0===i||"function"==typeof i&&i(e,t)||Array.isArray(i)&&i[t]||function(e,t){for(var i=0;i<t.length;i++)if(e.indexOf(t[i])>-1)return!0
return!1}(s,a.BAD_DELIMITERS)||s.indexOf(n)>-1||" "===s.charAt(0)||" "===s.charAt(s.length-1),r?o+s+o:s}}}
if(a.RECORD_SEP=String.fromCharCode(30),a.UNIT_SEP=String.fromCharCode(31),a.BYTE_ORDER_MARK="\ufeff",a.BAD_DELIMITERS=["\r","\n",'"',a.BYTE_ORDER_MARK],a.WORKERS_SUPPORTED=!i&&!!t.Worker,a.NODE_STREAM_INPUT=1,a.LocalChunkSize=10485760,a.RemoteChunkSize=5242880,a.DefaultDelimiter=",",a.Parser=g,a.ParserHandle=p,a.NetworkStreamer=h,a.FileStreamer=f,a.StringStreamer=d,a.ReadableStreamStreamer=l,"undefined"==typeof PAPA_BROWSER_CONTEXT&&(a.DuplexStreamStreamer=c),t.jQuery){var o=t.jQuery
o.fn.parse=function(e){var i=e.config||{},r=[]
return this.each((function(e){if(!("INPUT"===o(this).prop("tagName").toUpperCase()&&"file"===o(this).attr("type").toLowerCase()&&t.FileReader)||!this.files||0===this.files.length)return!0
for(var n=0;n<this.files.length;n++)r.push({file:this.files[n],inputElem:this,instanceConfig:o.extend({},i)})})),n(),this
function n(){if(0!==r.length){var t,i,n,u,h=r[0]
if(b(e.before)){var f=e.before(h.file,h.inputElem)
if("object"==typeof f){if("abort"===f.action)return t="AbortError",i=h.file,n=h.inputElem,u=f.reason,void(b(e.error)&&e.error({name:t},i,n,u))
if("skip"===f.action)return void s()
"object"==typeof f.config&&(h.instanceConfig=o.extend(h.instanceConfig,f.config))}else if("skip"===f)return void s()}var d=h.instanceConfig.complete
h.instanceConfig.complete=function(e){b(d)&&d(e,h.file,h.inputElem),s()},a.parse(h.file,h.instanceConfig)}else b(e.complete)&&e.complete()}function s(){r.splice(0,1),n()}}}function u(e){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(e){var t=k(e)
t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null)
this._handle=new p(t),this._handle.streamer=this,this._config=t}.call(this,e),this.parseChunk=function(e,i){if(this.isFirstChunk&&b(this._config.beforeFirstChunk)){var n=this._config.beforeFirstChunk(e)
void 0!==n&&(e=n)}this.isFirstChunk=!1,this._halted=!1
var s=this._partialLine+e
this._partialLine=""
var o=this._handle.parse(s,this._baseIndex,!this._finished)
if(!this._handle.paused()&&!this._handle.aborted()){var u=o.meta.cursor
this._finished||(this._partialLine=s.substring(u-this._baseIndex),this._baseIndex=u),o&&o.data&&(this._rowCount+=o.data.length)
var h=this._finished||this._config.preview&&this._rowCount>=this._config.preview
if(r)t.postMessage({results:o,workerId:a.WORKER_ID,finished:h})
else if(b(this._config.chunk)&&!i){if(this._config.chunk(o,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0)
o=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(o.data),this._completeResults.errors=this._completeResults.errors.concat(o.errors),this._completeResults.meta=o.meta),this._completed||!h||!b(this._config.complete)||o&&o.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),h||o&&o.meta.paused||this._nextChunk(),o}this._halted=!0},this._sendError=function(e){b(this._config.error)?this._config.error(e):r&&this._config.error&&t.postMessage({workerId:a.WORKER_ID,error:e,finished:!1})}}function h(e){var t;(e=e||{}).chunkSize||(e.chunkSize=a.RemoteChunkSize),u.call(this,e),this._nextChunk=i?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(e){this._input=e,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded()
else{if(t=new XMLHttpRequest,this._config.withCredentials&&(t.withCredentials=this._config.withCredentials),i||(t.onload=E(this._chunkLoaded,this),t.onerror=E(this._chunkError,this)),t.open(this._config.downloadRequestBody?"POST":"GET",this._input,!i),this._config.downloadRequestHeaders){var e=this._config.downloadRequestHeaders
for(var r in e)t.setRequestHeader(r,e[r])}if(this._config.chunkSize){var n=this._start+this._config.chunkSize-1
t.setRequestHeader("Range","bytes="+this._start+"-"+n)}try{t.send(this._config.downloadRequestBody)}catch(s){this._chunkError(s.message)}i&&0===t.status&&this._chunkError()}},this._chunkLoaded=function(){4===t.readyState&&(t.status<200||t.status>=400?this._chunkError():(this._start+=this._config.chunkSize?this._config.chunkSize:t.responseText.length,this._finished=!this._config.chunkSize||this._start>=function(e){var t=e.getResponseHeader("Content-Range")
if(null===t)return-1
return parseInt(t.substring(t.lastIndexOf("/")+1))}(t),this.parseChunk(t.responseText)))},this._chunkError=function(e){var i=t.statusText||e
this._sendError(new Error(i))}}function f(e){var t,i;(e=e||{}).chunkSize||(e.chunkSize=a.LocalChunkSize),u.call(this,e)
var r="undefined"!=typeof FileReader
this.stream=function(e){this._input=e,i=e.slice||e.webkitSlice||e.mozSlice,r?((t=new FileReader).onload=E(this._chunkLoaded,this),t.onerror=E(this._chunkError,this)):t=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var e=this._input
if(this._config.chunkSize){var n=Math.min(this._start+this._config.chunkSize,this._input.size)
e=i.call(e,this._start,n)}var s=t.readAsText(e,this._config.encoding)
r||this._chunkLoaded({target:{result:s}})},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result)},this._chunkError=function(){this._sendError(t.error)}}function d(e){var t
e=e||{},u.call(this,e),this.stream=function(e){return t=e,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var e,i=this._config.chunkSize
return i?(e=t.substring(0,i),t=t.substring(i)):(e=t,t=""),this._finished=!t,this.parseChunk(e)}}}function l(e){e=e||{},u.call(this,e)
var t=[],i=!0,r=!1
this.pause=function(){u.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){u.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(e){this._input=e,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){r&&1===t.length&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),t.length?this.parseChunk(t.shift()):i=!0},this._streamData=E((function(e){try{t.push("string"==typeof e?e:e.toString(this._config.encoding)),i&&(i=!1,this._checkIsFinished(),this.parseChunk(t.shift()))}catch(r){this._streamError(r)}}),this),this._streamError=E((function(e){this._streamCleanUp(),this._sendError(e)}),this),this._streamEnd=E((function(){this._streamCleanUp(),r=!0,this._streamData("")}),this),this._streamCleanUp=E((function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)}),this)}function c(e){var t=require("stream").Duplex,i=k(e),r=!0,n=!1,s=[],a=null
this._onCsvData=function(e){var t=e.data
a.push(t)||this._handle.paused()||this._handle.pause()},this._onCsvComplete=function(){a.push(null)},i.step=E(this._onCsvData,this),i.complete=E(this._onCsvComplete,this),u.call(this,i),this._nextChunk=function(){n&&1===s.length&&(this._finished=!0),s.length?s.shift()():r=!0},this._addToParseQueue=function(e,t){s.push(E((function(){if(this.parseChunk("string"==typeof e?e:e.toString(i.encoding)),b(t))return t()}),this)),r&&(r=!1,this._nextChunk())},this._onRead=function(){this._handle.paused()&&this._handle.resume()},this._onWrite=function(e,t,i){this._addToParseQueue(e,i)},this._onWriteComplete=function(){n=!0,this._addToParseQueue("")},this.getStream=function(){return a},(a=new t({readableObjectMode:!0,decodeStrings:!1,read:E(this._onRead,this),write:E(this._onWrite,this)})).once("finish",E(this._onWriteComplete,this))}function p(e){var t,i,r,n=Math.pow(2,53),s=-n,o=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,u=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,h=this,f=0,d=0,l=!1,c=!1,p=[],m={data:[],errors:[],meta:{}}
if(b(e.step)){var y=e.step
e.step=function(t){if(m=t,C())E()
else{if(E(),0===m.data.length)return
f+=t.data.length,e.preview&&f>e.preview?i.abort():(m.data=m.data[0],y(m,h))}}}function v(t){return"greedy"===e.skipEmptyLines?""===t.join("").trim():1===t.length&&0===t[0].length}function E(){return m&&r&&(R("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+a.DefaultDelimiter+"'"),r=!1),e.skipEmptyLines&&(m.data=m.data.filter((function(e){return!v(e)}))),C()&&function(){if(!m)return
function t(t,i){b(e.transformHeader)&&(t=e.transformHeader(t,i)),p.push(t)}if(Array.isArray(m.data[0])){for(var i=0;C()&&i<m.data.length;i++)m.data[i].forEach(t)
m.data.splice(0,1)}else m.data.forEach(t)}(),function(){if(!m||!e.header&&!e.dynamicTyping&&!e.transform)return m
function t(t,i){var r,n=e.header?{}:[]
for(r=0;r<t.length;r++){var s=r,a=t[r]
e.header&&(s=r>=p.length?"__parsed_extra":p[r]),e.transform&&(a=e.transform(a,s)),a=w(s,a),"__parsed_extra"===s?(n[s]=n[s]||[],n[s].push(a)):n[s]=a}return e.header&&(r>p.length?R("FieldMismatch","TooManyFields","Too many fields: expected "+p.length+" fields but parsed "+r,d+i):r<p.length&&R("FieldMismatch","TooFewFields","Too few fields: expected "+p.length+" fields but parsed "+r,d+i)),n}var i=1
!m.data.length||Array.isArray(m.data[0])?(m.data=m.data.map(t),i=m.data.length):m.data=t(m.data,0)
e.header&&m.meta&&(m.meta.fields=p)
return d+=i,m}()}function C(){return e.header&&0===p.length}function w(t,i){return function(t){return e.dynamicTypingFunction&&void 0===e.dynamicTyping[t]&&(e.dynamicTyping[t]=e.dynamicTypingFunction(t)),!0===(e.dynamicTyping[t]||e.dynamicTyping)}(t)?"true"===i||"TRUE"===i||"false"!==i&&"FALSE"!==i&&(function(e){if(o.test(e)){var t=parseFloat(e)
if(t>s&&t<n)return!0}return!1}(i)?parseFloat(i):u.test(i)?new Date(i):""===i?null:i):i}function R(e,t,i,r){var n={type:e,code:t,message:i}
void 0!==r&&(n.row=r),m.errors.push(n)}this.parse=function(n,s,o){var u=e.quoteChar||'"'
if(e.newline||(e.newline=function(e,t){e=e.substring(0,1048576)
var i=new RegExp(_(t)+"([^]*?)"+_(t),"gm")
e=e.replace(i,"")
var r=e.split("\r"),n=e.split("\n"),s=n.length>1&&n[0].length<r[0].length
if(1===r.length||s)return"\n"
for(var a=0,o=0;o<r.length;o++)"\n"===r[o][0]&&a++
return a>=r.length/2?"\r\n":"\r"}(n,u)),r=!1,e.delimiter)b(e.delimiter)&&(e.delimiter=e.delimiter(n),m.meta.delimiter=e.delimiter)
else{var h=function(t,i,r,n,s){var o,u,h,f
s=s||[",","\t","|",";",a.RECORD_SEP,a.UNIT_SEP]
for(var d=0;d<s.length;d++){var l=s[d],c=0,p=0,_=0
h=void 0
for(var m=new g({comments:n,delimiter:l,newline:i,preview:10}).parse(t),y=0;y<m.data.length;y++)if(r&&v(m.data[y]))_++
else{var k=m.data[y].length
p+=k,void 0!==h?k>0&&(c+=Math.abs(k-h),h=k):h=k}m.data.length>0&&(p/=m.data.length-_),(void 0===u||c<=u)&&(void 0===f||p>f)&&p>1.99&&(u=c,o=l,f=p)}return e.delimiter=o,{successful:!!o,bestDelimiter:o}}(n,e.newline,e.skipEmptyLines,e.comments,e.delimitersToGuess)
h.successful?e.delimiter=h.bestDelimiter:(r=!0,e.delimiter=a.DefaultDelimiter),m.meta.delimiter=e.delimiter}var f=k(e)
return e.preview&&e.header&&f.preview++,t=n,i=new g(f),m=i.parse(t,s,o),E(),l?{meta:{paused:!0}}:m||{meta:{paused:!1}}},this.paused=function(){return l},this.pause=function(){l=!0,i.abort(),t=b(e.chunk)?"":t.substring(i.getCharIndex())},this.resume=function(){h.streamer._halted?(l=!1,h.streamer.parseChunk(t,!0)):setTimeout(h.resume,3)},this.aborted=function(){return c},this.abort=function(){c=!0,i.abort(),m.meta.aborted=!0,b(e.complete)&&e.complete(m),t=""}}function _(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function g(e){var t,i=(e=e||{}).delimiter,r=e.newline,n=e.comments,s=e.step,o=e.preview,u=e.fastMode,h=t=void 0===e.quoteChar||null===e.quoteChar?'"':e.quoteChar
if(void 0!==e.escapeChar&&(h=e.escapeChar),("string"!=typeof i||a.BAD_DELIMITERS.indexOf(i)>-1)&&(i=","),n===i)throw new Error("Comment character same as delimiter")
!0===n?n="#":("string"!=typeof n||a.BAD_DELIMITERS.indexOf(n)>-1)&&(n=!1),"\n"!==r&&"\r"!==r&&"\r\n"!==r&&(r="\n")
var f=0,d=!1
this.parse=function(a,l,c){if("string"!=typeof a)throw new Error("Input must be a string")
var p=a.length,g=i.length,m=r.length,y=n.length,v=b(s)
f=0
var k=[],E=[],C=[],w=0
if(!a)return Q()
if(e.header&&!l){var R=a.split(r)[0].split(i),S=[],O={},x=!1
for(var T in R){var A=R[T]
b(e.transformHeader)&&(A=e.transformHeader(A,T))
var I=A,D=O[A]||0
for(D>0&&(x=!0,I=A+"_"+D),O[A]=D+1;S.includes(I);)I=I+"_"+D
S.push(I)}if(x){var L=a.split(r)
L[0]=S.join(i),a=L.join(r)}}if(u||!1!==u&&-1===a.indexOf(t)){for(var F=a.split(r),P=0;P<F.length;P++){if(C=F[P],f+=C.length,P!==F.length-1)f+=r.length
else if(c)return Q()
if(!n||C.substring(0,y)!==n){if(v){if(k=[],N(C.split(i)),J(),d)return Q()}else N(C.split(i))
if(o&&P>=o)return k=k.slice(0,o),Q(!0)}}return Q()}for(var j=a.indexOf(i,f),z=a.indexOf(r,f),M=new RegExp(_(h)+_(t),"g"),U=a.indexOf(t,f);;)if(a[f]!==t)if(n&&0===C.length&&a.substring(f,f+y)===n){if(-1===z)return Q()
f=z+m,z=a.indexOf(r,f),j=a.indexOf(i,f)}else if(-1!==j&&(j<z||-1===z))C.push(a.substring(f,j)),f=j+g,j=a.indexOf(i,f)
else{if(-1===z)break
if(C.push(a.substring(f,z)),H(z+m),v&&(J(),d))return Q()
if(o&&k.length>=o)return Q(!0)}else for(U=f,f++;;){if(-1===(U=a.indexOf(t,U+1)))return c||E.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:k.length,index:f}),K()
if(U===p-1)return K(a.substring(f,U).replace(M,t))
if(t!==h||a[U+1]!==h){if(t===h||0===U||a[U-1]!==h){-1!==j&&j<U+1&&(j=a.indexOf(i,U+1)),-1!==z&&z<U+1&&(z=a.indexOf(r,U+1))
var q=B(-1===z?j:Math.min(j,z))
if(a.substr(U+1+q,g)===i){C.push(a.substring(f,U).replace(M,t)),f=U+1+q+g,a[U+1+q+g]!==t&&(U=a.indexOf(t,f)),j=a.indexOf(i,f),z=a.indexOf(r,f)
break}var W=B(z)
if(a.substring(U+1+W,U+1+W+m)===r){if(C.push(a.substring(f,U).replace(M,t)),H(U+1+W+m),j=a.indexOf(i,f),U=a.indexOf(t,f),v&&(J(),d))return Q()
if(o&&k.length>=o)return Q(!0)
break}E.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:k.length,index:f}),U++}}else U++}return K()
function N(e){k.push(e),w=f}function B(e){var t=0
if(-1!==e){var i=a.substring(U+1,e)
i&&""===i.trim()&&(t=i.length)}return t}function K(e){return c||(void 0===e&&(e=a.substring(f)),C.push(e),f=p,N(C),v&&J()),Q()}function H(e){f=e,N(C),C=[],z=a.indexOf(r,f)}function Q(e){return{data:k,errors:E,meta:{delimiter:i,linebreak:r,aborted:d,truncated:!!e,cursor:w+(l||0)}}}function J(){s(Q()),k=[],E=[]}},this.abort=function(){d=!0},this.getCharIndex=function(){return f}}function m(e){var t=e.data,i=n[t.workerId],r=!1
if(t.error)i.userError(t.error,t.file)
else if(t.results&&t.results.data){var s={abort:function(){r=!0,y(t.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:v,resume:v}
if(b(i.userStep)){for(var a=0;a<t.results.data.length&&(i.userStep({data:t.results.data[a],errors:t.results.errors,meta:t.results.meta},s),!r);a++);delete t.results}else b(i.userChunk)&&(i.userChunk(t.results,s,t.file),delete t.results)}t.finished&&!r&&y(t.workerId,t.results)}function y(e,t){var i=n[e]
b(i.userComplete)&&i.userComplete(t),i.terminate(),delete n[e]}function v(){throw new Error("Not implemented.")}function k(e){if("object"!=typeof e||null===e)return e
var t=Array.isArray(e)?[]:{}
for(var i in e)t[i]=k(e[i])
return t}function E(e,t){return function(){e.apply(t,arguments)}}function b(e){return"function"==typeof e}return r&&(t.onmessage=function(e){var i=e.data
void 0===a.WORKER_ID&&i&&(a.WORKER_ID=i.workerId)
if("string"==typeof i.input)t.postMessage({workerId:a.WORKER_ID,results:a.parse(i.input,i.config),finished:!0})
else if(t.File&&i.input instanceof File||i.input instanceof Object){var r=a.parse(i.input,i.config)
r&&t.postMessage({workerId:a.WORKER_ID,results:r,finished:!0})}}),h.prototype=Object.create(u.prototype),h.prototype.constructor=h,f.prototype=Object.create(u.prototype),f.prototype.constructor=f,d.prototype=Object.create(d.prototype),d.prototype.constructor=d,l.prototype=Object.create(u.prototype),l.prototype.constructor=l,"undefined"==typeof PAPA_BROWSER_CONTEXT&&(c.prototype=Object.create(u.prototype),c.prototype.constructor=c),a}))
