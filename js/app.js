var  calculadora = (function(){


	//Definición de variables
	var st = {

		numeros : ".tecla",
		valNumero : "alt",
		operadores : ".op",
		operacion : "",
		pantalla : "#display",
		signo : "#sign",
		punto : "#punto",
		resetOn : "#on",
		igual : "#igual",
		reset : "0" ,
		valor1 : "",
		valor2 : "",
		resultado : "",
		max : 8,
		setOperacion : false,
		encontrado : false
	};

	//Se realiza la asignación de eventos
	var suscribirEventos = function(){
		$(st.numeros).click(events.setNumber);
		$(st.numeros + "," + st.operadores + "," + st.signo + "," + st.punto + "," + st.resetOn + "," + st.igual)
		.mousedown(events.pressTecla).mouseup(events.soltarTecla);

		$(st.operadores).click(events.pressOperador);
		$(st.signo).click(events.setNegativo);
		$(st.resetOn).click(events.reset);
		$(st.punto).click(events.setPunto);
		$(st.igual).click(events.operaciones);
	};

	//Se crean los diferentes eventos
	var events = {

		pressTecla : function(){
			$(this).css('padding', '1px');
		},
		soltarTecla : function () {
			$(this).css('padding', '0px');
		},
		setValor1: function(){
			$(st.pantalla).html(st.valor1);
		},

		setValor2: function(){
			$(st.pantalla).html(st.valor2);
		},

		setNumber : function(){
			var num = $(this).attr(st.valNumero);

			if (  ((num == st.reset) && ($(st.pantalla).html()== st.reset)) || ((num == st.reset) && ($(st.pantalla).html()=="")) ){

			}else {
				if(!st.setOperacion){
					if((st.valor1.length)<st.max)
						st.valor1 += num;
						events.setValor1();
				}
				else {
					if ((st.valor2.length)<st.max)
						st.valor2 += num;
						events.setValor2();
				}	
			}			
							
		},

		setNegativo : function(){
			st.encontrado= false;
			var valPantalla = $(st.pantalla).html();

			
				if(valPantalla.charAt(0)== "-")
					st.encontrado = true;
					
		
			if (!st.setOperacion){
				if(!st.encontrado){
					if ( valPantalla != st.reset){
						st.valor1 = "-" + st.valor1;
						events.setValor1();
					}
				}
				else {
					st.valor1 = st.valor1.substring(1,(st.valor1.length + 1));
					events.setValor1();
				}

			}else{

				if(!st.encontrado){
					if (valPantalla != st.reset){
						st.valor2 = "-" + st.valor2;
						events.setValor2();
					}
				}
				else {
					st.valor2 = st.valor2.substring(1,(st.valor2.length + 1));
					events.setValor2();
				}
			}

		},

		setPunto: function(){

			st.encontrado=false;
			var valPantalla = $(st.pantalla).html();

			for (var i = 0; i < valPantalla.length; i++) {
				if (valPantalla.charAt(i) == "."){
					st.encontrado = true;
					break;
				}
			}

			if (!st.encontrado) {
				if (!st.setOperacion) {
					if (st.valor1.length==0) {
						st.valor1 += "0.";
						events.setValor1();
					}else {
						st.valor1 += ".";
						events.setValor1();
					}
					
				}else {
					if (st.valor2.length==0) {
						st.valor2 += "0.";
						events.setValor2();
					}else {
						st.valor2 += ".";
						events.setValor2();
					}
				}
			}

		},

		pressOperador : function(){
			
			st.operacion = $(this).attr("id");
			st.setOperacion = true;
			$(st.pantalla).html("");
		},

		
		operaciones : function(){

			switch (st.operacion) {
				case "mas":
						st.resultado = (parseFloat(st.valor1) + parseFloat(st.valor2)).toString();
							if(st.resultado.length>8){
								st.resultado = st.resultado.substring(0,9);
							}
						$(st.pantalla).html(st.resultado);
					break;
				case "dividido":
						st.resultado = (parseFloat(st.valor1) / parseFloat(st.valor2)).toString();
							if(st.resultado.length>8){
								st.resultado = st.resultado.substring(0,9);
							}
						$(st.pantalla).html(st.resultado);
					break;
				case "por":
						st.resultado = (parseFloat(st.valor1) * parseFloat(st.valor2)).toString();
							if(st.resultado.length>8){
								st.resultado = st.resultado.substring(0,9);
							}
						$(st.pantalla).html(st.resultado);
					break;
				case "menos":
						st.resultado = (parseFloat(st.valor1) - parseFloat(st.valor2)).toString();
							if(st.resultado.length>8){
								st.resultado = st.resultado.substring(0,9);
							}
						$(st.pantalla).html(st.resultado);
					break;

				default:
					// statements_def
					break;
			}
		},

		reset : function(){
		
			st.valor1="";
			st.valor2="";
			st.operacion="";
			st.setOperacion = false;
			$(st.pantalla).html(st.reset);

		}


	}//Fin de la cración de eventos

	//Se inicializa el módulo
	var initialize = function(){
		suscribirEventos();
	}

	//Se retorna el método que inicializa el módulo
	return {

		init : initialize
	}



})();


calculadora.init();