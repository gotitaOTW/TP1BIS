const valorMinNota=1;
const valorMaxNota=10;
const cantBotones=2;

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

document.getElementById("signInForm").addEventListener("input", validarIngresos);
document.getElementById("signInForm").addEventListener("submit",validarEnvio);

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
    },
    obtenerValores:function(){
        return{
            mate: documemnt.getElementById("notaMat").value,
            lengua: document.getElementById("notaLen").value,
            efsi:document.getElementById("notaEfsi").value
        
        }
    }
}

function validarIngresos(event)
{
    validarInput(event.target.id);
}



const validadores={
    notaMat: validarNum(valor),
    notaLen:validarNum(valor),
    notaEfsi:validarNum(valor)
};



function validarInput(id){
    let input = document.getElementById(id);
    let value=input.value;
    let campo=input.closest(".campo");
    let error=campo.querySelector(".error");
    let bien=campo.querySelector(".bien");
    let msjError="";

    console.log("entra a validar input")
    console.log(id);
    console.log(value);
    msjError=validadores[id](value);

    error.textContent="";
    bien.textContent="";
    if(msjError!=""){
        ingresosValidos[id]=false;
        error.textContent=msjError;
    }
    else{
        ingresosValidos[id]=true;
        bien.textContent="Ingresado correctamente";
    }

    
}



    const ingresosValidos={
        notaMat:false,
        notaLen:false,
        notaEfsi:false
    }

    function allTrue(obj) {
        return Object.values(obj).every(function(value) {
          return value === true;
        });}