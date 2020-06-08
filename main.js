// Initialize Firebase (ADD YOUR OWN DATA)
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "************************* ",
    authDomain: "im1-ai01.firebaseapp.com",
    databaseURL: "https://im1-ai01.firebaseio.com",
    projectId: "im1-ai01",
    storageBucket: "im1-ai01.appspot.com",
    messagingSenderId: "*****************",
    appId: "1:348071148233:web:389982*************"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// Reference messages collection
  var messagesRef = firebase.database().ref('message');

// Listen for form submit
  document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
  function submitForm(e){
  e.preventDefault();
 
  // Get values
  var name = getInputVal('name');
  var date = getInputVal('date');
  var Topic = getInputVal('Topic');
  var keyWords = getInputVal('keyWords');
  var Message = getInputVal('message');
  
  // Save message
  saveMessage(name, date, Topic, keyWords, message);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 10 seconds
  setTimeout(function(){
   document.querySelector('.alert').style.display = 'none';
   },10000);

  // Clear form
   document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, date, Topic, keyWords, message){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    date: date,
    Topic: Topic,
    keyWords: keyWords,
    Message: message
  });
}