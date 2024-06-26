import { Quaternion, Vector3, Matrix4, Euler } from '../this/index.mjs';

export const actions = (self) => {
    return new Promise(async (resolve, reject) => {
        let quat = new Quaternion();
        let highlightedId = 'ip0';
        let q = quat;
        let m = new Matrix4();

        const object = {
            matrixToString: (m) => {
                var r = m.elements;
                var s =
                    '[ ' + object.toFixedWidth(r[0]) + ', ' + object.toFixedWidth(r[4]) + ', ' + object.toFixedWidth(r[8]) + ';\n'
                    + '  ' + object.toFixedWidth(r[1]) + ', ' + object.toFixedWidth(r[5]) + ', ' + object.toFixedWidth(r[9]) + ';\n'
                    + '  ' + object.toFixedWidth(r[2]) + ', ' + object.toFixedWidth(r[6]) + ', ' + object.toFixedWidth(r[10]) + ' ]';
                return s;
            },
            highlight: (id) => {
                self.shadowRoot.getElementById(highlightedId).classList.remove('phigh');
                highlightedId = id;
                self.shadowRoot.getElementById(id).classList.add('phigh');
            },
            setQ: () => {
                q.normalize();
                quat = q;
                object.doOutput();
            },
            doOutput: () => {
                let q = quat;
                let m = new Matrix4();
                m.makeRotationFromQuaternion(q);
                self.shadowRoot.getElementById('resmatrix').value = object.matrixToString(m);
                self.shadowRoot.getElementById('resq').value = '[ ' + object.toReal(q.x) + ', ' + object.toReal(q.y) + ', ' + object.toReal(q.z) + ', ' + object.toReal(q.w) + ' ]';

                var axis = [0, 0, 0];
                var angle = 2 * Math.acos(q.w);
                if (1 - (q.w * q.w) < 0.000001) {
                    axis[0] = q.x;
                    axis[1] = q.y;
                    axis[2] = q.z;
                } else {
                    // http://www.euclideanspace.com/maths/geometry/rotations/conversions/quaternionToAngle/
                    var s = Math.sqrt(1 - (q.w * q.w));
                    axis[0] = q.x / s;
                    axis[1] = q.y / s;
                    axis[2] = q.z / s;
                }
                self.shadowRoot.getElementById('resa').value = '{ [ ' + object.toReal(axis[0]) + ', ' + object.toReal(axis[1]) + ', ' + object.toReal(axis[2]) + ' ], ' + object.toReal(object.toAngle(angle)) + ' }';

                self.shadowRoot.getElementById('resr').value = '[ ' + object.toReal(object.toAngle(axis[0] * angle)) + ', ' + object.toReal(object.toAngle(axis[1] * angle)) + ', ' + object.toReal(object.toAngle(axis[2] * angle)) + ' ]';

                var eu = new Euler();
                eu.setFromRotationMatrix(m, self.shadowRoot.getElementById('reseuler').value);
                self.shadowRoot.getElementById('rese').value = '[ x: ' + object.toReal(object.toAngle(eu.toArray()[0])) + ', y: ' + object.toReal(object.toAngle(eu.toArray()[1])) + ', z: ' + object.toReal(object.toAngle(eu.toArray()[2])) + ' ]';

                var spansi = self.shadowRoot.querySelectorAll('.nk-spananglei');
                for (var i = 0; i < spansi.length; i++) {
                    if (self.shadowRoot.getElementById('iformatrad').checked) {
                        spansi[i].textContent = ' (radians)';
                    } else {
                        spansi[i].textContent = ' (degrees)';
                    }
                }

                var spansres = self.shadowRoot.querySelectorAll('.nk-spanangleres');
                for (var i = 0; i < spansres.length; i++) {
                    if (self.shadowRoot.getElementById('resformatrad').checked) {
                        spansres[i].textContent = ' (radians)';
                    } else {
                        spansres[i].textContent = ' (degrees)';
                    }
                }
            },
            update: (event, props) => {
                let inputMode = props.inputMode;
                q = new Quaternion();
                if (inputMode === 0) {
                    var m = new Matrix4();
                    var m00 = self.shadowRoot.getElementById('m00').value;
                    var m01 = self.shadowRoot.getElementById('m01').value;
                    var m02 = self.shadowRoot.getElementById('m02').value;
                    var m10 = self.shadowRoot.getElementById('m10').value;
                    var m11 = self.shadowRoot.getElementById('m11').value;
                    var m12 = self.shadowRoot.getElementById('m12').value;
                    var m20 = self.shadowRoot.getElementById('m20').value;
                    var m21 = self.shadowRoot.getElementById('m21').value;
                    var m22 = self.shadowRoot.getElementById('m22').value;
                    m.set(m00, m01, m02, 1, m10, m11, m12, 1, m20, m21, m22, 1, 0, 0, 0, 1);
                    q.setFromRotationMatrix(m);
                } else if (inputMode === 1) {
                    q = new Quaternion(self.shadowRoot.getElementById('q0').value,
                        self.shadowRoot.getElementById('q1').value,
                        self.shadowRoot.getElementById('q2').value,
                        self.shadowRoot.getElementById('q3').value);
                } else if (inputMode === 2) {
                    q = new Quaternion();
                    var axis = new Vector3(self.shadowRoot.getElementById('a0').value,
                        self.shadowRoot.getElementById('a1').value,
                        self.shadowRoot.getElementById('a2').value);
                    axis.normalize();
                    q.setFromAxisAngle(axis, object.toRad(self.shadowRoot.getElementById('a3').value));
                } else if (inputMode === 3) {
                    var axis = new Vector3(self.shadowRoot.getElementById('r0').value,
                        self.shadowRoot.getElementById('r1').value,
                        self.shadowRoot.getElementById('r2').value);
                    var angle = object.toRad(axis.length());
                    axis.normalize();
                    q.setFromAxisAngle(axis, angle);
                } else if (inputMode === 4) {
                    var e = new Euler(object.toRad(self.shadowRoot.getElementById('e0').value),
                        object.object.toRad(self.shadowRoot.getElementById('e1').value),
                        object.toRad(self.shadowRoot.getElementById('e2').value),
                        self.shadowRoot.getElementById('euler').value);
                    q.setFromEuler(e);
                } else if (inputMode === 5) {
                    var m = new Matrix4();
                    var P = object.getVector('P');
                    var Q = object.getVector('Q');
                    var R = object.getVector('R');
                    var x = new Vector3();
                    var y = new Vector3();
                    var z = new Vector3();
                    x.subVectors(Q, P).normalize();
                    y.subVectors(R, P);
                    z.crossVectors(x, y).normalize();
                    y.crossVectors(z, x).normalize();
                    m.set(x.x, y.x, z.x, 1, x.y, y.y, z.y, 1, x.z, y.z, z.z, 1, 0, 0, 0, 1);
                    q.setFromRotationMatrix(m);
                }
                object.setQ(q);
                object.highlight('ip' + inputMode);
            },
            getVector: (root) => {
                const vx = self.shadowRoot.getElementById(root + 'x').value;
                const vy = self.shadowRoot.getElementById(root + 'y').value;
                const  vz = self.shadowRoot.getElementById(root + 'z').value;
                return new Vector3(vx, vy, vz);
            },
            toRad: (x) => {
                if (self.shadowRoot.getElementById('iformatdeg').checked) {
                    return x / 180 * Math.PI;
                } else {
                    return x;
                }
            },
            toAngle: (x) => {
                if (self.shadowRoot.getElementById('resformatdeg').checked) {
                    return x * 180 / Math.PI;
                } else {
                    return x;
                }
            },
            toReal: (x) => {
                if (!Number.isNaN(parseFloat(x)) && isFinite(parseFloat(x))) {
                    return parseFloat(parseFloat(x).toFixed(7));
                } else {
                    return x;
                }
            },
            toFixedWidth: (x) => {
                if (!Number.isNaN(parseFloat(x)) && isFinite(parseFloat(x))) {
                    var s = x.toFixed(7);
                    if (x >= 0) s = ' ' + s;
                    return s;
                } else {
                    return x;
                }
            }
        }

        resolve(object);
    });
};

export default {
    description: 'action'
};