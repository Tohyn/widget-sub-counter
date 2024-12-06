var totalGames = 110; // Nombre initial de jeux ajoutés (110)
var pendingSubs = 0; // Nombre de subs en attente
var totalGiftSubs = 0; // Nombre de subs gift reçus

//** LOAD IN INITIAL WIDGET DATA
window.addEventListener('onWidgetLoad', function(obj) {
    // Récupérer les données de base
    data = obj["detail"]["session"]["data"];
    const fieldData = obj["detail"]["fieldData"];
    fields = fieldData;
    
    // Utiliser 110 comme nombre de départ pour totalGames
    totalGames = 110;

    // Initialisation de la barre de progression
    reloadGoal();
});

//** UPDATE INFO WIDGET INFORMATION
window.addEventListener('onEventReceived', function(obj) {
    const listener = obj.detail.listener;
    const event = obj["detail"]["event"];
    
    if (listener == 'subscriber-latest') {
        // Gestion des subs normaux : ajouter 1 jeu
        totalGames += 1;

        // Mise à jour du nombre de jeux dans la barre
        reloadGoal();
    }

    // Si l'événement est un "sub gift", ajoutez le nombre exact de subs offerts
    if (listener == 'subscriber-gift') {
        if (event["data"] && event["data"]["count"]) {
            // Ne pas ajouter à nouveau si le nombre de sub gift a déjà été traité
            if (totalGiftSubs === 0) {
                totalGiftSubs = event["data"]["count"]; // Nombre de subs gift offerts
                totalGames += totalGiftSubs; // Ajouter ce nombre à totalGames
                reloadGoal();
            }
        }

        // Réinitialiser totalGiftSubs après le traitement
        totalGiftSubs = 0;
    }
});

//** CALCULATION FUNCTION FOR MINI SUB GOAL BAR
// Recharger la progression de l'objectif
function reloadGoal() {
    document.getElementById('games-number').textContent = totalGames; // Mise à jour du nombre de jeux
    document.getElementById('progress-bar').style.width = '100%'; // La barre est pleine
}
