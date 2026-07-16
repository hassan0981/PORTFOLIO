"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Fixed full-page wireframe terrain — stronger in the hero, softer while scrolling.
 * Light mode uses darker teal + higher opacity + lighter fog so the mesh stays visible.
 */
export default function PageTerrain() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const segments = isMobile ? 40 : 72;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.4 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(28, 18, segments, Math.floor(segments * 0.65));
    geometry.rotateX(-Math.PI / 2.35);

    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#5eead4"),
      wireframe: true,
      transparent: true,
      opacity: 0.2,
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = -1.4;
    scene.add(mesh);
    scene.fog = new THREE.FogExp2(0x07080c, 0.045);

    let targetOpacity = 0.2;
    let baseOpacity = 0.2;
    let fadeAmount = 0.1;

    const applyTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");

      if (isDark) {
        material.color.set("#5eead4");
        baseOpacity = 0.2;
        fadeAmount = 0.1;
        if (scene.fog instanceof THREE.FogExp2) {
          scene.fog.color.set(0x07080c);
          scene.fog.density = 0.045;
        }
      } else {
        // Deeper teal + stronger opacity so lines read on light backgrounds
        material.color.set("#0f766e");
        baseOpacity = 0.42;
        fadeAmount = 0.12;
        if (scene.fog instanceof THREE.FogExp2) {
          // Soft fog — avoid bleaching the mesh into the page
          scene.fog.color.set(0xf6f7f9);
          scene.fog.density = 0.018;
        }
      }

      targetOpacity = baseOpacity;
      material.opacity = baseOpacity;
      onScroll();
    };

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

    const onScroll = () => {
      const max = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const p = Math.min(window.scrollY / max, 1);
      // Hero vivid → quieter mid-page → slight lift near contact
      targetOpacity = baseOpacity - p * fadeAmount + Math.max(0, p - 0.75) * 0.08;
      mesh.rotation.z = p * 0.08;
      camera.position.y = 3.2 - p * 0.6;
      camera.position.z = 7.5 + p * 0.8;
      camera.lookAt(0, -p * 0.4, 0);
    };

    applyTheme();

    const themeObserver = new MutationObserver(applyTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    window.addEventListener("scroll", onScroll, { passive: true });

    const animate = () => {
      if (!running) return;
      rafId = requestAnimationFrame(animate);
      frame += prefersReduced ? 0 : 0.0075;

      material.opacity += (targetOpacity - material.opacity) * 0.05;

      if (!prefersReduced) {
        for (let i = 0; i < position.count; i++) {
          const x = base[i * 3];
          const z = base[i * 3 + 2];
          const wave =
            Math.sin(x * 0.45 + frame) * 0.32 +
            Math.cos(z * 0.55 + frame * 0.85) * 0.26 +
            Math.sin((x + z) * 0.25 + frame * 0.6) * 0.2;
          position.setY(i, base[i * 3 + 1] + wave);
        }
        position.needsUpdate = true;
        mesh.rotation.y = Math.sin(frame * 0.12) * 0.035;
      }

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      themeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
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
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-[0.95] dark:opacity-100"
    />
  );
}
