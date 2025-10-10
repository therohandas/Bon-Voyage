import React from "react";
import Hero from "../components/Hero";
import FeaturedGrid from "../components/FeaturedGrid";
import "../index.css";

const featured = [
  { 
    id: 1, 
    title: "Puri (Jagannath Temple)", 
    href: "/location/jagannath-temple",
    image: "https://shorturl.at/6jkpi" // replace later
  },
  { 
    id: 2, 
    title: "Konark Sun Temple", 
    href: "/location/konark-sun-temple",
    image: "https://shorturl.at/LubwT"
  },
  { 
    id: 3, 
    title: "Chilika Lake", 
    href: "/location/chilika-lake",
    image: "https://tinyurl.com/2w6xekkr"
  },
  { 
    id: 4, 
    title: "Simlipal National Park", 
    href: "/location/simlipal-national-park",
    image: "https://tinyurl.com/mtf7t69p"
  },
  { 
    id: 5, 
    title: "Gopalpur-on-Sea", 
    href: "/location/gopalpur-on-sea",
    image: "https://tinyurl.com/mr4abzha"
  },
  { 
    id: 6, 
    title: "Raghurajpur Artist Village", 
    href: "/location/raghurajpur-artist-village",
    image: "https://tinyurl.com/ytrrn4rf"
  }
];

export default function Home(){
  return (
    <div className="min-h-screen bg-bg0 text-txt1 antialiased">
      <Hero />
      <main className="px-6 md:px-12 lg:px-20 -mt-8">
        <FeaturedGrid items={featured} />
        <section id="map" className="pt-6 pb-10">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold">Map</h2>
            <p className="mt-2 text-sm text-txt2">Explore India — click markers on destination pages for more details.</p>
            <div className="mt-4 w-full h-72 md:h-80 rounded-lg overflow-hidden border border-white/10">
              <iframe title="India map" src="https://www.openstreetmap.org/export/embed.html?bbox=68.176645%2C6.747139%2C97.402561%2C35.494009&layer=mapnik" className="w-full h-full" style={{ border: 0 }} />
            </div>
          </div>
        </section>

        <section id="plan" className="pt-8 pb-10">
          <div className="max-w-6xl mx-auto px-4 bg-gradient-to-b from-neutral-900/60 to-transparent p-6 md:p-8 rounded-lg border border-white/6">
            <div className="md:flex md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold">Plan Your Trip</h2>
                <p className="mt-2 text-txt2 max-w-2xl">Tell us what you love — beaches, wildlife, temples, or offbeat trails — and we’ll suggest a curated route. Use our itinerary generator to build a day-by-day plan, then tweak it, save it or export it.</p>
              </div>
              <div className="mt-4 md:mt-0">
                <a href="/itinerary-generator" className="inline-block px-6 py-3 rounded-md bg-emerald-600 hover:bg-emerald-500 font-semibold">Open Itinerary Generator</a>
              </div>
            </div>
          </div>
        </section>

        <section id="gallery" className="pt-8 pb-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Travel Gallery</h2>
              <a href="/gallery" className="text-sm text-indigo-300 hover:underline">See full gallery</a>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({length:8}).map((_,i) => (
                <div key={i} className="relative h-48 bg-gray-800 rounded-lg overflow-hidden border border-white/6">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'300\\'><rect width=\\'100%\\' height=\\'100%\\' fill=\\'%23343d46\\' /></svg>')] bg-cover bg-center" />
                  <div className="absolute left-0 right-0 bottom-0">
                    <div className="bg-gradient-to-t from-black/70 to-black/10 p-3">
                      <p className="text-sm font-medium">Location {i+1}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}