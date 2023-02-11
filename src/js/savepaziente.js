import {fetchResource} from "./api_wrapper";
import {findFarmaco, getFarmaco} from "./api";

document.addEventListener('DOMContentLoaded', () => {
  const listaFarmaco = [];

  function savePaziente(
      codiceFiscale,
      nome,
      cognome,
      dataNascita,
      indirizzo,
      telefono,
      email,
      sesso,
      tipoDiabete,
      comorbilita,
      farmaciAssunti,
      periodoDiMonitoraggio,
      numeriUtili,
      terapia
  ) {
    return fetchResource("paziente/save", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: {
        codiceFiscale,
        nome,
        cognome,
        dataNascita,
        indirizzo,
        telefono,
        email,
        sesso,
        tipoDiabete,
        comorbilita,
        farmaciAssunti,
        periodoDiMonitoraggio,
        numeriUtili,
        terapia,
      }

    });

  }

  document.getElementById("crea-button").addEventListener("click", function () {
    const codiceFiscale = document.getElementById("codiceFiscale").value;
    const nome = document.getElementById("nome").value;
    const cognome = document.getElementById("cognome").value;
    const dataNascita = document.getElementById("dataNascita").value;
    const indirizzo = document.getElementById("indirizzo").value;
    const telefono = document.getElementById("telefono").value;
    const email = document.getElementById("email").value;
    const sesso = document.getElementById("sesso").value;
    const tipoDiabete = document.getElementById("tipoDiabete").value;
    const comorbilita = document.getElementById("comorbilita").value;
    const farmaciAssunti = document.getElementById("farmaciAssunti").value;
    const periodoDiMonitoraggio = 0;
    const numeriUtili = document.getElementById("numeriUtili").value.split(
        /, ?/).map(x => {
      const numero = {}
      ;numero.numero = x;
      return numero;
    });
    const terapia = {farmaci: listaFarmaco};
    console.log(terapia);
    savePaziente(codiceFiscale, nome, cognome, dataNascita, indirizzo, telefono,
        email, sesso, tipoDiabete, comorbilita, farmaciAssunti,
        periodoDiMonitoraggio, numeriUtili, terapia)
  });

  function find() {
    let nomeFarmaco = document.getElementById("cerca-farmaco").value;
    findFarmaco(nomeFarmaco)
    .then(listFarmaci => {
      let html = '';
      for (let farmaco of listFarmaci.list) {
        html += `
          <div class="row fw-normal" id="mostra-farmaci">
          <br>
            <div class="col-sm-6" id="nome-farmaco"><br>${farmaco.nomeFarmaco}</div>
            <div class="col-sm-6" id="principio-attivo"><br>${farmaco.principioAttivo}</div>
           </div>
           `;

      }

      document.getElementById("lista-farmaci").innerHTML = html;

    })

  }

  document.getElementById("cerca-button").onclick = find;

  function salvaTerapia() {
    const nomeFarmaco = document.getElementById("nomeFarmaco").value;
    const dosaggio = document.getElementById("dosaggio").value;
    const ora = document.getElementById("ora").value;
    const somministrazione = document.getElementById("somministrazione").value;
    const noteAggiuntive = document.getElementById("noteAggiuntive").value;
    findFarmaco(nomeFarmaco)
    .then(farmaci => {
      if (farmaci.list.length == 0) {
        alert("farmaco non riconosciuto")
      }
      console.log(farmaci);
      const farmaco = farmaci.list[0];
      const idFarmaco = farmaco.id;
      listaFarmaco.push(
          {
            idFarmaco: idFarmaco,
            dosaggio: dosaggio,
            orarioAssunzione: ora,
            viaDiSomministrazione: somministrazione,
            noteAggiuntive: noteAggiuntive
          }
      )
    })

  }

  document.getElementById("aggiunta-terapia").onclick = salvaTerapia;
})