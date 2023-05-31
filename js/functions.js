var chart2;

function atualizarGrafico(event) {
  event.preventDefault();


  // Obtenha os valores do formulário
  var nota1 = parseFloat(document.getElementById('nota1').value);
  var nota2 = parseFloat(document.getElementById('nota2').value);
  var nota3 = parseFloat(document.getElementById('nota3').value);
  var nota4 = parseFloat(document.getElementById('nota4').value);
  var nota5 = parseFloat(document.getElementById('nota5').value);


  // Verifique se as notas são válidas
  if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3) || isNaN(nota4) || isNaN(nota5)) {
    alert('Insira valores numéricos para as notas.');
    return;
  }

  // Verifique se a soma das notas é 100
  var soma = nota1 + nota2 + nota3 + nota4 + nota5;

  var media = soma / 5;
  var Smedia = document.getElementById("Smedia");
  Smedia.innerText = "";
  Smedia.append(media.toFixed(1));

  var Pnota1 = (nota1 / soma) * 100;
  var Pnota2 = (nota2 / soma) * 100;
  var Pnota3 = (nota3 / soma) * 100;
  var Pnota4 = (nota4 / soma) * 100;
  var Pnota5 = (nota5 / soma) * 100;

  // if (soma !== 100) {
  //   alert('A soma das notas deve ser igual a 100%.');
  //   return;
  // }

  // Atualize o gráfico de pizza
  var valores = [Pnota1, Pnota2, Pnota3, Pnota4, Pnota5];
  var cores = ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff'];

  if (chart2) {
    chart2.destroy();
  }

  //Notas convertidas para 2 casas
  var PCnota1 = Pnota1.toFixed(1);
  var PCnota2 = Pnota2.toFixed(1);
  var PCnota3 = Pnota3.toFixed(1);
  var PCnota4 = Pnota4.toFixed(1);
  var PCnota5 = Pnota5.toFixed(1);

  var ctx = document.getElementById('chart2').getContext('2d');
  chart2 = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Nota 1(' + PCnota1 + '%)', 'Nota 2(' + PCnota2 + '%)', 'Nota 3(' + PCnota3 + '%)', 'Nota 4(' + PCnota4 + '%)', 'Nota 5(' + PCnota5 + '%)'],
      datasets: [{
        data: valores,
        backgroundColor: cores
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Gráfico de Pizza - Notas do Aluno'
      }
    }
  });





  var note1 = parseInt(document.getElementById("nota1").value);
      var note2 = parseInt(document.getElementById("nota2").value);
      var note3 = parseInt(document.getElementById("nota3").value);
      var note4 = parseInt(document.getElementById("nota4").value);
      var note5 = parseInt(document.getElementById("nota5").value);

      var Snota1 = document.getElementById("Snota1");
      Snota1.innerText = "";
      Snota1.append("= "+note1.toFixed(1));

      var Snota2 = document.getElementById("Snota2");
      Snota2.innerText = "";
      Snota2.append("= "+note2.toFixed(1));

      var Snota3 = document.getElementById("Snota3");
      Snota3.innerText = "";
      Snota3.append("= "+note3.toFixed(1));

      var Snota4 = document.getElementById("Snota4");
      Snota4.innerText = "";
      Snota4.append("= "+note4.toFixed(1));

      var Snota5 = document.getElementById("Snota5");
      Snota5.innerText = "";
      Snota5.append("= "+note5.toFixed(1));


      var chart = document.getElementById("chart");
      var bars = document.getElementById("bars");

      bars.innerHTML = ""; // Limpa as barras existentes

      var notes = [note1, note2, note3, note4, note5];

      for (var i = 0; i < notes.length; i++) {
        var bar = document.createElement("div");
        bar.className = "bar";
        bar.style.height = (notes[i] / 10) * 100 + "%";
        bars.appendChild(bar);
      }
    }

    function saveAsJPEG() {
      var content = document.getElementById("pdf");

      // Cria um novo elemento de tela para renderizar a imagem
      var canvas = document.createElement("canvas");
      canvas.width = 1500; // Largura aumentada para 1500px
      canvas.height = 1100; // Altura aumentada para 1000px

      var context = canvas.getContext("2d");
      context.fillStyle = "#ffffff"; // Define o fundo branco
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Renderiza o conteúdo no canvas
      html2canvas(content, {
        canvas: canvas,
        backgroundColor: null,
        useCORS: true,
      }).then(function (canvas) {
        // Converte o canvas para uma URL de dados JPEG
        var jpegURL = canvas.toDataURL("image/jpeg", 1.0);

        var studentName = document.getElementById("student-name").value;

        function removeSpecialCharacters(str) {
        return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]/g, "");
        }

        // Remover acentos e caracteres especiais do nome do aluno
        var sanitizedStudentName = removeSpecialCharacters(studentName);

        // Concatenar o nome do aluno com a matrícula
        var filename = sanitizedStudentName + ".jpg";

        // Obtém o link de download
        var link = document.getElementById("jpeg-link");

        // Define a URL da imagem JPEG como o atributo "href" do link
        link.href = jpegURL;

        // Define o nome do arquivo
        link.download = filename;

        // Clica automaticamente no link para iniciar o download
        link.click();
      });
}
