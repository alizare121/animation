'use client';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

export default function Home() {
  const initialLocation = {
    x: window.innerWidth - 40,
    y: window.innerHeight - 40,
  };

  const endLocation = {
    x: window.innerWidth - window.innerWidth / 2,
    y: window.innerHeight - window.innerWidth / 2,
  };

  const [iconLocation, setIconLocation] = useState(initialLocation);
  const [scroll, setScroll] = useState(0);
  const [result, setResult] = useState(0);

  function calculateLogParameters(x1: number, y1: number, x2: number, y2: number) {
    var a = (y2 - y1) / (Math.log(x2) - Math.log(x1));
    var b = y1 - a * Math.log(x1);
    return {
      a: a,
      b: b,
    };
  }

  function calculateY(a: number, b: number, x: number) {
    console.log('x :>> ', x);
    return a * Math.log(x) + b;
  }

  useEffect(() => {
    const handleScroll = (event: any) => {
      setScroll((pre) => pre + event.deltaY / 10);
      setResult(calculateY(parameters.a, parameters.b, scroll));
      event.preventDefault();
    };

    document.addEventListener('wheel', handleScroll, { passive: false });

    const parameters = calculateLogParameters(initialLocation.x, initialLocation.y, endLocation.x, endLocation.y);

    return () => {
      document.removeEventListener('wheel', handleScroll);
    };
  }, [endLocation.x, endLocation.y, initialLocation.x, initialLocation.y, scroll]);

  useEffect(
    () => {
      const parameters = calculateLogParameters(initialLocation.x, initialLocation.y, endLocation.x, endLocation.y);
      setResult(calculateY(parameters.a, parameters.b, initialLocation.x))
    }, []
  )

  return (
    <main className='flex min-h-screen relative flex-col items-center justify-between overflow-y-hidden p-24 max-h-[100vh]'>
      {scroll}, {result}
      <Image src='/mobile.svg' alt='mobile' width={666} height={1000} />
      <Image
        src='/investment-icon.svg'
        alt='icon'
        className='absolute right-10'
        width={200}
        height={200}
        style={{
          bottom: scroll / 10,
          left: result
        }}
      />
    </main>
  );
}
