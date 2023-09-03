var title = "";
let speed = 250;
var i = 0;

document.addEventListener("readystatechange", function () {
  if (document.readyState === "complete") {
    init();
    setTimeout(typeWriter, speed);
  }
});

function init() {
  title = document.getElementById("title").innerHTML;
  document.getElementById("title").innerHTML = "";
}

function typeWriter() {
  if (i < title.length) {
    document.getElementById("title").innerHTML += title[i];
    i++;
  }
  setTimeout(typeWriter, speed);
}
