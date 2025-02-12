import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#fbfbfd] py-24">
      <div className="container mx-auto px-4">
          <div className="max-w-[800px] mx-auto py-12">
            <div className="mb-8">
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-6 w-72 mt-2" />
            </div>
  
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Skeleton className="h-12 w-full rounded-xl" />
                </div>
  
                <div className="space-y-2">
                  <Skeleton className="h-14 w-full rounded-xl" />
                </div>
  
                <div className="space-y-2">
                  <Skeleton className="h-[400px] w-full rounded-xl" />
                </div>
  
                <div className="space-y-2">
                  <Skeleton className="h-14 w-full rounded-xl" />
                </div>
              </div>
  
              <div className="flex justify-end space-x-4">
                <Skeleton className="h-11 w-24 rounded-xl" />
                <Skeleton className="h-11 w-24 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
