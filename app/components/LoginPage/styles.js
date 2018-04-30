import { colors } from "material-ui/styles";

const styles = {
    page : {
      width : '100%',
      height : '100%',
    },
    imageBG : {
      width : '100%',
      height : '100%',
      position: "absolute",
    },
    content : {
      width : '100%',
      height : '100%',
      minHeight : "100%",
      position: "relative",
      paddingTop: '10%',
    },
    formLogin : {
      marginTop: '10%',
      width : '26%',
      minHeight : 300,
      minWidth : 420,
      margin: 'auto',
      background:"#ffffff",
      borderRadius: 5,
    },
    innerformLogin : {
      width : '80%',
      height : '100%',
      minHeight : 300,
      minWidth : 360,
      margin: "auto",
      background:"#81D4FA",
      borderTop: "4px solid #3D5AFE",
      borderLeft: "5px solid #3D5AFE",
    },
    wrapInput: {
      margin: '25px 20px 10px 20px',
      borderBottom: '1px solid #909090',
      display: 'flex',
      flexDirection: 'row',
    },
    icon : {
      marginTop: 10,
      fontSize: '20px',
      fontWeight: "bold",
    },
    wrapIcon: {
      flexBasis: 44,
      background: '#e9e9e9',
      textAlign: 'center',
    },
    btnLogin : {
      width : '90%',
      height: 35,
      background : '#156ab5eb',
      marginBottom : '25px',
      color : 'white',
      fontSize : '16px',
    },
    logo: {
      width: 100,
      height: 100,
    }
}
export default styles ;