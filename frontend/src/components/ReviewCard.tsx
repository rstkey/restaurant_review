import { Review } from "@/models/Review";
import {
  MapPinIcon,
  PencilSquareIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import React, { FC } from "react";

interface CardProps {
  review: Review;
  onEditClick: (review: Review) => void;
}

const ReviewCard: FC<CardProps> = ({ review, onEditClick }) => {
  const { title, description, rating, location } = review;

  return (
    <div className="relative group rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30 m-4">
      <div className="flex justify-between">
        <h2 className={`mb-3 text-2xl font-semibold`}>
          {title.toUpperCase()}{" "}
        </h2>
        <PencilSquareIcon
          className="h-4 w-4 inline mr-1 hover:cursor-pointer"
          onClick={() => onEditClick(review)}
        />
      </div>
      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>{description}</p>

      <div className="flex justify-between mt-6">
        <p className={` max-w-[30ch] text-sm opacity-75 flex items-center`}>
          <StarIcon className="h-4 w-4 inline mr-1" /> {`${rating}/10`}
        </p>
        <p className={` max-w-[30ch] text-sm opacity-75 flex items-center`}>
          <MapPinIcon className="h-4 w-4 inline mr-1" /> {`${location}`}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
