import React, {useState} from 'react';
import {View} from 'react-native';
import DatePicker from 'react-native-ui-datepicker';
import {typography} from '../theme/typography';
import {Colors} from '../theme/variables';
import {ms} from '../theme/spacing';

/**
 * DateRangePicker component allows users to select a date range.
 * It uses the react-native-ui-datepicker library for the date picker UI.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onChange - Callback function to handle date changes.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars

interface DateRangePickerProps {
  onChange: (dates: {startDate: Date; endDate: Date}) => void;
  filterFormData?: {
    start_date: Date | string;
    end_date: Date | string;
  };
}

const DateRangePicker = ({onChange, filterFormData}: DateRangePickerProps) => {
  return (
    <DatePicker
      mode="range"
      startDate={filterFormData?.start_date}
      endDate={filterFormData?.end_date}
      onChange={({startDate, endDate}: any) => {
        onChange({startDate, endDate});
      }}
      styles={{
        range_start: {
          backgroundColor: Colors.primary,
          color: Colors.white,
        },
        range_end: {
          backgroundColor: Colors.primary,
          color: Colors.white,
        },
        range_start_label: {
          color: Colors.white,
          ...typography._16SofticesSemibold,
        },
        range_end_label: {
          color: Colors.white,
          ...typography._16SofticesSemibold,
        },
        day_label: {
          color: Colors.textCl,
          ...typography._14SofticesRegular,
        },

        month_label: {
          color: Colors.textCl,
          ...typography._15SofticesSemibold,
        },
        year_label: {
          color: Colors.textCl,
          ...typography._18SofticesRegular,
        },
        today: {
          borderColor: Colors.borderCl,
          borderWidth: 1,
        },
        weekday_label: {
          color: Colors.textCl,
          ...typography._18SofticesSemibold,
        },
        active_year_label: {
          color: Colors.primary,
          ...typography._20SofticesBold,
          backgroundColor: Colors.borderCl,
        },
        selected_month_label: {
          color: Colors.primary,
          ...typography._20SofticesBold,
        },
        month_selector_label: {
          color: Colors.primary,
          ...typography._18SofticesSemibold,
          backgroundColor: Colors.borderCl,
        },
        year_selector_label: {
          color: Colors.primary,
          ...typography._18SofticesSemibold,
          backgroundColor: Colors.borderCl,
        },
        button_next: {
          backgroundColor: Colors.primary,
          borderRadius: ms(20),
        },
        button_prev: {
          backgroundColor: Colors.primary,
          borderRadius: ms(20),
        },
        range_middle_label: {
          color: Colors.secondary,
          ...typography._16SofticesSemibold,
        },
        range_fill: {
          backgroundColor: Colors.primary,
          opacity: 0.05,
        },
        today_label: {
          color: Colors.primary,
          ...typography._18SofticesSemibold,
        },
        selected_label: {
          color: Colors.white,
          ...typography._18SofticesSemibold,
          backgroundColor: Colors.primary,
        },
        selected: {
          backgroundColor: Colors.primary,
        },
      }}
    />
  );
};

export default DateRangePicker;
