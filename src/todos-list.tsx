import React, { useEffect, useState } from 'react';
import { 
  ActivityIndicator, 
  FlatList, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Card, Header } from 'react-native-elements';
import TodoDetails from './todo-details';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UrgentTodos from './todo-urgents';

const Todos = ({navigation}:any) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  
  const Stack = createNativeStackNavigator();

  const customData = require('../data_bg.json');
  const todosList = [] as any;
  //TODO en json 
  const customDataEN = require('../data_en.json');
  const todosListEN = [] as any;
  
 const saveData = async (item: any) => {
  console.log(item)    
    try {
        let urgents = await AsyncStorage.getItem('user') || '[]';
        let newProduct = JSON.parse(urgents);
        if( !newProduct ){
          newProduct = [] as any
        }
        const isNotUrgent = newProduct.findIndex((x: { index: number; }) => x.index === item.index);

        // perform a check to see if TODO is urgent, before populating the array
        if(isNotUrgent === -1) {
          newProduct.push( {
            index: item.index,
            created: item.created, 
            info: item.info,
            urgent: 'true',
            title: item.title,
          })
        }

        await AsyncStorage.setItem('user', JSON.stringify(newProduct))
        .then( ()=>{
          console.log('It was saved successfully');
          alert('You pinend this to URGENT !');
          window.location.reload();
        } )

    } catch (e) {
      console.log('There was an error saving the product')
    }  
  }
  
  const getTodosList = async () => {
     try {
      // TODO : load EN JSON like the rest of the code here 
      // depending on a variable (probably a button for switching language)  
      
      // looping
      for ( var i = 0; i < customData.todos.length; i++) {
        const todo = customData.todos[i];
        
        const test =todo.created_at.toString();
        const date = new Date(parseInt(test.substring(0, 13)));

        const dateFormatted = new Intl.DateTimeFormat("en-GB", {
          year: "numeric",
          month: "long",
          day: "2-digit"
        }).format(date)

        // filling the empty Todos array with data
        todosList.push( {
          index: i,
          created: dateFormatted, 
          info: todo.description,
          urgent: "false",
          title: todo.title,
        });
      }

      // TODO : sort todosList by date
      setData(todosList);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getTodosList();
  }, []);;

  function TodosList({navigation}:any) {
    return (
      <ScrollView >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Header
            centerComponent={{ text: 'ALL todos here...', style: { color: '#fff' ,fontSize:29, fontWeight: 'bold' }}}
            containerStyle={{
              backgroundColor: '#a5d6a7',
              height: 70,
              width: '100%',
              borderWidth: 10,
              borderColor: '#f8e4a8',
              justifyContent: 'space-around',
            }}
          />
        </View>
       {isLoading ? 
        <View style={[styles.spinnerContainer, styles.spinnerPosition]}>
          <ActivityIndicator size={150} color="#00ff00"/> 
        </View> 
       : (
         // In case there are urgents display them in All screen, as well
        <View style={{padding: 20}}>
          {data.length ?
            <UrgentTodos/>
            :<View/>
          }
        {/* Render todos */}
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => index.toString()}
          renderItem={({ item,index }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Details', {
                  index: index,
                  title: item.title,
                  created: item.created, 
                  info: item.info,
                  urgent: item.urgent,
                });
              }}
            >
              <Card containerStyle={styles.card}>
                <TouchableOpacity
                  onPress={() => {
                    saveData(item);
                  }}
                >
                  <View style={styles.urgentImgContainer}>
                    <Card.Image style={styles.urgentImg} source={require('../urgent.png')}/>
                  </View>
               </TouchableOpacity>
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
                  {/* TODO ! add image here depending on the boolean in item.urgent */}
                   {/* <Text style={styles.cardText}>Urgent  :   {item.urgent}</Text> */}
                </View>
              </Card>
            </TouchableOpacity>
          )}
        />
        </View>
      )}   
     </ScrollView>
    );
  }
  
  function TodoDetailsPage(route:any) {
    const details = route.route.params;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Header
          centerComponent={{ text: 'Todo Details', style: { color: '#fff' ,fontSize:29, fontWeight: 'bold' }}}
          containerStyle={{
            backgroundColor: '#a5d6a7',
            height: 70,
            width: '100%',
            borderWidth: 10,
            borderColor: '#f8e4a8',
            justifyContent: 'space-around',
          }}
        />
        <TodoDetails details={details} />
      </View>
    );
  }
  
// Navigation
  return (
    <Stack.Navigator>
      <Stack.Screen name="All Todos" component={TodosList} />
      <Stack.Screen name="Details" component={TodoDetailsPage} />
    </Stack.Navigator>
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
  card: {
    backgroundColor: '#c0c8d1',
    borderRadius: 30,
    shadowColor: '#a5d6a7',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 20,
 
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
  box: {
    height: 100,
    width: 'auto',
    zIndex: 1,
    backgroundImage: "linear-gradient(180deg, rgba(34,193,195,1) 0%, rgba(54,198,182,1) 12%, rgba(253,250,45,0) 100%)"
  },
});

export default Todos;