class ComplexNum {
  constructor(real, imaginary) {
    this.real = real;
    this.imaginary = imaginary;
  }

  static add(a, b) {
    return new ComplexNum(a.real + b.real, a.imaginary + b.imaginary);
  }

  static subtract(a, b) {
    return new ComplexNum(a.real - b.real, a.imaginary - b.imaginary);
  }

  static multiply(a, b) {
    let realComponent = 0;
    let imgComponent  = 0;
    realComponent = (a.real * b.real) + (a.imaginary * b.imaginary * -1);
    imgComponent  = (a.real * b.imaginary) + (a.imaginary * b.real);
    return new ComplexNum(realComponent, imgComponent);
  }

  static divide(a, b) {
    let realComponent = 0;
    let imgComponent  = 0;
    // dividing = multiplying by the conjugate (conj b)
    // conjugate of b is b.real + (b.imaginary * -1)
    let bconj = new ComplexNum(b.real, b.imaginary * -1);
    let numerator = ComplexNum.multiply(a, bconj);
    let denominator = ComplexNum.multiply(b, bconj);
    return new ComplexNum(numerator.real / denominator.real,
                          numerator.imaginary / denominator.real);
  }

  static abs(a) {
    return Math.sqrt((a.real * a.real) + (a.imaginary * a.imaginary));
  }

  asStr() {
    if (this.imaginary >= 0) {
      return this.real + ' + ' + this.imaginary + 'i';
    } else {
      return this.real + ' - ' + (this.imaginary * -1) + 'i';
    }
  }
}

function testComplexNums() {
  console.log('testing ComplexNum.abs()');
  console.log(ComplexNum.abs(new ComplexNum(5, 5)));
  let pospos = new ComplexNum(1.481, 123.81462);
  let posneg = new ComplexNum(37.7163, -7328.382);
  let negpos = new ComplexNum(-382.658, 19322.23);
  let negneg = new ComplexNum(-83.28910, -31833.0203);

  console.log('ComplexNum.multiply() tests');
  console.log(ComplexNum.multiply(new ComplexNum(3, 4),
              new ComplexNum(5, 6)).asStr());
  console.log(ComplexNum.multiply(pospos, negneg).asStr());
  console.log('ComplexNum.divide() tests');
  let numerator = new ComplexNum(3, 2);
  let denominator = new ComplexNum(4, -3);
  console.log(numerator.asStr() + ' / ' + denominator.asStr()
              + ' = ' + ComplexNum.divide(numerator, denominator).asStr());
  console.log('ComplexNum basic examples');
  console.log(pospos.asStr());
  console.log(posneg.asStr());
  console.log(negpos.asStr());
  console.log(negneg.asStr());
  console.log('ComplexNum.add() tests');
  console.log(ComplexNum.add(pospos, negpos).asStr());
}
//testComplexNums();

class Mandelbrot {
  static iterationCounter(point) {
    // f(x_(n+1)) = (x_n)^2 + c
    // always start with seed x_0 = 0, c = point
    let MAX_ITER = 256;
    let xc = new ComplexNum(0, 0);
    let xn = new ComplexNum(0, 0);
    let i = 0;

    while (i < MAX_ITER && ComplexNum.abs(xc) <= 2) {
      xn = (ComplexNum.add(ComplexNum.multiply(xc, xc), point));
      xc = xn;
      i++;
    }

    return i;
  }

  static smoothColor(z0, n) {

  }
}

//console.log(Mandelbrot.isInSet(new ComplexNum(0, 0)));

class Graph {
  constructor(width, height, xMin, xMax, yMin, yMax) {
    this.width = width;   // real integer (default 300)
    this.height = height; // real integer (default 400)
    this.xMin = xMin;     // real integer (represents real component
                          // of imaginary left-right plane
    this.xMax = xMax;     // same as above
    this.yMin = yMin;     // real integer (represents imaginary
                          // component of up-down plane
    this.yMax = yMax;     // same as above
  }

  // every pixel's coordinates are decided by its top-left corner.
  // this method calculates the coordinates of a pixel
  // 0, 0 is top-left corner
  // first num is horizontal, second num is vertical
  getCoordsAt(pixX, pixY) {
    let coordWidth = this.xMax - this.xMin;
    let coordHeight = this.yMax - this.yMin;
    let dx = coordWidth / this.width;
    let dy = coordHeight / this.height;
    return new ComplexNum(this.xMin + (pixX * dx),
                             this.yMax - (pixY * dy));
  }

  draw(context, iterationsMax) {
    let imgData = context.createImageData(this.width, this.height);
    let x = 0;
    let y = 0;
    for (y = 0; y < this.height; y++) {
      for (x = 0; x < this.width; x++) {
        let iterations = Mandelbrot.iterationCounter(this.getCoordsAt(x, y));
        if (iterations === 256) {
          Graph.color(imgData, x, y, this.width, 0, 0, 0, 255);
        } else {
          let scalar = 255 - iterations * 5;
          Graph.color(imgData, x, y, this.width,
            scalar, scalar, scalar, scalar);
        }
      }
    }

    context.putImageData(imgData, 0, 0);
  }

  static color(imgData, x, y, width, r, g, b, o) {
    imgData.data[4 * (x + y * width)]     = r;
    imgData.data[4 * (x + y * width) + 1] = g;
    imgData.data[4 * (x + y * width) + 2] = b;
    imgData.data[4 * (x + y * width) + 3] = o;
  }
}
function testGetCoordsAt() {
  let graph = new Graph(400, 300, -2, 2, -1.5, 1.5);
  let i = 0;
  let j = 0;
  for (i = 0; i < 10; i++) {
    for (j = 0; j < 10; j++) {
      console.log(graph.getCoordsAt(j, i).asStr());
    }
  }
}
//testGetCoordsAt();


document.addEventListener('DOMContentLoaded',domloaded,false);
function domloaded(){
  var canvas = document.getElementById('mandelbrot-app');
  var context = canvas.getContext('2d');

  graph = new Graph(400, 300, -2.5, 1.5, -1.5, 1.5);
  graph.draw(context);

  var button = document.getElementById('zoom-button');
  button.onclick = function() {
    // alert('hi');
    let centerCoords = graph.getCoordsAt(graph.width/2, graph.height/2);
    graph = new Graph(graph.width, graph.height,
      graph.xMin * 0.9, graph.xMax * 0.9,
      graph.yMin * 0.9, graph.yMax * 0.9);

    graph.draw(context);
  }

  //loadImage('images/mandelbrot.jpg', 0, 0, 400, 300);
}
