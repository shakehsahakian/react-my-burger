import axios from 'axios';
const instance = axios.create({
	baseURL:'https://react-my-burger-f1838-default-rtdb.firebaseio.com/'
});

export default instance;