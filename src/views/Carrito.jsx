import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import useTienda from '../hooks/useTienda';

export const Carrito = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useTienda();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculateTotal = () => {
      const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setTotal(totalAmount);
    };
    calculateTotal();
  }, [cart]);


  const columns = [
    {
      name: 'Producto',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Cantidad',
      selector: row => row.quantity,
      cell: row => (
        <div className="d-flex justify-content-center">
          <Button
            variant="outline-secondary"
            onClick={() => decreaseQuantity(row.id)}
            disabled={row.quantity === 1}
          >
            -
          </Button>
          <span className="mx-3 d-flex align-items-center">{row.quantity}</span>
          <Button
            variant="outline-secondary"
            onClick={() => increaseQuantity(row.id)}
            disabled={row.quantity === 9}
          >
            +
          </Button>
        </div>
      ),
      sortable: false,
    },
    {
      name: 'Precio',
      selector: row => row.price,
      sortable: true,
      cell: row => `$${row.price}`,
    },
    {
      name: 'Total',
      selector: row => row.price * row.quantity,
      sortable: false,
      cell: row => `$${(row.price * row.quantity).toFixed(2)}`,
    },
    {
      name: 'Acciones',
      button: true,
      cell: row => (
        <Button
          variant="danger"
          onClick={() => removeFromCart(row.id)}
        >
          Eliminar
        </Button>
      ),
    }
  ];

  return (
    <div className="container">
      <h1 className="text-center text-white mt-5">Carrito de Compras</h1>

      {cart.length === 0 ? (
        <p className="text-center">Tu carrito está vacío.</p>
      ) : (
        <>
          <DataTable
            columns={columns}
            data={cart}
            pagination
            highlightOnHover
            striped
            responsive
            customStyles={{
              headRow: {
                style: {
                  backgroundColor: '#f8f9fa',
                },
              },
            }}
          />

          <div className="text-white d-flex justify-content-between mt-4">
            <h3>Total: ${total.toFixed(2)}</h3>
            <Button variant="warning" onClick={clearCart}>
              Vaciar carrito
            </Button>
            <Button variant="success w-25">
              Pagar
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
