// Llave para acceder a la base de datos de Firebase.
const firebaseConfig = {
    apiKey: "AIzaSyCjMJAPH6Sl4YzUA64Mk98rT97WN6Y9CBc",
    authDomain: "fb-js-3dd39.firebaseapp.com",
    databaseURL: "https://fb-js-3dd39-default-rtdb.firebaseio.com",
    projectId: "fb-js-3dd39",
    storageBucket: "fb-js-3dd39.appspot.com",
    messagingSenderId: "614371651593",
    appId: "1:614371651593:web:0daca538c80512d2de08d8",
    measurementId: "G-WK2Y3QB4J7"
};
// Inicializa Firebase.
firebase.initializeApp(firebaseConfig);

// Restablece los controles del formulario.
function resetFields() {
    document.getElementById("Input1").value = "";
    document.getElementById("Input2").value = "";
    document.getElementById("Input3").value = "";
    document.getElementById("Input4").value = "";
    document.getElementById("Input5").value = "Selecciona...";
    document.getElementById("Input6").value = "";
    document.getElementById("Input7").value = "";
}

// Crea un registro para la base de datos.
function createR() {
    // Habilita el control con Id "Input1".
    document.getElementById("Input1").disabled = false;

    //Guardo los datos capturados usando el Id de cada control.
    const num = document.getElementById("Input1").value;
    const deudor = document.getElementById("Input2").value;
    const acredor = document.getElementById("Input3").value;
    const monto = document.getElementById("Input4").value;
    const moneda = document.getElementById("Input5").value;
    const fecha_e = document.getElementById("Input6").value;
    const fecha_v = document.getElementById("Input7").value;

    // Validación de que las variables tienen contenido.
    if (num.length > 0 && deudor.length > 0 && acredor.length > 0 &&
        monto.length > 0 && fecha_e.length > 0 && fecha_v.length > 0
        && moneda != "Selecciona") {
        // Crea un JSON que contiene las variables anteriores y las
        // manda a la base de datos.
        var pagare = {
            num, // Id.
            deudor,
            acredor,
            monto,
            moneda,
            fecha_e,
            fecha_v
        }

        //console.log(alumno);

        // Envia el objeto JSON a la tabla "Pagare" con Id "num".
        firebase.database().ref("Pagare/" + num).update(pagare).then(() => {
            // Termina la operación y llama a "resetFields()".
           resetFields();
        }).then(()=>{
            // Termina la operación y llama a "read()".
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Alumnos').push().key;
    //data[`Alumnos/${key}`]= alumno;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

// Lee los registros de la base de datos.
function read() {
    // Limpia el contenido del contenedor con Id "Table1".
    document.getElementById("Table1").innerHTML='';

    const ref = firebase.database().ref("Pagare");
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    // Recibe registro a registro y llama a "printRow(pagare)".
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

// Imprime registros de una tabla de la base de datos.
function printRow(pagare) {
    if (pagare != null) {
        let table = document.getElementById("Table1"); 

        // Crea un nuevo elemento en la tabla en la ultima posición.
        let row = table.insertRow(-1);

        // Inserta cada una de las celdas/columnas del registro.
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);
        let cell7 = row.insertCell(6);
        let cell8 = row.insertCell(7);
        let cell9 = row.insertCell(8);
        
        // Agrega la información a cada una de las columnas del registro.
        cell1.innerHTML = pagare.num;
        cell2.innerHTML = pagare.deudor; 
        cell3.innerHTML = pagare.acredor;
        cell4.innerHTML = pagare.monto;
        cell5.innerHTML = pagare.moneda;
        cell6.innerHTML = pagare.fecha_e;
        cell7.innerHTML = pagare.fecha_v;
        // Agrega botones con funciones para eliminar y modificar los registros recién insertados.
        cell8.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${pagare.num})">Eliminar</button>`;
        cell9.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR(' + pagare.num + ')">Modificar</button>';
    }
}

// Elimina un registro seleccionado.
function deleteR(num) {
    firebase.database().ref('Pagare/' + num).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

// Modifica un registro seleccionado.
function seekR(num) {
    const ref = firebase.database().ref('Pagare/' + num);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

// Actualiza los datos de un registro.
function updateR(pagare) {
    if (pagare != null) {
        // Escribe los valores del JSON en los controles del formulario.
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input1").value = pagare.num;
        document.getElementById("Input2").value = pagare.deudor;
        document.getElementById("Input3").value = pagare.acredor;
        document.getElementById("Input4").value = pagare.monto;
        document.getElementById("Input5").value = pagare.moneda;
        document.getElementById("Input6").value = pagare.fecha_e;
        document.getElementById("Input7").value = pagare.fecha_v;
    }
}




// faltan estas dos funciones para actualizar a nuestro trabajo.


//Para consulta de carrera
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;

    var ref = firebase.database().ref("Pagare");
    ref.orderByChild("carrera").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(alumno){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = alumno.id;
    cell2.innerHTML = alumno.nombre; 
    cell3.innerHTML = alumno.correo;
    cell4.innerHTML = alumno.carrera; 
   
}