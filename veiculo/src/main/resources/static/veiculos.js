
/*@param {Array} dados - Array de objetos de veículos
@retunes {HTMLTableElement} - Tabela HTML com os dados dos veículos

*/

const criarTabelaVeiculo = function(dados){
    dados = dados.content;
    const tabela = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const trTittle = document.createElement("tr");
    const th = document.createElement("th");
    th.textContent = "Veículos";
    th.colSpan = 8; // Ajuste conforme o número de colunas
    trTittle.appendChild(th);
    thead.appendChild(trTittle);

const cabecalho = ["Modelo", "Fabricante","Placa", "Cor", "Ano", "Preço", "DELETAR"];
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

    const tdPreco = document.createElement("td");
    tdPreco.textContent = formatarPreco(item.valor);
    tr.appendChild(tdPreco);


    //Deletar veículo
    const deletar = document.createElement("td");
    deletar.innerHTML = `<button class="btn-deletar">🗑️</button>`;
    deletar.addEventListener("click", async function(){
        const resultado = await setDeletar(`http://localhost:8080/api/veiculos/${item.id}`);

        if (isSucess(resultado)){
            this.parentElement.remove();
            alert("Veículo deletado com sucesso.");         
        }else{
            alert("Erro ao deletar veículo: " + resultado.message);
            }
        });
    
    tr.appendChild(deletar);

    tbody.appendChild(tr);
})

tabela.appendChild(tbody);
return tabela;
}


const formatarPreco = function(valor){
    return new Intl.NumberFormat('pt-BR', {
         style: 'currency', 
         currency: 'BRL'
         }).format(valor);
}


const carregarFabricantesVeiculo = async function(){
        const selectFabricante = document.getElementById("fabricante-veiculo");
        const selectModelo = document.getElementById("modelo-veiculo");

        setRemoverElementos("#fabricante-veiculo option");
        setRemoverElementos("#modelo-veiculo option");

        const dadosFabricantes = await getData("http://localhost:8080/api/fabricantes");


        const optionPadrao = document.createElement("option");
        optionPadrao.value = "";
        optionPadrao.textContent = "Selecione o fabricante";
        selectFabricante.appendChild(optionPadrao);


        dadosFabricantes.forEach(function(fabricante){
            const option = document.createElement("option");
            option.value = fabricante.id;
            option.textContent = fabricante.nome;
            selectFabricante.appendChild(option);
        });


        const optionModeloPadrao = document.createElement("option");
        optionModeloPadrao.value = "";
        optionModeloPadrao.textContent = "Selecione um fabricante primeiro";
        selectModelo.appendChild(optionModeloPadrao);
        selectModelo.disabled = true;

}


const carregarModelosVeiculo = async function(fabricanteId){

    const selectModelo = document.getElementById("modelo-veiculo");
    setRemoverElementos("#modelo-veiculo option");

    if(!fabricanteId){
        const optionPadrao = document.createElement("option");  
        optionPadrao.value = "";
        optionPadrao.textContent = "Selecione um fabricante primeiro";
        selectModelo.appendChild(optionPadrao);
        selectModelo.disabled = true;
        return;

    }

    const dadosModelos = await getData(`http://localhost:8080/api/modelos`);
    const modelosFiltrados = dadosModelos.filter(function(modelo){
        return modelo.fabricante.id == fabricanteId;
    });


    if(modelosFiltrados.length === 0){
        const optionSemModelo = document.createElement("option");
        optionSemModelo.value = "";
        optionSemModelo.textContent = "Nenhum modelo disponível para este fabricante";
        selectModelo.appendChild(optionSemModelo);
        selectModelo.disabled = true;
        return;
    }



    selectModelo.disabled = false;
    const optionPadrao = document.createElement("option");
    optionPadrao.value = "";
    optionPadrao.textContent = "Selecione um modelo";
    selectModelo.appendChild(optionPadrao);


    modelosFiltrados.forEach(function(modelo){
        const option = document.createElement("option");
        option.value = modelo.id;
        option.textContent = modelo.nome;
        selectModelo.appendChild(option);
    });
}


const atualizarTabelaVeiculos = async function(){
    setRemoverElementos(".tabela-dados");
    document.querySelector("#veiculos").style.display = "block";
    const dadosVeiculos = await getData("http://localhost:8080/api/veiculos");
    document.querySelector("#veiculos").appendChild(criarTabelaVeiculo(dadosVeiculos));


}

const validarPlaca = function(placa){
    placa = placa.trim().toUpperCase().replace("-", "");

    const padraoAntigo = /^[A-Z]{3}[0-9]{4}$/;

    const padraoMercusul = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;

    if(padraoAntigo.test(placa) || padraoMercusul.test(placa)){
    
        return{valido: true, message: ""};
    
    }

    return{
        valido: false,
        message: "Placa inválida. Utilize o formato ABC1234 ou ABC1D23."
    };


}


const validarVeiculo = function(veiculo){
    const anoAtual = new Date().getFullYear();
    const selectModelo = document.getElementById("modelo-veiculo");
    const selectFabricante = document.getElementById("fabricante-veiculo");


    if(selectFabricante.value === ""){
        return {valido: false, message: "Selecione um fabricante."};
    }

    if(selectModelo.disabled){
        return {valido: false, message: "Não há modelos disponíveis para o fabricante selecionado. Por favor, cadaste um modelo primeiro."};
    }

    if(!veiculo.modelo || veiculo.modelo.id){
        return {valido: false, message: "Selecione um modelo."};
    }

    if(!veiculo.ano || veiculo.ano < 1900 || veiculo.ano > anoAtual + 1){
        return {valido: false, message: `Ano inválido. Insira um ano entre 1900 e ${anoAtual + 1}.`};
    }


    if(!veiculo.placa || veiculo.placa.trim() === ""){
        return {valido: false, message: "Placa não pode estar vazia."};
    }

    const validacaoPlaca = validarPlaca(veiculo.placa);
    if(!validacaoPlaca.valido){
        return{valido: false, message: validacaoPlaca.message};
    }

    if(!veiculo.cor || veiculo.cor.trim() === ""){
        return {valido: false, message: "Cor não pode estar vazia."};
    }


    const valorVeiculo = veiculo.valor || veiculo.preco;
    if(!valorVeiculo || valorVeiculo <= 0){
        return {valido: false, message: "Valor do veículo deve ser maior que zero."};
    }

    return {valido: true, message: ""};

}

const limparFormularioVeiculo = function(){
    document.getElementById("fabricante-veiculo").value = "";
    document.getElementById("modelo-veiculo").value = "";
    document.getElementById("placa-veiculo").value = "";
    document.getElementById("cor-veiculo").value = "";
    document.getElementById("preco-veiculo").value = "";
    document.getElementById("ano-veiculo").value = "";

}


const inicializarEventosVeiculo = function(){
    document.getElementById('bt-veiculos').addEventListener("click", async function(event){
        setMostrarOcultarElemento(true, ".minha-section");
        setRemoverElementos(".tabela-dados");
        document.querySelector("#veiculos").style.display = "block";

        const dadosVeiculos = await getData("http://localhost:8080/api/veiculos");

        if(dadosVeiculos.ok === false){
           document.querySelector('#veiculos').innerHTML = `<p>Erro ao carregar veículos: ${dadosVeiculos.message}</p>`;
           document.querySelector('#veiculos').style.color = "red";
        }
        document.querySelector("#veiculos").appendChild(criarTabelaVeiculo(dadosVeiculos));
    });

    document.getElementById('novo-veiculo').addEventListener("click", async function(event){
        setMostrarOcultarElemento(true, ".modal-content");


        await carregarFabricantesVeiculo();
        MODAL.style.display = "block";
        setMostrarOcultarElemento(false, ".modal-content-veiculo");
    });


    document.getElementById('placa-veiculo').addEventListener("input", function(event){
        let valor = event.target.value.toUpperCase();

        valor = valor.replace(/[^A-Z0-9]/g, '');

        if(valor.length > 7){
            valor = valor.substring(0,7);
        }

        event.target.value = valor;
    });


    
}


