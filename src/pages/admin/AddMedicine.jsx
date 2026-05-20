import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Services } from "../../service/service";

export default function AddMedicine() {

  const navigate = useNavigate();

  const [form, setForm] = useState({

    medicineName: "",
    category: "",
    manufacturer: "",
    stockQuantity: "",
    unitPrice: "",
    expiryDate: "",

  });

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await Services.createMedicine(form);

      alert("Medicine added");

      navigate("/admin/medicines");

    } catch (err) {

      console.error(err);

      alert("Failed");
    }
  };

  return (

    <div>

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Add Medicine
        </h1>

        <p className="text-gray-500 mt-2">
          Create pharmacy inventory item
        </p>

      </div>

      <div className="bg-white rounded-2xl shadow p-8 max-w-4xl">

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-6"
        >

          <input
            type="text"
            placeholder="Medicine Name"
            className="border rounded-xl px-4 py-3"
            onChange={(e) =>
              setForm({
                ...form,
                medicineName: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Category"
            className="border rounded-xl px-4 py-3"
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Manufacturer"
            className="border rounded-xl px-4 py-3"
            onChange={(e) =>
              setForm({
                ...form,
                manufacturer: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Stock Quantity"
            className="border rounded-xl px-4 py-3"
            onChange={(e) =>
              setForm({
                ...form,
                stockQuantity: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Unit Price"
            className="border rounded-xl px-4 py-3"
            onChange={(e) =>
              setForm({
                ...form,
                unitPrice: e.target.value,
              })
            }
          />

          <input
            type="date"
            className="border rounded-xl px-4 py-3"
            onChange={(e) =>
              setForm({
                ...form,
                expiryDate: e.target.value,
              })
            }
          />

          <div className="col-span-2 flex justify-end">

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-3 rounded-xl font-semibold"
            >
              Save Medicine
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}