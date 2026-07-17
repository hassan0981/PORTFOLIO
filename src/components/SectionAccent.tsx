"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useInView } from "framer-motion";

export type AccentVariant = "orb" | "rings" | "lattice" | "nodes" | "prism";

type SectionAccentProps = {
  variant?: AccentVariant;
  className?: string;
  opacity?: number;
};

/**
 * Lightweight in-view Three.js accent for section depth.
 * Desktop only — skipped on small screens for performance.
 */
export default function SectionAccent({
  variant = "orb",
  className = "",
  opacity = 0.35,
}: SectionAccentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { margin: "120px 0px", amount: 0.1 });
  const inViewRef = useRef(inView);
  inViewRef.current = inView;
  const [allowWebGL, setAllowWebGL] = useState(false);

  useEffect(() => {
    setAllowWebGL(window.innerWidth >= 768);
  }, []);

  useEffect(() => {
    if (!allowWebGL) return;
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
    camera.position.z = 5.8;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const isDark = document.documentElement.classList.contains("dark");
    const teal = new THREE.Color(isDark ? "#5eead4" : "#0f766e");
    const accentSoft = new THREE.Color(isDark ? "#99f6e4" : "#14b8a6");
    const accentMid = new THREE.Color(isDark ? "#2dd4bf" : "#0d9488");
    const objects: THREE.Object3D[] = [];
    const disposables: Array<{ dispose: () => void }> = [];

    const wire = (color = teal, op = opacity) => {
      const m = new THREE.MeshBasicMaterial({
        color,
        wireframe: true,
        transparent: true,
        opacity: isDark ? op : op * 0.85,
        depthWrite: false,
      });
      disposables.push(m);
      return m;
    };

    if (variant === "orb") {
      const g = new THREE.IcosahedronGeometry(1.35, 1);
      disposables.push(g);
      const mesh = new THREE.Mesh(g, wire());
      objects.push(mesh);
      scene.add(mesh);

      const inner = new THREE.IcosahedronGeometry(0.75, 0);
      disposables.push(inner);
      const innerMesh = new THREE.Mesh(inner, wire(accentSoft, opacity * 0.7));
      objects.push(innerMesh);
      scene.add(innerMesh);
    }

    if (variant === "rings") {
      for (let i = 0; i < 3; i++) {
        const g = new THREE.TorusGeometry(1.1 + i * 0.35, 0.018, 8, 72);
        disposables.push(g);
        const mesh = new THREE.Mesh(g, wire(teal, opacity * (1 - i * 0.2)));
        mesh.rotation.x = Math.PI / 2.4 + i * 0.2;
        mesh.rotation.y = i * 0.4;
        objects.push(mesh);
        scene.add(mesh);
      }
      const core = new THREE.OctahedronGeometry(0.35, 0);
      disposables.push(core);
      const coreMesh = new THREE.Mesh(core, wire(teal, opacity));
      objects.push(coreMesh);
      scene.add(coreMesh);
    }

    if (variant === "lattice") {
      const g = new THREE.BoxGeometry(2.2, 2.2, 2.2, 2, 2, 2);
      disposables.push(g);
      const mesh = new THREE.Mesh(g, wire(teal, opacity * 0.85));
      objects.push(mesh);
      scene.add(mesh);

      const mid = new THREE.BoxGeometry(1.2, 1.2, 1.2);
      disposables.push(mid);
      const midMesh = new THREE.Mesh(mid, wire(accentMid, opacity * 0.55));
      objects.push(midMesh);
      scene.add(midMesh);
    }

    if (variant === "nodes") {
      const group = new THREE.Group();
      const nodeGeo = new THREE.SphereGeometry(0.08, 8, 8);
      disposables.push(nodeGeo);
      const positions: THREE.Vector3[] = [];
      for (let i = 0; i < 12; i++) {
        const phi = Math.acos(-1 + (2 * i) / 12);
        const theta = Math.sqrt(12 * Math.PI) * phi;
        const v = new THREE.Vector3(
          Math.cos(theta) * Math.sin(phi) * 1.5,
          Math.sin(theta) * Math.sin(phi) * 1.5,
          Math.cos(phi) * 1.5
        );
        positions.push(v);
        const node = new THREE.Mesh(nodeGeo, wire(teal, opacity + 0.15));
        node.position.copy(v);
        group.add(node);
      }
      const lineMat = new THREE.LineBasicMaterial({
        color: teal,
        transparent: true,
        opacity: opacity * 0.45,
      });
      disposables.push(lineMat);
      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          if (positions[i].distanceTo(positions[j]) < 1.55) {
            const geo = new THREE.BufferGeometry().setFromPoints([positions[i], positions[j]]);
            disposables.push(geo);
            group.add(new THREE.Line(geo, lineMat));
          }
        }
      }
      objects.push(group);
      scene.add(group);
    }

    if (variant === "prism") {
      const g = new THREE.TetrahedronGeometry(1.5, 0);
      disposables.push(g);
      const mesh = new THREE.Mesh(g, wire(teal, opacity));
      objects.push(mesh);
      scene.add(mesh);

      const ring = new THREE.TorusGeometry(1.85, 0.015, 6, 64);
      disposables.push(ring);
      const ringMesh = new THREE.Mesh(ring, wire(teal, opacity * 0.5));
      ringMesh.rotation.x = Math.PI / 2.2;
      objects.push(ringMesh);
      scene.add(ringMesh);
    }

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let frame = 0;
    let rafId = 0;
    let running = true;

    const animate = () => {
      if (!running) return;
      rafId = requestAnimationFrame(animate);

      if (!inViewRef.current) return;

      if (!prefersReduced) {
        frame += 0.006;
        objects.forEach((obj, i) => {
          obj.rotation.y += 0.003 + i * 0.001;
          obj.rotation.x += 0.0015;
          obj.position.y = Math.sin(frame + i) * 0.08;
        });
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      ro.disconnect();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [allowWebGL, variant, opacity]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={`pointer-events-none absolute overflow-hidden ${className}`}
    />
  );
}
