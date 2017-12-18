var framework = require('./framework');

var zonesListAutocomplete = function(req, res, saisie) {
	res.setHeader('Content-Type', 'application/json');
	var requete = "select id, nom from zones where nom like '%" + saisie + "%'";
	//console.log("requete : " + requete);
	framework.executeSQL(requete, res);
	return;
}

exports.zonesListAutocomplete = zonesListAutocomplete;