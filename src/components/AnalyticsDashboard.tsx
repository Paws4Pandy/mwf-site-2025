import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, TrendingUp, Users, DollarSign,
  Calendar, RefreshCw, Download, Lock
} from 'lucide-react';
import chatService from '@/services/ChatService';

interface AnalyticsData {
  period: string;
  data: {
    totalRequests: number;
    totalCost: string;
    totalTokens: number;
    uniqueUsers: number;
    averageCostPerRequest?: string;
    averageTokensPerRequest?: number;
    dailyBreakdown?: Array<{
      date: string;
      totalRequests: number;
      totalCost: number;
      totalTokens: number;
      uniqueUsers: number;
    }>;
  };
  timestamp: string;
}

const AnalyticsDashboard: React.FC = () => {
  const [period, setPeriod] = useState<'today' | 'week' | 'month'>('today');
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Fetch analytics data
  const fetchAnalytics = async () => {
    if (!authToken) {
      setError('Please enter your analytics token');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await chatService.getAnalytics(period, authToken);
      setAnalytics(data);
      setIsAuthenticated(true);
    } catch (error: unknown) {
      setError((error instanceof Error ? error.message : 'Failed to fetch analytics'));
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Format currency
  const formatCurrency = (value: string | number): string => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return `$${num.toFixed(6)}`;
  };
  
  // Format number with commas
  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };
  
  // Calculate percentage change
  const calculateChange = (current: number, previous: number): string => {
    if (previous === 0) return '+0%';
    const change = ((current - previous) / previous) * 100;
    return `${change > 0 ? '+' : ''}${change.toFixed(1)}%`;
  };
  
  // Export analytics data
  const exportData = () => {
    if (!analytics) return;
    
    const data = JSON.stringify(analytics, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_${period}_${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-8 h-8 text-design-lilac" />
              <h2 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              Enter your analytics token to view conversation data and costs.
            </p>
            
            <input
              type="password"
              value={authToken}
              onChange={(e) => setAuthToken(e.target.value)}
              placeholder="Analytics Token"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-design-lilac"
            />
            
            {error && (
              <p className="text-red-600 text-sm mb-4">{error}</p>
            )}
            
            <button
              onClick={fetchAnalytics}
              disabled={isLoading || !authToken}
              className="w-full bg-design-lilac text-white py-2 rounded-lg hover:bg-design-lilac/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Authenticating...' : 'Access Dashboard'}
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-design-lilac" />
              <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Period Selector */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                {(['today', 'week', 'month'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setPeriod(p);
                      fetchAnalytics();
                    }}
                    className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                      period === p
                        ? 'bg-design-lilac text-white'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              
              {/* Actions */}
              <button
                onClick={fetchAnalytics}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Refresh"
              >
                <RefreshCw className={`w-5 h-5 text-gray-600 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
              
              <button
                onClick={exportData}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Export data"
              >
                <Download className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Metrics Cards */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Total Requests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-gray-600 text-sm mb-1">Total Requests</h3>
              <p className="text-2xl font-bold text-gray-800">
                {formatNumber(analytics.data.totalRequests)}
              </p>
              {analytics.data.averageTokensPerRequest && (
                <p className="text-xs text-gray-500 mt-2">
                  Avg {formatNumber(analytics.data.averageTokensPerRequest)} tokens/req
                </p>
              )}
            </motion.div>
            
            {/* Total Cost */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-gray-600 text-sm mb-1">Total Cost</h3>
              <p className="text-2xl font-bold text-gray-800">
                {formatCurrency(analytics.data.totalCost)}
              </p>
              {analytics.data.averageCostPerRequest && (
                <p className="text-xs text-gray-500 mt-2">
                  Avg {formatCurrency(analytics.data.averageCostPerRequest)}/req
                </p>
              )}
            </motion.div>
            
            {/* Unique Users */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-gray-600 text-sm mb-1">Unique Users</h3>
              <p className="text-2xl font-bold text-gray-800">
                {formatNumber(analytics.data.uniqueUsers)}
              </p>
            </motion.div>
            
            {/* Total Tokens */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-gray-600 text-sm mb-1">Total Tokens</h3>
              <p className="text-2xl font-bold text-gray-800">
                {formatNumber(analytics.data.totalTokens)}
              </p>
            </motion.div>
          </div>
        )}
        
        {/* Daily Breakdown Chart */}
        {analytics?.data.dailyBreakdown && analytics.data.dailyBreakdown.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Daily Breakdown</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4 text-gray-600">Date</th>
                    <th className="text-right py-2 px-4 text-gray-600">Requests</th>
                    <th className="text-right py-2 px-4 text-gray-600">Cost</th>
                    <th className="text-right py-2 px-4 text-gray-600">Tokens</th>
                    <th className="text-right py-2 px-4 text-gray-600">Users</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.data.dailyBreakdown.map((day, index) => (
                    <tr key={day.date} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4 text-gray-800">
                        {new Date(day.date).toLocaleDateString()}
                      </td>
                      <td className="text-right py-2 px-4 text-gray-800">
                        {formatNumber(day.totalRequests)}
                      </td>
                      <td className="text-right py-2 px-4 text-gray-800">
                        {formatCurrency(day.totalCost)}
                      </td>
                      <td className="text-right py-2 px-4 text-gray-800">
                        {formatNumber(day.totalTokens)}
                      </td>
                      <td className="text-right py-2 px-4 text-gray-800">
                        {formatNumber(day.uniqueUsers)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Last Updated */}
        {analytics && (
          <div className="text-center text-gray-500 text-sm mt-6">
            Last updated: {new Date(analytics.timestamp).toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;