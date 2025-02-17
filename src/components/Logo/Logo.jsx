import React from 'react';
import Link from 'next/link';
import styles from './Logo.module.scss';
import { useWindowResize } from '@/hooks/useWindowResize';

const Logo = ({ className }) => {
  const { isDesktop } = useWindowResize();

  return (
    <Link
      href="/"
      prefetch={false}
      className={styles.container + ' ' + `${className}`}
    >
      <svg>
        <use
          href={
            !isDesktop
              ? 'sprite.svg#icon-logoWhiteSmall'
              : 'sprite.svg#icon-logoWhiteBig'
          }
        />
      </svg>
    </Link>
  );
};

export default Logo;
