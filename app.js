"use strict";
// ==================== 宣告變數 ====================
// 顏色輸出--預設 rgb(255, 255, 255)
const currentColor = [255, 255, 255];

// DOM: RGB Input Section
const rgbInputSection = document.querySelector("#rgb-input-section");
const rgbInputValue = document.querySelectorAll(".input-value");
const rgbOutput = document.querySelectorAll(".rgb-color-output");
const greenOutput = document.querySelector(".green-output");
const blueOutput = document.querySelector(".blue-output");
// DOM: RGB Slider Section
const rgbSliderSection = document.querySelector("#rgb-slider-section");
const sliderValue = document.querySelectorAll(".slider-value");
const sliderPosition = document.querySelectorAll(".slider-position");
// DOM: HEX Section
const hexValue = document.querySelector(".hex-value");
const hexColor = document.querySelector(".hex-color-output");
const convertBox = document.querySelector(".send-btn");

//  ==================== 事件監聽 ====================
// RGB Input 操作
rgbInputSection.addEventListener("input", function (event) {
  const inputNumber = event.target.value;
  const isNumber = /^[0-9]{0,4}$/;
  const inRange =
    isNumber.test(inputNumber) && inputNumber >= 0 && inputNumber <= 255;

  if (inRange) {
    for (let i = 0; i < currentColor.length; i++) {
      currentColor[i] = Number(rgbInputValue[i].value);
    }
    changeOutput(currentColor);
  } else {
    windowsAlert();
  }
});

// HEX 操作
convertBox.addEventListener("click", function (event) {
  const sendValue = event.target.parentElement.previousElementSibling.value;
  const isHex = /^[0-9a-f]{6,6}$/;
  if (isHex.test(sendValue)) {
    colorToRgb(sendValue);
    changeOutput(currentColor);
  } else {
    windowsAlert();
  }
});

// RGB Slider 操作
rgbSliderSection.addEventListener("mousemove", function (event) {
  for (let i = 0; i < currentColor.length; i++) {
    currentColor[i] = Number(sliderPosition[i].value);
  }
  changeOutput(currentColor);
});

//  ==================== create function ====================
// Hex 轉 RGB
function colorToRgb(hexColor) {
  currentColor[0] = parseInt(hexColor[0] + hexColor[1], 16);
  currentColor[1] = parseInt(hexColor[2] + hexColor[3], 16);
  currentColor[2] = parseInt(hexColor[4] + hexColor[5], 16);
}

// RGB 轉 Hex
function colorToHex(rgbColor) {
  let hexText = "";
  rgbColor.forEach((color) => {
    let result = color.toString(16).padStart(2, "0");
    hexText += result;
  });
  return hexText;
}
// 結果輸出
function changeOutput(currentColor) {
  // RGB Input section -- 顏色輸出
  rgbOutput[0].style.backgroundColor = `rgb(${currentColor[0]}, 0, 0)`;
  rgbOutput[1].style.backgroundColor = `rgb(0, ${currentColor[1]}, 0)`;
  rgbOutput[2].style.backgroundColor = `rgb(0, 0, ${currentColor[2]})`;
  // RGB Input section -- 色碼輸出
  for (let i = 0; i < currentColor.length; i++) {
    rgbInputValue[i].value = currentColor[i];
  }
  // HEX Section -- 色碼輸出
  hexValue.value = colorToHex(currentColor);
  // HEX Section & body 背景 -- 顏色輸出
  hexColor.style.backgroundColor = `rgb(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]})`;
  document.body.style.backgroundColor = `rgb(${currentColor[0]}, ${currentColor[1]}, ${currentColor[2]})`;
  // RGB Slider Section -- 滑塊位置
  for (let i = 0; i < currentColor.length; i++) {
    sliderPosition[i].value = currentColor[i];
  }
  // RGB Slider Section -- 色碼輸出
  for (let i = 0; i < currentColor.length; i++) {
    sliderValue[i].textContent = currentColor[i];
  }
}

// 色碼格式錯誤提示
function windowsAlert() {
  alert("請依照說明輸入正確格式色碼。");
}