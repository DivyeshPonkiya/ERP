import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import {SearchSvg} from '../assets/Images/svg/SearchSvg';
import {Colors} from '../theme/variables';
import {FilterSvg} from '../assets/Images/svg/FilterSvg';
import {hs, ms, vs} from '../theme/spacing';
import {typography} from '../theme/typography';
import {SortingSvg} from '../assets/Images/svg/SortingSvg';
import {ACTIVE_OPACITY} from '../constants/constants';
import {strings} from '../localization';

type SearchHeaderProps = {
  placeholder?: string;
  value: any;
  onChangeText?: (text: string) => void;
  isSorting?: boolean;
  onSortingPress?: () => void;
  isFilter?: boolean;
  onFilterPress?: () => void;
  mainStyle?: ViewStyle;
  editable?: boolean;
  showSearch?: boolean;
} & Partial<TextInputProps>;

const SearchHeader: React.FC<SearchHeaderProps> = ({
  placeholder = strings.search,
  value,
  onChangeText,
  isSorting = false,
  onSortingPress,
  isFilter = true,
  onFilterPress,
  mainStyle,
  editable,
  showSearch = true,
  ...inputProps
}) => {
  return (
    <View style={[styles.container, mainStyle]}>
      {/* Search input box */}
      <View style={styles.searchBox}>
        {showSearch ? (
          <SearchSvg height={20} width={20} color={Colors.textLight} />
        ) : null}
        <TextInput
          style={[styles.input, {marginLeft: showSearch ? hs(8) : 0}]}
          placeholder={placeholder}
          placeholderTextColor={Colors.textLight}
          value={value}
          editable={editable}
          onChangeText={onChangeText}
          {...inputProps}
        />
      </View>

      {/* Sorting & Filter button */}
      {isSorting || isFilter ? (
        <View style={styles.filterBtnView}>
          {isSorting ? (
            <TouchableOpacity
              activeOpacity={ACTIVE_OPACITY}
              style={{paddingHorizontal: isFilter ? ms(12) : ms(18)}}
              onPress={onSortingPress}>
              <SortingSvg height={20} width={20} color={Colors.black} />
            </TouchableOpacity>
          ) : null}
          {isSorting && isFilter ? <View style={styles.divider} /> : null}
          {isFilter ? (
            <TouchableOpacity
              activeOpacity={ACTIVE_OPACITY}
              style={{paddingHorizontal: isSorting ? ms(12) : ms(18)}}
              onPress={onFilterPress}>
              <FilterSvg height={20} width={20} color={Colors.black} />
            </TouchableOpacity>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: ms(12),
    borderWidth: 1,
    borderColor: Colors.borderCl,
    paddingHorizontal: ms(10),
    alignItems: 'center',
    justifyContent: 'center',
    height: ms(56),
  },
  input: {
    flex: 1,
    ...typography._16SofticesRegular,
    fontSize: ms(14),
    color: '#0F172A',
    marginLeft: hs(8),
  },
  filterBtnView: {
    height: ms(56),
    marginLeft: hs(8),
    backgroundColor: Colors.white,
    borderRadius: ms(12),
    borderWidth: ms(1),
    borderColor: Colors.borderCl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    borderRightWidth: ms(1),
    height: ms(20),
    borderRightColor: Colors.borderCl,
  },
});

export default SearchHeader;
