<template>
  <v-app>
    <HeaderView @delete-local-storage="deleteLocalStorage" />

    <v-main>
      <v-container>
        <router-view
          @add-book-list="addBook"
          :books="books"
          @update-book-info="updateBookInfo"
        />
      </v-container>
    </v-main>
    <FooterView />
  </v-app>
</template>

<script>
import HeaderView from '@/global/HeaderView.vue'
import FooterView from '@/global/FooterView.vue'
const STORAGE_KEY = 'books'

export default {
  name: 'App',
  components: {
    HeaderView,
    FooterView
  },

  data() {
    return {
      books: [],
      newBook: null
    }
  },
  mounted() {
    if(localStorage.getItem(STORAGE_KEY)) {
      try {
        this.books = JSON.parse(localStorage.getItem(STORAGE_KEY));
      } catch (error) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  },
  methods: {
    addBook(e) {
      this.books.push({
        id: this.books.length,
        title: e.title,
        image: e.image,
        description: e.description,
        readDate: '',
        memo: ''
      });

      // this.newBook = '';
      this.saveBooks();
      this.goToEditPage(this.books.slice(-1)[0].id);
    },
    removeBook(x) {
      this.books.splice(x, 1);
      this.saveBooks();
    },
    // ローカルストレージに保存
    saveBooks() {
      const parsed = JSON.stringify(this.books);
      localStorage.setItem(STORAGE_KEY, parsed);
    },
    goToEditPage(id) {
      this.$router.push(`/edit/${id}`);
    },
    updateBookInfo(e) {
      const updateInfo = {
        id: e.id,
        readDate: e.readDate,
        memo: e.memo,
        title: this.books[e.id].title,
        image: this.books[e.id].image,
        description: this.books[e.id].description,
      }

      this.books.splice(e.id, 1, updateInfo);
      this.saveBooks();
      this.$router.push('/');
    },
    deleteLocalStorage() {
      const isDeleted = 'LocalStorageのデータを削除しますか？';
      if(window.confirm(isDeleted)) {
        localStorage.setItem(STORAGE_KEY, '');
        localStorage.removeItem(STORAGE_KEY);
        this.books = []
        window.location.reload();
      }
    },
  }
};
</script>
