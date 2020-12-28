import React from 'react';
import Empty from '../assets/empty.svg';
import { css } from '@emotion/react';

export default function EmptyState () {
  return (
    <>
      <img css={css`
        width: 400px;
        @media (max-width: 600px) {
          width: 200px;
        }
        margin-top: 16px;
      `} src={Empty} alt="empty-state"/>
      <p css={css`
        color: #3B4CCA;
        font-size: 2rem;
      `}>You don't have any pokemon yet</p>
    </>
  )
}