<template>
  <div class="page">
    <div class="page-header">
      <h1>🏛️ National Regulatory Overview</h1>
      <p class="subtitle">Regional compliance, safety, and analytics dashboard</p>
    </div>

    <div class="stats-grid">
      <StatsCard icon="🏢" label="Total Expresses" value="12" trend="+1 this month" />
      <StatsCard icon="🚌" label="Active Buses Today" value="234" trend="+15 vs yesterday" />
      <StatsCard icon="👥" label="Passengers Today" value="12,456" trend="+8%" />
      <StatsCard icon="📣" label="Open Complaints" value="34" trend="-5 resolved" />
    </div>

    <div class="cards-row">
      <div class="card card-full">
        <h3>🏢 Express Companies Performance</h3>
        <table class="data-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Passengers</th>
              <th>Fleet Size</th>
              <th>Safety Rating</th>
              <th>Compliance Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>On The Go Express</td>
              <td>3,456</td>
              <td>28</td>
              <td>4.8⭐</td>
              <td><span class="badge badge-compliance">✓ Compliant</span></td>
            </tr>
            <tr>
              <td>Safaris East</td>
              <td>2,890</td>
              <td>22</td>
              <td>4.6⭐</td>
              <td><span class="badge badge-compliance">✓ Compliant</span></td>
            </tr>
            <tr>
              <td>Crown Coaches</td>
              <td>2,145</td>
              <td>18</td>
              <td>4.5⭐</td>
              <td><span class="badge badge-warning">⚠ Under Review</span></td>
            </tr>
            <tr>
              <td>Nyambera Travels</td>
              <td>1,890</td>
              <td>15</td>
              <td>4.3⭐</td>
              <td><span class="badge badge-compliance">✓ Compliant</span></td>
            </tr>
            <tr>
              <td>Swift Transit</td>
              <td>1,075</td>
              <td>12</td>
              <td>3.9⭐</td>
              <td><span class="badge badge-error">✗ Non-Compliant</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="cards-row">
      <div class="card">
        <h3>📊 Complaint Categories</h3>
        <div class="stat-row">
          <span>Driver Behavior</span>
          <span class="value warn">12</span>
        </div>
        <div class="stat-row">
          <span>Vehicle Condition</span>
          <span class="value warn">8</span>
        </div>
        <div class="stat-row">
          <span>Service Quality</span>
          <span class="value">6</span>
        </div>
        <div class="stat-row">
          <span>Pricing Issues</span>
          <span class="value">5</span>
        </div>
        <div class="stat-row">
          <span>Safety Concerns</span>
          <span class="value error">3</span>
        </div>
      </div>
      <div class="card">
        <h3>🎯 Regulatory Actions</h3>
        <div class="action-item">
          <div class="action-type">Warning Issued</div>
          <span class="value">2</span>
        </div>
        <div class="action-item">
          <div class="action-type">Fine Imposed</div>
          <span class="value">1</span>
        </div>
        <div class="action-item">
          <div class="action-type">Inspection Scheduled</div>
          <span class="value">3</span>
        </div>
        <div class="action-item">
          <div class="action-type">Certification Renewed</div>
          <span class="value success">5</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import StatsCard from '../../components/admin/StatsCard.vue'
</script>

<style scoped>
.page {
  padding: 0;
}

.page-header {
  margin-bottom: 32px;
}

.page-header h1 {
  margin: 0 0 8px 0;
  font-size: 28px;
}

.subtitle {
  margin: 0;
  color: #757575;
  font-size: 14px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.cards-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e8ecf1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.card-full {
  grid-column: 1 / -1;
}

.card h3 {
  margin: 0 0 20px 0;
  font-size: 16px;
  font-weight: 600;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th {
  background: #f5f6fa;
  padding: 12px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #424242;
  border-bottom: 1px solid #e8ecf1;
}

.data-table td {
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 13px;
}

.data-table tbody tr:hover {
  background: #fafafa;
}

.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
}

.badge-compliance {
  background: #e8f5e9;
  color: #2e7d32;
}

.badge-warning {
  background: #fff3e0;
  color: #f57c00;
}

.badge-error {
  background: #ffebee;
  color: #c62828;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 13px;
}

.stat-row:last-child {
  border-bottom: none;
}

.action-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 13px;
}

.action-item:last-child {
  border-bottom: none;
}

.action-type {
  color: #424242;
}

.value {
  font-weight: 600;
}

.value.warn {
  color: #f57c00;
}

.value.error {
  color: #c62828;
}

.value.success {
  color: #2e7d32;
}

@media (max-width: 768px) {
  .cards-row {
    grid-template-columns: 1fr;
  }
}
</style>
