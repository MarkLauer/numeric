from numeric import app, math
from flask import render_template, request, jsonify, json


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/<lab>')
def lab_view(lab):
    if lab == 'max_eigenvalue':
        return render_template('max_eigenvalue.html')
    elif lab == 'square_roots_method':
        return render_template('square_roots_method.html')
    elif lab == 'gauss_quadrature':
        return render_template('gauss_quadrature.html')
    elif lab == 'danilevsky':
        return render_template('danilevsky.html')
    else:
        return render_template('index.html')


@app.route('/max_eigenvalue', methods=['POST'])
def max_eigenvalue():
    return jsonify(result=str(math.max_eigenvalue(json.loads(request.get_data())['matrix'])))


@app.route('/square_roots_method', methods=['POST'])
def square_roots_method():
    pass


@app.route('/gauss_quadrature', methods=['POST'])
def gauss_quadrature():
    pass


@app.route('/danilevsky', methods=['POST'])
def danilevsky():
    matrix = json.loads(request.get_data())['matrix']
    result = {'eigenvalues': math.danilevsky(matrix)[0], 'eigenvectors': math.danilevsky(matrix)[1]}
    return jsonify(result=result)
