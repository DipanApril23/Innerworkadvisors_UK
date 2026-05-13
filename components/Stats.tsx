"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        opacity: 0,
        y: 80,
        scale: 0.9,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
      });

      gsap.to(".floating-bg", {
        y: -40,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    {
      number: "500+",
      label: "NRIs Served",
      description: "Successfully resolved cases",
      icon: "👥",
    },
    {
      number: "15+",
      label: "Years Experience",
      description: "Combined expertise",
      icon: "📅",
    },
    {
      number: "98%",
      label: "Client Satisfaction",
      description: "Positive outcomes",
      icon: "⭐",
    },
    {
      number: "24/7",
      label: "Support Available",
      description: "Round the clock assistance",
      icon: "🕐",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 bg-black text-white"
    >
      {/* Animated background blobs */}
      <div className="floating-bg absolute top-20 left-10 w-72 h-72 bg-white/5 blur-3xl rounded-full" />
      <div className="floating-bg absolute bottom-10 right-10 w-96 h-96 bg-white/5 blur-3xl rounded-full" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2
            initial={{ letterSpacing: "-2px" }}
            animate={isInView ? { letterSpacing: "0px" } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Our Impact in Numbers
          </motion.h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Delivering excellence through dedicated service, measurable results,
            and client-first support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{
                y: -12,
                scale: 1.03,
                rotateX: 6,
                rotateY: -6,
              }}
              transition={{ type: "spring", stiffness: 200 }}
              className="stat-card group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl overflow-hidden"
            >
              {/* glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-white/10 to-transparent" />

              <div className="relative z-10 text-center">
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.15 }}
                  className="text-5xl mb-5"
                >
                  {stat.icon}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    delay: index * 0.15,
                    duration: 0.6,
                    type: "spring",
                  }}
                  className="text-5xl font-extrabold mb-3"
                >
                  {stat.number}
                </motion.div>

                <h3 className="text-xl font-semibold mb-2">{stat.label}</h3>
                <p className="text-sm text-gray-400">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}