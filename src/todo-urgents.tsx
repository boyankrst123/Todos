import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator,StyleSheet , FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Card, Header, Image } from 'react-native-elements';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const UrgentTodos = ({navigation}:any) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  
  const getUrgentTodosList = async () => {
    const jsonValue = await AsyncStorage.getItem('user')
    const urgentTodos = jsonValue != null ? JSON.parse(jsonValue) : null;
    
    try {
     const todosUrgentList = [] as any;

     if(urgentTodos.length !== null) {
       // looping
       for ( var i = 0; i < urgentTodos.length; i++) {
         const todo = urgentTodos[i];
  
         // filling the empty Todos array with data
         todosUrgentList.push( {
           index: i,
           created: todo.created, 
           info: todo.description,
           urgent: todo.is_urgent,
           title: todo.title,
         });
       }
     }

     // Sorting  from low to high index value
     urgentTodos.sort((a:any, b:any) => (a.index > b.index) ? 1 : -1);

     setData(urgentTodos);
   } catch (error) {
     console.error(error);
   } finally {
     setLoading(false);
   }
 }

 const clearStorage = async () => {
  try {
    await AsyncStorage.clear()
    alert('Storage successfully cleared!')
    window.location.reload();
  } catch (e) {
    alert('Failed to clear the async storage.')
  }
}

  useEffect(() => {  
    getUrgentTodosList()
  }, []);;

  return (
      <ScrollView style={{ padding: 20}}>
        {data.length ?
          <View style={styles.headerMainContainer}>
            <Header
              centerComponent={{ text: 'top priority ', style: { color: '#fff' ,fontSize:32, fontWeight: 'bold' }}}
              containerStyle={styles.headerContainer}
            >
              <Image
                style={styles.logo}
                source={require('../assets/urgent.gif')}
              />
              <Image
                  style={styles.logo}
                  source={require('../assets/urgent.gif')}
                />
              <Image
                  style={styles.logo}
                  source={require('../assets/urgent.gif')}
                />
            </Header>
          </View>
       : <View/> 
      }
      {!data.length ?
        <Text>
          Currently you have 0 urgent todos  
        </Text> 
        : <View/>
      }
       {isLoading ? 
        <View style={[styles.spinnerContainer, styles.spinnerPosition]}>
          <ActivityIndicator size={150} color="#00ff00"/> 
        </View> 
        
      : (
        <View style={styles.urgentsContainer}>
           {data.length ?
            <TouchableOpacity style={styles.clearButtonContainer} onPress={clearStorage}>
              <View style={styles.clearButton}/>
              <View style={styles.clearIconContainer}>
                <FontAwesomeIcon icon={ faTrashAlt } size={ 32 }/>
              </View>
            </TouchableOpacity>
           : 
           <View/> 
           }
          <FlatList
            data={data}
            keyExtractor={({ id }, index,) => id}
            renderItem={({ item,index }) => (
              <TouchableOpacity
                onPress={() => {
              // TODO : Implement urgents details page here..
                }}
              >
                <Card containerStyle={styles.card}>
                  <Card.Title style={styles.cardTitle}> 
                    {item.title} 
                  </Card.Title>
                  <View>
                    <Text style={styles.cardText}>Created @ : {item.created}</Text>
                  </View>
                  <View style={styles.container}>
                    <Text numberOfLines={3} style={styles.headerText} ellipsizeMode='tail'>
                      {item.info}
                    </Text>
                  </View>
                  <Card.Divider/>
                  <View>
                    {/* change this to image dep on boolean ? */}
                    {/* <Text style={styles.cardText}>Urgent ? :   {item.urgent.toString()}</Text> */}
                  </View>
                </Card>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
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
    backgroundColor: '#c0c8d1',
    borderRadius: 30,
    fontSize:25,
    color: '#000033',
    width: '70%',
    alignSelf: 'center',

    shadowColor: '#c16666',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 20,
    marginBottom: 30
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  cardTitle: {
    fontSize:25,
    color: '#000033'
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e5e5e5",
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    padding: 10,
    fontWeight: "bold"
  },
  urgentImgContainer: {
    height : 50,
    alignSelf: 'flex-end',
  },
  urgentImg: {
    height : 50,
    width : 50,
  },
  headerContainer: {
    backgroundColor: '#c16666',
    height: 80,
    width: '100%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    justifyContent: 'space-around',
    shadowColor: 'red',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.6,
    shadowRadius: 25,
  },
  urgentsContainer: {
    borderTopWidth: 0,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: 'cornsilk',
    shadowColor: 'red',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.6,
    shadowRadius: 25,
  },
  clearIconContainer: {
    position: 'absolute',
    left: '50%',
    top: '25%'
  },
  clearButtonContainer: {
    borderBottomLeftRadius: 100,
    backgroundColor: '#3E9999',
    alignSelf: 'flex-end'
  },
  clearButton: {
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 100,
    borderTopWidth: 100,
    borderRightColor: "transparent",
    borderTopColor: "#3E9999",
    transform: [{ rotate: "90deg" }],
  },
  logo: {
    width: 66,
    height: 58,
  },
  headerMainContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  }
});

export default UrgentTodos;