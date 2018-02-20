$('#myModal').on('shown.bs.modal', function() {
  $('#myInput').trigger('focus');
});

const $search = $('#search');
const $sendData = $('#saveData');
let data = 'https://examen-laboratoria-sprint-5.herokuapp.com/topics';

$.ajax({
  url: data,
  data: JSON.stringify(data),
  datatype: 'json',
  context: document.body,
  contentType: 'application/json',
  success: function(result) {
    showText(result);
    autocompleteText(result);
  }
}).done(function() {
});

// Muestra todo el contenido
function showText(result) {
  result.forEach(element => {
    // console.log(element);
    let $content = $('#content-text');
    // $content.append(`<div class="styleContent"> <h2>Tema: ${element.content} <p class="totalRespon" data-id=${element.id}>${element.responses_count} respuestas</p></h2>
    // <p>Autor: ${element.author_name}.</p></div>`);

    $content.append(`
                        <tr>
                          <th scope="row" class="totalRespon bg-dark text-light" data-id=${element.id}>${element.id}</th>
                          <td  class="totalRespon">${element.content}</td>
                          <td>${element.author_name}</td>
                          <td>${element.responses_count}</td>
                        </tr>`);
  });
}

function autocompleteText(result) {
  let availableTags = result.map((val) => val.content);
  $('#search').autocomplete({
    source: availableTags
  });
}

// Boton que envia la información al API con un POST
$sendData.click(function() {
  $.post(data,
    {
      author_name: $('#formGroupExampleInput').val(),
      content: $('#exampleFormControlTextarea1').val()
    },
    function(data, status) {
      console.log(data);
      let $content = $('#content-text');
      let firstChil = $('#content-text').eq(0);
      // $(firstChil).prepend(` <h2 data-id=${data.id} data-content=${data.content} data-author_name=${data.author_name}>Tema: ${data.content}</h2>
      //   <p>Autor: ${data.author_name}.</p>`);

      $(firstChil).prepend(`
        <tr>
          <th scope="row" class="totalRespon bg-dark text-light" data-id=${data.id}>${data.id}</th>
          <td class="totalRespon">${data.content}</td>
          <td>${data.author_name}</td>
          <td>0</td>
        </tr>`);
    });
});
 
 
// Cuando el usuario haga click a cualquier etiqueta con la clase  .totalRespon, guardaremos el id
$(document).on('click', '.totalRespon', function() {
  console.log($(this));
  let userId = $(this).data('id');
  console.log($(this).data('id'));
  localStorage.setItem('usuario', userId);
  $(location).attr('href', 'verTopic.html');
});