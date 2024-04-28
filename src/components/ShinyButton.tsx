"use client";
import { motion, Target, VariantLabels } from "framer-motion";
import Link from "next/link";

const ShinyButton = () => {
  return (
    <Link href="/dashboard">
      <motion.button
        initial={
          { "--x": "100%", scale: 1 } as boolean | Target | VariantLabels
        }
        animate={{ "--x": "-100%" } as boolean | Target | VariantLabels}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 1,
          type: "spring",
          stiffness: 20,
          damping: 15,
          mass: 2,
          scale: {
            type: "spring",
            stiffness: 10,
            damping: 5,
            mass: 0.1,
          },
        }}
        className="px-12 py-4 rounded-md relative radial-gradient"
      >
        <span className="text-neutral-100 text-2xl tracking-wide font-light h-full w-full block relative linear-mask">
          Start now
        </span>
        <span className="block absolute inset-0 rounded-md p-px linear-overlay" />
      </motion.button>
    </Link>
  );
};

export default ShinyButton;
