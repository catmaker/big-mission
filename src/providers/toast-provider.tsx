import { Toaster } from "react-hot-toast";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 2000,
            style: {
              background: "#4ade80",
              color: "#fff",
            },
          },
          error: {
            duration: 3000,
            style: {
              background: "#ef4444",
              color: "#fff",
            },
          },
        }}
      />
    </>
  );
}
