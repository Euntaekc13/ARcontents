<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <div class="modal-header">
              <slot name="header"> default header </slot>
            </div>

            <div class="modal-body">
              <slot name="body"> default body </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer"> default footer </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {};
</script>

<style src="../../assets/style/modal.css" scoped></style>
