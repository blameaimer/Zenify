import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  Alert,
} from "react-native";
import { useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";

const AddTask = (props) => {
  const [inputText, setInputText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const changeHandler = (val) => {
    setInputText(val);
  };

  const { addTask } = props;
  return (
    <View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Feather name="x" color={"black"} size={20} />
              </TouchableOpacity>
              <Text style={styles.textStyle}>Type in your new task!</Text>

              <TextInput
                style={styles.input}
                placeholder="Practice on 1337code"
                onChangeText={changeHandler}
                value={inputText}
              ></TextInput>
              <TouchableOpacity
                onPress={() => {
                  addTask(inputText);
                  setInputText("");
                  Alert.alert("Task has been added to the list!");
                  setModalVisible(!modalVisible);
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Add Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>All Tasks</Text>
        <TouchableOpacity
          style={styles.plusbutton}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <AntDesign name="pluscircle" color={"#008bbe"} size={45} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  closeButton: { alignSelf: "flex-end" },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    paddingLeft: 10,
    paddingTop: 20,
    fontWeight: "700",
    color: "#8899A6",
  },
  plusbutton: {
    paddingTop: 5,
    alignSelf: "flex-end",
    margin: 15,
  },
  modalView: {
    margin: 10,
    backgroundColor: "#22303C",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  input: {
    margin: 10,
    paddingVertical: 6,
    borderBottomWidth: 1,
    color: "white",
    backgroundColor: "#8899A6",
    paddingHorizontal: 70,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#121212",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#8899A6",
    fontWeight: "700",
    fontSize: 16,
  },
});
