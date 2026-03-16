const video = document.getElementById("video")

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream
    })

function capture() {

    const canvas = document.createElement("canvas")

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    canvas.getContext("2d").drawImage(video, 0, 0)

    const data = canvas.toDataURL("image/jpeg")

    // For locaal setup use: http://127.0.0.1:8000/predict
    fetch("https://age-predictor-api.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: data.split(',')[1] })
    })
        .then(res => res.json())
        .then(data => {
            document.getElementById("result").innerText =
                "Predicted Age Range: " + data.age_range
        })
}