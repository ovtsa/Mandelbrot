document.addEventListener('DOMContentLoaded',domloaded,false);
function domloaded(){
  var canvas = document.getElementById('mandelbrot-app');
  var context = canvas.getContext('2d');

  function loadImage(imageSrc, x, y, width, height) {
      var image = new Image();
      image.src = imageSrc;
      image.onload = function() {
          context.drawImage(image, x, y, width, height);
      }
  }

  loadImage('images/mandelbrot.jpg', 0, 0, 400, 300);
}
