<script>
    import { onDestroy } from 'svelte';

    function portal(node) {
    const target = document.getElementById('portal');
    target.appendChild(node);
    return {
        destroy() { node.remove(); }
    };
    }

  let { label = 'Time', value = $bindable('') } = $props();

  let showModal = $state(false);

  const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
  const minutes = ['00', '15', '30', '45'];

  let selectedHour = $state('');
  let selectedMinute = $state('');

  let displayValue = $derived(
    selectedHour && selectedMinute ? `${selectedHour}:${selectedMinute}` : ''
  );

  $effect(() => { value = displayValue; });

  function selectHour(h) {
    selectedHour = h;
    if (selectedMinute) showModal = false;
  }

  function selectMinute(m) {
    selectedMinute = m;
    if (selectedHour) showModal = false;
  }
</script>

<!-- Trigger -->
<button type="button" class="tp-trigger" onclick={() => showModal = true}>
  <span class="tp-label">{label}</span>
  <span class={displayValue ? 'tp-value' : 'tp-placeholder'}>
    {displayValue || 'Select time'}
  </span>
</button>

<!-- Modal -->
{#if showModal}
<div class="tp-backdrop" use:portal onclick={(e) => e.target === e.currentTarget && (showModal = false)}>
        <div class="tp-modal">

      <div class="tp-modal-header">
        <span class="tp-modal-label">{label}</span>
        <button type="button" class="tp-close" onclick={() => showModal = false}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <div class="tp-cols">
        <div class="tp-col">
          <div class="tp-col-label">Hour</div>
          <div class="tp-scroll">
            {#each hours as h}
              <button
                type="button"
                class="tp-opt"
                class:selected={selectedHour === h}
                onclick={() => selectHour(h)}
              >{h}:00</button>
            {/each}
          </div>
        </div>
        <div class="tp-divider"></div>
        <div class="tp-col">
          <div class="tp-col-label">Minute</div>
          <div class="tp-scroll">
            {#each minutes as m}
              <button
                type="button"
                class="tp-opt"
                class:selected={selectedMinute === m}
                onclick={() => selectMinute(m)}
              >:{m}</button>
            {/each}
          </div>
        </div>
      </div>

    </div>
  </div>
{/if}

<style>
  .tp-trigger {
    background: transparent;
    border: none;
    padding: 0.65rem 1rem;
    cursor: pointer;
    width: 100%;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    transition: background 0.15s;
  }
  .tp-trigger:hover { background: rgba(245,168,0,0.06); }

  .tp-label {
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #888888;
    white-space: nowrap;
  }

  .tp-value {
    font-size: 0.85rem;
    color: #ffffff;
    font-family: "DM Sans", sans-serif;
  }

  .tp-placeholder {
    font-size: 0.85rem;
    color: #888888;
    font-family: "DM Sans", sans-serif;
  }

  /* ── MODAL ── */
  .tp-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.7);
    backdrop-filter: blur(4px);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  .tp-modal {
    background: #111111;
    border: 1px solid rgba(245,168,0,0.2);
    border-top: 3px solid #F5A800;
    border-radius: 8px;
    padding: 1.5rem;
    width: 100%;
    max-width: 280px;
    box-shadow: 0 24px 80px rgba(0,0,0,0.8);
  }

  .tp-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.25rem;
  }

  .tp-modal-label {
    font-family: "Cal Sans", sans-serif;
    font-size: 0.85rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #F5A800;
  }

  .tp-close {
    background: transparent;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 4px;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #888888;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s;
    padding: 0;
  }
  .tp-close:hover { border-color: #F5A800; color: #F5A800; }

  .tp-cols {
    display: flex;
    gap: 0;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 6px;
    overflow: hidden;
  }

  .tp-col {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .tp-col-label {
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #888888;
    padding: 0.65rem 0.75rem 0.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    background: #191919;
  }

  .tp-scroll {
    max-height: 220px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(245,168,0,0.3) transparent;
  }

  .tp-divider {
    width: 1px;
    background: rgba(255,255,255,0.06);
    flex-shrink: 0;
  }

  .tp-opt {
    display: block;
    width: 100%;
    padding: 0.6rem 0.75rem;
    background: transparent;
    border: none;
    color: #cccccc;
    font-family: "DM Sans", sans-serif;
    font-size: 0.85rem;
    text-align: left;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }
  .tp-opt:hover { background: rgba(245,168,0,0.1); color: #ffffff; }
  .tp-opt.selected { background: #F5A800; color: #0A0A0A; font-weight: 600; }
</style>