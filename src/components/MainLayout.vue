<template>
  <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo">
        <span class="logo-text">Kanreg I BKN</span>
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1" @click="navigateTo('/')">
          <home-outlined />
          <span>Beranda</span>
        </a-menu-item>
        <a-menu-item v-if="!isLoggedIn" key="2" @click="navigateTo('/users')">
          <user-outlined />
          <span>Booking Jadwal</span>
        </a-menu-item>
        <a-menu-item v-if="isLoggedIn" key="3" @click="navigateTo('/adminjadwal')">
          <user-outlined />
          <span>Kelola Jadwal</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0; display: flex; justify-content: space-between;">
        <div>
          <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="toggle"
          />
          <menu-fold-outlined v-else class="trigger" @click="toggle" />
        </div>
        <div>
          <a-dropdown>
            <a-avatar icon="BKN" />
            <template #overlay>
              <a-menu>
                <a-menu-item v-if="!isLoggedIn" @click="navigateTo('/login')">
                  <login-outlined />
                  <span>Login</span>
                </a-menu-item>
                <a-menu-item v-if="isLoggedIn" @click="logout">
                  <logout-outlined />
                  <span>Logout</span>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content
        :style="{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px', margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '720px' }"
      >
        <router-view />
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Express js Ant vue Design ©2024
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  UserOutlined,
  HomeOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LoginOutlined,
  LogoutOutlined,
} from '@ant-design/icons-vue';

const selectedKeys = ref(['1']);
const collapsed = ref(false);
const router = useRouter();
const isLoggedIn = ref(!!localStorage.getItem('token'));

const navigateTo = (path) => {
  router.push(path);
};

const toggle = () => {
  collapsed.value = !collapsed.value;
};

const logout = () => {
  localStorage.removeItem('token');
  isLoggedIn.value = false;
  navigateTo('/');
};
</script>

<style scoped>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.logo {
  height: 32px;
  /* background: rgba(255, 255, 255, 0.3); */
  margin: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-text {
  font-size: 1.2rem;
  color: white;
  font-weight: bold;
  text-align: center;
  width: 100%;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
