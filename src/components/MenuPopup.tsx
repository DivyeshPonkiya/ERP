import React, {useEffect, useState} from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  findNodeHandle,
  UIManager,
  Dimensions,
  Platform,
} from 'react-native';
import {ms} from '../theme/spacing';
import {Colors} from '../theme/variables';
import {typography} from '../theme/typography';
import {ACTIVE_OPACITY} from '../constants/constants';

export interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  color?: string;
  onPress: () => void;
}

interface MenuPopupProps {
  visible: boolean;
  anchorRef: React.RefObject<any>;
  items: MenuItem[];
  onClose: () => void;
  MENU_WIDTH?: number;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

const MenuPopup: React.FC<MenuPopupProps> = ({
  visible,
  anchorRef,
  items,
  onClose,
  MENU_WIDTH = ms(150),
}) => {
  const [anchorPosition, setAnchorPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [menuLeft, setMenuLeft] = useState(0);

  useEffect(() => {
    if (visible && anchorRef?.current) {
      const handle = findNodeHandle(anchorRef.current);
      if (handle) {
        UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
          setAnchorPosition({x: pageX, y: pageY, width, height});
          // Calculate left position to keep menu inside screen
          let left = pageX;
          if (left + MENU_WIDTH > SCREEN_WIDTH - ms(8)) {
            left = SCREEN_WIDTH - MENU_WIDTH - ms(8); // 8px margin from right
          }
          if (left < ms(8)) left = ms(8); // 8px margin from left
          setMenuLeft(left);
        });
      }
    }
  }, [visible, anchorRef]);

  const topHeight =
    Platform.OS == 'ios'
      ? anchorPosition.y + anchorPosition.height + ms(4)
      : anchorPosition.y - ms(20);
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <View
            style={[
              styles.menu,
              {
                top: topHeight,
                left: menuLeft,
                minWidth: MENU_WIDTH,
              },
            ]}>
            {items.map((item, idx) => (
              <TouchableOpacity
                activeOpacity={ACTIVE_OPACITY}
                key={idx}
                style={styles.menuItem}
                onPress={() => {
                  onClose();
                  item.onPress();
                }}>
                {item.icon && <View style={styles.iconBox}>{item.icon}</View>}
                <Text
                  style={[
                    styles.menuText,
                    item.color ? {color: item.color} : undefined,
                  ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  menu: {
    position: 'absolute',
    minWidth: ms(100),
    backgroundColor: Colors.white,
    borderRadius: ms(12),
    paddingVertical: ms(8),
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: Colors.borderCl,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ms(10),
    paddingHorizontal: ms(18),
  },
  iconBox: {
    marginRight: ms(10),
  },
  menuText: {
    ...typography._16SofticesSemibold,
    color: Colors.textCl,
  },
});

export default MenuPopup;
