import { useAuth } from "../../context/AuthContext";
import { CandidateProfileForm } from "../../features/profile";
import PortfolioSection from "../../features/profile/components/PortfolioSection";
import ResumeUploader from "../../features/applications/components/ResumeUploader";

export default function ProfilePage() {
  const { user } = useAuth();

  const handleProfileSubmit = async (data) => {
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.data;
  };

  return (
    <div className="py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <CandidateProfileForm onSubmit={handleProfileSubmit} />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Portfolio</h2>
            <PortfolioSection />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Resume</h2>
            <ResumeUploader />
          </section>
        </div>
      </div>
    </div>
  );
}


