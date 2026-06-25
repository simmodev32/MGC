<!-- src/lib/components/Footer.svelte -->
<script>
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  let footerRef = $state(null);

  onMount(() => {
    gsap.fromTo(footerRef,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: footerRef, start: 'top 90%' }
      }
    );

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  });
</script>

<footer bind:this={footerRef}>

  <div class="footer-top">
    <div class="footer-brand">
      <div class="footer-logo"><span>MGC</span> Car Rental & Leasing</div>
      <p class="footer-tagline">
        Trinidad & Tobago's trusted name in premium car rental and long-term vehicle leasing. Drive with confidence.
      </p>
      <div class="footer-socials">
        <a href="/" class="social-icon" aria-label="Facebook">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
          </svg>
        </a>
        <a href="/" class="social-icon" aria-label="Instagram">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
          </svg>
        </a>
        <a href="/" class="social-icon" aria-label="YouTube">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
            <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0A0A0A"/>
          </svg>
        </a>
        <a href="https://wa.me/18683961127" class="social-icon" aria-label="WhatsApp">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.86L.057 23.215a.75.75 0 0 0 .916.933l5.503-1.44A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.716 9.716 0 0 1-4.953-1.354l-.355-.211-3.664.959.981-3.567-.231-.366A9.715 9.715 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
          </svg>
        </a>
      </div>
    </div>

    <div class="footer-col">
      <div class="footer-col-title">Navigation</div>
      <ul class="footer-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#fleet">Our Fleet</a></li>
        <li><a href="#about">About MGC</a></li>
        <li><a href="#why">Why Choose Us</a></li>
        <li><a href="#testimonials">Reviews</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <div class="footer-col-title">Services</div>
      <ul class="footer-links">
        <li><a href="#fleet">Daily Rental</a></li>
        <li><a href="#fleet">Weekly Rental</a></li>
        <li><a href="#fleet">Long-Term Lease</a></li>
        <li><a href="#fleet">Corporate Accounts</a></li>
        <li><a href="#fleet">Airport Pickup</a></li>
        <li><a href="#fleet">Island-Wide Delivery</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <div class="footer-col-title">Contact Us</div>
      <div class="contact-items">
        <a href="tel:18683961127" class="contact-item">
          <div class="contact-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.27 16h-.35z"/>
            </svg>
          </div>
          <div class="contact-text">1 (868) 396-1127</div>
        </a>
        <a href="mailto:info@mgcrentals.tt" class="contact-item">
          <div class="contact-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <div class="contact-text">info@mgcrentals.tt</div>
        </a>
        <div class="contact-item">
          <div class="contact-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <div class="contact-text">Port of Spain · Piarco<br>San Fernando · Chaguanas</div>
        </div>
        <div class="contact-item">
          <div class="contact-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <div class="contact-text">Mon–Sat: 7am – 7pm<br>Sun: 8am – 4pm</div>
        </div>
      </div>
    </div>
  </div>

  <div class="footer-bottom">
    <div class="footer-copy">
      © {new Date().getFullYear()} MGC Car Rental & Leasing. All rights reserved.
    </div>
    <div class="footer-legal">
      <a href="/">Developed By Keagan Simmons</a>
    </div>
  </div>

</footer>

<style>
  footer {
    background: #050505;
    border-top: 1px solid rgba(245,168,0,0.12);
    padding: 70px 5vw 0;
  }

  /* ── TOP GRID ── */
  .footer-top {
    display: grid;
    grid-template-columns: 1.6fr 1fr 1fr 1.2fr;
    gap: 4vw;
    padding-bottom: 4rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  /* ── BRAND ── */
  .footer-logo {
    font-family: "Cal Sans", sans-serif;
    font-size: 1.4rem;
    letter-spacing: 0.08em;
    color: #ffffff;
    margin-bottom: 1rem;
  }
  .footer-logo span { color: var(--gold); }

  .footer-tagline {
    font-size: 0.875rem;
    color: var(--muted);
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }

  .footer-socials {
    display: flex;
    gap: 0.6rem;
  }

  .social-icon {
    width: 36px;
    height: 36px;
    border: 1px solid rgba(245,168,0,0.2);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--muted);
    transition: border-color 0.2s, color 0.2s;
  }
  .social-icon:hover {
    border-color: var(--gold);
    color: var(--gold);
  }

  /* ── COLS ── */
  .footer-col-title {
    font-family: "Cal Sans", sans-serif;
    font-size: 0.8rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #ffffff;
    margin-bottom: 1.4rem;
  }

  .footer-links {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }
  .footer-links a {
    font-size: 0.875rem;
    color: var(--muted);
    transition: color 0.2s;
  }
  .footer-links a:hover { color: var(--gold); }

  /* ── CONTACT ── */
  .contact-items {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
  }

  .contact-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    color: var(--muted);
    transition: color 0.2s;
  }
  a.contact-item:hover { color: var(--gold); }

  .contact-icon {
    width: 28px;
    height: 28px;
    background: rgba(245,168,0,0.08);
    border: 1px solid rgba(245,168,0,0.15);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--gold);
    flex-shrink: 0;
    margin-top: 0.1rem;
  }

  .contact-text {
    font-size: 0.85rem;
    line-height: 1.6;
  }

  /* ── BOTTOM ── */
  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.8rem 0;
  }

  .footer-copy {
    font-size: 0.8rem;
    color: var(--muted);
  }

  .footer-legal {
    display: flex;
    gap: 2rem;
  }
  .footer-legal a {
    font-size: 0.8rem;
    color: var(--muted);
    transition: color 0.2s;
  }
  .footer-legal a:hover { color: var(--gold); }

  /* ── RESPONSIVE ── */
  @media (max-width: 960px) {
    .footer-top {
      grid-template-columns: 1fr 1fr;
      gap: 2.5rem;
    }
  }

  @media (max-width: 560px) {
    .footer-top { grid-template-columns: 1fr; }
    .footer-bottom {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }
    .footer-legal { gap: 1.2rem; }
  }
</style>