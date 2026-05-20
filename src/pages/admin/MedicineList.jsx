import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Services } from "../../service/service";

export default function MedicineList() {

  const [medicines, setMedicines] =
    useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    loadMedicines();

  }, []);

  const loadMedicines = async () => {

    try {

      const data =
        await Services.getMedicines();

      setMedicines(data);

    } catch (err) {

      console.error(err);

    }
  };

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Deactivate this medicine?"
      );

    if (!confirmDelete) return;

    try {

      await Services.deleteMedicine(id);

      alert("Medicine deactivated");

      loadMedicines();

    } catch (err) {

      console.error(err);

      alert("Failed");
    }
  };

  return (

    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold text-gray-800">
            Medicine Inventory
          </h1>

          <p className="text-gray-500 mt-2">
            Manage pharmacy inventory and stock
          </p>

        </div>

        <button
          onClick={() =>
            navigate("/admin/add-medicine")
          }
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-xl font-semibold"
        >
          + Add Medicine
        </button>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr className="text-left text-gray-600 uppercase text-sm">

                <th className="px-6 py-4">
                  Medicine
                </th>

                <th className="px-6 py-4">
                  Category
                </th>

                <th className="px-6 py-4">
                  Manufacturer
                </th>

                <th className="px-6 py-4">
                  Stock
                </th>

                <th className="px-6 py-4">
                  Price
                </th>

                <th className="px-6 py-4">
                  Expiry
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {medicines.map((m) => (

                <tr
                  key={m.medicineId}
                  className="border-t hover:bg-gray-50 transition"
                >

                  <td className="px-6 py-5 font-semibold text-gray-800">
                    {m.medicineName}
                  </td>

                  <td className="px-6 py-5">
                    {m.category}
                  </td>

                  <td className="px-6 py-5">
                    {m.manufacturer}
                  </td>

                  <td className="px-6 py-5">

                    <span
                      className={`px-3 py-1 rounded-xl text-sm font-semibold ${
                        m.stockQuantity < 20
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {m.stockQuantity}
                    </span>

                  </td>

                  <td className="px-6 py-5">
                    ₹{m.unitPrice}
                  </td>

                  <td className="px-6 py-5">
                    {m.expiryDate}
                  </td>

                  <td className="px-6 py-5">

                    <span
                      className={`px-3 py-1 rounded-xl text-sm font-semibold ${
                        m.status === "ACTIVE"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {m.status}
                    </span>

                  </td>

                  <td className="px-6 py-5 text-center space-x-2">

                    <button
                      onClick={() =>
                        navigate(
                          `/admin/edit-medicine/${m.medicineId}`
                        )
                      }
                      className="bg-yellow-500 hover:bg-yellow-600 transition text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(m.medicineId)
                      }
                      className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg"
                    >
                      Deactivate
                    </button>

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