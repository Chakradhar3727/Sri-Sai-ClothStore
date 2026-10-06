import { useState, useEffect, useRef } from 'react';

interface WebGLPerformanceState {
  hasWebGL: boolean;
  fps: number;
  isLowPerformance: boolean;
  tessellationSegments: number;
}

export function useWebGLPerformance(): WebGLPerformanceState {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [fps, setFps] = useState(60);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [tessellationSegments, setTessellationSegments] = useState(64);

  const frameTimesRef = useRef<number[]>([]);
  const lastTimeRef = useRef(performance.now());

  useEffect(() => {
    // 1. Initial WebGL context check
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    // 2. Adjust default segments on mobile screens
    if (window.innerWidth < 768) {
      setTessellationSegments(36);
    }

    // 3. FPS Telemetry sampler
    let animationFrameId: number;
    const measureFps = (now: number) => {
      const delta = now - lastTimeRef.current;
      lastTimeRef.current = now;

      if (delta > 0) {
        frameTimesRef.current.push(1000 / delta);
        if (frameTimesRef.current.length > 45) {
          frameTimesRef.current.shift();
          const averageFps =
            frameTimesRef.current.reduce((a, b) => a + b, 0) / frameTimesRef.current.length;
          setFps(Math.round(averageFps));

          // Throttle segments if performance drops below 35 FPS
          if (averageFps < 35 && tessellationSegments > 32) {
            setIsLowPerformance(true);
            setTessellationSegments(28);
          }
        }
      }

      animationFrameId = requestAnimationFrame(measureFps);
    };

    animationFrameId = requestAnimationFrame(measureFps);

    // 4. Context loss & recovery listeners
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setHasWebGL(false);
    };

    const handleContextRestored = () => {
      setHasWebGL(true);
    };

    window.addEventListener('webglcontextlost', handleContextLost);
    window.addEventListener('webglcontextrestored', handleContextRestored);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('webglcontextlost', handleContextLost);
      window.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, [tessellationSegments]);

  return { hasWebGL, fps, isLowPerformance, tessellationSegments };
}
