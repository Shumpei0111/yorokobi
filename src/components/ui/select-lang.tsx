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
import { usePathname, useRouter } from "next/navigation";

export const SelectLang = () => {
  const router = useRouter();
  const pathname = usePathname();

  const currentLang = pathname.split("/")[1] || defaultLanguage;
  const handleLanguageChange = (lang: string) => {
    const currentPath = pathname;
    const newPath = currentPath.replace(
      `/${currentPath.split("/")[1]}`,
      `/${lang}`
    );
    if (currentPath !== newPath) {
      router.push(newPath);
    }
  };

  return (
    <Select onValueChange={handleLanguageChange}>
      <SelectTrigger className="flex items-center gap-1 text-xs">
        <Globe className="w-4 h-4" />
        <SelectValue
          placeholder={
            <p className="text-xs ">
              {currentLang === "ja" ? "日本語" : "English"}
            </p>
          }
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="ja" className="text-xs">
            日本語
          </SelectItem>
          <SelectItem value="en" className="text-xs">
            English
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
