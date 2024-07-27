import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Todo from "../../assets/icons/ic_todo.png";
import TodoUn from "../../assets/icons/ic_todo-un.png";
import Plus from "../../assets/images/ic_plus.png";

import Calendar from "../../components/Calendar";
import TodoBottomSheet from "../../components/TodoBottomSheet";
import { CALENDAR_API_SERVER } from "../../Config";

function CalendarScreen() {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [bottomSheetEditVisible, setBottomSheetEditVisible] = useState(false);

  const [mode, setMode] = useState(false); // false: commit mode, true: todo mode
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [selectedTodo, setSelectedTodo] = useState(null);
  const [selectedTodoCategory, setSelectedTodoCategory] = useState(null);

  const [commits, setCommits] = useState([]);

  const [categories, setCategories] = useState({});
  const [todos, setTodos] = useState([]);

  // Display
  const [days, setDays] = useState([]);
  const [fruitImageURLs, setFruitImageURLs] = useState([]);

  const buildTodos = () => {
    const newTodos = {};

    todos.map((todo, i) => {
      if (todo.todoCategory in newTodos) {
        newTodos[todo.todoCategory].push({ ...todo });
      } else {
        newTodos[todo.todoCategory] = [{ ...todo }];
      }
    });

    return newTodos;
  };

  const formattedTodos = buildTodos();

  const onPressMode = () => {
    setMode(!mode);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const getCategories = async () => {
    // get categories from BE
    try {
      const x_auth = await AsyncStorage.getItem("authToken");
      const url = `${CALENDAR_API_SERVER}/category`;

      await axios({
        method: "get",
        url: url,
        headers: { Authorization: `Bearer ${x_auth}` },
      })
        .then((response) => {
          const categoryList = response.data;

          // Format Categories
          const obj = {};
          categoryList.map((cat, i) => {
            obj[cat.categoryName] = {
              categoryName: cat.categoryName,
              categoryId: cat.categoryId,
              categoryColor: cat.categoryColor,
            };
          });

          setCategories(obj);
        })
        .catch((error) => {
          console.error("Error fetching calendar's categories:", error);
        });
    } catch (error) {
      // Handle errors related to AsyncStorage or other issues here
      console.error("Error in getCategories function:", error);
    }
  };

  const getCommits = async () => {
    // Tget commits from BE
    const date = formatDate(selectedDate);

    try {
      const x_auth = await AsyncStorage.getItem("authToken");
      const url = `${CALENDAR_API_SERVER}/commit?date=${date}`;

      await axios({
        method: "get",
        url: url,
        headers: { Authorization: `Bearer ${x_auth}` },
      })
        .then((response) => {
          setCommits(response.data);
        })
        .catch((error) => {
          console.error("Error fetching calendar's commit:", error);
        });
    } catch (error) {
      // Handle errors related to AsyncStorage or other issues here
      console.error("Error in getCommits function:", error);
    }
  };

  const getTodos = async () => {
    await getCategories();

    // get todos from BE
    const date = formatDate(selectedDate);

    try {
      const x_auth = await AsyncStorage.getItem("authToken");
      const url = `${CALENDAR_API_SERVER}/todo?date=${date}`;

      await axios({
        method: "get",
        url: url,
        headers: { Authorization: `Bearer ${x_auth}` },
      })
        .then((response) => {
          // console.log("todos:", response.data); // response.data: []
          setTodos(response.data);
        })
        .catch((error) => {
          console.error("Error fetching calendar's todo:", error);
        });
    } catch (error) {
      // Handle errors related to AsyncStorage or other issues here
      console.error("Error in getTodos function:", error);
    }
  };

  const completeTodo = async (todoId) => {
    // complete/Incomplete todo from BE
    try {
      const x_auth = await AsyncStorage.getItem("authToken");
      const url = `${CALENDAR_API_SERVER}/todo/${todoId}`;

      await axios({
        method: "put",
        url: url,
        headers: { Authorization: `Bearer ${x_auth}` },
      })
        .then((response) => {
          if (response.status === 200) {
            getTodos();
            getCalendar();
          }
        })
        .catch((error) => {
          console.error("Error fetching calendar's todo:", error);
        });
    } catch (error) {
      // Handle errors related to AsyncStorage or other issues here
      console.error("Error in getTodos function:", error);
    }
  };

  const getCalendar = async () => {
    const [year, month] = formatDate(selectedDate).split("-");
    const firstDate = `${year}-${month}-01`;

    try {
      const x_auth = await AsyncStorage.getItem("authToken");
      const url = `${CALENDAR_API_SERVER}?flag=${
        mode ? "todo" : "commit"
      }&date=${firstDate}`;

      await axios({
        method: "get",
        url: url,
        headers: { Authorization: `Bearer ${x_auth}` },
      })
        .then((response) => {
          // console.log(response.data.days);
          if (response.status === 200) {
            setDays(response.data.days);
            setFruitImageURLs(response.data.fruitImage);
          }
        })
        .catch((error) => {
          console.error("Error fetching calendar:", error);
        });
    } catch (error) {
      // Handle errors related to AsyncStorage or other issues here
      console.error("Error in getCalendar function:", error);
    }
  };

  useEffect(() => {
    if (mode) {
      // getCategories();
      getTodos();
    } else {
      getCommits();
    }
    getCalendar();
  }, [mode, selectedDate]);

  useFocusEffect(
    useCallback(() => {
      setMode(false);

      // Action to perform when the screen is focused
      getCommits();
      getCalendar();

      return () => {
        // Cleanup action if needed
        // action when the screen is unfocused
      };
    }, [])
  );

  const onCloseBottomSheet = () => {
    setSelectedTodo(null);
    setSelectedTodoCategory(null);
    getTodos();
    // getCategories();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.body}>
        <Calendar
          mode={mode}
          setMode={onPressMode}
          selectedDate={selectedDate}
          onSelectedDate={setSelectedDate}
          days={days}
          fruitImageURLs={fruitImageURLs}
        />
        <View style={{ flex: 1, width: "100%", paddingHorizontal: 24 }}>
          <Text
            style={{
              fontWeight: 800,
              fontSize: 16,
              textAlign: "left",
              marginBottom: 6,
            }}
          >
            {mode ? "Todos" : "Commits"}
          </Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: 4 }}
          >
            {mode
              ? Object.keys(formattedTodos).map((cat, i) => {
                  return (
                    <View key={i} style={styles.todo}>
                      <View
                        style={{
                          ...styles.todoCategory,
                          backgroundColor: categories[cat].categoryColor,
                        }}
                      >
                        <Text style={styles.todoCategoryTxt}>{cat}</Text>
                      </View>
                      <View stlye={styles.todoList}>
                        {formattedTodos[cat].map((todo, i) => {
                          return (
                            <View key={i} style={styles.todoLeft}>
                              <TouchableOpacity
                                onPress={() => {
                                  completeTodo(todo.todoId);
                                }}
                                activeOpacity={0.7}
                              >
                                <Image
                                  style={{
                                    width: 13,
                                    height: 13,
                                  }}
                                  source={todo.todoComplete ? Todo : TodoUn}
                                />
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => {
                                  setBottomSheetEditVisible(true);
                                  setSelectedTodo(todo);
                                  setSelectedTodoCategory(
                                    categories[todo.todoCategory]
                                  );
                                }}
                                activeOpacity={0.8}
                              >
                                <Text style={styles.todoContentTxt}>
                                  {todo.todoContent}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  );
                })
              : commits.map((commit, i) => {
                  return (
                    <View key={i} style={styles.commit}>
                      <View style={styles.commitLeft}>
                        <View style={styles.circle}></View>
                        <View style={styles.commitRepository}>
                          <Text style={styles.commitRepositoryTxt}>
                            {commit.repository}
                          </Text>
                        </View>
                        <Text style={styles.commitContentTxt}>
                          {commit.content}
                        </Text>
                      </View>

                      <Text style={styles.commitTime}>{commit.time}</Text>
                    </View>
                  );
                })}
          </ScrollView>
        </View>
        {mode ? (
          <TouchableOpacity
            onPress={() => {
              setBottomSheetVisible(true);
            }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 90,
              backgroundColor: "#292929",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              position: "absolute",
              bottom: 16,
              right: 30,

              // shadow
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.15,
              shadowRadius: 6,
            }}
            activeOpacity={0.8}
          >
            {/* <FontAwesome5 name="plus" size={36} color="white" /> */}
            <Image style={{ width: 36, height: 36 }} source={Plus} />
          </TouchableOpacity>
        ) : null}
      </View>
      <TodoBottomSheet
        visible={bottomSheetVisible}
        setVisible={setBottomSheetVisible}
        create={true}
        onClose={onCloseBottomSheet}
        date={selectedDate}
      />
      <TodoBottomSheet
        visible={bottomSheetEditVisible}
        setVisible={setBottomSheetEditVisible}
        create={false}
        todo={selectedTodo}
        category={selectedTodoCategory}
        onClose={onCloseBottomSheet}
        date={selectedDate}
      />
    </View>
  );
}

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    // backgroundColor: "skyblue",
  },
  body: {
    flex: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "lightyellow",
  },
  img: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
  },
  commit: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  commitLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 7,
    height: 7,
    backgroundColor: "#d9d9d9",
    borderRadius: 90,
  },
  commitRepository: {
    width: 50,
    hegiht: 12,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 22,
    marginRight: 12,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: "#efefef",
  },
  commitRepositoryTxt: { fontSize: 6 },
  commitContentTxt: {
    fontSize: 10,
    color: "black",
  },
  commitTime: {
    fontSize: 6,
    color: "#ababab",
  },
  todo: {
    marginVertical: 6,
  },
  todoCategory: {
    width: 66,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginBottom: 3,
  },
  todoCategoryTxt: {
    fontSize: 9,
    fontWeight: "700",
  },
  todoLeft: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginLeft: 10,
  },
  todoContentTxt: {
    fontSize: 11,
    marginLeft: 18,
  },
});
