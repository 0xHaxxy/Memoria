<template>
  <!-- :key => chaque étape est remontée à zéro (selected, feedback remis à vide) -->
  <RouterView :key="$route.fullPath" />
</template>
