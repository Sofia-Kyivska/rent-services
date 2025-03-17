"use client";
import React, { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SiteContext } from "@/context/SiteContext";
import styles from "./Filter.module.scss";
import { amenitiesData } from "@/data";
import FilterItem from "./FilterItem/FilterItem";
import FilterBeds from "./FilterBeds";
import ButtonFilter from "../share/ButtonFilter/ButtonFilter";

const Filter = ({
  amenitiesArr,
  setAmenitiesArr,
  numberBedsArr,
  setNumberBedsArr,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeIndexBed, setActiveIndexBed] = useState(0);
  const { filterShown, setFilterShown } = useContext(SiteContext);
  const [isLoad, setIsLoad] = useState(true);
  const [isFilterClear, setIsFilterClear] = useState(false);
  // const [filterBeds, setFilterBeds] = useState(2);
  const [lastCheckedBed, setLastCheckedBed] = useState(0);
  const { t } = useTranslation();
  useEffect(() => {
    setIsLoad(false);
  }, []);

  const data = [
    {
      id: 32,
      title: "2",
    },
    {
      id: 33,
      title: "3",
    },
    {
      id: 34,
      title: "4",
    },
    {
      id: 35,
      title: "5",
    },
    {
      id: 36,
      title: "6",
    },
  ];

  const amenitiesWithoutWiFi = amenitiesData.filter(
    (amenity) => amenity.titleUa !== "Wi-Fi"
  );

  const handleChooseBeds = () => {
    //! це треба, щоб можна було зняти відмітку з радіобаттона,коли фільтр очищується
    setLastCheckedBed(event.target);
    // console.log(event);

    switch (event.target.value) {
      case "2":
        setNumberBedsArr(() => []);
        // setNumberBedsArr(() => [3, 4, 5, 6]); // якщо хочемо бачити квартири, де тільки 2 місця
        //!- закоментувати 38 строчку, розкоментувати 37 якщо хочемо бачити всі квартири, де помістяться 2 людини
        break;
      case "3":
        // setNumberBedsArr(() => [2, 4, 5, 6]); // якщо хочемо бачити квартири, де тільки 3 місця
        setNumberBedsArr(() => [2]);
        //!- закоментувати 42 строчку, розкоментувати 43 якщо хочемо бачити всі квартири, де помістяться 3 людини
        break;
      case "4":
        // setNumberBedsArr(() => [2, 3, 5, 6]); // якщо хочемо бачити квартири, де тільки 4 місця
        setNumberBedsArr(() => [2, 3]);
        //!- закоментувати 47 строчку, розкоментувати 48 якщо хочемо бачити всі квартири, де помістяться 4 людини
        break;
      case "5":
        // setNumberBedsArr(() => [2, 3, 4, 6]); // якщо хочемо бачити квартири, де тільки 5 місць
        setNumberBedsArr(() => [2, 3, 4]);
        //!- закоментувати 52 строчку, розкоментувати 53 якщо хочемо бачити всі квартири, де помістяться 5 людей
        break;
      case "6":
        setNumberBedsArr(() => [2, 3, 4, 5]);
        //!- а тут однаково для обох варіантів
        break;
      default:
        console.log("такого не може бути");
        // setNumberBedsArr(() => []);
        break;
    }
  };
  // console.log(lastCheckedBed);

  const handleResetFilter = () => {
    setIsFilterClear(true);
    setNumberBedsArr(() => []);
    lastCheckedBed.checked = false;
  };

  const isFilterShown = filterShown
    ? styles.container
    : styles.container__hidden;

  const handleRadioStyles = () => {
    lastCheckedBed.classList.add(styles.checkedOff);
  };
  // const IconIsChecked = isChecked
  //   ? styles.checked + " " + styles.checkedOn
  //   : styles.checked + " " + styles.checkedOff;

  // const isBackgroundShown = filterShown
  //   ? styles.newExternalContainer_opened
  //   : styles.newExternalContainer_closed;

  return (
    <>
      <div className={isFilterShown}>
        <div className={styles.filterButtonsContainer}>
          <p className={styles.inFilterHeader}>{t("Filter.Conditions")}</p>

          <ul className={styles.filterAmenitisContainer}>
            {!isLoad &&
              amenitiesWithoutWiFi.map((item) => {
                return (
                  <FilterItem
                    key={item.id}
                    id={item.id}
                    title={item.titleUa}
                    titleEn={item.titleEn}
                    titleRu={item.titleRu}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    amenitiesArr={amenitiesArr}
                    setAmenitiesArr={setAmenitiesArr}
                    isFilterClear={isFilterClear}
                    setIsFilterClear={setIsFilterClear}
                  />
                );
              })}
          </ul>
        </div>
        <p className={styles.inFilterHeader}>{t("Filter.Beds")}</p>
        <ul className={styles.bedsList}>
          {data.map((item) => {
            return (
              <FilterBeds
                key={item.id}
                handleChooseBeds={handleChooseBeds}
                value={item.title}
                id={item.id}
                name="bedsQuantity"
                title={item.title}
                activeIndexBed={activeIndexBed}
                setActiveIndexBed={setActiveIndexBed}
                isFilterClear={isFilterClear}
                setIsFilterClear={setIsFilterClear}
                lastCheckedBed={lastCheckedBed}
              />
            );
          })}
        </ul>
        <div className={styles.filterSearchResetContainer}>
          {!isLoad && (
            <>
              <button
                type="button"
                className={styles.filterButtonSearch}
                onClick={() => handleResetFilter()}
              >
                {t("Buttons.FilterClear")}
              </button>
              <button
                type="button"
                className={styles.filterButtonSearch}
                onClick={() => setFilterShown(!filterShown)}
              >
                {t("Buttons.CloseFilterBtn")}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Filter;
