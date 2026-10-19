"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function InteractiveGridCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Dimensions
    let width = container.clientWidth;
    let height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 8, 16);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Grid Dimensions
    const cols = 55;
    const rows = 40;
    const spacing = 0.55;
    const count = cols * rows;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    let idx = 0;
    const halfWidth = ((cols - 1) * spacing) / 2;
    const halfDepth = ((rows - 1) * spacing) / 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * spacing - halfWidth;
        const z = r * spacing - halfDepth;
        const y = 0;

        positions[idx * 3] = x;
        positions[idx * 3 + 1] = y;
        positions[idx * 3 + 2] = z;

        originalPositions[idx * 3] = x;
        originalPositions[idx * 3 + 1] = y;
        originalPositions[idx * 3 + 2] = z;

        // Depth size attenuation
        const depthFactor = (r / rows);
        sizes[idx] = 1.4 + depthFactor * 1.8;

        idx++;
      }
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // Particle Material with circular points texture
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.beginPath();
      ctx.arc(16, 16, 14, 0, Math.PI * 2);
      ctx.fillStyle = "#111111";
      ctx.fill();
    }
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      color: 0x111111,
      size: 0.12,
      map: texture,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse Tracking with smooth Lerp
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const raycaster = new THREE.Raycaster();
    const planeIntersection = new THREE.Vector3();

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = event.clientX - rect.left;
      const clientY = event.clientY - rect.top;

      mouse.targetX = (clientX / width) * 2 - 1;
      mouse.targetY = -(clientY / height) * 2 + 1;
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

    // IntersectionObserver to pause rendering when offscreen
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
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      // Project mouse coordinates to 3D ground plane
      raycaster.setFromCamera(new THREE.Vector2(mouse.x, mouse.y), camera);
      raycaster.ray.intersectPlane(plane, planeIntersection);

      const pos = geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const ox = originalPositions[i3];
        const oz = originalPositions[i3 + 2];

        // Organic ambient subtle wave
        const waveY =
          Math.sin(ox * 0.35 + elapsedTime * 1.2) * 0.22 +
          Math.cos(oz * 0.45 + elapsedTime * 0.9) * 0.22;

        // Distance from cursor intersection
        const dx = ox - planeIntersection.x;
        const dz = oz - planeIntersection.z;
        const distSq = dx * dx + dz * dz;

        // Interaction elevation dome (lift particles up near cursor)
        let cursorInfluence = 0;
        if (distSq < 16) {
          const dist = Math.sqrt(distSq);
          cursorInfluence = Math.exp(-dist * 0.8) * 1.8;
        }

        pos[i3 + 1] = waveY + cursorInfluence;
      }

      geometry.attributes.position.needsUpdate = true;

      // Subtle dynamic camera parallax
      camera.position.x = mouse.x * 1.2;
      camera.position.y = 8 + mouse.y * 0.8;
      camera.lookAt(0, 0, 0);

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
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    />
  );
}
