import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";
import axios from "axios";
import moment from "moment";
import RNPickerSelect from "react-native-picker-select";

export default function App() {
  const [plusEuro, setPlusEuro] = useState(0);
  const [plusYen, setPlusYen] = useState(0);
  const [minusEuro, setMinusEuro] = useState(0);
  const [minusYen, setMinusYen] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [plusOrMinus, setPlusOrMinus] = useState("");
  const [euro, setEuro] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [euroOrYen, setEuroOrYen] = useState("euro");
  const [dateList, setDateList] = useState([{ label: "a", value: "a" }]);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("MMMM YYYY")
  );

  const date = moment().format("MMMM YYYY");

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:3001");

      setPlusEuro(res.data.plusEuro[0].sum);
      setPlusYen(res.data.plusYen[0].sum);
      setMinusEuro(res.data.minusEuro[0].sum);
      setMinusYen(res.data.minusYen[0].sum);
    };

    fetch();
  }, [submitted]);

  useEffect(() => {
    let isMounted = true;

    const fetch = async () => {
      const res = await axios.get("http://localhost:3001/date");

      const result = [];

      for (const x of res.data.date) {
        if (!result.includes(x.date) && x.date !== date) {
          result.push(x.date);
        }
      }

      if (isMounted) {
        setDateList(
          result.map((date) => {
            return { label: date, value: date };
          })
        );
      }
    };

    fetch();

    return () => {
      isMounted = false;
    };
  }, [submitted]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `http://localhost:3001/selectedDate?selectedDate=${selectedDate}`
      );

      setPlusEuro(res.data.plusEuro[0].sum);
      setPlusYen(res.data.plusYen[0].sum);
      setMinusEuro(res.data.minusEuro[0].sum);
      setMinusYen(res.data.minusYen[0].sum);
    };

    fetch();
  }, [selectedDate]);

  const submit = async () => {
    if (plusOrMinus === "") {
      Alert.alert("plus or minus", "My Alert Msg", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } else if (euro === 0) {
      Alert.alert("Euro", "My Alert Msg", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }

    const res = await axios.get("http://localhost:3001/yen");

    const yen = res.data.yen * euro;

    const post = async () => {
      await axios.post("http://localhost:3001", {
        date,
        plusOrMinus,
        euro,
        yen,
      });
    };

    post();
  };

  return (
    // <>
    <View style={styles.container}>
      {!clicked ? (
        <>
          <Button
            onPress={() => {
              euroOrYen === "euro" ? setEuroOrYen("yen") : setEuroOrYen("euro");
            }}
            title="euro/yen"
            color="silver"
          />
          <RNPickerSelect
            style={pickerSelectStyles}
            placeholder={{ label: date, value: date }}
            onValueChange={(value) => setSelectedDate(value)}
            items={dateList}
          />
          <Text
            style={{
              color: "white",
              paddingTop: 30,
              paddingBottom: 10,
              fontSize: 30,
            }}
          >
            + {euroOrYen === "euro" ? ` € ${plusEuro}` : ` ¥ ${plusYen}`}
          </Text>
          <Text style={{ color: "white", paddingBottom: 10, fontSize: 30 }}>
            - {euroOrYen === "euro" ? ` € ${minusEuro}` : ` ¥ ${minusYen}`}
          </Text>
          <Text style={{ color: "white", paddingBottom: 10, fontSize: 30 }}>
            TOTAL{" "}
            {euroOrYen === "euro"
              ? ` € ${plusEuro - minusEuro}`
              : ` ¥ ${plusYen - minusYen}`}
          </Text>
          <Button
            onPress={() => setClicked(!clicked)}
            title="ADD"
            color="silver"
          />
        </>
      ) : (
        <>
          <Button
            onPress={() => setClicked(!clicked)}
            title="HOME"
            color="silver"
          />
          <View style={{ flexDirection: "row", paddingTop: 30 }}>
            <Text style={{ color: "white", fontSize: 30, marginRight: 10 }}>
              How much?
            </Text>
            <Button
              title="+"
              onPress={() => setPlusOrMinus("+")}
              color="silver"
            />
            <Button
              title="-"
              onPress={() => setPlusOrMinus("-")}
              color="silver"
            />
            <TextInput
              style={styles.input}
              onChangeText={(num) => setEuro(num)}
              placeholder="€"
              keyboardType="numeric"
            />
          </View>
          <Button
            title="SUBMIT"
            onPress={async () => {
              await submit();
              setPlusOrMinus("");
              setEuro(0);
              setSubmitted(!submitted);
            }}
            color="silver"
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "white",
    color: "white",
    fontSize: 20,
    marginLeft: 10,
    top: -10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 50,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "silver",
    borderRadius: 4,
    color: "white",
    paddingRight: 30, // to ensure the text is never behind the icon
    marginTop: 30,
    textAlign: "center",
  },
  inputAndroid: {
    fontSize: 50,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "silver",
    borderRadius: 8,
    color: "white",
    paddingRight: 30, // to ensure the text is never behind the icon
    marginTop: 30,
    textAlign: "center",
  },
});
