import { Language } from "@/app/i18n/settings";
import Image from "next/image";
import sakadaru from "/public/images/sakadaru.jpg";
import zenGarden from "/public/images/zen-garden.jpg";
export const WhySakeCool = ({ lang }: { lang: Language }) => {
  return (
    <div className="flex flex-col gap-12 pt-8 md:pt-20 flex-start md:max-w-4xl md:w-screen">
      <article className="md:flex gap-2">
        <hgroup className="flex gap-2 items-start">
          <p className="text-[10px] font-sans -mt-1 md:-mt-0 text-gray-600 font-extralight overflow-hidden">
            (1)
          </p>
          <div>
            <h3 className="font-hannariMincho -mt-2 md:mt-0 font-bold text-base">
              千年の歴史が紡ぐ、洗練された日本酒の世界
            </h3>
            <p className="font-jost text-sm text-gray-500">
              A Fusion of Heritage and Innovation
            </p>
          </div>
        </hgroup>
        <article className="flex flex-col gap-2 pt-3 md:pt-0 indent-4 md:max-w-md md:ml-auto">
          <p className="text-sm text-justify font-sans">
            紀元前5世紀に始まった日本酒は、時を経てシンプルな発酵飲料から、複雑で奥深い味わいへと進化しました。伝統と革新が融合するこの飲み物は、今も新たな魅力を生み出し続けています。
          </p>
          <p className="text-sm text-justify font-sans">
            Originating in the 5th century BC, sake has evolved from a simple
            fermented drink to a beverage of complex and profound flavors. This
            harmonious blend of tradition and innovation continues to unveil new
            charms today.
          </p>
        </article>
      </article>
      <article className="md:flex gap-2">
        <hgroup className="flex gap-2 items-start">
          <p className="text-[10px] font-sans -mt-1 md:-mt-0 text-gray-600  font-extralight overflow-hidden">
            (2)
          </p>
          <div>
            <h3 className="font-hannariMincho -mt-2 md:mt-0 font-bold text-base">
              豊かな風味、多様なスタイル
            </h3>
            <p className="font-jost text-sm text-gray-500">
              Versatility in Flavor and Style
            </p>
          </div>
        </hgroup>
        <article className="flex flex-col gap-2 pt-3 md:pt-0 indent-4 md:max-w-md md:ml-auto">
          <p className="text-sm text-justify font-sans">
            日本酒は、軽やかで爽やかな味わいから、濃厚で複雑な風味まで、多彩なスタイルを誇ります。選び抜かれた酒米と精巧な磨きによって、一杯ごとに異なる表情を楽しめます。
          </p>
          <p className="text-sm text-justify font-sans">
            From light and refreshing to rich and complex, sake boasts a diverse
            range of styles and flavors. Carefully selected rice varieties and
            meticulous polishing create unique expressions in every sip.
          </p>
          <figure className="relative w-full h-[200px]">
            <Image
              src={sakadaru.src}
              alt="sakadaru"
              fill
              className="rounded-sm object-cover"
            />
          </figure>
        </article>
      </article>
      <article className="md:flex gap-2">
        <hgroup className="flex gap-2 items-start">
          <p className="text-[10px] font-sans -mt-1 md:-mt-0 text-gray-600  font-extralight overflow-hidden">
            (3)
          </p>
          <div>
            <h3 className="font-hannariMincho -mt-2 md:mt-0 font-bold text-base">
              一本の日本酒が織りなす、深い文化体験
            </h3>
            <p className="font-jost text-sm text-gray-500">
              A Taste of Culture in Every Bottle
            </p>
          </div>
        </hgroup>
        <article className="flex md:flex-row flex-col gap-4 md:gap-6 pt-3 md:pt-0 indent-4 md:max-w-md md:ml-auto">
          <div>
            <p className="text-sm text-justify font-sans">
              米の栽培から酒造りまで、日本の伝統と文化が息づく日本酒。古くは神への供物として大切にされ、現代では様々なシーンで愛されています。一本の酒から広がる豊かな文化を体験してください。
            </p>
            <p className="text-sm text-justify font-sans">
              From rice cultivation to brewing, sake embodies the rich
              traditions and culture of Japan. Once cherished as offerings to
              the gods, it is now beloved in diverse settings. Immerse yourself
              in the profound culture that unfolds from a single bottle.
            </p>
          </div>
          <figure className="relative md:w-[600px] w-full md:h-full h-[200px]">
            <Image
              src={zenGarden.src}
              alt="zen-garden"
              fill
              className="rounded-sm object-cover"
            />
          </figure>
        </article>
      </article>
      <article className="md:flex gap-2">
        <hgroup className="flex gap-2 items-start">
          <p className="text-[10px] font-sans -mt-1 md:-mt-0 text-gray-600  font-extralight overflow-hidden">
            (4)
          </p>
          <div>
            <h3 className="font-hannariMincho -mt-2 md:mt-0 font-bold text-base">
              グローバルに広がる、日本酒の新たな楽しみ方
            </h3>
            <p className="font-jost text-sm text-gray-500">
              Endless Ways to Enjoy Worldwide
            </p>
          </div>
        </hgroup>
        <article className="flex flex-col gap-2 pt-3 md:pt-0 indent-4 md:max-w-md md:ml-auto">
          <p className="text-sm text-justify font-sans">
            日本食ブームとともに、日本酒は世界中で注目を集めています。各国の料理と相性の良いペアリングが楽しめるなど、クリエイティブな楽しみ方が広がり続けています。世界各地で愛される日本酒の魅力を発見しましょう。
          </p>
          <p className="text-sm text-justify font-sans">
            Boosted by the global Japanese food craze, sake is gaining attention
            worldwide. Enjoy creative pairings with local cuisines and explore
            new ways to savor sake. Discover the allure of sake cherished in
            every corner of the world.
          </p>
        </article>
      </article>
    </div>
  );
};
