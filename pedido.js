// Função para pegar parâmetros da URL
function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

// Captura dados do produto
const produto = getQueryParam('produto') || 'Produto não especificado';
const precoParam = getQueryParam('preco');
const imagem = getQueryParam('imagem');
const preco = precoParam ? parseFloat(precoParam) : 0;

// Exibe resumo do pedido com imagem
const resumoDiv = document.getElementById('resumo-produto');
resumoDiv.innerHTML = `
  <img src="${imagem}" alt="${produto}" />
  <p><strong>Produto:</strong> ${produto}</p>
  <p><strong>Preço:</strong> ${preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
`;

// Define data mínima
const hoje = new Date().toISOString().split('T')[0];
document.getElementById('dataEvento').setAttribute('min', hoje);

// ✅ Função para formatar data
function formatarData(dataISO) {
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}

// Ao enviar o formulário
document.getElementById('form-pedido').addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const endereco = document.getElementById('endereco').value.trim();
  const dataEvento = document.getElementById('dataEvento').value;

  if (!nome || !endereco || !dataEvento) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  const dataFormatada = formatarData(dataEvento);

  const textoMensagem =
    `Olá! Quero alugar:\n- ${produto}: R$ ${preco.toFixed(2)}\n\n` +
    `Nome: ${nome}\nEndereço: ${endereco}\nData do evento: ${dataFormatada}`;

  const mensagem = encodeURIComponent(textoMensagem);
  const numero = '5587988664802';
  const urlWhatsapp = `https://api.whatsapp.com/send?phone=${numero}&text=${mensagem}`;

  window.open(urlWhatsapp, '_blank');
});
