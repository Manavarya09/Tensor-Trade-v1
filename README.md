# Multi-Agent Trading Psychology API

AI-powered trading psychology analysis using 5 LLM debate council and behavioral pattern detection.

---

## 🚀 Quick Start

### Start Server
```bash
python -m uvicorn main:app --host 0.0.0.0 --port 8000
```

### Test API
```bash
curl -X POST "http://localhost:8000/analyze-asset?asset=AAPL"
```

### Python Example
```python
import requests

response = requests.post(
    "http://localhost:8000/analyze-asset",
    params={"asset": "TSLA", "user_id": "trader123"}
)

data = response.json()
print(f"P&L: ${data['trade_history']['total_pnl']:.2f}")
print(f"Win Rate: {data['trade_history']['win_rate']}%")
```

---

## 📋 Features

### 🤖 5-Agent LLM Council
- **🦅 Macro Hawk** - Macroeconomic analysis
- **🔬 Micro Forensic** - Fundamental analysis
- **💧 Flow Detective** - Market microstructure
- **📊 Tech Interpreter** - Technical analysis
- **🤔 Skeptic** - Risk assessment

### 🧠 Behavioral Pattern Detection
Detects 10 trading psychology patterns:
- Revenge trading
- Overtrading
- FOMO (Fear of Missing Out)
- Loss aversion
- Confirmation bias
- Recency bias
- Anchoring bias
- Herd mentality
- Overconfidence
- Analysis paralysis

### 📈 Economic Calendar Integration
- Real-time earnings dates
- Economic indicators (Fed, CPI, jobs)
- Market news headlines
- Sector-specific events

### 🎭 Intelligent Persona Selection
Auto-selects communication style:
- **Coach** - Supportive (struggling traders)
- **Professional** - Peer-level (winning traders)
- **Casual** - Friendly (new traders)
- **Analytical** - Data-focused (default)

---

## 🛠️ Tech Stack

- **FastAPI** - Async web framework
- **Pydantic** - Data validation
- **yfinance** - Market data & economic events
- **OpenRouter** - LLM orchestration (4 agents)
- **Mistral.ai** - Premium LLM (1 agent)
- **Groq** - Fast inference (narrator)

---

## 📡 API Endpoints

### POST /analyze-asset
**Recommended** - Simplified analysis with auto-generation

```bash
POST /analyze-asset?asset=AAPL&user_id=trader123
```

**Returns:**
- Trade history summary
- Economic calendar events
- Behavioral analysis
- 5-agent market debate
- AI-powered narrative

### POST /run-agents
**Legacy** - Full control over inputs

```bash
POST /run-agents
Content-Type: application/json

{
  "market_event": "SPY moved up 1.5%",
  "user_trades": [...],
  "persona_style": "professional"
}
```

### GET /health
Health check and service status

### GET /
API information and features

---

## 📂 Project Structure

```
deriv/
├── main.py                 # FastAPI server
├── agents/
│   ├── behaviour_agent.py  # Behavioral pattern detection
│   ├── narrator.py         # AI summary generation
│   ├── persona.py          # Communication styling
│   └── moderator.py        # Content moderation
├── llm_council/
│   ├── core/config.py      # LLM configuration
│   ├── models/schemas.py   # Data models
│   └── services/
│       ├── llm_client.py   # LLM provider abstraction
│       ├── agent_prompts.py # Agent system prompts
│       └── debate_engine.py # 5-agent orchestration
├── services/
│   ├── economic_calendar.py # Economic events
│   └── trade_history.py     # Trade database
└── API_REQUEST_FORMAT.md   # Complete API docs
```

---

## 🔧 Configuration

### Environment Variables
Create `.env` file:

```env
# OpenRouter (Free tier)
OPENROUTER_API_KEY=your_key_here

# Mistral.ai (Paid)
MISTRAL_API_KEY=your_key_here

# Groq (Free tier)
GROQ_API_KEY=your_key_here

# Optional
DATABASE_URL=postgresql://user:pass@localhost/db
REDIS_URL=redis://localhost:6379
```

### LLM Provider Configuration

**Free Tier:**
- OpenRouter: 4 agents (Mistral-7B, Mythomax-L2-13B)
- Groq: Narrator (Mixtral-8x7B)

**Paid:**
- Mistral.ai: 1 agent (mistral-large-latest)

---

## 🧪 Testing

### Run Test Suite
```bash
python test_integrated_workflow.py
```

### Test Simplified API
```bash
python test_simplified_api.py
```

### Quick Test
```bash
python quick_test_new_api.py
```

---

## 📖 Documentation

- **[API_REQUEST_FORMAT.md](API_REQUEST_FORMAT.md)** - Complete API reference with all endpoints, payloads, and response formats

---

## ⚙️ Installation

### Prerequisites
- Python 3.10+
- pip

### Install Dependencies
```bash
pip install -r requirements.txt
```

### Requirements
```txt
fastapi
uvicorn[standard]
pydantic>=2.8
python-dotenv
aiohttp
requests
yfinance
```

---

## 🚦 Server Management

### Start Server
```bash
# Development (auto-reload)
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Production
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Check Status
```bash
curl http://localhost:8000/health
```

### View Docs
```
http://localhost:8000/docs
```

---

## 💡 Usage Examples

### Basic Analysis
```python
import requests

response = requests.post(
    "http://localhost:8000/analyze-asset",
    params={"asset": "SPY"}
)

data = response.json()
```

### Extract Insights
```python
# Behavioral flags
for flag in data['behavioral_analysis']['flags']:
    print(f"{flag['pattern']}: {flag['message']}")

# Economic events
for event in data['economic_calendar']['economic_events']:
    print(event)

# Council opinions
for opinion in data['market_analysis']['council_opinions']:
    print(opinion)

# Narrative
print(data['narrative']['styled_message'])
```

---

## 🔒 Security

- No authentication required (add JWT for production)
- Rate limiting recommended (10 req/min per user)
- Content moderation via ModeratorAgent
- Sanitized LLM inputs/outputs

---

## 📊 Performance

- **Response Time:** 100-120 seconds
- **Concurrent Requests:** 4 workers recommended
- **LLM Calls:** 5 agents + 1 narrator = 6 total
- **Cache:** Economic calendar (1 hour TTL)

---

## 🛣️ Roadmap

- [ ] PostgreSQL database integration
- [ ] Redis caching layer
- [ ] WebSocket streaming
- [ ] JWT authentication
- [ ] Historical trade analysis
- [ ] Risk scoring system
- [ ] Multi-timeframe analysis

---

## 📝 License

MIT

---

## 👥 Support

For issues or questions, create an issue in the repository.

---

**Version:** 2.0.0  
**Last Updated:** February 7, 2026  
**Server:** http://localhost:8000
