window.onload = function () {
  // Define data mínima para o evento
  const hoje = new Date().toISOString().split("T")[0];
  const dataInput = document.getElementById("dataEvento");
  if (dataInput) {
    dataInput.setAttribute("min", hoje);
  }

  // Campo de busca
  document.getElementById('busca-produto').addEventListener('input', function () {
    const filtro = this.value.toLowerCase();
    const produtos = document.querySelectorAll('.produtos-grid .produto');

    produtos.forEach(produto => {
      const nome = produto.querySelector('.nome-produto').textContent.toLowerCase();
      produto.style.display = nome.includes(filtro) ? 'block' : 'none';
    });
  });

  // Carrega produtos
  fetch('https://sandersonlucas.github.io/JS/produtos.json')
    .then(response => response.json())
    .then(produtos => {
      produtos.sort((a, b) => a.nome.localeCompare(b.nome));

      const container = document.querySelector('.produtos-grid');
      container.innerHTML = '';

      produtos.forEach(produto => {
        const div = document.createElement('div');
        div.classList.add('produto');

        div.innerHTML = `
          <img src="${produto.imagem}" alt="${produto.nome}" onclick="ampliarImagem('${produto.imagem}')">
          <p class="nome-produto">${produto.nome}</p>
          <p class="preco-produto">R$ ${parseFloat(produto.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
        `;

        // Botão "Alugar" com evento
        const botao = document.createElement('button');
        botao.innerHTML = '<i class="fa-solid fa-bag-shopping"></i> Alugar';
        botao.addEventListener('click', () => {
          const url = `pedido.html?produto=${encodeURIComponent(produto.nome)}&preco=${encodeURIComponent(produto.preco)}&imagem=${encodeURIComponent(produto.imagem)}`;
          window.open(url, '_blank');
        });

        div.appendChild(botao);
        container.appendChild(div);
      });
    })
    .catch(error => console.error('Erro ao carregar produtos:', error));
};

// Funções para modal de imagem
function ampliarImagem(src) {
  const modal = document.getElementById('modal');
  const imgAmpliada = document.getElementById('imagem-ampliada');
  imgAmpliada.src = src;
  modal.style.display = 'flex';
}

function fecharModal(event) {
  if (event) event.stopPropagation();
  document.getElementById('modal').style.display = 'none';
}
