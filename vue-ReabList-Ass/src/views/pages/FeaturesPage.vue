<template>
  <div>
    <NavbarLandingPage />

    <!-- Hero Banner -->
    <header class="hero-banner">
      <div class="hero-image-side"></div>
      <div class="container hero-content">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <span
              class="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 px-4 py-2 rounded-pill fw-800 uppercase tracking-widest mb-4"
              style="font-size: 11px"
              >PRO INVENTORY HUD</span
            >
            <h1 class="display-large display-1 mb-4">
              Your Flow.<br /><span class="gradient-accent">Orchestrated.</span>
            </h1>
            <p class="lead mb-5 fw-500 text-muted col-lg-11">
              The elite inventory and task system for power users. Effortlessly
              manage stock entries with automated 15-minute Telegram alerts,
              visual SKU evidence, and real-time process auditing.
            </p>
            <div class="d-flex gap-3">
              <a
                href="index.html"
                class="btn btn-primary rounded-4 px-5 py-3 fw-800 border-0 shadow-lg"
                style="background: var(--primary)"
                >Enter Ledger</a
              >
              <button
                class="btn btn-outline-dark rounded-4 px-5 py-3 fw-800 border-opacity-25"
              >
                View Documentation
              </button>
            </div>
          </div>
          <div class="col-lg-5 offset-lg-1 d-none d-lg-block">
            <!-- Floating Container with extra nodes -->
            <div class="floating-container">
              <!-- Secondary Floating Nodes -->
              <div class="floating-node node-1">
                <i class="fas fa-barcode"></i> SKU:Verified
              </div>
              <div class="floating-node node-2">
                <i class="fas fa-exclamation-triangle"></i> Stock Alert
              </div>
              <div class="floating-node node-3">
                <i class="fas fa-check-circle"></i> Sync Ready
              </div>

              <!-- Main Ledger Mockup Card -->
              <div class="floating-mockup">
                <div
                  class="d-flex justify-content-between align-items-center mb-4"
                >
                  <div class="fw-800 text-dark">Today's Ledger</div>
                  <i class="fas fa-calendar-alt text-muted"></i>
                </div>

                <div class="mockup-item">
                  <div class="check-box"></div>
                  <div class="flex-grow-1">
                    <div class="fw-700 small">Recount Aisle 4</div>
                    <div class="x-small text-muted">SKU: HD-400 • 2m ago</div>
                  </div>
                </div>

                <div class="mockup-item active">
                  <div class="check-box"><i class="fas fa-check"></i></div>
                  <div class="flex-grow-1">
                    <div class="fw-700 small">Audit Batch B-101</div>
                    <div class="x-small text-muted">Telegram Alert Sent</div>
                  </div>
                  <span class="badge rounded-pill bg-danger x-small">P1</span>
                </div>

                <div class="mockup-item">
                  <div class="check-box"></div>
                  <div class="flex-grow-1">
                    <div class="fw-700 small">Label Verification</div>
                    <div class="x-small text-muted">
                      Attach Evidence (Photo)
                    </div>
                  </div>
                </div>

                <div
                  class="mt-4 pt-3 border-top d-flex justify-content-between align-items-center"
                >
                  <div class="x-small fw-800 text-primary">85% COMPLETE</div>
                  <div class="d-flex">
                    <div
                      style="
                        width: 25px;
                        height: 25px;
                        background: #e2e8f0;
                        border-radius: 50%;
                        border: 2px solid white;
                        margin-right: -10px;
                      "
                    ></div>
                    <div
                      style="
                        width: 25px;
                        height: 25px;
                        background: var(--primary);
                        border-radius: 50%;
                        border: 2px solid white;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-size: 8px;
                      "
                    >
                      +3
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <!-- Detailed Bento Features -->
    <section class="container feature-container">
      <div class="row g-4">
        <!-- Feature 1: The Form Logic -->
        <div class="col-lg-8">
          <div class="bento-card">
            <div class="icon-circle"><i class="fas fa-barcode"></i></div>
            <h3 class="fw-800 mb-3">Professional Data Registry</h3>
            <p class="text-muted fw-500 mb-4">
              ReabList enforces structured data for every inventory movement
              with full industrial metadata:
            </p>

            <div class="row g-3">
              <div class="col-md-6">
                <div class="p-4 bg-light rounded-4 h-100">
                  <span
                    class="x-small fw-800 text-primary uppercase d-block mb-3"
                    >Required Schema</span
                  >
                  <div class="d-flex flex-column gap-3 small fw-700 text-muted">
                    <div>
                      <i class="fas fa-check-circle text-primary me-2"></i> SKU
                      Identifier & Details
                    </div>
                    <div>
                      <i class="fas fa-check-circle text-primary me-2"></i>
                      Expiry & Arrival Dates
                    </div>
                    <div>
                      <i class="fas fa-check-circle text-primary me-2"></i>
                      Priority Ranking (P1-P5)
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="p-4 bg-light rounded-4 h-100">
                  <span
                    class="x-small fw-800 text-primary uppercase d-block mb-3"
                    >Registry Lifecycle</span
                  >
                  <p class="x-small text-muted mb-0">
                    Perform real-time CRUD operations. Preview your ledger entry
                    exactly as it will appear in the system before committing
                    the record.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Feature 2: Telegram Notifications -->
        <div class="col-lg-4">
          <div
            class="bento-card"
            style="background: #f0f9ff; border-color: #bae6fd"
          >
            <div class="icon-circle" style="background: #0088cc; color: white">
              <i class="fab fa-telegram"></i>
            </div>
            <h4 class="fw-800">T-minus 15m Alerts</h4>
            <p class="text-muted small">
              Synchronize your team. Receive a Telegram alert exactly **15
              minutes before** any inventory audit deadline hits.
            </p>

            <div class="alert-bubble shadow-sm">
              <i class="fab fa-telegram-plane fs-4"></i>
              <div>
                <p class="mb-0 fw-800 x-small">REAB_ALERTS_BOT</p>
                <p class="mb-0 small">Alert: Audit Batch B-101 in 15m</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Feature 3: Visual Assets -->
        <div class="col-lg-4">
          <div class="bento-card">
            <div class="icon-circle"><i class="fas fa-camera"></i></div>
            <h4 class="fw-800">Visual Evidence Hub</h4>
            <p class="text-muted small">
              Attach image evidence to your stock logs. Document finished counts
              or damaged goods directly on the entry.
            </p>
            <div
              class="mt-4 p-4 border border-dashed rounded-4 text-center bg-light"
            >
              <i class="fas fa-cloud-upload-alt text-muted mb-2 fs-3"></i>
              <p class="x-small text-muted fw-800 mb-0">Drop SKU/Label Image</p>
            </div>
          </div>
        </div>

        <!-- Feature 4: Analytics -->
        <div class="col-lg-4">
          <div class="bento-card">
            <div class="icon-circle"><i class="fas fa-chart-pie"></i></div>
            <h4 class="fw-800">Process Auditing</h4>
            <p class="text-muted small">
              Track real-time progress of Batch Reconciliation. Monitor success
              rates of Pending vs. Resolved SKU checks.
            </p>
            <div class="progress-hud">
              <div class="d-flex justify-content-between x-small fw-800 mb-1">
                <span>SUCCESS RATE</span>
                <span class="text-primary">85%</span>
              </div>
              <div class="bar-container"><div class="bar-fill"></div></div>
            </div>
          </div>
        </div>

        <!-- Feature 5: Profile -->
        <div class="col-lg-4">
          <div class="bento-card">
            <div class="icon-circle"><i class="fas fa-user-shield"></i></div>
            <h4 class="fw-800">Identity Control</h4>
            <p class="text-muted small">
              Manage operational roles and permissions. Update profile images
              and security keys to protect your ledger data.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="container mb-5 pb-5">
      <div class="cta-box text-center shadow-lg">
        <div style="position: relative; z-index: 10">
          <h2 class="display-5 fw-800 mb-4">Master Your Ledger.</h2>
          <p class="lead text-muted mb-5 col-lg-6 mx-auto">
            Elevate your inventory management with high-fidelity tracking. Start
            your first registry entry today.
          </p>
          <a
            href="index.html"
            class="btn btn-primary rounded-pill px-5 py-3 fw-800 border-0 shadow-lg"
            style="background: var(--primary)"
            >Enter Command Center</a
          >
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>


<script setup>
import Footer from "@/components/UserPages/Footer.vue";
import NavbarLandingPage from "@/components/UserPages/navbarLandingPage.vue";
</script>

<style scoped>
/* --- Refined Banner Style --- */
.hero-banner {
  position: relative;
  background: radial-gradient(
    circle at 20% 50%,
    #f0fdfa 0%,
    var(--primary-light) 100%
  );
  min-height: 95vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: 0 0 80px 80px;
  padding-top: 5%;
}

.hero-banner::after {
  content: "";
  position: absolute;
  top: -10%;
  right: -5%;
  width: 40%;
  height: 120%;
  background: var(--primary);
  opacity: 0.03;
  filter: blur(100px);
  transform: rotate(-15deg);
}

.hero-image-side {
  position: absolute;
  right: 0;
  top: 0;
  width: 45%;
  height: 100%;
  background: url("https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2072&auto=format&fit=crop")
    center/cover no-repeat;
  z-index: 1;
  mask-image: linear-gradient(to right, transparent, black 40%);
  -webkit-mask-image: linear-gradient(to right, transparent, black 40%);
}

.hero-image-side::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    var(--primary-light) 0%,
    rgba(236, 254, 255, 0) 60%
  );
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 10;
  padding: 120px 0;
}

/* --- Main Floating Card --- */
.floating-container {
  position: relative;
  perspective: 1200px;
}

.floating-mockup {
  background: #ffffff;
  border: 1px solid rgba(6, 182, 212, 0.2);
  border-radius: 28px;
  padding: 24px;
  box-shadow: 0 40px 80px -15px rgba(6, 182, 212, 0.25);
  transform: rotateY(-15deg) rotateX(5deg);
  animation: floatMain 6s ease-in-out infinite;
  max-width: 400px;
  position: relative;
  z-index: 5;
}

/* Secondary Floating Elements */
.floating-node {
  position: absolute;
  background: white;
  padding: 10px 18px;
  border-radius: 14px;
  font-size: 11px;
  font-weight: 800;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(6, 182, 212, 0.1);
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 8px;
  animation: floatNode 8s ease-in-out infinite;
}

.node-1 {
  top: -20px;
  right: -40px;
  animation-delay: 0s;
  color: var(--primary);
}
.node-2 {
  bottom: 40px;
  left: -60px;
  animation-delay: -2s;
  color: #f43f5e;
}
.node-3 {
  top: 120px;
  right: -80px;
  animation-delay: -4s;
  color: #10b981;
}

@keyframes floatMain {
  0%,
  100% {
    transform: rotateY(-15deg) rotateX(5deg) translateY(0);
  }
  50% {
    transform: rotateY(-10deg) rotateX(3deg) translateY(-25px);
  }
}

@keyframes floatNode {
  0%,
  100% {
    transform: translateY(0) translateX(0);
  }
  33% {
    transform: translateY(-15px) translateX(10px);
  }
  66% {
    transform: translateY(10px) translateX(-10px);
  }
}

.mockup-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 16px;
  margin-bottom: 12px;
  border: 1px solid #f1f5f9;
  transition: 0.3s;
}

.mockup-item.active {
  border-color: var(--primary);
  background: #f0fdfa;
}

.check-box {
  width: 22px;
  height: 22px;
  border: 2px solid #cbd5e1;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: transparent;
}

.mockup-item.active .check-box {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}
/* --- Navigation --- */
.nav-glass {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 1200px;
  background: var(--glass);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border2);
  border-radius: 30px;
  padding: 12px 30px;
  z-index: 2000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.nav-link-custom {
  color: var(--text-main);
  text-decoration: none;
  font-size: 14px;
  font-weight: 700;
  opacity: 0.7;
  transition: 0.3s;
}
.nav-link-custom:hover {
  opacity: 1;
  color: var(--primary);
}

/* --- Bento Feature Grid --- */
.feature-container {
  margin-top: -60px;
  padding-bottom: 100px;
  position: relative;
  z-index: 20;
}

.bento-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: var(--radius-xl);
  padding: 45px;
  box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.05);
  transition: var(--transition);
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.bento-card:hover {
  transform: translateY(-15px);
  box-shadow: var(--shadow-fire);
  border-color: var(--primary);
}

.icon-circle {
  width: 60px;
  height: 60px;
  background: #f0fdfa;
  color: var(--primary);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 24px;
  transition: 0.6s;
}

.bento-card:hover .icon-circle {
  background: var(--primary);
  color: white;
  transform: rotateY(360deg);
}

.alert-bubble {
  background: #0088cc;
  color: white;
  padding: 16px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
}

.progress-hud {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 20px;
  border-radius: 24px;
  margin-top: 20px;
}

.bar-container {
  background: #e2e8f0;
  height: 10px;
  border-radius: 100px;
  overflow: hidden;
  margin: 10px 0;
}

.bar-fill {
  height: 100%;
  background: var(--primary);
  width: 85%;
}

.display-large {
  font-weight: 800;
  letter-spacing: -3px;
  line-height: 1;
  color: var(--text-main);
}

.gradient-accent {
  background: linear-gradient(to right, var(--primary-dark), var(--primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.cta-box {
  background: var(--primary-light);
  border: 1px solid var(--glass-border);
  border-radius: 50px;
  padding: 80px 40px;
  position: relative;
  overflow: hidden;
}
</style>