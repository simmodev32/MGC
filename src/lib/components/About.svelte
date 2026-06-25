<!-- src/lib/components/About.svelte -->
<script>
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  let sectionRef = $state(null);
  let imageRef = $state(null);
  let contentRef = $state(null);

  onMount(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef,
        start: 'top 75%',
      }
    });

    tl.fromTo(imageRef,
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' }
    )
    .fromTo(contentRef,
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' },
      '-=0.6'
    );

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  });
</script>

<section class="about" id="about" bind:this={sectionRef}>

  <div class="about-media" bind:this={imageRef}>
    <img src="/images/about-car.webp" alt="MGC fleet vehicle" />
    <div class="image-tag">
      <span class="tag-num">12+</span>
      <span class="tag-label">Years in Business</span>
    </div>
  </div>

  <div class="about-content" bind:this={contentRef}>
    <div class="section-eyebrow">Who We Are</div>
    <h2 class="section-heading">Redefining Car Rental<br>In Trinidad</h2>
    <p class="about-body">
      MGC Car Rental & Leasing has been the gold standard in vehicle hire across Trinidad and Tobago for over a decade. We built our reputation on a simple premise — every client deserves a fleet they can trust, service they can rely on, and terms that are completely transparent.
    </p>
 

    <div class="about-pillars">
      <div class="pillar">
        <div class="pillar-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <div class="pillar-title">Immaculate Fleet</div>
        <div class="pillar-text">Every vehicle inspected, detailed, and road-ready before it reaches you.</div>
      </div>
      <div class="pillar">
        <div class="pillar-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        </div>
        <div class="pillar-title">Flexible Terms</div>
        <div class="pillar-text">Daily, weekly, monthly, or long-term lease — we work around your schedule.</div>
      </div>
      <div class="pillar">
        <div class="pillar-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
        </div>
        <div class="pillar-title">24/7 Support</div>
        <div class="pillar-text">Our team is always reachable — the road doesn't keep office hours.</div>
      </div>
      <div class="pillar">
        <div class="pillar-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><path d="M12 22V7m0 0H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zm0 0h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
          </svg>
        </div>
        <div class="pillar-title">Fully Insured</div>
        <div class="pillar-text">Comprehensive coverage options so you drive with complete peace of mind.</div>
      </div>
    </div>

  </div>

</section>

<style>
  .about {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6vw;
    align-items: center;
    padding: 100px 5vw;
    background: #111111;
  }

  /* ── IMAGE ── */
  .about-media {
    position: relative;
  }

  .about-media img {
    width: 100%;
    height: 520px;
    object-fit: cover;
    border-radius: 6px;
    display: block;
  }

  .about-media::before {
    content: '';
    position: absolute;
    top: -16px;
    left: -16px;
    width: 55%;
    height: 55%;
    border-top: 3px solid var(--gold);
    border-left: 3px solid var(--gold);
    border-radius: 4px 0 0 0;
    z-index: 2;
    pointer-events: none;
  }

  .image-tag {
    position: absolute;
    bottom: 2rem;
    right: -1.5rem;
    background: var(--gold);
    color: var(--black);
    padding: 1rem 1.4rem;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1;
  }

  .tag-num {
    font-family: "Cal Sans", sans-serif;
    font-size: 2rem;
  }

  .tag-label {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-top: 0.3rem;
    white-space: nowrap;
  }

  /* ── CONTENT ── */
  .section-eyebrow {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 1rem;
  }

  .section-heading {
    font-family: "Cal Sans", sans-serif;
    font-size: clamp(2rem, 3vw, 2.8rem);
    line-height: 1.15;
    color: #ffffff;
    margin-bottom: 1.5rem;
  }

  .about-body {
    font-size: 0.95rem;
    line-height: 1.8;
    color: var(--muted);
    margin-bottom: 1rem;
  }

  /* ── PILLARS ── */
  .about-pillars {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin: 2rem 0;
  }

  .pillar {
    background: #191919;
    border: 1px solid rgba(245,168,0,0.18);
    border-radius: 6px;
    padding: 1.2rem;
  }

  .pillar-icon {
    width: 40px;
    height: 40px;
    background: rgba(245,168,0,0.12);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--gold);
    margin-bottom: 0.75rem;
  }

  .pillar-title {
    font-family: "Cal Sans", sans-serif;
    font-size: 0.95rem;
    color: #ffffff;
    margin-bottom: 0.35rem;
  }

  .pillar-text {
    font-size: 0.8rem;
    color: var(--muted);
    line-height: 1.55;
  }



  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .about {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
    .about-media img { height: 360px; }
    .image-tag { right: 1rem; }
  }
</style>