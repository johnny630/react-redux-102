import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNitification({
          status: 'pending',
          title: 'Sending...',
          message: 'Sending cart data',
        })
      );
      const response = await fetch('URL', {
        method:
          'https://react-db-fcd86-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        throw new Error('Sending data failed');
      }

      dispatch(
        uiActions.showNitification({
          status: 'success',
          title: 'Success!',
          message: 'Send cart data successfully',
        })
      );
    };

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNitification({
          statue: 'error',
          title: 'Error!',
          message: 'Send cart data failed',
        })
      );
    });
  }, [cart]);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
