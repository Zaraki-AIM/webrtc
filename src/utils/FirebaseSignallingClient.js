import firebase from 'firebase/app';
import 'firebase/database';

export default class FirebaseSignallingClient {
  constructor() {

    const firebaseConfig = {
      apiKey: "AIzaSyA8h5czMtZRAhJ5vDngaoVAS0fKq3Q4vYs",
      authDomain: "zaraki-webrtc.firebaseapp.com",
      databaseURL: "https://zaraki-webrtc-default-rtdb.firebaseio.com",
      projectId: "zaraki-webrtc",
      storageBucket: "zaraki-webrtc.appspot.com",
      messagingSenderId: "520126907743",
      appId: "1:520126907743:web:4fa40e04d4a70e067b22ea"
    };
    if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);
    this.database = firebase.database();
    this.localPeerName = '';
    this.remotePeerName = '';
  }

  setPeerNames(localPeerName, remotePeerName) {
    this.localPeerName = localPeerName;
    this.remotePeerName = remotePeerName;
  }

  get targetRef() {
    return this.database.ref(this.remotePeerName);
  }

  async sendOffer(sessionDescription) {
    await this.targetRef.set({
      type: 'offer',
      sender: this.localPeerName,
      sessionDescription,
    });
  }

  async sendAnswer(sessionDescription) {
    await this.targetRef.set({
      type: 'answer',
      sender: this.localPeerName,
      sessionDescription,
    });
  }

  async sendCandidate(candidate) {
    await this.targetRef.set({
      type: 'candidate',
      sender: this.localPeerName,
      candidate,
    });
  }

  async remove(path) {
    await this.database.ref(path).remove();
  }
}
