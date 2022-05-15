import axios from 'axios';

export default axios.create({
	baseURL: 'http://fbg-project.vercel.app/api',
	headers: {
		'Content-Type': 'application/json'
	}
});
