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
var produto1 = new produtos(3, `Cueca`, 99.99, '2024-03-18')

var produto2 = new produtos(4, `Meia`, 20.99, '2006-08-01')

var produto3 = new produtos(5, `Chapeu`, 50.50, '2024-01-30')

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
            console.error(`Falha na requisicao POST: ${resposta.status} - ${resposta.statusText}`)
        }
    } catch (error) {
        console.error(`Erro na atualizacao do produto: ${error}`)
    }
}

atualizarAPI(produto1)
atualizarAPI(produto2)
atualizarAPI(produto3)
