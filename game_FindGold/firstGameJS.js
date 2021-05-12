	// Получить случайное число от 0 до size-1
	var getRandomNumber= function (size){
	return Math.floor(Math.random()*size);
	};
	// Вычислить расстояние от клика (event) до клада (target)
	var getDistance=function(event, target){
		var diffX=event.offsetX - target.x;
		var diffY=event.offsetY - target.y;
		return Math.sqrt((diffX*diffX)+(diffY*diffY));
	};
	// Получить для расстояния строку подсказки
	var getDistanceHint=function(distance){
		 if (distance<10){
			return "Обшпаришся!";
		} else if (distance<20){
			return "Дуже гаряче!";
		} else if (distance<40){
			return "Гаряче!";
		} else if (distance<80){
			return "Тепло";
		} else if (distance<160){
			return "Холодно";
		} else if (distance<320){
			return "Дуже холодно!";
		} else if (distance<500){
			return "Замерзнеш";
		} else {
			return "Тобі капець! Майже замерз!"
		};
	};

	// Создаем переменные
	var width=400;
	var height=400;
	var clicks=0;
	var gameOver=20;

	// Случайная позиция клада
	var target={
		x: getRandomNumber(width),
		y: getRandomNumber(height)
	};
	// Добавляем элементу img обработчик клика
	$("#map").click(function (event) {
	//код обрабочика
		clicks++;
	// Получаем расстояние от места клика до клада
		var distance=getDistance(event, target);
	// Преобразуем расстояние в подсказку
		var distanceHint=getDistanceHint(distance);
	// Записываем в элемент #distance новую подсказку
		$("#distance").text(distanceHint);
	// Показує кількість спроб що залишилося
		$("#clickLimit").text(gameOver-clicks);
	// Если клик был достаточно близко, поздравляем с победой
		if (distance<8){
			alert("Вітаю, ти переміг! Зроблено: "+clicks+" кліків!");
		};
		if (clicks>gameOver){
			alert("Кінець гри!");
		};
		
	} );