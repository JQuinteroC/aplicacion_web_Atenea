const URL_BASE = "http://localhost:8080/api/Car";

loadGama();

function loadGama() {
    $.ajax({
        url: "http://localhost:8080/api/Gama/all",
        type: "GET",
        dataType: "JSON",
        success: function (resultado) {
            drawComboGama(resultado);
        },
        error: function (xhr, status) {
            alert("No se pudo consultar la tabla");
        }
    });
}

function drawComboGama(items) {
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        let myOption = `<option value="${item.idGama}"> ${item.name} </option>`;
        $("#gama").append(myOption);
    }
}

function addCar() {
    if(!valEmpty()){
        return;
    }

    let name = document.getElementById("name").value;
    let brand = document.getElementById("brand").value;
    let year = document.getElementById("year").value;
    let description = document.getElementById("description").value;
    let gama = document.getElementById("gama").value;

    if(!name || !brand || !year || !description || !gama){
        alert("Todos los campos son obligatorios");
        return;
    }

    let myData = {
        name: name,
        brand: brand,
        year: year,
        description: description,
        gama: { idGama: parseInt(gama)}
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
    $('#brand').val("");
    $('#name').val("");
    $('#year').val("");
    $('#description').val("");
    $('#gama').val("--");
    $("#resultado").empty();
    $('#gama').prop('disabled', false);
}

function listCar() {
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
    myTable = myTable + '<th hidden> ID </th>';
    myTable = myTable + '<th> Marca </th>';
    myTable = myTable + '<th> Nombre </th>';
    myTable = myTable + '<th> Modelo </th>';
    myTable = myTable + '<th> Descripción </th>';
    myTable = myTable + '<th> Gama </th>';
    myTable = myTable + '<th> Opciones </th>';
    myTable = myTable + '</tr>';
    myTable = myTable + '</thead>';

    myTable = myTable + '<tbody>';
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        myTable = myTable + '<tr>';
        myTable = myTable + `<td hidden> ${item.idCar} </td>`;
        myTable = myTable + `<td> ${item.brand} </td>`;
        myTable = myTable + `<td> ${item.name} </td>`;
        myTable = myTable + `<td> ${item.year} </td>`;
        myTable = myTable + `<td> ${item.description} </td>`;
        myTable = myTable + `<td> ${item.gama.name} </td>`;
        myTable = myTable + `<td> <button type="button" class="btn btn-danger" style="margin: 0rem 1rem;" onclick='delCar(${item.idCar})'> Borrar </button>`;
        myTable = myTable + `<button type="button" class="btn btn-primary" style="margin: 0rem 1rem;" onclick='getOne(${item.idCar})'> Editar </button> </td>`;
        myTable = myTable + '</tr>';
    }
    myTable = myTable + '</tbody>';

    myTable = myTable + '</table>';

    $("#resultado").append(myTable);
}

function getOne(idCar) {
    $.ajax({
        url: URL_BASE + "/" + idCar,
        type: "GET",
        dataType: "JSON",
        success: function (resultado) {
            clearScreen();
            $('#gama').prop('disabled', true);
            screenModify(resultado);
        },
        error: function (xhr, status) {
            alert("No se pudo consultar el registro");
        }
    });
}

function screenModify(item) {
    $('#id').val(item.idCar);
    $('#brand').val(item.brand);
    $('#name').val(item.name);
    $('#year').val(item.year);
    $('#description').val(item.description);
    $('#gama').val(item.gama.idGama);
    $("#resultado").empty();
}

function modCar() {
    if (!valEmpty()) {
        return;
    }

    let idCar = $("#id").val();
    let name = $("#name").val();
    let brand = $("#brand").val();
    let year = parseInt($("#year").val());
    let description = $("#description").val();
    let gama = { idGama: parseInt($("#gama").val()) };
    
    if (!idCar || !name || !brand || !year || !description || !gama) {
        alert("Debe ingresar todos los datos");
        return;
    }

    let myData = {
        idCar: idCar,
        name: name,
        brand: brand,
        year: year,
        description: description,
        gama: gama
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

function delCar(idCar) {
    $.ajax({
        url: URL_BASE + "/" + idCar,
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
    if ($('#brand').val() == "" || $('#name').val() == "" || $('#year').val() == "" || $('#description').val() == "" || $('#gama').val() == null) {
        alert("Todos los campos son obligatorios");
        return false;
    }
    return true;
}