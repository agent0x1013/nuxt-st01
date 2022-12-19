<template>
  <div class="home">
    <div class="container">
      <div class="title">
        Uncompleted Tasks
      </div>
      <div class="tasks-container">
        <div v-for="task in tasks.filter((task)=>{ return task.completed === false})" :key="task.id" class="tasks">
          <div style="font-size: 20px;">{{task.task}}</div>
          <div style="text-align: right; margin-top:10px;">
            <button class="small-button"  @click="toggleComplete(task.id)" >completed</button>
            <button class="small-button"  @click="deleteNote(task.id)">Delete</button>
          </div>
        </div>
    </div>
    </div>
    <div class="container">
      <div class="title">
        completed Tasks
      </div>
      <div class="tasks-container">
        <div v-for="task in tasks.filter((task)=>{ return task.completed === true})" :key="task.id" class="tasks">
          <div style="font-size: 20px;">{{task.task}}</div>
          <div style="text-align: right; margin-top:10px;">
            <button class="small-button"  @click="toggleComplete(task.id)" >uncompleted</button>
            <button class="small-button"  @click="deleteNote(task.id)">Delete</button>
          </div>
        </div>
    </div>
    </div>


    <button class="fab" @click="displayAddFun">+</button>

    <div class="display-add" v-if="displayAdd">
      <input type="text" v-model="newTask" placeholder="Enter the new task">
      <button class="button add" @click="addNote" >Add</button>
      <button class="button close" @click="displayAddFun">Close</button>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src

import axios from 'axios';

export default {
  name: 'HomeView',
  components: {
    
  },
  data: ()=>({
    completedTasks: [],
    unCompletedTasks: [],
    tasks: [],
    displayAdd: false,
    newTask: '',
  }),
  methods: {
    displayAddFun(){
      this.displayAdd = !this.displayAdd;
    },
    async addNote(){
      const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
      await axios.post('todos', {task: this.newTask}, {
        auth: {
            username,
            password,
        }
      })
      this.newTask = '';
      this.displayAdd = !this.displayAdd;
      const res = await axios.get('todos', {
          auth: {
              username,
              password,
          }
      });
    this.tasks = res.data;
    },
    async toggleComplete(id){
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');
      await axios.put('todos/' + id, {}, {
        auth: {
              username,
              password,
          }
      });
      const res = await axios.get('todos', {
          auth: {
              username,
              password,
          }
      });
    this.tasks = res.data;
    },
    async deleteNote(id){
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');
      await axios.delete('todos/' + id,  {
        auth: {
              username,
              password,
          }
      })
      const res = await axios.get('todos', {
          auth: {
              username,
              password,
          }
      });
      this.tasks = res.data;
    }
  },
  async beforeMount(){
    const firstLogin = localStorage.getItem('firstLogin');
    if (!firstLogin) this.$router.push({name: 'signIn'});
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const res = await axios.get('todos', {
          auth: {
              username,
              password,
          }
      });
    this.tasks = res.data;
  }
}
</script>


<style>
  .container{
    width: 90%;
    margin: 50px auto;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    padding: 20px;
  }
  .title{
    text-align: center;
    font-size: 35px;
    color: #70b853;
  }
  .tasks-container{
    padding: 30px;
  }

  .tasks{
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
    padding: 30px 20px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
  }
  .fab{
    position: fixed;
    bottom: 20px;
    right:20px;
    border: none;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
    width:70px;
    border-radius: 50%;
    font-size: 30px;
    cursor: pointer;
    background-color: #70b853;
    color: white;
  }
  .display-add{
    z-index: 20;
    background-color: white;
    position: fixed;
    bottom: 20px;
    right:20px;
    width:250px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  }

  input[type=text], select {
        width: 95%;
        margin: 10px auto;
        padding: 12px 20px;
        display: block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        }

        .small-button{
          border: none;
          padding: 10px 0;
          display: inline-block;
          margin: 5px;
          width:120px;
          text-align: center;
          text-decoration: none;
          font-size: 16px;
          transition-duration: 0.4s;
          cursor: pointer;
          color: black;
        }

        @media only screen and (max-width: 500px) {
          .small-button{
            display: block;
            width:100%;
          }
        }

    .button {
        border: none;
        padding: 10px 32px;
        width: 95%;
        margin: 10px auto;
        text-align: center;
        text-decoration: none;
        font-size: 16px;
        transition-duration: 0.4s;
        cursor: pointer;
        display: block;
        color: white;
    }
    .close{
        background-color: #f44336;
    }
    .add{
      background-color: #28a745;
    }



</style>
