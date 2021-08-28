const circles = []
const squares = []
const triangles = []
let shapeClassifer

// pre-load all the images
function preload () {
    for(i = 0; i < 100; i++) {
        const index = nf(i+1, 4, 0) // format the numbers from {i} to {000i}+
        circles[i] = loadImage(`./data/circle${index}.png`)
        triangles[i] = loadImage(`./data/triangle${index}.png`)
        squares[i] = loadImage(`./data/square${index}.png`)
    }
}


// setup
function setup() {
    createCanvas(400,400)   // craete canvas
    // ml5 options object
    const options = {
        inputs: [128, 128, 4],  // w, h, rgba dimensions.
        task: 'imageClassification',
        debug: true
    }
    shapeClassifer = ml5.neuralNetwork(options)
    for(i = 0; i < circles.length; i++) {
        // addData(input, target)
        shapeClassifer.addData({ image: circles[i] }, { label: "دائرة" })
        shapeClassifer.addData({ image: squares[i] }, { label: "مربّع" })
        shapeClassifer.addData({ image: triangles[i] }, { label: "مثلّث" })
    }
    // Normalize data ml5 function looks at the min & max ranges of pixle values
    // and normalizes them to 0 ~ 1
    shapeClassifer.normalizeData() 
    shapeClassifer.train({ epochs: 60 }, finishedTraining)
}

function finishedTraining() {
    console.log("Training is done!")
    shapeClassifer.save()
}