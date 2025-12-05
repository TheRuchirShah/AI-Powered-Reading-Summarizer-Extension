function cleanPage() {
  // Remove sidebars, ads, and clutter
  const selectors = ['aside', 'nav', '.ads', '.advertisement', 'header', 'footer'];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => el.remove());
  });

  // Optional: Make main content wider
  const main = document.querySelector('main') || document.body;
  main.style.maxWidth = '800px';
  main.style.margin = 'auto';
}

cleanPage();
