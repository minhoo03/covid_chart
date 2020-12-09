let text_if
let pipe
let bg
let covid19_1
let covid19_2
let covid19_3
let seoulMap
let text_relactive
let logoNav

let x = 0
let y = 0
let mx = 0
let my = 0
let speed = 0.015

window.onload = function(){
  pipe = document.getElementsByClassName('pipe')[0]
  bg = document.getElementsByClassName('bg')[0]
  text_if = document.getElementsByClassName("text_if")[0]
  covid19_1 = document.getElementsByClassName("covid19_1")[0]
  covid19_2 = document.getElementsByClassName("covid19_2")[0]
  covid19_3 = document.getElementsByClassName("covid19_3")[0]
  seoulMap = document.getElementsByClassName("seoulMap")[0]
  text_relactive = document.getElementsByClassName("text_relactive")[0]
  logoNav = document.getElementsByClassName("logoNav")[0]

  // 이 함수 실행 중 X : 마우스 움직일 시 mouseFunc 실행
  window.addEventListener("mousemove", mouseFunc, false)

  function mouseFunc(e){
    // 화면에서 사라지지 않도록 (좌표-화면크기) // 사람 중앙 = 마우스 중앙
    x = (e.clientX - window.innerWidth / 2)
    y = (e.clientY - window.innerHeight / 2)
  }
  loop()
}

function loop(){
  mx += (x - mx) * speed
  my += (y - my) * speed

  text_if.style.transform = `translate(${-mx/5}px, ${-my/5}px)`
  pipe.style.transform = `translate(${mx/14}px, ${my/15}px)`
  bg.style.transform = `translate(${-mx/24}px, ${-my/24}px)`
  covid19_1.style.transform = `translate(${-mx/24}px, ${-my/8}px)`
  covid19_2.style.transform = `translate(${-mx/16}px, ${-my/7}px)`
  covid19_3.style.transform = `translate(${-mx/12}px, ${-my/6}px)`

  // seoulMap.style.transform = `translate3d(${-mx/2}px, ${-my/2}px, 0) rotate3d(0,1,0,${-mx/50}deg)`

  // bg.style.transform = `rotate(${mx/303}deg)`
  window.requestAnimationFrame(loop)
}

// progress
let progressScrollTop = 0
let bar = document.getElementsByClassName('bar')[0]

window.addEventListener("scroll" , function() {

  let scrollTop = document.documentElement.scrollTop;
  // console.log(scrollTop)

  if (scrollTop > 550) {
    // class 는 중첩 (배열로 넘어옴)
    document.getElementsByClassName('seoulMap')[0].style.animation="fadeInOp5 2s forwards"
    covid19_1.style.animation="fadeIn 2s 1s forwards, upDown 3s 0s infinite alternate, fadeUp 0.75s 1s forwards"
    covid19_2.style.animation="fadeIn 2s 1s forwards, upDown 3s 0s infinite alternate, fadeUp 0.75s 1s forwards"
    covid19_3.style.animation="fadeIn 2s 1s forwards, upDown 3s 0s infinite alternate, fadeUp 0.75s 1s forwards"
    text_relactive.style.animation="fadeInRotate 1s 0.3s forwards"

    document.body.style.background = "#353535"
  } else if(scrollTop == 0){
    document.body.style.background = "#000000"
  } 

    // scorllTop / (전체 화면 높이 - 실제 보이는 화면 높이) * 100
    let persent = Math.ceil(scrollTop / (document.body.scrollHeight - window.outerHeight) * 100)
    bar.style.width = `${persent}%`

    console.log(`${persent}%`)

});

$(document).ready(function() {
  $("html").niceScroll({cursorwidth: '10px', autohidemode: false, zindex: 999 });
});

// let cnt = 0

// $('html, body').on('mousewheel', (e) => {
//   // 휠업 양수, 휠다운 음수
//   let wheel = e.originalEvent.wheelDelta
//   console.log(wheel)
//   // 휠업
//   if(wheel > 1 && cnt >=1){ // snap class의 cnt번째의 top을 구함
//     $('html, body').stop().animate({scrollTop:$('.snap').eq(cnt-1).offset().top})
//     cnt--
//     console.log("cnt"+cnt)                                                                                                                                                                                                                                                                   
//   // 휠다운
//   } else if(wheel < 1 && cnt < $('.snap').length){
//     $('html, body').stop().animate({scrollTop:$('.snap').eq(cnt).offset().top})
//     cnt++
//     console.log("cnt"+cnt)
//   }
// })

// 버거메뉴
function menuToggle() {
  document.getElementById('list').classList.toggle('show');
}

document.getElementById('menu').addEventListener('click', menuToggle);