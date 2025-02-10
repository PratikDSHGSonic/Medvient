

// "use client";

// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';

// const SearchComponent = () => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     if (!canvasRef.current) return;

//     // Scene setup
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({
//       canvas: canvasRef.current,
//       alpha: true,
//       antialias: true
//     });

//     // Calculate size function
//     const calculateSize = () => {
//       const width = window.innerWidth;
//       const height = window.innerHeight;

//       // Calculate base size from width
//       let baseSize = width * 0.9;

//       // Constrain by height if needed
//       if (baseSize > height * 0.9) {
//         baseSize = height * 0.9;
//       }

//       // Apply size limits based on screen width
//       let size;
//       if (width < 768) {
//         size = Math.min(baseSize, 1200); // Mobile
//       } else if (width < 1024) {
//         size = Math.min(baseSize, 500); // Tablet
//       } else {
//         size = Math.min(baseSize, 700); // Desktop
//       }

//       return size;
//     };

//     // Update camera position based on screen size
//     const updateCameraPosition = () => {
//       const width = window.innerWidth;
//       if (width < 768) {
//         camera.position.z = 1.7; // Mobile
//       } else if (width < 1024) {
//         camera.position.z = 2.5; // Tablet
//       } else {
//         camera.position.z = 2.2; // Desktop
//       }
//       camera.updateProjectionMatrix();
//     };

//     // Initial setup
//     const size = calculateSize();
//     renderer.setSize(size, size);
//     renderer.setPixelRatio(window.devicePixelRatio);
//     updateCameraPosition();

//     // Handle resize
//     const handleResize = () => {
//       const newSize = calculateSize();
//       renderer.setSize(newSize, newSize);
//       camera.aspect = 1;
//       camera.updateProjectionMatrix();
//       updateCameraPosition();
//     };

//     window.addEventListener('resize', handleResize);

//     // Create sphere geometry
//     const geometry = new THREE.SphereGeometry(1, 128, 128);

//     // const material = new THREE.ShaderMaterial({
//     //   uniforms: {
//     //     time: { value: 0 },
//     //     color1: { value: new THREE.Color('#a4b4db') },
//     //     color2: { value: new THREE.Color('#c8d4f0') },
//     //     color3: { value: new THREE.Color('#f0f4ff') }
//     //   },

//     const material = new THREE.ShaderMaterial({
//       uniforms: {
//         time: { value: 0 },
//         color1: { value: new THREE.Color('#9bb8ff') }, // More vibrant blue
//         color2: { value: new THREE.Color('#d6e2ff') }, // Softer white-blue
//         color3: { value: new THREE.Color('#ffffff') } // Stronger white highlight
//       },

//       vertexShader: `
//         varying vec2 vUv;
//         varying vec3 vNormal;
//         varying vec3 vViewPosition;

//         void main() {
//           vUv = uv;
//           vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
//           vViewPosition = -mvPosition.xyz;
//           vNormal = normalize(normalMatrix * normal);
//           gl_Position = projectionMatrix * mvPosition;
//         }
//       `,
//       fragmentShader: `
//         uniform float time;
//         uniform vec3 color1;
//         uniform vec3 color2;
//         uniform vec3 color3;

//         varying vec2 vUv;
//         varying vec3 vNormal;
//         varying vec3 vViewPosition;

//         vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
//         vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
//         vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

//         float snoise(vec2 v) {
//           const vec4 C = vec4(0.211324865405187,
//                             0.366025403784439,
//                            -0.577350269189626,
//                             0.024390243902439);
//           vec2 i  = floor(v + dot(v, C.yy));
//           vec2 x0 = v -   i + dot(i, C.xx);
//           vec2 i1;
//           i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
//           vec4 x12 = x0.xyxy + C.xxzz;
//           x12.xy -= i1;
//           i = mod289(i);
//           vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
//                 + i.x + vec3(0.0, i1.x, 1.0));
//           vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
//                                 dot(x12.zw,x12.zw)), 0.0);
//           m = m*m;
//           m = m*m;
//           vec3 x = 2.0 * fract(p * C.www) - 1.0;
//           vec3 h = abs(x) - 0.5;
//           vec3 ox = floor(x + 0.5);
//           vec3 a0 = x - ox;
//           m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
//           vec3 g;
//           g.x  = a0.x  * x0.x  + h.x  * x0.y;
//           g.yz = a0.yz * x12.xz + h.yz * x12.yw;
//           return 130.0 * dot(m, g);
//         }

//         void main() {
//           vec3 viewDirection = normalize(vViewPosition);
//           float fresnel = pow(1.0 - dot(vNormal, viewDirection), 2.0);

//           float n1 = snoise(vUv * 3.0 + time * 0.1);
//           float n2 = snoise(vUv * 6.0 - time * 0.15);
//           float n3 = snoise(vUv * 9.0 + time * 0.2);

//           float finalNoise = (n1 * 0.5 + n2 * 0.3 + n3 * 0.2) * 0.8;

//           vec3 baseColor = mix(color1, color2, finalNoise);
//           baseColor = mix(baseColor, color3, fresnel * 0.7);

//           float depth = dot(vNormal, vec3(0.0, 0.0, 1.0));
//           baseColor = mix(baseColor, color1, (1.0 - depth) * 0.3);

//           float highlight = pow(fresnel, 3.0) * 0.2;
//           baseColor += vec3(highlight);

//           float opacity = 0.95;

//           gl_FragColor = vec4(baseColor, opacity);
//         }
//       `,
//       transparent: true,
//       side: THREE.DoubleSide
//     });

//     // Create sphere mesh
//     const sphere = new THREE.Mesh(geometry, material);
//     scene.add(sphere);

//     // Lighting setup
//     // const ambientLight = new THREE.AmbientLight(0xa4b4db, 0.5);
//     // scene.add(ambientLight);

//     // const pointLight1 = new THREE.PointLight(0xc8d4f0, 1.4);
//     // pointLight1.position.set(5, 3, 5);
//     // scene.add(pointLight1);

//     // const pointLight2 = new THREE.PointLight(0xa4b4db, 1.4);
//     // pointLight2.position.set(-5, -3, -5);
//     // scene.add(pointLight2);

//     // const hemiLight = new THREE.HemisphereLight(0xffffff, 0xa4b4db, 0.4);
//     // scene.add(hemiLight);



//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Brighter ambient light
//     scene.add(ambientLight);

//     const pointLight1 = new THREE.PointLight(0xa4c8ff, 1.6);
//     pointLight1.position.set(5, 3, 5);
//     scene.add(pointLight1);

//     const pointLight2 = new THREE.PointLight(0xa4c8ff, 1.6);
//     pointLight2.position.set(-5, -3, -5);
//     scene.add(pointLight2);

//     const hemiLight = new THREE.HemisphereLight(0xffffff, 0xa4c8ff, 0.6);
//     scene.add(hemiLight);


//     // Animation loop
//     const animate = () => {
//       requestAnimationFrame(animate);
//       const time = performance.now() * 0.001;
//       material.uniforms.time.value = time * 0.3;
//       sphere.rotation.y = time * 0.1;
//       renderer.render(scene, camera);
//     };

//     animate();

//     // Cleanup
//     return () => {
//       window.removeEventListener('resize', handleResize);
//       renderer.dispose();
//       geometry.dispose();
//       material.dispose();
//     };
//   }, []);

//   return (
//     <div className="relative min-h-screen w-full bg-gradient-to-b from-[#f8fafd] to-[#edf2f9] overflow-hidden">
//       {/* Title */}
//       <div className="absolute top-[5%] md:top-[0%] left-1/2 transform -translate-x-1/2 z-10">
//         <h1 className="text-[#2d3648] text-center px-4">
//           <span
//             className="block text-5xl sm:text-7xl md:text-6xl lg:text-7xl font-extralight mb-2"
//             style={{
//               textShadow: '0 0 40px rgba(255,255,255,0.8)',
//               letterSpacing: '-1px'
//             }}
//           >
//             AI-enabled
//           </span>
//           <span
//             className="block text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight"
//             style={{
//               textShadow: '0 0 40px rgba(255,255,255,0.8)',
//               letterSpacing: '-1px'
//             }}
//           >
//             precision medicine
//           </span>
//         </h1>
//       </div>

//       {/* Orb Container */}
//       {/* <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
//         <div className="relative">

//           <canvas
//             ref={canvasRef}
//             className="mx-auto"
//             style={{
//               filter: 'blur(0.5px)',
//             }}
//           /> */}
//       <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pt-20 md:pt-0">
//         <div className="relative">
//           {/* Orb Canvas */}
//           <canvas
//             ref={canvasRef}
//             className="mx-auto"
//             style={{
//               filter: 'blur(0.5px)',
//             }}
//           />




//           {/* Search Bar */}
//           <div className="absolute left-1/2 transform -translate-x-1/2" style={{ top: '45%' }}>
//             <div className="bg-white bg-opacity-80 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <div className="flex items-center px-4 h-[44px] w-[280px] sm:w-[320px] md:w-[360px]">
//                 <input
//                   type="text"
//                   placeholder="How can I help you?"
//                   className="w-full bg-transparent outline-none text-[#8397b7] placeholder-[#a2b3d8] text-[15px] font-light"
//                 />
//                 <button className="ml-4 text-[#8397b7]">
//                   <svg
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     className="w-5 h-5"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M14 5l7 7m0 0l-7 7m7-7H3"
//                     />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div >
//     </div >
//   );
// };

// export default SearchComponent;




// "use client";

// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';

// const SearchComponent = () => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     if (!canvasRef.current) return;

//     // [Previous scene setup remains the same]
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({
//       canvas: canvasRef.current,
//       alpha: true,
//       antialias: true
//     });

//     // [Previous size calculation and camera position functions remain the same]
//     const calculateSize = () => {
//       const width = window.innerWidth;
//       const height = window.innerHeight;
//       let baseSize = width * 0.9;
//       if (baseSize > height * 0.9) {
//         baseSize = height * 0.9;
//       }
//       let size;
//       if (width < 768) {
//         size = Math.min(baseSize, 1200);
//       } else if (width < 1024) {
//         size = Math.min(baseSize, 500);
//       } else {
//         size = Math.min(baseSize, 700);
//       }
//       return size;
//     };

//     const updateCameraPosition = () => {
//       const width = window.innerWidth;
//       if (width < 768) {
//         camera.position.z = 1.7;
//       } else if (width < 1024) {
//         camera.position.z = 2.5;
//       } else {
//         camera.position.z = 2.2;
//       }
//       camera.updateProjectionMatrix();
//     };

//     // Initial setup
//     const size = calculateSize();
//     renderer.setSize(size, size);
//     renderer.setPixelRatio(window.devicePixelRatio);
//     updateCameraPosition();

//     // Handle resize
//     const handleResize = () => {
//       const newSize = calculateSize();
//       renderer.setSize(newSize, newSize);
//       camera.aspect = 1;
//       camera.updateProjectionMatrix();
//       updateCameraPosition();
//     };

//     window.addEventListener('resize', handleResize);

//     // Create sphere geometry with more segments for smoother appearance
//     const geometry = new THREE.SphereGeometry(1, 164, 164);
//     const material = new THREE.ShaderMaterial({
//       uniforms: {
//         time: { value: 0 },
//         color1: { value: new THREE.Color('#f2f6ff') },  // Base white-blue
//         color2: { value: new THREE.Color('#e8f0ff') },  // Slightly more blue
//         color3: { value: new THREE.Color('#d3e0ff') },  // Mid blue for layers
//         color4: { value: new THREE.Color('#c5d6ff') }   // Deeper blue for accents
//       },

//       vertexShader: `
//         varying vec2 vUv;
//         varying vec3 vNormal;
//         varying vec3 vViewPosition;
//         varying vec3 vWorldPosition;

//         void main() {
//           vUv = uv;
//           vec4 worldPosition = modelMatrix * vec4(position, 1.0);
//           vWorldPosition = worldPosition.xyz;
//           vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
//           vViewPosition = -mvPosition.xyz;
//           vNormal = normalize(normalMatrix * normal);
//           gl_Position = projectionMatrix * mvPosition;
//         }
//       `,
//       fragmentShader: `
//         uniform float time;
//         uniform vec3 color1;
//         uniform vec3 color2;
//         uniform vec3 color3;
//         uniform vec3 color4;

//         varying vec2 vUv;
//         varying vec3 vNormal;
//         varying vec3 vViewPosition;
//         varying vec3 vWorldPosition;

//         // [Previous noise functions remain the same]
//         vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
//         vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
//         vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

//         float snoise(vec2 v) {
//           const vec4 C = vec4(0.211324865405187,
//                             0.366025403784439,
//                            -0.577350269189626,
//                             0.024390243902439);
//           vec2 i  = floor(v + dot(v, C.yy));
//           vec2 x0 = v -   i + dot(i, C.xx);
//           vec2 i1;
//           i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
//           vec4 x12 = x0.xyxy + C.xxzz;
//           x12.xy -= i1;
//           i = mod289(i);
//           vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
//                 + i.x + vec3(0.0, i1.x, 1.0));
//           vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
//                                 dot(x12.zw,x12.zw)), 0.0);
//           m = m*m;
//           m = m*m;
//           vec3 x = 2.0 * fract(p * C.www) - 1.0;
//           vec3 h = abs(x) - 0.5;
//           vec3 ox = floor(x + 0.5);
//           vec3 a0 = x - ox;
//           m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
//           vec3 g;
//           g.x  = a0.x  * x0.x  + h.x  * x0.y;
//           g.yz = a0.yz * x12.xz + h.yz * x12.yw;
//           return 130.0 * dot(m, g);
//         }

//         void main() {
//           vec3 viewDirection = normalize(vViewPosition);
//           float fresnel = pow(1.0 - dot(vNormal, viewDirection), 2.0);

//           // Create multiple rotating noise layers
//           vec2 rotatedUv1 = vec2(
//             vUv.x * cos(time * 0.1) - vUv.y * sin(time * 0.1),
//             vUv.x * sin(time * 0.1) + vUv.y * cos(time * 0.1)
//           );

//           vec2 rotatedUv2 = vec2(
//             vUv.x * cos(time * -0.15) - vUv.y * sin(time * -0.15),
//             vUv.x * sin(time * -0.15) + vUv.y * cos(time * -0.15)
//           );

//           // Create multiple noise patterns for layering
//           float n1 = snoise(rotatedUv1 * 2.0 + time * 0.03);
//           float n2 = snoise(rotatedUv2 * 3.0 - time * 0.04);
//           float n3 = snoise(rotatedUv1 * 4.0 + time * 0.05);
//           float n4 = snoise(rotatedUv2 * 5.0 - time * 0.06);

//           // Create layer masks
//           float layer1 = smoothstep(0.3, 0.7, n1);
//           float layer2 = smoothstep(0.4, 0.6, n2);
//           float layer3 = smoothstep(0.45, 0.55, n3);
//           float layer4 = smoothstep(0.48, 0.52, n4);

//           // Combine layers with base color
//           vec3 baseColor = color1; // Start with base white-blue

//           // Add subtle variations
//           baseColor = mix(baseColor, color2, layer1 * 0.7);

//           // Add defined blue layers
//           float layerMask = max(layer2 * 0.6, layer3 * 0.4);
//           layerMask = max(layerMask, layer4 * 0.3);
//           baseColor = mix(baseColor, color3, layerMask);

//           // Add deeper blue accents
//           float accentMask = layer3 * layer4 * 0.5;
//           baseColor = mix(baseColor, color4, accentMask);

//           // Add very subtle fresnel without creating a bright border
//           baseColor = mix(baseColor, color2, fresnel * 0.3);

//           // Soften edges
//           float edgeSoftness = 0.2;
//           float edge = 1.0 - smoothstep(1.0 - edgeSoftness, 1.0, length(vNormal.xy));
//           baseColor = mix(baseColor, color1, edge * 0.1);

//           gl_FragColor = vec4(baseColor, 0.99);
//         }
//       `,
//       transparent: true,
//       side: THREE.DoubleSide
//     });

//     // Create sphere mesh




//     const sphere = new THREE.Mesh(geometry, material);
//     scene.add(sphere);

//     // Update lighting for layered effect
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
//     scene.add(ambientLight);

//     const pointLight1 = new THREE.PointLight(0xffffff, 0.7);
//     pointLight1.position.set(5, 3, 5);
//     scene.add(pointLight1);

//     const pointLight2 = new THREE.PointLight(0xf2f6ff, 0.7);
//     pointLight2.position.set(-5, -3, -5);
//     scene.add(pointLight2);

//     const hemiLight = new THREE.HemisphereLight(0xffffff, 0xf2f6ff, 0.3);
//     scene.add(hemiLight);

//     // Slower, smoother animation
//     const animate = () => {
//       requestAnimationFrame(animate);
//       const time = performance.now() * 0.001;
//       material.uniforms.time.value = time * 0.12;
//       sphere.rotation.y = -time * 0.05;
//       renderer.render(scene, camera);
//     };





//     animate();

//     // Cleanup
//     return () => {
//       window.removeEventListener('resize', handleResize);
//       renderer.dispose();
//       geometry.dispose();
//       material.dispose();
//     };
//   }, []);

//   // [Rest of the component JSX remains the same]
//   return (
//     <div className="relative min-h-screen w-full bg-gradient-to-b from-[#f8fafd] to-[#edf2f9] overflow-hidden">
//       <div className="absolute top-[5%] md:top-[0%] left-1/2 transform -translate-x-1/2 z-10">
//         <h1 className="text-[#2d3648] text-center px-4">
//           <span
//             className="block text-5xl sm:text-7xl md:text-6xl lg:text-7xl font-extralight mb-2"
//             style={{
//               textShadow: '0 0 40px rgba(255,255,255,0.8)',
//               letterSpacing: '-1px'
//             }}
//           >
//             AI-enabled
//           </span>
//           <span
//             className="block text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight"
//             style={{
//               textShadow: '0 0 40px rgba(255,255,255,0.8)',
//               letterSpacing: '-1px'
//             }}
//           >
//             precision medicine
//           </span>
//         </h1>
//       </div>

//       <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pt-20 md:pt-0">
//         <div className="relative">
//           <canvas
//             ref={canvasRef}
//             className="mx-auto"
//             style={{
//               filter: 'blur(0.5px)',
//             }}
//           />

//           <div className="absolute left-1/2 transform -translate-x-1/2" style={{ top: '45%' }}>
//             <div className="bg-white bg-opacity-80 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <div className="flex items-center px-4 h-[44px] w-[280px] sm:w-[320px] md:w-[360px]">
//                 <input
//                   type="text"
//                   placeholder="How can I help you?"
//                   className="w-full bg-transparent outline-none text-[#8397b7] placeholder-[#a2b3d8] text-[15px] font-light"
//                 />
//                 <button className="ml-4 text-[#8397b7]">
//                   <svg
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     className="w-5 h-5"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M14 5l7 7m0 0l-7 7m7-7H3"
//                     />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchComponent;





"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SearchComponent = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // [Previous scene setup remains the same until material definition]
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });

    // [Previous size calculation and camera position functions remain the same]
    const calculateSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      let baseSize = width * 0.9;
      if (baseSize > height * 0.9) {
        baseSize = height * 0.9;
      }
      let size;
      if (width < 768) {
        size = Math.min(baseSize, 1200);
      } else if (width < 1024) {
        size = Math.min(baseSize, 500);
      } else {
        size = Math.min(baseSize, 700);
      }
      return size;
    };

    const updateCameraPosition = () => {
      const width = window.innerWidth;
      if (width < 768) {
        camera.position.z = 1.7;
      } else if (width < 1024) {
        camera.position.z = 2;
      } else {
        camera.position.z = 2.2;
      }
      camera.updateProjectionMatrix();
    };

    // Initial setup
    const size = calculateSize();
    renderer.setSize(size, size);
    renderer.setPixelRatio(window.devicePixelRatio);
    updateCameraPosition();

    // Handle resize
    const handleResize = () => {
      const newSize = calculateSize();
      renderer.setSize(newSize, newSize);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
      updateCameraPosition();
    };

    window.addEventListener('resize', handleResize);

    const geometry = new THREE.SphereGeometry(1, 164, 164);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color('#f2f6ff') },
        color2: { value: new THREE.Color('#e8f0ff') },
        color3: { value: new THREE.Color('#d3e0ff') },
        color4: { value: new THREE.Color('#c5d6ff') }
      },

      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec3 vWorldPosition;

        void main() {
          vUv = uv;
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        uniform vec3 color4;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec3 vWorldPosition;

        // [Previous noise functions]
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187,
                            0.366025403784439,
                           -0.577350269189626,
                            0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy));
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod289(i);
          vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                + i.x + vec3(0.0, i1.x, 1.0));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                                dot(x12.zw,x12.zw)), 0.0);
          m = m*m;
          m = m*m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
          vec3 viewDirection = normalize(vViewPosition);
          float fresnel = pow(1.0 - dot(vNormal, viewDirection), 2.0);

          // Slower rotation for UV coordinates
          vec2 rotatedUv1 = vec2(
            vUv.x * cos(time * 0.05) - vUv.y * sin(time * 0.05),
            vUv.x * sin(time * 0.05) + vUv.y * cos(time * 0.05)
          );

          vec2 rotatedUv2 = vec2(
            vUv.x * cos(time * -0.07) - vUv.y * sin(time * -0.07),
            vUv.x * sin(time * -0.07) + vUv.y * cos(time * -0.07)
          );

          // Increase scale of noise patterns for more blurred effect
          float n1 = snoise(rotatedUv1 * 1.5 + time * 0.02);
          float n2 = snoise(rotatedUv2 * 2.0 - time * 0.02);
          float n3 = snoise(rotatedUv1 * 2.5 + time * 0.03);
          float n4 = snoise(rotatedUv2 * 3.0 - time * 0.03);

          // Soften the layer transitions
          float layer1 = smoothstep(0.2, 0.8, n1);
          float layer2 = smoothstep(0.3, 0.7, n2);
          float layer3 = smoothstep(0.35, 0.65, n3);
          float layer4 = smoothstep(0.4, 0.6, n4);

          // Blend colors more smoothly
          vec3 baseColor = color1;
          baseColor = mix(baseColor, color2, layer1 * 0.8);
          
          // Create a more unified, blurred appearance
          float layerMask = (layer2 * 0.5 + layer3 * 0.3 + layer4 * 0.2) / 1.0;
          baseColor = mix(baseColor, color3, layerMask * 0.7);
          
          // Softer accent application
          float accentMask = (layer3 + layer4) * 0.3;
          baseColor = mix(baseColor, color4, accentMask);

          // Enhanced edge softness
          float edgeSoftness = 0.3;
          float edge = 1.0 - smoothstep(1.0 - edgeSoftness, 1.0, length(vNormal.xy));
          baseColor = mix(baseColor, color1, edge * 0.2);

          // Add subtle radial blur effect
          float radialGradient = 1.0 - length(vUv - 0.5) * 2.0;
          baseColor = mix(baseColor, color2, radialGradient * 0.1);

          gl_FragColor = vec4(baseColor, 0.99);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 0.7);
    pointLight1.position.set(5, 3, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xf2f6ff, 0.7);
    pointLight2.position.set(-5, -3, -5);
    scene.add(pointLight2);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xf2f6ff, 0.3);
    scene.add(hemiLight);

    // Slower rotation animation
    const animate = () => {
      requestAnimationFrame(animate);
      const time = performance.now() * 0.001;
      material.uniforms.time.value = time * 0.16; // Reduced from 0.12 to 0.08 for slower rotation
      sphere.rotation.y = -time * 0.13; // Reduced from 0.05 to 0.03 for slower rotation
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  // [Rest of the component JSX remains the same]
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#f8fafd] to-[#edf2f9] overflow-hidden">
      <div className="absolute top-[5%] md:top-[0%] left-1/2 transform -translate-x-1/2 z-10">
        <h1 className="text-[#2d3648] text-center px-4">
          <span
            className="block text-5xl sm:text-7xl md:text-6xl lg:text-7xl font-extralight mb-2"
            style={{
              textShadow: '0 0 40px rgba(255,255,255,0.8)',
              letterSpacing: '-1px'
            }}
          >
            AI-enabled
          </span>
          <span
            className="block text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight"
            style={{
              textShadow: '0 0 40px rgba(255,255,255,0.8)',
              letterSpacing: '-1px'
            }}
          >
            precision medicine
          </span>
        </h1>
      </div>

      <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pt-20 md:pt-0">
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="mx-auto"
            style={{
              filter: 'blur(0.5px)',
            }}
          />

          <div className="absolute left-1/2 transform -translate-x-1/2" style={{ top: '45%' }}>
            <div className="bg-white bg-opacity-80 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center px-4 h-[44px] w-[280px] sm:w-[320px] md:w-[360px]">
                <input
                  type="text"
                  placeholder="How can I help you?"
                  className="w-full bg-transparent outline-none text-[#8397b7] placeholder-[#a2b3d8] text-[15px] font-light"
                />
                <button className="ml-4 text-[#8397b7]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;