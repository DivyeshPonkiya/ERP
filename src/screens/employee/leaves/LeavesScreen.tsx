import React, {useEffect, useMemo, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  RefreshControl,
  ActivityIndicator,
  Text,
} from 'react-native';
import ActionBar from '../../../components/ActionBar';
import {BackSvg, DropDownSvg} from '../../../assets/Images/svg';
import {goBack, navigate} from '../../../navigators/RootNavigation';
import {Colors} from '../../../theme/variables';
import SafeAreaWrapper from '../../../components/SafeAreaWrapper';
import {ms} from '../../../theme/spacing';
import SearchHeader from '../../../components/SearchHeader';
import {strings} from '../../../localization';
import {NAVIGATION} from '../../../constants/navigation';
import EmptyState from '../../../components/EmptyState';
import ReusableModal from '../../../components/ReusableModal';
import InputField from '../../../components/InputField';
import {useDispatch, useSelector} from 'react-redux';
import {urlEndPoint} from '../../../constants/urlEndPoint';
import {RootState} from '../../../store/store';
import ReusableFilterModal from '../../../components/ReusableFilterModal';
import {
  CFL,
  isNull,
  keyValueEmptyFilter,
  toastConst,
} from '../../../constants/constants';
import {typography} from '../../../theme/typography';
import SelectDropdown from '../../../components/SelectDropdown/SelectDropdown';
import WorksItem from './LeavesItem';

import {AppDispatch} from '../../../store/store';
import {fetchLeaves, fetchLeavesDelete} from '../../../createAsyncThunk/leavesThunk';
import {setDeleteLeavesData} from '../../../createSlice/leavesSlice';
import ToastMessage from '../../../components/ToastMessage';
import _ from 'lodash';

const WorksScreen = () => {
  const dispatch = useDispatch<AppDispatch>();

  const lastStepType = [
    {id: '', name: strings.all},
    {id: 'on', name: strings.yes},
  ];

  const activeType = [
    {id: '', name: strings.all},
    {id: 'on', name: strings.yes},
  ];

  const [
    LeavesListData,
    LeavesListLoading,

    DeleteLeavesData,
    DeleteLeavesLoading,
    error,
  ] = useSelector((state: RootState) => [
    
    state.leavesSlice.LeavesListData,
    state.leavesSlice.LeavesListLoading,

    state.leavesSlice.DeleteLeavesData,
    state.leavesSlice.DeleteLeavesLoading,

    state.leavesSlice.error,
  ]);

  const [visible, setVisible] = useState(false);
  const [period, setPeriod] = useState(new Date());
  const [worksList, setWorksList] = useState<any>(null);

  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>({id: 0});

  const [searchFiled, setSearchFiled] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [applyFilter, setApplyFilter] = useState(false);
  const [isFooterLoading, setFooterLoading] = useState(false);
  const [filterFormData, setFilterFormData] = useState({
    lastStepType: {name: strings.all, id: ''},
    activeType: {name: strings.all, id: ''},
  });

  useEffect(() => {
    dispatch(
      fetchLeaves({
        params: '',
        endPoint: urlEndPoint.works,
      }),
    );
  });

  useEffect(() => {
    if (error == 501) {
      setFooterLoading(false);
      setRefreshing(false);
      setApplyFilter(false);
      setWorksList([]);
    }
  }, [error]);

  useEffect(() => {
    if (!isNull(LeavesListData)) {
      const workList = LeavesListData?.works || [];
      setWorksList((prev: any = []) => {
        if (LeavesListData?.pagy?.current_page === 1) {
          return workList;
        } else if (LeavesListData?.pagy?.current_page > 1) {
          return [...prev, ...workList];
        } else {
          return workList ?? [];
        }
      });
      setFooterLoading(false);
      setRefreshing(false);
      setApplyFilter(false);
    }
  }, [LeavesListData]);

  useEffect(() => {
    if (DeleteLeavesData) {
      ToastMessage.set(toastConst.successToast, DeleteLeavesData?.message);
      dispatch(setDeleteLeavesData(null));

      setDeleteModal(false);
      setSelectedItem(null);
      const updatedList =
        worksList?.filter((item: any) => item.id !== selectedItem?.id) || [];
      setWorksList(updatedList);
    }
  }, [DeleteLeavesData]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const rawParams = {
        search: searchFiled,
        last_step: filterFormData.lastStepType.id,
        active: filterFormData.activeType.id,
      };
      const params = keyValueEmptyFilter(rawParams);
      if (!isNull(searchFiled)) {
        dispatch(
          fetchLeaves({
            params: params,
            endPoint: urlEndPoint.works,
          }),
        );
      }
    }, 500); // Adjust the debounce delay as needed

    return () => clearTimeout(delayDebounceFn);
  }, [searchFiled]);

  useEffect(() => {
    if (applyFilter) {
      const rawParams = {
        search: searchFiled,
        last_step: filterFormData.lastStepType.id,
        active: filterFormData.activeType.id,
      };

      const params = keyValueEmptyFilter(rawParams);

      dispatch(
        fetchLeaves({
          params: params,
          endPoint: urlEndPoint.works,
        }),
      );
    }
  }, [applyFilter]);

  const onEndReached = () => {
    if (isFooterLoading) {
      return;
    }
    const workListPage = LeavesListData?.pagy || {};
    if (workListPage?.total_pages > workListPage?.current_page) {
      const rawParams = {
        page: workListPage?.current_page + 1,
        search: searchFiled,
        last_step: filterFormData.lastStepType.id,
        active: filterFormData.activeType.id,
      };

      const params = keyValueEmptyFilter(rawParams);

      dispatch(
        fetchLeaves({
          params: params,
          endPoint: urlEndPoint.works,
        }),
      );
      setFooterLoading(true);
    }
  };

  const clearFilter = () => {
    setSearchFiled('');
    setFilterFormData({
      lastStepType: {name: strings.all, id: ''},
      activeType: {name: strings.all, id: ''},
    });
    setVisible(false);
    setApplyFilter(false);
    dispatch(
      fetchLeaves({
        endPoint: urlEndPoint.works,
      }),
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    setSearchFiled('');
    setFilterFormData({
      lastStepType: {name: strings.all, id: ''},
      activeType: {name: strings.all, id: ''},
    });
    dispatch(
      fetchLeaves({
        endPoint: urlEndPoint.works,
      }),
    );
  };

  const onDeleteCall = () => {
    dispatch(
      fetchLeavesDelete({
        endPoint: urlEndPoint.works + `/${selectedItem?.id}`,
      }),
    );
  };

  const renderFooter = () => {
    return (
      <>
        {isFooterLoading ? (
          <View style={{paddingVertical: ms(16)}}>
            <ActivityIndicator
              color={Colors.primary}
              size={'small'}
              animating={isFooterLoading}
            />
          </View>
        ) : null}
      </>
    );
  };

  const modalContent = useMemo(
    () => (
      <View>
        <Text
          style={[typography._16SofticesSemibold, {color: Colors.secondary}]}>
          {selectedItem ? selectedItem?.name : ''}
        </Text>
      </View>
    ),
    [deleteModal, selectedItem],
  ); // Add dependencies if needed

  const filterContent = () => {
    return (
      <>
        <InputField
          value={searchFiled}
          onChangeText={setSearchFiled}
          labelTxt={strings.search}
          placeholder={strings.search}
        />
        <SelectDropdown
          data={lastStepType}
          disabled={isNull(lastStepType)}
          buttonStyle={[styles.inputStyleAcc]}
          onSelect={(selectedItem: any, index: any) => {
            setFilterFormData({
              ...filterFormData,
              lastStepType: {name: selectedItem?.name, id: selectedItem?.id},
            });
          }}
          selectedRowTextStyle={{
            color: Colors.textCl,
            ...typography._14SofticesSemibold,
          }}
          rowTextStyle={{
            color: Colors.textCl,
            ...typography._14SofticesRegular,
          }}
          buttonTextAfterSelection={(selectedItem: any, index: any) => {
            return selectedItem?.name;
          }}
          rowTextForSelection={(item: any, index: any) => {
            return CFL(item?.name);
          }}
          renderCustomizedButtonChild={(selectedItem: any) => {
            return (
              <InputField
                value={filterFormData?.lastStepType.name}
                onChangeText={() =>
                  setFilterFormData({
                    ...filterFormData,
                    lastStepType: {name: '', id: ''},
                  })
                }
                labelTxt={strings.status}
                placeholder={strings.productionPlaceholder}
                editable={false}
                rightIcon={
                  <View style={{marginRight: ms(14)}}>
                    <DropDownSvg
                      height={22}
                      width={22}
                      color={Colors.textLight}
                    />
                  </View>
                }
              />
            );
          }}
        />

        <SelectDropdown
          data={activeType}
          disabled={isNull(activeType)}
          buttonStyle={[styles.inputStyleAcc]}
          onSelect={(selectedItem: any, index: any) => {
            setFilterFormData({
              ...filterFormData,
              activeType: {name: selectedItem?.name, id: selectedItem?.id},
            });
          }}
          selectedRowTextStyle={{
            color: Colors.textCl,
            ...typography._14SofticesSemibold,
          }}
          rowTextStyle={{
            color: Colors.textCl,
            ...typography._14SofticesRegular,
          }}
          buttonTextAfterSelection={(selectedItem: any, index: any) => {
            return selectedItem?.name;
          }}
          rowTextForSelection={(item: any, index: any) => {
            return CFL(item?.name);
          }}
          renderCustomizedButtonChild={(selectedItem: any) => {
            return (
              <InputField
                value={filterFormData?.activeType.name}
                onChangeText={() =>
                  setFilterFormData({
                    ...filterFormData,
                    activeType: {name: '', id: ''},
                  })
                }
                labelTxt={strings.active}
                placeholder={strings.productionPlaceholder}
                editable={false}
                rightIcon={
                  <View style={{marginRight: ms(14)}}>
                    <DropDownSvg
                      height={22}
                      width={22}
                      color={Colors.textLight}
                    />
                  </View>
                }
              />
            );
          }}
        />
      </>
    );
  };

  return (
    <SafeAreaWrapper
      isLoading={worksList == null ? true : false}
      statusBg={Colors.primary}
      style={styles.container}
      barStyle="light-content">
      <ActionBar
        title={strings.works}
        LeftIcon={<BackSvg width={28} height={28} color={Colors.white} />}
        onLeftPress={() => goBack()}
        onRightPress={() => navigate(NAVIGATION.AddWorks)}
      />

      <SearchHeader
        onChangeText={(text: string) => {
          setSearchFiled(text);
        }}
        onFilterPress={() => setVisible(true)}
        value={searchFiled}
        mainStyle={{margin: ms(20)}}
      />

      <FlatList
        data={worksList || []}
        showsVerticalScrollIndicator={false}
        bounces={true}
        onEndReached={() => {
          onEndReached();
        }}
        onEndReachedThreshold={0.1}
        removeClippedSubviews={true} // removes off-screen items
        initialNumToRender={5} // render only a few initially
        maxToRenderPerBatch={10} // controls the batch rendering size
        keyExtractor={(item: any, index: any) => `${item.id}`}
        refreshControl={
          <RefreshControl
            enabled={true}
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        }
        renderItem={({item}) => (
          <WorksItem
            item={item}
            onPress={() => navigate(NAVIGATION.WorksDetail, {workData: item})}
            deleteModal={() => {
              setDeleteModal(true), setSelectedItem(item);
            }}
          />
        )}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          <EmptyState
            title={strings.noDataFound}
            description={strings.noDataFoundDes}
          />
        }
      />

      <ReusableModal
        visible={deleteModal}
        cancelLabel={strings.cancel}
        submitLabel={strings.delete}
        submitBgColor={Colors.colorRedD4}
        isLoading={DeleteLeavesLoading}
        title={strings.delete}
        description={strings.deleteConf}
        onClose={() => setDeleteModal(false)}
        onSubmit={() => onDeleteCall()}>
        {modalContent}
      </ReusableModal>
      <ReusableFilterModal
        visible={visible}
        onClose={() => setVisible(false)}
        onApply={() => {
          setVisible(false);
          setApplyFilter(true);
        }}
        onClear={() => {
          clearFilter();
        }}
        period={period}
        isLoading={LeavesListLoading}
        onPeriodChange={setPeriod}>
        {filterContent()}
      </ReusableFilterModal>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  activeBtnView: {
    borderWidth: ms(1),
    borderColor: Colors.borderCl,
    borderRadius: ms(10),
    marginBottom: ms(16),
    padding: ms(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    color: Colors.textCl,
    ...typography._16SofticesSemibold,
  },
  inputStyleAcc: {
    width: '100%',
  },
});

export default WorksScreen;
