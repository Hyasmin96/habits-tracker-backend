"use client";

interface ProgressBarProps {
  days: number;
}

export default function ProgressBar({ days }: ProgressBarProps) {

  const maxDays = 66;

  const percentage = Math.min((days / maxDays) * 100, 100);

  return (
    <div className="space-y-1">

      <div className="text-sm text-gray-600">
         {days} / {maxDays} days
      </div>

      <div className="w-full bg-gray-200 rounded h-4">

        <div
          className="bg-green-500 h-4 rounded transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>

      </div>

    </div>
  );
}