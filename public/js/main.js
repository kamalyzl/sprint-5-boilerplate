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
    $('#search').on('keyup', function() {
      var value = $(this).val().toLowerCase();
      $('#content-text tr').filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  }
}).done(function() {
});

// Muestra todo el contenido
function showText(result) {
  result.forEach(element => {  
    let $content = $('#content-text');

    $content.append(`   <tr>
                          <th scope="row" class="totalRespon bg-dark text-light" data-responses=${element.content} data-id=${element.id}>${element.id}</th>
                          <td class="totalRespon" data-id=${element.id}>${element.content}</td>
                          <td>${element.author_name}</td>
                          <td>${element.responses_count}</td>
                        </tr>`);
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
      $(firstChil).prepend(`
        <tr>
          <th scope="row" class="totalRespon bg-dark text-light" data-id=${data.id}>${data.id}</th>
          <td class="totalRespon" data-id=${data.id}>${data.content}</td>
          <td>${data.author_name}</td>
          <td>0</td>
        </tr>`);
    });
});

// Cuando el usuario haga click a cualquier etiqueta con la clase  .totalRespon, guardaremos el id
$(document).on('click', '.totalRespon', function() {
  console.log($(this));
  let userId = $(this).data('id');
  let content = $(this).data('responses');
  console.log($(this).data('id'));
  console.log($(this).data('responses'));
  localStorage.setItem('usuario', userId);
  localStorage.setItem('title', content);
  $(location).attr('href', 'verTopic.html');
});