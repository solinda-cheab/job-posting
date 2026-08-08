import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { jobPostSchema } from "../../../utils/validators";
import { JOB_TYPES, JOB_TYPE_LABELS, EXPERIENCE_LEVELS, EXPERIENCE_LEVEL_LABELS } from "../../../config/constants";

export default function JobPostForm({ initialData, onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(jobPostSchema),
    defaultValues: initialData || {
      title: "",
      company: "",
      description: "",
      requirements: [""],
      location: "",
      salaryMin: "",
      salaryMax: "",
      type: "FULL_TIME",
      experienceLevel: "MID",
      category: "",
      skills: [""],
    },
  });

  const { fields: reqFields, append: appendReq, remove: removeReq } = useFieldArray({
    control,
    name: "requirements",
  });

  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control,
    name: "skills",
  });

  const handleJobTypeChange = (e) => {
    const type = e.target.value;
    const experienceMap = {
      FULL_TIME: "MID",
      PART_TIME: "ENTRY",
      CONTRACT: "MID",
      INTERNSHIP: "ENTRY",
      REMOTE: "SENIOR",
    };
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Input
          label="Job Title"
          placeholder="e.g. Senior React Developer"
          error={errors.title?.message}
          {...register("title")}
        />
        <Input
          label="Company"
          placeholder="Company name"
          error={errors.company?.message}
          {...register("company")}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium mb-1">
            Job Type
          </label>
          <select
            className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none
              focus:ring-2 focus:ring-primary-500 ${
                errors.type ? "border-red-500" : "border-input"
              }`}
            {...register("type")}
          >
            {JOB_TYPES.map((type) => (
              <option key={type} value={type}>
                {JOB_TYPE_LABELS[type]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Experience Level
          </label>
          <select
            className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none
              focus:ring-2 focus:ring-primary-500 ${
                errors.experienceLevel ? "border-red-500" : "border-input"
              }`}
            {...register("experienceLevel")}
          >
            {EXPERIENCE_LEVELS.map((level) => (
              <option key={level} value={level}>
                {EXPERIENCE_LEVEL_LABELS[level]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Input
        label="Location"
        placeholder="e.g. New York, NY / Remote"
        error={errors.location?.message}
        {...register("location")}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Input
          label="Minimum Salary"
          type="number"
          placeholder="0"
          error={errors.salaryMin?.message}
          {...register("salaryMin", { valueAsNumber: true })}
        />
        <Input
          label="Maximum Salary"
          type="number"
          placeholder="200,000"
          error={errors.salaryMax?.message}
          {...register("salaryMax", { valueAsNumber: true })}
        />
      </div>

      <Input
        label="Category"
        placeholder="e.g. Technology, Finance, Design"
        error={errors.category?.message}
        {...register("category")}
      />

      <div>
        <label className="block text-sm font-medium mb-1">
          Job Description
        </label>
        <textarea
          rows={6}
          placeholder="Describe the role and responsibilities..."
          className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none
            focus:ring-2 focus:ring-primary-500 ${
            errors.description ? "border-red-500" : "border-input"
          }`}
          {...register("description")}
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Requirements
        </label>
        <div className="space-y-2">
          {reqFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <Input
                placeholder={`Requirement #${index + 1}`}
                error={errors.requirements?.[index]?.message}
                {...register(`requirements.${index}`)}
              />
              {reqFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeReq(index)}
                  className="rounded-md p-1 text-red-600 hover:bg-red-50"
                  aria-label="Remove requirement"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => appendReq("")}
          className="mt-2 flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"
        >
          <Plus className="h-4 w-4" />
          Add Requirement
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Skills
        </label>
        <div className="space-y-2">
          {skillFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <Input
                placeholder={`Skill #${index + 1}`}
                error={errors.skills?.[index]?.message}
                {...register(`skills.${index}`)}
              />
              {skillFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="rounded-md p-1 text-red-600 hover:bg-red-50"
                  aria-label="Remove skill"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => appendSkill("")}
          className="mt-2 flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"
        >
          <Plus className="h-4 w-4" />
          Add Skill
        </button>
      </div>

      <div className="flex justify-end gap-3 border-t pt-6">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary" loading={isSubmitting}>
          {initialData ? "Update Job" : "Post Job"}
        </Button>
      </div>
    </form>
  );
}

