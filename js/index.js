$(document).ready(function(){


  // Draws circle graph
  function drawGraph(initial) {
    var val = initial;
    if (isNaN(initial)) {
      val = parseInt(Math.floor(Math.random() * 100));
    }
    var oldVal = $('.percent').attr('data-pct');  
    var $circle = $('#svg #bar');
    var r = $circle.attr('r');
    var c = Math.PI*(r*2);
   
    if (val < 0) { val = 0;}
    if (val > 100) { val = 100;}
    
    var pct = ((100-val)/100)*c;
    
    $circle.css({ strokeDashoffset: pct});
      // $('#cont').attr('data-pct',val);
    function count(oldVal, val) {
      var totalGain = $('.percent')//$(graph).find('.total-gain');
      var i = oldVal
      var time = 1000;
      var difference = (val - oldVal)
      var intervalTime = Math.abs(time / difference);
      var timerID = 0;
      if (difference > 0) {
          var timerID = setInterval(function () {
              i++;
              totalGain.attr('data-pct', i);
              if (i === val) clearInterval(timerID);
          }, intervalTime);
      } else if (difference < 0) {
          var timerID = setInterval(function () {
              i--;
              totalGain.attr('data-pct', i);
              if (i === val) clearInterval(timerID);
          }, intervalTime);
      }
    }
    count(oldVal, val);
  }

  function actualizeBeerduino() {
    $('.login-wrapper').css("display", "none");
    $('.data').css("display", "block");
    $('.user').text("Felix $$").css("opacity", "1");
    // For testing purposes
    // py needs a getBAC(user) function -----------
    drawGraph(79);
    $('#cont').on('click', function(){
      drawGraph(); 
    });
  }

  // Parses cookie
  function getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i=0; i<ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1);
          if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
      }
      return "";
  }

  function deleteCookie(cname) {
    // Does not take in input--Currently hard coded
    document.cookie = 'ID=FELIXEKN; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  function menuShow() {
    $('.user-pop-up-wrapper').css("display", "block");
  }

  function menuHide() {
    if ($('.user-pop-up-wrapper').css("display") == 'block') {
      $('.user-pop-up-wrapper').css("display", "none");
    }
  }

  //-------Handles login---------
  function login() {
    // -----------py needs getUser($('.ID').val()) function-----------------
    if ($('.ID').val().toUpperCase() == "FELIXEKN") {
      actualizeBeerduino();
      var d = new Date();
      d.setTime(d.getTime() + (1*24*60*60*1000));
      var expires = "expires="+d.toUTCString();
      document.cookie="ID=FELIXEKN";
    }
    else {
      $('.ID').val("")
      $('.ID').attr("placeholder", "Already too drunk?");
    }
  }

  // Checks for applicable cookie login
  (function() {
    var user = getCookie("ID");
    if (user != "") {
        actualizeBeerduino();
    }
  })();

  // // Login listeners for when no user cookie is found--------------
  $(".ID").keyup(function(event) {
    if(event.keyCode == 13){
      login();   
    }
  });
  $('.login .title').on('click', function() {
    login();
  });
  $('.user').on('click', function() {
    menuShow();
    event.stopPropagation();
  });
  $('html').on('click', function() {
    menuHide();
  });
  $('#logout').on('click', function() {
    deleteCookie('dummyVar');
    location.reload();
  });
});