import React from 'react';
import Hero from '../components/Hero';
import WorksWith from '../components/WorksWith';
import Features from '../components/Features';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <WorksWith />
      <Features />
      <FAQ />
      <Contact />
    </main>
  );
}
