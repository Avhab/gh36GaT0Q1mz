/*<----тестовый вывод размеров окна
let body = document.querySelector("body");
let tstDisp = document.createElement("div");
body.append(tstDisp);
tstDisp.style.cssText = "position:fixed;top:15px;left:2px;background:white;color:black;padding:0 5px;border: 1px solid red;line-height:normal;";
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

let assist = document.querySelector(".assist");
//let grImg = assist.querySelectorAll(".assist>img");
let grImg = assist.querySelectorAll(".assist>object");
for (let i = 0; i < grImg.length; i++) {
	grImg[i].style.opacity = "0";
//	grImg[i].style.transitionDuration = "2s";
	}
let clkCount=0;
let Group3701 = assist.querySelector(".Group3701");
let Frame3961 = assist.querySelector(".Frame3961");


/*
Frame3961.addEventListener("load",function(){
	let scd = Frame3961.contentDocument;
	console.log (scd);
	let g1119 = scd.querySelector('#g1119');
	console.log (g1119);
	
	}, false);

*/



Group3701.style.display="block";

setTimeout( function() {
	Group3701.style.width = (assist.offsetWidth*0.66) + "px";
	Group3701.style.left = (assist.offsetWidth*0.17) + "px";
//	Group3701.style.height = (assist.offsetHeight*0.9) + "px";
//	Group3701.style.left = ((assist.offsetWidth - Group3701.offsetWidth)/2) + "px";
	}, 10);

setTimeout( function() {Group3701.style.opacity = "1";}, 100);
//setTimeout( function() {Group3701.style.transitionDuration = "2s";}, 2000);

assist.onclick = function() {
	clkCount++;
	switch(clkCount) {
	  case 1:
		Group3701.style.transitionDuration = "2s";
		Group3701.style.left = (Group3701.offsetWidth*(-2.7)) + "px";
		Group3701.style.top = (Group3701.offsetHeight*(-0.9)) + "px";
		Group3701.style.width = (Group3701.offsetWidth*5) + "px";
		break;

	  case 2:
		Group3701.style.opacity = "0";
		setTimeout( function() {Group3701.style.display="none";}, 2000);
		Frame3961.style.top = "0";
		Frame3961.style.left = "0";
		Frame3961.style.height = (assist.offsetHeight) + "px";
		Frame3961.style.display="block";
		setTimeout( function() {
			Frame3961.style.transitionDuration = "2s";
			Frame3961.style.opacity = "1";}, 10);
		break;
	  case 3:
		let scdFrame3961 = Frame3961.contentDocument;
		scdFrame3961.style.transitionDuration = "2s";
		console.log (scdFrame3961);
		let bonesGr = scdFrame3961.querySelector('#g1379');
		console.log (bonesGr);
		bonesGr.style.opacity = "0";
	  case 4:
		let venusGr = scdFrame3961.querySelector('#g128');
		console.log (venusGr);
		venusGr.style.opacity = "0.5";

	}




}



/*
assist.onclick = function() {
	Group3701.style.opacity = "0";
	setTimeout( function() {Group3701.style.display="none";}, 500);
	Frame3961.style.transform = "none";
	Frame3961.style.top = "0";
	Frame3961.style.left = "0";
	Frame3961.style.width = "100%";
	Frame3961.style.display="block";
	setTimeout( function() {Frame3961.style.opacity = "1";}, 10);
}
*/








/*
let stoPitsot = document.querySelector(".stoPitsot");
let smQuad = stoPitsot.querySelectorAll(".stoPitsot>*");
for (let i = 0; i < smQuad.length; i++) {smQuad[i].onclick = function() {razv(this);}}

function razv(smQuad) {
	let DopQuad = document.createElement("div");
	stoPitsot.append(DopQuad);
	let xC = smQuad.offsetLeft + 20;
	let yC = smQuad.offsetTop + 20;
	let trnsfOr;
	if (stoPitsot.offsetWidth<(xC + 440)){
		DopQuad.style.left = null;
		DopQuad.style.right = "20px";
		trnsfOr = 400 - stoPitsot.offsetWidth + smQuad.offsetLeft;
	}else{
		DopQuad.style.right = null;
		DopQuad.style.left = xC + "px";
		trnsfOr = "0px";
	}
	if (stoPitsot.offsetHeight<(yC + 140)){
		DopQuad.style.top = null;
		DopQuad.style.bottom = (stoPitsot.offsetHeight - smQuad.offsetTop) + "px";
		trnsfOr = trnsfOr + " " + (stoPitsot.offsetHeight - smQuad.offsetTop) + "px";
	}else{
		DopQuad.style.bottom = null;
		DopQuad.style.top = yC + "px";
		trnsfOr = trnsfOr + " 0px";
	}
	DopQuad.style.transformOrigin = trnsfOr;
	DopQuad.style.transitionDuration = "0.2s";
	DopQuad.innerHTML = smQuad.innerHTML;
	setTimeout( function() {DopQuad.classList.add('bQuad');}, 10);
	setTimeout( function() {document.addEventListener("click", function() {
		DopQuad.style.transform = "scale(0)";
		setTimeout( function() {DopQuad.remove();}, 200);
	}, {once:true});}, 200);
}

//анимация текста
let animTitle = document.querySelector(".animTitle");
animTitle.style.position = "relative";
animTitle.style.color = "white";
let aStr = animTitle.innerHTML;
let heiCont = animTitle.offsetHeight;
let widCont = animTitle.offsetWidth;
let lefSym = 0;
let stTime = 1000;

for (let i = 0; i < aStr.length; i++) {
	let oneSym = document.createElement("div");
	animTitle.append(oneSym);
	oneSym.style.position = "absolute";
	oneSym.style.color = "black";
	oneSym.innerHTML = aStr[i];
	oneSym.style.top = "0px";
	oneSym.style.transform = "translate(0, " + heiCont + "px)";
	setTimeout( function() {
		oneSym.style.left = lefSym + "px";
		lefSym = lefSym + oneSym.offsetWidth;
		oneSym.style.transitionDuration = "0.6s";
//		oneSym.style.top = "0px";
		oneSym.style.transform = "translate(0, 0)";
		setTimeout( function() {
//			oneSym.style.top = "-" + heiCont + "px";
			oneSym.style.transform = "translate(-" + widCont + "px, 0)";
//			setTimeout( function() {oneSym.remove();}, 700);
			if (i == (aStr.length - 1)){
				animTitle.style.transitionDelay = "0.4s";
				animTitle.style.transitionTimingFunction = "ease-in";
				animTitle.style.transitionDuration = "1s";
				animTitle.style.color = null;
			}			
		}, (stTime + (100*i) + 500));
	}, stTime);
	stTime = stTime + 20;
}
*/
