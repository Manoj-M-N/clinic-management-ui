import { useEffect, useState } from "react";
import adminApi from "../../adminApi";

export default function PharmacyDashboard() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    loadOrders();

  }, []);

  const loadOrders = async () => {

    try {

      const res = await adminApi.get(
        "/pharmacy"
      );

      setOrders(res.data);

    } catch (err) {

      console.error(err);

    }
  };

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Pharmacy Orders
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                Order ID
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Appointment
              </th>

              <th className="p-4 text-left">
                Consultation
              </th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr
                key={order.orderId}
                className="border-t"
              >

                <td className="p-4">
                  #{order.orderId}
                </td>

                <td className="p-4">
                  {order.status}
                </td>

                <td className="p-4">
                  {order.appointment?.appointmentId}
                </td>

                <td className="p-4">
                  {order.consultation?.consultationId}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}