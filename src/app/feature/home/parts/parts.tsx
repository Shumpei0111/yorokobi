import { cn } from "@/lib/utils";

export const HeadGroupTitle = ({
  count,
  jpTitle,
  enTitle,
}: {
  count: React.ReactNode;
  jpTitle: React.ReactNode;
  enTitle: React.ReactNode;
}) => (
  <hgroup className="flex gap-2 items-start">
    <p className="text-[10px] -mt-1 md:-mt-0 text-gray-600 font-extralight overflow-hidden">
      {count}
    </p>
    <div>
      <h3 className="font-hannariMincho -mt-2 md:mt-0 font-bold text-base">
        {jpTitle}
      </h3>
      <p className="font-jost text-sm text-gray-500">{enTitle}</p>
    </div>
  </hgroup>
);

export const ContentBox = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <article
    className={cn(
      "flex flex-col gap-2 pt-3 md:pt-0 indent-4 md:max-w-md md:ml-auto",
      className
    )}
  >
    {children}
  </article>
);
