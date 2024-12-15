import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import useTienda from '../hooks/useTienda';
import { useEffect } from 'react';

export const CategoryBar = () => {

  const { categories, getCategories, handleSetActualCategory } = useTienda();


  useEffect(() => {
       getCategories();
  },[]);

  return (
    <Navbar expand="lg" className="bg-dark navbar-dark">
      <Container>
        <div className="w-100 d-flex justify-content-center">
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="mx-5" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="w-100 d-flex justify-content-between">
              {/* Enlace a destacados */}
              <Nav.Link
                onClick={() => handleSetActualCategory('destacados')}
                className="link-light link-opacity-75-hover"
              >
                <span className="h5">Destacados</span>
              </Nav.Link>

              {/* Enlaces a las categorías dinámicas */}
              {categories.map((category) => (
                <Nav.Link
                  key={Math.random()} // Agrega una clave única
                  onClick={() => handleSetActualCategory(category)} // Corrige la ejecución del evento
                  className="link-light link-opacity-75-hover"
                >
                  <span className="h5 text-capitalize">{category}</span>
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
};
