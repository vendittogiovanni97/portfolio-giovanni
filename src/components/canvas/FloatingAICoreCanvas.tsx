"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function FloatingAICoreCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let width = container.clientWidth || 480;
    let height = container.clientHeight || 480;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 8.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Lights - Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 6.0);
    keyLight.position.set(-5, 7, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xebeae4, 3.5);
    fillLight.position.set(6, -2, 5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 4.0);
    rimLight.position.set(0, 6, -5);
    scene.add(rimLight);

    const frontSpecularLight = new THREE.PointLight(0xffffff, 15.0, 25);
    frontSpecularLight.position.set(2, 3, 6);
    scene.add(frontSpecularLight);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Soft Ambient Ground Contact Shadow
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const shadowCtx = shadowCanvas.getContext("2d");
    if (shadowCtx) {
      const gradient = shadowCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, "rgba(17, 17, 17, 0.25)");
      gradient.addColorStop(0.35, "rgba(17, 17, 17, 0.12)");
      gradient.addColorStop(0.7, "rgba(17, 17, 17, 0.03)");
      gradient.addColorStop(1, "rgba(17, 17, 17, 0)");
      shadowCtx.fillStyle = gradient;
      shadowCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(4.8, 4.8);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
    });
    const groundShadow = new THREE.Mesh(shadowGeo, shadowMat);
    groundShadow.rotation.x = -Math.PI / 2;
    groundShadow.position.y = -2.6;
    scene.add(groundShadow);

    // 2. Core Group (Floating)
    const coreGroup = new THREE.Group();
    rootGroup.add(coreGroup);

    // Inner Obsidian / Dark Titanium Faceted Icosahedron
    const innerGeo = new THREE.IcosahedronGeometry(1.68, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x22232a,
      roughness: 0.18,
      metalness: 0.85,
      flatShading: true,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // Outer Titanium Faceted Cage with crisp edges
    const outerGeo = new THREE.IcosahedronGeometry(1.72, 0);
    const edgesGeo = new THREE.EdgesGeometry(outerGeo);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x9fa0ad,
      linewidth: 2,
      transparent: true,
      opacity: 0.9,
    });
    const wireframe = new THREE.LineSegments(edgesGeo, lineMat);
    coreGroup.add(wireframe);

    // 3. Orbital Wireframe Rings
    const ringMat = new THREE.LineBasicMaterial({
      color: 0x222226,
      transparent: true,
      opacity: 0.35,
    });

    const createRing = (radius: number, rotX: number, rotY: number, rotZ: number) => {
      const ringGroup = new THREE.Group();
      ringGroup.rotation.set(rotX, rotY, rotZ);

      const segments = 96;
      const points = [];
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
      }
      const ringGeo = new THREE.BufferGeometry().setFromPoints(points);
      const ringMesh = new THREE.LineLoop(ringGeo, ringMat);
      ringGroup.add(ringMesh);

      return { ringGroup, radius };
    };

    const ring1 = createRing(2.6, Math.PI / 3.2, Math.PI / 6, 0);
    const ring2 = createRing(2.9, -Math.PI / 4, 0, Math.PI / 4.5);
    const ring3 = createRing(3.2, Math.PI / 6, -Math.PI / 3, Math.PI / 8);

    coreGroup.add(ring1.ringGroup);
    coreGroup.add(ring2.ringGroup);
    coreGroup.add(ring3.ringGroup);

    // 4. Satellite Orbiting Data Beads
    const beadMatDark = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.15,
      metalness: 0.95,
    });
    const beadMatSilver = new THREE.MeshStandardMaterial({
      color: 0x888890,
      roughness: 0.1,
      metalness: 0.95,
    });

    const satellites: { mesh: THREE.Mesh; parent: THREE.Group; radius: number; speed: number; angle: number }[] = [];

    const addSatellite = (parentGroup: THREE.Group, radius: number, speed: number, size: number, isDark: boolean) => {
      const beadGeo = new THREE.SphereGeometry(size, 20, 20);
      const bead = new THREE.Mesh(beadGeo, isDark ? beadMatDark : beadMatSilver);
      parentGroup.add(bead);
      satellites.push({ mesh: bead, parent: parentGroup, radius, speed, angle: Math.random() * Math.PI * 2 });
    };

    addSatellite(ring1.ringGroup, 2.6, 0.9, 0.09, true);
    addSatellite(ring1.ringGroup, 2.6, 0.9, 0.07, false);
    addSatellite(ring2.ringGroup, 2.9, -0.7, 0.11, false);
    addSatellite(ring2.ringGroup, 2.9, -0.7, 0.08, true);
    addSatellite(ring3.ringGroup, 3.2, 0.5, 0.1, true);

    // Mouse Interaction with Spring Lerp
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      mouse.targetX = Math.max(-1.5, Math.min(1.5, x));
      mouse.targetY = Math.max(-1.5, Math.min(1.5, y));
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // IntersectionObserver to pause offscreen
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Levitation Physics
      const levitation = Math.sin(elapsedTime * 1.6) * 0.14;
      coreGroup.position.y = levitation;

      // Contact shadow breathes with levitation
      const shadowScale = 1 - levitation * 0.45;
      groundShadow.scale.set(shadowScale, shadowScale, shadowScale);
      shadowMat.opacity = 0.2 + levitation * 0.05;

      // Continuous Slow Mathematical Rotation
      innerMesh.rotation.y += 0.006;
      innerMesh.rotation.x += 0.003;
      wireframe.rotation.y += 0.006;
      wireframe.rotation.x += 0.003;

      // Slow counter-rotation of orbital rings
      ring1.ringGroup.rotation.z += 0.002;
      ring2.ringGroup.rotation.y -= 0.003;
      ring3.ringGroup.rotation.x += 0.002;

      // Update Satellites along their circular trajectories
      satellites.forEach((sat) => {
        sat.angle += sat.speed * delta;
        sat.mesh.position.x = Math.cos(sat.angle) * sat.radius;
        sat.mesh.position.z = Math.sin(sat.angle) * sat.radius;
      });

      // Interactive Mouse Tilt & Parallax
      coreGroup.rotation.y = innerMesh.rotation.y + mouse.x * 0.45;
      coreGroup.rotation.x = innerMesh.rotation.x - mouse.y * 0.35;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      innerGeo.dispose();
      innerMat.dispose();
      outerGeo.dispose();
      edgesGeo.dispose();
      lineMat.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTexture.dispose();
      ringMat.dispose();
      beadMatDark.dispose();
      beadMatSilver.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square max-w-[480px] lg:max-w-[540px] mx-auto flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      aria-label="Scultura geometrica 3D interattiva del Nucleo AI"
    />
  );
}
