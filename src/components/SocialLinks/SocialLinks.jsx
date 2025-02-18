import React from 'react';
import { socialLinks } from '@/data/socialLinks';
import styles from './SocialLinks.module.scss';

const SocialLinks = ({ className }) => {
  return (
    <ul className={styles.socialLinks + ' ' + `${className}`}>
      {socialLinks.map((item) => {
        return (
          <li key={item.id} className={styles.socialItem}>
            <a
              href={item.href}
              {...(item.title !== 'Telephone' && {
                target: '_blank',
                rel: 'noopener noreferrer',
              })}
              className={styles.socialIcon}
            >
              <svg>
                <use href={item.icon} />
              </svg>
            </a>
            {item.title === 'Telephone' && (
              <a href={item.href} className={styles.phone}>
                {item.subtitle}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default SocialLinks;
