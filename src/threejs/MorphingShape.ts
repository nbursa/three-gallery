import * as THREE from "three";
import { ThreejsElement } from "./components/ThreejsElement";

export class MorphingShape extends ThreejsElement {
  private shape: THREE.Mesh;

  constructor(containerId: string) {
    super(containerId);

    // Base geometry
    // const geometry = new THREE.BoxGeometry(2, 2, 2);

    // const sphere = new THREE.SphereGeometry(2, 32, 32);
    // const cylinder = new THREE.CylinderGeometry(1, 1, 4, 32);

    // geometry.morphAttributes.position = [
    //   sphere.attributes.position,
    //   cylinder.attributes.position,
    // ];

    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
    const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 4, 32);

    // Clone the position attribute of your target geometries
    const spherePositions = sphereGeometry.attributes.position.clone();
    const cylinderPositions = cylinderGeometry.attributes.position.clone();

    // Add these as morph attributes to your main geometry
    geometry.morphAttributes.position = [spherePositions, cylinderPositions];

    const material = new THREE.MeshStandardMaterial({
      color: 0x00ff00,
    });

    this.shape = new THREE.Mesh(geometry, material);
    this.scene.add(this.shape);

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
    if (this.shape?.morphTargetInfluences) {
      this.shape.morphTargetInfluences[0] =
        Math.sin(this.shape.rotation.y) * 0.5 + 0.5;
      this.shape.morphTargetInfluences[1] =
        Math.cos(this.shape.rotation.y) * 0.5 + 0.5;
      this.shape.rotation.y += 0.01;
    }

    super.render();
  }
}
