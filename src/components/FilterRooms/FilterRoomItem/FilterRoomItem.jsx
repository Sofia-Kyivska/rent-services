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

  return (
    <li className={styles.filterRoom}>
      {!isLoading && (
        <>
          <input
            id={id}
            type="checkbox"
            className={filterCheckboxStyles}
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
          <label className={styles.filterRoomText} htmlFor={id}>
            {title}
            {t("Buttons.FilterQuantRooms")}
          </label>
        </>
      )}
    </li>
  );
};

export default FilterRoomItem;
