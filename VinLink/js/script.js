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

//======скролл функциональными кнопками-----начало
let hScrol = document.querySelectorAll(".hScrol");
for (let i = 0; i < hScrol.length; i++) {
	let scrolCont = hScrol[i].querySelector(".hScrol>.scrolCont");
	let dirFlag;
	let sCoord = scrolCont.scrollLeft; 

	let slide = scrolCont.querySelectorAll(".hScrol>.scrolCont>*");
	let arrLeft = hScrol[i].querySelector(".leftArr");
	let arrRight = hScrol[i].querySelector(".rightArr");

	if (arrRight) {	arrRight.onclick = function(){stepScrollLeft();}	}
	if (arrLeft) {	arrLeft.onclick = function(){stepScrollRight();}	}

	function stepScrollLeft() {
		let sclLeft = scrolCont.scrollLeft; 
		let contWidth = scrolCont.offsetWidth;
		let contLeft = scrolCont.offsetLeft;
		let scrolRez;
		for (let j = 0; j < slide.length; j++) {
			scrolRez = slide[j].offsetLeft-contLeft;
			if(slide[j].offsetWidth<contWidth){scrolRez = scrolRez--;}
			if((((slide[j].offsetLeft-contLeft) + slide[j].offsetWidth)-(sclLeft+contWidth))>5){break;}
		}
		scrolCont.scrollTo({left: scrolRez, behavior: 'smooth'});
	}

	function stepScrollRight() {
		let sclLeft = scrolCont.scrollLeft; 
		let contWidth = scrolCont.offsetWidth;
		let contLeft = scrolCont.offsetLeft;
		let scrolRez;
		for (let j = (slide.length - 1); j >= 0; j--) {
			scrolRez = ((slide[j].offsetLeft-contLeft)+slide[j].offsetWidth)-contWidth;
			if(slide[j].offsetWidth<contWidth){scrolRez = scrolRez++;}
			if((sclLeft-(slide[j].offsetLeft-contLeft))>5){break;}
		}
		scrolCont.scrollTo({left: scrolRez, behavior: 'smooth'});
	}
//======скролл функциональными кнопками-----конец

//===========
//	if(!isTouchDevice){touchSwap(scrolCont, slide);	}
	touchSwap(scrolCont, slide);
}

//===скролл мышью ====начало
function touchSwap(scrolCont, slide) {
	let mouseShift;
	let dragFlag=false;
	let stopFlag=true;
	let prevPnt;
	let inerthDif=0;
	
	function mDown(e) {
		if(stopFlag==true){
//console.log('mDown');
//=======================
			e.preventDefault();
//=======================
			mouseShift=e.pageX;
			dragFlag=true;
			prevPnt=e.pageX;
			inerthDif=0;
		}	}
	function mMove(e) {
//console.log('mMove');
		if(dragFlag==true){
			scrolCont.scrollLeft=scrolCont.scrollLeft+(mouseShift-e.pageX);
			mouseShift=e.pageX;
			inerthDif = e.pageX - prevPnt;
			prevPnt=e.pageX;
		}	}
	function mUp(e) {
//console.log('mUp');
		if(dragFlag==true){
			dragFlag=false;
			stopFlag=false;
			setTimeout( function() {stopFlag=true;}, 100);
			let sclLeft = scrolCont.scrollLeft; 
			let contWidth = scrolCont.offsetWidth;
			let contLeft = scrolCont.offsetLeft;
			let tmp = (scrolCont.scrollWidth/slide.length)/contWidth;
			inerthDif=inerthDif*tmp*20;
			let scrolRez;
			if(inerthDif<0){
				let j;
				for (j = 0; j < slide.length; j++) {
					scrolRez = ((slide[j].offsetLeft-contLeft) + slide[j].offsetWidth) - contWidth;
					if(slide[j].offsetWidth>(contWidth/2)){ //если слайд шире половины окна, ставим его по центру
						scrolRez = scrolRez + ((contWidth-slide[j].offsetWidth)/2);
					}else{scrolRez = scrolRez+3;} //если нет, то просто добавляем чуть-чуть, чтобы было не впритирку
					if(((slide[j].offsetLeft-contLeft) + slide[j].offsetWidth)>(sclLeft-inerthDif+contWidth)){break;}	}
				scrolCont.scrollTo({left: scrolRez, behavior: 'smooth'});
			}
			if(inerthDif>0){
				let j;
				for (j = (slide.length - 1); j >= 0; j--) {
					if((slide[j].offsetLeft-contLeft+slide[j].offsetWidth)<(sclLeft-inerthDif)){break;}
					scrolRez = slide[j].offsetLeft-contLeft;
					if(slide[j].offsetWidth>(contWidth/2)){ //если слайд шире половины окна, ставим его по центру
						scrolRez = scrolRez - ((contWidth-slide[j].offsetWidth)/2);
					}else{scrolRez = scrolRez-3;} //если нет, то просто убавляем чуть-чуть, чтобы было не впритирку
				scrolCont.scrollTo({left: scrolRez, behavior: 'smooth'});	}
			}
			inerthDif=0;
		}
	}

	if(isTouchDevice==true){
		scrolCont.style.touchAction = "none";
		scrolCont.onpointerdown = function(e){mDown(e);}
		document.addEventListener("pointermove", function (e) {mMove(e);});
		document.addEventListener("pointerout", function (e) {mUp(e);});
	}else{
		scrolCont.onmousedown = function(e){mDown(e);}
		document.addEventListener("mousemove", function (e) {mMove(e);});
		document.addEventListener("mouseup", function (e) {	mUp(e);});
		scrolCont.addEventListener("mouseleave", function (e) {	mUp(e);});
	}
}
//===скролл мышью ====конец

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

//====перекрывание прозрачным псевдоэлементом элемента с фреймом
function frameGlass() {
	let videoFBk = document.querySelectorAll(".videoFBk");
	for (let i = 0; i < videoFBk.length; i++) {
		let mouseShift;
		let dragFlag=false;
		let scrolCont = videoFBk[i].querySelector(".scrolCont");
		let slide = scrolCont.querySelectorAll(".videoFrame");
		let videoFrame = videoFBk[i].querySelectorAll(".videoFrame");
		for (let i = 0; i < videoFrame.length; i++) {
			let coordX;
			let coordY;
			let frzFlag=false;
			videoFrame[i].classList.add("glassed");
			videoFrame[i].onmousedown = function(e){coordX=e.pageX;	coordY=e.pageY;	}
			videoFrame[i].onmouseup = function(e){
				if(((Math.abs(coordX-e.pageX))<5)&&((Math.abs(coordY-e.pageY))<5)){
					frzFlag=false;
					setTimeout( function() {frzFlag=true;}, 300);
					this.classList.remove("glassed");}	}
			videoFrame[i].onmouseout = function(e){
				if(frzFlag==true){
					this.classList.add("glassed");	}	}	
		}
		touchSwap(scrolCont, slide);
	}}

frameGlass();
//====перекрывание прозрачным псевдоэлементом элемента с фреймом



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
//=======================
/*
	let mousCoord;
	let slIndex;
	let alFlag=true;
	let swStep;
	let prntCoord;

	goodSlid.onmouseover = function(e){
console.log('onmouseover');
		prntCoord = goodSlid.getBoundingClientRect().left ;
		mousCoord = e.clientX - prntCoord;
		swStep = goodSlid.offsetWidth/imgS.length;
		if (((this.offsetWidth/2)-mousCoord)>0){//заход слева
			slIndex=0;
//		console.log('заход слева prntCoord  ' + prntCoord +'   e.clientX '  + e.clientX);
		}else{//заход справа
			slIndex=(imgS.length - 1);
//		console.log('заход справа prntCoord  ' + prntCoord +'   e.clientX ' + e.clientX);
		}
		imgSwch(slIndex);
	}

	goodSlid.onmousemove = function(e){
console.log('onmousemove');
		if(alFlag==true){
			alFlag=false;
			setTimeout( function() {alFlag=true;}, 200);
			let clX = e.clientX - prntCoord;
			if(clX>mousCoord){//движение вправо
//				console.log('движение вправо  clX=' + clX);
				if((clX-((slIndex+1)*swStep))>10){if(slIndex<(imgS.length-1)){	slIndex++;}	}
			}else{//движение влево
//				console.log('движение влево  clX=' + clX);
				if(((slIndex*swStep)-clX)>10){	if(slIndex>0){	slIndex--;}	}}
			imgSwch(slIndex);
			mousCoord = clX;}	}

	goodSlid.onmouseout = function(e){imgSwch(0);}
	}}
	*/
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
