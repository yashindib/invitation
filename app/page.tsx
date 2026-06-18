"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import EnvelopeIntro from "@/components/intro/EnvelopeIntro";
import VideoHero from "@/components/hero/VideoHero";
import IntroLetter from "@/components/sections/IntroLetter";
import Customs from "@/components/sections/Customs";
import EventDetails from "@/components/sections/EventDetails";
import Countdown from "@/components/sections/Countdown";
import Location from "@/components/sections/Location";
import DressCode from "@/components/sections/DressCode";
import RSVP from "@/components/sections/RSVP";
import Footer from "@/components/sections/Footer";
import MusicToggle from "@/components/fx/MusicToggle";
import CursorSparkle from "@/components/fx/CursorSparkle";

export default function Home() {
  const [opened, setOpened] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;
    lenis.stop(); // locked until the envelope is opened

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const handleOpen = () => {
    setOpened(true);
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      lenis.start();
    }
  };

  return (
    <>
      {!opened && <EnvelopeIntro onOpen={handleOpen} />}

      <main className="relative overflow-hidden">
        <VideoHero />
        <IntroLetter />
        <Customs />
        <EventDetails />
        <Countdown />
        <Location />
        <DressCode />
        <RSVP />
        <Footer />
      </main>

      {opened && (
        <>
          <MusicToggle />
          <CursorSparkle />
        </>
      )}
    </>
  );
}
