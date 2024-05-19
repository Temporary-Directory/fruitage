import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import ToggleSwitch from "../ToggleSwitch";

const Calendar = ({ mode, setMode, selectedDate, setSelectedDate }) => {
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

  const build1Week = (week, i) => {
    return (
      <View key={i} style={styles.week}>
        {week.map((date, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={() => {
                setSelectedDate(date);
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
              <AntDesign
                name="apple1"
                size={35}
                color="#B66FFF"
                style={{
                  ...styles.img,
                  opacity: date.getMonth() !== currentMonth.getMonth() ? 0 : 1,
                }}
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
          <TouchableOpacity onPress={onPrev} activeOpacity={0.6}>
            <AntDesign name="left" size={24} color="#D9D9D9" />
          </TouchableOpacity>
          <Text style={styles.titleTxt}>
            {currentMonth.getFullYear()}.
            {currentMonth.getMonth() + 1 < 10
              ? "0" + (currentMonth.getMonth() + 1).toString()
              : currentMonth.getMonth() + 1}
          </Text>
          <TouchableOpacity onPress={onNext} activeOpacity={0.6}>
            <AntDesign name="right" size={24} color="#D9D9D9" />
          </TouchableOpacity>
        </View>
        <ToggleSwitch onToggle={() => setMode(!mode)} isOn={mode} />
      </View>
      <View style={styles.calendarBody}>
        <View style={styles.weekDays}>
          {daysOfWeek.map((d, i) => {
            return (
              <Text key={i} style={{ fontSize: 12, color: "#8e8e8e" }}>
                {d}
              </Text>
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
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "skyblue",
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
    // backgroundColor: "lavender",
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
  },
  day: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 7,
    //   backgroundColor: "#CAEC8F",
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
