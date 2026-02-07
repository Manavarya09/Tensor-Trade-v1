# API Request Format Documentation

**Multi-Agent Trading Psychology API v2.0.0**

Complete reference for all API endpoints, request formats, and response structures.

---

## Base URL

```
http://localhost:8000
```

---

## Table of Contents

1. [POST /analyze-asset](#post-analyze-asset) - Simplified Analysis (Recommended)
2. [POST /run-agents](#post-run-agents) - Legacy Full Pipeline
3. [GET /](#get-) - API Information
4. [GET /health](#get-health) - Health Check
5. [Common Response Codes](#common-response-codes)
6. [Examples](#examples)

---

## POST /analyze-asset

**Simplified endpoint - Auto-generates trade history, persona, and economic context.**

### Request Type
```
POST
```

### Endpoint
```
/analyze-asset
```

### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `asset` | string | Yes | - | Stock symbol (e.g., "SPY", "AAPL", "TSLA") |
| `user_id` | string | No | "default_user" | User identifier for database lookup |

### Request Headers
```
Content-Type: application/json
```

### Request Payload
**None** - All parameters passed as query parameters

### Example Request

**cURL:**
```bash
curl -X POST "http://localhost:8000/analyze-asset?asset=AAPL&user_id=trader123"
```

**Python:**
```python
import requests

response = requests.post(
    "http://localhost:8000/analyze-asset",
    params={
        "asset": "AAPL",
        "user_id": "trader123"
    }
)

data = response.json()
```

**JavaScript:**
```javascript
fetch('http://localhost:8000/analyze-asset?asset=AAPL&user_id=trader123', {
    method: 'POST'
})
.then(response => response.json())
.then(data => console.log(data));
```

### Response Format

**Status Code:** `200 OK`

```json
{
  "asset": "AAPL",
  "user_id": "trader123",
  "analysis_type": "automated",
  "persona_selected": "professional",
  
  "trade_history": {
    "total_trades": 5,
    "total_pnl": 1250.75,
    "win_rate": 60.0,
    "last_trade": {
      "timestamp": "2026-02-07 14:30:00",
      "symbol": "AAPL",
      "action": "BUY",
      "price": 180.25,
      "pnl": 350.50,
      "status": "CLOSED"
    }
  },
  
  "economic_calendar": {
    "earnings": {
      "next_earnings_date": "2026-02-28",
      "last_eps": 1.96,
      "forward_eps": 6.56,
      "trailing_pe": 28.5,
      "forward_pe": 27.4
    },
    "recent_news": [
      {
        "title": "Apple announces new product line",
        "link": "https://...",
        "publisher": "Reuters",
        "timestamp": "2026-02-07T10:30:00"
      }
    ],
    "economic_events": [
      "Federal Reserve policy meeting - Feb 15",
      "Jobs report release - Feb 10",
      "CPI data - Feb 12"
    ],
    "summary": "Economic calendar: Federal Reserve policy meeting Feb 15; Quarterly earnings season ongoing..."
  },
  
  "behavioral_analysis": {
    "flags": [
      {
        "pattern": "overtrading",
        "severity": "medium",
        "message": "7 trades detected within 2 hours",
        "recommendation": "Consider reducing trade frequency"
      }
    ],
    "insights": [
      "Revenge trading pattern detected after losses",
      "FOMO behavior on momentum stocks"
    ]
  },
  
  "market_analysis": {
    "council_opinions": [
      "🦅 Macro Hawk (high): Bullish on tech sector given Fed pause signals...",
      "🔬 Micro Forensic (medium): Revenue growth strong at 12% YoY...",
      "💧 Flow Detective (high): Institutional buying pressure evident...",
      "📊 Tech Interpreter (medium): Breakout pattern confirmed above $175...",
      "🤔 Skeptic (low): Overvaluation concerns at current P/E ratio..."
    ],
    "consensus": [
      "Strong institutional buying pressure",
      "Technical breakout confirmed",
      "Revenue growth trajectory positive"
    ],
    "disagreements": [
      "Valuation concerns vs growth potential",
      "Short-term momentum vs long-term fundamentals"
    ],
    "judge_summary": "\n🎙️ MULTI-AGENT DEBATE: AAPL UP 1.35%\n==================================================\n...",
    "market_context": {
      "price": 180.25,
      "move_direction": "UP",
      "change_pct": "1.35",
      "volume": 45000000
    }
  },
  
  "narrative": {
    "summary": "Today's AAPL session showed strong momentum with institutional support...",
    "styled_message": "Great trading today! You captured that AAPL breakout perfectly. The 5 agents noted strong buying pressure and your entry timing was spot-on...",
    "moderated_output": "Today's AAPL session showed strong momentum with institutional support..."
  },
  
  "timestamp": "2026-02-07T15:45:30.123456",
  "errors": {}
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `asset` | string | Stock symbol analyzed |
| `user_id` | string | User identifier |
| `analysis_type` | string | "automated" for this endpoint |
| `persona_selected` | string | Auto-selected persona (coach/professional/casual/analytical) |
| `trade_history` | object | Trading performance summary |
| `economic_calendar` | object | Economic events and news |
| `behavioral_analysis` | object | Trading psychology insights |
| `market_analysis` | object | 5-agent LLM council results |
| `narrative` | object | AI-generated session summary |
| `timestamp` | string | ISO 8601 timestamp |
| `errors` | object | Any agent errors (empty if all succeeded) |

---

## POST /run-agents

**Legacy endpoint - Full control over inputs. Use /analyze-asset for simplified usage.**

### Request Type
```
POST
```

### Endpoint
```
/run-agents
```

### Request Headers
```
Content-Type: application/json
```

### Request Payload

```json
{
  "market_event": "SPY moved up 1.5% on strong jobs report",
  "user_trades": [
    {
      "timestamp": "2026-02-07 10:30:00",
      "symbol": "SPY",
      "action": "BUY",
      "price": 480.0,
      "pnl": -150.0,
      "status": "CLOSED"
    }
  ],
  "persona_style": "professional"
}
```

### Payload Fields

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `market_event` | string | Yes | - | Description of market event |
| `user_trades` | array[Trade] | Yes | - | Array of trade objects |
| `persona_style` | string | No | "professional" | Persona (coach/professional/casual/analytical) |

### Trade Object Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `timestamp` | string | Yes | Trade timestamp (YYYY-MM-DD HH:MM:SS) |
| `symbol` | string | Yes | Stock symbol |
| `action` | string | Yes | Trade action (BUY/SELL) |
| `price` | float | Yes | Trade execution price |
| `pnl` | float | Yes | Profit/loss in USD |
| `status` | string | Yes | Trade status (OPEN/CLOSED) |

### Example Request

**cURL:**
```bash
curl -X POST "http://localhost:8000/run-agents" \
  -H "Content-Type: application/json" \
  -d '{
    "market_event": "TSLA surged 5% on strong delivery numbers",
    "user_trades": [{
      "timestamp": "2026-02-07 10:00:00",
      "symbol": "TSLA",
      "action": "BUY",
      "price": 245.50,
      "pnl": 850.25,
      "status": "CLOSED"
    }],
    "persona_style": "coach"
  }'
```

**Python:**
```python
import requests

payload = {
    "market_event": "TSLA surged 5% on strong delivery numbers",
    "user_trades": [{
        "timestamp": "2026-02-07 10:00:00",
        "symbol": "TSLA",
        "action": "BUY",
        "price": 245.50,
        "pnl": 850.25,
        "status": "CLOSED"
    }],
    "persona_style": "coach"
}

response = requests.post("http://localhost:8000/run-agents", json=payload)
```

### Response Format

**Status Code:** `200 OK`

```json
{
  "message": "Multi-agent pipeline completed",
  "agents_run": 5,
  "result": {
    "market_event": "TSLA surged 5% on strong delivery numbers",
    "behavior_flags": [...],
    "market_opinions": [...],
    "summary": "...",
    "final_message": "..."
  }
}
```

---

## GET /

**Root endpoint - API information and available features.**

### Request Type
```
GET
```

### Example Request

```bash
curl http://localhost:8000/
```

### Response Format

**Status Code:** `200 OK`

```json
{
  "message": "Multi-Agent Trading Psychology API",
  "version": "2.0.0",
  "endpoints": {
    "/analyze-asset": "🚀 NEW - Simplified analysis (asset only)",
    "/run-agents": "Full agent pipeline (custom inputs)",
    "/health": "Health check",
    "/docs": "API documentation"
  },
  "agents": {
    "BehaviorMonitorAgent": "Detects 10 behavioral trading patterns",
    "MarketWatcherAgent": "5 LLM debate council",
    "NarratorAgent": "AI-powered session summaries",
    "PersonaAgent": "Personality styling",
    "ModeratorAgent": "Final moderation"
  },
  "features": {
    "economic_calendar": "Automated earnings and economic event tracking",
    "trade_history": "Automatic trade history fetching",
    "auto_persona": "Intelligent persona selection"
  }
}
```

---

## GET /health

**Health check endpoint - Service status monitoring.**

### Request Type
```
GET
```

### Example Request

```bash
curl http://localhost:8000/health
```

### Response Format

**Status Code:** `200 OK`

```json
{
  "status": "healthy",
  "version": "2.0.0",
  "services": {
    "behavior_monitor": "operational",
    "market_watcher": "operational (5 LLM council)",
    "narrator": "operational",
    "persona": "operational",
    "moderator": "operational",
    "economic_calendar": "operational",
    "trade_history": "operational (synthetic)"
  }
}
```

---

## Common Response Codes

| Code | Status | Description |
|------|--------|-------------|
| `200` | OK | Request successful |
| `400` | Bad Request | Invalid request parameters |
| `422` | Unprocessable Entity | Validation error |
| `500` | Internal Server Error | Server-side error |

---

## Examples

### Complete Workflow (Python)

```python
import requests

BASE_URL = "http://localhost:8000"

# Check health
health = requests.get(f"{BASE_URL}/health")
print(f"Status: {health.json()['status']}")

# Run analysis
response = requests.post(
    f"{BASE_URL}/analyze-asset",
    params={"asset": "AAPL", "user_id": "trader_001"}
)

data = response.json()
print(f"Asset: {data['asset']}")
print(f"P&L: ${data['trade_history']['total_pnl']:.2f}")
print(f"Win Rate: {data['trade_history']['win_rate']:.1f}%")
```

### Best Practices

1. **Use /analyze-asset** - Simplifies integration
2. **Set timeout to 180s** - LLM calls take time
3. **Cache economic calendar** - Updates hourly
4. **Check errors field** - Monitor agent failures
5. **Implement retry logic** - Exponential backoff for 500s

---

## Interactive Documentation

Visit `/docs` for Swagger UI:
```
http://localhost:8000/docs
```

---

**Last Updated:** February 7, 2026  
**API Version:** 2.0.0  
**Server:** http://localhost:8000
