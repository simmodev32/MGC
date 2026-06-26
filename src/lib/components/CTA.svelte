<!-- src/lib/components/CTA.svelte -->
<script>
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  let sectionRef = $state(null);
  let contentRef = $state(null);

  onMount(() => {
    gsap.fromTo(contentRef,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef, start: 'top 75%' }
      }
    );

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  });
</script>

<section class="cta" id="contact" bind:this={sectionRef}>
  <div class="cta-bg"></div>

  <div class="cta-inner" bind:this={contentRef}>

    <div class="cta-left">
      <div class="section-eyebrow">Ready to Move?</div>
      <h2 class="cta-heading">
        Get Behind the<br>
        <span class="accent">Wheel Today.</span>
      </h2>
      <p class="cta-sub">
        Browse our fleet, pick your dates, and drive off in a vehicle that meets your standard. Serving Port of Spain, Piarco, San Fernando, and Chaguanas.
      </p>

      <div class="cta-actions">
        <a href="#fleet" class="btn-primary">
          Browse The Fleet
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
        <a href="tel:18683961127" class="btn-ghost">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.27 16h-.35z"/>
          </svg>
          1 (868) 396-1127
        </a>
      </div>
    </div>

    <div class="cta-right">
      <div class="requirements-card">
        <div class="req-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
          </svg>
          Rental Requirements
        </div>
        <ul class="req-list">
          <li>
            <div class="req-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
            </div>
            Valid Driver's Permit
          </li>
          <li>
            <div class="req-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/></svg>
            </div>
            National ID / Passport
          </li>
          <li>
            <div class="req-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            </div>
            Proof of Address
          </li>
          <li>
            <div class="req-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            </div>
            Employment / Business Verification
          </li>
          <li>
            <div class="req-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            Security Deposit
          </li>
          <li>
            <div class="req-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
            </div>
            Payment to Confirm Booking
          </li>
        </ul>
      </div>
    </div>

  </div>
</section>

<style>
  .cta {
    position: relative;
    padding: 100px 5vw;
    background: #111111;
    overflow: hidden;
  }

  .cta-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 80% 50%, rgba(245,168,0,0.06) 0%, transparent 60%),
      radial-gradient(ellipse at 20% 50%, rgba(245,168,0,0.04) 0%, transparent 60%);
    pointer-events: none;
  }

  .cta-inner {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8vw;
    align-items: center;
  }

  /* ── LEFT ── */
  .section-eyebrow {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 1rem;
  }

  .cta-heading {
    font-family: "Gabarito", sans-serif;
    font-weight: 700;
    font-size: clamp(3rem, 5.5vw, 3.8rem);
    line-height: 1.05;
    color: #ffffff;
    margin-bottom: 1rem;
  }
  .cta-heading .accent { color: var(--gold); }

  .cta-sub {
    font-size: 0.95rem;
    line-height: 1.8;
    color: var(--muted);
    margin-bottom: 2.5rem;
    max-width: 420px;
  }

  .cta-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--gold);
    color: #0A0A0A;
    font-family: "Cal Sans", sans-serif;
    font-size: 0.82rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 0.9rem 1.8rem;
    border-radius: 4px;
    transition: background 0.2s;
  }
  .btn-primary:hover { background: var(--gold-dim); }

  .btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    background: transparent;
    color: #ffffff;
    font-family: "Cal Sans", sans-serif;
    font-size: 0.82rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 0.9rem 1.8rem;
    border-radius: 4px;
    border: 1px solid rgba(255,255,255,0.2);
    transition: border-color 0.2s, color 0.2s;
  }
  .btn-ghost:hover {
    border-color: #ffffff;
    color: #ffffff;
  }

  /* ── REQUIREMENTS CARD ── */
  .requirements-card {
    background: #0A0A0A;
    border: 1px solid rgba(245,168,0,0.2);
    border-top: 3px solid var(--gold);
    border-radius: 8px;
    padding: 2rem;
  }

  .req-title {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-family: "Cal Sans", sans-serif;
    font-size: 0.9rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #ffffff;
    margin-bottom: 1.5rem;
  }
  .req-title svg { color: var(--gold); }

  .req-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .req-list li {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    font-size: 0.875rem;
    color: #cccccc;
    padding: 0.85rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .req-list li:last-child { border-bottom: none; }

  .req-icon {
    width: 32px;
    height: 32px;
    background: rgba(245,168,0,0.1);
    border: 1px solid rgba(245,168,0,0.2);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--gold);
    flex-shrink: 0;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .cta-inner {
      grid-template-columns: 1fr;
      gap: 4rem;
    }
  }
</style>