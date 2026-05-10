import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleField = ({ theme }) => {
  const meshRef = useRef();
  const count = 800;

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const themeColor = {
      sunny: new THREE.Color('#f59e0b'),
      rainy: new THREE.Color('#38bdf8'),
      storm: new THREE.Color('#818cf8'),
      snow: new THREE.Color('#bfdbfe'),
      night: new THREE.Color('#6366f1'),
      cloudy: new THREE.Color('#94a3b8'),
      foggy: new THREE.Color('#94a3b8'),
      default: new THREE.Color('#38bdf8'),
    }[theme] || new THREE.Color('#38bdf8');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;

      const shade = 0.4 + Math.random() * 0.6;
      col[i * 3] = themeColor.r * shade;
      col[i * 3 + 1] = themeColor.g * shade;
      col[i * 3 + 2] = themeColor.b * shade;
    }
    return { positions: pos, colors: col };
  }, [theme]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const posArr = meshRef.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      if (theme === 'rainy' || theme === 'storm') {
        posArr[ix + 1] -= 0.04 + Math.random() * 0.02;
        if (posArr[ix + 1] < -10) posArr[ix + 1] = 10;
      } else if (theme === 'snow') {
        posArr[ix] += Math.sin(time * 0.5 + i) * 0.005;
        posArr[ix + 1] -= 0.015;
        if (posArr[ix + 1] < -10) posArr[ix + 1] = 10;
      } else {
        posArr[ix + 1] += Math.sin(time * 0.3 + i * 0.1) * 0.002;
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = time * 0.02;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.7} sizeAttenuation />
    </points>
  );
};

const WeatherBackground = ({ theme = 'default' }) => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <ParticleField theme={theme} />
      </Canvas>
    </div>
  );
};

export default WeatherBackground;
