import React, { FC } from "react";
import { Hex } from "./hex";

export interface HexViewerProps {
  rowLength: number;
  setLength: number;
  hex?: string;
  base64?: string;
  buffer?: Buffer | number[];
}

export const HexViewer: FC<HexViewerProps> = (props) => {
  const { rowLength, setLength, buffer, base64, hex } = props;
  const rowChunk = rowLength;
  const setChunk = setLength;
  const rows = [];
  let row = [];
  let set = [];

  let bufferData: number[] = [];

  let rawData: Buffer | number[] | undefined;
  if (hex) {
    rawData = Buffer.from(hex, "hex");
  } else if (base64) {
    rawData = Buffer.from(base64, "base64");
  } else {
    rawData = buffer;
  }
  rawData = rawData || [];
  const bytes = rawData.length;
  if (Buffer.isBuffer(rawData)) {
    for (let i = 0; i < bytes; i += 1) {
      bufferData.push(rawData[i]);
    }
  } else {
    bufferData = rawData;
  }
  for (let i = 0; i < bytes; i += rowChunk) {
    const temparray = bufferData.slice(i, i + rowChunk);
    for (let z = temparray.length; z < rowChunk; z += 1) {
      temparray.push(-1);
    }
    row = [];
    for (let x = 0, k = temparray.length; x < k; x += setChunk) {
      set = temparray.slice(x, x + setChunk);
      for (let z = set.length; z < setChunk; z += 1) {
        set.push(-1);
      }
      row.push(set);
    }
    rows.push(row);
  }
  return <Hex rows={rows} bytesper={rowChunk} />;
};
