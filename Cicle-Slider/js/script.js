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
			dot.onclick = function(e){curNum = i; scrolNStep();	}	}	}

	let dot = superoven.querySelectorAll(".dots>div");
	let curNum=0;	//порядковый номер текущего слайда
	let curSlShift=slide[curNum].offsetLeft - slideCont.offsetLeft;	//смещение текущего слайда
	let movCnt=0; //для пропуска событий mousemove
	let rolBlck = true;//флаг блокировки свайпа слайдов мышью
	let dragM = false;
//	let startX; //стартовая позиция мыши
	let startSL = slideCont.scrollLeft; //стартовая позиция скролла
	let curX; //текущая позиция мыши
	let transDur = 300;

	//формула вычисления scrollLeft для установки текущего слайда curNum посередине контейнера
	function centrCurSlide() {return (slide[curNum].offsetLeft - slideCont.offsetLeft - ((slideCont.offsetWidth - slide[curNum].offsetWidth)/2));}

	window.onload = () => {
		setTimeout( function() {
			slideCont.prepend(slide[(slide.length - 1)]);
			slideCont.scrollLeft = centrCurSlide();
		}, 500);
	};
	dotModif();

	//модификация точек по curNum
	function dotModif() {
		for (let i = 0; i < dot.length; i++) {
			if(i==curNum){dot[i].classList.add("marked");}else{dot[i].classList.remove("marked");}	}	}

	//ротация слайдов при необходимости и плавный свайп к слайду curNum
	function scrolNStep() {
	//-автоматическая ротация слайда. Происходит, если будущий (на который указывает модифицированный curNum) слайд стоит на краю.
		let tranSlide = slideCont.querySelectorAll(".slideCont>div"); //задаем массив слайдов для индексации по текущему положению
	//определяем место, где находится слайд curNum /вычисляем его индекс/
		let tmp = Math.round((slide[curNum].offsetLeft - slideCont.offsetLeft)/slide[curNum].offsetWidth);
		//если он впереди - индекс равен нулю - переносим последний слайд вперед
		if(tmp == 0){carForw(tranSlide);
		}else{
			//если он на последнем месте - индекс равен length-1  - переносим первый слайд назад
			if(tmp == (tranSlide.length - 1)){carBackw(tranSlide);}	}
		//затем выполняем плавный свайп к слайду curNum
		slideCont.scrollTo({left: centrCurSlide(), behavior: 'smooth'});
		dotModif();//модификация точек по curNum
		rolBlck = true;	}//Разблокируем свайп

//перенос последнего слайда вперед. Получает текущий массив слайдов
	function carForw(tranSlide) {
		slideCont.prepend(tranSlide[(tranSlide.length - 1)]);//переносим последний по текущему положению слайд вперед
		slideCont.scrollLeft = slideCont.scrollLeft + tranSlide[(tranSlide.length - 1)].offsetWidth;//и корректируем scrollLeft на длину перенесенного слайда
	}

//перенос первого слайда назад. Получает текущий массив слайдов
	function carBackw(tranSlide) {
		slideCont.append(tranSlide[0]);//переносим первый по текущему положению слайд назад
		slideCont.scrollLeft = slideCont.scrollLeft - tranSlide[0].offsetWidth;//и корректируем scrollLeft на длину перенесенного слайда
	}

//проверка приближения конца свайпа до менее 10px, и если необходимо, перенос соответствующего крайнего слайда
	function carryOver() {
		if(slideCont.scrollLeft<10){
			let tranSlide = slideCont.querySelectorAll(".slideCont>div"); //задаем массив слайдов для индексации по текущему положению
			carForw(tranSlide);
		}else{
			if((slideCont.scrollWidth - slideCont.scrollLeft - slideCont.offsetWidth)<10){
				let tranSlide = slideCont.querySelectorAll(".slideCont>div"); //задаем массив слайдов для индексации по текущему положению
				carBackw(tranSlide);	}	}	}

//старт свайпа на контейнере
	function StartSwipe(e) {
		if (rolBlck==true){
//			e.preventDefault();
			startSL = slideCont.scrollLeft;
//			startX=e.pageX;
			curX=e.pageX;
			dragM = true;
			curSlShift = slide[curNum].offsetLeft - slideCont.offsetLeft;	}	}

//движение свайпа на документе
	function MoveSwipe(e) {
		if(movCnt==0){
			movCnt=0; //задает скважность пропуска событий mousemove
			if((dragM==true)&&(rolBlck==true)){
				slideCont.scrollLeft = slideCont.scrollLeft + curX - e.pageX;
//				carryOver();
				curX = e.pageX;		}
		}else{movCnt--;}	}

//конец свайпа на документе
	function EndSwipe(e) {
		if((dragM==true)&&(rolBlck==true)){
			dragM=false;
			rolBlck=false;
			curX = e.pageX;
//			let regMove = (Math.abs(startX - curX))/slide[curNum].offsetWidth;//смещение мыши относительно размеров слайда
			let regMove = (Math.abs(slideCont.scrollLeft - startSL))/slide[curNum].offsetWidth;//смещение скролла относительно размеров слайда

			if (regMove>0.1) {	//если более 0,1 выполняем переключение слайда
				if (regMove<1) {	//если менее 1 - смещение на один слайд
//					curNum = curNum + Math.sign(startX - curX);	//1 плюс, либо минус. В зависимости от знака смещения мыши
					curNum = curNum + Math.sign(slideCont.scrollLeft - startSL);	//1 плюс, либо минус. В зависимости от знака смещения скролла

					if (curNum<0){curNum = slide.length - 1;}else{if (curNum>(slide.length - 1)){curNum = 0;}} //закольцовка переключения
				}else{	//если более 1 - переключение на ближайший к середине слайд 
					let closest = 65530;
					for (let i = 0; i < slide.length; i++) {//находим слайд, ближайший к середине
						let tmp = Math.abs((slideCont.scrollLeft + (slideCont.offsetWidth - slide[i].offsetWidth)/2) - slide[i].offsetLeft);
						if (tmp<closest){closest = tmp;curNum = i;}	}}}
			//свайп к слайду curNum
			scrolNStep();	}	}



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
		EndSwipe(e.changedTouches[0]);
	}

	slideCont.ontouchcancel = function(e) {
		e.preventDefault();
//		console.log("touchcancel");
	}


//============================================



//========= События десктопа ==============

//нажатие мыши на контейнере
	slideCont.onmousedown = function(e){
		e.preventDefault();
		StartSwipe(e);
	}
//перемещение нажатой мыши на документе
	document.addEventListener("mousemove", function(e) {
		MoveSwipe(e);
	});

//отпускание мыши на документе
	document.addEventListener("mouseup", function(e) {
		EndSwipe(e);
	});
}

//============================================

