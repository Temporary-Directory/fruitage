import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { FontAwesome6, AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";

import { CALENDAR_API_SERVER } from "../../Config";

import ToggleSwitch from "../ToggleSwitch";
import Empty from "../../assets/images/fruits/empty.png";
import Left from "../../assets/images/ic_left.png";
import Right from "../../assets/images/ic_right.png";

const Calendar = ({
  mode,
  setMode,
  selectedDate,
  onSelectedDate,
  days,
  fruitImageURLs,
}) => {
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [today, setToday] = useState(new Date()); // fixed real today date

  // 현재 월의 시작 "요일"
  const curMonthStartDay = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();
  // 현재 월의 마지막 "날짜"
  const curMonthEndDate = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  );
  // 이전 월의 마지막 "날짜"
  const prevMonthEndDate = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    0
  );
  // 다음 월의 첫번째 "날짜"
  const nextMonthStartDate = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    1
  );

  const onPrev = () => {
    var y = currentMonth.getFullYear();
    var m = currentMonth.getMonth();
    setCurrentMonth(new Date(y, m - 1, 1));
  };

  const onNext = () => {
    var y = currentMonth.getFullYear();
    var m = currentMonth.getMonth();
    setCurrentMonth(new Date(y, m + 1, 1));
  };

  const buildCalendarDays = () => {
    const days = Array.from({ length: curMonthStartDay }, (_, i) => {
      return new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        prevMonthEndDate.getDate() - i,
        0,
        0,
        0
      );
    }).reverse(); // 배열: 이전 월의 마지막 날짜 ~ 현재 월의 첫번째 날짜

    days.push(
      ...Array.from(
        { length: curMonthEndDate.getDate() },
        (_, i) =>
          new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            i + 1,
            0,
            0,
            0
          )
      )
    );

    // 무조건 6주차까지 표시되도록 만들기
    const remainingDays = 7 - (days.length % 7);
    if (remainingDays < 7) {
      days.push(
        ...Array.from(
          { length: remainingDays },
          (_, i) =>
            new Date(
              nextMonthStartDate.getFullYear(),
              nextMonthStartDate.getMonth(),
              i + 1,
              0,
              0,
              0
            )
        )
      );
    }

    const newDays = [];
    while (days.length) newDays.push(days.splice(0, 7));

    return newDays;
  };

  const calendarDays = buildCalendarDays();

  let fIndex = -1;
  const build1Week = (week, i) => {
    return (
      <View key={i} style={styles.week}>
        {week.map((date, i) => {
          if (days[date.getDate()]) {
            fIndex++;
          }

          return (
            <TouchableOpacity
              key={i}
              onPress={() => {
                onSelectedDate(date);
              }}
              style={styles.day}
              activeOpacity={0.9}
            >
              <View
                style={
                  date.getFullYear() === today.getFullYear() &&
                  date.getMonth() === today.getMonth() &&
                  date.getDate() == today.getDate()
                    ? { ...styles.dayTxtView, backgroundColor: "#333" }
                    : date.getFullYear() === selectedDate.getFullYear() &&
                      date.getMonth() === selectedDate.getMonth() &&
                      date.getDate() == selectedDate.getDate()
                    ? styles.dayTxtView
                    : { ...styles.dayTxtView, backgroundColor: "transparent" }
                }
              >
                <Text
                  style={
                    date.getFullYear() === today.getFullYear() &&
                    date.getMonth() === today.getMonth() &&
                    date.getDate() == today.getDate()
                      ? styles.todayTxt
                      : styles.dayTxt
                  }
                >
                  {date.getMonth() === currentMonth.getMonth()
                    ? date.getDate()
                    : " "}
                </Text>
              </View>
              <Image
                style={{
                  ...styles.img,
                  opacity: date.getMonth() !== currentMonth.getMonth() ? 0 : 1,
                  width: 38,
                  height: 38,
                }}
                source={
                  days[date.getDate()]
                    ? {
                        uri: fruitImageURLs[fIndex % fruitImageURLs.length],
                      }
                    : Empty
                } // 받아온 정보로 source만 변경
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.calendar}>
      <View style={styles.titleView}>
        <View style={styles.yearMonth}>
          {mode && (
            <TouchableOpacity onPress={onPrev} activeOpacity={0.6}>
              {/* <AntDesign name="left" size={24} color="#D9D9D9" /> */}
              <Image
                style={{
                  width: 24,
                  height: 24,
                }}
                source={Left}
              />
            </TouchableOpacity>
          )}
          <Text style={styles.titleTxt}>
            {currentMonth.getFullYear()}.
            {currentMonth.getMonth() + 1 < 10
              ? "0" + (currentMonth.getMonth() + 1).toString()
              : currentMonth.getMonth() + 1}
          </Text>
          {mode && (
            <TouchableOpacity onPress={onNext} activeOpacity={0.6}>
              {/* <AntDesign name="right" size={24} color="#D9D9D9" /> */}
              <Image
                style={{
                  width: 24,
                  height: 24,
                }}
                source={Right}
              />
            </TouchableOpacity>
          )}
        </View>
        <ToggleSwitch onToggle={() => setMode(!mode)} isOn={mode} />
      </View>
      <View style={styles.calendarBody}>
        <View style={styles.weekDays}>
          {daysOfWeek.map((d, i) => {
            return (
              <View
                key={i}
                style={{
                  width: 30,
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 0,
                  padding: 0,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: "#8e8e8e",
                  }}
                >
                  {d}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={styles.days}>
          {calendarDays.map((week, i) => {
            return build1Week(week, i);
          })}
        </View>
      </View>
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  calendar: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    //   backgroundColor: "skyblue",
  },
  titleView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 18,
    paddingRight: 24,
    marginBottom: 16,
    // backgroundColor: "tomato",
  },
  yearMonth: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleTxt: {
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: 1,
    marginHorizontal: 10,
  },
  calendarBody: {
    width: "100%",
    marginVertical: 10,
    // backgroundColor: "lime",
  },
  weekDays: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginTop: 4,
    marginBottom: 17,
    // backgroundColor: "pink",
    // borderWidth: 1,
  },
  week: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    // borderWidth: 1,
  },
  day: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 7,
    // backgroundColor: "#CAEC8F",
    // borderWidth: 1,
  },
  img: {
    marginTop: 4,
    marginBottom: 15,
    padding: 2,
  },
  dayTxtView: {
    width: 30,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: "#cdcdcd",
  },
  dayTxt: {
    fontSize: 12,
    textAlign: "center",
    color: "#333",
  },
  todayTxt: {
    fontSize: 12,
    textAlign: "center",
    color: "white",
  },
});
