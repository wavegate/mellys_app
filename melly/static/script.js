let start = lastFedHour;
let end = nowHour;

let length = end - start;
if (start > end) {
    length = (12 - start) + end;
}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

let skew1 = clamp((3 - length) / 3, 0, 1)*90;
let skew2 = clamp((6 - length) / 3, 0, 1)*90;
let skew3 = clamp((9 - length) / 3, 0, 1)*90;
let skew4 = clamp((12 - length) / 3, 0, 1)*90;

const segment1 = document.getElementById("segment1");
const segment2 = document.getElementById("segment2");
const segment3 = document.getElementById("segment3");
const segment4 = document.getElementById("segment4");
const circularProgressCircle = document.getElementById("circular-progress-circle");

segment1.style.transform = `rotate(0deg) skew(${skew1}deg)`;
segment2.style.transform = `rotate(90deg) skew(${skew2}deg)`;
segment3.style.transform = `rotate(180deg) skew(${skew3}deg)`;
segment4.style.transform = `rotate(270deg) skew(${skew4}deg)`;

circularProgressCircle.style.transform = `rotate(${start / 12 * 360 - 90}deg)`;

const lastFed = document.getElementById("lastFed");
const now = document.getElementById("now");

function convertToCartesian(theta, radius) {
    const x = radius * Math.cos(theta*Math.PI/180) + 150;
    const y = radius * Math.sin(theta*Math.PI/180) + 150;
    return [x, y];
}


const lastFedCartesian = convertToCartesian(-(start / 12 * 360)+90, 130);
const nowCartesian = convertToCartesian(-(end / 12 * 360)+90, 130);

lastFed.style.left = `${lastFedCartesian[0]}px`;
lastFed.style.top = `${300 - lastFedCartesian[1]}px`;
now.style.left = `${nowCartesian[0]}px`;
now.style.top = `${300 - nowCartesian[1]}px`;

const mellyAte = document.getElementById("mellyAte")
const mellyPooped = document.getElementById("mellyPooped")
const modalBackdrop = document.getElementById("modalBackdrop")

mellyAte.style.display = "none";
mellyPooped.style.display = "none";
modalBackdrop.style.display = "none";

const dotBox = document.getElementById("dot-box");
dotBox.addEventListener("click", () => {
    mellyAte.style.display = "flex";
    mellyPooped.style.display = "flex";
    modalBackdrop.style.display = "block";
});

modalBackdrop.addEventListener("click", () => {
    mellyAte.style.display = "none";
    mellyPooped.style.display = "none";
    modalBackdrop.style.display = "none";
});

mellyAte.addEventListener("click", () => {
    location = 'updateLastFed/';
})