import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function VerifyOtp() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const validEmails = ["faculty1@example.com", "faculty2@example.com"];
  const correctOtp = "123456";

  const handleCheckEmail = () => {
    setLoading(true);
    setTimeout(() => {
      if (validEmails.includes(email.toLowerCase())) {
        setEmailVerified(true);
      } else {
        console.log("Email not found in faculty database");
      }
      setLoading(false);
    }, 1000);
  };

  const handleVerifyOtp = () => {
    if (otp === correctOtp) {
      setOtpVerified(true);
      toast.success("OTP verified. Set your password.");
    } else {
      console.log("Invalid OTP. Try again.");
    }
  };

  const handleSetPassword = () => {
    if (!newPassword || !confirmPassword) {
      console.log("Please fill in all fields.");
    } else if (newPassword !== confirmPassword) {
      console.log("Passwords do not match.");
    } else {
      toast.success("Password set successfully!");
    }
  };

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
          <Input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={emailVerified}
          />

          {emailVerified && !otpVerified && (
            <Input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          )}

          {otpVerified && (
            <>
              <Input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          {!emailVerified ? (
            <Button
              onClick={handleCheckEmail}
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
              disabled={loading || !email}
            >
              {loading ? "Checking..." : "Check Email"}
            </Button>
          ) : !otpVerified ? (
            <Button
              onClick={handleVerifyOtp}
              className="w-full bg-green-600 text-white hover:bg-green-700"
              disabled={!otp}
            >
              Verify OTP
            </Button>
          ) : (
            <Button
              onClick={handleSetPassword}
              className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
              disabled={!newPassword || !confirmPassword}
            >
              Set Password
            </Button>
          )}

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

export default VerifyOtp;
