'use client';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import CallBtnRound from '../CallBtnRound/CallBtnRound';
import { GetData } from '@/fetch/clientFetch';
import styles from './Hero.module.scss';

const Hero = () => {
  const { data, isLoading } = GetData();
  const { t, i18n } = useTranslation();

  return (
    <section className={`${styles.container} pageTopSection`}>
      <div className={`${styles.hero} container`}>
        <h1 className={styles.title}>
          {!isLoading && t('MainPage.heroTitle')}
        </h1>
        <div className={styles.heroContainer}>
          <figure className={styles.imgFirst}>
            <Image
              src="/heroImgs/Hero-first.webp"
              alt="hero image"
              fill={true}
              priority={true}
              sizes="(max-width: 768px) 334px, (max-width: 1200px) 704px"
            />
          </figure>
          <div className={styles.heroContent}>
            <h2 className={styles.subTitle}>
              {!isLoading && t('MainPage.heroSubTitle')}
            </h2>
            <div className={styles.callContiner}>
              {!isLoading && <CallBtnRound text={t('Buttons.CalltBtn')} />}
            </div>
            <figure className={styles.imgSecond}>
              <Image
                src="/heroImgs/Hero-second.webp"
                alt="hero image"
                fill={true}
                sizes="(max-width: 768px) 334px, (max-width: 1200px) 496px"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
