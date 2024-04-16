import React from "react";
import QuranSkeletons from "@components/skeletons/QuranSkeletons";
import SkeletonLive from "@components/skeletons/SkeletonLive";
import HadithSkeleton from "@components/skeletons/HadithSkeleton";

interface TLoading {
  isLoading: boolean;
  isError: boolean;
  error: string | undefined;
  type: "quran" | "audio" | "live" | "hadith"; // Ensure type is always defined
}

const skeletonsType: { [key in TLoading["type"]]: React.FC } = {
  quran: QuranSkeletons,
  audio: QuranSkeletons, // You can assign the same skeleton for "audio" as you didn't provide a specific skeleton for it
  hadith: HadithSkeleton, // You can assign the same skeleton for "hadith" as you didn't provide a specific skeleton for it
  live: SkeletonLive,
};

const Loading: React.FC<TLoading> = ({ isLoading, isError, error, type }) => {
  const ComponentSkeleton = skeletonsType[type];
  if (isLoading) {
    return (
      <div>
        <ComponentSkeleton />
      </div>
    );
  }

  if (isError) {
    return <div>{error}</div>;
  }

  return null;
};

export default Loading;
