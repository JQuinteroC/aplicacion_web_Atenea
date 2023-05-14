const URL_BASE = "http://localhost:8080/api/Gama";

function addGama() {
    let myData = {
        name: $("#name").val(),
        description: $("#description").val(),
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
    $('#name').val("");
    $('#description').val("");
    $("#resultado").empty();
}

function listGama() {
    $.ajax({
        url: URL_BASE + "/all",
        type: "GET",
        dataType: "JSON",
        success: function (resultado) {
            clearScreen();
            drawTableGamas(resultado);
        },
        error: function (xhr, status) {
            alert("No se pudo consultar la tabla");
        }
    });
}

function drawTableGamas(items) {
    let myTable = '<table class="table table-striped">';

    myTable = myTable + '<thead>';
    myTable = myTable + '<tr>';
    myTable = myTable + '<th hidden> ID </th>';
    myTable = myTable + '<th> Nombre </th>';
    myTable = myTable + '<th> Descripción </th>';
    myTable = myTable + '<th> Carros </th>';
    myTable = myTable + '<th> Opciones </th>';
    myTable = myTable + '</tr>';
    myTable = myTable + '</thead>';

    myTable = myTable + '<tbody style="vertical-align: middle;">';
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        item.cars.length = item.cars.length == 0 ? 1 : item.cars.length;

        myTable = myTable + '<tr>';
        myTable = myTable + `<td hidden rowspan="${item.cars.length}"> ${item.idGama} </td>`;
        myTable = myTable + `<td rowspan="${item.cars.length}"> ${item.name} </td>`;
        myTable = myTable + `<td rowspan="${item.cars.length}"> ${item.description} </td>`;
        if (item.cars.length > 1)
            myTable = myTable + `<td> ${item.cars[0].name} - ${item.cars[0].brand} </td>`;
        else
            myTable = myTable + `<td> No hay carros </td>`;
        myTable = myTable + `<td rowspan="${item.cars.length}" class="gap-3"> <button type="button" class="btn btn-danger" onclick='delGama(${item.idGama})' style="margin: 0rem 1rem;"> Borrar </button>`;
        myTable = myTable + `<button type="button" class="btn btn-primary" onclick='getOne(${item.idGama})' style="margin: 0rem 1rem;"> Editar </button> </td>`;
        myTable = myTable + '</tr>';

        for (let j = 1; j < item.cars.length; j++) {
            myTable = myTable + '<tr>';
            const car = item.cars[j];
            myTable = myTable + `<td> ${car.name} - ${car.brand} </td>`;
            myTable = myTable + '</tr>';
        }

    }
    myTable = myTable + '</tbody>';

    myTable = myTable + '</table>';

    $("#resultado").append(myTable);
}

function getOne(idGama) {
    $.ajax({
        url: URL_BASE + "/" + idGama,
        type: "GET",
        dataType: "JSON",
        success: function (resultado) {
            clearScreen();
            screenModify(resultado);
        },
        error: function (xhr, status) {
            alert("No se pudo consultar el registro");
        }
    });
}

function screenModify(item) {
    $('#id').val(item.idGama);
    $('#name').val(item.name);
    $('#description').val(item.description);
    $("#resultado").empty();
}

function modGama() {
    let myData = {
        idGama: $("#id").val(),
        name: $("#name").val(),
        description: $("#description").val(),
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

function delGama(idGama) {
    $.ajax({
        url: URL_BASE + "/" + idGama,
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