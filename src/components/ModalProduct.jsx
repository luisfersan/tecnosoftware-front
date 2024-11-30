
export default function ModalProduct({ product }) {
  return (
    <div className="modal fade" id={`product-${product.id}`} tabIndex="-1" aria-labelledby="productLabel" aria-hidden="true">
    <div className="modal-dialog modal-xl">
      <div className="modal-content">
        <div className="row">
          <div className="col-12 col-md-4 rounded-start" style={{ backgroundImage: `url(/img/imagen5.png)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
            <div className="col-12 col-md-8 container">
          <div className="modal-body">
              <h5 className='text-center'>{product.name}</h5>
              <p className=''>{product.description}</p>
              <div className="d-flex justify-content-center my-3">
                <button type="button" className="btn bg-orange w-25 text-white btn-orange-hover" data-bs-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
