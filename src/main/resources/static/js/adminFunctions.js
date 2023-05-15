const URL_BASE = "http://129.213.117.208:8080/api/Admin";

function addAdmin() {
    if (!valEmpty()) {
        return;
    }

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let name = document.getElementById("name").value;

    if (!email || !password || !name) {
        alert("Por favor, complete todos los campos");
        return;
    }

    let myData = {
        email: email,
        password: password,
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
    $('#name').val("");
    $("#resultado").empty();
    $('#email').prop('disabled', false);
}

function listAdmin() {
    $.ajax({
        url: URL_BASE + "/all",
        type: "GET",
        dataType: "JSON",
        success: function (resultado) {
            clearScreen();
            drawTableAdmins(resultado);
        },
        error: function (xhr, status) {
            alert("No se pudo consultar la tabla");
        }
    });
}

function drawTableAdmins(items) {
    let myTable = '<table class="table table-striped">';

    myTable = myTable + '<thead>';
    myTable = myTable + '<tr>';
    myTable = myTable + '<th> ID </th>';
    myTable = myTable + '<th> Email </th>';
    myTable = myTable + '<th> Nombre </th>';
    myTable = myTable + '<th> Opciones </th>';
    myTable = myTable + '</tr>';
    myTable = myTable + '</thead>';

    myTable = myTable + '<tbody>';
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        myTable = myTable + '<tr>';
        myTable = myTable + `<td> ${item.idAdmin} </td>`;
        myTable = myTable + `<td> ${item.email} </td>`;
        myTable = myTable + `<td> ${item.name} </td>`;
        myTable = myTable + `<td> <button type="button" class="btn btn-danger" style="margin: 0rem 1rem;" onclick='delAdmin(${item.idAdmin})'> Borrar </button>`;
        myTable = myTable + `<button type="button" class="btn btn-primary" style="margin: 0rem 1rem;" onclick='getOne(${item.idAdmin})'> Editar </button> </td>`;
        myTable = myTable + '</tr>';
    }
    myTable = myTable + '</tbody>';

    myTable = myTable + '</table>';

    $("#resultado").append(myTable);
}

function getOne(idAdmin) {
    $.ajax({
        url: URL_BASE + "/" + idAdmin,
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
    $('#id').val(item.idAdmin);
    $('#email').val(item.email);
    $('#password').val(item.password);
    $('#name').val(item.name);
    $("#resultado").empty();
}

function modAdmin() {
    if (!valEmpty()) {
        return;
    }

    let idAdmin = document.getElementById("id").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let name = document.getElementById("name").value;

    if (!idAdmin || !email || !password || !name) {
        alert("Por favor, complete todos los campos");
        return;
    }

    let myData = {
        idAdmin: idAdmin,
        email: email,
        password: password,
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

function delAdmin(idAdmin) {
    $.ajax({
        url: URL_BASE + "/" + idAdmin,
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
    if ($('#email').val() == "" || $('#password').val() == "" || $('#name').val() == "") {
        alert("No se permiten campos vacios");
        return false;
    }
    return true;
}