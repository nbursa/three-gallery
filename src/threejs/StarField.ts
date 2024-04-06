import * as THREE from "three";
import { ThreejsElement } from "./components/ThreejsElement";

export class StarField extends ThreejsElement {
  private starsGeometry: THREE.BufferGeometry = new THREE.BufferGeometry();
  private starsMaterial: THREE.PointsMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.5,
  });
  private stars!: THREE.Points;

  constructor(containerId: string) {
    super(containerId);
    this.initStars();
  }

  private initStars() {
    this.starsGeometry = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i < 10000; i++) {
      vertices.push(
        THREE.MathUtils.randFloatSpread(2000), // x
        THREE.MathUtils.randFloatSpread(2000), // y
        THREE.MathUtils.randFloatSpread(2000) // z
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

  protected render() {
    this.camera.position.z -= 0.1;
    if (this.camera.position.z < -1000) this.camera.position.z = 1000;
    super.render();
  }
}
