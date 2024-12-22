import React, { useState, useEffect } from 'react';
import { Button, Spinner, Alert } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import useTienda from '../hooks/useTienda';
import clienteAxios from '../config/axios';
import { useNavigate } from 'react-router-dom';

export const Carrito = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart, profile } = useTienda();
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const calculateTotal = () => {
      const totalAmount = cart.reduce((sum, item) => sum + item.product_price * item.quantity, 0);
      setTotal(totalAmount);
    };
    calculateTotal();
  }, [cart]);

  const handleClickPagar = async () => {
    const token = localStorage.getItem("AUTH_TOKEN");
    if (!token) {
      localStorage.removeItem("AUTH_TOKEN");
      navigate("/auth/login");
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const payload = {
        user_id: profile.id,
        products: cart.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity,
        }))
      };

      const response = await clienteAxios.post("/orders", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      clearCart();
      navigate("/perfil");
    } catch (err) {
      setError('Error al procesar la compra. Inténtalo de nuevo.');
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      name: 'Producto',
      selector: row => row.product_name,
      sortable: true,
    },
    {
      name: 'Cantidad',
      selector: row => row.quantity,
      cell: row => (
        <div className="d-flex justify-content-center">
          <Button
            variant="outline-secondary"
            onClick={() => decreaseQuantity(row.product_id)}
            disabled={row.quantity === 1}
          >
            -
          </Button>
          <span className="mx-3 d-flex align-items-center">{row.quantity}</span>
          <Button
            variant="outline-secondary"
            onClick={() => increaseQuantity(row.product_id)}
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
      selector: row => row.product_price,
      sortable: true,
      cell: row => `$${row.product_price}`,
    },
    {
      name: 'Total',
      selector: row => row.product_price * row.quantity,
      sortable: false,
      cell: row => `$${(row.product_price * row.quantity).toFixed(2)}`,
    },
    {
      name: 'Acciones',
      button: true,
      cell: row => (
        <Button
          variant="danger"
          onClick={() => removeFromCart(row.product_id)}
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
        <p className="text-center text-white">Tu carrito está vacío.</p>
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

          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

          <div className="text-white d-flex justify-content-between mt-4">
            <h3>Total: ${total.toFixed(2)}</h3>
            <Button variant="warning" onClick={clearCart}>
              Vaciar carrito
            </Button>
            <Button variant="success w-25" onClick={handleClickPagar} disabled={loading}>
              {loading ? <Spinner as="span" animation="border" size="sm" /> : 'Pagar'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
