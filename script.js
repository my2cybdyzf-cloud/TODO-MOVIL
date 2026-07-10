/* ============================================
     ⚙️  1) NÚMERO DE WHATSAPP
     Formato: código de país + número, SIN signos, SIN espacios, SIN "+".
     Ejemplo República Dominicana: "18091234567"
     ============================================ */
  const WHATSAPP_NUMBER = "18293667105"; // <-- EDITA ESTE NÚMERO

  /* ============================================
     ⚙️  2) PRODUCTOS
     Copia un bloque { } para agregar un teléfono nuevo.
     - img: nombre del archivo .png dentro de la carpeta "img/".
       Ejemplo: si tu foto se llama "iphone15pro.png" y está en img/iphone15pro.png,
       pon: img: "img/iphone15pro.png"
     - Si el archivo no existe o lo dejas como "", se muestra un ícono genérico.
     ============================================ */
  const PRODUCTS = [
    {
        img: "img/iphone-15-pro-MAX.png",
        brand: "Apple",
      name: "iPhone 15 Pro",
      specs: ["256GB", "8GB RAM", "Cámara 48MP", "Titanio"],
      price: 42900,
      stock: true
    },
    {
      img: "img/galaxy-s24-ultra.png",
      brand: "Samsung",
      name: "Galaxy S24 Ultra",
      specs: ["512GB", "12GB RAM", "Cámara 200MP", "S Pen"],
      price: 46500,
      stock: true
    },
    {
      img: "img/redmi-note-13.JPg",
      brand: "Xiaomi",
      name: "Redmi Note 13 Pro",
      specs: ["256GB", "8GB RAM", "Cámara 108MP", "120Hz"],
      price: 12900,
      stock: true
    },
    {
      img: "img/iphone-13.png",
      brand: "Apple",
      name: "iPhone 13",
      specs: ["128GB", "4GB RAM", "Cámara 12MP", "A15 Bionic"],
      price: 21500,
      stock: false
    },
    {
      img: "img/galaxyA55.png",
      brand: "Samsung",
      name: "Galaxy A55",
      specs: ["256GB", "8GB RAM", "Cámara 50MP", "IP67"],
      price: 15900,
      stock: true
    },
    {

      img: "img/edge-50.png",
      brand: "Motorola",
      name: "Edge 50 Fusion",
      specs: ["256GB", "8GB RAM", "Cámara 50MP", "Curvo"],
      price: 14200,
      stock: true
    }
  ];

  const money = n => new Intl.NumberFormat('es-DO', { style:'currency', currency:'DOP', maximumFractionDigits:0 }).format(n);

  const waLink = (product) => {
    const msg = `Hola TODO MOVIL, me interesa el ${product.brand} ${product.name} (${money(product.price)}). ¿Está disponible?`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  // Link genérico para el botón flotante
  document.getElementById('floatWa').href =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola TODO MOVIL, quisiera más información sobre sus equipos.')}`;

  const phoneIcon = `
    <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#3a4150" stroke-width="1.4">
      <rect x="6" y="2" width="12" height="20" rx="2.4"/>
      <line x1="10" y1="19" x2="14" y2="19"/>
    </svg>`;

  const grid = document.getElementById('grid');
  const filtersEl = document.getElementById('filters');
  const emptyState = document.getElementById('emptyState');
  const searchInput = document.getElementById('searchInput');

  let activeBrand = "Todos";

  function renderFilters(){
    const brands = ["Todos", ...new Set(PRODUCTS.map(p => p.brand))];
    filtersEl.innerHTML = brands.map(b =>
      `<button class="chip${b===activeBrand ? ' active':''}" data-brand="${b}">${b}</button>`
    ).join('');

    filtersEl.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', () => {
        activeBrand = chip.dataset.brand;
        renderFilters();
        renderGrid();
      });
    });
  }

  function renderGrid(){
    const term = searchInput.value.trim().toLowerCase();

    const filtered = PRODUCTS.filter(p => {
      const matchesBrand = activeBrand === "Todos" || p.brand === activeBrand;
      const matchesSearch = !term || (p.brand + " " + p.name).toLowerCase().includes(term);
      return matchesBrand && matchesSearch;
    });

    emptyState.style.display = filtered.length ? 'none' : 'block';

    grid.innerHTML = filtered.map(p => `
      <article class="card">
        <div class="card-media">
          ${p.img
            ? `<img src="${p.img}" alt="${p.brand} ${p.name}" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'card-media-fallback',innerHTML:phoneIcon}))">`
            : phoneIcon}
          <span class="stock-dot">${p.stock ? 'Disponible' : 'Agotado'}</span>
        </div>
        <div class="card-body">
          <span class="card-brand">${p.brand}</span>
          <h3 class="card-name">${p.name}</h3>
          <div class="spec-strip">
            ${p.specs.map(s => `<span>${s}</span>`).join('')}
          </div>
          <div class="card-footer">
            <div class="price"><small>Precio</small>${money(p.price)}</div>
            <a class="wa-btn" href="${waLink(p)}" target="_blank" rel="noopener">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#08160d"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.7.44 3.36 1.28 4.82L2 22l5.4-1.42a9.9 9.9 0 0 0 4.64 1.18h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.06h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.29c0-4.53 3.69-8.22 8.24-8.22 2.2 0 4.27.86 5.82 2.42a8.17 8.17 0 0 1 2.41 5.81c0 4.53-3.69 8.14-8.22 8.14zm4.51-6.16c-.25-.12-1.46-.72-1.68-.8-.23-.08-.39-.12-.56.13-.16.25-.64.8-.78.96-.15.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.24-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.36-.77-1.86-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.42.06-.64.31s-.85.83-.85 2.03.87 2.36 1 2.52c.12.16 1.7 2.6 4.13 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.08.15-1.18-.07-.11-.23-.17-.48-.29z"/></svg>
              Pedir
            </a>
          </div>
        </div>
      </article>
    `).join('');
  }

  searchInput.addEventListener('input', renderGrid);

  renderFilters();
  renderGrid();
