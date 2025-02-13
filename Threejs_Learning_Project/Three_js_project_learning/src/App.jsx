import "./App.css";
import * as THREE from "three";
import { useEffect } from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import gsap from "gsap";

function App() {
  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 30);
    const canvas = document.getElementById("draw");

    // Add mouse move event listener to track coordinates
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Initial pointer-events set to none
    canvas.style.pointerEvents = "none";

    // Add mouse move event listener
    window.addEventListener("mousemove", (event) => {
      // Calculate normalized device coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Update the raycaster
      raycaster.setFromCamera(mouse, camera);

      // Get the point where ray intersects with z=0 plane
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const intersectPoint = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, intersectPoint);

      // Adjust plane or object detection as needed
      const intersects = raycaster.intersectObjects(scene.children, true);

      // If the model is hovered, enable pointer events; else, disable it
      canvas.style.pointerEvents = intersects.length > 0 ? "auto" : "none";

      // Log the coordinates
      console.log("Mouse position in 3D space:", {
        x: intersectPoint.x.toFixed(2),
        y: intersectPoint.y.toFixed(2),
        z: intersectPoint.z.toFixed(2),
      });
    });

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Lighting setup
    const lights = [
      new THREE.DirectionalLight(0xffffff, 2.5),
      new THREE.AmbientLight(0xffffff, 1),
      new THREE.PointLight(0xffffff, 1, 10, 2),
      new THREE.DirectionalLight(0xffffff, 1),
    ];
    lights[0].position.set(10, 15, 10);
    lights[2].position.set(-5, 3, 0);
    lights[3].position.set(5, 5, 5);
    lights.forEach((light) => scene.add(light));

    //---------------------------resuable cordinates start--------------------------------

    // function getPosition(scrollPercent) {
    //   return {
    //     x:
    //       scrollPercent < 20
    //         ? 30
    //         : scrollPercent < 40
    //         ? -6
    //         : scrollPercent < 60
    //         ? -1
    //         : scrollPercent < 80
    //         ? 40
    //         : -30,
    //     y:
    //       scrollPercent < 20
    //         ? 0
    //         : scrollPercent < 40
    //         ? -20
    //         : scrollPercent < 60
    //         ? -1
    //         : scrollPercent < 80
    //         ? -14
    //         : -15,
    //     z:
    //       scrollPercent < 20
    //         ? -5
    //         : scrollPercent < 40
    //         ? -15
    //         : scrollPercent < 60
    //         ? -10
    //         : scrollPercent < 80
    //         ? 0
    //         : 0,
    //   };
    // }
let positiveFinomina=0;
    // // Function to calculate rotation based on scroll percent
    function getRotation(scrollPercent) {
      if(scrollPercent>=positiveFinomina){
        positiveFinomina=scrollPercent;
      return {
        x:
          scrollPercent < 0
            ? THREE.MathUtils.degToRad(0)
            : scrollPercent < 20
            ? THREE.MathUtils.degToRad(0)
            : scrollPercent < 40
            ? THREE.MathUtils.degToRad(0)
            : scrollPercent < 60
            ? THREE.MathUtils.degToRad(0)
            : scrollPercent < 80
            ? THREE.MathUtils.degToRad(0)
            : THREE.MathUtils.degToRad(0),
        y:
          scrollPercent <= 0
            ? THREE.MathUtils.degToRad(50)
            : scrollPercent < 20
            ? THREE.MathUtils.degToRad(-100)
            : scrollPercent < 40
            ? THREE.MathUtils.degToRad(-10)
            : scrollPercent < 60
            ? THREE.MathUtils.degToRad(80)
            : scrollPercent < 80
            ? THREE.MathUtils.degToRad(220)
            : THREE.MathUtils.degToRad(380),
        z:
          scrollPercent < 0
            ? THREE.MathUtils.degToRad(0)
            : scrollPercent < 20
            ? THREE.MathUtils.degToRad(0)
            : scrollPercent < 40
            ? THREE.MathUtils.degToRad(0)
            : scrollPercent < 60
            ? THREE.MathUtils.degToRad(0)
            : scrollPercent < 80
            ? THREE.MathUtils.degToRad(0)
            : THREE.MathUtils.degToRad(0),
      };
    }
      if(scrollPercent<positiveFinomina){
        positiveFinomina=scrollPercent;
      return {
        x:
          scrollPercent < 0
            ? THREE.MathUtils.degToRad(0)
            : scrollPercent < 20
            ? THREE.MathUtils.degToRad(0)
            : scrollPercent < 40
            ? THREE.MathUtils.degToRad(0)
            : scrollPercent < 60
            ? THREE.MathUtils.degToRad(0)
            : scrollPercent < 80
            ? THREE.MathUtils.degToRad(0)
            : THREE.MathUtils.degToRad(0),
        y:
          scrollPercent <= 0
            ? THREE.MathUtils.degToRad(-380)
            : scrollPercent < 20
            ? THREE.MathUtils.degToRad(-320)
            : scrollPercent < 40
            ? THREE.MathUtils.degToRad(-170)
            : scrollPercent < 60
            ? THREE.MathUtils.degToRad(-70)
            : scrollPercent < 80
            ? THREE.MathUtils.degToRad(70)
            : THREE.MathUtils.degToRad(200),
        z:
          scrollPercent < 0
            ? THREE.MathUtils.degToRad(0)
            : scrollPercent < 20
            ? THREE.MathUtils.degToRad(0)
            : scrollPercent < 40
            ? THREE.MathUtils.degToRad(0)
            : scrollPercent < 60
            ? THREE.MathUtils.degToRad(0)
            : scrollPercent < 80
            ? THREE.MathUtils.degToRad(0)
            : THREE.MathUtils.degToRad(0),
      };
    }
    }

    // // Function to calculate scale based on scroll percent
    // function getScale(scrollPercent) {
    //   return {
    //     x:
    //       scrollPercent < 20
    //         ? 10
    //         : scrollPercent < 40
    //         ? 20
    //         : scrollPercent < 60
    //         ? 10
    //         : scrollPercent < 80
    //         ? 5
    //         : 10,
    //     y:
    //       scrollPercent < 20
    //         ? 10
    //         : scrollPercent < 40
    //         ? 20
    //         : scrollPercent < 60
    //         ? 10
    //         : scrollPercent < 80
    //         ? 5
    //         : 10,
    //     z:
    //       scrollPercent < 20
    //         ? 10
    //         : scrollPercent < 40
    //         ? 20
    //         : scrollPercent < 60
    //         ? 10
    //         : scrollPercent < 80
    //         ? 5
    //         : 10,
    //   };
    // }

     function lerp(start, end, t) {
      return start + (end - start) * t;
    }
    
    function getPosition(scrollPercent) {
      const positions = {
        x: [
          { threshold: 0, value: 30 },  
          { threshold: 20, value: -6 },
          { threshold: 40, value: -1 },
          { threshold: 60, value: 40 },
          { threshold: 80, value: -30 },
          { threshold: 100, value: -30 },
        ],
        y: [
          { threshold: 0, value: 0 }, 
          { threshold: 20, value: -20 },
          { threshold: 40, value: -1 },
          { threshold: 60, value: -14 },
          { threshold: 80, value: -15 },
          { threshold: 100, value: -15 },
        ],
        z: [
          { threshold: 0, value: -5 }, 
          { threshold: 20, value: -15 },
          { threshold: 40, value: -10 },
          { threshold: 60, value: 0 },
          { threshold: 80, value: 0 },
          { threshold: 100, value: 0 },
        ]
      };

     const getValueForAxis = (axis, scrollPercent) => {
    // Ensure that the first threshold is included (scrollPercent = 0)
    for (let i = 0; i < positions[axis].length; i++) {
      const current = positions[axis][i];
      const next = positions[axis][i + 1];

      // If scrollPercent is within the current threshold, return the current value
      if (scrollPercent <= current.threshold) {
        return current.value;
      }

      // Otherwise interpolate between the current and next value
      if (scrollPercent <= next.threshold) {
        const t = (scrollPercent - current.threshold) / (next.threshold - current.threshold);
        return lerp(current.value, next.value, t);
      }
    }

    // If no thresholds match, return the last value
    return positions[axis][positions[axis].length - 1].value;
  };

  return {
    x: getValueForAxis('x', scrollPercent),
    y: getValueForAxis('y', scrollPercent),
    z: getValueForAxis('z', scrollPercent)
  };
    }

    // function getRotation(scrollPercent) {
    //   // return {
    //   //   x:
    //   //     scrollPercent < 20
    //   //       ? THREE.MathUtils.degToRad(0)
    //   //       : scrollPercent < 40
    //   //       ? THREE.MathUtils.degToRad(0)
    //   //       : scrollPercent < 60
    //   //       ? THREE.MathUtils.degToRad(0)
    //   //       : scrollPercent < 80
    //   //       ? THREE.MathUtils.degToRad(0)
    //   //       : THREE.MathUtils.degToRad(0),
    //   //   y:
    //   //     scrollPercent < 20
    //   //       ? THREE.MathUtils.degToRad(-30)
    //   //       : scrollPercent < 40
    //   //       ? THREE.MathUtils.degToRad(-50)
    //   //       : scrollPercent < 60
    //   //       ? THREE.MathUtils.degToRad(80)
    //   //       : scrollPercent < 80
    //   //       ? THREE.MathUtils.degToRad(0)
    //   //       : THREE.MathUtils.degToRad(0),
    //   //   z:
    //   //     scrollPercent < 20
    //   //       ? THREE.MathUtils.degToRad(0)
    //   //       : scrollPercent < 40
    //   //       ? THREE.MathUtils.degToRad(0)
    //   //       : scrollPercent < 60
    //   //       ? THREE.MathUtils.degToRad(0)
    //   //       : scrollPercent < 80
    //   //       ? THREE.MathUtils.degToRad(0)
    //   //       : THREE.MathUtils.degToRad(0),
    //   // };
    //   const positions = {
    //     x: [
    //       { threshold: 0, value: 0 },   
    //       { threshold: 20, value: 0 },
    //       { threshold: 40, value: 0 },
    //       { threshold: 60, value: 0 },
    //       { threshold: 80, value: 0 },
    //       { threshold: 100, value: 0 },
    //     ],
    //     y: [
    //       { threshold: 0, value: -30 },  
    //       { threshold: 20, value: -30 },
    //       { threshold: 40, value: -50 },
    //       { threshold: 60, value: 80 },
    //       { threshold: 80, value: 0 },
    //       { threshold: 100, value: 0 },
    //     ],
    //     z: [
    //       { threshold: 0, value: 0 },   
    //       { threshold: 20, value: 0 },
    //       { threshold: 40, value: 0 },
    //       { threshold: 60, value: 0 },
    //       { threshold: 80, value: 0 },
    //       { threshold: 100, value: 0 },
    //     ]
    //   };

    //   const getValueForAxis = (axis, scrollPercent) => {
    //     for (let i = 0; i < positions[axis].length; i++) {
    //       const current = positions[axis][i];
    //       const next = positions[axis][i + 1];
    
    //       // If scrollPercent is within the current threshold, return the current value
    //       if (scrollPercent <= current.threshold) {
    //         return current.value;
    //       }
    
    //       // Otherwise interpolate between the current and next value
    //       if (scrollPercent <= next.threshold) {
    //         const t = (scrollPercent - current.threshold) / (next.threshold - current.threshold);
    //         return lerp(current.value, next.value, t);
    //       }
    //     }
    
    //     // If no thresholds match, return the last value
    //     return positions[axis][positions[axis].length - 1].value;
    //   };
    
    //   return {
    //     x: THREE.MathUtils.degToRad(getValueForAxis('x', scrollPercent)),
    //     y: THREE.MathUtils.degToRad(getValueForAxis('y', scrollPercent)),
    //     z: THREE.MathUtils.degToRad(getValueForAxis('z', scrollPercent)),
    //   };
    // }

    function getScale(scrollPercent) {
      // return {
      //   x:
      //     scrollPercent < 20
      //       ? 10
      //       : scrollPercent < 40
      //       ? 20
      //       : scrollPercent < 60
      //       ? 10
      //       : scrollPercent < 80
      //       ? 5
      //       : 10,
      //   y:
      //     scrollPercent < 20
      //       ? 10
      //       : scrollPercent < 40
      //       ? 20
      //       : scrollPercent < 60
      //       ? 10
      //       : scrollPercent < 80
      //       ? 5
      //       : 10,
      //   z:
      //     scrollPercent < 20
      //       ? 10
      //       : scrollPercent < 40
      //       ? 20
      //       : scrollPercent < 60
      //       ? 10
      //       : scrollPercent < 80
      //       ? 5
      //       : 10,
      // };
      const positions = {
        x: [
          { threshold: 0, value: 10 },
          { threshold: 20, value: 10 },
          { threshold: 40, value: 20 },
          { threshold: 60, value: 10 },
          { threshold: 80, value: 5 },
          { threshold: 100, value: 10 },
        ],
        y: [
          { threshold: 0, value: 10 },
          { threshold: 20, value: 10 },
          { threshold: 40, value: 20 },
          { threshold: 60, value: 10 },
          { threshold: 80, value: 5 },
          { threshold: 100, value: 10 },
        ],
        z: [
          { threshold: 0, value: 10 },
          { threshold: 20, value: 10 },
          { threshold: 40, value: 20 },
          { threshold: 60, value: 10 },
          { threshold: 80, value: 5 },
          { threshold: 100, value: 10 },
        ]
      };

      const getValueForAxis = (axis, scrollPercent) => {
        for (let i = 0; i < positions[axis].length; i++) {
          const current = positions[axis][i];
          const next = positions[axis][i + 1];
    
          // If scrollPercent is within the current threshold, return the current value
          if (scrollPercent <= current.threshold) {
            return current.value;
          }
    
          // Otherwise interpolate between the current and next value
          if (scrollPercent <= next.threshold) {
            const t = (scrollPercent - current.threshold) / (next.threshold - current.threshold);
            return lerp(current.value, next.value, t);
          }
        }
    
        // If no thresholds match, return the last value
        return positions[axis][positions[axis].length - 1].value;
      };
    
      return {
        x: getValueForAxis('x', scrollPercent),
        y: getValueForAxis('y', scrollPercent),
        z: getValueForAxis('z', scrollPercent)
      };
    }

    //---------------------------resuable cordinates end--------------------------------

    // GLTF Loader
    const loader = new GLTFLoader();
    let model;
    let mixer = null;

    loader.load(
      "/bee.glb",
      function (gltf) {
        model = gltf.scene;
        const scrollPercent =
          (window.scrollY /
            (document.documentElement.scrollHeight - window.innerHeight)) *
          100;
        model.scale.set(
          getScale(scrollPercent).x,
          getScale(scrollPercent).y,
          getScale(scrollPercent).z
        );
        model.position.set(
          getPosition(scrollPercent).x,
          getPosition(scrollPercent).y,
          getPosition(scrollPercent).z
        );
        model.rotation.set(
          getRotation(scrollPercent).x,
          getRotation(scrollPercent).y,
          getRotation(scrollPercent).z
        );

        scene.add(model);

        mixer = new THREE.AnimationMixer(model);
        mixer.clipAction(gltf.animations[0]).play();

        window.addEventListener("scroll", () => {
          const scrollPercent =
            (window.scrollY /
              (document.documentElement.scrollHeight - window.innerHeight)) *
            100;

          gsap.to(model.position, {
            ...getPosition(scrollPercent),
            duration: 2,
            ease: "power2.out",
          });

          // Rotation animations based on scroll percentage
          gsap.to(model.rotation, {
            ...getRotation(scrollPercent),
            duration: 2,
            ease: "power2.out",
          });

          gsap.to(model.scale, {
            ...getScale(scrollPercent),
            duration: 2,
            ease: "power2.out",
          });
        });
      },
      // function (progress) {
      //   console.log(
      //     "Loading progress: ",
      //     (progress.loaded / progress.total) * 100 + "%"
      //   );
      // },
      function (error) {
        console.error("An error occurred loading the model:", error);
      }
    );

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false;

    function animate() {
      window.requestAnimationFrame(animate);
      controls.update();
      if (mixer) {
        // Only update mixer if it exists
        mixer.update(0.03);
      }
      renderer.render(scene, camera);
    }

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      // controls.dispose();
    };
  }, []);

  return (
    <>
      <div className="h-[800px] w-screen bg-black/90">
        <p className="text-red-500 text-2xl font-bold ml-10 pt-10">helo0</p>
      </div>
      <div className="h-[800px] w-screen bg-black/90">
        <p className="text-red-500 text-2xl font-bold ml-10 pt-10">helo1</p>
      </div>
      <div className="h-[800px] w-screen bg-black/90">
        <p className="text-red-500 text-2xl font-bold ml-10 pt-10">helo2</p>
      </div>
      <div className="h-[800px] w-screen bg-black/90">
        <p className="text-red-500 text-2xl font-bold ml-10 pt-10">helo3</p>
      </div>
      <div className="h-[800px] w-screen bg-black/90">
        <p className="text-red-500 text-2xl font-bold ml-10 pt-10">helo4</p>
      </div>
      <canvas id="draw" className="fixed top-0 left-0"></canvas>
    </>
  );
}

export default App;


