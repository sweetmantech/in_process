import { Skeleton } from "@/components/ui/skeleton";

const AccountPageSkeleton = () => (
  <main className="flex flex-col font-archivo">
    <section className="grid grid-cols-12 gap-1">
      <Skeleton className="col-span-12 h-5 w-16 md:col-span-2" />
      <div className="col-span-12 flex flex-col gap-4 md:col-span-10">
        <fieldset>
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-1 h-10 w-full rounded-md" />
        </fieldset>
        <fieldset>
          <Skeleton className="h-4 w-8" />
          <Skeleton className="mt-1 h-[168px] w-full rounded-md" />
        </fieldset>
      </div>
    </section>
    <section className="mt-6 grid grid-cols-12 gap-1 md:mt-24">
      <Skeleton className="col-span-12 h-10 w-20 md:col-span-2" />
      <div className="col-span-12 flex flex-col gap-4 md:col-span-10">
        <fieldset>
          <Skeleton className="h-4 w-16" />
          <Skeleton className="mt-1 h-10 w-full rounded-md" />
        </fieldset>
        <fieldset>
          <Skeleton className="h-4 w-4" />
          <Skeleton className="mt-1 h-10 w-full rounded-md" />
        </fieldset>
        <fieldset>
          <Skeleton className="h-4 w-16" />
          <Skeleton className="mt-1 h-10 w-full rounded-md" />
        </fieldset>
        <fieldset>
          <Skeleton className="h-4 w-16" />
          <Skeleton className="mt-1 h-10 w-full rounded-md" />
        </fieldset>
      </div>
    </section>
    <section className="mt-4 flex flex-col items-end justify-end gap-3 md:flex-row">
      <Skeleton className="h-10 w-full rounded-md md:w-[140px]" />
      <Skeleton className="h-10 w-full rounded-md md:w-[160px]" />
      <Skeleton className="h-10 w-full rounded-md md:mr-4 md:w-[100px]" />
    </section>
  </main>
);

export default AccountPageSkeleton;
