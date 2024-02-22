// 内嵌音乐播放器播放逻辑
const dot = document.querySelector(".dot");
const fullSlider = document.querySelector(".fullSlider");
const slider = document.querySelector(".slider");
const pause = document.querySelector(".pause");
const start = document.querySelector(".start");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const audio = document.querySelector("audio");
const img = document.querySelector(".sound img");
let checkMoveTimer;   // 用于存储定时器
let startX, moveX;    // 存储鼠标坐标
let beforeSound = 20, realSound = 20;      // 点击静音前的音量和目前的音量 70px为满

// 禁止冒泡,以防mobilePhone模式，冒泡执行到timer的点击事件
function stopPao(e) {
  if (!e) var e = window.event;
  e.cancelBubble = true;
  if (e.stopPropagation) e.stopPropagation();
}

function adjustSound(sound = realSound) {   // 调节音量
  if (sound <= 0) {
    sound = 0;
    img.setAttribute("src", "./images/静音.png");
  } else if (sound >= 70) {
    sound = 70;
    img.setAttribute("src", "./images/sound.png");
  } else {
    img.setAttribute("src", "./images/sound.png");
  }
  realSound = sound;
  dot.setAttribute("style", `left:${sound}px`);
  fullSlider.setAttribute("style", `width:${sound + 6}px`); // 小圆点有6px的右偏差
  audio.volume = (sound / 70).toFixed(2);
  startX = moveX;
}

// 鼠标，手指移动
function mouseMoveEvent(e) {
  // console.log("鼠标移动了");
  e.preventDefault(); // 阻止默认事件防止恶心的bug，烦死我了
  moveX = e.clientX
}

function fingerMoveEvent(e) {
  moveX = e.touches[0].clientX;
}

// 鼠标,手指按下
function downEvent(e) {
  stopPao(e);
  // console.log("鼠标点击了");
  e.touches ? (startX = e.touches[0].clientX) : (startX = e.clientX);
  document.addEventListener("mousemove", mouseMoveEvent);
  document.addEventListener("touchmove", fingerMoveEvent, { passive: false });
  checkMoveTimer = setInterval(() => {
    const oldSound = fullSlider.clientWidth - 6;
    const difference = moveX - startX;
    const sound = oldSound + difference;
    adjustSound(sound);
  }, 100);
}

// 鼠标，手指抬起
function upEvent() {
  // console.log("鼠标松开了");
  document.removeEventListener("mousemove", mouseMoveEvent);
  document.removeEventListener("touchmove", fingerMoveEvent, { passive: false });
  clearInterval(checkMoveTimer);
}

dot.addEventListener("mousedown", downEvent);
dot.addEventListener("touchstart", downEvent, { passive: false });

document.addEventListener("mouseup", upEvent);
document.addEventListener("touchend", upEvent);

slider.addEventListener("click", function (e) {
  stopPao(e)
  e.target === dot ? null : adjustSound(e.offsetX)
})

img.addEventListener("click", function (e) {
  stopPao(e)
  // 不想用if了，这样搞的
  img.src.includes("sound") ? (beforeSound = realSound) && adjustSound(0) : adjustSound(beforeSound);
})

start.addEventListener("click", function (e) {
  stopPao(e)
  audio.play();
  start.classList.add("hidden");
  pause.classList.remove("hidden");
})

pause.addEventListener("click", function (e) {
  stopPao(e);
  audio.pause();
  pause.classList.add("hidden");
  start.classList.remove("hidden");
})

adjustSound();  // 首次执行一下
