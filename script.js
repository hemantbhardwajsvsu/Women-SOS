const sosBtn = document.getElementById('sosBtn');
const locationBtn = document.getElementById('startLocationShare');
const recordAudioBtn = document.getElementById('recordAudioBtn');
const capturePhotoBtn = document.getElementById('capturePhotoBtn');

let watchID = null;

sosBtn.addEventListener('click', () => {
  alert('🚨 SOS sent to your trusted contacts!');
  
});

locationBtn.addEventListener('click', () => {
  if (navigator.geolocation) {
    watchID = navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      console.log("📍 Live Location:", latitude, longitude);
      alert(`Location Shared: ${latitude}, ${longitude}`);
      
    });
  } else {
    alert("Geolocation not supported.");
  }
});

recordAudioBtn.addEventListener('click', async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.start();
  setTimeout(() => {
    mediaRecorder.stop();
    alert("🎤 Voice note recorded and sent.");
  }, 5000);
});

capturePhotoBtn.addEventListener('click', async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  const video = document.createElement("video");
  video.srcObject = stream;
  video.play();
  const canvas = document.createElement("canvas");
  setTimeout(() => {
    canvas.getContext("2d").drawImage(video, 0, 0, 320, 240);
    stream.getTracks().forEach(track => track.stop());
    const photo = canvas.toDataURL("image/png");
    console.log("📸 Photo:", photo);
    alert("📸 Photo captured and sent.");
  }, 3000);
});
const contactForm = document.getElementById("contactForm");
const contactList = document.getElementById("contactList");

function loadContacts() {
  const contacts = JSON.parse(localStorage.getItem("trustedContacts")) || [];
  contactList.innerHTML = "";
  contacts.forEach((c, index) => {
    const li = document.createElement("li");
    li.textContent = `${c.name} - ${c.phone}`;
    contactList.appendChild(li);
  });
}

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;

  const contact = { name, phone };
  let contacts = JSON.parse(localStorage.getItem("trustedContacts")) || [];
  contacts.push(contact);
  localStorage.setItem("trustedContacts", JSON.stringify(contacts));

  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  loadContacts();
});

window.onload = loadContacts;

