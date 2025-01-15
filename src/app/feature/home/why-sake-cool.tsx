"use client";

import { AnimatePresence, motion } from "motion/react";

export const WhySakeCool = () => {
  return (
    <div className="flex flex-col gap-12 pt-8 flex-start">
      <AnimatePresence>
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.2 }}
        >
          <hgroup className="flex gap-2">
            <p className="text-[10px] font-sans text-gray-600 font-extralight overflow-hidden">
              (1)
            </p>
            <div>
              <h3 className="font-hannariMincho -mt-2 font-bold text-base">
                長い歴史と革新の融合
              </h3>
              <p className="font-jost text-sm">
                A Fusion of Heritage and Innovation
              </p>
            </div>
          </hgroup>
        </motion.article>
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.3 }}
        >
          <hgroup className="flex gap-2">
            <p className="text-[10px] font-sans text-gray-600  font-extralight overflow-hidden">
              (2)
            </p>
            <div>
              <h3 className="font-hannariMincho -mt-2 font-bold text-base">
                多彩な味わいと飲み方
              </h3>
              <p className="font-jost text-sm">
                Versatility in Flavor and Style
              </p>
            </div>
          </hgroup>
        </motion.article>
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
        >
          <hgroup className="flex gap-2">
            <p className="text-[10px] font-sans text-gray-600  font-extralight overflow-hidden">
              (3)
            </p>
            <div>
              <h3 className="font-hannariMincho -mt-2 font-bold text-base">
                一本から始まる文化体験
              </h3>
              <p className="font-jost text-sm">
                A Taste of Culture in Every Bottle
              </p>
            </div>
          </hgroup>
        </motion.article>
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
        >
          <hgroup className="flex gap-2">
            <p className="text-[10px] font-sans text-gray-600  font-extralight overflow-hidden">
              (4)
            </p>
            <div>
              <h3 className="font-hannariMincho -mt-2 font-bold text-base">
                世界中で広がるクリエイティブな楽しみ方
              </h3>
              <p className="font-jost text-sm">
                Endless Ways to Enjoy Worldwide
              </p>
            </div>
          </hgroup>
        </motion.article>
      </AnimatePresence>
    </div>
  );
};
