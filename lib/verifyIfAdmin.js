module.exports = (req, res, next) => {
	if(!req.session.admin){
		return res.status(400).json({
			success: false,
			error: 'You must be logged in to do that'

		})
	} else {
		next()
	}
}