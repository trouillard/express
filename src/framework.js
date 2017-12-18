var executeSQL = function (sql, res) {

     pool.getConnection(function(err,connection){
         if (err) {
           console.log("DB NON DEMARREE");
           //connection.release();
           if (res != null) {res.json({"code" : 500, "status" : "Error in connection database"});};
           return false;
           ;
         }

         connection.query(sql,function(err, rows){
             connection.release();
             if(!err) {
                 if (res != null) {res.json(rows);};
                 return true;
             }
             else {
				 if (res != null) {res.json({"code" : 500, "status" : "Problème de requête SQL", "Erreur" : err});};
				 return false;
		 	 }
         });

         connection.on('error', function(err) {
			   console.log("DB NON DEMARREE");
               if (res != null) {res.json({"code" : 500, "status" : "Error in connection database"});};
               return false;
         });
   });
 }


var all = function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	var requete = "select * from " + req.params.objets;
	if (req.query['nom'] != null && req.query['nom'] != undefined) {
		requete = requete + " where nom like '%" + req.query['nom'] + "%'";
//		console.log("requete = " + requete);
	}
	executeSQL(requete, res);
	return;
}

var get = function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	var requete = "select * from " + req.params.objets + " where id = '" + req.params.id + "'";
	executeSQL(requete, res);
	return;
}

var post = function (req, res) {

	// Ajout du Content-type
		res.setHeader('Content-Type', 'application/json');

	// Récupération des paramètres de la requête POST dans le corps
		var parametres	= Object.keys(req.body);
		if (parametres.length == 0) {
			res.json({"code" : 200, "status" : "Aucune donnee à inserer"});
			return;
		}
		var donnees = Object.values(req.body);

	//	Façonnage de la requête
		var i = 0;
		var sql  = 'insert into ' + req.params.objets + " (";
		var sql2 = '';
		while (i < parametres.length) {
			if (i != 0) {
				sql  = sql + ", ";
				sql2 = sql2 + ", ";
			};
			sql  = sql + parametres[i];
			sql2 = sql2 + "'" + donnees[i] + "'";
			i++
		}
		sql = sql + ") values (" + sql2 + ");";
		//console.log ("requete  : " + sql);

	// Passage de la requête
		executeSQL(sql, res);
		return;

}

var put = function (req, res) {

	// Ajout du Content-type
		res.setHeader('Content-Type', 'application/json');

	// Récupération des paramètres de la requête POST dans le corps
		var parametres	= Object.keys(req.body);
		if (parametres.length == 0) {
			res.json({"code" : 200, "status" : "Aucune donnee à inserer"});
			return;
		}
		var donnees = Object.values(req.body);

	//	Façonnage de la requête
		var i = 0;
		var sql  = 'update ' + req.params.objets + " set ";
		while (i < parametres.length) {
			if (i != 0) {
				sql  = sql + ", ";
			};
			sql  = sql + parametres[i] + "='" + donnees[i] + "'";
			i++
		}
		sql = sql + " where id=" + req.params.id + ";";
		//console.log ("requete  : " + sql);

	// Passage de la requête
		executeSQL(sql, res);
		return;

}

var del = function (req, res) {
	var sql = "delete from " + req.params.objets + " where id = '" + req.params.id + "'";
	executeSQL(sql, res);
	return;
}

exports.executeSQL = executeSQL;
exports.all = all;
exports.get = get;
exports.post = post;
exports.put = put;
exports.del = del;