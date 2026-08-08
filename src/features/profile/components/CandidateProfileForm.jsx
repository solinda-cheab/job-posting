import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { profileSchema } from "../../../utils/validators";
import { useToast } from "../../../components/feedback/Toast";

const experienceLevels = [
  "ENTRY",
  "MID",
  "SENIOR",
  "LEAD",
  "EXECUTIVE",
];

const skillsOptions = [
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "TypeScript",
  "AWS",
  "Docker",
  "GraphQL",
  "MongoDB",
  "PostgreSQL",
  "Java",
  "Go",
];

export default function CandidateProfileForm({ initialData, onSubmit }) {
  const { addToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      bio: "",
      location: "",
      linkedin: "",
      github: "",
      portfolio: "",
      ...initialData,
    },
  });

  const handleFormSubmit = async (data) => {
    try {
      await onSubmit(data);
      addToast({
        variant: "success",
        title: "Profile Updated",
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
          label="First Name"
          error={errors.firstName?.message}
          {...register("firstName")}
        />
        <Input
          label="Last Name"
          error={errors.lastName?.message}
          {...register("lastName")}
        />
      </div>

      <Input
        label="Email Address"
        type="email"
        error={errors.email?.message}
        {...register("email")}
        disabled
      />

      <Input
        label="Phone Number"
        type="tel"
        placeholder="+1 (555) 123-4567"
        error={errors.phone?.message}
        {...register("phone")}
      />

      <Input
        label="Location"
        placeholder="City, Country"
        error={errors.location?.message}
        {...register("location")}
      />

      <div>
        <label className="block text-sm font-medium mb-1">Bio</label>
        <textarea
          rows={4}
          placeholder="Tell us about yourself..."
          className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none
            focus:ring-2 focus:ring-primary-500 ${
            errors.bio ? "border-red-500" : "border-input"
          }`}
          {...register("bio")}
        />
        {errors.bio && (
          <p className="mt-1 text-xs text-red-500">{errors.bio.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Skills
        </label>
        <div className="flex flex-wrap gap-2">
          {skillsOptions.map((skill) => (
            <label
              key={skill}
              className="flex items-center gap-1 text-sm"
            >
              <input
                type="checkbox"
                value={skill}
                className="h-4 w-4 rounded border-gray-300 text-primary-600"
              />
              {skill}
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Input
          label="LinkedIn Profile"
          placeholder="https://linkedin.com/in/your-profile"
          error={errors.linkedin?.message}
          {...register("linkedin")}
        />
        <Input
          label="GitHub Profile"
          placeholder="https://github.com/yourusername"
          error={errors.github?.message}
          {...register("github")}
        />
      </div>

      <Input
        label="Portfolio Website"
        placeholder="https://yourportfolio.com"
        error={errors.portfolio?.message}
        {...register("portfolio")}
      />

      <div className="flex justify-end border-t pt-6">
        <Button type="submit" variant="primary" loading={isSubmitting}>
          <Save className="mr-2 h-4 w-4" />
          Save Profile
        </Button>
      </div>
    </form>
  );
}

