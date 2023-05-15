const URL_BASE = "http://129.213.117.208:8080/api/Client";

function addClient() {
    if (!valEmpty()) {
        return;
    }

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let age = document.getElementById("age").value;
    let name = document.getElementById("name").value;

    if (!email || !password || !age || !name) {
        alert("Por favor, complete todos los campos");
        return;
    }

    let myData = {
        email: email,
        password: password,
        age: parseInt(age),
        name: name
    };

    let dataToSend = JSON.stringify(myData);

    $.ajax({
        url: URL_BASE + "/save",
        type: "POST",
        data: dataToSend,
        contentType: "application/JSON",
        success: function (resultado) {
            clearScreen();
            alert("Registro guardado");
        },
        error: function (xhr, status) {
            alert("No se pudo guardar el registro");
        }
    });
}

function clearScreen() {
    $('#id').val("");
    $('#email').val("");
    $('#password').val("");
    $('#age').val("");
    $('#name').val("");
    $("#resultado").empty();
    $('#email').prop('disabled', false);
}

function listClient() {
    $.ajax({
        url: URL_BASE + "/all",
        type: "GET",
        dataType: "JSON",
        success: function (resultado) {
            clearScreen();
            drawTableClients(resultado);
        },
        error: function (xhr, status) {
            alert("No se pudo consultar la tabla");
        }
    });
}

function drawTableClients(items) {
    let myTable = '<table class="table table-striped">';

    myTable = myTable + '<thead>';
    myTable = myTable + '<tr>';
    myTable = myTable + '<th> ID </th>';
    myTable = myTable + '<th> Email </th>';
    myTable = myTable + '<th> Nombre </th>';
    myTable = myTable + '<th> Edad </th>';
    myTable = myTable + '<th> Opciones </th>';
    myTable = myTable + '</tr>';
    myTable = myTable + '</thead>';

    myTable = myTable + '<tbody>';
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        myTable = myTable + '<tr>';
        myTable = myTable + `<td> ${item.idClient} </td>`;
        myTable = myTable + `<td> ${item.email} </td>`;
        myTable = myTable + `<td> ${item.name} </td>`;
        myTable = myTable + `<td> ${item.age} </td>`;
        myTable = myTable + `<td> <button type="button" class="btn btn-danger" style="margin: 0rem 1rem;" onclick='delClient(${item.idClient})'> Borrar </button>`;
        myTable = myTable + `<button type="button" class="btn btn-primary" style="margin: 0rem 1rem;" onclick='getOne(${item.idClient})'> Editar </button> </td>`;
        myTable = myTable + '</tr>';
    }
    myTable = myTable + '</tbody>';

    myTable = myTable + '</table>';

    $("#resultado").append(myTable);
}

function getOne(idClient) {
    $.ajax({
        url: URL_BASE + "/" + idClient,
        type: "GET",
        dataType: "JSON",
        success: function (resultado) {
            clearScreen();
            screenModify(resultado);
            $('#email').prop('disabled', true);
        },
        error: function (xhr, status) {
            alert("No se pudo consultar el registro");
        }
    });
}

function screenModify(item) {
    $('#id').val(item.idClient);
    $('#email').val(item.email);
    $('#password').val(item.password);
    $('#age').val(item.age);
    $('#name').val(item.name);
    $("#resultado").empty();
}

function modClient() {
    if (!valEmpty()) {
        return;
    }

    let idClient = document.getElementById("id").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let age = document.getElementById("age").value;
    let name = document.getElementById("name").value;

    if (!idClient || !email || !password || !age || !name) {
        alert("Por favor, complete todos los campos");
        return;
    }

    let myData = {
        idClient: idClient,
        email: email,
        password: password,
        age: parseInt(age),
        name: name
    };

    myData = JSON.stringify(myData);

    $.ajax({
        url: URL_BASE + "/update",
        type: "PUT",
        data: myData,
        contentType: "application/JSON",
        success: function (resultado) {
            clearScreen();
            alert("Registro modificado");
        },
        error: function (xhr, status) {
            alert("No se pudo modificlient el registro");
        }
    });
}

function delClient(idClient) {
    $.ajax({
        url: URL_BASE + "/" + idClient,
        type: "DELETE",
        success: function (resultado) {
            clearScreen();
            alert("Registro eliminado");
        },
        error: function (xhr, status) {
            alert("No se pudo eliminar el registro");
        }
    });
}

function valEmpty() {
    if ($('#email').val() == "" || $('#password').val() == "" || $('#age').val() == "" || $('#name').val() == "") {
        alert("No se permiten campos vacios");
        return false;
    }
    return true;
}