let assist = document.querySelector(".assist");
assist.style.height = (assist.offsetWidth*973/551) + "px";
let toBack = assist.querySelector(".toBack");
let toMain = assist.querySelector(".toMain");
let closeWin = assist.querySelector(".closeWin");
let turnView = assist.querySelector(".turnView");
let gender = assist.querySelector(".gender");
let detView = assist.querySelector(".detView");
let butL04 = assist.querySelector(".butL04");
let butL05 = assist.querySelector(".butL05");

let butL04_offsetHeight;
let butL05_offsetHeight;

//console.log("butL05.offsetHeight  "+ butL05.offsetHeight);
setTimeout( function() {
	butL04_offsetHeight = butL04.offsetHeight;
	butL05_offsetHeight = butL05.offsetHeight;
}, 300);

let grImg = assist.querySelectorAll(".assist>object");

for (let i = 0; i < grImg.length; i++) {grImg[i].style.opacity = "0";}

let clkCount=0;
let Group3701 = assist.querySelector(".Group3701");
let Frame3961 = assist.querySelector(".Frame3961");
let Frame3626 = assist.querySelector(".Frame3626");

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
	startView();
}, false);

function horCentr(svgObj, perHei) {
	svgObj.style.height = (assist.offsetHeight*perHei) + "px";
	setTimeout( function() {svgObj.style.left = ((assist.offsetWidth - svgObj.offsetWidth)/2) + "px";}, 10);
}
//установка первого вида
function startView() {
	horCentr(Group3701, 0.9);
	setTimeout( function() {
		Group3701.style.transitionDuration = "2s";
		Group3701.style.opacity = "1";
		butL04.style.height = butL04_offsetHeight + "px";
		butL05.style.height = "0";
	}, 500);
	toBack.style.visibility = "hidden";
	toMain.style.visibility = "hidden";
	//установка первого вида
}


assist.onclick = function() {
	clkCount++;
	switch(clkCount) {
	  case 1:
//		for (let i = 0; i < grImg.length; i++) {grImg[i].style.opacity = "0";}
	//	Group3701.style.transitionDuration = "2s";
		Group3701.style.left = (Group3701.offsetWidth*(-2.7)) + "px";
		Group3701.style.top = (Group3701.offsetHeight*(-0.9)) + "px";
		Group3701.style.height = (Group3701.offsetHeight*5) + "px";
		break;

	  case 2:
		Group3701.style.opacity = "0";
		setTimeout( function() {Group3701.style.display="none";}, 2000);
		Frame3961.style.top = "0";
		Frame3961.style.left = "0";
		Frame3961.style.height = (assist.offsetHeight) + "px";
//		Frame3961.style.display="block";
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

detView.onclick = function() {
	event.stopPropagation();
	if (this.classList.contains("dViewON")){
//		for (let i = 0; i < grImg.length; i++) {grImg[i].style.opacity = "0";}
		Frame3626.style.opacity = "0";
		Group3701.style.opacity = "1";
		butL04.style.height = butL04_offsetHeight + "px";
		butL05.style.height = "0";
//		startView();
	}else{
		for (let i = 0; i < grImg.length; i++) {grImg[i].style.opacity = "0";}
		horCentr(Frame3626, 0.85);
		setTimeout( function() {
			Frame3626.style.transitionDuration = "2s";
			Frame3626.style.opacity = "1";
		}, 10);
		butL04.style.height = "0";
		butL05.style.height = butL05_offsetHeight + "px";
	}
	this.classList.toggle("dViewON");
}

