const handler = async (req, res) => {
	const key_value = '123';
	try {
		if (method == 'POST') {
			const { key } = req.body;
			if (key == key_value) {
				return res
					.status(200)
					.json({ result: true, message: 'Đăng nhập thành công' });
			} else {
				return res
					.status(400)
					.json({ result: false, message: 'Đăng nhập không thành công' });
			}
		}
	} catch (error) {}
};
