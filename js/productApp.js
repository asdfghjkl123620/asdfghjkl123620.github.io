import {createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

createApp({
    data() {
        return {
            apiProd: `https://vue3-course-api.hexschool.io/v2`,
            apiPath: `chingvegetable`,
            //initial one array for products
            prods: [],
            tempProds: {}
        }
    },
    methods: {
        checkAdmin() {
            const url = `${this.apiProd}/api/user/check`;
            axios.post(url)
            .then(() => {
                this.getData();    
            })
            .catch(err => {
                console.dir(err);
                const errObj = JSON.parse(err.config.data);
                console.log(errObj);
                Swal.fire({
                    icon: 'error',
                    title: '錯誤...',
                    text: `發生了一些錯誤，${err.data.message}此用戶不存在，請重新輸入`,
                    footer: '<a href="">為甚麼有這個錯誤?</a>'
                  })
                window.location = 'index.html';
            })
        },
        getData() {
            const prodUrl = `${this.apiProd}/api/${this.apiPath}/admin/products`;
            axios.get(prodUrl)
            .then((res) => {
                this.prods = res.data.products;
            })
            .catch((err) => {
                console.dir(err);
                const errObj = JSON.parse(err.config.data);
                console.log(errObj);
                Swal.fire({
                    icon: 'error',
                    title: '錯誤...',
                    text: `發生了一些錯誤，${err.data.message}此用戶不存在，請重新輸入`,
                    footer: '<a href="">為甚麼有這個錯誤?</a>'
                  })  
            })
        },
        openProd(itm) {
            this.tempProds = itm;
        }
    },
    mounted() {
        //取出token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common.Authorization = token;

        this.checkAdmin();
    },
}).mount(`#appProducts`);