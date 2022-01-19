import {createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

createApp({
    data() {
        return {
            user: {
                username:"",
                password:""
            }
        }
    },
    methods: {
        login() {
            const url = 'https://vue3-course-api.hexschool.io/v2';
            console.log(this.user);
            axios.post(`${url}/admin/signin`, this.user)
            .then(res => {
                console.log(res);
                const {token, expired} = res.data;
                //1.write in cookie token           
                //2.expire set effect timing
                document.cookie = `myToken=${token};expires=${new Date(expired)};path=/`
                window.location = 'products.html';
            })
            .catch(err => {
                console.dir(err);
                const errObj = JSON.parse(err.config.data);
                console.log(errObj);

                switch (err.data.error.code) {
                    case "auth/wrong-password":
                        Swal.fire({
                            icon: 'error',
                            title: '錯誤...',
                            text: `發生了一些錯誤，您的password:${errObj.password}是錯誤的`,
                          })
                    break;
                    case "auth/argument-error":
                        Swal.fire({
                            icon: 'error',
                            title: '錯誤...',
                            text: `發生了一些錯誤，您的參數0是錯誤的`,
                            footer: '<a href="">為甚麼有這個錯誤?</a>'
                          })
                    break;
                    case "auth/user-not-found":
                        Swal.fire({
                            icon: 'error',
                            title: '錯誤...',
                            text: `發生了一些錯誤，${err.data.message}，${errObj.username}此用戶不存在，請重新輸入`,
                            footer: '<a href="">為甚麼有這個錯誤?</a>'
                          })
                    break;
                }
        
          
                
            });
        }
    },
}).mount(`#app`);