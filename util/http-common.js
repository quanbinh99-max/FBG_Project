import axios from 'axios';

export default axios.create({
	baseURL: 'https://fbg-project.vercel.app',
	headers: {
		'Content-type': 'application/json'
	}
});
