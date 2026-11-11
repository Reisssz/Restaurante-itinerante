"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  gsap.defaults({ ease: "expo.out", duration: 1 });
}

export const SEM_REDUCAO = "(prefers-reduced-motion: no-preference)";
export const DESKTOP_FINO = "(min-width: 1024px) and (pointer: fine)";

export { gsap, ScrollTrigger, SplitText, useGSAP };
