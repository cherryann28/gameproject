
var firebaseConfig = {
    apiKey: "AIzaSyBj18TnQLtKUVHQF5ij-6HOG6EeneryVjQ",
    authDomain: "my-first-mini-game-proje-7426d.firebaseapp.com",
    databaseURL: "https://my-first-mini-game-proje-7426d.firebaseio.com",
    projectId: "my-first-mini-game-proje-7426d",
    storageBucket: "my-first-mini-game-proje-7426d.appspot.com",
    messagingSenderId: "997220109448",
    appId: "1:997220109448:web:9150deac1f6b8ee299233d"
  };
 // Initialize Firebase
 var app = firebase.initializeApp(firebaseConfig);
         db = firebase.firestore(app);
         firebase.firestore().settings({
            cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
        });


        const submitPlayers = document.querySelector("#submit_btn");
        const name = document.querySelector("#name");
        const leaderBoard = document.querySelector("#leaderBoard");
        const score = document.querySelector("#demo2");

// real-time listener
//snapshot an obj that represents your doc ..grab the data i t contains by calling data on it
db.collection('players').orderBy('score', "desc").onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
        changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderCafe(change.doc);}
    })
})

function renderCafe(doc){
    let tr = document.createElement('tr');
    let name = document.createElement('span');
    let score = document.createElement('td');

    tr.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    score.textContent = doc.data().score;

    tr.appendChild(name);
    tr.appendChild(score);

    leaderBoard.appendChild(tr);
}



function display(){
    document.getElementById('table').style.display = "block";
}

// saving data
submitPlayers.addEventListener("click",function(){
    if( document.getElementById("name").value != ''){
    //e.preventDefault();
    db.collection('players').add({
    name: name.value,
    score: parseInt(score.value)
    });
  }
});


