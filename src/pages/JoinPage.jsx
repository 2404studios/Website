import React, { useState, useCallback, useEffect } from "react";
import { Toaster, toast } from "sonner";
import confetti from "canvas-confetti";

export default function JoinPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("idle");

  // 🔥 Wake up server on load (Render sleep fix)
  useEffect(() => {
    fetch("https://waitlist-v0.onrender.com/healthz").catch(() => {});
  }, []);

  const fireConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  // ✅ NEW submit handler (replaces Mailchimp)
 const handleSubmit = useCallback(
  async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(
        "https://waitlist-v0.onrender.com/waitlist",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
          }),
        }
      );

      const data = await res.json();

      // 🔴 Handle duplicate email (409)
      if (res.status === 409) {
        setStatus("idle");
        toast.error("You’re already on the waitlist 👀");
        return;
      }

      // 🔴 Other errors
      if (!res.ok) {git status
        throw new Error(data?.message || "Failed to join waitlist");
      }

      // ✅ success
      setStatus("success");
      setName("");
      setEmail("");

      fireConfetti();

      toast.success("You’re in 🚀", {
        description: "Welcome to 2404 Originals",
      });

    } catch (err) {
      console.error(err);
      setStatus("error");

      toast.error("Something went wrong. Try again.");
    }
  },
  [name, email]
);


  return (
    <div
      className="relative min-h-dvh px-4 py-10 pb-24 overflow-y-auto flex flex-col justify-center"
      style={{ fontFamily: "'Inter', sans-serif" }}
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
      <div className="relative w-full max-w-4xl text-center text-white mx-auto pb-10">

        {/* TITLE */}
        <div className="border border-white/20 bg-white/5 rounded-xl p-4 md:p-5 mb-2 md:mb-6">
          <h1 className="text-3xl md:text-5xl font-bold">JOIN US</h1>
        </div>

        {/* INFO */}
        <div className="border border-white/20 rounded-xl p-4 md:p-6 mb-4 md:mb-6">
          <p className="text-sm md:text-base text-white font-bold max-w-2xl mx-auto leading-relaxed">
            Welcome... Finally You are here. <br /> Wondering what we have in store for you?<br /> Keep reading:
          </p>

          {/* FEATURES */}
          <div className="flex flex-col md:flex-row gap-3 mt-2 mb-0 justify-center">
            <div className="border border-white/20 px-4 py-3 text-xs font-bold rounded-md flex items-center gap-2">
              <img src="/movie_clipper.svg" className="w-10 h-8" />
              Exclusive BTS(not the music band) content.
            </div>

            <div className="border border-white/20 px-4 py-3 text-xs font-bold rounded-md flex items-center gap-1">
              <img src="/logo.svg" className="w-10 h-8" />
              2404 Network account with early bonuses Unlocked.
            </div>

            <div className="border border-white/20 px-4 py-3 text-xs font-bold rounded-md flex items-center gap-2">
              <img src="/crown.svg" className="w-10 h-8" />
              The Original badge. Permanent.
            </div>
          </div>
        </div>

        {/* SUBTEXT */}
        <p className="italic text-white mb-2">
          Sign Up To Get Started...
        </p>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl mx-auto flex flex-col gap-3"
        >
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

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full md:w-auto md:self-center px-8 py-3 rounded-full bg-white text-black font-semibold text-sm transition-all hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-70 disabled:scale-95"
          >
            {status === "loading" && (
              <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
            )}
            <span>{status === "loading" ? "Joining" : "Sign Up"}</span>
          </button>
        </form>

        <p className="text-xs text-white/40 mt-6">
          Terms & Conditions Apply
        </p>
      </div>
    </div>
  );
}