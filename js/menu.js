// 移动端菜单按钮
const menu = document.querySelector(".menu");
const menuquit = document.querySelector(".menuquit")
const sections = document.querySelectorAll("main section");
const timer = document.querySelector(".timer");
const music = document.querySelector(".music")

menu.onclick = function () {
  sections[1].setAttribute("style", "display:flex");
  sections[0].setAttribute("style", "display:none");
}

menuquit.onclick = function () {
  sections[0].setAttribute("style", "display:flex");
  sections[1].setAttribute("style", "display:none");
}

// 检测到达平板宽度时，取消额外的style样式
window.addEventListener("resize", function () {
  let pageWidth = window.innerWidth;
  if (pageWidth > 700) {
    sections[0].removeAttribute("style");
    sections[1].removeAttribute("style");
    music.classList.remove("hidden");
  }
})
