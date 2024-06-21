let FECcounter = Number(sessionStorage.getItem("FECcounter")) || 0;
function FECmain() {
  fetch("http://localhost:8080/FEC")
    .then(async function (response) {
      return await response.json();
    })
    .then(async function (text) {
      let FECjsonarr = text.FEC[`FEC${FECcounter}`];

      let leftColumnPhrases = [];
      for (let i = 0; i < FECjsonarr.length; i++) {
        leftColumnPhrases.push(FECjsonarr[i].titleleft);
      }
      let rightColumnPhrases = [];
      for (let i = 0; i < FECjsonarr.length; i++) {
        rightColumnPhrases.push(FECjsonarr[i].titleright);
      }
      document.getElementById(
        "Empresa"
      ).innerText = `Empresa: ${text.empresa[0].info}`;
      document.getElementById("Cargo").innerText = `Cargo: ${
        text.cargo[`contrato${FECcounter}`][0].info
      }`;
      let FECdiv = "";
      for (let i = 0; i < leftColumnPhrases.length; i++) {
        FECdiv += "<div class = 'contentcontainer'>";
        FECdiv += `<p id = 'contentleft' class = 'content'>${leftColumnPhrases[i]}</p>`;
        FECdiv += "<div id = 'checkboxcontainer'>";
        for (let j = 0; j < 5; j++) {
          let id = 100 - 25 * j;
          FECdiv += `<div id = ${id} class= "checkbox">`;
          if (id == FECjsonarr[i].valueleft.replace("%", "")) {
            FECdiv += `<p>X</p>`;
          } else {
            FECdiv += `<p></p>`;
          }
          FECdiv += "</div>";
        }
        FECdiv += "</div>";
        FECdiv += `<p id = 'contentright' class = 'content'>${rightColumnPhrases[i]}</p>`;
        FECdiv += "</div>";
      }
      document.getElementById("FEC").innerHTML += FECdiv;
    })
    .catch((error) => {
      console.error(error);
    });
}
sessionStorage.setItem("FECcounter", FECcounter + 1);
console.log(sessionStorage.getItem("FECcounter"));
