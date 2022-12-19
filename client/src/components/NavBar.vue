<template>
    <div class="navbar">
        <div class="animated-text text">To-Do</div> 
        <button @click="toggleProfileDetails" class="profile">▼</button>
    </div>
    <div v-if="displayProfileDetails" class="profile-details">
        <img :src="avatar" class="avatar" />
        <div style="margin-bottom: 10px;">
            {{name}}
        </div>
        <button class="button" @click="logout">logout</button>
    </div>
    </template>

<script>
export default {
    name: 'NavBarVue',
    data: ()=>({
        displayProfileDetails: false
    }),
    methods: {
        toggleProfileDetails(){
            this.displayProfileDetails = !this.displayProfileDetails;
        },
        logout(){
            localStorage.removeItem('name');
            localStorage.removeItem('avatar');
            localStorage.removeItem('username');
            localStorage.removeItem('password');
            localStorage.removeItem('firstLogin');
            this.$router.push({name: 'signIn'});
        }
    },
    computed: {
        name(){
            return localStorage.getItem('name')
        },
        avatar(){
            return localStorage.getItem('avatar');
        }
    },
    
}

</script>


<style scoped>
    .navbar{
        height: 80px;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
        position: sticky;
        top: 0;
        background-color: white;
        z-index: 20;
        display: flex;
    }
    .text{
        display: flex; 
        align-items: center; 
        justify-content: center; 
        height: 100%; 
        margin-left:25px; 
        font-family:Roboto;
        font-size: 40px;
        font-weight: 900;
        width:fit-content;
        flex-grow: 1;
        justify-content: flex-start;
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

      .profile{
        border: none;
        height: 35px;
        width: 35px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        transition-duration: 0.4s;
        cursor: pointer;
        border: 2px solid #70b853;
        background-color: white; 
        color: #70b853; 
        margin:auto 25px auto 0;
        border-radius: 50%;
      }

      .profile-details{
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        position: fixed;
        right: 20px;
        top: 80px;
        width: 250px;
        padding: 25px;
        display: flex;
        align-items: center;
        flex-direction: column;
        background-color: white;
        z-index: 20;
      }


      .avatar{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 10px;
    }



    .button {
        border: none;
        padding: 10px 32px;
        text-align: center;
        text-decoration: none;
        font-size: 16px;
        transition-duration: 0.4s;
        cursor: pointer;
        border: 2px solid #f44336;
        background-color: #f44336;
        color: white;
    }
    .button:hover {
        background-color: white;  
        color: #f44336; 
    }

</style>