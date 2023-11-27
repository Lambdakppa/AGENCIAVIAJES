const formElement = document.getElementById("registro-cliente");

formElement.addEventListener("submit", e => {

    e.preventDefault();

    let rut = document.getElementById("rut").value;
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let email = document.getElementById("email").value;
    let telefono = document.getElementById("telefono").value;
    let cliente = {rut: rut, nombre: nombre, apellido: apellido, email: email, telefono: telefono};

    let clienteJSON = JSON.stringify(cliente);

    // Mandar los datos al backend y guardarlos en la base de datos

    fetch('http://localhost:3000/clientes', {
      method: 'post',
      body: clienteJSON
    })
});
