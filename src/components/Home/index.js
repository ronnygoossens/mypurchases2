import Firebase from 'firebase';
import StoreFirstData from '../StoreFirebase';

import ListFirebase from '../ListFirebase';

import React from 'react';

const Home = () => (
  <div>
    <h1>Home</h1>
    <StoreFirstData db={Firebase} />
    <hr />
    <ListFirebase db={Firebase} />

  </div>
);

export default Home;

