import { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet,Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Ionicons from "react-native-vector-icons/Ionicons";



export default function ChangeSessionTime({ durationOptions, setSessionData }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View  >
        <View style={styles.lengthbox}>
          <TouchableOpacity
            onPress={() =>
              setModalVisible(modalVisible=>!modalVisible)
            }
          >
            <Text style={styles.changeLength}>Set Length <Ionicons name="ios-stopwatch-outline" color={"white"} size={24} /></Text>
            
          </TouchableOpacity>
        </View>
        <View style={{marginTop:"50%",alignSelf:"center"}}>
        <Modal  animationType="slide"       
              transparent={true}     
                 visible={modalVisible}          
                    onRequestClose={() => {            
                         Alert.alert("Modal has been closed.");               setModalVisible(!modalVisible);             }}           > 
          <Picker
            // style={{ }}
            itemStyle={{ backgroundColor: "black", color: "white", fontSize:17 }} 
            onValueChange={(itemValue) => {
              setModalVisible(false);
              setSessionData((currentSession) => {
                return { ...currentSession, currentDuration: itemValue * 60 };
              });
            }}
          >
            {durationOptions.map((number) => {
              return (
                <Picker.Item
                  
                  label={`${number}`}
                  value={`${number}`}
                  key={`${number}`}
                ></Picker.Item>
              );
            })}
          </Picker>
          </Modal>
          </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  changeLength: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 5,
    flexDirection:"row",
    width:"100%"
  },
  lengthbox: {
    justifyContent:"center",
    alignItems:"center",
    margin: "20%",
    width: "60%",
    padding: 15,


  },
});
