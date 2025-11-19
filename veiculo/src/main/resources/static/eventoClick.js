const MODAL = document.getElementById("modal");
const CLOSE_MODAL_BUTTON = document.getElementById("close-modal");

CLOSE_MODAL_BUTTON.addEventListener("click", function(){
    MODAL.style.display = "none";
});

document.getElementById("novo-fabricante").addEventListener("click", async function(event){
    setMostrarOcultarElemento(true, ".modal-content");

    const dadosPaises = await getData("http://localhost:8080/paisesmaps.json");
    const selectPais = document.getElementById("pais-fabricante");
    setRemoverElementos("#pais-fabricante option");
    dadosPaises.forEach(function(pais){

        const option = document.createElement("option");
        option.value = pais.nome_pais;
        option.textContent = pais.nome_pais;
        selectPais.appendChild(option);


    });

    MODAL.style.display = "block"; //MODAL é uma constante global, por isso em maiusculo.
    setMostrarOcultarElemento(false, ".modal-content-fabricante");
});

document.getElementById("novo-modelo").addEventListener("click", async function(event){
    setMostrarOcultarElemento(true, ".modal-content");
   const dadosFabricantes = await getData("http://localhost:8080/api/fabricantes");
   if(dadosFabricantes.status === 404 || dadosFabricantes.error){
        alert ("Erro ao carregar fabricantes. erro: " + dadosFabricantes.message);
      return;

   }
   setRemoverElementos("#fabricante-modelo option");

   document.getElementById("fabricante-modelo").appendChild(new Option("Selecione um fabricante", ""));
   dadosFabricantes.forEach(function(fabricante){
        const option = document.createElement("option");
        option.value = fabricante.id;
        option.textContent = fabricante.nome + " (" + fabricante.paisOrigem + ")";
        document.getElementById("fabricante-modelo").appendChild(option);
   });
    MODAL.style.display = "block";
    setMostrarOcultarElemento(false, ".modal-content-modelo");
});

document.getElementById("novo-veiculo").addEventListener("click", async function(event){
    setMostrarOcultarElemento(true, ".modal-content");
   const dadosModelos = await getData("http://localhost:8080/api/modelos");
    if(dadosModelos.status === 404 || dadosModelos.error){
        alert ("Erro ao carregar modelos. erro: " + dadosModelos.message);
        return;
    
    }
    setRemoverElementos("#modelo-veiculo option");

    document.getElementById("modelo-veiculo").appendChild(new Option("Selecione um modelo", ""));
   dadosModelos.forEach(function(modelo){
        const option = document.createElement("option");
        option.value = modelo.id;
        option.textContent = modelo.nome + " (" + modelo.fabricante.nome + ")";
        document.getElementById("modelo-veiculo").appendChild(option);
   });
    MODAL.style.display = "block";
    setMostrarOcultarElemento(false, ".modal-content-veiculo");
});


document.getElementById("bt-fabricantes").addEventListener("click", async function(event){
    setMostrarOcultarElemento(true, ".minha-section");
    setRemoverElementos(".tabela-dados");
    document.querySelector("#fabricantes").style.display = "block";
    const dadosFabricantes = await getData("http://localhost:8080/api/fabricantes");
    document.querySelector("#fabricantes").appendChild(criarTabela(dadosFabricantes, "Fabricantes", "tabela-dados"));
    
});


document.getElementById("salvar-fabricante").addEventListener("click", async function(event){

    event.preventDefault();
    const nome = document.getElementById("nome-fabricante").value;
    const paisOrigem = document.getElementById("pais-fabricante").value;
    const novoFabricante = {
        nome: nome,
        paisOrigem: paisOrigem
    };

    const resultado =  await postData("http://localhost:8080/api/fabricantes", novoFabricante);

    if(resultado.ok) {
        alert("Fabricante criado com sucesso!");
        document.getElementById("nome-fabricante").value = "";
        document.getElementById("pais-fabricante").value = "";
        MODAL.style.display = "none";


        setRemoverElementos(".tabela-dados");
        document.querySelector("#fabricantes").style.display = "block";
        const dadosFabricantes = await getData("http://localhost:8080/api/fabricantes");
        document.querySelector("#fabricantes").appendChild(criarTabela(dadosFabricantes, "Fabricantes", "tabela-dados"));
    } else {
        alert("Erro ao criar fabricante: " + resultado.message);
    }

} );



document.getElementById("bt-modelos").addEventListener("click", async function(event){
    setMostrarOcultarElemento(true, ".minha-section");
    setRemoverElementos(".tabela-dados");
    document.querySelector("#modelos").style.display = "block";
    const dadosModelos = await getData("http://localhost:8080/api/modelos");
    document.querySelector("#modelos").appendChild(criarTabelaModelo(dadosModelos));
});


document.getElementById("salvar-modelo").addEventListener("click", async function(event){
    event.preventDefault();
    const nome = document.getElementById("nome-modelo").value;
    const fabricanteId = document.getElementById("fabricante-modelo").value;
    const novoModelo = {
        nome: nome,
        fabricante:{
            id: fabricanteId
        }
    };
    const resultado =  await postData("http://localhost:8080/api/modelos", novoModelo);

    if(resultado.ok) {
        alert("Modelo criado com sucesso!");
        document.getElementById("nome-modelo").value = "";
        document.getElementById("fabricante-modelo").value = "";
        MODAL.style.display = "none";

        setRemoverElementos(".tabela-dados");
        document.querySelector("#modelos").style.display = "block";
        const dadosModelos = await getData("http://localhost:8080/api/modelos");
        document.querySelector("#modelos").appendChild(criarTabela(dadosModelos, "Modelos", "tabela-dados"));
    } else {

        alert("Erro ao criar modelo: " + resultado.message);
    }





});
document.getElementById("bt-veiculos").addEventListener("click", async function(event){
    setMostrarOcultarElemento(true, ".minha-section");
    setRemoverElementos(".tabela-dados");
    document.querySelector("#veiculos").style.display = "block";
    const dadosVeiculos = await getData("http://localhost:8080/api/veiculos");
    document.querySelector("#veiculos").appendChild(criarTabelaVeiculo(dadosVeiculos));
});

document.getElementById("salvar-veiculo").addEventListener("click", async function(event){
    event.preventDefault();
    const modeloId = document.getElementById("modelo-veiculo").value;
    const placa = document.getElementById("placa-veiculo").value.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    const cor = document.getElementById("cor-veiculo").value.trim();
    const valor = parseFloat(document.getElementById("valor-veiculo").value);
    const ano = parseInt(document.getElementById("ano-veiculo").value);
    const descricao = document.getElementById("descricao-veiculo").value;
    const novoVeiculo = {
        modelo:{
            id: modeloId
        },
        placa,
        cor,
        valor,
        ano,
        descricao
    };

    const resultado =  await postData("http://localhost:8080/api/veiculos", novoVeiculo);

    if(resultado.ok) {
        alert("Veículo criado com sucesso!");
        document.getElementById("modelo-veiculo").value = "";
        document.getElementById("placa-veiculo").value = "";
        document.getElementById("cor-veiculo").value = "";
        document.getElementById("valor-veiculo").value = "";
        document.getElementById("ano-veiculo").value = "";
        document.getElementById("descricao-veiculo").value = "";
        MODAL.style.display = "none";

        setRemoverElementos(".tabela-dados");
        document.querySelector("#veiculos").style.display = "block";
        const dadosVeiculos = await getData("http://localhost:8080/api/veiculos");
        document.querySelector("#veiculos").appendChild(criarTabelaVeiculo(dadosVeiculos));
    } else {
        alert("Erro ao criar veículo: " + resultado.message);
    }

        } );
