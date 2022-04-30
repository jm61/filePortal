<script>
    import { goto } from "$app/navigation";
    import { getAuth, signOut } from "firebase/auth";
    import { isLoggedIn, firstName } from "../../../stores/authStore";
    const auth = getAuth();
    function logout() {
      signOut(auth)
        .then(() => {
          localStorage.removeItem("uid");
          localStorage.setItem("isLoggedIn", false);
          firstName.set("😟");
          goto("/login");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  </script>
  
  <ul class="nav justify-content-end bg-dark">
    <li class="nav-item isLi" title="username">{$firstName}</li>
    <li class="nav-item">
      {#if $isLoggedIn}
        <a class="nav-link" aria-current="page" href="/">Home</a>
      {/if}
    </li> 
    <li class="nav-item">
      <a class="nav-link" target="_blank" href="https://ryanboddy.net"
        >My Website</a
      >
    </li>
        {#if $isLoggedIn}
    <li class="nav-item">
            <a
            class="nav-link"
            on:click|preventDefault={logout}
            target="_blank"
            href="/">Sign Out</a
            >
    </li>
        {/if}
  </ul>

  <style>
    .isLi {
      margin: .5rem;
      margin-right: auto;
      background-color: #008cc0;
      color: white;
      padding: 2px 5px;
      border-radius: 5px;
    }
  </style>
  