<template>
  <div>
    <!-- NEW MODERN FOOTER SECTION -->
    <div class="container mt-5">
      <div class="footer-cta reveal">
        <div class="row align-items-center">
          <div class="col-lg-7">
            <h2 class="display-5 fw-bold mb-3 text-white">
              Master your daily flow.
            </h2>
            <p class="lead opacity-75 mb-4 mb-lg-0">
              Join 10,000+ users who simplified their task and inventory
              management today.
            </p>
          </div>
          <div class="col-lg-5 text-lg-end">
            <a
              href="#"
              class="btn btn-light rounded-pill px-5 py-3 fw-bold fs-5 shadow-sm"
              style="color: var(--primary)"
              >Get Started Now</a
            >
          </div>
        </div>
      </div>
    </div>

    <footer class="footer">
      <div class="container">
        <div class="row g-5">
          <!-- Brand Info -->
          <div class="col-lg-4">
            <a class="brand-modern text-white mb-4" href="#">
              <div class="brand-symbol">✓</div>
              <span class="text-white">ReabList</span>
            </a>
            <p class="mb-4 pe-lg-5">
              Building the future of productivity. We help teams and individuals
              track what matters most, from daily habits to complex inventories.
            </p>
            <div class="d-flex gap-3">
              <a href="#" class="social-circle"
                ><twitter size="18"/></a>
              <a href="#" class="social-circle"
                ><instagram size="18"/></a>
              <a href="#" class="social-circle"
                ><linkedin size="18"/></a>
              <a href="#" class="social-circle"
                ><github size="18"/>
              </a>
            </div>
          </div>

          <!-- Links Column 1 -->
          <div class="col-6 col-md-3 col-lg-2">
            <h5 class="footer-title">Platform</h5>
            <a href="#" class="footer-link">Daily View</a>
            <a href="#" class="footer-link">Integrations</a>
            <a href="#" class="footer-link">Templates</a>
            <a href="#" class="footer-link">Desktop App</a>
            <a href="#" class="footer-link">Pricing</a>
          </div>

          <!-- Links Column 2 -->
          <div class="col-6 col-md-3 col-lg-2">
            <h5 class="footer-title">Resources</h5>
            <a href="#" class="footer-link">Documentation</a>
            <a href="#" class="footer-link">Help Center</a>
            <a href="#" class="footer-link">Community</a>
            <a href="#" class="footer-link">API Reference</a>
            <a href="#" class="footer-link">System Status</a>
          </div>

          <!-- Newsletter -->
          <div class="col-lg-4">
            <h5 class="footer-title">Stay Updated</h5>
            <p class="small mb-4">
              Get weekly productivity hacks and inventory management tips
              directly to your inbox.
            </p>
            <form class="newsletter-form">
              <input
                type="email"
                class="newsletter-input"
                placeholder="Email address"
              />
              <button type="submit" class="newsletter-btn">Subscribe</button>
            </form>
            <p class="small opacity-50 mt-3">
              We respect your privacy. No spam, ever.
            </p>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="footer-bottom">
          <div class="row align-items-center">
            <div class="col-md-6 mb-3 mb-md-0">
              <p class="small mb-0">
                &copy; 2024 ReabList Inc. All rights reserved. Designed for
                focus.
              </p>
            </div>
            <div class="col-md-6 text-md-end">
              <div class="d-flex justify-content-md-end gap-4">
                <a href="#" class="footer-link small mb-0">Privacy</a>
                <a href="#" class="footer-link small mb-0">Terms</a>
                <a href="#" class="footer-link small mb-0">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* --- NEW MODERN FOOTER STYLE --- */
.footer-cta {
  background: linear-gradient(135deg, var(--primary), var(--primary-hover));
  border-radius: 40px;
  padding: 60px;
  margin-bottom: -100px;
  position: relative;
  z-index: 5;
  box-shadow: 0 30px 60px rgba(19, 112, 127, 0.3);
  color: white;
}

footer {
  background: #0f172a;
  padding: 180px 0 60px;
  color: #94a3b8;
}

.footer-title {
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  letter-spacing: 0.5px;
}

.footer-link {
  color: #94a3b8;
  text-decoration: none;
  transition: all 0.3s ease;
  display: block;
  margin-bottom: 0.8rem;
  font-size: 0.95rem;
}

.footer-link:hover {
  color: var(--accent);
  transform: translateX(5px);
}

.social-circle {
  width: 42px;
  height: 42px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-decoration: none;
}

.social-circle:hover {
  background: var(--primary);
  border-color: var(--primary);
  transform: translateY(-5px) scale(1.1);
  color: white;
}

.newsletter-form {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 6px;
  border-radius: 20px;
  display: flex;
  transition: border-color 0.3s;
}

.newsletter-form:focus-within {
  border-color: var(--primary);
}

.newsletter-input {
  background: transparent;
  border: none;
  color: white;
  padding: 0 15px;
  flex-grow: 1;
  outline: none;
  font-size: 0.9rem;
}

.newsletter-btn {
  background: var(--primary);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 15px;
  font-weight: 700;
  font-size: 0.85rem;
  transition: 0.3s;
}

.newsletter-btn:hover {
  background: var(--primary-hover);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  margin-top: 80px;
  padding-top: 40px;
}
.brand-modern {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-main) !important;
  font-weight: 800;
  font-size: 1.5rem;
  text-decoration: none;
}

.brand-symbol {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: linear-gradient(135deg, #1491a2, #0f5c69);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 900;
  font-size: 18px;
  box-shadow: 0 8px 20px rgba(19, 112, 127, 0.25);
  transition: 0.3s;
}

.brand-modern:hover .brand-symbol {
  transform: rotate(-8deg) scale(1.05);
}

@media (max-width: 991px) {
  .hero {
    padding: 160px 0 60px;
    text-align: center;
  }
  .footer-cta {
    border-radius: 0;
    margin-bottom: 0;
    padding: 40px 20px;
  }
  footer {
    padding: 60px 0;
  }
  .newsletter-form {
    margin-top: 20px;
  }
}
</style>