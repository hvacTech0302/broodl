"use client";
import { baseRating, gradients, emojis } from "@/utils";
import { Fugaz_One } from "next/font/google";
import React, { useState } from "react";
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

const months = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sept",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};

const monthsArr = Object.keys(months);

const now = new Date();

const dayList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function Calendar(props) {
  const { demo, completeData, handleSetMood } = props;

  const now = new Date();
  const currMonth = now.getMonth();
  const [selectedMonth, setSelectedMonth] = useState(monthsArr[currMonth]);
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  const numericMonth = monthsArr.indexOf(selectedMonth);

  const data = completeData?.[selectedYear]?.[numericMonth] || {};

  function handleIncrementMonth(val) {
    // value +1 -1
    // if we hit the bounds of the months, then we can just adjust the year that is displayed instead.
    if (numericMonth + val < 0) {
      // set month value = 11 and decrement the year
      setSelectedYear((curr) => curr - 1);
      setSelectedMonth(monthsArr[monthsArr.length - 1]);
    } else if (numericMonth + val > 11) {
      // set month value to 0 and increment year
      setSelectedYear((curr) => curr + 1);
      setSelectedMonth(monthsArr[0]);
    } else {
      setSelectedMonth(monthsArr[numericMonth + val]);
    }
  }

  const monthNow = new Date(selectedYear, monthsArr.indexOf(selectedMonth), 1);
  const firstDayOfMonth = monthNow.getDay();
  const daysInMonth = new Date(
    selectedYear,
    Object.keys(selectedMonth).indexOf(selectedMonth) + 1,
    0
  ).getDate();

  const daysToDisplay = firstDayOfMonth + daysInMonth;

  const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0);

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-5 gap-4">
        <button
          onClick={() => {
            handleIncrementMonth(-1);
          }}
          className="mr-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60 "
        >
          <i className="fa-solid fa-circle-chevron-left"></i>
        </button>
        <p
          className={
            "text-center capitalize textGradient whitespace-nowrap col-span-3 " +
            fugaz.className
          }
        >
          {selectedMonth} - {selectedYear}
        </p>
        <button
          onClick={() => {
            handleIncrementMonth(+1);
          }}
          className="ml-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60 "
        >
          <i className="fa-solid fa-circle-chevron-right"></i>
        </button>
      </div>
      <div className="flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10 ">
        {[...Array(numRows).keys()].map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="grid grid-cols-7 gap-1">
              {dayList.map((dayOfWeek, dayOfWeekIndex) => {
                let dayIndex =
                  rowIndex * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);

                let dayDisplay =
                  dayIndex > daysInMonth
                    ? false
                    : row === 0 && dayOfWeekIndex < firstDayOfMonth
                    ? false
                    : true;

                let isToday = dayIndex === now.getDate();

                if (!dayDisplay) {
                  return <div className="bg-white" key={dayOfWeekIndex} />;
                }
                let color = demo
                  ? gradients.indigo[baseRating[dayIndex]]
                  : dayIndex in data
                  ? gradients.indigo[data[dayIndex]]
                  : "white";

                return (
                  <div
                    style={{ background: color }}
                    className={
                      "text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg " +
                      (isToday &&
                      numericMonth === now.getMonth() &&
                      selectedYear === now.getFullYear()
                        ? " border-indigo-400 border-2 "
                        : " border-indigo-100 ") +
                      (color === "white" ? " text-indigo-400 " : " text-white ")
                    }
                    key={dayOfWeekIndex}
                  >
                    <p>{dayIndex}</p>
                    {dayIndex in data ? (
                      <span className="mx-auto overflow-hidden whitespace-nowrap invisible sm:visible sm:text-base md:text-lg lg:text-xl">
                        {emojis[data[dayIndex]]}
                      </span>
                    ) : null}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
