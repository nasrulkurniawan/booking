<template>
  <a-row type="flex" class="login-container">
    <a-col xs="24" md="8" class="left-side">
      <div class="login-content" :style="{ minWidth: '75%' }">
        <a-card bordered="false" class="login-card">
          <div class="login-header">
            <div class="apple-like-logo">BKN</div>
            <a-typography-title level="2" class="login-title">Login</a-typography-title>
          </div>
          <a-form @submit.prevent="handleSubmit" layout="vertical">
            <a-form-item label="Username" required>
              <a-input v-model:value="username" placeholder="Enter your username" class="input-field" />
            </a-form-item>
            <a-form-item label="Password" required>
              <a-input v-model:value="password" type="password" placeholder="Enter your password" class="input-field" />
            </a-form-item>
            <a-form-item>
              <a-row gutter="16">
                <a-col span="12">
                  <a-button type="primary" html-type="submit" block class="submit-button">Login</a-button>
                </a-col>
                <a-col span="12">
                  <a-button type="default" block @click="handleBack" class="back-button">Back</a-button>
                </a-col>
              </a-row>
            </a-form-item>
          </a-form>
        </a-card>
      </div>
    </a-col>
    <a-col xs="24" md="16" class="right-side">
      <div class="welcome-message">
        <h1>Selamat datang di booking jadwal zoom demo integrasi SIASN - SIMPEG</h1>
      </div>
    </a-col>
  </a-row>
</template>

<script>
import axios from 'axios';
import { message } from 'ant-design-vue';
const apiUrl = process.env.VUE_APP_API_URL;

export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post(`${apiUrl}/api/login`, {
          username: this.username,
          password: this.password,
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        localStorage.setItem('token', response.data.token);
        this.$router.push('/adminjadwal');
        message.success('Login successful');
      } catch (error) {
        message.error('Login failed');
        console.error(error);
      }
    },
    handleBack() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Helvetica:wght@300;400;500;700&display=swap');

.login-container {
  height: 100vh;
  display: flex;
  align-items: stretch;
}

.left-side {
  background: linear-gradient(135deg, #6b73ff, #000dff, #ba54f5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 35%;
}

.right-side {
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 65%;
}

.login-card {
  width: 100%;
  max-width: 450px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: white;
}

.login-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.apple-like-logo {
  font-family: 'Helvetica', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  padding: 10px;
}

.login-title {
  margin-left: 10px;
  font-family: 'Helvetica', sans-serif;
  color: black; /* Pastikan warna teks terlihat */
}

.input-field {
  font-family: 'Helvetica', sans-serif;
  font-size: 0.9rem;
}

.submit-button,
.back-button {
  font-family: 'Helvetica', sans-serif;
  font-size: 0.9rem;
}

.welcome-message {
  text-align: center;
  padding: 0 20px;
  overflow: hidden;
  width: 100%;
}

.welcome-message h1 {
  font-family: 'Helvetica', sans-serif;
  font-size: 2.5rem;
  font-weight: 300;
  background: linear-gradient(135deg, #6b73ff, #000dff, #ba54f5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  line-height: 1.2;
  animation: slideIn 3s ease-in-out infinite;
}

/* Keyframes for the sliding animation */
@keyframes slideIn {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  20% {
    transform: translateX(0);
    opacity: 1;
  }
  80% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-100%);
    opacity: 0;
  }
}
</style>
