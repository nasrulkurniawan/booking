<template>
  <div class="home">
    <div>
      <a-typography-title :level="2"
        >Selamat Datang di Booking Jadwal Integrasi SIASN-SIMPEG</a-typography-title
      >
    </div>
    <a-row gutter="16">
      <a-col span="8">
        <a-card title="Total Instansi" :bordered="true">
          <a-typography-title level="4">{{ stats.totalInstansi }}</a-typography-title>
        </a-card>
      </a-col>
      <a-col span="8">
        <a-card title="Instansi yang Sudah Submit" :bordered="true">
          <a-typography-title level="4">{{ stats.totalSubmit }}</a-typography-title>
        </a-card>
      </a-col>
      <a-col span="8">
        <a-card title="Instansi yang Belum Submit" :bordered="true">
          <a-typography-title level="4">{{ stats.totalBelumSubmit }}</a-typography-title>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import axios from "axios";
import { Card, Row, Col, Typography } from 'ant-design-vue';
const apiUrl = process.env.VUE_APP_API_URL;

export default {
  name: "HomePage",
  components: {
    'a-card': Card,
    'a-row': Row,
    'a-col': Col,
    'a-typography-title': Typography.Title,
  },
  data() {
    return {
      stats: {
        totalInstansi: 0,
        totalSubmit: 0,
        totalBelumSubmit: 0,
      },
    };
  },
  created() {
    this.fetchStats();
  },
  methods: {
    async fetchStats() {
      try {
        const response = await axios.get(`${apiUrl}/api/stats`);
        this.stats = response.data;
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    },
  },
};
</script>

<style scoped>
.home {
  padding: 10px;
}
</style>
