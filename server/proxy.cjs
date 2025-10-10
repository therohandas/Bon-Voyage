/**
 * Simple Express proxy to call Hugging Face Inference API securely using an environment variable.
 * Usage:
 *   - npm install express node-fetch dotenv
 *   - set HF_API_TOKEN in your environment (do NOT commit it)
 *   - node server/proxy.js
 */
const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5174;
const HF_TOKEN = process.env.HF_API_TOKEN;

if(!HF_TOKEN){
  console.warn("Warning: HF_API_TOKEN not set. Proxy will return an error for AI requests.");
}

app.use(express.json());
app.post("/api/generate", async (req, res) => {
  if(!HF_TOKEN) return res.status(500).json({error:"HF_API_TOKEN not configured on server."});
  const model = "mistral-7b-instruct-v0.3";
  // Build a prompt from the incoming JSON
  const body = req.body || {};
  const prompt = `Create a ${body.days}-day itinerary for ${body.destination || "a destination"}. Travel type: ${body.travelType}. Travel style: ${body.travelStyle}. Interests: ${JSON.stringify(body.interests)}. Tone: ${body.tone}. Budget per day: ${body.budget}. Generate an array of day objects with title, subtitle, and activities (each activity with name, time, place). Return JSON only.`;
  try{
    const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
      method: "POST",
      headers: { "Authorization": "Bearer " + HF_TOKEN, "Content-Type": "application/json" },
      body: JSON.stringify({ inputs: prompt, parameters: { max_new_tokens: 400, temperature: Math.min(1, Math.max(0, parseFloat(body.creativity) || 0.5)) } })
    });
    const text = await response.text();
    // The model might return plain text; try to extract JSON from it.
    let parsed = null;
    try{
      parsed = JSON.parse(text);
    }catch(e){
      // try to find JSON substring
      const m = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
      if(m) parsed = JSON.parse(m[0]);
      else {
        // fallback: send raw text
        return res.json({ raw: text });
      }
    }
    // If parsed is an object with generated_text, try to parse that
    if(parsed && parsed.generated_text){
      try{
        const inner = JSON.parse(parsed.generated_text);
        return res.json({ itinerary: inner });
      }catch(e){
        return res.json({ raw: parsed.generated_text });
      }
    }
    // If parsed is already an array or object that looks like itinerary
    return res.json({ itinerary: parsed });
  }catch(err){
    console.error(err);
    res.status(500).json({error: err.message});
  }
});

app.listen(PORT, ()=>console.log("Proxy listening on port",PORT));