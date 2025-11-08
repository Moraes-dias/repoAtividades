class produtos
{
    constructor(id = 0, Nome = `padrao`, Preco = 1.5, DataCriado = `data`) 
    {
        this.id = id
        this.Nome = Nome
        this.Preco = Preco
        this.DataCriado = DataCriado
    }
}
const urlAPI = 'https://690e6cc8bd0fefc30a046f55.mockapi.io/prod/atividade/produtos'
var produto1 = new produtos(1, `Camisa`, 29.99, '2023-01-15')

var produto2 = new produtos(2, `Calça`, 59.99, '2023-02-20')

var produto3 = new produtos(3, `Tênis`, 89.99, '2023-03-10')

function transformarParaJSON(produto) {
    return{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
    }
}

async function atualizarAPI(produto) {
    console.log(`atualizando produto id: ${produto.id}`)
    try{
        const resposta = await fetch(`${urlAPI}`, transformarParaJSON(produto))

        if(resposta.ok){
            const produtoAtualizado = await resposta.json()
            console.log(`Produto atualizado: ${JSON.stringify(produtoAtualizado)}`)
        } else {
            console.error(`Falha na requisicao PUT: ${resposta.status} - ${resposta.statusText}`)
        }
    } catch (error) {
        console.error(`Erro na atualizacao do produto: ${error}`)
    }
}

atualizarAPI(produto1)
atualizarAPI(produto2)
atualizarAPI(produto3)