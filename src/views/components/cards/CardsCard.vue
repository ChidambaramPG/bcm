<template>
  <div class="col-md-3">
    <div class="card profile-card-2">
      <div class="card-img-block">
        <img
          class="img-responsive"
          :src="data.image"
          alt="Card image cap"
        />
      </div>
      <div class="card-body pt-5">
        <!-- <img
          src="https://randomuser.me/api/portraits/men/64.jpg"
          alt="profile-image"
          class="profile"
        /> -->
        <h5 class="card-title">{{data.cFirstname.toUpperCase()}}</h5>
        <p class="card-text">
          {{data.address}}
        </p>
        <div class="icon-block">
          <a href="#"><i class="fa fa-facebook"></i></a
          ><a href="#"> <i class="fa fa-twitter"></i></a
          ><a href="#"> <i class="fa fa-google-plus"></i></a>
        </div>
      </div>
    </div>
    <p class="mt-3 w-100 float-left text-center">
      <strong>Social Profile Card</strong>
    </p>
  </div>
</template>

<script>
export default {
    name:'CardsCard',
    props:['data']
};
</script>

<style>
.profile-card-2 .card-img-block{
    float:left;
    width:100%;
    height:150px;
    overflow:hidden;
}
.profile-card-2 .card-body{
    position:relative;
}
.profile-card-2 .profile {
  border-radius: 50%;
  position: absolute;
  top: -42px;
  left: 15%;
  max-width: 75px;
  border: 3px solid rgba(255, 255, 255, 1);
  -webkit-transform: translate(-50%, 0%);
  transform: translate(-50%, 0%);
}
.profile-card-2 h5{
    font-weight:600;
    color:#6ab04c;
}
.profile-card-2 .card-text{
    font-weight:300;
    font-size:15px;
}
.profile-card-2 .icon-block{
    float:left;
    width:100%;
}
.profile-card-2 .icon-block a{
    text-decoration:none;
}
.profile-card-2 i {
  display: inline-block;
    font-size: 16px;
    color: #6ab04c;
    text-align: center;
    border: 1px solid #6ab04c;
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 50%;
    margin:0 5px;
}
.profile-card-2 i:hover {
  background-color:#6ab04c;
  color:#fff;
}
</style>
