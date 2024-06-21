function main() {
  sessionStorage.setItem("FECcounter", 0);
  sessionStorage.setItem("FPVcounter", 0);
}

document.getElementById("date").innerHTML +=
  " " +
  new Date().getDate() +
  "/" +
  ("0" + (new Date().getMonth() + 1)).slice(-2) +
  "/" +
  new Date().getFullYear();
fetch("http://localhost:8080/contrato")
  .then(async function (response) {
    return await response.json();
  })
  .then(async function (text) {
    let cadastrojsonarr = text.cadastro;
    let contratojsonarr = text.contratos;
    let valueimposto = text.imposto;

    let cadastroarr = [
      cadastrojsonarr.find((p) => p.title === "Empresa"),
      cadastrojsonarr.find((p) => p.title === "CNPJ"),
      cadastrojsonarr.find((p) => p.title === "Endereço"),
      cadastrojsonarr.find((p) => p.title === "Bairro"),
      cadastrojsonarr.find((p) => p.title === "CEP"),
      cadastrojsonarr.find((p) => p.title === "Cidade"),
      cadastrojsonarr.find((p) => p.title === "Estado"),
      cadastrojsonarr.find((p) => p.title === "Telefone"),
      cadastrojsonarr.find((p) => p.title === "E-mail"),
      cadastrojsonarr.find((p) => p.title === "Responsável legal"),
      cadastrojsonarr.find((p) => p.title === "CPF"),
      cadastrojsonarr.find((p) => p.title === "Cargo"),
    ];
    let cadastrosection = "";
    for (let i = 0; i < cadastroarr.length - 1; i++) {
      switch (cadastroarr[i].title) {
        case "Bairro":
          cadastrosection += `<section id="infolocal" class="infoempresa">`;
          for (let j = i; j < i + 4; j++) {
            cadastrosection += `<p>${cadastroarr[j].title}: ${cadastroarr[j].info}</p>`;
          }
          cadastrosection += `</section>`;
          i = i + 3;
          break;

        case "Telefone":
          cadastrosection += `<section id="infocontato" class="infoempresa">`;
          for (let j = i; j < i + 2; j++) {
            cadastrosection += `<p>${cadastroarr[j].title}: ${cadastroarr[j].info}</p>`;
          }
          cadastrosection += `</section>`;
          i = i + 1;
          break;

        case "CPF":
          cadastrosection += `<section id="infopessoal" class="infoempresa">`;
          for (let j = i; j < i + 2; j++) {
            cadastrosection += `<p>${cadastroarr[j].title}: ${cadastroarr[j].info}</p>`;
          }
          cadastrosection += `</section>`;
          break;
        case "Empresa":
          cadastrosection += `<section class="infoempresa">`;
          cadastrosection += `<p>${cadastroarr[i].title} CONTRATADA: ${cadastroarr[i].info}</p>`;
          cadastrosection += `</section>`;
          break;
        default:
          cadastrosection += `<section class="infoempresa">`;
          cadastrosection += `<p>${cadastroarr[i].title}: ${cadastroarr[i].info}</p>`;
          cadastrosection += `</section>`;
          break;
      }
    }
    document.getElementById("infoempresa").innerHTML += cadastrosection;

    document.getElementById("inputspace").innerText = cadastroarr[0].info;
    function valortotalsum() {
      let sum = 0;
      for (const key in contratojsonarr) {
        sum +=
          Number(contratojsonarr[key][1].info) *
          Number(contratojsonarr[key][2].info);
      }
      return sum;
    }

    let ttext = "";

    ttext += '<tr class = "linha0">';
    ttext += `<td>Nome da Vaga</td>`;
    ttext += `<td>Qtde.</td>`;
    ttext += `<td>Valor (R$)</td>`;
    ttext += "</tr>";

    for (const key in contratojsonarr) {
      ttext += "<tr>";
      for (let i = 0; i < contratojsonarr[key].length; i++) {
        ttext += `<td>${contratojsonarr[key][i].info.replace(".", ",")}</td>`;
      }
      ttext += "</tr>";
    }

    ttext += "<tr>";
    ttext += `<td>Imposto</td>`;
    ttext += `<td>${String(valueimposto * 100).replace(".", ",")}%</td>`;
    ttext += `<td>${String(valortotalsum() * valueimposto).replace(
      ".",
      ","
    )}</td>`;
    ttext += "</tr>";

    ttext += '<tr class = "linha0">';
    ttext += `<td>TOTAL</td>`;
    ttext += `<td>-</td>`;
    ttext += `<td>${String(
      valortotalsum() + valortotalsum() * valueimposto
    ).replace(".", ",")}</td>`;
    ttext += "</tr>";
    document.getElementById("tablecargo").innerHTML += ttext;
    let i = 0;
    for (const key in contratojsonarr) {
      document.getElementById(
        "iframediv"
      ).innerHTML += `<iframe id="iframe${i}" src="FPV.html" title="FPV"></iframe>`;
      i++;
      document.getElementById(
        "iframediv"
      ).innerHTML += `<iframe id="iframe${i}" src="FEC.html" title="FPV"></iframe>`;
      i++;
    }
  })
  .catch((error) => {
    console.error(error);
  });
