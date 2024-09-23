
//step 1: get DOM

let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let movienameDom = document.querySelector('.moviename');
let SliderDom = movienameDom.querySelector('.moviename .list');
let thumbnailBorderDom = document.querySelector('.moviename .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.moviename .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.moviename .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.moviename .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        movienameDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        movienameDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        movienameDom.classList.remove('next');
        movienameDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}

//login-button
document.getElementById("login-btn").addEventListener("click", function() {
    window.open ("/login/siginup.html");
});




//Details-Buttons

document.getElementById("Details").addEventListener("click", function() {
    window.open ("/login/siginup.html");
});
document.getElementById("Details1").addEventListener("click", function() {
    window.open ("/login/siginup.html");
});
document.getElementById("Details2").addEventListener("click", function() {
    window.open ("/login/siginup.html");
});
document.getElementById("Details3").addEventListener("click", function() {
    window.open ("/login/siginup.html");
});