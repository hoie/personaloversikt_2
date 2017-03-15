$( document ).ready ( function() { 
	// init Tabletop
	init();
	$('#titlebar').hide();
	
});


// Tabletop code
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1Rjamb3XcJiq_zTGX52sMbITX0k7rjgAsbOahOAVzmHA/pubhtml?gid=0&single=true';

function init() {
	Tabletop.init( { key: public_spreadsheet_url,
	                 callback: showInfo,
	                 simpleSheet: true} );
}

function showInfo(data) {
	var Container = $('#Container');
	for (var i = data.length - 1; i >= 0; i--) {
		var etternavn = (data[i]).Etternavn;
		var fornavn = (data[i]).Fornavn;
		var funksjon = (data[i]).Orgenhet1;
		var funksjon2 = (data[i]).Ansvar1;
		var avdeling = (data[i]).Orgenhet2;
		var avdeling2 = (data[i]).Ansvar2;
		var filnavn = (data[i]).Filnavn;
		var thumbnail = 'img/thumbnail/' + filnavn;
		filnavn = filnavn.replace(/\(/g, '%28').replace(/\)/g, '%29');
		// console.log(filnavn);
		// var image = 'img/medium/' + filnavn;
		var entry = "<div class=\"mix " + funksjon + " " + funksjon2 + " " + avdeling + " " + avdeling2 + "\" data-name=\"" + etternavn + ", " + fornavn + "\" style=\"background-image:url(" + thumbnail + ")\"></div>";
		Container.prepend(entry);
	}

// open image in Slimbox
$('.mix').on('click', function() {
	var rawURL = $(this).css('background-image');
	var rawFilePath = rawURL.split('img/thumbnail');
	var filePath = "img/medium" + rawFilePath[rawFilePath.length - 1];
	var imageURL = filePath.slice(0, filePath.length - 2);
	var imageText = $(this).attr('data-name');
	$.slimbox(imageURL, imageText, {resizeDuration: 200, captionAnimationDuration: 400, imageFadeDuration: 400});
});

// config mixItUp
	$('#Container').mixItUp({
		load: {
			sort: 'name:asc'
		}
	});

}

$('.navbar a').on('click', function(e){
	var orgenhet = $(e.target).html();
	var titlebar = $('#titlebar');
	if(orgenhet === "Alle ansatte") {
		titlebar.fadeOut();
	} else {

		switch(orgenhet) {
			case "Merkantil/drift":
			orgenhet = "Merkantile tjenester og drift";
			break;
			case "TRL":
			orgenhet = "Tilrettelagt opplæring";
			break;
			case "TIP/EL":
			orgenhet = "Teknikk og industriell produksjon / Elektrofag";
			break;
			case "SS":
			orgenhet = "Service og samferdsel";
			break;
			case "MK":
			orgenhet = "Medier og kommunikasjon";
			break;
			case "HO":
			orgenhet = "Helse og oppvekstfag";
			break;
			case "Stud.spes/fellesfag":
			orgenhet = "Studiespesialisering / fellesfag";
			break;
			default:
			// orgenhet = orgenhet;
		}

		titlebar.html(orgenhet).show();	
	}

});






