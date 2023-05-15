const URL_BASE = "http://localhost:8080/api/Message";

loadCar();
loadClient();

function loadCar() {
    $.ajax({
        url: "http://localhost:8080/api/Car/all",
        type: "GET",
        dataType: "JSON",
        success: function (resultado) {
            drawComboCar(resultado);
        }
    });
}

function loadClient() {
    $.ajax({
        url: "http://localhost:8080/api/Client/all",
        type: "GET",
        dataType: "JSON",
        success: function (resultado) {
            drawComboClient(resultado);
        }
    });
}

function drawComboCar(items) {
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        let myOption = `<option value="${item.idCar}"> ${item.name} </option>`;
        $("#car").append(myOption);
    }
}

function drawComboClient(items) {
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        let myOption = `<option value="${item.idClient}"> ${item.name} </option>`;
        $("#client").append(myOption);
    }
}

function addMessage() {
    if (!valEmpty()) {
        return;
    }

    let messageText = document.getElementById("message").value;
    let client = { idClient: parseInt($("#client").val()) };
    let car = { idCar: parseInt($("#car").val()) };

    if (!messageText || !client || !car) {
        alert("Todos los campos son obligatorios");
        return;
    }

    let myData = {
        messageText: messageText,
        client: client,
        car: car
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
    $('#message').val("");
    $('#client').val("--");
    $('#car').val("--");
    $("#resultado").empty();
    $('#car').prop('disabled', false);
}

function listMessage() {
    $.ajax({
        url: URL_BASE + "/all",
        type: "GET",
        dataType: "JSON",
        success: function (resultado) {
            clearScreen();
            drawTableMessage(resultado);
        },
        error: function (xhr, status) {
            alert("No se pudo consultar la tabla");
        }
    });
}

function drawTableMessage(items) {
    let myTable = '<table class="table table-striped">';

    myTable = myTable + '<thead>';
    myTable = myTable + '<tr>';
    myTable = myTable + '<th> ID </th>';
    myTable = myTable + '<th> Cliente </th>';
    myTable = myTable + '<th> Carro </th>';
    myTable = myTable + '<th> Mensaje </th>';
    myTable = myTable + '<th> Opciones </th>';
    myTable = myTable + '</tr>';
    myTable = myTable + '</thead>';

    myTable = myTable + '<tbody>';
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        myTable = myTable + '<tr>';
        myTable = myTable + `<td> ${item.idMessage} </td>`;
        myTable = myTable + `<td> ${item.client.name} </td>`;
        myTable = myTable + `<td> ${item.car.name} </td>`;
        myTable = myTable + `<td> ${item.messageText} </td>`;
        myTable = myTable + `<td> <button type="button" class="btn btn-danger" style="margin: 0rem 1rem;" onclick='delMessage(${item.idMessage})'> Borrar </button>`;
        myTable = myTable + `<button type="button" class="btn btn-primary" style="margin: 0rem 1rem;" onclick='getOne(${item.idMessage})'> Editar </button> </td>`;
        myTable = myTable + '</tr>';
    }
    myTable = myTable + '</tbody>';

    myTable = myTable + '</table>';

    $("#resultado").append(myTable);
}

function getOne(idMessage) {
    $.ajax({
        url: URL_BASE + "/" + idMessage,
        type: "GET",
        dataType: "JSON",
        success: function (resultado) {
            clearScreen();
            $('#car').prop('disabled', true);
            screenModify(resultado);
        },
        error: function (xhr, status) {
            alert("No se pudo consultar el registro");
        }
    });
}

function screenModify(item) {
    $('#id').val(item.idMessage);
    $('#message').val(item.messageText);
    $('#client').val(item.client.idClient);
    $('#car').val(item.car.idCar);
    $("#resultado").empty();
}

function modMessage() {
    if (!valEmpty()) {
        return;
    }

    let idMessage = document.getElementById("id").value;
    let messageText = document.getElementById("message").value;
    let client = { idClient: parseInt($("#client").val()) };
    let car = { idCar: parseInt($("#car").val()) };

    if (!idMessage || !messageText || !client || !car) {
        alert("Todos los campos son obligatorios");
        return;
    }

    let myData = {
        idMessage: idMessage,
        messageText: messageText,
        client: client,
        car: car
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
            alert("No se pudo modificar el registro");
        }
    });
}

function delMessage(idMessage) {
    $.ajax({
        url: URL_BASE + "/" + idMessage,
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
    if ($("#message").val() == "" || $("#client").val() == null || $("#car").val() == null) {
        alert("No se permiten campos vacios");
        return false;
    }
    return true;
}