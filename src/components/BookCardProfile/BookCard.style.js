import { StyleSheet,Dimensions } from 'react-native'

export default StyleSheet.create({
    container:{
        backgroundColor:"#474E68",
        margin:20,
        width:Dimensions.get("window").width/2.5,
        borderRadius:20
    },
    box:{
        width:100,
        height:150,
        backgroundColor:"#bdbdbd",
        alignSelf:"center"
    },
    inner_container:{
        margin: 10,
        justifyContent:"space-between"
    },
    name:{
        fontWeight:"bold",
        color:"black",
        textAlign:"center",
        fontSize:16
    },
    desc:{
        fontWeight:"bold",
        // color:"black",
        textAlign:"center",
        fontSize:15
    },
    writ:{
        fontWeight:"bold",
        // color:"black",
        textAlign:"right",
        fontSize:15,
        marginTop:5,
    },
    title:{
        justifyContent:"flex-end",
        marginLeft:10,
        margin:5
    },
    row_container:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
    },
    like:{
        backgroundColor:"black",
        marginRight:2,
        width: 30,
        height: 30,
        borderRadius:25,
        textAlign:"center",
        textAlignVertical:"center"
    }
})