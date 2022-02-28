function nocenter(){throw"Centering and in general applying matrix to geometry is unsupported."}class NexusObject extends THREE.Mesh{constructor(e,t,r,n,o){var i=new THREE.BufferGeometry;i.center=nocenter;var a=new Float32Array(3);if(i.setAttribute("position",new THREE.BufferAttribute(a,3)),super(i,o),null!==onload&&"object"==typeof t)throw"NexusObject constructor has been changed.";var s=n.getContext();o||(this.autoMaterial=!0),this.frustumCulled=!1;var c=this,u=this.geometry.instance=new Nexus.Instance(s);u.open(e),u.onLoad=function(){var e=u.mesh.sphere.center,r=new THREE.Vector3(e[0],e[1],e[2]),n=u.mesh.sphere.radius;if(i.boundingSphere=new THREE.Sphere(r,n),i.boundingBox=c.computeBoundingBox(),c.autoMaterial&&(c.material=new THREE.MeshLambertMaterial({color:16777215})),this.mesh.vertex.normal){var o=new Float32Array(3);i.setAttribute("normal",new THREE.BufferAttribute(o,3))}let a=this.mesh.vertex.normal?THREE.MeshLambertMaterial:THREE.MeshBasicMaterial;if(this.mesh.vertex.color&&this.mesh.vertex.texCoord){var s=new Float32Array(2),h=new Float32Array(4);if(i.setAttribute("uv",new THREE.BufferAttribute(s,2)),i.setAttribute("color",new THREE.BufferAttribute(h,4)),c.autoMaterial)(l=new THREE.DataTexture(new Uint8Array([1,1,1]),1,1,THREE.RGBFormat)).needsUpdate=!0,c.material=new a({vertexColors:THREE.VertexColors,map:l})}else if(this.mesh.vertex.color){h=new Float32Array(4);i.setAttribute("color",new THREE.BufferAttribute(h,4)),c.autoMaterial&&(c.material=new a({vertexColors:THREE.VertexColors}))}else if(this.mesh.vertex.texCoord){var l;s=new Float32Array(2);if(i.setAttribute("uv",new THREE.BufferAttribute(s,2)),c.autoMaterial)(l=new THREE.DataTexture(new Uint8Array([1,1,1]),1,1,THREE.RGBFormat)).needsUpdate=!0,c.material=new a({color:16777215,map:l})}t&&t(c)},u.onUpdate=function(){r(this)},this.onAfterRender=onAfterRender}}function onAfterRender(e,t,r,n,o,i){var a=e.getContext(),s=n.instance;if(!s||!s.isReady)return;var c=new THREE.Vector2;e.getSize(c),s.updateView([0,0,c.width,c.height],r.projectionMatrix.elements,this.modelViewMatrix.elements);var u=a.getParameter(a.CURRENT_PROGRAM),h=s.attributes;h.position=a.getAttribLocation(u,"position"),h.normal=a.getAttribLocation(u,"normal"),h.color=a.getAttribLocation(u,"color"),h.uv=a.getAttribLocation(u,"uv"),h.size=a.getUniformLocation(u,"size"),h.scale=a.getUniformLocation(u,"scale");let l=a.getUniformLocation(u,"map");h.map=l?a.getUniform(u,l):null,s.mesh.face.index&&(s.mode=o.isPointsMaterial?"POINT":"FILL"),-1!=h.size&&(s.pointsize=o.size),-1!=h.scale&&(s.pointscale=2),s.render(),Nexus.updateCache(a)}NexusObject.prototype=Object.create(THREE.Mesh.prototype),NexusObject.prototype.dispose=function(){var e=this.geometry.instance,t=e.context,r=e.mesh;Nexus.flush(t,r);for(var n=0;n<t.meshes.length;n++)if(t.meshes[n]===r){t.meshes.splice(n,1);break}this.geometry.instance=null,this.geometry.dispose()},NexusObject.prototype.flush=function(){var e=this.geometry.instance,t=e.context,r=e.mesh;Nexus.flush(t,r)},NexusObject.prototype.georef=function(e){var t=this,r=new XMLHttpRequest;r.overrideMimeType("application/json"),r.open("GET",e,!0),r.onreadystatechange=function(){if(4==r.readyState&&"200"==r.status){this.georef=JSON.parse(r.responseText);var e=this.georef.origin;t.position.set(e[0],e[1],e[2])}},r.send(null)},NexusObject.prototype.computeBoundingBox=function(){var e=this.geometry.instance.mesh;if(e.sphere){for(var t=new THREE.Vector3(1/0,1/0,1/0),r=new THREE.Vector3(-1/0,-1/0,-1/0),n=(new Float32Array(e.sink-1),0);n<e.sink;n++){var o=e.nfirstpatch[n];if(e.patches[3*o]==e.sink){var i=e.nspheres[5*n],a=e.nspheres[5*n+1],s=e.nspheres[5*n+2],c=e.nspheres[5*n+4];i-c<t.x&&(t.x=i-c),a-c<t.y&&(t.y=a-c),s-c<t.z&&(t.z=s-c),i-c>r.x&&(r.x=i+c),a-c>r.y&&(r.y=a+c),s-c>r.z&&(r.z=s+c)}}return new THREE.Box3(t,r)}},NexusObject.prototype.raycast=function(e,t){if(this.geometry.instance){var r=this.geometry.instance.mesh;if(r.sphere){var n=r.sphere.center,o=r.sphere.radius,i=new THREE.Vector3(n[0],n[1],n[2]),a=new THREE.Sphere(i,o);a.applyMatrix4(this.matrixWorld);var s=(new THREE.Matrix4).copy(this.matrixWorld).invert(),c=new THREE.Ray;c.copy(e.ray).applyMatrix4(s);var u=new THREE.Vector3(0,0,0),h=-1,l=e.ray.intersectSphere(a,u);if(l)if(r.sink&&r.basei){{var p=r.basev,E=r.basei;let t=new THREE.Vector3(0,0,0),o=new THREE.Vector3(0,0,0),i=new THREE.Vector3(0,0,0);for(var f=0;f<r.basei.length;f+=3){var m=E[f],x=E[f+1];n=E[f+2];t.set(p[3*m],p[3*m+1],p[3*m+2]),o.set(p[3*x],p[3*x+1],p[3*x+2]),i.set(p[3*n],p[3*n+1],p[3*n+2]);var y,R=c.intersectTriangle(i,o,t,!1,u);if(R)R.applyMatrix4(this.matrixWorld),(y=R.distanceTo(e.ray.origin))<e.near||y>e.far||(-1==h||y<h)&&(h=y,l=R.clone())}}-1!=h&&t.push({distance:h,point:l,object:this})}}}};