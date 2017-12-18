var initialise = function(app) {


		app.get('/tests', function(req, res, next) {res.render('tests', { title: 'TESTS' })});
		app.get('/refs', function(req, res, next) {res.render('refs')});
		var dst = require('./dst');
		app.get('/zonesListAutocomplete', function(req, res, next) {dst.zonesListAutocomplete(req, res, req.query['q'])});

		app.get('/testsEjsBootstrap', function(req, res, next) {res.render('testsEjsBootstrap')});

		//console.log(process.env.ZEVARIABLE);
		//console.log("Répertoire de travail = " + __dirname);
		//router.get('/todoList', function (req, res) {res.sendFile(path.join(__dirname + '/todoList.html'));});

		//router.get('/compter/:nombre', function(req, res) {
		//    var noms = ['Robert', 'Jacques', 'David'];
		//    res.render('page.ejs', {compteur: req.params.nombre, noms: noms});
		//});
}

exports.initialise = initialise;