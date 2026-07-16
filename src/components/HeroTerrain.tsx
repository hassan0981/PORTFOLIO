"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Full-bleed wireframe terrain — Three.js plane + animated vertex displacement.
 * Mirrors the Dawar-style hero background (WebGL canvas behind UI).
 */
export default function HeroTerrain() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const segments = isMobile ? 48 : 80;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 3.2, 7.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(28, 18, segments, Math.floor(segments * 0.65));
    geometry.rotateX(-Math.PI / 2.35);

    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#5eead4"),
      wireframe: true,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = -1.4;
    scene.add(mesh);

    // Soft ambient fill so wireframe doesn't float in pure black
    const fog = new THREE.FogExp2(0x07080c, 0.045);
    scene.fog = fog;

    const position = geometry.attributes.position as THREE.BufferAttribute;
    const base = new Float32Array(position.count * 3);
    for (let i = 0; i < position.count; i++) {
      base[i * 3] = position.getX(i);
      base[i * 3 + 1] = position.getY(i);
      base[i * 3 + 2] = position.getZ(i);
    }

    let frame = 0;
    let rafId = 0;
    let running = true;

    const animate = () => {
      if (!running) return;
      rafId = requestAnimationFrame(animate);
      frame += prefersReduced ? 0 : 0.008;

      for (let i = 0; i < position.count; i++) {
        const x = base[i * 3];
        const z = base[i * 3 + 2];
        const wave =
          Math.sin(x * 0.45 + frame) * 0.35 +
          Math.cos(z * 0.55 + frame * 0.85) * 0.28 +
          Math.sin((x + z) * 0.25 + frame * 0.6) * 0.22;
        position.setY(i, base[i * 3 + 1] + wave);
      }
      position.needsUpdate = true;
      geometry.computeVertexNormals();

      mesh.rotation.y = Math.sin(frame * 0.15) * 0.04;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    />
  );
}
