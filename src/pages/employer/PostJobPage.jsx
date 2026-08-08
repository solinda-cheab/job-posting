import { useNavigate } from "react-router-dom";
import { useCreateJob } from "../../features/employer/hooks/useEmployerJobs";
import JobPostForm from "../../features/employer/components/JobPostForm";
import { useToast } from "../../components/feedback/Toast";

export default function PostJobPage() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const createJobMutation = useCreateJob();

  const handleSubmit = async (data) => {
    try {
      await createJobMutation.mutateAsync(data);
      addToast({
        variant: "success",
        title: "Job Posted",
        description: "Your job listing has been published successfully.",
      });
      navigate("/employer/jobs");
    } catch (error) {
      addToast({
        variant: "error",
        title: "Failed to Post Job",
        description: "There was an error publishing your job. Please try again.",
      });
    }
  };

  return (
    <div className="py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="text-3xl font-bold mb-6">Post a New Job</h1>
        <JobPostForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}


