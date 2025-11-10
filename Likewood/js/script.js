let body = document.querySelector("body");
let blur = document.createElement("div");
blur.classList.add('blur');
body.prepend(blur);

let burger = document.querySelector(".burger");
let burgerMenu = document.querySelector(".burgerMenu");

let header = document.querySelector("header");
burgerMenu.append(header.querySelector(".header-line02").cloneNode(true));
burgerMenu.append(header.querySelector(".social-block").cloneNode(true));
burgerMenu.append(header.querySelector(".telph-block").cloneNode(true));

blur.style.opacity = "0";
blur.style.transitionDuration = "0.3s";
burgerMenu.style.transformOrigin = "center top";
burgerMenu.style.opacity = "0";
burgerMenu.style.transform = "scaleY(0)"; 
burgerMenu.style.transitionDuration = "0.3s";
let flag = false;

if(blur&&burger&&burgerMenu){
		burger.onclick = function(){
			if (flag == false) {
				blur.style.display = "block";
				burgerMenu.style.display = "flex";
				setTimeout( function() {
					blur.style.opacity = "1";
					burgerMenu.style.opacity = "1";
					burgerMenu.style.transform = "scaleY(1)";
				}, 30);
				setTimeout( function() {flag = true; }, 350);}	}
		document.addEventListener("click", function (e) {
			if (flag == true) {
				setTimeout( function() {flag = false; }, 30);
				blur.style.opacity = "0";
				burgerMenu.style.opacity = "0";
				burgerMenu.style.transform = "scaleY(0)"; 
				setTimeout( function() {
					blur.style.display=null;
					burgerMenu.style.display=null;
				}, 300);}});}


let flowBanner = document.querySelector('.flow-banner');
if (flowBanner){
	let clos = flowBanner.querySelector('.clos');
	let buttn = flowBanner.querySelector('.buttn');
	let ahref = flowBanner.querySelector('a');

	function closBann() {
		blur.style.opacity = "0";
		flowBanner.style.opacity='0';
		setTimeout( function() {
			blur.style.display = "none";
			flowBanner.style.display='none';
		}, 400);	}

	setTimeout( function() {
		blur.style.display = "block";
		flowBanner.style.display='block';
		setTimeout( function() {
			blur.style.opacity = "1";
			flowBanner.style.transform='translate(50%, -50%) scale(1, 1)';
			flowBanner.style.opacity='1';
			clos.onclick = function(){	closBann();	}
			ahref.onclick = function(){	closBann();	}
		}, 100);
	}, 5000);
}



let phoneInput = document.querySelectorAll('input[type="tel"]');
for (let j = 0; j < phoneInput.length; j++) {
	function appMask(event) {
		let tmpStr = phoneInput[j].value;
		if (tmpStr.length>0) {
			let i = 0;
			function digCorr() {if (!tmpStr[i].match('[0-9]')){tmpStr = tmpStr.slice(0, (i)) + tmpStr.slice(i+1);}	}
			function symReplc(symb) {if (tmpStr.slice(i, (i+1))!=symb){tmpStr = tmpStr.slice(0, (i)) + symb + tmpStr.slice(i);}	}
			do { switch(i) {
					case 0: symReplc('+'); break;
					case 1: symReplc('7'); break;
					case 2: symReplc(' '); break;
					case 3:	case 4:	case 5: digCorr(); break;
					case 6: symReplc('-'); break;
					case 7:	case 8:	case 9: digCorr(); break;
					case 10: symReplc('-'); break;
					case 11: case 12: case 13: case 14: digCorr(); break;
					case 15: tmpStr = tmpStr.slice(0, 15); break;}
				i = i + 1;}
			while (i<tmpStr.length);
			phoneInput[j].value = tmpStr;	}	}

	phoneInput[j].addEventListener("input", appMask, false);
	phoneInput[j].addEventListener("focus", appMask, false);
	phoneInput[j].addEventListener("blur", appMask, false);
	phoneInput[j].addEventListener("keydown", appMask, false)
}



let forms = document.querySelectorAll("form");
for (let i = 0; i < forms.length; i++) {
	let agrChk = forms[i].querySelector(".agrChk");
	if (agrChk) {
		forms[i].addEventListener('submit', function(evt) {
			evt.preventDefault();
			if(!agrChk.checked) {
				return;
				}
			this.submit();
		});
	}
}




let hScrolls = document.querySelectorAll(".horScrol");
for (let i = 0; i < hScrolls.length; i++) {
	let hScroll = hScrolls[i];
	if (hScroll){

		let slideCont = hScroll.querySelector(".slideCont");
		let slide = slideCont.querySelectorAll(":scope>*");

		let arrCont = hScroll.querySelector(".arrBlock");
		let leftArr = arrCont.querySelector(".leftArr");
		let rightArr = arrCont.querySelector(".rightArr");

	
		leftArr.onclick = function(e){
			--curNum;
			if (curNum<0){curNum=0;}
			scrolNStep();		}
			
	
		rightArr.onclick = function(e){
			if (scrolNotEnd()){ 
				++curNum;
				if (curNum>(slide.length - 1)){curNum=(slide.length - 1);}
				scrolNStep();		}	}

		let curNum=0;	
		let movCnt=0; 
		let rolBlck = true;
		let dragM = false;
		let startSL = slideCont.scrollLeft; 
		let curX; 
		let transDur = 300;
		
	
		function StartSwipe(e) {
			if (rolBlck==true){
				startSL = slideCont.scrollLeft;
				curX=e.pageX;
				dragM = true;	}	}
	
		function MoveSwipe(e) {
			if(movCnt==0){
				movCnt=0; 
				if((dragM==true)&&(rolBlck==true)){
					slideCont.scrollLeft = slideCont.scrollLeft + curX - e.pageX;
					curX = e.pageX;		}
			}else{movCnt--;}	}
	
		function EndSwipe(e) {
			if((dragM==true)&&(rolBlck==true)){
				dragM=false;
				rolBlck=false;
				if (scrolNotEnd()){ 
					CalCurNum();
					scrolNStep();
				}
				rolBlck = true;		}	}
	
		function CalCurNum() {
			for (let i = 0; i < slide.length; i++) {
				let diff = ((slide[i].offsetLeft - slideCont.offsetLeft + slide[i].offsetWidth) - slideCont.scrollLeft);
				if (diff>0){
					if((slide[i].offsetWidth/diff)<2){
						curNum = i;
						break;	}	}	}	}
	
		function scrolNStep() {
			let tmp = slide[curNum].offsetLeft - slideCont.offsetLeft;
			slideCont.scrollTo({left: tmp, behavior: 'smooth'});	}

		function scrolNotEnd() {
			if((slideCont.scrollWidth - (slideCont.scrollLeft + slideCont.clientWidth))>0){
				return true;}else{return false;}	}
	
		let isTouchDevice = "ontouchstart" in window || navigator.msMaxTouchPoints;
		if(isTouchDevice==true){
			let timerId=null;
			let isNatSwipe = true;
			function SwipeTune() {
				if (timerId!=null){clearTimeout(timerId);}
				timerId = setTimeout( function() {
					timerId=null;
					
					if ((isNatSwipe==true)&&(dragM==false)){
						CalCurNum();
						if (scrolNotEnd()){ 
							isNatSwipe=false;
							setTimeout( function() {
								isNatSwipe=true;
							}, 500);
							scrolNStep();
						}
					}
				}, 50);
			}
			slideCont.addEventListener('scroll', function() {
				SwipeTune();
			});
			slideCont.addEventListener("touchstart", function(e) {
				dragM = true;
			});
			slideCont.addEventListener("touchend", function(e) {
				dragM = false;
				SwipeTune();
			});
			slideCont.addEventListener("touchcancel", function(e) {
				dragM = false;
				SwipeTune();
			});
		}else{
			slideCont.onmousedown = function(e){
				e.preventDefault();
				StartSwipe(e);
			}
			document.addEventListener("mousemove", function(e) {
				MoveSwipe(e);
			});
			document.addEventListener("mouseup", function(e) {
				EndSwipe(e);
			});
		}
	}
}
