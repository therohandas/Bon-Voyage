import React, { useState, useRef, useEffect } from "react";
import itineraryData from '../data/itineraryData.json'; // Import the JSON data

/**
 * Bon Voyage – Smart Itinerary Planner
 * Using external JSON data for itineraries
 */

function Chip({ label, checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={
        "px-3 py-1 mr-2 mb-2 rounded-full text-sm border " +
        (checked ? "bg-white/10 border-white/30" : "bg-transparent border-white/10")
      }
    >
      {label}
    </button>
  );
}

function DayCard({
  day,
  index,
  onRemove,
  onSwap,
  onActivityAdd,
  onDragStart,
  onDrop,
  draggable,
}) {
  // ensure activities is an array
  const activities = Array.isArray(day.activities) ? day.activities : [];

  return (
    <div
      className="bg-white/5 p-4 rounded-lg mb-3"
      draggable={draggable}
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e, index)}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium">
            Day {index + 1}: {day.title || "Planned Day"}
          </h3>
          <p className="text-sm text-gray-300">{day.subtitle || ""}</p>
        </div>
        <div className="flex gap-2">
          <button className="px-2 py-1 rounded text-sm bg-white/8" onClick={() => onSwap(index)}>
            Swap with next
          </button>
          <button className="px-2 py-1 rounded text-sm bg-rose-700/40" onClick={() => onRemove(index)}>
            Remove
          </button>
        </div>
      </div>

      <div className="mt-3">
        {activities.map((act, i) => (
          <div key={i} className="flex items-center justify-between bg-black/20 p-2 rounded mb-2">
            <div>
              <div className="font-medium">{act.name}</div>
              <div className="text-xs text-gray-300">{act.time || "Anytime"} • {act.place || "Location unknown"}</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="text-sm px-2 py-1 rounded"
                onClick={() => {
                  const newName = prompt("Edit activity name:", act.name);
                  if (newName != null) {
                    act.name = newName;
                    // no direct set here; parent can refresh state via addActivity(null) pattern if needed
                  }
                }}
              >
                Edit
              </button>
              <button
                className="text-sm px-2 py-1 rounded"
                onClick={() => {
                  if (confirm("Delete activity?")) {
                    activities.splice(i, 1);
                    onActivityAdd(null); // signal to parent to refresh state
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <div className="mt-2">
          <button className="px-3 py-1 rounded bg-white/8 text-sm" onClick={() => onActivityAdd(index)}>
            + Add activity
          </button>
        </div>
      </div>
    </div>
  );
}

function ItineraryPlanner() {
  const [destination, setDestination] = useState("");
  const [popular] = useState(["Goa", "Pondicherry", "Rishikesh", "Leh", "Darjeeling", "Jaipur"]);
  const [travelType, setTravelType] = useState("solo");
  const [travelStyle, setTravelStyle] = useState("budget");
  const [startDate, setStartDate] = useState("");
  const [days, setDays] = useState(3);
  const [flexible, setFlexible] = useState(false);
  const [people, setPeople] = useState(1);
  const [budget, setBudget] = useState(3000);
  const [interests, setInterests] = useState({
    beaches: false,
    wildlife: false,
    temples: false,
    food: false,
    nightlife: false,
    accessibility: false,
  });
  const [pace, setPace] = useState(3);
  const [mobilityFriendly, setMobilityFriendly] = useState(true);
  const [tone, setTone] = useState("relaxed");
  const [creativity, setCreativity] = useState(0.5);

  // itinerary state
  const [itinerary, setItinerary] = useState(() =>
    Array.from({ length: days }).map(() => ({ title: "", subtitle: "", activities: [] }))
  );

  const [loading, setLoading] = useState(false);

  const dragIndex = useRef(null);

  function onDragStart(e, idx) {
    dragIndex.current = idx;
  }

  function onDrop(e, idx) {
    const i = dragIndex.current;
    if (i == null) return;
    const copy = Array.isArray(itinerary) ? [...itinerary] : [];
    const [item] = copy.splice(i, 1);
    copy.splice(idx, 0, item);
    dragIndex.current = null;
    setItinerary(copy);
  }

  useEffect(() => {
    // When days change, automatically generate itinerary if destination exists
    if (destination.trim() && itineraryData[destination.toLowerCase()]) {
      generateItinerary();
    } else {
      // Otherwise just adjust the empty itinerary length
      setItinerary((prev) => {
        const copy = Array.isArray(prev) ? prev.slice(0, days) : [];
        while (copy.length < days) copy.push({ title: "", subtitle: "", activities: [] });
        return copy;
      });
    }
  }, [days]);

  function toggleInterest(key, val) {
    setInterests((prev) => ({ ...prev, [key]: val }));
  }

  function addActivity(dayIndex) {
    if (dayIndex == null) {
      setItinerary((prev) => (Array.isArray(prev) ? [...prev] : prev));
      return;
    }
    const name = prompt("Activity name (e.g., 'Beach time at Colva')") || "New Activity";
    const time = prompt("Time (e.g., 09:00 - 11:00)") || "Anytime";
    const place = prompt("Place / short location") || "";
    const copy = Array.isArray(itinerary) ? [...itinerary] : [];
    if (!copy[dayIndex]) copy[dayIndex] = { title: `Day ${dayIndex + 1}`, subtitle: "", activities: [] };
    if (!Array.isArray(copy[dayIndex].activities)) copy[dayIndex].activities = [];
    copy[dayIndex].activities.push({ name, time, place });
    setItinerary(copy);
  }

  function removeDay(idx) {
    if (!confirm("Remove this day?")) return;
    setItinerary((prev) => (Array.isArray(prev) ? prev.filter((_, i) => i !== idx) : prev));
    setDays((d) => Math.max(1, d - 1));
  }

  function swapWithNext(idx) {
    if (!Array.isArray(itinerary)) return;
    if (idx >= itinerary.length - 1) return;
    const copy = [...itinerary];
    [copy[idx], copy[idx + 1]] = [copy[idx + 1], copy[idx]];
    setItinerary(copy);
  }

  // Helper to safely get itinerary as an array
  function getItineraryArray() {
    if (Array.isArray(itinerary)) return itinerary;
    if (typeof itinerary === "string") {
      const parts = itinerary.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
      return parts.map((p, i) => ({ title: `Day ${i + 1}`, subtitle: p, activities: [{ name: p, time: "Anytime", place: "" }] }));
    }
    if (itinerary && typeof itinerary === "object") {
      return [{ title: "Server returned object", subtitle: JSON.stringify(itinerary), activities: [] }];
    }
    return [];
  }

  // Generate itinerary from JSON data
  async function generateItinerary() {
    if (!destination.trim()) {
      alert("Please enter a destination first!");
      return;
    }

    setLoading(true);
    
    try {
      // Normalize the destination name (lowercase, remove spaces)
      const normalizedDest = destination.toLowerCase().trim();
      
      // Find the itinerary data
      let itineraryDataForDest = itineraryData[normalizedDest];
      
      if (!itineraryDataForDest) {
        // Try to find partial match
        const possibleMatch = Object.keys(itineraryData).find(key => 
          normalizedDest.includes(key) || key.includes(normalizedDest)
        );
        
        if (possibleMatch) {
          itineraryDataForDest = itineraryData[possibleMatch];
          setDestination(possibleMatch.charAt(0).toUpperCase() + possibleMatch.slice(1)); // Auto-correct casing
        }
      }

      // Get the specific duration
      const durationKey = days.toString();
      let selectedItinerary = itineraryDataForDest?.[durationKey];
      
      if (!selectedItinerary) {
        // If exact duration not found, use default for that destination or general default
        selectedItinerary = itineraryDataForDest?.["3"] || itineraryData.default[durationKey] || itineraryData.default["3"];
        
        if (itineraryDataForDest) {
          alert(`No ${days}-day itinerary found for ${destination}. Showing 3-day itinerary instead.`);
        } else {
          alert(`No itinerary found for ${destination}. Showing default template.`);
        }
      }

      setItinerary(selectedItinerary);
      
    } catch (error) {
      console.error("Error generating itinerary:", error);
      alert("Error generating itinerary. Using default template.");
      setItinerary(itineraryData.default["3"] || []);
    } finally {
      setLoading(false);
    }
  }

  // Safe getters that use current itinerary state
  function downloadJSON() {
    const items = getItineraryArray();
    const blob = new Blob([JSON.stringify({ meta: { destination, startDate, days, travelType, travelStyle, people, budget }, itinerary: items }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "itinerary.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function downloadICS() {
    const items = getItineraryArray();
    const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//BonVoyage//Itinerary//EN"];
    let curDate = startDate ? new Date(startDate) : new Date();
    for (let i = 0; i < items.length; i++) {
      const day = items[i];
      const dt = new Date(curDate.getTime() + i * 24 * 60 * 60 * 1000);
      const iso = dt.toISOString().slice(0, 10).replace(/-/g, "");
      lines.push("BEGIN:VEVENT");
      lines.push("UID:" + Math.random().toString(36).slice(2) + "@bonvoyage");
      lines.push("DTSTAMP:" + new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z");
      lines.push("DTSTART;VALUE=DATE:" + iso);
      lines.push("DTEND;VALUE=DATE:" + iso);
      lines.push("SUMMARY:Day " + (i + 1) + " - " + (day.title || "Planned Day"));
      lines.push("DESCRIPTION:" + (Array.isArray(day.activities) ? day.activities.map((a) => a.name).join("\\n") : ""));
      lines.push("END:VEVENT");
    }
    lines.push("END:VCALENDAR");
    const blob = new Blob([lines.join("\r\n")], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "itinerary.ics";
    a.click();
    URL.revokeObjectURL(url);
  }

  function saveToAccount() {
    const items = getItineraryArray();
    const key = "bonvoyage_itinerary_" + (destination || "unsaved") + "_" + Date.now();
    localStorage.setItem(key, JSON.stringify({ meta: { destination, startDate, days, travelType, travelStyle, people, budget }, itinerary: items }));
    alert("Saved locally under key: " + key);
  }

  function exportPDF() {
    window.print();
  }

  // Use safe array for rendering
  const safeItinerary = getItineraryArray();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left controls */}
      <aside className="md:col-span-1 space-y-4">
        <div className="bg-white/5 p-4 rounded">
          <label className="block text-sm text-gray-300">Destination</label>
          <input 
            className="w-full mt-2 p-2 bg-transparent border border-white/10 rounded" 
            value={destination} 
            onChange={(e) => setDestination(e.target.value)} 
            placeholder="e.g., Goa" 
          />

          {/* Travel settings */}
          <div className="mt-4">
            <label className="block text-sm text-gray-300">Travel type</label>
            <div className="flex gap-2 mt-2">
              {["solo", "couple", "family", "friends"].map((t) => (
                <button 
                  key={t} 
                  onClick={() => setTravelType(t)} 
                  className={"px-3 py-1 rounded " + (travelType === t ? "bg-white/10" : "bg-transparent border border-white/10")}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* More controls */}
          <div className="mt-3">
            <label className="block text-sm text-gray-300">Start date</label>
            <input 
              type="date" 
              className="mt-2 p-2 bg-transparent border border-white/10 rounded" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
            />
            <div className="flex items-center gap-2 mt-2 text-sm">
              <label>Duration (days)</label>
              <select 
                value={days} 
                onChange={(e) => setDays(parseInt(e.target.value))} 
                className="p-1 bg-transparent border border-white/10 rounded"
              >
                <option value="1">1 Day</option>
                <option value="2">2 Days</option>
                <option value="3">3 Days</option>
                <option value="4">4 Days</option>
                <option value="5">5 Days</option>
                <option value="6">6 Days</option>
                <option value="7">7 Days</option>
                <option value="8">8 Days</option>
                <option value="9">9 Days</option>
                <option value="10">10 Days</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button 
              className="px-4 py-2 rounded bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-medium disabled:opacity-50 disabled:cursor-not-allowed" 
              onClick={generateItinerary}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Itinerary"}
            </button>
            <button 
              className="px-4 py-2 rounded border border-white/10" 
              onClick={() => { setItinerary(Array.from({ length: days }).map(() => ({ title: "", subtitle: "", activities: [] }))) }}
            >
              Reset
            </button>
          </div>
        </div>
      </aside>

      {/* Right output */}
      <section className="md:col-span-2">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-medium">
            {destination ? `${days}-Day Itinerary for ${destination}` : "Your Itinerary"}
          </h2>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded border" onClick={downloadJSON}>Download JSON</button>
            <button className="px-3 py-1 rounded border" onClick={downloadICS}>Download ICS</button>
            <button className="px-3 py-1 rounded border" onClick={exportPDF}>Export (Print)</button>
            <button className="px-3 py-1 rounded border" onClick={saveToAccount}>Save</button>
          </div>
        </div>

        <div>
          {safeItinerary.length > 0 ? (
            safeItinerary.map((day, idx) => (
              <DayCard
                key={idx}
                day={day}
                index={idx}
                onRemove={removeDay}
                onSwap={swapWithNext}
                onActivityAdd={addActivity}
                onDragStart={onDragStart}
                onDrop={onDrop}
                draggable={true}
              />
            ))
          ) : (
            <p className="text-gray-400 text-center mt-8">No itinerary available yet. Generate one using the button!</p>
          )}
        </div>

        <div className="mt-4">
          <button className="px-4 py-2 rounded bg-white/6" onClick={() => { 
            setItinerary((prev) => [...getItineraryArray(), { title: `Day ${getItineraryArray().length + 1}`, subtitle: "", activities: [] }]); 
            setDays((d) => d + 1); 
          }}>
            + Add Day
          </button>
        </div>
      </section>
    </div>
  );
}

export default ItineraryPlanner;