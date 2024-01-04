// ProgressBar.js
import React, { useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { useRouter } from 'next/router';

const ProgressBar = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };

    const handleComplete = () => {
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  const progressBarColor = 'black'; // Set your desired color here
  const progressBarHeight = '8px'; // Set your desired height here

  return loading ? <LinearProgress style={{
    height: progressBarHeight,
    backgroundColor: progressBarColor,
  }} /> : null;
};

export default ProgressBar;
