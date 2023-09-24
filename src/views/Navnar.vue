
<template>
    <nav class=" container navbar navbar-expand-lg navbar-dark bg-dark " style="justify-content:space-around;"  >
        <a class="navbar-brand" href="#" >Navbar</a>
     
      
        <div class="collapse navbar-collapse " id="navbarSupportedContent" >
          <ul class="navbar-nav mr-auto" style="margin-left:50rem;">
            <li class="nav-item active">
              <RouterLink class="nav-link" to="/" style="color:white">Home </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/studentcreate"  style="color:white" >Create</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to='/student/:id/edit' style="color:white">Edit</RouterLink>
            </li>
            
          </ul>
   
        </div>
      </nav>
</template>