<template>
  <div class="main-ctn">
    <div class="section">
      <h1 class="title">Atletas</h1>
      <p class="subtitle">Apartado para la gestión de atletas registrados</p>

      <div class="card">
        <h2 class="section-title">Detalles del atleta</h2>
        <p class="section-subtitle">Ingresá la información de cada atleta</p>

        <form class="form" @submit.prevent="registrarAtleta">
          <div class="form-group">
            <label for="dni">DNI</label>
            <input type="number" id="dni" v-model="nuevoAtleta.dni" class="input" placeholder="Tu DNI">
          </div>

          <div class="form-group">
            <label for="nombre">Nombre</label>
            <input type="text" id="nombre" v-model="nuevoAtleta.nombre" class="input" placeholder="Nombre completo">
          </div>

          <div class="form-group">
            <label for="tiempo">Tiempo</label>
            <input type="text" id="tiempo" v-model="nuevoAtleta.tiempo" class="input" placeholder='Ej: "2h 07m 30s"'>
          </div>

          <div class="form-group">
            <label for="ciudadId">Ciudad</label>
            <select id="ciudadId" v-model="nuevoAtleta.ciudadId" class="input">
              <option disabled value="">Seleccioná una ciudad</option>
              <option v-for="c in ciudades" :key="c.id" :value="c.id">{{ c.nombre }}</option>
            </select>
          </div>

          <div class="section-btn">
            <button class="btn-guardar" type="submit">Guardar</button>
            <button type="button" class="btn-eliminar" @click="eliminarAtletaSeleccionado">Eliminar</button>
            <button type="button" class="btn-modificar" @click="modificarAtletaSeleccionado">Modificar</button>
          </div>
        </form>
      </div>

      <!-- Lista de atletas -->
      <div class="card">
        <h2 class="section-title">Atletas Registrados</h2>
        <ul>
          <li v-for="(a, index) in atletas" :key="a.id">
            {{ a.nombre }} - {{ a.dni }} - {{ a.tiempo }} - Posición: {{ a.posicion }} - {{ obtenerNombreCiudad(a.ciudadId) }}
            <button @click="editarAtleta(a, index)">Editar</button>
            <button @click="eliminarAtleta(a.id, index)">Eliminar</button>
          </li>
        </ul>
      </div>

      <!-- Mensaje temporal -->
      <div v-if="mensaje" :class="['toast', tipoMensaje]">{{ mensaje }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/api.js";

const atletas = ref([]);
const ciudades = ref([]);

const nuevoAtleta = ref({
  dni: "",
  nombre: "",
  tiempo: "",
  ciudadId: "",
});

const mensaje = ref("");
const tipoMensaje = ref("");
const indexSeleccionado = ref(null);

const mostrarMensajeTemporal = (tipo, texto) => {
  tipoMensaje.value = tipo;
  mensaje.value = texto;
  setTimeout(() => (mensaje.value = ""), 3000);
};

// Función para calcular posiciones según el tiempo
const actualizarPosiciones = () => {
  const tiempoASegundos = t => {
    if (!t) return Infinity;
    const regex = /(?:(\d+)h)?\s*(?:(\d+)m)?\s*(?:(\d+)s)?/;
    const match = t.match(regex);
    if (!match) return Infinity;
    const h = Number(match[1] || 0);
    const m = Number(match[2] || 0);
    const s = Number(match[3] || 0);
    return h * 3600 + m * 60 + s;
  };

  atletas.value.sort((a, b) => tiempoASegundos(a.tiempo) - tiempoASegundos(b.tiempo));
  atletas.value.forEach((a, idx) => (a.posicion = idx + 1));
};

const cargarAtletas = async () => {
  try {
    const response = await api.get("/atletas");
    atletas.value = response.data.map(a => ({ ...a, posicion: 0 }));
    actualizarPosiciones();
  } catch (err) {
    console.error("Error al cargar atletas:", err);
    mostrarMensajeTemporal("error", "Error al cargar los atletas");
  }
};

const cargarCiudades = async () => {
  try {
    const response = await api.get("/ciudades");
    ciudades.value = response.data;
  } catch (err) {
    console.error("Error al cargar ciudades:", err);
    mostrarMensajeTemporal("error", "Error al cargar las ciudades");
  }
};

const registrarAtleta = async () => {
  if (
    nuevoAtleta.value.dni === "" ||
    !nuevoAtleta.value.nombre.trim() ||
    !nuevoAtleta.value.tiempo.trim() ||
    !nuevoAtleta.value.ciudadId
  ) {
    mostrarMensajeTemporal("error", "Completá todos los campos del atleta");
    return;
  }

  const atletaParaEnviar = {
    dni: Number(nuevoAtleta.value.dni),
    nombre: nuevoAtleta.value.nombre.trim(),
    tiempo: nuevoAtleta.value.tiempo.trim(),
    ciudadId: Number(nuevoAtleta.value.ciudadId),
  };

  try {
    if (indexSeleccionado.value !== null) {
      const id = atletas.value[indexSeleccionado.value].id;
      await api.put(`/atletas/${id}`, atletaParaEnviar);
      atletas.value[indexSeleccionado.value] = { ...atletaParaEnviar, id, posicion: 0 };
      mostrarMensajeTemporal("success", "Atleta modificado correctamente");
      indexSeleccionado.value = null;
    } else {
      const response = await api.post("/atletas", atletaParaEnviar);
      atletas.value.push({ ...response.data, posicion: 0 });
      mostrarMensajeTemporal("success", "Atleta registrado correctamente");
    }

    nuevoAtleta.value = { dni: "", nombre: "", tiempo: "", ciudadId: "" };
    actualizarPosiciones();
  } catch (err) {
    console.error("Error al registrar atleta:", err.response ? err.response.data : err);
    mostrarMensajeTemporal("error", "Error al guardar el atleta");
  }
};

const editarAtleta = (a, index) => {
  nuevoAtleta.value = { ...a };
  indexSeleccionado.value = index;
};

const eliminarAtleta = async (id, index) => {
  if (!confirm("¿Seguro que querés eliminar este atleta?")) return;
  try {
    await api.delete(`/atletas/${id}`);
    atletas.value.splice(index, 1);
    mostrarMensajeTemporal("success", "Atleta eliminado correctamente");
    actualizarPosiciones();
  } catch (err) {
    console.error("Error al eliminar atleta:", err.response ? err.response.data : err);
    mostrarMensajeTemporal("error", "Error al eliminar el atleta");
  }
};

const eliminarAtletaSeleccionado = () => {
  if (indexSeleccionado.value !== null) {
    eliminarAtleta(atletas.value[indexSeleccionado.value].id, indexSeleccionado.value);
    indexSeleccionado.value = null;
    nuevoAtleta.value = { dni: "", nombre: "", tiempo: "", ciudadId: "" };
  } else {
    mostrarMensajeTemporal("error", "Seleccioná un atleta para eliminar");
  }
};

const modificarAtletaSeleccionado = () => {
  if (indexSeleccionado.value !== null) {
    registrarAtleta();
  } else {
    mostrarMensajeTemporal("error", "Seleccioná un atleta para modificar");
  }
};

const obtenerNombreCiudad = (id) => {
  const ciudad = ciudades.value.find(c => c.id === id);
  return ciudad ? ciudad.nombre : "";
};

onMounted(() => {
  cargarAtletas();
  cargarCiudades();
});
</script>

<style scoped>
.main-ctn {
  border-radius: 12px;
  background: #f9fafb;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
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

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: #374151;
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
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-eliminar:hover {
  background: #dc2626;
}

.btn-modificar {
  background: #3b82f6;
  color: white;
  font-weight: 600;
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-modificar:hover {
  background: #2563eb;
}
</style>
