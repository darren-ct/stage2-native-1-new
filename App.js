import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import { useState } from 'react';
import Buttons from './components/Buttons';
import {buttons,ops} from "./helpers/index";

export default function App() {

  const[display,setDisplay] = useState("");
  const[result,setResult] = useState();

  const onChange = (val) => {

    // First filter
    if( ops.includes(val) && display.length === 0){
      return;
    }

    // Syntax filter
    if( ops.includes(val) && display[display.length - 1] === "%"){
      return setDisplay(prev => prev + val);
    };

    if( ops.includes(val) && ops.includes(display[display.length - 1]) ){
      return;
    };
    
    if(val === "%" ) return setDisplay(prev => prev + "/100");

    setDisplay(prev => prev + val);
  };

  const onDelete = () => {
    setDisplay("");
    setResult(null)
  };

  const onRemove = () => {
      setDisplay(prev => prev.slice(0,prev.length - 1))
  };

  const calculate = () => {

    try {
    const finalResult = eval(display);

    setResult(finalResult);
    setDisplay(finalResult.toString()) 
  
    }catch(err){
 
      setResult("Error");
      setDisplay("");
    }

  }


  const renderItem = (itemData) => {
      const order = itemData.index + 1;

      if(order === 11){
        return <Buttons content={"%"} fn={onChange.bind(this,itemData.item)} styling="ops"/>
      }

       if(order === 12){
          return <Buttons content={itemData.item} fn={calculate} styling="ops"/>
       };

       if(order === 3 || order === 4 || order === 7 || order === 8 || order === 11){
          return  <Buttons content={itemData.item} fn={onChange.bind(this,itemData.item)} styling="ops"/>
       };

       if(order === 17){
        return <Buttons content={itemData.item} fn={onDelete} styling="ops" />
       };

       if(order === 18){
        return <Buttons content={itemData.item} fn={onRemove} styling="ops"/>
       }

       return <Buttons content={itemData.item} fn={onChange.bind(this,itemData.item)} styling="number"/>


  };


  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Display</Text>
      
      <View style={styles.display}>
          <Text>{display}</Text>
      </View>

      <View style={styles.result}>
           <Text style={styles.res}>Result:</Text>
           <Text style={styles.res}>{result}</Text>
      </View>

      
      <FlatList data={buttons} numColumns={4} keyExtractor={(item,index)=> index} renderItem={renderItem}/>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFA0A0',
    alignItems: 'center',
    borderWidth: 1,
    paddingTop:64,
    paddingHorizontal:24
  },

  title:{
    color:"#FFFFFF",
    fontWeight:"bold",
    textAlign:"left",
    width:"100%",
    fontSize: 24,
    marginBottom: 16
  },

  display : {
    width:"100%",
    height:60,
    padding: 12,
    backgroundColor:"white",
    justifyContent:'center',
    marginBottom:8
  },

  result: {
    flexDirection:"row",
    marginBottom:32
  },

  res : {
    fontSize: 32
  }
});

