var orderlist = [];

function zoomIn(numIn) {

  let element = document.getElementById("overlay");
  if (element.style.visibility == "visible") {
    return;
  }

  element.innerHTML = "";
  element.style.visibility = "visible";

  for (let i = 0; i < prodlist.length; i++) {
    if (prodlist[i].itemnum == numIn) {
      let addtext = "<p>Item #" + prodlist[i].itemnum + "</p>" +
      "<img src='" + prodlist[i].itemimg + "' width=300>" +
      "<p>" + prodlist[i].itemdesc + "</p>";
      element.insertAdjacentHTML('afterbegin', addtext);
      break;
    }
  }

  let mousex = event.clientX;
  let mousey = event.clientY;
  let elementheight = element.clientHeight;
  let elementwidth = element.clientWidth;
  let windowwidth = window.innerWidth;

  if ((mousex < elementwidth) && (mousey < elementheight)){
    //Doesn't fit on the left side
    //See if fits on the right side
    //i.e. smaller that windowwidth - elementwidth
    console.log("Trying right");
    if ((mousex > (windowwidth-elementwidth)) && (mousey < elementheight)) {
      console.log("Right not ok");
      element.style.visibility = "hidden";
    } else {
      console.log("Right ok");
      //Doesn't fit
      element.style.left = "" + (windowwidth-elementwidth) + "px";
    }
  } else {
    //element.style.left = "0px";
    console.log("Left ok");
    element.style.left = "0px";
  }
}

function zoomOut() {
  var element = document.getElementById("overlay");
  element.style.visibility = "hidden";
}

function addItem(newitemnum) {

  zoomOut();

  //Add the item to the orderlist
  for (let i = 0; i < prodlist.length; i++) {
    if (prodlist[i].itemnum == newitemnum) {
      //Add it
      orderlist.push(prodlist[i]);
      //Remove it
      prodlist.splice(i, 1);
      break;
    }
  }

  sortUL();
  sortGrid();

  showUL();
  showGrid();

}

function showUL() {
  //Clear the UL
  document.getElementById("orderfull").innerHTML = "";

  //If orderlist is empty, at least diplay "No items"
  //And disable the clear and submit buttons
  //Otherwise, enable the clear and submit buttons
  if (orderlist.length > 0) {
    document.getElementById("clearme").disabled = false;
    document.getElementById("submitme").disabled = false;
    document.getElementById("clearme").style.opacity = 1;
    document.getElementById("clearme").style.cursor = "allowed";
    document.getElementById("submitme").style.opacity = 1;
    document.getElementById("submitme").style.cursor = "allowed";
    document.getElementById("statusmessage").innerHTML = "Your Order";
    document.getElementById("statusmessage").style.color = "black";

  } else {
    document.getElementById("clearme").disabled = true;
    document.getElementById("submitme").disabled = true;
    document.getElementById("clearme").style.opacity = 0.25;
    document.getElementById("clearme").style.cursor = "not-allowed";
    document.getElementById("submitme").style.opacity = 0.25;
    document.getElementById("submitme").style.cursor = "not-allowed";
    document.getElementById("statusmessage").innerHTML = "Click on a page below to add to order";
    document.getElementById("statusmessage").style.color = "blue";
  }

  let buildlist = "";

  for (let i = 0; i < orderlist.length; i++) {
    let newli = document.createElement("li");
    let fullitem = document.createTextNode("Item #" + orderlist[i].itemnum + " " + orderlist[i].itemname);
    newli.appendChild(fullitem);
    //newli.onclick = deleteItem(orderlist[i].itemnum);
    document.getElementById("orderfull").appendChild(newli);
    if (buildlist == "") {
      buildlist = orderlist[i].itemnum;
    } else {
      buildlist = buildlist+ " " + orderlist[i].itemnum;
    }
  }

  document.getElementById("hiddenlist").value = buildlist;
  localStorage.setItem("storageorderlist", buildlist);
}

function showGrid() {
  //Clear the grid
  document.getElementById("productlist").innerHTML = "";

  for (let i = 0; i < prodlist.length; i++) {
    let newdiv = document.createElement("div");
    newdiv.id = prodlist[i].itemnum;
    newdiv.onclick = function(){addItem(prodlist[i].itemnum)};
    document.getElementById("productlist").appendChild(newdiv);
    let fullitem = ("<p> Item #" +
      prodlist[i].itemnum + "</p>" +
      "<img src='" + prodlist[i].itemimg + "' width=100 " +
      "onmousemove='zoomIn(" + prodlist[i].itemnum + ")' " +
      "onmouseout='zoomOut()'>" +
      "<p>" + prodlist[i].itemshort + "</p>");
    newdiv.insertAdjacentHTML('afterbegin', fullitem);
  }

}

function moveGridToUL(itemnumclicked) {

    showUL();
    showGrid();
}

function clickGrid() {

  sortUL();
  sortGrid();

  showUL();
  showGrid();
}

function clearList() {

  orderlist = [];
  prodlist = [];

  for (let i = 0; i<savedlist.length; i++) {
      prodlist[i] = {};
      for (let prop in savedlist[i]) {
          prodlist[i][prop] = savedlist[i][prop];
      }
  }

  sortUL();
  sortGrid();

  showUL();
  showGrid();
}

//Copied from stackoverflow.com
//https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
function dynamicSort(property) {
    let sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    };
}

function sortUL() {
  orderlist = orderlist.sort(dynamicSort("itemnum"));
}

function sortGrid() {
  prodlist = prodlist.sort(dynamicSort("itemnum"));
}

function startPage() {

  showUL();
  showGrid();

  //Disable clean and submit buttons
  document.getElementById("clearme").disabled = true;
  document.getElementById("submitme").disabled = true;
  document.getElementById("clearme").style.opacity = 0.25;
  document.getElementById("clearme").style.cursor = "not-allowed";
  document.getElementById("submitme").style.opacity = 0.25;
  document.getElementById("submitme").style.cursor = "not-allowed";

}
