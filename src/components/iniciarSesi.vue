<template>
    <div v-if="loginExitoso" class="main">

            <div class="dentro">

                <div class="pantalla">

                    <p>{{ getOperation }}</p>
                    <p>{{ getResult }}</p>
                    <p>{{ getError }}</p>

                </div>

                <div class="botones">

                    <button  @click="clickAC()">AC</button>
                    <button @click="clickDEL()" >DEL</button>
                    <button @click="click('÷')">÷</button>
                

                    <button @click="click('7')">7</button>
                    <button @click="click('8')">8</button>
                    <button @click="click('9')">9</button>
                    <button @click="click('x')">x</button>

                    <button @click="click('4')">4</button>
                    <button @click="click('5')">5</button>
                    <button @click="click('6')">6</button>
                    <button @click="click('-')">-</button>
                
                    <button @click="click('3')">3</button>
                    <button @click="click('2')">2</button>
                    <button @click="click('1')">1</button>
                    <button @click="click('+')">+</button>

                    <button @click="click('0')">0</button>
                    <button @click="click('.')">.</button>
                    <button @click="clickResult()">=</button>
                    <button @click="clickHistorial()">Historial</button>


                </div>

            </div>
            <div>
                <p v-if="arrayCompleto.length">
                    <b>Su historial: </b>
                    <ul>
                    <li v-for="c in arrayCompleto" v-bind:key="c" >{{ c.MensajeHistorial }} el día {{ c.MensajeHora }}</li>
                    </ul>
                    </p>
            </div>
        </div>



















    <div v-if="creandoCuenta">
        <form id="formulario" @submit.prevent="login">
                <label for="Email"> </label>
                <input type="text" id="ingreso_Correo" name="ingreso_Correo" placeholder="Correo electronico"
                    v-model="ingreso_Correo">
                <label for="contraseña"> </label>
                <input type="password" id="ingreso_Contraseña" name="ingreso_Contraseña" placeholder="Contraseña"
                    v-model="ingreso_Contraseña">
            </form>
            <div><button @click="terminoCrear">Crear cuenta</button></div>
            
    </div>











    <div v-if="!loginExitoso && !creandoCuenta">
        <form id="formulario" @submit.prevent="login">
            <label for="Email"> </label>
            <input type="text" id="ingreso_Correo" name="ingreso_Correo" placeholder="Correo electronico"
                v-model="ingreso_Correo">
            <label for="contraseña"> </label>
            <input type="password" id="ingreso_Contraseña" name="ingreso_Contraseña" placeholder="Contraseña"
                v-model="ingreso_Contraseña">
        </form>
        <div id="div_Botón"><button id="inicio_Sesión" @click="login" type="submit" class="btn btn-dark mt-auto">
                Iniciar sesión</button></div>
                <div><button @click="crearCuenta">Crear cuenta</button></div>
    </div>
    
</template>

<script>
import { app } from '../main'
import { getFirestore, collection, where, query, getDocs, setDoc, doc, updateDoc,  serverTimestamp,   arrayUnion, Timestamp } from "firebase/firestore";
//import documento from 'raw-loader!./res/cuentas.txt'
export default {
    data() {
        return {
            errors: [],
            correoExiste:false,
            loginExitoso: false,
            creandoCuenta:false,
            ingreso_Correo: '',
            ingreso_Contraseña: '',
            getOperation: '',
            getResult: '',
            getError: '',
            clickOnEqual: false,
            arrayHora: [],
            arrayHistorial: [],
            arrayCompleto: []  
        }

    },
    methods: {

        logintest() {
            if (this.cuentas.includes(this.ingreso_Correo) && this.contraseñas.includes(this.ingreso_Contraseña)) {
                console.log('True')
                location.href = './calculadora'
            }
        },
        async login() {
            const db = getFirestore(app)
            const colection= collection(db, 'usuarios')
            const q = query(colection, where("correo", "==", this.ingreso_Correo), where("contraseña", "==", this.ingreso_Contraseña));
            const querySnapshot = await getDocs(q)
            if (querySnapshot.empty) {
                console.log("Mala la wea")
            } else {
                querySnapshot.forEach((doc) => {
                    if (doc.exists) {
                        this.loginExitoso=true
                    }
                });
            }

        },
        async crearCuenta() {
            this.creandoCuenta=true
        },

        async terminoCrear() {
            const db= getFirestore(app)
            const colection= collection(db, 'usuarios')
            const correoQuery = query(colection, where('correo', '==', this.ingreso_Correo));
            const correoSnap = await getDocs(correoQuery);
            correoSnap.forEach((doc) => {
                this.correoExiste = true;
            });
            console.log(this.validateCrear())
            console.log(this.db)
            if (this.validateCrear() && !this.correoExiste) {
                await setDoc(doc(db, 'usuarios', this.ingreso_Correo), {
                    correo: this.ingreso_Correo,
                    contraseña: this.ingreso_Contraseña,
                    historial: [],
                    hora: [],
                })
                this.creandoCuenta = false;
                this.ingreso_Correo = '';
                this.ingreso_Contraseña = '';
            }
            
            
            
        },
        async validateCrear() {
            if (this.validateEmail(this.ingreso_Correo) && this.ingreso_Contraseña.trim() != '') {
                return true
            }
            if (this.ingreso_Correo.trim() == '') {
                this.errors.push("El Correo es obligatorio")
            } else {
                if (!this.validateEmail(this.ingreso_Correo)) {
                    this.errors.push('Correo invalido ');
                }
            }
            
            if (this.ingreso_Contraseña.trim() == '') {
                this.errors.push("La contraseña es obligatoria")
            }
        },
        async validateEmail(email) {
            const res = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
            return res.test(String(email).toLowerCase())
        },
        clickAC() {
            this.getResult = '';
        },

        clickDEL() {
            if (this.getResult.length > 1) {
                this.getResult = this.getResult.substring(0, this.getResult.length - 1);
            } else {
                this.getResult = '';
            }
        },

        click(par) {

            if (this.getResult == '' || !this.clickOnEqual) {
                if (par != 'x' && par != '+' && par != '-' && par != '÷' && par != '.') {
                    this.getResult = par;
                    this.clickOnEqual = true
                }

                //console.log(this.getResult = this.getResult.substring(0, this.getResult.length ))
            } else {
                if (this.getResult.substring(this.getResult.length - 1) == 'x' || this.getResult.substring(this.getResult.length - 1) == '÷' || this.getResult.substring(this.getResult.length - 1) == '-' || this.getResult.substring(this.getResult.length - 1) == '+' || this.getResult.substring(this.getResult.length - 1) == '.') {
                    //this.getResult += par;

                    if (par != 'x' && par != '+' && par != '-' && par != '÷' && par != '.') {
                        this.getResult += par;
                    }

                } else {
                    if (!this.getResult.includes('.')) {
                        this.getResult += par;
                    } else {
                        if (par != '.') {
                            this.getResult += par;
                        }
                    }

                }


            }
        },
        async clickResult() {
            if (this.clickOnEqual) {

                let operation = this.getResult;
                let aux = 0;
                this.getOperation = operation;
                let tiempo = Timestamp.now();
                operation = operation.replace('x', '*');
                operation = operation.replace('÷', '/');
                this.getResult = eval(operation);
                this.clickOnEqual = false

                console.log("Ei")
                const db = getFirestore(app)
                console.log("Ei")
                const q = query(collection(db, 'usuarios'), where("correo", '==', this.ingreso_Correo))
                console.log("Ei")
                const querySnapshot = await getDocs(q);
                console.log("Ei")
                if (querySnapshot.empty) {
                    console.log("Ei")
                    console.log("Mala la wea")
                } else {
                    console.log("Ei")
                    const docRef = doc(db,'usuarios', this.ingreso_Correo)
                    querySnapshot.forEach((doc) => {
                        if (doc.exists) {
                            console.log("Ei")
                            aux = doc.get('historial');
                            console.log("Ei")
                            updateDoc(docRef, {
                                
                                historial: arrayUnion(operation + '=' + this.getResult),
                                hora: arrayUnion(tiempo),
                            });
                        }
                    });
                    console.log("Ei")
                    


                }
            }
        },
        async fusion() {
            console.log("A")
            for (let i = 0, len = Math.max(this.arrayHistorial.length, this.arrayHora.length); i < len; i++) {
                console.log("A")
                this.arrayCompleto.push({
                    MensajeHora: Date(this.arrayHora[i].seconds),
                    MensajeHistorial: this.arrayHistorial[i]
                })
            }
        },
        async clickHistorial() {
            const db = getFirestore(app);
            const cuentasRef = collection(db, 'Cuentas');
            const q = query(cuentasRef, where('correo', '==', this.ingreso_Correo), where('contraseña', '==', this.ingreso_Contraseña))
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                console.log("Mala la weas")
            } else {
                querySnapshot.forEach((doc) => {
                    if (doc.exists) {
                        this.arrayHistorial=doc.get('historial')
                        this.arrayHora =doc.get('hora')
                    }
                })
            }
            this.fusion()
            console.log(this.arrayCompleto)
            Timestamp.toString()
        },
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>