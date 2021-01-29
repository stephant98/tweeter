
$(document).ready(function() {
  
  $("#tweet-text").on('input', function() {
    
    let $counterVal = $(this).parent().find(".counter");
    let inputVal = $(this).val().length
    let counterSubstraction = (140 - inputVal);
    $counterVal.html(counterSubstraction)
    
    if (counterSubstraction < 0) {
      $counterVal.addClass("negative");
    } else {
      $counterVal.removeClass("negative");
    }
  })

  
})

