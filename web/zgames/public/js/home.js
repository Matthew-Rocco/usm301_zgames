const cargarMarcas = async () => {
    //1. Ir a buscar las marcas a la api
    let marcas = await getMarcas();
    //2. Cargar las marcas dentro del select
    let marcaSelect = document.querySelector("#marca-select");
    marcas.forEach(m => {
        let option = document.createElement("option");
        option.innerText = m;
        marcaSelect.appendChild(option);
    });
};

document.addEventListener("DOMContentLoaded", ()=>{
    cargarMarcas();
});

document.querySelector("#registrar-btn").addEventListener("click", async () => {
    let nombre = document.querySelector("#nombre-txt").value.trim();
    let marca = document.querySelector("#marca-select").value.trim();
    let anio = document.querySelector("#anio-txt").value.trim();

    let errores = [];
    if(nombre === ""){
        errores.push("Debe ingresar un nombre");
    }else{
        let consolas = await getConsolas();
        let consolaEncontrada = consolas.find(c=>c.nombre.toLowerCase() === nombre.toLowerCase());
        if(consolaEncontrada != undefined){
            errores.push("La consola ya existe");
        };
    };

    if(isNaN(anio)){
        errores.push("El año debe ser numérico");
    }else if(+anio < 1958){ //poner un +variable lo convierte a numero, obviamente solo numeros strings
        errores.push("El año es incorrecto");
    }

    if(errores.length == 0){

        let consola = {};
        consola.nombre = nombre;
        consola.marca = marca;
        consola.anio = anio;
        console.log(consola);
        let res = await crearConsola(consola);
        await Swal.fire("Consola Creada", "Consola creada exitosamente", "info");
        window.location.href = "ver_consolas";

    }else{
        Swal.fire({
            title: "Errores de validacion",
            icon: "warning",
            html: errores.join("<br />")
        });
    };
});