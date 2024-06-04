import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import Todo from "../../assets/icons/ic_todo.png";
import TodoUn from "../../assets/icons/ic_todo-un.png";
import Plus from "../../assets/images/ic_plus.png";

import Calendar from "../../components/Calendar";
// import BottomSheet from "../../components/BottomSheet";
import TodoBottomSheet from "../../components/TodoBottomSheet";

function CalendarScreen() {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [bottomSheetEditVisible, setBottomSheetEditVisible] = useState(false);

  const onCloseBottomSheet = () => {
    console.log("BottomSheet Closed!");
  };

  const [mode, setMode] = useState(false); // false: commit mode, true: todo mode
  const [selectedDate, setSelectedDate] = useState(new Date());

  // temporary state
  const [commits, setCommits] = useState([
    { repository: "repository1", content: "hello world", elapsed: 60 },
    { repository: "repository2", content: "Update README.md", elapsed: 1200 },
    { repository: "repository3", content: "Delete .gitignore", elapsed: 120 },
    { repository: "repository4", content: "I'm working!", elapsed: 180 },
    { repository: "repository5", content: "Initialize", elapsed: 480 },
  ]);

  const categories = [
    { name: "category1", color: "#caec8f" },
    { name: "category2", color: "#fcca98" },
    { name: "category3", color: "#FFE195" },
  ];

  const [todos, setTodos] = useState([
    { category: 0, content: "할일 목록1", done: true },
    { category: 0, content: "끝내주게 숨쉬기", done: true },
    { category: 1, content: "끝내주는 저녁 먹기", done: false },
    { category: 1, content: "멋진 코딩하기", done: true },
    // { category: 2, content: "낮잠 안 자기", done: false },
  ]);

  const buildTodos = () => {
    const newTodos = {};

    todos.map((todo, i) => {
      if (todo.category in newTodos) {
        newTodos[todo.category].push({ ...todo });
      } else {
        newTodos[todo.category] = [{ ...todo }];
      }
    });

    return newTodos;
  };

  const formattedTodos = buildTodos();

  const onPressMode = () => {
    // if (mode) { getCommits(); }
    // else { getTodos(); }

    setMode(!mode);
  };

  const getCategories = async () => {
    // TODO: get categories from BE
  };

  const getCommits = async () => {
    // TODO: get commits from BE
    // selectedDate
    // setCommits
  };

  const getTodos = async () => {
    // TODO: get todos from BE
    // selectedDate
    // setTodos
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.body}>
        <Calendar
          mode={mode}
          setMode={onPressMode}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
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
                          backgroundColor: categories[cat].color,
                        }}
                      >
                        <Text style={styles.todoCategoryTxt}>
                          {categories[cat].name}
                        </Text>
                      </View>
                      <View stlye={styles.todoList}>
                        {formattedTodos[cat].map((todo, i) => {
                          return (
                            <View key={i} style={styles.todoLeft}>
                              <TouchableOpacity
                                onPress={() => {
                                  console.log("TODO: check vs. unchecked");
                                }}
                                activeOpacity={0.7}
                              >
                                <Image
                                  style={{
                                    width: 13,
                                    height: 13,
                                  }}
                                  source={todo.done ? Todo : TodoUn}
                                />
                                {/* <FontAwesome
                                  name={todo.done ? "check-square" : "square"}
                                  size={15}
                                  color={todo.done ? "#B66FFF" : "#efefef"}
                                /> */}
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => {
                                  setBottomSheetEditVisible(true);
                                }}
                                activeOpacity={0.8}
                              >
                                <Text style={styles.todoContentTxt}>
                                  {todo.content}
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

                      <Text style={styles.commitElapsed}>
                        {commit.elapsed} seconds ago
                      </Text>
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
        onClose={() => {
          console.log("Delete todo button pressed");
        }}
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
  commitElapsed: {
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
