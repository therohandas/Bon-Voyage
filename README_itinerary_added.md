## Itinerary generator & AI proxy

A new page `/itinerary-generator` was added to the React app (src/pages/ItineraryGenerator.jsx) and a UI component (src/components/ItineraryPlanner.jsx).

**AI integration**
For safety, the frontend calls a local proxy at `/api/generate`. Start the proxy server in the project root:

1. `cd server`
2. `npm install express node-fetch dotenv`
3. Create a `.env` file based on `.env.example` and set `HF_API_TOKEN` to your Hugging Face token (do NOT commit it).
4. `node proxy.js`

Then run your React dev server (`npm run dev` or similar). The planner will send prompt-based requests to the Hugging Face inference API via the proxy.