/* Calculadora RPN
   Versión 0.1
   Autor: Nicolás Fdez
   Asignatura:Software y estandares para la web 
*/
class CalculadoraRPN {

   /* cosntructor de la clase calculadoraRPN con los atr
     this.pila : para almacenar los datos introducidos

     ademas se añade el metodo teclado() que acciona el evento keydown para 
     que se puedan introducir digitos y operadores por teclado
     */
  constructor() {
    this.pila = new Array();
    this.teclado();
  }

 /* metodo apilar() que apila en this.pila el valor pasado por parametro.
     */
  apilar(valor) {
    this.pila.push(valor);
  }

  /* metodo desapilar() que desapila en this.pila el ultimo valor introducido.
     */
  desapilar() {
    return (this.pila.pop());
  }

    /* metodo setPantalla que actualiza el valor del elemento <input id="pantalla"> 
        del html con el valor que se le pasa por parámetro.
     */
  setPantalla(pantalla) {
    document.getElementById("pantalla").value = pantalla;
  }

   /* metodo getPantalla devuelve el valor del elemento <input id="pantalla"> 
        del html.
     */
  getPantalla() {
    return document.getElementById("pantalla").value;
  }

  /* metodo setRegistro que actualiza el valor del elemento <input id="registro"> 
        del html con el valor que se le pasa por parámetro.
     */
  setRegistro(registro) {
    document.getElementById("registro").value = registro;
  }

   /* metodo getRegistro devuelve el valor del elemento <input id="registro"> 
        del html.
     */
  getRegistro() {
    return document.getElementById("registro").value;;
  }

   /* metodo escribe que añade a la pantalla el digito que se le pasa por parametro.
     */
  escribe(data) {
    var pantalla = this.getPantalla();
    pantalla = pantalla == "" || isNaN(pantalla) ? data : pantalla += data;
    this.setPantalla(pantalla);
  }

 /* metodo enter que apila el valor que está en la pantalla y pasa el valor
 de <input id="pantalla"> a <input id="registro"> 
     */
  enter() {
    var pantalla = this.getPantalla();
    if (!isNaN(pantalla)) {
      this.setRegistro(pantalla);
      this.apilar(pantalla);
      this.setPantalla("");
    }
  }

  /* metodo sin que muestra en <input id="pantalla"> el sin del valor que hubiera en pantalla
     */
  sin() {
    var x = this.getPantalla();
    this.setPantalla("");
    this.escribe(Math.sin(Number(x)));

  }
   /* metodo cos que muestra en <input id="pantalla"> el cos del valor que hubiera en pantalla
     */
  cos() {
    var x = this.getPantalla();
    this.setPantalla("");
    this.escribe(Math.cos(Number(x)));
  }
   /* metodo tan que muestra en <input id="pantalla"> la tan del valor que hubiera en pantalla
     */
  tan() {
    var x = this.getPantalla();
    this.setPantalla("");
    this.escribe(Math.tan(Number(x)));

  }
   /* metodo aSin que muestra en <input id="pantalla"> el asin del valor que hubiera en pantalla
     */
  aSin() {
    var x = this.getPantalla();
    this.setPantalla("");
    this.escribe(Math.asin(Number(x)));

  }
   /* metodo aCos que muestra en <input id="pantalla"> el acos del valor que hubiera en pantalla
     */
  aCos() {
    var x = this.getPantalla();
    this.setPantalla("");
    this.escribe(Math.acos(Number(x)));

  }
   /* metodo aTan que muestra en <input id="pantalla"> el atan del valor que hubiera en pantalla
     */
  aTan() {
    var x = this.getPantalla();
    this.setPantalla("");
    this.escribe(Math.atan(Number(x)));

  }

   /* metodo rpn que desapila los dos ultimos valores para hacer el calculo correspondiente
   atendiendo a la operacion que se le pase por parametro y mostrarla en <input id="pantalla">

   Si la pila no está vacia, muestra en <input id="registro"> el siguiente valor
     */
  rpn(op) {
    if (this.getRegistro() != "") {
      this.enter();
      var b = this.desapilar();
      var a = this.desapilar();
      if (this.pila.length > 0) {
        var c = this.desapilar();
        this.setRegistro(c);
        this.apilar(c);
      } else {
        this.setRegistro("");
      }
      var res = 0;

      switch (op) {
        case "+":
          res = Number(a) + Number(b);
          break;
        case "-":
          res = Number(a) - Number(b);
          break;
        case "/":
          res = Number(a) / Number(b);
          break;
        case "*":
          res = Number(a) * Number(b);
          break;
        case "^":
          res = Number(a) ** Number(b);
          break;
      }


      this.setPantalla(res);
    }
  }

     /* metodo mas que llama a la funcion rpn para que realice la suma*/
  mas() {
    this.rpn("+");
  }
  /* metodo menos que llama a la funcion rpn para que realice la resta*/
  menos() {
    this.rpn("-");
  }
  /* metodo multiplicacion que llama a la funcion rpn para que realice la mult*/
  multiplicacion() {
    this.rpn("*");
  }
  /* metodo division que llama a la funcion rpn para que realice la div*/
  division() {
    this.rpn("/");
  }
  /* metodo elevado que llama a la funcion rpn para que realice el elevado*/
  elevado() {
    this.rpn("^");
  }

     /* metodo teclado, que mediante eventListener gestiona el evento keydown para poder
         operar con la calculadora por teclado*/
  teclado() {
    document.addEventListener('keydown', (event) => {

      var patron = /[0-9]/;
      if (patron.test(event.key)) {
        this.escribe(event.key);
      }
      switch (event.key) {
        case ".":
          this.escribe(".");
          break;
        case "+":
          this.mas();
          break;
        case "-":
          this.menos();
          break;
        case "*":
          this.multiplicacion();
          break;
        case "/":
          this.division();
          break;
        case "Enter":
          this.enter();
          break;
        case "Delete":
          this.borrar();
          break;
        case "Backspace":
          this.borrar();
          break;
      }
      // alert('keydown event\n\n' + 'key: ' + event.key);
    });
  }

  /* metodo borrar que borra la pantalla y el registro y asigna a this.pila una nueva pila*/
  borrar() {
    this.setPantalla("");
    this.setRegistro("");
    this.pila = new Array();
  }

}
var calculadora = new CalculadoraRPN();
