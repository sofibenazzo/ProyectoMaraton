<template>
  <aside class="sidebar">
    <!-- Parte superior -->
    <div>
      <!-- Logo y nombre -->
      <div class="logo-section">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             stroke-width="2" stroke="currentColor" class="logo-icon">
          <path stroke-linecap="round" stroke-linejoin="round" 
                d="M12 3l9 4.5v9L12 21l-9-4.5v-9L12 3z" />
        </svg>
        <span class="logo-text">Sistema de Estadísticas de Maratón</span>
      </div>

      <!-- Menú -->
      <nav class="menu">
        <router-link 
          :to="{ name: 'atletas' }"
          class="menu-item"
          active-class="active"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" class="logo-icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          Atletas
        </router-link>

        <router-link
          :to="{ name: 'ciudades' }"
          class="menu-item"
          active-class="active"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="logo-icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
          </svg>
          Ciudades
        </router-link>
      </nav>
    </div>
  </aside>
</template>

<script setup>
// Sin lógica por ahora
</script>


<style scoped>
.sidebar {
  width: 250px;
  background: radial-gradient(circle, rgba(242, 242, 242, 1) 0%, rgba(148, 187, 233, 1) 350%);

  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid #e0e0e0;
  font-family: 'Inter', sans-serif;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 24px;
}

.logo-icon {
  width: 28px;
  height: 28px;
  color: black;
}

.logo-text {
  
  color: #333;
  font-size: 18px;
  font-weight: 600;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 16px;
}

.menu-item {
  display: flex;
  align-items: center;
  width: 50%;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  color: #333;
  text-decoration: none;
  font-size: 15px;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: #e9ecef;
  width: 90%;
}

.menu-icon {
  width: 20px;
  height: 20px;
  color: #333;
}

.user-section {
  width: 80%;
  height: 30px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid #e0e0e0;
}

.user-avatar {
  width: 32px;
  height: 32px;
  background-color: #1d1d1d;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}
.user-avatar:hover {
  width: 42px;
  height: 42px;
  transition: 0.8s;
  rotate: 360deg;
}
.user-name {
  font-size: 14px;
  color: #333;
}

</style>