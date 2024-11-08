let svgCont = document.querySelector(".cont1");
let pathFr = document.querySelectorAll(".cont1 svg path");
let subScr = document.querySelectorAll(".subScr>*");

for (let i = 0; i < pathFr.length; i++) {
	pathFr[i].onmouseover = function(e) {razv(i, (e.pageX-svgCont.offsetLeft), (e.pageY-svgCont.offsetTop));	}
	pathFr[i].onmouseout = function(e) {for (let i = 0; i < subScr.length; i++) {subScr[i].classList.remove('DopQuad');	}}
}

function razv(indx, xCoord, yCoord) {
	let xC = xCoord;
	let yC = yCoord;
	let trnsfOr;
	if (svgCont.offsetWidth<(xC + 440)){
		subScr[indx].style.left = null;
		subScr[indx].style.right = "20px";
		trnsfOr = 400 - svgCont.offsetWidth + subScr[indx].offsetLeft;
	}else{
		subScr[indx].style.right = null;
		subScr[indx].style.left = xC + "px";
		trnsfOr = "0px";
	}
	if (svgCont.offsetHeight<(yC + 140)){
		subScr[indx].style.top = null;
		subScr[indx].style.bottom = (svgCont.offsetHeight - yCoord) + "px";
		trnsfOr = trnsfOr + " " + (svgCont.offsetHeight - yCoord) + "px";
	}else{
		subScr[indx].style.bottom = null;
		subScr[indx].style.top = yC + "px";
		trnsfOr = trnsfOr + " 0px";
	}
	subScr[indx].classList.add('DopQuad');
	subScr[indx].style.transformOrigin = trnsfOr;
	subScr[indx].style.transform = "scale(0)";
	subScr[indx].style.transitionDuration = "0.4s";
	setTimeout( function() {subScr[indx].style.transform = "scale(1)";}, 10);
}

