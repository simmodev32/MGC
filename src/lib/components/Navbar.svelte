<!-- src/lib/components/Navbar.svelte -->
<script>
  import { onMount } from 'svelte';

  let scrolled = $state(false);

  onMount(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 40;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<nav>
  <a href="/" class="nav-logo"><span>MGC</span> Rentals</a>

  <ul class="nav-links">
    <li><a href="#fleet">Fleet</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#why">Why Us</a></li>
    <li><a href="#testimonials">Reviews</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>

  <a href="tel:18683961127" class="nav-cta">Call Us</a>
</nav>

<style>
nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5vw;
  height: 72px;
  background: rgba(10,10,10,0.45);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

  nav.scrolled {
    background: rgba(10,10,10,0.9);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom-color: var(--border);
  }

  .nav-logo {
    font-family: "Cal Sans", sans-serif;
    font-size: 1.75rem;
    letter-spacing: 0.08em;
    color: var(--white);
  }
  .nav-logo span { color: var(--gold); }

  .nav-links {
    display: flex;
    gap: 2.5rem;
    list-style: none;
  }
  .nav-links a {
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--muted);
    transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--white); }

  .nav-cta {
    background: var(--gold);
    color: var(--black);
    font-family: "Cal Sans", sans-serif;
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.6rem 1.4rem;
    border-radius: 4px;
    transition: background 0.2s;
  }
  .nav-cta:hover { background: var(--gold-dim); }

  @media (max-width: 768px) {
    .nav-links { display: none; }
  }
</style>