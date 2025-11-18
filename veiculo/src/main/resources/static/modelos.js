        const criarTabelaModelo = function(dados){
        const tabela = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");

        // Criar cabeçalho da tabela
        const trTittle = document.createElement("tr");
        const th = document.createElement("th");
        th.textContent = "Modelos";
        th.colSpan = 4; // Ajuste conforme o número de colunas (4 está correto)
        trTittle.appendChild(th);
        thead.appendChild(trTittle);

            // Linha 14: CORREÇÃO APLICADA AQUI
        const cabecalho = ["Modelos", "Fabricante", "País de Origem", "DELETAR"];
        const tr = document.createElement("tr");
        cabecalho.forEach(function(coluna){
        const th = document.createElement("th");
        th.textContent = coluna;
                // Adiciona o atributo 'data-label' para responsividade
                th.setAttribute('data-label', coluna); 
        tr.appendChild(th);
        });

        // adciona classe para estilizar a tabela
        tabela.classList.add("tabela-dados");

        thead.appendChild(tr);
        tabela.appendChild(thead);

        // Criar corpo da tabela
        dados.forEach(function(item){
        const tr = document.createElement("tr");
        
                //Modelo
        const tdModelo = document.createElement("td");
        tdModelo.textContent = item.nome;
                tdModelo.setAttribute('data-label', 'Modelos'); // Para responsividade
        tr.appendChild(tdModelo);

        //nome do fabricante
        const tdFabricante = document.createElement("td");
        tdFabricante.textContent = item.fabricante.nome;
                tdFabricante.setAttribute('data-label', 'Fabricante'); // Para responsividade
        tr.appendChild(tdFabricante);

        //Pais de Origem
        const tdPaisOrigem = document.createElement("td");
        tdPaisOrigem.textContent = item.fabricante.paisOrigem;
        tr.appendChild(tdPaisOrigem);
                tdPaisOrigem.setAttribute('data-label', 'País de Origem'); // Para responsividade

        //deletar Modelos
        const deletar = document.createElement("td");
                deletar.setAttribute('data-label', 'AÇÕES'); // Para responsividade
        deletar.innerHTML = `<button class="btn-deletar">🗑️</button>`;
        deletar.addEventListener("click", async function(){
        const resultado = await setDeletar(`http://localhost:8080/api/modelos/${item.id}`);
        if(resultado.status === 204){
        this.parentElement.remove();
                        // MELHORIA: Substituir alert() pela função do index.html
        showCustomAlert("Sucesso", "Modelo deletado com sucesso!");
        }else{
                        // MELHORIA: Substituir alert() pela função do index.html
        showCustomAlert("Erro", "Erro ao deletar modelo.");
        }
        });
        tr.appendChild(deletar);

        tbody.appendChild(tr);
        })

        tabela.appendChild(tbody);

        return tabela;
            }