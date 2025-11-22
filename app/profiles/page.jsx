import ProfileCard from "@/components/ProfileCard";
import connectDB from "@/libs/database";
import User from "@/models/User";
import { LoadingProvider } from "../Providers";
export default async function Profiles() {
  async function getProfiles() {
    try {
      await connectDB();
      const profiles = await User.find().select("username image");
      return JSON.parse(JSON.stringify(profiles));
    } catch (error) {
      console.log(error);
    }
  }
  const profiles = await getProfiles();
  return (
    <div className="grow">
      <LoadingProvider>
        <div className="container mx-auto p-4">
          <div className="pt-0 md:pt-8">
            <h1 className="text-4xl dark:text-white font-bold mb-2">
              Profiles
            </h1>
            <p className="text-gray-700">
              Discover profiles of users who have shared their movie ratings
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 sm:gap-6 md:mt-8">
            {profiles.map((profile) => (
              <ProfileCard key={profile._id} profile={profile} />
            ))}
          </div>
        </div>
      </LoadingProvider>
    </div>
  );
}
