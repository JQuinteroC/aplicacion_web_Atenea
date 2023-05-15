const URL_BASE = "http://129.213.117.208:8080/api/";

$(document).ready(function () {
    // config();
    clearScreen();
});

function clearScreen() {
    $("#datos").hide();
    $("#resultado").empty();
}

function clients() {
    $.ajax({
        url: URL_BASE + "Reservation/report-clients",
        type: "GET",
        dataType: "JSON",
        success: function (resultado) {
            clearScreen();
            drawTableClient(resultado);
        },
        error: function (xhr, status) {
            alert("No se pudo consultar la tabla");
        }
    });
}

function drawTableClient(items) {
    let myTable = '<table class="table table-striped">';

    myTable = myTable + '<thead>';
    myTable = myTable + '<tr>';
    myTable = myTable + '<th> TOP </th>';
    myTable = myTable + '<th> Nombre </th>';
    myTable = myTable + '<th> email </th>';
    myTable = myTable + '<th> Total reservas </th>';
    myTable = myTable + '</tr>';
    myTable = myTable + '</thead>';

    myTable = myTable + '<tbody>';
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        myTable = myTable + '<tr>';
        myTable = myTable + `<td> ${i + 1} </td>`;
        myTable = myTable + `<td> ${item.client.name} </td>`;
        myTable = myTable + `<td> ${item.client.email} </td>`;
        myTable = myTable + `<td> ${item.total} </td>`;
        myTable = myTable + '</tr>';
    }
    myTable = myTable + '</tbody>';

    myTable = myTable + '</table>';

    $("#resultado").append(myTable);
}

function countResCanc() {
    $.ajax({
        url: URL_BASE + "Reservation/report-status",
        type: "GET",
        dataType: "JSON",
        success: function (resultado) {
            clearScreen();
            drawTableCountResCanc(resultado);
        },
        error: function (xhr, status) {
            alert("No se pudo consultar la tabla");
        }
    });
}

function drawTableCountResCanc(items) {
    let myTable = '<table class="table table-striped">';

    myTable = myTable + '<thead>';
    myTable = myTable + '<tr>';
    myTable = myTable + '<th> Cancelados </th>';
    myTable = myTable + '<th> Completos </th>';
    myTable = myTable + '</tr>';
    myTable = myTable + '</thead>';

    myTable = myTable + '<tbody>';
    myTable = myTable + '<tr>';
    myTable = myTable + `<td> ${items.cancelled} </td>`;
    myTable = myTable + `<td> ${items.completed} </td>`;
    myTable = myTable + '</tr>';
    myTable = myTable + '</tbody>';

    myTable = myTable + '</table>';

    $("#resultado").append(myTable);
}


function countRes() {
    let dateOne = $("#startDate").val();
    let dateTwo = $("#devolutionDate").val();

    $.ajax({
        url: URL_BASE + `Reservation/report-dates/${dateOne}/${dateTwo}`,
        type: "GET",
        dataType: "JSON",
        success: function (resultado) {
            $("#resultado").empty();
            drawTableCountRes(resultado);
        },
        error: function (xhr, status) {
            alert("No se pudo consultar la tabla");
        }
    });
}

function drawTableCountRes(items) {
    let myTable = '<table class="table table-striped">';

    myTable = myTable + '<thead>';
    myTable = myTable + '<tr>';
    myTable = myTable + '<th> Total reservas </th>';
    myTable = myTable + '</tr>';
    myTable = myTable + '</thead>';

    myTable = myTable + '<tbody>';
    myTable = myTable + '<tr>';
    myTable = myTable + `<td> ${items.length} </td>`;
    myTable = myTable + '</tr>';
    myTable = myTable + '</tbody>';

    myTable = myTable + '</table>';

    $("#resultado").append(myTable);
}

function changesDates() {
    $("#devolutionDate").attr("min", $("#startDate").val());
    $("#startDate").attr("max", $("#devolutionDate").val());
}

function countReservations() {
    $("#resultado").empty();

    if ($("#datos").is(":visible")) {
        $("#datos").hide();
    } else {
        $("#datos").show();
    }
}