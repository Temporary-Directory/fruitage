import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";

import Calendar from "../../components/Calendar";

function CalendarScreen() {
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
      <View style={styles.header}>
        {/* <TouchableOpacity onPress={onClose} activeOpacity={0.5}>
          <AntDesign name="close" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressEdit} activeOpacity={0.5}>
          <MaterialIcons
            name={edit ? "save" : "edit"}
            size={24}
            color="black"
          />
        </TouchableOpacity> */}
      </View>
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
              marginBottom: 8,
            }}
          >
            {mode ? "Todos" : "Commits"}
          </Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            // style={{ marginBottom: 50 }}
          >
            {mode
              ? Object.keys(formattedTodos).map((cat, i) => {
                  return (
                    <View style={styles.todo}>
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
                            <TouchableOpacity
                              style={styles.todoLeft}
                              activeOpacity={0.8}
                            >
                              <FontAwesome
                                name={todo.done ? "check-square" : "square"}
                                size={14}
                                color={todo.done ? "#B66FFF" : "#efefef"}
                              />
                              <Text style={styles.todoContentTxt}>
                                {todo.content}
                              </Text>
                            </TouchableOpacity>
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
                        <FontAwesome name="circle" size={10} color="#d9d9d9" />
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
              console.log("Let's create new todo!");
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
              bottom: 96,
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
            <FontAwesome5 name="plus" size={36} color="white" />
          </TouchableOpacity>
        ) : null}
      </View>
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
    //     backgroundColor: "skyblue",
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
    marginVertical: 8,
  },
  commitLeft: {
    flexDirection: "row",
  },
  commitRepository: {
    width: 50,
    hegiht: 12,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 22,
    marginRight: 12,
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
    marginVertical: 8,
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
    fontWeight: "600",
  },
  todoLeft: {
    flexDirection: "row",
    marginTop: 8,
    marginLeft: 10,
  },
  todoContentTxt: {
    fontSize: 10,
    marginLeft: 18,
  },
});
