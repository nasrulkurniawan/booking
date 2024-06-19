<template>
  <div>
    <a-form
      @submit.prevent="handleSubmit"
      class="login-form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 13 }"
      ref="formRef"
    >
      <a-alert
        v-if="errorMessage"
        message="Error"
        description="Semua field input form tidak boleh kosong."
        type="error"
        show-icon
        style="margin-bottom: 16px"
      />
      <a-form-item
        ref="name"
        label="Name"
        name="name"
        :validate-status="errors.name ? 'error' : ''"
        :help="errors.name"
      >
        <a-input v-model:value="form.name" placeholder="Name" />
      </a-form-item>
      <a-form-item
        ref="email"
        label="Email"
        name="email"
        :validate-status="errors.email ? 'error' : ''"
        :help="errors.email"
      >
        <a-input v-model:value="form.email" placeholder="Email" />
      </a-form-item>
      <a-form-item
        ref="whatsapp"
        label="Whatsapp"
        name="whatsapp"
        :validate-status="errors.whatsapp ? 'error' : ''"
        :help="errors.whatsapp"
      >
        <a-input v-model:value="form.whatsapp" placeholder="Whatsapp" />
      </a-form-item>
      <a-form-item
        ref="instansi"
        label="Instansi"
        name="instansi"
        :validate-status="errors.instansi ? 'error' : ''"
        :help="errors.instansi"
      >
        <a-select
          v-model:value="form.instansi"
          placeholder="Select Instansi"
          show-search
          :filter-option="filterInstansi"
        >
          <a-select-option
            v-for="instansi in instansiList"
            :key="instansi.id"
            :value="instansi.id"
          >
            {{ instansi.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        ref="jadwal"
        label="Pilih Tanggal"
        name="jadwal"
        :validate-status="errors.jadwal ? 'error' : ''"
        :help="errors.jadwal"
      >
        <a-select
          v-model:value="form.jadwal"
          placeholder="Select Jadwal"
          :options="jadwalOptions"
        >
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">{{
          isEditing ? "Update" : "Submit"
        }}</a-button>
      </a-form-item>
    </a-form>

    <a-row type="flex" justify="space-between" style="margin-bottom: 16px">
      <a-col>
        <a-input-search
          v-model:value="search"
          placeholder="Search by name or email"
          @search="fetchUsers"
        />
      </a-col>
      <a-col>
        <a-col>
          <a-select
            v-model="selectedInstansifilter"
            placeholder="Filter by Instansi"
            show-search
            :filter-option="filterInstansi"
            @change="handleInstansiFilterChange"
            style="width: 200px"
          >
            <a-select-option
              v-for="instansi in instansifilterList"
              :key="instansi.id"
              :value="instansi.id"
            >
              {{ instansi.name }}
            </a-select-option>
          </a-select>
        </a-col>
        <!-- <a-select
            v-model="pagination.pageSize"
            @change="handlePageSizeChange"
            style="width: 120px;"
          >
            <a-select-option value="5">5</a-select-option>
            <a-select-option value="10">10</a-select-option>
            <a-select-option value="20">20</a-select-option>
            <a-select-option value="50">50</a-select-option>
            <a-select-option value="100">100</a-select-option>
          </a-select> -->
      </a-col>
    </a-row>

    <!-- Filter Instansi Dropdown -->
    <!-- <a-row type="flex" justify="space-between" style="margin-bottom: 16px;">
        <a-col>
          <a-select
            v-model="selectedInstansifilter"
            placeholder="Filter by Instansi"
            show-search
            :filter-option="filterInstansi"
            @change="handleInstansiFilterChange"
            style="width: 200px;"
          >
            <a-select-option v-for="instansi in instansiList" :key="instansi.id" :value="instansi.id">
              {{ instansi.name }}
            </a-select-option>
          </a-select>
        </a-col>
      </a-row> -->

    <a-spin size="large" :spinning="loading">
      <a-table
        :columns="columns"
        :dataSource="users"
        :pagination="{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20', '50', '100'],
          showQuickJumper: true,
        }"
        rowKey="id"
        @change="handleTableChange"
      />
    </a-spin>
  </div>
</template>

<script>
import axios from "axios";
import { ref, reactive, toRaw, h, onMounted } from "vue";
import { Button, Popconfirm, message } from "ant-design-vue";
import moment from "moment";
import "moment/locale/id"; // Import locale Indonesia
moment.locale("id"); // Set locale to Indonesia
const apiUrl = process.env.VUE_APP_API_URL;

export default {
  setup() {
    const formRef = ref(null);
    const form = reactive({
      id: null,
      name: "",
      email: "",
      whatsapp: "",
      instansi: null,
    });
    const errors = reactive({
      name: "",
      email: "",
      whatsapp: "",
      instansi: "",
      jadwal: "",
    });
    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    };
     const isValidWhatsAppNumber = (number) => {
      const regex = /^62\d{8,11}$/;
      return regex.test(number);
    };
    const rules = {
      name: [{ required: true, message: "Please input Name", trigger: "change" }],
      email: [{ required: true, message: "Please input Email", trigger: "change" }],
      whatsapp: [{ required: true, message: "Please input Whatsapp", trigger: "change" }],
      instansi: [
        { required: true, message: "Please select Instansi", trigger: "change" },
      ],
    };
    const users = ref([]);
    const search = ref("");
    const selectedInstansifilter = ref(null); // Selected Instansi for filtering
    const pagination = reactive({
      current: 1,
      pageSize: 10,
      total: 0,
    });
    const instansiList = ref([]);
    const instansifilterList = ref([]);
    const jadwalOptions = ref([]);
    const isEditing = ref(false);
    const errorMessage = ref(false);
    const loading = ref(false);

    const handleSubmit = async () => {
      try {
        // Reset errors
        Object.keys(errors).forEach(key => errors[key] = '');

        if (!form.name) errors.name = 'Nama wajib diisi';
        if (!form.email) {
          errors.email = "Email wajib diisi";
        } else if (!validateEmail(form.email)) {
          errors.email = "Email tidak valid";
        }
        if (!form.whatsapp) {
          errors.whatsapp = "Whatsapp wajib diisi";
        } else if (!isValidWhatsAppNumber(form.whatsapp)) {
          errors.whatsapp = "Nomor WhatsApp tidak valid. Nomor harus dimulai dengan 62 dan memiliki 10 hingga 13 digit setelah kode negara.";
        }
        if (!form.instansi) errors.instansi = 'Instansi wajib dipilih';
        if (!form.jadwal) errors.jadwal = 'Jadwal wajib dipilih';

        if (Object.values(errors).some(err => err)) {
          return;
        }

        errorMessage.value = false;

        if (isEditing.value) {
          const response = await axios.put(
            `${apiUrl}/api/users/${form.id}`,
            toRaw(form)
          );
          console.log(response.data);
          message.success("Data berhasil diperbarui");
          fetchUsers();
          fetchInstansi();
          fetchJadwal();
          resetForm();
        } else {
          const response = await axios.post(
            `${apiUrl}/api/submit`,
            toRaw(form)
          );
          console.log(response.data);
          await bookJadwal(form.jadwal);
          message.success("Data berhasil ditambahkan");
          fetchUsers();
          fetchInstansi();
          fetchJadwal();
          resetForm();
        }
      } catch (error) {
        console.log("Validation failed:", error);
        errorMessage.value = true;
      }
    };

    const bookJadwal = async (jadwalId) => {
      try {
        await axios.post(
          `${apiUrl}/api/jadwal/${jadwalId}/book`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        fetchJadwal();
      } catch (error) {
        console.error("Failed to book jadwal:", error);
      }
    };

    const fetchJadwal = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/jadwal`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        jadwalOptions.value = response.data.map((j) => ({
          value: j.tanggal,
          label: moment(j.tanggal).format("dddd, DD MMMM YYYY"),
        }));
      } catch (error) {
        console.error(error);
      }
    };

    const fetchUsers = async (paginationData = pagination, sorter = {}) => {
      loading.value = true;
      const params = {
        page: paginationData.current,
        pageSize: paginationData.pageSize,
        search: search.value,
        instansi: selectedInstansifilter.value, // Add instansi to params
        sortField: sorter.field || "id",
        sortOrder: sorter.order || "descend",
      };
      try {
        const response = await axios.get(`${apiUrl}/api/users`, {
          params,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        users.value = response.data;
        pagination.total = parseInt(response.headers["x-total-count"]);
      } catch (error) {
        console.error(error);
      } finally {
        loading.value = false;
      }
    };

    const fetchInstansi = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/instansi`);
        instansiList.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    const fetchInstansifilter = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/instansifilter`);
        instansifilterList.value = response.data;
      } catch (error) {
        console.error(error);
      }
    };

    const handleTableChange = (paginationData, filters, sorter) => {
      pagination.current = paginationData.current;
      fetchUsers(paginationData, sorter);
    };

    const handlePageSizeChange = (pageSize) => {
      pagination.pageSize = pageSize;
      pagination.current = 1;
      fetchUsers();
    };

    const handleDelete = async (id) => {
      const token = localStorage.getItem("token"); // Ambil token dari localStorage
      if (!token) {
        message.error("Anda harus login terlebih dahulu");
        return;
      }

      try {
        const response = await axios.delete(`${apiUrl}/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Tambahkan header Authorization
          },
        });
        console.log(response.data);
        message.success("Data berhasil dihapus");
        fetchUsers();
        fetchInstansi();
        fetchJadwal();
      } catch (error) {
        console.error(error);
        message.error("Gagal menghapus data");
      }
    };

    const handleEdit = (record) => {
      isEditing.value = true;
      form.id = record.id;
      form.name = record.name;
      form.email = record.email;
      form.whatsapp = record.whatsapp;
    };

    const resetForm = () => {
      isEditing.value = false;
      form.id = null;
      form.name = "";
      form.email = "";
      form.whatsapp = "";
      form.instansi = null;
      form.jadwal = null;
    };

    const filterInstansi = (input, option) => {
      return option.children.toString().toLowerCase().includes(input.toLowerCase());
    };

    const handleInstansiFilterChange = (value) => {
      selectedInstansifilter.value = value;
      fetchUsers();
    };

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        sorter: true,
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        sorter: true,
      },
      {
        title: "Whatsapp",
        dataIndex: "whatsapp",
        key: "whatsapp",
        sorter: true,
      },
      {
        title: "Instansi",
        dataIndex: "instansi_name",
        key: "instansi_name",
        sorter: true,
      },
      {
        title: "Jadwal",
        dataIndex: "tanggal",
        key: "tanggal",
        sorter: true,
        customRender: ({ text }) => moment(text).format("dddd, DD MMMM YYYY"),
      },
      {
        title: "Action",
        key: "action",
        customRender: ({ record }) => {
          return h("div", [
            h(
              Button,
              {
                type: "primary",
                onClick: () => handleEdit(record),
              },
              { default: () => "Edit" }
            ),
            h(
              Popconfirm,
              {
                title: "Apakah yakin mau menghapus data ini?",
                onConfirm: () => handleDelete(record.id),
                onCancel: () => message.info("Delete cancelled"),
                okText: "Yes",
                cancelText: "No",
              },
              {
                default: () => h(Button, { type: "danger" }, { default: () => "Delete" }),
              }
            ),
          ]);
        },
      },
    ];

    onMounted(() => {
      fetchUsers();
      fetchInstansi();
      fetchInstansifilter();
      fetchJadwal();
    });

    return {
      formRef,
      form,
      rules,
      errors,
      users,
      search,
      selectedInstansifilter, // Add this to the returned object
      pagination,
      instansiList,
      instansifilterList,
      isEditing,
      jadwalOptions,
      errorMessage,
      loading,
      handleSubmit,
      fetchUsers,
      fetchInstansi,
      fetchInstansifilter,
      fetchJadwal,
      handleTableChange,
      handlePageSizeChange,
      handleDelete,
      handleEdit,
      resetForm,
      filterInstansi,
      handleInstansiFilterChange, // Add this to the returned object
      columns,
    };
  },
};
</script>

<style>
/* Tambahkan style Anda di sini jika perlu */
</style>
