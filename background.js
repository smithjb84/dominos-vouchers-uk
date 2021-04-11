chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var encoded = encodeURIComponent(request.p);
     fetch('https://www.latestdeals.co.uk/api/dominos/stores?postcode='+request.p);
     fetch('https://www.latestdeals.co.uk/api/dominos/stores?postcode='+request.p)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        sendResponse({failed: "get request failed"});
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
		  sendResponse({success:data.selectedStore.vouchers})
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
    sendResponse({failed: "function broke"});
  });
  
  return true;
});
