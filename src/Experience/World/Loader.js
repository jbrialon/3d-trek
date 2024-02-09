import * as THREE from "three";
import { gsap } from "gsap";
import Experience from "../Experience";

import vertexShader from "../../shaders/loader/vertex.glsl";
import fragmentShader from "../../shaders/loader/fragment.glsl";

export default class Loader {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.time = this.experience.time;
    this.debug = this.experience.debug;
    this.manager = this.experience.manager;

    // Options
    this.options = {
      uColor: "#b9a998",
    };

    // Setup
    this.setGeometry();
    this.setMaterial();
    this.setMesh();
    this.initEvents();

    // Debug
    this.setDebug();
  }

  initEvents() {
    this.manager.on("loader-hide", this.hideLoader.bind(this));
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(2, 2, 1, 1);
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uAlpha: {
          value: 1,
        },
        uCircleRadius: {
          value: 0,
        },
        uScreenRatio: {
          value: this.sizes.width / this.sizes.height,
        },
        uColor: { value: new THREE.Color(this.options.uColor) },

        uTime: { value: 0 },
        uCirclePos: {
          value: new THREE.Vector2(0.804, 0.765),
        },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  hideLoader() {
    gsap.to(this.material.uniforms.uCircleRadius, {
      delay: 1.5,
      value: 12,
      duration: 1.5,
      ease: "power4.inOut",
      onStart: () => {
        this.manager.trigger("ui-title-hide");
      },
      onComplete: () => {
        this.manager.trigger("ui-chapter-show");
        if (!this.debug.active) {
          this.destroy();
        }
      },
    });
  }

  revealTutorial() {
    this.hasLoader = true;

    gsap.to(this.material.uniforms.uCircleRadius, {
      value: 0.23,
      duration: 1.5,
      ease: "power4.inOut",
      onComplete: () => {
        this.manager.trigger("loaded");
        this.manager.trigger("ui-title-show");
        if (!this.debug.active) {
          // this.destroy();
        }
      },
    });
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Loader");
      this.debugFolder
        .add(
          {
            button: () => {
              gsap.to(this.material.uniforms.uCircleRadius, {
                value: 14.5,
                duration: 1.5,
                ease: "power4.inOut",
              });
            },
          },
          "button"
        )
        .name("show Loader");
      this.debugFolder
        .add(
          {
            button: () => {
              this.hideLoader();
            },
          },
          "button"
        )
        .name("hide Loader");
      this.debugFolder
        .add(this.material.uniforms.uAlpha, "value")
        .min(0)
        .max(1)
        .step(0.001)
        .name("opacity");
      this.debugFolder
        .add(this.material.uniforms.uCircleRadius, "value")
        .min(0)
        .max(20)
        .step(0.001)
        .name("circle radius");
      this.debugFolder
        .add(this.material.uniforms.uCirclePos.value, "x")
        .min(-1)
        .max(1)
        .step(0.001)
        .name("pos x");
      this.debugFolder
        .add(this.material.uniforms.uCirclePos.value, "y")
        .min(-1)
        .max(1)
        .step(0.001)
        .name("pos y");
    }
  }

  update() {
    this.material.uniforms.uTime.value = this.time.elapsedTime * 0.5;
  }

  destroy() {
    this.geometry.dispose();
    this.material.dispose();
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
    this.scene.remove(this.mesh);
  }
}
