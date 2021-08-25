import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";
import axios from "axios";
import moment from "moment";

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

  const date = moment().format("MMMM YYYY");

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
          <Text
            style={{
              color: "white",
              paddingBottom: 30,
              fontSize: 50,
            }}
          >
            {date}
          </Text>
          <Text
            style={{
              color: "white",
              paddingTop: 10,
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
