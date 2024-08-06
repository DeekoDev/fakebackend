import { HackatonCTA } from "@/components/home/hackaton-cta";
import { HomeExploreProjects } from "@/components/home/home-explore-projects";
import { HomeHeroImage } from "@/components/home/home-hero-image";
import { HomeStartProject } from "@/components/home/home-start-project";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Bug,
  ChevronRight,
  Database,
  GitBranchPlus,
  MoveRight,
  Play,
  Users2,
} from "lucide-react";
import Link from "next/link";

interface Props {}

const HomePage = ({}: Props) => {
  return (
    <div className="fluid-container mx-auto pb-24 pt-6">
      <div className="flex w-full rounded-2xl border bg-dark-700 shadow-lg group">
        <div className="flex-1 p-14">
          {/* <div className="flex w-fit items-center gap-1 rounded-full bg-green-900/30 px-4 py-1.5 text-sm font-medium text-green-400">
          Midudev/Vercel Hackathon 2024
          <MoveRight className="h-4 w-4" />
          </div> */}
          <HackatonCTA />

          <h2 className="mt-6 text-4xl font-medium leading-tight [&>span]:text-green-400">
            Focus on your app
            <br /> <span>not the backend</span>
          </h2>

          <p className="mt-4 max-w-[350px] text-light-600">
            Create a project, define the endpoints and start building your app.
            The AI will generate the development backend for you.
          </p>

          <div className="mt-12 flex items-center gap-3">
            <HomeStartProject />
            <Button variant="ghost">How it works</Button>
          </div>
        </div>
        <HomeHeroImage />
      </div>

      <h2 className="mt-20 font-medium text-green-400">Features</h2>
      <h3 className="mt-3 text-xl font-medium">Why you use on your Project?</h3>
      <p className="mt-3 max-w-[350px] text-light-600">
        Discover why you should use it in your next project
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="h-[300px] rounded-2xl border bg-dark-700 p-8 shadow-lg">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-dark-400 text-light-700">
            <GitBranchPlus className="h-6 w-6" />
          </div>

          <h4 className="mt-4 text-xl font-medium">
            Endpoints on <span>Seconds</span>.
          </h4>
          <p className="mt-2 max-w-sm text-light-600">
            Define the URI, description and start use your endpoint.
          </p>
        </div>

        <div className="h-[300px] rounded-2xl border bg-dark-700 p-8 shadow-lg">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-dark-400 text-light-700">
            <Bug className="h-6 w-6" />
          </div>

          <h4 className="mt-4 text-xl font-medium">Playground</h4>
          <p className="mt-2 max-w-sm text-light-600">
            Test your endpoints, see the response and the request.
          </p>
        </div>

        <div className="col-span-2 h-[350px] rounded-2xl border bg-dark-700 p-8 shadow-lg">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-dark-400 text-light-700">
            <Users2 className="h-6 w-6" />
          </div>

          <h4 className="mt-4 text-xl font-medium">Community</h4>
          <p className="mt-2 max-w-[350px] text-light-600">
            Explore the projects created by the community and share your own.
          </p>

          <HomeExploreProjects />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
