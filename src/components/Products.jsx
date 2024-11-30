import './Products.css'

import { products } from "../data/products"
import ModalProduct from "./ModalProduct"

export const Products = () => {
  return (
    <div className="container">

      <h1 className='text-center text-white mt-0'>Destacados</h1>

      <div className="row justify-content-center">
        {products.map(product => (
          <div key={product.id} className="col-md-4 mb-4 d-flex justify-content-center">
            <div id={`producto-${product.id}`} className=""></div>
            <div className="card shadow" style={{ width: '20rem' }}>
              <img src={`/img/${product.image}`} className="card-img-top" alt="..." />
              <div className="card-body d-flex flex-column align-items-center justify-content-between p-2">
                <h5 className="card-title mt-0 text-center">{product.name}</h5>
                <div className="d-flex justify-content-between gap-3">
                <button type="button" className="position absolute bottom-0 btn btn-primary w-100 text-white" data-bs-toggle="modal" data-bs-target={`#product-${product.id}`}>
                  Ver más
                </button>
                <button type="button" className="position absolute bottom-0 btn btn-success w-100 text-white" data-bs-toggle="modal" data-bs-target={`#product-${product.id}`}>
                  Agregar
                </button>

                </div>
  
              </div>
            </div>
            <ModalProduct
              product={product}
            />
          </div>
        ))}
      </div>
    </div >
  )
}
