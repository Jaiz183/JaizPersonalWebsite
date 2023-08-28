let title = "Jaiz Jeeson";
let speed = 200;
var i = 0;

function typeWriter() {
  if (i < title.length) {
    document.getElementById("title").innerHTML += title[i];
    i++;
  }
  setTimeout(typeWriter, speed);
}

setTimeout(typeWriter, speed);
