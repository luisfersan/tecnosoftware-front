import './Footer.css'


export const Footer = () => {
  return (
    <footer className="pt-3 px-3">
    <div className="container">
        <div className="row">
            <div className="col-12 col-md-6 pt-1">
                <h6 className="m-0 text-white fw-bold mq-text">Desarrollado por: Daniel Hernández y Luis F. Sanchez</h6>
                <br />
                <p className='text-white m-0'>Academia Desafio Latam</p>
                <p className='text-white m-0'>Desarrolladores FullStack</p>
                <br />
                <p className='text-white m-0'>Contacto:</p>
                <p className='text-white m-0'>dhernandez@gmail.com</p>
                <p className='text-white m-0'>lfersan@gmail.com</p>
                <p className="text-white font-small mb-1 mq-text"></p>
            </div>
            <div className="col-12 col-md-2 pt-1"></div>
            <div className="col-12 col-md-2 d-flex flex-column justify-content-center pt-1">
                <p className="text-white font-xsmall mb-1 text-center"></p>
            </div>
            <div className="col-12 col-md-2 d-flex flex-column justify-content-center pt-1">
                <p className="text-white font-xsmall mb-1 text-center"></p>
            </div>
        </div>
    </div>
</footer>
  )
}
