"""
Virtual Trading Service - Paper trading with virtual tokens.
Provides portfolio management, trading, policy management, and self-learning capabilities.
All data is stored in-memory (persists to JSON files for durability).
"""
from __future__ import annotations

import json
import os
import logging
from dataclasses import dataclass, field, asdict
from datetime import datetime, timedelta
from typing import Any, Dict, List, Optional, Tuple
from uuid import uuid4
from statistics import mean

logger = logging.getLogger(__name__)

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")


def _ensure_data_dir():
    os.makedirs(DATA_DIR, exist_ok=True)


def _load_json(filename: str) -> Any:
    _ensure_data_dir()
    path = os.path.join(DATA_DIR, filename)
    if os.path.exists(path):
        try:
            with open(path, "r") as f:
                return json.load(f)
        except Exception:
            return None
    return None


def _save_json(filename: str, data: Any):
    _ensure_data_dir()
    path = os.path.join(DATA_DIR, filename)
    with open(path, "w") as f:
        json.dump(data, f, indent=2, default=str)


# ---------------------------------------------------------------------------
# Virtual Token Prices – simulate real-time from a base + random walk
# ---------------------------------------------------------------------------
STOCK_DATABASE = {
    "AAPL": {"name": "Apple Inc.", "sector": "Technology", "base_price": 178.45, "shariah": True, "debt_ratio": 0.15, "halal_revenue": 100},
    "MSFT": {"name": "Microsoft Corp.", "sector": "Technology", "base_price": 395.20, "shariah": True, "debt_ratio": 0.22, "halal_revenue": 98},
    "GOOGL": {"name": "Alphabet Inc.", "sector": "Technology", "base_price": 141.80, "shariah": False, "debt_ratio": 0.08, "halal_revenue": 85},
    "TSLA": {"name": "Tesla Inc.", "sector": "Automotive", "base_price": 248.50, "shariah": True, "debt_ratio": 0.08, "halal_revenue": 100},
    "NVDA": {"name": "NVIDIA Corp.", "sector": "Technology", "base_price": 875.28, "shariah": True, "debt_ratio": 0.12, "halal_revenue": 100},
    "META": {"name": "Meta Platforms", "sector": "Technology", "base_price": 485.20, "shariah": False, "debt_ratio": 0.18, "halal_revenue": 80},
    "AMZN": {"name": "Amazon.com Inc.", "sector": "Consumer", "base_price": 178.25, "shariah": True, "debt_ratio": 0.25, "halal_revenue": 92},
    "JPM": {"name": "JPMorgan Chase", "sector": "Finance", "base_price": 189.40, "shariah": False, "debt_ratio": 0.85, "halal_revenue": 20},
    "V": {"name": "Visa Inc.", "sector": "Finance", "base_price": 278.90, "shariah": True, "debt_ratio": 0.20, "halal_revenue": 95},
    "JNJ": {"name": "Johnson & Johnson", "sector": "Healthcare", "base_price": 155.30, "shariah": True, "debt_ratio": 0.18, "halal_revenue": 100},
    "UNH": {"name": "UnitedHealth Group", "sector": "Healthcare", "base_price": 520.10, "shariah": True, "debt_ratio": 0.30, "halal_revenue": 95},
    "WMT": {"name": "Walmart Inc.", "sector": "Consumer", "base_price": 165.80, "shariah": True, "debt_ratio": 0.28, "halal_revenue": 88},
    "XOM": {"name": "Exxon Mobil", "sector": "Energy", "base_price": 105.60, "shariah": True, "debt_ratio": 0.20, "halal_revenue": 100},
    "PG": {"name": "Procter & Gamble", "sector": "Consumer", "base_price": 158.40, "shariah": True, "debt_ratio": 0.25, "halal_revenue": 92},
    "HD": {"name": "Home Depot", "sector": "Consumer", "base_price": 345.90, "shariah": True, "debt_ratio": 0.30, "halal_revenue": 100},
}

import random
import hashlib


def _get_simulated_price(symbol: str) -> float:
    """Return a deterministic-ish simulated price that changes slowly."""
    info = STOCK_DATABASE.get(symbol)
    if not info:
        return 100.0
    base = info["base_price"]
    # Use hour-based seed so price changes roughly hourly
    seed_str = f"{symbol}-{datetime.utcnow().strftime('%Y-%m-%d-%H')}"
    h = int(hashlib.md5(seed_str.encode()).hexdigest(), 16)
    pct_change = ((h % 1000) - 500) / 10000.0  # -5% to +5%
    return round(base * (1 + pct_change), 2)


def get_all_stock_prices() -> Dict[str, Dict]:
    """Get current prices for all stocks."""
    result = {}
    for symbol, info in STOCK_DATABASE.items():
        price = _get_simulated_price(symbol)
        base = info["base_price"]
        change_pct = round(((price - base) / base) * 100, 2)
        result[symbol] = {
            "symbol": symbol,
            "name": info["name"],
            "price": price,
            "change": change_pct,
            "sector": info["sector"],
            "shariah": info["shariah"],
            "debt_ratio": info["debt_ratio"],
            "halal_revenue": info["halal_revenue"],
            "volume": f"{random.randint(10, 100)}.{random.randint(1, 9)}M",
            "market_cap": f"{random.randint(100, 3000)}B",
        }
    return result


# ---------------------------------------------------------------------------
# Portfolio Service (per-user in-memory + JSON persistence)
# ---------------------------------------------------------------------------
class VirtualPortfolioService:
    _FILE = "portfolios.json"

    def __init__(self):
        self._portfolios: Dict[str, Dict] = _load_json(self._FILE) or {}

    def _save(self):
        _save_json(self._FILE, self._portfolios)

    def get_or_create_portfolio(self, user_id: str) -> Dict:
        if user_id not in self._portfolios:
            self._portfolios[user_id] = {
                "user_id": user_id,
                "cash_balance": 100000.00,  # Start with $100k virtual tokens
                "positions": {},
                "created_at": datetime.utcnow().isoformat(),
            }
            self._save()
        return self._portfolios[user_id]

    def get_portfolio_summary(self, user_id: str) -> Dict:
        portfolio = self.get_or_create_portfolio(user_id)
        positions = portfolio["positions"]
        
        total_invested = 0.0
        total_current = 0.0
        holdings = []

        for symbol, pos in positions.items():
            current_price = _get_simulated_price(symbol)
            qty = pos["quantity"]
            avg_cost = pos["average_cost"]
            market_value = current_price * qty
            cost_basis = avg_cost * qty
            pnl = market_value - cost_basis
            pnl_pct = ((current_price - avg_cost) / avg_cost) * 100 if avg_cost else 0

            total_invested += cost_basis
            total_current += market_value

            info = STOCK_DATABASE.get(symbol, {})
            holdings.append({
                "symbol": symbol,
                "name": info.get("name", symbol),
                "quantity": qty,
                "average_cost": round(avg_cost, 2),
                "current_price": current_price,
                "market_value": round(market_value, 2),
                "pnl": round(pnl, 2),
                "pnl_percent": round(pnl_pct, 2),
                "shariah": info.get("shariah", False),
                "sector": info.get("sector", "Unknown"),
            })

        total_value = portfolio["cash_balance"] + total_current
        total_pnl = total_current - total_invested
        total_pnl_pct = ((total_current - total_invested) / total_invested * 100) if total_invested else 0

        return {
            "total_value": round(total_value, 2),
            "cash_balance": round(portfolio["cash_balance"], 2),
            "invested_value": round(total_current, 2),
            "total_pnl": round(total_pnl, 2),
            "total_pnl_percent": round(total_pnl_pct, 2),
            "holdings_count": len(holdings),
            "holdings": holdings,
        }

    def execute_trade(self, user_id: str, symbol: str, action: str, quantity: int) -> Dict:
        """Execute a buy or sell trade."""
        symbol = symbol.upper()
        if symbol not in STOCK_DATABASE:
            raise ValueError(f"Unknown symbol: {symbol}")
        if quantity <= 0:
            raise ValueError("Quantity must be positive")

        portfolio = self.get_or_create_portfolio(user_id)
        price = _get_simulated_price(symbol)
        total_cost = price * quantity

        if action.lower() == "buy":
            if total_cost > portfolio["cash_balance"]:
                raise ValueError(f"Insufficient funds. Need ${total_cost:.2f}, have ${portfolio['cash_balance']:.2f}")
            
            portfolio["cash_balance"] -= total_cost
            positions = portfolio["positions"]
            
            if symbol in positions:
                existing = positions[symbol]
                new_qty = existing["quantity"] + quantity
                avg = ((existing["average_cost"] * existing["quantity"]) + (price * quantity)) / new_qty
                existing["quantity"] = new_qty
                existing["average_cost"] = round(avg, 4)
            else:
                positions[symbol] = {
                    "symbol": symbol,
                    "quantity": quantity,
                    "average_cost": price,
                    "first_purchase": datetime.utcnow().isoformat(),
                }

        elif action.lower() == "sell":
            positions = portfolio["positions"]
            if symbol not in positions:
                raise ValueError(f"No position in {symbol}")
            pos = positions[symbol]
            if pos["quantity"] < quantity:
                raise ValueError(f"Insufficient shares. Have {pos['quantity']}, trying to sell {quantity}")
            
            realized_pnl = (price - pos["average_cost"]) * quantity
            pos["quantity"] -= quantity
            portfolio["cash_balance"] += total_cost

            if pos["quantity"] == 0:
                del positions[symbol]

        else:
            raise ValueError(f"Invalid action: {action}. Use 'buy' or 'sell'.")

        self._save()

        # Record trade in history
        trade_record = {
            "id": str(uuid4())[:8],
            "user_id": user_id,
            "symbol": symbol,
            "action": action.upper(),
            "quantity": quantity,
            "price": price,
            "total": round(total_cost, 2),
            "timestamp": datetime.utcnow().isoformat(),
            "realized_pnl": round(realized_pnl, 2) if action.lower() == "sell" else None,
        }
        _record_trade_history(trade_record)

        return {
            "success": True,
            "trade": trade_record,
            "cash_balance": round(portfolio["cash_balance"], 2),
        }


def _record_trade_history(trade: Dict):
    history = _load_json("trade_history.json") or []
    history.append(trade)
    # Keep last 500 trades
    if len(history) > 500:
        history = history[-500:]
    _save_json("trade_history.json", history)


def get_trade_history(user_id: str) -> List[Dict]:
    history = _load_json("trade_history.json") or []
    return [t for t in history if t.get("user_id") == user_id]


# ---------------------------------------------------------------------------
# Policy Service
# ---------------------------------------------------------------------------
class PolicyService:
    _FILE = "policies.json"

    def __init__(self):
        self._policies: Dict[str, List[Dict]] = _load_json(self._FILE) or {}

    def _save(self):
        _save_json(self._FILE, self._policies)

    def get_policies(self, user_id: str) -> List[Dict]:
        return self._policies.get(user_id, [])

    def create_policy(self, user_id: str, name: str, policy_type: str, rules: List[str],
                      stop_loss: Optional[float] = None, take_profit: Optional[float] = None,
                      max_allocation: Optional[float] = None, shariah_only: bool = False) -> Dict:
        policy = {
            "id": str(uuid4())[:8],
            "name": name,
            "type": policy_type,
            "status": "active",
            "rules": rules,
            "stop_loss": stop_loss,
            "take_profit": take_profit,
            "max_allocation": max_allocation,
            "shariah_only": shariah_only,
            "performance": "+0.0%",
            "created_at": datetime.utcnow().isoformat(),
            "last_modified": datetime.utcnow().isoformat(),
        }

        if user_id not in self._policies:
            self._policies[user_id] = []
        self._policies[user_id].append(policy)
        self._save()
        return policy

    def update_policy(self, user_id: str, policy_id: str, updates: Dict) -> Dict:
        policies = self._policies.get(user_id, [])
        for p in policies:
            if p["id"] == policy_id:
                for k, v in updates.items():
                    if k not in ("id", "created_at"):
                        p[k] = v
                p["last_modified"] = datetime.utcnow().isoformat()
                self._save()
                return p
        raise ValueError(f"Policy {policy_id} not found")

    def delete_policy(self, user_id: str, policy_id: str) -> bool:
        policies = self._policies.get(user_id, [])
        self._policies[user_id] = [p for p in policies if p["id"] != policy_id]
        self._save()
        return True

    def toggle_policy(self, user_id: str, policy_id: str) -> Dict:
        policies = self._policies.get(user_id, [])
        for p in policies:
            if p["id"] == policy_id:
                p["status"] = "inactive" if p["status"] == "active" else "active"
                p["last_modified"] = datetime.utcnow().isoformat()
                self._save()
                return p
        raise ValueError(f"Policy {policy_id} not found")

    def evaluate_trade_against_policies(self, user_id: str, symbol: str, action: str, amount: float) -> Dict:
        """Check if a trade violates any active policies."""
        policies = self.get_policies(user_id)
        active_policies = [p for p in policies if p["status"] == "active"]
        violations = []

        info = STOCK_DATABASE.get(symbol, {})
        
        for policy in active_policies:
            if policy.get("shariah_only") and not info.get("shariah", False):
                violations.append({
                    "policy": policy["name"],
                    "violation": f"{symbol} is not Shariah-compliant",
                })
            if policy.get("max_allocation") and amount > policy["max_allocation"]:
                violations.append({
                    "policy": policy["name"],
                    "violation": f"Trade exceeds max allocation of {policy['max_allocation']}%",
                })

        return {
            "allowed": len(violations) == 0,
            "violations": violations,
            "policies_checked": len(active_policies),
        }


# ---------------------------------------------------------------------------
# Learning Engine - Self-learning agent
# ---------------------------------------------------------------------------
class SelfLearningService:
    _FILE = "learning_data.json"

    def __init__(self):
        data = _load_json(self._FILE) or {}
        self.predictions: List[Dict] = data.get("predictions", [])
        self.agent_performance: Dict[str, Dict] = data.get("agent_performance", {})
        self.weights: Dict[str, float] = data.get("weights", {
            "macro": 0.20,
            "fundamentals": 0.20,
            "flow": 0.20,
            "technical": 0.20,
            "risk": 0.20,
        })
        self.trade_outcomes: List[Dict] = data.get("trade_outcomes", [])

    def _save(self):
        _save_json(self._FILE, {
            "predictions": self.predictions[-100:],
            "agent_performance": self.agent_performance,
            "weights": self.weights,
            "trade_outcomes": self.trade_outcomes[-200:],
        })

    def record_prediction(self, user_id: str, symbol: str, stance: str,
                          agent_stances: Dict[str, str], confidence: float) -> Dict:
        entry = {
            "id": str(uuid4())[:8],
            "user_id": user_id,
            "symbol": symbol,
            "predicted_stance": stance,
            "agent_stances": agent_stances,
            "confidence": confidence,
            "timestamp": datetime.utcnow().isoformat(),
            "outcome": None,
        }
        self.predictions.append(entry)
        self._save()
        return entry

    def record_outcome(self, symbol: str, actual_change_pct: float) -> int:
        actual_stance = "BULLISH" if actual_change_pct > 1 else "BEARISH" if actual_change_pct < -1 else "NEUTRAL"
        updated = 0
        for p in self.predictions:
            if p["symbol"] == symbol and p["outcome"] is None:
                p["outcome"] = {
                    "actual_change_pct": actual_change_pct,
                    "actual_stance": actual_stance,
                    "correct": p["predicted_stance"] == actual_stance,
                    "resolved_at": datetime.utcnow().isoformat(),
                }
                # Update per-agent accuracy
                for agent_name, agent_stance in p.get("agent_stances", {}).items():
                    if agent_name not in self.agent_performance:
                        self.agent_performance[agent_name] = {"correct": 0, "total": 0, "accuracy": 0}
                    perf = self.agent_performance[agent_name]
                    perf["total"] += 1
                    if agent_stance == actual_stance:
                        perf["correct"] += 1
                    perf["accuracy"] = round((perf["correct"] / perf["total"]) * 100, 1)
                updated += 1
        
        if updated:
            self._optimize_weights()
            self._save()
        return updated

    def _optimize_weights(self):
        """Adjust agent weights based on historical accuracy."""
        if not self.agent_performance:
            return
        accuracies = {}
        for name, perf in self.agent_performance.items():
            if perf["total"] >= 3:  # Need minimum samples
                accuracies[name] = perf["accuracy"]
        
        if not accuracies:
            return
        
        total = sum(accuracies.values()) or 1
        self.weights = {name: round(acc / total, 3) for name, acc in accuracies.items()}

    def record_trade_outcome(self, user_id: str, symbol: str, action: str, 
                              entry_price: float, exit_price: float, quantity: int):
        pnl = (exit_price - entry_price) * quantity if action == "BUY" else (entry_price - exit_price) * quantity
        outcome = {
            "id": str(uuid4())[:8],
            "user_id": user_id,
            "symbol": symbol,
            "action": action,
            "entry_price": entry_price,
            "exit_price": exit_price,
            "quantity": quantity,
            "pnl": round(pnl, 2),
            "pnl_pct": round(((exit_price - entry_price) / entry_price) * 100, 2),
            "timestamp": datetime.utcnow().isoformat(),
        }
        self.trade_outcomes.append(outcome)
        # Trigger learning
        self.record_outcome(symbol, outcome["pnl_pct"])
        self._save()
        return outcome

    def get_metrics(self, user_id: Optional[str] = None) -> Dict:
        outcomes = self.trade_outcomes
        if user_id:
            outcomes = [o for o in outcomes if o.get("user_id") == user_id]
        
        total_trades = len(outcomes)
        wins = [o for o in outcomes if o.get("pnl", 0) > 0]
        losses = [o for o in outcomes if o.get("pnl", 0) < 0]
        
        resolved_predictions = [p for p in self.predictions if p.get("outcome")]
        correct_predictions = [p for p in resolved_predictions if p["outcome"].get("correct")]

        return {
            "total_trades": total_trades,
            "win_rate": round((len(wins) / total_trades) * 100, 1) if total_trades else 0,
            "total_pnl": round(sum(o.get("pnl", 0) for o in outcomes), 2),
            "avg_pnl": round(mean([o.get("pnl", 0) for o in outcomes]), 2) if outcomes else 0,
            "best_trade": round(max((o.get("pnl", 0) for o in outcomes), default=0), 2),
            "worst_trade": round(min((o.get("pnl", 0) for o in outcomes), default=0), 2),
            "prediction_accuracy": round((len(correct_predictions) / len(resolved_predictions)) * 100, 1) if resolved_predictions else 0,
            "total_predictions": len(self.predictions),
            "resolved_predictions": len(resolved_predictions),
            "agent_weights": self.weights,
            "agent_performance": self.agent_performance,
            "learning_iterations": len(resolved_predictions),
        }


# ---------------------------------------------------------------------------
# Watchlist Service
# ---------------------------------------------------------------------------
class WatchlistService:
    _FILE = "watchlists.json"

    def __init__(self):
        self._watchlists: Dict[str, List[str]] = _load_json(self._FILE) or {}

    def _save(self):
        _save_json(self._FILE, self._watchlists)

    def get_watchlist(self, user_id: str) -> List[Dict]:
        symbols = self._watchlists.get(user_id, [])
        result = []
        for s in symbols:
            info = STOCK_DATABASE.get(s, {})
            price = _get_simulated_price(s)
            base = info.get("base_price", price)
            result.append({
                "symbol": s,
                "name": info.get("name", s),
                "price": price,
                "change": round(((price - base) / base) * 100, 2),
                "shariah": info.get("shariah", False),
            })
        return result

    def add_to_watchlist(self, user_id: str, symbol: str) -> bool:
        symbol = symbol.upper()
        if symbol not in STOCK_DATABASE:
            raise ValueError(f"Unknown symbol: {symbol}")
        if user_id not in self._watchlists:
            self._watchlists[user_id] = []
        if symbol not in self._watchlists[user_id]:
            self._watchlists[user_id].append(symbol)
            self._save()
        return True

    def remove_from_watchlist(self, user_id: str, symbol: str) -> bool:
        symbol = symbol.upper()
        if user_id in self._watchlists:
            self._watchlists[user_id] = [s for s in self._watchlists[user_id] if s != symbol]
            self._save()
        return True


# ---------------------------------------------------------------------------
# Singleton instances
# ---------------------------------------------------------------------------
_portfolio_service: Optional[VirtualPortfolioService] = None
_policy_service: Optional[PolicyService] = None
_learning_service: Optional[SelfLearningService] = None
_watchlist_service: Optional[WatchlistService] = None


def get_portfolio_service() -> VirtualPortfolioService:
    global _portfolio_service
    if _portfolio_service is None:
        _portfolio_service = VirtualPortfolioService()
    return _portfolio_service


def get_policy_service() -> PolicyService:
    global _policy_service
    if _policy_service is None:
        _policy_service = PolicyService()
    return _policy_service


def get_learning_service() -> SelfLearningService:
    global _learning_service
    if _learning_service is None:
        _learning_service = SelfLearningService()
    return _learning_service


def get_watchlist_service() -> WatchlistService:
    global _watchlist_service
    if _watchlist_service is None:
        _watchlist_service = WatchlistService()
    return _watchlist_service
