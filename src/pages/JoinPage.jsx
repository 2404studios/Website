import React, { useState, useCallback } from "react";
import { Toaster, toast } from "sonner";
import confetti from "canvas-confetti";
import { motion } from 'framer-motion';

export default function JoinPage({ isActive }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("idle");

  const fireConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setStatus("loading");

      if (window.mcCallback) delete window.mcCallback;

      const url =
        "https://gmail.us9.list-manage.com/subscribe/post-json?u=fe7eeb857b2fecdf9636756e3&id=38a09397b2&f_id=005855e1f0";

      const params = new URLSearchParams({
        EMAIL: email,
        FNAME: name,
        "b_fe7eeb857b2fecdf9636756e3_38a09397b2": "",
      });

      const script = document.createElement("script");
      script.src = `${url}&${params.toString()}&c=mcCallback`;
      script.async = true;

      window.mcCallback = function (data) {
        if (data.result === "success") {
          setStatus("success");
          setEmail("");
          setName("");

          fireConfetti();

          toast.success("You’re in 🚀", {
            description: "Welcome to 2404 Originals",
          });
        } else {
          setStatus("error");
          toast.error("Something went wrong. Try again.");
        }
      };

      document.body.appendChild(script);
    },
    [email, name]
  );

  return (
    <div
      className="relative min-h-dvh px-4 py-10 pb-24 overflow-y-auto flex flex-col justify-center"
      style={{ fontFamily: "'Archivo', sans-serif" }}
    >
      {/* Toasts */}
      <Toaster
        position="top-center"
        richColors
        toastOptions={{
          style: {
            background: "rgba(20,0,51,0.9)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.15)",
            backdropFilter: "blur(10px)",
          },
        }}
      />

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/backgroundlt.png')" }}
      />

      {/* MAIN CONTENT */}
      <motion.div
        className="relative w-full max-w-4xl text-center text-white mx-auto pb-10"
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={isActive ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 40 }}
        transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
      >

        {/* TITLE */}
        <div className="border border-white/20 bg-black/30 backdrop-blur-sm rounded-xl p-4 md:p-5 mb-2 md:mb-6">
          <h1 className="text-3xl md:text-5xl font-bold">JOIN US</h1>
        </div>

        {/* INFO */}
        <div className="border border-white/20 bg-black/30 backdrop-blur-sm rounded-xl p-4 md:p-6 mb-4 md:mb-6">
          <p className="text-sm md:text-base text-white font-bold max-w-2xl mx-auto leading-relaxed">
            Welcome... Finally You are here. <br /> Wondering what we have in store for you?<br /> Keep reading:
          </p>

          {/* FEATURES */}
          <div className="flex flex-col md:flex-row gap-3 mt-2 mb-0 justify-center">
            <div className="border border-white/20 bg-white/5 px-4 py-3 text-sm font-bold rounded-md flex items-center gap-4">
              <img src="/movie_clipper.svg" className="w-10 h-8 flex-shrink-0" />
              <span className="text-left">Exclusive BTS(not the music band) content.</span>
            </div>

            <div className="border border-white/20 bg-white/5 px-4 py-3 text-sm font-bold rounded-md flex items-center gap-4">
              <img src="/logo.svg" className="w-10 h-8 flex-shrink-0" />
              <span className="text-left">2404 Network account with early bonuses Unlocked.</span>
            </div>

            <div className="border border-white/20 bg-white/5 px-4 py-3 text-sm font-bold rounded-md flex items-center gap-4">
              <img src="/crown.svg" className="w-10 h-8 flex-shrink-0" />
              <span className="text-left">The Original badge. Permanent.</span>
            </div>
          </div>
        </div>

        {/* SUBTEXT */}
        <p className="italic text-white mb-8">
          Sign Up To Get Started...
        </p>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl mx-auto flex flex-col gap-3"
        >
          {/* Inputs */}
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full md:flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white text-sm outline-none focus:ring-2 focus:ring-white/40"
            />

            <input
              type="email"
              placeholder="youremail@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full md:flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white text-sm outline-none focus:ring-2 focus:ring-white/40"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full md:w-auto md:self-center px-8 py-3 rounded-full bg-white text-black font-bold text-sm transition-all hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-70 disabled:scale-95 uppercase"
          >
            {status === "loading" && (
              <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
            )}

            <span>{status === "loading" ? "Joining" : "SIGN UP"}</span>
          </button>
        </form>

        {/* FOOTNOTE */}
        <p className="text-xs text-white/40 mt-6">
          Terms & Conditions Apply
        </p>
      </motion.div>
    </div>
  );
}