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

    // For local setup use: http://127.0.0.1:8000/predict or http://localhost:8000/predict
    fetch("https://age-prediction-app.onrender.com", {
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