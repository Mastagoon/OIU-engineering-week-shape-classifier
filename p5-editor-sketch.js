let shapeClassifier, canvas, resultsDiv, inputImage

function setup() {
  // init canvas
  canvas = createCanvas(400, 400)
  // ml5 options object
  const options = {
    inputs: [64, 64, 4], // w, h, rgba dimensions.
    task: "imageClassification",
    debug: true,
  }
  shapeClassifier = ml5.neuralNetwork(options)
  // load model
  const modelDetails = {
    model: "model/model-1.json",
    metadata: "model/model_meta-1.json",
    weights: "model/model.weights-1.bin",
  }
  background(255)
  inputImage = createGraphics(64, 64)
  // (details, callback)
  shapeClassifier.load(modelDetails, modelLoaded)
  // just a loading message
  resultDiv = createDiv("loading model...")
}

// run on modal loaded
const modelLoaded = () => {
  console.log("model ready!")
  classifyImage()
}

function draw() {
  //debug:
  // stroke(0)
  // noFill()
  // strokeWeight(4)
  // circle(width/2, height/2, 40)
  // rectMode(CENTER)
  // rect(width/2, height/2, 40)

  // draw on mouse press, like a pencil on MSpaint
  if (mouseIsPressed) {
    strokeWeight(4)
    line(mouseX, mouseY, pmouseX, pmouseY)
  }
}

// callback of shape classification
const gotResults = (err, results) => {
  if (err) return console.log(err.message)
  let label = results[0].label
  let confidence = nf(100 * results[0].confidence, 2, 2)
  let label1 = results[1].label
  let confidence1 = nf(100 * results[1].confidence, 2, 2)
  resultDiv.html(`${label} ${confidence} <br> ${label1}, ${confidence1}`)
  classifyImage()
}

// image classification
const classifyImage = () => {
  
  inputImage.copy(canvas, 0, 0, 400, 400, 0, 0, 64, 64)
  // image(inputImage, 0, 0)
  shapeClassifier.classify({ image: inputImage }, gotResults)
}

const resetCanvas = () => {
  console.log("Canvas Cleared.")
  background(255)
}
