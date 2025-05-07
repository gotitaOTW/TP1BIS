const valorMinNota=1;
const valorMaxNota=10;
const cantBotones=2;
function validarNota(nota){
    let bien=nota>=valorMinNota&&nota<=valorMaxNota;
    return bien;
}


function validarNum(valor){
    console.log("entró en validador numerico");
    if(valor>=valorMinNota&&valor<=valorMaxNota){//ta bien
        retorno="";
    }
    else{
        retorno=`La nota debe estar entre un ${valorMinNota} y un ${valorMaxNota}`;
    }
    return retorno;
}

let form=document.getElementById("signInForm");
form.addEventListener("input", validarIngresos);
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(allTrue(ingresosValidos)){
        validadorEnvioo(e);
    }
    else{
        alert("Todos los campos deben estar bien ingresados");
    }
});
//form.addEventListener("submit",validarEnvio);

function validadorEnvioo(event){
    let idCampo=event.submitter.id;
    console.log("idDelCampo");//bien
    console.log(idCampo);
    let lengua=document.getElementById("notaLen").value;
    let mate=document.getElementById("notaMat").value;
    let efsi=document.getElementById("notaEfsi").value;
    let promedio, mayorNota;
    let promedioTexto=document.getElementById("buttPromedioResult");
    let maxNumTexto=document.getElementById("buttMayorNotaResult");
    let numeros=[lengua, mate, efsi];
    console.log(lengua);
    console.log(mate);
    console.log(efsi);//bien

    
    if(idCampo=="buttPromedio"){//quiere el promedio
        promedio=calcularPromedio(numeros);
        promedioTexto.textContent=promedio;
    }
    else{//quiere mayor nota
        mayorNota=encontrarMaximo(numeros);
        maxNumTexto.textContent=mayorNota;
    }
}

function calcularPromedio(numeros) {
    let suma=0;let num;
     for (let i = 0; i < numeros.length; i++) {
      num=parseFloat(numeros[i]);
      suma+=num;
     }
     console.log(suma);
    return (suma / numeros.length).toFixed(2);
  }

  function encontrarMaximo(numeros) {
    return Math.max(...numeros);
  }
  

function validarEnvio(event){
    let promedio = document.getElementById("promedio");
    let mayorNota = document.getElementById("mayorNota");
    let resultado;
    let idAgregado="";
    if(!(allTrue(ingresosValidos))){//ta mal
     event.preventDefault();
     alert("Todos los ingresos deben ser correctos");
    }
    else{//ta bien
        resultado=calculadorYMostradorDeResultados[event.target.id];
        if(typeof resultado === "number"&&resultado>=6)
        {idAgregado="Bien";}
        else{idAgregado="";}
        document.getElementById(event.target.id+"Result"+idAgregado).textContent=resultado;
    }
}

const calculadorYMostradorDeResultados={
    obtenerValores:function(){
        return{
            mate: documemnt.getElementById("notaMat").value,
            lengua: document.getElementById("notaLen").value,
            efsi:document.getElementById("notaEfsi").value
        }
    },
    buttPromedio:function(){
        let{mate, lengua, efsi}=this.obtenerValores();
        let cantMaterias=document.getElementById("signInForm").elements.length-cantBotones;
        let promedio=(mate+lengua+efsi)/cantMaterias;
        return `La nota promedio es de ${promedio.toFixed(2)}`;
    },
    buttMayorNota:function(){
        let{mate, lengua, efsi}=this.obtenerValores();
        let notas=[mate,lengua,efsi];
        let materias=["matemática","lengua","EFSI"];
        let nombresMayores=[];
        let notaMayor=-1;
        for(let i=0; i<notas.length; i++)
        {
            if(notas[i]>=notaMayor)
            {
                if(notas[i]>notaMayor){
                    nombresMayores=[];
                    notaMayor=notas[i];
                }
                nombresMayores.push(materias[i]);
            }
        }
        return `La${nombresMayores.length > 1 ? "s" : ""} materia${nombresMayores.length > 1 ? "s" : ""} con mayor nota ${nombresMayores.length > 1 ? "son" : "es"} ${nombresMayores.join(", ")}.`;//me lo hizo gpt pero es un detalle estético, no debería importar. Además no es cualquier cosa, más o menos lo puedo explicar. Lo único q hace es fijarse si el array tiene 1 o más de 1 con un if flecha y pone o saca una "s" al final para el plural y reemplaza con "es" o "son"
    }
}

function validarIngresos(event)
{
    console.log("id del campo");
    console.log(event.target.id)//bien
    validarInput(event.target.id);
}

    const ingresosValidos={
        notaMat:false,
        notaLen:false,
        notaEfsi:false
    }

const validadores={
    notaMat: validarNum(valor),
    notaLen:validarNum(valor),
    notaEfsi:validarNum(valor)
};


function validarInput(id){
    let input = document.getElementById(id);
    let valor=input.value;
    console.log(valor);//bien
    let campo=input.closest(".campo");
    let error=campo.querySelector(".error");
    let bien=campo.querySelector(".bien");
    
    let bienIngresado=validarNota(valor);
    error.textContent="";
    bien.textContent="";
    console.log("es válido");//bien
    console.log(bienIngresado);

    if(bienIngresado){
    bien.textContent="Ingreso correcto";
    ingresosValidos[id]=true;
    }
    else{
      error.textContent=`La nota debe estar entre ${valorMinNota} y ${valorMaxNota}`;
      ingresosValidos[id]=false;
    }
}





    function allTrue(obj) {
        return Object.values(obj).every(function(value) {
          return value === true;
        });}