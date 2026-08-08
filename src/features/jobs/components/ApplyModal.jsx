import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Modal from "../../../components/ui/Modal";

const jobTypes = ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "REMOTE"];

export default function ApplyModal({ isOpen, onClose, job }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      coverLetter: "",
      resume: null,
    },
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("jobId", job.id);
      formData.append("coverLetter", data.coverLetter);
      if (data.resume && data.resume.length > 0) {
        formData.append("resume", data.resume[0]);
      }

      await import("../../applications/api/applicationsApi").then((mod) =>
        mod.submitApplication(formData)
      );

      reset();
      onClose();
    } catch (error) {
      console.error("Application error:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Apply for ${job?.title}`}
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Resume / CV
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            {...register("resume")}
            className="w-full text-sm text-gray-500 file:mr-4 file:cursor-pointer
              file:rounded-md file:border-0 file:bg-primary-50 file:px-4
              file:py-2 file:text-sm file:font-medium file:text-primary-600
              hover:file:bg-primary-100"
          />
          <p className="mt-1 text-xs text-gray-500">
            Accepted formats: PDF, DOC, DOCX (max 5MB)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Cover Letter
          </label>
          <textarea
            rows={6}
            placeholder="Tell the employer why you're a good fit..."
            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none
              focus:ring-2 focus:ring-primary-500"
            {...register("coverLetter", {
              required: "Cover letter is required",
              minLength: {
                value: 50,
                message: "Cover letter must be at least 50 characters",
              },
            })}
          />
          {errors.coverLetter && (
            <p className="mt-1 text-xs text-red-500">
              {errors.coverLetter.message}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3 border-t pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
          >
            Submit Application
          </Button>
        </div>
      </form>
    </Modal>
  );
}

