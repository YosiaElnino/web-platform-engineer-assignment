import React from 'react';
import Error from '../assets/error.svg';
import { css } from '@emotion/react';

export default function ErrorState () {
  return (
    <>
      <img css={css`
        width: 400px;
        @media (max-width: 600px) {
          width: 200px;
        }
        margin-top: 16px;
      `} src={Error} alt="empty-state"/>
      <p css={css`
        color: #3B4CCA;
        font-size: 2rem;
      `}>Oops.. Something went wrong, try again later</p>
    </>
  )
}