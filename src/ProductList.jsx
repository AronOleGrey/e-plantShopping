import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';

const ProductList = ({ onContinueShopping }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Прапорець: які рослини вже додані (для disabled кнопки)
  const [addedToCart, setAddedToCart] = useState({});

  // === ТВІЙ МАСИВ plantsArray — залиш як є, лише переконайся, що:
  // 1) у кожній категорії >= 6 рослин
  // 2) у кожної рослини є name, image, description, cost
  const plantsArray = [
    {
      category: 'Aromatic Plants',
      plants: [
        {
          name: 'Lavender',
          image: 'https://images.unsplash.com/photo-1589296986498-28cd9406425d',
          description: 'Calming fragrance, perfect for relaxation.',
          cost: '$12.00',
        },
        {
          name: 'Jasmine',
          image: 'https://images.unsplash.com/photo-1592729645009-b96d1e63d14b',
          description: 'Sweet scent, blooms at night.',
          cost: '$14.00',
        },
        {
          name: 'Rosemary',
          image: 'https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg',
          description: 'Aromatic herb with pine-like fragrance.',
          cost: '$10.00',
        },
        {
          name: 'Mint',
          image: 'https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg',
          description: 'Fresh scent, easy to grow.',
          cost: '$8.00',
        },
        {
          name: 'Lemon Balm',
          image: 'https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg',
          description: 'Citrus aroma, soothing leaves.',
          cost: '$9.00',
        },
        {
          name: 'Basil',
          image: 'https://cdn.pixabay.com/photo/2015/09/09/17/38/basil-932079_1280.jpg',
          description: 'Classic kitchen herb, sweet aroma.',
          cost: '$7.00',
        },
      ],
    },
    {
      category: 'Medicinal Plants',
      plants: [
        {
          name: 'Aloe Vera',
          image: 'https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg',
          description: 'Soothing gel for skin care.',
          cost: '$15.00',
        },
        {
          name: 'Echinacea',
          image: 'https://cdn.pixabay.com/photo/2014/12/05/03/53/echinacea-557477_1280.jpg',
          description: 'Supports immune system.',
          cost: '$13.00',
        },
        {
          name: 'Peppermint',
          image: 'https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496773_1280.jpg',
          description: 'Cooling leaves, aids digestion.',
          cost: '$9.00',
        },
        {
          name: 'Chamomile',
          image: 'https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg',
          description: 'Calming tea flower.',
          cost: '$11.00',
        },
        {
          name: 'Calendula',
          image: 'https://cdn.pixabay.com/photo/2019/07/15/18/28/flowers-4340127_1280.jpg',
          description: 'Skin-healing petals.',
          cost: '$10.00',
        },
        {
          name: 'Catnip',
          image: 'https://cdn.pixabay.com/photo/2015/07/02/21/55/cat-829681_1280.jpg',
          description: 'Mild sedative herb.',
          cost: '$8.00',
        },
      ],
    },
    {
      category: 'Air Purifying Plants',
      plants: [
        {
          name: 'Snake Plant',
          image: 'https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg',
          description: 'Filters toxins from the air.',
          cost: '$18.00',
        },
        {
          name: 'Spider Plant',
          image: 'https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg',
          description: 'Removes formaldehyde.',
          cost: '$12.00',
        },
        {
          name: 'Peace Lily',
          image: 'https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg',
          description: 'Elegant white blooms, air purifier.',
          cost: '$16.00',
        },
        {
          name: 'Boston Fern',
          image: 'https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg',
          description: 'Lush fronds, adds humidity.',
          cost: '$14.00',
        },
        {
          name: 'Rubber Plant',
          image: 'https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg',
          description: 'Glossy leaves, easy care.',
          cost: '$17.00',
        },
        {
          name: 'ZZ Plant',
          image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361',
          description: 'Tolerates low light.',
          cost: '$19.00',
        },
      ],
    },
  ];

  // Додавання рослини в Redux + позначення, що вона вже в кошику
  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({ ...prev, [plant.name]: true }));
  };

  // Загальна кількість товарів у кошику (з Redux)
  const calculateTotalQuantity = () =>
    cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;

  return (
    <div className="product-list-page">
      {/* Navbar видно і на ProductList, і на Cart (якщо рендериш його в App) */}
      <nav className="navbar">
        <div className="navbar-brand">Paradise Nursery</div>
        <div className="navbar-links">
          <a href="/">Home</a>
          <a href="/plants">Plants</a>
          <a href="/cart" className="cart-link">
            🛒 <span className="cart-count">{calculateTotalQuantity()}</span>
          </a>
        </div>
      </nav>

      {/* Рендер категорій і карток */}
      <div className="product-grid">
        {plantsArray.map((category, index) => (
          <div key={index} className="category-block">
            <h1 className="category-title">{category.category}</h1>
            <div className="product-list">
              {category.plants.map((plant, plantIndex) => (
                <div className="product-card" key={plantIndex}>
                  <img
                    className="product-image"
                    src={plant.image}
                    alt={plant.name}
                  />
                  <div className="product-title">{plant.name}</div>
                  <div className="product-description">{plant.description}</div>
                  <div className="product-cost">{plant.cost}</div>
                  <button
                    className="product-button"
                    onClick={() => handleAddToCart(plant)}
                    disabled={!!addedToCart[plant.name]}
                  >
                    {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
