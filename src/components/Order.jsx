import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OrdersContent() {
  const navigate = useNavigate();
  const initialOrders = [
    { id: '1001', product: 'Smartphone Galaxy S23', date: '2025-06-10', status: 'Consegnato', total: '€120.00', items: 1 },
    { id: '1002', product: 'MacBook Air M3', date: '2025-06-05', status: 'In lavorazione', total: '€1385.50', items: 1 },
    { id: '1003', product: 'Airpods Pro', date: '2025-06-01', status: 'Consegnato', total: '€220.00', items: 1 },
    { id: '1004', product: 'Monitor 27" 4K', date: '2025-05-25', status: 'Annullato', total: '€445.00', items: 1 },
    { id: '1005', product: 'Tastiera Meccanica RGB', date: '2025-05-20', status: 'Consegnato', total: '€175.30', items: 1 }
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [statusFilter, setStatusFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // gestione filtri
  useEffect(() => {
    let filteredOrders = initialOrders;
    
    if (statusFilter) {
      filteredOrders = filteredOrders.filter(order => order.status === statusFilter);
    }
    
    if (startDate && endDate) {
      filteredOrders = filteredOrders.filter(order => {
        const orderDate = new Date(order.date);
        return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
      });
    }
    
    setOrders(filteredOrders);
  }, [statusFilter, startDate, endDate]);
  
  const handleResetFilters = () => {
    setStatusFilter('');
    setStartDate('');
    setEndDate('');
    setOrders(initialOrders);
  };
  
  const handleOrderClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('it-IT', options);
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">I tuoi ordini</h2>
        
        {/* filtri */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700">Filtra per stato</label>
            <select
              id="status-filter"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">Tutti gli stati</option>
              <option value="Consegnato">Consegnato</option>
              <option value="In lavorazione">In lavorazione</option>
              <option value="Annullato">Annullato</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">Data inizio</label>
            <input
              type="date"
              id="start-date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}/>
          </div>
          
          <div>
            <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">Data fine</label>
            <input
              type="date"
              id="end-date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}/>
          </div>

          <div className="col-span-full">
            <button
              onClick={handleResetFilters}
              className="mt-2 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Reimposta filtri
            </button>
          </div>
        </div>
      </div>

      {/* lista ordini */}
      <ul className="divide-y divide-gray-200">
        {orders.length > 0 ? (
          orders.map((order) => (
            <li 
              key={order.id} 
              onClick={() => handleOrderClick(order.id)}
              className="hover:bg-gray-50 cursor-pointer">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {order.product}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Ordine #{order.id}
                    </p>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'Consegnato' ? 'bg-green-100 text-green-800' : 
                      order.status === 'Annullato' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'}`}>
                      {order.status}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {order.total}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>{formatDate(order.date)}</p>
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="px-4 py-6 text-center text-sm text-gray-500">
            Nessun ordine trovato con i filtri selezionati.
          </li>
        )}
      </ul>
    </div>
  );
}

export default OrdersContent;