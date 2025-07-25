// store/UserStore.jsx
import axios from 'axios';
import { create } from 'zustand';

export const UserStore = create((set) => ({
  user: null,
  isAutth:true,
  noteid:null,
  setnoteid:(id)=>{
    set({noteid:id})
  },
  checkAuth: async () => {
    try {

      const res = await axios.get('/apii/user/check');
      set({ user: res.data });
    } catch {
      set({ user: null });
         set({isAutth:false});
    }finally{
        set({isAutth:false});
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
