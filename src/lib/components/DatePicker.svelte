<script>
    import { onDestroy } from 'svelte';

    function portal(node) {
    const target = document.getElementById('portal');
    target.appendChild(node);
    return {
        destroy() { node.remove(); }
    };
    }

  let { label = 'Date', value = $bindable('') } = $props();

  let showCalendar = $state(false);

  let viewYear = $state(new Date().getFullYear());
  let viewMonth = $state(new Date().getMonth());

  const monthNames = ['January','February','March','April','May','June',
    'July','August','September','October','November','December'];
  const dayNames = ['Su','Mo','Tu','We','Th','Fr','Sa'];

  let displayValue = $derived(
    value
      ? (() => {
          const [y, m, d] = value.split('-');
          return `${monthNames[parseInt(m)-1].slice(0,3)} ${parseInt(d)}, ${y}`;
        })()
      : ''
  );

  function getDaysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
  function getFirstDay(y, m) { return new Date(y, m, 1).getDay(); }

  let calendarDays = $derived((() => {
    const total = getDaysInMonth(viewYear, viewMonth);
    const first = getFirstDay(viewYear, viewMonth);
    const days = [];
    for (let i = 0; i < first; i++) days.push(null);
    for (let d = 1; d <= total; d++) days.push(d);
    return days;
  })());

  function prevMonth() {
    if (viewMonth === 0) { viewMonth = 11; viewYear--; }
    else viewMonth--;
  }

  function nextMonth() {
    if (viewMonth === 11) { viewMonth = 0; viewYear++; }
    else viewMonth++;
  }

  function selectDay(day) {
    if (!day) return;
    const m = String(viewMonth + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    value = `${viewYear}-${m}-${d}`;
    showCalendar = false;
  }

  function isSelected(day) {
    if (!day || !value) return false;
    const [y, m, d] = value.split('-');
    return parseInt(y) === viewYear && parseInt(m) === viewMonth + 1 && parseInt(d) === day;
  }

  function isToday(day) {
    if (!day) return false;
    const t = new Date();
    return t.getFullYear() === viewYear && t.getMonth() === viewMonth && t.getDate() === day;
  }

  function isPast(day) {
    if (!day) return false;
    const t = new Date(); t.setHours(0,0,0,0);
    return new Date(viewYear, viewMonth, day) < t;
  }
</script>

<!-- Trigger -->
<button type="button" class="dp-trigger" onclick={() => showCalendar = true}>
  <span class="dp-label">{label}</span>
  <span class={value ? 'dp-value' : 'dp-placeholder'}>
    {displayValue || 'Select date'}
  </span>
</button>

<!-- Modal -->
{#if showCalendar}
<div class="dp-backdrop" use:portal onclick={(e) => e.target === e.currentTarget && (showCalendar = false)}>
        <div class="dp-modal">

      <div class="dp-modal-header">
        <span class="dp-modal-label">{label}</span>
        <button type="button" class="dp-close" onclick={() => showCalendar = false}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <div class="cal-header">
        <button type="button" class="cal-nav" onclick={prevMonth}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <span class="cal-month">{monthNames[viewMonth]} {viewYear}</span>
        <button type="button" class="cal-nav" onclick={nextMonth}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>

      <div class="cal-grid">
        {#each dayNames as d}
          <div class="cal-weekday">{d}</div>
        {/each}
        {#each calendarDays as day}
          <button
            type="button"
            class="cal-day"
            class:selected={isSelected(day)}
            class:today={isToday(day)}
            class:past={isPast(day)}
            class:empty={!day}
            disabled={!day || isPast(day)}
            onclick={() => selectDay(day)}
          >
            {day || ''}
          </button>
        {/each}
      </div>

    </div>
  </div>
{/if}

<style>
  .dp-trigger {
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
  .dp-trigger:hover { background: rgba(245,168,0,0.06); }

  .dp-label {
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #888888;
    white-space: nowrap;
  }

  .dp-value {
    font-size: 0.85rem;
    color: #ffffff;
    font-family: "DM Sans", sans-serif;
  }

  .dp-placeholder {
    font-size: 0.85rem;
    color: #888888;
    font-family: "DM Sans", sans-serif;
  }

  /* ── MODAL ── */
  .dp-backdrop {
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

  .dp-modal {
    background: #111111;
    border: 1px solid rgba(245,168,0,0.2);
    border-top: 3px solid #F5A800;
    border-radius: 8px;
    padding: 1.5rem;
    width: 100%;
    max-width: 320px;
    box-shadow: 0 24px 80px rgba(0,0,0,0.8);
  }

  .dp-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.25rem;
  }

  .dp-modal-label {
    font-family: "Cal Sans", sans-serif;
    font-size: 0.85rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #F5A800;
  }

  .dp-close {
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
  .dp-close:hover { border-color: #F5A800; color: #F5A800; }

  .cal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .cal-nav {
    background: rgba(245,168,0,0.1);
    border: 1px solid rgba(245,168,0,0.2);
    border-radius: 4px;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #F5A800;
    cursor: pointer;
    transition: background 0.2s;
    padding: 0;
  }
  .cal-nav:hover { background: rgba(245,168,0,0.2); }

  .cal-month {
    font-family: "Cal Sans", sans-serif;
    font-size: 1rem;
    color: #ffffff;
  }

  .cal-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 3px;
  }

  .cal-weekday {
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: #888888;
    text-align: center;
    padding: 0.3rem 0;
  }

  .cal-day {
    width: 100%;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    font-size: 0.82rem;
    color: #cccccc;
    cursor: pointer;
    border: none;
    background: transparent;
    transition: background 0.15s, color 0.15s;
    font-family: "DM Sans", sans-serif;
    padding: 0;
  }
  .cal-day:hover:not(:disabled):not(.empty) {
    background: rgba(245,168,0,0.15);
    color: #ffffff;
  }
  .cal-day.selected {
    background: #F5A800;
    color: #0A0A0A;
    font-weight: 700;
  }
  .cal-day.today:not(.selected) {
    border: 1px solid rgba(245,168,0,0.5);
    color: #F5A800;
  }
  .cal-day.past { opacity: 0.25; cursor: not-allowed; }
  .cal-day.empty { pointer-events: none; }
</style>