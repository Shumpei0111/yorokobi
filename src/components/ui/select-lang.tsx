"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

export const SelectLang = () => {
  const router = useRouter();

  const handleLanguageChange = (lang: string) => {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(
      `/${currentPath.split("/")[1]}`,
      `/${lang}`
    );
    router.push(newPath);
  };

  return (
    <Select onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[140px] text-xs">
        <SelectValue placeholder="Select a language" />
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
