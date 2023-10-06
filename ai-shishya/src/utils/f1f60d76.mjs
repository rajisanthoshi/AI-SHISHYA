define(["exports","./e465bf89.mjs"],(function(t,e){"use strict";var s=e.Trimble.Technology.TrimBim.Fbs,i=s.HierarchyType,a=s.PropertyType,r=s.GeometryType,n=s.IdentifierType,h=s.Sidedness,o=s.LineStyle,d=s.AlignmentType;const f=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","_","$"];t.AlignmentType=d,t.Base64ConversionTable=f,t.Entity=class{},t.HierarchyType=i,t.IdentifierType=n,t.LineStyle=o,t.PropertyType=a,t.Sidedness=h,t.TrimbimGeometryType=r,t.UUID=class{constructor({data:t,ifcGuid:e,msGuid:s}){this.type="UUID",t?this.data=t:e?this.setIfcGuid(e):s?this.setMsGuid(s):this.data=new Uint8Array(16)}fromJSON({type:t,data:e}){if("UUID"!==t)throw TypeError("Incorrect type, type needs to be UUID");this.data=new Uint8Array(JSON.parse("["+e+"]"))}equals(t){for(let e=0;e<16;e++)if(this.data[e]!==t.data[e])return!1;return!0}toString(){return this.msGuid}get msGuid(){const t=this.data.byteOffset,e=new DataView(this.data.buffer,t,16);return`${e.getUint32(0,!0).toString(16).padStart(8,"0")}-${e.getUint16(4,!0).toString(16).padStart(4,"0")}-${e.getUint16(6,!0).toString(16).padStart(4,"0")}-${e.getUint8(8).toString(16).padStart(2,"0")}${e.getUint8(9).toString(16).padStart(2,"0")}-${e.getUint8(10).toString(16).padStart(2,"0")}${e.getUint8(11).toString(16).padStart(2,"0")}${e.getUint8(12).toString(16).padStart(2,"0")}${e.getUint8(13).toString(16).padStart(2,"0")}${e.getUint8(14).toString(16).padStart(2,"0")}${e.getUint8(15).toString(16).padStart(2,"0")}`}setMsGuid(t){this.data=this.data||new Uint8Array(16);const e=this.data.byteOffset,s=new DataView(this.data.buffer,e,16),i=(e,s)=>parseInt(t.slice(e,e+s),16);s.setUint32(0,i(0,8),!0),s.setUint16(4,i(9,4),!0),s.setUint16(6,i(14,4),!0),s.setUint8(8,i(19,2)),s.setUint8(9,i(21,2)),s.setUint8(10,i(24,2)),s.setUint8(11,i(26,2)),s.setUint8(12,i(28,2)),s.setUint8(13,i(30,2)),s.setUint8(14,i(32,2)),s.setUint8(15,i(34,2))}get ifcGuid(){const t=new Uint8Array(24),e=this.data;t[0]=e[15],t[1]=e[14],t[2]=e[13],t[3]=0,t[4]=e[12],t[5]=e[11],t[6]=e[10],t[7]=0,t[8]=e[9],t[9]=e[8],t[10]=e[6],t[11]=0,t[12]=e[7],t[13]=e[4],t[14]=e[5],t[15]=0,t[16]=e[0],t[17]=e[1],t[18]=e[2],t[19]=0,t[20]=e[3],t[21]=0,t[22]=0,t[23]=0;const s=new Uint32Array(t.buffer);return this.toBase64(s[5],8)+this.toBase64(s[4],24)+this.toBase64(s[3],24)+this.toBase64(s[2],24)+this.toBase64(s[1],24)+this.toBase64(s[0],24)}setIfcGuid(t){this.data=new Uint8Array(16);const e=this.fromBase64(t[0],6)+this.fromBase64(t[1],0),s=this.fromBase64(t[2],18)+this.fromBase64(t[3],12)+this.fromBase64(t[4],6)+this.fromBase64(t[5],0),i=this.fromBase64(t[6],18)+this.fromBase64(t[7],12)+this.fromBase64(t[8],6)+this.fromBase64(t[9],0),a=this.fromBase64(t[10],18)+this.fromBase64(t[11],12)+this.fromBase64(t[12],6)+this.fromBase64(t[13],0),r=this.fromBase64(t[14],18)+this.fromBase64(t[15],12)+this.fromBase64(t[16],6)+this.fromBase64(t[17],0),n=this.fromBase64(t[18],18)+this.fromBase64(t[19],12)+this.fromBase64(t[20],6)+this.fromBase64(t[21],0),h=this.getBytes(n),o=this.getBytes(r),d=this.getBytes(a),f=this.getBytes(i),y=this.getBytes(s),B=this.getBytes(e);this.data[15]=h[0],this.data[14]=h[1],this.data[13]=h[2],this.data[12]=o[0],this.data[11]=o[1],this.data[10]=o[2],this.data[9]=d[0],this.data[8]=d[1],this.data[6]=d[2],this.data[7]=f[0],this.data[4]=f[1],this.data[5]=f[2],this.data[0]=y[0],this.data[1]=y[1],this.data[2]=y[2],this.data[3]=B[0]}setFromBufferData(t,e){this.data=new Uint8Array(t,e,16)}toBase64(t,e){let s="";if(e>0){s+=f[63&t],s=this.toBase64(t>>6,e-6)+s}return s}fromBase64(t,e){let s=0;for(;s<64&&f[s]!=t;)s++;return s<<e}getBytes(t){const e=new ArrayBuffer(8);return new Int32Array(e)[0]=t,new Uint8Array(e)}},t.uuidBufferAsString=({data:t})=>`${t[0]}${t[1]}${t[2]}${t[3]}${t[4]}${t[5]}${t[6]}${t[7]}${t[8]}${t[9]}${t[10]}${t[11]}${t[12]}${t[13]}${t[14]}${t[15]}`}));
//# sourceMappingURL=f1f60d76.mjs.map
