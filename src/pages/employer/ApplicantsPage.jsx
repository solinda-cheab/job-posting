import { useParams } from "react-router-dom";
import ApplicantList from "../../features/employer/components/ApplicantList";
import Spinner from "../../components/feedback/Spinner";

export default function ApplicantsPage() {
  const { jobId } = useParams();

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Applicants</h1>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Review candidates who applied for this position.
        </p>

        <ApplicantList jobId={jobId} />
      </div>
    </div>
  );
}


