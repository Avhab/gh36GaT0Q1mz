let body = document.querySelector("body");

let blur = document.createElement("div");
blur.classList.add('blur');
body.prepend(blur);

let burger = document.querySelector(".burger");
let burgerMenu = document.querySelector(".burgerMenu");

let header = document.querySelector("header");
let closCros = document.createElement("div");
burgerMenu.append(closCros);
closCros.classList.add('clos');
burgerMenu.append(header.querySelector(".header-line02").cloneNode(true));
burgerMenu.append(header.querySelector(".telph-block").cloneNode(true));

blur.style.opacity = "0";
blur.style.transitionDuration = "0.3s";
burgerMenu.style.transformOrigin = "center top";
burgerMenu.style.opacity = "0";
burgerMenu.style.transform = "scaleY(0)"; 
burgerMenu.style.transitionDuration = "0.3s";
let flag = false;

function closBurger() {
		if (flag == true) {
		setTimeout( function() {flag = false; }, 30);
		blur.style.opacity = "0";
		burgerMenu.style.opacity = "0";
		burgerMenu.style.transform = "scaleY(0)"; 
		setTimeout( function() {
			blur.style.display=null;
			burgerMenu.style.display=null;
		}, 300);
	}
}

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

		document.addEventListener("click", function () {
			closBurger();
		});
}

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

let hScrolls = document.querySelectorAll(".hScroll");
for (let i = 0; i < hScrolls.length; i++) {
	let hScroll = hScrolls[i];
	if (hScroll){

		let slideCont = hScroll.querySelector(".slideCont");
		let slide = slideCont.querySelectorAll(":scope>*");
		let arrCont = hScroll.querySelector(".arrCont");

		if((slideCont.clientWidth - (slide[(slide.length - 1)].offsetLeft + slide[(slide.length - 1)].clientWidth))<0){
			if (arrCont) {
				let leftArr = arrCont.querySelector(".leftArr");
				let rightArr = arrCont.querySelector(".rightArr");

					if (leftArr) {
						leftArr.onclick = function(e){
							slideOffSetFill();
							--curNum;
							if (curNum<0){curNum=0;}
							scrolNStep();}	}

					if (rightArr) {
						rightArr.onclick = function(e){
							slideOffSetFill();
							if (scrolNotEnd()){ 
								++curNum;
								if (curNum>(slide.length - 1)){curNum=(slide.length - 1);}
								scrolNStep();}	}	}	}

			let padCorr=0;

			if (slideCont.classList.contains("wide100scrol")) {

				let windWid = document.documentElement.clientWidth;
				let contWid = slideCont.clientWidth;
				let contSty = window.getComputedStyle(slideCont);
				let padL = contSty.paddingLeft;

				padL = Number(padL.slice(0 , (padL.length - 2)));

				let padResl = ((windWid - contWid)/2);
				if (padResl==0){padResl = padL}else{padResl = padResl + padL};
				slideCont.style.padding = "0 " + padResl + "px";
				slideCont.style.width = "100%";
				slideCont.style.maxWidth = "none";

				padCorr = padResl;
			}

			let curNum=0;
			let movCnt=0; 
			let rolBlck = true;
			let dragM = false;
			let scrolPos = slideCont.scrollLeft; 
			let curX; 
			let transDur = 300;
			let slideOffSet = []; 

			function slideOffSetFill() {
				slideOffSet.length = 0; 
				for (let i = 0; i < slide.length; i++) {slideOffSet.push(slide[i].offsetLeft);}
			}

			function StartSwipe(e) {
				if (rolBlck==true){
					scrolPos = slideCont.scrollLeft;
					if(e.pageX){curX=e.pageX}else{curX=e.touches[0].pageX}
					dragM = true;
					slideOffSetFill();
				}	}

			function MoveSwipe(e) {
				if (dragM==true){
					if(movCnt==0){
						movCnt=0; 
						if((dragM==true)&&(rolBlck==true)){
							slideCont.scrollLeft = slideCont.scrollLeft + curX - e.pageX;
							curX = e.pageX;		}
					}else{movCnt--;}
				}
			}

			function EndSwipe(e) {
				if((dragM==true)&&(rolBlck==true)){
					dragM=false;
					rolBlck=false;
					if (scrolNotEnd()){
						CalCurNum();
						scrolNStep();}
					rolBlck = true;}	}

			function CalCurNum() {
				for (let i = 0; i < slide.length; i++) {
					let diff = ((slideOffSet[i] - padCorr - slideCont.offsetLeft + slide[i].offsetWidth) - slideCont.scrollLeft);
					if (diff>0){
						if((slide[i].offsetWidth/diff)<2){
							curNum = i;
							break;	}	}	}	}

			function scrolNStep() {
				let tmp = slideOffSet[curNum] - slideCont.offsetLeft - padCorr;
				slideCont.scrollTo({left: tmp, behavior: 'smooth'});	}

			function scrolNotEnd() {
				if((slideCont.scrollWidth - (slideCont.scrollLeft + slideCont.clientWidth))>0){
					return true;}else{return false;}	}

			document.addEventListener("touchmove", function(e) {elastMake(e);});
			slideCont.addEventListener("touchend", function(e) {elastStop();});
			slideCont.addEventListener("touchcancel", function(e) {elastStop();});
			document.addEventListener("mousemove", function(e) {elastMake(e);});
			document.addEventListener("mouseup", function(e) {elastStop();	});

			let moveDir = 0;
			let elastCount = 0; 
			let elastApp = false; 

			function elastMake(e) {
				if (dragM==true){
					if (slideCont.classList.contains("elastSlides")) {
						let coordX;
						if(e.pageX){coordX=e.pageX}else{coordX=e.touches[0].pageX}
						if (moveDir==0){
							if((curX - coordX)>0){moveDir=1}else{moveDir=(-1)};
							elastCount=0;
						}else{

							if (scrolPos==slideCont.scrollLeft){

								if(elastCount>3){
									 
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
				slideCont.style.transform = null;
			}

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
					StartSwipe(e);
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

		}else{

			arrCont.style.display = 'none';
		}
	}
}

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
			tit.classList.remove('markStat');
			}, (tranDur/15));
		setTimeout(function(){
			options.style.display = 'none';flag = false;
			options.style.left = null;
			options.style.right = null;
			options.style.transformOrigin = null;
			options.style.width = null;
			options.style.whiteSpace = null;
			}, tranDur);

			if ((burger)&&(burgerMenu)){
				closBurger();
			}
		}

	options.onmouseleave = function() {onMousOpt = false;dropSelClos();}
	options.onmouseover = function() {onMousOpt = true;}
	dropSel[i].onclick = function() {dropSelOpen();	}

	function dropSelOpen() {
		event.stopPropagation();
		if (flag){	dropSelClos();
		}else{
			flag = true;
			options.style.display = null;
			setTimeout(function(){
				tit.classList.add('markStat');
				let c = dropSel[i].getBoundingClientRect();

				if (c.left + options.clientWidth < document.documentElement.clientWidth) {
					options.style.left = '0';
					options.style.transformOrigin = 'left top';
				}else{
					if ((c.left + c.width) > options.clientWidth) {

						options.style.right = '0';
						options.style.transformOrigin = 'right top';

					}else{

						if (options.clientWidth > (document.documentElement.clientWidth - 20)) {

							options.style.width = (document.documentElement.clientWidth - 20) + 'px';
							options.style.whiteSpace = 'wrap';
							options.style.left = '-' + (c.left - 10) + 'px';
							options.style.transformOrigin = 'left top';

						}else{

							options.style.right = '-' + (document.documentElement.clientWidth - (c.left + c.width) - 10) + 'px';
							options.style.transformOrigin = 'right top';
						}
					}
				}
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

/*Презентация*/
let slides = document.querySelectorAll(".slides");
for (let j = 0; j < slides.length; j++) {
	let sldCont = slides[j].querySelector(".sldCont");
		let slid = sldCont.querySelectorAll(".sldCont>*");

		let dots = document.createElement("div");
		slides[j].append(dots);
		dots.classList.add("dots");
		for (let j = 0; j < slid.length; j++) {
			if (j!=0) {slid[j].style.opacity = '0'};
			let dot = document.createElement("div");
			dots.append(dot);
		}
		let dot = dots.querySelectorAll(".dots>*");
		for (let i = 0; i < dot.length; i++) {
			dot[i].onclick = function(){
				slid[curSl].style.opacity = '0';
				dot[curSl].classList.remove("mark");
				curSl = i;
				dot[curSl].classList.add("mark");
				slid[curSl].style.opacity = '1';
			}
		}

		let scrolNav = slides[j].querySelector(".scrolNav");
		let arrLeft = scrolNav.querySelector(".arrLeft");
		let arrRight = scrolNav.querySelector(".arrRight");

		let slideTime = 1000; 
		let curSl = 0;
		let intID = 0;

		scrolNav.style.opacity = '0';
		dot[curSl].classList.add("mark");

		function MovLeft() {
			slid[curSl].style.opacity = '0';
			dot[curSl].classList.remove("mark");
			if (curSl>0){--curSl;} else {curSl = slid.length - 1;}
			dot[curSl].classList.add("mark");
			slid[curSl].style.opacity = '1';}

		function MovRight() {
			slid[curSl].style.opacity = '0';
			dot[curSl].classList.remove("mark");
			if (curSl==(slid.length - 1)){curSl = 0;} else {++curSl;}
			dot[curSl].classList.add("mark");
			slid[curSl].style.opacity = '1';	}

		if (arrLeft) {
			arrLeft.onclick = function(){
				clearInterval(intID);
				MovLeft();
				}	}

		if (arrRight) {
			arrRight.onclick = function(){
				clearInterval(intID);
				MovRight();
			}	}

		slides[j].addEventListener("mouseleave", function() {
			scrolNav.style.opacity = '0';
			setIntrv();
		});

		slides[j].addEventListener("mouseenter", function() {
			scrolNav.style.opacity = '1';
			clearTimeout(intID);
			});

		function setIntrv() {
			intID = setInterval( function() {MovRight();}, slideTime);
		}
		setIntrv();
}
