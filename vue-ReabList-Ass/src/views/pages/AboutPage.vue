<template>
  <div>
    <NavbarLandingPage />

    <main class="hero-section">
      <div class="container">
        <div class="row align-items-center g-5">
          <div class="col-lg-6 text-center text-lg-start" data-fade-up>
            <div class="pill-tag">🚀 AI-Powered Task Management</div>
            <h1 class="hero-title">
              Work at the speed of
              <span style="color: var(--primary)">thought.</span>
            </h1>
            <p class="lead text-muted mb-5">
              ReabList is the fluid task manager designed for creators and
              high-achievers. Turn chaos into clarity with a single click.
            </p>
            <div
              class="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start"
            >
              <button class="btn-modern">Get Started Now</button>
              <button
                class="btn btn-link nav-link-modern d-flex align-items-center justify-content-center gap-2"
              >
                <i class="bi bi-play-circle fs-4"></i> Watch Demo
              </button>
            </div>
          </div>
          <div class="col-lg-6" data-fade-up>
            <div class="hero-img-container">
              <img
                src="https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&q=80&w=1200"
                class="hero-main-img"
                alt="Dashboard Preview"
              />
              <div
                class="position-absolute bottom-0 start-0 translate-middle-y bg-white p-3 rounded-4 shadow-lg d-none d-md-block floating-badge"
                style="margin-left: -20px"
              >
                <div class="d-flex align-items-center gap-3">
                  <div
                    class="benefit-icon m-0"
                    style="width: 40px; height: 40px"
                  >
                    <i class="bi bi-check2-circle"></i>
                  </div>
                  <div>
                    <h6 class="mb-0 fw-bold">Task Completed</h6>
                    <small class="text-muted">Landing Page Design</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <section id="why-us" class="why-section">
      <div class="container">
        <div class="row justify-content-center text-center mb-5" data-fade-up>
          <div class="col-lg-8">
            <h2 class="display-5 mb-3">
              Why Should You Choose
              <span style="color: var(--primary)">ReabList?</span>
            </h2>
            <p class="text-muted fs-5">
              Everything you need to ship products faster and manage your life
              better.
            </p>
          </div>
        </div>
        <div class="row g-4">
          <div class="col-md-4" data-fade-up>
            <div class="benefit-card">
              <div class="benefit-icon"><i class="bi bi-cpu"></i></div>
              <h4>Intuitive AI</h4>
              <p class="text-muted">
                Smart categorization and priority suggestion powered by advanced
                language models.
              </p>
            </div>
          </div>
          <div class="col-md-4" data-fade-up>
            <div class="benefit-card">
              <div class="benefit-icon">
                <i class="bi bi-lightning-charge"></i>
              </div>
              <h4>Real-time Sync</h4>
              <p class="text-muted">
                Seamless updates across mobile, desktop, and web with zero
                latency.
              </p>
            </div>
          </div>
          <div class="col-md-4" data-fade-up>
            <div class="benefit-card">
              <div class="benefit-icon"><i class="bi bi-shield-lock"></i></div>
              <h4>Secure & Private</h4>
              <p class="text-muted">
                End-to-end encryption for your tasks. We value your privacy as
                much as you do.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="how-it-works" class="how-section">
      <div class="container">
        <div class="row justify-content-center text-center mb-5" data-fade-up>
          <div class="col-lg-8">
            <div class="pill-tag">Process</div>
            <h2 class="display-5 mb-3">
              Getting Started is <span style="color: var(--primary)">Easy</span>
            </h2>
            <p class="text-muted fs-5">
              Move from clutter to clarity in three effortless steps.
            </p>
          </div>
        </div>
        <div class="row g-4 position-relative">
          <div class="col-lg-4" data-fade-up>
            <div class="step-card">
              <div class="connector-line"></div>
              <div class="step-badge">01</div>
              <span class="step-visual">⚡</span>
              <h4 class="fw-bold">Create Account</h4>
              <p class="text-muted">
                Sign up in seconds with Google or Magic Link. No complex
                onboarding, just your tasks waiting for you.
              </p>
            </div>
          </div>
          <div class="col-lg-4" data-fade-up style="transition-delay: 0.1s">
            <div class="step-card">
              <div class="connector-line"></div>
              <div class="step-badge">02</div>
              <span class="step-visual">🧠</span>
              <h4 class="fw-bold">Capture Anything</h4>
              <p class="text-muted">
                Type or speak your thoughts. Our AI automatically tags,
                prioritizes, and categorizes your data instantly.
              </p>
            </div>
          </div>
          <div class="col-lg-4" data-fade-up style="transition-delay: 0.2s">
            <div class="step-card">
              <div class="step-badge">03</div>
              <span class="step-visual">🎯</span>
              <h4 class="fw-bold">Achieve More</h4>
              <p class="text-muted">
                Focus on what matters. ReabList handles the organization so you
                can spend your energy on shipping.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="team" class="team-section">
      <div class="container">
        <div class="text-center mb-5" data-fade-up>
          <h2 class="display-6 fw-800">
            Meet Our <span style="color: var(--primary)">Visionaries</span>
          </h2>
          <p class="text-muted">The experts behind the ReabList experience.</p>
        </div>
        <div class="row g-4 justify-content-center">
          <div class="col-md-6 col-lg-4" data-fade-up>
            <div class="team-card">
              <div class="team-img-wrapper">
                <img
                  src="https://i.pravatar.cc/150?u=a"
                  class="team-img"
                  alt="Alex"
                />
              </div>
              <span class="team-role">CEO & Founder</span>
              <h4 class="fw-bold mb-1">Alex Rivers</h4>
              <p class="text-muted small">
                Tech lead with 10+ years of experience.
              </p>
            </div>
          </div>
          <div class="col-md-6 col-lg-4" data-fade-up>
            <div class="team-card">
              <div class="team-img-wrapper">
                <img
                  src="https://i.pravatar.cc/150?u=b"
                  class="team-img"
                  alt="Jordan"
                />
              </div>
              <span class="team-role">Head of Product</span>
              <h4 class="fw-bold mb-1">Jordan Lee</h4>
              <p class="text-muted small">UX obsessed simplicity advocate.</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-4" data-fade-up>
            <div class="team-card">
              <div class="team-img-wrapper">
                <img
                  src="https://i.pravatar.cc/150?u=c"
                  class="team-img"
                  alt="Sarah"
                />
              </div>
              <span class="team-role">Lead Designer</span>
              <h4 class="fw-bold mb-1">Sarah Chen</h4>
              <p class="text-muted small">Minimalist UI specialist.</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-4" data-fade-up>
            <div class="team-card">
              <div class="team-img-wrapper">
                <img
                  src="https://i.pravatar.cc/150?u=d"
                  class="team-img"
                  alt="Michael"
                />
              </div>
              <span class="team-role">CTO</span>
              <h4 class="fw-bold mb-1">Michael Scott</h4>
              <p class="text-muted small">
                Infrastructure and backend architect.
              </p>
            </div>
          </div>
          <div class="col-md-6 col-lg-4" data-fade-up>
            <div class="team-card">
              <div class="team-img-wrapper">
                <img
                  src="https://i.pravatar.cc/150?u=e"
                  class="team-img"
                  alt="Emily"
                />
              </div>
              <span class="team-role">AI Engineer</span>
              <h4 class="fw-bold mb-1">Emily Watson</h4>
              <p class="text-muted small">Machine learning specialist.</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-4" data-fade-up>
            <div class="team-card">
              <div class="team-img-wrapper">
                <img
                  src="https://i.pravatar.cc/150?u=f"
                  class="team-img"
                  alt="David"
                />
              </div>
              <span class="team-role">Growth Lead</span>
              <h4 class="fw-bold mb-1">David Miller</h4>
              <p class="text-muted small">Scaling ReabList to the world.</p>
            </div>
          </div>
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
template {
  font-family: "Inter", sans-serif;
  color: var(--text-dark);
  background-color: var(--bg-main);
  overflow-x: hidden;
  letter-spacing: -0.01em;
  scroll-behavior: smooth;
}

.why-section {
  padding: 120px 0;
  background: #ffffff;
}
.benefit-icon {
  width: 60px;
  height: 60px;
  background: var(--primary-soft);
  color: var(--primary);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 25px;
}
.benefit-card {
  padding: 40px;
  border-radius: 32px;
  background: white;
  border: 1px solid rgba(19, 112, 127, 0.1);
  transition: var(--transition);
  height: 100%;
}
.benefit-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.08);
  border-color: var(--primary);
}

/* ===== HERO ===== */
.hero-section {
  padding: 180px 0 100px;
  background: radial-gradient(
      circle at 90% 10%,
      rgba(19, 112, 127, 0.1) 0%,
      transparent 40%
    ),
    radial-gradient(
      circle at 10% 90%,
      rgba(30, 159, 179, 0.05) 0%,
      transparent 40%
    );
}

.hero-title {
  font-size: clamp(3rem, 6vw, 5rem);
  line-height: 1.1;
  margin-bottom: 30px;
  background: linear-gradient(180deg, var(--text-dark) 30%, #475569 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-img-container {
  position: relative;
  animation: float 6s ease-in-out infinite;
}

.hero-main-img {
  width: 100%;
  border-radius: 40px;
  box-shadow: 0 40px 80px -15px rgba(15, 23, 42, 0.15);
  transition: var(--transition);
}

.hero-main-img:hover {
  transform: scale(1.02);
}

.floating-badge {
  animation: floatBadge 4s ease-in-out infinite;
  z-index: 10;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes floatBadge {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.pill-tag {
  display: inline-flex;
  padding: 8px 20px;
  background: var(--primary-soft);
  color: var(--primary);
  border-radius: 100px;
  font-weight: 700;
  font-size: 0.85rem;
  margin-bottom: 24px;
}
.btn-modern {
  background: var(--primary-gradient);
  color: white;
  padding: 16px 36px;
  border-radius: 18px;
  font-weight: 700;
  border: none;
  transition: var(--transition);
}
.nav-link-modern {
  color: var(--text-muted) !important;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 10px 16px !important;
  border-radius: 14px;
  transition: var(--transition);
}

/* ===== HOW IT WORKS (With Background Color) ===== */
.how-section {
  padding: 120px 0;
  background-color: var(--bg-alt); /* Light gray/teal separator bg */
  position: relative;
  overflow: hidden;
  border-top: 1px solid #f1f5f9;
  border-bottom: 1px solid #f1f5f9;
}

.step-card {
  background: white;
  border: 1px solid transparent;
  border-radius: 32px;
  padding: 48px;
  position: relative;
  z-index: 1;
  transition: var(--transition);
  height: 100%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.step-card:hover {
  border-color: var(--primary);
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.04);
}

.step-badge {
  width: 54px;
  height: 54px;
  background: var(--primary-gradient);
  color: white;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.25rem;
  margin-bottom: 30px;
  box-shadow: 0 10px 20px rgba(19, 112, 127, 0.2);
}

.step-visual {
  font-size: 3rem;
  margin-bottom: 20px;
  display: block;
}

.connector-line {
  position: absolute;
  top: 50px;
  left: 100%;
  width: 100%;
  height: 2px;
  background: repeating-linear-gradient(
    to right,
    var(--primary) 0,
    var(--primary) 10px,
    transparent 10px,
    transparent 20px
  );
  opacity: 0.15;
  z-index: 0;
  display: none;
}

@media (min-width: 992px) {
  .connector-line {
    display: block;
  }
}

/* ===== TEAM ===== */
.team-section {
  padding: 100px 0;
  background: #ffffff;
}

.team-card {
  background: white;
  border-radius: 30px;
  padding: 40px 25px;
  text-align: center;
  border: 1px solid #f1f5f9;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  height: 100%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02);
}

.team-card:hover {
  border-color: var(--primary);
  box-shadow: 0 25px 50px rgba(19, 112, 127, 0.12);
  transform: translateY(-10px);
}

.team-img-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 25px;
}

.team-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.team-role {
  display: inline-block;
  padding: 4px 14px;
  background: var(--primary-soft);
  color: var(--primary);
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 15px;
}
</style>