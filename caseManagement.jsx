import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../supabase";
import CaseForm from "../components/CaseForm";
import CaseList from "../components/CaseList";

export default function CaseManagement() {
  const { user, role } = useAuth();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    setLoading(true);
    let { data, error } = await supabase.from("cases").select("*");
    if (error) console.error("Error fetching cases:", error);
    else setCases(data);
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Case Management</h1>
      {role === "admin" || role === "lawyer" ? (
        <CaseForm fetchCases={fetchCases} />
      ) : null}
      {loading ? (
        <p>Loading cases...</p>
      ) : (
        <CaseList cases={cases} userRole={role} />
      )}
    </div>
  );
}
