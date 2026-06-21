import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { format } from 'date-fns';
import Papa from 'papaparse';
import { ArrowLeft, Download, Eye, ReceiptText, Plus, X, Upload, Check } from 'lucide-react';

export default function FirmLedger() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [firm, setFirm] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState('bill'); // 'bill' or 'payment'
  const [submitting, setSubmitting] = useState(false);
  const [modalError, setModalError] = useState(null);

  // Form States - Bill
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [grandTotal, setGrandTotal] = useState('');
  const [billGst, setBillGst] = useState('');
  
  // Form States - Payment
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [paymentMode, setPaymentMode] = useState('UPI');
  const [notes, setNotes] = useState('');

  // Attachment states
  const [attachmentFile, setAttachmentFile] = useState(null);
  const [attachmentPreview, setAttachmentPreview] = useState(null);

  async function fetchLedger(currentUser) {
    try {
      const activeUser = currentUser || user;
      if (!activeUser) return;

      // 1. Fetch firm details
      const { data: firmData, error: firmError } = await supabase
        .from('firms')
        .select('*')
        .eq('id', id)
        .eq('user_id', activeUser.id)
        .single();

      if (firmError) throw firmError;
      if (firmData) {
        setFirm(firmData);
        setBillGst(firmData.gst_number || '');
      }

      // 2. Fetch bills
      const { data: billsData, error: billsError } = await supabase
        .from('bills')
        .select('*')
        .eq('firm_id', id);
        
      if (billsError) throw billsError;

      // 3. Fetch payments
      const { data: paymentsData, error: paymentsError } = await supabase
        .from('payments')
        .select('*')
        .eq('firm_id', id);

      if (paymentsError) throw paymentsError;

      // 4. Combine and Sort
      const combined = [
        ...(billsData || []).map(b => ({
          id: b.id,
          date: b.invoice_date || b.created_at,
          type: 'bill',
          reference: b.invoice_number ? `Inv #${b.invoice_number}` : 'Bill',
          debit: Number(b.grand_total),
          credit: null,
          image_url: b.image_url,
          status: 'Unpaid'
        })),
        ...(paymentsData || []).map(p => ({
          id: p.id,
          date: p.payment_date || p.created_at,
          type: 'payment',
          reference: p.payment_mode ? `${p.payment_mode}${p.notes ? ` - ${p.notes}` : ''}` : 'Payment',
          debit: null,
          credit: Number(p.payment_amount),
          image_url: p.image_url,
          status: 'Cleared'
        }))
      ];

      // Sort by date descending
      combined.sort((a, b) => new Date(b.date) - new Date(a.date));
      setTransactions(combined);
      
    } catch (err) {
      console.error("Error fetching ledger data:", err);
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
      fetchLedger(currentUser);
    }
    init();
  }, [id, navigate]);

  const handleExportCSV = () => {
    if (transactions.length === 0) return;
    
    const exportData = transactions.map(t => ({
      Date: format(new Date(t.date), 'dd MMM yyyy'),
      Type: t.type.toUpperCase(),
      Reference: t.reference || '',
      Debit: t.debit ? Number(t.debit).toFixed(2) : '0.00',
      Credit: t.credit ? Number(t.credit).toFixed(2) : '0.00'
    }));

    const csv = Papa.unparse(exportData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${firm?.firm_name || 'firm'}_ledger.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachmentFile(file);
      setAttachmentPreview(URL.createObjectURL(file));
    }
  };

  const uploadFile = async (file) => {
    if (!file) return null;
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    // Upload to 'attachments' storage bucket
    const { error: uploadError } = await supabase.storage
      .from('attachments')
      .upload(filePath, file);

    if (uploadError) {
      console.warn("Storage upload failed, using data URI placeholder instead:", uploadError.message);
      // Fallback: Read file as Base64 data URL so they can still test
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    }

    const { data: { publicUrl } } = supabase.storage
      .from('attachments')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleAddTransactionSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setModalError(null);

    try {
      let finalImageUrl = null;
      if (attachmentFile) {
        finalImageUrl = await uploadFile(attachmentFile);
      }

      if (modalType === 'bill') {
        const total = Number(grandTotal);
        if (isNaN(total) || total <= 0) {
          throw new Error("Please enter a valid amount greater than 0");
        }

        // 1. Insert into bills table
        const { error: billError } = await supabase
          .from('bills')
          .insert({
            user_id: user.id,
            firm_id: id,
            invoice_number: invoiceNumber,
            invoice_date: invoiceDate,
            grand_total: total,
            image_url: finalImageUrl,
            gst_number: billGst || null
          });

        if (billError) throw billError;

        // 2. Update outstanding balance
        const currentBalance = Number(firm.outstanding_balance || 0);
        const newBalance = currentBalance + total;
        
        const { error: firmUpdateError } = await supabase
          .from('firms')
          .update({ outstanding_balance: newBalance })
          .eq('id', id);

        if (firmUpdateError) throw firmUpdateError;

      } else {
        const amount = Number(paymentAmount);
        if (isNaN(amount) || amount <= 0) {
          throw new Error("Please enter a valid payment amount greater than 0");
        }

        // 1. Insert into payments table
        const { error: paymentError } = await supabase
          .from('payments')
          .insert({
            user_id: user.id,
            firm_id: id,
            payment_amount: amount,
            payment_date: paymentDate,
            payment_mode: paymentMode,
            notes: notes || null,
            image_url: finalImageUrl
          });

        if (paymentError) throw paymentError;

        // 2. Update outstanding balance
        const currentBalance = Number(firm.outstanding_balance || 0);
        const newBalance = currentBalance - amount;

        const { error: firmUpdateError } = await supabase
          .from('firms')
          .update({ outstanding_balance: newBalance })
          .eq('id', id);

        if (firmUpdateError) throw firmUpdateError;
      }

      // Reset form states
      setInvoiceNumber('');
      setInvoiceDate(format(new Date(), 'yyyy-MM-dd'));
      setGrandTotal('');
      setPaymentAmount('');
      setPaymentDate(format(new Date(), 'yyyy-MM-dd'));
      setPaymentMode('UPI');
      setNotes('');
      setAttachmentFile(null);
      setAttachmentPreview(null);
      
      setShowAddModal(false);
      
      // Refresh details
      await fetchLedger();

    } catch (err) {
      console.error("Submit transaction error:", err);
      setModalError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="dashboard-loading">Loading Ledger...</div>;
  if (!firm) return <div className="dashboard-page">Firm not found.</div>;

  return (
    <div className="dashboard-page boltshift-theme">
      {/* Back navigation button */}
      <div className="ledger-header-nav" style={{ marginBottom: '16px' }}>
        <button className="back-btn" onClick={() => navigate('/app/firms')} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer' }}>
          <ArrowLeft size={16} />
          <span>Back to Firms</span>
        </button>
      </div>

      {/* Firm Ledger Header Card (Boltshift Style) */}
      <header className="boltshift-card" style={{ marginBottom: '24px', padding: '24px 28px', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <div className="supplier-table-cell" style={{ marginBottom: '8px' }}>
            <div className="supplier-logo-avatar" style={{ width: '40px', height: '40px', fontSize: '1.2rem' }}>{firm.firm_name[0]}</div>
            <h1 style={{ fontWeight: 700, fontSize: '1.75rem', letterSpacing: '-0.02em', color: '#0f172a' }}>{firm.firm_name}</h1>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '12px' }}>
            {firm.gst_number && <span className="mini-badge-black">GST: {firm.gst_number}</span>}
            {firm.phone && <span className="mini-badge-orange">📞 {firm.phone}</span>}
            {firm.address && <span className="mini-badge-orange">📍 {firm.address}</span>}
          </div>
        </div>

        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Outstanding Balance</span>
          <h2 className={firm.outstanding_balance > 0 ? 'debit' : 'credit'} style={{ fontSize: '2.25rem', fontWeight: 700, margin: 0 }}>
            ₹{Number(firm.outstanding_balance).toLocaleString('en-IN')}
          </h2>
          <div className="ledger-hero-actions" style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
            <button className="action-btn" onClick={handleExportCSV}>
              <Download size={16} />
              <span>Export CSV</span>
            </button>
            <button className="action-btn btn-blue-accent" onClick={() => setShowAddModal(true)}>
              <Plus size={16} />
              <span>Add Transaction</span>
            </button>
          </div>
        </div>
      </header>

      {/* Transaction History (Boltshift Table Panel) */}
      <div className="boltshift-panel table-panel" style={{ padding: '0px' }}>
        <div className="table-panel-header flex-between" style={{ padding: '24px', borderBottom: '1px solid var(--outline)' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>Transaction History</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Showing {transactions.length} record{transactions.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="table-responsive">
          {transactions.length === 0 ? (
            <div className="empty-state" style={{ padding: '48px', textAlign: 'center' }}>
              <ReceiptText size={40} style={{ color: 'var(--text-tertiary)', margin: '0 auto 8px', opacity: 0.5 }} />
              <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>No transactions recorded for this firm.</p>
              <button className="action-btn btn-blue-accent" onClick={() => setShowAddModal(true)}>
                Add First Transaction
              </button>
            </div>
          ) : (
            <table className="boltshift-table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}><input type="checkbox" readOnly /></th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Reference / Notes</th>
                  <th className="align-right">Debit (Bill)</th>
                  <th className="align-right">Credit (Payment)</th>
                  <th>Attachment</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(t => (
                  <tr key={t.id}>
                    <td><input type="checkbox" readOnly /></td>
                    <td>{format(new Date(t.date), 'dd MMM yyyy')}</td>
                    <td>
                      <span className={`type-tag ${t.type}`}>
                        {t.type === 'bill' ? 'Purchase Bill' : 'Supplier Payment'}
                      </span>
                    </td>
                    <td>{t.reference || '-'}</td>
                    <td className="align-right debit table-amount" style={{ fontWeight: 600 }}>
                      {t.debit ? `+ ₹${Number(t.debit).toLocaleString('en-IN')}` : '-'}
                    </td>
                    <td className="align-right credit table-amount" style={{ fontWeight: 600 }}>
                      {t.credit ? `- ₹${Number(t.credit).toLocaleString('en-IN')}` : '-'}
                    </td>
                    <td>
                      {t.image_url ? (
                        <a href={t.image_url} target="_blank" rel="noopener noreferrer" className="view-receipt-btn">
                          <Eye size={14} />
                          <span>View Receipt</span>
                        </a>
                      ) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modern Google-Style Add Transaction Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-container glass-panel">
            <div className="modal-header">
              <h2>Add New Transaction</h2>
              <button className="modal-close-btn" onClick={() => setShowAddModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-tabs">
              <button 
                className={`modal-tab-btn ${modalType === 'bill' ? 'active' : ''}`}
                onClick={() => { setModalType('bill'); setModalError(null); }}
              >
                Purchase Bill (Debit)
              </button>
              <button 
                className={`modal-tab-btn ${modalType === 'payment' ? 'active' : ''}`}
                onClick={() => { setModalType('payment'); setModalError(null); }}
              >
                Supplier Payment (Credit)
              </button>
            </div>

            {modalError && <div className="auth-error" style={{ margin: '16px 24px 0 24px' }}>{modalError}</div>}

            <form onSubmit={handleAddTransactionSubmit} className="modal-form">
              {modalType === 'bill' ? (
                /* Purchase Bill Form */
                <>
                  <div className="form-group">
                    <label>Invoice Number</label>
                    <input 
                      type="text" 
                      placeholder="e.g. GST-10294" 
                      value={invoiceNumber} 
                      onChange={(e) => setInvoiceNumber(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Invoice Date</label>
                      <input 
                        type="date" 
                        value={invoiceDate} 
                        onChange={(e) => setInvoiceDate(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Grand Total (₹)</label>
                      <input 
                        type="number" 
                        step="0.01"
                        placeholder="0.00" 
                        value={grandTotal} 
                        onChange={(e) => setGrandTotal(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>GST Number (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 27AAAAA1111A1Z1" 
                      value={billGst} 
                      onChange={(e) => setBillGst(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                /* Supplier Payment Form */
                <>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Payment Date</label>
                      <input 
                        type="date" 
                        value={paymentDate} 
                        onChange={(e) => setPaymentDate(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Payment Amount (₹)</label>
                      <input 
                        type="number" 
                        step="0.01"
                        placeholder="0.00" 
                        value={paymentAmount} 
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Payment Mode</label>
                    <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
                      <option value="UPI">UPI / GPay / PhonePe</option>
                      <option value="Cash">Cash</option>
                      <option value="Bank Transfer">Bank Transfer (IMPS/NEFT)</option>
                      <option value="Net Banking">Net Banking</option>
                      <option value="Cheque">Cheque</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Notes / Reference (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Txn ref number, Cheque details" 
                      value={notes} 
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </>
              )}

              {/* Shared Image Upload Section */}
              <div className="form-group">
                <label>Attach Bill / Receipt Photo (Optional)</label>
                <div className="image-upload-box">
                  <input 
                    type="file" 
                    id="file-upload" 
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="file-upload" className="image-upload-label">
                    {attachmentPreview ? (
                      <div className="preview-container">
                        <img src={attachmentPreview} alt="Receipt Preview" className="upload-preview" />
                        <span className="change-photo-btn">Change Photo</span>
                      </div>
                    ) : (
                      <>
                        <Upload size={24} className="upload-icon" />
                        <span>Upload Receipt / Invoice Image</span>
                        <small>Supports PNG, JPG, JPEG</small>
                      </>
                    )}
                  </label>
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
                  {submitting ? 'Adding...' : 'Save Transaction'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
