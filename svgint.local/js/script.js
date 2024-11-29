
let assist = document.querySelector(".assist");
let grImg = assist.querySelectorAll(".assist>object");
for (let i = 0; i < grImg.length; i++) {grImg[i].style.opacity = "0";}
let clkCount=0;
let Group3701 = assist.querySelector(".Group3701");
let Frame3961 = assist.querySelector(".Frame3961");
let scdFrame3961;
let bonesGr;
let venusGr;

Frame3961.addEventListener("load",function(){
	scdFrame3961 = Frame3961.contentDocument;
	bonesGr = scdFrame3961.querySelector('#g1379');
	venusGr = scdFrame3961.querySelector('#g128');
	venusGr.style.opacity = "0.05";
	bonesGr.style.transitionDuration = "2s";
	venusGr.style.transitionDuration = "2s";
}, false);

Group3701.style.display="block";
Group3701.style.width = (assist.offsetWidth*0.66) + "px";
Group3701.style.left = (assist.offsetWidth*0.17) + "px";
Group3701.style.opacity = "1";

assist.onclick = function() {
	clkCount++;
	switch(clkCount) {
	  case 1:
		Group3701.style.transitionDuration = "2s";
		Group3701.style.left = (Group3701.offsetWidth*(-2.7)) + "px";
		Group3701.style.top = (Group3701.offsetHeight*(-0.9)) + "px";
		Group3701.style.width = (Group3701.offsetWidth*5) + "px";
		break;

	  case 2:
		Group3701.style.opacity = "0";
		setTimeout( function() {Group3701.style.display="none";}, 2000);
		Frame3961.style.top = "0";
		Frame3961.style.left = "0";
		Frame3961.style.height = (assist.offsetHeight) + "px";
		Frame3961.style.display="block";
		setTimeout( function() {
			Frame3961.style.transitionDuration = "2s";
			Frame3961.style.opacity = "1";}, 10);
		break;
	  case 3:
		bonesGr.style.opacity = "0";
		break;
	  case 4:
		venusGr.style.opacity = "0.5";
		break;
	}
}



