import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Colors} from '../theme/variables';
import {hs, ms} from '../theme/spacing';
import {typography} from '../theme/typography';
import {QuantitySvg} from '../assets/Images/svg/QuantitySvg';
import {DateSvg} from '../assets/Images/svg/DateSvg';
import {MoreSvg} from '../assets/Images/svg/MoreSvg';
import MenuPopup, {MenuItem} from './MenuPopup';
import {EyeSvg} from '../assets/Images/svg/EyeSvg';
import {EditSvg} from '../assets/Images/svg/EditSvg';
import {DeleteSvg, DetailTitleSvg, ProductionSvg} from '../assets/Images/svg';
import {strings} from '../localization';
import {StatusSvg} from '../assets/Images/svg/StatusSvg';
import {TrueFillSvg} from '../assets/Images/svg/TrueFillSvg';
import FastImageView from './FastImageView';
import moment from 'moment';
import {CFL, isNull} from '../constants/constants';
import {navigate} from '../navigators/RootNavigation';
import {NAVIGATION} from '../constants/navigation';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../store/store';
import {setProductionDetailData} from '../createSlice/productionsSlice';
import {fetchProductionDetail} from '../createAsyncThunk/productionsThunk';
import {urlEndPoint} from '../constants/urlEndPoint';
import {calculateDates} from '../screens/production/StartEndDate';

interface CardProps {
  item: any;
  onPress?: () => void;
  deleteModal?: () => void;
}

const CardProductionItem = ({item, onPress, deleteModal}: CardProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const startEndDate = calculateDates(item?.production_works);

  const moreRef = useRef(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const menuItems: MenuItem[] = [
    {
      label: strings.view,
      icon: <EyeSvg width={20} height={20} color={Colors.textCl} />,
      onPress: () => {
        navigate(NAVIGATION.ProductionDetail);
        dispatch(setProductionDetailData(null));
        dispatch(
          fetchProductionDetail({
            params: '',
            endPoint: urlEndPoint.productions + `/${item?.id}`,
          }),
        );
      },
    },
    {
      label: strings.edit,
      icon: <EditSvg width={20} height={20} color={Colors.textCl} />,
      onPress: () => {
        navigate(NAVIGATION.EditProduction, item);
      },
    },
    {
      label: strings.delete,
      icon: <DeleteSvg width={20} height={20} color={Colors.colorRedD4} />,
      onPress: () => {
        deleteModal();
      },
    },
  ];

  return (
    <Pressable style={styles.card} onPress={onPress}>
      {/* Top Row */}
      <View style={styles.topRow}>
        {/* Image */}
        <View style={{flexDirection: 'row', flexShrink: 1}}>
          <View style={styles.imageWrapper}>
            {item?.cover_image_url ? (
              <FastImageView
                source={item?.cover_image_url}
                resizeMode="contain"
                style={styles.image}
              />
            ) : (
              <DetailTitleSvg width={24} height={24} color={Colors.primary} />
            )}
          </View>

          {/* Title */}
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{item?.product_name}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <StatusSvg
                width={18}
                height={18}
                color={
                  item?.status == 'in_progress'
                    ? Colors.Tawny
                    : item?.status == 'completed'
                    ? Colors.NorthTexasGreen
                    : item?.status == 'cancelled'
                    ? Colors.textLight
                    : ''
                }
              />
              <Text
                style={[
                  styles.statusText,
                  {
                    color:
                      item?.status == 'in_progress'
                        ? Colors.Tawny
                        : item?.status == 'completed'
                        ? Colors.NorthTexasGreen
                        : item?.status == 'cancelled'
                        ? Colors.textLight
                        : '',
                  },
                ]}>
                {item?.status == 'in_progress'
                  ? strings.inProgress
                  : item?.status == 'completed'
                  ? strings.completed
                  : item?.status == 'cancelled'
                  ? strings.cancelled
                  : null}
              </Text>
            </View>
          </View>
        </View>

        {/* Date */}
        <View style={styles.dateWrapper}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: ms(8),
            }}>
            <DateSvg width={20} height={20} color={Colors.secondary} />
            <Text style={styles.dateText}>
              {moment(item?.created_at).format('DD-MM-YY')}
            </Text>
          </View>
          <Pressable
            hitSlop={10}
            ref={moreRef}
            onPress={() => setMenuVisible(true)}>
            <MoreSvg width={16} height={16} color={Colors.secondary} />
          </Pressable>
        </View>
      </View>

      {/* Bottom Info Row */}
      <View style={styles.bottomRow}>
        {/* Customer Box */}
        <View style={styles.infoBox}>
          <ProductionSvg
            width={20}
            height={20}
            color={Colors.secondary}
            styles={{marginTop: ms(2)}}
          />
          <View style={{marginLeft: hs(8)}}>
            <Text style={styles.label}>{strings.work}</Text>
            <Text style={styles.value}>{CFL(item?.work_name)}</Text>
          </View>
        </View>
        <View style={{width: hs(10)}} />

        {/* Quantity Box */}
        <View style={styles.infoBox}>
          <QuantitySvg
            width={20}
            height={20}
            color={Colors.secondary}
            styles={{marginTop: ms(2)}}
          />
          <View style={{marginLeft: hs(8)}}>
            <Text style={styles.label}>{strings.quantity}</Text>
            <Text style={styles.value}>
              {item?.quantity} {CFL(item?.quantity_unit)}
            </Text>
          </View>
        </View>
      </View>

      {/* Progress Info Row */}
      <View style={{marginTop: ms(10)}}>
        <View style={styles.progressView}>
          <TrueFillSvg width={20} height={20} color={Colors.NorthTexasGreen} />
          <View style={styles.progressLine} />
          <View
            style={[
              styles.progressLine,
              {
                backgroundColor: isNull(startEndDate?.completedDate)
                  ? Colors.gray
                  : Colors.NorthTexasGreen,
              },
            ]}
          />
          {startEndDate?.completedDate ? (
            <TrueFillSvg
              width={20}
              height={20}
              color={Colors.NorthTexasGreen}
            />
          ) : null}
        </View>
        <View
          style={[
            styles.progressView,
            {justifyContent: 'space-between', marginTop: ms(6)},
          ]}>
          <View>
            <Text style={styles.progressTitle}>{strings.startedDate}</Text>
            <Text style={styles.progressSubTitle}>
              {startEndDate?.startDate
                ? moment(startEndDate?.startDate).format('DD-MM-YYYY')
                : '-'}
            </Text>
          </View>
          {startEndDate?.completedDate ? (
            <View style={{alignItems: 'flex-end'}}>
              <Text style={styles.progressTitle}>{strings.completedDate}</Text>
              <Text style={styles.progressSubTitle}>
                {startEndDate?.completedDate
                  ? moment(startEndDate?.completedDate).format('DD-MM-YYYY')
                  : '-'}
              </Text>
            </View>
          ) : (
            <Text style={styles.progressTitle}>{strings.inProgress}</Text>
          )}
        </View>
      </View>
      <MenuPopup
        visible={menuVisible}
        anchorRef={moreRef}
        items={menuItems}
        onClose={() => setMenuVisible(false)}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: ms(12),
    padding: ms(12),
    marginHorizontal: ms(20),
    marginBottom: ms(10),
    shadowColor: Colors.black,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    borderWidth: 1,
    borderColor: Colors.borderCl,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    width: ms(46),
    height: ms(46),
    borderRadius: ms(8),
    backgroundColor: Colors.imgBg,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  titleWrapper: {
    flex: 1,
    marginLeft: ms(10),
  },
  title: {
    ...typography._16SofticesBold,
    color: Colors.textCl,
  },
  statusText: {
    ...typography._14SofticesSemibold,
    marginLeft: ms(6),
  },
  dateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    ...typography._16SofticesSemibold,
    color: Colors.textCl,
    marginLeft: ms(4),
  },
  bottomRow: {
    flexDirection: 'row',
    marginTop: ms(16),
    justifyContent: 'space-between',
  },
  infoBox: {
    flex: 1,
    backgroundColor: Colors.infoBox,
    borderRadius: ms(8),
    padding: ms(10),
    flexDirection: 'row',
    // alignItems: 'flex-start',
  },
  label: {
    ...typography._16SofticesRegular,
    color: Colors.labelCl,
  },
  value: {
    ...typography._16SofticesSemibold,
    color: Colors.textCl,
  },

  progressView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressLine: {
    height: ms(2),
    backgroundColor: Colors.NorthTexasGreen,
    flex: 0.5,
  },
  progressTitle: {
    ...typography._14SofticesRegular,
    color: Colors.textLight,
  },
  progressSubTitle: {
    ...typography._14SofticesSemibold,
    color: Colors.textCl,
  },
});

export default CardProductionItem;
