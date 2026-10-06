import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { GpuWavingSilkPlane } from './GpuWavingSilkPlane';
import { GoldFestiveDust } from './GoldFestiveDust';
import { useWebGLPerformance } from '@/hooks/useWebGLPerformance';
import { SilkColorway } from '@/types/silk.types';

interface Props {
  colorway: SilkColorway;
}

export function SilkClothDrape({ colorway }: Props) {
  const { hasWebGL, tessellationSegments } = useWebGLPerformance();

  // Graceful CSS Fallback if WebGL is unavailable
  if (!hasWebGL) {
    return (
      <div
        className="absolute inset-0 transition-colors duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 70% 40%, ${colorway.baseColor} 0%, #150A10 65%, #0E0C0F 100%)`,
        }}
      />
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-95">
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 46 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* Cinematic Studio Lighting for Saree Fabric Luster */}
        <ambientLight intensity={1.1} />
        <directionalLight position={[4, 6, 3]} intensity={2.6} color="#FFF8E7" />
        <pointLight position={[-3, -2, 2]} intensity={1.4} color="#D4AF37" />
        <pointLight position={[2, -3, 1]} intensity={0.9} color="#FF6F61" />

        {/* Gentle 3D Floating Drape */}
        <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.35}>
          <GpuWavingSilkPlane
            colorway={colorway}
            segments={tessellationSegments}
          />
        </Float>

        {/* Shimmering Festive Gold Dust Particles */}
        <GoldFestiveDust count={120} />
      </Canvas>

      {/* Vignette Gradients for Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C0F] via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0E0C0F]/90 via-[#0E0C0F]/40 to-transparent pointer-events-none" />
    </div>
  );
}
