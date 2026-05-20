import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Services } from "../../service/service";

export default function EditMedicine() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [form, setForm] = useState({

    medicineName: "",
    category: "",
    manufacturer: "",
    stockQuantity: "",
    unitPrice: "",
    expiryDate: "",

  });

  useEffect(() => {

    loadMedicine();

  }, []);

  const loadMedicine = async () => {

    try {

      const data =
        await Services.getMedicineById(id);

      setForm(data);

    } catch (err) {

      console.error(err);

    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await Services.updateMedicine(
        id,
        form
      );

      alert("Medicine updated");

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
          Edit Medicine
        </h1>

      </div>

      <div className="bg-white rounded-2xl shadow p-8 max-w-4xl">

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-6"
        >

          <input
            type="text"
            value={form.medicineName}
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
            value={form.category}
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
            value={form.manufacturer}
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
            value={form.stockQuantity}
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
            value={form.unitPrice}
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
            value={form.expiryDate}
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
              className="bg-green-600 hover:bg-green-700 transition text-white px-8 py-3 rounded-xl font-semibold"
            >
              Update Medicine
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}