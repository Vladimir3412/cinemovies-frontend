import {
  Card,
  // CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { AuthTabs } from "@/shared/UI/auth-tabs";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
interface AuthWrapperProps {
  heading: string;
  description: string;
  backButtonLabel: string;
  backButtonLink: string;
  children: React.ReactNode;
}

export function AuthWrapper({
  heading,
  description,
  backButtonLabel,
  backButtonLink,
  children,
}: AuthWrapperProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen dot-bg">
      {" "}
      <Card className=" bg-[#121215] border-2 border-[#26262b] w-lg rounded-xl p-4">
        <AuthTabs />
        <CardHeader className="flex flex-col text-center  justify-center items-left ">
          {/* <Image src="images/logo.svg" alt="logo" width={50} height={50} /> */}
          <CardTitle className="text-2xl text-white font-bold">
            {heading}
          </CardTitle>
          <CardDescription className="text-gray-400 text-sm">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent>{children}</CardContent>
        {/* <CardFooter>
          {backButtonLabel && backButtonLink && (
            <Button variant="link" className="w-full text-white ">
              <Link href={backButtonLink}>{backButtonLabel} </Link>
            </Button>
          )}
        </CardFooter> */}
      </Card>
    </div>
  );
}
