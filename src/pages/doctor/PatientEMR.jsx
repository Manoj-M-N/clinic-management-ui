import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import doctorApi from "../../doctorApi";

export default function PatientEMR() {

  const location = useLocation();

  const patientId = location.state?.patientId;

  const [emr, setEmr] = useState(null);

  const [loading, setLoading] = useState(true);

  const [expanded, setExpanded] = useState(null);

  useEffect(() => {

    loadEMR();

  }, []);

  const loadEMR = async () => {

    try {

      const res = await doctorApi.get(
        `/emr/${patientId}`
      );

      console.log("EMR:", res.data);

      setEmr(res.data);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }
  };

  if (loading) {

    return (
      <div className="p-10 text-xl">
        Loading EMR...
      </div>
    );
  }

  if (!emr) {

    return (
      <div className="p-10 text-red-500">
        EMR not found
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">

        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          Patient EMR Timeline
        </h1>

        <div className="grid grid-cols-4 gap-4">

          <div>
            <p className="text-sm text-gray-500">
              Patient Name
            </p>

            <p className="font-semibold">
              {emr.fullName}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Gender
            </p>

            <p className="font-semibold">
              {emr.gender}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Age
            </p>

            <p className="font-semibold">
              {emr.age}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Phone
            </p>

            <p className="font-semibold">
              {emr.phone}
            </p>
          </div>

        </div>

      </div>

      {/* MEDICAL HISTORY */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">

        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Medical History
        </h2>

        {emr.medicalHistory ? (

          <div className="grid grid-cols-2 gap-4">

            <div>
              <p className="text-sm text-gray-500">
                Allergies
              </p>

              <p className="font-semibold">
                {emr.medicalHistory.allergies || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Chronic Diseases
              </p>

              <p className="font-semibold">
                {emr.medicalHistory.chronicDiseases || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Blood Group
              </p>

              <p className="font-semibold">
                {emr.medicalHistory.bloodGroup || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Smoking Status
              </p>

              <p className="font-semibold">
                {emr.medicalHistory.smokingStatus || "-"}
              </p>
            </div>

          </div>

        ) : (

          <p className="text-gray-500">
            No medical history available
          </p>

        )}

      </div>

      {/* CONSULTATION TIMELINE */}
      <div>

        <h2 className="text-2xl font-bold mb-6 text-blue-700">
          Consultation Timeline
        </h2>

        {emr.consultations?.length === 0 && (

          <div className="bg-white p-6 rounded-xl shadow">
            No consultations found
          </div>

        )}

        <div className="space-y-6">

          {emr.consultations?.map((c, index) => (

            <div
              key={index}
              className="bg-white rounded-xl shadow p-6"
            >

              {/* TOP */}
              <div className="flex justify-between items-center">

                <div>

                  <h3 className="text-xl font-bold text-purple-700">
                    {c.diagnosis || "No Diagnosis"}
                  </h3>

                  <p className="text-gray-500 mt-1">
                    Doctor: {c.doctorName}
                  </p>

                  <p className="text-gray-500">
                    {new Date(c.createdAt)
                      .toLocaleString()}
                  </p>

                </div>

                <button
                  onClick={() =>
                    setExpanded(
                      expanded === index
                        ? null
                        : index
                    )
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  {expanded === index
                    ? "Hide"
                    : "View Details"}
                </button>

              </div>

              {/* EXPANDED */}
              {expanded === index && (

                <div className="mt-6 border-t pt-6">

                  {/* SYMPTOMS */}
                  <div className="mb-4">

                    <h4 className="font-bold text-lg mb-2">
                      Symptoms
                    </h4>

                    <p className="text-gray-700">
                      {c.symptoms || "-"}
                    </p>

                  </div>

                  {/* NOTES */}
                  <div className="mb-4">

                    <h4 className="font-bold text-lg mb-2">
                      Doctor Notes
                    </h4>

                    <p className="text-gray-700">
                      {c.notes || "-"}
                    </p>

                  </div>

                  {/* PRESCRIPTIONS */}
                  <div>

                    <h4 className="font-bold text-lg mb-4">
                      Prescriptions
                    </h4>

                    <div className="space-y-4">

                      {c.prescriptions?.map((p, i) => (

                        <div
                          key={i}
                          className="border rounded-lg p-4 bg-gray-50"
                        >

                          <div className="grid grid-cols-5 gap-4">

                            <div>
                              <p className="text-sm text-gray-500">
                                Medicine
                              </p>

                              <p className="font-semibold">
                                {p.medicineName}
                              </p>
                            </div>

                            <div>
                              <p className="text-sm text-gray-500">
                                Dosage
                              </p>

                              <p className="font-semibold">
                                {p.dosage}
                              </p>
                            </div>

                            <div>
                              <p className="text-sm text-gray-500">
                                Timing
                              </p>

                              <p className="font-semibold">
                                {p.timing}
                              </p>
                            </div>

                            <div>
                              <p className="text-sm text-gray-500">
                                Days
                              </p>

                              <p className="font-semibold">
                                {p.days}
                              </p>
                            </div>

                            <div>
                              <p className="text-sm text-gray-500">
                                Notes
                              </p>

                              <p className="font-semibold">
                                {p.notes || "-"}
                              </p>
                            </div>

                          </div>

                        </div>

                      ))}

                    </div>

                  </div>

                </div>

              )}

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}