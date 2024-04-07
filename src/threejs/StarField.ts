import * as THREE from "three";
import { ThreejsElement } from "./components/ThreejsElement";
import {
  EffectComposer,
  OrbitControls,
  RenderPass,
  UnrealBloomPass,
} from "three/examples/jsm/Addons.js";

export class StarField extends ThreejsElement {
  private starsGeometry: THREE.BufferGeometry = new THREE.BufferGeometry();
  private starsMaterial: THREE.PointsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.5,
  });
  private stars!: THREE.Points;
  private composer!: EffectComposer;
  private bloomPass!: UnrealBloomPass;
  private controls!: OrbitControls;

  constructor(containerId: string) {
    super(containerId);
    this.scene.background = new THREE.Color(0x000000);
    this.initStars();
    this.initGalaxies();
    this.setupPostProcessing();
    this.initControls();
  }

  private initStars() {
    this.starsGeometry = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i < 10000; i++) {
      vertices.push(
        THREE.MathUtils.randFloatSpread(1000), // x
        THREE.MathUtils.randFloatSpread(1000), // y
        THREE.MathUtils.randFloatSpread(1000) // z
      );
    }
    this.starsGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    this.starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
    });
    this.stars = new THREE.Points(this.starsGeometry, this.starsMaterial);
    this.scene.add(this.stars);
  }

  private initGalaxies() {
    for (let i = 0; i < 8; i++) {
      const galaxyGeometry = new THREE.BufferGeometry();
      const vertices = [];
      const center = new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(3000), // Increase spread in the scene
        THREE.MathUtils.randFloatSpread(3000),
        THREE.MathUtils.randFloatSpread(3000)
      );

      const centerColor = new THREE.Color(
        Math.random(),
        Math.random(),
        Math.random()
      );

      for (let j = 0; j < 5000; j++) {
        const distance = Math.random() * 500; // Significantly increase spread
        const angle = Math.random() * Math.PI * 2; // Full circle
        const height = (Math.random() - 0.5) * 100; // Increase z-axis variation for more spread in depth

        const star = new THREE.Vector3();
        star.x = center.x + distance * Math.cos(angle);
        star.y = center.y + distance * Math.sin(angle);
        star.z = center.z + height;
        vertices.push(star.x, star.y, star.z);
      }

      galaxyGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
      );

      // Generating colors
      const colors: number[] = [];
      for (let k = 0; k < vertices.length; k += 3) {
        const ratio = k / vertices.length; // Adjusted for the vertices being in sets of 3 (x, y, z)
        const color = new THREE.Color().lerpColors(
          centerColor,
          new THREE.Color(0xffffff),
          ratio
        );
        colors.push(color.r, color.g, color.b);
      }
      galaxyGeometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(colors, 3)
      );

      const galaxyMaterial = new THREE.PointsMaterial({
        size: Math.random() * 2 + 1, // Increase size for better visibility
        vertexColors: true,
        opacity: 0.6,
        transparent: true,
      });

      const galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial);
      this.scene.add(galaxy);
    }
  }

  private setupPostProcessing() {
    const renderScene = new RenderPass(this.scene, this.camera);

    const bloomStrength = 1.5;
    const bloomRadius = 0;
    const bloomThreshold = 0.6;
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      bloomStrength,
      bloomRadius,
      bloomThreshold
    );

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(renderScene);
    this.composer.addPass(this.bloomPass);
  }

  private initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    this.controls.dampingFactor = 0.05;
    this.controls.screenSpacePanning = false;

    this.controls.minDistance = 100; // You can adjust these values
    this.controls.maxDistance = 5000;

    // Optional: Adjust to limit the angles of orbit (vertical orbit limits here)
    this.controls.maxPolarAngle = Math.PI / 2;
  }

  protected render() {
    this.camera.position.z -= 0.1;
    if (this.camera.position.z < -1000) this.camera.position.z = 1000;
    // super.render();
    if (this.composer) {
      this.composer.render();
    }
    if (this.controls) {
      this.controls.update();
    }
  }
}
