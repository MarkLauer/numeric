function ajax(method, url, data, success, error) {
    var request = new XMLHttpRequest();
    request.open(method, url, true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            success(request.responseText);
        } else {
            error(request.status);
        }
    };

    request.onerror = function () {
        error(request.status);
    };

    request.send(JSON.stringify(data));
}

function createMatrixInputs(size) {
    var matrix = document.getElementById('matrix');
    matrix.innerHTML = '';
    for (var i = 0; i < size; i++) {
        var row = document.createElement('div');
        row.classList.add('row');
        matrix.appendChild(row);
        for (var j = 0; j < size; j++) {
            var cell = document.createElement('input');
            cell.type = 'number';
            cell.name = i + '-' + j;
            cell.required = true;
            matrix.appendChild(cell)
        }
    }
}

function parseMatrix(elements) {
    var cells = {};

    for (var i = 0; i < elements.length; i++) {
        if (elements[i].name.match(/\d-\d/))
            cells[elements[i].name] = elements[i].value;
    }

    var matrix = [];

    for (i = 0; i < elements['size'].value; i++) {
        matrix[i] = [];
    }

    for (var key in cells) {
        var coordinates = key.split('-');
        matrix[coordinates[0]][coordinates[1]] = parseInt(cells[key]);
    }

    return matrix;
}

function maxEigenvalue(event) {
    event.preventDefault();

    ajax('POST', '/max_eigenvalue', {matrix: parseMatrix(event.target.elements)}, function (responseText) {
        document.getElementById('result').innerText = JSON.parse(responseText).result;
    }, function (status) {
        console.log('server reached, but error returned', status);
    });
}

function danilevsky(event) {
    event.preventDefault();

    ajax('POST', '/danilevsky', {matrix: parseMatrix(event.target.elements)}, function (responseText) {
        var result = JSON.parse(responseText).result;

        var eigenvaluesElement = document.getElementById('eigenvalues');
        eigenvaluesElement.innerText = '';

        for (var i = 0; i < result['eigenvalues'].length; i++) {
            eigenvaluesElement.innerHTML += '<p>' + result['eigenvalues'][i] + '</p>';
        }

        var eigenvectorsElement = document.getElementById('eigenvectors');
        eigenvectorsElement.innerText = '';

        for (i = 0; i < result['eigenvectors'].length; i++) {
            eigenvectorsElement.innerHTML += '<p>[' + result['eigenvectors'][i] + ']</p>';
        }
    }, function (status) {
        console.log('server reached, but error returned', status);
    });
}
