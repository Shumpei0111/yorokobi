import { Language } from "@/app/i18n/settings";
import { SelectLang } from "@/components/ui/select-lang";
import Link from "next/link";

export const GlobalHeader = ({ lang }: { lang: Language }) => {
  return (
    <div className="px-4">
      <header className="w-full flex justify-between items-center py-4 ">
        <h1 className="text-2xl font-bold font-montserrat">
          <Link href={`/${lang}`}>Yorokobi</Link>
        </h1>
        <nav>
          <SelectLang />
        </nav>
      </header>
    </div>
  );
};
