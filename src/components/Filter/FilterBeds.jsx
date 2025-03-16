"use client";
import React, { useState, useEffect, useRef } from "react";
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
  const [isChecked, setIsChecked] = useState(
    (sessionStorage.getItem(id) === "true" ? true : false) || false
  );
  const hasMounted = useRef(false);
  const hasMounted2 = useRef(false);

  sessionStorage.setItem(id, isChecked);

  useEffect(() => {
    if (hasMounted.current) {
      setIsChecked(false);
      setIsFilterClear(false);
    } else {
      hasMounted.current = true;
    }
  }, [isFilterClear]);

  useEffect(() => {
    if (hasMounted2.current) {
      isBedChecked();
    } else {
      hasMounted2.current = true;
    }
  }, [activeIndexBed]);

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
            sessionStorage.setItem(id, isChecked),
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
