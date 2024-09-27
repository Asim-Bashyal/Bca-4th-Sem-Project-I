// Step 1: Get DOM elements
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

nextDom.onclick = function () {
    showSlider('next');
}

prevDom.onclick = function () {
    showSlider('prev');
}

let runTimeOut;
let runNextAuto = setTimeout(() => {
    nextDom.click(); // Corrected the element reference
}, timeAutoNext);

function showSlider(type) {
    let SliderItemsDom = SliderDom.querySelectorAll('.moviename .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.moviename .thumbnail .item');

    if (type === 'next') {
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        movienameDom.classList.add('next');
    } else {
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
        nextDom.click(); // Corrected the element reference
    }, timeAutoNext);
}

// Login button


// Details Buttons
// document.getElementById("Details").addEventListener("click", function() {
//     window.location.href = "/login/siginup.html"; // Change this to your actual sign-in route
// });
// document.getElementById("Details1").addEventListener("click", function() {
//     window.location.href = "/login/siginup.html"; // Change this to your actual sign-in route
// });
// document.getElementById("Details2").addEventListener("click", function() {
//     window.location.href = "/login/siginup.html"; // Change this to your actual sign-in route
// });
// document.getElementById("Details3").addEventListener("click", function() {
//     window.location.href = "/login/signin.html"; // Change this to your actual sign-in route
// });


document.querySelectorAll(".buttons").forEach(btn => {
    btn.addEventListener("click", function () {

       const hasLoggedIn= localStorage.getItem("hasLoggedIn")
       if(hasLoggedIn){
        window.location.href = "../Movie_Book_Page/Book_page.html"; // Change this to your actual sign-in route
       }else{
        window.location.href = "../login/siginup.html"; // Change this to your actual sign-in route
        
       }

    });
})


const removeLoginCredentialsInLS=()=>{
    localStorage.removeItem("hasLoggedIn")
};
    



const isUserLoggedIn= localStorage.getItem("hasLoggedIn");

if(isUserLoggedIn){
    document.querySelector("#login-btn").innerHTML="Sign out";
    document.querySelector("#login-btn").addEventListener("click",(e)=>{
        removeLoginCredentialsInLS()
        document.querySelector("#login-btn").innerHTML="Login";
        document.getElementById("login-btn").addEventListener("click", function () {
            window.location.href = "/login/siginup.html"; // Change this to your actual sign-in route
        });
    })
    

}else{
    document.querySelector("#login-btn").innerHTML="Login";
    document.getElementById("login-btn").addEventListener("click", function () {
    window.location.href = "/login/siginup.html"; // Change this to your actual sign-in route
});
}

document.getElementById('facebook').addEventListener('click', function(e) {
    e.preventDefault();
    window.open('https://www.facebook.com/StudentCinemas', '_blank');
});

document.getElementById('instagram').addEventListener('click', function(e) {
    e.preventDefault();
    window.open('https://www.instagram.com/StudentCinemas', '_blank');
});

document.querySelectorAll('.footer-section a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            } else {
                console.log('Target element not found:', targetId);
            }
        }
    });
});

    // document.getElementById("call-button").addEventListener("click", function(event) {
    //     event.preventDefault(); 
    //     window.location.href = "tel:+9779766828620"; 
    // });

