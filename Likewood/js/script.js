let body = document.querySelector("body");

/*<----тестовый вывод размеров окна*/
let sizDisp = document.createElement("div");
body.append(sizDisp);
sizDisp.style.cssText = "position:fixed;top:150px;left:2px;background:white;color:black;padding:0 5px;border: 1px solid red;";
function sdReN() {
	sizDisp.innerHTML = `${window.innerWidth} x ${window.innerHeight}`;
	if (window.innerWidth<900) {sizDisp.style.fontSize = `${window.innerWidth/20}px`;} else {
		sizDisp.style.fontSize = `${window.innerWidth/70}px`;}
	}
sdReN();
window.addEventListener("resize", function (e) {sdReN(); });
/*тестовый вывод размеров окна---->*/



let blur = document.createElement("div");
blur.classList.add('blur');
body.prepend(blur);

let burger = document.querySelector(".burger");
let burgerMenu = document.querySelector(".burgerMenu");

let header = document.querySelector("header");
burgerMenu.append(header.querySelector(".header-line02").cloneNode(true));
burgerMenu.append(header.querySelector(".social-block").cloneNode(true));
burgerMenu.append(header.querySelector(".telph-block").cloneNode(true));


//blur.style.transformOrigin = "center top";
blur.style.opacity = "0";
//blur.style.transform = "scaleY(0)"; 
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
//					blur.style.transform = "scaleY(1)";
					burgerMenu.style.opacity = "1";
					burgerMenu.style.transform = "scaleY(1)";
				}, 30);
				setTimeout( function() {flag = true; }, 350);}	}
		document.addEventListener("click", function (e) {
			if (flag == true) {
				setTimeout( function() {flag = false; }, 30);
				blur.style.opacity = "0";
//				blur.style.transform = "scaleY(0)"; 
				burgerMenu.style.opacity = "0";
				burgerMenu.style.transform = "scaleY(0)"; 
				setTimeout( function() {
					blur.style.display=null;
					burgerMenu.style.display=null;
				}, 300);}});}

//flow-banner========
let flowBanner = document.querySelector('.flow-banner');
if (flowBanner){
	let clos = flowBanner.querySelector('.clos');
	let buttn = flowBanner.querySelector('.buttn');

	function closBann() {
		blur.style.opacity = "0";
		flowBanner.style.opacity='0';
		setTimeout( function() {
			blur.style.display = "none";
			flowBanner.style.display='none';
		}, 400);
	}

	setTimeout( function() {
		blur.style.display = "block";
		flowBanner.style.display='block';
		setTimeout( function() {
			blur.style.opacity = "1";
			flowBanner.style.transform='translate(50%, -50%) scale(1, 1)';
			flowBanner.style.opacity='1';
			clos.onclick = function(){
				closBann();
			}
		}, 100);
	}, 5000);
}


//коррекция ввода номера телефона========
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
//-------------коррекция ввода номера телефона

//блокировка формы по чекбоксу соглашения =======================
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
//-----------------блокировка формы по чекбоксу соглашения




let horScrol = document.querySelectorAll(".horScrol-1");
for (let i = 0; i < horScrol.length; i++) {
	if (horScrol[i]){
		let slideCont = horScrol[i].querySelector(".horScrol>.slideCont");
		let slide = slideCont.querySelectorAll(".horScrol>.slideCont>*");
		
		let leftArr = horScrol[i].querySelector(".horScrol>.arrBlock>.leftArr");
		let rightArr = horScrol[i].querySelector(".horScrol>.arrBlock>.rightArr");

		leftArr.onclick = function(e){
			--curNum;if (curNum<0){curNum=0;}
			scrolNStep();		}
			
		rightArr.onclick = function(e){
			//костыль: если скролл закончился, то свайп не выполняем
			if((slideCont.scrollWidth - (slideCont.scrollLeft + slideCont.clientWidth))>0){
				++curNum;if (curNum>(slide.length - 1)){curNum=(slide.length - 1);}
				scrolNStep();	}	}

		//плавный свайп к слайду curNum
		function scrolNStep() {
			let tmp = slide[curNum].offsetLeft - slideCont.offsetLeft;
			slideCont.scrollTo({left: tmp, behavior: 'smooth'});
		}

		let curNum=0;	//порядковый номер текущего слайда к которому выполняется скролл
		let movCnt=0; //для пропуска событий mousemove
		let rolBlck = true;//флаг блокировки свайпа слайдов мышью
		let dragM = false;
		let startSL = slideCont.scrollLeft; //стартовая позиция скролла
		let curX; //текущая позиция мыши
		let transDur = 300;

	//старт свайпа на контейнере
		function StartSwipe(e) {
			if (rolBlck==true){
				startSL = slideCont.scrollLeft;
				curX=e.pageX;
				dragM = true;
				}	}

	//движение свайпа на документе
		function MoveSwipe(e) {
			if(movCnt==0){
				movCnt=0; //задает скважность пропуска событий mousemove
				if((dragM==true)&&(rolBlck==true)){
					slideCont.scrollLeft = slideCont.scrollLeft + curX - e.pageX;
	//				carryOver();
					curX = e.pageX;		}
			}else{movCnt--;}	}
	//конец свайпа на документе 2222
		function EndSwipe(e) {
			if((dragM==true)&&(rolBlck==true)){
				dragM=false;
				rolBlck=false;
				for (let i = 0; i < slide.length; i++) {
					let diff = ((slide[i].offsetLeft - slideCont.offsetLeft + slide[i].offsetWidth) - slideCont.scrollLeft);
					if (diff>0){
						if((slide[i].offsetWidth/diff)<2){
							curNum = i;
							break;
						}
					}
				}
				//костыль: если скролл закончился, то свайп не выполняем
				if((slideCont.scrollWidth - (slideCont.scrollLeft + slideCont.clientWidth))>0){
					scrolNStep();//свайп к слайду curNum
				}
				rolBlck = true;//Разблокируем свайп
			}	}

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
	//		console.log("1 ontouchstart");
			e.preventDefault();
	//		console.log("touchstart");
			StartSwipe(e.changedTouches[0]);
		}

		slideCont.ontouchmove = function(e) {
	//		console.log("2 ontouchmove");
			e.preventDefault();
	//		console.log("touchmove:  e=" + e + "    Координата=" + e.changedTouches[0]);
			MoveSwipe(e.changedTouches[0]);
		}

		slideCont.ontouchend = function(e) {
	//		console.log("3 ontouchend");
			e.preventDefault();
	//		console.log("touchend");
			EndSwipe(e.changedTouches[0]);
		}

		slideCont.ontouchcancel = function(e) {
	//		console.log("4 ontouchcancel");
			e.preventDefault();
	//		console.log("touchcancel");
		}


	//============================================



	//========= События десктопа ==============

	//нажатие мыши на контейнере
		slideCont.onmousedown = function(e){
	//		console.log("1 onmousedown");
			e.preventDefault();
			StartSwipe(e);
		}
	//перемещение нажатой мыши на документе
		document.addEventListener("mousemove", function(e) {
	//		console.log("2 mousemove");
			MoveSwipe(e);
		});

	//отпускание мыши на документе
		document.addEventListener("mouseup", function(e) {
	//		console.log("3 mouseup");
			EndSwipe(e);
		});
/*		
	//выход мыши за пределы слайдера
		slideCont.addEventListener("mouseout", function(e) {
			EndSwipe(e);
		});
		*/
	//============================================

	}
	//============================================
	
}
