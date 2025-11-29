"use client";

import { FormEvent, useEffect, useState } from "react";
import styles from "./BookingForm.module.css";
import type { Car } from "@/types/car";
import Icon from "@/components/Icon/Icon";
import CustomCalendar from "@/components/Calendar/CustomCalendar";
import toast from "react-hot-toast";

interface Props {
  car: Car;
}

export default function BookingForm({ car }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dateBooking, setDateBooking] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    dateBooking: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("bookingForm");
    if (saved) {
      const data = JSON.parse(saved);
      setName(data.name || "");
      setEmail(data.email || "");
      setDateBooking(data.dateBooking || "");
      setComment(data.comment || "");
    }
  }, []);

  useEffect(() => {
    const data = { name, email, dateBooking, comment };
    localStorage.setItem("bookingForm", JSON.stringify(data));
  }, [name, email, dateBooking, comment]);

  const formatDate = (iso: string) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    if (!dateBooking.trim())
      newErrors.dateBooking = "Booking date is required.";

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (email.trim() && !emailValid) {
      newErrors.email = "Enter a valid email address.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const missingList = Object.keys(newErrors)
        .map((key) => key.charAt(0).toUpperCase() + key.slice(1))
        .join(", ");

      toast.error(`Please fill in: ${missingList}`);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await new Promise((res) => setTimeout(res, 800));

      toast.success(
        `Car ${car.brand} ${car.model} booked for ${formatDate(dateBooking)}!`,
        { duration: 4000 }
      );

      setName("");
      setEmail("");
      setDateBooking("");
      setComment("");

      localStorage.removeItem("bookingForm");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.formTitle}>
        <h2 className={styles.title}>Book your car now</h2>
        <p className={styles.descr}>
          Stay connected! We are always ready to help you.
        </p>
      </div>

      <div className={styles.imput}>
        {/* Name */}
        <div className={styles.field}>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            className={errors.name ? styles.errorInput : ""}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((prev) => ({ ...prev, name: "" }));
            }}
            placeholder="Name*"
          />
          {errors.name && <p className={styles.errorText}>{errors.name}</p>}
        </div>

        <div className={styles.field}>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            required
            className={errors.email ? styles.errorInput : ""}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: "" }));
            }}
            placeholder="Email*"
          />
          {errors.email && <p className={styles.errorText}>{errors.email}</p>}
        </div>

        <div className={styles.field}>
          <label className={styles.wrapper}>
            <input
              type="text"
              name="dateBooking"
              className={`${styles.fakeInput} ${
                errors.dateBooking ? styles.errorInput : ""
              }`}
              placeholder="Booking date"
              value={dateBooking ? formatDate(dateBooking) : ""}
              readOnly
              onClick={() => setShowCalendar(true)}
            />

            <Icon name="icon-calendar" size={20} className={styles.icon} />
          </label>

          {errors.dateBooking && (
            <p className={styles.errorText}>{errors.dateBooking}</p>
          )}

          {showCalendar && (
            <CustomCalendar
              selected={dateBooking}
              onSelect={(iso) => {
                setDateBooking(iso);
                setErrors((prev) => ({ ...prev, dateBooking: "" }));
              }}
              onClose={() => setShowCalendar(false)}
            />
          )}
        </div>

        <div className={styles.field}>
          <textarea
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Comment"
          />
        </div>
      </div>

      <button type="submit" disabled={isSubmitting} className={styles.submit}>
        {isSubmitting ? "Booking..." : "Send"}
      </button>
    </form>
  );
}
