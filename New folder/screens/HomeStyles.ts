import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212",
        position:"relative",
        height:100,
        width:"100%",
        // alignItems: "center",
        // justifyContent: "center",
    },
    But: {
        width: "50%",
        marginLeft: "20%",
        justifyContent: "center"
    },
    Name: {
        fontSize: 18,
        fontFamily: "Poppins-Regular",
        // fontWeight: "bold",
        marginBottom: 1,
        margin: "5%",
        color: "#fffff0"
    },
    User: {
        fontSize: 23,
        marginLeft: "5%",
        marginBottom: "5%",
        fontFamily: "Poppins-ThinItalic",
        // fontStyle: "italic",
        color: "#fffff0"
    },
    steps: {
        width:"87%",
        backgroundColor: "#252625",
        marginLeft: "4.5%",
        marginBottom: "5%",
        borderRadius: 12,
        paddingBottom: "5%",
        borderWidth: 0.5,
        borderColor: "#C7C8CC"
    },
    sleep:{
        backgroundColor: "#252625",
        marginLeft: "4.5%",
        width:"32%",
        // marginRight: "60%",
        paddingLeft:"2%",
        marginBottom: "5%",
        borderRadius: 12,
        paddingBottom: "3%",
        borderWidth: 0.5,
        borderColor: "#C7C8CC"
    },
    calories:{
        backgroundColor: "#252625",
        marginLeft: "5%",
        width:"50%",
        // marginRight: "60%",
        paddingLeft:"2%",
        marginBottom: "5%",
        borderRadius: 12,
        paddingBottom: "3%",
        borderWidth: 0.5,
        borderColor: "#C7C8CC"
    },
    icon: {
        marginLeft: "5%",
        marginTop: "3%",
        // display:"inline"
    },
    value: {
        color: "#fffff0",
        // display:"inline",
        marginLeft: "5%",
        marginTop: "1%",
        fontFamily:"Poppins-Regular",
        fontSize:15
    },
    SmallName:{
        color:"#fffff0",
        fontSize:18,
        padding: 3,
        fontFamily:"Poppins-Regular",
        // fontWeight:"bold",
        marginTop:"1%",
        alignContent:"center",
        textAlign: "center",
        alignItems: "center",
    },
    smallicon:{
        fontSize:40,
        marginTop: "8%",
        marginBottom:"8%"
    },
    extra:{
        backgroundColor: "#252625",
        // paddingLeft:"1%",
        // paddingBottom:"3%",
        marginTop:13,
        marginLeft:13,
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: "#C7C8CC",
        width:100,
        justifyContent:"center",
        alignItems:"center",
        height:"55%",
        paddingBottom:"1%"
    }
})

export default styles;