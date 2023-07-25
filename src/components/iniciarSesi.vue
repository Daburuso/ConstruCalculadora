<template>
    <div>
        <form id="formulario" @submit.prevent="validar_Datos">
            <label for="Email"> </label>
            <input type="text" id="ingreso_Correo" name="ingreso_Correo" placeholder="Correo electronico"
                v-model="ingreso_Correo">
            <label for="contraseña"> </label>
            <input type="password" id="ingreso_Contraseña" name="ingreso_Contraseña" placeholder="Contraseña"
                v-model="ingreso_Contraseña">
        </form>
        <div id="div_Botón"><button id="inicio_Sesión" @click="login" type="submit" class="btn btn-dark mt-auto">
                Iniciar sesión</button></div>
    </div>
</template>

<script>
import { app } from '../main'
import { getFirestore, collection, where, query, getDocs } from "firebase/firestore";
//import documento from 'raw-loader!./res/cuentas.txt'
export default {
    data() {
        return {
            cuentas: ['Pepe', 'Pepo'],
            contraseñas: ['1234', '1235'],
            ingreso_Correo: '',
            ingreso_Contraseña: '',
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
            const cuentasRef = collection(db, 'usuarios')
            const q = query(cuentasRef, where("correo", "==", this.ingreso_Correo), where("Contraseña", "==", this.ingreso_Contraseña));
            const querySnapshot = await getDocs(q)
            if (querySnapshot.empty) {
                console.log("Mala la wea")
            } else {
                querySnapshot.forEach((doc) => {
                    if (doc.exists) {
                        location.href = './calculadora'
                    }
                });
            }

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