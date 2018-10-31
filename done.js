var fromlist = [];
var fromstring = "";

//From stackoverflow
//https://stackoverflow.com/questions/2090551/parse-query-string-in-javascript
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}

function fillList() {
  //Playing with URL values
  let passedval = getQueryVariable("orderlist");
  let newsplit = passedval.split("+");

  //Parse the stored value
  fromstring = localStorage.getItem("storageorderlist");
  if ((fromstring != null) && (fromstring.length > 0)) {
    let mysplit = fromstring.split(" ");
    for (let i = 0; i < mysplit.length; i++) {
      //Loop through the product list and find info
      let prodshort = "";
      for (let j = 0; j < prodlist.length; j++) {
        if (mysplit[i] == prodlist[j].itemnum) {
          prodshort = prodlist[j].itemshort;
          break;
        }
      }
      fromlist[i]={'itemnum': mysplit[i], 'itemshort': prodshort};
    }
  }
}

function showUL() {
  //Clear the UL
  document.getElementById("orderfrom").innerHTML = "";

  //If fromlist is empty, at least diplay "No items"
  //And disable the clear and submit buttons
  //Otherwise, enable the clear and submit buttons
  if (fromlist.length > 0) {
    document.getElementById("statusmess").innerHTML = "Your Order";
    document.getElementById("statusmess").style.color = "black";
  } else {
    document.getElementById("statusmess").innerHTML = "You have not ordered anything";
    document.getElementById("statusmess").style.color = "blue";
  }

  for (let i = 0; i < fromlist.length; i++) {
    let oneli = document.createElement("li");
    let someitem = document.createTextNode("Item #" + fromlist[i].itemnum + " " + fromlist[i].itemshort);
    oneli.appendChild(someitem);
    //newli.onclick = deleteItem(fromlist[i].itemnum);
    document.getElementById("orderfrom").appendChild(oneli);
  }

}

fillList();
showUL();
