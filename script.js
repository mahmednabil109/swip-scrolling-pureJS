
// init the variables needed
var slider   = document.querySelector('.slider');
var elements = document.querySelectorAll('.container');
var l        = elements.length;
var index    = 0;
var active   = true;
var mouseX,mouseY;

//styleing the containers 
const getRColor = ()=> `#${Math.floor(Math.random()*16777+10001255)}`;
var initDelay   = .1;
elements.forEach((e)=>{
    e.style.background = getRColor();
    e.style.transitionDelay = `${initDelay += .02}s`;
});

//adding the EventListeners
// event for scrolling
slider.addEventListener('wheel',(e)=>{
    if(!active) return;
    index = (e.deltaX > 0) ? Math.min(l-1,++index) : Math.max(0,--index);
    active = false;
    setTimeout(_ => active = true,1010);
    scrollWI();
    e.preventDefault();
});
// event for swiping with the mouse
elements.forEach((e)=>{
    e.addEventListener('mousedown',swip);
    e.addEventListener('mousemove',track);
});

// event for swiping with touch
elements.forEach((e)=>{
    e.addEventListener('touchstart',e => swip(e.changedTouches[0],120));
    e.addEventListener('touchmove',e => track(e.changedTouches[0]));
})

// handling events
function scrollWI(){
    console.log(index);
    elements.forEach((e)=>{
        e.style.transform = `translateX(calc(${index}*(-100% - 12px)))`;  // 12px for the padding;
    });
}
function swip ({clientX,clientY},delay = 300){
    setTimeout(_=>checkDirection(Math.round(clientX),Math.round(clientY)),delay);
}
function track({clientX,clientY}) {
    mouseX = clientX;
    mouseY = clientY;
}
function checkDirection(x,y){
    console.log(x,mouseX);
    if(x === mouseX) return;
    index = ((x - mouseX) > 0) ? Math.min(l - 1, ++index) : Math.max(0, --index);
    scrollWI();
}



