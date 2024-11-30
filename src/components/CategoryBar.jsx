import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
export const CategoryBar = () => {
  return (
    <Navbar expand="lg" className="bg-dark navbar-dark">
      <Container>
      <div className="w-100 d-flex justify-content-center">
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="mx-5" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100 d-flex justify-content-between">
            <Nav.Link href="#home" className='link-light link-opacity-75-hover'><span className='h5'>Destacados</span></Nav.Link>
            <Nav.Link href="#home" className='link-light link-opacity-75-hover'><span className='h5'>Electrónica</span></Nav.Link>
            <Nav.Link href="#link" className='link-light link-opacity-75-hover'><span className='h5'>Computación</span></Nav.Link>
            <Nav.Link href="#link" className='link-light link-opacity-75-hover'><span className='h5'>Software</span></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
      </Container>
    </Navbar>
  )
}
