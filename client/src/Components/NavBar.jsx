import React from 'react';

const NavBar = () => {
    return (
        <>
          <nav class="container flex justify-around py-8 mx-auto bg-white">
  <div class="flex items-center">
    <h3 class="text-2xl font-medium text-blue-500">LOGO</h3>
  </div>
  <div class="items-center hidden space-x-8 lg:flex">
    <a href="">Home</a>
    <a href="">About Us</a>
    <a href="">Blogs</a>
    <a href="">Our Team</a>
    <a href="">Contact Us</a>
  </div>
  <div class="flex items-center space-x-2">
    <button class="px-4 py-2 text-blue-100 bg-blue-800 rounded-md">
      Sign in
    </button>
    <button class="px-4 py-2 text-gray-200 bg-gray-400 rounded-md">
      Sign up
    </button>
  </div>
</nav>
        </>
    );
}

export default NavBar;
