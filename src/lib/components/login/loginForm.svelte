<script>
    import {goto} from '$app/navigation'
    import {firstName} from '../../../stores/authStore'
    import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth'
    export let title

    const login = () => {
      let email = document.querySelector('#emailInput').value
      let password = document.querySelector('#passInput').value
      if(title === 'Login') {
        signInWithEmailAndPassword(getAuth(), email, password)
          .then((userCredential) => {
            const user = userCredential.user
            firstName.set((user.email).split('.')[0])
            localStorage.setItem('uid', user.uid)
            localStorage.setItem('isLoggedIn', true)
            goto('/')
          })
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorCode, errorMessage)
          })
      } else {
        let checkPassword = document.querySelector('#checkPassInput').value
        if(password !== checkPassword) {
          alert('Passwords do not match')
          document.querySelector('#myForm').reset()
          return
        }
        createUserWithEmailAndPassword(getAuth(), email, password)
          .then((userCredential) => {
            const user = userCredential.user
            console.log(user)
            goto('/')
          })
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorCode, errorMessage)
          })
      } 
    }

</script>

<div class="login">
    <div class="card">
      <div class="card-body login-form">
        <h5 class="card-title">{title}</h5>
        <form on:submit|preventDefault={login} id='myForm'>
          <div class="mb-3">
            <label for="emailInput" class="form-label">Email address</label>
            <input
              type="email"
              class="form-control"
              id="emailInput"
              aria-describedby="emailHelp"
              placeholder="Email Address"
              required
            />
            {#if title != "Login"}
              <div id="emailHelp" class="form-text">
                We'll never share your email with anyone else.
              </div>
            {/if}
          </div>
          <div class="mb-3">
            <label for="passInput" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="passInput"
              placeholder="Password"
              required
            />
          </div>
          {#if title != 'Login' }
          <div class="mb-3">
            <label for="checkPassInput" class="form-label">Confirm Password</label>
            <input
              type="password"
              class="form-control"
              id="checkPassInput"
              placeholder="Confirm Password"
              required
            />
          </div>
          {/if}
          <button type="submit" class="btn btn-primary">Submit</button>
          {#if title != 'Login' }
          <a href='/login' class="btn btn-warning">Cancel</a>
          {/if}
        </form>
        {#if title == "Login"}
          <p class="float-end mt-3">
            Not a user? <a href="/signup" class="card-link">Sign Up</a>
          </p>
        {/if}
      </div>
    </div>
  </div>
  
  <style>
    .card {
      width: 50%;
      margin: 0 auto;
    }
    .login {
      margin-top: 50px;
      margin-bottom: 50px;
    }
    .login-form {
      width: 60%;
      margin: 0 auto;
    }
    @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
      .login-form {
        width: 90%;
      }
      .card {
        width: 90%;
      }
    }
  </style>