"use client";

import React, { memo, useState } from "react";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { cn } from "@/lib/utils";

// FAQ Item component with accordion
const FAQItem = memo(function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        "group border border-white/10 rounded-2xl overflow-hidden",
        "transition-all duration-300",
        isOpen ? "bg-white/10" : "bg-white/5 hover:bg-white/8"
      )}
    >
      <button
        onClick={onToggle}
        className="w-full p-6 md:p-8 text-left flex items-start justify-between gap-4"
        data-cursor-hover
      >
        <h3 className="font-harmond text-xl md:text-2xl font-bold text-white pr-4">
          {question}
        </h3>
        <div
          className={cn(
            "flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300",
            isOpen
              ? "border-neon-cyan text-neon-cyan rotate-45"
              : "border-white/30 text-white/50"
          )}
        >
          <span className="text-2xl leading-none">+</span>
        </div>
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-500 ease-out",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-6 md:px-8 pb-6 md:pb-8">
          <div className="w-12 h-px bg-gradient-to-r from-neon-pink to-transparent mb-4" />
          <p className="font-nohemi text-base md:text-lg text-white/70 leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
});

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How far in advance should I book?",
      answer: "We recommend booking 6-12 months in advance for weddings and major events, especially during peak season (May-October). However, we can often accommodate last-minute bookings depending on availability. Contact us as soon as you have your date confirmed!",
    },
    {
      question: "What areas do you serve?",
      answer: "We primarily serve New Jersey and the surrounding tri-state area, including parts of New York and Pennsylvania. We're happy to travel for destination events - contact us to discuss your location and any additional travel fees that may apply.",
    },
    {
      question: "Do you take song requests?",
      answer: "Absolutely! We encourage you to create a playlist of must-play songs and a do-not-play list. We'll work with you during planning to understand your musical preferences and create the perfect soundtrack for your event. We also read the crowd and adjust on the fly to keep the energy high.",
    },
    {
      question: "What equipment do you provide?",
      answer: "We provide professional-grade DJ equipment including premium sound systems, wireless microphones, and dynamic LED lighting. We can also arrange for additional equipment like fog machines, photo booths, and special effects based on your needs and package selection.",
    },
    {
      question: "Can you MC our event?",
      answer: "Yes! Our professional MC services are included with all packages. We'll coordinate with your event timeline, make announcements, introduce special moments, and keep your guests engaged throughout the celebration. We work closely with you to ensure every detail is executed perfectly.",
    },
    {
      question: "What is your pricing structure?",
      answer: "Our pricing varies based on event type, duration, location, and equipment needs. Wedding packages typically start at $1,500, while private parties and corporate events vary based on requirements. Contact us for a personalized quote - we'll work with you to create a package that fits your budget and vision.",
    },
    {
      question: "Do you have backup equipment?",
      answer: "Yes! We always bring backup equipment to every event including spare laptops, controllers, speakers, and cables. We take reliability seriously and are prepared for any technical situation to ensure your event goes smoothly without interruption.",
    },
    {
      question: "What genres of music do you play?",
      answer: "We're versatile and play all genres including Top 40, Hip-Hop, EDM, Rock, Country, Latin, Bollywood, Classic Hits, and more. Our extensive music library and experience with diverse events means we can cater to any audience and seamlessly blend different styles throughout the night.",
    },
  ];

  return (
    <section
      id="faq"
      className="relative min-h-screen w-full py-32 md:py-48 bg-black"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-white opacity-[0.02]" />

      <div className="swiss-container relative z-10">
        {/* Encrypted header */}
        <h2 className="font-harmond text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white mb-8 text-center">
          <EncryptedText
            text="Booking FAQ"
            encryptedClassName="text-white/30"
            revealedClassName="text-white"
            revealDelayMs={40}
          />
        </h2>

        {/* Description */}
        <div className="space-y-6 font-nohemi text-lg md:text-xl leading-relaxed text-white/60 max-w-3xl mb-16 mx-auto text-center">
          <p>
            Got questions? We&apos;ve got answers. Here are the most common questions we receive about our{" "}
            <span className="text-white font-semibold">
              DJ and entertainment services
            </span>
            .
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {faqs.map((faq, idx) => (
            <FAQItem
              key={idx}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 p-8 md:p-12 rounded-2xl border border-white/10 bg-white/5 text-center max-w-4xl mx-auto">
          <h3 className="font-harmond text-3xl md:text-4xl font-bold text-white mb-4">
            Still Have Questions?
          </h3>
          <p className="font-nohemi text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            We&apos;re here to help! Get in touch with us and we&apos;ll answer any questions you have about your upcoming event.
          </p>
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-3 px-8 py-4 font-nohemi text-base font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-neon-orange via-neon-pink to-neon-cyan rounded-full hover:opacity-90 transition-all duration-300"
            data-cursor-hover
          >
            <span className="relative z-10">Contact Us</span>
            <span className="relative z-10 text-xl">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}


