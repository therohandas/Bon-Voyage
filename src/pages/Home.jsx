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

export default function GallerySection() {
        const galleryImages = [
  'https://plus.unsplash.com/premium_photo-1661964177687-57387c2cbd14?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D 870w',
  'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/c2/5f/39/caption.jpg?w=1200&h=-1&s=1&cx=1920&cy=1080&chk=v1_9a7dafbb03426bb9c2d9',
  'https://www.visitlondon.com/-/media/images/london/visit/general-london/westminster-at-dusk-london-1280x720.jpg?rev=3c05b9713c4b4405a7ab61aaeba53636&mw=800&hash=061A930869789795BC82B1A060E14562',
  'https://i.natgeofe.com/k/6eb7149d-9876-40ac-9bf7-d261931ddb56/poland-warsaw.jpg?wp=1&w=1084.125&h=609',
  'https://cdn.britannica.com/26/84526-050-45452C37/Gateway-monument-India-entrance-Mumbai-Harbour-coast.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHwenQCmjlvBs-F6W_HSPTNy591xv52uXmHGsjONkqEK3QwDWmILSF6kgc9LlCIEswPdU&usqp=CAU',
  'https://www.worldatlas.com/r/w1200/upload/be/27/cd/shutterstock-725596186.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNwQyOF2E9JOF4i-2aKMNwHHXH-Qz8AYBdaw&s'
];

<section id="gallery" className="pt-8 pb-12">
  <div className="max-w-6xl mx-auto px-4">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold">Travel Gallery</h2>
      <a href="/gallery" className="text-sm text-indigo-300 hover:underline">See full gallery</a>
    </div>

    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {galleryImages.map((img, i) => (
        <div key={i} className="relative h-48 rounded-lg overflow-hidden border border-white/6">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
          />
          <div className="absolute left-0 right-0 bottom-0">
            <div className="bg-gradient-to-t from-black/70 to-black/10 p-3">
              <p className="text-sm font-medium"> {i + 1}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
        );
}

      </main>
    </div>
  )
}
