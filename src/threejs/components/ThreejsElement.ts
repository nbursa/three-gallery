import * as THREE from "three";

export class ThreejsElement {
  protected _element: HTMLDivElement;
  protected scene: THREE.Scene;
  protected camera: THREE.PerspectiveCamera;
  protected renderer: THREE.WebGLRenderer;
  protected container: HTMLElement | null = null;

  constructor(containerId: string) {
    this._element = document.createElement("div");
    this._element.classList.add("three-element");

    if (containerId) {
      this.container = document.querySelector(containerId);
      if (!this.container) {
        console.warn("Container not found, appending to body");
        document.body.appendChild(this._element);
      } else {
        this.container.appendChild(this._element);
      }
    } else {
      document.body.appendChild(this._element);
    }

    this._element.style.width = "100%";
    this._element.style.height = `${document.body.clientHeight - 45}px`;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      !!this.container
        ? this.container?.clientWidth / this.container?.clientHeight
        : window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(
      this._element.clientWidth,
      this._element.clientHeight
    );
    this._element.appendChild(this.renderer.domElement);

    this.animate();
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.render();
  };

  protected render() {
    this.renderer.render(this.scene, this.camera);
  }

  adjustRendererSize() {
    if (this.container) {
      const width = this.container.clientWidth;
      const height = this.container.clientHeight;
      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    }
  }
}
