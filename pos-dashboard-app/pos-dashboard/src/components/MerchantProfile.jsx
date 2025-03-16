// components/MerchantProfile.jsx
export default function MerchantProfile({ merchant }) {
    if (!merchant) return null;
    
    return (
      <div className="merchant-profile">
        <h2>Merchant Profile</h2>
        <div className="profile-card">
          <div className="profile-header">
            <div className="merchant-name">{merchant.merchant_name}</div>
          </div>
          <div className="profile-details">
            <div className="detail-item">
              <span className="label">Business Type:</span>
              <span className="value">{merchant.business_type}</span>
            </div>
            <div className="detail-item">
              <span className="label">Email:</span>
              <span className="value">{merchant.email}</span>
            </div>
            <div className="detail-item">
              <span className="label">Phone:</span>
              <span className="value">{merchant.phone}</span>
            </div>
            <div className="detail-item">
              <span className="label">Merchant ID:</span>
              <span className="value">{merchant.merchant_id}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  