import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ orderNumber: '', customerName: '', product: '', status: 'pending' });
  const [editingId, setEditingId] = useState(null);

  const fetchOrders = async () => {
    const res = await axios.get('http://localhost:5000/api/orders');
    setOrders(res.data);
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (editingId) {
      await axios.put(`http://localhost:5000/api/orders/${editingId}`, form);
      setEditingId(null);
    } else {
      await axios.post('http://localhost:5000/api/orders', form);
    }
    setForm({ orderNumber: '', customerName: '', product: '', status: 'pending' });
    fetchOrders();
  };

  const handleEdit = (order) => {
    setForm(order);
    setEditingId(order._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/orders/${id}`);
    fetchOrders();
  };

  return (
    <div className="container">
      <h2>Order Manager</h2>
      <input name="orderNumber" placeholder="Order #" value={form.orderNumber} onChange={handleChange} />
      <input name="customerName" placeholder="Customer Name" value={form.customerName} onChange={handleChange} />
      <input name="product" placeholder="Product" value={form.product} onChange={handleChange} />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="pending">Pending</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
      </select>
      <button onClick={handleSubmit}>{editingId ? 'Update' : 'Add'}</button>

      <ul>
        {orders.map(order => (
          <li key={order._id}>
            #{order.orderNumber} - {order.customerName} ordered {order.product} ({order.status})
            <button onClick={() => handleEdit(order)}>✏️</button>
            <button onClick={() => handleDelete(order._id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
