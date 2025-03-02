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
  const [filterBeds, setFilterBeds] = useState(2);
  const { t } = useTranslation();
  useEffect(() => {
    setIsLoad(false);
  }, []);

  const amenitiesWithoutWiFi = amenitiesData.filter(
    (amenity) => amenity.titleUa !== "Wi-Fi"
  );

  const handleIncrementFilter = () => {
    if (filterBeds === 6) return;
    setFilterBeds((prevFilterBeds) => prevFilterBeds + 1);

    setNumberBedsArr(() => [...numberBedsArr, filterBeds]);
  };

  const handleDecrementFilter = () => {
    if (filterBeds === 2) return;
    setFilterBeds((prevFilterBeds) => prevFilterBeds - 1);
    setNumberBedsArr(() =>
      numberBedsArr.filter((numberBeds) => numberBeds != filterBeds - 1)
    );
  };

  const handleResetFilter = () => {
    setIsFilterClear(true);
  };

  const isFilterShown = filterShown
    ? styles.container
    : styles.container__hidden;

  const isBackgroundShown = filterShown
    ? styles.newExternalContainer_opened
    : styles.newExternalContainer_closed;

  return (
    <>
      <div className={isBackgroundShown}>
        <ButtonFilter />
        <div className={isFilterShown}>
          <div className={styles.filterButtonsContainer}>
            <p className={styles.inFilterHeader}>Умови</p>
            {/* <div className={styles.filterAmenitisContainer}>
          <p className={styles.textBeds}>{!isLoad && t("Buttons.FilterSleepingPlaces")}</p>

          <button className={styles.buttonBeds} onClick={handleDecrementFilter}>
            -
          </button>
          <span className={styles.numberBeds}>{filterBeds}</span>
          <button className={styles.buttonBeds} onClick={handleIncrementFilter}>
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
                type="radio"
                value="2"
                id="2"
                name="bedsQuantity"
                className={styles.inputBeds}
              />
              <label htmlFor="2"> 2</label>
            </li>
            <li className={styles.bedsItem}>
              <input
                type="radio"
                value="3"
                id="3"
                name="bedsQuantity"
                className={styles.inputBeds}
              />
              <label htmlFor="3"> 3</label>
            </li>
            <li className={styles.bedsItem}>
              <input
                type="radio"
                value="4"
                id="4"
                name="bedsQuantity"
                className={styles.inputBeds}
              />
              <label htmlFor="4"> 4</label>
            </li>
            <li className={styles.bedsItem}>
              <input
                type="radio"
                value="5"
                id="5"
                name="bedsQuantity"
                className={styles.inputBeds}
              />
              <label htmlFor="5"> 5</label>
            </li>
            <li className={styles.bedsItem}>
              <input
                type="radio"
                value="6"
                id="6"
                name="bedsQuantity"
                className={styles.inputBeds}
              />
              <label htmlFor="6"> 6</label>
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
      </div>
    </>
  );
};

export default Filter;
