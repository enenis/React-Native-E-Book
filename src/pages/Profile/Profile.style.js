import { StyleSheet,Dimensions } from 'react-native'

export default StyleSheet.create({
    container:{
        backgroundColor:"#EDE9D5",
        justifyContent:"center",
        flex:1,
    //    margin: 10,
    },
    img_container:{
        backgroundColor:"#bdbdbd",
        borderRadius:50,
        width:100,
        height:100,
        justifyContent:"center",
        alignSelf:"center",
        alignItems:"center",
        marginTop:75
    },
    bck_container:{
        backgroundColor:"#bdbdbd",
        width:Dimensions.get("window").width/1,
        height:Dimensions.get("window").height/5.5,
        position:"absolute",
        top:0
    
    },
    plus:{
        fontSize:20,
        color:"#eceff1"
    },
    back:{
        width:Dimensions.get("window").width/1,
        height:Dimensions.get("window").height/5.5,
        alignItems:"center",
        alignContent:"center",
        alignSelf:"center",
        justifyContent:"center"
    }
})