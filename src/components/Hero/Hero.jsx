'use client';
import { useTranslation } from 'react-i18next';
import { GetData } from '@/fetch/clientFetch';
import styles from './Hero.module.scss';
import OrderBtn from '../OrderBtn/OrderBtn';
import CallBtn from '../CallBtn/CallBtn';

const Hero = () => {
  const { data, isLoading } = GetData();
  const { t, i18n } = useTranslation();

  return (
    <section className={`${styles.container} pageTopSection`}>
      <div className={`${styles.hero} container`}>
        <div>
          <h1 className={styles.title}>
            {!isLoading && t('MainPage.heroTitle')}
          </h1>
          <h2 className={styles.subTitle}>
            {!isLoading && t('MainPage.heroSubTitle')}
          </h2>
        </div>
        <div className={styles.btnsWraper}>
          <OrderBtn className={styles.btn} />
          <CallBtn className={styles.btn} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
