window.onload = function() {
	let Map = document.getElementById("map");
	let airplan = document.getElementById("airplan");
	let root = document.documentElement;
	let bpX = 0;
	let bpY = 0;
	let course = 0;
	let speed = 2;
	let max_speed = 4;
	let size = 128;
	let timer = setInterval(moveBg, 40);
	let screenSize = 600;
	let controlMode = 0;
	document.onkeydown = EventHandler;
	drawTheAirplan();
	function moveBg() {
		// Смещение карты отностиельн курса самолета
		bpX += Math.cos(Math.PI * (course + 90) / 180) * speed;
		bpY += Math.sin(Math.PI * (course + 90) / 180) * speed;  
		if (bpX < 0) bpX += 900;
		if (bpX > 900) bpX -= 900;
		if (bpY < 0) bpY += 1224;
		if (bpY > 1224) bpY -= 1224;
    	Map.style.backgroundPosition = "left " + bpX + "px top " + bpY + "px";
	} 
	function EventHandler(e) {
		// Режим полета
	    if (e.keyCode == 32) {
	    	if (controlMode == 0) {
		    	controlMode = 1;
	    	} else {
	    		course = Math.round(course / 90) * 90;
		    	controlMode = 0;
	    	}
	    	
	    }
		else if (speed > 0 && e.keyCode == 39) course += controlMode == 0 ? 90 : 3;
		else if (speed > 0 && e.keyCode == 37) course -= controlMode == 0 ? 90 : 3;
		else if (e.keyCode == 38) speed = Math.min(speed + 1, max_speed);
		else if (e.keyCode == 40) speed = Math.max(speed - 1, 0);
		else if (screenSize < 750 && (e.keyCode == 33 || e.keyCode == 187 || e.keyCode == 107)) {
			screenSize += 50;
			root.style.setProperty("--map-size", screenSize + "px");
			// Компенсируем сдвиг фона относительно самолета
			bpX += 25;
			bpY += 25;
		} else if (screenSize > 300 && (e.keyCode == 34 || e.keyCode == 189 || e.keyCode == 109)) {
			screenSize -= 50;
			root.style.setProperty("--map-size", screenSize + "px");
			// Компенсируем сдвиг фона относительно самолета
			bpX -= 25;
			bpY -= 25;
		}
    	drawTheAirplan();
	}
	function drawTheAirplan() {
		// Размер экранчика
		root.style.setProperty("--map-size", screenSize + "px");
		// Курс самолета
		airplan.style.transitionDuration = controlMode == 0 ? ".5s" : "0s";
		airplan.style.transform = "rotate("+course+"deg)";
    	// Тень самолета
    	let sX = Math.cos(Math.PI * (405 - course) / 180) * (speed + 0.2) * 10;
    	let sY = Math.sin(Math.PI * (405 - course) / 180) * (speed + 0.2) * 10;
    	airplan.style.filter = "drop-shadow("+sX+"px "+sY+"px 4px rgba(0,0,0,0.5))";
    	// Размер самолета
    	size = 220 - (8 - speed) * 16;
   		airplan.style.width = size + "px";
		airplan.style.height= size + "px";
		// Положение самолета относительно карты
	    airplan.style.top = "calc((var(--map-size) - "+size+"px) / 2)";
	    airplan.style.left = "calc((var(--map-size) - "+size+"px) / 2)";
	}
}
