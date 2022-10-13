Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="image_captured" src="'+data_uri+'"/>';
    });
};

console.log("ml5 Version: ",ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/EfsEGs9_x/model.json',modelLoaded);

function modelLoaded() {
    console.log("Model is loaded Successfully!");
}

function identify(){
    img = document.getElementById("image_captured");
    classifier.classify(img,gotResult);
}

function gotResult(error , results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("result_label").innerHTML = results[0].label;
        document.getElementById("result_confidence").innerHTML = results[0].confidence.toFixed(3);
    }
}