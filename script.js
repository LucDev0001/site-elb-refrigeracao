// Espera o DOM carregar completamente para executar os scripts
document.addEventListener("DOMContentLoaded", () => {
  // 1. Inicializar Animação ao Rolar (AOS)
  AOS.init({
    duration: 700, // Duração da animação
    once: true, // Animar apenas uma vez
    offset: 50, // Começar animação 50px antes de aparecer
  });

  // 2. Atualizar ano do rodapé
  const footerYear = document.getElementById("footer-year");
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  // 3. Lógica do Menu Mobile
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // 4. Lógica do Formulário WhatsApp
  const waForm = document.getElementById("wa-form");

  if (waForm) {
    waForm.addEventListener("submit", (event) => {
      event.preventDefault();

      // --- IMPORTANTE: Substitua pelo seu número de WhatsApp ---
      // Formato: 55 (Código do País) + XX (DDD) + 9XXXXYYYY (Número)
      const waNumber = "5521974736469";

      // Coletar dados do formulário
      const nome = document.getElementById("nome").value;
      const telefone = document.getElementById("telefone").value;
      const servico = document.getElementById("servico").value;
      const mensagem = document.getElementById("mensagem").value;

      // Montar a mensagem
      const textoMensagem = `Olá, Elb Refrigeração!
*Gostaria de solicitar um orçamento.*

*Nome:* ${nome}
*Telefone:* ${telefone}
*Serviço de Interesse:* ${servico}

*Mensagem:*
${mensagem}
`;

      // Criar a URL do WhatsApp
      const waURL = `https://wa.me/${waNumber}?text=${encodeURIComponent(
        textoMensagem
      )}`;

      // Abrir o WhatsApp em uma nova aba
      window.open(waURL, "_blank");
    });
  }

  // 5. NOVO: Lógica do Cookie Banner
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("accept-cookies");

  if (banner && acceptBtn) {
    // Verifica se o cookie já foi aceito
    if (localStorage.getItem("cookie_consent") !== "true") {
      // Não aceito, mostra o banner
      // A classe 'show' (definida no style.css) anula o 'translate-y-full'
      setTimeout(() => {
        banner.classList.add("show");
      }, 500); // Dá um pequeno delay para aparecer
    }

    // Evento ao clicar em aceitar
    acceptBtn.addEventListener("click", () => {
      localStorage.setItem("cookie_consent", "true");
      banner.classList.remove("show");
    });
  }
});
