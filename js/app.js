var  calculadora = (function(){


	//Definición de variables
	var st = {

		numeros : ".tecla",
		valNumero : "alt",
		operadores : ".op",
		operacion : "",
		pantalla : "#display",
		signo : "#sign",
		resetOn : "#on",
		reset : "0" ,
		valor1 : "",
		valor2 : "",
		max : 8,
		setOperacion : false
	};

	//Se realiza la asignación de eventos
	var suscribirEventos = function(){
		$(st.numeros).click(events.setNumber);
		$(st.operadores).click(events.pressOperador);
		$(st.signo).click(events.setNegativo);
		$(st.resetOn).click(events.reset);
	};

	//Se crean los diferentes eventos
	var events = {

		setValor1: function(){
			$(st.pantalla).html(st.valor1);
		},

		setValor2: function(){
			$(st.pantalla).html(st.valor2);
		},

		setNumber : function(){
			
			if(!st.setOperacion){
				if((st.valor1.length)<st.max)
					st.valor1 += $(this).attr(st.valNumero);
					events.setValor1();
			}
			else {
				if ((st.valor2.length)<st.max)
					st.valor2 += $(this).attr(st.valNumero);
					events.setValor2();
			}

						
							
		},

		setNegativo : function(){
			var encontrado= false;
			var valPantalla = $(st.pantalla).html();

			for (var i = 0; i <=valPantalla.length ; i++) {
				if(valPantalla.charAt(i)== "-")
					encontrado = true;
					break;
			}//fin del for que evalua la presencia del negativo en el número en pantalla 
	
			if (!st.setOperacion){
				if(!encontrado){
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

				if(!encontrado){
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

			encontrado = false;

		},

		pressOperador : function(){
			
			st.operacion = $(this).attr("id");
			st.setOperacion = true;
			$(st.pantalla).html("");
		},

		reset : function(){
		
			st.valor1="";
			st.valor2="";
			st.operacion="";
			st.setOperacion = false;
			$(st.pantalla).html(st.reset);

		}


	}

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