var chart2;
var chart3;
var notas = [];
var countAlunos = 0;
var Scount_alunos = document.getElementById("count_alunos");

function atualizarGrafico(event) {
  event.preventDefault();

  // Obtem os valores do formulário
  var select1 = document.getElementById("nota1");
  var select2 = document.getElementById("nota2");
  var select3 = document.getElementById("nota3");
  var select4 = document.getElementById("nota4");
  var select5 = document.getElementById("nota5");

  var nota1 = parseFloat(select1.options[select1.selectedIndex].value);
  var nota2 = parseFloat(select2.options[select2.selectedIndex].value);
  var nota3 = parseFloat(select3.options[select3.selectedIndex].value);
  var nota4 = parseFloat(select4.options[select4.selectedIndex].value);
  var nota5 = parseFloat(select5.options[select5.selectedIndex].value);


  var notas_aluno = [];
        notas_aluno.push(nota1);
        notas_aluno.push(nota2);
        notas_aluno.push(nota3);
        notas_aluno.push(nota4);
        notas_aluno.push(nota5);
        notas.push(notas_aluno);

    countAlunos += 1;
    Scount_alunos.innerText = "";
    Scount_alunos.append(countAlunos);


  // Verifique se as notas são válidas
  if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3) || isNaN(nota4) || isNaN(nota5)) {
    alert('Insira valores numéricos para as notas.');
    return;
  }


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


    // Obtem os valores do formulário
  var select1 = document.getElementById("nota1");
  var select2 = document.getElementById("nota2");
  var select3 = document.getElementById("nota3");
  var select4 = document.getElementById("nota4");
  var select5 = document.getElementById("nota5");

  var note1 = parseInt(select1.options[select1.selectedIndex].value);
  var note2 = parseInt(select2.options[select2.selectedIndex].value);
  var note3 = parseInt(select3.options[select3.selectedIndex].value);
  var note4 = parseInt(select4.options[select4.selectedIndex].value);
  var note5 = parseInt(select5.options[select5.selectedIndex].value);

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
      canvas.width = 1800; // Largura aumentada para 1500px
      canvas.height = 1500; // Altura aumentada para 1000px

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
      return false;
}




function gerarGraficoTurma(){
    // console.log(notas);

    var somaGeral_1 = 0;
    var somaGeral_2 = 0;
    var somaGeral_3 = 0;
    var somaGeral_4 = 0;
    var somaGeral_5 = 0;

    var mediaGeral_1 = 0;
    var mediaGeral_2 = 0;
    var mediaGeral_3 = 0;
    var mediaGeral_4 = 0;
    var mediaGeral_5 = 0;

    for(var i =0;i<notas.length;i++){
        somaGeral_1 += notas[i][0];
    }
    for(var i =0;i<notas.length;i++){
      somaGeral_2 += notas[i][1];
    }
    for(var i =0;i<notas.length;i++){
      somaGeral_3 += notas[i][2];
    }
    for(var i =0;i<notas.length;i++){
      somaGeral_4 += notas[i][3];
    }
    for(var i =0;i<notas.length;i++){
      somaGeral_5 += notas[i][4];
    }

    var qtdAlunos = notas.length;

    mediaGeral_1 = (somaGeral_1 / qtdAlunos);
    mediaGeral_2 = (somaGeral_2 / qtdAlunos);
    mediaGeral_3 = (somaGeral_3 / qtdAlunos);
    mediaGeral_4 = (somaGeral_4 / qtdAlunos);
    mediaGeral_5 = (somaGeral_5 / qtdAlunos);

    var somaMediaGeral = (mediaGeral_1 + mediaGeral_2 + mediaGeral_3 + mediaGeral_4 + mediaGeral_5);

    Pmediag1 =((mediaGeral_1 / somaMediaGeral) * 100).toFixed(1);
    Pmediag2 = ((mediaGeral_2 / somaMediaGeral) * 100).toFixed(1);
    Pmediag3 = ((mediaGeral_3 / somaMediaGeral) * 100).toFixed(1);
    Pmediag4 = ((mediaGeral_4 / somaMediaGeral) * 100).toFixed(1);
    Pmediag5 = ((mediaGeral_5 / somaMediaGeral) * 100).toFixed(1);


    // Atualize o gráfico de pizza
  var valores = [Pmediag1, Pmediag2, Pmediag3, Pmediag4, Pmediag5];
  var cores = ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff'];

  if (chart3) {
    chart3.destroy();
  }

  //Notas convertidas para 2 casas


  var ctx = document.getElementById('chart3').getContext('2d');
  chart3 = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Nota 1(' + Pmediag1 + '%)', 'Nota 2(' + Pmediag2 + '%)', 'Nota 3(' + Pmediag3 + '%)', 'Nota 4(' + Pmediag4 + '%)', 'Nota 5(' + Pmediag5 + '%)'],
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


    // grafico de barras geral da turma
    var chartv2 = document.getElementById("chartv2");
    var bars2 = document.getElementById("bars2");

    bars2.innerHTML = ""; // Limpa as barras existentes

    var notes = [mediaGeral_1, mediaGeral_2, mediaGeral_3, mediaGeral_4, mediaGeral_5];

    for (var i = 0; i < notes.length; i++) {
      var bar = document.createElement("div");
      bar.className = "bar";
      bar.style.height = (notes[i] / 10) * 100 + "%";
      bars2.appendChild(bar);
    }

    // Edita o elemento de data nos graficos gerais da turma
    var data = document.getElementById("date-id");
    var getData = data.value;
    var Sdate = document.getElementById("Sdate");
    Sdate.innerText = getData;

    // Edita o valor da Media geral nos graficos da turma
    var SmediaGeral = document.getElementById("SmediaGeral");
    var mediaTotalGeral = (somaMediaGeral / 5).toFixed(1);
    SmediaGeral.innerText = mediaTotalGeral;

    // Edita a disciplina no campo dos graficos gerais
    var Sdisciplina = document.getElementById("Sdisciplina");
    Sdisciplina.innerText = document.getElementById("course-name").value;
  }





function saveAsJPEG2() {
  var content = document.getElementById("pdf2");

  // Cria um novo elemento de tela para renderizar a imagem
  var canvas = document.createElement("canvas");
  canvas.width = 1800; 
  canvas.height = 1500; 

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

    var studentName = document.getElementById("course-name").value;

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
    var link = document.getElementById("jpeg-link2");

    // Define a URL da imagem JPEG como o atributo "href" do link
    link.href = jpegURL;

    // Define o nome do arquivo
    link.download = filename;

    // Clica automaticamente no link para iniciar o download
    link.click();
  });
  return false;
}
