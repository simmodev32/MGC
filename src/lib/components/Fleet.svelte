<script>
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { fleet } from '$lib/data/fleet.js';

  gsap.registerPlugin(ScrollTrigger);

  let sectionRef = $state(null);
  let headerRef = $state(null);
  let gridRef = $state(null);

  onMount(() => {
    gsap.fromTo(headerRef,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef, start: 'top 75%' }
      }
    );

    gsap.fromTo(gridRef.querySelectorAll('.car-card'),
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: gridRef, start: 'top 80%' }
      }
    );

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  });
</script>

<section class="fleet" id="fleet" bind:this={sectionRef}>

  <div class="fleet-header" bind:this={headerRef}>
    <div>
      <div class="section-eyebrow">Our Fleet</div>
      <h2 class="section-heading">Choose Your Vehicle</h2>
    </div>

  </div>

  <div class="fleet-grid" bind:this={gridRef}>
    {#each fleet as car}
      <div class="car-card">
        <div class="car-image-wrap">
          <img src={car.image} alt={car.name} class="car-image" />
        </div>
        <div class="car-body">
          <div class="car-meta">{car.year} · {car.transmission} · {car.seats} Seats</div>
          <div class="car-name">{car.name}</div>

          <div class="car-specs">
            <div class="spec">
              <div class="spec-val">{car.transmission.slice(0,4)}</div>
              <div class="spec-key">Trans</div>
            </div>
            <div class="spec-divider"></div>

            <div class="spec">
              <div class="spec-val">{car.seats}</div>
              <div class="spec-key">Seats</div>
            </div>
          </div>

          <div class="car-footer">
            <div class="car-price">
              TTD {car.pricePerDay.toLocaleString()}
              <span>/ day</span>
            </div>
            <button class="car-btn">Rent Now</button>
          </div>
        </div>
      </div>
    {/each}
  </div>

</section>

<style>
  .fleet {
    padding: 100px 5vw;
    background: #0A0A0A;
  }

  /* ── HEADER ── */
  .fleet-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 3.5rem;
  }

  .section-eyebrow {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 0.75rem;
  }

  .section-heading {
    font-family: "Gabarito", sans-serif;
    font-weight: 600;
    font-size: clamp(3rem, 5.5vw, 3rem);
    line-height: 1.05;
    color: #ffffff;
  }

  .btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid var(--gold);
    color: var(--gold);
    font-family: "Cal Sans", sans-serif;
    font-size: 0.78rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 0.7rem 1.4rem;
    border-radius: 4px;
    white-space: nowrap;
    transition: background 0.2s, color 0.2s;
  }
  .btn-outline:hover {
    background: var(--gold);
    color: var(--black);
  }

  /* ── GRID ── */
  .fleet-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  /* ── CARD ── */
  .car-card {
    background: #111111;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 8px;
    overflow: hidden;
    transition: border-color 0.25s, transform 0.25s;
    cursor: pointer;
  }
  .car-card:hover {
    border-color: var(--gold);
    transform: translateY(-5px);
  }

  .car-image-wrap {
    position: relative;
    overflow: hidden;
  }

  .car-image {
    width: 100%;
    height: 210px;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }
  .car-card:hover .car-image {
    transform: scale(1.04);
  }

  .car-category {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: var(--gold);
    color: var(--black);
    font-family: "Cal Sans", sans-serif;
    font-size: 0.65rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 0.3rem 0.7rem;
    border-radius: 3px;
  }

  .car-body {
    padding: 1.4rem;
  }

  .car-meta {
    font-size: 0.75rem;
    color: var(--muted);
    margin-bottom: 0.4rem;
    letter-spacing: 0.04em;
  }

  .car-name {
    font-family: "Cal Sans", sans-serif;
    font-size: 1.3rem;
    color: #ffffff;
    margin-bottom: 1.2rem;
  }

  /* ── SPECS ── */
  .car-specs {
    display: flex;
    align-items: center;
    gap: 0;
    padding: 1rem 0;
    border-top: 1px solid rgba(255,255,255,0.06);
    border-bottom: 1px solid rgba(255,255,255,0.06);
    margin-bottom: 1.2rem;
  }

  .spec {
    flex: 1;
    text-align: center;
  }

  .spec-val {
    font-family: "Cal Sans", sans-serif;
    font-size: 0.95rem;
    color: #ffffff;
    margin-bottom: 0.2rem;
  }

  .spec-key {
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
  }

  .spec-divider {
    width: 1px;
    height: 28px;
    background: rgba(255,255,255,0.08);
    flex-shrink: 0;
  }

  /* ── FOOTER ── */
  .car-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .car-price {
    font-family: "Cal Sans", sans-serif;
    font-size: 1.4rem;
    color: var(--gold);
    line-height: 1;
  }
  .car-price span {
    font-family: "DM Sans", sans-serif;
    font-size: 0.75rem;
    color: var(--muted);
    font-weight: 400;
  }

  .car-btn {
    background: var(--gold);
    color: var(--black);
    font-family: "Cal Sans", sans-serif;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.55rem 1.1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
  }
  .car-btn:hover { background: var(--gold-dim); }

  /* ── RESPONSIVE ── */
  @media (max-width: 960px) {
    .fleet-grid { grid-template-columns: repeat(2, 1fr); }
    .fleet-header { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
  }

  @media (max-width: 560px) {
    .fleet-grid { grid-template-columns: 1fr; }
  }
</style>