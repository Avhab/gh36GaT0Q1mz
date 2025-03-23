/*<----тестовый вывод размеров окна*/
/*
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
*/
/*тестовый вывод размеров окна---->*/


/*<----тестовый вывод параметров скролла*/

//let scrolDisp = document.createElement("div");
//body.append(scrolDisp);
//scrolDisp.style.cssText = "position:fixed;top:100px;left:2px;background:white;color:black;padding:0 5px;border: 1px solid red;";
//scrolDisp.style.fontSize = `${window.innerWidth/30}px`;
/*
let strN01 = document.createElement("div");tstDisp.append(strN01);
let strN02 = document.createElement("div");tstDisp.append(strN02);
let strN03 = document.createElement("div");tstDisp.append(strN03);
let strN04 = document.createElement("div");tstDisp.append(strN04);
let strN05 = document.createElement("div");tstDisp.append(strN05);
let strN06 = document.createElement("div");tstDisp.append(strN06);
let strN07 = document.createElement("div");tstDisp.append(strN07);
let strN08 = document.createElement("div");tstDisp.append(strN08);
*/
/*
					strN01.innerHTML = 'Весь скролл  ' + scrolCont.scrollWidth;
					strN02.innerHTML = 'Окно  ' + scrolCont.clientWidth;
					strN03.innerHTML = 'Шаг скроллинга  ' + scrlStep;
					strN04.innerHTML = 'Сегмент точки   ' + (scrolCont.scrollWidth/dot.length).toFixed(2);
					strN05.innerHTML = 'scrollLeft   ' + scrolCont.scrollLeft.toFixed(2);
					strN06.innerHTML = 'Индекс   ' + indx + '  ' + (scrolCont.scrollLeft/(scrolCont.scrollWidth/dot.length)).toFixed(2);
					strN07.innerHTML = 'Текущий скролл  ' + (scrolCont.scrollLeft/(scrolCont.scrollWidth/dot.length)).toFixed(2);
					strN08.innerHTML = 'Осталось скролла  ' + (scrolCont.scrollWidth - (scrolCont.scrollLeft + scrolCont.offsetWidth)).toFixed(2);
*/


/*тестовый вывод параметров скролла---->*/

let socLink = document.querySelectorAll(".socSect .links a");
let currentUrl = window.location.href;

for (let i = 0; i < socLink.length; i++) {
	socLink[i].href = socLink[i].href + currentUrl;
}


/*
let attr = socLink[0].getAttribute(href);
elem.getAttribute(name) 

alert (attr);
*/

/* <<<---бургер-меню в заголовке  */

let burgerBut = document.querySelector(".burgerBut");
let burgerMenu = document.querySelector(".burgerMenu");
let burgMOpn=false;
function burgMenSw() {
	if (burgMOpn==true) {
		burgMOpn=false;
		burgerMenu.style.transform = 'scaleY(0)';
		setTimeout(function(){
			burgerMenu.style.display = "none";
			burgerBut.style.backgroundImage =null;
			}, 300);
		}else{
		burgMOpn=true;
		burgerMenu.style.display = null;
		setTimeout(function(){
			burgerMenu.style.transform = 'scaleY(1)';
			burgerBut.style.backgroundImage ="url(../images/burgerOpn.svg)";
		}, 30);
		}
	}

burgerMenu.style.display = "none";
burgerMenu.style.transform = 'scaleY(0)';
burgerMenu.style.transitionDuration = '0.3s';
burgerMenu.style.transformOrigin = 'center top';
burgerMenu.onmouseleave = function() { burgMenSw();}
burgerMenu.addEventListener("click", function (e) {	burgMenSw();});

burgerBut.onclick = function() {burgMenSw();}

/* >>>--- бургер-меню в заголовке*/


//закрашивание звезд---------------
let stars = document.querySelectorAll(".stars");
for (let i = 0; i < stars.length; i++) {
	let prnNod = stars[i].parentElement;
	let score = prnNod.querySelector(".score");
	score = (Number(score.innerHTML.replace(',','.')));
	let intScore = Math.trunc(score);
	let fraScore = score - intScore;
	for (let j = 0; j < 5; j++) {
		let grayStar = document.createElement("div");
		stars[i].append(grayStar);
		
		if (intScore>-1) {
			let filStar = document.createElement("div");
			grayStar.append(filStar);
			if (intScore==0) {
				fraScore = fraScore * 30;
				filStar.style.cssText=`width:`+fraScore+`px;`;
			}
			
			--intScore;
		}
	}
	
}
//---------------закрашивание звезд


/* разворачивание текста --->>> */
let lsCont = document.querySelectorAll(".treiders .feedBk .vCont");
for (let i = 0; i < lsCont.length; i++) {
	let txtLst = lsCont[i].querySelector(".txt");
	if (txtLst.clientHeight < txtLst.scrollHeight) {
		let sHei = txtLst.offsetHeight;
		let fHei = txtLst.scrollHeight;
		let unFold = false;
		txtLst.style.overflowY = 'hidden';
		txtLst.style.position = 'relative';
		let blGrad = document.createElement("div");
		txtLst.append(blGrad);
		blGrad.style.cssText = "position:absolute;z-index:2;bottom:0;left:0;width:100%;height:4em;";
		blGrad.style.background = "linear-gradient(transparent, #15181D 70%)";
		let popDescr = document.createElement("div");
		txtLst.append(popDescr);
		popDescr.innerHTML = "развернуть...";
		popDescr.style.cssText = "position:absolute;z-index:3;bottom:0;left:0;color:#82EBC1;width:100%;text-align:right;padding:0 10px;cursor:pointer;";
		popDescr.onclick = function() {
			txtLst.style.height = fHei + 'px';
			blGrad.style.opacity = '0';
			popDescr.style.opacity = '0';
			txtLst.style.cursor = 'pointer';
			setTimeout(function(){
				blGrad.style.display = 'none';
				popDescr.style.display = 'none';
				unFold = true;	}, 300);	}
		function txtClos() {
			if (unFold == true) {
				unFold = false;
				blGrad.style.display = null;
				popDescr.style.display = null;
				txtLst.style.height = sHei + 'px';
				txtLst.style.cursor = null;
				setTimeout(function(){
					blGrad.style.opacity = '1';
					popDescr.style.opacity = '1';
				}, 20);	}	}
		txtLst.onclick = function() {txtClos();}
		txtLst.onmouseleave = function() { txtClos();}
	}
}
/* >>>--разворачивание текста*/


/* выпадающий список --->>> */

let dropSel = document.querySelectorAll(".dropSel");
for (let i = 0; i < dropSel.length; i++) {
	let lsOpt = dropSel[i].querySelector(".lsOpt");
	let lsOptN = lsOpt.querySelectorAll(".lsOpt>*");
	let chngFld = dropSel[i].querySelector("input");
	let dropArr = document.createElement("div");
	chngFld.value = lsOptN[0].innerHTML;
	dropSel[i].append(dropArr);
	dropArr.classList.add("dropArr");
	lsOpt.style.transform = 'scaleY(0)';
	let flag = false;
	function dropSelClos() {
		setTimeout(function(){
			lsOpt.style.transform = 'scaleY(0)';
			dropArr.classList.remove("opn");
			flag = false;
			}, 20);
		}
		
	document.addEventListener("click", function (e) {	dropSelClos();	});
	
	let opts = lsOpt.querySelectorAll("div");
	for (let j = 0; j < opts.length; j++) {
		opts[j].onclick = function() {
			chngFld.value = opts[j].innerHTML;	}	}

	dropSel[i].onclick = function() {
		event.stopPropagation();
		if (flag){	dropSelClos();
		}else{
			flag = true;
			setTimeout(function(){
				dropArr.classList.add("opn");
				lsOpt.style.transform = 'scaleY(1)';
				lsOpt.onmouseleave = function() {dropSelClos();}
				}, 20);	}	}
}

/*  --->>>выпадающий список */

let psdScrol = document.querySelectorAll(".psdScrol");//элемент с псевдоскролл-контейнером для точно вписывающихся слайдов
for (let i = 0; i < psdScrol.length; i++) {
	let scrolCont = psdScrol[i].querySelector(".scrolCont");//контейнер элементов-скролла
	let slide = scrolCont.querySelectorAll(".scrolCont>*");//элементы переключения - слайды
	if (slide) {
		let slidPerWind = Math.round(scrolCont.clientWidth/slide[0].offsetWidth); //кол-во слайдов на окно
		if (slidPerWind<slide.length) { //делаем скролл если кол-во слайдов больше кол-ва слайдов на окно
			let arrLeft = psdScrol[i].querySelector(".arrLeft");
			let arrRight = psdScrol[i].querySelector(".arrRight");
			let slidStep = 100/slidPerWind;//шаг сдвига слайдов
			let currSl = 0;//номер текущего слайда
			function iCor (corr) { //возвращает индекс слайда, скорректированный на величину corr относительно текущего
				let indx = currSl + corr;
				if (indx<0){indx = slide.length + indx;
					}else{if (indx>(--slide.length)){indx = indx - slide.length;}}
				return indx;}
			
			//формируем центральное окно
			for (let i = 0; i < slidPerWind; i++) {
				slide[iCor(i)].style.left = slidStep*i + "%";
				scrolCont.append(slide[iCor(i)]);
			}


		function scenForm () {}
/*				
				//формируем левое скрытое окно
				for (let i = 0; i < slidPerWind; i++) {
					scrolCont.prepend(slide[iCor((-(i+1)))]);
					slide[iCor((-(i+1)))].style.left = " -" + slidStep*(i+1) + "%";
				}
				//формируем правое скрытое окно
				for (let i = 0; i < slidPerWind; i++) {
					slide[iCor((2 + i))].style.left = slidStep*slidPerWind + slidStep*i + "%";
				}
			

			for (let i = 0; i < slide.length; i++) {
				slide[i].style.left = slidStep*(slidPerWind + slidPerWind - 1) + "%";
			}
*/
//			scenForm ();
			
			
//============================			
			
		if (arrRight) {
			arrRight.onclick = function(){ //кнопка переключения вправо
				//формируем левое скрытое окно
				for (let i = 0; i < slidPerWind; i++) {
					let a1 = iCor(-(i+1));
					slide[a1].style.transitionDuration = "0s";
					slide[a1].style.left = " -" + slidStep*(i+1) + "%";
					slide[a1].style.transitionDuration = null;
					scrolCont.append(slide[a1]);
				}
				setTimeout( function() {
					for (let i = 0; i < slidPerWind; i++) {
						slide[iCor(-(i+1))].style.left = (slidStep*slidPerWind - slidStep*(i+1)) + "%";
						slide[iCor(i)].style.left = (slidStep*slidPerWind + slidStep*i) + "%";
					}
					currSl = iCor (((-1)*slidPerWind));
				}, 10);
			}
		}

		if (arrLeft) {
			arrLeft.onclick = function(){ //кнопка переключения влево
				//формируем правое скрытое окно
				for (let i = 0; i < slidPerWind; i++) {
					let a1 = iCor((2 + i));
					slide[a1].style.transitionDuration = "0s";
					slide[a1].style.left = slidStep*slidPerWind + slidStep*i + "%";
					slide[a1].style.transitionDuration = null;
					scrolCont.append(slide[a1]);
				}
				setTimeout( function() {
					for (let i = 0; i < slidPerWind; i++) {
						slide[iCor((2 + i))].style.left = (slidStep*i) + "%";
						slide[iCor(i)].style.left = (slidStep*i - slidStep*slidPerWind) + "%";
					}
					currSl = iCor (slidPerWind);
				}, 10);
			}
		}
//=======================			
		}
	}
}















let hScrol = document.querySelectorAll(".hScrol");//элемент с скролл-контейнером
for (let i = 0; i < hScrol.length; i++) {
	let scrolCont = hScrol[i].querySelector(".scrolCont");//контейнер элементов-скролла
	if (scrolCont.scrollWidth > scrolCont.clientWidth) {
//		let cnt1 = 0;
//		let cnt2 = 0;
		let slide = scrolCont.querySelectorAll(".scrolCont>*");//элементы переключения - слайды
		let arrLeft = hScrol[i].querySelector(".arrLeft");
		let arrRight = hScrol[i].querySelector(".arrRight");
		let dots = hScrol[i].querySelector(".dots");//индикаторные точки
		let dotArr = hScrol[i].querySelector(".dotArr");//одиночная стрелка
		let slidWidth = scrolCont.scrollWidth/slide.length; // ширина слайда - простое вычисление
// ширина слайда для многострочного скроллинга
/*
		let tStr01 = window.getComputedStyle(slide[0]).marginLeft;
		let tStr02 = window.getComputedStyle(slide[0]).marginRight;
		if(tStr01.indexOf("px")== -1) {tStr01=0;}else{tStr01=tStr01.slice(0, tStr01.indexOf("px"));}
		if(tStr02.indexOf("px")== -1) {tStr02=0;}else{tStr02=tStr02.slice(0, tStr02.indexOf("px"));}
		let slidWidth = slide[0].offsetWidth + Number(tStr01) + Number(tStr02);
		*/
// >>---ширина слайда для многострочного скроллинга
		let scrlStep = scrolCont.clientWidth/slidWidth;
		if	((scrlStep - (Math.trunc(scrlStep)))>0.9) {scrlStep = Math.round(scrlStep);
			}else{	scrlStep = Math.trunc(scrlStep);}
		if (scrlStep<1) {scrlStep = 1;}
		scrlStep = scrlStep*slidWidth;	//шаг скроллинга в пикселах
		let oldScroll = 0;//величина предустановленного скролла
		let autoCentr=false; //флаг, разрешающий доводку скролла при отпускании тача
		let curNum = hScrol[i].querySelector(".curNum");//текущий слайд
		let allNum = hScrol[i].querySelector(".allNum");//число слайдов
		if (allNum) {allNum.innerHTML = slide.length.toString().padStart(2, '0');	}
		let acTime;
		let tStr = window.getComputedStyle(slide[0]).marginLeft;
		if(tStr.indexOf("px")== -1) {scrolCont.scrollLeft=0; //предустановка скролла
			}else{scrolCont.scrollLeft=tStr.slice(0, tStr.indexOf("px"));} //предустановка скролла

//strN07.innerHTML = strN07.innerHTML + 'scrollLeft   ' + scrolCont.scrollLeft.toFixed(2) + ' | Слайдов: ' + (scrolCont.scrollLeft/slidWidth).toFixed(2) + ' ||| ';

		if (dotArr) {dotArr.style.visibility = 'visible'};
		if (curNum) {curNum.style.visibility = 'visible'};
		if (allNum) {allNum.style.visibility = 'visible'};
//		if (arrLeft) {arrLeft.style.visibility = 'visible'};
//		if (arrRight) {arrRight.style.visibility = 'visible'};
//		if (arrLeft) {arrLeft.classList.add("arrStop");}
		let dot = [];	//индикаторные точки
	//создание индикаторных точек
		if (dots) {
			let quanDots=Math.round(scrolCont.scrollWidth/scrolCont.clientWidth);	//задаем количество индикаторных точек
			if (quanDots>7){quanDots=7;}else{
				if (quanDots<2){quanDots=2;}else{
					if ((quanDots*27 + 30)>scrolCont.clientWidth) {quanDots = Math.trunc((scrolCont.clientWidth - 30) / 27);}	}	}
			for (let i = 0; i < quanDots; i++) {
				dot[i] = document.createElement("div");
				dots.append(dot[i]);
				dot[i].classList.add("dot");
				if (i==0) {dot[i].classList.add("selected");}	}	}
	//создание индикаторных точек

		let ScrlFlag=true; //флаг, разрешающий выполнение дополнительных действий во время скролла
		let ScrlTime;	//переменная для таймаута
	//Функции, выполняемые во время скролла --->
		scrolCont.addEventListener("scroll", function (e) {
			if (ScrlFlag) {	//если выполнение разрешено
			ScrlFlag=false; //запрещаем выполнение 
			clearTimeout(ScrlTime);	//удаляем таймер
			ScrlTime = setTimeout( function() {	//задаем новый таймер с действиями - через 100мс будет выполнен пакет дополнительных действий

				//переключение текущего номера слайда --->>
				if (curNum) {
						let tmp = Math.ceil(scrolCont.scrollLeft/slidWidth);
					if (tmp<slide.length){if (tmp<0){tmp=0;}}else{tmp = slide.length - 1; }
					curNum.innerHTML = (tmp + 1).toString().padStart(2, '0');			};
				// --->> переключение текущего номера слайда
				
				if (arrLeft && arrRight) {
					if (scrolCont.scrollLeft==0) {
						arrLeft.classList.remove("act");
						arrRight.classList.add("act");
					}else{
						arrLeft.classList.add("act");
						if ((scrolCont.scrollWidth-scrolCont.scrollLeft-scrolCont.clientWidth)<50) {
							arrRight.classList.remove("act");}else{arrRight.classList.add("act");}	}	}
				
				//переключение индикаторных точек --->>
				if (dots) {
					for (let i = 0; i < dot.length; i++) {dot[i].classList.remove("selected");} //гасим все точки
					let indx = Math.round(scrolCont.scrollLeft/(scrolCont.scrollWidth/dot.length))
					if (indx < dot.length) {if (indx < 0) {indx = 0;}}else{indx = (dot.length - 1);} //защита от некорректного индекса
					//коррекция крайних значений индекса
					if (oldScroll<scrolCont.scrollLeft){
						if (Math.abs(scrolCont.scrollWidth - (scrolCont.scrollLeft + scrolCont.offsetWidth)) > 20) {
							if (indx == (dot.length - 1)) {indx = (dot.length - 2);}
						}else{	indx = dot.length - 1;	}
					}else{	if (indx == 0) {if (scrolCont.scrollLeft>0) {indx = 1;}	}	}
					
					dot[indx].classList.add("selected");
				}
				//---->> переключение индикаторных точек

				autoFit();	// автодоводка слайда в центр
				
				oldScroll = scrolCont.scrollLeft;	//по окончании обновляем текущее значение скролла
				ScrlFlag=true;	//по окончании разрешаем выполнение
				}, 100);
			}
		});
	//---> Функции, выполняемые во время скролла
	
		// автодоводка слайда в центр --->>
		function autoFit() {
			if (scrolCont.classList.contains("noAutoFit")==false) {
//				cnt1 = cnt1 + 1;
//				strN01.innerHTML = 'Вход: ' + cnt1 + ' | Флаг: ' + autoCentr + ' | Разность: ' + (scrolCont.scrollLeft - oldScroll);

	//				strN03.innerHTML = '';
		//			strN04.innerHTML = '';
				
				if ((autoCentr==true)&&(Math.abs(scrolCont.scrollLeft - oldScroll)<10)){
//				cnt2 = cnt2 + 1;
		//		strN02.innerHTML = 'Сработка   ' + cnt2;

				if (Math.abs(scrolCont.scrollLeft - oldScroll)<10){

					let tmp1 = scrolCont.scrollLeft;
					let tmp2 = oldScroll;
				
					autoCentr = false;
//					slidWidth = scrolCont.scrollWidth/slide.length; //коррекция реальной ширины слайда
//					clearTimeout(acTime);
						let indx = 0; //размер вычисляемого скролла scrollLeft
						
						if ((scrolCont.scrollWidth - scrolCont.scrollLeft - scrolCont.clientWidth)<(slidWidth/2)) {
						//если до конца осталось менее половины слайда, прокручиваем до конца
							indx = scrolCont.scrollWidth;
						}else{
							if(Math.abs(scrlStep - scrolCont.clientWidth)<5){
		//если шаг скролла и ширина окна различаются не более чем на 5px доводка "слайд по левому краю окна"
								indx = (Math.round(scrolCont.scrollLeft/slidWidth))*slidWidth;
							}else{
								//в противном случае "слайд по центру окна"
								indx = (slidWidth * (Math.trunc((scrolCont.scrollLeft + scrolCont.offsetWidth/2)/slidWidth) + 0.5)) - (scrolCont.offsetWidth/2);
							}
						}	
						scrolCont.scrollTo({left: indx, behavior: 'smooth'});
/*					
			acTime = setTimeout( function() {
					
					strN03.innerHTML = 'Захват   ' + tmp1;
					strN04.innerHTML = 'Старый   ' + tmp2;
					strN05.innerHTML = 'Слайд: ' + slidWidth + ' | Окно: ' + scrolCont.clientWidth + ' | Окно/Слайд: ' + (scrolCont.clientWidth/slidWidth).toFixed(2);
					strN06.innerHTML = 'Шаг скроллинга  ' + scrlStep + ' | Шаг/Слайд: ' + (scrlStep/slidWidth).toFixed(2);
					strN07.innerHTML = 'Скроллить на: ' + indx.toFixed(2) + ' | scrollLeft   ' + scrolCont.scrollLeft.toFixed(2) + ' | Слайдов: ' + (scrolCont.scrollLeft/slidWidth).toFixed(2);

			}, 800);
	*/				
				}
			}
		}
	}
		// --->> автодоводка слайда в центр
	
		scrolCont.addEventListener("touchstart", function (e) { /*clearTimeout(acTime);*/ autoCentr = false; }); //Начало касания
		scrolCont.addEventListener("touchend", function (e) { autoCentr = true; });//Пользователь отпустил экран
		
		if (arrRight) {
			arrRight.onclick = function(){ //кнопка переключения вправо
				let scLft = (Math.round((scrolCont.scrollLeft + scrlStep)/slidWidth))*slidWidth;
				scrolCont.scrollTo({left: scLft, behavior: 'smooth'});
				autoCentr = false;
		/*			
			acTime = setTimeout( function() {
					
					strN05.innerHTML = 'Слайд: ' + slidWidth + ' | Окно: ' + scrolCont.clientWidth + ' | Окно/Слайд: ' + (scrolCont.clientWidth/slidWidth).toFixed(2);
					strN06.innerHTML = 'Шаг скроллинга  ' + scrlStep + ' | Шаг/Слайд: ' + (scrlStep/slidWidth).toFixed(2);
					strN07.innerHTML = 'Скроллить на: ' + scLft.toFixed(2) + ' | scrollLeft   ' + scrolCont.scrollLeft.toFixed(2) + ' | Слайдов: ' + (scrolCont.scrollLeft/slidWidth).toFixed(2);

			}, 500);
			*/		
					}
			}
		if (arrLeft) {
			arrLeft.onclick = function(){ //кнопка переключения влево
				let scLft = (Math.round((scrolCont.scrollLeft - scrlStep)/slidWidth))*slidWidth;
				scrolCont.scrollTo({left: scLft, behavior: 'smooth'});
				autoCentr = false;
/*					
			acTime = setTimeout( function() {
					
					strN05.innerHTML = 'Слайд: ' + slidWidth + ' | Окно: ' + scrolCont.clientWidth + ' | Окно/Слайд: ' + (scrolCont.clientWidth/slidWidth).toFixed(2);
					strN06.innerHTML = 'Шаг скроллинга  ' + scrlStep + ' | Шаг/Слайд: ' + (scrlStep/slidWidth).toFixed(2);
					strN07.innerHTML = 'Скроллить на: ' + scLft.toFixed(2) + ' | scrollLeft   ' + scrolCont.scrollLeft.toFixed(2) + ' | Слайдов: ' + (scrolCont.scrollLeft/slidWidth).toFixed(2);

			}, 500);
	*/				
					}
			}
		}
	}



//раскрывающиеся списки FAQ ------------
window.addEventListener("load", function() {
	let FAQ = document.querySelectorAll(".FAQ");
	for (let i = 0; i < FAQ.length; i++) {
		let qAns = FAQ[i].querySelectorAll(".qAns");
		for (let i = 0; i < qAns.length; i++) {
			let Que = qAns[i].querySelector(".Que");
			let Ans = qAns[i].querySelector(".Ans");
			let wrapArr = document.createElement("div");
			let but = Que.querySelector("button");
			wrapArr.className = 'wrapArr';
			Que.append(wrapArr);
			let heigOn = Ans.clientHeight;
			Ans.style.height = "0";
			Ans.style.opacity = '0';
			Ans.style.paddingTop = "0";
			Ans.style.paddingBottom = "0";
			
			qAns[i].onclick = function() {
				wrapArr.classList.toggle("ArrUp");
				if (wrapArr.classList.contains("ArrUp")) {
					Ans.style.paddingTop = null;
					Ans.style.paddingBottom = null;
					Ans.style.height = heigOn + 'px';
					Ans.style.opacity = '1';
					if (but) {
						but.classList.add("redButHov");
						but.classList.remove("whiteBut");}
				} else {
					Ans.style.height = "0";
					Ans.style.paddingTop = "0";
					Ans.style.paddingBottom = "0";
					Ans.style.opacity = '0';
					if (but) {
						but.classList.remove("redButHov");
						but.classList.add("whiteBut");}	}	}	}	}
});

//---------------раскрывающиеся списки FAQ



let carous = document.querySelectorAll(".carous");//элемент с скролл-контейнером
for (let i = 0; i < carous.length; i++) {
	let scrolCont = carous[i].querySelector(".scrolCont");//контейнер элементов-скролла
	if (scrolCont.scrollWidth > scrolCont.clientWidth) {
		scrolCont.style.transformStyle = "preserve-3d";
		scrolCont.style.perspective = "300em";
		let slide = scrolCont.querySelectorAll(".scrolCont>*");//элементы переключения - слайды
		let slidWidth = scrolCont.scrollWidth/slide.length; // ширина слайда - простое вычисление
		let slPos = [];//массив позиций слайдов на ленте
		for (let i = 0; i < slide.length; i++) {
			slPos[i] = slidWidth * i;
			slide[i].style.transitionDuration = "0s";
			slide[i].style.backfaceVisibility = "hidden";
			slide[i].style.transformOrigin = "center center";
			}
		let crsCentr = scrolCont.clientWidth/2 - slidWidth/2 //центральная позиция карусели
		let crsBord = crsCentr + slidWidth; //расстояние от центра до краев карусели
		
		scrolCont.addEventListener("scroll", function (e) {
			for (let i = 0; i < slide.length; i++) {
				let Pos = ((slPos[i] - scrolCont.scrollLeft) - crsCentr)/crsBord; //позиция в окне относительно центра - нуля
				if (Pos< -1){Pos= -1;}
				if (Pos> 1){Pos= 1;}
				let degPos = Pos*90; //позиция в окне относительно центра - нуля
				let radPos = degPos*3.14/180;
				let trX = (-100)*(Math.cos(radPos)-1);
				if (Pos>0){ trX = trX*(-1)};
				let trZ = (1000)*(Math.cos(radPos)-1);
				slide[i].style.transform =  "translate3d(" + trX + "px, 0, " + trZ + "px) rotateY(" + degPos + "deg)";
				if (i==4) {
					strN01.innerHTML = "Pos: " + Pos.toFixed(2) + " | degPos: " + degPos.toFixed(2);
					strN02.innerHTML = "trX: " + trX.toFixed(2) + " | trZ: " + trZ.toFixed(2);
					strN03.innerHTML = "cosX: " + (Math.cos(radPos)-1).toFixed(2);
				}
			}
		});
	}
}

//корректировка ввода тел номера=======>>>

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
//============>>>корректировка ввода тел номера



let form = document.querySelectorAll("form");
for (let i = 0; i < form.length; i++) {
	let inputN = form[i].querySelector('input[name="Имя"]');
	let inputQ = form[i].querySelector('input[name="Количество"]');
	let minus = form[i].querySelector(".minus");
	let plus = form[i].querySelector(".plus");
	plus.onclick = function(){	if (inputQ.value==""){inputQ.value= 1;} else {inputQ.value++;	}}
	minus.onclick = function(){if (inputQ.value==""){inputQ.value= 1;} else {if (inputQ.value>1){inputQ.value--;}}}
//корректировка ввода количества
	function appMask(event) {
		let tmpStr = inputQ.value;
		if (tmpStr.length>0) {
			let i = 0;
			do {if (!tmpStr[i].match('[0-9]')){tmpStr = tmpStr.slice(0, (i)) + tmpStr.slice(i+1);}
				i = i + 1;}	while (i<tmpStr.length);
			inputQ.value = tmpStr;}		}
	inputQ.addEventListener("input", appMask, false);
//ввод единицы количества при вводе имени
	function inpN(event) {if (inputQ.value==""){inputQ.value= 1;}}
	inputN.addEventListener("input", inpN, false);
}
