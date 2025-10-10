import React from "react";

export default function FeaturedGrid({ items }) {
  return (
    <section id="featured" className="pt-10 pb-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Featured Destinations</h2>
          <a href="/destinations" className="text-sm text-indigo-300 hover:underline">
            View all
          </a>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((d) => (
            <a
              key={d.id}
              href={d.href || "#"}
              className="group block rounded-xl overflow-hidden bg-gradient-to-br from-[#1a1f1a]/80 to-[#222b22]/70 border border-white/5 transform hover:scale-[1.01] transition duration-200"
            >
              {/* Image placeholder (replace src later) */}
              <div className="h-44 md:h-48 w-full overflow-hidden">
                <img
                  src={d.image || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"}
                  alt={d.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-txt1">{d.title}</h3>
                <p className="mt-2 text-sm text-txt2">
                  Click to see details, timings, tips & route info.
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
