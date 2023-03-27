import { StyleSheet,Dimensions} from 'react-native'

export default StyleSheet.create({
    container:{
        backgroundColor:"#eceff1",
        // flex:1,
        height:Dimensions.get("window").height/1.5,
       borderTopRightRadius:20,
       borderTopLeftRadius:20
    },
    modal:{

        margin:0,
        marginHorizontal:20,
        justifyContent:"flex-end"
    },
    text:{
        textAlign:"center",
        textAlignVertical:"center",
        marginBottom:120,
        fontSize:100,
        height:120,
    },
    box:{
        borderWidth:3,
        borderColor:"gray",
        width:100,
        height:150,
        alignSelf:"center",
        marginTop:30
    },
    inputs:{
        margin:15,
    },
    input:{
        borderColor:"black",
        borderWidth:1,
        margin: 10,
        borderStyle:'dotted',
        color:"black"
    }
})