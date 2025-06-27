import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

function FacultyLogin({ setIsLoggedIn }) {
  const navigate = useNavigate();

  function LoginClick() {
    setIsLoggedIn(true);
    navigate("/FacultyHomepage");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <Card className="w-full max-w-md p-6 rounded-2xl shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Log in</CardTitle>
          <CardDescription className="text-base mt-1">
            as Faculty
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input type="email" placeholder="Enter your Email" />
          <Input type="password" placeholder="Enter your password" />
          <div className="text-right">
            <span className="text-sm text-blue-600 cursor-pointer hover:underline">
              Forgot Password ?
            </span>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button
            onClick={LoginClick()}
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            Log in
          </Button>

          <div className="text-center text-sm">
            <p>
              Not a Faculty?{" "}
              <span className="text-blue-600 cursor-pointer hover:underline">
                Login as Student
              </span>
            </p>
            <p className="text-muted-foreground mt-1">
              Please click on forget password if you do not have an account
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default FacultyLogin;
