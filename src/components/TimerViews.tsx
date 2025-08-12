import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
import {typography} from '../theme/typography';
import {Colors} from '../theme/variables';
import {hs, ms, vs} from '../theme/spacing';
import {strings} from '../localization';

interface CountdownTimerProps {
  setCountFinish: () => void;
  durationInSeconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  setCountFinish,
  durationInSeconds,
}) => {
  const [remainingSeconds, setRemainingSeconds] =
    useState<number>(durationInSeconds);
  const [countdownComplete, setCountdownComplete] = useState<boolean>(true);

  useEffect(() => {
    if (countdownComplete && remainingSeconds !== 0) {
      const interval = setInterval(() => {
        setRemainingSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [countdownComplete, remainingSeconds]);

  useEffect(() => {
    if (remainingSeconds === 0) {
      setCountdownComplete(false);
      setCountFinish();
    }
  }, [remainingSeconds, setCountFinish]);

  const formatTime = (remSeconds: number): string => {
    const hours = Math.floor(remSeconds / 3600);
    const minutes = Math.floor((remSeconds % 3600) / 60);
    const seconds = remSeconds % 60;

    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedMinutes} : ${formattedSeconds}`;
  };

  return (
    <Text style={styles.textStyle}>
      <Text style={{color: Colors.textCl, ...typography._16SofticesRegular}}>
        {strings.resendIn}
      </Text>
      {formatTime(remainingSeconds)}
    </Text>
  );
};

const CountdownDateTimer: React.FC<CountdownTimerProps> = ({
  setCountFinish,
  durationInSeconds,
}) => {
  const [remainingSeconds, setRemainingSeconds] =
    useState<number>(durationInSeconds);
  const [countdownComplete, setCountdownComplete] = useState<boolean>(true);

  useEffect(() => {
    if (countdownComplete && remainingSeconds !== 0) {
      const interval = setInterval(() => {
        setRemainingSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [countdownComplete, remainingSeconds]);

  useEffect(() => {
    if (remainingSeconds === 0) {
      setCountdownComplete(false);
      setCountFinish();
    }
  }, [remainingSeconds, setCountFinish]);

  const formatTime = (remSeconds: number): string => {
    const days = Math.floor(remSeconds / 86400);
    const hours = Math.floor((remSeconds % 86400) / 3600);
    const minutes = Math.floor((remSeconds % 3600) / 60);
    const seconds = remSeconds % 60;

    const formattedDays = days.toString().padStart(2, '0');
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedDays}:${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };
  const dateTime = formatTime(remainingSeconds);
  return (
    <View style={styles.countDownContainer}>
      <View style={styles.countDownView}>
        <View style={styles.countDownTimeSet}>
          <Text style={styles.countDownTimeText}>{dateTime.slice(0, 2)}</Text>
        </View>
        <Text style={styles.countDownIndicatorText}>{strings.day}</Text>
      </View>
      <View style={styles.countDownView}>
        <View style={styles.countDownTimeSet}>
          <Text style={styles.countDownTimeText}>{dateTime.slice(3, 5)}</Text>
        </View>
        <Text style={styles.countDownIndicatorText}>{strings.hours}</Text>
      </View>
      <View style={styles.countDownView}>
        <View style={styles.countDownTimeSet}>
          <Text style={styles.countDownTimeText}>{dateTime.slice(6, 8)}</Text>
        </View>
        <Text style={styles.countDownIndicatorText}>{strings.minutes}</Text>
      </View>
      <View style={styles.countDownView}>
        <View style={styles.countDownTimeSet}>
          <Text style={styles.countDownTimeText}>{dateTime.slice(9, 11)}</Text>
        </View>
        <Text style={styles.countDownIndicatorText}>{strings.seconds}</Text>
      </View>
    </View>
  );
};

const CountdownDateTimerNull = () => {
  return (
    <View style={styles.countDownContainer}>
      <View style={styles.countDownView}>
        <View style={styles.countDownTimeSet}>
          <Text style={styles.countDownTimeText}>00</Text>
        </View>
        <Text style={styles.countDownIndicatorText}>{strings.day}</Text>
      </View>
      <View style={styles.countDownView}>
        <View style={styles.countDownTimeSet}>
          <Text style={styles.countDownTimeText}>00</Text>
        </View>
        <Text style={styles.countDownIndicatorText}>{strings.hours}</Text>
      </View>
      <View style={styles.countDownView}>
        <View style={styles.countDownTimeSet}>
          <Text style={styles.countDownTimeText}>00</Text>
        </View>
        <Text style={styles.countDownIndicatorText}>{strings.minutes}</Text>
      </View>
      <View style={styles.countDownView}>
        <View style={styles.countDownTimeSet}>
          <Text style={styles.countDownTimeText}>00</Text>
        </View>
        <Text style={styles.countDownIndicatorText}>{strings.seconds}</Text>
      </View>
    </View>
  );
};

export {CountdownTimer, CountdownDateTimer, CountdownDateTimerNull};

const styles = StyleSheet.create({
  countDownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: vs(18),
  },
  countDownView: {
    alignItems: 'center',
    marginHorizontal: hs(11),
  },
  countDownTimeSet: {
    height: ms(54),
    width: ms(54),
    borderRadius: ms(27),
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: hs(3),
          height: vs(3),
        },
        shadowOpacity: ms(0.2),
      },
      android: {
        elevation: 5,
      },
    }),
  },
  countDownTimeText: {
    ...typography._18SofticesSemibold,
    color: Colors.primary,
  },
  countDownIndicatorText: {
    marginTop: vs(6),
    ...typography._14SofticesMedium,
    color: Colors.textCl,
  },
  textStyle: {
    ...typography._16SofticesSemibold,
    color: Colors.primary,
    textAlign: 'right',
  },
});
