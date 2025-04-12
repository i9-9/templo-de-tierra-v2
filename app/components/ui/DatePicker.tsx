'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { isBefore, isSameDay } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (dates: [Date | null, Date | null]) => void;
  disabledDates?: Date[];
}

export default function CustomDatePicker({
  startDate,
  endDate,
  onChange,
  disabledDates = []
}: DatePickerProps) {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([startDate, endDate]);

  const handleChange = (dates: [Date | null, Date | null]) => {
    setDateRange(dates);
    onChange(dates);
  };

  // Función para determinar si una fecha está disponible
  const isDateAvailable = (date: Date) => {
    // Verificar si la fecha está en el array de fechas deshabilitadas
    if (disabledDates.some(disabledDate => isSameDay(disabledDate, date))) {
      return false;
    }

    // Verificar si la fecha es anterior a hoy
    if (isBefore(date, new Date())) {
      return false;
    }

    return true;
  };

  return (
    <div className="w-full">
      <DatePicker
        selectsRange={true}
        startDate={dateRange[0]}
        endDate={dateRange[1]}
        onChange={handleChange}
        minDate={new Date()}
        filterDate={isDateAvailable}
        monthsShown={2}
        inline
        className="w-full"
        dateFormat="dd/MM/yyyy"
        placeholderText="Selecciona tus fechas"
        calendarClassName="border-0 shadow-lg rounded-lg"
        dayClassName={(date) => 
          isDateAvailable(date) 
            ? 'hover:bg-[#F5DC90]/20 cursor-pointer' 
            : 'text-gray-400 cursor-not-allowed'
        }
      />
    </div>
  );
} 