const criarTabelaVeiculo = function(dados){
    const tabela = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const trTittle = document.createElement("tr");
    const th = document.createElement("th");
    th.textContent = "Veículos";
    th.colSpan = 8; // Ajuste conforme o número de colunas
    trTittle.appendChild(th);
    thead.appendChild(trTittle);

const cabecalho = ["Modelo", "Fabricante", "País de Origem","Placa", "Cor", "Ano", "Descrição"];
const tr = document.createElement("tr");
cabecalho.forEach(function(campo){
    const th = document.createElement("th");
    th.textContent = campo;
    tr.appendChild(th);
});

tabela.classList.add("tabela-dados");

thead.appendChild(tr);
tabela.appendChild(thead);

dados.forEach(function(item){
    const tr = document.createElement("tr");
    //Modelo
    const tdModelo = document.createElement("td");
    tdModelo.textContent = item.modelo.nome;
    tr.appendChild(tdModelo);

    //Fabricante
    const tdFabricante = document.createElement("td");
    tdFabricante.textContent = item.modelo.fabricante.nome;
    tr.appendChild(tdFabricante);

    //País de Origem
    const tdPaisOrigem = document.createElement("td");
    tdPaisOrigem.textContent = item.modelo.fabricante.paisOrigem;
    tr.appendChild(tdPaisOrigem);

    //Placa
    const tdPlaca = document.createElement("td");
    tdPlaca.textContent = item.placa;
    tr.appendChild(tdPlaca);

    //Cor
    const tdCor = document.createElement("td");
    tdCor.textContent = item.cor;
    tr.appendChild(tdCor);

    //Ano
    const tdAno = document.createElement("td");
    tdAno.textContent = item.ano;
    tr.appendChild(tdAno);

    //Descrição
    const tdDescricao = document.createElement("td");
    tdDescricao.textContent = item.descricao;
    tr.appendChild(tdDescricao);

    //icones
    const deletar = document.createElement("td");
    deletar.innerHTML = `<button class="btn-deletar">🗑️</button>`;
    deletar.addEventListener("click", async function(){
        const resultado = await setDeletar(`http://localhost:8080/api/veiculos/${item.id}`);

        if (isSucess(resultado)){
            this.parentElement.remove();
            alert("Veículo deletado com sucesso.");         
        }else{
            alert("Erro ao deletar veículo.");
            }
        });
    
    tr.appendChild(deletar);

    tbody.appendChild(tr);
})

tabela.appendChild(tbody);
return tabela;
}
