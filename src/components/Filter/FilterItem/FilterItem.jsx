"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { currentLanguages } from "@/data";
import styles from "./FilterItem.module.scss";

const FilterItem = ({
  id,
  titleEn,
  title,
  titleRu,
  activeIndex,
  setActiveIndex,
  setAmenitiesArr,
  isFilterClear,
  setIsFilterClear,
}) => {
  const [isChecked, setIsChecked] = useState(
    (sessionStorage.getItem(id) === "true" ? true : false) || false
  );
  const [isLoad, setIsLoad] = useState(true);
  const { i18n } = useTranslation();
  const hasMounted = useRef(false);

  sessionStorage.setItem(id, isChecked);

  useEffect(() => {
    if (hasMounted.current) {
      setIsChecked(false);
      setIsFilterClear(false);
      setAmenitiesArr([]);
      // code here only runs when syncWithMe changes!
    } else {
      hasMounted.current = true;
    }
  }, [isFilterClear]);

  useEffect(() => {
    setIsLoad(false);
  }, []);

  const isAmenityChecked = () =>
    id === activeIndex ? setIsChecked(!isChecked) : null;

  const toggleAmenityForFilter = () => {
    if (!isChecked) {
      setAmenitiesArr((amenitiesArr) => [...amenitiesArr, title]);
    } else {
      setAmenitiesArr((amenitiesArr) =>
        amenitiesArr.filter((amenity) => amenity != title)
      );
    }
  };

  useEffect(() => {
    isAmenityChecked();
  }, [activeIndex]);

  const filterCheckboxStyles = isChecked
    ? styles.filterInputCheckbox__Checked
    : styles.filterInputCheckbox;

  const IconIsChecked = isChecked
    ? styles.checked + " " + styles.checkedOn
    : styles.checked + " " + styles.checkedOff;

  return (
    <>
      {!isLoad && (
        <li className={styles.filterItem}>
          <input
            id={id}
            type="checkbox"
            className={styles.checkbox}
            aria-label={
              (i18n.language === currentLanguages.EN && titleEn) ||
              (i18n.language === currentLanguages.RU && titleRu) ||
              title
            }
            checked={isChecked}
            onChange={() => {
              setActiveIndex(id),
                isAmenityChecked(),
                sessionStorage.setItem(id, isChecked);
              toggleAmenityForFilter(), setIsFilterClear(false);
            }}
          />
          <label className={styles.blogCheckboxDesc} htmlFor={id}>
            <svg className={IconIsChecked}>
              <use href="sprite.svg#icon-checked" />
            </svg>
            {(i18n.language === currentLanguages.EN && titleEn) ||
              (i18n.language === currentLanguages.RU && titleRu) ||
              title}
          </label>
        </li>
      )}
    </>
  );
};

export default FilterItem;
