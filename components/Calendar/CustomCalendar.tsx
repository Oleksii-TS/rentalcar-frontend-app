"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./CustomCalendar.module.css";
import Icon from "@/components/Icon/Icon";

interface Props {
  selected: string;
  onSelect: (date: string) => void;
  onClose: () => void;
}

export default function CustomCalendar({ selected, onSelect, onClose }: Props) {
  const today = new Date();
  const calendarRef = useRef<HTMLDivElement | null>(null);

  const [current, setCurrent] = useState(
    selected ? new Date(selected) : new Date()
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const monthName = current.toLocaleString("en-US", { month: "long" });
  const year = current.getFullYear();

  const start = new Date(current.getFullYear(), current.getMonth(), 1);
  const end = new Date(current.getFullYear(), current.getMonth() + 1, 0);

  const days = [];
  for (let i = 1; i <= end.getDate(); i++) days.push(i);

  const offset = start.getDay();

  const prevMonth = () => {
    setCurrent(new Date(year, current.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setCurrent(new Date(year, current.getMonth() + 1, 1));
  };

  const selectDay = (day: number) => {
    const date = new Date(year, current.getMonth(), day);

    if (date < new Date(today.toDateString())) return;

    const iso = date.toISOString().split("T")[0];
    onSelect(iso);
    onClose();
  };

  return (
    <div ref={calendarRef} className={styles.calendar}>
      <div className={styles.arrowUp} />
      <div className={styles.topContainer}>
        <div className={styles.top}>
          <button type="button" onClick={prevMonth} className={styles.nav}>
            <Icon name="icon-arrow" size={24} className={styles.leftArrow} />
          </button>

          <span className={styles.title}>
            {monthName} {year}
          </span>

          <button type="button" onClick={nextMonth} className={styles.nav}>
            <Icon name="icon-arrow" size={24} className={styles.rightArrow} />
          </button>
        </div>

        <div className={styles.weekdays}>
          {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {(offset === 0 ? Array(6) : Array(offset - 1))
          .fill(null)
          .map((_, i) => (
            <span key={"empty_" + i} />
          ))}

        {days.map((day) => {
          const date = new Date(year, current.getMonth(), day);
          const disabled = date < new Date(today.toDateString());
          const isSelected =
            selected && selected === date.toISOString().split("T")[0];

          return (
            <button
              type="button"
              key={day}
              className={`${styles.day} ${disabled ? styles.disabled : ""} ${
                isSelected ? styles.active : ""
              }`}
              disabled={disabled}
              onClick={() => selectDay(day)}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
