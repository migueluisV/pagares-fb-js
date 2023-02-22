// Llave para acceder a la base de datos de Firebase.
const firebaseConfig = {
    apiKey: "AIzaSyAuBqdYyG1TEOF_bmH4h_Tf8EXjIeNIUH0",
    authDomain: "pagare-75096.firebaseapp.com",
    databaseURL: "https://pagare-75096-default-rtdb.firebaseio.com",
    projectId: "pagare-75096",
    storageBucket: "pagare-75096.appspot.com",
    messagingSenderId: "389616617384",
    appId: "1:389616617384:web:7609415e65078a2dadff9d",
    measurementId: "G-8C8GXPS4T8"
};
// Inicializa Firebase.
firebase.initializeApp(firebaseConfig);

// Restablece los controles del formulario.
function resetFields() {
    document.getElementById("Input1").value = "";
    document.getElementById("Input2").value = "";
    document.getElementById("Input3").value = "";
    document.getElementById("Input4").value = "";
    document.getElementById("Input5").value = "";
    document.getElementById("Input6").value = "";
    document.getElementById("Input7").value = "Selecciona...";
    document.getElementById("Input8").value = "";
    document.getElementById("Input9").value = "";
    document.getElementById("Input10").value = "";
    document.getElementById("Input11").value = "";
}

// Crea un registro para la base de datos.
function createR() {
    // Habilita el control con Id "Input1".
    document.getElementById("Input1").disabled = false;

    //Guardo los datos capturados usando el Id de cada control.
    const num = document.getElementById("Input1").value;
    const deudor_nom = document.getElementById("Input2").value;
    const deudor_dir = document.getElementById("Input3").value;
    const deudor_pob = document.getElementById("Input4").value;
    const acredor = document.getElementById("Input5").value;
    const monto = document.getElementById("Input6").value;
    const moneda = document.getElementById("Input7").value;
    const interes = document.getElementById("Input8").value;
    const ciudad = document.getElementById("Input9").value;
    const fecha_e = document.getElementById("Input10").value;
    const fecha_v = document.getElementById("Input11").value;

    // Validación de que las variables tienen contenido.
    if (num.length > 0 && deudor_nom.length > 0 && deudor_dir.length > 0 &&
        deudor_pob.length > 0 && acredor.length > 0 && monto.length > 0 &&
        moneda != "Selecciona" && interes.length > 0 && ciudad.length > 0 &&
        fecha_e.length > 0 && fecha_v.length > 0) {
        // Crea un JSON que contiene las variables anteriores y las
        // manda a la base de datos.
        var pagare = {
            num, // Id.
            deudor_nom,
            deudor_dir,
            deudor_pob,
            acredor,
            monto,
            moneda,
            interes,
            ciudad,
            fecha_e,
            fecha_v
        }

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
        let cell10 = row.insertCell(9);
        let cell11 = row.insertCell(10);
        let cell12 = row.insertCell(11);
        let cell13 = row.insertCell(12);
        let cell14 = row.insertCell(13);
        
        // Agrega la información a cada una de las columnas del registro.
        cell1.innerHTML = pagare.num;
        cell2.innerHTML = pagare.deudor_nom;
        cell3.innerHTML = pagare.deudor_dir;
        cell4.innerHTML = pagare.deudor_pob;
        cell5.innerHTML = pagare.acredor;
        cell6.innerHTML = pagare.monto;
        cell7.innerHTML = pagare.moneda;
        cell8.innerHTML = pagare.interes;
        cell9.innerHTML = pagare.ciudad;
        cell10.innerHTML = pagare.fecha_e;
        cell11.innerHTML = pagare.fecha_v;
        // Agrega botones con funciones para eliminar y modificar los registros recién insertados.
        cell12.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${pagare.num})">Eliminar</button>`;
        cell13.innerHTML = `<button type="button" class="btn btn-success" onClick="seekR(${pagare.num})">Modificar</button>`;
        cell14.innerHTML = `<button type="button" class="btn btn-success" onClick="generate(${pagare.num})">Generar</button>`;
    }
}

// Redirecciona a "pagare.html" para generar el Pagaré del registro.
function generate(num) {
    window.location.href = `pagare.html?num=${num}`;
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
        document.getElementById("Input2").value = pagare.deudor_nom;
        document.getElementById("Input3").value = pagare.deudor_dir;
        document.getElementById("Input4").value = pagare.deudor_pob;
        document.getElementById("Input5").value = pagare.acredor;
        document.getElementById("Input6").value = pagare.monto;
        document.getElementById("Input7").value = pagare.moneda;
        document.getElementById("Input8").value = pagare.interes;
        document.getElementById("Input9").value = pagare.ciudad;
        document.getElementById("Input10").value = pagare.fecha_e;
        document.getElementById("Input11").value = pagare.fecha_v;
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