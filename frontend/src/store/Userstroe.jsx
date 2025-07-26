// store/UserStore.jsx
import axios from 'axios';
import { create } from 'zustand';

export const UserStore = create((set) => ({
  user: null,
  isAutth:true,
  noteid:null,
  postdata:null,
  notedata:null,
  loading:false,
  setnoteid:(id)=>{
    set({noteid:id})
  },
  checkAuth: async () => {
    try {
      set({loading:true})
      const res = await axios.get('/apii/user/check');
      set({ user: res.data ,loading:false});
    } catch {
      set({ user: null });
         set({isAutth:false});
    }finally{
        set({isAutth:false,loading:false});
    }
  },
  signup:async(data)=>{
     try{
   const res=await axios.post('/apii/user/signup',data)
   set({user:res.data})
    console.log(res.data)
  }
  catch(e){
    console.log(e);
     set({ user: null });
  }

  },

post:async(id)=>{
    try{
const res=await axios.get(`/apii/post/${id}`)
console.log(id)
set({postdata:res.data})
    }catch(e){
      console.log("post",e);
     set({ postdata: null });

    }
},
notes:async(id)=>{
  try{
    const res=await axios.get(`/apii/dir/${id}`)
    set({notedata:res.data})
    console.log("notestore",res.data)
  }
  catch(e){
    console.log("post",e);
    set({notedata:null})
  }
},






    login:async(data)=>{
     try{
   const res=await axios.post('/apii/user/login',data)
   set({user:res.data})
    console.log(res.data)
  }
  catch(e){
    console.log(e);
     set({ user: null });
  }

  },

}));
