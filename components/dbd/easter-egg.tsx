"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_POSITION = { x: 24, y: 120 };

// Deliberately not using pointer capture: mouseup only fires while the
// cursor is still over the ghost, so a fast drag lets it "escape" and keep
// gliding after your cursor until you either grab it again or hit STOP —
// that's the whole gag, ported from the old site's follow-the-cursor icon.
export function EasterEgg() {
  const [position, setPosition] = useState(DEFAULT_POSITION);
  const [following, setFollowing] = useState(false);
  const targetRef = useRef(DEFAULT_POSITION);
  const followingRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const updateTarget = useCallback((e: MouseEvent) => {
    targetRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const stopFollowing = useCallback(() => {
    followingRef.current = false;
    setFollowing(false);
    window.removeEventListener("mousemove", updateTarget);
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
  }, [updateTarget]);

  function startFollowing(e: React.MouseEvent) {
    followingRef.current = true;
    setFollowing(true);
    targetRef.current = { x: e.clientX, y: e.clientY };
    window.addEventListener("mousemove", updateTarget);

    const tick = () => {
      if (!followingRef.current) return;
      setPosition((prev) => {
        const dx = targetRef.current.x - prev.x;
        const dy = targetRef.current.y - prev.y;
        if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) return prev;
        return { x: prev.x + dx * 0.15, y: prev.y + dy * 0.15 };
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }

  function reset() {
    stopFollowing();
    setPosition(DEFAULT_POSITION);
  }

  useEffect(() => stopFollowing, [stopFollowing]);

  return (
    <>
      {following && (
        <button
          type="button"
          onClick={reset}
          className="fixed top-4 right-4 z-[60] rounded-full bg-red-500 px-4 py-2 text-xs font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          СТОП
        </button>
      )}
      <button
        type="button"
        aria-label="Секретный дух Vortex Info"
        title="Поймай меня, если сможешь"
        onMouseDown={startFollowing}
        onMouseUp={stopFollowing}
        style={{ left: position.x, top: position.y }}
        className="fixed z-50 cursor-grab touch-none text-4xl leading-none select-none active:cursor-grabbing"
      >
        👻
      </button>
    </>
  );
}
