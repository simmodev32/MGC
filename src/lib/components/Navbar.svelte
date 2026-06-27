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
<a href="/" class="nav-logo">
  <img src="/images/logo.jpg" alt="MGC Car Rental & Leasing" class="logo-img" />
</a>
  <ul class="nav-links">
    <li><a href="#fleet">Fleet</a></li>
    <li><a href="#about">About</a></li>
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
  padding: 0 10vw;
  height: 72px;
  background: black;

}

.nav-logo {
  display: flex;
  align-items: center;
}

.logo-img {
  height: 3.4rem;
  width: auto;
  object-fit: contain;
  display: block;
}

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

    nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5vw;
    height: 5rem;
    background: black;

  }

  .nav-logo {
  display: flex;
  height: .5rem;
}
  }


</style>