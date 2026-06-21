import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { IndianRupee, Building2, FileText, Activity, ArrowUpRight, ArrowDownLeft, Calendar, Download, Search, SlidersHorizontal, Eye, MoreHorizontal } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    totalOutstanding: 0,
    totalFirms: 0,
    totalBills: 0,
    totalPayments: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function fetchDashboardData() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // 1. Fetch firms
      const { data: firms, error: firmsError } = await supabase
        .from('firms')
        .select('*')
        .eq('user_id', user.id);

      if (firmsError) throw firmsError;

      const totalFirms = firms?.length || 0;
      const totalOutstanding = firms?.reduce((sum, f) => sum + Number(f.outstanding_balance), 0) || 0;

      // 2. Fetch bills total
      const { data: bills, error: billsError } = await supabase
        .from('bills')
        .select('grand_total')
        .eq('user_id', user.id);

      if (billsError) throw billsError;
      const totalBills = bills?.reduce((sum, b) => sum + Number(b.grand_total), 0) || 0;

      // 3. Fetch payments total
      const { data: payments, error: paymentsError } = await supabase
        .from('payments')
        .select('payment_amount')
        .eq('user_id', user.id);

      if (paymentsError) throw paymentsError;
      const totalPayments = payments?.reduce((sum, p) => sum + Number(p.payment_amount), 0) || 0;

      setMetrics({
        totalOutstanding,
        totalFirms,
        totalBills,
        totalPayments
      });

      // 4. Fetch recent bills
      const { data: recentBills, error: rBillsError } = await supabase
        .from('bills')
        .select(`
          id,
          grand_total,
          invoice_date,
          created_at,
          firm_id,
          firms (
            firm_name
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(6);

      if (rBillsError) throw rBillsError;

      // 5. Fetch recent payments
      const { data: recentPayments, error: rPaymentsError } = await supabase
        .from('payments')
        .select(`
          id,
          payment_amount,
          payment_date,
          created_at,
          firm_id,
          firms (
            firm_name
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(6);

      if (rPaymentsError) throw rPaymentsError;

      // 6. Merge & sort recent activities
      const combined = [
        ...(recentBills || []).map(b => ({
          id: b.id,
          date: b.invoice_date || b.created_at,
          type: 'bill',
          firmId: b.firm_id,
          firmName: b.firms?.firm_name || 'Unknown Supplier',
          amount: Number(b.grand_total),
          title: 'Purchase Bill',
          status: 'Unpaid'
        })),
        ...(recentPayments || []).map(p => ({
          id: p.id,
          date: p.payment_date || p.created_at,
          type: 'payment',
          firmId: p.firm_id,
          firmName: p.firms?.firm_name || 'Unknown Supplier',
          amount: Number(p.payment_amount),
          title: 'Supplier Payment',
          status: 'Cleared'
        }))
      ];

      combined.sort((a, b) => new Date(b.date) - new Date(a.date));
      setRecentActivities(combined);

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleExportCSV = () => {
    if (recentActivities.length === 0) return;
    const exportData = recentActivities.map(t => ({
      Date: format(new Date(t.date), 'dd MMM yyyy'),
      Type: t.type.toUpperCase(),
      Firm: t.firmName,
      Amount: t.amount.toFixed(2),
      Status: t.status
    }));

    const csv = require('papaparse').unparse(exportData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `recent_transactions.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <div className="dashboard-loading">Loading metrics...</div>;

  // Filtered recent activities for search
  const filteredActivities = recentActivities.filter(act => 
    act.firmName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    act.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard-page boltshift-theme">
      {/* Title bar (Boltshift style) */}
      <div className="dashboard-title-bar">
        <div>
          <h1>Sales Overview</h1>
          <p className="subtitle">Your current sales summary and activity</p>
        </div>
        <div className="title-actions">
          <div className="dropdown-action">
            <Calendar size={16} />
            <span>This Month</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
          <button className="action-btn" onClick={handleExportCSV}>
            <Download size={16} />
            <span>Export</span>
          </button>
          <button className="action-btn btn-blue-accent" onClick={() => navigate('/app/firms')}>
            <SlidersHorizontal size={16} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* 4 Cards Row */}
      <div className="boltshift-cards-row">
        {/* Card 1 - Blue Gradient Card (Total Outstanding) */}
        <div className="boltshift-card primary-gradient-card">
          <div className="card-header-row">
            <span className="card-label">Total Outstanding</span>
            <div className="card-header-icon-badge">
              <IndianRupee size={16} />
            </div>
          </div>
          <div className="card-body-row">
            <span className="card-value">₹{metrics.totalOutstanding.toLocaleString('en-IN')}</span>
            <div className="card-percent-badge badge-blue">
              <span>↑ 4.9%</span>
            </div>
          </div>
          <div className="card-footer-row">
            <span>Last month: ₹{(metrics.totalOutstanding * 0.95).toLocaleString('en-IN', {maximumFractionDigits:0})}</span>
          </div>
        </div>

        {/* Card 2 - Firms Managed */}
        <div className="boltshift-card">
          <div className="card-header-row">
            <span className="card-label">Firms Managed</span>
            <div className="card-header-icon-badge badge-gray-bg">
              <Building2 size={16} />
            </div>
          </div>
          <div className="card-body-row">
            <span className="card-value text-dark">{metrics.totalFirms}</span>
            <div className="card-percent-badge badge-light-blue">
              <span>+1</span>
            </div>
          </div>
          <div className="card-footer-row text-secondary">
            <span>Last month: {metrics.totalFirms - 1}</span>
          </div>
        </div>

        {/* Card 3 - Total Purchase Value */}
        <div className="boltshift-card">
          <div className="card-header-row">
            <span className="card-label">Total Purchase Value</span>
            <div className="card-header-icon-badge badge-gray-bg">
              <FileText size={16} />
            </div>
          </div>
          <div className="card-body-row">
            <span className="card-value text-dark">₹{metrics.totalBills.toLocaleString('en-IN')}</span>
            <div className="card-percent-badge badge-orange">
              <span>↑ 6.0%</span>
            </div>
          </div>
          <div className="card-footer-row text-secondary">
            <span>Last month: ₹{(metrics.totalBills * 0.94).toLocaleString('en-IN', {maximumFractionDigits:0})}</span>
          </div>
        </div>

        {/* Card 4 - Total Payments Sent */}
        <div className="boltshift-card">
          <div className="card-header-row">
            <span className="card-label">Total Payments Sent</span>
            <div className="card-header-icon-badge badge-gray-bg">
              <Activity size={16} />
            </div>
          </div>
          <div className="card-body-row">
            <span className="card-value text-dark">₹{metrics.totalPayments.toLocaleString('en-IN')}</span>
            <div className="card-percent-badge badge-green">
              <span>↑ 2.5%</span>
            </div>
          </div>
          <div className="card-footer-row text-secondary">
            <span>Last month: ₹{(metrics.totalPayments * 0.97).toLocaleString('en-IN', {maximumFractionDigits:0})}</span>
          </div>
        </div>
      </div>

      {/* Middle Section (2 cards) */}
      <div className="boltshift-middle-section">
        {/* Left Card: Performance Overview */}
        <div className="boltshift-panel chart-panel">
          <div className="panel-header flex-between">
            <div>
              <h3>Performance Overview</h3>
            </div>
            <div className="dropdown-action">
              <span>This Week</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>

          <div className="chart-bar-container">
            {/* SVG bar chart */}
            <svg viewBox="0 0 500 160" className="bar-chart-svg">
              <defs>
                {/* Diagonal stripes pattern for the active bar */}
                <pattern id="diagonalStripes" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="10" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="3" />
                </pattern>
                <linearGradient id="activeBarGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1a73e8" />
                  <stop offset="100%" stopColor="#4285f4" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0, 1, 2, 3].map((val) => {
                const y = 20 + val * 35;
                return (
                  <line key={val} x1="30" y1={y} x2="480" y2={y} stroke="#f1f5f9" strokeWidth="1" />
                );
              })}

              {/* Y Axis Labels */}
              <text x="5" y="25" fill="#94a3b8" fontSize="8">40k</text>
              <text x="5" y="60" fill="#94a3b8" fontSize="8">30k</text>
              <text x="5" y="95" fill="#94a3b8" fontSize="8">20k</text>
              <text x="5" y="130" fill="#94a3b8" fontSize="8">10k</text>
              <text x="5" y="145" fill="#94a3b8" fontSize="8">0k</text>

              {/* Vertical Pill Bars (Boltshift style) */}
              {[
                { label: 'May', height: 40, active: false },
                { label: 'Jun', height: 75, active: false },
                { label: 'Jul', height: 60, active: false },
                { label: 'Aug', height: 110, active: true },
                { label: 'Sep', height: 45, active: false },
                { label: 'Oct', height: 90, active: false },
                { label: 'Nov', height: 65, active: false },
                { label: 'Dec', height: 50, active: false }
              ].map((bar, idx) => {
                const x = 50 + idx * 54;
                const barWidth = 26;
                const y = 140 - bar.height;
                
                return (
                  <g key={bar.label}>
                    {/* Background capsule */}
                    <rect 
                      x={x} 
                      y="20" 
                      width={barWidth} 
                      height="120" 
                      rx={barWidth / 2} 
                      fill="#f8fafc" 
                    />
                    
                    {/* Filled capsule */}
                    {bar.active ? (
                      <g>
                        <rect 
                          x={x} 
                          y={y} 
                          width={barWidth} 
                          height={bar.height} 
                          rx={barWidth / 2} 
                          fill="url(#activeBarGrad)" 
                        />
                        <rect 
                          x={x} 
                          y={y} 
                          width={barWidth} 
                          height={bar.height} 
                          rx={barWidth / 2} 
                          fill="url(#diagonalStripes)" 
                        />
                      </g>
                    ) : (
                      <rect 
                        x={x} 
                        y={y} 
                        width={barWidth} 
                        height={bar.height} 
                        rx={barWidth / 2} 
                        fill="#e2e8f0" 
                      />
                    )}
                    
                    {/* X Labels */}
                    <text x={x + barWidth / 2} y="152" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="500">{bar.label}</text>
                  </g>
                );
              })}

              {/* Tooltip Overlay (Hover representation) */}
              <g transform="translate(132, 35)">
                <rect x="0" y="0" width="85" height="42" rx="8" fill="#ffffff" filter="drop-shadow(0px 4px 12px rgba(0,0,0,0.06))" stroke="#e2e8f0" strokeWidth="1" />
                <text x="8" y="14" fill="#94a3b8" fontSize="7.5" fontWeight="600">August 2026</text>
                <circle cx="12" cy="24" r="2.5" fill="#e2e8f0" />
                <text x="18" y="26.5" fill="#1e293b" fontSize="8" fontWeight="500">Total Bills: 14</text>
                <circle cx="12" cy="33" r="2.5" fill="#1a73e8" />
                <text x="18" y="35.5" fill="#1e293b" fontSize="8" fontWeight="500">Value: ₹{Number(83240).toLocaleString('en-IN', {maximumFractionDigits:0})}</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Right Card: Sales Overview Arc Gauge */}
        <div className="boltshift-panel gauge-panel">
          <div className="panel-header flex-between">
            <h3>Sales Overview</h3>
            <MoreHorizontal size={20} className="text-secondary" style={{ cursor: 'pointer' }} />
          </div>

          <div className="gauge-chart-container">
            <svg viewBox="0 0 200 120" className="gauge-svg">
              {/* Segmented arc gauge */}
              {[...Array(12)].map((_, idx) => {
                const angle = 180 + (idx * 180) / 11; // 180deg to 360deg
                const rad = (angle * Math.PI) / 180;
                
                const r1 = 62;
                const r2 = 78;
                
                const x1 = 100 + r1 * Math.cos(rad);
                const y1 = 100 + r1 * Math.sin(rad);
                const x2 = 100 + r2 * Math.cos(rad);
                const y2 = 100 + r2 * Math.sin(rad);
                
                // Color segments dynamically to fill up to 70%
                const fillPercent = 70.8;
                const isActive = (idx / 11) * 100 <= fillPercent;
                const color = isActive ? `hsl(217, 90%, ${50 + (11 - idx) * 2}%)` : '#f1f5f9';
                
                return (
                  <line 
                    key={idx}
                    x1={x1} 
                    y1={y1} 
                    x2={x2} 
                    y2={y2} 
                    stroke={color} 
                    strokeWidth="7" 
                    strokeLinecap="round"
                  />
                );
              })}

              <text x="100" y="80" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="700">70.8%</text>
              <text x="100" y="96" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="500">Sales Growth</text>
            </svg>
          </div>

          <div className="gauge-mini-stats">
            <div className="mini-stat-card">
              <span className="stat-label">Number of Sales</span>
              <div className="stat-value-row">
                <span className="stat-value">2,343</span>
                <span className="mini-badge-orange">4.5% ↗</span>
              </div>
            </div>
            <div className="mini-stat-card">
              <span className="stat-label">Total Revenue</span>
              <div className="stat-value-row">
                <span className="stat-value">₹30.9k</span>
                <span className="mini-badge-black">4.5% ↗</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent transactions table */}
      <div className="boltshift-panel table-panel" style={{ padding: '0px' }}>
        <div className="table-panel-header flex-between" style={{ padding: '24px' }}>
          <h3>Recent transactions</h3>
          <div className="table-header-controls">
            <div className="search-bar-widget">
              <Search size={16} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="dropdown-action">
              <SlidersHorizontal size={16} />
              <span>Sort by</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="boltshift-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}><input type="checkbox" readOnly /></th>
                <th>Supplier / Firm</th>
                <th>Transaction Date</th>
                <th>Type</th>
                <th>Status</th>
                <th className="align-right">Amount</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '48px', color: '#94a3b8' }}>
                    No recent transactions found matching search.
                  </td>
                </tr>
              ) : (
                filteredActivities.map((act) => (
                  <tr key={`${act.type}-${act.id}`} onClick={() => navigate(`/app/firms/${act.firmId}`)} style={{ cursor: 'pointer' }}>
                    <td><input type="checkbox" onClick={(e) => e.stopPropagation()} readOnly /></td>
                    <td>
                      <div className="supplier-table-cell">
                        <div className="supplier-logo-avatar">{act.firmName[0]}</div>
                        <span className="supplier-name-bold">{act.firmName}</span>
                      </div>
                    </td>
                    <td>{format(new Date(act.date), 'dd MMM yyyy')}</td>
                    <td>
                      <span className={`type-tag ${act.type}`}>
                        {act.title}
                      </span>
                    </td>
                    <td>
                      <span className={`status-tag ${act.status.toLowerCase()}`}>
                        {act.status}
                      </span>
                    </td>
                    <td className={`align-right table-amount ${act.type === 'bill' ? 'debit' : 'credit'}`}>
                      {act.type === 'bill' ? '+' : '-'} ₹{act.amount.toLocaleString('en-IN')}
                    </td>
                    <td>
                      <button className="view-receipt-btn" onClick={(e) => e.stopPropagation()}>
                        <Eye size={14} /> View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
