# Context Window Stress Tester

A lightweight, ultrafast web application designed to evaluate how Large Language Models (LLMs) handle various context injection scenarios. Built to test model robustness against irrelevant noise, conflicting data, and massive context duplication.

![Context Window Stress Tester](https://img.shields.io/badge/Status-Active-success) ![License](https://img.shields.io/badge/License-MIT-blue)

## 🚀 Features

- **Parallel Stress Testing**: Evaluates a base prompt against 4 distinct scenarios simultaneously:
  1. Clean Prompt (Baseline)
  2. Irrelevant Noise (Distraction test)
  3. Conflicting Info (Logic resilience test)
  4. Large Duplicate Context (Attention span test)
- **Deep Metrics Dashboard**: Tracks:
  - **Tokens Per Second (TPS)**: Stream speed metrics.
  - **Token Breakdown**: Prompt vs. Completion tokens.
  - **Noise Ratio**: Percentage of the prompt that is injected noise.
  - **Response Time**: Millisecond-level latency tracking.
- **Hallucination Detection**: Built-in heuristic check to flag if the model got confused or hallucinated due to the injected noise.
- **Modern UI**: A responsive, split-view dashboard built with CSS Grid and beautiful glassmorphism aesthetics.

## 🛠️ Tech Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript
- **Backend**: Python (Flask)
- **AI Inference**: [Groq API](https://groq.com/) (using the ultra-fast `llama-3.1-8b-instant` model)
- **Deployment**: Vercel (Configured via `vercel.json` for Serverless Python + Static Routing)

## 💻 Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/JXPJXT/ContextWindowStressTester.git
   cd ContextWindowStressTester
   ```

2. **Set up Environment Variables**
   Create a `.env` file in the root directory and add your Groq API key:
   ```env
   GROQ_API_KEY=your_actual_groq_api_key_here
   ```

3. **Install Dependencies**
   Ensure you have Python installed, then run:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Server**
   ```bash
   npm start
   # OR
   python app.py
   ```

5. **Open the App**
   Navigate to `http://localhost:5000` in your browser.

## ☁️ Deploying to Vercel

This repository is pre-configured for instant deployment on Vercel via the `vercel.json` file.

1. Push your code to GitHub.
2. Go to [Vercel](https://vercel.com/) and click **Add New... > Project**.
3. Import this repository.
4. Go to **Environment Variables** and add:
   - Key: `GROQ_API_KEY`
   - Value: `<your-api-key>`
5. Click **Deploy**. Vercel will automatically serve the static files from `/public` at the edge and route `/api` traffic to the Python serverless function!

## 📝 License

This project is licensed under the MIT License.
