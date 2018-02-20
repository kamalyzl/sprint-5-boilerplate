$('#myModal').on('shown.bs.modal', function() {
  $('#myInput').trigger('focus');
});

const $search = $('#search');
let data = 'http://examen-laboratoria-sprint-5.herokuapp.com/topics';

$.ajax({
  url: data,
  data: JSON.stringify(data),
  datatype: 'json',
  context: document.body,
  contentType: 'application/json',
  statusCode: {
    404: function() {
      alert('error');
    }
  },
  success: function(result) {
    showText(result);
    searchTheme(result);
  }
}).done(function() {
  $(this).addClass('done');
});

// Muestra todo el contenido
function showText(result) {
  result.forEach(element => {
    let $content = $('#content-text');
    console.log(element);
    $content.append(` <h2>${element.author_name}  <span class="totalRespon">${element.responses_count} respuestas</span></h2>
    <p>${element.content}.</p>`);
  });
}


$search.submit(function(event) {
  searchTheme(result);
  event.preventDefault();
});

 


