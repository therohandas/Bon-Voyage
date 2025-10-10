import React, {useState, useEffect} from "react";
import ItineraryPlanner from "../components/ItineraryPlanner";

export default function ItineraryGenerator(){
  return (
    <div className="min-h-screen bg-black text-gray-200">
      <main className="max-w-5xl mx-auto p-6">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-semibold">Plan Your Trip</h1>
          <p className="mt-2 text-gray-300">Tell us what you love — beaches, wildlife, temples, or offbeat trails — and we’ll suggest a curated route. Use our itinerary generator to build a day-by-day plan, then tweak it, save it or export it.</p>
        </header>
        <ItineraryPlanner />
      </main>
    </div>
  )
}