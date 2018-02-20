// API
let answer = `https://examen-laboratoria-sprint-5.herokuapp.com/topics/${localStorage.usuario}/responses`;
let $sendComent = $('#sendComent');
getParameterByName('kamaly');

$.ajax({
  url: answer,
  data: JSON.stringify(answer),
  datatype: 'json',
  context: document.body,
  contentType: 'application/json',
  success: function(result) {
    console.log(result);
    showText(result);
    // autocompleteText(result);
  }
}).done(function() {
});

// Muestra todo el contenido
function showText(result) {
  result.forEach(element => {
    // console.log(element);
    let $content = $('#content-text');
    let $title = $('#title');
    $content.append(
      `<div class="col-2">${element.author_name} dice</div>
    <div class="col-10">${element.content}</div>`);

    $title.html(`<<h1>${localStorage.title}</h1>`);
  });
}


// Boton que envia la información sobre los comentarios a la API mediante un POST
$sendComent.click(function() {
  $.post(answer,
    {
      author_name: $('#nameAnswer').val(),
      content: $('#comentText').val()
    },
    function(data, status) {
      console.log(data);
      let $content = $('#content-text');
      // let firstChil = $('#content-text').eq(0);
      $content.append(`
       <div class="col-3">${data.author_name} dice : </div>
      <div class="col-8">${data.content}</div> `);
    });
});