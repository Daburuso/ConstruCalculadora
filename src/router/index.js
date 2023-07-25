import { createWebHistory, createRouter } from "vue-router";
import iniciarSesi from '@/components/iniciarSesi.vue'
import calculadora from '@/components/calculadoraVue.vue'
const routes = [
    {
        path: "/",
        name: "iniciarSesi",
        component: iniciarSesi,

        
    },
    {
        path: "/calculadora",
        name: "calculadora",
        component: calculadora,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;