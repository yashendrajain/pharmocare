import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Building2, Search, ArrowRight, Plus, X, Phone, MapPin, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Firms() {
  const [user, setUser] = useState(null);
  const [firms, setFirms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [firmName, setFirmName] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [modalError, setModalError] = useState(null);

  const navigate = useNavigate();

  async function fetchFirms(currentUser) {
    try {
      const activeUser = currentUser || user;
      if (!activeUser) return;

      const { data, error } = await supabase
        .from('firms')
        .select('*')
        .eq('user_id', activeUser.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) {
        setFirms(data);
      }
    } catch (err) {
      console.error("Error fetching firms:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function init() {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (!currentUser) {
        navigate('/auth');
        return;
      }
      setUser(currentUser);
      fetchFirms(currentUser);
    }
    init();
  }, [navigate]);

  const handleAddFirmSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setModalError(null);

    try {
      if (!firmName.trim()) {
        throw new Error("Firm Name is required");
      }

      const { data, error } = await supabase
        .from('firms')
        .insert({
          user_id: user.id,
          firm_name: firmName.trim(),
          gst_number: gstNumber.trim() || null,
          phone: phone.trim() || null,
          address: address.trim() || null,
          outstanding_balance: 0
        })
        .select();

      if (error) throw error;

      // Reset fields
      setFirmName('');
      setGstNumber('');
      setPhone('');
      setAddress('');
      setShowAddModal(false);

      // Refresh list
      await fetchFirms();

    } catch (err) {
      console.error("Add firm error:", err);
      setModalError(err.message || "Failed to create firm. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredFirms = firms.filter(firm => 
    firm.firm_name.toLowerCase().includes(search.toLowerCase()) || 
    (firm.gst_number && firm.gst_number.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="dashboard-page boltshift-theme">
      {/* Title Bar (Boltshift Style) */}
      <div className="dashboard-title-bar">
        <div>
          <h1>Firms & Ledgers</h1>
          <p className="subtitle">Manage all your supplier ledgers and view transaction histories.</p>
        </div>
        <div className="title-actions">
          <button 
            className="action-btn btn-blue-accent"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={16} />
            <span>Add Firm</span>
          </button>
        </div>
      </div>

      {/* Search Input Widget */}
      <div className="search-bar-widget" style={{ width: '100%', maxWidth: '360px', marginBottom: '24px' }}>
        <Search size={16} className="search-icon" />
        <input 
          type="text" 
          placeholder="Search by firm name or GST..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="dashboard-loading">Loading firms...</div>
      ) : (
        <div className="boltshift-cards-row">
          {filteredFirms.length === 0 ? (
            <div className="boltshift-panel flex-column" style={{ padding: '48px', textAlign: 'center', gridColumn: '1 / -1', alignItems: 'center', justifyContent: 'center' }}>
              <Building2 size={48} style={{ color: 'var(--text-tertiary)', marginBottom: '16px' }} />
              <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>No supplier firms found.</p>
              <button className="action-btn btn-blue-accent" onClick={() => setShowAddModal(true)}>
                <Plus size={16} /> Add First Firm
              </button>
            </div>
          ) : (
            filteredFirms.map(firm => (
              <div 
                key={firm.id} 
                className="boltshift-card"
                onClick={() => navigate(`/app/firms/${firm.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-header-row">
                  <div className="supplier-table-cell">
                    <div className="supplier-logo-avatar">{firm.firm_name[0]}</div>
                    <span className="supplier-name-bold" style={{ fontSize: '1rem' }}>{firm.firm_name}</span>
                  </div>
                </div>
                
                <div className="card-body-row" style={{ marginTop: '8px', borderBottom: '1px solid var(--outline)', paddingBottom: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>GSTIN: {firm.gst_number || 'N/A'}</span>
                    {firm.phone && <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Phone: {firm.phone}</span>}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>Outstanding</span>
                    <span className={firm.outstanding_balance > 0 ? 'debit' : 'credit'} style={{ fontWeight: 700, fontSize: '1.2rem' }}>
                      ₹{Number(firm.outstanding_balance).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="card-footer-row flex-between text-secondary" style={{ paddingTop: '4px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>View Complete Ledger</span>
                  <ArrowRight size={14} style={{ color: 'var(--primary)' }} />
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modern Add Firm Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-container glass-panel">
            <div className="modal-header">
              <h2>Add New Firm / Supplier</h2>
              <button className="modal-close-btn" onClick={() => setShowAddModal(false)}>
                <X size={20} />
              </button>
            </div>

            {modalError && <div className="auth-error" style={{ margin: '16px 24px 0 24px' }}>{modalError}</div>}

            <form onSubmit={handleAddFirmSubmit} className="modal-form">
              <div className="form-group">
                <label>Firm / Supplier Name</label>
                <div className="input-with-icon">
                  <Building2 className="input-icon" size={18} style={{ left: '16px', position: 'absolute', color: 'var(--text-tertiary)' }} />
                  <input 
                    type="text" 
                    placeholder="e.g. Balaji Medical Distributors" 
                    value={firmName}
                    onChange={(e) => setFirmName(e.target.value)}
                    style={{ paddingLeft: '48px' }}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>GSTIN Number (Optional)</label>
                <div className="input-with-icon">
                  <FileText className="input-icon" size={18} style={{ left: '16px', position: 'absolute', color: 'var(--text-tertiary)' }} />
                  <input 
                    type="text" 
                    placeholder="e.g. 27AAAAA1111A1Z1" 
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value)}
                    style={{ paddingLeft: '48px', textTransform: 'uppercase' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Phone Number (Optional)</label>
                <div className="input-with-icon">
                  <Phone className="input-icon" size={18} style={{ left: '16px', position: 'absolute', color: 'var(--text-tertiary)' }} />
                  <input 
                    type="tel" 
                    placeholder="e.g. 9876543210" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ paddingLeft: '48px' }}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Billing Address (Optional)</label>
                <div className="input-with-icon">
                  <MapPin className="input-icon" size={18} style={{ left: '16px', position: 'absolute', color: 'var(--text-tertiary)' }} />
                  <input 
                    type="text" 
                    placeholder="e.g. Shop 4, Sector 15, Vashi, Navi Mumbai" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{ paddingLeft: '48px' }}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn-secondary" 
                  onClick={() => setShowAddModal(false)}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary" 
                  disabled={submitting}
                >
                  {submitting ? 'Creating...' : 'Create Firm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
