import React from 'react';
import { styled } from '@mui/material/styles';

const Span = styled(
  'span',
  {}
)({
  color: 'red'
});

export default function RedAsterisk() {
  return <Span>*</Span>;
}
