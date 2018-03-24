import numpy
from numpy import linalg


def max_eigenvalue(matrix):
    eigenvalues, _ = linalg.eig(numpy.array(matrix, numpy.float64))
    return max(eigenvalues)


def danilevsky(matrix):
    eigenvalues, eigenvectors = linalg.eig(numpy.array(matrix, numpy.float64))
    return eigenvalues.tolist(), eigenvectors.tolist()
