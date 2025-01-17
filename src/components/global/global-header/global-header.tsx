import { Language } from "@/app/i18n/settings";
import Link from "next/link";

export const GlobalHeader = ({ lang }: { lang: Language }) => {
  return (
    <div className="px-4">
      <header className="w-full flex justify-between items-center py-4 ">
        <h1 className="text-2xl font-[800] font-sans">
          <Link href={`/${lang}`}>Yorokobi</Link>
        </h1>
      </header>
    </div>
  );
};
