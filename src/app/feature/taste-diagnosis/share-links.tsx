"use client";

import Link from "next/link";
import { Share2 } from "lucide-react";
import Image from "next/image";
import XLogo from "/public/images/logo-x.svg";
import { useEffect, useState } from "react";

export const ShareLinks = ({
  encodedShareText,
  hashtags,
  xShareText,
  lineShareText,
}: {
  encodedShareText: string;
  hashtags: string;
  xShareText: string;
  lineShareText: string;
}) => {
  const [xShareUrl, setXShareUrl] = useState<string>("");
  const [lineShareUrl, setLineShareUrl] = useState<string>("");

  useEffect(() => {
    const xShareUrl = `https://x.com/intent/tweet?text=${encodedShareText}&url=${window.location.href}&hashtags=${hashtags}`;

    const lineShareUrl = encodeURI(
      `https://line.me/R/msg/text/?${encodedShareText}${window.location.href}`
    );

    setXShareUrl(xShareUrl);
    setLineShareUrl(lineShareUrl);
  }, [encodedShareText, hashtags]);

  return (
    <div className="flex justify-center gap-4 text-xs my-4">
      <Link
        className="border text-gray-50 font-bold rounded-md px-4 py-1 font-sans flex items-center justify-center gap-2 bg-[#3FCC40]"
        href={lineShareUrl}
        target="_blank"
        rel="noopener"
        aria-label={lineShareText}
      >
        <Share2 className="w-4 h-4" />
        {lineShareText}
      </Link>
      <Link
        className="border text-gray-50 font-bold rounded-md px-4 py-1 font-sans flex items-center justify-center gap-2 bg-[#379AF0]"
        href={xShareUrl}
        target="_blank"
        rel="noopener"
        aria-label={xShareText}
      >
        <Image src={XLogo} alt="X" width={12} height={12} />
        {xShareText}
      </Link>
    </div>
  );
};
