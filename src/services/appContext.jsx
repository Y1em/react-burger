import React from 'react';
const dataContext = React.createContext([]);
const orderContext = React.createContext({});
const totalPriceContext = React.createContext(0);

export { dataContext, orderContext, totalPriceContext };
