"use client";
import { defaultLanguage } from "@/app/i18n/settings";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import { usePathname } from "next/navigation";

export const SelectLang = ({
  isShowCurrentLang = true,
}: {
  isShowCurrentLang?: boolean;
}) => {
  const pathname = usePathname();

  const currentLang = pathname.split("/")[1] || defaultLanguage;
  const handleLanguageChange = (lang: string) => {
    const currentPath = pathname;
    const newPath = currentPath.replace(
      `/${currentPath.split("/")[1]}`,
      `/${lang}`
    );
    if (currentPath !== newPath) {
      window.location.href = newPath;
    }
  };

  return (
    <Select onValueChange={handleLanguageChange}>
      <SelectTrigger className="flex justify-center items-center gap-1 text-xs bg-slate-50">
        <Globe className="w-4 h-4" />
        <SelectValue
          placeholder={
            isShowCurrentLang ? (
              <p
                className={`${
                  currentLang === "ja" ? "font-hannariMincho" : "font-jost"
                } text-xs`}
              >
                {currentLang === "ja" ? "日本語" : "EN"}
              </p>
            ) : null
          }
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="ja" className="text-xs font-hannariMincho">
            日本語
          </SelectItem>
          <SelectItem value="en" className="text-xs font-jost">
            English
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
