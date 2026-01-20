# 🌍 Bon Voyage – Smart Tourism Platform

A modern, AI-powered tourism web application built with **React + Vite** to help travelers explore popular destinations in **Odisha, India**. Features an intelligent AI assistant, interactive maps, itinerary generation, and a stunning visual experience.

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4.0-646CFF?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.2-38B2AC?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ✨ Features

### 🤖 AI-Powered Experience
- **AI Travel Assistant** – Get personalized travel recommendations, tips, and answers to your questions powered by Groq AI
- **Smart Recommendations** – AI-generated insights for each destination

### 🗺️ Interactive Exploration
- **Interactive Maps** – Explore destinations with MapLibre GL integration
- **50+ Real Destinations** – Comprehensive coverage of Odisha's tourist attractions
- **Search & Filter** – Easy discovery with smart search functionality

### 📅 Trip Planning Tools
- **Itinerary Generator** – Create custom travel plans for your trip
- **Budget Calculator** – Plan your expenses effectively
- **Packing List** – Never forget essentials with smart packing suggestions
- **Weather Widget** – Real-time weather information for destinations
- **Best Time Calendar** – Know the optimal visiting times

### 💫 User Experience
- **Favorites System** – Save and organize your favorite destinations
- **Compare Destinations** – Side-by-side comparison of locations
- **Photo Galleries** – Beautiful imagery with progressive loading
- **Reviews Section** – User reviews and ratings
- **Smooth Animations** – Powered by Framer Motion

---

## 🏞️ Popular Destinations Included

| Temple & Heritage | Nature & Wildlife | Beach & Water |
|------------------|-------------------|---------------|
| Konark Sun Temple | Similipal National Park | Chilika Lake |
| Jagannath Temple, Puri | Satkosia Gorge | Puri Beach |
| Lingaraj Temple | Bhitarkanika | Chandipur Beach |
| Udayagiri & Khandagiri Caves | Nandankanan Zoo | Gopalpur Beach |
| Dhauli Peace Pagoda | Hirakud Dam | Talasari Beach |

...and **40+ more locations** 🎉

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Groq API Key (free at [console.groq.com](https://console.groq.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/bon-voyage.git
   cd bon-voyage
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your Groq API key:
   ```
   VITE_GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

---

## 📁 Project Structure

```
bon-voyage/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── AIAssistant.jsx
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── MapView.jsx
│   │   └── ...
│   ├── pages/            # Route pages
│   │   ├── Home.jsx
│   │   ├── Location.jsx
│   │   ├── ItineraryGenerator.jsx
│   │   └── ...
│   ├── contexts/         # React contexts
│   ├── data/             # Static data & locations
│   ├── services/         # API services
│   └── utils/            # Helper utilities
├── public/               # Static assets
├── server/               # Backend server (optional)
└── scripts/              # Build scripts
```

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 18, Vite 5 |
| **Styling** | Tailwind CSS, Custom CSS |
| **Animation** | Framer Motion |
| **Maps** | MapLibre GL, React Map GL |
| **AI** | Groq API |
| **Icons** | Lucide React |
| **Routing** | React Router v6 |

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## 🌐 Deployment

This project is configured for easy deployment on **Netlify**:

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set environment variables in Netlify dashboard:
   - `VITE_GROQ_API_KEY` = your Groq API key
4. Deploy!

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Tourism data sourced from official Odisha Tourism resources
- Weather data from OpenWeatherMap
- AI powered by Groq
- Maps powered by MapLibre

---

<p align="center">
  Made with ❤️ for travelers exploring Odisha
</p>
