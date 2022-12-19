<template>
    <div>
        <div class="container">
            <div class="text animated-text">
                To-Do
            </div>
            <form>
                <select v-model="username" id="username" name="username">
                    <option value="Choose your username" disabled>Choose your username</option>
                    <option v-for="user in users" :key="user.id" :value="user.username">{{user.username}}</option>
                </select>
                <input v-model="password" type="password" id="password" name="password" placeholder="Enter your password">
            
                <input type="submit" value="login" @click="handleSubmit"/>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        name: 'SignInView',
        data: ()=>({
            users: [],
            username: 'Choose your username',
            password: '',
        }),
        async beforeMount(){
            const firstLogin = localStorage.getItem('firstLogin');
            if (firstLogin) this.$router.push({name: 'home'});
            const res = await axios.get('users');
            this.users = res.data;
        },
        methods: {
            handleSubmit:async function(e){
                e.preventDefault();
                try{
                    await axios.get('todos', {
                        auth: {
                            username: this.username,
                            password: this.password,
                        }
                    })
                    localStorage.setItem('firstLogin', true);
                    localStorage.setItem('username', this.username);
                    localStorage.setItem('password', this.password);
                    const user = this.users.find((user) => {
                        return (this.username === user.username)
                    })
                    console.log(user.username, user.avatar);
                    localStorage.setItem('name', user.name);
                    localStorage.setItem('avatar', user.avatar);
                    this.$router.push({name: 'home'})
                }catch(err){
                    alert('password is not correct')
                }
            }
        }
    }
</script>


<style scoped>
    .text{
        display: flex; 
        align-items: center; 
        justify-content: center; 
        font-family:Roboto;
        font-size: 50px;
        font-weight: 900;
    }
    .animated-text {
        background-image: url("./../assets/logo.jpg");
        background-color:black ;
        background-size: 100% 50px;
        color: black;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        -webkit-animation: stripes 2s linear infinite;
        animation: stripes 2s linear infinite;
      }
    
    @keyframes stripes {
        100% {
          background-position: 0 -50px;
        }
      }



    .container{
        width: 350px;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.7);
        margin: 200px auto;
        padding: 20px;
    }

    input[type=password], select {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        }

        input[type=submit] {
        width: 100%;
        background-color: #70b853;
        color: white;
        padding: 14px 20px;
        margin: 8px 0;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        }

        input[type=submit]:hover {
        background-color: #70b853;
        }
</style>