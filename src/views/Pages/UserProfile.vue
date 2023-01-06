<template>
  <div class="container">
    <div class="user-profile">
      <div class="container mt--6">
        <div class="row">
          <div class="user-profile-view">
            <edit-profile-form></edit-profile-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import EditProfileForm from "./UserProfile/EditProfileForm.vue";
//import UserCard from "./UserProfile/UserCard.vue";

export default {
  components: {
    EditProfileForm,
    //UserCard,
  },
};
</script>
<style>
.profile-header {
  background-image: url(/img/theme/profile-cover.jpg);
  background-size: cover;
  background-position: center top;
  min-height: 500px;
}
.user-profile {
  margin-top: 100px;
}
.user-profile-view {
  display: flex;
  gap: 20px;
}
</style>
