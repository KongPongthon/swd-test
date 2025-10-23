'use client';
import { Input } from 'antd';
import React from 'react';
interface Props {
  handleChange: (index: number, value: string) => void;
  parts: Array<string>;
  citizenLengths: Array<number>;
}
const CitizenInput = ({ handleChange, parts, citizenLengths }: Props) => {
  return (
    <>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          <Input
            style={{ width: citizenLengths[i] * 40 }}
            maxLength={citizenLengths[i]}
            value={part}
            onChange={(e) => handleChange(i, e.target.value)}
          />
          {i < parts.length - 1 && <span>-</span>}
        </React.Fragment>
      ))}
    </>
  );
};
export default CitizenInput;
