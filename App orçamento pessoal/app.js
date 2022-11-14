class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for(let i in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null){
                return false
            }
        }
        return true
    }
}

class Bd {
    constructor(){
        let id = localStorage.getItem('id')

        if(id === null){
            // Se o id for null, é pq o id ainda não existe, sendo necessario criar a primeira estancia
            localStorage.setItem('id', 0)
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(d){
        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id)
    }

    listaTodosRegistros(){

        let despesas = Array()

        let id = localStorage.getItem('id')

        for(let i = 1; i <= id; i++){
            let despesa = JSON.parse(localStorage.getItem(i))

            if(despesa === null){
                continue
            }

            despesa.id = i
            despesas.push(despesa)
        }
        return despesas
    }

    pesquisar(desp){

        let despesasFiltradas = Array()

        despesasFiltradas = this.listaTodosRegistros()

        if(desp.ano != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == desp.ano)
        }
        if(desp.mes != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == desp.mes)
        }
        if(desp.dia != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == desp.dia)
        }
        if(desp.tipo != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == desp.tipo)
        }
        if(desp.descricao != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == desp.descricao)
        }
        if(desp.valor != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == desp.valor)
        }
        return despesasFiltradas
    }

    remover(id){
        localStorage.removeItem(id)
    }
}

let bd = new Bd()

function cadastrarDespesa(){

    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    if(despesa.validarDados()){
        bd.gravar(despesa)

        document.getElementById('ano').value = ''
        document.getElementById('mes').value = ''
        document.getElementById('dia').value = ''
        document.getElementById('tipo').value = ''
        document.getElementById('descricao').value = ''
        document.getElementById('valor').value = ''

        document.getElementById('motal_titulo').innerHTML = 'Registro inserido com sucesso'
        document.getElementById('modal_titulo_div').className = 'modal-header text-success'
        document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso'
        document.getElementById('modal_btn').innerHTML = 'Voltar'
        document.getElementById('modal_btn').className = 'btn btn-success'
        $('#modalRegistroDespesa').modal('show')
    } else {
        document.getElementById('motal_titulo').innerHTML = 'Erro na gravação'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        document.getElementById('modal_conteudo').innerHTML = 'Existem campos obrigatórios a serem preenchidos'
        document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
        document.getElementById('modal_btn').className = 'btn btn-danger'
        $('#modalRegistroDespesa').modal('show')
    }

    /*
    if(){
        m != 
    }
    */
}

function carregaListaDespesas(despesas = Array(), filtro = false){

    if(despesas.length == 0 && filtro == false){
        despesas = bd.listaTodosRegistros()
    }

    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''

    despesas.forEach(function(d){
        let linha = listaDespesas.insertRow()
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        switch(d.tipo){
            case '1':
                d.tipo = 'Alimentação'
                break
            case '2':
                d.tipo = 'Educação'
                break
            case '3':
                d.tipo = 'Lazer'
                break
            case '4':
                d.tipo = 'Saúde'
                break
            case '5':
                d.tipo = 'Transporte'
                break                             
        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        let btn = document.createElement("button")
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
        btn.id = `id_despesas_${d.id}`
        btn.onclick = function() {
            let id = this.id.replace('id_despesas_', '')
            bd.remover(id)
            window.location.reload()
        }
        linha.insertCell(4).append(btn)
    })
}

function pesquisaDespesa(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    let despesas = bd.pesquisar(despesa)

    carregaListaDespesas(despesas, true)
}
