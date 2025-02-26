import React from 'react';
import Link from 'next/link';
import styles from './Logo.module.scss';
import { useWindowResize } from '@/hooks/useWindowResize';

const Logo = ({ className, logoBig, logoSmall }) => {
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
            !isDesktop ? `/sprite.svg#${logoSmall}` : `/sprite.svg#${logoBig}`
          }
        />
      </svg>
    </Link>
  );
};

export default Logo;
