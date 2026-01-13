import { useState, useEffect } from "react";
import Sidebar from "../Components/Sidebar.jsx";
import Header from "../Components/Header.jsx";
import Table from "../Components/Table.jsx";
import Modal from "../Components/Modal.jsx";
import EditCartForm from "../Components/Form/EditCartForm.jsx";
import AddCartForm from "../Components/Form/AddCartForm.jsx";
import { useCart } from "../API Contexts Folder/CartContext.jsx";
import "./Pages CSS files/DefaultTheme.css";

const Cart = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const {
    cartList,
    cartWithBookingList,
    fetchCartList,
    fetchCartWithBookingList,
    createCart,
    updateCart,
    deleteCart
  } = useCart();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedCart, setSelectedCart] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    fetchCartList();
    fetchCartWithBookingList();
  }, []);

  const cartColumns = [
    { header: "Cart ID", key: "CART_ID" },
    { header: "Cart Number", key: "CART_NUMBER" },
    { header: "Rental Fee", key: "RENTAL_FEE" },
    { header: "Booking ID", key: "BOOKING_ID" },
    {
      header: "Actions",
      key: "actions",
      render: (row) => (
        <div className="table-actions">
          <button onClick={() => handleEdit(row)}>✏️</button>
          <button className="delete" onClick={() => handleDelete(row.CART_ID)}>🗑</button>
        </div>
      )
    }
  ];

  const cartColumnsWithBooking = [
    { header: "Cart ID", key: "CART_ID" },
    { header: "Cart Number", key: "CART_NUMBER" },
    { header: "Rental Fee", key: "RENTAL_FEE" },
    { header: "Booking ID", key: "BOOKING_ID" },
    { header: "Booking Date", key: "BOOKING_DATE" },
    { header: "Customer ID", key: "CUSTOMER_ID" },
    { header: "Customer Name", key: "CUSTOMER_NAME" },
    {
      header: "Actions",
      key: "actions",
      render: (row) => (
        <div className="table-actions">
          <button onClick={() => handleEdit(row)}>✏️</button>
          <button className="delete" onClick={() => handleDelete(row.CART_ID)}>🗑</button>
        </div>
      )
    }
  ];

  const handleEdit = (cart) => {
    setSelectedCart(cart);
    setIsEditOpen(true);
  };

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this cart?")) return;
    deleteCart(id);
  };

  return (
    <div className="default-page">
      <div className="default">
        <div className={`sidebar-overlay ${isSidebarOpen ? "open" : ""}`} onClick={closeSidebar}></div>
        <div className={`sidebar-wrapper ${isSidebarOpen ? "open" : ""}`}>
          <Sidebar closeSidebar={closeSidebar} />
        </div>

        <div className="default-main">
          <Header toggleSidebar={toggleSidebar} />

          <div className="table-header">
            <button className="add-btn" onClick={() => setIsAddOpen(true)}>+ Add Cart</button>
          </div>

          <div className="default-content">
            <Table title="Simple Cart List" columns={cartColumns} data={cartList} />
            <Table title="Cart List with Booking" columns={cartColumnsWithBooking} data={cartWithBookingList} />
          </div>
        </div>
      </div>

      <Modal isOpen={isEditOpen} title="Edit Cart" onClose={() => setIsEditOpen(false)}>
        <EditCartForm
          cart={selectedCart}
          onCancel={() => setIsEditOpen(false)}
          onSave={(updatedCart) => {
            updateCart(updatedCart);
            setIsEditOpen(false);
          }}
        />
      </Modal>

      <Modal isOpen={isAddOpen} title="Add Cart" onClose={() => setIsAddOpen(false)}>
        <AddCartForm
          onCancel={() => setIsAddOpen(false)}
          onCreate={(newCart) => {
            createCart(newCart);
            setIsAddOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default Cart;
