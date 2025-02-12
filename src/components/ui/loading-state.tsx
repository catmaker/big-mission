import { Spinner } from "@/components/ui/spinner";

interface LoadingStateProps {
  header?: React.ReactNode;
}

export function LoadingState({ header }: LoadingStateProps) {
  return (
    <div className="w-full mx-auto">
      {header}
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner />
      </div>
    </div>
  );
}
