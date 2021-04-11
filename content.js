
function getCookieValue(a) {
    var b = document.cookie.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

  if ("message" in request) {
        
      var XSRF = getCookieValue("XSRF-TOKEN");

      fetch("https://www.dominos.co.uk/Basket/AddVoucherCodeResponsive", {
          "credentials": "include",
          "headers": {
              "accept": "application/json, text/plain, */*",
              "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
              "content-type": "application/json;charset=UTF-8",
              "x-newrelic-id": "XAIOVFNRGwEAVVBTBgMP",
              "x-requested-with": "XMLHttpRequest",
              "x-xsrf-token": "" + XSRF + ""
          },
          "referrer": "https://www.dominos.co.uk/basketdetails/show",
          "referrerPolicy": "no-referrer-when-downgrade",
          "body": "{\"VoucherCode\":\"" + request.message + "\",\"Force\":false,\"applyUnqualifiedVouchers\":true,\"swapVouchersEnum\":\"CheckSwap\"}",
          "method": "POST",
          "mode": "cors"
      });
      fetch("https://www.dominos.co.uk/Basket/AddVoucherCodeResponsive", {
          "credentials": "include",
          "headers": {
              "accept": "application/json, text/plain, */*",
              "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
              "content-type": "application/json;charset=UTF-8",
              "x-newrelic-id": "XAIOVFNRGwEAVVBTBgMP",
              "x-requested-with": "XMLHttpRequest",
              "x-xsrf-token": "" + XSRF + ""
          },
          "referrer": "https://www.dominos.co.uk/basketdetails/show",
          "referrerPolicy": "no-referrer-when-downgrade",
          "body": "{\"VoucherCode\":\"" + request.message + "\",\"Force\":true,\"applyUnqualifiedVouchers\":true}",
          "method": "POST",
          "mode": "cors"
      });
      fetch("https://www.dominos.co.uk/Basket/AddVoucherCodeResponsive", {
          "credentials": "include",
          "headers": {
              "accept": "application/json, text/plain, */*",
              "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
              "content-type": "application/json;charset=UTF-8",
              "x-newrelic-id": "XAIOVFNRGwEAVVBTBgMP",
              "x-requested-with": "XMLHttpRequest",
              "x-xsrf-token": "" + XSRF + ""
          },
          "referrer": "https://www.dominos.co.uk/basketdetails/show",
          "referrerPolicy": "no-referrer-when-downgrade",
          "body": "{\"VoucherCode\":\"" + request.message + "\",\"Force\":false,\"applyUnqualifiedVouchers\":true,\"swapVouchersEnum\":\"SwapVouchers\"}",
          "method": "POST",
          "mode": "cors"
      });
      setTimeout(pageReload, 2000);

      function pageReload() {
          window.location.reload();
            sendResponse({applied: "unload"});
      }
    }
    if ("start" in request) {
        var content = document.head.innerHTML;
        var lines = content.split("\n");
        for(var i = 0;i < lines.length;i++){
            if(lines[i].includes("postcode")){
                var line = lines[i];
                var postcode = line.split("\"")[3];
                //console.log(postcode);
                sendResponse({p: postcode})
            }
        }

    }
    return true;
  });

