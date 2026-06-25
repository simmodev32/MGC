<script>
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { fleet } from '$lib/data/fleet.js';

  let copyRef = $state(null);
  let panelRef = $state(null);

  // ── PANEL STATE ──
  let selectedVehicle = $state(null);
  let pickupDate      = $state('');
  let pickupTime      = $state('');
  let returnDate      = $state('');
  let returnTime      = $state('');

  // ── MODALS ──
  let showVehicleModal  = $state(false);
  let showBookingModal  = $state(false);

  // ── BOOKING FORM ──
  let guestName     = $state('');
  let guestAge      = $state('');
  let guestEmail    = $state('');
  let permitFile    = $state(null);
  let permitPreview = $state('');

  // ── SUBMISSION ──
  let submitStatus = $state('idle');
  let submitError  = $state('');

  // ── COMPUTED ──
  let days = $derived(
    pickupDate && returnDate
      ? Math.max(0, Math.ceil((new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24)))
      : 0
  );

  let totalPrice = $derived(
    selectedVehicle && days > 0 ? selectedVehicle.pricePerDay * days : 0
  );

  let panelComplete = $derived(
    selectedVehicle !== null &&
    pickupDate !== '' &&
    pickupTime !== '' &&
    returnDate !== '' &&
    returnTime !== '' &&
    days > 0
  );

let bookingFormComplete = $derived(
  guestName.trim() !== '' &&
  guestAge !== '' && guestAge !== null &&
  guestEmail.trim() !== '' &&
  permitFile !== null
);

  function openVehicleModal() { showVehicleModal = true; }
  function closeVehicleModal() { showVehicleModal = false; }

  function selectVehicle(car) {
    selectedVehicle = car;
    showVehicleModal = false;
  }

  function openBookingModal() {
    if (!panelComplete) return;
    showBookingModal = true;
    submitStatus = 'idle';
  }

  function closeBookingModal() {
    showBookingModal = false;
    submitStatus = 'idle';
    submitError = '';
  }

  function handlePermitUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    permitFile = file;
    const reader = new FileReader();
    reader.onload = (ev) => { permitPreview = ev.target.result; };
    reader.readAsDataURL(file);
  }

  async function submitBooking() {
    if (!bookingFormComplete) return;
    submitStatus = 'loading';
    submitError = '';

    const fd = new FormData();
    fd.append('name',       guestName);
    fd.append('age',        guestAge);
    fd.append('email',      guestEmail);
    fd.append('vehicle',    selectedVehicle.name);
    fd.append('pickupDate', pickupDate);
    fd.append('pickupTime', pickupTime);
    fd.append('returnDate', returnDate);
    fd.append('returnTime', returnTime);
    fd.append('days',       days);
    fd.append('totalPrice', totalPrice);
    fd.append('permit',     permitFile);

    try {
      const res = await fetch('/api/booking', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success) {
        submitStatus = 'success';
      } else {
        submitStatus = 'error';
        submitError = data.error || 'Something went wrong.';
      }
    } catch {
      submitStatus = 'error';
      submitError = 'Network error. Please try again.';
    }
  }

  function handleBackdrop(e) {
    if (e.target === e.currentTarget) {
      showVehicleModal = false;
      showBookingModal = false;
    }
  }

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

<!-- ══════════════════════════════════════════ -->
<!-- HERO                                       -->
<!-- ══════════════════════════════════════════ -->
<section class="hero" id="home">

  <div class="hero-image-wrap">
    <div class="hero-bg"></div>
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

  <!-- ── BOOKING BAR ── -->
  <div class="search-bar" bind:this={panelRef}>
    <div class="search-label">Book a Vehicle</div>
    <div class="search-fields">

      <div class="search-field vehicle-field" role="button" tabindex="0"
        onclick={openVehicleModal}
        onkeydown={(e) => e.key === 'Enter' && openVehicleModal()}
      >
        <label>Vehicle</label>
        {#if selectedVehicle}
          <div class="selected-vehicle">
            <span class="sv-name">{selectedVehicle.name}</span>
            <span class="sv-price">TTD {selectedVehicle.pricePerDay}/day</span>
          </div>
        {:else}
          <span class="field-placeholder">Select vehicle</span>
        {/if}
      </div>

      <div class="field-divider"></div>

      <div class="search-field">
        <label for="pickup-date">Pickup Date</label>
        <input type="date" id="pickup-date" bind:value={pickupDate} />
      </div>

      <div class="field-divider"></div>

      <div class="search-field">
        <label for="pickup-time">Pickup Time</label>
        <input type="time" id="pickup-time" bind:value={pickupTime} />
      </div>

      <div class="field-divider"></div>

      <div class="search-field">
        <label for="return-date">Return Date</label>
        <input type="date" id="return-date" bind:value={returnDate} />
      </div>

      <div class="field-divider"></div>

      <div class="search-field">
        <label for="return-time">Return Time</label>
        <input type="time" id="return-time" bind:value={returnTime} />
      </div>

      <button
        class="search-btn"
        disabled={!panelComplete}
        onclick={openBookingModal}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>
        </svg>
        Book
      </button>

    </div>
  </div>

</section>

<!-- ══════════════════════════════════════════ -->
<!-- VEHICLE SELECTOR MODAL                     -->
<!-- ══════════════════════════════════════════ -->
{#if showVehicleModal}
  <div class="modal-backdrop" onclick={handleBackdrop} role="dialog" aria-modal="true">
    <div class="modal vehicle-modal">
      <div class="modal-header">
        <div>
          <div class="modal-eyebrow">Select a Vehicle</div>
          <h2 class="modal-title">Available Fleet</h2>
        </div>
        <button class="modal-close" onclick={closeVehicleModal}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <div class="vehicle-grid">
        {#each fleet as car}
          <div
            class="vehicle-option"
            class:active={selectedVehicle?.id === car.id}
            role="button"
            tabindex="0"
            onclick={() => selectVehicle(car)}
            onkeydown={(e) => e.key === 'Enter' && selectVehicle(car)}
          >
            <img src={car.image} alt={car.name} class="vo-image" />
            <div class="vo-body">
              <div class="vo-category">{car.category}</div>
              <div class="vo-name">{car.name}</div>
              <div class="vo-specs">{car.year} · {car.transmission} · {car.seats} seats</div>
              <div class="vo-price">TTD {car.pricePerDay.toLocaleString()} <span>/ day</span></div>
            </div>
            {#if selectedVehicle?.id === car.id}
              <div class="vo-check">✓</div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}

<!-- ══════════════════════════════════════════ -->
<!-- BOOKING SUMMARY MODAL                      -->
<!-- ══════════════════════════════════════════ -->
{#if showBookingModal}
  <div class="modal-backdrop" onclick={handleBackdrop} role="dialog" aria-modal="true">
    <div class="modal booking-modal">

      {#if submitStatus === 'success'}
        <div class="booking-success">
          <div class="success-icon">✓</div>
          <h2 class="success-title">Booking Request Sent</h2>
          <p class="success-text">
            We've received your request and sent a confirmation to <strong>{guestEmail}</strong>. Our team will be in touch within 1–2 business hours.
          </p>
          <button class="btn-primary-lg" onclick={closeBookingModal}>Done</button>
        </div>

      {:else}
        <div class="modal-header">
          <div>
            <div class="modal-eyebrow">Review & Confirm</div>
            <h2 class="modal-title">Booking Summary</h2>
          </div>
          <button class="modal-close" onclick={closeBookingModal}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div class="booking-body">

          <!-- Left: Summary -->
          <div class="booking-summary">
            <div class="summary-vehicle">
              <img src={selectedVehicle.image} alt={selectedVehicle.name} class="sv-thumb" />
              <div>
                <div class="sv-category">{selectedVehicle.category}</div>
                <div class="sv-title">{selectedVehicle.name}</div>
                <div class="sv-year">{selectedVehicle.year} · {selectedVehicle.transmission}</div>
              </div>
            </div>

            <div class="summary-rows">
              <div class="summary-row">
                <span class="sr-label">Pickup</span>
                <span class="sr-val">{pickupDate} · {pickupTime}</span>
              </div>
              <div class="summary-row">
                <span class="sr-label">Return</span>
                <span class="sr-val">{returnDate} · {returnTime}</span>
              </div>
              <div class="summary-row">
                <span class="sr-label">Duration</span>
                <span class="sr-val">{days} day{days !== 1 ? 's' : ''}</span>
              </div>
              <div class="summary-row">
                <span class="sr-label">Rate</span>
                <span class="sr-val">TTD {selectedVehicle.pricePerDay.toLocaleString()} / day</span>
              </div>
            </div>

            <div class="summary-total">
              <span class="total-label">Estimated Total</span>
              <span class="total-price">TTD {totalPrice.toLocaleString()}</span>
            </div>

            <p class="summary-note">
              * This is an estimate. Final pricing will be confirmed by our team before any charge is made.
            </p>
          </div>

          <!-- Right: Form -->
          <div class="booking-form">
            <div class="form-section-title">Your Details</div>

            <div class="bform-field">
              <label for="b-name">Full Name *</label>
              <input id="b-name" type="text" placeholder="John Smith" bind:value={guestName} />
            </div>

            <div class="bform-row">
              <div class="bform-field">
                <label for="b-age">Age *</label>
                <input id="b-age" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2" placeholder="25" bind:value={guestAge} />
              </div>
              <div class="bform-field">
                <label for="b-email">Email Address *</label>
                <input id="b-email" type="email" placeholder="john@example.com" bind:value={guestEmail} />
              </div>
            </div>

            <div class="bform-field">
              <label>Driver's Permit *</label>
              <label class="permit-upload" class:has-file={permitFile !== null}>
                {#if permitPreview}
                  <img src={permitPreview} alt="Permit preview" class="permit-preview" />
                  <span class="permit-label">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                    {permitFile.name}
                  </span>
                {:else}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  <span class="permit-label">Upload permit photo</span>
                  <span class="permit-hint">JPG, PNG or PDF · Max 5MB</span>
                {/if}
                <input type="file" accept="image/*,.pdf" onchange={handlePermitUpload} style="display:none" />
              </label>
            </div>

            {#if submitStatus === 'error'}
              <div class="form-error">{submitError}</div>
            {/if}

            <button
              class="btn-book"
              disabled={!bookingFormComplete || submitStatus === 'loading'}
              onclick={submitBooking}
            >
              {#if submitStatus === 'loading'}
                <div class="spinner"></div>
                Submitting...
              {:else}
                Confirm Booking Request
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              {/if}
            </button>
          </div>

        </div>
      {/if}

    </div>
  </div>
{/if}

<style>
  /* ══ HERO ══ */
  .hero {
    display: flex;
    flex-direction: column;
    width: 100vw;
  }

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
    font-family: "Cal Sans", sans-serif;
    font-size: clamp(3.2rem, 5.5vw, 5.5rem);
    line-height: 1.0;
    color: #ffffff;
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

  .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }

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
    color: #ffffff;
    font-family: "Cal Sans", sans-serif;
    font-size: 0.82rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 0.85rem 1.8rem;
    border-radius: 4px;
    border: 1px solid rgba(255,255,255,0.3);
    transition: border-color 0.2s;
  }
  .btn-ghost:hover { border-color: #ffffff; }

  /* ══ SEARCH BAR ══ */
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
    color: #ffffff;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .search-fields {
    display: flex;
    align-items: center;
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
    pointer-events: none;
  }

  .search-field select,
  .search-field input {
    background: transparent;
    border: none;
    color: #ffffff;
    font-family: "DM Sans", sans-serif;
    font-size: 0.85rem;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    width: 100%;
    padding: 0;
  }
  .search-field select option { background: var(--surface); }

  .vehicle-field {
    cursor: pointer;
    transition: background 0.15s;
  }
  .vehicle-field:hover { background: rgba(245,168,0,0.06); }

  .selected-vehicle {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }
  .sv-name {
    font-size: 0.85rem;
    color: #ffffff;
    font-family: "DM Sans", sans-serif;
  }
  .sv-price {
    font-size: 0.7rem;
    color: var(--gold);
  }

  .field-placeholder {
    font-size: 0.85rem;
    color: var(--muted);
    font-family: "DM Sans", sans-serif;
  }

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
    transition: background 0.2s, opacity 0.2s;
  }
  .search-btn:hover:not(:disabled) { background: var(--gold-dim); }
  .search-btn:disabled { opacity: 0.35; cursor: not-allowed; }

  /* ══ MODAL SHARED ══ */
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.75);
    backdrop-filter: blur(4px);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .modal {
    background: #111111;
    border: 1px solid rgba(245,168,0,0.2);
    border-top: 3px solid var(--gold);
    border-radius: 8px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 2rem 2rem 1.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    position: sticky;
    top: 0;
    background: #111111;
    z-index: 1;
  }

  .modal-eyebrow {
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 0.4rem;
  }

  .modal-title {
    font-family: "Cal Sans", sans-serif;
    font-size: 1.4rem;
    color: #ffffff;
  }

  .modal-close {
    background: transparent;
    border: 1px solid rgba(255,255,255,0.1);
    color: var(--muted);
    border-radius: 4px;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: border-color 0.2s, color 0.2s;
  }
  .modal-close:hover { border-color: var(--gold); color: var(--gold); }

  /* ══ VEHICLE MODAL ══ */
  .vehicle-modal { max-width: 900px; }

  .vehicle-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    padding: 1.5rem 2rem 2rem;
  }

  .vehicle-option {
    position: relative;
    background: #191919;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 6px;
    overflow: hidden;
    cursor: pointer;
    transition: border-color 0.2s, transform 0.2s;
  }
  .vehicle-option:hover { border-color: rgba(245,168,0,0.4); transform: translateY(-2px); }
  .vehicle-option.active { border-color: var(--gold); }

  .vo-image {
    width: 100%;
    height: 140px;
    object-fit: cover;
    display: block;
  }

  .vo-body { padding: 1rem; }

  .vo-category {
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 0.3rem;
  }

  .vo-name {
    font-family: "Cal Sans", sans-serif;
    font-size: 1rem;
    color: #ffffff;
    margin-bottom: 0.25rem;
  }

  .vo-specs {
    font-size: 0.75rem;
    color: var(--muted);
    margin-bottom: 0.6rem;
  }

  .vo-price {
    font-family: "Cal Sans", sans-serif;
    font-size: 1.1rem;
    color: var(--gold);
  }
  .vo-price span {
    font-family: "DM Sans", sans-serif;
    font-size: 0.72rem;
    color: var(--muted);
    font-weight: 400;
  }

  .vo-check {
    position: absolute;
    top: 0.6rem;
    right: 0.6rem;
    width: 26px;
    height: 26px;
    background: var(--gold);
    color: var(--black);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 700;
  }

  /* ══ BOOKING MODAL ══ */
  .booking-modal { max-width: 860px; }

  .booking-body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
  }

  .booking-summary {
    padding: 2rem;
    border-right: 1px solid rgba(255,255,255,0.06);
  }

  .summary-vehicle {
    display: flex;
    gap: 1rem;
    align-items: center;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    margin-bottom: 1.5rem;
  }

  .sv-thumb {
    width: 90px;
    height: 64px;
    object-fit: cover;
    border-radius: 4px;
    flex-shrink: 0;
  }

  .sv-category {
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 0.2rem;
  }

  .sv-title {
    font-family: "Cal Sans", sans-serif;
    font-size: 1.1rem;
    color: #ffffff;
  }

  .sv-year {
    font-size: 0.78rem;
    color: var(--muted);
    margin-top: 0.15rem;
  }

  .summary-rows {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5rem;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.7rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    font-size: 0.875rem;
  }

  .sr-label { color: var(--muted); }
  .sr-val { color: #ffffff; text-align: right; }

  .summary-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem 0 1rem;
    border-top: 1px solid rgba(245,168,0,0.2);
    margin-top: 0.5rem;
  }

  .total-label {
    font-family: "Cal Sans", sans-serif;
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
  }

  .total-price {
    font-family: "Cal Sans", sans-serif;
    font-size: 1.6rem;
    color: var(--gold);
  }

  .summary-note {
    font-size: 0.72rem;
    color: var(--muted);
    line-height: 1.6;
    font-style: italic;
  }

  .booking-form {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form-section-title {
    font-family: "Cal Sans", sans-serif;
    font-size: 0.8rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #ffffff;
    margin-bottom: 0.25rem;
  }

  .bform-field {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .bform-row {
    display: grid;
    grid-template-columns: 1fr 1.8fr;
    gap: 0.75rem;
  }

  .bform-field label {
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
  }

  .bform-field input {
    background: #191919;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 4px;
    color: #ffffff;
    font-family: "DM Sans", sans-serif;
    font-size: 0.875rem;
    padding: 0.65rem 0.85rem;
    outline: none;
    transition: border-color 0.2s;
  }
  .bform-field input:focus { border-color: var(--gold); }

  .permit-upload {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border: 1px dashed rgba(245,168,0,0.3);
    border-radius: 6px;
    padding: 1.2rem;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
    min-height: 90px;
    text-align: center;
    color: var(--muted);
  }
  .permit-upload:hover { border-color: var(--gold); background: rgba(245,168,0,0.04); }
  .permit-upload.has-file { border-color: var(--gold); border-style: solid; }

  .permit-preview {
    width: 100%;
    max-height: 80px;
    object-fit: contain;
    border-radius: 4px;
  }

  .permit-label {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.82rem;
    color: #ffffff;
  }

  .permit-hint {
    font-size: 0.7rem;
    color: var(--muted);
  }

  .form-error {
    background: rgba(220,38,38,0.1);
    border: 1px solid rgba(220,38,38,0.3);
    color: #f87171;
    font-size: 0.82rem;
    padding: 0.7rem 0.9rem;
    border-radius: 4px;
  }

  .btn-book {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    width: 100%;
    background: var(--gold);
    color: var(--black);
    font-family: "Cal Sans", sans-serif;
    font-size: 0.875rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.9rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s, opacity 0.2s;
    margin-top: auto;
  }
  .btn-book:hover:not(:disabled) { background: var(--gold-dim); }
  .btn-book:disabled { opacity: 0.35; cursor: not-allowed; }

  /* ══ SUCCESS ══ */
  .booking-success {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 4rem 3rem;
    gap: 1rem;
  }

  .success-icon {
    width: 64px;
    height: 64px;
    background: rgba(245,168,0,0.12);
    border: 2px solid var(--gold);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    color: var(--gold);
    margin-bottom: 0.5rem;
  }

  .success-title {
    font-family: "Cal Sans", sans-serif;
    font-size: 1.6rem;
    color: #ffffff;
  }

  .success-text {
    font-size: 0.9rem;
    color: var(--muted);
    line-height: 1.7;
    max-width: 380px;
  }

  .btn-primary-lg {
    display: inline-flex;
    align-items: center;
    background: var(--gold);
    color: var(--black);
    font-family: "Cal Sans", sans-serif;
    font-size: 0.85rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 0.9rem 2.4rem;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    transition: background 0.2s;
    margin-top: 0.5rem;
  }
  .btn-primary-lg:hover { background: var(--gold-dim); }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(0,0,0,0.25);
    border-top-color: var(--black);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ══ RESPONSIVE ══ */
  @media (max-width: 1024px) {
    .search-bar { flex-direction: column; align-items: flex-start; gap: 1rem; }
    .search-fields { flex-wrap: wrap; }
    .field-divider { display: none; }
    .search-btn { width: 100%; justify-content: center; min-height: 44px; }
    .vehicle-grid { grid-template-columns: repeat(2, 1fr); }
    .booking-body { grid-template-columns: 1fr; }
    .booking-summary { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); }
  }

  @media (max-width: 560px) {
    .hero-image-wrap { height: 75vh; }
    .vehicle-grid { grid-template-columns: 1fr; }
    .bform-row { grid-template-columns: 1fr; }
    .modal-backdrop { padding: 0; align-items: flex-end; }
    .modal { border-radius: 12px 12px 0 0; max-height: 95vh; }
  }
</style>