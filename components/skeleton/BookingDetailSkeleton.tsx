import { Skeleton } from "@/components/ui/skeleton"; // Ensure you have a Skeleton component

function BookingDetailSkeleton() {
  return (
    <section className="flex flex-row gap-5">
      {/* Left Section */}
      <div className="flex-1 max-w-3/5 flex flex-col gap-3">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />

        {/* Room Info Card */}
        <div className="rounded-xl bg-white p-2 flex flex-col shadow-md">
          <Skeleton className="h-5 w-2/4" />
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-4 w-3/4" />

          {/* Facilities Section */}
          <div className="text-sm">
            <div className="flex flex-row gap-3 py-3">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Section (Image & Booking Summary) */}
      <div className="rounded-xl bg-white p-6 flex flex-col shadow-md h-fit">
        <Skeleton className="w-[150px] h-[100px] rounded-md" />
        <Skeleton className="h-5 w-1/3 mt-2" />
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-px w-full mt-1 bg-gray-300" />
        <Skeleton className="h-4 w-3/4 mt-2" />
      </div>
    </section>
  );
}

export default BookingDetailSkeleton;
