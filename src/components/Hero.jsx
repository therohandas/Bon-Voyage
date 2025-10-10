import React from "react";

export default function Hero(){ 
  return (
    <header className="relative w-full overflow-hidden">
      <div className="relative h-[70vh] md:h-screen w-full">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://videos.pexels.com/video-files/32143673/13705226_2560_1440_24fps.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{ maxHeight: "100vh" }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex items-center justify-center h-full px-6">
          <div className="max-w-4xl w-full mx-auto text-center">
            <div className="inline-block bg-white/10 backdrop-blur-md rounded-[18px] p-6 md:p-10 shadow-soft border border-white/10">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">Bon Voyage</h1>
              <p className="mt-3 md:mt-4 text-base md:text-lg text-txt2">Seamless exploration beyond boundaries</p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <a href="/explore" className="px-4 py-2 rounded-full border border-white/20 hover:bg-white/5 transition text-sm font-medium">Explore Destinations</a>
                <a href="/itinerary-generator" className="px-4 py-2 rounded-full border border-white/20 hover:bg-white/5 transition text-sm font-medium">Plan My Trip</a>
                <a href="/gallery" className="px-4 py-2 rounded-full border border-white/20 hover:bg-white/5 transition text-sm font-medium">Gallery</a>
                <a href="/contact" className="px-4 py-2 rounded-full border border-white/20 hover:bg-white/5 transition text-sm font-medium">Contact Us</a>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20">
          <a href="#featured" className="text-sm text-gray-200/90 hover:text-white">↓ Explore featured destinations</a>
        </div>
      </div>
    </header>
  )
}