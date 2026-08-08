import { useForm } from "react-hook-form";
import { Save } from "lucide-react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { useToast } from "../../../components/feedback/Toast";

export default function CompanyProfileForm({ initialData, onSubmit }) {
  const { addToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      companyName: "",
      website: "",
      industry: "",
      companySize: "",
      location: "",
      description: "",
      ...initialData,
    },
  });

  const handleFormSubmit = async (data) => {
    try {
      await onSubmit(data);
      addToast({
        variant: "success",
        title: "Company Profile Updated",
        description: "Your changes have been saved.",
      });
    } catch (error) {
      addToast({
        variant: "error",
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Input
          label="Company Name"
          error={errors.companyName?.message}
          {...register("companyName", { required: "Company name is required" })}
        />
        <Input
          label="Website"
          placeholder="https://yourcompany.com"
          error={errors.website?.message}
          {...register("website")}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Input
          label="Industry"
          placeholder="e.g. Technology"
          error={errors.industry?.message}
          {...register("industry")}
        />
        <Input
          label="Company Size"
          placeholder="e.g. 10-50"
          error={errors.companySize?.message}
          {...register("companySize")}
        />
      </div>

      <Input
        label="Location"
        placeholder="City, Country"
        error={errors.location?.message}
        {...register("location")}
      />

      <div>
        <label className="block text-sm font-medium mb-1">
          Company Description
        </label>
        <textarea
          rows={5}
          placeholder="Tell us about your company..."
          className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none
            focus:ring-2 focus:ring-primary-500 ${
            errors.description ? "border-red-500" : "border-input"
          }`}
          {...register("description")}
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="flex justify-end border-t pt-6">
        <Button type="submit" variant="primary" loading={isSubmitting}>
          <Save className="mr-2 h-4 w-4" />
          Save Company Profile
        </Button>
      </div>
    </form>
  );
}

