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
    console.log(element);
    let $content = $('#content-text');
    $content.append(` <h2>Por: ${element.author_name}  <span class="totalRespon">${element.responses_count} respuestas</span></h2>
    <p>Descripción: ${element.content}.</p>`);
  });
}

function autocompleteText(result) {
  let availableTags = result.map((val) => val.content);
  $('#search').autocomplete({
    source: availableTags
  });
}


$sendData.click(function() {
  $.post(data,
    {
      author_name: $('#formGroupExampleInput').val(),
      content: $('#exampleFormControlTextarea1').val()
    },
    function(data, status) {
      alert('Data: ' + data + '\nStatus: ' + status);
    });
});