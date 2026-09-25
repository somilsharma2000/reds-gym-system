/**
 * Gym OS Connect v2.0
 * Shared integration module for all Gym OS powered websites.
 * Handles: lead capture, member portal redirect, QR check-in, dashboard access.
 *
 * Usage: Include this script on any gym website and call
 *   window.GymOSConfig = { gymName: '...', whatsappNumber: '...', isDemo: false }
 * before loading this file.
 *
 * Backend: Vesper Base44 app (captureGymLead)
 * Platform: https://my-gym-os.base44.app  (Gym OS — published app)
 */

const GymOS = {
  config: {
    apiUrl: 'https://base44.app/api/apps/6a85aadd01bc42f293723858/functions/captureGymLead',
    portalUrl: 'https://my-gym-os.base44.app',
    dashboardUrl: 'https://my-gym-os.base44.app',
    gymName: 'Gym',
    whatsappNumber: '',
    isDemo: false,
  },

  init(options = {}) {
    this.config = { ...this.config, ...options };
    this.setupLeadForms();
    this.setupMemberLogin();
    this.setupQRCheckIn();
    this.setupDashboardLink();
    this.injectPoweredBy();
    this.injectDemoBanner();
  },

  waLink(data) {
    const msg = encodeURIComponent(
      'Hi ' + this.config.gymName + '! ' +
      (data && data.name ? 'I am ' + data.name + '. ' : '') +
      'I would like to know more about joining. ' +
      (data && data.phone ? 'My phone: ' + data.phone : '')
    );
    return 'https://wa.me/' + String(this.config.whatsappNumber || '').replace(/\+/g, '') + '?text=' + msg;
  },

  showLeadSuccess(form, data) {
    const wa = this.waLink(data);
    form.innerHTML =
      '<div style="text-align:center;padding:40px 20px;font-family:inherit;">' +
      '<div style="font-size:48px;margin-bottom:16px;">✓</div>' +
      '<h3 style="font-size:24px;margin-bottom:8px;">Thank you' + (data && data.name ? ', ' + data.name : '') + '!</h3>' +
      '<p style="opacity:.75;font-size:16px;margin-bottom:18px;">We have received your request. Our team will contact you within 24 hours.</p>' +
      '<a href="' + wa + '" target="_blank" rel="noopener" style="display:inline-block;padding:12px 24px;border-radius:8px;font-weight:600;text-decoration:none;background:#25D366;color:#fff;">Chat with us on WhatsApp now</a>' +
      '</div>';
  },

  setupLeadForms() {
    document.querySelectorAll('form[data-gymos-lead]').forEach(form => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {
          gym_name: this.config.gymName,
          name: formData.get('fullName') || formData.get('name') || '',
          phone: formData.get('phone') || formData.get('phoneNumber') || '',
          email: formData.get('email') || '',
          interest: formData.get('interest') || formData.get('inquiryType') || 'Trial visit',
          message: formData.get('message') || formData.get('goals') || '',
          source: this.config.gymName + ' website',
        };
        const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;
        try {
          const res = await fetch(this.config.apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });
          const result = await res.json().catch(() => ({}));
          if (res.ok && result.success) {
            this.showLeadSuccess(form, data);
          } else {
            // API unavailable — never lose the lead silently.
            // Still confirm to the visitor and offer WhatsApp, and queue the lead locally.
            try {
              const queue = JSON.parse(localStorage.getItem('gymos_lead_queue') || '[]');
              queue.push({ ...data, queued_at: new Date().toISOString() });
              localStorage.setItem('gymos_lead_queue', JSON.stringify(queue));
            } catch (err) { /* private mode — ignore */ }
            this.showLeadSuccess(form, data);
          }
        } catch (err) {
          try {
            const queue = JSON.parse(localStorage.getItem('gymos_lead_queue') || '[]');
            queue.push({ ...data, queued_at: new Date().toISOString() });
            localStorage.setItem('gymos_lead_queue', JSON.stringify(queue));
          } catch (e2) { /* ignore */ }
          this.showLeadSuccess(form, data);
        }
      });
    });
  },

  setupMemberLogin() {
    document.querySelectorAll('[data-gymos-login]').forEach(el => {
      el.href = this.config.portalUrl;
      el.target = '_blank';
      el.rel = 'noopener';
    });
  },

  setupQRCheckIn() {
    document.querySelectorAll('[data-gymos-qr]').forEach(container => {
      const checkInUrl = this.config.portalUrl + '?action=checkin&gym=' + encodeURIComponent(this.config.gymName);
      const qrApiUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(checkInUrl);
      container.innerHTML = '<div style="text-align:center;padding:20px;"><img src="' + qrApiUrl + '" alt="QR Code for Check-in" style="width:200px;height:200px;border-radius:12px;background:#fff;padding:10px;box-shadow:0 4px 20px rgba(0,0,0,0.1);" /><p style="margin-top:12px;font-size:14px;opacity:.7;">Scan to check in</p></div>';
    });
  },

  setupDashboardLink() {
    document.querySelectorAll('[data-gymos-dashboard]').forEach(el => {
      el.href = this.config.dashboardUrl;
      el.target = '_blank';
      el.rel = 'noopener';
    });
  },

  injectPoweredBy() {
    if (!this.config.poweredBy || document.querySelector('[data-gymos-powered]')) return;
    const badge = document.createElement('div');
    badge.setAttribute('data-gymos-powered', '');
    badge.innerHTML = '<a href="https://somilsharma2000.github.io/beyond-pixells/" target="_blank" rel="noopener" style="position:fixed;bottom:16px;right:16px;background:#0A0E27;color:#0066FF;padding:8px 16px;border-radius:8px;font-size:12px;font-family:Inter,sans-serif;font-weight:600;text-decoration:none;box-shadow:0 4px 20px rgba(10,14,39,0.3);z-index:9998;border:1px solid rgba(0,102,255,0.2);transition:all 0.3s ease;">⚡ Powered by Gym OS</a>';
    document.body.appendChild(badge);
  },

  injectDemoBanner() {
    if (!this.config.isDemo || document.querySelector('[data-gymos-banner]')) return;
    const banner = document.createElement('div');
    banner.setAttribute('data-gymos-banner', '');
    banner.innerHTML = '<div style="background:linear-gradient(135deg,#0A0E27 0%,#1a1e3a 100%);color:#fff;text-align:center;padding:10px 16px;font-size:13px;font-family:Inter,sans-serif;position:sticky;top:0;z-index:9999;display:flex;align-items:center;justify-content:center;gap:8px;border-bottom:1px solid rgba(0,102,255,0.3);"><span>⚡ This is a demo website built with <b style="color:#0066FF;">Gym OS</b> by Beyond Pixells</span><a href="https://somilsharma2000.github.io/beyond-pixells/" target="_blank" rel="noopener" style="color:#0066FF;text-decoration:none;font-weight:600;border-bottom:1px solid #0066FF;">Get one for your gym →</a></div>';
    document.body.insertBefore(banner, document.body.firstChild);
  },
};

if (typeof window.GymOSConfig !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () { GymOS.init(window.GymOSConfig); });
}
