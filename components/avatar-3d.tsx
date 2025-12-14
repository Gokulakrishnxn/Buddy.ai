'use client';

import { Suspense, useRef, ErrorInfo, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface AvatarModelProps {
  url: string;
}

function AvatarModel({ url }: AvatarModelProps) {
  const { scene } = useGLTF(url);
  const meshRef = useRef<THREE.Group>(null);

  // Gentle rotation animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <primitive
      ref={meshRef}
      object={scene}
      scale={[1, 1, 1]}
      position={[0, -1.5, 0]}
    />
  );
}

// Error Boundary Component
class AvatarErrorBoundary extends Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Avatar Error Boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

interface Avatar3DProps {
  avatarUrl?: string;
}

// Loading/Empty State Component
function LoadingAvatar() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="h-32 w-32 rounded-full bg-muted/50 flex items-center justify-center mx-auto animate-pulse">
          <div className="h-24 w-24 rounded-full bg-muted" />
        </div>
        <p className="text-sm text-muted-foreground">Create your avatar to get started</p>
      </div>
    </div>
  );
}

export function Avatar3D({ avatarUrl }: Avatar3DProps) {
  // If no avatar URL provided, show loading/empty state
  if (!avatarUrl) {
    return <LoadingAvatar />;
  }

  return (
    <AvatarErrorBoundary fallback={<LoadingAvatar />}>
      <div className="w-full h-full">
        <Canvas
          camera={{ position: [0, 0, 3], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={<LoadingAvatar />}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <pointLight position={[-5, -5, -5]} intensity={0.5} />
            <AvatarModel url={avatarUrl} />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 1.5}
              autoRotate
              autoRotateSpeed={0.5}
            />
            <Environment preset="sunset" />
          </Suspense>
        </Canvas>
      </div>
    </AvatarErrorBoundary>
  );
}

