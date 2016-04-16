// Carlos Andres Barrientos Pardo
// 561211201

$(document).ready(function(){

	var checkboxnumber = [];// Creamos una variable para la caja de texto
	var contenido = "";// Creamos una variable contenido para el contenido del cuadro 
	var levelcount = 1; // Creamos una variable para el contador de nivel 
	var getSelectedProducto; // Variable para obtener el producto que va estar adentro 
	var timeValidate; //Variable para la validacion de tiempo 
	var score = 0; // Variable para un contador 


	$("#Check").click(function(){ //Llamamos el id del boton "check" y creamos la funcion para validar el click   
		$("#Start").bind("click",initgame); // Llamamos el id creado en el index del boton Start y validamos con la funcion Click
		checkboxnumber =[]; // Realizamos una validacion del Checkboxnumber
		contenido = ""; // Declaramos la variable contenido
		levelcount = 1; // Llamamos la variable Levelcount previamente creada
		$("#boxcontent").remove(); // Borra el contenido que genera el boxcontent
		var getSelected ; // Creamos una variable y la llamamos getselected
		getSelected = $("#Selected").val(); // Llama el id selected y retonra con un .val
		getSelectedProducto = getSelected*getSelected // 
		console.log(getSelected);// Imprime el valor de getselected 
		contenido += '<div id="boxcontent">' // Usamos Jquery para validar el id de cada caja del contenido 
		for (i=1; i<=getSelectedProducto; i++){ // Creamos un ciclo "for" para que nos recorra la variable del contenido completa
			contenido += '<div id="box_'+ i +'" class = "boxgame"></div>'//Usamos Jquery para que muestre las cajas 
			if(i % getSelected  == 0){ // Por medio de un ciclo "If" le decimos que el residuo de "i" dividido el getselected sea = 0
				contenido += '<br>'; // El contenido nos genere un espacio 
			} 
		}
		contenido += '</div>' // 
		$("#BaseCuadro").append(contenido); // 

	});
		
	function initgame(){ // Validamos el boton Start que creamos en el index  
		
		for(i=1; i<=levelcount; i++){ 
			var number = getRandom(1, getSelectedProducto) 
				for(i=0;i<checkboxnumber.length;i++){
					if(number == checkboxnumber[i]){
						number = getRandom(1, getSelectedProducto);
						i=0;
					}
				}
			checkboxnumber.push(number)
		}
		for(i=0; i<checkboxnumber.length; i++){ //Recorre el array con los numeros aleatorios que obtuvimos
			$("#box_" + checkboxnumber[i]).css("background-color","blue")//con Jquery implementamos un css para que nos enseñe los numero que se obtuvieron al azar.
		}
		console.log(checkboxnumber)
		$(this).unbind(); 
		fadeout();

	}
	function fadeout (){ // Funcion para desaparecer las cajas 
		timeValidate = setTimeout(function(){
			for(i=0; i<checkboxnumber.length; i++){	
				$("#box_" + checkboxnumber[i]).css("background-color","green")	
			}
			validateBox();
		}, 2000);
	}

	function validateBox(){ // Funcion para validar las cajas
		for(i=1; i<=getSelectedProducto; i++){	// Con un ciclo for recorreremos las cajas para validarlas 
			$("#box_" + i).on('click',ValidateNumber)// Evento para validar los box  
		}
	}

	function quitValidateBox(){
		for(i=1; i<=getSelectedProducto; i++){	
			$("#box_" + i).off('click',ValidateNumber)// Evento para quitar los box
		}
	}

	function ValidateNumber(e){ //funcion para validar los box
		console.log(e.target.id.split('_'));//Imprime mediante un split el id de la caja
		var idNumber = e.target.id.split('_');//Creamos una variable para que valide el numero del evento 
		var idValidate = Number(idNumber[1])//Creamos una variable para el id de validacion del numero 
		var valorNoencontrado = false; // Variable Noencontrado sea false 
		console.log(idValidate) // Muestre el Id 
		for(i=0; i<=checkboxnumber.length;i++){// Creamos un for que recorra el checkboxnumber
			if(checkboxnumber[i] == idValidate){// Si checkboxnumber es == a idvalidate   
				$("#box_" + checkboxnumber[i]).css("background-color","green") // Pase a un color verde 
				valorNoencontrado = true;// Valor no encontrado es verdadero
				checkboxnumber.splice(i,1); //Divida con un splice e identifique  
				break; // Rompa el ciclo 
			}
		}

		if(valorNoencontrado == false){ // Si valor Noencontrado es igual a False
			score = 0; // Score no aumenta
			levelcount = 1; // El nivel se debe reiniciar 
			checkboxnumber = []; // Declaramos la variable
			alert("Perdiste!"); // Imprima: Usuario perdio
			quitValidateBox(); // No valide la caja
			initgame(); //Vuelve e inica
		}	

		if(checkboxnumber.length==0){ // Si checkboxnumber es igual 0
			alert("Patron realizado correctamente!") //Imprima el patron realizado correctamente
			score = score+levelcount*10;// Si el usuario valida la opcion coorrecta incremente el nivel 
			$("#Score").text(score);// Muestreme en el Id Score 
			levelcount ++; // Incremente nivel
			checkboxnumber = []; //checkboxnumber se declara nuevamente
			quitValidateBox(); // Se reinicia la validacion de la caja
			initgame(); // Inicie juego 
		}	
	}

	function getRandom(min, max) { // Usamos el evento para el numero aleatorio para las cajas del juego
	  return Math.floor(Math.random() * (max - min) + min);
	}

});


//crear un set time  para el intervalo de tiempo  //setTimeout("alertMsg()",3000);

// un evento click que capture el patron 