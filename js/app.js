/**
 * Recicle Recife - Coleta de Resíduos Eletrônicos
 * JavaScript Principal
 */

// ==========================================
// Dados dos Pontos de Coleta em Recife
// ==========================================
const pontosDeColeta = [
  {
    id: 1,
    nome: "Ecoponto Boa Viagem",
    endereco: "Av. Conselheiro Aguiar, 2328 - Boa Viagem",
    lat: -8.1224,
    lng: -34.9086,
    tipos: ["Celulares", "Computadores", "Baterias"],
    horario: "Seg-Sex: 8h às 17h | Sáb: 8h às 12h",
    telefone: "(81) 3355-8000"
  },
  {
    id: 2,
    nome: "Ponto Verde - Casa Amarela",
    endereco: "Estrada do Arraial, 3500 - Casa Amarela",
    lat: -8.0234,
    lng: -34.9178,
    tipos: ["Eletrodomésticos", "Eletrônicos", "Pilhas"],
    horario: "Seg-Sex: 7h às 16h",
    telefone: "(81) 3355-8100"
  },
  {
    id: 3,
    nome: "Ecoponto Recife Antigo",
    endereco: "Rua da Aurora, 500 - Santo Amaro",
    lat: -8.0578,
    lng: -34.8812,
    tipos: ["Computadores", "TVs", "Monitores"],
    horario: "Seg-Sex: 8h às 18h | Sáb: 8h às 13h",
    telefone: "(81) 3355-8200"
  },
  {
    id: 4,
    nome: "Ponto de Coleta - Shopping Recife",
    endereco: "R. Padre Carapuceiro, 777 - Boa Viagem",
    lat: -8.1189,
    lng: -34.9042,
    tipos: ["Celulares", "Baterias", "Pilhas", "Eletroportáteis"],
    horario: "Seg-Sáb: 10h às 22h | Dom: 12h às 21h",
    telefone: "(81) 3464-6000"
  },
  {
    id: 5,
    nome: "Ecoponto Torre",
    endereco: "Av. Rui Barbosa, 1400 - Torre",
    lat: -8.0456,
    lng: -34.8978,
    tipos: ["Eletrônicos", "Eletrodomésticos", "Lâmpadas"],
    horario: "Seg-Sex: 7h às 17h",
    telefone: "(81) 3355-8300"
  },
  {
    id: 6,
    nome: "Ponto Verde - Várzea",
    endereco: "Av. Caxangá, 2200 - Várzea",
    lat: -8.0378,
    lng: -34.9456,
    tipos: ["Computadores", "Impressoras", "Cabos"],
    horario: "Seg-Sex: 8h às 16h",
    telefone: "(81) 3355-8400"
  },
  {
    id: 7,
    nome: "Ecoponto Imbiribeira",
    endereco: "Av. Mascarenhas de Morais, 4500 - Imbiribeira",
    lat: -8.1045,
    lng: -34.9189,
    tipos: ["Eletrônicos", "Baterias", "Celulares"],
    horario: "Seg-Sex: 7h às 18h | Sáb: 8h às 12h",
    telefone: "(81) 3355-8500"
  },
  {
    id: 8,
    nome: "Ponto de Coleta - RioMar Shopping",
    endereco: "Av. República do Líbano, 251 - Pina",
    lat: -8.0856,
    lng: -34.8856,
    tipos: ["Celulares", "Tablets", "Notebooks", "Pilhas"],
    horario: "Seg-Sáb: 10h às 22h | Dom: 12h às 21h",
    telefone: "(81) 3878-8888"
  },
  {
    id: 9,
    nome: "Ecoponto Aflitos",
    endereco: "Rua Agenor Lopes, 350 - Aflitos",
    lat: -8.0398,
    lng: -34.9012,
    tipos: ["Eletrodomésticos", "Eletrônicos", "TVs"],
    horario: "Seg-Sex: 8h às 17h",
    telefone: "(81) 3355-8600"
  },
  {
    id: 10,
    nome: "Ponto Verde - Ibura",
    endereco: "Estrada do Ibura, 1200 - Ibura",
    lat: -8.1234,
    lng: -34.9456,
    tipos: ["Computadores", "Monitores", "Eletroportáteis"],
    horario: "Seg-Sex: 7h às 16h",
    telefone: "(81) 3355-8700"
  }
];

// ==========================================
// Estado da Aplicação
// ==========================================
let mapHero = null;
let mapFull = null;
let currentTab = 'inicial';

// ==========================================
// Inicialização
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initMaps();
  initContactForm();
  initScrollEffects();
  renderPointsList();
  updateStats();
});

// ==========================================
// Navegação
// ==========================================
function initNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.section');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      
      // Atualiza botões
      navButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Atualiza seções
      sections.forEach(s => s.classList.remove('active'));
      document.getElementById(targetId).classList.add('active');
      
      // Fecha menu mobile
      nav.classList.remove('active');
      
      // Scroll para o topo
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Atualiza estado
      currentTab = targetId.replace('section-', '');
      
      // Reinicializa mapas se necessário
      setTimeout(() => {
        if (mapHero) mapHero.invalidateSize();
        if (mapFull) mapFull.invalidateSize();
      }, 300);
    });
  });

  // Menu mobile
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
    });
  }

  // Botões de navegação internos
  document.querySelectorAll('[data-nav-to]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.navTo;
      const targetBtn = document.querySelector(`.nav-btn[data-target="section-${targetId}"]`);
      if (targetBtn) targetBtn.click();
    });
  });
}

// ==========================================
// Mapas (Leaflet)
// ==========================================
function initMaps() {
  const recifeCentro = [-8.0578, -34.8829];
  const defaultZoom = 12;

  // Mapa do Hero
  const heroMapEl = document.getElementById('map-hero');
  if (heroMapEl) {
    mapHero = L.map('map-hero', {
      scrollWheelZoom: false,
      zoomControl: false
    }).setView(recifeCentro, defaultZoom);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(mapHero);

    addMarkersToMap(mapHero, false);
  }

  // Mapa completo
  const fullMapEl = document.getElementById('map-full');
  if (fullMapEl) {
    mapFull = L.map('map-full').setView(recifeCentro, defaultZoom);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(mapFull);

    addMarkersToMap(mapFull, true);
  }
}

function addMarkersToMap(map, showPopup = true) {
  const customIcon = L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%);
        width: 36px;
        height: 36px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 15px rgba(13, 148, 136, 0.5);
        border: 3px solid white;
      ">
        <span style="transform: rotate(45deg); font-size: 16px;">♻️</span>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
  });

  pontosDeColeta.forEach(ponto => {
    const marker = L.marker([ponto.lat, ponto.lng], { icon: customIcon }).addTo(map);
    
    const popupContent = `
      <div style="min-width: 200px;">
        <h4 style="margin-bottom: 8px; font-size: 1rem; color: #14b8a6;">${ponto.nome}</h4>
        <p style="margin-bottom: 4px; font-size: 0.85rem;">📍 ${ponto.endereco}</p>
        <p style="margin-bottom: 4px; font-size: 0.85rem;">🕐 ${ponto.horario}</p>
        <p style="margin-bottom: 8px; font-size: 0.85rem;">📞 ${ponto.telefone}</p>
        <div style="display: flex; flex-wrap: wrap; gap: 4px;">
          ${ponto.tipos.map(t => `<span style="
            padding: 2px 8px;
            background: rgba(13, 148, 136, 0.2);
            color: #14b8a6;
            border-radius: 4px;
            font-size: 0.7rem;
          ">${t}</span>`).join('')}
        </div>
      </div>
    `;
    
    marker.bindPopup(popupContent);
    
    if (showPopup) {
      marker.on('mouseover', function() {
        this.openPopup();
      });
    }
  });
}

function focusOnPoint(lat, lng) {
  if (mapFull) {
    mapFull.setView([lat, lng], 15, { animate: true });
  }
}

// ==========================================
// Lista de Pontos
// ==========================================
function renderPointsList() {
  const container = document.getElementById('points-list');
  if (!container) return;

  container.innerHTML = pontosDeColeta.map(ponto => `
    <div class="point-item" onclick="focusOnPoint(${ponto.lat}, ${ponto.lng})">
      <h4>${ponto.nome}</h4>
      <p>${ponto.endereco}</p>
      <p style="font-size: 0.8rem; color: #64748b;">🕐 ${ponto.horario}</p>
      <div class="point-types">
        ${ponto.tipos.slice(0, 3).map(t => `<span class="point-type-tag">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

// ==========================================
// Estatísticas
// ==========================================
function updateStats() {
  const statsElements = {
    totalPontos: document.getElementById('stat-pontos'),
    tiposAceitos: document.getElementById('stat-tipos'),
    bairrosAtendidos: document.getElementById('stat-bairros')
  };

  if (statsElements.totalPontos) {
    animateNumber(statsElements.totalPontos, pontosDeColeta.length);
  }

  if (statsElements.tiposAceitos) {
    const allTypes = [...new Set(pontosDeColeta.flatMap(p => p.tipos))];
    animateNumber(statsElements.tiposAceitos, allTypes.length);
  }

  if (statsElements.bairrosAtendidos) {
    animateNumber(statsElements.bairrosAtendidos, pontosDeColeta.length);
  }
}

function animateNumber(element, target) {
  let current = 0;
  const duration = 1500;
  const increment = target / (duration / 16);
  
  const animate = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(animate);
    } else {
      element.textContent = target;
    }
  };
  
  animate();
}

// ==========================================
// Formulário de Contato
// ==========================================
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simula envio
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      showToast('✅', 'Mensagem enviada com sucesso! Entraremos em contato em breve.');
      form.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
}

// ==========================================
// Efeitos de Scroll
// ==========================================
function initScrollEffects() {
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Animação de entrada para elementos
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.stat-card, .info-card, .impact-card, .step').forEach(el => {
    observer.observe(el);
  });
}

// ==========================================
// Toast Notification
// ==========================================
function showToast(icon, message) {
  // Remove toast existente
  const existingToast = document.querySelector('.toast');
  if (existingToast) existingToast.remove();
  
  // Cria novo toast
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-message">${message}</span>
  `;
  
  document.body.appendChild(toast);
  
  // Anima entrada
  setTimeout(() => toast.classList.add('show'), 100);
  
  // Remove após 4 segundos
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ==========================================
// Utilidades
// ==========================================
function formatPhoneLink(phone) {
  return phone.replace(/\D/g, '');
}

// Exporta função para uso global (onclick no HTML)
window.focusOnPoint = focusOnPoint;



