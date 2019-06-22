var questions = {
  'Where would you go if you wanted to see a whale?': [
    'ALberta',
    'British Columbia',
    'Saskatchewan',0
  ]
};


$('#form-trivia input').on('change', function() {
  alert($('input[name=radioName]:checked', '#form-trivia').val());
});

//$('input:radio[name=sex]:checked').val();