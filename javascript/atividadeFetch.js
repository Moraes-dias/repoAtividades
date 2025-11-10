class produtos {
    constructor(id = 0,Nome = `padrao`,Preco = 1.5, DataCriado = Date) 
    {
        this.id = id
        this.Nome = Nome
        this.Preco = Preco
        this.DataCriado = DataCriado
    }

    mostrarProduto(formatador) {
        const precoaArrumado = formatador ? formatador(this.Preco) : this.Preco;
        return `ID: ${this.id} Nome: ${this.Nome} \n Preço: ${precoaArrumado} \n Data de Criação: ${this.DataCriado}`
    }
}



async function fetchProdutos() {
    const resposta = await fetch('https://690e6cc8bd0fefc30a046f55.mockapi.io/prod/atividade/produtos')
    const dados = await resposta.json()
    
    const todosProdutos = dados.map(item => {
        return new produtos(
            item.id,
            item.Nome,
            item.Preco,
            item.DataCriado
        );
    });
    return todosProdutos;
}

addEventListener(`DOMContentLoaded`, () => {
    let codigoMoeda = 'USD';
    let locale = 'en-US';

    const selectMoeda = document.getElementById('selecao');

    let formatoAtual = new Intl.NumberFormat(locale, { style: 'currency', currency: codigoMoeda }).format;
    function mudarMoeda()
    {
        const moedaSelecionada = selectMoeda.value;
        
        switch (moedaSelecionada) {
            case 'real':
                locale = 'pt-BR';
                codigoMoeda = 'BRL';
            break;
            case 'dolar':
                locale = 'en-US';
                codigoMoeda = 'USD';
            break;
            case 'iene':
                locale = 'ja-JP';
                codigoMoeda = 'JPY';
            break;
            default:
                locale = 'pt-BR';
                codigoMoeda = 'BRL';
                console.log('erro do k7')
            break;
        }
        formatoAtual = new Intl.NumberFormat(locale, { style: 'currency', currency: codigoMoeda }).format
        
    }

    /*const seletorId = document.getElementById('seletor')
    seletorId.addEventListener('change', fetchProdutos)*/

    selectMoeda.addEventListener('change', ()=>
    {
        mudarMoeda();
        iniciarProdutos();
    });

    async function iniciarProdutos()
    {
        const divProdutos = document.getElementById('listaProdutos')
        if(!divProdutos)
        {
            console.log('Elemento listaProdutos nao encontrado')
            return;
        }
        try{
            const itens = await fetchProdutos();
            divProdutos.innerHTML = '';
            itens.forEach(item =>{
                const produtoDiv = document.createElement('div');
                produtoDiv.className = 'produtoItem';
                console.log('primeiro passo para mostrar produto ok')
                produtoDiv.innerText = item.mostrarProduto(formatoAtual);
                console.log('segundo passo para mostrar produto ok')
                divProdutos.appendChild(produtoDiv);
                console.log('terceiro passo para mostrar produto ok')
            });
            
        } catch (error) {
            console.Error(`Erro ao carregar produtos: ${error}`);
        }
    }
    //mudarMoeda();
    iniciarProdutos();


    const selecaoForm = document.getElementById('form')
    selecaoForm.addEventListener('submit', (evento)=>{
        evento.preventDefault();
        const nomeProduto = document.getElementById('nomeProduto')
        const precoProduto = document.getElementById('precoProduto')
        const dataProduto = document.getElementById('dataProduto')

        if(!nomeProduto || !precoProduto || !dataProduto)
        {
            console.error('Elemento do formulario nao encontrado')
            return;
        }
        console.log(dataProduto.value)
       /**
        * @param{string} funcao recebe a data modelo YY/MM/DD
        * @returns{string} retorna a data no modelo DD/MM/YY
        */
        var dataCerta = dataProduto.value
        function arrumarData(dataCerta)
        {
            if(!dataCerta){
                console.error('Data invalida')
                return;
            }
            const partesData = dataCerta.split('-');

        }

    })
})