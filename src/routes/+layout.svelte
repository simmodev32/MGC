<script>
  let { children } = $props();
</script>

<svelte:head>
  <link href="https://fonts.googleapis.com/css2?family=Cal+Sans&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Staatliches&display=swap" rel="stylesheet">

<link href="https://fonts.googleapis.com/css2?family=Stack+Sans+Text:wght@200..700&display=swap" rel="stylesheet">

</svelte:head>

{@render children()}

<style>
  :global(:root) {
    --black:     #0A0A0A;
    --surface:   #111111;
    --surface-2: #191919;
    --gold:      #F5A800;
    --gold-dim:  #C98A00;
    --gold-glow: rgba(245,168,0,0.15);
    --white:     #FFFFFF;
    --muted:     #888888;
    --border:    rgba(245,168,0,0.18);
  }

  :global(*, *::before, *::after) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :global(html) { scroll-behavior: smooth; }

  :global(body) {
  font-family: "Lexend", sans-serif;
    background: var(--black);
    color: var(--white);
    overflow-x: hidden;
  }

  :global(img) { display: block; max-width: 100%; }
  :global(a) { text-decoration: none; color: inherit; }
</style>