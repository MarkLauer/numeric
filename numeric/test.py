import numpy
from scipy import integrate

f = lambda x: numpy.sin(x)
g = lambda x, a, b: f((x + 1) * (b - a) / 2 + a)

quad, _ = integrate.quad(f, 2, 4)

x, w = numpy.polynomial.legendre.leggauss(10)
gauss = sum(w * g(x, 2, 4))

print ('The QUADPACK solution: {0:.8}, Gauss-Legendre solution: {1:.8}'.format(quad, gauss))
