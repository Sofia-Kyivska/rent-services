"use client";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ModalR from "@/components/Modal/Modal";
import OrderForm from "@/components/OrderForm/OrderForm";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import OrderBtn from "../OrderBtn/OrderBtn";
import Amenities from "./Amenities/Amenities";
import ItemSlider from "./ItemSlider/ItemSlider";
import IsLoading from "../share/IsLoading/IsLoading";
import { GetDataById } from "@/fetch/clientFetch";
import { changeDescsFromStringToArray } from "@/utils/changeDescsFromStringToArray";
import { currentLanguages, textInfoAppartId } from "@/data";
import seoStyles from "@/app/seoStyles.module.css";
import styles from "./ApartIdItem.module.scss";


const ApartIdItem = ({ params }) => {
    const router = useRouter();
    const { data, error, isLoading } = GetDataById(params.id);

    const dataId = data && !isLoading ? data : error;

    const allLangsOfDescsArray = changeDescsFromStringToArray(data);

    // общий массив для рендера, созданный путем распыления массивов данных из локальной data и БД
    const allInformation = [...allLangsOfDescsArray, ...textInfoAppartId];

    const { t, i18n } = useTranslation();


    return (
        <section className='pageTopSection'>
            <div className={`container ${styles.container}`}>
                <h1 className={seoStyles.titleHidden}>
                    Оренда квартири Київ. Київ квартири. Зняти квартиру Київ.
                    Киев.
                </h1>

                {!isLoading && (
                    <BreadCrumbs
                        onClick={() => router.back()}
                        title={t("BreadCrumbs.BackLink")}
                        externalClass={styles.crumbs}
                    />
                )}

                <ModalR>
                    <OrderForm id={dataId?.objNumber} />
                </ModalR>

                {isLoading ? (
                    <IsLoading />
                ) : (
                    <article className={styles.apartContent}>
                        <h3 className={seoStyles.titleHidden}>
                            Detailed information about the apartments
                            </h3>

                            <p className={styles.roomsQuantity}>{dataId.roomsQuantity}{t("ApartmentsPage.TextOfDescAdress")}</p>
                            
                        <ItemSlider
                            dataId={dataId}
                            customClass={styles.sliderWrapper}
                            />
                            
                        <div className={styles.addressBlock}>
                            <h4 className={seoStyles.titleHidden}>
                                Detailed information about the amenities
                                </h4>          
                                <p>#{dataId.objNumber}</p>    
                            <address>
                                <a
                                    href={dataId?.googleMapLocation}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className={styles.locationLink}
                                >
                                    <svg className={styles.icon}>
                                        <use href='/sprite.svg#location'></use>
                                    </svg>
                                    {
                                        (!isLoading &&
                                            i18n.language ===
                                            currentLanguages.EN &&
                                            dataId.addressEn) ||
                                        (i18n.language ===
                                            currentLanguages.RU &&
                                            dataId.addressRu) ||
                                        dataId.addressUa
                                    }
                                </a>
                            </address>

                            <div className={styles.bedsProposition}>
                                <figcaption>{dataId?.bedsQuantity}</figcaption>
                                <figure className={styles.imgSvgContainer}>
                                    <Image
                                        src="/webp/Person.webp"
                                        alt={((i18n.language === currentLanguages.EN) && "Sleeping place") || ((i18n.language === currentLanguages.RU) && "Спальное место") || "Спальне місце"}
                                        fill={true}
                                        className={styles.imgSvg}
                                        sizes="24px"
                                            
                                    />
                                </figure>
                                    
                            </div>                                 
                        </div>
                            
                        <Amenities
                            dataId={dataId}
                            customClass={styles.amenitiesWrapper}
                        />                          

                        <OrderBtn className={styles.orderBtn} />
                    </article>
                )}

                <article className={styles.textGrid}>
                    <ul className={styles.textInfoContainer}>
                        {!isLoading &&
                            allInformation.map((el, index) => {
                                return (
                                    <li key={index} className={styles.textInfoBlock}>
                                        {el.titleUa && (
                                            <h5
                                                className={styles.textInfoTitle}
                                            >
                                                {(i18n.language ===
                                                    currentLanguages.EN &&
                                                    el.titleEn) ||
                                                    (i18n.language ===
                                                        currentLanguages.RU &&
                                                        el.titleRu) ||
                                                    el.titleUa}
                                            </h5>
                                        )}

                                        {el.titleUa === "Правила:" ? (
                                            <ul className={styles.rulesList}>
                                                {el.rulesList.map(
                                                    (el, index) => {
                                                        return (
                                                            <li
                                                                key={index}
                                                                className={
                                                                    styles.rulesItem
                                                                }
                                                            >
                                                                {(i18n.language ===
                                                                    currentLanguages.EN &&
                                                                    el.rulesEn) ||
                                                                    (i18n.language ===
                                                                        currentLanguages.RU &&
                                                                        el.rulesRu) ||
                                                                    el.rulesUa}
                                                            </li>
                                                        );
                                                    }
                                                )}
                                            </ul>
                                        ) : (
                                            <p
                                                className={
                                                    index ===
                                                        allInformation.length - 2
                                                        ? styles.accentRule
                                                        : ""
                                                }
                                            >
                                                {(i18n.language ===
                                                    currentLanguages.EN &&
                                                    el.textEn) ||
                                                    (i18n.language ===
                                                        currentLanguages.RU &&
                                                        el.textRu) ||
                                                    el.textUa}
                                            </p>
                                        )}
                                    </li>
                                );
                            })}
                    </ul>
                </article>
            </div>
        </section>
    );
};


export default ApartIdItem;