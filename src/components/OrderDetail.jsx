import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // caricamento dei dati fittizzi
    setTimeout(() => {
      // mock data
      const mockOrders = [
        { 
          id: '1001', 
          product: 'Smartphone Galaxy S23', 
          date: '2025-06-10', 
          status: 'Consegnato', 
          total: '€120.00',
          customer: 'Mario Rossi',
          address: 'Via Roma 123, 00100 Roma',
          tracking: 'ABC123456789',
          paymentMethod: 'Carta di credito',
          items: [
            { name: 'Smartphone Galaxy S23', price: '€120.00', qty: 1 }
          ]
        },
        { 
          id: '1002', 
          product: 'MacBook Air M3', 
          date: '2025-06-05', 
          status: 'In lavorazione', 
          total: '€1385.50',
          customer: 'Mario Rossi',
          address: 'Via Roma 123, 00100 Roma',
          tracking: 'In attesa di spedizione',
          paymentMethod: 'PayPal',
          items: [
            { name: 'MacBook Air M3', price: '€1385.50', qty: 1 }
          ]
        },
        { 
          id: '1003', 
          product: 'Airpods Pro', 
          date: '2025-06-01', 
          status: 'Consegnato', 
          total: '€220.00',
          customer: 'Mario Rossi',
          address: 'Via Roma 123, 00100 Roma',
          tracking: 'XYZ987654321',
          paymentMethod: 'Bonifico bancario',
          items: [
            { name: 'Airpods Pro', price: '€220.00', qty: 1 }
          ]
        },
        { 
          id: '1004', 
          product: 'Monitor 27" 4K', 
          date: '2025-05-25', 
          status: 'Annullato', 
          total: '€445.00',
          customer: 'Mario Rossi',
          address: 'Via Roma 123, 00100 Roma',
          tracking: 'Ordine annullato',
          paymentMethod: 'Carta di credito',
          items: [
            { name: 'Monitor 27" 4K', price: '€445.00', qty: 1 }
          ],
          cancellationReason: 'Articolo non più disponibile'
        },
        { 
          id: '1005', 
          product: 'Tastiera Meccanica RGB', 
          date: '2025-05-20', 
          status: 'Consegnato', 
          total: '€175.30',
          customer: 'Mario Rossi',
          address: 'Via Roma 123, 00100 Roma',
          tracking: 'DEF456789012',
          paymentMethod: 'Contrassegno',
          items: [
            { name: 'Tastiera Meccanica RGB', price: '€175.30', qty: 1 }
          ]
        }
      ];
      
      const foundOrder = mockOrders.find(o => o.id === orderId);
      setOrder(foundOrder);
      setLoading(false);
    }, 500);
  }, [orderId]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('it-IT', options);
  };
  
  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium mb-4">Ordine non trovato</h2>
        <button 
          onClick={handleBack}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Torna indietro
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Dettagli Ordine #{order.id}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {formatDate(order.date)}
            </p>
          </div>
          <button 
            onClick={handleBack}
            className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Torna agli ordini
          </button>
        </div>
      </div>
      
      <div className="px-4 py-5 sm:px-6">
        <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Stato</dt>
            <dd className="mt-1">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                order.status === 'Consegnato' ? 'bg-green-100 text-green-800' : 
                order.status === 'Annullato' ? 'bg-red-100 text-red-800' : 
                'bg-yellow-100 text-yellow-800'
              }`}>
                {order.status}
              </span>
            </dd>
          </div>
          
          <div>
            <dt className="text-sm font-medium text-gray-500">Totale</dt>
            <dd className="mt-1 text-sm text-gray-900">{order.total}</dd>
          </div>
          
          <div>
            <dt className="text-sm font-medium text-gray-500">Cliente</dt>
            <dd className="mt-1 text-sm text-gray-900">{order.customer}</dd>
          </div>
          
          <div>
            <dt className="text-sm font-medium text-gray-500">Indirizzo di spedizione</dt>
            <dd className="mt-1 text-sm text-gray-900">{order.address}</dd>
          </div>
          
          <div>
            <dt className="text-sm font-medium text-gray-500">Tracking</dt>
            <dd className="mt-1 text-sm text-gray-900">{order.tracking}</dd>
          </div>
          
          <div>
            <dt className="text-sm font-medium text-gray-500">Metodo di pagamento</dt>
            <dd className="mt-1 text-sm text-gray-900">{order.paymentMethod}</dd>
          </div>
          
          {order.status === 'Annullato' && (
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Motivo annullamento</dt>
              <dd className="mt-1 text-sm text-gray-900">{order.cancellationReason}</dd>
            </div>
          )}
        </div>
      </div>
      
      <div className="px-4 py-5 sm:px-6 border-t border-gray-200">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Prodotti</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prodotto
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantità
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prezzo
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {order.items.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.qty}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;