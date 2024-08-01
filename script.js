var etu = []

function ajouter(event) {
  event.preventDefault()

  var prenom = document.getElementById("prenom").value
  var nom = document.getElementById("nom").value
  var email = document.getElementById("email").value

  var prenomError = document.getElementById("prenomError")
  var nomError = document.getElementById("nomError")
  var emailError = document.getElementById("emailError")
  prenomError.textContent = ""
  nomError.textContent = ""
  emailError.textContent = ""

  if (!prenom || !nom || !email) {
   
    if (!prenom) {
      prenomError.textContent = "Le prénom est requis.";
    }
    if (!nom) {
      nomError.textContent = "Le nom est requis.";
    }
    if (!email) {
      emailError.textContent = "L'email est requis.";
    }
    
    return;
  }


 if (prenom.length < 2) {
  prenomError.textContent = "Le prénom doit contenir au moins 2 caractères.";
}
if (nom.length < 2) {
  nomError.textContent = "Le nom doit contenir au moins 2 caractères.";
}

if (!email.includes("@") || !/^[^\s@]+@[^\s@]+\.(com|sn)$/.test(email)) {
  emailError.textContent = "L'adresse email n'est pas valide.";
}

// Vérifier si les champs sont vides ou ne passent pas les validations
if (
  !prenom ||
  !nom ||
  !email ||
  prenom.length < 2 ||
  nom.length < 2 ||
  !email.includes("@") ||
  !/^[^\s@]+@[^\s@]+\.(com|sn)$/.test(email)
) {
  return;
}
  var etudiant = {
    prenom: prenom,
    nom: nom,
    email: email,
    notes: []
  }

  etu.push(etudiant)

  document.getElementById("prenom").value = ""
  document.getElementById("nom").value = ""
  document.getElementById("email").value = ""
  

  afficher()
}


function ajouter_note(etudiant) {
  ajouterNote = function () {
    var matiereSelect = document.getElementById("lesmatiere")
    var matiere = matiereSelect.value
    var note = document.getElementById("pnote").value

    if (matiere && note) {
      var les_notes = {
        matiere: matiere,
        note: note
      }
      etudiant.notes.push(les_notes)
    }
    document.getElementById("lesmatiere").value=""
    document.getElementById("pnote").value=""
    afficher()
  }
}

function voirNotes(etudiant) {
  var tabnote = document.getElementById("tabnote")
  var son_nom = document.getElementById("son_nom")
  son_nom.textContent =  etudiant.prenom + " " + etudiant.nom
  tabnote.innerHTML =
    "<tr><th>MATIERE</th><th>NOTE</th><th>APPRECIATION</th></tr>"

  for (var i = 0; i < etudiant.notes.length; i++) {
    var note = etudiant.notes[i]
    var tr = document.createElement("tr")
    tr.innerHTML =
      "<td>" +
      note.matiere +
      "</td><td>" +
      note.note +
      "</td><td>" +
      appreciation(note.note) +
      "</td>"
      tabnote.appendChild(tr)
  }

}


function calcul(notes) {
  if (notes.length === 0) {
    return 0
  }

  var som = 0

  for (var i = 0; i < notes.length; i++) {
    som += parseInt(notes[i].note)
  }

  return som / notes.length
}


function appreciation(note) {
  if (note >= 0 && note < 10) {
    return "Insuffisant"
  } else if (note >= 10 && note < 12) {
    return "Passable"
  } else if (note >= 12 && note < 15) {
    return "Assez bien"
  } else if (note >= 15 && note < 18) {
    return "Bien"
  } else {
    return "Excellent"
  }
}

function Moyenne() {
  var moytab = document.getElementById("moytab")
  moytab.innerHTML =
    "<tr>" +
    "<th>PRENOM</th>" +
    "<th>NOM</th>" +
    "<th>MOYENNE</th>" +
    "<th>APPRECIATION</th>" +
    "</tr>"

  var tbody = document.createElement("tbody")

  for (var i = 0; i < etu.length; i++) {
    var etudiant = etu[i]
    var moy = calcul(etudiant.notes)

    var tr = document.createElement("tr")
    tr.innerHTML =
      "<td>" +
      etudiant.prenom +
      "</td><td>" +
      etudiant.nom +
      "</td><td>" +
      moy.toFixed(1) +
      "</td><td>" +
      appreciation(moy) +
      "</td>"

    tbody.appendChild(tr)
  }

  moytab.appendChild(tbody)
}


function modifier(x) {
  var e = etu[x];
  document.getElementById("prenom").value = e.prenom;
  document.getElementById("nom").value = e.nom;
  document.getElementById("email").value = e.email;
  var modifbtn = document.getElementById("modifbtn");
  modifbtn.innerHTML = "Enregistrer";
  modifbtn.onclick = function (event) {
    event.preventDefault();
    var prenom = document.getElementById("prenom").value;
    var nom = document.getElementById("nom").value;
    var email = document.getElementById("email").value;
    if (prenom && nom && email) {
      etu[x].prenom = prenom;
      etu[x].nom = nom;
      etu[x].email = email;
      document.getElementById("prenom").value = "";
      document.getElementById("nom").value = "";
      document.getElementById("email").value = "";
      modifbtn.innerHTML = "Enregistrer";
      modifbtn.onclick = function () {
        ajouter(event);
      };
      afficher();
    }
  };
}


function supprimer(etudiant) {
  
  for (var i = 0; i < etu.length; i++) {
    if (etu[i] === etudiant) {
      etu.splice(i, 1)
      break
    }
  }
  afficher()
}

function afficher() {
  var table = document.getElementById("tab")
  table.innerHTML =
    "<tr>" +
    "<th>PRENOM</th>" +
    "<th>NOM</th>" +
    "<th>EMAIL</th>" +
    "<th>ACTION</th>" +
    "</tr>"

  for (var i = 0; i < etu.length; i++) {
    var e = etu[i]
    var ligne =
      "<tr><td>" +
      e.prenom +
      "</td><td>" +
      e.nom +
      "</td><td>" +
      e.email +
      "</td><td><button type='button' class='btn btn-dark'data-toggle='modal' data-target='#ajnote'  onclick='ajouter_note(etu[" +
      i +
      "])'>Ajouter Note</button>" +
      "<button type='button' class='btn btn-warning'data-toggle='modal' data-target='#vnotes' onclick='voirNotes(etu[" +
      i +
      "])'>Voir Note</button>" +
      "<button type='button' class='btn btn-danger' onclick='supprimer(etu[" +
      i +
      "])'>Supprimer</button>" +
      "<button type='button' class='btn btn-success'  onclick='modifier(" +
      i +
      ")'>Modifier</button></td></tr>"
    table.innerHTML += ligne
  }
}
