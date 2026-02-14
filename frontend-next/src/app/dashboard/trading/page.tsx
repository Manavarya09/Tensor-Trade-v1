'use client';

import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useState, useEffect, useCallback } from 'react';
import {
  getStocks, getWatchlist, addToWatchlist, removeFromWatchlist,
  executeTrade, getPortfolio,
  type Stock, type WatchlistItem, type PortfolioSummary,
} from '@/lib/api';

export default function TradingPage() {
  const [activeTab, setActiveTab] = useState('stocks');
  const [searchQuery, setSearchQuery] = useState('');
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [tradeModal, setTradeModal] = useState<{ open: boolean; symbol: string; action: 'buy' | 'sell' }>({
    open: false, symbol: '', action: 'buy',
  });
  const [tradeQty, setTradeQty] = useState(1);
  const [tradeLoading, setTradeLoading] = useState(false);
  const [tradeResult, setTradeResult] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [stocksRes, watchlistRes, portfolioRes] = await Promise.all([
        getStocks(), getWatchlist(), getPortfolio(),
      ]);
      setStocks(stocksRes.stocks);
      setWatchlist(watchlistRes.watchlist);
      setPortfolio(portfolioRes);
    } catch (err: any) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filteredStocks = stocks.filter(
    s => !searchQuery || s.symbol.includes(searchQuery.toUpperCase()) || s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openTrade = (symbol: string, action: 'buy' | 'sell') => {
    setTradeModal({ open: true, symbol, action });
    setTradeQty(1);
    setTradeResult(null);
  };

  const handleTrade = async () => {
    setTradeLoading(true);
    setTradeResult(null);
    try {
      const res = await executeTrade(tradeModal.symbol, tradeModal.action, tradeQty);
      setTradeResult(
        `${tradeModal.action.toUpperCase()} ${tradeQty} ${tradeModal.symbol} @ $${res.trade.price.toFixed(2)} — Total: $${res.trade.total.toFixed(2)}. Cash: $${res.cash_balance.toFixed(2)}`
      );
      fetchData();
    } catch (err: any) {
      setTradeResult(`Error: ${err.message}`);
    } finally {
      setTradeLoading(false);
    }
  };

  const handleAddWatchlist = async (symbol: string) => {
    try { const res = await addToWatchlist(symbol); setWatchlist(res.watchlist); } catch (err: any) { alert(err.message); }
  };

  const handleRemoveWatchlist = async (symbol: string) => {
    try { const res = await removeFromWatchlist(symbol); setWatchlist(res.watchlist); } catch (err: any) { alert(err.message); }
  };

  const watchlistSymbols = new Set(watchlist.map(w => w.symbol));

  if (loading) return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-black mx-auto"></div>
        <p className="mt-4 font-bold uppercase">Loading Market Data...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="border-4 border-black p-8 text-center">
      <h2 className="text-xl font-bold uppercase mb-4">Connection Error</h2>
      <p className="mb-4">{error}</p>
      <p className="text-sm mb-4">Make sure the backend server is running on port 8000</p>
      <Button onClick={fetchData}>RETRY</Button>
    </div>
  );

  return (
    <div className="space-y-6">
      {portfolio && (
        <div className="border-4 border-black p-4 flex flex-wrap justify-between items-center gap-4">
          <div><span className="font-bold uppercase text-xs">VIRTUAL TOKENS</span><span className="ml-3 text-2xl font-bold">${portfolio.cash_balance.toLocaleString(undefined, {minimumFractionDigits: 2})}</span></div>
          <div><span className="font-bold uppercase text-xs">PORTFOLIO</span><span className="ml-3 text-2xl font-bold">${portfolio.total_value.toLocaleString(undefined, {minimumFractionDigits: 2})}</span></div>
          <div><span className="font-bold uppercase text-xs">P&L</span><span className={`ml-3 text-2xl font-bold ${portfolio.total_pnl >= 0 ? 'text-green-700' : 'text-red-600'}`}>{portfolio.total_pnl >= 0 ? '+' : ''}${portfolio.total_pnl.toFixed(2)}</span></div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4">
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="SEARCH STOCKS..." className="flex-1 px-4 py-3 border-4 border-black font-bold text-sm uppercase placeholder-gray-500 focus:outline-none" />
        <Button variant="outline" onClick={fetchData}>REFRESH</Button>
      </div>

      <div className="flex border-b-4 border-black">
        {['stocks', 'watchlist'].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-3 font-bold uppercase text-sm border-r-4 border-black ${activeTab === tab ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'}`}>
            {tab} {tab === 'watchlist' && watchlist.length > 0 && `(${watchlist.length})`}
          </button>
        ))}
      </div>

      {activeTab === 'stocks' && (
        <Card className="p-6">
          <h2 className="text-xl font-bold uppercase mb-6 border-b-4 border-black pb-3">Live Market ({stocks.length} stocks)</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-4 border-black">
                  <th className="text-left font-bold uppercase text-xs py-3 px-4">Symbol</th>
                  <th className="text-left font-bold uppercase text-xs py-3 px-4">Name</th>
                  <th className="text-right font-bold uppercase text-xs py-3 px-4">Price</th>
                  <th className="text-right font-bold uppercase text-xs py-3 px-4">Change</th>
                  <th className="text-right font-bold uppercase text-xs py-3 px-4">Volume</th>
                  <th className="text-center font-bold uppercase text-xs py-3 px-4">Shariah</th>
                  <th className="text-right font-bold uppercase text-xs py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStocks.map((stock) => (
                  <tr key={stock.symbol} className="border-b-2 border-black hover:bg-gray-50">
                    <td className="py-4 px-4 font-bold">{stock.symbol}</td>
                    <td className="py-4 px-4">{stock.name}</td>
                    <td className="py-4 px-4 text-right font-bold">${stock.price.toFixed(2)}</td>
                    <td className={`py-4 px-4 text-right font-bold ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>{stock.change > 0 ? '+' : ''}{stock.change}%</td>
                    <td className="py-4 px-4 text-right">{stock.volume}</td>
                    <td className="py-4 px-4 text-center">
                      <span className={`px-3 py-1 font-bold text-xs border-2 border-black ${stock.shariah ? 'bg-black text-white' : 'bg-white text-black'}`}>{stock.shariah ? 'YES' : 'NO'}</span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex justify-end gap-1">
                        <Button size="sm" onClick={() => openTrade(stock.symbol, 'buy')}>BUY</Button>
                        <Button size="sm" variant="outline" onClick={() => openTrade(stock.symbol, 'sell')}>SELL</Button>
                        <button onClick={() => watchlistSymbols.has(stock.symbol) ? handleRemoveWatchlist(stock.symbol) : handleAddWatchlist(stock.symbol)} className="px-2 text-lg">{watchlistSymbols.has(stock.symbol) ? '★' : '☆'}</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'watchlist' && (
        <Card className="p-6">
          <h2 className="text-xl font-bold uppercase mb-6 border-b-4 border-black pb-3">Your Watchlist</h2>
          {watchlist.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No stocks in watchlist. Add some from the Stocks tab.</p>
          ) : (
            <div className="space-y-4">
              {watchlist.map((stock) => (
                <div key={stock.symbol} className="flex items-center justify-between border-4 border-black p-4">
                  <div><div className="font-bold">{stock.symbol}</div><div className="text-sm">{stock.name}</div></div>
                  <div className="text-right"><div className="font-bold">${stock.price.toFixed(2)}</div><div className={`text-sm font-bold ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>{stock.change > 0 ? '+' : ''}{stock.change}%</div></div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => openTrade(stock.symbol, 'buy')}>BUY</Button>
                    <Button size="sm" variant="outline" onClick={() => openTrade(stock.symbol, 'sell')}>SELL</Button>
                    <Button size="sm" variant="ghost" onClick={() => handleRemoveWatchlist(stock.symbol)}>✕</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {tradeModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white border-4 border-black p-6 w-full max-w-md">
            <h3 className="text-xl font-bold uppercase mb-4 border-b-4 border-black pb-2">{tradeModal.action.toUpperCase()} {tradeModal.symbol}</h3>
            {(() => { const s = stocks.find(s => s.symbol === tradeModal.symbol); return s ? (
              <div className="mb-4 text-sm space-y-1">
                <div className="flex justify-between"><span className="font-bold">PRICE</span><span>${s.price.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="font-bold">EST. TOTAL</span><span className="font-bold">${(s.price * tradeQty).toFixed(2)}</span></div>
                {portfolio && <div className="flex justify-between"><span className="font-bold">CASH AVAILABLE</span><span>${portfolio.cash_balance.toFixed(2)}</span></div>}
              </div>
            ) : null; })()}
            <div className="mb-4">
              <label className="font-bold uppercase text-xs block mb-2">Quantity</label>
              <input type="number" min={1} value={tradeQty} onChange={(e) => setTradeQty(Math.max(1, parseInt(e.target.value) || 1))} className="w-full border-4 border-black px-4 py-3 font-bold text-lg focus:outline-none" />
            </div>
            {tradeResult && (
              <div className={`border-4 border-black p-3 mb-4 text-sm font-bold ${tradeResult.startsWith('Error') ? 'bg-red-50' : 'bg-green-50'}`}>{tradeResult}</div>
            )}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setTradeModal({ open: false, symbol: '', action: 'buy' })}>CANCEL</Button>
              <Button className="flex-1" onClick={handleTrade} disabled={tradeLoading}>{tradeLoading ? 'PROCESSING...' : `${tradeModal.action.toUpperCase()} ${tradeQty} SHARES`}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
