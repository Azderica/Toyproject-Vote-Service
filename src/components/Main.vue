<template>
  
</template>

<script>
import { required, email, numeric, minValue, minLength, sameAs } from 'vuelidate/lib/validators';
import axios from 'axios';

// required : The vlaue is compulsory
// email : Value must be an email
// numeric : Must be a number
// minValue : Least numerical value the user can input
// sameAs : Used to compare between two values to make sure they're the same

export default {

    validations: {
        email: {
            required,
            email,
            unique: val => {
                if(val == '') return true
                return axios.get('https://vue-journal.firebaseio.com/users.json?orderBy="email"&equalTo="' + val + '"')
                .then(res => {
                    return Object.keys(res.data).length == 0
                })
            }
        }
    }
}
</script>

<style>

</style>