import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: 40,
    borderRadius: 0.5,
    transition: '0.3s',
    width: '90%',
    overflow: 'initial',
    background: '#ffffff',
  },
  content: {
    paddingTop: 0,
    textAlign: 'left',
    overflowX: 'auto',
    '& table': {
      marginBottom: 0,
    }
  },
}));
export default useStyles;
