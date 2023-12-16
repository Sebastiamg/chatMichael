import {StyleSheet} from 'react-native';

export const stylees = StyleSheet.create({
  homeScreen: {
    backgroundColor: '#161a1d',
    minHeight: '100%',
  },
  generalChat: {},
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
    backgroundColor: '#161a1d',
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
    backgroundColor: '#242423',
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
    padding: 10,
    marginVertical: 4,
    width: '50%',
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 5,
    borderBottomWidth: 5,
    backgroundColor: '#444140',
    borderColor: '#323031',
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
  //   text: {
  //     color: 'black',
  //     textAlign: 'center',
  //   },
});