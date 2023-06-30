import * as THREE from "three";

const light1 = new THREE.SpotLight(0xffffff, 1);
light1.position.set(-600, 1200, -1200);

const light2 = new THREE.SpotLight(0x02ffff, 1);
light2.position.set(800, -1500, -1100);

const hemiLight = new THREE.HemisphereLight(0x0000ff, 0x00ff00, 0.6);


export function createScene() {
    const scene = new THREE.Scene();
    // this.scene.add(ambientLight);//
    scene.add(light1);
    scene.add(light2);
    scene.add(hemiLight);

    return scene
}