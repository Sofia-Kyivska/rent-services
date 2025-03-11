"use client";
import React, { useEffect, useRef, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { SiteContext } from "@/context/SiteContext";
import ApartItem from "@/components/ApartItem/ApartItem";
import IsLoading from "@/components/share/IsLoading/IsLoading";
import ButtonFilter from "@/components/share/ButtonFilter/ButtonFilter";
import FilterRooms from "@/components/FilterRooms/FilterRooms";
import Filter from "@/components/Filter/Filter";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import { GetData } from "@/fetch/clientFetch";
import { currentLanguages } from "@/data";
import seoStyles from "@/app/seoStyles.module.css";
import styles from "./Apartments.module.scss";

const ApartmentsComponent = () => {
  const router = useRouter();
  const { data, isLoading } = GetData();
  const [loadedCount, setLoadedCount] = useState(12);
  const [showLoading, setShowLoading] = useState(false);
  const [amenitiesArr, setAmenitiesArr] = useState([]);
  const [numberRoomsArr, setNumberRoomsArr] = useState([]);
  const [numberBedsArr, setNumberBedsArr] = useState([]);
  const { t, i18n } = useTranslation();
  const containerRef = useRef();
  const { filterShown, setFilterShown } = useContext(SiteContext);

  // console.log(data);

  let sortedData = [];

  if (!isLoading) {
    sortedData = [...data];
    sortedData.sort((a, b) => {
      return Number(a.priority) - Number(b.priority);
    });
  }

  const filteredRoomsData = sortedData?.filter((room) => {
    if (numberRoomsArr.length === 0) return true; //якщо фільтр пустий, виводимо всі квартири

    const filteredRooms = numberRoomsArr.some(
      (numberRoom) => numberRoom == room.roomsQuantity //якщо хоча б один з фільтрів співпадає, виводимо ці квартиру
    );
    return filteredRooms;
  });

  const filteredBedsData = filteredRoomsData?.filter((bed) => {
    // console.log(numberBedsArr);
    //! працює від зворотнього, якщо в numberBedsArr [2], не покаже 2к квартири,
    //! якщо [2,3] - не покаже 2к і 3к квартири, і так далі.
    const filteredBeds = numberBedsArr.every(
      (numberBed) => numberBed != bed.bedsQuantity
    );
    return filteredBeds;
  });

  const filteredAmenitiesData = filteredBedsData?.filter((room) => {
    const amenities = room.amenities;

    const filteredAmenities = amenitiesArr.every((amenity) =>
      amenities.includes(amenity)
    );

    return filteredAmenities;
  });

  const notFoundText = () => {
    if (
      numberRoomsArr.includes("1") &&
      !numberRoomsArr.includes("2") &&
      !numberRoomsArr.includes("3")
    )
      return t("ApartmentsPage.OneRoom");

    if (
      !numberRoomsArr.includes("1") &&
      numberRoomsArr.includes("2") &&
      !numberRoomsArr.includes("3")
    )
      return t("ApartmentsPage.TwoRoom");

    if (
      !numberRoomsArr.includes("1") &&
      !numberRoomsArr.includes("2") &&
      numberRoomsArr.includes("3")
    )
      return t("ApartmentsPage.ThreeRoom");
    if (
      numberRoomsArr.includes("1") &&
      numberRoomsArr.includes("2") &&
      !numberRoomsArr.includes("3")
    )
      return t("ApartmentsPage.OneAndTwoRoom");
    if (
      numberRoomsArr.includes("1") &&
      !numberRoomsArr.includes("2") &&
      numberRoomsArr.includes("3")
    )
      return t("ApartmentsPage.OneAndThreeRoom");

    if (
      !numberRoomsArr.includes("1") &&
      numberRoomsArr.includes("2") &&
      numberRoomsArr.includes("3")
    )
      return t("ApartmentsPage.TwoAndThreeRoom");
  };
  const handleScroll = () => {
    const container = containerRef.current;

    if (!showLoading && filteredAmenitiesData?.length && container) {
      const containerHeight = container.offsetHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const bottomOffset = containerHeight - scrollY - windowHeight;

      if (bottomOffset < 100 && loadedCount < filteredAmenitiesData.length) {
        setShowLoading(true);

        setTimeout(() => {
          setLoadedCount(loadedCount + 12);
          setShowLoading(false);
        }, 500);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line
  }, [filteredAmenitiesData, loadedCount]);

  const isFilterShown = filterShown
    ? styles.containerOneRooms_Opened + " " + styles.containerOneRooms
    : styles.containerOneRooms;

  const isButtonFilterShownInContainer = filterShown
    ? styles.filterButtonHidden
    : styles.filterButtonShown;

  const isButtonFilterShownInFilter = filterShown
    ? styles.filterButtonShown
    : styles.filterButtonHidden;

  const isFilterContainerFull = filterShown
    ? styles.filterContainer_rooms
    : styles.filterContainer;

  return (
    <section className={`pageTopSection ${styles.container}`}>
      <h1 className={seoStyles.titleHidden}>
        Оренда квартири Київ. Київ квартири. Квартири подобово.
      </h1>
      <div className="container">
        <div className={styles.BreadCrumbs}>
          {!isLoading && (
            <BreadCrumbs
              onClick={() => router.back()}
              title={t("BreadCrumbs.BackLink")}
              externalClass={styles.bread}
            />
          )}
        </div>
        <div className={styles.filterContainer}>
          <FilterRooms
            numberRoomsArr={numberRoomsArr}
            setNumberRoomsArr={setNumberRoomsArr}
          />

          <ButtonFilter externalClass={isButtonFilterShownInContainer} />

          {/* <Filter
            amenitiesArr={amenitiesArr}
            setAmenitiesArr={setAmenitiesArr}
            numberBedsArr={numberBedsArr}
            setNumberBedsArr={setNumberBedsArr}
          /> */}
        </div>
        {!isLoading &&
          window.innerWidth >= 1366 &&
          filteredAmenitiesData?.length <= 0 && (
            <div className={styles.notFoundTextStyles}>
              <p>
                {notFoundText()} {t("ApartmentsPage.NotFound")}
              </p>
            </div>
          )}
        {isLoading ? (
          <IsLoading />
        ) : (
          // <div className={isFilterShown}>
          <ul ref={containerRef} className={isFilterShown}>
            {filterShown && (
              <div className={styles.filterWithButton}>
                <ButtonFilter externalClass={isButtonFilterShownInFilter} />
                <Filter
                  amenitiesArr={amenitiesArr}
                  setAmenitiesArr={setAmenitiesArr}
                  numberBedsArr={numberBedsArr}
                  setNumberBedsArr={setNumberBedsArr}
                />
              </div>
            )}
            {filteredAmenitiesData?.length > 0 &&
              filteredAmenitiesData
                .slice(0, loadedCount)
                .map((item) => (
                  <ApartItem
                    key={item._id}
                    titleImg={item.titleImg}
                    code={item.code}
                    address={
                      (i18n.language === currentLanguages.EN &&
                        item.addressEn) ||
                      (i18n.language === currentLanguages.RU &&
                        item.addressRu) ||
                      item.addressUa
                    }
                    price={item.price}
                    objNumber={item.objNumber}
                    roomsQuantity={item.roomsQuantity}
                    id={item._id}
                    bedsQuantity={item.bedsQuantity}
                    complex={
                      (i18n.language === currentLanguages.EN &&
                        item.complexEn) ||
                      (i18n.language === currentLanguages.RU &&
                        item.complexRu) ||
                      item.complexUa
                    }
                    district={
                      (i18n.language === currentLanguages.EN &&
                        item.districtEn) ||
                      (i18n.language === currentLanguages.RU &&
                        item.districtRu) ||
                      item.districtUa
                    }
                  />
                ))}
          </ul>
          // </div>
        )}
        {!isLoading &&
          window.innerWidth < 1366 &&
          filteredAmenitiesData?.length <= 0 && (
            <div className={styles.notFoundTextStyles}>
              <p>
                {notFoundText()} {t("ApartmentsPage.NotFound")}
              </p>
            </div>
          )}
        {showLoading && (
          <div className={styles.loading}>
            <IsLoading />
          </div>
        )}
      </div>
    </section>
  );
};

export default ApartmentsComponent;
