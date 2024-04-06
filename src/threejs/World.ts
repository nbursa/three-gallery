import * as THREE from "three";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";
import { ThreejsElement } from "./components/ThreejsElement";

export class World extends ThreejsElement {
  private controls: PointerLockControls;
  private objects: THREE.Mesh[] = [];
  private raycaster: THREE.Raycaster;
  private moveForward = false;
  private moveBackward = false;
  private moveLeft = false;
  private moveRight = false;
  private canJump = false;
  private velocity = new THREE.Vector3();
  private direction = new THREE.Vector3();
  private prevTime = performance.now();

  constructor(containerId: string) {
    super(containerId);

    const groundGeometry = new THREE.PlaneGeometry(2000, 2000);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    this.scene.add(ground);

    this.createBuildings();

    const light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
    light.position.set(0.5, 1, 0.75);
    this.scene.add(light);

    this.controls = new PointerLockControls(
      this.camera,
      this.renderer.domElement
    );
    document.addEventListener("click", () => this.controls.lock(), false);

    this.raycaster = new THREE.Raycaster(
      new THREE.Vector3(),
      new THREE.Vector3(0, -1, 0),
      0,
      10
    );

    document.addEventListener("keydown", this.onKeyDown, false);
    document.addEventListener("keyup", this.onKeyUp, false);
  }

  onKeyDown = (event: KeyboardEvent) => {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        this.moveForward = true;
        break;
      case "ArrowLeft":
      case "KeyA":
        this.moveLeft = true;
        break;
      case "ArrowDown":
      case "KeyS":
        this.moveBackward = true;
        break;
      case "ArrowRight":
      case "KeyD":
        this.moveRight = true;
        break;
      case "Space":
        if (this.canJump === true) this.velocity.y += 350;
        this.canJump = false;
        break;
    }
  };

  onKeyUp = (event: KeyboardEvent) => {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        this.moveForward = false;
        break;
      case "ArrowLeft":
      case "KeyA":
        this.moveLeft = false;
        break;
      case "ArrowDown":
      case "KeyS":
        this.moveBackward = false;
        break;
      case "ArrowRight":
      case "KeyD":
        this.moveRight = false;
        break;
    }
  };

  createBuildings() {
    for (let i = 0; i < 10; i++) {
      const width = Math.random() * 10 + 5;
      const height = Math.random() * 40 + 10;
      const depth = Math.random() * 10 + 5;

      const boxGeometry = new THREE.BoxGeometry(width, height, depth);
      const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

      const cube = new THREE.Mesh(boxGeometry, boxMaterial);
      cube.position.x = Math.random() * 100 - 50;
      cube.position.y = height / 2;
      cube.position.z = Math.random() * 100 - 50;

      cube.userData.boundingBox = new THREE.Box3().setFromObject(cube);

      this.scene.add(cube);
      this.objects.push(cube);
    }
  }

  updatePlayerPosition(delta: number) {
    const moveX =
      (Number(this.moveRight) - Number(this.moveLeft)) *
      this.velocity.x *
      delta;
    const moveZ =
      (Number(this.moveBackward) - Number(this.moveForward)) *
      this.velocity.z *
      delta;

    let proposedPosition = this.controls
      .getObject()
      .position.clone()
      .add(new THREE.Vector3(moveX, 0, moveZ));

    let proposedPlayerBox = new THREE.Box3().setFromCenterAndSize(
      proposedPosition,
      new THREE.Vector3(1, 2, 1)
    );

    if (!this.checkCollision(proposedPlayerBox)) {
      this.controls
        .getObject()
        .position.add(new THREE.Vector3(moveX, 0, moveZ));
    }
  }

  checkCollision(playerBox: THREE.Box3): boolean {
    for (const object of this.objects) {
      const inflatedBox = object.userData.boundingBox.clone();
      inflatedBox.expandByScalar(10);

      if (playerBox.intersectsBox(inflatedBox)) {
        return true;
      }
    }
    return false;
  }

  protected render() {
    const time = performance.now();
    if (this.controls && this.controls.isLocked === true) {
      this.raycaster.ray.origin.copy(this.controls.getObject().position);
      this.raycaster.ray.origin.y -= 10;

      const delta = (time - this.prevTime) / 1000;

      this.velocity.x -= this.velocity.x * 10.0 * delta;
      this.velocity.z -= this.velocity.z * 10.0 * delta;
      this.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

      this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
      this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
      this.direction.normalize();

      this.updatePlayerPosition(delta);

      if (this.moveForward || this.moveBackward)
        this.velocity.z -= this.direction.z * 400.0 * delta;
      if (this.moveLeft || this.moveRight)
        this.velocity.x -= this.direction.x * 400.0 * delta;

      this.controls.moveRight(-this.velocity.x * delta);
      this.controls.moveForward(-this.velocity.z * delta);

      this.controls.getObject().position.y += this.velocity.y * delta;

      if (this.controls.getObject().position.y < 10) {
        this.velocity.y = 0;
        this.controls.getObject().position.y = 10;
        this.canJump = true;
      }
    }
    this.prevTime = time;

    super.render();
  }
}
