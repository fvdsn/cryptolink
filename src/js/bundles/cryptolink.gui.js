(function(){var a;a=function(){var a,b;b=document.createElement("script");b.src="js/vendor/zxcvbn.js";b.type="text/javascript";b.async=!0;a=document.getElementsByTagName("script")[0];return a.parentNode.insertBefore(b,a)};null!=window.attachEvent?window.attachEvent("onload",a):window.addEventListener("load",a,!1)}).call(this);

;

/*! jQuery.qrcode 0.6.0 - //larsjung.de/qrcode - MIT License */
(function(a){"use strict";var b=function(a,b,c,d){var e=t(c,b);e.addData(a),e.make(),d=d||0;var f=e.getModuleCount(),g=e.getModuleCount()+2*d,h=function(a,b){return a-=d,b-=d,a<0||a>=f||b<0||b>=f?!1:e.isDark(a,b)},i=function(a,b,c,d){var e=this.isDark,f=1/g;this.isDark=function(g,h){var i=h*f,j=g*f,k=i+f,l=j+f;return e(g,h)&&(a>k||i>c||b>l||j>d)}};this.text=a,this.level=b,this.version=c,this.moduleCount=g,this.isDark=h,this.addBlank=i},c=function(){var a=document.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")}(),d=Object.prototype.toString.call(window.opera)!=="[object Opera]",e=function(a,c,d,e,f){d=Math.max(1,d||1),e=Math.min(40,e||40);for(var g=d;g<=e;g+=1)try{return new b(a,c,g,f)}catch(h){}},f=function(b,c,d){var e="bold "+d.labelsize*d.size+"px "+d.fontname,f=a("<canvas/>")[0].getContext("2d");f.font=e;var g=f.measureText(d.label).width,h=d.labelsize,i=g/d.size,j=(1-i)/2,k=(1-h)/2,l=j+i,m=k+h,n=.01;d.mode===1?b.addBlank(0,k-n,size,m+n):b.addBlank(j-n,k-n,l+n,m+n),c.fillStyle=d.fontcolor,c.textAlign="center",c.font=e,c.fillText(a("#label").val(),.5*d.size,.5*d.size+.3*d.labelsize*d.size)},g=function(a,b,c){var d=c.size,e=c.image.naturalWidth||1,f=c.image.naturalHeight||1,g=c.imagesize,h=g*e/f,i=(1-h)/2,j=(1-g)/2,k=i+h,l=j+g,m=.01;c.mode===3?a.addBlank(0,j-m,d,l+m):a.addBlank(i-m,j-m,k+m,l+m),b.drawImage(c.image,i*d,j*d,h*d,g*d)},h=function(a,b,c){c.bgColor&&(b.fillStyle=c.bgColor,b.fillRect(c.left,c.top,c.size,c.size));var d=c.mode;d===1||d===2?f(a,b,c):(d===3||d===4)&&g(a,b,c)},i=function(a,b,c,d,e,f,g,h){a.isDark(g,h)&&b.rect(d,e,f,f)},j=function(a,b,c,d,e,f,g,h,i,j){g?a.moveTo(b+f,c):a.moveTo(b,c),h?(a.lineTo(d-f,c),a.arcTo(d,c,d,e,f)):a.lineTo(d,c),i?(a.lineTo(d,e-f),a.arcTo(d,e,b,e,f)):a.lineTo(d,e),j?(a.lineTo(b+f,e),a.arcTo(b,e,b,c,f)):a.lineTo(b,e),g?(a.lineTo(b,c+f),a.arcTo(b,c,d,c,f)):a.lineTo(b,c)},k=function(a,b,c,d,e,f,g,h,i,j){g&&(a.moveTo(b+f,c),a.lineTo(b,c),a.lineTo(b,c+f),a.arcTo(b,c,b+f,c,f)),h&&(a.moveTo(d-f,c),a.lineTo(d,c),a.lineTo(d,c+f),a.arcTo(d,c,d-f,c,f)),i&&(a.moveTo(d-f,e),a.lineTo(d,e),a.lineTo(d,e-f),a.arcTo(d,e,d-f,e,f)),j&&(a.moveTo(b+f,e),a.lineTo(b,e),a.lineTo(b,e-f),a.arcTo(b,e,b+f,e,f))},l=function(a,b,c,d,e,f,g,h){var i=a.isDark,l=d+f,m=e+f,n=c.radius*f,o=g-1,p=g+1,q=h-1,r=h+1,s=i(g,h),t=i(o,q),u=i(o,h),v=i(o,r),w=i(g,r),x=i(p,r),y=i(p,h),z=i(p,q),A=i(g,q);s?j(b,d,e,l,m,n,!u&&!A,!u&&!w,!y&&!w,!y&&!A):k(b,d,e,l,m,n,u&&A&&t,u&&w&&v,y&&w&&x,y&&A&&z)},m=function(a,b,c){var e=a.moduleCount,f=c.size/e,g=i,h,j;d&&c.radius>0&&c.radius<=.5&&(g=l),b.beginPath();for(h=0;h<e;h+=1)for(j=0;j<e;j+=1){var k=c.left+j*f,m=c.top+h*f,n=f;g(a,b,c,k,m,n,h,j)}b.fillStyle=c.color,b.fill()},n=function(b,c){var d=e(c.text,c.ecLevel,c.minVersion,c.maxVersion,c.quiet);if(!d)return null;var f=a(b).data("qrcode",d),g=f[0].getContext("2d");return h(d,g,c),m(d,g,c),f},o=function(b){var c=a("<canvas/>").attr("width",b.size).attr("height",b.size);return n(c,b)},p=function(b){return a("<img/>").attr("src",o(b)[0].toDataURL("image/png"))},q=function(b){var c=e(b.text,b.ecLevel,b.minVersion,b.maxVersion,b.quiet);if(!c)return null;var d=b.size,f=b.bgColor,g=Math.floor,h=c.moduleCount,i=g(d/h),j=g(.5*(d-i*h)),k,l,m={position:"relative",left:0,top:0,padding:0,margin:0,width:d,height:d},n={position:"absolute",padding:0,margin:0,width:i,height:i,"background-color":b.color},o=a("<div/>").data("qrcode",c).css(m);f&&o.css("background-color",f);for(k=0;k<h;k+=1)for(l=0;l<h;l+=1)c.isDark(k,l)&&a("<div/>").css(n).css({left:j+l*i,top:j+k*i}).appendTo(o);return o},r=function(a){return c&&a.render==="canvas"?o(a):c&&a.render==="image"?p(a):q(a)},s={render:"canvas",minVersion:1,maxVersion:40,ecLevel:"L",left:0,top:0,size:200,color:"#000",bgColor:null,text:"no text",radius:0,quiet:0,mode:0,label:"no label",labelsize:.1,fontname:"sans",fontcolor:"#000",image:null,imagesize:.1};a.fn.qrcode=function(b){var c=a.extend({},s,b);return this.each(function(){this.nodeName.toLowerCase()==="canvas"?n(this,c):a(this).append(r(c))})};var t=function(){function g(a,b){if(typeof a.length=="undefined")throw new Error(a.length+"/"+b);var c=function(){var c=0;while(c<a.length&&a[c]==0)c+=1;var d=new Array(a.length-c+b);for(var e=0;e<a.length-c;e+=1)d[e]=a[e+c];return d}(),d={};return d.get=function(a){return c[a]},d.getLength=function(){return c.length},d.multiply=function(a){var b=new Array(d.getLength()+a.getLength()-1);for(var c=0;c<d.getLength();c+=1)for(var e=0;e<a.getLength();e+=1)b[c+e]^=f.gexp(f.glog(d.get(c))+f.glog(a.get(e)));return g(b,0)},d.mod=function(a){if(d.getLength()-a.getLength()<0)return d;var b=f.glog(d.get(0))-f.glog(a.get(0)),c=new Array(d.getLength());for(var e=0;e<d.getLength();e+=1)c[e]=d.get(e);for(var e=0;e<a.getLength();e+=1)c[e]^=f.gexp(f.glog(a.get(e))+b);return g(c,0).mod(a)},d}var a=function(a,b){var d=236,f=17,k=a,l=c[b],m=null,n=0,p=null,q=new Array,r={},s=function(a,b){n=k*4+17,m=function(a){var b=new Array(a);for(var c=0;c<a;c+=1){b[c]=new Array(a);for(var d=0;d<a;d+=1)b[c][d]=null}return b}(n),t(0,0),t(n-7,0),t(0,n-7),w(),v(),y(a,b),k>=7&&x(a),p==null&&(p=B(k,l,q)),z(p,b)},t=function(a,b){for(var c=-1;c<=7;c+=1){if(a+c<=-1||n<=a+c)continue;for(var d=-1;d<=7;d+=1){if(b+d<=-1||n<=b+d)continue;0<=c&&c<=6&&(d==0||d==6)||0<=d&&d<=6&&(c==0||c==6)||2<=c&&c<=4&&2<=d&&d<=4?m[a+c][b+d]=!0:m[a+c][b+d]=!1}}},u=function(){var a=0,b=0;for(var c=0;c<8;c+=1){s(!0,c);var d=e.getLostPoint(r);if(c==0||a>d)a=d,b=c}return b},v=function(){for(var a=8;a<n-8;a+=1){if(m[a][6]!=null)continue;m[a][6]=a%2==0}for(var b=8;b<n-8;b+=1){if(m[6][b]!=null)continue;m[6][b]=b%2==0}},w=function(){var a=e.getPatternPosition(k);for(var b=0;b<a.length;b+=1)for(var c=0;c<a.length;c+=1){var d=a[b],f=a[c];if(m[d][f]!=null)continue;for(var g=-2;g<=2;g+=1)for(var h=-2;h<=2;h+=1)g==-2||g==2||h==-2||h==2||g==0&&h==0?m[d+g][f+h]=!0:m[d+g][f+h]=!1}},x=function(a){var b=e.getBCHTypeNumber(k);for(var c=0;c<18;c+=1){var d=!a&&(b>>c&1)==1;m[Math.floor(c/3)][c%3+n-8-3]=d}for(var c=0;c<18;c+=1){var d=!a&&(b>>c&1)==1;m[c%3+n-8-3][Math.floor(c/3)]=d}},y=function(a,b){var c=l<<3|b,d=e.getBCHTypeInfo(c);for(var f=0;f<15;f+=1){var g=!a&&(d>>f&1)==1;f<6?m[f][8]=g:f<8?m[f+1][8]=g:m[n-15+f][8]=g}for(var f=0;f<15;f+=1){var g=!a&&(d>>f&1)==1;f<8?m[8][n-f-1]=g:f<9?m[8][15-f-1+1]=g:m[8][15-f-1]=g}m[n-8][8]=!a},z=function(a,b){var c=-1,d=n-1,f=7,g=0,h=e.getMaskFunction(b);for(var i=n-1;i>0;i-=2){i==6&&(i-=1);for(;;){for(var j=0;j<2;j+=1)if(m[d][i-j]==null){var k=!1;g<a.length&&(k=(a[g]>>>f&1)==1);var l=h(d,i-j);l&&(k=!k),m[d][i-j]=k,f-=1,f==-1&&(g+=1,f=7)}d+=c;if(d<0||n<=d){d-=c,c=-c;break}}}},A=function(a,b){var c=0,d=0,f=0,h=new Array(b.length),i=new Array(b.length);for(var j=0;j<b.length;j+=1){var k=b[j].dataCount,l=b[j].totalCount-k;d=Math.max(d,k),f=Math.max(f,l),h[j]=new Array(k);for(var m=0;m<h[j].length;m+=1)h[j][m]=255&a.getBuffer()[m+c];c+=k;var n=e.getErrorCorrectPolynomial(l),o=g(h[j],n.getLength()-1),p=o.mod(n);i[j]=new Array(n.getLength()-1);for(var m=0;m<i[j].length;m+=1){var q=m+p.getLength()-i[j].length;i[j][m]=q>=0?p.get(q):0}}var r=0;for(var m=0;m<b.length;m+=1)r+=b[m].totalCount;var s=new Array(r),t=0;for(var m=0;m<d;m+=1)for(var j=0;j<b.length;j+=1)m<h[j].length&&(s[t]=h[j][m],t+=1);for(var m=0;m<f;m+=1)for(var j=0;j<b.length;j+=1)m<i[j].length&&(s[t]=i[j][m],t+=1);return s},B=function(a,b,c){var g=h.getRSBlocks(a,b),j=i();for(var k=0;k<c.length;k+=1){var l=c[k];j.put(l.getMode(),4),j.put(l.getLength(),e.getLengthInBits(l.getMode(),a)),l.write(j)}var m=0;for(var k=0;k<g.length;k+=1)m+=g[k].dataCount;if(j.getLengthInBits()>m*8)throw new Error("code length overflow. ("+j.getLengthInBits()+">"+m*8+")");j.getLengthInBits()+4<=m*8&&j.put(0,4);while(j.getLengthInBits()%8!=0)j.putBit(!1);for(;;){if(j.getLengthInBits()>=m*8)break;j.put(d,8);if(j.getLengthInBits()>=m*8)break;j.put(f,8)}return A(j,g)};return r.addData=function(a){var b=j(a);q.push(b),p=null},r.isDark=function(a,b){if(a<0||n<=a||b<0||n<=b)throw new Error(a+","+b);return m[a][b]},r.getModuleCount=function(){return n},r.make=function(){s(!1,u())},r.createTableTag=function(a,b){a=a||2,b=typeof b=="undefined"?a*4:b;var c="";c+='<table style="',c+=" border-width: 0px; border-style: none;",c+=" border-collapse: collapse;",c+=" padding: 0px; margin: "+b+"px;",c+='">',c+="<tbody>";for(var d=0;d<r.getModuleCount();d+=1){c+="<tr>";for(var e=0;e<r.getModuleCount();e+=1)c+='<td style="',c+=" border-width: 0px; border-style: none;",c+=" border-collapse: collapse;",c+=" padding: 0px; margin: 0px;",c+=" width: "+a+"px;",c+=" height: "+a+"px;",c+=" background-color: ",c+=r.isDark(d,e)?"#000000":"#ffffff",c+=";",c+='"/>';c+="</tr>"}return c+="</tbody>",c+="</table>",c},r.createImgTag=function(a,b){a=a||2,b=typeof b=="undefined"?a*4:b;var c=r.getModuleCount()*a+b*2,d=b,e=c-b;return o(c,c,function(b,c){if(d<=b&&b<e&&d<=c&&c<e){var f=Math.floor((b-d)/a),g=Math.floor((c-d)/a);return r.isDark(g,f)?0:1}return 1})},r};a.stringToBytes=function(a){var b=new Array;for(var c=0;c<a.length;c+=1){var d=a.charCodeAt(c);b.push(d&255)}return b},a.createStringToBytes=function(a,b){var c=function(){var c=m(a),d=function(){var a=c.read();if(a==-1)throw new Error;return a},e=0,f={};for(;;){var g=c.read();if(g==-1)break;var h=d(),i=d(),j=d(),k=String.fromCharCode(g<<8|h),l=i<<8|j;f[k]=l,e+=1}if(e!=b)throw new Error(e+" != "+b);return f}(),d="?".charCodeAt(0);return function(a){var b=new Array;for(var e=0;e<a.length;e+=1){var f=a.charCodeAt(e);if(f<128)b.push(f);else{var g=c[a.charAt(e)];typeof g=="number"?(g&255)==g?b.push(g):(b.push(g>>>8),b.push(g&255)):b.push(d)}}return b}};var b={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},c={L:1,M:0,Q:3,H:2},d={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},e=function(){var a=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],c=1335,e=7973,h=21522,i={},j=function(a){var b=0;while(a!=0)b+=1,a>>>=1;return b};return i.getBCHTypeInfo=function(a){var b=a<<10;while(j(b)-j(c)>=0)b^=c<<j(b)-j(c);return(a<<10|b)^h},i.getBCHTypeNumber=function(a){var b=a<<12;while(j(b)-j(e)>=0)b^=e<<j(b)-j(e);return a<<12|b},i.getPatternPosition=function(b){return a[b-1]},i.getMaskFunction=function(a){switch(a){case d.PATTERN000:return function(a,b){return(a+b)%2==0};case d.PATTERN001:return function(a,b){return a%2==0};case d.PATTERN010:return function(a,b){return b%3==0};case d.PATTERN011:return function(a,b){return(a+b)%3==0};case d.PATTERN100:return function(a,b){return(Math.floor(a/2)+Math.floor(b/3))%2==0};case d.PATTERN101:return function(a,b){return a*b%2+a*b%3==0};case d.PATTERN110:return function(a,b){return(a*b%2+a*b%3)%2==0};case d.PATTERN111:return function(a,b){return(a*b%3+(a+b)%2)%2==0};default:throw new Error("bad maskPattern:"+a)}},i.getErrorCorrectPolynomial=function(a){var b=g([1],0);for(var c=0;c<a;c+=1)b=b.multiply(g([1,f.gexp(c)],0));return b},i.getLengthInBits=function(a,c){if(1<=c&&c<10)switch(a){case b.MODE_NUMBER:return 10;case b.MODE_ALPHA_NUM:return 9;case b.MODE_8BIT_BYTE:return 8;case b.MODE_KANJI:return 8;default:throw new Error("mode:"+a)}else if(c<27)switch(a){case b.MODE_NUMBER:return 12;case b.MODE_ALPHA_NUM:return 11;case b.MODE_8BIT_BYTE:return 16;case b.MODE_KANJI:return 10;default:throw new Error("mode:"+a)}else{if(!(c<41))throw new Error("type:"+c);switch(a){case b.MODE_NUMBER:return 14;case b.MODE_ALPHA_NUM:return 13;case b.MODE_8BIT_BYTE:return 16;case b.MODE_KANJI:return 12;default:throw new Error("mode:"+a)}}},i.getLostPoint=function(a){var b=a.getModuleCount(),c=0;for(var d=0;d<b;d+=1)for(var e=0;e<b;e+=1){var f=0,g=a.isDark(d,e);for(var h=-1;h<=1;h+=1){if(d+h<0||b<=d+h)continue;for(var i=-1;i<=1;i+=1){if(e+i<0||b<=e+i)continue;if(h==0&&i==0)continue;g==a.isDark(d+h,e+i)&&(f+=1)}}f>5&&(c+=3+f-5)}for(var d=0;d<b-1;d+=1)for(var e=0;e<b-1;e+=1){var j=0;a.isDark(d,e)&&(j+=1),a.isDark(d+1,e)&&(j+=1),a.isDark(d,e+1)&&(j+=1),a.isDark(d+1,e+1)&&(j+=1);if(j==0||j==4)c+=3}for(var d=0;d<b;d+=1)for(var e=0;e<b-6;e+=1)a.isDark(d,e)&&!a.isDark(d,e+1)&&a.isDark(d,e+2)&&a.isDark(d,e+3)&&a.isDark(d,e+4)&&!a.isDark(d,e+5)&&a.isDark(d,e+6)&&(c+=40);for(var e=0;e<b;e+=1)for(var d=0;d<b-6;d+=1)a.isDark(d,e)&&!a.isDark(d+1,e)&&a.isDark(d+2,e)&&a.isDark(d+3,e)&&a.isDark(d+4,e)&&!a.isDark(d+5,e)&&a.isDark(d+6,e)&&(c+=40);var k=0;for(var e=0;e<b;e+=1)for(var d=0;d<b;d+=1)a.isDark(d,e)&&(k+=1);var l=Math.abs(100*k/b/b-50)/5;return c+=l*10,c},i}(),f=function(){var a=new Array(256),b=new Array(256);for(var c=0;c<8;c+=1)a[c]=1<<c;for(var c=8;c<256;c+=1)a[c]=a[c-4]^a[c-5]^a[c-6]^a[c-8];for(var c=0;c<255;c+=1)b[a[c]]=c;var d={};return d.glog=function(a){if(a<1)throw new Error("glog("+a+")");return b[a]},d.gexp=function(b){while(b<0)b+=255;while(b>=256)b-=255;return a[b]},d}(),h=function(){var a=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],b=function(a,b){var c={};return c.totalCount=a,c.dataCount=b,c},d={},e=function(b,d){switch(d){case c.L:return a[(b-1)*4+0];case c.M:return a[(b-1)*4+1];case c.Q:return a[(b-1)*4+2];case c.H:return a[(b-1)*4+3];default:return undefined}};return d.getRSBlocks=function(a,c){var d=e(a,c);if(typeof d=="undefined")throw new Error("bad rs block @ typeNumber:"+a+"/errorCorrectLevel:"+c);var f=d.length/3,g=new Array;for(var h=0;h<f;h+=1){var i=d[h*3+0],j=d[h*3+1],k=d[h*3+2];for(var l=0;l<i;l+=1)g.push(b(j,k))}return g},d}(),i=function(){var a=new Array,b=0,c={};return c.getBuffer=function(){return a},c.get=function(b){var c=Math.floor(b/8);return(a[c]>>>7-b%8&1)==1},c.put=function(a,b){for(var d=0;d<b;d+=1)c.putBit((a>>>b-d-1&1)==1)},c.getLengthInBits=function(){return b},c.putBit=function(c){var d=Math.floor(b/8);a.length<=d&&a.push(0),c&&(a[d]|=128>>>b%8),b+=1},c},j=function(c){var d=b.MODE_8BIT_BYTE,e=c,f=a.stringToBytes(c),g={};return g.getMode=function(){return d},g.getLength=function(a){return f.length},g.write=function(a){for(var b=0;b<f.length;b+=1)a.put(f[b],8)},g},k=function(){var a=new Array,b={};return b.writeByte=function(b){a.push(b&255)},b.writeShort=function(a){b.writeByte(a),b.writeByte(a>>>8)},b.writeBytes=function(a,c,d){c=c||0,d=d||a.length;for(var e=0;e<d;e+=1)b.writeByte(a[e+c])},b.writeString=function(a){for(var c=0;c<a.length;c+=1)b.writeByte(a.charCodeAt(c))},b.toByteArray=function(){return a},b.toString=function(){var b="";b+="[";for(var c=0;c<a.length;c+=1)c>0&&(b+=","),b+=a[c];return b+="]",b},b},l=function(){var a=0,b=0,c=0,d="",e={},f=function(a){d+=String.fromCharCode(g(a&63))},g=function(a){if(!(a<0)){if(a<26)return 65+a;if(a<52)return 97+(a-26);if(a<62)return 48+(a-52);if(a==62)return 43;if(a==63)return 47}throw new Error("n:"+a)};return e.writeByte=function(d){a=a<<8|d&255,b+=8,c+=1;while(b>=6)f(a>>>b-6),b-=6},e.flush=function(){b>0&&(f(a<<6-b),a=0,b=0);if(c%3!=0){var e=3-c%3;for(var g=0;g<e;g+=1)d+="="}},e.toString=function(){return d},e},m=function(a){var b=a,c=0,d=0,e=0,f={};f.read=function(){while(e<8){if(c>=b.length){if(e==0)return-1;throw new Error("unexpected end of file./"+e)}var a=b.charAt(c);c+=1;if(a=="=")return e=0,-1;if(a.match(/^\s$/))continue;d=d<<6|g(a.charCodeAt(0)),e+=6}var f=d>>>e-8&255;return e-=8,f};var g=function(a){if(65<=a&&a<=90)return a-65;if(97<=a&&a<=122)return a-97+26;if(48<=a&&a<=57)return a-48+52;if(a==43)return 62;if(a==47)return 63;throw new Error("c:"+a)};return f},n=function(a,b){var c=a,d=b,e=new Array(a*b),f={};f.setPixel=function(a,b,d){e[b*c+a]=d},f.write=function(a){a.writeString("GIF87a"),a.writeShort(c),a.writeShort(d),a.writeByte(128),a.writeByte(0),a.writeByte(0),a.writeByte(0),a.writeByte(0),a.writeByte(0),a.writeByte(255),a.writeByte(255),a.writeByte(255),a.writeString(","),a.writeShort(0),a.writeShort(0),a.writeShort(c),a.writeShort(d),a.writeByte(0);var b=2,e=h(b);a.writeByte(b);var f=0;while(e.length-f>255)a.writeByte(255),a.writeBytes(e,f,255),f+=255;a.writeByte(e.length-f),a.writeBytes(e,f,e.length-f),a.writeByte(0),a.writeString(";")};var g=function(a){var b=a,c=0,d=0,e={};return e.write=function(a,e){if(a>>>e!=0)throw new Error("length over");while(c+e>=8)b.writeByte(255&(a<<c|d)),e-=8-c,a>>>=8-c,d=0,c=0;d=a<<c|d,c=c+e},e.flush=function(){c>0&&b.writeByte(d)},e},h=function(a){var b=1<<a,c=(1<<a)+1,d=a+1,f=i();for(var h=0;h<b;h+=1)f.add(String.fromCharCode(h));f.add(String.fromCharCode(b)),f.add(String.fromCharCode(c));var j=k(),l=g(j);l.write(b,d);var m=0,n=String.fromCharCode(e[m]);m+=1;while(m<e.length){var o=String.fromCharCode(e[m]);m+=1,f.contains(n+o)?n=n+o:(l.write(f.indexOf(n),d),f.size()<4095&&(f.size()==1<<d&&(d+=1),f.add(n+o)),n=o)}return l.write(f.indexOf(n),d),l.write(c,d),l.flush(),j.toByteArray()},i=function(){var a={},b=0,c={};return c.add=function(d){if(c.contains(d))throw new Error("dup key:"+d);a[d]=b,b+=1},c.size=function(){return b},c.indexOf=function(b){return a[b]},c.contains=function(b){return typeof a[b]!="undefined"},c};return f},o=function(a,b,c,d){var e=n(a,b);for(var f=0;f<b;f+=1)for(var g=0;g<a;g+=1)e.setPixel(g,f,c(g,f));var h=k();e.write(h);var i=l(),j=h.toByteArray();for(var m=0;m<j.length;m+=1)i.writeByte(j[m]);i.flush();var o="";return o+="<img",o+=' src="',o+="data:image/gif;base64,",o+=i,o+='"',o+=' width="',o+=a,o+='"',o+=' height="',o+=b,o+='"',d&&(o+=' alt="',o+=d,o+='"'),o+="/>",o};return a}()})(jQuery)

;

/*
  Copyright (c) 2008, Adobe Systems Incorporated
  All rights reserved.

  Redistribution and use in source and binary forms, with or without 
  modification, are permitted provided that the following conditions are
  met:

  * Redistributions of source code must retain the above copyright notice, 
    this list of conditions and the following disclaimer.
  
  * Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in the 
    documentation and/or other materials provided with the distribution.
  
  * Neither the name of Adobe Systems Incorporated nor the names of its 
    contributors may be used to endorse or promote products derived from 
    this software without specific prior written permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
  IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
  THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
  PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR 
  CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
  PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
/*
JPEG encoder ported to JavaScript and optimized by Andreas Ritter, www.bytestrom.eu, 11/2009

Basic GUI blocking jpeg encoder
*/

function JPEGEncoder(quality) {
  var self = this;
	var fround = Math.round;
	var ffloor = Math.floor;
	var YTable = new Array(64);
	var UVTable = new Array(64);
	var fdtbl_Y = new Array(64);
	var fdtbl_UV = new Array(64);
	var YDC_HT;
	var UVDC_HT;
	var YAC_HT;
	var UVAC_HT;
	
	var bitcode = new Array(65535);
	var category = new Array(65535);
	var outputfDCTQuant = new Array(64);
	var DU = new Array(64);
	var byteout = [];
	var bytenew = 0;
	var bytepos = 7;
	
	var YDU = new Array(64);
	var UDU = new Array(64);
	var VDU = new Array(64);
	var clt = new Array(256);
	var RGB_YUV_TABLE = new Array(2048);
	var currentQuality;
	
	var ZigZag = [
			 0, 1, 5, 6,14,15,27,28,
			 2, 4, 7,13,16,26,29,42,
			 3, 8,12,17,25,30,41,43,
			 9,11,18,24,31,40,44,53,
			10,19,23,32,39,45,52,54,
			20,22,33,38,46,51,55,60,
			21,34,37,47,50,56,59,61,
			35,36,48,49,57,58,62,63
		];
	
	var std_dc_luminance_nrcodes = [0,0,1,5,1,1,1,1,1,1,0,0,0,0,0,0,0];
	var std_dc_luminance_values = [0,1,2,3,4,5,6,7,8,9,10,11];
	var std_ac_luminance_nrcodes = [0,0,2,1,3,3,2,4,3,5,5,4,4,0,0,1,0x7d];
	var std_ac_luminance_values = [
			0x01,0x02,0x03,0x00,0x04,0x11,0x05,0x12,
			0x21,0x31,0x41,0x06,0x13,0x51,0x61,0x07,
			0x22,0x71,0x14,0x32,0x81,0x91,0xa1,0x08,
			0x23,0x42,0xb1,0xc1,0x15,0x52,0xd1,0xf0,
			0x24,0x33,0x62,0x72,0x82,0x09,0x0a,0x16,
			0x17,0x18,0x19,0x1a,0x25,0x26,0x27,0x28,
			0x29,0x2a,0x34,0x35,0x36,0x37,0x38,0x39,
			0x3a,0x43,0x44,0x45,0x46,0x47,0x48,0x49,
			0x4a,0x53,0x54,0x55,0x56,0x57,0x58,0x59,
			0x5a,0x63,0x64,0x65,0x66,0x67,0x68,0x69,
			0x6a,0x73,0x74,0x75,0x76,0x77,0x78,0x79,
			0x7a,0x83,0x84,0x85,0x86,0x87,0x88,0x89,
			0x8a,0x92,0x93,0x94,0x95,0x96,0x97,0x98,
			0x99,0x9a,0xa2,0xa3,0xa4,0xa5,0xa6,0xa7,
			0xa8,0xa9,0xaa,0xb2,0xb3,0xb4,0xb5,0xb6,
			0xb7,0xb8,0xb9,0xba,0xc2,0xc3,0xc4,0xc5,
			0xc6,0xc7,0xc8,0xc9,0xca,0xd2,0xd3,0xd4,
			0xd5,0xd6,0xd7,0xd8,0xd9,0xda,0xe1,0xe2,
			0xe3,0xe4,0xe5,0xe6,0xe7,0xe8,0xe9,0xea,
			0xf1,0xf2,0xf3,0xf4,0xf5,0xf6,0xf7,0xf8,
			0xf9,0xfa
		];
	
	var std_dc_chrominance_nrcodes = [0,0,3,1,1,1,1,1,1,1,1,1,0,0,0,0,0];
	var std_dc_chrominance_values = [0,1,2,3,4,5,6,7,8,9,10,11];
	var std_ac_chrominance_nrcodes = [0,0,2,1,2,4,4,3,4,7,5,4,4,0,1,2,0x77];
	var std_ac_chrominance_values = [
			0x00,0x01,0x02,0x03,0x11,0x04,0x05,0x21,
			0x31,0x06,0x12,0x41,0x51,0x07,0x61,0x71,
			0x13,0x22,0x32,0x81,0x08,0x14,0x42,0x91,
			0xa1,0xb1,0xc1,0x09,0x23,0x33,0x52,0xf0,
			0x15,0x62,0x72,0xd1,0x0a,0x16,0x24,0x34,
			0xe1,0x25,0xf1,0x17,0x18,0x19,0x1a,0x26,
			0x27,0x28,0x29,0x2a,0x35,0x36,0x37,0x38,
			0x39,0x3a,0x43,0x44,0x45,0x46,0x47,0x48,
			0x49,0x4a,0x53,0x54,0x55,0x56,0x57,0x58,
			0x59,0x5a,0x63,0x64,0x65,0x66,0x67,0x68,
			0x69,0x6a,0x73,0x74,0x75,0x76,0x77,0x78,
			0x79,0x7a,0x82,0x83,0x84,0x85,0x86,0x87,
			0x88,0x89,0x8a,0x92,0x93,0x94,0x95,0x96,
			0x97,0x98,0x99,0x9a,0xa2,0xa3,0xa4,0xa5,
			0xa6,0xa7,0xa8,0xa9,0xaa,0xb2,0xb3,0xb4,
			0xb5,0xb6,0xb7,0xb8,0xb9,0xba,0xc2,0xc3,
			0xc4,0xc5,0xc6,0xc7,0xc8,0xc9,0xca,0xd2,
			0xd3,0xd4,0xd5,0xd6,0xd7,0xd8,0xd9,0xda,
			0xe2,0xe3,0xe4,0xe5,0xe6,0xe7,0xe8,0xe9,
			0xea,0xf2,0xf3,0xf4,0xf5,0xf6,0xf7,0xf8,
			0xf9,0xfa
		];
	
	function initQuantTables(sf){
			var YQT = [
				16, 11, 10, 16, 24, 40, 51, 61,
				12, 12, 14, 19, 26, 58, 60, 55,
				14, 13, 16, 24, 40, 57, 69, 56,
				14, 17, 22, 29, 51, 87, 80, 62,
				18, 22, 37, 56, 68,109,103, 77,
				24, 35, 55, 64, 81,104,113, 92,
				49, 64, 78, 87,103,121,120,101,
				72, 92, 95, 98,112,100,103, 99
			];
			
			for (var i = 0; i < 64; i++) {
				var t = ffloor((YQT[i]*sf+50)/100);
				if (t < 1) {
					t = 1;
				} else if (t > 255) {
					t = 255;
				}
				YTable[ZigZag[i]] = t;
			}
			var UVQT = [
				17, 18, 24, 47, 99, 99, 99, 99,
				18, 21, 26, 66, 99, 99, 99, 99,
				24, 26, 56, 99, 99, 99, 99, 99,
				47, 66, 99, 99, 99, 99, 99, 99,
				99, 99, 99, 99, 99, 99, 99, 99,
				99, 99, 99, 99, 99, 99, 99, 99,
				99, 99, 99, 99, 99, 99, 99, 99,
				99, 99, 99, 99, 99, 99, 99, 99
			];
			for (var j = 0; j < 64; j++) {
				var u = ffloor((UVQT[j]*sf+50)/100);
				if (u < 1) {
					u = 1;
				} else if (u > 255) {
					u = 255;
				}
				UVTable[ZigZag[j]] = u;
			}
			var aasf = [
				1.0, 1.387039845, 1.306562965, 1.175875602,
				1.0, 0.785694958, 0.541196100, 0.275899379
			];
			var k = 0;
			for (var row = 0; row < 8; row++)
			{
				for (var col = 0; col < 8; col++)
				{
					fdtbl_Y[k]  = (1.0 / (YTable [ZigZag[k]] * aasf[row] * aasf[col] * 8.0));
					fdtbl_UV[k] = (1.0 / (UVTable[ZigZag[k]] * aasf[row] * aasf[col] * 8.0));
					k++;
				}
			}
		}
		
		function computeHuffmanTbl(nrcodes, std_table){
			var codevalue = 0;
			var pos_in_table = 0;
			var HT = new Array();
			for (var k = 1; k <= 16; k++) {
				for (var j = 1; j <= nrcodes[k]; j++) {
					HT[std_table[pos_in_table]] = [];
					HT[std_table[pos_in_table]][0] = codevalue;
					HT[std_table[pos_in_table]][1] = k;
					pos_in_table++;
					codevalue++;
				}
				codevalue*=2;
			}
			return HT;
		}
		
		function initHuffmanTbl()
		{
			YDC_HT = computeHuffmanTbl(std_dc_luminance_nrcodes,std_dc_luminance_values);
			UVDC_HT = computeHuffmanTbl(std_dc_chrominance_nrcodes,std_dc_chrominance_values);
			YAC_HT = computeHuffmanTbl(std_ac_luminance_nrcodes,std_ac_luminance_values);
			UVAC_HT = computeHuffmanTbl(std_ac_chrominance_nrcodes,std_ac_chrominance_values);
		}
	
		function initCategoryNumber()
		{
			var nrlower = 1;
			var nrupper = 2;
			for (var cat = 1; cat <= 15; cat++) {
				//Positive numbers
				for (var nr = nrlower; nr<nrupper; nr++) {
					category[32767+nr] = cat;
					bitcode[32767+nr] = [];
					bitcode[32767+nr][1] = cat;
					bitcode[32767+nr][0] = nr;
				}
				//Negative numbers
				for (var nrneg =-(nrupper-1); nrneg<=-nrlower; nrneg++) {
					category[32767+nrneg] = cat;
					bitcode[32767+nrneg] = [];
					bitcode[32767+nrneg][1] = cat;
					bitcode[32767+nrneg][0] = nrupper-1+nrneg;
				}
				nrlower <<= 1;
				nrupper <<= 1;
			}
		}
		
		function initRGBYUVTable() {
			for(var i = 0; i < 256;i++) {
				RGB_YUV_TABLE[i]      		=  19595 * i;
				RGB_YUV_TABLE[(i+ 256)>>0] 	=  38470 * i;
				RGB_YUV_TABLE[(i+ 512)>>0] 	=   7471 * i + 0x8000;
				RGB_YUV_TABLE[(i+ 768)>>0] 	= -11059 * i;
				RGB_YUV_TABLE[(i+1024)>>0] 	= -21709 * i;
				RGB_YUV_TABLE[(i+1280)>>0] 	=  32768 * i + 0x807FFF;
				RGB_YUV_TABLE[(i+1536)>>0] 	= -27439 * i;
				RGB_YUV_TABLE[(i+1792)>>0] 	= - 5329 * i;
			}
		}
		
		// IO functions
		function writeBits(bs)
		{
			var value = bs[0];
			var posval = bs[1]-1;
			while ( posval >= 0 ) {
				if (value & (1 << posval) ) {
					bytenew |= (1 << bytepos);
				}
				posval--;
				bytepos--;
				if (bytepos < 0) {
					if (bytenew == 0xFF) {
						writeByte(0xFF);
						writeByte(0);
					}
					else {
						writeByte(bytenew);
					}
					bytepos=7;
					bytenew=0;
				}
			}
		}
	
		function writeByte(value)
		{
			byteout.push(clt[value]); // write char directly instead of converting later
		}
	
		function writeWord(value)
		{
			writeByte((value>>8)&0xFF);
			writeByte((value   )&0xFF);
		}
		
		// DCT & quantization core
		function fDCTQuant(data, fdtbl)
		{
			var d0, d1, d2, d3, d4, d5, d6, d7;
			/* Pass 1: process rows. */
			var dataOff=0;
			var i;
			const I8 = 8;
			const I64 = 64;
			for (i=0; i<I8; ++i)
			{
				d0 = data[dataOff];
				d1 = data[dataOff+1];
				d2 = data[dataOff+2];
				d3 = data[dataOff+3];
				d4 = data[dataOff+4];
				d5 = data[dataOff+5];
				d6 = data[dataOff+6];
				d7 = data[dataOff+7];
				
				var tmp0 = d0 + d7;
				var tmp7 = d0 - d7;
				var tmp1 = d1 + d6;
				var tmp6 = d1 - d6;
				var tmp2 = d2 + d5;
				var tmp5 = d2 - d5;
				var tmp3 = d3 + d4;
				var tmp4 = d3 - d4;
	
				/* Even part */
				var tmp10 = tmp0 + tmp3;	/* phase 2 */
				var tmp13 = tmp0 - tmp3;
				var tmp11 = tmp1 + tmp2;
				var tmp12 = tmp1 - tmp2;
	
				data[dataOff] = tmp10 + tmp11; /* phase 3 */
				data[dataOff+4] = tmp10 - tmp11;
	
				var z1 = (tmp12 + tmp13) * 0.707106781; /* c4 */
				data[dataOff+2] = tmp13 + z1; /* phase 5 */
				data[dataOff+6] = tmp13 - z1;
	
				/* Odd part */
				tmp10 = tmp4 + tmp5; /* phase 2 */
				tmp11 = tmp5 + tmp6;
				tmp12 = tmp6 + tmp7;
	
				/* The rotator is modified from fig 4-8 to avoid extra negations. */
				var z5 = (tmp10 - tmp12) * 0.382683433; /* c6 */
				var z2 = 0.541196100 * tmp10 + z5; /* c2-c6 */
				var z4 = 1.306562965 * tmp12 + z5; /* c2+c6 */
				var z3 = tmp11 * 0.707106781; /* c4 */
	
				var z11 = tmp7 + z3;	/* phase 5 */
				var z13 = tmp7 - z3;
	
				data[dataOff+5] = z13 + z2;	/* phase 6 */
				data[dataOff+3] = z13 - z2;
				data[dataOff+1] = z11 + z4;
				data[dataOff+7] = z11 - z4;
	
				dataOff += 8; /* advance pointer to next row */
			}
	
			/* Pass 2: process columns. */
			dataOff = 0;
			for (i=0; i<I8; ++i)
			{
				d0 = data[dataOff];
				d1 = data[dataOff + 8];
				d2 = data[dataOff + 16];
				d3 = data[dataOff + 24];
				d4 = data[dataOff + 32];
				d5 = data[dataOff + 40];
				d6 = data[dataOff + 48];
				d7 = data[dataOff + 56];
				
				var tmp0p2 = d0 + d7;
				var tmp7p2 = d0 - d7;
				var tmp1p2 = d1 + d6;
				var tmp6p2 = d1 - d6;
				var tmp2p2 = d2 + d5;
				var tmp5p2 = d2 - d5;
				var tmp3p2 = d3 + d4;
				var tmp4p2 = d3 - d4;
	
				/* Even part */
				var tmp10p2 = tmp0p2 + tmp3p2;	/* phase 2 */
				var tmp13p2 = tmp0p2 - tmp3p2;
				var tmp11p2 = tmp1p2 + tmp2p2;
				var tmp12p2 = tmp1p2 - tmp2p2;
	
				data[dataOff] = tmp10p2 + tmp11p2; /* phase 3 */
				data[dataOff+32] = tmp10p2 - tmp11p2;
	
				var z1p2 = (tmp12p2 + tmp13p2) * 0.707106781; /* c4 */
				data[dataOff+16] = tmp13p2 + z1p2; /* phase 5 */
				data[dataOff+48] = tmp13p2 - z1p2;
	
				/* Odd part */
				tmp10p2 = tmp4p2 + tmp5p2; /* phase 2 */
				tmp11p2 = tmp5p2 + tmp6p2;
				tmp12p2 = tmp6p2 + tmp7p2;
	
				/* The rotator is modified from fig 4-8 to avoid extra negations. */
				var z5p2 = (tmp10p2 - tmp12p2) * 0.382683433; /* c6 */
				var z2p2 = 0.541196100 * tmp10p2 + z5p2; /* c2-c6 */
				var z4p2 = 1.306562965 * tmp12p2 + z5p2; /* c2+c6 */
				var z3p2 = tmp11p2 * 0.707106781; /* c4 */
	
				var z11p2 = tmp7p2 + z3p2;	/* phase 5 */
				var z13p2 = tmp7p2 - z3p2;
	
				data[dataOff+40] = z13p2 + z2p2; /* phase 6 */
				data[dataOff+24] = z13p2 - z2p2;
				data[dataOff+ 8] = z11p2 + z4p2;
				data[dataOff+56] = z11p2 - z4p2;
	
				dataOff++; /* advance pointer to next column */
			}
	
			// Quantize/descale the coefficients
			var fDCTQuant;
			for (i=0; i<I64; ++i)
			{
				// Apply the quantization and scaling factor & Round to nearest integer
				fDCTQuant = data[i]*fdtbl[i];
				outputfDCTQuant[i] = (fDCTQuant > 0.0) ? ((fDCTQuant + 0.5)|0) : ((fDCTQuant - 0.5)|0);
				//outputfDCTQuant[i] = fround(fDCTQuant);

			}
			return outputfDCTQuant;
		}
		
		function writeAPP0()
		{
			writeWord(0xFFE0); // marker
			writeWord(16); // length
			writeByte(0x4A); // J
			writeByte(0x46); // F
			writeByte(0x49); // I
			writeByte(0x46); // F
			writeByte(0); // = "JFIF",'\0'
			writeByte(1); // versionhi
			writeByte(1); // versionlo
			writeByte(0); // xyunits
			writeWord(1); // xdensity
			writeWord(1); // ydensity
			writeByte(0); // thumbnwidth
			writeByte(0); // thumbnheight
		}
	
		function writeSOF0(width, height)
		{
			writeWord(0xFFC0); // marker
			writeWord(17);   // length, truecolor YUV JPG
			writeByte(8);    // precision
			writeWord(height);
			writeWord(width);
			writeByte(3);    // nrofcomponents
			writeByte(1);    // IdY
			writeByte(0x11); // HVY
			writeByte(0);    // QTY
			writeByte(2);    // IdU
			writeByte(0x11); // HVU
			writeByte(1);    // QTU
			writeByte(3);    // IdV
			writeByte(0x11); // HVV
			writeByte(1);    // QTV
		}
	
		function writeDQT()
		{
			writeWord(0xFFDB); // marker
			writeWord(132);	   // length
			writeByte(0);
			for (var i=0; i<64; i++) {
				writeByte(YTable[i]);
			}
			writeByte(1);
			for (var j=0; j<64; j++) {
				writeByte(UVTable[j]);
			}
		}
	
		function writeDHT()
		{
			writeWord(0xFFC4); // marker
			writeWord(0x01A2); // length
	
			writeByte(0); // HTYDCinfo
			for (var i=0; i<16; i++) {
				writeByte(std_dc_luminance_nrcodes[i+1]);
			}
			for (var j=0; j<=11; j++) {
				writeByte(std_dc_luminance_values[j]);
			}
	
			writeByte(0x10); // HTYACinfo
			for (var k=0; k<16; k++) {
				writeByte(std_ac_luminance_nrcodes[k+1]);
			}
			for (var l=0; l<=161; l++) {
				writeByte(std_ac_luminance_values[l]);
			}
	
			writeByte(1); // HTUDCinfo
			for (var m=0; m<16; m++) {
				writeByte(std_dc_chrominance_nrcodes[m+1]);
			}
			for (var n=0; n<=11; n++) {
				writeByte(std_dc_chrominance_values[n]);
			}
	
			writeByte(0x11); // HTUACinfo
			for (var o=0; o<16; o++) {
				writeByte(std_ac_chrominance_nrcodes[o+1]);
			}
			for (var p=0; p<=161; p++) {
				writeByte(std_ac_chrominance_values[p]);
			}
		}
	
		function writeSOS()
		{
			writeWord(0xFFDA); // marker
			writeWord(12); // length
			writeByte(3); // nrofcomponents
			writeByte(1); // IdY
			writeByte(0); // HTY
			writeByte(2); // IdU
			writeByte(0x11); // HTU
			writeByte(3); // IdV
			writeByte(0x11); // HTV
			writeByte(0); // Ss
			writeByte(0x3f); // Se
			writeByte(0); // Bf
		}
		
		function processDU(CDU, fdtbl, DC, HTDC, HTAC){
			var EOB = HTAC[0x00];
			var M16zeroes = HTAC[0xF0];
			var pos;
			const I16 = 16;
			const I63 = 63;
			const I64 = 64;
			var DU_DCT = fDCTQuant(CDU, fdtbl);
			//ZigZag reorder
			for (var j=0;j<I64;++j) {
				DU[ZigZag[j]]=DU_DCT[j];
			}
			var Diff = DU[0] - DC; DC = DU[0];
			//Encode DC
			if (Diff==0) {
				writeBits(HTDC[0]); // Diff might be 0
			} else {
				pos = 32767+Diff;
				writeBits(HTDC[category[pos]]);
				writeBits(bitcode[pos]);
			}
			//Encode ACs
			var end0pos = 63; // was const... which is crazy
			for (; (end0pos>0)&&(DU[end0pos]==0); end0pos--) {};
			//end0pos = first element in reverse order !=0
			if ( end0pos == 0) {
				writeBits(EOB);
				return DC;
			}
			var i = 1;
			var lng;
			while ( i <= end0pos ) {
				var startpos = i;
				for (; (DU[i]==0) && (i<=end0pos); ++i) {}
				var nrzeroes = i-startpos;
				if ( nrzeroes >= I16 ) {
					lng = nrzeroes>>4;
					for (var nrmarker=1; nrmarker <= lng; ++nrmarker)
						writeBits(M16zeroes);
					nrzeroes = nrzeroes&0xF;
				}
				pos = 32767+DU[i];
				writeBits(HTAC[(nrzeroes<<4)+category[pos]]);
				writeBits(bitcode[pos]);
				i++;
			}
			if ( end0pos != I63 ) {
				writeBits(EOB);
			}
			return DC;
		}

		function initCharLookupTable(){
			var sfcc = String.fromCharCode;
			for(var i=0; i < 256; i++){ ///// ACHTUNG // 255
				clt[i] = sfcc(i);
			}
		}
		
		this.encode = function(image,quality) // image data object
		{
			var time_start = new Date().getTime();
			
			if(quality) setQuality(quality);
			
			// Initialize bit writer
			byteout = new Array();
			bytenew=0;
			bytepos=7;
	
			// Add JPEG headers
			writeWord(0xFFD8); // SOI
			writeAPP0();
			writeDQT();
			writeSOF0(image.width,image.height);
			writeDHT();
			writeSOS();

	
			// Encode 8x8 macroblocks
			var DCY=0;
			var DCU=0;
			var DCV=0;
			
			bytenew=0;
			bytepos=7;
			
			
			this.encode.displayName = "_encode_";

			var imageData = image.data;
			var width = image.width;
			var height = image.height;

			var quadWidth = width*4;
			var tripleWidth = width*3;
			
			var x, y = 0;
			var r, g, b;
			var start,p, col,row,pos;
			while(y < height){
				x = 0;
				while(x < quadWidth){
				start = quadWidth * y + x;
				p = start;
				col = -1;
				row = 0;
				
				for(pos=0; pos < 64; pos++){
					row = pos >> 3;// /8
					col = ( pos & 7 ) * 4; // %8
					p = start + ( row * quadWidth ) + col;		
					
					if(y+row >= height){ // padding bottom
						p-= (quadWidth*(y+1+row-height));
					}

					if(x+col >= quadWidth){ // padding right	
						p-= ((x+col) - quadWidth +4)
					}
					
					r = imageData[ p++ ];
					g = imageData[ p++ ];
					b = imageData[ p++ ];
					
					
					/* // calculate YUV values dynamically
					YDU[pos]=((( 0.29900)*r+( 0.58700)*g+( 0.11400)*b))-128; //-0x80
					UDU[pos]=(((-0.16874)*r+(-0.33126)*g+( 0.50000)*b));
					VDU[pos]=((( 0.50000)*r+(-0.41869)*g+(-0.08131)*b));
					*/
					
					// use lookup table (slightly faster)
					YDU[pos] = ((RGB_YUV_TABLE[r]             + RGB_YUV_TABLE[(g +  256)>>0] + RGB_YUV_TABLE[(b +  512)>>0]) >> 16)-128;
					UDU[pos] = ((RGB_YUV_TABLE[(r +  768)>>0] + RGB_YUV_TABLE[(g + 1024)>>0] + RGB_YUV_TABLE[(b + 1280)>>0]) >> 16)-128;
					VDU[pos] = ((RGB_YUV_TABLE[(r + 1280)>>0] + RGB_YUV_TABLE[(g + 1536)>>0] + RGB_YUV_TABLE[(b + 1792)>>0]) >> 16)-128;

				}
				
				DCY = processDU(YDU, fdtbl_Y, DCY, YDC_HT, YAC_HT);
				DCU = processDU(UDU, fdtbl_UV, DCU, UVDC_HT, UVAC_HT);
				DCV = processDU(VDU, fdtbl_UV, DCV, UVDC_HT, UVAC_HT);
				x+=32;
				}
				y+=8;
			}
			
			
			////////////////////////////////////////////////////////////////
	
			// Do the bit alignment of the EOI marker
			if ( bytepos >= 0 ) {
				var fillbits = [];
				fillbits[1] = bytepos+1;
				fillbits[0] = (1<<(bytepos+1))-1;
				writeBits(fillbits);
			}
	
			writeWord(0xFFD9); //EOI

			var jpegDataUri = 'data:image/jpeg;base64,' + btoa(byteout.join(''));
			
			byteout = [];
			
			// benchmarking
			var duration = new Date().getTime() - time_start;
    		console.log('Encoding time: '+ duration + 'ms');
    		//
			
			return jpegDataUri			
	}
	
	function setQuality(quality){
		if (quality <= 0) {
			quality = 1;
		}
		if (quality > 100) {
			quality = 100;
		}
		
		if(currentQuality == quality) return // don't recalc if unchanged
		
		var sf = 0;
		if (quality < 50) {
			sf = Math.floor(5000 / quality);
		} else {
			sf = Math.floor(200 - quality*2);
		}
		
		initQuantTables(sf);
		currentQuality = quality;
		console.log('Quality set to: '+quality +'%');
	}
	
	function init(){
		var time_start = new Date().getTime();
		if(!quality) quality = 50;
		// Create tables
		initCharLookupTable()
		initHuffmanTbl();
		initCategoryNumber();
		initRGBYUVTable();
		
		setQuality(quality);
		var duration = new Date().getTime() - time_start;
    	console.log('Initialization '+ duration + 'ms');
	}
	
	init();
	
};

// helper function to get the imageData of an existing image on the current page.
function getImageDataFromImage(idOrElement){
	var theImg = (typeof(idOrElement)=='string')? document.getElementById(idOrElement):idOrElement;
	var cvs = document.createElement('canvas');
	cvs.width = theImg.width;
	cvs.height = theImg.height;
	var ctx = cvs.getContext("2d");
	ctx.drawImage(theImg,0,0);
	
	return (ctx.getImageData(0, 0, cvs.width, cvs.height));
}
/*

function init(qu){
	var theImg = document.getElementById('testimage');
	var cvs = document.createElement('canvas');
	cvs.width = theImg.width;
	cvs.height = theImg.height;
	
	//document.body.appendChild(cvs);
	
	var ctx = cvs.getContext("2d");

	ctx.drawImage(theImg,0,0);

	var theImgData = (ctx.getImageData(0, 0, cvs.width, cvs.height));
	

	var jpegURI = encoder.encode(theImgData,qu);
	
	var img = document.createElement('img');
	img.src = jpegURI;
	document.body.appendChild(img);
}
*/

;

/**
 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
 *
 * @version 0.6.11
 * @codingstandard ftlabs-jsv2
 * @copyright The Financial Times Limited [All Rights Reserved]
 * @license MIT License (see LICENSE.txt)
 */

/*jslint browser:true, node:true*/
/*global define, Event, Node*/


/**
 * Instantiate fast-clicking listeners on the specificed layer.
 *
 * @constructor
 * @param {Element} layer The layer to listen on
 */
function FastClick(layer) {
    'use strict';
    var oldOnClick, self = this;


    /**
     * Whether a click is currently being tracked.
     *
     * @type boolean
     */
    this.trackingClick = false;


    /**
     * Timestamp for when when click tracking started.
     *
     * @type number
     */
    this.trackingClickStart = 0;


    /**
     * The element being tracked for a click.
     *
     * @type EventTarget
     */
    this.targetElement = null;


    /**
     * X-coordinate of touch start event.
     *
     * @type number
     */
    this.touchStartX = 0;


    /**
     * Y-coordinate of touch start event.
     *
     * @type number
     */
    this.touchStartY = 0;


    /**
     * ID of the last touch, retrieved from Touch.identifier.
     *
     * @type number
     */
    this.lastTouchIdentifier = 0;


    /**
     * Touchmove boundary, beyond which a click will be cancelled.
     *
     * @type number
     */
    this.touchBoundary = 10;


    /**
     * The FastClick layer.
     *
     * @type Element
     */
    this.layer = layer;

    if (!layer || !layer.nodeType) {
        throw new TypeError('Layer must be a document node');
    }

    /** @type function() */
    this.onClick = function() { return FastClick.prototype.onClick.apply(self, arguments); };

    /** @type function() */
    this.onMouse = function() { return FastClick.prototype.onMouse.apply(self, arguments); };

    /** @type function() */
    this.onTouchStart = function() { return FastClick.prototype.onTouchStart.apply(self, arguments); };

    /** @type function() */
    this.onTouchMove = function() { return FastClick.prototype.onTouchMove.apply(self, arguments); };

    /** @type function() */
    this.onTouchEnd = function() { return FastClick.prototype.onTouchEnd.apply(self, arguments); };

    /** @type function() */
    this.onTouchCancel = function() { return FastClick.prototype.onTouchCancel.apply(self, arguments); };

    if (FastClick.notNeeded(layer)) {
        return;
    }

    // Set up event handlers as required
    if (this.deviceIsAndroid) {
        layer.addEventListener('mouseover', this.onMouse, true);
        layer.addEventListener('mousedown', this.onMouse, true);
        layer.addEventListener('mouseup', this.onMouse, true);
    }

    layer.addEventListener('click', this.onClick, true);
    layer.addEventListener('touchstart', this.onTouchStart, false);
    layer.addEventListener('touchmove', this.onTouchMove, false);
    layer.addEventListener('touchend', this.onTouchEnd, false);
    layer.addEventListener('touchcancel', this.onTouchCancel, false);

    // Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
    // which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
    // layer when they are cancelled.
    if (!Event.prototype.stopImmediatePropagation) {
        layer.removeEventListener = function(type, callback, capture) {
            var rmv = Node.prototype.removeEventListener;
            if (type === 'click') {
                rmv.call(layer, type, callback.hijacked || callback, capture);
            } else {
                rmv.call(layer, type, callback, capture);
            }
        };

        layer.addEventListener = function(type, callback, capture) {
            var adv = Node.prototype.addEventListener;
            if (type === 'click') {
                adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
                    if (!event.propagationStopped) {
                        callback(event);
                    }
                }), capture);
            } else {
                adv.call(layer, type, callback, capture);
            }
        };
    }

    // If a handler is already declared in the element's onclick attribute, it will be fired before
    // FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
    // adding it as listener.
    if (typeof layer.onclick === 'function') {

        // Android browser on at least 3.2 requires a new reference to the function in layer.onclick
        // - the old one won't work if passed to addEventListener directly.
        oldOnClick = layer.onclick;
        layer.addEventListener('click', function(event) {
            oldOnClick(event);
        }, false);
        layer.onclick = null;
    }
}


/**
 * Android requires exceptions.
 *
 * @type boolean
 */
FastClick.prototype.deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0;


/**
 * iOS requires exceptions.
 *
 * @type boolean
 */
FastClick.prototype.deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);


/**
 * iOS 4 requires an exception for select elements.
 *
 * @type boolean
 */
FastClick.prototype.deviceIsIOS4 = FastClick.prototype.deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


/**
 * iOS 6.0(+?) requires the target element to be manually derived
 *
 * @type boolean
 */
FastClick.prototype.deviceIsIOSWithBadTarget = FastClick.prototype.deviceIsIOS && (/OS ([6-9]|\d{2})_\d/).test(navigator.userAgent);


/**
 * Determine whether a given element requires a native click.
 *
 * @param {EventTarget|Element} target Target DOM element
 * @returns {boolean} Returns true if the element needs a native click
 */
FastClick.prototype.needsClick = function(target) {
    'use strict';
    switch (target.nodeName.toLowerCase()) {

    // Don't send a synthetic click to disabled inputs (issue #62)
    case 'button':
    case 'select':
    case 'textarea':
        if (target.disabled) {
            return true;
        }

        break;
    case 'input':

        // File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
        if ((this.deviceIsIOS && target.type === 'file') || target.disabled) {
            return true;
        }

        break;
    case 'label':
    case 'video':
        return true;
    }

    return (/\bneedsclick\b/).test(target.className);
};


/**
 * Determine whether a given element requires a call to focus to simulate click into element.
 *
 * @param {EventTarget|Element} target Target DOM element
 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
 */
FastClick.prototype.needsFocus = function(target) {
    'use strict';
    switch (target.nodeName.toLowerCase()) {
    case 'textarea':
        return true;
    case 'select':
        return !this.deviceIsAndroid;
    case 'input':
        switch (target.type) {
        case 'button':
        case 'checkbox':
        case 'file':
        case 'image':
        case 'radio':
        case 'submit':
            return false;
        }

        // No point in attempting to focus disabled inputs
        return !target.disabled && !target.readOnly;
    default:
        return (/\bneedsfocus\b/).test(target.className);
    }
};


/**
 * Send a click event to the specified element.
 *
 * @param {EventTarget|Element} targetElement
 * @param {Event} event
 */
FastClick.prototype.sendClick = function(targetElement, event) {
    'use strict';
    var clickEvent, touch;

    // On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
    if (document.activeElement && document.activeElement !== targetElement) {
        document.activeElement.blur();
    }

    touch = event.changedTouches[0];

    // Synthesise a click event, with an extra attribute so it can be tracked
    clickEvent = document.createEvent('MouseEvents');
    clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
    clickEvent.forwardedTouchEvent = true;
    targetElement.dispatchEvent(clickEvent);
};

FastClick.prototype.determineEventType = function(targetElement) {
    'use strict';

    //Issue #159: Android Chrome Select Box does not open with a synthetic click event
    if (this.deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
        return 'mousedown';
    }

    return 'click';
};


/**
 * @param {EventTarget|Element} targetElement
 */
FastClick.prototype.focus = function(targetElement) {
    'use strict';
    var length;

    // Issue #160: on iOS 7, some input elements (e.g. date datetime) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
    if (this.deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time') {
        length = targetElement.value.length;
        targetElement.setSelectionRange(length, length);
    } else {
        targetElement.focus();
    }
};


/**
 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
 *
 * @param {EventTarget|Element} targetElement
 */
FastClick.prototype.updateScrollParent = function(targetElement) {
    'use strict';
    var scrollParent, parentElement;

    scrollParent = targetElement.fastClickScrollParent;

    // Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
    // target element was moved to another parent.
    if (!scrollParent || !scrollParent.contains(targetElement)) {
        parentElement = targetElement;
        do {
            if (parentElement.scrollHeight > parentElement.offsetHeight) {
                scrollParent = parentElement;
                targetElement.fastClickScrollParent = parentElement;
                break;
            }

            parentElement = parentElement.parentElement;
        } while (parentElement);
    }

    // Always update the scroll top tracker if possible.
    if (scrollParent) {
        scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
    }
};


/**
 * @param {EventTarget} targetElement
 * @returns {Element|EventTarget}
 */
FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {
    'use strict';

    // On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
    if (eventTarget.nodeType === Node.TEXT_NODE) {
        return eventTarget.parentNode;
    }

    return eventTarget;
};


/**
 * On touch start, record the position and scroll offset.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchStart = function(event) {
    'use strict';
    var targetElement, touch, selection;

    // Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
    if (event.targetTouches.length > 1) {
        return true;
    }

    targetElement = this.getTargetElementFromEventTarget(event.target);
    touch = event.targetTouches[0];

    if (this.deviceIsIOS) {

        // Only trusted events will deselect text on iOS (issue #49)
        selection = window.getSelection();
        if (selection.rangeCount && !selection.isCollapsed) {
            return true;
        }

        if (!this.deviceIsIOS4) {

            // Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
            // when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
            // with the same identifier as the touch event that previously triggered the click that triggered the alert.
            // Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
            // immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
            if (touch.identifier === this.lastTouchIdentifier) {
                event.preventDefault();
                return false;
            }

            this.lastTouchIdentifier = touch.identifier;

            // If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
            // 1) the user does a fling scroll on the scrollable layer
            // 2) the user stops the fling scroll with another tap
            // then the event.target of the last 'touchend' event will be the element that was under the user's finger
            // when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
            // is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
            this.updateScrollParent(targetElement);
        }
    }

    this.trackingClick = true;
    this.trackingClickStart = event.timeStamp;
    this.targetElement = targetElement;

    this.touchStartX = touch.pageX;
    this.touchStartY = touch.pageY;

    // Prevent phantom clicks on fast double-tap (issue #36)
    if ((event.timeStamp - this.lastClickTime) < 200) {
        event.preventDefault();
    }

    return true;
};


/**
 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.touchHasMoved = function(event) {
    'use strict';
    var touch = event.changedTouches[0], boundary = this.touchBoundary;

    if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
        return true;
    }

    return false;
};


/**
 * Update the last position.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchMove = function(event) {
    'use strict';
    if (!this.trackingClick) {
        return true;
    }

    // If the touch has moved, cancel the click tracking
    if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
        this.trackingClick = false;
        this.targetElement = null;
    }

    return true;
};


/**
 * Attempt to find the labelled control for the given label element.
 *
 * @param {EventTarget|HTMLLabelElement} labelElement
 * @returns {Element|null}
 */
FastClick.prototype.findControl = function(labelElement) {
    'use strict';

    // Fast path for newer browsers supporting the HTML5 control attribute
    if (labelElement.control !== undefined) {
        return labelElement.control;
    }

    // All browsers under test that support touch events also support the HTML5 htmlFor attribute
    if (labelElement.htmlFor) {
        return document.getElementById(labelElement.htmlFor);
    }

    // If no for attribute exists, attempt to retrieve the first labellable descendant element
    // the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
    return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
};


/**
 * On touch end, determine whether to send a click event at once.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchEnd = function(event) {
    'use strict';
    var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

    if (!this.trackingClick) {
        return true;
    }

    // Prevent phantom clicks on fast double-tap (issue #36)
    if ((event.timeStamp - this.lastClickTime) < 200) {
        this.cancelNextClick = true;
        return true;
    }

    // Reset to prevent wrong click cancel on input (issue #156).
    this.cancelNextClick = false;

    this.lastClickTime = event.timeStamp;

    trackingClickStart = this.trackingClickStart;
    this.trackingClick = false;
    this.trackingClickStart = 0;

    // On some iOS devices, the targetElement supplied with the event is invalid if the layer
    // is performing a transition or scroll, and has to be re-detected manually. Note that
    // for this to function correctly, it must be called *after* the event target is checked!
    // See issue #57; also filed as rdar://13048589 .
    if (this.deviceIsIOSWithBadTarget) {
        touch = event.changedTouches[0];

        // In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
        targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
        targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
    }

    targetTagName = targetElement.tagName.toLowerCase();
    if (targetTagName === 'label') {
        forElement = this.findControl(targetElement);
        if (forElement) {
            this.focus(targetElement);
            if (this.deviceIsAndroid) {
                return false;
            }

            targetElement = forElement;
        }
    } else if (this.needsFocus(targetElement)) {

        // Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
        // Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
        if ((event.timeStamp - trackingClickStart) > 100 || (this.deviceIsIOS && window.top !== window && targetTagName === 'input')) {
            this.targetElement = null;
            return false;
        }

        this.focus(targetElement);

        // Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
        if (!this.deviceIsIOS4 || targetTagName !== 'select') {
            this.targetElement = null;
            event.preventDefault();
        }

        return false;
    }

    if (this.deviceIsIOS && !this.deviceIsIOS4) {

        // Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
        // and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
        scrollParent = targetElement.fastClickScrollParent;
        if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
            return true;
        }
    }

    // Prevent the actual click from going though - unless the target node is marked as requiring
    // real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
    if (!this.needsClick(targetElement)) {
        event.preventDefault();
        this.sendClick(targetElement, event);
    }

    return false;
};


/**
 * On touch cancel, stop tracking the click.
 *
 * @returns {void}
 */
FastClick.prototype.onTouchCancel = function() {
    'use strict';
    this.trackingClick = false;
    this.targetElement = null;
};


/**
 * Determine mouse events which should be permitted.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onMouse = function(event) {
    'use strict';

    // If a target element was never set (because a touch event was never fired) allow the event
    if (!this.targetElement) {
        return true;
    }

    if (event.forwardedTouchEvent) {
        return true;
    }

    // Programmatically generated events targeting a specific element should be permitted
    if (!event.cancelable) {
        return true;
    }

    // Derive and check the target element to see whether the mouse event needs to be permitted;
    // unless explicitly enabled, prevent non-touch click events from triggering actions,
    // to prevent ghost/doubleclicks.
    if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

        // Prevent any user-added listeners declared on FastClick element from being fired.
        if (event.stopImmediatePropagation) {
            event.stopImmediatePropagation();
        } else {

            // Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
            event.propagationStopped = true;
        }

        // Cancel the event
        event.stopPropagation();
        event.preventDefault();

        return false;
    }

    // If the mouse event is permitted, return true for the action to go through.
    return true;
};


/**
 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
 * an actual click which should be permitted.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onClick = function(event) {
    'use strict';
    var permitted;

    // It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
    if (this.trackingClick) {
        this.targetElement = null;
        this.trackingClick = false;
        return true;
    }

    // Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
    if (event.target.type === 'submit' && event.detail === 0) {
        return true;
    }

    permitted = this.onMouse(event);

    // Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
    if (!permitted) {
        this.targetElement = null;
    }

    // If clicks are permitted, return true for the action to go through.
    return permitted;
};


/**
 * Remove all FastClick's event listeners.
 *
 * @returns {void}
 */
FastClick.prototype.destroy = function() {
    'use strict';
    var layer = this.layer;

    if (this.deviceIsAndroid) {
        layer.removeEventListener('mouseover', this.onMouse, true);
        layer.removeEventListener('mousedown', this.onMouse, true);
        layer.removeEventListener('mouseup', this.onMouse, true);
    }

    layer.removeEventListener('click', this.onClick, true);
    layer.removeEventListener('touchstart', this.onTouchStart, false);
    layer.removeEventListener('touchmove', this.onTouchMove, false);
    layer.removeEventListener('touchend', this.onTouchEnd, false);
    layer.removeEventListener('touchcancel', this.onTouchCancel, false);
};


/**
 * Check whether FastClick is needed.
 *
 * @param {Element} layer The layer to listen on
 */
FastClick.notNeeded = function(layer) {
    'use strict';
    var metaViewport;

    // Devices that don't support touch don't need FastClick
    if (typeof window.ontouchstart === 'undefined') {
        return true;
    }

    if ((/Chrome\/[0-9]+/).test(navigator.userAgent)) {

        // Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
        if (FastClick.prototype.deviceIsAndroid) {
            metaViewport = document.querySelector('meta[name=viewport]');
            if (metaViewport && metaViewport.content.indexOf('user-scalable=no') !== -1) {
                return true;
            }

        // Chrome desktop doesn't need FastClick (issue #15)
        } else {
            return true;
        }
    }

    // IE10 with -ms-touch-action: none, which disables double-tap-to-zoom (issue #97)
    if (layer.style.msTouchAction === 'none') {
        return true;
    }

    return false;
};


/**
 * Factory method for creating a FastClick object
 *
 * @param {Element} layer The layer to listen on
 */
FastClick.attach = function(layer) {
    'use strict';
    return new FastClick(layer);
};


if (typeof define !== 'undefined' && define.amd) {

    // AMD. Register as an anonymous module.
    define(function() {
        'use strict';
        return FastClick;
    });
} else if (typeof module !== 'undefined' && module.exports) {
    module.exports = FastClick.attach;
    module.exports.FastClick = FastClick;
} else {
    window.FastClick = FastClick;
}

;

$(function(){
    
    /* ----- Enable Fast Click ----- */
    
    /*if(window.FastClick){
        FastClick.attach(document.body);
    }*/

    /* ----- Utils ---- */

    function flash_class($el,css_class){
        $el.addClass('transition0');
        $el.addClass(css_class);
        setTimeout(function(){
            $el.removeClass('transition0');
            $el.addClass('transition500');
            $el.removeClass(css_class);
            setTimeout(function(){
                $el.removeClass('transition500');
            },500);
        },100);
    }

    /* ----- Simple Text Editor ----- */

    function TextEditor($el,onupdate){
        var  self = this;
        this.el   = $el.get(0);
        this.$el  = $(this.el);
        this.onupdate = onupdate;
        this.$el.bind('input propertychange',function(){ 
            self.update(); 
        });
        this.update();
        this.set_content('');
    }

    TextEditor.prototype = {
        type:       'text',
        datatype:   'string',
        show: function(){
            this.$el.removeClass('hidden');
            this.update();
        },
        focus: function(){
            this.$el.focus();
        },
        hide: function(){
            this.$el.addClass('hidden');
        },
        has_content: function(){
            return !!this.get_content();
        },
        set_content: function(txt){
            this.$el.val(txt);
        },
        get_content: function(){
            return this.$el.val();
        },
        update: function(){
            if(this.onupdate){
                this.onupdate(this);
            }
            this.el.style.height = 'auto';
            this.el.style.height = Math.max(this.el.scrollHeight,222) + 'px';
        },
    };

    /* ----- HTML Text Editor ----- */

    function HtmlEditor($el,onupdate){
        var  self = this;
        this.el   = $el.get(0);
        this.$el  = $(this.el);
        this.onupdate = onupdate;
        this.editor = ace.edit(this.el);
        this.editor.setTheme('ace/theme/pastel_on_dark');
        this.editor.getSession().setMode('ace/mode/html');

        this.editor.getSession().on('change',function(){
            self.update(); 
        });
        this.set_content('');
        this.update();
    }

    HtmlEditor.prototype = $.extend(Object.create(TextEditor.prototype), {
        type:      'html',
        datatype:  'string',
        update: function(){
            if(this.onupdate){
                this.onupdate(this);
            }
            var height = this.editor.getSession().getScreenLength() *
                         this.editor.renderer.lineHeight +
                         this.editor.renderer.scrollBar.getWidth();
            height = Math.max(height,190);
            this.$el.height(height.toString() + 'px');
            this.editor.resize();
        },
        get_content: function(){
            return this.editor.getValue();
        },
        set_content: function(txt){
            this.editor.setValue(txt);
        },
    });

    /* ----- Image Uploader ----- */

    function ImgEditor($el,onupdate){
        var  self = this;
        this.el   = $el.get(0);
        this.$el  = $(this.el);
        this.onupdate = onupdate;
        this.update();
        this.content = '';
        this.$el.click(function(){
            $('#img-selector').click();
        });
        $('#img-selector').on('change',function(event){
            self.load_image(event.target.files[0]);
        });
    }

    ImgEditor.prototype = $.extend(Object.create(TextEditor.prototype),{
        type:       'img',
        datatype:   'img',
        update: function(){
            if(this.onupdate){
                this.onupdate();
            }
        },
        get_content: function(){
            return this.content;
        },
        set_content: function(){},
        show_error: function(message){
            $('#img-error').text(message);
            $('#img-error').removeClass('hidden');
        },
        hide_error: function(){
            $('#img-error').addClass('hidden');
        },
        resize_image: function(img,maxwidth,maxheight,callback){
            img.onload = function(){
                if (img.height <= maxheight && img.width <= maxwidth){ 
                    callback(img);
                }else{
                    var jpeg = new Image();
                    var canvas = document.createElement("canvas");
                    var context = canvas.getContext("2d");
                    var ratio  = 1;

                    if(img.width > maxwidth){
                        ratio = maxwidth / img.width;
                    }
                    if(img.height * ratio > maxheight){
                        ratio = maxheight / img.height;
                    }
                    var width = Math.floor(img.width * ratio);
                    var height = Math.floor(img.height * ratio);

                    canvas.width = width;
                    canvas.height = height;
                    context.drawImage(img,0,0,width,height);

                    var encoder = new JPEGEncoder(70);
                    jpeg.src = encoder.encode(context.getImageData(0,0,width,height));
                    jpeg.onload = function(){
                        callback(jpeg);
                    };
                }
            };
        },
        load_image: function(file){
            var self = this;
            this.hide_error();
            if(!file.type.match(/image.*/)){
                self.show_error('Unsupported File Format');
                return;
            }

            var reader = new FileReader();
            reader.onload = function(event){
                var dataurl = event.target.result;

                if(!window.cryptolink.is_image_format_allowed(dataurl)){
                    self.show_error('Unsupported File Format');
                    return;
                }

                var img = new Image();
                img.src = dataurl;
                self.resize_image(img,600,1200,function(img){
                    self.content = img.src;
                    self.$el.find('.userimages').empty();
                    self.$el.find('.userimages').append(img);
                    self.$el.find('.dropinvite').addClass('hidden');  
                    self.$el.removeClass('smallpic');
                    if(img.width < 600 || img.height < 257){
                        self.$el.addClass('smallpic');
                    }
                    self.update();
                });
            };
            reader.onerror = function(){
                self.show_error('Could not read file');
            };
            reader.readAsDataURL(file);
        },
    });


    /* ----- Main GUI ----- */

    function MainGui(){
        var self = this;

        this.editor = null;
        this.editors = {
            'text': new TextEditor($('#editor-text'), function(){ self.on_content_changed(); }),
            'html': new HtmlEditor($('#editor-html'), function(){ self.on_content_changed(); }),
            'img' : new ImgEditor($('#editor-img'),   function(){ self.on_content_changed(); }),
        };
        this.set_editor('text');
        this.editor.focus();

        $('#content-type .option').click(function(){
            self.set_editor($(this).data('type'));
        });
        $('#content-type .option').hover(function(){
                var type = $(this).data('type');
                var label = $('#content-type .label');
                if(type === 'text'){
                    label.text('Encrypt a Text Message');
                }else if(type === 'html'){
                    label.text('Encrypt an HTML Web Page');
                }else if(type === 'img'){
                    label.text('Encrypt a Picture');
                }
                label.removeClass('invisible');
            },function(){
                $('#content-type .label').addClass('invisible');
            });

        $('#password').bind('change input propertychange',function(){ self.check_password(); });
        $('#password').bind('change input propertychange',function(){ self.on_content_changed(); });
        $('#password').val('');
        $('#password').keypress(function(e){
            if(e.which === 13){
                $('#submit').click();
            }
        });
        $('#submit').click(function(){
            self.encode(self.editor.get_content(),$('#password').val());
        });
    }
    
    MainGui.prototype = {
        on_content_changed: function(){
            if(this.editor && this.editor.has_content() && $('#password').val()){
                $('#submit').removeClass('disabled');
            }else{
                $('#submit').addClass('disabled');
            }
            $('#display').addClass('hidden');
        },
        set_editor: function(type){
            if(!this.editor){
                this.editor = this.editors[type];
            }else if(this.editor.type !== type){
                this.editor.hide();
                if(this.editor.datatype === this.editors[type].datatype){
                    this.editors[type].set_content(this.editor.get_content());
                }
                this.editor = this.editors[type];
                $('#content-type .option.active').removeClass('active');
            }
            $('#content-type .option[data-type="'+type+'"]').addClass('active');
            this.editor.show();
        },
        display_security: function(security,score){
            var s = $('#security');
            s.removeClass('valid');
            s.removeClass('improve');
            s.removeClass('invalid');
            s.removeClass('hidden');
            if(security === 'insecure'){
                    s.addClass('invalid');
                    s.html("<span class='progress'></span><i class='icon-warning-sign'></i>&nbsp; Insecure");
            }else if(security === 'improve'){
                    s.addClass('improve');
                    s.html("<span class='progress'></span><i class='icon-ok'></i>&nbsp; Not bad");
            }else if(security === 'secure'){
                    s.addClass('valid');
                    s.html("<span class='progress'></span><i class='icon-lock'></i>&nbsp; Secure");
            }else if(security === 'overkill'){
                    s.addClass('valid');
                    s.html("<span class='progress'></span><i class='icon-lock'></i>&nbsp; Overkill");
            }else{
                    s.addClass('hidden');
                    s.html('');
            }
            s.find('.progress').css('width',Math.floor(score*100)+'%');
        },
        check_password: function(){
            var self = this;
            var pw = $('#password');

            clearTimeout(this.ckpw_timeout);
            this.ckpw_timeout = setTimeout(function(){

                if(pw.val().length === 0){
                    self.display_security('none',0);
                }else{
                    var security = zxcvbn(pw.val(),['horsebatterystaple']);
                    if(security.entropy <= 32){
                        self.display_security('insecure',security.entropy/32.0);
                    }else if(security.entropy <= 64){
                        self.display_security('improve',(security.entropy-32)/32.0);
                    }else if(security.entropy <= 256){
                        self.display_security('secure',(security.entropy-64)/192.0);
                    }else{
                        self.display_security('overkill',1);
                    }
                }
            },100);
        },
        on_encoding_success: function(url){
            $('.urlbox .url').attr('href',url).text(url.slice(0,1024));
            $('.urlbox .js-action-email').attr('href','mailto:?body='+url);
            $('.urlbox .js-action-sms').attr('href','sms:?body='+url);
            $('.urlbox .js-action-print').click(function(){ window.print(); });

            $('.urlbox .js-url-length').text(url.length < 1024 ? 
                  url.length 
                : Math.floor(url.length*10/1024) / 10 + ' KiB');
            $('.loading').addClass('hidden');

            $('#display').removeClass('hidden');

            /*$('#qrcode').empty();

            var correctLevel = null;
            var small = url.length < 175;

            if(url.length <= 2953){
                $('#qrcode').qrcode({
                    'text': url,
                    'size': small ? 284 : 568,
                });
                var imgdata = $('#qrcode canvas')[0].toDataURL();
                $('#qrcode canvas').replaceWith($('<img>').attr('src',imgdata));
            }else{
                $('#qrcode').text('Sorry, the data is too big to fit in a QR-Code');
            }*/
            
            $('html, body').animate({
                scrollTop: $('#display').offset().top - window.innerHeight * 0.3
            },500);
        },
        encode: function(content,password){
            var self = this;
            if(!content){
                flash_class(this.editor.$el,'invalid');
            }
            if(!password){
                flash_class($('#password'),'invalid');
            }
            if(content && password){ 
                $('.loading').removeClass('hidden');
                setTimeout(function(){
                    var origin = window.location.origin || window.location.protocol + '//' + window.location.host;
                    var baseurl = origin + window.location.pathname;

                    window.cryptolink.encode_url({
                        baseurl: baseurl,
                        content: content,
                        type: self.editor.type,
                        password: password
                    }, function(url){ 
                        self.on_encoding_success(url); 
                    });

                },500);
            }
        },
    };

    window.gui = new MainGui();

    /* ----- Copy URL Button ----- */
    
    /*
    ZeroClipboard.setDefaults({ 
        moviePath: 'js/vendor/ZeroClipboard.swf',
        forceHandCursor: true, //FIXME: not working.
    });

    var clip = new ZeroClipboard($('#copyurl'));

    clip.on('dataRequested', function(client, args){
        client.setText($('.urlbox .url').attr('href'));
    });
    clip.on('noflash',function(){
        $('#copyurl').addClass('hidden');
    });
    */

    /* ---- Encrypted Result Display ---- */
    
    /* var display_type = null;

    function set_display(type){
        if(display_type !== type){
            if(display_type){
                $('#display-'+display_type).addClass('hidden');
            }
            display_type = type;
            $('#display-'+type).removeClass('hidden');
            $('#display-type .option.active').removeClass('active');
        }
        $('#display-type .option[data-type="'+type+'"]').addClass('active');
    }
    set_display('url');
    
    $('#display-type .option').click(function(){
        set_display($(this).data('type'));
    });
    $('#display-type .option').hover(function(){
            var type = $(this).data('type');
            var label = $('#display .label');
            if(type === 'url'){
                label.text('Encrypted URL');
            }else if(type === 'qrcode'){
                label.text('Encrypted QR-Code');
            }
            label.removeClass('invisible');
        },function(){
            $('#display .label').addClass('invisible');
        });
    */
});
