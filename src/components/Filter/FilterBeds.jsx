"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { currentLanguages } from "@/data";
import styles from "./Filter.module.scss";

const FilterBeds = ({
  handleChooseBeds,
  value,
  id,
  name,
  title,
  activeIndexBed,
  setActiveIndexBed,
  isFilterClear,
  setIsFilterClear,
  lastCheckedBed,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(false);
    setIsFilterClear(false);
  }, [isFilterClear]);

  useEffect(() => {
    isBedChecked();
  }, [activeIndexBed]);
  //   console.log(id);
  //   console.log(activeIndexBed);

  const isBedChecked = () =>
    lastCheckedBed.value === value ? setIsChecked(true) : setIsChecked(false);

  const IconIsChecked = isChecked
    ? styles.checked + " " + styles.checkedOn
    : styles.checked + " " + styles.checkedOff;

  return (
    <li className={styles.bedsItem}>
      <input
        // checked={isChecked}
        onChange={() => {
          setActiveIndexBed(id),
            isBedChecked(),
            handleChooseBeds(),
            setIsFilterClear(false);
        }}
        type="radio"
        value={value}
        id={id}
        name={name}
        className={styles.bedsInput}
      />
      <label className={styles.bedsLabel} htmlFor={id}>
        <div className={IconIsChecked}></div>
        {title}
      </label>
    </li>
  );
};

export default FilterBeds;
