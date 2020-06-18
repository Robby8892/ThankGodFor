module.exports = (req, res, next) => {
	console.log(res.local);
	if(!req.locals.admin){
		return res.status(400).json({
			success: false,
			error: 'You must be logged in to do that'

		})
	} else {
		next()
	}
}