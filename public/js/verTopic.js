
let answer = `http://examen-laboratoria-sprint-5.herokuapp.com/topics/${localStorage.usuario}/responses`;
getParameterByName('kamaly');

$.ajax({
  url: answer,
  data: JSON.stringify(answer),
  datatype: 'json',
  context: document.body,
  contentType: 'application/json',
  success: function (result) {
    console.log(result);
    showText(result);
    // autocompleteText(result);
  }
}).done(function () {
});


// Muestra todo el contenido
function showText(result) {
  result.forEach(element => {
    // console.log(element);
    let $content = $('#content-text');
    $content.append(`<h5>Comentario: ${element.content} </h5>
    <p>Por: ${element.author_name}.</p>`);
  });
}