"use client";
import React, { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SiteContext } from "@/context/SiteContext";
import styles from "./Filter.module.scss";
import { amenitiesData } from "@/data";
import FilterItem from "./FilterItem/FilterItem";
import ButtonFilter from "../share/ButtonFilter/ButtonFilter";

const Filter = ({
  amenitiesArr,
  setAmenitiesArr,
  numberBedsArr,
  setNumberBedsArr,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { filterShown, setFilterShown } = useContext(SiteContext);
  const [isLoad, setIsLoad] = useState(true);
  const [isFilterClear, setIsFilterClear] = useState(false);
  // const [filterBeds, setFilterBeds] = useState(2);
  const [lastCheckedBed, setLastCheckedBed] = useState(null);
  const { t } = useTranslation();
  useEffect(() => {
    setIsLoad(false);
  }, []);

  const amenitiesWithoutWiFi = amenitiesData.filter(
    (amenity) => amenity.titleUa !== "Wi-Fi"
  );

  const handleChooseBeds = () => {
    //! це треба, щоб можна було зняти відмітку з радіобаттона,коли фільтр очищується
    setLastCheckedBed(event.target);

    switch (event.target.value) {
      case "2":
        setNumberBedsArr(() => [3, 4, 5, 6]); // якщо хочемо бачити квартири, де тільки 2 місця
        //!- закоментувати 37 строчку, якщо хочемо бачити всі квартири, де помістяться 2 людини
        break;
      case "3":
        setNumberBedsArr(() => [2, 4, 5, 6]); // якщо хочемо бачити квартири, де тільки 3 місця
        //setNumberBedsArr(() => [2]);
        //!- закоментувати 41 строчку, розкоментувати 42 якщо хочемо бачити всі квартири, де помістяться 3 людини
        break;
      case "4":
        setNumberBedsArr(() => [2, 3, 5, 6]); // якщо хочемо бачити квартири, де тільки 4 місця
        //setNumberBedsArr(() => [2, 3]);
        //!- закоментувати 46 строчку, розкоментувати 47 якщо хочемо бачити всі квартири, де помістяться 4 людини
        break;
      case "5":
        setNumberBedsArr(() => [2, 3, 4, 6]); // якщо хочемо бачити квартири, де тільки 5 місць
        //setNumberBedsArr(() => [2, 3, 4]);
        //!- закоментувати 51 строчку, розкоментувати 52 якщо хочемо бачити всі квартири, де помістяться 5 людей
        break;
      case "6":
        setNumberBedsArr(() => [2, 3, 4, 5]);
        //!- а тут однаково для обох варіантів
        break;
      default:
        console.log("такого не може бути");
        setNumberBedsArr(() => []);
        break;
    }
  };
  // console.log(lastCheckedBed);
  // const handleIncrementFilter = () => {
  //   if (filterBeds === 6) return;
  //   setFilterBeds((prevFilterBeds) => prevFilterBeds + 1);

  //   setNumberBedsArr(() => [...numberBedsArr, filterBeds]);
  //   console.log(numberBedsArr);
  // };

  // const handleDecrementFilter = () => {
  //   if (filterBeds === 2) return;
  //   setFilterBeds((prevFilterBeds) => prevFilterBeds - 1);
  //   setNumberBedsArr(() =>
  //     numberBedsArr.filter((numberBeds) => numberBeds != filterBeds - 1)
  //   );
  //   console.log(numberBedsArr);
  // };

  const handleResetFilter = () => {
    setIsFilterClear(true);
    setNumberBedsArr(() => []);
    lastCheckedBed.checked = false;
  };

  const isFilterShown = filterShown
    ? styles.container
    : styles.container__hidden;

  // const isBackgroundShown = filterShown
  //   ? styles.newExternalContainer_opened
  //   : styles.newExternalContainer_closed;

  return (
    <>
      {/* <div className={isBackgroundShown}> */}
      {/* <ButtonFilter /> */}
      <div className={isFilterShown}>
        <div className={styles.filterButtonsContainer}>
          <p className={styles.inFilterHeader}>Умови</p>
          {/* <div className={styles.filterAmenitisContainer}>
            <p className={styles.textBeds}>
              {!isLoad && t("Buttons.FilterSleepingPlaces")}
            </p>

            <button
              className={styles.buttonBeds}
              onClick={handleDecrementFilter}
            >
              -
            </button>
            <span className={styles.numberBeds}>{filterBeds}</span>
            <button
              className={styles.buttonBeds}
              onClick={handleIncrementFilter}
            >
              +
            </button>
          </div> */}
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
        <p className={styles.inFilterHeader}>Спальні місця</p>
        <ul className={styles.bedsList}>
          <li className={styles.bedsItem}>
            <input
              onClick={handleChooseBeds}
              type="radio"
              value="2"
              id="32"
              name="bedsQuantity"
              className={styles.bedsInput}
            />
            <label className={styles.bedsLabel} htmlFor="32">
              {" "}
              2
            </label>
          </li>
          <li className={styles.bedsItem}>
            <input
              onClick={handleChooseBeds}
              type="radio"
              value="3"
              id="33"
              name="bedsQuantity"
              className={styles.bedsInput}
            />
            <label className={styles.bedsLabel} htmlFor="33">
              {" "}
              3
            </label>
          </li>
          <li className={styles.bedsItem}>
            <input
              onClick={handleChooseBeds}
              type="radio"
              value="4"
              id="34"
              name="bedsQuantity"
              className={styles.bedsInput}
            />
            <label className={styles.bedsLabel} htmlFor="34">
              {" "}
              4
            </label>
          </li>
          <li className={styles.bedsItem}>
            <input
              onClick={handleChooseBeds}
              type="radio"
              value="5"
              id="35"
              name="bedsQuantity"
              className={styles.bedsInput}
            />
            <label className={styles.bedsLabel} htmlFor="35">
              {" "}
              5
            </label>
          </li>
          <li className={styles.bedsItem}>
            <input
              onClick={handleChooseBeds}
              type="radio"
              value="6"
              id="36"
              name="bedsQuantity"
              className={styles.bedsInput}
            />
            <label className={styles.bedsLabel} htmlFor="36">
              {" "}
              6
            </label>
          </li>
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
      {/* </div> */}
    </>
  );
};

export default Filter;
