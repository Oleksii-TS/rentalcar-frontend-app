"use client";

import { useState, useRef, useEffect } from "react";
import Icon from "@/components/Icon/Icon";
import styles from "./CustomSelect.module.css";
import SimpleBar from "simplebar-react";

interface Option {
  value: string | number;
  listLabel: string | number;
  displayLabel?: string | number;
}

interface Props {
  label: string;
  placeholder: string;
  value: string | number;
  options: Option[];
  onChange: (value: string | number) => void;
  width?: number;
}

export default function CustomSelect({
  label,
  placeholder,
  value,
  options,
  onChange,
  width = 204,
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isSame = (a: string | number, b: string | number) =>
    String(a) === String(b);

  const selectedOption = options.find((o) => isSame(o.value, value));

  const handleSelect = (val: string | number) => {
    if (isSame(val, value)) {
      onChange("");
    } else {
      onChange(val);
    }
    setOpen(false);
  };

  return (
    <div className={styles.wrapper} style={{ width }} ref={ref}>
      <label className={styles.label}>{label}</label>

      <button
        type="button"
        className={`${styles.selectBtn} ${open ? styles.open : ""}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={styles.valueText}>
          {selectedOption
            ? selectedOption.displayLabel || selectedOption.listLabel
            : placeholder}
        </span>

        {selectedOption ? (
          <span
            className={styles.iconWrapper}
            onClick={(e) => {
              e.stopPropagation();
              onChange("");
            }}
          >
            <Icon name="icon-close" size={16} className={styles.icon} />
          </span>
        ) : (
          <Icon
            name="icon-arrow"
            size={16}
            className={`${styles.icon} ${open ? styles.arrowOpen : ""}`}
          />
        )}
      </button>

      {open && (
        <SimpleBar
          className={styles.dropdown}
          style={{ maxHeight: 272 }}
          autoHide={false}
        >
          <ul className={styles.list}>
            {options.map((o) => (
              <li
                key={o.value}
                className={`${styles.option} ${
                  isSame(o.value, value) ? styles.active : ""
                }`}
                onClick={() => handleSelect(o.value)}
              >
                {o.listLabel}
              </li>
            ))}
          </ul>
        </SimpleBar>
      )}
    </div>
  );
}
