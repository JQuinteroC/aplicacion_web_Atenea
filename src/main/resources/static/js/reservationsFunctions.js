const URL_BASE = "http://localhost:8080/api/Reservation";
var fechaFormateada
var idScore

$(document).ready(function () {
    config();
    loadCar();
    loadClient();
});

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

function config() {
    let fechaActual = new Date();
    fechaFormateada = fechaActual.toISOString().slice(0, 10);
    $("#startDate").val(fechaFormateada);
    $("#devolutionDate").attr("min", fechaFormateada);
}

function addReservation() {
    if (!valEmptyReservation()) {
        return;
    }

    let startDate = $("#startDate").val();
    let devolutionDate = $("#devolutionDate").val();
    let client = { idClient: parseInt($("#client").val()) };
    let car = { idCar: parseInt($("#car").val()) };

    if (!startDate || !devolutionDate || !client || !car) {
        alert("Todos los campos son obligatorios");
        return;
    }

    let myData = {
        startDate: startDate,
        devolutionDate: devolutionDate,
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
    $('#startDate').val(fechaFormateada);
    $('#devolutionDate').val("");
    $('#client').val("--");
    $('#car').val("--");
    $('#status').val("created");
    $("#resultado").empty();

    $('#score').val("");
    $('#message').val("");
    showScore(false);
    editFields(false);
}

function listReservation() {
    $.ajax({
        url: URL_BASE + "/all",
        type: "GET",
        dataType: "JSON",
        success: function (resultado) {
            clearScreen();
            drawTableReservation(resultado);
        },
        error: function (xhr, status) {
            alert("No se pudo consultar la tabla");
        }
    });
}

function drawTableReservation(items) {
    let myTable = '<table class="table table-striped table-bordered">';

    myTable = myTable + '<thead>';
    myTable = myTable + '<tr>';
    myTable = myTable + '<th rowspan=2> ID </th>';
    myTable = myTable + '<th rowspan=2> Fecha inicio </th>';
    myTable = myTable + '<th rowspan=2> Fecha entrega </th>';
    myTable = myTable + '<th rowspan=2> Estado </th>';
    myTable = myTable + '<th rowspan=2> Carro </th>';
    myTable = myTable + '<th colspan=3 style="text-align: center;"> Cliente </th>';
    myTable = myTable + '<th rowspan=2> Calificación </th>';
    myTable = myTable + '<th rowspan=2> Opciones </th>';
    myTable = myTable + '</tr>';
    myTable = myTable + '<tr>';
    myTable = myTable + '<th> ID </th>';
    myTable = myTable + '<th> Nombre </th>';
    myTable = myTable + '<th> Email </th>';
    myTable = myTable + '</tr>';
    myTable = myTable + '</thead>';

    myTable = myTable + '<tbody>';
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        myTable = myTable + '<tr>';
        myTable = myTable + `<td> ${item.idReservation} </td>`;
        myTable = myTable + `<td> ${item.startDate.slice(0, 10)} </td>`;
        myTable = myTable + `<td> ${item.devolutionDate.slice(0, 10)} </td>`;
        myTable = myTable + `<td> ${item.status} </td>`;
        myTable = myTable + `<td> ${item.car.name} </td>`;
        myTable = myTable + `<td> ${item.client.idClient} </td>`;
        myTable = myTable + `<td> ${item.client.name} </td>`;
        myTable = myTable + `<td> ${item.client.email} </td>`;
        if (item.score == null) {
            myTable = myTable + `<td> Sin calificar </td>`;
        } else {
            myTable = myTable + `<td> ${item.score.stars} </td>`;
        }
        myTable = myTable + `<td> <button type="button" class="btn btn-danger" style="margin: 0rem 1rem;" onclick='delReservation(${item.idReservation})'> Borrar </button>`;
        myTable = myTable + `<button type="button" class="btn btn-primary" style="margin: 0rem 1rem;" onclick='getOne(${item.idReservation})'> Editar </button>`;
        myTable = myTable + `<button type="button" class="btn btn-success" style="margin: 0rem 1rem;" onclick='calificar(${item.idReservation})'> Calificar </button> </td>`;
        myTable = myTable + '</tr>';
    }
    myTable = myTable + '</tbody>';

    myTable = myTable + '</table>';

    $("#resultado").append(myTable);
}

function getOne(idReservation) {
    $.ajax({
        url: URL_BASE + "/" + idReservation,
        type: "GET",
        dataType: "JSON",
        success: function (resultado) {
            clearScreen();
            screenModify(resultado);
            changesDates();
            editFields(true);
        },
        error: function (xhr, status) {
            alert("No se pudo consultar el registro");
        }
    });
}

function screenModify(item) {
    $('#id').val(item.idReservation);
    $('#startDate').val(item.startDate.slice(0, 10));
    $('#devolutionDate').val(item.devolutionDate.slice(0, 10));
    $("#devolutionDate").attr("min", item.startDate.slice(0, 10));
    $('#client').val(item.client.idClient);
    $('#car').val(item.car.idCar);
    $('#status').val(item.status);
    $("#resultado").empty();

    if (item.score != null) {
        $('#score').val(item.score.stars);
        $('#message').val(item.score.messageText);
    }
}

function modReservation() {
    if (!valEmptyReservation()) {
        return;
    }

    let idReservation = parseInt($("#id").val());
    let startDate = $("#startDate").val();
    let devolutionDate = $("#devolutionDate").val();
    let client = { idClient: parseInt($("#client").val()) };
    let car = { idCar: parseInt($("#car").val()) };
    let status = $("#status").val();

    if (!idReservation || !startDate || !devolutionDate || !client || !car || !status) {
        alert("Todos los campos son obligatorios");
        return;
    }

    let myData = {
        idReservation: idReservation,
        startDate: startDate,
        devolutionDate: devolutionDate,
        client: client,
        car: car,
        status: status
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

function delReservation(idReservation) {
    $.ajax({
        url: URL_BASE + "/" + idReservation,
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

function calificar(idReservation) {
    $.ajax({
        url: URL_BASE + "/" + idReservation,
        type: "GET",
        dataType: "JSON",
        success: function (resultado) {
            clearScreen();
            screenModify(resultado);
            if (resultado.score != null) {
                idScore = resultado.score.idScore;
                $('#update').prop("hidden", false);
                $('#save').prop("hidden", true);
            } else {
                idScore = null;
                $('#update').prop("hidden", true);
                $('#save').prop("hidden", false);
            }
            showScore(true);
        },
        error: function (xhr, status) {
            alert("No se pudo consultar el registro");
        }
    });
}

function showScore(active) {
    $('#devolutionDate').prop("disabled", active);
    $('#client').prop("disabled", active);
    $('#car').prop("disabled", active);

    $('#calificar').prop("hidden", !active);
}

function saveScore() {
    if (!valEmptyScore()) {
        return;
    }

    let reservation = { idReservation: parseInt($("#id").val()) };
    let stars = $("#score").val();
    let messageText = $("#message").val();

    if (!reservation || !stars || !messageText) {
        alert("Todos los campos son obligatorios");
        return;
    }

    let myData = {
        reservation: reservation,
        stars: parseInt(stars),
        messageText: messageText
    };

    myData = JSON.stringify(myData);

    $.ajax({
        url: "http://localhost:8080/api/Score/save",
        type: "POST",
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

function updateScore() {
    if (!valEmptyScore()) {
        return;
    }

    let stars = $("#score").val();
    let messageText = $("#message").val();
    let reservation = { idReservation: parseInt($("#id").val()) };

    if (!idScore || !stars || !messageText || !reservation) {
        alert("Todos los campos son obligatorios");
        return;
    }

    let myData = {
        idScore: idScore,
        stars: parseInt(stars),
        messageText: messageText,
        reservation: reservation
    };

    myData = JSON.stringify(myData);

    $.ajax({
        url: "http://localhost:8080/api/Score/update",
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

function editFields(active) {
    $('#startDate').prop('disabled', !active);
    $('#status').prop('disabled', !active);
}

function changesDates() {
    $("#devolutionDate").attr("min", $("#startDate").val());
    $("#startDate").attr("max", $("#devolutionDate").val());
}

function valEmptyReservation() {
    if ($("#startDate").val() == "" || $("#devolutionDate").val() == "" || $("#client").val() == null || $("#car").val() == null) {
        alert("No se permiten campos vacios");
        return false;
    }
    return true;
}

function valEmptyScore() {
    if ($("#score").val() == "" || $("#message").val() == "") {
        alert("No se permiten campos vacios");
        return false;
    }
    return true;
}