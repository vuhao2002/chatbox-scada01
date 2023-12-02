"use client";

import { PulseLoader } from "react-spinners";

type Props = {
  text: any;
  color: any;
  loading: any;
  size: any;
};

export default function ComponentLevelLoader({
  text,
  color,
  loading,
  size,
}: Props) {
  return (
    <span className="flex gap-1 items-center">
      {text}
      <PulseLoader
        color={color}
        loading={loading}
        size={size || 10}
        data-testid="loader"
      />
    </span>
  );
}
