/* Utilizando .THEN antes do tratamento com CATCH

var consultaCep = fetch('https://viacep.com.br/ws/01001250/json/')//eu adicionei o https:// para retirar os erros que estavam dando no console
.then(resposta => resposta.json()) //Poderia estar tudo em uma linha só dentro do fetch, mas assim fica mais arrumado
.then(r => console.log(r))
.catch(erro => console.log(erro)); // Aqui vai dar o erro padrao do catch "TypeError: failed to fetch. "

console.log(consultaCep);
*/



/* Aqui é o .THEN com o tratamento de CATCH

var consultaCep = fetch('https://viacep.com.br/ws/01001000/json/')
.then(resposta => resposta.json()) 
.then(r => {
    if (r.erro) {
        throw Error('Esse cep não existe')
    } else
    console.log(r)})
.catch(erro => console.log(erro))
.finally(mensagem => console.log("Processamento concluído!")); 

console.log(consultaCep);
*/



/*Refazendo com o ASYNC AWAIT

async function buscaEndereco(){
    try {
        var consultaCep = await fetch('https://viacep.com.br/ws/01001000/json/') 
        var consultaCepConvertida = await consultaCep.json()

        if (consultaCepConvertida.erro){
            throw Error ("CEP não existe!")
        }

        console.log(consultaCepConvertida)       
    } catch (erro){
        console.log(erro)
    }
}

buscaEndereco();
*/



/*Refazendo com o ASYNC AWAIT e PROMISSE ALL para várias requsições

async function buscaEndereco(cep){ //Aqui vou colocar um parametro dentro da função e pode ser qualquer nome
    try {
        var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`) //Aqui eu vou tirar os numeros do cep e vou colocar o parametro que eu criei, mas isso usando interpolação, precisa mudar as aspas para crase e colocar ${}
        var consultaCepConvertida = await consultaCep.json()

        if (consultaCepConvertida.erro){
            throw Error ("CEP não existe!")
        }

        console.log(consultaCepConvertida)
        return consultaCepConvertida;

    } catch (erro){
        console.log(erro)
    }
}

let ceps = ['01001000','01001001']
let conjuntoCeps = ceps.map(valores => buscaEndereco(valores))
Promise.all(conjuntoCeps).then(respostas => console.log(respostas))
*/



//Só que eu não vou usar o PROMISSE ALL nesse caso, então volto ao código anterior

async function buscaEndereco(cep){ //Aqui vou colocar um parametro dentro da função e pode ser qualquer nome
    var mensagemErro = document.querySelector('#erro')
    mensagemErro.innerHTML = ""

    try {
        var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`) //Aqui eu vou tirar os numeros do cep e vou colocar o parametro que eu criei, mas isso usando interpolação, precisa mudar as aspas para crase e colocar ${}
        var consultaCepConvertida = await consultaCep.json()

        if (consultaCepConvertida.erro){
            throw Error ("CEP não existe!")
        }

        var endereco = document.querySelector('#endereco')
        var bairro = document.querySelector('#bairro')
        var cidade = document.querySelector('#cidade')
        var estado = document.querySelector('#estado')

        endereco.value = consultaCepConvertida.logradouro
        bairro.value = consultaCepConvertida.bairro
        cidade.value = consultaCepConvertida.localidade
        estado.value = consultaCepConvertida.uf

        return consultaCepConvertida;

    } catch (erro){
        mensagemErro.innerHTML = 'CEP inválido. Tente novamente!' //Adaptei no styles.css também
    }
}

// Aqui começa a manipulação do DOM

var cep = document.querySelector('#cep')
cep.addEventListener("focusout", () => buscaEndereco(cep.value)) // focusout é quando eu tiro a seleção do campo que eu preenchi

//Para mostrar o erro ao usuário caso ele tenha digitado errado, vou ao HTML e acrecento uma DIV depois do CEP para ter seu espaço




