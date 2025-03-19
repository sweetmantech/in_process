import React from "react";
import { Collection } from "@/types/token";
import truncateAddress from "./truncateAddress";

export const getContentLength = (feeds: Collection[]): number => {
  return feeds.reduce((acc, feed) => {
    const feedText = `${truncateAddress(feed.creator)} - ${feed.name} - ${new Date(feed.released_at).toLocaleString()}`;
    return acc + feedText.length;
  }, 0);
};

export const calculateViewBox = (points: number[][]): string => {
  const minX = Math.min(...points.map((p) => p[0]));
  const maxX = Math.max(...points.map((p) => p[0]));
  const minY = Math.min(...points.map((p) => p[1]));
  const maxY = Math.max(...points.map((p) => p[1]));
  const padding = 20;

  return `${minX - padding} ${minY - padding} ${maxX - minX + 2 * padding} ${maxY - minY + 2 * padding}`;
};

export const generateSpacer = (width: number): React.ReactElement => (
  <tspan fill="transparent">{Array(width).fill("_").join("")}</tspan>
);

export const formatFeedText = (
  feed: Collection,
  fontSize: number,
): React.ReactElement => (
  <>
    <tspan style={{ fontFamily: "Archivo-Bold", fontSize, letterSpacing: 2 }}>
      {truncateAddress(feed.creator)}
    </tspan>
    <tspan> - </tspan>
    <tspan
      style={{ fontFamily: "Spectral-Regular", fontSize, letterSpacing: 2 }}
    >
      {feed.name}
    </tspan>
    <tspan> - </tspan>
    <tspan
      style={{ fontFamily: "Archivo-Regular", fontSize, letterSpacing: 2 }}
    >
      {new Date(feed.released_at).toLocaleString().toLowerCase()}
    </tspan>
  </>
);
