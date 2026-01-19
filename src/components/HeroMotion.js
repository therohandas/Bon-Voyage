import React from "react";
import { motion } from "framer-motion";

const PRIMARY_BG = "#fff";
const PRIMARY_ACCENT = "#68b1a3";
const TEXT_COLOR = "#243c36";
const SHADOW = "0px 3px 15px 6px rgba(89, 89, 89, 0.15)";

export default function HeroMotion() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring" }}
      style={{
        background: PRIMARY_BG,
        borderRadius: 32,
        boxShadow: SHADOW,
        padding: "2rem",
        margin: "2rem auto",
        maxWidth: 420,
        textAlign: "center",
      }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0px 6px 30px 10px rgba(89, 89, 89, 0.20)",
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        style={{
          color: TEXT_COLOR,
          fontSize: "2.2rem",
          fontWeight: 700,
          marginBottom: "1rem",
          letterSpacing: 1,
        }}
      >
        Welcome to Bon-Journee
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        style={{ color: PRIMARY_ACCENT, fontSize: "1.1rem", marginBottom: "1.5rem" }}
      >
        Hiking on a mountain blends physical challenge with natural beauty.
      </motion.p>
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1.5rem",
        }}
      >
        <FeatureCard icon="⏰" label="~8 Hours" />
        <FeatureCard icon="🗺️" label="8 km" />
        <FeatureCard icon="⭐" label="Medium Level" />
      </motion.div>
    </motion.div>
  );
}

function FeatureCard({ icon, label }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.07 }}
      style={{
        background: "#f6faf8",
        color: TEXT_COLOR,
        borderRadius: 12,
        boxShadow: "0 1px 4px rgba(68,177,163,0.06)",
        padding: "0.5rem 1rem",
        minWidth: 70,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontSize: "1.1rem",
      }}
    >
      <span style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>{icon}</span>
      <span>{label}</span>
    </motion.div>
  );
}
