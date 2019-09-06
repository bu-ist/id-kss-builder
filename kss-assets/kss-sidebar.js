function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    document.getElementById("id-kss-sidebar").innerHTML =
    this.responseText;
    }
  };
  xhttp.open("GET", "index.html#id-homepage-nav", true);
  xhttp.send();
}

loadDoc();