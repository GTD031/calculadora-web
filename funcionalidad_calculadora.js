        //DECLARACION DE VARIABLES

        var igual = 0;      //Variable que será indicador de una operacion terminada, asi como será reutilizada para asignar eventos a cada elemento <button>.
        var TA = document.getElementById('campo');  //referencio al objeto textarea, donde estarán las operaciones a realizar
        var BUTTON = document.getElementsByTagName('button'); //defino aqui el array BUTTON que almacenará los elementos que son botones
        var result;     //variable que almacenará el resultado de la operacion hecha en el textarea.

        //DEFINICION DE FUNCIONES

        function escribir(texto){   //Permitirá escribir cada caracter que está en los botones de button
            TA.value += texto;
        }

        function evaluar(){ // Evalua la expresion matematica que esta en el textArea (tecla igual (=))
            try {
                TA.value = TA.value.replaceAll(',','.');    //reemplazo comas por puntos (numeros decimales)
                TA.value = TA.value.replaceAll('x','*');    //reemplazo todos los 'x' por asteriscos (*), que es la operacion de multiplicación. 
                result = eval(TA.value);        //evalúo con eval() la expresion matematica almacenada en el contenido del textarea y la asigno a result.
                if (result === Infinity){       //esto solo ocurre si hay division entre cero.
                    alert('Error: Hay division entre cero.');
                    TA.value = TA.value.replaceAll('.',',');    
                    TA.value = TA.value.replaceAll('*','x');    //devuelvo a como estaba escrito antes
                } else {
                    TA.value = result.toString().replace('.',',');  //reemplazo putnos por comas (si los hay).
                    igual = 1;  //con esto, indico que la operación ha finalizado exitosamente
                }
            } catch(e){     //en caso de que hay problemas para evaluar la expresion con eval() (P ej., las expresiones /x, +-, -x, etc)
                alert('Expresión inválida o incompleta. No es posible ejecutar.'); 
                TA.value = TA.value.replaceAll('.',',');    // Devuelvo cambios
                TA.value = TA.value.replaceAll('*','x');
            }
        } 

        function Borrar(){  //funcion borrar (tecla 'B')
            var N;
            if (igual == 1){    //en ese caso, se ha realizado la operacion y se ha evaluado (borra todo)
                TA.value = "";
                igual = 0;
            } else{     //borro el ultimo caracter si hay 2 o mas (cosidero todo el substring del textarea sin el utlimo caracter). En caso contrario, borro todo.
                N = TA.value.length-1;
                if (N>=1){
                   TA.value = TA.value.substring(0,N);
                } else {
                    TA.value = "";
                }
            }
        }

        // LUEGO, LA ASIGNACION DE LISTENERS EN TODOS LOS ELEMENTOS <button>.

        while (igual<12){
            BUTTON[igual].addEventListener('click', function() {
                escribir(this.value);}, false);
            igual++;
        }
        BUTTON[12].addEventListener('click', Borrar, false);
        BUTTON[18].addEventListener('click', evaluar, false);
        igual = 13;
        while (igual<18){
             BUTTON[igual].addEventListener('click', function() {
                escribir(this.value);}, false);
            igual++;
        }
        igual = 0;  //despues de reutilizar la variable igual, le reasigno el valor inicial 0.