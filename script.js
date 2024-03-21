document.addEventListener("DOMContentLoaded", function () {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            var audio = new Audio();
            var selectedSong = 0;
            const poster = document.querySelector(".left");
            var play = document.querySelector("#play");
            var back = document.querySelector("#back");
            var next = document.querySelector("#next");
            var progressBar = document.querySelector("#progress-bar");
            var flag = 0;

            function mainFunc() {
                var clutter = "";
                data.forEach(function (elem, index) {
                    clutter += `
                        <div class="song-card" id="${index}">
                            <div class="part-1">
                                <img src="${elem.logo}" alt="">
                                <h2>${elem.name}</h2>
                            </div>
                            <h6>${elem.duration}</h6>
                        </div>`;
                });

                document.querySelector(".all-songs").innerHTML = clutter;
                audio.src = data[selectedSong].url;
                poster.innerHTML = `<img src="${data[selectedSong].logo}" alt="">`;
            }
            mainFunc();

            function playNextSong() {
                if (selectedSong < data.length - 1) {
                    selectedSong++;
                    mainFunc();
                    audio.play();
                    back.style.opacity = 1;
                } else {
                    next.style.opacity = 0;
                }
            }

            document.querySelector(".all-songs").addEventListener("click", function (e) {
                selectedSong = parseInt(e.target.closest('.song-card').id);
                mainFunc();
                play.innerHTML = `<i class='bx bx-pause'></i>`;
                flag = 1;
                audio.play();
            });

            play.addEventListener("click", function () {
                if (flag === 0) {
                    play.innerHTML = `<i class='bx bx-pause'></i>`;
                    mainFunc();
                    audio.play();
                    flag = 1;
                } else {
                    play.innerHTML = `<i class='bx bx-play'></i>`;
                    mainFunc();
                    audio.pause();
                    flag = 0;
                }
            });

            next.addEventListener("click", function () {
                playNextSong();
            });

            back.addEventListener("click", function () {
                if (selectedSong > 0) {
                    selectedSong--;
                    mainFunc();
                    audio.play();
                    next.style.opacity = 1;
                } else {
                    back.style.opacity = 0;
                }
            });

            // Update progress bar as the song plays
            audio.addEventListener('timeupdate', function() {
                var percentComplete = (audio.currentTime / audio.duration) * 100;
                progressBar.style.width = percentComplete + '%';
            });

            // Play next song automatically when the current song ends
            audio.addEventListener('ended', function() {
                playNextSong();
            });
        });
});
