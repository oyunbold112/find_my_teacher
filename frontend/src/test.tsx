import React, { useState, useMemo } from "react";

function startOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function addMonths(d, n) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

// returns array of { date: Date|null, inCurrentMonth: boolean }
function generateCalendarGrid(viewDate) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = startOfMonth(viewDate);
  const firstWeekday = firstDay.getDay(); // 0 = Sun, 1 = Mon ...
  const totalDays = daysInMonth(year, month);

  const cells = [];

  // previous month's tail
  if (firstWeekday > 0) {
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstWeekday - 1; i >= 0; i--) {
      const dayNum = prevMonthLastDay - i;
      const date = new Date(year, month - 1, dayNum);
      cells.push({ date, inCurrentMonth: false });
    }
  }

  // current month days
  for (let d = 1; d <= totalDays; d++) {
    cells.push({ date: new Date(year, month, d), inCurrentMonth: true });
  }

  // next month's head to fill to 7*n cells
  while (cells.length % 7 !== 0) {
    const nextDayIndex = cells.length - (firstWeekday + totalDays) + 1;
    const date = new Date(year, month + 1, nextDayIndex);
    cells.push({ date, inCurrentMonth: false });
  }

  // group into weeks
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

export default function Calendar({
  initialDate = new Date(),
  onSelect // function(dateString) or date object
}) {
  const [viewDate, setViewDate] = useState(startOfMonth(initialDate));
  const [selectedDate, setSelectedDate] = useState(null); // Date or null

  const weeks = useMemo(() => generateCalendarGrid(viewDate), [viewDate]);

  function goPrevMonth() {
    setViewDate(prev => addMonths(prev, -1));
  }

  function goNextMonth() {
    setViewDate(prev => addMonths(prev, 1));
  }

  function handleSelect(day) {
    if (!day) return;
    setSelectedDate(day.date);
    if (onSelect) onSelect(day.date.toISOString().slice(0, 10)); // YYYY-MM-DD
  }

  return (
    <div className="calendar">
      <header className="calendar-header">
        <button
          type="button"
          aria-label="Previous month"
          onClick={goPrevMonth}
          className="prev-btn"
        >
          ←
        </button>

        <div className="month-label">
          {viewDate.toLocaleString(undefined, { month: "long", year: "numeric" })}
        </div>

        <button
          type="button"
          aria-label="Next month"
          onClick={goNextMonth}
          className="next-btn"
        >
          →
        </button>
      </header>

      <table className="calendar-grid" role="grid" aria-label="Calendar">
        <thead>
          <tr>
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
              <th key={d} scope="col">{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, wi) => (
            <tr key={wi}>
              {week.map((cell, ci) => {
                const isSelected =
                  selectedDate &&
                  cell.date.toDateString() === selectedDate.toDateString();
                return (
                  <td key={ci}>
                    <button
                      type="button"
                      className={`day ${cell.inCurrentMonth ? "" : "muted"} ${isSelected ? "selected" : ""}`}
                      onClick={() => handleSelect(cell)}
                      aria-pressed={isSelected}
                      disabled={!cell.inCurrentMonth && false /* optionally disable */}
                    >
                      {cell.date.getDate()}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
