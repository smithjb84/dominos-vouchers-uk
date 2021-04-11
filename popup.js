var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-144828263-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();


chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {

            var tab = tabs[0];
          var url = new URL(tab.url);
          var domain = url.hostname;
          //console.log(domain);

          if(domain === "www.dominos.co.uk") {

              chrome.tabs.sendMessage(tabs[0].id, {start: "start"}, function (response) {
                  var postcode = response.p;
                  $("#results-area").append("<img src='loader.gif' class='pizza-center' height='60px' width='60px'>");

                  chrome.runtime.sendMessage({p: postcode}, function (response) {
                      if ('success' in response) {
                          document.getElementById("results-area").innerHTML = "";
                          for (var key in response.success) {
                              if (('description' in response.success[key])) {
                                  var html = `
				<div class="result mb-2">
				<h4>${key}</h4>
				<p>${response.success[key]["description"]}</p>
				<button id="${key}" type="button" class="apply-btn btn btn-primary voucher-submit">Apply</button>
				</div>
				`;
                                  $("#results-area").append(html);
                              }
                          }
                      }
                      if ('failed' in response) {
                          document.getElementById("results-area").innerHTML = "";
                          var html = `
				<div class="result mb-2">
				<h4>Oops!</h4>
				<p>looks like something went wrong. Please check the postcode or try again later</p>
				</div>
				`;
                          $("#results-area").append(html);
                      }

                  });
              });
          }
    });



var input = document.getElementById("postcode");
$( "#postcode" ).focus();

input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("postcode-submit").click();
  }
});



$("#postcode-submit").click(function(){
		var postcode = $("#postcode").val();
		document.getElementById("results-area").innerHTML = "";
		$("#results-area").append("<img src='loader.gif' class='pizza-center' height='60px' width='60px'>");

	  chrome.runtime.sendMessage({p: postcode}, function(response) {
	  	if('success' in response) {
	  		document.getElementById("results-area").innerHTML = "";
            for (var key in response.success) {
                if (('description' in response.success[key])) {
				var html = `
				<div class="result mb-2">
				<h4>${key}</h4>
				<p>${response.success[key]["description"]}</p>
				<button id="${key}" type="button" class="apply-btn btn btn-primary voucher-submit">Apply</button>
				</div>
				`;
				$("#results-area").append(html);
                }
            }
        }
        if('failed' in response) {
        	document.getElementById("results-area").innerHTML = "";
        	var html = `
				<div class="result mb-2">
				<h4>Oops!</h4>
				<p>looks like something went wrong. Please check the postcode or try again later</p>
				</div>
				`;
				$("#results-area").append(html);
        }

	});
});

$(document).on('click', '.voucher-submit', function() {
	var code = $(this).attr('id');
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        $('[id="'+code+'"]').attr('disabled','');
        $('[id="'+code+'"]').text("");
        $('[id="'+code+'"]').append("<img src='loader-black.gif' class='button-center' height='20px' width='20px'>");
	  chrome.tabs.sendMessage(tabs[0].id, {message: code}, function(response){
	      //console.log(response);
	      $('[id="'+code+'"]').removeAttr('disabled');
	      $('[id="'+code+'"]').text("Apply");
      });
	});
});
