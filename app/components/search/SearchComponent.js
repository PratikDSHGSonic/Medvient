




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

//     // Set initial size based on window width
//     const size = Math.min(window.innerWidth * 0.8, 700); // Cap at 700px
//     renderer.setSize(size, size);
//     renderer.setPixelRatio(window.devicePixelRatio);

//     // Handle resize
//     const handleResize = () => {
//       const newSize = Math.min(window.innerWidth * 0.8, 700);
//       renderer.setSize(newSize, newSize);
//       camera.aspect = 1;
//       camera.updateProjectionMatrix();
//     };

//     window.addEventListener('resize', handleResize);

//     // Create sphere geometry
//     const geometry = new THREE.SphereGeometry(1, 128, 128);

//     const material = new THREE.ShaderMaterial({
//       uniforms: {
//         time: { value: 0 },
//         color1: { value: new THREE.Color('#a4b4db') },  // Adjusted blue
//         color2: { value: new THREE.Color('#c8d4f0') },  // Adjusted light blue
//         color3: { value: new THREE.Color('#f0f4ff') }   // Adjusted white-blue
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
//           baseColor = mix(baseColor, color3, fresnel * 0.5);
          
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
//     const ambientLight = new THREE.AmbientLight(0xa4b4db, 0.5);
//     scene.add(ambientLight);

//     const pointLight1 = new THREE.PointLight(0xc8d4f0, 1.4);
//     pointLight1.position.set(5, 3, 5);
//     scene.add(pointLight1);

//     const pointLight2 = new THREE.PointLight(0xa4b4db, 1.4);
//     pointLight2.position.set(-5, -3, -5);
//     scene.add(pointLight2);

//     const hemiLight = new THREE.HemisphereLight(0xffffff, 0xa4b4db, 0.4);
//     scene.add(hemiLight);

//     camera.position.z = 2.2;

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
//            <div className="absolute top-[5%] md:top-[0%] left-1/2 transform -translate-x-1/2 z-5">
//          <h1 className="text-[#2d3648] text-center px-4">
//            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-2"
//             style={{
//               textShadow: '0 0 40px rgba(255,255,255,0.8)',
//               letterSpacing: '-1px'
//             }}>
//             AI-enabled
//           </span>
//           <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight"
//             style={{
//               textShadow: '0 0 40px rgba(255,255,255,0.8)',
//               letterSpacing: '-1px'
//             }}>
//             precision medicine
//           </span>
//         </h1>
//       </div>
  
//       {/* Orb Container */}
//       <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//         <div className="relative">
//           {/* Orb Canvas */}
//           <canvas
//             ref={canvasRef}
//             className="w-[300px] h-[300px] mx-auto"
//             style={{
//               filter: 'blur(0.5px)',
//             }}
//           />
          
//           {/* Search Bar - Positioned absolutely within the orb container */}
//           <div className="absolute left-1/2 transform -translate-x-1/2" style={{ top: '45%' }}>
//             <div className="bg-white bg-opacity-80 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
//               <div className="flex items-center px-4 h-[44px] w-[280px]">
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

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });

    // Calculate size function
    const calculateSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Calculate base size from width
      let baseSize = width * 0.9;
      
      // Constrain by height if needed
      if (baseSize > height * 0.9) {
        baseSize = height * 0.9;
      }
      
      // Apply size limits based on screen width
      let size;
      if (width < 768) {
        size = Math.min(baseSize, 300); // Mobile
      } else if (width < 1024) {
        size = Math.min(baseSize, 500); // Tablet
      } else {
        size = Math.min(baseSize, 700); // Desktop
      }
      
      return size;
    };

    // Update camera position based on screen size
    const updateCameraPosition = () => {
      const width = window.innerWidth;
      if (width < 768) {
        camera.position.z = 2.8; // Mobile
      } else if (width < 1024) {
        camera.position.z = 2.5; // Tablet
      } else {
        camera.position.z = 2.2; // Desktop
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

    // Create sphere geometry
    const geometry = new THREE.SphereGeometry(1, 128, 128);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color('#a4b4db') },
        color2: { value: new THREE.Color('#c8d4f0') },
        color3: { value: new THREE.Color('#f0f4ff') }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        
        void main() {
          vUv = uv;
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
        
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        
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
          
          float n1 = snoise(vUv * 3.0 + time * 0.1);
          float n2 = snoise(vUv * 6.0 - time * 0.15);
          float n3 = snoise(vUv * 9.0 + time * 0.2);
          
          float finalNoise = (n1 * 0.5 + n2 * 0.3 + n3 * 0.2) * 0.8;
          
          vec3 baseColor = mix(color1, color2, finalNoise);
          baseColor = mix(baseColor, color3, fresnel * 0.5);
          
          float depth = dot(vNormal, vec3(0.0, 0.0, 1.0));
          baseColor = mix(baseColor, color1, (1.0 - depth) * 0.3);
          
          float highlight = pow(fresnel, 3.0) * 0.2;
          baseColor += vec3(highlight);
          
          float opacity = 0.95;
          
          gl_FragColor = vec4(baseColor, opacity);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });

    // Create sphere mesh
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xa4b4db, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xc8d4f0, 1.4);
    pointLight1.position.set(5, 3, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xa4b4db, 1.4);
    pointLight2.position.set(-5, -3, -5);
    scene.add(pointLight2);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xa4b4db, 0.4);
    scene.add(hemiLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      const time = performance.now() * 0.001;
      material.uniforms.time.value = time * 0.3;
      sphere.rotation.y = time * 0.1;
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#f8fafd] to-[#edf2f9] overflow-hidden">
      {/* Title */}
      <div className="absolute top-[5%] md:top-[0%] left-1/2 transform -translate-x-1/2 z-10">
        <h1 className="text-[#2d3648] text-center px-4">
          <span 
            className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-2"
            style={{
              textShadow: '0 0 40px rgba(255,255,255,0.8)',
              letterSpacing: '-1px'
            }}
          >
            AI-enabled
          </span>
          <span 
            className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight"
            style={{
              textShadow: '0 0 40px rgba(255,255,255,0.8)',
              letterSpacing: '-1px'
            }}
          >
            precision medicine
          </span>
        </h1>
      </div>

      {/* Orb Container */}
      <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          {/* Orb Canvas */}
          <canvas
            ref={canvasRef}
            className="mx-auto"
            style={{
              filter: 'blur(0.5px)',
            }}
          />
          
          {/* Search Bar */}
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