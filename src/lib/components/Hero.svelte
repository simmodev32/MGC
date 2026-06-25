<!-- src/lib/components/Hero.svelte -->
<script>
  import { onMount } from 'svelte';
  import gsap from 'gsap';

  let copyRef = $state(null);
  let panelRef = $state(null);

  onMount(() => {
    const tl = gsap.timeline({ delay: 0.1 });

    tl.fromTo(copyRef,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
    )
    .fromTo(panelRef,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
      '-=0.4'
    );
  });
</script>

<section class="hero" id="home">

  <!-- Full-bleed image area -->
  <div class="hero-image-wrap">
    <div class="hero-bg"></div>

    <!-- Copy sits over the image, left-aligned -->
    <div class="hero-copy" bind:this={copyRef}>
      <div class="hero-eyebrow">Trinidad & Tobago's Premium Fleet</div>
      <h1 class="hero-heading">
        Drive With<br>
        <span class="accent">Confidence.</span><br>
        Every Time.
      </h1>
      <p class="hero-sub">
        Premium vehicles, transparent pricing, unmatched service — from booking to key return.
      </p>
      <div class="hero-actions">
        <a href="#fleet" class="btn-primary">Browse Fleet</a>
        <a href="#contact" class="btn-ghost">Make Enquiry</a>
      </div>
    </div>
  </div>

  <!-- Search bar — sits flush below the image -->
  <div class="search-bar" bind:this={panelRef}>
    <div class="search-label">Find Your Vehicle</div>
    <div class="search-fields">

      <div class="search-field">
        <label for="vehicle">Vehicle Type</label>
        <select id="vehicle">
          <option value="">Any Vehicle</option>
          <option>Sedan</option>
          <option>SUV</option>
          <option>Luxury</option>
          <option>Van</option>
        </select>
      </div>

      <div class="field-divider"></div>

      <div class="search-field">
        <label for="pickup-date">Pickup Date</label>
        <input type="date" id="pickup-date" />
      </div>

      <div class="field-divider"></div>

      <div class="search-field">
        <label for="pickup-time">Pickup Time</label>
        <input type="time" id="pickup-time" />
      </div>

      <div class="field-divider"></div>

      <div class="search-field">
        <label for="return-date">Return Date</label>
        <input type="date" id="return-date" />
      </div>

      <div class="field-divider"></div>

      <div class="search-field">
        <label for="return-time">Return Time</label>
        <input type="time" id="return-time" />
      </div>

      <button class="search-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        Search
      </button>

    </div>
  </div>

</section>

<style>
  .hero {
    display: flex;
    flex-direction: column;
    width: 100vw;
  }

  /* ── IMAGE AREA ── */
.hero-image-wrap {
  position: relative;
  width: 100%;
  height: 88vh;
  min-height: 580px;
  overflow: hidden;
  padding-top: 72px;
}

  .hero-bg {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg,
        rgba(10,10,10,0.88) 0%,
        rgba(10,10,10,0.55) 50%,
        rgba(10,10,10,0.1) 100%
      ),
      url('/images/hero-car.webp') center / cover no-repeat;
  }

  /* ── COPY ── */
  .hero-copy {
  position: absolute;
  z-index: 2;
  bottom: 3rem;
  left: 5vw;
  max-width: 580px;
}

  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 1.2rem;
  }
  .hero-eyebrow::before {
    content: '';
    display: block;
    width: 28px;
    height: 2px;
    background: var(--gold);
    flex-shrink: 0;
  }

  .hero-heading {
  font-family: "Stack Sans Text", sans-serif;
  font-weight: 700;
    font-size: clamp(3.2rem, 5.5vw, 5.5rem);
    line-height: 1.0;
    letter-spacing: 0.0em;
    color: var(--white);
    margin-bottom: 1.2rem;
  }
  .hero-heading .accent { color: var(--gold); }

  .hero-sub {
    font-size: 1rem;
    line-height: 1.7;
    color: rgba(255,255,255,0.6);
    max-width: 400px;
    margin-bottom: 2rem;
  }

  .hero-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    background: var(--gold);
    color: var(--black);
    font-family: "Cal Sans", sans-serif;
    font-size: 0.82rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 0.85rem 1.8rem;
    border-radius: 4px;
    transition: background 0.2s;
  }
  .btn-primary:hover { background: var(--gold-dim); }

  .btn-ghost {
    display: inline-flex;
    align-items: center;
    background: transparent;
    color: var(--white);
    font-family: "Cal Sans", sans-serif;
    font-size: 0.82rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 0.85rem 1.8rem;
    border-radius: 4px;
    border: 1px solid rgba(255,255,255,0.3);
    transition: border-color 0.2s, color 0.2s;
  }
  .btn-ghost:hover {
    border-color: var(--white);
    color: var(--white);
  }

  /* ── SEARCH BAR ── */
  .search-bar {
    background: var(--surface);
    border-top: 3px solid var(--gold);
    padding: 1.4rem 5vw;
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .search-label {
    font-family: "Cal Sans", sans-serif;
    font-size: 0.85rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--white);
    white-space: nowrap;
    flex-shrink: 0;
  }

  .search-fields {
    display: flex;
    align-items: center;
    gap: 0;
    flex: 1;
    background: var(--surface-2);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 6px;
    overflow: hidden;
  }

  .search-field {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding: 0.65rem 1rem;
    flex: 1;
    min-width: 0;
  }

  .search-field label {
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted);
    white-space: nowrap;
  }

  .search-field select,
  .search-field input {
    background: transparent;
    border: none;
    color: var(--white);
    font-family: "DM Sans", sans-serif;
    font-size: 0.85rem;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    width: 100%;
    padding: 0;
  }
  .search-field select option { background: var(--surface); }

  .field-divider {
    width: 1px;
    height: 36px;
    background: rgba(255,255,255,0.08);
    flex-shrink: 0;
  }

  .search-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--gold);
    color: var(--black);
    font-family: "Cal Sans", sans-serif;
    font-size: 0.82rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0 1.8rem;
    border: none;
    cursor: pointer;
    height: 100%;
    min-height: 52px;
    flex-shrink: 0;
    transition: background 0.2s;
  }
  .search-btn:hover { background: var(--gold-dim); }

  /* ── RESPONSIVE ── */
  @media (max-width: 1024px) {
    .search-bar {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
    .search-fields {
      flex-wrap: wrap;
      border-radius: 6px;
    }
    .search-field { min-width: 140px; }
    .field-divider { display: none; }
    .search-btn { width: 100%; justify-content: center; min-height: 44px; }
  }

  @media (max-width: 600px) {
    .hero-image-wrap { height: 75vh; }
    .search-field { width: 100%; }
  }
</style>