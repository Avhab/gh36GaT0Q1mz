let body = document.querySelector("body");

/*<----тестовый вывод размеров окна*/
let sizDisp = document.createElement("div");
body.append(sizDisp);
sizDisp.style.cssText = "position:fixed;top:2px;left:2px;background:white;color:black;padding:0 5px;border: 1px solid red;";
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
/*burgerMenu.append(header.querySelector(".social-block").cloneNode(true));*/
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
let flowForm = document.querySelectorAll('.flowForm');

if (flowBanner&&(flowForm.length>0)){
	let buttn = flowBanner.querySelector('.buttn');
	let finalBut = flowBanner.querySelector('input.finalBut');

	function closBann() {
		blur.style.opacity = "0";
		flowBanner.style.opacity='0';
		setTimeout( function() {
			blur.style.display = "none";
			flowBanner.style.display='none';
		}, 400);
	}
			
	for (let i = 0; i < flowForm.length; i++) {
		flowForm[i].onclick = function(){
			blur.style.display = "block";
			flowBanner.style.display='block';
			
			let agrChk = flowBanner.querySelector('.agrChk');
			agrChk.checked = false;
			
			setTimeout( function() {
				blur.style.opacity = "1";
				flowBanner.style.transform='translate(50%, -50%) scale(1, 1)';
				flowBanner.style.opacity='1';
				blur.onclick = function(){	closBann();	}
			}, 100);
		}
	}
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


//========скроллинг для десктопа и тача ================= 
let hScrolls = document.querySelectorAll(".hScroll");
for (let i = 0; i < hScrolls.length; i++) {
	let hScroll = hScrolls[i];
	if (hScroll){

		let slideCont = hScroll.querySelector(".slideCont");
		let slide = slideCont.querySelectorAll(":scope>*");

		let arrCont = hScroll.querySelector(".arrCont");
		let leftArr = arrCont.querySelector(".leftArr");
		let rightArr = arrCont.querySelector(".rightArr");

	let padCorr=0;	//величина padding-коррекции при имитации видимости элементов за пределами контейнера

//для видимости элементов скролла на всю ширину экрана - добавить класс wide100scrol к контейнеру
//плюс задать желаемую рабочую ширину контейнера, напр. классом wrapG - на её основании скрипт рассчитает padding при 100% ширине
//убрать ограничения ширины с родительских объектов - тот же класс wrapG
	if (slideCont.classList.contains("wide100scrol")) {
	//видимость элементов за пределами контейнера
		let windWid = document.documentElement.clientWidth;
		let contWid = slideCont.clientWidth;
		let contSty = window.getComputedStyle(slideCont);
		let padL = contSty.paddingLeft;
	//	let padR = contSty.paddingRight;
		padL = Number(padL.slice(0 , (padL.length - 2)));
	//	padR = Number(padR.slice(0 , (padR.length - 2))); //при симметричных padding считаем только один
		let padResl = ((windWid - contWid)/2);
		if (padResl==0){padResl = padL}else{padResl = padResl + padL};
		slideCont.style.padding = "0 " + padResl + "px";
		slideCont.style.width = "100%";
		slideCont.style.maxWidth = "none";
//		slideCont.style.margin = "0";
	//----------видимость элементов за пределами контейнера
		padCorr = padResl;
	}
	
	//левая кнопка скролла
		leftArr.onclick = function(e){
			slideOffSetFill();
			--curNum;
			if (curNum<0){curNum=0;}
			scrolNStep();		}
			
	//правая кнопка скролла
		rightArr.onclick = function(e){
			slideOffSetFill();
			if (scrolNotEnd()){ //свайп выполняем, если скролл не закончился
				++curNum;
				if (curNum>(slide.length - 1)){curNum=(slide.length - 1);}
				scrolNStep();		}	}

		let curNum=0;	//порядковый номер текущего слайда к которому выполняется скролл
		let movCnt=0; //для пропуска событий mousemove
		let rolBlck = true;//флаг блокировки свайпа слайдов мышью либо тачем
		let dragM = false;//флаг таскания свайпа слайдов мышью либо тачем
		let scrolPos = slideCont.scrollLeft; //позиция скролла
		let curX; //текущая позиция мыши
		let transDur = 300;
		let slideOffSet = []; //массив для значений позиций слайдов slide[i].offsetLeft - нужно для обработки эластичности

		function slideOffSetFill() {
			slideOffSet.length = 0; //очищаем массив
			for (let i = 0; i < slide.length; i++) {slideOffSet.push(slide[i].offsetLeft);}//заполняем его позициями слайдов
		}
		
	//старт свайпа на контейнере
		function StartSwipe(e) {
			if (rolBlck==true){
				scrolPos = slideCont.scrollLeft;
				if(e.pageX){curX=e.pageX}else{curX=e.touches[0].pageX}//считываем координаты мыши, либо тача
				dragM = true;
				slideOffSetFill();
			}	}

	//движение свайпа на документе
		function MoveSwipe(e) {
			if (dragM==true){
				if(movCnt==0){
					movCnt=0; //задает скважность пропуска событий mousemove - если 0 - нет пропусков
					if((dragM==true)&&(rolBlck==true)){
						slideCont.scrollLeft = slideCont.scrollLeft + curX - e.pageX;
						curX = e.pageX;		}
				}else{movCnt--;}
			}
		}

	//конец свайпа на документе
		function EndSwipe(e) {
			if((dragM==true)&&(rolBlck==true)){
				dragM=false;
				rolBlck=false;
				if (scrolNotEnd()){		//свайп выполняем, если скролл не закончился
					CalCurNum();
					scrolNStep();}		//свайп к слайду curNum
				rolBlck = true;}	}	//Разблокируем свайп

	//вычисление и переключение текущего номера слайда в соответствии с текущей позицией скролла
		function CalCurNum() {
			for (let i = 0; i < slide.length; i++) {
				let diff = ((slideOffSet[i] - padCorr - slideCont.offsetLeft + slide[i].offsetWidth) - slideCont.scrollLeft);
				if (diff>0){
					if((slide[i].offsetWidth/diff)<2){
						curNum = i;
						break;	}	}	}	}

	//плавный свайп к слайду curNum
		function scrolNStep() {
			let tmp = slideOffSet[curNum] - slideCont.offsetLeft - padCorr;
			slideCont.scrollTo({left: tmp, behavior: 'smooth'});	}

	//проверка конца скролла
		function scrolNotEnd() {
			if((slideCont.scrollWidth - (slideCont.scrollLeft + slideCont.clientWidth))>0){
				return true;}else{return false;}	}
				
//=======эластичность====НАЧАЛО
		document.addEventListener("touchmove", function(e) {elastMake(e);});
		slideCont.addEventListener("touchend", function(e) {elastStop();});
		slideCont.addEventListener("touchcancel", function(e) {elastStop();});
		document.addEventListener("mousemove", function(e) {elastMake(e);});
		document.addEventListener("mouseup", function(e) {elastStop();	});

		let moveDir = 0;//направление движения мыши, тача
		let elastCount = 0; //счетчик пропусков MoveSwipe для обработки эластичности
		let elastApp = false; //флаг применения эластичности
		
		function elastMake(e) {
			if (dragM==true){
				if (slideCont.classList.contains("elastSlides")) {
					let coordX;//считываем координаты мыши, либо тача
					if(e.pageX){coordX=e.pageX}else{coordX=e.touches[0].pageX}
					if (moveDir==0){
						if((curX - coordX)>0){moveDir=1}else{moveDir=(-1)};
						elastCount=0;
					}else{
						//если с предыдущего MoveSwipe позиция скрола не изменилась, анимируем эластичность
						if (scrolPos==slideCont.scrollLeft){
							//эластичность анимируем не сразу, а спустя несколько событий MoveSwipe
							if(elastCount>3){
								 //драг влево/вправо
								if((curX - coordX)>0){
									if(moveDir==1){
										slideCont.style.transformOrigin = 'left';
										slideCont.style.transform = 'scaleX(0.985)';
										elastApp = true;
									}else{
										moveDir=0;
										slideCont.style.transform = null;
										elastApp = false;
									}
								}else{
									if((curX - coordX)<0){
										if(moveDir==(-1)){
											slideCont.style.transformOrigin = 'right';
											slideCont.style.transform = 'scaleX(0.985)';
											elastApp = true;
										}else{
											moveDir=0;
											slideCont.style.transform = null;
											elastApp = false;
										}
									}
								}
							}else{	++elastCount;}
						}else{	scrolPos = slideCont.scrollLeft;}
					}
				}
			}
		}

		function elastStop() {
			moveDir=0;
			elastApp=false;
			slideCont.style.transform = null;//отпускаем эластичность
		}
//=======эластичность====КОНЕЦ


	//задание наборов событий тачскрина, либо мыши
		let isTouchDevice = "ontouchstart" in window || navigator.msMaxTouchPoints;
		if(isTouchDevice==true){
		//  console.log("isTouchDevice");
		//========= События тачскрина ==============
			let timerId=null;
			let isNatSwipe = true;
			
			function SwipeTune() {
				if (timerId!=null){clearTimeout(timerId);}
				timerId = setTimeout( function() {
					timerId=null;
					if ((isNatSwipe==true)&&(dragM==false)){
						CalCurNum();
						if (scrolNotEnd()){ //свайп выполняем, если скролл не закончился
							isNatSwipe=false;
							setTimeout( function() {
								isNatSwipe=true;
							}, 500);
							scrolNStep();//свайп к слайду curNum
						}
					}
				}, 50);
			}

			slideCont.addEventListener('scroll', function() {
				SwipeTune();
			});

			slideCont.addEventListener("touchstart", function(e) {
				StartSwipe(e);
			});

			slideCont.addEventListener("touchend", function(e) {
				dragM = false;
				SwipeTune();
	//			e.preventDefault();
	//			EndSwipe(e.changedTouches[0]);
			});

			slideCont.addEventListener("touchcancel", function(e) {
				dragM = false;
				SwipeTune();
	//			e.preventDefault();
			});

		}else{

		//========= События десктопа ==============

		//нажатие мыши на контейнере
			slideCont.onmousedown = function(e){
//				console.log("1 onmousedown");
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
		}

//кастомная полоса прокрутки - начало
		let customScrollBar = hScroll.querySelector(".customScrollBar");
		if (customScrollBar){
			let customScrollBarThumb = document.createElement("div");
			customScrollBar.append(customScrollBarThumb);
			customScrollBarThumb.className = 'customScrollBarThumb';
			function moveCustomScrollBar() {
				customScrollBarThumb.style.width = customScrollBar.clientWidth*(slideCont.clientWidth/slideCont.scrollWidth) + "px";
				customScrollBarThumb.style.left = slideCont.scrollLeft*(customScrollBar.clientWidth/slideCont.scrollWidth) + "px";
			}
			moveCustomScrollBar();
			slideCont.addEventListener('scroll', function() {moveCustomScrollBar();	});
		}
//кастомная полоса прокрутки - конец

//точечный индикатор - начало
		let customScrollDots = hScroll.querySelector(".customScrollDots");
		if (customScrollDots){
			let slideRati = Math.round(slideCont.scrollWidth/slideCont.clientWidth);
			for (let i = 0; i < slideRati; i++) {
				let dot = document.createElement("div");
				customScrollDots.append(dot);
			}
			let dot = customScrollDots.querySelectorAll(".customScrollDots>*");
			function moveCustomScrollDots() {
				let tmp = Math.round(slideCont.scrollLeft/slideCont.clientWidth);
				for (let i = 0; i < dot.length; i++) {
					dot[i].classList.remove("ligActive");
					if (i==tmp){dot[i].classList.add("ligActive");}
				}
			}
			moveCustomScrollDots();
			slideCont.addEventListener('scroll', function() {moveCustomScrollDots();});
		}
//точечный индикатор - конец
	}
}
//================== набор скроллинга для десктопа и тача


/* выпадающий список --->>> */
let dropSel = document.querySelectorAll(".dropSel");
for (let i = 0; i < dropSel.length; i++) {
	let options = dropSel[i].querySelector(".options");
	let tit = dropSel[i].querySelector(".tit");
	const tranDur = 300;
	
	options.style.display = 'none';
	options.style.transform = 'scaleY(0)';
	let flag = false;
	let onMousOpt = false;
	function dropSelClos() {
		setTimeout(function(){
			options.style.transform = 'scaleY(0)';
			tit.style.color = null;
			}, (tranDur/15));
		setTimeout(function(){
			options.style.display = 'none';flag = false;
			options.style.left = null;
			options.style.right = null;
			options.style.transformOrigin = null;
			options.style.width = null;
			options.style.whiteSpace = null;
			}, tranDur);
		}
		
	options.onmouseleave = function() {onMousOpt = false;dropSelClos();}
	options.onmouseover = function() {onMousOpt = true;}
	dropSel[i].onclick = function() {dropSelOpen();	}
//	dropSel[i].addEventListener("mouseover", function (e) {dropSelOpen();	}, {once:true});
	
	function dropSelOpen() {
		event.stopPropagation();
		if (flag){	dropSelClos();
		}else{
			flag = true;
			options.style.display = null;
			setTimeout(function(){
				tit.style.color = '#91061A';
				let c = dropSel[i].getBoundingClientRect();
//				console.log(c.left + "    " + options.clientWidth + "    " + document.documentElement.clientWidth);
					//коррекция положения выпадающего списка
					//пробуем обычно - вправо
				if (c.left + options.clientWidth < document.documentElement.clientWidth) {
					options.style.left = '0';
					options.style.transformOrigin = 'left top';
				}else{
					//нет тогда пробуем  - влево
//		console.log("влево    " + c.left + "    " + c.width + "    " + options.clientWidth);
					if ((c.left + c.width) > options.clientWidth) {
//		console.log("влево  OK  ");
						options.style.right = '0';
						options.style.transformOrigin = 'right top';
					//если не подходит ни так ни так
					}else{
						//если ширина меню больше ширины документа
						if (options.clientWidth > (document.documentElement.clientWidth - 20)) {
//		console.log("ширина меню больше ширины документа");
							options.style.width = (document.documentElement.clientWidth - 20) + 'px';
							options.style.whiteSpace = 'wrap';
							options.style.left = '-' + (c.left - 10) + 'px';
							options.style.transformOrigin = 'left top';
						
						}else{
//		console.log("ширина !!!!!!!!!!!");
							options.style.right = '-' + (document.documentElement.clientWidth - (c.left + c.width) - 10) + 'px';
							options.style.transformOrigin = 'right top';
						}
					}
				}

	//			console.log(c.left + "    " + options.clientWidth + "    " + document.documentElement.clientWidth);
				
					//--->>>коррекция положения выпадающего списка
				
				setTimeout(function(){
					options.style.transform = 'scaleY(1)';
					document.addEventListener("click", function (e) {dropSelClos();}, {once:true});
				}, (tranDur/3));

				dropSel[i].addEventListener("mouseleave", function (e) {
					setTimeout(function(){if(onMousOpt==false){dropSelClos();}}, 300);
					}, {once:true});
			}, (tranDur/15));
		}
	}
}
/*  --->>>выпадающий список */

