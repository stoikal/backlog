<template>
  <a-config-provider theme="dark">
    <a-menu>
      
    </a-menu>
    <a-layout
      style="min-height: 100vh;"
    >
      <a-layout-header
  
      />
  
      <a-layout-content
        style="padding: 2rem"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-config-provider>
</template>