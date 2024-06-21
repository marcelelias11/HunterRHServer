let counter = Number(sessionStorage.getItem("FPVcounter")) || 0;
function FPVmain() {
  fetch("http://localhost:8080/FPV")
    .then(async function (response) {
      return await response.json();
    })
    .then(async function (text) {
      let cadastrojsonarr = text.cadastro;
      let contratojsonarr = text.contratos[`contrato${counter}`];
      let contratostitulo = text.contratostitulo;
      let FPVjsonarr = text.FPVs[`FPV${counter}`];
      let cadastroarr = [
        cadastrojsonarr.find((p) => p.title == "Empresa"),
        cadastrojsonarr.find((p) => p.title == "Razão Social"),
        cadastrojsonarr.find((p) => p.title == "CNPJ"),
        cadastrojsonarr.find((p) => p.title == "Endereço"),
        cadastrojsonarr.find((p) => p.title == "Responsável legal"),
        cadastrojsonarr.find((p) => p.title == "E-mail"),
        cadastrojsonarr.find((p) => p.title == "Telefone"),
      ];
      let cadastrotable = "";
      for (let i = 0; i < cadastroarr.length; i++) {
        cadastrotable += "<tr>";
        cadastrotable += `<td>${cadastrojsonarr[i].title}</td>`;
        cadastrotable += `<td>${cadastrojsonarr[i].info}</td>`;
        cadastrotable += "</tr>";
      }
      let FPVtable = "";
      for (let i = 0; i < 2; i++) {
        FPVtable += "<tr>";
        FPVtable += `<td>${contratojsonarr[i].title}</td>`;
        FPVtable += `<td>${contratojsonarr[i].info}</td>`;
        FPVtable += "</tr>";
      }
      for (let i = 0; i < FPVjsonarr.length; i++) {
        FPVtable += "<tr>";
        FPVtable += `<td>${FPVjsonarr[i].title}</td>`;
        FPVtable += `<td>${FPVjsonarr[i].info}</td>`;
        FPVtable += "</tr>";
      }
      document.getElementById("FPVEmpresa").innerHTML += cadastrotable;
      document.getElementById("FPVVaga").innerHTML += FPVtable;
    })
    .catch((error) => {
      console.error(error);
    });
}
sessionStorage.setItem("FPVcounter", counter + 1);
console.log(sessionStorage.getItem("FPVcounter"));
