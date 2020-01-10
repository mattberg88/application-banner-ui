import React, { FC, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BannersDatePicker: FC<{ selectedDate: Date, onChange: (e: any) => void }> = ({ selectedDate, onChange }) => {
  const [date, setDate] = useState(selectedDate)
  const onChangeHandler = (value: Date) => {
    setDate(value)
    onChange(value.toISOString())
  }
  return (
    <div
      data-testid='bannersDatePicker'
      className='ui input field banners_datepicker'
    >
      <DatePicker
        selected={new Date(date)}
        dateFormat='yyyy/MM/dd'
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default BannersDatePicker;