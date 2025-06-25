import { Header } from "@/components/header";
import { Outlet } from "react-router";
import { Toaster } from "sonner";

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Outlet />
      <Toaster />
    </div>
  );
}
