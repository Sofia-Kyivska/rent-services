"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { currentLanguages } from "@/data";
import styles from "./FilterRoomItem.module.scss";

const FilterRoomItem = ({
  id,
  title,
  activeIndex,
  setActiveIndex,
  setNumberRoomsArr,
  ariaTextEn,
  ariaTextUk,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { t, i18n } = useTranslation();

  const isNumberRoomsChecked = () => {
    id === activeIndex ? setIsChecked(!isChecked) : null;
  };

  const toggleNumberRoomsForFilter = () => {
    if (!isChecked) {
      setNumberRoomsArr((numberRoomsArr) => [...numberRoomsArr, title]);
    } else {
      setNumberRoomsArr((numberRoomsArr) =>
        numberRoomsArr.filter((numberRooms) => numberRooms != title)
      );
    }
  };
  useEffect(() => setIsLoading(false), []);
  useEffect(() => {
    isNumberRoomsChecked();
  }, [activeIndex]);

  const filterCheckboxStyles = isChecked
    ? styles.filterInputCheckbox__Checked
    : styles.filterInputCheckbox;

  const IconIsChecked = isChecked
    ? styles.checked + " " + styles.checkedOn
    : styles.checked + " " + styles.checkedOff;

  return (
    <li className={styles.filterRoom}>
      {!isLoading && (
        <>
          <input
            id={id}
            type="checkbox"
            className={styles.checkbox}
            checked={isChecked}
            aria-label={
              i18n.language === currentLanguages.EN ? ariaTextEn : ariaTextUk
            }
            onChange={() => {
              setActiveIndex(id),
                isNumberRoomsChecked(),
                toggleNumberRoomsForFilter();
            }}
          />

          <label className={styles.blogCheckboxDesc} htmlFor={id}>
            <svg className={IconIsChecked}>
              <use href="sprite.svg#icon-checked" />
            </svg>
            {title}
            {t("Buttons.FilterQuantRooms")}
          </label>
        </>
      )}
    </li>
  );
};

export default FilterRoomItem;
