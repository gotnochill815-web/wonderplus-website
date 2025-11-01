// js/products.js
(async function(){
  const grid = document.getElementById('products-grid');
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modal-content');
  const closeBtn = document.querySelector('.modal-close');

  async function loadProducts(){
    try{
      const res = await fetch('data/products.json');
      const products = await res.json();
      renderProducts(products);
      initFilters(products);
    }catch(err){
      grid.innerHTML = '<p class="muted">Failed to load products.</p>';
      console.error(err);
    }
  }

  function renderProducts(products){
    grid.innerHTML = '';
    products.forEach(p => {
      const article = document.createElement('article');
      article.className = 'product-card';
      article.innerHTML = `
        <img src="${p.image}" alt="${p.title}" class="product-img">
        <h3 class="product-title">${p.title}</h3>
        <p class="product-desc">${p.short}</p>
        <div style="display:flex; gap:.5rem; align-items:center;">
          <a href="#${p.id}" class="product-link" data-id="${p.id}">View details →</a>
          <a href="contact.html" class="btn btn--outline" style="margin-left:auto">Request Quote</a>
        </div>
      `;
      grid.appendChild(article);
    });

    grid.querySelectorAll('.product-link').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const id = a.dataset.id;
        openModal(id);
      });
    });
  }

  async function openModal(id){
    try{
      const res = await fetch('data/products.json');
      const products = await res.json();
      const p = products.find(x => x.id === id);
      if(!p) return;
      modalContent.innerHTML = `
        <h2 style="margin-top:0">${p.title}</h2>
        <img src="${p.image}" alt="${p.title}" style="width:100%; max-height:220px; object-fit:cover; border-radius:8px; margin-bottom:1rem;">
        <p>${p.short}</p>
        <h4>Specifications</h4>
        <ul>
          ${Object.entries(p.specs).map(([k,v]) => `<li><strong>${toTitleCase(k)}:</strong> ${v}</li>`).join('')}
        </ul>
        <div style="margin-top:1rem; display:flex; gap:.5rem;">
          <a href="contact.html" class="btn">Request Quote</a>
          <a href="#" class="btn btn--alt modal-close">Close</a>
        </div>
      `;
      modal.setAttribute('aria-hidden','false');
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }catch(err){ console.error(err); }
  }

  function toTitleCase(str){
    return str.replace(/_/g,' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  function closeModal(){
    modal.setAttribute('aria-hidden','true');
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if(e.target === modal) closeModal(); });
  document.addEventListener('click', (e) => {
    if(e.target.matches('.modal-close')) closeModal();
  });

  function initFilters(products){
    const buttons = document.querySelectorAll('[data-filter]');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        buttons.forEach(b => b.setAttribute('aria-pressed','false'));
        btn.setAttribute('aria-pressed','true');

        if(filter === 'all') renderProducts(products);
        else renderProducts(products.filter(p => p.category === filter));
      });
    });
  }

  loadProducts();
})();
