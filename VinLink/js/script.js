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

//===========
//	if(!isTouchDevice){touchSwap(scrolCont, slide);	}
	touchSwap(scrolCont, slide);
}


function touchSwap(scrolCont, slide) {
	let mouseShift;
	let dragFlag=false;
	let stopFlag=true;
	let prevPnt;
	let inerthDif=0;
	
	function mDown(e) {
		if(stopFlag==true){
//========
//			e.preventDefault();
			if(!isTouchDevice){e.preventDefault();}
//========
			mouseShift=e.pageX;
			dragFlag=true;
			prevPnt=e.pageX;
			inerthDif=0;
		}	}
	function mMove(e) {
		if(dragFlag==true){
			scrolCont.scrollLeft=scrolCont.scrollLeft+(mouseShift-e.pageX);
			mouseShift=e.pageX;
			inerthDif = e.pageX - prevPnt;
			prevPnt=e.pageX;
		}	}
	function mUp(e) {
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
					if(slide[j].offsetWidth<contWidth){scrolRez = scrolRez+3;}
					if(((slide[j].offsetLeft-contLeft) + slide[j].offsetWidth)>(sclLeft-inerthDif+contWidth)){break;}	}
				scrolCont.scrollTo({left: scrolRez, behavior: 'smooth'});
			}
			if(inerthDif>0){
				let j;
				for (j = (slide.length - 1); j >= 0; j--) {
					if((slide[j].offsetLeft-contLeft+slide[j].offsetWidth)<(sclLeft-inerthDif)){break;}
					scrolRez = slide[j].offsetLeft-contLeft;
					if(slide[j].offsetWidth<contWidth){scrolRez = scrolRez-3;}	}
				scrolCont.scrollTo({left: scrolRez, behavior: 'smooth'});
			}
			inerthDif=0;
		}
	}

	if(isTouchDevice==true){
		scrolCont.style.touchAction = "none";
		scrolCont.addEventListener("pointerdown", function (e) {mDown(e);});
		document.addEventListener("pointermove", function (e) {mMove(e);});
		document.addEventListener("pointerout", function (e) {mUp(e);});
	}else{
		scrolCont.onmousedown = function(e){mDown(e);}
//		scrolCont.addEventListener("mousedown", function (e) {mDown(e);});
		document.addEventListener("mousemove", function (e) {mMove(e);});
		document.addEventListener("mouseup", function (e) {mUp(e);});
	}
}


let videoFrame = document.querySelectorAll(".videoFrame");
for (let i = 0; i < videoFrame.length; i++) {
	let video = videoFrame[i].querySelector(".videoFrame video");
	let playButt = videoFrame[i].querySelector(".videoFrame .playButt");
	function setVideoReady(){
		playButt.style.opacity = '0';
		video.setAttribute('controls', 'controls');
		video.play();}
if(playButt){
	playButt.onclick = function(){setVideoReady();}	}
}

function videoSwap() {
	let videoFBk = document.querySelectorAll(".videoFBk");
	for (let i = 0; i < videoFBk.length; i++) {
		let mouseShift;
		let dragFlag=false;
		let scrolCont = videoFBk[i].querySelector(".scrolCont");
		let slide = scrolCont.querySelectorAll(".videoFrame");
		if(isTouchDevice==true){
			videoFBk[i].classList.add("mobNarr");
		}else{
			videoFBk[i].classList.remove("mobNarr");
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
		}
		touchSwap(scrolCont, slide);
	}}

videoSwap();



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
			
			if(szFlag==true){
				ul.style.display="none";
				arrDown.style.transform = "scaleY(1)";
				ul.style.transformOrigin = "center top";
				ul.style.opasity = "0";
				ul.style.transform = "scaleY(0)";
				ul.style.transitionDuration = "0.3s";
				let flag = false;
				swap[i].onclick = function(){
					if (flag == false) {
						ul.style.display="block";
						setTimeout( function() {
							ul.style.opasity = "1";
							ul.style.transform = "scaleX(1)";
							arrDown.style.transform = "scaleY( -1)";
							 }, 30);
						setTimeout( function() {
							flag = true; }, 350);}	}
				document.addEventListener("click", function (e) {
					if (flag == true) {
						setTimeout( function() {flag = false; }, 30);
						ul.style.opasity = "0";
						ul.style.transform = "scaleY(0)";
						arrDown.style.transform = "scaleY(1)";
						setTimeout( function() {	ul.style.display=null;	}, 300);	}	});
			}else{
				ul.style.display="block";
				ul.style.opasity = "1";
				ul.style.transform = "scaleX(1)";
			}
		}
	}
}


if (window.addEventListener) {
	window.addEventListener('resize', function (e) {
		footerSwap();
	});
} else if (window.attachEvent) {
	window.attachEvent('onresize', function (e) {
		footerSwap();
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
				}, 100);}	}

	let slIndex;
	let alFlag=true;
	let swStep;
	let parntCoord;
	let goodSlid = goodCard[i].querySelector(".goodSlid");
	let imgS = goodSlid.querySelectorAll(".goodSlid>*");
	let indicPanl = document.createElement("div");
	goodSlid.after(indicPanl);
	indicPanl.classList.add("indicPanl");
	if (imgS.length>1){
		
		for (let i = 0; i < imgS.length; i++) {
			let indic = document.createElement("div");
			indicPanl.append(indic);	}
		let indicS = indicPanl.querySelectorAll(".indicPanl>*");
		indicPanl.onmouseout = function(e){imgSwch(0);}
		for (let i = 0; i < indicS.length; i++) {
			indicS[i].onmousemove = function(e){
				if(!this.classList.contains("marked")){imgSwch(i);}	}}
		
		imgSwch(0);
		
		function imgSwch(indx) {
			for (let i = 0; i < imgS.length; i++) {
				if(indx==i){
					slIndex=i;
					imgS[i].style.opacity = "1";
					indicS[i].classList.add("marked");
				}else{
					imgS[i].style.opacity = "0";
					indicS[i].classList.remove("marked");}	}	}
		
//=======================
	goodSlid.onmouseover = function(e){
		parntCoord = goodSlid.getBoundingClientRect().left;
		swStep = goodSlid.offsetWidth/imgS.length;
		alFlag=true;}
	goodSlid.onmousemove = function(e){
		if(alFlag==true){
			alFlag=false;
			setTimeout( function() {alFlag=true;}, 50);
			let mousCoord = e.clientX - parntCoord;
			for (let i = 0; i < imgS.length; i++) {if(mousCoord<(swStep*(i+1))){slIndex=i;break;}}
			imgSwch(slIndex);	}	}
	goodSlid.onmouseout = function(e){
		alFlag=false;
		slIndex=0;
		imgSwch(slIndex);}
}}


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
