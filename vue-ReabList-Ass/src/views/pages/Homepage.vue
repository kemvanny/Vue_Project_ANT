<template>
  <div>
    <NavbarLandingPage />

    <div>
      <!-- Hero -->
      <section class="hero">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6">
              <span class="hero-badge">Boost your efficiency</span>
              <h1>
                Organize Tasks.<br /><span style="color: var(--primary)"
                  >Simplify Your Life.</span
                >
              </h1>
              <p class="text-body mb-5">
                A simple and powerful to-do list app designed to help you focus,
                plan, and conquer your goals every single day.
              </p>
              <div class="btn-group-wrap d-flex flex-wrap gap-3 mb-5">
                <a href="#" class="btn btn-signup-modern py-3 px-5 fs-5"
                  >Get Started Free</a
                >
                <a
                  href="#"
                  class="btn btn-outline-dark rounded-pill py-3 px-4 d-flex align-items-center gap-2"
                >
                  <i data-lucide="play-circle"></i> See how it works
                </a>
              </div>
              <div class="d-flex align-items-center gap-3 reveal">
                <div class="d-flex">
                  <img
                    src="https://i.pravatar.cc/40?img=1"
                    class="rounded-circle border border-white"
                    style="margin-right: -10px"
                  />
                  <img
                    src="https://i.pravatar.cc/40?img=2"
                    class="rounded-circle border border-white"
                    style="margin-right: -10px"
                  />
                  <img
                    src="https://i.pravatar.cc/40?img=3"
                    class="rounded-circle border border-white"
                  />
                </div>
                <span class="small fw-semibold text-muted"
                  >Join 10k+ productive users</span
                >
              </div>
            </div>
            <div class="col-lg-6 mt-5 mt-lg-0">
              <div class="floating-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800"
                  alt="Productivity"
                  class="img-fluid floating-img"
                />
                <div
                  class="stats-card position-absolute bottom-0 start-0 m-4 shadow-lg d-none d-sm-block"
                  style="width: 280px; transform: translateY(30%)"
                >
                  <div class="d-flex justify-content-between mb-3">
                    <span class="fw-bold">Daily Tasks</span>
                    <span class="fw-bold" style="color: var(--accent)"
                      >92%</span
                    >
                  </div>
                  <div
                    class="progress"
                    style="
                      height: 8px;
                      background: rgba(255, 255, 255, 0.1);
                      border-radius: 10px;
                    "
                  >
                    <div
                      class="progress-bar"
                      style="
                        width: 92%;
                        background-color: var(--accent);
                        border-radius: 10px;
                      "
                    ></div>
                  </div>
                  <p class="small mt-3 mb-0 opacity-75">
                    You're almost at your daily goal! Keep going.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section class="py-5 my-5">
        <div class="container">
          <div class="text-center mb-5 pb-3 reveal">
            <h2 class="display-5 mb-3">Designed for Focus</h2>
            <p class="mx-auto" style="max-width: 600px">
              Everything you need to plan your day—simple, fast, and effective.
              Stop juggling, start achieving.
            </p>
          </div>
          <div class="row g-4">
            <div class="col-md-4 reveal" style="transition-delay: 0.1s">
              <div class="feature-card">
                <div
                  class="icon-box"
                  style="
                    width: 56px;
                    height: 56px;
                    background: var(--primary-light);
                    color: var(--primary);
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1.5rem;
                  "
                >
                  <zap/>
                </div>
                <h4>High Priority Focus</h4>
                <p>
                  Focus on high-impact projects that move the needle. Review
                  deadlines and allocate time blocks effectively.
                </p>
              </div>
            </div>
            <div class="col-md-4 reveal" style="transition-delay: 0.2s">
              <div class="feature-card">
                <div
                  class="icon-box"
                  style="
                    width: 56px;
                    height: 56px;
                    background: #fff7ed;
                    color: #ea580c;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1.5rem;
                  "
                >
                  <repeat/>
                </div>
                <h4>Daily Habits</h4>
                <p>
                  Maintain consistency by tracking daily routines. Small wins
                  lead to significant long-term success.
                </p>
              </div>
            </div>
            <div class="col-md-4 reveal" style="transition-delay: 0.3s">
              <div class="feature-card">
                <div
                  class="icon-box"
                  style="
                    width: 56px;
                    height: 56px;
                    background: #f0fdf4;
                    color: #16a34a;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1.5rem;
                  "
                >
                  <users/>
                </div>
                <h4>Smart Collaboration</h4>
                <p>
                  Share lists with your team or family. Stay aligned and
                  complete projects together in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Benefits Section -->
      <section class="benefits-section">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-5 mb-5 mb-lg-0 reveal-left">
              <h2 class="display-4 mb-4">
                Why ReabList is the
                <span style="color: var(--primary)">Right Choice</span>
              </h2>
              <p class="mb-5">
                We stripped away the complexity of traditional managers to give
                you a clean, distraction-free environment.
              </p>

              <div class="benefit-item">
                <i data-lucide="shield-check" class="text-primary"></i>
                <div>
                  <h6 class="mb-1 fw-bold">Safe & Private</h6>
                  <p class="small mb-0">
                    Your data is encrypted and secure with us.
                  </p>
                </div>
              </div>
              <div class="benefit-item">
                <i data-lucide="smartphone" class="text-primary"></i>
                <div>
                  <h6 class="mb-1 fw-bold">Cloud Sync</h6>
                  <p class="small mb-0">
                    Access your tasks from any device, anywhere.
                  </p>
                </div>
              </div>
              <div class="benefit-item">
                <i data-lucide="smile" class="text-primary"></i>
                <div>
                  <h6 class="mb-1 fw-bold">User Friendly</h6>
                  <p class="small mb-0">
                    No learning curve. Start being productive instantly.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-7 text-center reveal-right">
              <img
                src="https://images.unsplash.com/photo-1542626991-cbc4e32524cc?auto=format&fit=crop&q=80&w=800"
                alt="Mockup"
                class="img-fluid rounded-4 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- About Section -->
      <section class="py-5 bg-white overflow-hidden">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6 mb-5 mb-lg-0 reveal-left">
              <h2 class="display-5 fw-bold mb-4">
                ReabList Your<br />
                <span style="color: var(--accent)">Daily</span> Task Navigator
              </h2>
              <p class="lead text-muted mb-5">
                ReabList was created to help people simplify their daily
                routines, reduce stress, and achieve goals through simple task
                management.
              </p>

              <div
                class="p-4 border-start border-4 border-teal rounded-3"
                style="background: var(--primary-light)"
              >
                <p class="m-0 fst-italic">
                  "Our mission is to help individuals stay organized, achieve
                  their goals, and make every day more productive."
                </p>
              </div>
            </div>

            <div class="col-lg-6 ps-lg-5 reveal-right">
              <div class="about-img-stack">
                <div
                  class="floating-badge"
                  style="
                    position: absolute;
                    top: 15%;
                    left: -20px;
                    background: var(--accent);
                    color: white;
                    padding: 0.8rem 1.2rem;
                    border-radius: 15px;
                    z-index: 3;
                    box-shadow: 0 10px 20px rgba(247, 164, 35, 0.3);
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    animation: float 4s infinite;
                  "
                >
                  <i data-lucide="trending-up"></i>
                  <span class="fw-bold">Boost Productivity</span>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80"
                  class="img-main ms-auto"
                  alt="Workspace"
                />
                <img
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80"
                  class="img-sub"
                  alt="App Preview"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import NavbarLandingPage from "@/components/UserPages/navbarLandingPage.vue";
import Footer from "@/components/UserPages/Footer.vue";
</script>


<style scoped>
template {
  color: var(--body);
  background-color: white;
  overflow-x: hidden;
}
/* Hero */
.hero {
  padding: 200px 0 120px;
  background: radial-gradient(circle at top right, #e0f2f1 0%, #ffffff 60%);
}

.hero h1 {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: 1.1;
  margin-bottom: 1.5rem;
  opacity: 0;
  animation: fadeInScale 0.8s forwards 0.2s;
}

.hero p {
  opacity: 0;
  animation: fadeInScale 0.8s forwards 0.4s;
}

.hero .btn-group-wrap {
  opacity: 0;
  animation: fadeInScale 0.8s forwards 0.6s;
}

.hero-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: var(--primary-light);
  color: var(--primary);
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0;
  animation: fadeInScale 0.8s forwards;
}

.floating-img-wrap {
  position: relative;
  animation: float 6s ease-in-out infinite;
}

.floating-img {
  border-radius: 24px;
  box-shadow: 0 40px 80px -15px rgba(0, 0, 0, 0.15);
}

.stats-card {
  background: var(--dark);
  border-radius: 24px;
  padding: 2rem;
  color: white;
  animation: float-delayed 5s ease-in-out infinite;
}

/* --- Animation Keyframes --- */
@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes float-delayed {
  0% {
    transform: translateY(0px) translateX(0px);
  }
  50% {
    transform: translateY(-15px) translateX(10px);
  }
  100% {
    transform: translateY(0px) translateX(0px);
  }
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Feature Cards */
.feature-card {
  padding: 2.5rem;
  border-radius: 24px;
  border: 1px solid #f1f5f9;
  background: white;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
}

.feature-card:hover {
  border-color: var(--primary-light);
  box-shadow: 0 30px 60px rgba(19, 112, 127, 0.12);
  transform: translateY(-12px);
}

/* Benefits Section */
.benefits-section {
  background: #f1f5f9;
  border-radius: 60px;
  padding: 100px 0;
  margin: 0 20px;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: white;
  padding: 1.5rem;
  border-radius: 20px;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.benefit-item:hover {
  transform: translateX(10px);
}

/* About Section */
.about-img-stack {
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
}

.img-main {
  width: 80%;
  border-radius: 30px;
  z-index: 1;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  object-fit: cover;
  height: 400px;
}

.img-sub {
  width: 50%;
  border-radius: 20px;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
  border: 8px solid white;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  object-fit: cover;
  height: 250px;
  animation: float-delayed 7s infinite;
}

.border-teal {
  border-color: var(--primary) !important;
}
@media (max-width: 991px) {
  .hero {
    padding: 160px 0 60px;
    text-align: center;
  }
  .hero p {
    margin: 0 auto 2.5rem;
  }
  .benefits-section {
    margin: 0;
    border-radius: 0;
    padding: 60px 0;
  }
  .about-img-stack {
    height: 400px;
    margin-top: 3rem;
  }
  .nav-modern {
    padding: 10px 16px;
    border-radius: 20px;
  }
  .navbar-collapse {
    background: white;
    margin-top: 15px;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.1);
  }
}
</style>