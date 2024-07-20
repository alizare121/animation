'use client';
import Image from 'next/image';
import { useSprings, animated } from '@react-spring/web';
import { useEffect, useState } from 'react';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [animationState, setAnimationState] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > scrollY) {
        setAnimationState(true); // End state
      } else {
        setAnimationState(false); // Start state
      }
      setScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY]);

  // Define the icons with their starting and ending points
  const icons = [
    { startX: -600, startY: 200, endX: -160, endY: 691, rotaition: -30 },
    { startX: -600, startY: -50, endX: 0, endY: 504, rotaition: -25 },
    { startX: -400, startY: 200, endX: 158, endY: 691, rotaition: -20 },
    { startX: 450, startY: 150, endX: 0, endY: 691, rotaition: 20 },
    // Add more icons as needed
  ];

  const springs = useSprings(
    icons.length,
    icons.map((icon) => ({
      transform: animationState
        ? `translate(${icon.endX}px, ${icon.endY}px) rotate(0deg)`
        : `translate(${icon.startX}px, ${icon.startY}px) rotate(${icon.rotaition}deg)`,
      config: { mass: 1, tension: 150, friction: 20 },
    }))
  );

  return (
    <main className='flex min-h-screen relative flex-col items-center justify-between overflow-y-hidden p-24 max-h-[100vh]'>
      <div className='absolute z-10 top-0 left-0 right-0 bottom-0 max-h-[100vh] overflow-scroll no-scrollbar' onScroll={
        (event) => {
          const scrollTop = (event.target as HTMLElement).scrollTop;
          if (scrollTop > scrollY) {
            setAnimationState(true);
          } else {
            setAnimationState(false);
          }
          setScrollY(scrollTop);
        }
      }>
        <div className='h-[200vh]'></div>
      </div>
      <Image src='/mobile.svg' alt='mobile' width={666} height={1000} />
      {springs.map((springProps, index) => (
        <animated.div key={index} style={springProps} className='absolute'>
          <Image
            src='/investment-icon.svg'
            alt={`icon-${index}`}
            width={200}
            height={200}
          />
        </animated.div>
      ))}
    </main>
  );
}
