/*<----тестовый вывод размеров окна*/
let body = document.querySelector("body");
let tstDisp = document.createElement("div");
body.append(tstDisp);
tstDisp.style.cssText = "position:fixed;top:15px;left:2px;background:white;color:black;padding:0 5px;border: 1px solid red;";
let strN00 = document.createElement("div");tstDisp.append(strN00);
strN00.style.cssText = "border-bottom: 1px solid red;";
function sdReN() {
	strN00.innerHTML = `${window.innerWidth} x ${window.innerHeight}`;
	if (window.innerWidth<900) {tstDisp.style.fontSize = `${window.innerWidth/20}px`;} else {
		tstDisp.style.fontSize = `${window.innerWidth/70}px`;}
	}
sdReN();
window.addEventListener("resize", function (e) {sdReN(); });

/*тестовый вывод размеров окна---->*/


/*<----тестовый вывод параметров скролла*/

//let scrolDisp = document.createElement("div");
//body.append(scrolDisp);
//scrolDisp.style.cssText = "position:fixed;top:100px;left:2px;background:white;color:black;padding:0 5px;border: 1px solid red;";
//scrolDisp.style.fontSize = `${window.innerWidth/30}px`;

let strN01 = document.createElement("div");tstDisp.append(strN01);
let strN02 = document.createElement("div");tstDisp.append(strN02);
let strN03 = document.createElement("div");tstDisp.append(strN03);
/*
let strN04 = document.createElement("div");tstDisp.append(strN04);
let strN05 = document.createElement("div");tstDisp.append(strN05);
let strN06 = document.createElement("div");tstDisp.append(strN06);
let strN07 = document.createElement("div");tstDisp.append(strN07);
let strN08 = document.createElement("div");tstDisp.append(strN08);
*/

/*==================================================*/


let superoven = document.querySelector(".superoven");
if (superoven){
	let slideCont = superoven.querySelector(".slideCont");
	let slide = slideCont.querySelectorAll(".slideCont>div");
	let dots = superoven.querySelector(".dots");

//создание точек и их функций
	for (let i = 0; i < slide.length; i++) {
		if (dots){
			let dot = document.createElement("div");
			dots.append(dot);
			dot.onclick = function(e){curNum = i; scrolNStep(0);	}	}	}

	let dot = superoven.querySelectorAll(".dots>div");
	let curNum=0;	//порядковый номер текущего слайда
	let curSlShift=slide[curNum].offsetLeft - slideCont.offsetLeft;	//смещение текущего слайда
	let movCnt=0; //для пропуска событий mousemove
	let rolBlck = true;//флаг блокировки свайпа слайдов мышью
	let dragM = false;
	let startX; //стартовая позиция мыши
	let curX; //текущая позиция мыши
	let transDur = 300;

window.onload = () => {
	setTimeout( function() {
		slideCont.prepend(slide[(slide.length - 1)]);
		slideCont.scrollLeft = slideCont.offsetWidth;
	}, 500);
};

//ротация слайдов при необходимости и плавный свайп к слайду curNum
	function scrolNStep(slidShift) {
//-автоматическая ротация слайда. Происходит, если будущий (на который указывает модифицированный curNum) слайд стоит на краю.
		let tranSlide = slideCont.querySelectorAll(".slideCont>div");
		let tmp = Math.round((slide[curNum].offsetLeft - slideCont.offsetLeft)/slideCont.offsetWidth);
		if(tmp == 0){
			slideCont.prepend(tranSlide[(tranSlide.length - 1)]);
			slideCont.scrollLeft = slide[curNum].offsetLeft - slideCont.offsetLeft + slideCont.offsetWidth + slidShift;
		}else{
			if(tmp == (tranSlide.length - 1)){
				slideCont.append(tranSlide[0]);
				slideCont.scrollLeft = slide[curNum].offsetLeft - slideCont.offsetLeft - slideCont.offsetWidth + slidShift;	}	}
//плавный свайп к слайду curNum
		slideCont.scrollTo({left: (slide[curNum].offsetLeft - slideCont.offsetLeft), behavior: 'smooth'});
//модификация точек по curNum
		for (let i = 0; i < dot.length; i++) {
			if(i==curNum){dot[i].classList.add("marked");}else{dot[i].classList.remove("marked");}	}
//Разблокируем свайп
		rolBlck = true;	}



//старт свайпа на контейнере
	function StartSwipe(e) {
		if (rolBlck==true){
//			e.preventDefault();
			startX=e.pageX;
			curX=e.pageX;
			dragM = true;
			curSlShift = slide[curNum].offsetLeft - slideCont.offsetLeft;	}	}

//движение свайпа на документе
	function MoveSwipe(e) {
		if(movCnt==0){
			movCnt=0; //задает скважность пропуска событий mousemove
			if((dragM==true)&&(rolBlck==true)){
				slideCont.scrollLeft = slideCont.scrollLeft + curX - e.pageX;
				curX = e.pageX;		}
		}else{movCnt--;}	}

//конец свайпа на документе
	function EndSwipe() {
		if((dragM==true)&&(rolBlck==true)){
			dragM=false;
			rolBlck=false;
			let num = 0;
			if (((Math.abs(startX - curX))/slideCont.offsetWidth)>0.1) {
				if((startX - curX)>0){num = 1;// если разность положительная - скролл влево
				}else{num = -1;}	}		// если разность отрицательная - скролл вправо
//коррекция порядкового номера текущего слайда. Получает movStep, -1 < num < 1
			curNum = curNum + num;
			if (curNum<0){curNum = slide.length - 1;}else{if (curNum>(slide.length - 1)){curNum = 0;}	}
//свайп к слайду curNum
			scrolNStep(startX - curX);		}	}



//========= События тачскрина ==============

/*
let isTouchDevice = "ontouchstart" in window || navigator.msMaxTouchPoints;
if(isTouchDevice==true){
	console.log("isTouchDevice");
}else{
	console.log("NOTouch");
}
*/

	slideCont.ontouchstart = function(e) {
		e.preventDefault();
//		console.log("touchstart");
		StartSwipe(e.changedTouches[0]);
	}

	slideCont.ontouchmove = function(e) {
		e.preventDefault();
//		console.log("touchmove:  e=" + e + "    Координата=" + e.changedTouches[0]);
		MoveSwipe(e.changedTouches[0]);
	}

	slideCont.ontouchend = function(e) {
		e.preventDefault();
//		console.log("touchend");
		EndSwipe();
	}

	slideCont.ontouchcancel = function(e) {
		e.preventDefault();
//		console.log("touchcancel");
	}


//============================================



//========= События десктопа ==============

//нажатие мыши на контейнере
	slideCont.onmousedown = function(e){
		StartSwipe(e);
	}
//перемещение нажатой мыши на документе
	document.addEventListener("mousemove", function(e) {
		MoveSwipe(e);
	});

//отпускание мыши на документе
	document.addEventListener("mouseup", function() {
		EndSwipe();
	});
}

//============================================

