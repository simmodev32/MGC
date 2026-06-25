<!-- src/lib/components/Testimonials.svelte -->
<script>
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  let sectionRef = $state(null);
  let headerRef = $state(null);
  let cardsRef = $state(null);

  const testimonials = [


    {
      name: 'Kevin Baptiste',
      detail: 'Operations Manager · San Fernando',
      stars: 5,
      quote: 'Six-month lease for our company vehicles and the experience has been outstanding. Quick responses, flexible terms, and genuine care for our account. Highly recommended.',
      avatar: 'KB'
    },
    {
      name: 'Priya Maharaj',
      detail: 'Event Coordinator · Chaguanas',
      stars: 5,
      quote: 'Needed a last-minute rental for a wedding and MGC came through without a hitch. Clean car, fair price, zero stress. Exactly what you need when the pressure is on.',
      avatar: 'PM'
    },
    {
      name: 'Darren Williams',
      detail: 'Contractor · Tobago',
      stars: 5,
      quote: 'Used MGC for a month-long project contract. Vehicle was reliable throughout, no issues at all. The team checked in regularly to make sure everything was going smoothly.',
      avatar: 'DW'
    },

  ];

  onMount(() => {
    gsap.fromTo(headerRef,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef, start: 'top 75%' }
      }
    );

    gsap.fromTo(cardsRef.querySelectorAll('.testi-card'),
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: cardsRef, start: 'top 80%' }
      }
    );

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  });
</script>

<section class="testimonials" id="testimonials" bind:this={sectionRef}>

  <div class="testi-header" bind:this={headerRef}>
    <div class="section-eyebrow">Client Reviews</div>
    <h2 class="section-heading">Trusted By Thousands<br>Across T&T</h2>
    <p class="testi-sub">Don't take our word for it — here's what our clients say.</p>
  </div>

  <div class="testi-grid" bind:this={cardsRef}>
    {#each testimonials as t, i}
      <div class="testi-card" class:featured={i === 0}>
        <div class="testi-top">
          <div class="testi-stars">
            {#each Array(t.stars) as _}★{/each}
          </div>
          <div class="quote-mark">"</div>
        </div>
        <p class="testi-quote">{t.quote}</p>
        <div class="testi-author">
          <div class="author-avatar">{t.avatar}</div>
          <div>
            <div class="author-name">{t.name}</div>
            <div class="author-detail">{t.detail}</div>
          </div>
        </div>
      </div>
    {/each}
  </div>

</section>

<style>
  .testimonials {
    padding: 100px 5vw;
    background: #0A0A0A;
  }

  /* ── HEADER ── */
  .testi-header {
    text-align: center;
    max-width: 560px;
    margin: 0 auto 4rem;
  }

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
    margin-bottom: 1rem;
  }

  .testi-sub {
    font-size: 0.95rem;
    color: var(--muted);
    line-height: 1.7;
  }

  /* ── GRID ── */
  .testi-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  /* ── CARD ── */
  .testi-card {
    background: #111111;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 8px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    transition: border-color 0.25s, transform 0.25s;
  }
  .testi-card:hover {
    border-color: rgba(245,168,0,0.3);
    transform: translateY(-4px);
  }
  .testi-card.featured {
    border-color: var(--gold);
  }

  .testi-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .testi-stars {
    color: var(--gold);
    font-size: 0.9rem;
    letter-spacing: 0.1em;
  }

  .quote-mark {
    font-family: "Cal Sans", sans-serif;
    font-size: 4rem;
    color: rgba(245,168,0,0.15);
    line-height: 1;
    margin-top: -0.5rem;
  }

  .testi-quote {
    font-size: 0.9rem;
    line-height: 1.8;
    color: #cccccc;
    font-style: italic;
    flex: 1;
  }

  /* ── AUTHOR ── */
  .testi-author {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    padding-top: 1.2rem;
    border-top: 1px solid rgba(255,255,255,0.06);
  }

  .author-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(245,168,0,0.15);
    border: 2px solid rgba(245,168,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Cal Sans", sans-serif;
    font-size: 0.75rem;
    color: var(--gold);
    flex-shrink: 0;
    letter-spacing: 0.05em;
  }

  .author-name {
    font-family: "Cal Sans", sans-serif;
    font-size: 0.9rem;
    color: #ffffff;
  }

  .author-detail {
    font-size: 0.75rem;
    color: var(--muted);
    margin-top: 0.2rem;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 960px) {
    .testi-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 560px) {
    .testi-grid { grid-template-columns: 1fr; }
  }
</style>