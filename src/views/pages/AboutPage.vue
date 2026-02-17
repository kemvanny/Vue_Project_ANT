<template>
  <div>
    <NavbarLandingPage />

    <main class="hero-section">
      <div class="container">
        <div class="row align-items-center g-5">
          <div class="col-lg-6 text-center text-lg-start" data-fade-up>
            <div class="pill-tag">ជំនួយការគ្រប់គ្រងភារកិច្ចឆ្លាតវៃ</div>
            <h1 class="hero-title fw-bold">
              រៀបចំផែនការឱ្យរហ័ស
              <span style="color: var(--primary)">ដូចការគិតរបស់អ្នក</span>
            </h1>
            <p class="lead text-muted mb-5">
              ReabList គឺជាអ្នកគ្រប់គ្រងភារកិច្ចដ៏រលូន ដែលត្រូវបានរចនាឡើងដើម្បីជួយអ្នក
              ប្រែក្លាយភាពស្មុគស្មាញ ឱ្យទៅជាភាពច្បាស់លាស់ និងមានរបៀបរៀបរយបំផុត
              ដោយគ្រាន់តែចុចតែម្តង
            </p>
            <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
              <router-link to="/login" class="btn-modern">ចាប់ផ្តើមឥឡូវនេះ</router-link>
              <button class="btn btn-link nav-link-modern d-flex align-items-center justify-content-center gap-2">
                <i class="bi bi-play-circle fs-4"></i> ទស្សនាការបង្ហាញ
              </button>
            </div>
          </div>
          <div class="col-lg-6" data-fade-up>
            <div class="hero-img-container">
              <img :src="BookImage"
                class="hero-main-img" alt="Dashboard Preview" />
              <div
                class="position-absolute bottom-0 start-0 translate-middle-y bg-white p-3 rounded-4 shadow-lg d-none d-md-block floating-badge"
                style="margin-left: -20px">
                <div class="d-flex align-items-center gap-3">
                  <div class="benefit-icon m-0" style="width: 40px; height: 40px">
                    <i class="bi bi-check2-circle"></i>
                  </div>
                  <div>
                    <h6 class="mb-0 fw-bold">ភារកិច្ចសម្រេចបាន</h6>
                    <small class="text-muted">ការរចនា Landing Page</small>
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
              ចក្ខុវិស័យរបស់យើង
              <span style="color: var(--primary)">ReabList</span>
            </h2>
            <p class="text-muted fs-5">
              យើងចង់ឃើញមនុស្សគ្រប់រូបអាចគ្រប់គ្រងពេលវេលា និងជីវិតរបស់ពួកគេបានយ៉ាងល្អបំផុត។
              ReabList ត្រូវបានបង្កើតឡើងដើម្បីក្លាយជា "ខួរក្បាលទីពីរ" ដែលជួយអ្នកចងចាំរាល់កិច្ចការសំខាន់ៗ
            </p>
          </div>
        </div>
        <div class="row g-4">
          <div class="col-md-4" data-fade-up>
            <div class="benefit-card">
              <div class="benefit-icon"><i class="bi bi-bullseye"></i></div>
              <h4>បេសកកម្មចម្បង</h4>
              <p class="text-muted">
                បេសកកម្មរបស់យើងគឺកាត់បន្ថយភាពស្មុគស្មាញក្នុងជីវិតប្រចាំថ្ងៃ
                តាមរយៈការផ្ដល់ជូននូវឧបករណ៍គ្រប់គ្រងកិច្ចការដ៏សាមញ្ញ
                តែមានប្រសិទ្ធភាពខ្ពស់ និងអាចប្រើប្រាស់បានគ្រប់ពេលវេលា គ្រប់ទីកន្លែង
              </p>
            </div>
          </div>
          <div class="col-md-4" data-fade-up>
            <div class="benefit-card">
              <div class="benefit-icon">
                <i class="bi bi-award"></i>
              </div>
              <h4>ការប្ដេជ្ញាចិត្តចំពោះអ្នក</h4>
              <p class="text-muted">
                យើងបន្តអភិវឌ្ឍ ReabList ដោយផ្ដោតលើសុវត្ថិភាព ឯកជនភាព និងបទពិសោធន៍ប្រើប្រាស់ដ៏រលូនបំផុត
                ដើម្បីជួយអ្នកសម្រេចបាននូវរាល់គោលដៅធំៗក្នុងជីវិត ដោយប្រើប្រាស់ពេលវេលាតិចជាងមុន
              </p>
            </div>
          </div>
          <div class="col-md-4" data-fade-up>
            <div class="benefit-card">
              <div class="benefit-icon"><i class="bi bi-graph-up-arrow"></i></div>
              <h4>លទ្ធផលជាចម្បង</h4>
              <p class="text-muted">
                គោលដៅចុងក្រោយរបស់យើង គឺចង់ឃើញអ្នកប្រើប្រាស់សម្រេចបាននូវកិច្ចការកាន់តែច្រើន ដោយប្រើប្រាស់ពេលវេលាតិចជាងមុន
                និងមានភាពតានតឹងតិចបំផុតក្នុងជីវិតប្រចាំថ្ងៃ
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
            <div class="pill-tag">ដំណើរការដ៏សាមញ្ញ</div>
            <h2 class="display-5 mb-3">
              ចាប់ផ្ដើមក្នុងរយៈពេល <span style="color: var(--primary)">តែប៉ុន្មានវិនាទី</span>
            </h2>
            <p class="text-muted fs-5">
              ផ្លាស់ប្តូរទម្លាប់ការងាររបស់អ្នកឱ្យកាន់តែមានប្រសិទ្ធភាព តាមរយៈ ៣ ជំហានងាយៗ
            </p>
          </div>
        </div>
        <div class="row g-4 position-relative">
          <div class="col-lg-4" data-fade-up>
            <div class="step-card">
              <div class="connector-line"></div>
              <div class="step-badge">01</div>
              <span class="step-visual"></span>
              <h4 class="fw-bold">បង្កើតគណនីប្រើប្រាស់</h4>
              <p class="text-muted">
                ចុះឈ្មោះភ្លាមៗតាមរយៈ Gmail គ្មានទម្រង់បែបបទស្មុគស្មាញ 
            រង់ចាំតែអ្នកចូលទៅរៀបចំផែនការជោគជ័យប៉ុណ្ណោះ
              </p>
            </div>
          </div>
          <div class="col-lg-4" data-fade-up style="transition-delay: 0.1s">
            <div class="step-card">
              <div class="connector-line"></div>
              <div class="step-badge">02</div>
              <span class="step-visual"></span>
              <h4 class="fw-bold">រៀបចំបញ្ជីកិច្ចការ</h4>
              <p class="text-muted">
               បញ្ចូលរាល់កិច្ចការដែលអ្នកត្រូវធ្វើ។ អ្នកអាចចាត់ថ្នាក់ បែងចែកប្រភេទ 
            និងកំណត់កម្រិតអាទិភាពបានយ៉ាងឆាប់រហ័ស និងមានរបៀបរៀបរយ
              </p>
            </div>
          </div>
          <div class="col-lg-4" data-fade-up style="transition-delay: 0.2s">
            <div class="step-card">
              <div class="step-badge">03</div>
              <span class="step-visual"></span>
              <h4 class="fw-bold">សម្រេចគោលដៅ</h4>
              <p class="text-muted">
                ផ្ដោតអារម្មណ៍ទាំងស្រុងលើការងារដែលនៅចំពោះមុខ។ ReabList នឹងជួយរៀបចំ 
            និងរំលឹកអ្នក ដើម្បីឱ្យអ្នកប្រើប្រាស់ថាមពលចំគោលដៅបំផុត។
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
            ជួបជាមួយ
            <span style="color: var(--primary)">សមាជិកក្រុមរបស់យើង</span>
          </h2>
          <p class="text-muted">អ្នកជំនាញនៅពីក្រោយការបង្កើតបទពិសោធន៍ដ៏អស្ចារ្យរបស់ ReabList</p>
        </div>
        <div class="row g-4 justify-content-center">
          <div class="col-md-6 col-lg-4" data-fade-up>
            <div class="team-card">
              <div class="team-img-wrapper">
                <img :src="vanny" class="team-img" alt="Alex" />
              </div>
              <span class="team-role">Project Leader & Frontend</span>
              <h4 class="fw-bold mb-1">Kem Vanny</h4>
              <p class="text-muted small">
                អ្នកដឹកនាំគម្រោង និងទទួលបន្ទុកផ្នែករចនារចនាសម្ព័ន្ធប្រព័ន្ធ
              </p>
            </div>
          </div>
          <div class="col-md-6 col-lg-4" data-fade-up>
            <div class="team-card">
              <div class="team-img-wrapper">
                <img :src="liza" class="team-img" alt="Jordan" />
              </div>
              <span class="team-role">Frontend</span>
              <h4 class="fw-bold mb-1">Hean Liza</h4>
              <p class="text-muted small">
                ឯកទេសខាងរចនាចំណុចប្រទាក់អ្នកប្រើប្រាស់ និងអភិវឌ្ឍផ្នែកខាងមុខ
              </p>
            </div>
          </div>
          <div class="col-md-6 col-lg-4" data-fade-up>
            <div class="team-card">
              <div class="team-img-wrapper">
                <img :src="Nara" class="team-img" alt="Sarah" />
              </div>
              <span class="team-role">Frontend</span>
              <h4 class="fw-bold mb-1">Tel Sophannara</h4>
              <p class="text-muted small">
                ផ្តោតលើការបង្កើតបទពិសោធន៍អ្នកប្រើប្រាស់ឱ្យកាន់តែរលូន និងទាក់ទាញ
              </p>
            </div>
          </div>
          <div class="col-md-6 col-lg-4" data-fade-up>
            <div class="team-card">
              <div class="team-img-wrapper">
                <img :src="socheata" class="team-img" alt="Michael" />
              </div>
              <span class="team-role">UI/UX & Frontend</span>
              <h4 class="fw-bold mb-1">Vit Socheata</h4>
              <p class="text-muted small">
                ចូលរួមក្នុងការអភិវឌ្ឍ និងកែលម្អគុណភាពនៃការបង្ហាញលើគេហទំព័រ
              </p>
            </div>
          </div>
          <div class="col-md-6 col-lg-4" data-fade-up>
            <div class="team-card">
              <div class="team-img-wrapper">
                <img :src="votey" class="team-img" alt="Emily" />
              </div>
              <span class="team-role">UI/UX & Frontend</span>
              <h4 class="fw-bold mb-1">Limchhen Revotey</h4>
              <p class="text-muted small">អ្នកជំនាញក្នុងការបម្លែងការរចនាទៅជាកូដដែលដំណើរការបានយ៉ាងល្អ</p>
            </div>
          </div>
          <div class="col-md-6 col-lg-4" data-fade-up>
            <div class="team-card">
              <div class="team-img-wrapper">
                <img :src="sophearith" class="team-img" alt="David" />
              </div>
              <span class="team-role">UI/UX & Frontend</span>
              <h4 class="fw-bold mb-1">Him Sophearith</h4>
              <p class="text-muted small">ទទួលបន្ទុកលើការត្រួតពិនិត្យ និងអភិវឌ្ឍមុខងារឱ្យមានភាពត្រឹមត្រូវខ្ពស់</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="thank-you" class="thank-you">
      <div class="container card-thank-you">
        <div class="row justify-content-center text-center mb-5" data-fade-up>
          <div class="col-lg-8">
            <div class="pill-tag">សេចក្តីថ្លែងអំណរគុណ</div>
            <h2 class="display-5 mb-3">សេចក្តីថ្លែងអំណរគុណចំពោះ</h2>
            <p class="text-muted fs-5 text-des">
              <span style="color: #0d9488;font-weight: bold;"> ក្រសួងប្រៃសណីយ៍និងទូរគមនាគមន៍ មូលនិធិ ស.អ.
                និងថ្នាក់បណ្តុះបណ្តាលបច្ចេកវិទ្យាអាន ANT</span> ព្រមទាំងលោកគ្រូ <span
                style="color: #0d9488;font-weight: bold;">ជិន
                សុវណ្ណមិនា </span>និងអ្នកគ្រូ <span style="color: #0d9488;font-weight: bold;">យឹម ស្រីយ៉ឺ</span> ។
              ក្រុមរបស់យើងមានអារម្មណ៍សោមនស្សរីករាយយ៉ាងខ្លាំងដែលទទួលបានអាហារូបករណ៍លើជំនាញការអភិវឌ្ឍន៍គេហទំព័រនេះ។
              អាហារូបករណ៍នេះពិតជាបានជួយសម្រាលបន្ទុកហិរញ្ញវត្ថុសម្រាប់ការសិក្សាដល់ក្រុមយើងខ្ញុំទាំងអស់គ្នា។
              ក្រោមការណែនាំពីលោកគ្រូអ្នកគ្រូ
              ក្រុមយើងខ្ញុំប្តេជ្ញាខិតខំប្រឹងប្រែងសិក្សាដើម្បីកសាងសមត្ថភាពឱ្យបានខ្លាំងពូកែ
              ដើម្បីអាចចូលរួមចំណែកជួយដល់សង្គមជាតិទៅថ្ងៃអនាគត។
            </p>
          </div>
        </div>

        <div class="row g-4">
          <div class="col-lg-4" data-fade-up>
            <div class="card h-50 card-image-wrapper border-0 shadow-sm">
              <img :src="logo" alt="Logo" class="card-img-fit" />
            </div>
          </div>

          <div class="col-lg-4" data-fade-up>
            <div class="card h-50 card-image-wrapper border-0 shadow-sm">
              <img :src="logo2" alt="Logo" class="card-img-fit" />
            </div>
          </div>

          <div class="col-lg-4" data-fade-up>
            <div class="card h-50 card-image-wrapper border-0 shadow-sm">
              <img :src="logo1" alt="Logo" class="card-img-fit" />
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
import logo from "@/assets/images/scholarship/Logo_MPTC.png";
import logo1 from "@/assets/images/scholarship/ANT logo HD.png";
import logo2 from "@/assets/images/scholarship/CBRD Fund Logo Final.png";
import BookImage from "@/assets/images/homepage/book.png";
import socheata from "@/assets/images/team/socheata.jpg";
import sophearith from "@/assets/images/team/sophearith.jpg";
import votey from "@/assets/images/team/votey.png";
import liza from "@/assets/images/team/liza.jpg";
import vanny from "@/assets/images/team/vanny.jpg";
import Nara from "@/assets/images/team/Tel Sophannara.png";
</script>

<style scoped>
.text-des {
  text-align: justify;
  text-justify: inter-word;
  text-align-last: justify;
  line-height: 38px;
  margin-top: 5%;

}
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
  background:
    radial-gradient(circle at 90% 10%,
      rgba(19, 112, 127, 0.1) 0%,
      transparent 40%),
    radial-gradient(circle at 10% 90%,
      rgba(30, 159, 179, 0.05) 0%,
      transparent 40%);
}

.hero-title {
  font-size: clamp(3rem, 6vw, 5rem);
  line-height: 1.3;
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
  background-color: var(--bg-alt);
  /* Light gray/teal separator bg */
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
  background: repeating-linear-gradient(to right,
      var(--primary) 0,
      var(--primary) 10px,
      transparent 10px,
      transparent 20px);
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

/* thanksyou */

.thank-you {
  padding: 120px;
  position: relative;
  background: linear-gradient(120deg,
      #bddee8,
      #b7e9eacf,
      #f0bdd9);
  background-size: 400% 400%;
  animation: gradientMove 15s ease infinite;
  overflow: hidden;
}

@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.card-thank-you {
  padding: 20px 50px;
  background: #ffffff;
  border-radius: 50px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.card-image-wrapper {
  overflow: hidden;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 250px;
  padding: 10px;
}

.card-img-fit {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.card-img-fit:hover {
  transform: scale(1.05);
}
</style>
