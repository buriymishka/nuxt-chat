<template>
  <div class="message" :class="{owner: isOwner}">
    <span class="message__title">{{ ownerName }}</span>
    <p class="message__content">
      {{ content }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    content: String,
    ownerName: String,
    isOwner: Boolean
  }
};
</script>

<style lang="sass" scoped>
.message
  max-width: 600px
  background-color: #0277BD
  padding: 10px 20px
  border-radius: 10px
  margin: 20px 0
  &__title
    font-size: 28px
    color: #EEEEEE
  &.owner
    margin-left: auto
    background-color: #E0E0E0
    color: #212121
    .message__title
      color: #212121
</style>
