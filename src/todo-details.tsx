import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card, } from 'react-native-elements';
        
const TodoDetails = ({details}:any) => {
  return (
    <ScrollView style={{ padding: 20}}>
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.cardTitle}> 
          {details.title} 
        </Card.Title>
        <View>
          <Text style={styles.cardText}>Created @ : {details.created}</Text>
        </View>
        <View style={styles.container}>
          <Text  style={styles.infoText}>
            {details.info}
          </Text>
        </View>
        <Card.Divider/>
        {/* change this to image depending on boolean ? */}
        {/* <View>
          <Text style={styles.cardText}>Urgent ? :   {details.urgent.toString()}</Text>
        </View> */}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  spinnerPosition: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  newsList: {
    paddingBottom: 620,
  },
  card: {
    borderWidth:10,
    borderColor: '#f8e4a8',
    backgroundColor: '#c0c8d1',
    borderRadius: 30,
  },
  cardTitle: {
    fontSize:25,
    color: '#000033'
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e5e5e5",
  },
  infoText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    padding: 10,
    fontWeight: "bold"
  },
});

export default TodoDetails;