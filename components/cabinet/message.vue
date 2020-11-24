<template>
  <div class="message" :class="{owner: isOwner, system}">
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
    isOwner: Boolean,
    system: {
      default: true
    }
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
  &.system
    width: 100%
    max-width: 100%
    background-color: transparent
    border-top: 1px solid #ffffff
    border-bottom: 1px solid #ffffff
    border-radius: 0
    text-align: center
    color: #ffffff
    .message__title
      display: none
    .message__content
      margin-top: 20px
</style>
