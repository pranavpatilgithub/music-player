var arr = [
    { songName: "Middle of the night", url: "middle of the night.m4a", img: "middle of the night.jpeg", duration: "2:04" },
    { songName: "Gangsta Paradise", url: "gangsta's paradise.m4a", img: "gangsta's paradise.jpeg", duration: "5:04" },
    { songName: "Lie down", url: "lie down.m4a", img: "lie down.jpeg", duration: "2:64" },
    { songName: "fresh(slowed)", url: "fresh(slowed).m4a", img: "fresh(slowed).jpeg", duration: "2:14" }
]

var audio = new Audio()
var selectedSong = 0;
const poster = document.querySelector(".left");
var play = document.querySelector("#play");
var back = document.querySelector("#back")
var next = document.querySelector("#next")
var flag = 0


function mainFunc() {
    var clutter = ""

    arr.forEach(function (elem, index) {
        clutter += `  <div class="song-card" id="${index}">
    <div class="part-1">
        <img src="${elem.img}" alt="">
        <h2>${elem.songName}</h2>
    </div>
    <h6>${elem.duration}</h6>
</div>`
    })

    document.querySelector(".all-songs").innerHTML = clutter;
    audio.src = arr[selectedSong].url;
    poster.innerHTML = `<img src="${arr[selectedSong].img}" alt="">`
    
}
mainFunc()

document.querySelector(".all-songs").addEventListener("click", function (e) {
    selectedSong = e.target.id
    mainFunc();
    play.innerHTML = `<i class='bx bx-pause'></i>`
    flag = 1
    audio.play()
})



play.addEventListener("click",function(){
    if(flag == 0){
        play.innerHTML = `<i class='bx bx-pause'></i>`
        mainFunc()
        audio.play()
        flag = 1
    }
    else{
        play.innerHTML = `<i class='bx bx-play'></i>`
        mainFunc()
        audio.pause()
        flag = 0
    }
})

next.addEventListener("click" , function(){
    if(selectedSong < arr.length -1){
        selectedSong++
        mainFunc()
        audio.play()
        back.style.opacity = 1
    }
    else{
        next.style.opacity = 0
        
    }
})

back.addEventListener("click" , function(){
    if(selectedSong > 0 ){
        selectedSong--
        mainFunc()
        audio.play()
        next.style.opacity = 1
    }
    else{
        back.style.opacity = 0
        
    }
})
