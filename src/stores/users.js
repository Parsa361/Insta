import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../supabase'

export const useUserStore = defineStore('users', () => {

  const user = ref(null);
  const errorMsg = ref('');
  const loading = ref(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = () => {

  }
  const handleSignup = async (credentials) => {
    const { email, password, username } = credentials;

    if (password.length < 6) {
      return errorMsg.value = "Password length is too short"
    }

    if (username.length < 4) {
      return errorMsg.value = "Username length is too short"
    }

    if (!validateEmail(email)) {
      return errorMsg.value = 'Email is invalid'
    }

    errorMsg.value = '';
    loading.value = true;

    const { data: userWithUsername } = await supabase
      .from('users')
      .select()
      .eq('username', username)
      .single()

    if (userWithUsername) {
      loading.value = false;
      return errorMsg.value = "User already registered"
    }

    // VALIDATE IF USER EXIST //
    const { error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      loading.value = false;
      return errorMsg.value = error.message
    }

    await supabase.from("users").insert({
      username,
      email,
    })

    const { data: newUser } = await supabase
      .from('users')
      .select()
      .eq('email', email)
      .single()

    user.value = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username
    }

    loading.value = false;

  }
  const handleLogout = () => {

  }
  const getUser = () => {

  }
  const clearErrorMsg = () => {
    errorMsg.value = ''
  }
  return { user, errorMsg, loading, handleLogin, handleSignup, handleLogout, getUser, clearErrorMsg }
})
