<template>
  <div class="main-ctn">
    <div class="section">
      <h1 class="title">Ciudades</h1>
      <p class="subtitle">Apartado para la gestión de ciudades a solicitar</p>

      <div class="card">
        <h2 class="section-title">Detalles de la ciudad</h2>
        <p class="section-subtitle">Registrá acá la información acerca de las ciudades</p>
        <form class="form" @submit.prevent="registrarCiudad">
          <div class="form-group">
            <label for="nombre">Nombre</label>
            <input
              v-model="datosCiudad.nombre"
              type="text"
              id="nombre"
              class="input"
              placeholder="¿Qué ciudad desea registrar?"
            />
          </div>
          <div class="section-btn">
            <button class="btn-guardar" type="submit">Guardar</button>
          </div>
        </form>
      </div>

      <div class="card" v-if="ciudades.length">
        <h2 class="section-title">Listado de ciudades</h2>
        <ul>
          <li v-for="(c, index) in ciudades" :key="c.id">
            {{ c.nombre }}
            <button class="btn-eliminar" @click="eliminarCiudad(c.id, index)">Eliminar</button>
          </li>
        </ul>
      </div>

      <div v-if="mensaje" :class="['toast', tipoMensaje]">{{ mensaje }}</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import api from "@/api.js";

export default {
  name: "AltaCiudades",
  setup() {
    const datosCiudad = ref({ nombre: "" });
    const ciudades = ref([]);
    const mensaje = ref("");
    const tipoMensaje = ref("");

    const mostrarMensajeTemporal = (tipo, texto) => {
      tipoMensaje.value = tipo;
      mensaje.value = texto;
      setTimeout(() => (mensaje.value = ""), 3000);
    };

    const cargarCiudades = async () => {
      try {
        const res = await api.get("/ciudades");
        ciudades.value = res.data;
      } catch (err) {
        console.error("Error al cargar ciudades:", err);
      }
    };

    const registrarCiudad = async () => {
      if (!datosCiudad.value.nombre.trim()) {
        mostrarMensajeTemporal("error", "Debe ingresar un nombre de ciudad");
        return;
      }

      try {
        const response = await api.post("/ciudades", datosCiudad.value);
        ciudades.value.push(response.data);
        mostrarMensajeTemporal("success", "Ciudad registrada correctamente");
        datosCiudad.value.nombre = "";
      } catch (err) {
        console.error(err);
        mostrarMensajeTemporal("error", "Error al guardar en la base de datos");
      }
    };

    const eliminarCiudad = async (id, index) => {
      if (!confirm("¿Seguro que quieres eliminar esta ciudad?")) return;
      try {
        await api.delete(`/ciudades/${id}`);
        ciudades.value.splice(index, 1);
        mostrarMensajeTemporal("success", "Ciudad eliminada correctamente");
      } catch (err) {
        mostrarMensajeTemporal("error", "Error al eliminar la ciudad");
      }
    };

    onMounted(cargarCiudades);

    return {
      datosCiudad,
      ciudades,
      mensaje,
      tipoMensaje,
      registrarCiudad,
      eliminarCiudad,
    };
  },
};
</script>

<style scoped>
.main-ctn {
  border-radius: 12px;
  background: #f9fafb;
  padding: 2rem;
  font-family: "Inter", sans-serif;
  color: #111827;
}

.title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.subtitle {
  color: #6b7280;
  margin-bottom: 2rem;
}

.card {
  background: #ffffff;
  border-radius: 0.75rem;
  padding: 1.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.section-subtitle {
  font-size: 0.95rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  padding: 0.65rem 0.85rem;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.2s ease;
}

.input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

.section-btn {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-guardar {
  background: #22c55e;
  color: white;
  font-weight: 600;
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-guardar:hover {
  background: #16a34a;
}

.btn-eliminar {
  background: #ef4444;
  color: white;
  font-weight: 600;
  padding: 0.3rem 0.6rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  margin-left: 1rem;
  transition: background 0.2s;
}

.btn-eliminar:hover {
  background: #dc2626;
}

.toast {
  margin-top: 1rem;
  padding: 0.8rem;
  border-radius: 0.5rem;
  text-align: center;
}

.toast.success {
  background: #d1fae5;
  color: #065f46;
}

.toast.error {
  background: #fee2e2;
  color: #991b1b;
}
</style>
