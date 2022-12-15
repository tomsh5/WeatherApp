import React from "react";

export function DayPreview(props) {
  const { dayForcast } = props;

  function getDayTxt(dayNum) {
    const week = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return week[dayNum];
  }

  return (
    <section className="day-preview">
      {dayForcast && (
        <div className="flex column align-center">
          <h1 className="day-name">
            {getDayTxt(new Date(dayForcast.Date).getDay())}
          </h1>
          <img src={`images/weather${dayForcast.Day.Icon}.png`} alt="" />
          <span>
            {Math.floor(dayForcast.Temperature.Minimum.Value)}° -{" "}
            {Math.floor(dayForcast.Temperature.Maximum.Value)}°
          </span>
        </div>
      )}
    </section>
  );
}
