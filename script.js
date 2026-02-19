let themeBtn = document.getElementById("themeBtn");
let themeIcon = document.getElementsByClassName("theme-icon")[0];
let body = document.getElementsByTagName("body")[0];
themeBtn.addEventListener("click", (event) => {
    console.log("Dark Theme Event Listener");
    body.classList.toggle("dark-mode");
    themeIcon.innerHTML == "☀️" ?
        (themeIcon.innerHTML = "🌙") :
        (themeIcon.innerHTML = "☀️");
});