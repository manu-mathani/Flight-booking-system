exports.isAuthenticated = (req, res, next) => {
    try {
        if (req.session && req.session.adminId) {
            // If the user is authenticated, proceed to the next route (adminHomepage)
            return next();
        } else {
            // If the user is not authenticated, redirect to the login page
            res.redirect('/adminLogin');
        }
    } catch (err) {
        // If an error occurs, pass it to the next error-handling middleware
        next(err);
    }
};