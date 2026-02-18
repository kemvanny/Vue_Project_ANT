<template>
  <footer class="pro-footer-bg">
    <!-- Animated Background Shapes -->
    <div class="bg-shape circle"></div>
    <div class="bg-shape circle-small"></div>
    <div class="bg-shape star"></div>
    <div class="bg-shape sticker"></div>
    <div class="bg-shape pulse"></div>

    <div class="container">
      <div class="row g-5">
        <!-- Brand Section -->
        <div class="col-lg-4">
          <div class="footer-brand">
            <a href="#" class="brand-area">
            </a>
          <div class="brand-logo">
           <i class="bi bi-check2-circle"></i>
          </div>
          <span class="brand-name">
            <span class="brand-color">Reab</span><span class="brand-last-color">List</span>
          </span>
          </div>

          <p class="footer-description">
            ប្រព័ន្ធគ្រប់គ្រង To-Do List ទំនើប ដែលជួយអ្នករៀបចំកិច្ចការ
            កំណត់ថ្ងៃផុតកំណត់ និងទទួលការជូនដំណឹងមុនពេលដល់កំណត់។
          </p>

          <!-- <a href="/features" class="btn-footer">ចាប់ផ្តើមឥឡូវនេះ</a> -->

          <div class="footer-social mt-4">
            <!-- <a href="#">Facebook</a>
            <a href="#">Telegram</a>
            <a href="#">GitHub</a> -->
            <div class="footer-social mt-4">
              <a href="https://www.facebook.com/share/1CHRhLasWe/?mibextid=wwXIfr" class="social-link">
                <img
                  src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg"
                  alt="Facebook"
                  class="social-icon"
                />
                Facebook
              </a>
              <a href="https://t.me/Vanny_Kem" class="social-link">
                <img
                  src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/telegram.svg"
                  alt="Telegram"
                  class="social-icon"
                />
                Telegram
              </a>
              <a href="https://github.com/VannyKem" class="social-link">
                <img
                  src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/github.svg"
                  alt="GitHub"
                  class="social-icon"
                />
                GitHub
              </a>
            </div>
          </div>
        </div>

        <!-- Pages -->
        <div class="col-6 col-md-2">
          <h5 class="footer-heading">ទំព័រ</h5>
          <a href="/" class="footer-link">ទំព័រដើម</a>
          <a href="/features" class="footer-link">មុខងារ</a>
          <a href="/about" class="footer-link">អំពីយើង</a>
        </div>

        <!-- Features -->
        <div class="col-6 col-md-3">
          <h5 class="footer-heading">មុខងារ​សំខាន់ៗ</h5>
          <a href="#" class="footer-link">បង្កើតកិច្ចការ</a>
          <a href="#" class="footer-link">កំណត់ថ្ងៃផុតកំណត់</a>
          <a href="#" class="footer-link">ការជូនដំណឹង</a>
          <a href="#" class="footer-link">សម្គាល់ថាបានបញ្ចប់</a>
        </div>

        <!-- Contact -->
        <div class="col-md-3">
          <h5 class="footer-heading">ទំនាក់ទំនង</h5>
          <p class="footer-contact">
            អ៊ីមែល៖ support@reablist.com <br />
            ទីតាំង៖ ភ្នំពេញ, កម្ពុជា
          </p>
          <router-link to="/login" class="btn-footer mt-4">ចាប់ផ្តើមឥឡូវនេះ</router-link>
        </div>
      </div>

      <div class="footer-divider"></div>

      <div class="footer-bottom text-center">
        <p>© 2026 ReabList. រក្សាសិទ្ធិគ្រប់យ៉ាង។</p>
      </div>
    </div>
  </footer>
</template>


<style scoped>
.brand-last-color{
  color: rgb(15, 69, 69);
  /* space from one text to one text */
  letter-spacing: 1px;
}
.brand-area {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  padding-left: 12px;
  margin-left: -10px;
}
.brand-color {
  color: var(--primary);
  letter-spacing: 1px;
}

.brand-logo {
  width: 46px;
  height: 46px;
  background: linear-gradient(145deg, #14b8a6, #0d9488);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.4rem;
  box-shadow: 0 1px 2px rgba(13, 148, 136, 0.55),
    inset 0 0 0 1px rgba(255, 255, 255, 0.3);
  transition: transform 0.35s ease;
}

.brand-area:hover .brand-logo {
  transform: scale(1.1);
}

.brand-name {
  font-weight: 900;
  font-size: 1.5rem;
  letter-spacing: -0.03em;
  color: var(--text-main);
}
.footer-social {
  display: flex;
  gap: 15px;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #94a3b8;
  text-decoration: none;
  font-size: 1rem;
  transition: 0.3s;
}

.social-link:hover {
  color: white;
}

.social-icon {
  width: 20px;
  height: 20px;
  filter: brightness(0) invert(1); /* white icons for dark background */
  transition: transform 0.3s;
}

.social-link:hover .social-icon {
  transform: scale(1.1);
}

.pro-footer-bg {
  position: relative;
  color: #fff;
  padding: 140px 0 60px;
  overflow: hidden;
  font-family: "Noto Sans Khmer", sans-serif;
  font-size: 1.15rem;

  /* Background image like the example */
  background-image: url("https://y-digital.co.za/assets/hero-bg-Vb3pPujg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed; /* subtle parallax */
}
/* Modern Footer Typography */
.footer-description {
  margin: 15px 0 30px;
  line-height: 1.9;
  max-width: 380px;
  font-size: 1.125rem; /* slightly smaller, easier to read */
  font-weight: 400;
  color: rgba(255, 255, 255, 0.85); /* softer white */
  letter-spacing: 0.2px;
}

.footer-heading {
  color: #ffffff;
  font-weight: 700;
  margin-bottom: 18px;
  font-size: 1.25rem;
  letter-spacing: 0.5px;
  text-transform: uppercase; /* modern uppercase style */
}

.footer-link {
  display: block;
  color: rgba(255, 255, 255, 0.7); /* softer white */
  text-decoration: none;
  margin-bottom: 12px;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.footer-link:hover {
  color: #14b8a6; /* accent color */
  transform: translateX(6px); /* smooth hover effect */
  letter-spacing: 0.5px;
}

.footer-contact {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
}

.footer-bottom p {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.5px;
}


/* Overlay for better contrast */
.pro-footer-bg::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.7); /* dark overlay for readability */
  z-index: 1;
}

/* Place everything above overlay */
.pro-footer-bg .container {
  position: relative;
  z-index: 2;
}

/* Background Shapes */
.bg-shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.25;
  pointer-events: none;
  z-index: 0;
}

.circle {
  width: 150px;
  height: 150px;
  background: #1491a2;
  top: 10%;
  left: 5%;
  animation: float 6s ease-in-out infinite;
}
.circle-small {
  width: 80px;
  height: 80px;
  background: #0f5c69;
  top: 60%;
  left: 15%;
  animation: float 5s ease-in-out infinite alternate;
}
.star {
  width: 35px;
  height: 35px;
  background: yellow;
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
  top: 75%;
  left: 85%;
  animation: rotate 12s linear infinite;
}
.sticker {
  width: 60px;
  height: 60px;
  background: #f59e0b;
  top: 20%;
  left: 80%;
  clip-path: polygon(50% 0%, 100% 25%, 80% 100%, 20% 100%, 0% 25%);
  animation: float 7s ease-in-out infinite alternate;
}
.pulse {
  width: 90px;
  height: 90px;
  background: #0f5c69;
  top: 50%;
  left: 50%;
  animation: pulse 5s ease-in-out infinite;
}

/* Animations */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
}

/* Brand & text styling (same as before, bigger fonts) */
.footer-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}
.brand-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: linear-gradient(135deg, #1491a2, #0f5c69);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 900;
  font-size: 22px;
}
.brand-name {
  color: white;
  font-weight: 900;
  margin: 0;
  font-size: 2rem;
}
.footer-description {
  margin: 15px 0 25px;
  line-height: 1.8;
  max-width: 400px;
  font-size: 1.2rem;
}
.footer-heading {
  color: white;
  font-weight: 700;
  margin-bottom: 20px;
  font-size: 1.2rem;
}
.footer-link {
  display: block;
  color: #94a3b8;
  text-decoration: none;
  margin-bottom: 12px;
  transition: 0.3s ease;
  font-size: 1.05rem;
}
.footer-link:hover {
  color: #1491a2;
  transform: translateX(5px);
}

/* Buttons */
.btn-footer {
  display: inline-block;
  background: linear-gradient(135deg, #1491a2, #0f5c69);
  color: white;
  font-weight: 700;
  padding: 14px 35px;
  border-radius: 30px;
  text-decoration: none;
  font-size: 1.1rem;
  transition: transform 0.3s, box-shadow 0.3s;
}
.btn-footer:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(20, 145, 162, 0.5);
}
.btn-footer-small {
  display: inline-block;
  background: #f59e0b;
  color: white;
  font-weight: 700;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 1rem;
  margin-top: 10px;
  text-decoration: none;
  transition: 0.3s;
}
.btn-footer-small:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(245, 158, 11, 0.5);
}

/* Social */
.footer-social a {
  display: inline-block;
  margin-right: 15px;
  color: #94a3b8;
  text-decoration: none;
  font-size: 1rem;
  transition: 0.3s;
}
.footer-social a:hover {
  color: white;
}

/* Divider & bottom */
.footer-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 50px 0 25px;
}
.footer-bottom {
  text-align: center;
  font-size: 0.9rem;
  opacity: 0.7;
}
</style>
