<template>
    <div class="main">

        <div class="dentro">

            <div class="pantalla">

                <p>{{ getOperation}}</p>
                <p>{{ getResult }}</p>
                <p>{{getError}}</p>

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
                <li v-for="c in arrayCompleto" v-bind:key="c" >{{ c.MensajeHistorial }} el día {{c.MensajeHora}}</li>
                </ul>
                </p>
        </div>
    </div>
</template>

<script>
import { app } from '../main.js'
import { getFirestore, updateDoc,doc, serverTimestamp, query, collection, where, getDocs, arrayUnion, Timestamp  } from 'firebase/firestore';
export default {
    data() {
        return {
            getOperation: '',
            getResult: '',
            getError: '',
            clickOnEqual: false,
            arrayHora: [],
            arrayHistorial: [],
            arrayCompleto:[]
        }
    },
    methods: {
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
                const db = getFirestore(app);
                const usuarioRef = doc(db, 'usuarios', 'Pepe')
                const q = query(collection(db, 'usuarios'), where("correo", '==', 'pepe@gmail.com'))
                const querySnapshot = await getDocs(q);
                if (querySnapshot.empty) {
                    console.log("Mala la wea")
                } else {
                    querySnapshot.forEach((doc) => {
                        if (doc.exists) {
                            aux = doc.get('historial');
                        }
                    });
                    updateDoc(usuarioRef, {
                        historial: arrayUnion(operation+ '=' + this.getResult),
                        hora: arrayUnion(tiempo),
                    });


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
            const usuarioRef = doc(db, 'usuarios', 'Pepe')
            const q = query(collection(db, 'usuarios'), where("correo", '==', 'pepe@gmail.com'))
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                console.log("Mala la wea")
            } else {
                querySnapshot.forEach((doc) => {
                    if (doc.exists) {
                        this.arrayHistorial = doc.get('historial');
                        this.arrayHora = doc.get('hora')
                        
                        
                    }
                });
            }
            this.fusion()
            console.log(this.arrayCompleto)
            Timestamp.toString()
        },
        
    },

}

</script>

<style>


</style>
