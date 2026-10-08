"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

const PROJECT_SHOTS = [
  "/projects/assicurativo-studio/elaborazione-polizze.png",
  "/projects/nagma-tattoo-crm/dashboard.png",
  "/projects/assicurativo-studio/dashboard.png",
];

function SceneFallback() {
  return (
    <div aria-hidden="true" className="hero-diorama" data-testid="hero-diorama-fallback">
      <div className="hero-diorama__orbit" />
      <div className="hero-diorama__plinth" />
      {PROJECT_SHOTS.map((src, index) => (
        <div key={src} className={`hero-diorama__panel hero-diorama__panel--${index + 1}`}>
          <Image
            src={src}
            alt=""
            fill
            sizes="(min-width: 1024px) 28vw, 80vw"
            loading={index === 0 ? "eager" : "lazy"}
            className="object-cover"
          />
        </div>
      ))}
      <span className="hero-diorama__index">SELECTED WORK · 2024—26</span>
    </div>
  );
}

export function HeroScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [webglAvailable, setWebglAvailable] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const media = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");

    let cancelled = false;
    let cleanupScene: (() => void) | undefined;
    let isVisible = false;
    let isInitializing = false;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !cleanupScene && !isInitializing) void start();
      else if (!isVisible && cleanupScene) {
        cleanupScene();
        cleanupScene = undefined;
        setWebglAvailable(false);
      }
    }, { rootMargin: "120px", threshold: 0.05 });

    const start = async () => {
      if (cancelled || isInitializing || !media.matches || motionMedia.matches || reducedMotion || !hostRef.current) return;
      isInitializing = true;
      try {
        const THREE = await import("three");
        if (cancelled || !isVisible || !media.matches || motionMedia.matches || !hostRef.current) {
          isInitializing = false;
          return;
        }
        const container = hostRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
        camera.position.set(0, 0.25, 10.4);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.1;
        renderer.setClearColor(0x000000, 0);
        renderer.domElement.setAttribute("aria-hidden", "true");
        renderer.domElement.className = "hero-diorama__canvas";
        container.prepend(renderer.domElement);

        scene.add(new THREE.AmbientLight(0xfff3df, 2.1));
        const keyLight = new THREE.DirectionalLight(0xffdfa0, 4.2);
        keyLight.position.set(-3, 6, 7);
        scene.add(keyLight);
        const fillLight = new THREE.DirectionalLight(0xf3ece0, 2.4);
        fillLight.position.set(5, 1, 2);
        scene.add(fillLight);

        const group = new THREE.Group();
        scene.add(group);
        const frames: InstanceType<typeof THREE.Group>[] = [];
        const loader = new THREE.TextureLoader();
        const layouts = [
          { x: -0.18, y: 0.34, z: 0.42, rot: -0.035, scale: 1 },
          { x: 2.02, y: -0.42, z: -0.84, rot: 0.08, scale: 0.74 },
          { x: -2.02, y: -0.6, z: -1.42, rot: -0.08, scale: 0.67 },
        ];
        const materials: InstanceType<typeof THREE.Material>[] = [];
        const textures: InstanceType<typeof THREE.Texture>[] = [];

        for (let i = 0; i < PROJECT_SHOTS.length; i += 1) {
          const layout = layouts[i];
          const frame = new THREE.Group();
          frame.position.set(layout.x, layout.y, layout.z);
          frame.rotation.z = layout.rot;
          frame.scale.setScalar(layout.scale);
          group.add(frame);
          frames.push(frame);

          const shadow = new THREE.Mesh(
            new THREE.BoxGeometry(3.78, 2.35, 0.17),
            new THREE.MeshStandardMaterial({ color: 0x17120c, roughness: 0.82, metalness: 0.06 })
          );
          shadow.position.set(0.08, -0.1, -0.13);
          shadow.rotation.y = -0.08;
          frame.add(shadow);
          materials.push(shadow.material);

          const brassEdge = new THREE.Mesh(
            new THREE.BoxGeometry(3.78, 2.35, 0.11),
            new THREE.MeshStandardMaterial({ color: 0xcaa456, roughness: 0.4, metalness: 0.62 })
          );
          brassEdge.position.z = -0.035;
          frame.add(brassEdge);
          materials.push(brassEdge.material);

          const paperBacking = new THREE.Mesh(
            new THREE.PlaneGeometry(3.72, 2.29),
            new THREE.MeshStandardMaterial({ color: 0xf2ece0, roughness: 0.93 })
          );
          paperBacking.position.z = 0.03;
          frame.add(paperBacking);
          materials.push(paperBacking.material);

          const texture = await new Promise<InstanceType<typeof THREE.Texture> | null>((resolve) => {
            loader.load(PROJECT_SHOTS[i], resolve, undefined, () => resolve(null));
          });
          if (cancelled) {
            texture?.dispose();
            return;
          }
          if (texture) {
            textures.push(texture);
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4);
            const imageAspect = (texture.image as HTMLImageElement).width / (texture.image as HTMLImageElement).height;
            const panelAspect = 3.62 / 2.19;
            if (imageAspect > panelAspect) {
              const visible = panelAspect / imageAspect;
              texture.repeat.set(visible, 1);
              texture.offset.x = (1 - visible) / 2;
            } else {
              const visible = imageAspect / panelAspect;
              texture.repeat.set(1, visible);
              texture.offset.y = (1 - visible) / 2;
            }
            const image = new THREE.Mesh(
              new THREE.PlaneGeometry(3.62, 2.19),
              new THREE.MeshBasicMaterial({ map: texture, toneMapped: false })
            );
            image.position.z = 0.055;
            frame.add(image);
            materials.push(image.material);
          }
        }

        const plinth = new THREE.Mesh(
          new THREE.BoxGeometry(7.2, 0.14, 1.25),
          new THREE.MeshStandardMaterial({ color: 0x3d3020, roughness: 0.62, metalness: 0.3 })
        );
        plinth.position.set(0, -1.7, -0.72);
        group.add(plinth);
        materials.push(plinth.material);
        const top = new THREE.Mesh(
          new THREE.BoxGeometry(7.18, 0.035, 1.23),
          new THREE.MeshStandardMaterial({ color: 0xcaa456, roughness: 0.38, metalness: 0.58 })
        );
        top.position.set(0, -1.612, -0.72);
        group.add(top);
        materials.push(top.material);

        const resize = () => {
          const { width, height } = container.getBoundingClientRect();
          if (!width || !height) return;
          renderer.setSize(width, height, false);
          camera.aspect = width / height;
          camera.position.z = width < 900 ? 12.6 : 10.4;
          camera.updateProjectionMatrix();
        };
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(container);
        resize();
        const pointer = new THREE.Vector2();
        const target = new THREE.Vector2();
        const onPointerMove = (event: PointerEvent) => {
          const rect = container.getBoundingClientRect();
          target.set(((event.clientX - rect.left) / rect.width - 0.5) * 0.22, ((event.clientY - rect.top) / rect.height - 0.5) * -0.12);
        };
        container.addEventListener("pointermove", onPointerMove, { passive: true });
        let frameId = 0;
        let previousTime = 0;
        const render = (time: number) => {
          frameId = requestAnimationFrame(render);
          if (time - previousTime < 33) return;
          previousTime = time;
          pointer.lerp(target, 0.045);
          group.rotation.y = pointer.x + Math.sin(time * 0.0002) * 0.035;
          group.rotation.x = pointer.y + Math.sin(time * 0.00025) * 0.012;
          frames.forEach((frame, index) => {
            frame.position.y = layouts[index].y + Math.sin(time * 0.00045 + index * 1.7) * 0.035;
          });
          renderer.render(scene, camera);
        };
        renderer.render(scene, camera);
        frameId = requestAnimationFrame(render);
        setWebglAvailable(true);
        isInitializing = false;

        cleanupScene = () => {
          cancelAnimationFrame(frameId);
          resizeObserver.disconnect();
          container.removeEventListener("pointermove", onPointerMove);
          textures.forEach((texture) => texture.dispose());
          materials.forEach((material) => material.dispose());
          scene.traverse((object) => {
            if (object instanceof THREE.Mesh) object.geometry.dispose();
          });
          renderer.dispose();
          renderer.domElement.remove();
        };
      } catch (error) {
        isInitializing = false;
        console.error("Unable to initialize the portfolio 3D scene", error);
        setWebglAvailable(false);
      }
    };

    observer.observe(host);

    const updateCapability = () => {
      if (!media.matches || motionMedia.matches || reducedMotion) {
        cleanupScene?.();
        cleanupScene = undefined;
        setWebglAvailable(false);
      } else if (isVisible && !cleanupScene && !isInitializing) void start();
    };
    media.addEventListener("change", updateCapability);
    motionMedia.addEventListener("change", updateCapability);

    return () => {
      cancelled = true;
      observer.disconnect();
      cleanupScene?.();
      media.removeEventListener("change", updateCapability);
      motionMedia.removeEventListener("change", updateCapability);
    };
  }, [reducedMotion]);

  return (
    <div className="hero-scene-wrap">
      <div ref={hostRef} className="hero-scene" aria-hidden="true" data-webgl-active={webglAvailable}>
        <SceneFallback />
        <span className="hero-scene__caption">A DIGITAL WORKSHOP · NAPOLI</span>
      </div>
      <div className="hero-scene-mobile">
        <SceneFallback />
      </div>
      <span className={`hero-scene__status${webglAvailable ? " is-live" : ""}`} aria-hidden="true">
        <i /> {webglAvailable ? "REALTIME SCENE" : "SCENE PREVIEW"}
      </span>
    </div>
  );
}
