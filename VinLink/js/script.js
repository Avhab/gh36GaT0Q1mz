let blur = document.querySelector(".blur");
let burger = document.querySelector(".burger");
let burgerMenu = document.querySelector(".burgerMenu");

blur.style.transformOrigin = "center top";
blur.style.opasity = "0";
blur.style.transform = "scaleY(0)"; 
blur.style.transitionDuration = "0.3s";
burgerMenu.style.transformOrigin = "center top";
burgerMenu.style.opasity = "0";
burgerMenu.style.transform = "scaleY(0)"; 
burgerMenu.style.transitionDuration = "0.3s";
let flag = false;

if(blur&&burger&&burgerMenu){
		burger.onclick = function(){
			if (flag == false) {
				blur.style.display = "block";
				burgerMenu.style.display = "block";
				setTimeout( function() {
					blur.style.opasity = "1";
					blur.style.transform = "scaleY(1)";
					burgerMenu.style.opasity = "1";
					burgerMenu.style.transform = "scaleY(1)";
				}, 30);
				setTimeout( function() {flag = true; }, 350);}	}
		document.addEventListener("click", function (e) {
			if (flag == true) {
				setTimeout( function() {flag = false; }, 30);
				blur.style.opasity = "0";
				blur.style.transform = "scaleY(0)"; 
				burgerMenu.style.opasity = "0";
				burgerMenu.style.transform = "scaleY(0)"; 
				setTimeout( function() {
					blur.style.display=null;
					burgerMenu.style.display=null;
				}, 300);}});}

let isTouchDevice = "ontouchstart" in window || navigator.msMaxTouchPoints;

//let slideArr = document.querySelectorAll(".slideArr");
//if(isTouchDevice==true){for (let i = 0; i < slideArr.length; i++) {slideArr[i].style.display = "none";}}
let slideArr = document.querySelector(".slideBanner .slideArr");
if(isTouchDevice==true){slideArr.style.display = "none";}


//======перебор контейнеров комплектов горизонтального скролла hScrol и создание переменных контейнера слайдов и стрелок-----НАЧАЛО
let hScrol = document.querySelectorAll(".hScrol");
for (let i = 0; i < hScrol.length; i++) {
	let scrolCont = hScrol[i].querySelector(".hScrol>.scrolCont");
	let dirFlag;
	let sCoord = scrolCont.scrollLeft; 
//=======================
//			if(prevDef){scrolCont.preventDefault();}
//=======================
	let slide = scrolCont.querySelectorAll(".hScrol>.scrolCont>*");
	let arrLeft = hScrol[i].querySelector(".leftArr");
	let arrRight = hScrol[i].querySelector(".rightArr");
	let idTimSet;
	
	if (arrRight) {	arrRight.onclick = function(){stepScrollLeft();}	}
	if (arrLeft) {	arrLeft.onclick = function(){stepScrollRight();}	}

//======скролл функциональными кнопками-----НАЧАЛО
	function stepScrollLeft() {
		mouseSwapFlag=false;
		clearTimeout(idTimSet);
		idTimSet = setTimeout( function() {mouseSwapFlag=true;}, 800);
		
		let sclLeft = scrolCont.scrollLeft; 
		let contWidth = scrolCont.offsetWidth;
		let contLeft = scrolCont.offsetLeft;
		let scrolRez;
		for (let j = 0; j < slide.length; j++) {
			scrolRez = slide[j].offsetLeft-contLeft;
			if(slide[j].offsetWidth<contWidth){scrolRez = scrolRez--;}
			if((((slide[j].offsetLeft-contLeft) + slide[j].offsetWidth)-(sclLeft+contWidth))>5){break;}		}
		scrolCont.scrollTo({left: scrolRez, behavior: 'smooth'});	}

	function stepScrollRight() {
		mouseSwapFlag=false;
		clearTimeout(idTimSet);
		idTimSet = setTimeout( function() {mouseSwapFlag=true;}, 800);

		let sclLeft = scrolCont.scrollLeft; 
		let contWidth = scrolCont.offsetWidth;
		let contLeft = scrolCont.offsetLeft;
		let scrolRez;
		for (let j = (slide.length - 1); j >= 0; j--) {
			scrolRez = ((slide[j].offsetLeft-contLeft)+slide[j].offsetWidth)-contWidth;
			if(slide[j].offsetWidth<contWidth){scrolRez = scrolRez++;}
			if((sclLeft-(slide[j].offsetLeft-contLeft))>5){break;}		}
		scrolCont.scrollTo({left: scrolRez, behavior: 'smooth'});	}
//======скролл функциональными кнопками-----КОНЕЦ

//===========

if(isTouchDevice==true){
	toSlowSet(scrolCont, slide);
}else{
	mouseSwapSet(scrolCont, slide, true);
}
fictSide(scrolCont, slide);
//	scrolCont.style.touchAction = "none";

}
//======перебор контейнеров комплектов горизонтального скролла hScrol и создание переменных контейнера слайдов и стрелок-----КОНЕЦ


//=======вставка дополнительных отступов в слайдер----------------НАЧАЛО
function fictSide(scrolCont, slide) {
	let slidGap = slide[1].offsetLeft - slide[0].offsetLeft - slide[0].offsetWidth;
//если размер слайда больше половины окна на 10пикс и меньше целого окна на 2 гэп, вводим доп элементы.
	if(((scrolCont.offsetWidth-slide[0].offsetWidth)>(slidGap*2))&&((slide[0].offsetWidth-(scrolCont.offsetWidth/2))>10)){
		let widF = ((scrolCont.offsetWidth-slide[0].offsetWidth-(2*slidGap))/2)+slidGap;
		let widL = ((scrolCont.offsetWidth-slide[slide.length-1].offsetWidth-(2*slidGap))/2)+slidGap;
		slide[0].style.marginLeft = widF + 'px';
		slide[slide.length-1].style.marginRight = widL + 'px';
	}
}
//=======вставка дополнительных отступов в слайдер----------------КОНЕЦ

//===установка скроллирования мышью - имитация работы тачпада ====НАЧАЛО
//получает: скролл-контейнер, массив слайдов, true-блокировка дефолтных реакций на события указателя на контейнере
function mouseSwapSet(scrolCont, slide, prevDef) {
	let dragFlag=false;
	let stopFlag=true;
	let prevPnt;
	let inerthDif=0;
//=======================
//			if(prevDef){e.preventDefault();}
//=======================
	function mDown(e) {
		if(stopFlag==true){
			dragFlag=true;
			prevPnt=e.pageX;
			inerthDif=0;
		}	}
	function mMove(e) {
		if(dragFlag==true){
			scrolCont.scrollLeft=scrolCont.scrollLeft+(prevPnt-e.pageX);
			
//console.log('  prevPnt ' + prevPnt + '   e.pageX ' + e.pageX);

			inerthDif = e.pageX - prevPnt;
			prevPnt=e.pageX;
		}	}
	function mUp(e) {
		if(dragFlag==true){
			dragFlag=false;
			stopFlag=false;
			setTimeout( function() {stopFlag=true;}, 100);
			let leftDir=true;
			if(inerthDif>0){leftDir=false;}
//console.log( 'leftDir ' + leftDir + '  inerthDif ' + inerthDif + '  prevPnt ' + prevPnt + '   e.pageX ' + e.pageX);
			mouseSwap(scrolCont, slide, leftDir, inerthDif);
//			inerthDif=0;
		}
	}

	if(isTouchDevice==true){
//		scrolCont.onpointerdown = function(e){mDown(e);}
		scrolCont.addEventListener("pointerdown", function (e) {mDown(e);});
		document.addEventListener("pointermove", function (e) {mMove(e);});
		document.addEventListener("pointerout", function (e) {mUp(e);});
		document.addEventListener("pointerleave", function (e) {mUp(e);});
	}else{
		scrolCont.onmousedown = function(e){mDown(e);}
		document.addEventListener("mousemove", function (e) {mMove(e);});
		document.addEventListener("mouseup", function (e) {	mUp(e);});
		scrolCont.addEventListener("mouseleave", function (e) {	mUp(e);});
	}
}
//===скролл мышью ====КОНЕЦ

//===функция доводки скролла до целого слайда - для десктопа====НАЧАЛО
//получает: скролл-контейнер, массив слайдов, направление: true-влево, инерция - если не нужна, ставим 0
function mouseSwap(scrolCont, slide, leftDir, inerthDif){
	let sclLeft = scrolCont.scrollLeft; 
	let contWidth = scrolCont.offsetWidth;
	let contLeft = scrolCont.offsetLeft;
	let tmp = contWidth/slide[1].offsetWidth;
//console.log('inerthDif ' + inerthDif + '   leftDir  ' + leftDir);
	inerthDif=inerthDif*tmp*5;
	let scrolRez;
	if(leftDir==true){
		let j;
		for (j = 0; j < slide.length; j++) {
			scrolRez = ((slide[j].offsetLeft-contLeft) + slide[j].offsetWidth) - contWidth;
			if(slide[j].offsetWidth>(contWidth/2)){ //если слайд шире половины окна, ставим его по центру
				scrolRez = scrolRez + ((contWidth-slide[j].offsetWidth)/2);
			}else{scrolRez = scrolRez+3;} //если нет, то просто добавляем чуть-чуть, чтобы было не впритирку
			if(((slide[j].offsetLeft-contLeft) + slide[j].offsetWidth)>(sclLeft-inerthDif+contWidth)){break;}	}
		scrolCont.scrollTo({left: scrolRez, behavior: 'smooth'});
	}else{
		let j;
		for (j = (slide.length - 1); j >= 0; j--) {
			if((slide[j].offsetLeft-contLeft+slide[j].offsetWidth)<(sclLeft-inerthDif)){break;}
			scrolRez = slide[j].offsetLeft-contLeft;
			if(slide[j].offsetWidth>(contWidth/2)){ //если слайд шире половины окна, ставим его по центру
				scrolRez = scrolRez - ((contWidth-slide[j].offsetWidth)/2);
			}else{scrolRez = scrolRez-3;} //если нет, то просто убавляем чуть-чуть, чтобы было не впритирку
		scrolCont.scrollTo({left: scrolRez, behavior: 'smooth'});	}
	}
//	inerthDif=0;
}
//===функция доводки скролла до целого слайда - для десктопа====КОНЕЦ


//===установка доводки скролла по событию скролла - для сенсорных устройств====НАЧАЛО
function toSlowSet(scrolCont, slide) {
	let flagScr=true;
	let leftDir=true;
	let scLft=0;
	let timeDel;
	let timeTol;

	scrolCont.addEventListener("scroll", function (e) {
		if(flagScr==true){
			flagScr=false;
			clearTimeout(timeDel);
			
			let diff = scLft-scrolCont.scrollLeft;
			scLft=scrolCont.scrollLeft;
			if (diff<0){leftDir=true;}//по знаку переменной diff задается направление
			if (diff>0){leftDir=false;}//по знаку переменной diff задается направление
			//когда переменная diff уменьшится до 5, не восстанавливаем флаг разрешения обработки по скроллу
			//либо если событий скролла больше не будет, флаг также останется невосстановленным
			if (Math.abs(diff)>5){timeDel = setTimeout( function() {flagScr=true;	}, 20);	}
//			console.log('toSlowSet diff=' + diff + '    timeToL ' + timeTol);
			clearTimeout(timeTol);
			timeTol = setTimeout(function() {
				flagScr=false;
				setTimeout( function() {flagScr=true;}, 1000);
				toSlow(scrolCont, slide, leftDir, 0);				
			}, 100);
//			console.log('toSlowSet diff=' + diff + '    timeToL ' + timeTol);
		}
	});
}
//===установка доводки скролла для скролл-контейнера====КОНЕЦ

let mouseSwapFlag=true;
//===функция доводки скролла до целого слайда  - для сенсорных устройств====НАЧАЛО
//получает: скролл-контейнер, массив слайдов, направление: true-влево, инерция - если не нужна, ставим 0
function toSlow(scrolCont, slide, leftDir, inerthDif){
	if(mouseSwapFlag==true){
		let sclLeft = scrolCont.scrollLeft; 
		let contWidth = scrolCont.offsetWidth;
		let contLeft = scrolCont.offsetLeft;
		let tmp = contWidth/slide[1].offsetWidth;
		inerthDif=inerthDif*tmp*5;
		let scrolRez;
		
	//console.log('текущий скролл ' + sclLeft + '   ширина окна ' + contWidth + '   contLeft ' + contLeft);
		
		if(slide[1].offsetWidth>(contWidth/2)){ //если слайд шире половины окна, ставим его по центру
			let apprx=9999999;
			let j = 0;
			for (j; j < slide.length; j++) {		
				let tmp = Math.abs((sclLeft+(contWidth/2))-((slide[j].offsetWidth/2)+(slide[j].offsetLeft-contLeft)));
	//console.log(j + '  tmp ' + tmp + '=((' + sclLeft + '+(' + contWidth + '/2))-((' + slide[j].offsetWidth + '/2)+(' + slide[j].offsetLeft + '-' + contLeft + ')))');
	//console.log(j + '   apprx ' + apprx + '  tmp ' + tmp);
				if (apprx>tmp){apprx=tmp;}else{	break;}
			}
			j--;
			scrolRez = ((slide[j].offsetLeft-contLeft)-((contWidth-slide[j].offsetWidth)/2));
	//console.log(j + '  scrolRez ' + scrolRez + '= ((' + slide[j].offsetLeft + '-' + contLeft + ')-((' + contWidth + '-' + slide[j].offsetWidth + ')/2))');
		}else{
	//console.log('leftDir ' + leftDir);
			if(leftDir==true){
				let j;
				for (j = 0; j < slide.length; j++) {
					scrolRez = ((slide[j].offsetLeft-contLeft) + slide[j].offsetWidth) - contWidth + 3;
					if(((slide[j].offsetLeft-contLeft) + slide[j].offsetWidth)>(sclLeft-inerthDif+contWidth)){break;}	}
			}else{
				let j;
				for (j = (slide.length - 1); j >= 0; j--) {
					if((slide[j].offsetLeft-contLeft+slide[j].offsetWidth)<(sclLeft-inerthDif)){break;}
					scrolRez = slide[j].offsetLeft-contLeft-3;
				}
			}
			
		}
		scrolCont.scrollTo({left: scrolRez, behavior: 'smooth'});
	}
}
//===функция доводки скролла до целого слайда - для сенсорных устройств====КОНЕЦ


//====запуск видео на проигрывание===----здесь не применяется
let videoFrame = document.querySelectorAll(".videoFrame");
for (let i = 0; i < videoFrame.length; i++) {
	let video = videoFrame[i].querySelector(".videoFrame video");
	let playButt = videoFrame[i].querySelector(".videoFrame .playButt");
	function setVideoReady(){
		playButt.style.opacity = '0';
		video.setAttribute('controls', 'controls');
		video.play();}
if(playButt){playButt.onclick = function(){setVideoReady();}	}	}
//====запуск видео на проигрывание===----здесь не применяется

//======перебор контейнеров комплектов горизонтального скролла videoFBk и создание переменных контейнера слайдов-----НАЧАЛО
let videoFBk = document.querySelectorAll(".videoFBk");
for (let i = 0; i < videoFBk.length; i++) {
	let scrolCont = videoFBk[i].querySelector(".scrolCont");
	let slide = scrolCont.querySelectorAll(".videoFrame");
	let videoFrame = videoFBk[i].querySelectorAll(".videoFrame");
//====перекрывание прозрачным псевдоэлементом элемента с фреймом------НАЧАЛО
//	if(!isTouchDevice){
		for (let i = 0; i < videoFrame.length; i++) {
			let coordX;
			let coordY;
			let frzFlag=false;
			videoFrame[i].classList.add("glassed");
			videoFrame[i].onmousedown = function(e){coordX=e.pageX;	coordY=e.pageY;	}
			videoFrame[i].onmouseup = function(e){
				if(((Math.abs(coordX-e.pageX))<5)&&((Math.abs(coordY-e.pageY))<5)){
					frzFlag=false;
					setTimeout( function() {frzFlag=true;}, 50);
					this.classList.remove("glassed");}	}
			videoFrame[i].onmouseout = function(e){
				if(frzFlag==true){
					this.classList.add("glassed");	}	}	}
					//	}
//====перекрывание прозрачным псевдоэлементом элемента с фреймом------КОНЕЦ
	if(isTouchDevice==true){
		toSlowSet(scrolCont, slide);
	}else{
		mouseSwapSet(scrolCont, slide, true);
	}
	fictSide(scrolCont, slide);
	//	scrolCont.style.touchAction = "none";
	//	mouseSwapSet(scrolCont, slide, false);
	//	fictSide(scrolCont, slide);

}
//======перебор контейнеров комплектов горизонтального скролла videoFBk и создание переменных контейнера слайдов-----КОНЕЦ



let footSw=true;

function footerSwap() {
	if(footSw==true){
		footSw=false;
		setTimeout( function() {footSw=true;	}, 300);

		let footer = document.querySelector("footer");
		let colmn1 = footer.querySelector(".colmn1");
		let colmn2 = footer.querySelector(".colmn2");
		let colmn3 = footer.querySelector(".colmn3");
		let colmn4 = footer.querySelector(".colmn4");
		let logo = footer.querySelector(".logo");
		let wrkTim = footer.querySelector(".wrkTim");
		let persCab = footer.querySelector(".persCab");
		let szFlag;
		if(window.innerWidth<950){
			footer.classList.add("narr");
			szFlag=true;
			colmn2.prepend(wrkTim);
			colmn2.prepend(logo);
		}else{
			footer.classList.remove("narr");
			szFlag=false;
			colmn1.prepend(logo);
			persCab.after(wrkTim);
		}

		let swap = footer.querySelectorAll(".swap");
		
		for (let i = 0; i < swap.length; i++) {
			let arrDown = swap[i].querySelector(".arrDown");
			let ul = swap[i].querySelector("ul");
			let heigOn;
			if(szFlag==true){
				ul.style.opasity = "0";
				ul.style.transitionDuration = "0.4s";
				setTimeout( function() {
					heigOn = ul.clientHeight;
					ul.style.height = "0";
					ul.style.marginTop = "0";
				}, 200);
				
				let flag = false;
				swap[i].onclick = function(){
					if (flag == false) {
						ul.style.opasity = "1";
						ul.style.height = heigOn + "px";
						ul.style.marginTop = null;
						arrDown.style.transform = "scaleY( -1)";
						setTimeout( function() {flag = true; }, 200);}	}
						
				document.addEventListener("click", function (e) {
					if (flag == true) {
						setTimeout( function() {flag = false; }, 50);
						ul.style.opasity = "0";
						arrDown.style.transform = "scaleY(1)";
						ul.style.height = "0";
						ul.style.marginTop = "0";}	});
						
			}else{
				ul.style.height = null;
				ul.style.marginTop = null;
				ul.style.opasity = "1";
			}
		}
	}
}

let footSwapTime;

if (window.addEventListener) {
	window.addEventListener('resize', function (e) {
		footerSwap();
	});
} else if (window.attachEvent) {
	window.attachEvent('onresize', function (e) {
//		if(!footSwapTime){footSwapTime = setTimeout( function() {footSwapTime=null;footerSwap();}, 200);}
	});
}

footerSwap();

let goodCard = document.querySelectorAll(".goodCard");
for (let i = 0; i < goodCard.length; i++) {
	let like = goodCard[i].querySelector(".like");
	like.onclick = function(){
		if(like.classList.contains("marked")){
			like.classList.remove("marked");
		}else{
			like.classList.add("step1");
			like.classList.add("marked");
			like.classList.add("step2");
			setTimeout( function() {
				like.classList.remove("step1");
				like.classList.remove("step2");
				}, 100);
		}
	}

	let goodSlid = goodCard[i].querySelector(".goodSlid");
	let imgS = goodSlid.querySelectorAll(".goodSlid>*");
	let indicPanl = document.createElement("div");
	let slidDir = true;
	let slidDist;
	goodSlid.after(indicPanl);
	indicPanl.classList.add("indicPanl");
	if (imgS.length>1){
		
		for (let i = 0; i < imgS.length; i++) {
			let indic = document.createElement("div");
			indicPanl.append(indic);	}
		let indicS = indicPanl.querySelectorAll(".indicPanl>*");
		indicPanl.onmouseout = function(e){imgSwch(0);}
		for (let i = 0; i < indicS.length; i++) {
			indicS[i].onmousemove = function(){imgSwch(i);}
			indicS[i].onclick = function(){imgSwch(i);}		}
		
		imgSwch(0);
		
		function imgSwch(indx) {
			for (let i = 0; i < imgS.length; i++) {
				if(indx==i){
					imgS[i].style.opacity = "1";
					indicS[i].classList.add("marked");
				}else{
					imgS[i].style.opacity = "0";
					indicS[i].classList.remove("marked");}	}}
		
//=======================
	let swStep=goodSlid.offsetWidth/imgS.length;
	function goodSlidCoord(e) {
		let mousCoord = e.clientX - goodSlid.getBoundingClientRect().left;
		for (let i = 0; i < imgS.length; i++) {	if(mousCoord<(swStep*(i+1))){imgSwch(i);break;}}}
	
	goodSlid.onclick = function(e){goodSlidCoord(e);}
	goodSlid.onmousemove = function(e){goodSlidCoord(e);}
	goodSlid.onmouseout = function(e){imgSwch(0);}
	}}
//=======================


let filtShow = document.querySelectorAll(".filtShow");
for (let i = 0; i < filtShow.length; i++) {
	let filtBut = filtShow[i].querySelector(".filtBut");
	let button = filtBut.querySelectorAll("button");
	let cont = filtShow[i].querySelector(".gcCont");
	let aCard = cont.querySelectorAll(".gcCont>*");
	let fitArr = [];

	function applFilt(indx) {
		if(button[indx].classList.contains("marked")){
			button[indx].classList.remove("marked");
			for (let l = 0; l < aCard.length; l++) {aCard[l].style.display=null;}
		}else{
			for (let j = 0; j < button.length; j++) {
				button[j].classList.remove("marked");	}
			button[indx].classList.add("marked");
			for (let l = 0; l < aCard.length; l++) {
				aCard[l].style.display="none";
				for (let clName of aCard[l].classList) {
					if(clName==fitArr[indx]){
						aCard[l].style.display=null;
						break;}	}}}}

	for (let i = 0; i < button.length; i++) {
		for (let clName of button[i].classList) {
			if((clName.indexOf('filt'))==0){fitArr.push(clName);}	}
		button[i].onclick = function(){	applFilt(i);}	}

	applFilt(0);
}
