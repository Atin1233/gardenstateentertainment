"use client";

import React, { memo } from "react";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { cn } from "@/lib/utils";

// Testimonial card component
const TestimonialCard = memo(function TestimonialCard({
  quote,
  author,
  role,
  event,
  rating,
}: {
  quote: string;
  author: string;
  role: string;
  event: string;
  rating: number;
}) {
  return (
    <div
      className={cn(
        "group relative p-8 rounded-2xl border border-white/10 bg-white/5",
        "hover:border-neon-pink/30 hover:bg-white/10",
        "transition-all duration-500"
      )}
      data-cursor-hover
    >
      {/* Neon glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon-pink/10 via-neon-cyan/10 to-neon-orange/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      
      <div className="relative z-10">
        {/* Stars */}
        <div className="flex gap-1 mb-6">
          {[...Array(5)].map((_, idx) => (
            <span
              key={idx}
              className={cn(
                "text-2xl",
                idx < rating ? "text-neon-yellow" : "text-white/20"
              )}
            >
              ★
            </span>
          ))}
        </div>

        {/* Quote */}
        <blockquote className="font-nohemi text-lg text-white/80 leading-relaxed mb-6">
          &ldquo;{quote}&rdquo;
        </blockquote>

        {/* Author info */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-orange to-neon-pink flex-shrink-0" />
          <div>
            <div className="font-harmond text-xl font-bold text-white">
              {author}
            </div>
            <div className="font-nohemi text-sm text-white/60">{role}</div>
            <div className="font-nohemi text-xs text-neon-cyan mt-1">{event}</div>
          </div>
        </div>
      </div>
    </div>
  );
});

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Garden State Entertainment made our wedding absolutely perfect! The music selection was spot-on, and they kept everyone dancing all night long. Best decision we made for our big day!",
      author: "Sarah & Michael",
      role: "Newlyweds",
      event: "Wedding Reception",
      rating: 5,
    },
    {
      quote: "Professional, energetic, and incredibly talented. They transformed our corporate event into an unforgettable celebration. Our employees are still talking about it!",
      author: "Jennifer Martinez",
      role: "HR Director",
      event: "Company Holiday Party",
      rating: 5,
    },
    {
      quote: "My Sweet 16 was a dream come true thanks to Garden State Entertainment! They played all my favorite songs and got everyone involved. The lighting effects were amazing too!",
      author: "Emma Rodriguez",
      role: "Birthday Girl",
      event: "Sweet 16 Party",
      rating: 5,
    },
    {
      quote: "These guys know how to read a crowd! They seamlessly mixed different genres and kept the energy high throughout our entire anniversary party. Highly recommend!",
      author: "David & Lisa Chen",
      role: "Celebrating 25 Years",
      event: "Anniversary Celebration",
      rating: 5,
    },
    {
      quote: "From planning to execution, everything was flawless. The DJs were professional, the equipment was top-notch, and they made our daughter's graduation party one for the books!",
      author: "Robert Thompson",
      role: "Proud Father",
      event: "Graduation Party",
      rating: 5,
    },
    {
      quote: "Garden State Entertainment brought incredible energy to our fundraiser. They understood our audience perfectly and helped us create an atmosphere that encouraged giving. Outstanding service!",
      author: "Amanda Williams",
      role: "Event Coordinator",
      event: "Charity Fundraiser",
      rating: 5,
    },
  ];

  return (
    <section
      id="testimonials"
      className="relative min-h-screen w-full py-32 md:py-48 bg-black"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-white opacity-[0.02]" />

      <div className="swiss-container relative z-10">
        {/* Encrypted header */}
        <h2 className="font-harmond text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white mb-8 text-center">
          <EncryptedText
            text="What Clients Say"
            encryptedClassName="text-white/30"
            revealedClassName="text-white"
            revealDelayMs={40}
          />
        </h2>

        {/* Description */}
        <div className="space-y-6 font-nohemi text-lg md:text-xl leading-relaxed text-white/60 max-w-3xl mb-16 mx-auto text-center">
          <p>
            Don&apos;t just take our word for it. Here&apos;s what our clients have to say about their{" "}
            <span className="text-white font-semibold">
              unforgettable experiences
            </span>{" "}
            with Garden State Entertainment.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, idx) => (
            <TestimonialCard key={idx} {...testimonial} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="font-nohemi text-white/60 mb-6">
            Ready to create your own unforgettable event?
          </p>
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-3 px-8 py-4 font-nohemi text-base font-semibold uppercase tracking-wider text-white bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300"
            data-cursor-hover
          >
            <span className="relative z-10">Book Your Date</span>
            <span className="relative z-10 text-xl">→</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-orange/20 via-neon-pink/20 to-neon-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
          </a>
        </div>
      </div>
    </section>
  );
}
