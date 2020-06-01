// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyDgXulTBNCcvzfHYDz1LRTG3dZHCoY0ORw',
    authDomain: 'usuariosproyecto-ef550.firebaseapp.com',
    projectId: 'usuariosproyecto-ef550'
  });
  
  var db = firebase.firestore();

function guardar(){
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var correo = document.getElementById('email').value;

    if( !(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w/.test(correo)) ) {
        alert("El correo no es valido");
        return false;
    }

    db.collection("users").add({
        Nombre: nombre,
        Apellido: apellido,
        Correo : correo
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('email').value = '';

    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

// Leer documentos

var tabla = document.getElementById('tabla');
db.collection("users").onSnapshot((querySnapshot) => { // patron Observer, escucha cada vez que se haga un cambio en la base de datos y lo reflejara en el sitio web
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().Nombre}`);
        tabla.innerHTML += `
        <tr>
        <th scope="row">${doc.id}</th>
        <td>${doc.data().Nombre}</td>
        <td>${doc.data().Apellido}</td>
        <td>${doc.data().Correo}</td>
        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        <td><button class="btn btn-dark"onclick="editar('${doc.id}','${doc.data().Nombre}','${doc.data().Apellido}','${doc.data().Correo}')">Editar</button></td>
        </tr>
        `
    });
});

//Borrar documentos
function eliminar(id){
    db.collection("users").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

//Editar documentos
function editar(id,nombre,apellido,correo){

    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('email').value = correo;
    var boton=document.getElementById('boton');
    boton.innerHTML = 'Editar';

    boton.onclick=function(){
    var washingtonRef = db.collection("users").doc(id);

    // Set the "capital" field of the city 'DC'

    var nombre=document.getElementById('nombre').value;
    var apellido=document.getElementById('apellido').value;
    var correo=document.getElementById('email').value;


    return washingtonRef.update({
        Nombre: nombre,
        Apellido: apellido,
        Correo : correo
    })
    .then(function() {
        console.log("Document successfully updated!");
        boton.innerHTML = 'Guardar';
        boton.onclick=function(){
            guardar();
        }
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('email').value = '';    
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
    }
}