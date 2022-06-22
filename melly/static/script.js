// Variable initialization / DOM selection
const photoMask = document.getElementById("photoMask");
const clockBlock = document.getElementById("clockBlock");
const outerLastFedCircle = document.getElementById("outerLastFedCircle");
const outerLastPoopedCircle = document.getElementById("outerLastPoopedCircle");
const innerLastPoopedCircle = document.getElementById("innerLastPoopedCircle");

const clock12 = document.getElementById("clock12");
const clock1 = document.getElementById("clock1");
const clock2 = document.getElementById("clock2");
const clock3 = document.getElementById("clock3");
const clock4 = document.getElementById("clock4");
const clock5 = document.getElementById("clock5");
const clock6 = document.getElementById("clock6");
const clock7 = document.getElementById("clock7");
const clock8 = document.getElementById("clock8");
const clock9 = document.getElementById("clock9");
const clock10 = document.getElementById("clock10");
const clock11 = document.getElementById("clock11");

const segment1 = document.getElementById("segment1");
const segment2 = document.getElementById("segment2");
const segment3 = document.getElementById("segment3");
const segment4 = document.getElementById("segment4");

const segment5 = document.getElementById("segment5");
const segment6 = document.getElementById("segment6");
const segment7 = document.getElementById("segment7");
const segment8 = document.getElementById("segment8");

const lastFed = document.getElementById("lastFed");
const lastPooped = document.getElementById("lastPooped");
const now = document.getElementById("now");

const mellyAte = document.getElementById("mellyAte")
const mellyPooped = document.getElementById("mellyPooped")

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

// This function takes in an angle and a radius (ie. polar coordinates) and returns Cartesian coordinates based on the size of the div in which the circle is drawn
function convertToCartesian(theta, radius) {
    const x = radius * Math.cos(theta*Math.PI/180) + clockBlock.offsetWidth / 2;
    const y = radius * Math.sin(theta*Math.PI/180) + clockBlock.offsetHeight / 2;
    return [x, y];
}

function positionClock(start, end, start2, end2) {
    clockBlock.style.height = `${Math.min(clockContainer.offsetHeight * 0.8, clockContainer.offsetWidth * 0.8)}px`;
    clockBlock.style.width = `${Math.min(clockContainer.offsetHeight * 0.8, clockContainer.offsetWidth * 0.8)}px`;

    outerLastFedCircle.style.height = `${Math.min(clockContainer.offsetHeight * 0.6, clockContainer.offsetWidth * 0.6)}px`;
    outerLastFedCircle.style.width = `${Math.min(clockContainer.offsetHeight * 0.6, clockContainer.offsetWidth * 0.6)}px`;

    outerLastPoopedCircle.style.height = `${Math.min(clockContainer.offsetHeight * 0.63, clockContainer.offsetWidth * 0.63)}px`;
    outerLastPoopedCircle.style.width = `${Math.min(clockContainer.offsetHeight * 0.63, clockContainer.offsetWidth * 0.63)}px`;

    innerLastPoopedCircle.style.height = `${Math.min(clockContainer.offsetHeight * 0.60, clockContainer.offsetWidth * 0.60)}px`;
    innerLastPoopedCircle.style.width = `${Math.min(clockContainer.offsetHeight * 0.60, clockContainer.offsetWidth * 0.60)}px`;
    
    // If the starting hour is after the ending hour (like 11pm -> 5pm), then adjust the length of time accordingly to base 12 as shown on closk
    let length = end - start;
    if (start > end) {
        length = (12 - start) + end;
    }

    let length2 = end2 - start2;
    if (start2 > end2) {
        length2 = (12 - start2) + end2;
    }

// The strategy to drawing an arc came from an online post about creating 4 rectangles and skewing them at a proper angle and hiding it with overflow:hidden
    let skew1 = clamp((3 - length) / 3, 0, 1)*90;
    let skew2 = clamp((6 - length) / 3, 0, 1)*90;
    let skew3 = clamp((9 - length) / 3, 0, 1)*90;
    let skew4 = clamp((12 - length) / 3, 0, 1) * 90;

    let skew5 = clamp((3 - length2) / 3, 0, 1)*90;
    let skew6 = clamp((6 - length2) / 3, 0, 1)*90;
    let skew7 = clamp((9 - length2) / 3, 0, 1)*90;
    let skew8 = clamp((12 - length2) / 3, 0, 1) * 90;
    
    segment1.style.transform = `rotate(0deg) skew(${skew1}deg)`;
    segment2.style.transform = `rotate(90deg) skew(${skew2}deg)`;
    segment3.style.transform = `rotate(180deg) skew(${skew3}deg)`;
    segment4.style.transform = `rotate(270deg) skew(${skew4}deg)`;

    segment5.style.transform = `rotate(0deg) skew(${skew5}deg)`;
    segment6.style.transform = `rotate(90deg) skew(${skew6}deg)`;
    segment7.style.transform = `rotate(180deg) skew(${skew7}deg)`;
    segment8.style.transform = `rotate(270deg) skew(${skew8}deg)`;

    // After getting the length of the arc, rotate the arc to fit the clock properly
    outerLastFedCircle.style.transform = `translateX(-50%) translateY(-50%) rotate(${start / 12 * 360 - 90}deg)`;
    outerLastPoopedCircle.style.transform = `translateX(-50%) translateY(-50%) rotate(${start2 / 12 * 360 - 90}deg)`;

    // Determine the radius of each circle based on the size of the outer block to make it responsive. Also adjust radius if the icons are too close together so they don't completely stack on top of each other.
    let lastFedRadius = outerLastFedCircle.offsetHeight / 2;
    let clockRadius = lastFedRadius - 20;
    let lastPoopedRadius = outerLastPoopedCircle.offsetHeight / 2;
    let nowRadius = outerLastFedCircle.offsetHeight / 2;

    if (Math.abs(end - start) < 0.3) {
        lastFedRadius = lastFedRadius - 40;
    }
    if (Math.abs(end - start2) < 0.3) {
        lastPoopedRadius = lastPoopedRadius - 40;
    }
    if (Math.abs(start - start2) < 0.3) {
        lastFedRadius = lastFedRadius - 15;
    }

    let lastFedCartesian = convertToCartesian(-(start / 12 * 360)+90, lastFedRadius);
    let lastPoopedCartesian = convertToCartesian(-(start2 / 12 * 360) + 90, lastPoopedRadius);
    let nowCartesian = convertToCartesian(-(end / 12 * 360) + 90, nowRadius);
    let clock12Cartesian = convertToCartesian(90, clockRadius);
    let clock1Cartesian = convertToCartesian(60, clockRadius);
    let clock2Cartesian = convertToCartesian(30, clockRadius);
    let clock3Cartesian = convertToCartesian(0, clockRadius);
    let clock4Cartesian = convertToCartesian(-30, clockRadius);
    let clock5Cartesian = convertToCartesian(-60, clockRadius);
    let clock6Cartesian = convertToCartesian(-90, clockRadius);
    let clock7Cartesian = convertToCartesian(-120, clockRadius);
    let clock8Cartesian = convertToCartesian(-150, clockRadius);
    let clock9Cartesian = convertToCartesian(-180, clockRadius);
    let clock10Cartesian = convertToCartesian(-210, clockRadius);
    let clock11Cartesian = convertToCartesian(-240, clockRadius);

    lastFed.style.left = `${lastFedCartesian[0]}px`;
    lastFed.style.top = `${clockBlock.offsetHeight - lastFedCartesian[1]}px`;
    lastPooped.style.left = `${lastPoopedCartesian[0]}px`;
    lastPooped.style.top = `${clockBlock.offsetHeight - lastPoopedCartesian[1]}px`;
    now.style.left = `${nowCartesian[0]}px`;
    now.style.top = `${clockBlock.offsetHeight - nowCartesian[1]}px`;

    clock12.style.left = `${clock12Cartesian[0]}px`;
    clock12.style.top = `${clockBlock.offsetHeight - clock12Cartesian[1]}px`;
    clock1.style.left = `${clock1Cartesian[0]}px`;
    clock1.style.top = `${clockBlock.offsetHeight - clock1Cartesian[1]}px`;
    clock2.style.left = `${clock2Cartesian[0]}px`;
    clock2.style.top = `${clockBlock.offsetHeight - clock2Cartesian[1]}px`;
    clock3.style.left = `${clock3Cartesian[0]}px`;
    clock3.style.top = `${clockBlock.offsetHeight - clock3Cartesian[1]}px`;
    clock4.style.left = `${clock4Cartesian[0]}px`;
    clock4.style.top = `${clockBlock.offsetHeight - clock4Cartesian[1]}px`;
    clock5.style.left = `${clock5Cartesian[0]}px`;
    clock5.style.top = `${clockBlock.offsetHeight - clock5Cartesian[1]}px`;
    clock6.style.left = `${clock6Cartesian[0]}px`;
    clock6.style.top = `${clockBlock.offsetHeight - clock6Cartesian[1]}px`;
    clock7.style.left = `${clock7Cartesian[0]}px`;
    clock7.style.top = `${clockBlock.offsetHeight - clock7Cartesian[1]}px`;
    clock8.style.left = `${clock8Cartesian[0]}px`;
    clock8.style.top = `${clockBlock.offsetHeight - clock8Cartesian[1]}px`;
    clock9.style.left = `${clock9Cartesian[0]}px`;
    clock9.style.top = `${clockBlock.offsetHeight - clock9Cartesian[1]}px`;
    clock10.style.left = `${clock10Cartesian[0]}px`;
    clock10.style.top = `${clockBlock.offsetHeight - clock10Cartesian[1]}px`;
    clock11.style.left = `${clock11Cartesian[0]}px`;
    clock11.style.top = `${clockBlock.offsetHeight - clock11Cartesian[1]}px`;
}

let start = lastFedHour;
let start2 = lastPoopedHour;
let end = nowHour;
let end2 = nowHour;

positionClock(start, end, start2, end2);

onresize = () => positionClock(start, end, start2, end2);

mellyAte.addEventListener("click", () => {
    location = 'updateLastFed/';
});
mellyPooped.addEventListener("click", () => {
    location = 'updateLastPooped/';
});