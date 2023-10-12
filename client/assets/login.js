document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: form.get("username"),
            password: form.get("password")
        })
    }


    const response = await fetch("http://localhost:3000/users/login", options);
    const data = await response.json();
    if (response.status == 200) {
        localStorage.setItem("token", data.token)
        console.log("Logged In")
        window.location.assign("index.html")
    } else {
        alert(data.error);
        window.location.assign("login.html")
    }
})



const videoContainer = document.getElementById('animation-play-hover');
videoContainer.addEventListener('mouseover', () => {
    const video = videoContainer.querySelector('video');
    video.play()
})
videoContainer.addEventListener('mouseout', () => {
    const video = videoContainer.querySelector('video');
    video.pause();
    video.currentTime = 0;
});

function playVideo(video) {
    video.play();
}

function stopVideo(video) {
    video.pause();
    video.currentTime = 0;
}
