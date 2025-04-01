import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

interface CelebrationProps {
  show: boolean;
  onComplete: () => void;
}

export const Celebration: React.FC<CelebrationProps> = ({ show, onComplete }) => {
  const animationRef = useRef<LottieView>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (show && animationRef.current && !hasStarted.current) {
      hasStarted.current = true;
      try {
        animationRef.current.play();
      } catch (error) {
        console.error("Lottie play error:", error);
        // This ensures the callback still happens even if animation fails
        onComplete();
      }
    } else if (!show) {
      hasStarted.current = false;
    }

    // Clean up animation if component unmounts while playing
    return () => {
      if (show && !hasStarted.current) {
        onComplete();
      }
    };
  }, [show, onComplete]);

  const handleAnimationFinish = () => {
    hasStarted.current = false;
    onComplete();
  };

  if (!show) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      <LottieView
        ref={animationRef}
        source={require('../assets/animations/confetti.json')}
        style={styles.animation}
        loop={false}
        autoPlay={false} // We'll control play manually
        speed={1.5}
        onAnimationFinish={handleAnimationFinish}
      />
    </View>
  );
};

// These are the styles for the celebration component
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    pointerEvents: 'none',
  },
  animation: {
    width: '100%',
    height: '100%',
  },
}); 