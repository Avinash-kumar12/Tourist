# TouristBuddy ✈️ - AI-Powered Travel Companion & Guide Marketplace

TouristBuddy is a modern, comprehensive web application designed to help travelers plan their trips across India. It integrates advanced generative AI features with a localized guide marketplace to create a seamless, end-to-end travel experience.

---

## 🚀 Key Features

* **🤖 AI-Powered Travel Chatbot**: Engage with a travel assistant powered by the Google Gemini API (`gemini-2.5-flash`). It provides warm, concise, and structured advice about sightseeing, street food, budget estimations, safety precautions, and local culture across India (with full Markdown support in the UI).
* **🗺️ Dynamic Itinerary Planner**: Auto-generate custom day-by-day itineraries based on days, budget, interests, and destination. Includes summaries, packing tips, budget estimations, and geographic coordinates for all tourist attractions.
* **👤 Local Guide Marketplace**: Search and book local verified guides across different cities. Guides can manage their operations, languages, specialties, availability, and pricing.
* **💼 Personalized Dashboard**: Centralized management panel for tourists to view their planned trips, booking history, and for guides to approve or decline tourist requests and manage their profile details.
* **💾 Smart Database Fallback**: Built-in NLP keyword matching (`natural` library) fallback that automatically uses a curated local MongoDB dataset if the Gemini API key is missing, rate-limited, or offline.

---

## 🛠️ Technology Stack

### Frontend
* **Core**: React 19 (Hooks, Context API)
* **Build Tool**: Vite
* **Routing**: React Router DOM (v7)
* **Styling**: Tailwind CSS v4
* **Icons**: Lucide React
* **HTTP Client**: Axios

### Backend
* **Runtime**: Node.js & Express.js
* **Database**: MongoDB & Mongoose ODM
* **AI Engine**: Google Generative AI SDK (`@google/generative-ai`)
* **Text Similarity / NLP**: Natural (`natural` npm package)
* **Security & Auth**: JWT (JSON Web Tokens) & bcryptjs
* **Environment Configuration**: Dotenv

---

## 📁 Project Structure

```
TouristBuddy/
├── backend/                  # Node.js + Express Backend
│   ├── config/               # Database connectivity configurations
│   ├── controllers/          # Request handlers (auth, chat, trip, buddy)
│   ├── middlewares/          # Auth protection & error handlers
│   ├── models/               # MongoDB Mongoose schemas
│   ├── routes/               # API endpoints declarations
│   ├── scripts/              # Seed scripts for local knowledge fallback
│   ├── services/             # Core service layer (AI client, itinerary helpers)
│   ├── server.js             # Express application root
│   └── .env                  # Backend environment variables
│
├── frontend/                 # React + Vite Frontend
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # Reusable layout and UI components
│   │   ├── context/          # Auth context provider
│   │   ├── pages/            # Page templates (Dashboard, Marketplace, Chat, Planner)
│   │   ├── services/         # Axios API clients
│   │   ├── App.jsx           # Routing & layout assembly
│   │   └── main.jsx          # Frontend entrypoint
│   └── vite.config.js        # Vite configuration
│
└── README.md                 # Project Documentation
```

---

## ⚙️ Installation & Setup

### Prerequisites
* **Node.js** (v18+ recommended)
* **MongoDB** (Local instance or MongoDB Atlas cluster connection)
* **Google Gemini API Key** (Obtained from [Google AI Studio](https://aistudio.google.com/))

### 1. Clone & Set Up Backend
Navigate to the `backend` directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the root of the `backend` folder (you can use `.env.example` as a template):
```env
PORT=5000
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/touristbuddy
JWT_SECRET=your_jwt_signing_key_here
GEMINI_API_KEY=your_google_gemini_api_key_here
```

Seed the fallback knowledge database (creates the collections and initial travel fallback data for cities):
```bash
node scripts/seedKnowledge.js
```

Start the backend development server:
```bash
npm run dev
```
The backend server will run on `http://localhost:5000`.

### 2. Set Up Frontend
Navigate to the `frontend` directory:
```bash
cd ../frontend
```

Install dependencies:
```bash
npm install
```

Start the frontend development server:
```bash
npm run dev
```
The frontend application will compile and be available on `http://localhost:5173`.

---

## 🛡️ License

This project is open-source and available under the MIT License.