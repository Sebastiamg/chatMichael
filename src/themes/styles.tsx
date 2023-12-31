import {StyleSheet} from 'react-native';

export const stylees = StyleSheet.create({
  homeScreen: {
    minHeight: '100%',
  },
  generalChat: {
    height: '10%',
    width: '100%',
    borderRightWidth: 5,
    paddingHorizontal: 20,
    alignSelf: 'center',
    borderColor: 'white',
  },
  usersList: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-evenly',
  },
  chat: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    gap: 15,
    padding: 10,
    backgroundColor: '#333533',
  },
  mainTitle: {
    fontWeight: 'bold',
    fontSize: 25,
    flexBasis: '5%',
    color: 'white',
  },
  chat__input: {
    paddingHorizontal: 10,
    borderRadius: 7,
    flex: 0.65,
    fontWeight: 'bold',
    backgroundColor: '#e5e5e5',
    borderLeftWidth: 5,
    borderBottomWidth: 5,
    borderColor: '#bcb8b1',
    color: 'black',
  },
  chat_button: {
    flex: 0.3,
    borderRadius: 7,
    fontWeight: 'bold',
    backgroundColor: '#e5e5e5',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 5,
    borderBottomWidth: 5,
    borderColor: '#bcb8b1',
    color: 'black',
  },
  chat_messages: {
    minWidth: '100%',
    minHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  chat__form: {
    width: '100%',
    minHeight: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  chat__text: {
    flexDirection: 'column',
    padding: 10,
    marginVertical: 4,
    width: '50%',
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 5,
    borderRightWidth: 0.1,
    borderBottomWidth: 5,
    backgroundColor: '#cccccc',
    borderColor: '#253237',
  },
  chat__text2: {
    flexDirection: 'column',
    position: 'relative',
    left: '50%',
    right: '-50%',
    padding: 10,
    marginVertical: 4,
    width: '50%',
    borderRadius: 15,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 15,
    borderLeftWidth: 0.1,
    borderBottomWidth: 5,
    borderRightWidth: 5,
    backgroundColor: '#f2f2f2',
    borderColor: '#6c757d',
  },
  text: {
    color: 'black',
    fontWeight: '900',
  },
  text2: {
    color: 'white',
  },
  user: {
    borderRadius: 7,
    height: 70,
    flexBasis: 110,
    padding: 5,
    borderLeftWidth: 5,
    borderBottomWidth: 5,
    backgroundColor: '#e5e5e5',
    borderColor: '#bcb8b1',
  },
  buttons: {
    fontSize: 20,
    marginTop: 20,
    width: '100%',
    height: 40,
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 7,
    backgroundColor: '#333533',
    borderColor: '#b1a7a6',
    borderLeftWidth: 5,
    borderBottomWidth: 5,
  },
  textButtons: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  authLink: {
    fontSize: 20,
    marginTop: 20,
    width: '100%',
    height: 60,
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 7,
    backgroundColor: '#333533',
    borderColor: '#b1a7a6',
    borderLeftWidth: 5,
    borderBottomWidth: 5,
  },
  authLinkA: {
    backgroundColor: 'white',
    color: 'black',
  },
  authText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  authForm: {
    height: '100%',
    padding: 15,
    gap: 20,
  },
  authInputContainer: {
    gap: 10,
  },
  authInput: {
    borderRadius: 7,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    backgroundColor: '#e5e5e5',
    borderLeftWidth: 5,
    borderBottomWidth: 5,
    borderColor: '#bcb8b1',
    color: 'black',
  },
  authTitle: {
    color: '#363636',
    textShadowRadius: 3,
    fontSize: 40,
    fontWeight: '900',
    textAlign: 'center',
  },
  text3: {
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
  },
  text4: {
    color: 'gray',
    fontSize: 13,
    fontWeight: 'bold',
  },
  text5: {
    color: '#495057',
    fontSize: 13,
    fontWeight: 'bold',
  },
  setIpSForm: {
    width: '100%',
    maxHeight: '80%',
    position: 'relative',
    flex: 1,
    // justifyContent: 'center',
    padding: 20,
  },
  setIpSForm1: {
    width: '100%',
    borderRadius: 7,
    elevation: 5,
    padding: 30,
    borderLeftWidth: 5,
    borderBottomWidth: 5,
    backgroundColor: '#d6d6d6',
    borderColor: '#a9a9a9',
  },
  authLinkB: {
    backgroundColor: '#6c757d',
    borderColor: '#64686b',
  },
  authTitle2: {
    margin: 40,
  },
  errorButton: {
    backgroundColor: '#c7ccb9',
  },
});
