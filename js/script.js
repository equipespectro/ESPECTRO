var fs = require('fs');
var { v4: uuidv4 } = require("uuid");
var prefixo = "gg@";
var tarefas = {};

async function pegaTarefas() {
  fs.readFile('./tarefas.txt', "utf8", (err, data) => {
    // console.log(data);
    if (err) {
      console.warn(err);
      throw err;
    }
    if (data) {
      tarefas = JSON.parse(data);
    }

    // console.log(tarefas);
  });
  // console.log(tarefas);
  return tarefas;
}

function salvaTarefas() {
  if (tarefas) {
    const _txtTarefas = JSON.stringify(tarefas);

    fs.writeFile("./tarefas.txt", _txtTarefas, err => {
      if (err) {
        console.warn(err);
        throw err;
      }

      console.log("Tarefas salvas");
    });
  }
}

function adicionaTarefa(novaTarefa, e_tarefas) {
  if (novaTarefa) {
    const _novoId = uuidv4();
    novaTarefa.id = _novoId;
    tarefas[_novoId] = { ...novaTarefa };

    return {...tarefas};
    // salvaTarefas();
  }
}

function alteraTarefa(tarefaAlterada, e_tarefas) {
  // console.log(e_tarefas);
  // console.log(tarefaAlterada);
  if (e_tarefas && e_tarefas[tarefaAlterada.id]) {
    e_tarefas[tarefaAlterada.id] = { ...tarefaAlterada };

    console.log(e_tarefas);
    tarefas = {...e_tarefas};
    return {...e_tarefas};
  }
}

function teste() {
  // adicionaTarefa({nome:"teste",categoria:"aaaa"});
  // tarefas = localStorage.getItem(`${prefixo}tarefas`);
  console.log("tarefas", tarefas);
  // salvaTarefas();
}

function abreModal(nomeModal){
  const [_campoSlotModais] = document.getElementsByClassName("slotModais");
  
  if(nomeModal){
    const [_campoModalEscolhido] = document.getElementsByClassName(nomeModal);

    _campoModalEscolhido.classList.remove("oculto");
    _campoSlotModais.classList.remove("oculto");
  }
  else{
    const _modais = document.getElementsByClassName("modal");

    _campoSlotModais.classList.add("oculto");

    Object.values(_modais).forEach(modal => {
      modal.classList.add("oculto");
    });
  }
  // console.log(_campoSlotModais);
}

function formataData(dataBruta, separadorInicial, separadorFinal){
  if(dataBruta){
    const _novaData = dataBruta.split(separadorInicial);
    _novaData.reverse();

    return _novaData.join(separadorFinal);
  }
}

function dataHumano(dataBruta){
  // console.log(dataBruta);
  return formataData(dataBruta, '-', '/');
}

function dataPC(dataBruta){
  return formataData(dataBruta, '/', '-');
}

module.exports = {
  pegaTarefas: pegaTarefas,
  salvaTarefas: salvaTarefas,
  adicionaTarefa: adicionaTarefa,
  alteraTarefa: alteraTarefa,
  tarefas: tarefas,
  dataHumano: dataHumano,
  dataPC: dataPC,
}