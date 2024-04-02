import * as THREE from "three";
import { ThreejsElement } from "./components/ThreejsElement";

export class SpinningBox extends ThreejsElement {
  private cube: THREE.Mesh;

  constructor(containerId: string) {
    super(containerId);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("/images/steam.webp");

    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0,
      metalness: 0,
    });

    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 0, 15);
    this.scene.add(pointLight);

    this.animate();

    window.addEventListener("resize", this.onWindowResize, false);
  }

  onWindowResize = () => {
    if (this.container) {
      this.camera.aspect =
        this.container.clientWidth / this.container.clientHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(
        this.container.clientWidth,
        this.container.clientHeight
      );
    }
  };

  onContainerReady() {
    this.adjustRendererSize();
    this.animate();
  }

  protected render() {
    if (this.cube) {
      this.cube.rotation.x += 0.001;
      this.cube.rotation.y += 0.001;

      super.render();
    }
  }
}
