import { Component } from '../index.mjs';
import { Peer } from './this/index.mjs'

const name = 'nk-peer';

const component = await Component();

component.observedAttributes = ['open', 'disabled'];


Object.defineProperties(component.prototype, {
    _peer: {
        value: null,
        writable: true
    },
    _code: {
        value: null,
        writable: true
    },
    _conn: {
        value: null,
        writable: true
    },
    localAudio: {
        value: {
            srcObject: '',
            autoplay: ''
        },
        writable: true
    },
    remoteAudio: {
        value: {
            srcObject: '',
            autoplay: ''
        },
        writable: true
    },
    localStream: {
        value: null,
        writable: true
    },
    peerStream: {
        value: null,
        writable: true
    },
    connectPeers: {
        value: function() {
            this._conn = this._peer.connect(this._code);
        },
        writable: true
    },
    getStreamCode: {
        value: function() {
            this._code = window.prompt("Please enter the sharing code");
        },
        writable: false
    },
    showConnectedContent: {
        value: function() {
            this.html.caststatus.textContent = "You're connected";
            this.html.callBtn.hidden = true;
            this.html.audioContainer.hidden = false;
        },
        writable: false
    },
    showCallContent: {
        value: function() {
            this.html.caststatus.textContent = `Your device ID is: ${this._peer.id}`;
            this.html.callBtn.hidden = false;
            this.html.audioContainer.hidden = true;
        },
        writable: false
    },
    getLocalStream: {
        value: function() {
            navigator.mediaDevices.getUserMedia({ video: false, audio: true })
                .then((stream) => {
                    this.localStream = stream; // A
                    this.localAudio.srcObject = stream; // B
                    this.localAudio.autoplay = true; // C
                })
                .catch((err) => {
                    console.error(`you got an error: ${err}`);
                });
        },
        writable: false
    },
    html: {
        value: null,
        writable: true
    },
    init: {
        value: async function() {
            this.html = {
                callBtn:  this.shadowRoot.querySelector(".call-btn"),
                audioContainer: this.shadowRoot.querySelector(".call-container"),
                caststatus: this.shadowRoot.querySelector('#caststatus'),
                hangUpBtn: this.shadowRoot.querySelector(".hangup-btn")
            }

            this.getLocalStream()

            this._peer = new Peer(
                `${Math.floor(Math.random() * 2 ** 18)
                    .toString(36)
                    .padStart(4, 0)}`,
                {
                    port: null,
                    host: 'devops-y56f.onrender.com',
                    debug: 1,
                    path: "/myapp",
                },
            );

            // this._peer = new Peer(
            //     `${Math.floor(Math.random() * 2 ** 18)
            //         .toString(36)
            //         .padStart(4, 0)}`,
            //     {
            //         port: 8000,
            //         host: location.hostname,
            //         debug: 1,
            //         path: "/myapp",
            //     },
            // );

            this._peer.on("connection", (connection) => {
                this._conn = connection;
            });

            this._peer.on("open", () => {
                this.html.caststatus.textContent = `Your device ID is: ${this._peer.id}`;
            });

            this._peer.on("call", (call) => {
                const answerCall = confirm("Do you want to answer?");

                if (answerCall) {
                    call.answer(this.localStream); // A
                    this.showConnectedContent(); // B
                    call.on("stream", (stream) => {
                        this.peerStream = stream;
                        this.remoteAudio = {}
                        this.remoteAudio.srcObject = stream;
                        this.remoteAudio.autoplay = true;

                    });
                } else {
                    console.log("call denied"); // D
                }
            });

            // this._conn.on("close", () => {
            //     this.showCallContent();
            // });

            this.html.hangUpBtn.addEventListener("click", () => {
                this._conn.close();
                this.showCallContent();
            });

            this.html.callBtn.addEventListener("click", () => {
                this.getStreamCode();
                this.connectPeers();
                const call = this._peer.call(this._code, this.localStream); // A

                call.on("stream", (stream) => {
                    this.remoteAudio.srcObject = stream; // C
                    this.remoteAudio.autoplay = true; // D
                    this.peerStream = stream; //E
                    this.showConnectedContent(); //F    });
                });
            });
        },
        writable: false
    },
    terminate: async function () {
        this._peer.destroy();
    },
    onMessage:{
        value: function(event) { },
        writable: false
    },
    open: {
        set(value) {
            console.log('----- value -----', value);
        },
        get() {
            return this.hasAttribute('open');
        }
    },
    disabled: {
        set(value) {
            console.log('----- value -----', value);
        },
        get() {
            return this.hasAttribute('disabled');
        }
    }
});

try {
    customElements.define(name, component);
} catch (e) {
    console.error('error', e);
}

export default {};